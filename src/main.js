
var _plugins = {};

function _plugin(name, fn) {
	if (name === undefined) {
		return _plugins;
	}
	if (!fn) {
		return _plugins[name];
	}
	_plugins[name] = fn;
}

var _language = {};

function _parseLangKey(key) {
	var match, ns = 'core';
	if ((match = /^(\w+)\.(\w+)$/.exec(key))) {
		ns = match[1];
		key = match[2];
	}
	return { ns : ns, key : key };
}
/**
	@example
	K.lang('about'); //get core.about
	K.lang('about.version'); // get about.version
	K.lang('about.').version; // get about.version
	K.lang('about', 'en'); //get English core.about
	K.lang({
		core.about : '关于',
		about.version : '4.0'
	}, 'zh-CN'); //add language
*/
function _lang(mixed, langType) {
	langType = langType === undefined ? K.options.langType : langType;
	if (typeof mixed === 'string') {
		if (!_language[langType]) {
			return 'no language';
		}
		var pos = mixed.length - 1;
		if (mixed.substr(pos) === '.') {
			return _language[langType][mixed.substr(0, pos)];
		}
		var obj = _parseLangKey(mixed);
		return _language[langType][obj.ns][obj.key];
	}
	_each(mixed, function(key, val) {
		var obj = _parseLangKey(key);
		if (!_language[langType]) {
			_language[langType] = {};
		}
		if (!_language[langType][obj.ns]) {
			_language[langType][obj.ns] = {};
		}
		_language[langType][obj.ns][obj.key] = val;
	});
}

// 当前range为图片时返回KNode，否则返回undefined
function _getImageFromRange(range, fn) {
	if (range.collapsed) {
		return;
	}
	range = range.cloneRange().up();
	var sc = range.startContainer, so = range.startOffset;
	if (!_WEBKIT && !range.isControl()) {
		return;
	}
	var img = K(sc.childNodes[so]);
	if (!img || img.name != 'img') {
		return;
	}
	if (fn(img)) {
		return img;
	}
}

function _bindContextmenuEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).contextmenu(function(e) {
		if (self.menu) {
			self.hideMenu();
		}
		if (!self.useContextmenu) {
			e.preventDefault();
			return;
		}
		if (self._contextmenus.length === 0) {
			return;
		}
		var maxWidth = 0, items = [];
		_each(self._contextmenus, function() {
			if (this.title == '-') {
				items.push(this);
				return;
			}
			if (this.cond && this.cond()) {
				items.push(this);
				if (this.width && this.width > maxWidth) {
					maxWidth = this.width;
				}
			}
		});
		while (items.length > 0 && items[0].title == '-') {
			items.shift();
		}
		while (items.length > 0 && items[items.length - 1].title == '-') {
			items.pop();
		}
		var prevItem = null;
		_each(items, function(i) {
			if (this.title == '-' && prevItem.title == '-') {
				delete items[i];
			}
			prevItem = this;
		});
		if (items.length > 0) {
			e.preventDefault();
			var pos = K(self.edit.iframe).pos(),
				menu = _menu({
					x : pos.x + e.clientX,
					y : pos.y + e.clientY,
					width : maxWidth,
					css : { visibility: 'hidden' },
					shadowMode : self.shadowMode
				});
			_each(items, function() {
				if (this.title) {
					menu.addItem(this);
				}
			});
			// 下拉菜单超过可视区域时调整菜单位置
			var docEl = _docElement(menu.doc),
				menuHeight = menu.div.height();
			if (e.clientY + menuHeight >= docEl.clientHeight - 100) {
				menu.pos(menu.x, _removeUnit(menu.y) - menuHeight);
			}
			menu.div.css('visibility', 'visible');
			self.menu = menu;
		}
	});
}

function _bindNewlineEvent() {
	var self = this, doc = self.edit.doc, newlineTag = self.newlineTag;
	if (_IE && newlineTag !== 'br') {
		return;
	}
	if (_GECKO && _V < 3 && newlineTag !== 'p') {
		return;
	}
	if (_OPERA && _V < 9) {
		return;
	}
	var brSkipTagMap = _toMap('h1,h2,h3,h4,h5,h6,pre,li'),
		pSkipTagMap = _toMap('p,h1,h2,h3,h4,h5,h6,pre,li,blockquote');
	// 取得range的block标签名
	function getAncestorTagName(range) {
		var ancestor = K(range.commonAncestor());
		while (ancestor) {
			if (ancestor.type == 1 && !ancestor.isStyle()) {
				break;
			}
			ancestor = ancestor.parent();
		}
		return ancestor.name;
	}
	K(doc).keydown(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		self.cmd.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		// br
		if (newlineTag === 'br' && !brSkipTagMap[tagName]) {
			e.preventDefault();
			self.insertHtml('<br />' + (_IE && _V < 9 ? '' : '\u200B'));
			return;
		}
		// p
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
	});
	K(doc).keyup(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		if (newlineTag == 'br') {
			return;
		}
		if (_GECKO) {
			var root = self.cmd.commonAncestor('p');
			var a = self.cmd.commonAncestor('a');
			if (a && a.text() == '') {
				a.remove(true);
				self.cmd.range.selectNodeContents(root[0]).collapse(true);
				self.cmd.select();
			}
			return;
		}
		self.cmd.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
		// [WEBKIT] 将DIV改成P
		var div = self.cmd.commonAncestor('div');
		if (div) {
			var p = K('<p></p>'),
				child = div[0].firstChild;
			while (child) {
				var next = child.nextSibling;
				p.append(child);
				child = next;
			}
			div.before(p);
			div.remove();
			self.cmd.range.selectNodeContents(p[0]);
			self.cmd.select();
		}
	});
}

function _bindTabEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).keydown(function(e) {
		if (e.which == 9) {
			e.preventDefault();
			if (self.afterTab) {
				self.afterTab.call(self, e);
				return;
			}
			var cmd = self.cmd, range = cmd.range;
			range.shrink();
			// Bugfix #271: 回车，按下tab键，光标在下一行显示
			if (range.collapsed && range.startContainer.nodeType == 1) {
				range.insertNode(K('@&nbsp;', doc)[0]);
				cmd.select();
			}
			self.insertHtml('&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	});
}

function _bindFocusEvent() {
	var self = this;
	K(self.edit.textarea[0], self.edit.win).focus(function(e) {
		if (self.afterFocus) {
			self.afterFocus.call(self, e);
		}
	}).blur(function(e) {
		if (self.afterBlur) {
			self.afterBlur.call(self, e);
		}
	});
}

function _removeBookmarkTag(html) {
	return _trim(html.replace(/<span [^>]*id="?__kindeditor_bookmark_\w+_\d+__"?[^>]*><\/span>/ig, ''));
}

function _removeTempTag(html) {
	return html.replace(/<div[^>]+class="?__kindeditor_paste__"?[^>]*>[\s\S]*?<\/div>/ig, '');
}

function _addBookmarkToStack(stack, bookmark) {
	if (stack.length === 0) {
		stack.push(bookmark);
		return;
	}
	var prev = stack[stack.length - 1];
	if (_removeBookmarkTag(bookmark.html) !== _removeBookmarkTag(prev.html)) {
		stack.push(bookmark);
	}
}

// undo: _undoToRedo.call(this, undoStack, redoStack);
// redo: _undoToRedo.call(this, redoStack, undoStack);
function _undoToRedo(fromStack, toStack) {
	var self = this, edit = self.edit,
		body = edit.doc.body,
		range, bookmark;
	if (fromStack.length === 0) {
		return self;
	}
	if (edit.designMode) {
		range = self.cmd.range;
		bookmark = range.createBookmark(true);
		bookmark.html = body.innerHTML;
	} else {
		bookmark = {
			html : body.innerHTML
		};
	}
	_addBookmarkToStack(toStack, bookmark);
	var prev = fromStack.pop();
	if (_removeBookmarkTag(bookmark.html) === _removeBookmarkTag(prev.html) && fromStack.length > 0) {
		prev = fromStack.pop();
	}
	if (edit.designMode) {
		edit.html(prev.html);
		if (prev.start) {
			range.moveToBookmark(prev);
			self.select();
		}
	} else {
		K(body).html(_removeBookmarkTag(prev.html));
	}
	return self;
}

function KEditor(options) {
	var self = this;
	// save original options
	self.options = {};
	function setOption(key, val) {
		if (KEditor.prototype[key] === undefined) {
			self[key] = val;
		}
		self.options[key] = val;
	}
	// set options from param
	_each(options, function(key, val) {
		setOption(key, options[key]);
	});
	// set options from default setting
	_each(K.options, function(key, val) {
		if (self[key] === undefined) {
			setOption(key, val);
		}
	});
	var se = K(self.srcElement || '<textarea/>');
	if (!self.width) {
		self.width = se[0].style.width || se.width();
	}
	if (!self.height) {
		self.height = se[0].style.height || se.height();
	}
	setOption('width', _undef(self.width, self.minWidth));
	setOption('height', _undef(self.height, self.minHeight));
	setOption('width', _addUnit(self.width));
	setOption('height', _addUnit(self.height));
	if (_MOBILE && (!_IOS || _V < 534)) {
		self.designMode = false;
	}
	self.srcElement = se;
	self.initContent = '';
	self.plugin = {};
	self.isCreated = false;
	// private properties
	self._handlers = {};
	self._contextmenus = [];
	self._undoStack = [];
	self._redoStack = [];
	self._firstAddBookmark = true;
	self.menu = self.contextmenu = null;
	self.dialogs = [];
}

KEditor.prototype = {
	lang : function(mixed) {
		return _lang(mixed, this.langType);
	},
	loadPlugin : function(name, fn) {
		var self = this;
		var _pluginStatus = this._pluginStatus;
		if (!_pluginStatus) {
			_pluginStatus = this._pluginStatus = {};
		}

		if (_plugins[name]) {
			// JS加载中，等待JS加载完成
			if (!_isFunction(_plugins[name])) {
				setTimeout(function() {
					self.loadPlugin(name, fn);
				}, 100);
				return self;
			}

			// JS加载完成，避免初始化多次
			if(!_pluginStatus[name]) {
				_plugins[name].call(self, KindEditor);
				_pluginStatus[name] = 'inited';
			}

			if (fn) {
				fn.call(self);
			}
			return self;
		}
		// 还没加载相关plugin，动态加载
		_plugins[name] = 'loading';
		_loadScript(self.pluginsPath + name + '/' + name + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function() {
			// Fix bug: https://github.com/kindsoft/kindeditor/issues/105
			setTimeout(function() {
				if (_plugins[name]) {
					self.loadPlugin(name, fn);
				}
			}, 0);
		});
		return self;
	},
	handler : function(key, fn) {
		var self = this;
		if (!self._handlers[key]) {
			self._handlers[key] = [];
		}
		if (_isFunction(fn)) {
			self._handlers[key].push(fn);
			return self;
		}
		_each(self._handlers[key], function() {
			fn = this.call(self, fn);
		});
		return fn;
	},
	clickToolbar : function(name, fn) {
		var self = this, key = 'clickToolbar' + name;
		if (fn === undefined) {
			if (self._handlers[key]) {
				return self.handler(key);
			}
			self.loadPlugin(name, function() {
				self.handler(key);
			});
			return self;
		}
		return self.handler(key, fn);
	},
	updateState : function() {
		var self = this;
		_each(('justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,' +
			'subscript,superscript,bold,italic,underline,strikethrough').split(','), function(i, name) {
			self.cmd.state(name) ? self.toolbar.select(name) : self.toolbar.unselect(name);
		});
		return self;
	},
	addContextmenu : function(item) {
		this._contextmenus.push(item);
		return this;
	},
	afterCreate : function(fn) {
		return this.handler('afterCreate', fn);
	},
	beforeRemove : function(fn) {
		return this.handler('beforeRemove', fn);
	},
	beforeGetHtml : function(fn) {
		return this.handler('beforeGetHtml', fn);
	},
	beforeSetHtml : function(fn) {
		return this.handler('beforeSetHtml', fn);
	},
	afterSetHtml : function(fn) {
		return this.handler('afterSetHtml', fn);
	},
	create : function() {
		var self = this, fullscreenMode = self.fullscreenMode;
		if (self.isCreated) {
			return self;
		}

		if (self.srcElement.data('kindeditor')) {
			return self;
		}
		self.srcElement.data('kindeditor', 'true');

		if (fullscreenMode) {
			_docElement().style.overflow = 'hidden';
		} else {
			_docElement().style.overflow = '';
		}
		var width = fullscreenMode ? _docElement().clientWidth + 'px' : self.width,
			height = fullscreenMode ? _docElement().clientHeight + 'px' : self.height;
		// 校正IE6和IE7的高度
		if ((_IE && _V < 8) || _QUIRKS) {
			height = _addUnit(_removeUnit(height) + 2);
		}
		var container = self.container = K(self.layout);
		if (fullscreenMode) {
			K(document.body).append(container);
		} else {
			self.srcElement.before(container);
		}
		var toolbarDiv = K('.toolbar', container),
			editDiv = K('.edit', container),
			statusbar = self.statusbar = K('.statusbar', container);
		container.removeClass('container')
			.addClass('ke-container ke-container-' + self.themeType).css('width', width);
		if (fullscreenMode) {
			container.css({
				position : 'absolute',
				left : 0,
				top : 0,
				'z-index' : 811211
			});
			if (!_GECKO) {
				self._scrollPos = _getScrollPos();
			}
			window.scrollTo(0, 0);
			// bugfix: [WEBKIT] 高度为0时在dialog里无法粘贴文本
			K(document.body).css({
				'height' : '1px',
				'overflow' : 'hidden'
			});
			K(document.body.parentNode).css('overflow', 'hidden');
			self._fullscreenExecuted = true;
		} else {
			if (self._fullscreenExecuted) {
				// 恢复文档高度
				K(document.body).css({
					'height' : '',
					'overflow' : ''
				});
				K(document.body.parentNode).css('overflow', '');
			}
			if (self._scrollPos) {
				window.scrollTo(self._scrollPos.x, self._scrollPos.y);
			}
		}
		// create toolbar
		var htmlList = [];
		K.each(self.items, function(i, name) {
			if (name == '|') {
				htmlList.push('<span class="ke-inline-block ke-separator"></span>');
			} else if (name == '/') {
				htmlList.push('<div class="ke-hr"></div>');
			} else {
				htmlList.push('<span class="ke-outline" data-name="' + name + '" title="' + self.lang(name) + '" unselectable="on">');
				htmlList.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span></span>');
			}
		});
		var toolbar = self.toolbar = _toolbar({
			src : toolbarDiv,
			html : htmlList.join(''),
			noDisableItems : self.noDisableItems,
			click : function(e, name) {
				e.stop();
				if (self.menu) {
					var menuName = self.menu.name;
					self.hideMenu();
					if (menuName === name) {
						return;
					}
				}
				self.clickToolbar(name);
			}
		});
		// create edit
		var editHeight = _removeUnit(height) - toolbar.div.height();
		var edit = self.edit = _edit({
			height : editHeight > 0 && _removeUnit(height) > self.minHeight ? editHeight : self.minHeight,
			src : editDiv,
			srcElement : self.srcElement,
			designMode : self.designMode,
			themesPath : self.themesPath,
			bodyClass : self.bodyClass,
			cssPath : self.cssPath,
			cssData : self.cssData,
			beforeGetHtml : function(html) {
				html = self.beforeGetHtml(html);
				// Bugfix: 浏览器后退产生__kindeditor_bookmark_start_0__
				html = _removeBookmarkTag(_removeTempTag(html));
				return _formatHtml(html, self.filterMode ? self.htmlTags : null, self.urlType, self.wellFormatMode, self.indentChar);
			},
			beforeSetHtml : function(html) {
				html = _formatHtml(html, self.filterMode ? self.htmlTags : null, '', false);
				return self.beforeSetHtml(html);
			},
			afterSetHtml : function() {
				self.edit = edit = this;
				self.afterSetHtml();
			},
			afterCreate : function() {
				self.edit = edit = this;
				self.cmd = edit.cmd;
				// hide menu when click document
				self._docMousedownFn = function(e) {
					if (self.menu) {
						self.hideMenu();
					}
				};
				K(edit.doc, document).mousedown(self._docMousedownFn);
				_bindContextmenuEvent.call(self);
				_bindNewlineEvent.call(self);
				_bindTabEvent.call(self);
				_bindFocusEvent.call(self);
				// afterChange event
				edit.afterChange(function(e) {
					if (!edit.designMode) {
						return;
					}
					self.updateState();
					self.addBookmark();
					if (self.options.afterChange) {
						self.options.afterChange.call(self);
					}
				});
				edit.textarea.keyup(function(e) {
					if (!e.ctrlKey && !e.altKey && _INPUT_KEY_MAP[e.which]) {
						if (self.options.afterChange) {
							self.options.afterChange.call(self);
						}
					}
				});
				// readonly
				if (self.readonlyMode) {
					self.readonly();
				}
				self.isCreated = true;
				if (self.initContent === '') {
					self.initContent = self.html();
				}
				// Bugfix: 全屏后和还原后光标没有选中之前光标的位置
				if (self._undoStack.length > 0) {
					var prev = self._undoStack.pop();
					if (prev.start) {
						self.html(prev.html);
						edit.cmd.range.moveToBookmark(prev);
						self.select();
					}
				}
				self.afterCreate();
				if (self.options.afterCreate) {
					self.options.afterCreate.call(self);
				}
			}
		});
		// create statusbar
		statusbar.removeClass('statusbar').addClass('ke-statusbar')
			.append('<span class="ke-inline-block ke-statusbar-center-icon"></span>')
			.append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');

		// remove resize event
		if (self._fullscreenResizeHandler) {
			K(window).unbind('resize', self._fullscreenResizeHandler);
			self._fullscreenResizeHandler = null;
		}
		// reset size
		function initResize() {
			// Bugfix: 页面刷新后，与第一次访问加载的编译器高度不一致
			if (statusbar.height() === 0) {
				setTimeout(initResize, 100);
				return;
			}
			self.resize(width, height, false);
		}
		initResize();
		// fullscreen mode
		if (fullscreenMode) {
			self._fullscreenResizeHandler = function(e) {
				if (self.isCreated) {
					self.resize(_docElement().clientWidth, _docElement().clientHeight, false);
				}
			};
			K(window).bind('resize', self._fullscreenResizeHandler);
			toolbar.select('fullscreen');
			statusbar.first().css('visibility', 'hidden');
			statusbar.last().css('visibility', 'hidden');
		} else {
			if (_GECKO) {
				K(window).bind('scroll', function(e) {
					self._scrollPos = _getScrollPos();
				});
			}
			// bind drag event
			if (self.resizeType > 0) {
				_drag({
					moveEl : container,
					clickEl : statusbar,
					moveFn : function(x, y, width, height, diffX, diffY) {
						height += diffY;
						self.resize(null, height);
					}
				});
			} else {
				statusbar.first().css('visibility', 'hidden');
			}
			if (self.resizeType === 2) {
				_drag({
					moveEl : container,
					clickEl : statusbar.last(),
					moveFn : function(x, y, width, height, diffX, diffY) {
						width += diffX;
						height += diffY;
						self.resize(width, height);
					}
				});
			} else {
				statusbar.last().css('visibility', 'hidden');
			}
		}
		return self;
	},
	remove : function() {
		var self = this;
		if (!self.isCreated) {
			return self;
		}
		self.beforeRemove();

		self.srcElement.data('kindeditor', '');

		if (self.menu) {
			self.hideMenu();
		}
		_each(self.dialogs, function() {
			self.hideDialog();
		});
		K(document).unbind('mousedown', self._docMousedownFn);
		self.toolbar.remove();
		self.edit.remove();
		self.statusbar.last().unbind();
		self.statusbar.unbind();
		self.container.remove();
		self.container = self.toolbar = self.edit = self.menu = null;
		self.dialogs = [];
		self.isCreated = false;
		return self;
	},
	resize : function(width, height, updateProp) {
		var self = this;
		updateProp = _undef(updateProp, true);
		if (width) {
			if (!/%/.test(width)) {
				width = _removeUnit(width);
				width = width < self.minWidth ? self.minWidth : width;
			}
			self.container.css('width', _addUnit(width));
			if (updateProp) {
				self.width = _addUnit(width);
			}
		}
		if (height) {
			height = _removeUnit(height);
			editHeight = _removeUnit(height) - self.toolbar.div.height() - self.statusbar.height();
			editHeight = editHeight < self.minHeight ? self.minHeight : editHeight;
			self.edit.setHeight(editHeight);
			if (updateProp) {
				self.height = _addUnit(height);
			}
		}
		return self;
	},
	select : function() {
		this.isCreated && this.cmd.select();
		return this;
	},
	html : function(val) {
		var self = this;
		if (val === undefined) {
			return self.isCreated ? self.edit.html() : _elementVal(self.srcElement);
		}
		self.isCreated ? self.edit.html(val) : _elementVal(self.srcElement, val);
		// Bugfix: http://www.kindsoft.net/view.php?bbsid=4&postid=6703&pagenum=1
		if (self.isCreated) {
			self.cmd.selection();
		}
		return self;
	},
	fullHtml : function() {
		return this.isCreated ? this.edit.html(undefined, true) : '';
	},
	text : function(val) {
		var self = this;
		if (val === undefined) {
			return _trim(self.html().replace(/<(?!img|embed).*?>/ig, '').replace(/&nbsp;/ig, ' '));
		} else {
			return self.html(_escape(val));
		}
	},
	isEmpty : function() {
		return _trim(this.text().replace(/\r\n|\n|\r/, '')) === '';
	},
	isDirty : function() {
		return _trim(this.initContent.replace(/\r\n|\n|\r|t/g, '')) !== _trim(this.html().replace(/\r\n|\n|\r|t/g, ''));
	},
	selectedHtml : function() {
		var val = this.isCreated ? this.cmd.range.html() : '';
		val = _removeBookmarkTag(_removeTempTag(val));
		return val;
	},
	count : function(mode) {
		var self = this;
		mode = (mode || 'html').toLowerCase();
		if (mode === 'html') {
			return self.html().length;
		}
		if (mode === 'text') {
			return self.text().replace(/<(?:img|embed).*?>/ig, 'K').replace(/\r\n|\n|\r/g, '').length;
		}
		return 0;
	},
	exec : function(key) {
		key = key.toLowerCase();
		var self = this, cmd = self.cmd,
			changeFlag = _inArray(key, 'selectall,copy,paste,print'.split(',')) < 0;
		if (changeFlag) {
			self.addBookmark(false);
		}
		cmd[key].apply(cmd, _toArray(arguments, 1));
		// 不需要改变工具栏状态，不需要保存bookmark
		if (changeFlag) {
			self.updateState();
			self.addBookmark(false);
			if (self.options.afterChange) {
				self.options.afterChange.call(self);
			}
		}
		return self;
	},
	insertHtml : function(val, quickMode) {
		if (!this.isCreated) {
			return this;
		}
		val = this.beforeSetHtml(val);
		this.exec('inserthtml', val, quickMode);
		return this;
	},
	appendHtml : function(val) {
		this.html(this.html() + val);
		if (this.isCreated) {
			var cmd = this.cmd;
			cmd.range.selectNodeContents(cmd.doc.body).collapse(false);
			cmd.select();
		}
		return this;
	},
	sync : function() {
		_elementVal(this.srcElement, this.html());
		return this;
	},
	focus : function() {
		this.isCreated ? this.edit.focus() : this.srcElement[0].focus();
		return this;
	},
	blur : function() {
		this.isCreated ? this.edit.blur() : this.srcElement[0].blur();
		return this;
	},
	addBookmark : function(checkSize) {
		checkSize = _undef(checkSize, true);
		var self = this, edit = self.edit,
			body = edit.doc.body,
			html = _removeTempTag(body.innerHTML), bookmark;

		if (checkSize && self._undoStack.length > 0) {
			var prev = self._undoStack[self._undoStack.length - 1];
			if (Math.abs(html.length - _removeBookmarkTag(prev.html).length) < self.minChangeSize) {
				return self;
			}
		}
		// 第一次执行addBookmark时不执行range.createBookmark
		if (edit.designMode && !self._firstAddBookmark) {
			var range = self.cmd.range;
			bookmark = range.createBookmark(true);
			bookmark.html = _removeTempTag(body.innerHTML);
			range.moveToBookmark(bookmark);
		} else {
			bookmark = {
				html : html
			};
		}
		self._firstAddBookmark = false;
		_addBookmarkToStack(self._undoStack, bookmark);
		return self;
	},
	undo : function() {
		return _undoToRedo.call(this, this._undoStack, this._redoStack);
	},
	redo : function() {
		return _undoToRedo.call(this, this._redoStack, this._undoStack);
	},
	fullscreen : function(bool) {
		this.fullscreenMode = (bool === undefined ? !this.fullscreenMode : bool);
		this.addBookmark(false);
		return this.remove().create();
	},
	readonly : function(isReadonly) {
		isReadonly = _undef(isReadonly, true);
		var self = this, edit = self.edit, doc = edit.doc;
		if (self.designMode) {
			self.toolbar.disableAll(isReadonly, []);
		} else {
			_each(self.noDisableItems, function() {
				self.toolbar[isReadonly ? 'disable' : 'enable'](this);
			});
		}
		if (_IE) {
			doc.body.contentEditable = !isReadonly;
		} else {
			doc.designMode = isReadonly ? 'off' : 'on';
		}
		edit.textarea[0].disabled = isReadonly;
	},
	createMenu : function(options) {
		var self = this,
			name = options.name,
			knode = self.toolbar.get(name),
			pos = knode.pos();
		options.x = pos.x;
		options.y = pos.y + knode.height();
		options.z = self.options.zIndex;
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		if (options.selectedColor !== undefined) {
			options.cls = 'ke-colorpicker-' + self.themeType;
			options.noColor = self.lang('noColor');
			self.menu = _colorpicker(options);
		} else {
			options.cls = 'ke-menu-' + self.themeType;
			options.centerLineMode = false;
			self.menu = _menu(options);
		}
		return self.menu;
	},
	hideMenu : function() {
		this.menu.remove();
		this.menu = null;
		return this;
	},
	hideContextmenu : function() {
		this.contextmenu.remove();
		this.contextmenu = null;
		return this;
	},
	createDialog : function(options) {
		var self = this, name = options.name;
		options.z = self.options.zIndex;
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		options.closeBtn = _undef(options.closeBtn, {
			name : self.lang('close'),
			click : function(e) {
				self.hideDialog();
				// IE bugfix: 关闭dialog后，跳转到top
				if (_IE && self.cmd) {
					self.cmd.select();
				}
			}
		});
		options.noBtn = _undef(options.noBtn, {
			name : self.lang(options.yesBtn ? 'no' : 'close'),
			click : function(e) {
				self.hideDialog();
				// IE bugfix: 关闭dialog后，跳转到top
				if (_IE && self.cmd) {
					self.cmd.select();
				}
			}
		});
		if (self.dialogAlignType != 'page') {
			options.alignEl = self.container;
		}
		options.cls = 'ke-dialog-' + self.themeType;

		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			// 提高mask的z-index
			firstDialog.setMaskIndex(parentDialog.z + 2);
			// 提高dialog的z-index
			options.z = parentDialog.z + 3;
			// 不显示mask
			options.showMask = false;
		}
		var dialog = _dialog(options);
		self.dialogs.push(dialog);
		return dialog;
	},
	hideDialog : function() {
		var self = this;
		if (self.dialogs.length > 0) {
			self.dialogs.pop().remove();
		}
		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			// 降低mask的z-index
			firstDialog.setMaskIndex(parentDialog.z - 1);
		}
		return self;
	},
	errorDialog : function(html) {
		var self = this;
		var dialog = self.createDialog({
			width : 750,
			title : self.lang('uploadError'),
			body : '<div style="padding:10px 20px;"><iframe frameborder="0" style="width:708px;height:400px;"></iframe></div>'
		});
		var iframe = K('iframe', dialog.div), doc = K.iframeDoc(iframe);
		doc.open();
		doc.write(html);
		doc.close();
		K(doc.body).css('background-color', '#FFF');
		iframe[0].contentWindow.focus();
		return self;
	}
};

function _editor(options) {
	return new KEditor(options);
}

_instances = [];

/**
	@example
	K.create('textarea');
	K.create('textarea.class');
	K.create('#id');
*/
function _create(expr, options) {
	options = options || {};
	options.basePath = _undef(options.basePath, K.basePath);
	options.themesPath = _undef(options.themesPath, options.basePath + 'themes/');
	options.langPath = _undef(options.langPath, options.basePath + 'lang/');
	options.pluginsPath = _undef(options.pluginsPath, options.basePath + 'plugins/');
	// 自动加载CSS文件
	if (_undef(options.loadStyleMode, K.options.loadStyleMode)) {
		var themeType = _undef(options.themeType, K.options.themeType);
		_loadStyle(options.themesPath + 'default/default.css');
		_loadStyle(options.themesPath + themeType + '/' + themeType + '.css');
	}
	function create(editor) {
		_each(_plugins, function(name, fn) {
			if (_isFunction(fn)) {
				fn.call(editor, KindEditor);
				if (!editor._pluginStatus) {
					editor._pluginStatus = {};
				}
				editor._pluginStatus[name] = 'inited';
			}
		});
		return editor.create();
	}
	var knode = K(expr);
	if (!knode || knode.length === 0) {
		return;
	}
	if (knode.length > 1) {
		knode.each(function() {
			_create(this, options);
		});
		return _instances[0];
	}
	options.srcElement = knode[0];
	var editor = new KEditor(options);
	_instances.push(editor);
	// create editor
	if (_language[editor.langType]) {
		return create(editor);
	}
	// create editor after load lang file
	_loadScript(editor.langPath + editor.langType + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function() {
		create(editor);
	});
	return editor;
}

function _eachEditor(expr, fn) {
	K(expr).each(function(i, el) {
		K.each(_instances, function(j, editor) {
			if (editor && editor.srcElement[0] == el) {
				fn.call(editor, j);
				return false;
			}
		});
	});
}

K.remove = function(expr) {
	_eachEditor(expr, function(i) {
		this.remove();
		_instances.splice(i, 1);
	});
};

K.sync = function(expr) {
	_eachEditor(expr, function() {
		this.sync();
	});
};

K.html = function(expr, val) {
	_eachEditor(expr, function() {
		this.html(val);
	});
};

K.insertHtml = function(expr, val) {
	_eachEditor(expr, function() {
		this.insertHtml(val);
	});
};

K.appendHtml = function(expr, val) {
	_eachEditor(expr, function() {
		this.appendHtml(val);
	});
};

// 解决IE6浏览器重复下载背景图片的问题
if (_IE && _V < 7) {
	_nativeCommand(document, 'BackgroundImageCache', true);
}

K.EditorClass = KEditor;
K.editor = _editor;
K.create = _create;
K.instances = _instances;
K.plugin = _plugin;
K.lang = _lang;

// core plugins
_plugin('core', function(K) {
	var self = this,
		shortcutKeys = {
			undo : 'Z', redo : 'Y', bold : 'B', italic : 'I', underline : 'U', print : 'P', selectall : 'A'
		};
	// afterChange
	self.afterSetHtml(function() {
		if (self.options.afterChange) {
			self.options.afterChange.call(self);
		}
	});
	// sync
	self.afterCreate(function() {
		if (self.syncType != 'form') {
			return;
		}
		var el = K(self.srcElement), hasForm = false;
		while ((el = el.parent())) {
			if (el.name == 'form') {
				hasForm = true;
				break;
			}
		}
		if (hasForm) {
			el.bind('submit', function(e) {
				self.sync();
				// Bugfix: 	Firefox下后退，编辑器数据不保存
				K(window).bind('unload', function() {
					self.edit.textarea.remove();
				});
			});
			var resetBtn = K('[type="reset"]', el);
			resetBtn.click(function() {
				self.html(self.initContent);
				self.cmd.selection();
			});
			self.beforeRemove(function() {
				el.unbind();
				resetBtn.unbind();
			});
		}
	});
	// source
	self.clickToolbar('source', function() {
		if (self.edit.designMode) {
			self.toolbar.disableAll(true);
			self.edit.design(false);
			self.toolbar.select('source');
		} else {
			self.toolbar.disableAll(false);
			self.edit.design(true);
			self.toolbar.unselect('source');
			// Bugfix: http://www.kindsoft.net/view.php?bbsid=4&postid=7061&pagenum=1
			if (_GECKO) {
				setTimeout(function() {
					self.cmd.selection();
				}, 0);
			} else {
				self.cmd.selection();
			}
		}
		self.designMode = self.edit.designMode;
	});
	self.afterCreate(function() {
		if (!self.designMode) {
			self.toolbar.disableAll(true).select('source');
		}
	});
	// fullscreen
	self.clickToolbar('fullscreen', function() {
		self.fullscreen();
	});
	if (self.fullscreenShortcut) {
		var loaded = false;
		self.afterCreate(function() {
			K(self.edit.doc, self.edit.textarea).keyup(function(e) {
				if (e.which == 27) {
					// bugfix: 在opera 11上无法全屏，必须用setTimeout
					setTimeout(function() {
						self.fullscreen();
					}, 0);
				}
			});
			if (loaded) {
				// bugfix: 在IE上在代码模式下切换全屏出现奇怪现象
				if (_IE && !self.designMode) {
					return;
				}
				self.focus();
			}
			if (!loaded) {
				loaded = true;
			}
		});
	}
	// undo, redo
	_each('undo,redo'.split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self[name]();
		});
	});
	// formatblock
	self.clickToolbar('formatblock', function() {
		var blocks = self.lang('formatblock.formatBlock'),
			heights = {
				h1 : 28,
				h2 : 24,
				h3 : 18,
				H4 : 14,
				p : 12
			},
			curVal = self.cmd.val('formatblock'),
			menu = self.createMenu({
				name : 'formatblock',
				width : self.langType == 'en' ? 200 : 150
			});
		_each(blocks, function(key, val) {
			var style = 'font-size:' + heights[key] + 'px;';
			if (key.charAt(0) === 'h') {
				style += 'font-weight:bold;';
			}
			menu.addItem({
				title : '<span style="' + style + '" unselectable="on">' + val + '</span>',
				height : heights[key] + 12,
				checked : (curVal === key || curVal === val),
				click : function() {
					self.select().exec('formatblock', '<' + key + '>').hideMenu();
				}
			});
		});
	});
	// fontname
	self.clickToolbar('fontname', function() {
		var curVal = self.cmd.val('fontname'),
			menu = self.createMenu({
				name : 'fontname',
				width : 150
			});
		_each(self.lang('fontname.fontName'), function(key, val) {
			menu.addItem({
				title : '<span style="font-family: ' + key + ';" unselectable="on">' + val + '</span>',
				checked : (curVal === key.toLowerCase() || curVal === val.toLowerCase()),
				click : function() {
					self.exec('fontname', key).hideMenu();
				}
			});
		});
	});
	// fontsize
	self.clickToolbar('fontsize', function() {
		var curVal = self.cmd.val('fontsize'),
			menu = self.createMenu({
				name : 'fontsize',
				width : 150
			});
		_each(self.fontSizeTable, function(i, val) {
			menu.addItem({
				title : '<span style="font-size:' + val + ';" unselectable="on">' + val + '</span>',
				height : _removeUnit(val) + 12,
				checked : curVal === val,
				click : function() {
					self.exec('fontsize', val).hideMenu();
				}
			});
		});
	});
	// forecolor,hilitecolor
	_each('forecolor,hilitecolor'.split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.createMenu({
				name : name,
				selectedColor : self.cmd.val(name) || 'default',
				colors : self.colorTable,
				click : function(color) {
					self.exec(name, color).hideMenu();
				}
			});
		});
	});
	// cut,copy,paste
	_each(('cut,copy,paste').split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.focus();
			try {
				self.exec(name, null);
			} catch(e) {
				alert(self.lang(name + 'Error'));
			}
		});
	});
	// about
	self.clickToolbar('about', function() {
		var html = '<div style="margin:20px;">' +
			'<div>KindEditor ' + _VERSION + '</div>' +
			'<div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div>' +
			'</div>';
		self.createDialog({
			name : 'about',
			width : 350,
			title : self.lang('about'),
			body : html
		});
	});
	// link,image,flash,media,anchor
	self.plugin.getSelectedLink = function() {
		return self.cmd.commonAncestor('a');
	};
	self.plugin.getSelectedImage = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return !/^ke-\w+$/i.test(img[0].className);
		});
	};
	self.plugin.getSelectedFlash = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-flash';
		});
	};
	self.plugin.getSelectedMedia = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-media' || img[0].className == 'ke-rm';
		});
	};
	self.plugin.getSelectedAnchor = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-anchor';
		});
	};
	_each('link,image,flash,media,anchor'.split(','), function(i, name) {
		var uName = name.charAt(0).toUpperCase() + name.substr(1);
		_each('edit,delete'.split(','), function(j, val) {
			self.addContextmenu({
				title : self.lang(val + uName),
				click : function() {
					self.loadPlugin(name, function() {
						self.plugin[name][val]();
						self.hideMenu();
					});
				},
				cond : self.plugin['getSelected' + uName],
				width : 150,
				iconClass : val == 'edit' ? 'ke-icon-' + name : undefined
			});
		});
		self.addContextmenu({ title : '-' });
	});
	// table
	self.plugin.getSelectedTable = function() {
		return self.cmd.commonAncestor('table');
	};
	self.plugin.getSelectedRow = function() {
		return self.cmd.commonAncestor('tr');
	};
	self.plugin.getSelectedCell = function() {
		return self.cmd.commonAncestor('td');
	};
	_each(('prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,' +
	'rowsplit,colsplit,coldelete,rowdelete,insert,delete').split(','), function(i, val) {
		var cond = _inArray(val, ['prop', 'delete']) < 0 ? self.plugin.getSelectedCell : self.plugin.getSelectedTable;
		self.addContextmenu({
			title : self.lang('table' + val),
			click : function() {
				self.loadPlugin('table', function() {
					self.plugin.table[val]();
					self.hideMenu();
				});
			},
			cond : cond,
			width : 170,
			iconClass : 'ke-icon-table' + val
		});
	});
	self.addContextmenu({ title : '-' });
	// other
	_each(('selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
		'insertunorderedlist,indent,outdent,subscript,superscript,hr,print,' +
		'bold,italic,underline,strikethrough,removeformat,unlink').split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.cmd.selection();
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self.focus().exec(name, null);
		});
	});
	// paste
	self.afterCreate(function() {
		var doc = self.edit.doc, cmd, bookmark, div,
			cls = '__kindeditor_paste__', pasting = false;
		function movePastedData() {
			cmd.range.moveToBookmark(bookmark);
			cmd.select();
			if (_WEBKIT) {
				K('div.' + cls, div).each(function() {
					K(this).after('<br />').remove(true);
				});
				K('span.Apple-style-span', div).remove(true);
				K('span.Apple-tab-span', div).remove(true);
				// Bugfix: https://github.com/kindsoft/kindeditor/issues/8
				K('span[style]', div).each(function() {
					if (K(this).css('white-space') == 'nowrap') {
						K(this).remove(true);
					}
				});
				K('meta', div).remove();
			}
			var html = div[0].innerHTML;
			div.remove();
			if (html === '') {
				return;
			}
			// Chrome纯文本粘贴问题
			if (_WEBKIT) {
				html = html.replace(/(<br>)\1/ig, '$1');
			}
			// paste HTML
			if (self.pasteType === 2) {
				// 去除内容为空的p标签
				html = html.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, '');
				// paste from ms word
				if (/schemas-microsoft-com|worddocument|mso-\w+/i.test(html)) {
					html = _clearMsWord(html, self.filterMode ? self.htmlTags : K.options.htmlTags);
				} else {
					html = _formatHtml(html, self.filterMode ? self.htmlTags : null);
					html = self.beforeSetHtml(html);
				}
			}
			// paste text
			if (self.pasteType === 1) {
				html = html.replace(/&nbsp;/ig, ' ');
				html = html.replace(/\n\s*\n/g, '\n');
				html = html.replace(/<br[^>]*>/ig, '\n');
				html = html.replace(/<\/p><p[^>]*>/ig, '\n');
				html = html.replace(/<[^>]+>/g, '');
				html = html.replace(/ {2}/g, ' &nbsp;');
				if (self.newlineTag == 'p') {
					if (/\n/.test(html)) {
						html = html.replace(/^/, '<p>').replace(/$/, '<br /></p>').replace(/\n/g, '<br /></p><p>');
					}
				} else {
					html = html.replace(/\n/g, '<br />$&');
				}
			}
			self.insertHtml(html, true);
		}
		K(doc.body).bind('paste', function(e){
			if (self.pasteType === 0) {
				e.stop();
				return;
			}
			if (pasting) {
				return;
			}
			pasting = true;
			K('div.' + cls, doc).remove();
			cmd = self.cmd.selection();
			bookmark = cmd.range.createBookmark();
			div = K('<div class="' + cls + '"></div>', doc).css({
				position : 'absolute',
				width : '1px',
				height : '1px',
				overflow : 'hidden',
				left : '-1981px',
				top : K(bookmark.start).pos().y + 'px',
				'white-space' : 'nowrap'
			});
			K(doc.body).append(div);
			if (_IE) {
				var rng = cmd.range.get(true);
				rng.moveToElementText(div[0]);
				rng.select();
				rng.execCommand('paste');
				e.preventDefault();
			} else {
				cmd.range.selectNodeContents(div[0]);
				cmd.select();

				div[0].tabIndex = -1;
				div[0].focus();
			}
			setTimeout(function() {
				movePastedData();
				pasting = false;
			}, 0);
		});
	});
	// 取得HTML前执行
	self.beforeGetHtml(function(html) {
		// Bugifx : https://github.com/kindsoft/kindeditor/issues/66
		if (_IE && _V <= 8) {
			html = html.replace(/<div\s+[^>]*data-ke-input-tag="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, tag) {
				return unescape(tag);
			});
			// Bugfix: https://github.com/kindsoft/kindeditor/issues/88
			html = html.replace(/(<input)((?:\s+[^>]*)?>)/ig, function($0, $1, $2) {
				if (!/\s+type="[^"]+"/i.test($0)) {
					return $1 + ' type="text"' + $2;
				}
				return $0;
			});
		}
		return html.replace(/(<(?:noscript|noscript\s[^>]*)>)([\s\S]*?)(<\/noscript>)/ig, function($0, $1, $2, $3) {
			return $1 + _unescape($2).replace(/\s+/g, ' ') + $3;
		})
		.replace(/<img[^>]*class="?ke-(flash|rm|media)"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full);
			var styles = _getCssList(imgAttrs.style || '');
			var attrs = _mediaAttrs(imgAttrs['data-ke-tag']);
			var width = _undef(styles.width, '');
			var height = _undef(styles.height, '');
			if (/px/i.test(width)) {
				width = _removeUnit(width);
			}
			if (/px/i.test(height)) {
				height = _removeUnit(height);
			}
			attrs.width = _undef(imgAttrs.width, width);
			attrs.height = _undef(imgAttrs.height, height);
			return _mediaEmbed(attrs);
		})
		.replace(/<img[^>]*class="?ke-anchor"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full);
			return '<a name="' + unescape(imgAttrs['data-ke-name']) + '"></a>';
		})
		.replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<script' + unescape(attr) + '>' + unescape(code) + '</script>';
		})
		.replace(/<div\s+[^>]*data-ke-noscript-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<noscript' + unescape(attr) + '>' + unescape(code) + '</noscript>';
		})
		.replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig, function(full, start, src, end) {
			full = full.replace(/(\s+(?:href|src)=")[^"]*(")/i, function($0, $1, $2) {
				return $1 + _unescape(src) + $2;
			});
			full = full.replace(/\s+data-ke-src="[^"]*"/i, '');
			return full;
		})
		.replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + end;
		});
	});
	// 设置HTML前执行
	self.beforeSetHtml(function(html) {
		// Bugifx : https://github.com/kindsoft/kindeditor/issues/66
		if (_IE && _V <= 8) {
			html = html.replace(/<input[^>]*>|<(select|button)[^>]*>[\s\S]*?<\/\1>/ig, function(full) {
				var attrs = _getAttrList(full);
				var styles = _getCssList(attrs.style || '');
				if (styles.display == 'none') {
					return '<div class="ke-display-none" data-ke-input-tag="' + escape(full) + '"></div>';
				}
				return full;
			});
		}
		return html.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			attrs.src = _undef(attrs.src, '');
			attrs.width = _undef(attrs.width, 0);
			attrs.height = _undef(attrs.height, 0);
			return _mediaImg(self.themesPath + 'common/blank.gif', attrs);
		})
		.replace(/<a[^>]*name="([^"]+)"[^>]*>(?:<\/a>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			if (attrs.href !== undefined) {
				return full;
			}
			return '<img class="ke-anchor" src="' + self.themesPath + 'common/anchor.gif" data-ke-name="' + escape(attrs.name) + '" />';
		})
		.replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig, function(full, attr, code) {
			return '<div class="ke-script" data-ke-script-attr="' + escape(attr) + '">' + escape(code) + '</div>';
		})
		.replace(/<noscript([^>]*)>([\s\S]*?)<\/noscript>/ig, function(full, attr, code) {
			return '<div class="ke-noscript" data-ke-noscript-attr="' + escape(attr) + '">' + escape(code) + '</div>';
		})
		.replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig, function(full, start, key, src, end) {
			if (full.match(/\sdata-ke-src="[^"]*"/i)) {
				return full;
			}
			full = start + key + '="' + src + '"' + ' data-ke-src="' + _escape(src) + '"' + end;
			return full;
		})
		.replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + 'data-ke-' + end;
		})
		.replace(/<table[^>]*\s+border="0"[^>]*>/ig, function(full) {
			if (full.indexOf('ke-zeroborder') >= 0) {
				return full;
			}
			return _addClassToTag(full, 'ke-zeroborder');
		});
	});
});
