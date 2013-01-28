/*******************************************************************************
* KindPage - HTML5 Editor
* Copyright (C) Roddy <luolonghao@gmail.com>
* Copyright (C) Hui Deng <deng.hui5@gmail.com>
*
* @author Roddy <luolonghao@gmail.com>
* @version 1.0.1
*******************************************************************************/

/**

Supported Browsers:

* Firefox latest version
* Chrome latest version
* Safari latest version

*/

(function (K, undefined) {

// KindPage namespace
window.KindPage = {};

KindEditor.options.items = [
	'undo', 'redo', 'print', 'cut', 'copy', 'paste-combo', 'align-combo', 'order-combo', 'indent-combo', 'script-combo',
	'formatblock', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold',
	'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', 'insert-combo', 'emoticons', 'selectall'
];

// 输入文字的键值
var _INPUT_KEY_MAP = K.toMap('8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222');
// 移动光标的键值
var _CURSORMOVE_KEY_MAP = K.toMap('33..40');
// 输入文字或移动光标的键值
var _CHANGE_KEY_MAP = {};
K.each(_INPUT_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});
K.each(_CURSORMOVE_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});

function _getSel() {
	return document.selection || window.getSelection();
}

function _getRng() {
	var sel = _getSel(), rng;
	try {
		if (sel.rangeCount > 0) {
			rng = sel.getRangeAt(0);
		} else {
			rng = sel.createRange();
		}
	} catch(e) {}
	return rng;
}

function _nativeCommand(doc, key, val) {
	try {
		doc.execCommand(key, false, val);
	} catch(e) {}
}

// @param mixed: Node or KRange
function _isContentEditable(mixed) {
	var node = mixed.commonAncestor ? mixed.commonAncestor() : mixed;
	while (node && K(node).name !== 'body') {
		if (node.contentEditable == 'true') {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

// toolbar class
function Toolbar(options) {
	this.init(options);
}
K.extend(Toolbar, K.WidgetClass, {
	init : function(options) {
		var self = this;
		Toolbar.parent.init.call(self, options);
		self.disableMode = K.undef(options.disableMode, false);
		self.noDisableItemMap = K.toMap(K.undef(options.noDisableItems, []));
		self._itemMap = {};
		self.div.addClass('ke-toolbar').bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		}).attr('unselectable', 'on');
		function find(target) {
			var knode = K(target);
			if (knode.hasClass('ke-outline')) {
				return knode;
			}
			if (knode.hasClass('ke-toolbar-icon')) {
				return knode.parent();
			}
		}
		function hover(e, method) {
			var knode = find(e.target);
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				if (knode.hasClass('ke-selected')) {
					return;
				}
				knode[method]('ke-on');
			}
		}
		self.div.mouseover(function(e) {
			hover(e, 'addClass');
		})
		.mouseout(function(e) {
			hover(e, 'removeClass');
		})
		.click(function(e) {
			var knode = find(e.target);
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				self.options.click.call(this, e, knode.attr('data-name'));
			}
		});
	},
	get : function(name) {
		if (this._itemMap[name]) {
			return this._itemMap[name];
		}
		return (this._itemMap[name] = K('span.ke-icon-' + name, this.div).parent());
	},
	select : function(name) {
		this._selectToolbar(name, function(knode) {
			knode.addClass('ke-selected');
		});
		return self;
	},
	unselect : function(name) {
		this._selectToolbar(name, function(knode) {
			knode.removeClass('ke-selected').removeClass('ke-on');
		});
		return self;
	},
	enable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-disabled');
			knode.opacity(1);
		}
		return self;
	},
	disable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-selected').addClass('ke-disabled');
			knode.opacity(0.5);
		}
		return self;
	},
	disableAll : function(bool, noDisableItems) {
		var self = this, map = self.noDisableItemMap, item;
		if (noDisableItems) {
			map = _toMap(noDisableItems);
		}
		if (bool === undefined ? !self.disableMode : bool) {
			K('span.ke-outline', self.div).each(function() {
				var knode = K(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.disable(knode);
				}
			});
			self.disableMode = true;
		} else {
			K('span.ke-outline', self.div).each(function() {
				var knode = K(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.enable(knode);
				}
			});
			self.disableMode = false;
		}
		return self;
	},
	_selectToolbar : function(name, fn) {
		var self = this,
			knode = self.get(name);
		if (knode) {
			if (knode.hasClass('ke-disabled')) {
				return;
			}
			fn(knode);
		}
	}
});

function _bindContextmenuEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).contextmenu(function(e) {
		self.selection();
		if (self.menu) {
			self.hideMenu();
		}
		if (!self.useContextmenu) {
			e.preventDefault();
			return;
		}
		if (!_isContentEditable(e.target)) {
			return;
		}
		if (self._contextmenus.length === 0) {
			return;
		}
		var maxWidth = 0, items = [];
		K.each(self._contextmenus, function() {
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
		K.each(items, function(i) {
			if (this.title == '-' && prevItem.title == '-') {
				delete items[i];
			}
			prevItem = this;
		});
		if (items.length > 0) {
			e.preventDefault();
			var menu = K.menu({
					x : e.pageX,
					y : e.pageY,
					width : maxWidth,
					css : { visibility: 'hidden' },
					shadowMode : self.shadowMode
				});
			K.each(items, function() {
				if (this.title) {
					menu.addItem(this);
				}
			});
			menu.div.css('visibility', 'visible');
			self.menu = menu;
		}
	});
}

function _bindNewlineEvent() {
	var self = this, doc = self.edit.doc, newlineTag = self.newlineTag;
	var brSkipTagMap = K.toMap('h1,h2,h3,h4,h5,h6,pre,li'),
		pSkipTagMap = K.toMap('p,h1,h2,h3,h4,h5,h6,pre,li,blockquote');

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
		self.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
	});
}

// editor class
function Editor(expr, options) {
	var self = this;
	K.EditorClass.call(self, options);
	self.editAreas = K(expr).attr('contenteditable', 'true');
}

K.extend(Editor, K.EditorClass, {
	clickToolbar : function(name, fn) {
		var self = this;
		if (fn === undefined) {
			self.selection();
		}
		K.EditorClass.prototype.clickToolbar.call(self, name, fn);
		return self;
	},
	create : function() {
		var self = this;
		if (self.isCreated) {
			return self;
		}
		var htmlList = [];
		K.each(self.items, function(i, name) {
			if (name == '|') {
				htmlList.push('<span class="ke-separator"></span>');
			} else if (name == '/') {
				htmlList.push('<div class="ke-hr"></div>');
			} else {
				htmlList.push('<span class="ke-outline" data-name="' + name + '" title="' + self.lang(name) + '" unselectable="on">');
				htmlList.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span></span>');
			}
		});
		var toolbarDiv = K('<div class="kp-toolbar"><div class="toolbar"></div></div>').appendTo(document.body);
		var toolbar = self.toolbar = new Toolbar({
			src : K('.toolbar', toolbarDiv),
			html : htmlList.join(''),
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
		self.cmd = K.cmd(document);
		self.edit = {};
		self.edit.doc = document;
		self.edit.cmd = self.cmd;

		_bindContextmenuEvent.call(self);
		_bindNewlineEvent.call(self);
		// update toolbar state
		self.afterChange(function(e) {
			if (!_isContentEditable(e.target)) {
				return;
			}
			self.updateState();
		});
		// select image
		K(document).click(function(e) {
			if (!_isContentEditable(e.target)) {
				return;
			}
			if (K(e.target).name === 'img') {
				self.cmd.selection(true);
				self.cmd.range.selectNode(e.target);
				self.cmd.select();
			}
			self.updateState();
		});
		// hide pop menu
		K(document).bind('mousedown,scroll', function(e) {
			if (self.menu) {
				self.hideMenu();
			}
		});
		// reset selected range
		self.editAreas.focus(function() {
			setTimeout(function() {
				self.selection();
			}, 0);
		});
		return self;
	},
	selection : function() {
		var self = this, rng = _getRng();
		if (rng) {
			var range = K.range(rng);
			if (!_isContentEditable(range)) {
				return self;
			}
			self.cmd.selection();
		}
		return self;
	},
	forceSelection : function() {
		var self = this, rng = _getRng();
		if (rng) {
			var range = K.range(rng);
			if (_isContentEditable(range)) {
				self.cmd.selection();
			}
		}
		if (self.editAreas.length < 1) {
			return self;
		}
		self.cmd.range.selectNodeContents(self.editAreas[0]).collapse(false);
		return self;
	},
	exec : function(key) {
		key = key.toLowerCase();
		var self = this, cmd = self.cmd;
		if (!_isContentEditable(cmd.range)) {
			self.forceSelection();
		}
		cmd[key].apply(cmd, K.toArray(arguments, 1));
		self.updateState();
		return self;
	},
	insertHtml : function(val) {
		val = this.beforeSetHtml(val);
		this.exec('inserthtml', val);
		return this;
	},
	getAllContents : function() {
		var self = this, contents = {};
		self.editAreas.each(function() {
			if (this.id) {
				var html = K(this).html();
				html = K.formatHtml(html, null, self.urlType, self.wellFormatMode, self.indentChar);
				contents[this.id] = html;
			}
		});
		return contents;
	},
	focus : function() {
		return this;
	},
	blur : function() {
		return this;
	},
	afterChange : function(fn) {
		var self = this, doc = document, body = doc.body;
		K(doc).keyup(function(e) {
			if (!e.ctrlKey && !e.altKey && _CHANGE_KEY_MAP[e.which]) {
				fn(e);
			}
		});
		K(doc).mouseup(fn).contextmenu(fn);
		K(window).blur(fn);
		function timeoutHandler(e) {
			setTimeout(function() {
				fn(e);
			}, 1);
		}
		K(body).bind('paste', timeoutHandler);
		K(body).bind('cut', timeoutHandler);
		return self;
	}
});

KindPage.create = function(expr, options) {
	var editor = new Editor(expr, options);
	K.each(K.plugin(), function(name, fn) {
		fn.call(editor, KindEditor);
	});
	return editor.create();
};

K.each(['undo', 'redo'], function(i, name) {
	K.plugin(name, function() {
		var self = this;
		this.clickToolbar(name, function() {
			_nativeCommand(document, name, null);
		});
	});
});

K.each({
	'paste-combo' : {
		name : '粘贴',
		method : {
			'paste' : '粘贴(Ctrl+V)',
			'plainpaste' : '粘贴为无格式文本',
			'wordpaste' : '从Word粘贴'
		}
	},
	'align-combo' : {
		name : '对齐方式',
		method : {
			'justifyleft' : '左对齐',
			'justifycenter' : '居中对齐',
			'justifyright' : '右对齐',
			'justifyfull' : '两端对齐'
		}
	},
	'order-combo' : {
		name : '编号',
		method : {
			'insertorderedlist' : '数字编号',
			'insertunorderedlist' : '项目编号'
		}
	},
	'indent-combo' : {
		name : '缩进',
		method : {
			'indent' : '向右缩进',
			'outdent' : '向左缩进'
		}
	},
	'script-combo' : {
		name : '上下标',
		method : {
			'subscript' : '上标',
			'superscript' : '下标'
		}
	},
	'insert-combo' : {
		name : '插入',
		method : {
			'image' : '图片',
			'flash' : 'Flash',
			'media' : '视频',
			'table' : '表格',
			'hr' : '横线',
			'map' : '地图',
			'anchor' : '锚点',
			'link' : '链接',
			'unlink' : '取消链接'
		}
	}
}, function(pluginName, pluginData) {
	var lang = {};
	lang[pluginName] = pluginData.name;
	K.lang(lang);

	K.plugin(pluginName, function() {
		var self = this;
		self.clickToolbar(pluginName, function() {
			var menu = self.createMenu({
				name : pluginName,
				width : pluginData.width || 150
			});
			K.each(pluginData.method, function(key, val) {
				menu.addItem({
					title : val,
					checked : false,
					iconClass : 'ke-icon-' + key,
					click : function() {
						self.clickToolbar(key).hideMenu();
					}
				});
			})
		});
	});
});

})(KindEditor);
