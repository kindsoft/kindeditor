
// original execCommand
function _nativeCommand(doc, key, val) {
	try {
		doc.execCommand(key, false, val);
	} catch(e) {}
}
// original queryCommandValue
function _nativeCommandValue(doc, key) {
	var val = '';
	try {
		val = doc.queryCommandValue(key);
	} catch (e) {}
	if (typeof val !== 'string') {
		val = '';
	}
	return val;
}
// get current selection of a document
function _getSel(doc) {
	var win = _getWin(doc);
	return _IERANGE ? doc.selection : win.getSelection();
}
// get range of current selection
function _getRng(doc) {
	var sel = _getSel(doc), rng;
	try {
		if (sel.rangeCount > 0) {
			rng = sel.getRangeAt(0);
		} else {
			rng = sel.createRange();
		}
	} catch(e) {}
	if (_IERANGE && (!rng || (!rng.item && rng.parentElement().ownerDocument !== doc))) {
		return null;
	}
	return rng;
}
//将map的复合key转换成单一key
function _singleKeyMap(map) {
	var newMap = {}, arr, v;
	_each(map, function(key, val) {
		arr = key.split(',');
		for (var i = 0, len = arr.length; i < len; i++) {
			v = arr[i];
			newMap[v] = val;
		}
	});
	return newMap;
}
//判断一个node是否有指定属性或CSS
function _hasAttrOrCss(knode, map) {
	return _hasAttrOrCssByKey(knode, map, '*') || _hasAttrOrCssByKey(knode, map);
}
function _hasAttrOrCssByKey(knode, map, mapKey) {
	mapKey = mapKey || knode.name;
	if (knode.type !== 1) {
		return false;
	}
	var newMap = _singleKeyMap(map);
	if (!newMap[mapKey]) {
		return false;
	}
	var arr = newMap[mapKey].split(',');
	for (var i = 0, len = arr.length; i < len; i++) {
		var key = arr[i];
		if (key === '*') {
			return true;
		}
		var match = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(key);
		var method = match[1] ? 'css' : 'attr';
		key = match[2];
		var val = match[3] || '';
		if (val === '' && knode[method](key) !== '') {
			return true;
		}
		if (val !== '' && knode[method](key) === val) {
			return true;
		}
	}
	return false;
}
//删除一个node的属性和CSS
function _removeAttrOrCss(knode, map) {
	if (knode.type != 1) {
		return;
	}
	_removeAttrOrCssByKey(knode, map, '*');
	_removeAttrOrCssByKey(knode, map);
}
function _removeAttrOrCssByKey(knode, map, mapKey) {
	mapKey = mapKey || knode.name;
	if (knode.type !== 1) {
		return;
	}
	var newMap = _singleKeyMap(map);
	if (!newMap[mapKey]) {
		return;
	}
	var arr = newMap[mapKey].split(','), allFlag = false;
	for (var i = 0, len = arr.length; i < len; i++) {
		var key = arr[i];
		if (key === '*') {
			allFlag = true;
			break;
		}
		var match = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(key);
		key = match[2];
		if (match[1]) {
			key = _toCamel(key);
			if (knode[0].style[key]) {
				knode[0].style[key] = '';
			}
		} else {
			knode.removeAttr(key);
		}
	}
	if (allFlag) {
		knode.remove(true);
	}
}
//取得最里面的element
function _getInnerNode(knode) {
	var inner = knode;
	while (inner.first()) {
		inner = inner.first();
	}
	return inner;
}
//最里面的element为inline element时返回true
function _isEmptyNode(knode) {
	if (knode.type != 1 || knode.isSingle()) {
		return false;
	}
	return knode.html().replace(/<[^>]+>/g, '') === '';
}
//merge two wrapper
//a : <span><strong></strong></span>
//b : <strong><em></em></strong>
//result : <span><strong><em></em></strong></span>
function _mergeWrapper(a, b) {
	a = a.clone(true);
	var lastA = _getInnerNode(a), childA = a, merged = false;
	while (b) {
		while (childA) {
			if (childA.name === b.name) {
				_mergeAttrs(childA, b.attr(), b.css());
				merged = true;
			}
			childA = childA.first();
		}
		if (!merged) {
			lastA.append(b.clone(false));
		}
		merged = false;
		b = b.first();
	}
	return a;
}
//wrap and merge a node
function _wrapNode(knode, wrapper) {
	wrapper = wrapper.clone(true);
	//node为text node时
	if (knode.type == 3) {
		_getInnerNode(wrapper).append(knode.clone(false));
		knode.replaceWith(wrapper);
		return wrapper;
	}
	//node为element时
	//取得node的wrapper
	var nodeWrapper = knode, child;
	while ((child = knode.first()) && child.children().length == 1) {
		knode = child;
	}
	//将node的子节点纳入在一个documentFragment里
	child = knode.first();
	var frag = knode.doc.createDocumentFragment();
	while (child) {
		frag.appendChild(child[0]);
		child = child.next();
	}
	wrapper = _mergeWrapper(nodeWrapper, wrapper);
	if (frag.firstChild) {
		_getInnerNode(wrapper).append(frag);
	}
	nodeWrapper.replaceWith(wrapper);
	return wrapper;
}
//merge attributes and styles
function _mergeAttrs(knode, attrs, styles) {
	_each(attrs, function(key, val) {
		if (key !== 'style') {
			knode.attr(key, val);
		}
	});
	_each(styles, function(key, val) {
		knode.css(key, val);
	});
}
// 判断node是否在pre、style、script里
function _inPreElement(knode) {
	while (knode && knode.name != 'body') {
		if (_PRE_TAG_MAP[knode.name] || knode.name == 'div' && knode.hasClass('ke-script')) {
			return true;
		}
		knode = knode.parent();
	}
	return false;
}
// create KCmd class
function KCmd(range) {
	this.init(range);
}
_extend(KCmd, {
	init : function(range) {
		var self = this, doc = range.doc;
		self.doc = doc;
		self.win = _getWin(doc);
		self.sel = _getSel(doc);
		self.range = range;
	},
	selection : function(forceReset) {
		var self = this, doc = self.doc, rng = _getRng(doc);
		self.sel = _getSel(doc);
		if (rng) {
			self.range = _range(rng);
			if (K(self.range.startContainer).name == 'html') {
				self.range.selectNodeContents(doc.body).collapse(false);
			}
			return self;
		}
		if (forceReset) {
			self.range.selectNodeContents(doc.body).collapse(false);
		}
		return self;
	},
	select : function(hasDummy) {
		hasDummy = _undef(hasDummy, true);
		var self = this, sel = self.sel, range = self.range.cloneRange().shrink(),
			sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset,
			doc = _getDoc(sc), win = self.win, rng, hasU200b = false;
		// tag内部无内容时选中tag内部，<tagName>[]</tagName>
		if (hasDummy && sc.nodeType == 1 && range.collapsed) {
			if (_IERANGE) {
				var dummy = K('<span>&nbsp;</span>', doc);
				range.insertNode(dummy[0]);
				rng = doc.body.createTextRange();
				try {
					rng.moveToElementText(dummy[0]);
				} catch(ex) {}
				rng.collapse(false);
				rng.select();
				dummy.remove();
				win.focus();
				return self;
			}
			if (_WEBKIT) {
				var children = sc.childNodes;
				if (K(sc).isInline() || so > 0 && K(children[so - 1]).isInline() || children[so] && K(children[so]).isInline()) {
					range.insertNode(doc.createTextNode('\u200B'));
					hasU200b = true;
				}
			}
		}
		//other case
		if (_IERANGE) {
			try {
				rng = range.get(true);
				rng.select();
			} catch(e) {}
		} else {
			if (hasU200b) {
				range.collapse(false);
			}
			rng = range.get(true);
			sel.removeAllRanges();
			sel.addRange(rng);
			// Bugfix: https://github.com/kindsoft/kindeditor/issues/54
			if (doc !== document) {
				var pos = K(rng.endContainer).pos();
				win.scrollTo(pos.x, pos.y);
			}
		}
		win.focus();
		return self;
	},
	wrap : function(val) {
		var self = this, doc = self.doc, range = self.range, wrapper;
		wrapper = K(val, doc);
		// collapsed=true
		if (range.collapsed) {
			range.shrink();
			range.insertNode(wrapper[0]).selectNodeContents(wrapper[0]);
			return self;
		}
		// block wrapper
		if (wrapper.isBlock()) {
			var copyWrapper = wrapper.clone(true), child = copyWrapper;
			// find inner element
			while (child.first()) {
				child = child.first();
			}
			child.append(range.extractContents());
			range.insertNode(copyWrapper[0]).selectNode(copyWrapper[0]);
			return self;
		}
		// collapsed=false
		range.enlarge();
		var bookmark = range.createBookmark(), ancestor = range.commonAncestor(), isStart = false;
		K(ancestor).scan(function(node) {
			if (!isStart && node == bookmark.start) {
				isStart = true;
				return;
			}
			if (isStart) {
				if (node == bookmark.end) {
					return false;
				}
				var knode = K(node);
				if (_inPreElement(knode)) {
					return;
				}
				if (knode.type == 3 && _trim(node.nodeValue).length > 0) {
					// textNode为唯一的子节点时，重新设置node
					var parent;
					while ((parent = knode.parent()) && parent.isStyle() && parent.children().length == 1) {
						knode = parent;
					}
					_wrapNode(knode, wrapper);
				}
			}
		});
		range.moveToBookmark(bookmark);
		return self;
	},
	split : function(isStart, map) {
		var range = this.range, doc = range.doc;
		//get parent node
		var tempRange = range.cloneRange().collapse(isStart);
		var node = tempRange.startContainer, pos = tempRange.startOffset,
			parent = node.nodeType == 3 ? node.parentNode : node,
			needSplit = false, knode;
		while (parent && parent.parentNode) {
			knode = K(parent);
			if (map) {
				if (!knode.isStyle()) {
					break;
				}
				if (!_hasAttrOrCss(knode, map)) {
					break;
				}
			} else {
				if (_NOSPLIT_TAG_MAP[knode.name]) {
					break;
				}
			}
			needSplit = true;
			parent = parent.parentNode;
		}
		//split parent node
		if (needSplit) {
			var dummy = doc.createElement('span');
			range.cloneRange().collapse(!isStart).insertNode(dummy);
			if (isStart) {
				tempRange.setStartBefore(parent.firstChild).setEnd(node, pos);
			} else {
				tempRange.setStart(node, pos).setEndAfter(parent.lastChild);
			}
			var frag = tempRange.extractContents(),
				first = frag.firstChild, last = frag.lastChild;
			if (isStart) {
				tempRange.insertNode(frag);
				range.setStartAfter(last).setEndBefore(dummy);
			} else {
				parent.appendChild(frag);
				range.setStartBefore(dummy).setEndBefore(first);
			}
			//调整endOffset
			var dummyParent = dummy.parentNode;
			if (dummyParent == range.endContainer) {
				var prev = K(dummy).prev(), next = K(dummy).next();
				if (prev && next && prev.type == 3 && next.type == 3) {
					//dummy元素的左右都是textNode，<strong>f<span></span>g</strong>
					range.setEnd(prev[0], prev[0].nodeValue.length);
				} else if (!isStart) {
					range.setEnd(range.endContainer, range.endOffset - 1);
				}
			}
			dummyParent.removeChild(dummy);
		}
		return this;
	},
	remove : function(map) {
		var self = this, doc = self.doc, range = self.range;
		range.enlarge();
		// <p><strong><em>[123456789]</em></strong></p>, remove strong
		if (range.startOffset === 0) {
			var ksc = K(range.startContainer), parent;
			while ((parent = ksc.parent()) && parent.isStyle() && parent.children().length == 1) {
				ksc = parent;
			}
			range.setStart(ksc[0], 0);
			// <p style="color:red;">[abcd</p>, remove style
			ksc = K(range.startContainer);
			if (ksc.isBlock()) {
				_removeAttrOrCss(ksc, map);
			}
			var kscp = ksc.parent();
			if (kscp && kscp.isBlock()) {
				_removeAttrOrCss(kscp, map);
			}
		}
		var sc, so;
		// collapsed == true
		if (range.collapsed) {
			self.split(true, map);
			// remove empty element
			sc = range.startContainer;
			so = range.startOffset;
			if (so > 0) {
				var sb = K(sc.childNodes[so - 1]);
				if (sb && _isEmptyNode(sb)) {
					sb.remove();
					range.setStart(sc, so - 1);
				}
			}
			var sa = K(sc.childNodes[so]);
			if (sa && _isEmptyNode(sa)) {
				sa.remove();
			}
			// <strong>|</strong>
			if (_isEmptyNode(sc)) {
				range.startBefore(sc);
				sc.remove();
			}
			range.collapse(true);
			return self;
		}
		// split range
		self.split(true, map);
		self.split(false, map);
		// insert dummy element
		var startDummy = doc.createElement('span'), endDummy = doc.createElement('span');
		range.cloneRange().collapse(false).insertNode(endDummy);
		range.cloneRange().collapse(true).insertNode(startDummy);
		// select element
		var nodeList = [], cmpStart = false;
		K(range.commonAncestor()).scan(function(node) {
			if (!cmpStart && node == startDummy) {
				cmpStart = true;
				return;
			}
			if (node == endDummy) {
				return false;
			}
			if (cmpStart) {
				nodeList.push(node);
			}
		});
		// remove dummy element
		K(startDummy).remove();
		K(endDummy).remove();
		// remove empty element
		sc = range.startContainer;
		so = range.startOffset;
		var ec = range.endContainer, eo = range.endOffset;
		if (so > 0) {
			var startBefore = K(sc.childNodes[so - 1]);
			if (startBefore && _isEmptyNode(startBefore)) {
				startBefore.remove();
				range.setStart(sc, so - 1);
				if (sc == ec) {
					range.setEnd(ec, eo - 1);
				}
			}
			// <b>abc[</b><b>def]</b><b>ghi</b>，分割后HTML变成
			// <b>abc</b>[<b></b><b>def</b>]<b>ghi</b>
			var startAfter = K(sc.childNodes[so]);
			if (startAfter && _isEmptyNode(startAfter)) {
				startAfter.remove();
				if (sc == ec) {
					range.setEnd(ec, eo - 1);
				}
			}
		}
		var endAfter = K(ec.childNodes[range.endOffset]);
		if (endAfter && _isEmptyNode(endAfter)) {
			endAfter.remove();
		}
		var bookmark = range.createBookmark(true);
		// remove attributes or styles
		_each(nodeList, function(i, node) {
			_removeAttrOrCss(K(node), map);
		});
		range.moveToBookmark(bookmark);
		return self;
	},
	commonNode : function(map) {
		var range = this.range;
		var ec = range.endContainer, eo = range.endOffset,
			node = (ec.nodeType == 3 || eo === 0) ? ec : ec.childNodes[eo - 1];
		function find(node) {
			var child = node, parent = node;
			while (parent) {
				if (_hasAttrOrCss(K(parent), map)) {
					return K(parent);
				}
				parent = parent.parentNode;
			}
			while (child && (child = child.lastChild)) {
				if (_hasAttrOrCss(K(child), map)) {
					return K(child);
				}
			}
			return null;
		}
		var cNode = find(node);
		if (cNode) {
			return cNode;
		}
		//<strong>123</strong>|4567
		//<strong>123</strong>|<br />
		if (node.nodeType == 1 || (ec.nodeType == 3 && eo === 0)) {
			var prev = K(node).prev();
			if (prev) {
				return find(prev);
			}
		}
		return null;
	},
	commonAncestor : function(tagName) {
		var range = this.range,
			sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset,
			startNode = (sc.nodeType == 3 || so === 0) ? sc : sc.childNodes[so - 1],
			endNode = (ec.nodeType == 3 || eo === 0) ? ec : ec.childNodes[eo - 1];
		function find(node) {
			while (node) {
				if (node.nodeType == 1) {
					if (node.tagName.toLowerCase() === tagName) {
						return node;
					}
				}
				node = node.parentNode;
			}
			return null;
		}
		var start = find(startNode), end = find(endNode);
		if (start && end && start === end) {
			return K(start);
		}
		return null;
	},
	// Reference: document.queryCommandState
	// TODO
	state : function(key) {
		var self = this, doc = self.doc, bool = false;
		try {
			bool = doc.queryCommandState(key);
		} catch (e) {}
		return bool;
	},
	// Reference: document.queryCommandValue
	val : function(key) {
		var self = this, doc = self.doc, range = self.range;
		function lc(val) {
			return val.toLowerCase();
		}
		key = lc(key);
		var val = '', knode;
		if (key === 'fontfamily' || key === 'fontname') {
			val = _nativeCommandValue(doc, 'fontname');
			val = val.replace(/['"]/g, '');
			return lc(val);
		}
		if (key === 'formatblock') {
			val = _nativeCommandValue(doc, key);
			if (val === '') {
				knode = self.commonNode({'h1,h2,h3,h4,h5,h6,p,div,pre,address' : '*'});
				if (knode) {
					val = knode.name;
				}
			}
			if (val === 'Normal') {
				val = 'p';
			}
			return lc(val);
		}
		if (key === 'fontsize') {
			knode = self.commonNode({'*' : '.font-size'});
			if (knode) {
				val = knode.css('font-size');
			}
			return lc(val);
		}
		if (key === 'forecolor') {
			knode = self.commonNode({'*' : '.color'});
			if (knode) {
				val = knode.css('color');
			}
			val = _toHex(val);
			if (val === '') {
				val = 'default';
			}
			return lc(val);
		}
		if (key === 'hilitecolor') {
			knode = self.commonNode({'*' : '.background-color'});
			if (knode) {
				val = knode.css('background-color');
			}
			val = _toHex(val);
			if (val === '') {
				val = 'default';
			}
			return lc(val);
		}
		return val;
	},
	toggle : function(wrapper, map) {
		var self = this;
		if (self.commonNode(map)) {
			self.remove(map);
		} else {
			self.wrap(wrapper);
		}
		return self.select();
	},
	bold : function() {
		return this.toggle('<strong></strong>', {
			span : '.font-weight=bold',
			strong : '*',
			b : '*'
		});
	},
	italic : function() {
		return this.toggle('<em></em>', {
			span : '.font-style=italic',
			em : '*',
			i : '*'
		});
	},
	underline : function() {
		return this.toggle('<u></u>', {
			span : '.text-decoration=underline',
			u : '*'
		});
	},
	strikethrough : function() {
		return this.toggle('<s></s>', {
			span : '.text-decoration=line-through',
			s : '*'
		});
	},
	forecolor : function(val) {
		return this.wrap('<span style="color:' + val + ';"></span>').select();
		// return this.toggle('<span style="color:' + val + ';"></span>', {
		// 	span : '.color=' + val,
		// 	font : 'color'
		// });
	},
	hilitecolor : function(val) {
		return this.wrap('<span style="background-color:' + val + ';"></span>').select();
		// return this.toggle('<span style="background-color:' + val + ';"></span>', {
		// 	span : '.background-color=' + val
		// });
	},
	fontsize : function(val) {
		return this.wrap('<span style="font-size:' + val + ';"></span>').select();
		// return this.toggle('<span style="font-size:' + val + ';"></span>', {
		// 	span : '.font-size=' + val,
		// 	font : 'size'
		// });
	},
	fontname : function(val) {
		return this.fontfamily(val);
	},
	fontfamily : function(val) {
		return this.wrap('<span style="font-family:' + val + ';"></span>').select();
		// return this.toggle('<span style="font-family:' + val + ';"></span>', {
		// 	span : '.font-family=' + val,
		// 	font : 'face'
		// });
	},
	removeformat : function() {
		var map = {
			'*' : '.font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family,.text-indent'
		},
		tags = _STYLE_TAG_MAP;
		_each(tags, function(key, val) {
			map[key] = '*';
		});
		this.remove(map);
		return this.select();
	},
	inserthtml : function(val, quickMode) {
		var self = this, range = self.range;
		if (val === '') {
			return self;
		}
		//if (_inPreElement(K(range.startContainer))) {
		//	return self;
		//}
		// IE专用，优化性能
		function pasteHtml(range, val) {
			val = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + val;
			var rng = range.get();
			if (rng.item) {
				rng.item(0).outerHTML = val;
			} else {
				rng.pasteHTML(val);
			}
			var temp = range.doc.getElementById('__kindeditor_temp_tag__');
			temp.parentNode.removeChild(temp);
			var newRange = _toRange(rng);
			range.setEnd(newRange.endContainer, newRange.endOffset);
			range.collapse(false);
			self.select(false);
		}
		// 全浏览器兼容，在IE上速度慢
		function insertHtml(range, val) {
			var doc = range.doc,
				frag = doc.createDocumentFragment();
			K('@' + val, doc).each(function() {
				frag.appendChild(this);
			});
			range.deleteContents();
			range.insertNode(frag);
			range.collapse(false);
			self.select(false);
		}
		if (_IERANGE && quickMode) {
			try {
				pasteHtml(range, val);
			} catch(e) {
				insertHtml(range, val);
			}
			return self;
		}
		insertHtml(range, val);
		return self;
	},
	hr : function() {
		return this.inserthtml('<hr />');
	},
	print : function() {
		this.win.print();
		return this;
	},
	insertimage : function(url, title, width, height, border, align) {
		title = _undef(title, '');
		border = _undef(border, 0);
		var html = '<img src="' + _escape(url) + '" data-ke-src="' + _escape(url) + '" ';
		if (width) {
			html += 'width="' + _escape(width) + '" ';
		}
		if (height) {
			html += 'height="' + _escape(height) + '" ';
		}
		if (title) {
			html += 'title="' + _escape(title) + '" ';
		}
		if (align) {
			html += 'align="' + _escape(align) + '" ';
		}
		html += 'alt="' + _escape(title) + '" ';
		html += '/>';
		return this.inserthtml(html);
	},
	createlink : function(url, type) {
		var self = this, doc = self.doc, range = self.range;
		self.select();
		var a = self.commonNode({ a : '*' });
		if (a && !range.isControl()) {
			range.selectNode(a.get());
			self.select();
		}
		var html = '<a href="' + _escape(url) + '" data-ke-src="' + _escape(url) + '" ';
		if (type) {
			html += ' target="' + _escape(type) + '"';
		}
		if (range.collapsed) {
			html += '>' + _escape(url) + '</a>';
			return self.inserthtml(html);
		}
		if (range.isControl()) {
			var node = K(range.startContainer.childNodes[range.startOffset]);
			html += '></a>';
			node.after(K(html, doc));
			node.next().append(node);
			range.selectNode(node[0]);
			return self.select();
		}
		function setAttr(node, url, type) {
			K(node).attr('href', url).attr('data-ke-src', url);
			if (type) {
				K(node).attr('target', type);
			} else {
				K(node).removeAttr('target');
			}
		}
		// Bugfix: https://github.com/kindsoft/kindeditor/issues/117
		// [IE] 当两个A标签并排在一起中间没有别的内容，修改后面的链接地址时，前面的链接地址也被改掉。
		var sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset;
		if (sc.nodeType == 1 && sc === ec && so + 1 === eo) {
			var child = sc.childNodes[so];
			if (child.nodeName.toLowerCase() == 'a') {
				setAttr(child, url, type);
				return self;
			}
		}
		_nativeCommand(doc, 'createlink', '__kindeditor_temp_url__');
		K('a[href="__kindeditor_temp_url__"]', doc).each(function() {
			setAttr(this, url, type);
		});
		return self;
	},
	unlink : function() {
		var self = this, doc = self.doc, range = self.range;
		self.select();
		if (range.collapsed) {
			var a = self.commonNode({ a : '*' });
			if (a) {
				range.selectNode(a.get());
				self.select();
			}
			_nativeCommand(doc, 'unlink', null);
			if (_WEBKIT && K(range.startContainer).name === 'img') {
				var parent = K(range.startContainer).parent();
				if (parent.name === 'a') {
					parent.remove(true);
				}
			}
		} else {
			_nativeCommand(doc, 'unlink', null);
		}
		return self;
	}
});

_each(('formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
	'insertunorderedlist,indent,outdent,subscript,superscript').split(','), function(i, name) {
	KCmd.prototype[name] = function(val) {
		var self = this;
		self.select();
		_nativeCommand(self.doc, name, val);
		// Bugfix: [IE] 先选中图片后居中，再左对齐，光标跳到顶部
		if (_IERANGE && _inArray(name, 'justifyleft,justifycenter,justifyright,justifyfull'.split(',')) >= 0) {
			self.selection();
		}
		// 在webkit和firefox上需要重新选取range，否则有时候会报错
		if (!_IERANGE || _inArray(name, 'formatblock,selectall,insertorderedlist,insertunorderedlist'.split(',')) >= 0) {
			self.selection();
		}
		return self;
	};
});

_each('cut,copy,paste'.split(','), function(i, name) {
	KCmd.prototype[name] = function() {
		var self = this;
		if (!self.doc.queryCommandSupported(name)) {
			throw 'not supported';
		}
		self.select();
		_nativeCommand(self.doc, name, null);
		return self;
	};
});

function _cmd(mixed) {
	// mixed is a node
	if (mixed.nodeName) {
		var doc = _getDoc(mixed);
		mixed = _range(doc).selectNodeContents(doc.body).collapse(false);
	}
	// mixed is a KRange
	return new KCmd(mixed);
}

K.CmdClass = KCmd;
K.cmd = _cmd;
