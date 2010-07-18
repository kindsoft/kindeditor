/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2010 Longhao Luo
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.5.1 (2010-07-18)
*******************************************************************************/

(function (undefined) {

var KE = {};

KE.version = '3.5.1 (2010-07-18)';

KE.scriptPath = (function() {
	var elements = document.getElementsByTagName('script');
	for (var i = 0, len = elements.length; i < len; i++) {
		if (elements[i].src && elements[i].src.match(/kindeditor[\w\-\.]*\.js/)) {
			return elements[i].src.substring(0, elements[i].src.lastIndexOf('/') + 1);
		}
	}
	return '';
})();

KE.browser = (function() {
	var ua = navigator.userAgent.toLowerCase();
	return {
		VERSION: ua.match(/(msie|firefox|webkit|opera)[\/:\s](\d+)/) ? RegExp.$2 : '0',
		IE: (ua.indexOf('msie') > -1 && ua.indexOf('opera') == -1),
		GECKO: (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') == -1),
		WEBKIT: (ua.indexOf('applewebkit') > -1),
		OPERA: (ua.indexOf('opera') > -1)
	};
})();

KE.setting = {
	wyswygMode : true,
	loadStyleMode : true,
	resizeMode : 2,
	filterMode : false,
	autoSetDataMode : true,
	shadowMode : true,
	urlType : '',
	skinType : 'default',
	newlineTag : 'p',
	dialogAlignType : 'page',
	cssPath : '',
	skinsPath : KE.scriptPath === '' ? '' : KE.scriptPath + 'skins/',
	pluginsPath : KE.scriptPath === '' ? '' : KE.scriptPath + 'plugins/',
	minWidth : 200,
	minHeight : 100,
	minChangeSize : 5,
	toolbarLineHeight : 24,
	statusbarHeight : 11,
	items : [
		'source', '|', 'fullscreen', 'undo', 'redo', 'print', 'cut', 'copy', 'paste',
		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		'superscript', '|', 'selectall', '-',
		'title', 'fontname', 'fontsize', '|', 'textcolor', 'bgcolor', 'bold',
		'italic', 'underline', 'strikethrough', 'removeformat', '|', 'image',
		'flash', 'media', 'advtable', 'hr', 'emoticons', 'link', 'unlink', '|', 'about'
	],
	colorTable : [
		['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
		['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
		['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
		['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
	],
	noEndTags : ['br', 'hr', 'img', 'area', 'col', 'embed', 'input', 'param'],
	inlineTags : ['b', 'del', 'em', 'font', 'i', 'span', 'strike', 'strong', 'sub', 'sup', 'u'],
	endlineTags : [
		'br', 'hr', 'table', 'tbody', 'td', 'tr', 'th', 'div', 'p', 'ol', 'ul',
		'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style', 'marquee'
	],
	htmlTags : {
		font : ['color', 'size', 'face', '.background-color'],
		span : [
			'.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align'
		],
		div : [
			'align', '.border', '.margin', '.padding', '.text-align', '.color',
			'.background-color', '.font-size', '.font-family', '.font-weight', '.background',
			'.font-style', '.text-decoration', '.vertical-align', '.margin-left'
		],
		table: [
			'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
			'.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
			'.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
			'.width', '.height'
		],
		'td,th': [
			'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
			'.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
			'.font-style', '.text-decoration', '.vertical-align', '.background'
		],
		a : ['href', 'target', 'name'],
		embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess', '/'],
		img : ['src', 'width', 'height', 'border', 'alt', 'title', '.width', '.height', '/'],
		hr : ['/'],
		br : ['/'],
		'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
			'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
		],
		'tbody,tr,strong,b,sub,sup,em,i,u,strike' : []
	},
	mediaTypes : {
		rm : 'audio/x-pn-realaudio-plugin',
		flash : 'application/x-shockwave-flash',
		media : 'video/x-ms-asf-plugin'
	}
};

KE.g = {};

KE.plugin = {};

KE.$ = function(id, doc){
	var doc = doc || document;
	return doc.getElementById(id);
};

KE.$$ = function(name, doc){
	var doc = doc || document;
	return doc.createElement(name);
};

KE.event = {
	add : function(el, type, fn, id) {
		if (el.addEventListener){
			el.addEventListener(type, fn, false);
		} else if (el.attachEvent){
			el.attachEvent('on' + type, fn);
		}
		if (id !== undefined) {
			KE.g[id].eventStack.push({
				el : el,
				type : type,
				fn : fn
			});
		}
	},
	remove : function(el, type, fn, id) {
		if (el.removeEventListener){
			el.removeEventListener(type, fn, false);
		} else if (el.detachEvent){
			el.detachEvent('on' + type, fn);
		}
		if (id !== undefined) {
			var stack = KE.g[id].eventStack;
			for (var i = 0, len = stack.length; i < len; i++) {
				var item = stack[i];
				if (item && el === item.el && type === item.type && fn === item.fn) {
					delete stack[i];
				}
			}
		}
	},
	stop : function(e) {
		if (e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
		if (e.cancelBubble !== undefined) e.cancelBubble = true;
		if (e.returnValue !== undefined) e.returnValue = false;
	},
	bind : function(el, type, fn, id) {
		this.add(el, type, function(e) {
			fn(e);
			KE.event.stop(e);
			return false;
		}, id);
	},
	input : function(el, func, id) {
		this.add(el, 'keyup', function(e) {
			if (!e.ctrlKey && !e.altKey && (e.keyCode < 16 || e.keyCode > 18) && e.keyCode != 116) {
				func(e);
				KE.event.stop(e);
				return false;
			}
		}, id);
		function handler (e) {
			window.setTimeout(function() {
				func(e);
			}, 1);
		}
		var newElement = (el.nodeName == '#document') ? el.body : el;
		this.add(newElement, 'paste', handler, id);
		this.add(newElement, 'cut', handler, id);
	},
	ctrl : function(el, key, func, id) {
		key = key.toString().match(/^\d{2,}$/) ? key : key.toUpperCase().charCodeAt(0);
		this.add(el, 'keydown', function(e) {
			if (e.ctrlKey && e.keyCode == key && !e.shiftKey && !e.altKey) {
				func(e);
				KE.event.stop(e);
				return false;
			}
		}, id);
	},
	ready : function(func, win, doc, id) {
		var win = win || window;
		var doc = doc || document;
		var loaded = false;
		var readyFunc = function() {
			if (loaded) return;
			loaded = true;
			func();
		};
		if (doc.addEventListener) {
			this.add(doc, "DOMContentLoaded", readyFunc, id);
		} else if (doc.attachEvent){
			this.add(doc, "readystatechange", function() {
				if (doc.readyState == "complete") readyFunc();
			}, id);
			if ( doc.documentElement.doScroll && typeof win.frameElement === "undefined" ) {
				var ieReadyFunc = function() {
					if (loaded) return;
					try {
						doc.documentElement.doScroll("left");
					} catch(e) {
						window.setTimeout(ieReadyFunc, 0);
						return;
					}
					readyFunc();
				};
				ieReadyFunc();
			}
		}
		this.add(win, 'load', readyFunc, id);
	}
};

KE.each = function(obj, func) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) func(key, obj[key]);
	}
};

KE.eachNode = function(node, func) {
	var walkNodes = function(parent) {
		if (KE.util.getNodeType(parent) != 1) return true;
		var n = parent.firstChild;
		while (n) {
			var next = n.nextSibling;
			if (!func(n)) return false;
			if (!walkNodes(n)) return false;
			n = next;
		}
		return true;
	};
	walkNodes(node);
};

KE.selection = function(doc) {
	this.sel = null;
	this.range = null;
	this.keRange = null;
	this.isControl = false;
	var win = doc.parentWindow || doc.defaultView;
	this.init = function() {
		var sel = win.getSelection ? win.getSelection() : doc.selection;
		var range;
		try {
			if (sel.rangeCount > 0) range = sel.getRangeAt(0);
			else range = sel.createRange();
		} catch(e) {}
		if (!range) range = KE.util.createRange(doc);
		this.sel = sel;
		this.range = range;
		var startNode, startPos, endNode, endPos;
		if (KE.browser.IE) {
			if (range.item) {
				this.isControl = true;
				var el = range.item(0);
				startNode = endNode = el;
				startPos = endPos = 0;
			} else {
				this.isControl = false;
				var getStartEnd = function(isStart) {
					var pointRange = range.duplicate();
					pointRange.collapse(isStart);
					var parentNode = pointRange.parentElement();
					var nodes = parentNode.childNodes;
					if (nodes.length == 0) return {node: parentNode, pos: 0};
					var startNode;
					var endElement;
					var startPos = 0;
					var isEnd = false;
					var testRange = range.duplicate();
					KE.util.moveToElementText(testRange, parentNode);
					for (var i = 0, len = nodes.length; i < len; i++) {
						var node = nodes[i];
						var cmp = testRange.compareEndPoints('StartToStart', pointRange);
						if (cmp > 0) {
							isEnd = true;
						} else if (cmp == 0) {
							if (node.nodeType == 1) {
								var keRange = new KE.range(doc);
								keRange.selectTextNode(node);
								return {node: keRange.startNode, pos: 0};
							} else {
								return {node: node, pos: 0};
							}
						}
						if (node.nodeType == 1) {
							var nodeRange = range.duplicate();
							KE.util.moveToElementText(nodeRange, node);
							testRange.setEndPoint('StartToEnd', nodeRange);
							if (isEnd) startPos += nodeRange.text.length;
							else startPos = 0;
						} else if (node.nodeType == 3) {
							testRange.moveStart('character', node.nodeValue.length);
							startPos += node.nodeValue.length;
						}
						if (!isEnd) startNode = node;
					}
					if (!isEnd && startNode.nodeType == 1) {
						var startNode = parentNode.lastChild;
						return {node: startNode, pos: startNode.nodeType == 1 ? 1 : startNode.nodeValue.length};
					}
					testRange = range.duplicate();
					KE.util.moveToElementText(testRange, parentNode);
					testRange.setEndPoint('StartToEnd', pointRange);
					startPos -= testRange.text.replace(/\r\n|\n|\r/g, '').length;
					return {node: startNode, pos: startPos};
				};
				var start = getStartEnd(true);
				var end = getStartEnd(false);
				startNode = start.node;
				startPos = start.pos;
				endNode = end.node;
				endPos = end.pos;
			}
		} else {
			startNode = range.startContainer;
			startPos = range.startOffset;
			endNode = range.endContainer;
			endPos = range.endOffset;
			if (startNode.nodeType == 1 && typeof startNode.childNodes[startPos] != 'undefined') {
				startNode = startNode.childNodes[startPos];
				startPos = 0;
			}
			if (endNode.nodeType == 1) {
				endPos = endPos == 0 ? 1 : endPos;
				if (typeof endNode.childNodes[endPos - 1] != 'undefined') {
					endNode = endNode.childNodes[endPos - 1];
					endPos = (endNode.nodeType == 1) ? 0 : endNode.nodeValue.length;
				}
			}
			this.isControl = (startNode.nodeType == 1 && startNode === endNode && range.startOffset + 1 == range.endOffset);
			if (startNode.nodeType == 1 && endNode.nodeType == 3 && endPos == 0 && endNode.previousSibling) {
				var node = endNode.previousSibling;
				while (node) {
					if (node === startNode) {
						endNode = startNode;
						break;
					}
					if (node.childNodes.length != 1) break;
					node = node.childNodes[0];
				}
			}
			if (range.collapsed) {
				var keRange = new KE.range(doc);
				keRange.setTextStart(startNode, startPos);
				endNode = keRange.startNode;
				endPos = keRange.startPos;
			}
		}
		var keRange = new KE.range(doc);
		keRange.setTextStart(startNode, startPos);
		keRange.setTextEnd(endNode, endPos);
		this.keRange = keRange;
	};
	this.init();
	this.addRange = function(keRange) {
		if (KE.browser.GECKO && KE.browser.VERSION < 3) return;
		this.keRange = keRange;
		if (KE.browser.IE) {
			var getEndRange = function(isStart) {
				var range = KE.util.createRange(doc);
				var node = isStart ? keRange.startNode : keRange.endNode;
				if (node.nodeType == 1) {
					KE.util.moveToElementText(range, node);
					range.collapse(isStart);
				} else if (node.nodeType == 3) {
					range = KE.util.getNodeStartRange(doc, node);
					var pos = isStart ? keRange.startPos : keRange.endPos;
					range.moveStart('character', pos);
				}
				return range;
			}
			if (!this.range.item) {
				var node = keRange.startNode;
				if (node == keRange.endNode && KE.util.getNodeType(node) == 1 && KE.util.getNodeTextLength(node) == 0) {
					var temp = doc.createTextNode(" ");
					node.appendChild(temp);
					KE.util.moveToElementText(this.range, node);
					this.range.collapse(false);
					this.range.select();
					node.removeChild(temp);
				} else {
					if (node.nodeType == 3 && keRange.collapsed()) {
						this.range = getEndRange(true);
						this.range.collapse(true);
					} else {
						this.range.setEndPoint('StartToStart', getEndRange(true));
						this.range.setEndPoint('EndToStart', getEndRange(false));
					}
					this.range.select();
				}
			}
		} else {
			var getNodePos = function(node) {
				var pos = 0;
				while (node) {
					node = node.previousSibling;
					pos++;
				}
				return --pos;
			};
			var range = new KE.range(doc);
			range.setTextStart(keRange.startNode, keRange.startPos);
			range.setTextEnd(keRange.endNode, keRange.endPos);
			var startNode = range.startNode;
			var endNode = range.endNode;
			if (KE.util.getNodeType(startNode) == 88) {
				this.range.setStart(startNode.parentNode, getNodePos(range.startNode));
			} else {
				this.range.setStart(startNode, range.startPos);
			}
			if (KE.util.getNodeType(endNode) == 88) {
				this.range.setEnd(endNode.parentNode, getNodePos(range.endNode) + 1);
			} else {
				this.range.setEnd(endNode, range.endPos);
			}
			this.sel.removeAllRanges();
			this.sel.addRange(this.range);
		}
	};
	this.focus = function() {
		if (KE.browser.IE && this.range != null) this.range.select();
	}
};

KE.range = function(doc) {
	this.startNode = null;
	this.startPos = null;
	this.endNode = null;
	this.endPos = null;
	this.getParentElement = function() {
		var scanParent = function(node, func) {
			while (node && (!node.tagName || node.tagName.toLowerCase() != 'body')) {
				node = node.parentNode;
				if (func(node)) return;
			}
		}
		var nodeList = [];
		scanParent(this.startNode, function(node) {
			nodeList.push(node);
		});
		var parentNode;
		scanParent(this.endNode, function(node) {
			if (KE.util.inArray(node, nodeList)) {
				parentNode = node;
				return true;
			}
		});
		return parentNode ? parentNode : doc.body;
	};
	this.getNodeList = function() {
		var self = this;
		var parentNode = this.getParentElement();
		var nodeList = [];
		var isStarted = false;
		if (parentNode == self.startNode) isStarted = true;
		if (isStarted) nodeList.push(parentNode);
		KE.eachNode(parentNode, function(node) {
			if (node == self.startNode) isStarted = true;
			var range = new KE.range(doc);
			range.selectTextNode(node);
			var cmp = range.comparePoints('START_TO_END', self);
			if (cmp > 0) {
				return false;
			} else if (cmp == 0) {
				if (range.startNode !== range.endNode || range.startPos !== range.endPos) return false;
			}
			if (isStarted) nodeList.push(node);
			return true;
		});
		return nodeList;
	};
	this.comparePoints = function(how, range) {
		var compareNodes = function(nodeA, posA, nodeB, posB) {
			var cmp;
			if (KE.browser.IE) {
				var getStartRange = function(node, pos, isStart) {
					var range = KE.util.createRange(doc);
					var type = KE.util.getNodeType(node);
					if (type == 1) {
						KE.util.moveToElementText(range, node);
						range.collapse(isStart);
					} else if (type == 3) {
						range = KE.util.getNodeStartRange(doc, node);
						range.moveStart('character', pos);
						range.collapse(true);
					}
					return range;
				}
				var rangeA, rangeB;
				if (how == 'START_TO_START' || how == 'START_TO_END') rangeA = getStartRange(nodeA, posA, true);
				else rangeA = getStartRange(nodeA, posA, false);
				if (how == 'START_TO_START' || how == 'END_TO_START') rangeB = getStartRange(nodeB, posB, true);
				else rangeB = getStartRange(nodeB, posB, false);
				return rangeA.compareEndPoints('StartToStart', rangeB);
			} else {
				var rangeA = KE.util.createRange(doc);
				rangeA.selectNode(nodeA);
				if (how == 'START_TO_START' || how == 'START_TO_END') rangeA.collapse(true);
				else rangeA.collapse(false);
				var rangeB = KE.util.createRange(doc);
				rangeB.selectNode(nodeB);
				if (how == 'START_TO_START' || how == 'END_TO_START') rangeB.collapse(true);
				else rangeB.collapse(false);
				if (rangeA.compareBoundaryPoints(Range.START_TO_START, rangeB) > 0) {
					cmp = 1;
				} else if (rangeA.compareBoundaryPoints(Range.START_TO_START, rangeB) == 0) {
					if (posA > posB) cmp = 1;
					else if (posA == posB) cmp = 0;
					else cmp = -1;
				} else {
					cmp = -1;
				}
			}
			return cmp;
		}
		if (how == 'START_TO_START') return compareNodes(this.startNode, this.startPos, range.startNode, range.startPos);
		if (how == 'START_TO_END') return compareNodes(this.startNode, this.startPos, range.endNode, range.endPos);
		if (how == 'END_TO_START') return compareNodes(this.endNode, this.endPos, range.startNode, range.startPos);
		if (how == 'END_TO_END') return compareNodes(this.endNode, this.endPos, range.endNode, range.endPos);
	};
	this.collapsed = function() {
		return (this.startNode === this.endNode && this.startPos === this.endPos);
	};
	this.collapse = function(toStart) {
		if (toStart) {
			this.setEnd(this.startNode, this.startPos);
		} else {
			this.setStart(this.endNode, this.endPos);
		}
	};
	this.setTextStart = function(node, pos) {
		var textNode = node;
		KE.eachNode(node, function(n) {
			if (KE.util.getNodeType(n) == 3 && n.nodeValue.length > 0 || KE.util.getNodeType(n) == 88) {
				textNode = n;
				pos = 0;
				return false;
			}
			return true;
		});
		this.setStart(textNode, pos);
	};
	this.setStart = function(node, pos) {
		this.startNode = node;
		this.startPos = pos;
		if (this.endNode === null) {
			this.endNode = node;
			this.endPos = pos;
		}
	};
	this.setTextEnd = function(node, pos) {
		var textNode = node;
		KE.eachNode(node, function(n) {
			if (KE.util.getNodeType(n) == 3 && n.nodeValue.length > 0 || KE.util.getNodeType(n) == 88) {
				textNode = n;
				pos = KE.util.getNodeType(n) == 3 ? n.nodeValue.length : 0;
			}
			return true;
		});
		this.setEnd(textNode, pos);
	};
	this.setEnd = function(node, pos) {
		this.endNode = node;
		this.endPos = pos;
		if (this.startNode === null) {
			this.startNode = node;
			this.startPos = pos;
		}
	};
	this.selectNode = function(node) {
		this.setStart(node, 0);
		this.setEnd(node, node.nodeType == 1 ? 0 : node.nodeValue.length);
	};
	this.selectTextNode = function(node) {
		this.setTextStart(node, 0);
		this.setTextEnd(node, node.nodeType == 1 ? 0 : node.nodeValue.length);
	};
	this.extractContents = function(isDelete) {
		isDelete = (isDelete === undefined) ? true : isDelete;
		var thisRange = this;
		var startNode = this.startNode;
		var startPos = this.startPos;
		var endNode = this.endNode;
		var endPos = this.endPos;
		var extractTextNode = function(node, startPos, endPos) {
			var length = node.nodeValue.length;
			var cloneNode = node.cloneNode(true);
			var centerNode = cloneNode.splitText(startPos);
			centerNode.splitText(endPos - startPos);
			if (isDelete) {
				var center = node;
				if (startPos > 0) center = node.splitText(startPos);
				if (endPos < length) center.splitText(endPos - startPos);
				center.parentNode.removeChild(center);
			}
			return centerNode;
		};
		var noEndTagHash = KE.util.arrayToHash(KE.setting.noEndTags);
		var isStarted = false;
		var isEnd = false;
		var extractNodes = function(parent, frag) {
			if (KE.util.getNodeType(parent) != 1) return true;
			var node = parent.firstChild;
			while (node) {
				if (node == startNode) isStarted = true;
				if (node == endNode) isEnd = true;
				var nextNode = node.nextSibling;
				var type = node.nodeType;
				if (type == 1) {
					var range = new KE.range(doc);
					range.selectNode(node);
					var cmp = range.comparePoints('END_TO_END', thisRange);
					if (isStarted && (cmp < 0 || (cmp == 0 && noEndTagHash[node.nodeName.toLowerCase()] !== undefined))) {
						var cloneNode = node.cloneNode(true);
						frag.appendChild(cloneNode);
						if (isDelete) {
							node.parentNode.removeChild(node);
						}
					} else {
						var childFlag = node.cloneNode(false);
						if (noEndTagHash[childFlag.nodeName.toLowerCase()] === undefined) {
							frag.appendChild(childFlag);
							if (!extractNodes(node, childFlag)) return false;
						}
					}
				} else if (type == 3) {
					if (isStarted) {
						var textNode;
						if (node == startNode && node == endNode) {
							textNode = extractTextNode(node, startPos, endPos);
							frag.appendChild(textNode);
							return false;
						} else if (node == startNode) {
							textNode = extractTextNode(node, startPos, node.nodeValue.length);
							frag.appendChild(textNode);
						} else if (node == endNode) {
							textNode = extractTextNode(node, 0, endPos);
							frag.appendChild(textNode);
							return false;
						} else {
							textNode = extractTextNode(node, 0, node.nodeValue.length);
							frag.appendChild(textNode);
						}
					}
				}
				node = nextNode;
				if (isEnd) return false;
			}
			if (frag.innerHTML.replace(/<.*?>/g, '') === '' && frag.parentNode) {
				frag.parentNode.removeChild(frag);
			}
			return true;
		}
		var parentNode = this.getParentElement();
		var docFrag = parentNode.cloneNode(false);
		extractNodes(parentNode, docFrag);
		return docFrag;
	};
	this.cloneContents = function() {
		return this.extractContents(false);
	};
	this.getText = function() {
		var html = this.cloneContents().innerHTML;
		return html.replace(/<.*?>/g, "");
	};
};

KE.cmd = function(id) {
	this.doc = KE.g[id].iframeDoc;
	this.keSel = KE.g[id].keSel;
	this.keRange = KE.g[id].keRange;
	this.mergeAttributes = function(el, attr) {
		for (var i = 0, len = attr.length; i < len; i++) {
			KE.each(attr[i], function(key, value) {
				if (key.charAt(0) == '.') {
					var jsKey = KE.util.getJsKey(key.substr(1));
					el.style[jsKey] = value;
				} else {
					if (KE.browser.IE && KE.browser.VERSION < 8 && key == 'class') key = 'className';
					el.setAttribute(key, value);
				}
			});
		}
		return el;
	};
	this.wrapTextNode = function(node, startPos, endPos, element, attributes) {
		var length = node.nodeValue.length;
		var isFull = (startPos == 0 && endPos == length);
		var range = new KE.range(this.doc);
		range.selectTextNode(node.parentNode);
		if (isFull &&
			node.parentNode.tagName == element.tagName &&
			range.comparePoints('END_TO_END', this.keRange) <= 0 &&
			range.comparePoints('START_TO_START', this.keRange) >= 0) {
			this.mergeAttributes(node.parentNode, attributes);
			return node;
		} else {
			var el = element.cloneNode(true);
			if (isFull) {
				var cloneNode = node.cloneNode(true);
				el.appendChild(cloneNode);
				node.parentNode.replaceChild(el, node);
				return cloneNode;
			} else {
				var centerNode = node;
				if (startPos < endPos) {
					if (startPos > 0) centerNode = node.splitText(startPos);
					if (endPos < length) centerNode.splitText(endPos - startPos);
					var cloneNode = centerNode.cloneNode(true);
					el.appendChild(cloneNode);
					centerNode.parentNode.replaceChild(el, centerNode);
					return cloneNode;
				} else {
					if (startPos < length) {
						centerNode = node.splitText(startPos);
						centerNode.parentNode.insertBefore(el, centerNode);
					} else {
						if (centerNode.nextSibling) {
							centerNode.parentNode.insertBefore(el, centerNode.nextSibling);
						} else {
							centerNode.parentNode.appendChild(el);
						}
					}
					return el;
				}
			}
		}
	};
	this.wrap = function(tagName, attributes) {
		attributes = attributes || [];
		var self = this;
		this.keSel.focus();
		var element = KE.$$(tagName, this.doc);
		this.mergeAttributes(element, attributes);
		var keRange = this.keRange;
		var startNode = keRange.startNode;
		var startPos = keRange.startPos;
		var endNode = keRange.endNode;
		var endPos = keRange.endPos;
		var parentNode = keRange.getParentElement();
		if (KE.util.inMarquee(parentNode)) return;
		var isStarted = false;
		KE.eachNode(parentNode, function(node) {
			if (node == startNode) isStarted = true;
			if (node.nodeType == 1) {
				if (node == startNode && node == endNode) {
					if (KE.util.inArray(node.tagName.toLowerCase(), KE.g[id].noEndTags)) {
						if (startPos > 0) node.parentNode.appendChild(element);
						else node.parentNode.insertBefore(element, node);
					} else {
						node.appendChild(element);
					}
					keRange.selectNode(element);
					return false;
				} else if (node == startNode) {
					keRange.setStart(node, 0);
				} else if (node == endNode) {
					keRange.setEnd(node, 0);
					return false;
				}
			} else if (node.nodeType == 3) {
				if (isStarted) {
					if (node == startNode && node == endNode) {
						var rangeNode = self.wrapTextNode(node, startPos, endPos, element, attributes);
						keRange.selectNode(rangeNode);
						return false;
					} else if (node == startNode) {
						var rangeNode = self.wrapTextNode(node, startPos, node.nodeValue.length, element, attributes);
						keRange.setStart(rangeNode, 0);
					} else if (node == endNode) {
						var rangeNode = self.wrapTextNode(node, 0, endPos, element, attributes);
						keRange.setEnd(rangeNode, rangeNode.nodeType == 1 ? 0 : rangeNode.nodeValue.length);
						return false;
					} else {
						self.wrapTextNode(node, 0, node.nodeValue.length, element, attributes);
					}
				}
			}
			return true;
		});
		this.keSel.addRange(keRange);
	};
	this.getTopParent = function(tagNames, node) {
		var parent = null;
		while (node) {
			node = node.parentNode;
			if (KE.util.inArray(node.tagName.toLowerCase(), tagNames)) {
				parent = node;
			} else {
				break;
			}
		}
		return parent;
	};
	this.splitNodeParent = function(parent, node, pos) {
		var leftRange = new KE.range(this.doc);
		leftRange.selectNode(parent.firstChild);
		leftRange.setEnd(node, pos);
		var leftFrag = leftRange.extractContents();
		parent.parentNode.insertBefore(leftFrag, parent);
		return {left : leftFrag, right : parent};
	};
	this.remove = function(tags) {
		var self = this;
		var keRange = this.keRange;
		var startNode = keRange.startNode;
		var startPos = keRange.startPos;
		var endNode = keRange.endNode;
		var endPos = keRange.endPos;
		this.keSel.focus();
		if (KE.util.inMarquee(keRange.getParentElement())) return;
		var isCollapsed = (keRange.getText().replace(/\s+/g, '') === '');
		if (isCollapsed && !KE.browser.IE) return;
		var tagNames = [];
		KE.each(tags, function(key, val) {
			if (key != '*') tagNames.push(key);
		});
		var startParent = this.getTopParent(tagNames, startNode);
		var endParent = this.getTopParent(tagNames, endNode);
		if (startParent) {
			var startFrags = this.splitNodeParent(startParent, startNode, startPos);
			keRange.setStart(startFrags.right, 0);
			if (startNode == endNode && KE.util.getNodeTextLength(startFrags.right) > 0) {
				keRange.selectNode(startFrags.right);
				var range = new KE.range(this.doc);
				range.selectTextNode(startFrags.left);
				if (startPos > 0) endPos -= range.endNode.nodeValue.length;
				range.selectTextNode(startFrags.right);
				endNode = range.startNode;
			}
		}
		if (isCollapsed) {
			var node = keRange.startNode;
			if (node.nodeType == 1) {
				if (node.nodeName.toLowerCase() == 'br') return;
				keRange.selectNode(node);
			} else {
				return;
			}
		} else if (endParent) {
			var endFrags = this.splitNodeParent(endParent, endNode, endPos);
			keRange.setEnd(endFrags.left, 0);
			if (startParent == endParent) {
				keRange.setStart(endFrags.left, 0);
			}
		}
		var removeAttr = function(node, attr) {
			if (attr.charAt(0) == '.') {
				var jsKey = KE.util.getJsKey(attr.substr(1));
				node.style[jsKey] = '';
			} else {
				if (KE.browser.IE && KE.browser.VERSION < 8 && attr == 'class') attr = 'className';
				node.removeAttribute(attr);
			}
		};
		var nodeList = keRange.getNodeList();
		keRange.setTextStart(keRange.startNode, keRange.startPos);
		keRange.setTextEnd(keRange.endNode, keRange.endPos);
		for (var i = 0, length = nodeList.length; i < length; i++) {
			var node = nodeList[i];
			if (node.nodeType == 1) {
				var tagName = node.tagName.toLowerCase();
				if (tags[tagName]) {
					var attr = tags[tagName];
					for (var j = 0, len = attr.length; j < len; j++) {
						if (attr[j] == '*') {
							KE.util.removeParent(node);
							break;
						} else {
							removeAttr(node, attr[j]);
							var attrs = [];
							if (node.outerHTML) {
								attrHash = KE.util.getAttrList(node.outerHTML);
								KE.each(attrHash, function(key, val) {
									attrs.push({
										name : key,
										value : val
									});
								});
							} else {
								attrs = node.attributes;
							}
							if (attrs.length == 0) {
								KE.util.removeParent(node);
								break;
							} else if (attrs[0].name == 'style' && attrs[0].value === '') {
								KE.util.removeParent(node);
								break;
							}
						}
					}
				}
				if (tags['*']) {
					var attr = tags['*'];
					for (var j = 0, len = attr.length; j < len; j++) {
						removeAttr(node, attr[j]);
					}
				}
			}
		}
		try {
			this.keSel.addRange(keRange);
		} catch(e) {}
	};
};

KE.format = {
	getUrl : function(url, mode, host, pathname) {
		if (!mode) return url;
		mode = mode.toLowerCase();
		if (!KE.util.inArray(mode, ['absolute', 'relative', 'domain'])) return url;
		host = host || location.protocol + '//' + location.host;
		if (pathname === undefined) {
			var m = location.pathname.match(/^(\/.*)\//);
			pathname = m ? m[1] : '';
		}
		var matches = url.match(/^(\w+:\/\/[^\/]*)/);
		if (matches) {
			if (matches[1] !== host) return url;
		} else if (url.match(/^\w+:/)) {
			return url;
		}
		var getRealPath = function(path) {
			var parts = path.split('/');
			paths = [];
			for (var i = 0, len = parts.length; i < len; i++) {
				var part = parts[i];
				if (part == '..') {
					if (paths.length > 0) paths.pop();
				} else if (part !== '' && part != '.') {
					paths.push(part);
				}
			}
			return '/' + paths.join('/');
		};
		if (url.match(/^\//)) {
			url = host + getRealPath(url.substr(1));
		} else if (!url.match(/^\w+:\/\//)) {
			url = host + getRealPath(pathname + '/' + url);
		}
		if (mode == 'relative') {
			var getRelativePath = function(path, depth) {
				if (url.substr(0, path.length) === path) {
					var arr = [];
					for (var i = 0; i < depth; i++) {
						arr.push('..');
					}
					var prefix = '.';
					if (arr.length > 0) prefix += '/' + arr.join('/');
					if (pathname == '/') prefix += '/';
					return prefix + url.substr(path.length);
				} else {
					var m = path.match(/^(.*)\//);
					if (m) {
						return getRelativePath(m[1], ++depth);
					}
				}
			};
			url = getRelativePath(host + pathname, 0).substr(2);
		} else if (mode == 'absolute') {
			if (url.substr(0, host.length) === host) {
				url = url.substr(host.length);
			}
		}
		return url;
	},
	getHtml : function(html, htmlTags, urlType) {
		var isFilter = htmlTags ? true : false;
		html = html.replace(/(<pre[^>]*>)([\s\S]*?)(<\/pre>)/ig, function($0, $1, $2, $3){
			return $1 + $2.replace(/<br[^>]*>/ig, '\n') + $3;
		});
		var htmlTagHash = {};
		var fontSizeHash = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
		if (isFilter) {
			KE.each(htmlTags, function(key, val) {
				var arr = key.split(',');
				for (var i = 0, len = arr.length; i < len; i++) htmlTagHash[arr[i]] = KE.util.arrayToHash(val);
			});
		}
		var noEndTagHash = KE.util.arrayToHash(KE.setting.noEndTags);
		var inlineTagHash = KE.util.arrayToHash(KE.setting.inlineTags);
		var endlineTagHash = KE.util.arrayToHash(KE.setting.endlineTags);
		var re = /((?:\r\n|\n|\r)*)<(\/)?([\w-:]+)((?:\s+|(?:\s+[\w-:]+)|(?:\s+[\w-:]+=[^\s"'<>]+)|(?:\s+[\w-:]+="[^"]*")|(?:\s+[\w-:]+='[^']*'))*)(\/)?>((?:\r\n|\n|\r)*)/g;
		html = html.replace(re, function($0, $1, $2, $3, $4, $5, $6) {
			var startNewline = $1 || '';
			var startSlash = $2 || '';
			var tagName = $3.toLowerCase();
			var attr = $4 || '';
			var endSlash = $5 ? ' ' + $5 : '';
			var endNewline = $6 || '';
			if (isFilter && typeof htmlTagHash[tagName] == "undefined") return '';
			if (endSlash === '' && typeof noEndTagHash[tagName] != "undefined") endSlash = ' /';
			if (tagName in endlineTagHash) {
				if (startSlash || endSlash) endNewline = '\n';
			} else {
				if (endNewline) endNewline = ' ';
			}
			if (tagName !== 'script' && tagName !== 'style') {
				startNewline = '';
			}
			if (tagName === 'font') {
				var style = {}, styleStr = '';
				attr = attr.replace(/\s*([\w-:]+)=([^\s"'<>]+|"[^"]*"|'[^']*')/g, function($0, $1, $2) {
					var key = $1.toLowerCase();
					var val = $2 || '';
					val = val.replace(/^["']|["']$/g, '');
					if (key === 'color') {
						style['color'] = val;
						return ' ';
					}
					if (key === 'size') {
						style['font-size'] = fontSizeHash[parseInt(val) - 1] || '';
						return ' ';
					}
					if (key === 'face') {
						style['font-family'] = val;
						return ' ';
					}
					if (key === 'style') {
						styleStr = val;
						return ' ';
					}
					return $0;
				});
				if (styleStr && !/;$/.test(styleStr)) styleStr += ';';
				KE.each(style, function(key, val) {
					if (val !== '') { 
						if (/\s/.test(val)) val = "'" + val + "'";
						styleStr += key + ':' + val + ';';
					}
				});
				if (styleStr) attr += ' style="' + styleStr + '"';
				tagName = 'span';
			}
			if (attr !== '') {
				attr = attr.replace(/\s*([\w-:]+)=([^\s"'<>]+|"[^"]*"|'[^']*')/g, function($0, $1, $2) {
					var key = $1.toLowerCase();
					var val = $2 || '';
					if (isFilter) {
						if (key.charAt(0) === "." || (key !== "style" && typeof htmlTagHash[tagName][key] == "undefined")) return ' ';
					}
					if (val === '') {
						val = '""';
					} else {
						if (key === "style") {
							val = val.substr(1, val.length - 2);
							val = val.replace(/\s*([^\s]+?)\s*:(.*?)(;|$)/g, function($0, $1, $2) {
								var k = $1.toLowerCase();
								if (isFilter) {
									if (typeof htmlTagHash[tagName]['style'] == "undefined" && typeof htmlTagHash[tagName]['.' + k] == "undefined") return '';
								}
								var v = KE.util.trim($2);
								v = KE.util.rgbToHex(v);
								return k + ':' + v + ';';
							});
							val = KE.util.trim(val);
							if (val === '') return '';
							val = '"' + val + '"';
						}
						if (KE.util.inArray(key, ['src', 'href'])) {
							if (val.charAt(0) === '"') {
								val = val.substr(1, val.length - 2);
							}
							val = KE.format.getUrl(val, urlType);
						}
						if (val.charAt(0) !== '"') val = '"' + val + '"';
					}
					return ' ' + key + '=' + val + ' ';
				});
				attr = attr.replace(/\s+(checked|selected|disabled|readonly)(\s+|$)/ig, function($0, $1) {
					var key = $1.toLowerCase();
					if (isFilter) {
						if (key.charAt(0) === "." || typeof htmlTagHash[tagName][key] == "undefined") return ' ';
					}
					return ' ' + key + '="' + key + '"' + ' ';
				});
				attr = KE.util.trim(attr);
				attr = attr.replace(/\s+/g, ' ');
				if (attr) attr = ' ' + attr;
				return startNewline + '<' + startSlash + tagName + attr + endSlash + '>' + endNewline;
			} else {
				return startNewline + '<' + startSlash + tagName + endSlash + '>' + endNewline;
			}
		});
		if (!KE.browser.IE) {
			html = html.replace(/<p><br\s+\/>\n<\/p>/ig, '<p>&nbsp;</p>');
			html = html.replace(/<br\s+\/>\n<\/p>/ig, '</p>');
		}
		var reg = KE.setting.inlineTags.join('|');
		var trimHtml = function(inHtml) {
			var outHtml = inHtml.replace(new RegExp('<(' + reg + ')[^>]*><\\/(' + reg + ')>', 'ig'), function($0, $1, $2) {
				if ($1 == $2) return '';
				else return $0;
			});
			if (inHtml !== outHtml) outHtml = trimHtml(outHtml);
			return outHtml;
		};
		return KE.util.trim(trimHtml(html));
	}
};

KE.addClass = function(el, className) {
	if (typeof el == 'object') {
		var cls = el.className;
		if (cls) {
			if ((' ' + cls + ' ').indexOf(' ' + className + ' ') < 0) {
				el.className = cls + ' ' + className;
			}
		} else {
			el.className = className;
		}
	} else if (typeof el == 'string') {
		if (/\s+class\s*=/.test(el)) {
			el = el.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function($0, $1, $2, $3) {
				if ((' ' + $2 + ' ').indexOf(' ' + className + ' ') < 0) {
					return $2 === '' ? $1 + className + $3 : $1 + $2 + ' ' + className + $3;
				} else {
					return $0;
				}
			});
		} else {
			el = el.substr(0, el.length - 1) + ' class="' + className + '">';
		}
	}
	return el;
};

KE.removeClass = function(el, className) {
	var cls = el.className || '';
	cls = ' ' + cls + ' ';
	className = ' ' + className + ' ';
	if (cls.indexOf(className) >= 0) {
		cls = KE.util.trim(cls.replace(new RegExp(className, 'ig'), ''));
		if (cls === '') {
			var key = el.getAttribute('class') ? 'class' : 'className';
			el.removeAttribute(key);
		} else {
			el.className = cls;
		}
	}
	return el;
};

KE.getComputedStyle = function(el, key) {
	var doc = el.ownerDocument,
		win = doc.parentWindow || doc.defaultView,
		jsKey = KE.util.getJsKey(key),
		val = '';
	if (win.getComputedStyle) {
		var style = win.getComputedStyle(el, null);
		val = style[jsKey] || style.getPropertyValue(key) || el.style[jsKey];
	} else if (el.currentStyle) {
		val = el.currentStyle[jsKey] || el.style[jsKey];
	}
	return val;
};

KE.getCommonAncestor = function(keSel, tagName) {
	var range = keSel.range,
		keRange = keSel.keRange,
		startNode = keRange.startNode,
		endNode = keRange.endNode;
	if (KE.util.inArray(tagName, ['table', 'td', 'tr'])) {
		if (KE.browser.IE) {
			if (range.item) {
				if (range.item(0).nodeName.toLowerCase() === tagName) {
					startNode = endNode = range.item(0);
				}
			} else {
				var rangeA = range.duplicate();
				rangeA.collapse(true);
				var rangeB = range.duplicate();
				rangeB.collapse(false);
				startNode = rangeA.parentElement();
				endNode = rangeB.parentElement();
			}
		} else {
			var rangeA = range.cloneRange();
			rangeA.collapse(true);
			var rangeB = range.cloneRange();
			rangeB.collapse(false);
			startNode = rangeA.startContainer;
			endNode = rangeB.startContainer;
		}
	}
	function find(node) {
		while (node) {
			if (node.nodeType == 1) {
				if (node.tagName.toLowerCase() === tagName) return node;
			}
			node = node.parentNode;
		}
		return null;
	};
	var start = find(startNode),
		end = find(endNode);
	if (start && end && start === end) {
		return start;
	}
	return null;
};

KE.queryCommandValue = function(doc, cmd) {
	cmd = cmd.toLowerCase();
	function commandValue() {
		var val = doc.queryCommandValue(cmd);
		if (typeof val !== 'string') val = '';
		return val;
	}
	var val = '';
	if (cmd === 'fontname') {
		val = commandValue();
		val = val.replace(/['"]/g, '');
	} else if (cmd === 'formatblock') {
		val = commandValue();
		if (val === '') {
			var keSel = new KE.selection(doc);
			var el = KE.getCommonAncestor(keSel, 'h1');
			if (!el) el = KE.getCommonAncestor(keSel, 'h2');
			if (!el) el = KE.getCommonAncestor(keSel, 'h3');
			if (!el) el = KE.getCommonAncestor(keSel, 'h4');
			if (!el) el = KE.getCommonAncestor(keSel, 'p');
			if (el) val = el.nodeName;
		}
		if (val === 'Normal') val = 'p';
	} else if (cmd === 'fontsize') {
		var keSel = new KE.selection(doc);
		var el = KE.getCommonAncestor(keSel, 'span');
		if (el) val = KE.getComputedStyle(el, 'font-size');
	} else if (cmd === 'textcolor') {
		var keSel = new KE.selection(doc);
		var el = KE.getCommonAncestor(keSel, 'span');
		if (el) val = KE.getComputedStyle(el, 'color');
		val = KE.util.rgbToHex(val);
		if (val === '') val = 'default';
	} else if (cmd === 'bgcolor') {
		var keSel = new KE.selection(doc);
		var el = KE.getCommonAncestor(keSel, 'span');
		if (el) val = KE.getComputedStyle(el, 'background-color');
		val = KE.util.rgbToHex(val);
		if (val === '') val = 'default';
	}
	return val.toLowerCase();
};

KE.util = {
	getDocumentElement : function(doc) {
		doc = doc || document;
		return (doc.compatMode != "CSS1Compat") ? doc.body : doc.documentElement;
	},
	getDocumentHeight : function(doc) {
		var el = this.getDocumentElement(doc);
		return Math.max(el.scrollHeight, el.clientHeight);
	},
	getDocumentWidth : function(doc) {
		var el = this.getDocumentElement(doc);
		return Math.max(el.scrollWidth, el.clientWidth);
	},
	createTable : function(doc) {
		var table = KE.$$('table', doc);
		table.cellPadding = 0;
		table.cellSpacing = 0;
		table.border = 0;
		return {table: table, cell: table.insertRow(0).insertCell(0)};
	},
	loadStyle : function(path) {
		var link = KE.$$('link');
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', path);
		document.getElementsByTagName("head")[0].appendChild(link);
	},
	getAttrList : function(tag) {
		var re = /\s+(?:([\w-:]+)|(?:([\w-:]+)=([\w-:]+))|(?:([\w-:]+)="([^"]*)")|(?:([\w-:]+)='([^']*)'))(?=(?:\s|\/|>)+)/g;
		var arr, key, val, list = {};
		while ((arr = re.exec(tag))) {
			key = arr[1] || arr[2] || arr[4] || arr[6];
			val = arr[1] || (arr[2] ? arr[3] : (arr[4] ? arr[5] : arr[7]));
			list[key] = val;
		}
		return list;
	},
	inArray : function(str, arr) {
		for (var i = 0; i < arr.length; i++) {if (str == arr[i]) return true;}
		return false;
	},
	trim : function(str) {
		return str.replace(/^\s+|\s+$/g, "");
	},
	getJsKey : function(key) {
		var arr = key.split('-');
		key = '';
		for (var i = 0, len = arr.length; i < len; i++) {
			key += (i > 0) ? arr[i].charAt(0).toUpperCase() + arr[i].substr(1) : arr[i];
		}
		return key;
	},
	arrayToHash : function(arr) {
		var hash = {};
		for (var i = 0, len = arr.length; i < len; i++) hash[arr[i]] = 1;
		return hash;
	},
	escape : function(str) {
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/"/g, '&quot;');
		return str;
	},
	unescape : function(str) {
		str = str.replace(/&lt;/g, '<');
		str = str.replace(/&gt;/g, '>');
		str = str.replace(/&quot;/g, '"');
		str = str.replace(/&amp;/g, '&');
		return str;
	},
	getScrollPos : function() {
		var x, y;
		if (KE.browser.IE || KE.browser.OPERA) {
			var el = this.getDocumentElement();
			x = el.scrollLeft;
			y = el.scrollTop;
		} else {
			x = window.scrollX;
			y = window.scrollY;
		}
		return {x : x, y : y};
	},
	getElementPos : function(el) {
		var x = 0, y = 0;
		if (el.getBoundingClientRect) {
			var box = el.getBoundingClientRect();
			var pos = this.getScrollPos();
			x = box.left + pos.x;
			y = box.top + pos.y;
		} else {
            x = el.offsetLeft;
            y = el.offsetTop;
            var parent = el.offsetParent;
            while (parent) {
                x += parent.offsetLeft;
                y += parent.offsetTop;
                parent = parent.offsetParent;
            }
		}
		return {x : x, y : y};
	},
	getCoords : function(ev) {
		ev = ev || window.event;
		return {
			x : ev.clientX,
			y : ev.clientY
		};
	},
	setOpacity : function(el, opacity) {
		if (typeof el.style.opacity == "undefined") {
			el.style.filter = (opacity == 100) ? "" : "alpha(opacity=" + opacity + ")";
		} else {
			el.style.opacity = (opacity == 100) ? "" : "0." + opacity.toString();
		}
	},
	getIframeDoc : function(iframe) {
		return iframe.contentDocument || iframe.contentWindow.document;
	},
	rgbToHex : function(str) {
		function hex(s) {
			s = parseInt(s).toString(16);
			return s.length > 1 ? s : '0' + s;
		};
		return str.replace(/rgb\s*?\(\s*?(\d+)\s*?,\s*?(\d+)\s*?,\s*?(\d+)\s*?\)/ig,
			function($0, $1, $2, $3) {
				return '#' + hex($1) + hex($2) + hex($3);
			}
		);
	},
	parseJson : function (text) {
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		cx.lastIndex = 0;
		if (cx.test(text)) {
			text = text.replace(cx, function (a) {
				return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			});
		}
		if (/^[\],:{}\s]*$/.
		test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
			return eval('(' + text + ')');
		}
		throw 'JSON parse error';
	},
	createRange : function(doc) {
		return doc.createRange ? doc.createRange() : doc.body.createTextRange();
	},
	getNodeType : function(node) {
		return (node.nodeType == 1 && KE.util.inArray(node.tagName.toLowerCase(), KE.setting.noEndTags)) ? 88 : node.nodeType;
	},
	inMarquee : function(node) {
		var n = node;
		while (n) {
			if (n.nodeName.toLowerCase() === 'marquee') return true;
			n = n.parentNode;
		}
		return false;
	},
	moveToElementText : function (range, el) {
		if (!this.inMarquee(el)) range.moveToElementText(el);
	},
	getNodeTextLength : function(node) {
		var type = KE.util.getNodeType(node);
		if (type == 1) {
			var html = node.innerHTML;
			return html.replace(/<.*?>/ig, "").length;
		} else if (type == 3) {
			return node.nodeValue.length;
		}
	},
	getNodeStartRange : function(doc, node) {
		var range = KE.util.createRange(doc);
		var type = node.nodeType;
		if (type == 1) {
			KE.util.moveToElementText(range, node);
			return range;
		} else if (type == 3) {
			var offset = 0;
			var sibling = node.previousSibling;
			while (sibling) {
				if (sibling.nodeType == 1) {
					var nodeRange = KE.util.createRange(doc);
					KE.util.moveToElementText(nodeRange, sibling);
					range.setEndPoint('StartToEnd', nodeRange);
					range.moveStart('character', offset);
					return range;
				} else if (sibling.nodeType == 3) {
					offset += sibling.nodeValue.length;
				}
				sibling = sibling.previousSibling;
			}
			KE.util.moveToElementText(range, node.parentNode);
			range.moveStart('character', offset);
			return range;
		}
	},
	removeParent : function(parent) {
		if (parent.hasChildNodes) {
			var node = parent.firstChild;
			while (node) {
				var nextNode = node.nextSibling;
				parent.parentNode.insertBefore(node, parent);
				node = nextNode;
			}
		}
		parent.parentNode.removeChild(parent);
	},
	pluginLang : function(pluginName, doc) {
		KE.each(KE.lang.plugins[pluginName], function (key, val) {
			var span = KE.$('lang.' + key, doc);
			if (span) {
				span.parentNode.insertBefore(doc.createTextNode(val), span);
				span.parentNode.removeChild(span);
			}
		});
	},
	drag : function(id, mousedownObj, moveObj, func) {
		var g = KE.g[id];
		mousedownObj.onmousedown = function(e) {
			var self = this;
			e = e || window.event;
			var pos = KE.util.getCoords(e);
			var objTop = parseInt(moveObj.style.top);
			var objLeft = parseInt(moveObj.style.left);
			var objWidth = moveObj.style.width;
			var objHeight = moveObj.style.height;
			if (objWidth.match(/%$/)) objWidth = moveObj.offsetWidth + 'px';
			if (objHeight.match(/%$/)) objHeight = moveObj.offsetHeight + 'px';
			objWidth = parseInt(objWidth);
			objHeight = parseInt(objHeight);
			var mouseTop = pos.y;
			var mouseLeft = pos.x;
			var scrollPos = KE.util.getScrollPos();
			var scrollTop = scrollPos.y;
			var scrollLeft = scrollPos.x;
			var dragFlag = true;
			function moveListener(e) {
				if (dragFlag) {
					var pos = KE.util.getCoords(e);
					var scrollPos = KE.util.getScrollPos();
					var top = parseInt(pos.y - mouseTop - scrollTop + scrollPos.y);
					var left = parseInt(pos.x - mouseLeft - scrollLeft + scrollPos.x);
					func(objTop, objLeft, objWidth, objHeight, top, left);
				}
			}
			var iframePos = KE.util.getElementPos(g.iframe);
			function iframeMoveListener(e) {
				if (dragFlag) {
					var pos = KE.util.getCoords(e, g.iframeDoc);
					var top = parseInt(iframePos.y + pos.y - mouseTop - scrollTop);
					var left = parseInt(iframePos.x + pos.x - mouseLeft - scrollLeft);
					func(objTop, objLeft, objWidth, objHeight, top, left);
				}
			}
			var selectListener = function() { return false; };
			function upListener(e) {
				dragFlag = false;
				if (self.releaseCapture) self.releaseCapture();
				KE.event.remove(document, 'mousemove', moveListener);
				KE.event.remove(document, 'mouseup', upListener);
				KE.event.remove(g.iframeDoc, 'mousemove', iframeMoveListener);
				KE.event.remove(g.iframeDoc, 'mouseup', upListener);
				KE.event.remove(document, 'selectstart', selectListener);
				KE.event.stop(e);
				return false;
			}
			KE.event.add(document, 'mousemove', moveListener);
			KE.event.add(document, 'mouseup', upListener);
			KE.event.add(g.iframeDoc, 'mousemove', iframeMoveListener);
			KE.event.add(g.iframeDoc, 'mouseup', upListener);
			KE.event.add(document, 'selectstart', selectListener);
			if (self.setCapture) self.setCapture();
			KE.event.stop(e);
			return false;
		};
	},
	resize : function(id, width, height, isCheck, isResizeWidth) {
		isResizeWidth = (typeof isResizeWidth == "undefined") ? true : isResizeWidth;
		var g = KE.g[id];
		if (!g.container) return;
		if (isCheck && (parseInt(width) <= g.minWidth || parseInt(height) <= g.minHeight)) return;
		if (isResizeWidth) g.container.style.width = width;
		g.container.style.height = height;
		var diff = parseInt(height) - g.toolbarHeight - g.statusbarHeight;
		if (diff >= 0) {
			g.iframe.style.height = diff + 'px';
			g.newTextarea.style.height = (((KE.browser.IE && KE.browser.VERSION < 8) || document.compatMode != 'CSS1Compat') ? diff - 2 : diff) + 'px';
		}
	},
	hideLoadingPage : function(id) {
		var stack = KE.g[id].dialogStack;
		var dialog = stack[stack.length - 1];
		dialog.loading.style.display = 'none';
		dialog.iframe.style.display = '';
	},
	showLoadingPage : function(id) {
		var stack = KE.g[id].dialogStack;
		var dialog = stack[stack.length - 1];
		dialog.loading.style.display = '';
		dialog.iframe.style.display = 'none';
	},
	setDefaultPlugin : function(id) {
		var items = [
			'selectall', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
			'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
			'superscript', 'bold', 'italic', 'underline', 'strikethrough'
		];
		var shortcuts = {
			bold : 'B',
			italic : 'I',
			underline : 'U'
		};
		for (var i = 0; i < items.length; i++) {
			var item = items[i],
				plugin = {};
			if (item in shortcuts) {
				plugin.init = (function(item) {
					return function(id) {
						KE.event.ctrl(KE.g[id].iframeDoc, shortcuts[item], function(e) {
							KE.plugin[item].click(id);
							KE.util.focus(id);
						}, id);
					};
				})(item);
			}
			plugin.click = (function(item) {
				return function(id) {
					KE.util.execCommand(id, item, null);
				};
			})(item);
			KE.plugin[item] = plugin;
		}
	},
	getFullHtml : function(id) {
		var html = '<html>';
		html += '<head>';
		html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
		html += '<title>KindEditor</title>';
		html += '<link href="' + KE.g[id].skinsPath + 'common/editor.css?ver=' + escape(KE.version) + '" rel="stylesheet" type="text/css" />';
		var cssPath = KE.g[id].cssPath;
		if (typeof cssPath == 'string') cssPath = [cssPath];
		for (var i = 0, len = cssPath.length; i < len; i++) {
			if (cssPath[i] !== '') html += '<link href="' + cssPath[i] + '" rel="stylesheet" type="text/css" />';
		}
		html += '</head>';
		html += '<body class="ke-content"></body>';
		html += '</html>';
		return html;
	},
	getMediaType : function(src) {
		if (src.match(/\.(rm|rmvb)(\?|$)/i)) return 'rm';
		else if (src.match(/\.(swf|flv)(\?|$)/i)) return 'flash';
		else return 'media';
	},
	getMediaImage : function(id, type, attrs) {
		var width = attrs.width;
		var height = attrs.height;
		type = type || this.getMediaType(attrs.src);
		var srcTag = this.getMediaEmbed(attrs);
		var style = '';
		if (width > 0) style += 'width:' + width + 'px;';
		if (height > 0) style += 'height:' + height + 'px;';
		var className = 'ke-' + type;
		var html = '<img class="' + className + '" src="' + KE.g[id].skinsPath + 'common/blank.gif" ';
		if (style !== '') html += 'style="' + style + '" ';
		html += 'kesrctag="' + escape(srcTag) + '" alt="" />';
		return html;
	},
	getMediaEmbed : function(attrs) {
		var html = '<embed ';
		KE.each(attrs, function(key, val) {
			html += key + '="' + val + '" ';
		});
		html += '/>';
		return html;
	},
	execGetHtmlHooks : function(id, html) {
		var hooks = KE.g[id].getHtmlHooks;
		for (var i = 0, len = hooks.length; i < len; i++) {
			html = hooks[i](html);
		}
		return html;
	},
	execSetHtmlHooks : function(id, html) {
		var hooks = KE.g[id].setHtmlHooks;
		for (var i = 0, len = hooks.length; i < len; i++) {
			html = hooks[i](html);
		}
		return html;
	},
	execOnchangeHandler : function(id) {
		var handlers = KE.g[id].onchangeHandlerStack;
		for (var i = 0, len = handlers.length; i < len; i++) {
			handlers[i]();
		}
	},
	toData : function(id, srcData) {
		var g = KE.g[id];
		var html = this.execGetHtmlHooks(id, srcData);
		html = html.replace(/^\s*<br[^>]*>\s*$/ig, '');
		html = html.replace(/^\s*<p>\s*&nbsp;\s*<\/p>\s*$/ig, '');
		if (g.filterMode) {
			return KE.format.getHtml(html, g.htmlTags, g.urlType);
		} else {
			return KE.format.getHtml(html, null, g.urlType);
		}
	},
	getData : function(id, wyswygMode) {
		var g = KE.g[id];
		wyswygMode = (wyswygMode === undefined) ? g.wyswygMode : wyswygMode;
		if (!wyswygMode) {
			this.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, g.newTextarea.value));
		}
		return this.toData(id, g.iframeDoc.body.innerHTML);
	},
	getSrcData : function(id) {
		var g = KE.g[id];
		if (!g.wyswygMode) {
			this.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, g.newTextarea.value));
		}
		return g.iframeDoc.body.innerHTML;
	},
	getPureData : function(id) {
		return this.extractText(this.getData(id));
	},
	extractText : function(str) {
		str = str.replace(/<(?!img|embed).*?>/ig, '');
		str = str.replace(/&nbsp;/ig, ' ');
		return str;
	},
	isEmpty : function(id) {
		return this.getPureData(id).replace(/\r\n|\n|\r/, '').replace(/^\s+|\s+$/, '') === '';
	},
	setData : function(id) {
		var g = KE.g[id];
		if (g.srcTextarea) g.srcTextarea.value = this.getData(id);
	},
	focus : function(id) {
		var g = KE.g[id];
		if (g.wyswygMode) {
			g.iframeWin.focus();
		} else {
			g.newTextarea.focus();
		}
	},
	click : function(id, cmd) {
		this.focus(id);
		KE.hideMenu(id);
		KE.plugin[cmd].click(id);
	},
	selection : function(id) {
		if (!KE.browser.IE || !KE.g[id].keRange) {
			this.setSelection(id);
		}
	},
	setSelection : function(id) {
		var g = KE.g[id];
		var keSel = new KE.selection(g.iframeDoc);
		if (!KE.browser.IE || keSel.range.item || keSel.range.parentElement().ownerDocument === g.iframeDoc) {
			g.keSel = keSel;
			g.keRange = g.keSel.keRange;
			g.sel = g.keSel.sel;
			g.range = g.keSel.range;
		}
	},
	select : function(id) {
		if (KE.browser.IE && KE.g[id].wyswygMode && KE.g[id].range) KE.g[id].range.select();
	},
	execCommand : function(id, cmd, value) {
		KE.util.focus(id);
		KE.util.select(id);
		try {
			KE.g[id].iframeDoc.execCommand(cmd, false, value);
		} catch(e) {}
		KE.toolbar.updateState(id);
		KE.util.execOnchangeHandler(id);
	},
	innerHtml : function(el, html) {
		if (KE.browser.IE) {
			el.innerHTML = '<img id="__ke_temp_tag__" width="0" height="0" />' + html;
			var temp = KE.$('__ke_temp_tag__', el.ownerDocument);
			if (temp) temp.parentNode.removeChild(temp);
		} else {
			el.innerHTML = html;
		}
	},
	pasteHtml : function(id, html, isStart) {
		var g = KE.g[id];
		var imgStr = '<img id="__ke_temp_tag__" width="0" height="0" />';
		if (isStart) html = imgStr + html;
		else html += imgStr;
		if (KE.browser.IE) {
			if (g.range.item) g.range.item(0).outerHTML = html;
			else g.range.pasteHTML(html);
		} else {
			g.range.deleteContents();
			var frag = g.range.createContextualFragment(html);
			g.range.insertNode(frag);
		}
		var node = KE.$('__ke_temp_tag__', g.iframeDoc);
		var blank = g.iframeDoc.createTextNode('');
		node.parentNode.replaceChild(blank, node);
		g.keRange.selectNode(blank);
		g.keSel.addRange(g.keRange);
	},
	insertHtml : function(id, html) {
		if (html === '') return;
		var g = KE.g[id];
		if (!g.wyswygMode) return;
		if (!g.range) return;
		html = this.execSetHtmlHooks(id, html);
		if (KE.browser.IE) {
			this.select(id);
			if (g.range.item) {
				try {
					g.range.item(0).outerHTML = html;
				} catch(e) {
					var el = g.range.item(0);
					var parent = el.parentNode;
					parent.removeChild(el);
					if (parent.nodeName.toLowerCase() != 'body') parent = parent.parentNode;
					this.innerHtml(parent, html + parent.innerHTML);
				}
			} else {
				g.range.pasteHTML(html);
			}
		} else if (KE.browser.GECKO && KE.browser.VERSION < 3) {
			this.execCommand(id, 'inserthtml', html);
			return;
		} else {
			this.pasteHtml(id, html);
		}
		KE.util.execOnchangeHandler(id);
	},
	setFullHtml : function(id, html) {
		var g = KE.g[id];
		if (!KE.browser.IE && html === '') html = '<br />';
		var html = KE.util.execSetHtmlHooks(id, html);
		this.innerHtml(g.iframeDoc.body, html);
		if (!g.wyswygMode) g.newTextarea.value = KE.util.getData(id, true);
		KE.util.execOnchangeHandler(id);
	},
	selectImageWebkit : function(id, e, isSelection) {
		if (KE.browser.WEBKIT) {
			var target = e.srcElement || e.target;
			if (target.tagName.toLowerCase() == 'img') {
				if (isSelection) KE.util.selection(id);
				var range = KE.g[id].keRange;
				range.selectNode(target);
				KE.g[id].keSel.addRange(range);
			}
		}
	},
	addTabEvent : function(id) {
		KE.event.add(KE.g[id].iframeDoc, 'keydown', function(e) {
			if (e.keyCode == 9) {
				KE.util.setSelection(id);
				KE.util.insertHtml(id, '&nbsp;&nbsp;&nbsp;&nbsp;');
				KE.event.stop(e);
				return false;
			}
		}, id);
	},
	addContextmenuEvent : function(id) {
		var g = KE.g[id];
		if (g.contextmenuItems.length == 0) return;
		KE.event.add(g.iframeDoc, 'contextmenu', function(e){
			KE.hideMenu(id);
			KE.util.setSelection(id);
			KE.util.selectImageWebkit(id, e, false);
			var maxWidth = 0;
			var items = [];
			for (var i = 0, len = g.contextmenuItems.length; i < len; i++) {
				var item = g.contextmenuItems[i];
				if (item === '-') {
					items.push(item);
				} else if (item.cond && item.cond(id)) {
					items.push(item);
					if (item.options) {
						var width = parseInt(item.options.width) || 0;
						if (width > maxWidth) maxWidth = width;
					}
				}
				prevItem = item;
			}
			while (items.length > 0 && items[0] === '-') {
				items.shift();
			}
			while (items.length > 0 && items[items.length - 1] === '-') {
				items.pop();
			}
			var prevItem = null;
			for (var i = 0, len = items.length; i < len; i++) {
				if (items[i] === '-' && prevItem === '-') delete items[i];
				prevItem = items[i] || null;
			}
			if (items.length > 0) {
				var menu = new KE.menu({
					id : id,
					event : e,
					type : 'contextmenu',
					width : maxWidth
				});
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (!item) continue;
					if (item === '-') {
						if (i < len - 1) menu.addSeparator();
					} else {
						menu.add(item.text, (function(item) {
							return function() {
								item.click(id, menu);
							};
						})(item), item.options);
					}
				}
				menu.show();
				KE.event.stop(e);
				return false;
			}
			return true;
		}, id);
	},
	addNewlineEvent : function(id) {
		var g = KE.g[id];
		if (KE.browser.IE && g.newlineTag.toLowerCase() != 'br') return;
		if (KE.browser.GECKO && KE.browser.VERSION < 3 && g.newlineTag.toLowerCase() != 'p') return;
		if (KE.browser.OPERA) return;
		KE.event.add(g.iframeDoc, 'keydown', function(e) {
			if (e.keyCode != 13 || e.shiftKey || e.ctrlKey || e.altKey) return true;
			KE.util.setSelection(id);
			var parent = g.keRange.getParentElement();
			if (KE.util.inMarquee(parent)) return;
			var tagName = parent.tagName.toLowerCase();
			if (g.newlineTag.toLowerCase() == 'br') {
				if (!KE.util.inArray(tagName, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])) {
					KE.util.pasteHtml(id, '<br />');
					var nextNode = g.keRange.startNode.nextSibling;
					if (KE.browser.IE) {
						if (!nextNode) KE.util.pasteHtml(id, '<br />', true);
					} else if (KE.browser.WEBKIT) {
						if (!nextNode) {
							KE.util.pasteHtml(id, '<br />', true);
						} else {
							var range = new KE.range(g.iframeDoc);
							range.selectNode(nextNode.parentNode);
							range.setStart(nextNode, 0);
							if (range.cloneContents().innerHTML.replace(/<(?!img|embed).*?>/ig, '') === '') {
								KE.util.pasteHtml(id, '<br />', true);
							}
						}
					}
					KE.event.stop(e);
					return false;
				}
			} else {
				if (!KE.util.inArray(tagName, ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'div', 'li'])) {
					KE.util.execCommand(id, 'formatblock', '<P>');
				}
			}
			return true;
		}, id);
	}
};

KE.layout = {
	hide : function(id) {
		var g = KE.g[id];
		KE.hideMenu(id);
		var stack = g.dialogStack;
		while (stack.length > 0) {
			var dialog = stack[stack.length - 1];
			dialog.hide();
		}
		g.maskDiv.style.display = 'none';
	}
};

KE.hideMenu = function(id) {
	var g = KE.g[id];
	g.hideDiv.innerHTML = '';
	g.hideDiv.style.display = 'none';
};

KE.colorpicker = function(arg) {
	var wrapper;
	var x = arg.x || 0;
	var y = arg.y || 0;
	var z = arg.z || 0;
	var colors = arg.colors || KE.setting.colorTable;
	var doc = arg.doc || document;
	var onclick = arg.onclick;
	var selectedColor = (arg.selectedColor || '').toLowerCase();
	function init() {
		wrapper = KE.$$('div');
		wrapper.className = 'ke-colorpicker';
		wrapper.style.top = y + 'px';
		wrapper.style.left = x + 'px';
		wrapper.style.zIndex = z;
	}
	init.call(this);
	this.remove = function() {
		doc.body.removeChild(wrapper);
	};
	this.getElement = function() {
		function addAttr(cell, color, cls) {
			if (selectedColor === color.toLowerCase()) cls += ' ke-colorpicker-cell-selected';
			cell.className = cls;
			cell.title = color || KE.lang['noColor'];
			cell.onmouseover = function() { this.className = cls + ' ke-colorpicker-cell-on'; };
			cell.onmouseout = function() { this.className = cls; };
			cell.onclick = function() { onclick(color); };
			if (color) {
				var div = KE.$$('div');
				div.className = 'ke-colorpicker-cell-color';
				div.style.backgroundColor = color;
				cell.appendChild(div);
			} else {
				cell.innerHTML = KE.lang['noColor'];
			}
		}
		var table = KE.$$('table');
		table.className = 'ke-colorpicker-table';
		table.cellPadding = 0;
		table.cellSpacing = 0;
		table.border = 0;
		var row = table.insertRow(0),
			cell = row.insertCell(0);
		cell.colSpan = colors[0].length;
		addAttr(cell, '', 'ke-colorpicker-cell-top');
		for (var i = 0; i < colors.length; i++) {
			var row = table.insertRow(i + 1);
			for (var j = 0; j < colors[i].length; j++) {
				var color = colors[i][j],
					cell = row.insertCell(j);
				addAttr(cell, color, 'ke-colorpicker-cell');
			}
		}
		return table;
	};
	this.create = function() {
		wrapper.appendChild(this.getElement());
		KE.event.bind(wrapper, 'click', function(e){});
		KE.event.bind(wrapper, 'mousedown', function(e){});
		doc.body.appendChild(wrapper);
	};
};

KE.menu = function(arg){
	function getPos(width, height) {
		var id = arg.id;
		var x = 0;
		var y = 0;
		if (this.type == 'menu') {
			var obj = KE.g[id].toolbarIcon[arg.cmd];
			var pos = KE.util.getElementPos(obj[0]);
			x = pos.x;
			y = pos.y + obj[0].offsetHeight;
		} else {
			var pos = KE.util.getCoords(arg.event);
			var iframePos = KE.util.getElementPos(KE.g[id].iframe);
			x = pos.x + iframePos.x;
			y = pos.y + iframePos.y + 5;
		}
		if (width > 0 || height > 0) {
			var scrollPos = KE.util.getScrollPos();
			var docEl = KE.util.getDocumentElement();
			var maxLeft = scrollPos.x + docEl.clientWidth - width - 2;
			if (x > maxLeft) x = maxLeft;
		}
		return {x : x, y : y};
	};
	function init() {
		var width = arg.width;
		this.type = (arg.type && arg.type == 'contextmenu') ? arg.type : 'menu';
		var div = KE.$$('div');
		div.className = 'ke-' + this.type;
		div.setAttribute('name', arg.cmd);
		var pos = getPos.call(this, 0, 0);
		div.style.top = pos.y + 'px';
		div.style.left = pos.x + 'px';
		if (arg.width) div.style.width = (/^\d+$/.test(width)) ? width + 'px' : width;
		KE.event.bind(div, 'click', function(e){}, arg.id);
		KE.event.bind(div, 'mousedown', function(e){}, arg.id);
		this.div = div;
	};
	init.call(this);
	this.add = function(html, event, options) {
		var height, iconHtml, checked = false;
		if (options !== undefined) {
			height = options.height;
			iconHtml = options.iconHtml;
			checked = options.checked;
		}
		var self = this;
		var cDiv = KE.$$('div');
		cDiv.className = 'ke-' + self.type + '-item';
		if (height) cDiv.style.height = height;
		var left = KE.$$('div');
		left.className = 'ke-' + this.type + '-left';
		var center = KE.$$('div');
		center.className = 'ke-' + self.type + '-center';
		if (height) center.style.height = height;
		var right = KE.$$('div');
		right.className = 'ke-' + this.type + '-right';
		if (height) right.style.lineHeight = height;
		cDiv.onmouseover = function() {
			this.className = 'ke-' + self.type + '-item ke-' + self.type + '-item-on';
			center.className = 'ke-' + self.type + '-center ke-' + self.type + '-center-on';
		};
		cDiv.onmouseout = function() {
			this.className = 'ke-' + self.type + '-item';
			center.className = 'ke-' + self.type + '-center';
		};
		cDiv.onclick = event;
		cDiv.appendChild(left);
		cDiv.appendChild(center);
		cDiv.appendChild(right);
		if (checked) {
			KE.util.innerHtml(left, '<span class="ke-common-icon ke-common-icon-url ke-icon-checked"></span>');
		} else {
			if (iconHtml) KE.util.innerHtml(left, iconHtml);
		}
		KE.util.innerHtml(right, html);
		this.append(cDiv);
	};
	this.addSeparator = function() {
		var div = KE.$$('div');
		div.className = 'ke-' + this.type + '-separator';
		this.append(div);
	};
	this.append = function(el) {
		this.div.appendChild(el);
	};
	this.insert = function(html) {
		KE.util.innerHtml(this.div, html);
	};
	this.hide = function() {
		KE.hideMenu(arg.id);
	};
	this.show = function() {
		this.hide();
		var id = arg.id;
		KE.g[id].hideDiv.style.display = '';
		KE.g[id].hideDiv.appendChild(this.div);
		var pos = getPos.call(this, this.div.clientWidth, this.div.clientHeight);
		this.div.style.top = pos.y + 'px';
		this.div.style.left = pos.x + 'px';
	};
	this.picker = function(color) {
		var colorTable = KE.g[arg.id].colorTable;
		var picker = new KE.colorpicker({
			colors : colorTable,
			onclick : function(color) { KE.plugin[arg.cmd].exec(arg.id, color); },
			selectedColor : color
		});
		this.append(picker.getElement());
		this.show();
	};
};

KE.dialog = function(arg){
	var self = this;
	this.widthMargin = 30;
	this.heightMargin = 100;
	this.zIndex = 19811214;
	this.width = arg.width;
	this.height = arg.height;
	var minTop, minLeft;
	function setLimitNumber() {
		var docEl = KE.util.getDocumentElement();
		var pos = KE.util.getScrollPos();
		minTop = pos.y;
		minLeft = pos.x;
	}
	function init() {
		this.beforeHide = arg.beforeHide;
		this.afterHide = arg.afterHide;
		this.beforeShow = arg.beforeShow;
		this.afterShow = arg.afterShow;
		this.ondrag = arg.ondrag;
	}
	init.call(this);
	function getPos() {
		var width = this.width + this.widthMargin;
		var height = this.height + this.heightMargin;
		var id = arg.id;
		var g = KE.g[id];
		var x = 0, y = 0;
		if (g.dialogAlignType == 'page') {
			var el = KE.util.getDocumentElement();
			var scrollPos = KE.util.getScrollPos();
			x = Math.round(scrollPos.x + (el.clientWidth - width) / 2);
			y = Math.round(scrollPos.y + (el.clientHeight - height) / 2);
		} else {
			var pos = KE.util.getElementPos(KE.g[id].container);
			var el = g.container;
			var xDiff = Math.round(el.clientWidth / 2) - Math.round(width / 2);
			var yDiff = Math.round(el.clientHeight / 2) - Math.round(height / 2);
			x = xDiff < 0 ? pos.x : pos.x + xDiff;
			y = yDiff < 0 ? pos.y : pos.y + yDiff;
		}
		x = x < 0 ? 0 : x;
		y = y < 0 ? 0 : y;
		return {x : x, y : y};
	};
	this.resize = function(width, height) {
		if (width) this.width = width;
		if (height) this.height = height;
		this.hide();
		this.show();
	};
	this.hide = function() {
		if (this.beforeHide) this.beforeHide(id);
		var id = arg.id;
		var stack = KE.g[id].dialogStack;
		if (stack[stack.length - 1] != this) return;
		var dialog = stack.pop();
		var iframe = dialog.iframe;
		iframe.src = 'javascript:false';
		iframe.parentNode.removeChild(iframe);
		document.body.removeChild(this.div);
		if (stack.length < 1) {
			KE.g[id].maskDiv.style.display = 'none';
		}
		KE.event.remove(window, 'resize', setLimitNumber);
		KE.event.remove(window, 'scroll', setLimitNumber);
		if (this.afterHide) this.afterHide(id);
		KE.util.focus(id);
	};
	this.show = function() {
		if (this.beforeShow) this.beforeShow(id);
		var self = this;
		var id = arg.id;
		var div = KE.$$('div');
		div.className = 'ke-dialog';
		KE.event.bind(div, 'click', function(e){}, id);
		KE.event.bind(div, 'mousedown', function(e){}, id);
		var stack = KE.g[id].dialogStack;
		if (stack.length > 0) {
			this.zIndex = stack[stack.length - 1].zIndex + 1;
		}
		div.style.zIndex = this.zIndex;
		var pos = getPos.call(this);
		div.style.top = pos.y + 'px';
		div.style.left = pos.x + 'px';
		var contentCell;
		if (KE.g[id].shadowMode) {
			var table = KE.$$('table');
			table.className = 'ke-dialog-table';
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.border = 0;
			var rowNames = ['t', 'm', 'b'];
			var colNames = ['l', 'c', 'r'];
			for (var i = 0, len = 3; i < len; i++) {
				var row = table.insertRow(i);
				for (var j = 0, l = 3; j < l; j++) {
					var cell = row.insertCell(j);
					cell.className = 'ke-' + rowNames[i] + colNames[j];
					if (i == 1 && j == 1) contentCell = cell;
					else cell.innerHTML = '<span class="ke-dialog-empty"></span>';
				}
			}
			div.appendChild(table);
		} else {
			KE.addClass(div, 'ke-dialog-no-shadow');
			contentCell = div;
		}
		var titleDiv = KE.$$('div');
		titleDiv.className = 'ke-dialog-title';
		titleDiv.innerHTML = arg.title;
		var span = KE.$$('span');
		span.className = 'ke-dialog-close';
		if (KE.g[id].shadowMode) KE.addClass(span, 'ke-dialog-close-shadow');
		else KE.addClass(span, 'ke-dialog-close-no-shadow');
		span.alt = KE.lang['close'];
		span.title = KE.lang['close'];
		span.onclick = function () {
			self.hide();
			KE.util.select(id);
		};
		titleDiv.appendChild(span);
		setLimitNumber();
		KE.event.add(window, 'resize', setLimitNumber);
		KE.event.add(window, 'scroll', setLimitNumber);
		KE.util.drag(id, titleDiv, div, function(objTop, objLeft, objWidth, objHeight, top, left) {
			if (self.ondrag) self.ondrag(id);
			setLimitNumber();
			top = objTop + top;
			left = objLeft + left;
			if (top < minTop) top = minTop;
			if (left < minLeft) left = minLeft;
			div.style.top = top + 'px';
			div.style.left = left + 'px';
		});
		contentCell.appendChild(titleDiv);
		var bodyDiv = KE.$$('div');
		bodyDiv.className = 'ke-dialog-body';
		var loadingTable = KE.util.createTable();
		loadingTable.table.className = 'ke-loading-table';
		loadingTable.table.style.width = this.width + 'px';
		loadingTable.table.style.height = this.height + 'px';
		var loadingImg = KE.$$('span');
		loadingImg.className = 'ke-loading-img';
		loadingTable.cell.appendChild(loadingImg);
		var iframe = (KE.g[id].dialogStack.length == 0 && KE.g[id].dialog) ? KE.g[id].dialog : KE.$$('iframe');
		if (arg.useFrameCSS) {
			iframe.className = 'ke-dialog-iframe ke-dialog-iframe-border';
		} else {
			iframe.className = 'ke-dialog-iframe';
		}
		iframe.setAttribute("frameBorder", "0");
		iframe.style.width = this.width + 'px';
		iframe.style.height = this.height + 'px';
		iframe.style.display = 'none';
		bodyDiv.appendChild(iframe);
		bodyDiv.appendChild(loadingTable.table);
		contentCell.appendChild(bodyDiv);

		var bottomDiv = KE.$$('div');
		bottomDiv.className = 'ke-dialog-bottom';
		var noButton = null;
		var yesButton = null;
		var previewButton = null;
		if (arg.previewButton) {
			previewButton = KE.$$('input');
			previewButton.className = 'ke-button ke-dialog-preview';
			previewButton.type = 'button';
			previewButton.name = 'previewButton';
			previewButton.value = arg.previewButton;
			previewButton.onclick = function() {
				var stack = KE.g[id].dialogStack;
				if (stack[stack.length - 1] == self) {
					KE.plugin[arg.cmd].preview(id);
				}
			};
			bottomDiv.appendChild(previewButton);
		}
		if (arg.yesButton) {
			yesButton = KE.$$('input');
			yesButton.className = 'ke-button ke-dialog-yes';
			yesButton.type = 'button';
			yesButton.name = 'yesButton';
			yesButton.value = arg.yesButton;
			yesButton.onclick = function() {
				var stack = KE.g[id].dialogStack;
				if (stack[stack.length - 1] == self) {
					KE.plugin[arg.cmd].exec(id);
				}
			};
			bottomDiv.appendChild(yesButton);
		}
		if (arg.noButton) {
			noButton = KE.$$('input');
			noButton.className = 'ke-button ke-dialog-no';
			noButton.type = 'button';
			noButton.name = 'noButton';
			noButton.value = arg.noButton;
			noButton.onclick = function () {
				self.hide();
				KE.util.select(id);
			};
			bottomDiv.appendChild(noButton);
		}
		if (arg.yesButton || arg.noButton || arg.previewButton) {
			contentCell.appendChild(bottomDiv);
		}
		document.body.appendChild(div);
		window.focus();
		if (yesButton) yesButton.focus();
		else if (noButton) noButton.focus();
		if (arg.html !== undefined) {
			var dialogDoc = KE.util.getIframeDoc(iframe);
			var html = KE.util.getFullHtml(id);
			dialogDoc.open();
			dialogDoc.write(html);
			dialogDoc.close();
			KE.util.innerHtml(dialogDoc.body, arg.html);
		} else if (arg.url !== undefined) {
			iframe.src = arg.url;
		} else {
			var param = 'id=' + escape(id) + '&ver=' + escape(KE.version);
			if (arg.file === undefined) {
				iframe.src = KE.g[id].pluginsPath + arg.cmd + '.html?' + param;
			} else {
				param = (/\?/.test(arg.file) ? '&' : '?') + param;
				iframe.src = KE.g[id].pluginsPath + arg.file + param;
			}
		}
		KE.g[id].maskDiv.style.width = KE.util.getDocumentWidth() + 'px';
		KE.g[id].maskDiv.style.height = KE.util.getDocumentHeight() + 'px';
		KE.g[id].maskDiv.style.display = 'block';
		this.iframe = iframe;
		this.loading = loadingTable.table;
		this.noButton = noButton;
		this.yesButton = yesButton;
		this.previewButton = previewButton;
		this.div = div;
		KE.g[id].dialogStack.push(this);
		KE.g[id].dialog = iframe;
		KE.g[id].yesButton = yesButton;
		KE.g[id].noButton = noButton;
		KE.g[id].previewButton = previewButton;
		if (!arg.loadingMode) KE.util.hideLoadingPage(id);
		if (this.afterShow) this.afterShow(id);
		if (KE.g[id].afterDialogCreate) KE.g[id].afterDialogCreate(id);
	};
};

KE.toolbar = {
	updateState : function(id) {
		var cmdList = [
			'justifyleft', 'justifycenter', 'justifyright',
			'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript','superscript',
			'bold', 'italic', 'underline', 'strikethrough'
		];
		for (var i = 0; i < cmdList.length; i++) {
			var cmd = cmdList[i];
			var state = false;
			try {
				state = KE.g[id].iframeDoc.queryCommandState(cmd);
			} catch(e) {}
			if (state) {
				KE.toolbar.select(id, cmd);
			} else {
				KE.toolbar.unselect(id, cmd);
			}
		}
	},
	isSelected : function(id, cmd) {
		if (KE.plugin[cmd] && KE.plugin[cmd].isSelected) return true;
		else return false;
	},
	select : function(id, cmd) {
		if (KE.g[id].toolbarIcon[cmd]) {
			var a = KE.g[id].toolbarIcon[cmd][0];
			a.className = 'ke-icon ke-icon-selected';
			a.onmouseover = null;
			a.onmouseout = null;
		}
	},
	unselect : function(id, cmd) {
		if (KE.g[id].toolbarIcon[cmd]) {
			var a = KE.g[id].toolbarIcon[cmd][0];
			a.className = 'ke-icon';
			a.onmouseover = function(){ this.className = 'ke-icon ke-icon-on'; };
			a.onmouseout = function(){ this.className = 'ke-icon'; };
		}
	},
	_setAttr : function(id, a, cmd) {
		a.className = 'ke-icon';
		a.href = 'javascript:;';
		a.onclick = function(e) {
			e = e || window.event;
			var div = KE.g[id].hideDiv.firstChild;
			if (div && div.getAttribute('name') == cmd) {
				KE.hideMenu(id);
			} else {
				KE.util.click(id, cmd);
			}
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
			if (e.cancelBubble !== undefined) e.cancelBubble = true;
			return false;
		};
		a.onmouseover = function(){ this.className = 'ke-icon ke-icon-on'; };
		a.onmouseout = function(){ this.className = 'ke-icon'; };
		a.hidefocus = true;
		a.title = KE.lang[cmd];
	},
	able : function(id, arr) {
		var self = this;
		KE.each(KE.g[id].toolbarIcon, function(cmd, obj) {
			if (!KE.util.inArray(cmd, arr)) {
				var a = obj[0];
				var span = obj[1];
				self._setAttr(id, a, cmd);
				KE.util.setOpacity(span, 100);
			}
		});
	},
	disable : function(id, arr) {
		KE.each(KE.g[id].toolbarIcon, function(cmd, obj) {
			if (!KE.util.inArray(cmd, arr)) {
				var a = obj[0];
				var span = obj[1];
				a.className = 'ke-icon ke-icon-disabled';
				KE.util.setOpacity(span, 50);
				a.onclick = null;
				a.onmouseover = null;
				a.onmouseout = null;
			}
		});
	},
	create : function(id) {
		var self = this;
		var defaultItemHash = KE.util.arrayToHash(KE.setting.items);
		KE.g[id].toolbarIcon = [];
		var tableObj = KE.util.createTable();
		var toolbar = tableObj.table;
		toolbar.className = 'ke-toolbar';
		toolbar.oncontextmenu = function() { return false; };
		toolbar.onmousedown = function() { return false; };
		toolbar.onmousemove = function() { return false; };
		var toolbarCell = tableObj.cell;
		var length = KE.g[id].items.length;
		var cellNum = 0;
		var row;
		KE.g[id].toolbarHeight = KE.g[id].toolbarLineHeight;
		for (var i = 0; i < length; i++) {
			var cmd = KE.g[id].items[i];
			if (i == 0 || cmd == '-') {
				var table = KE.util.createTable().table;
				table.className = 'ke-toolbar-table';
				row = table.insertRow(0);
				cellNum = 0;
				toolbarCell.appendChild(table);
				if (cmd == '-') {
					KE.g[id].toolbarHeight += KE.g[id].toolbarLineHeight;
					continue;
				}
			}
			var cell = row.insertCell(cellNum);
			cell.hideforcus = true;
			cellNum++;
			if (cmd == '|') {
				var div = KE.$$('div');
				div.className = 'ke-toolbar-separator';
				cell.appendChild(div);
				continue;
			}
			var a = KE.$$('a');
			self._setAttr(id, a, cmd);
			var span = KE.$$('span');
			if (typeof defaultItemHash[cmd] == 'undefined') {
				span.className = 'ke-common-icon ke-icon-' + cmd;
			} else {
				span.className = 'ke-common-icon ke-common-icon-url ke-icon-' + cmd;
			}
			a.appendChild(span);
			cell.appendChild(a);
			KE.g[id].toolbarIcon[cmd] = [a, span];
			if (KE.toolbar.isSelected(id, cmd)) KE.toolbar.select(id, cmd);
		}
		return toolbar;
	}
};

KE.history = {
	addStackData : function(stack, data) {
		var prev = '';
		if (stack.length > 0) {
			prev = stack[stack.length - 1];
		}
		if (stack.length == 0 || data !== prev) stack.push(data);
	},
	add : function(id, minChangeSize) {
		var g = KE.g[id];
		var html = KE.util.getSrcData(id);
		if (g.undoStack.length > 0) {
			var prevHtml = g.undoStack[g.undoStack.length - 1];
			if (Math.abs(html.length - prevHtml.length) < minChangeSize) return;
		}
		this.addStackData(g.undoStack, html);
	},
	undo : function(id) {
		var g = KE.g[id];
		if (g.undoStack.length == 0) return;
		var html = KE.util.getSrcData(id);
		this.addStackData(g.redoStack, html);
		var prevHtml = g.undoStack.pop();
		if (html === prevHtml && g.undoStack.length > 0) {
			prevHtml = g.undoStack.pop();
		}
		prevHtml = KE.util.toData(id, prevHtml);
		if (g.wyswygMode) {
			KE.util.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, prevHtml));
		} else {
			g.newTextarea.value = prevHtml;
		}
	},
	redo : function(id) {
		var g = KE.g[id];
		if (g.redoStack.length == 0) return;
		var html = KE.util.getSrcData(id);
		this.addStackData(g.undoStack, html);
		var nextHtml = g.redoStack.pop();
		nextHtml = KE.util.toData(id, nextHtml);
		if (g.wyswygMode) {
			KE.util.innerHtml(g.iframeDoc.body, KE.util.execSetHtmlHooks(id, nextHtml));
		} else {
			g.newTextarea.value = nextHtml;
		}
	}
};

KE.readonly = function(id, isReadonly) {
	isReadonly = isReadonly == undefined ? true : isReadonly;
	var g = KE.g[id];
	if (KE.browser.IE) g.iframeDoc.body.contentEditable = isReadonly ? 'false' : 'true';
	else g.iframeDoc.designMode = isReadonly ? 'off' : 'on';
};

KE.focus = function(id, position) {
	position = (position || '').toLowerCase();
	if (!KE.g[id].container) return;
	KE.util.focus(id);
	if (position === 'end') {
		KE.util.setSelection(id);
		if (!KE.g[id].sel) return; //issue #120: Sometimes Firefox does not get selection
		var sel = KE.g[id].keSel,
			range = KE.g[id].keRange,
			doc = KE.g[id].iframeDoc;
		range.selectTextNode(doc.body);
		range.collapse(false);
		sel.addRange(range);
	}
};

KE.html = function(id, val) {
	if (val === undefined) {
		return KE.util.getData(id);
	} else {
		if (!KE.g[id].container) return;
		KE.util.setFullHtml(id, val);
		KE.focus(id, 'end');
	}
};

KE.text = function(id, val) {
	if (val === undefined) {
		val = KE.html(id);
		val = val.replace(/<.*?>/ig, '');
		val = val.replace(/&nbsp;/ig, ' ');
		val = KE.util.trim(val);
		return val;
	} else {
		KE.html(id, KE.util.escape(val));
	}
};

KE.insertHtml = function(id, val) {
	if (!KE.g[id].container) return;
	var range = KE.g[id].range;
	if (!range) {
		KE.appendHtml(id, val);
	} else {
		KE.focus(id);
		KE.util.selection(id);
		KE.util.insertHtml(id, val);
	}
};

KE.appendHtml = function(id, val) {
	KE.html(id, KE.html(id) + val);
	KE.focus(id, 'end');
};

KE.isEmpty = function(id) {
	return KE.util.isEmpty(id);
};

KE.selectedHtml = function(id) {
	var range = KE.g[id].range;
	if (!range) return '';
	var html = '';
	if (KE.browser.IE) {
		if (range.item) {
			html = range.item(0).outerHTML;
		} else {
			html = range.htmlText;
		}
	} else {
		var temp = KE.$$('div', KE.g[id].iframeDoc);
		temp.appendChild(range.cloneContents());
		html = temp.innerHTML;
	}
	return KE.util.toData(id, html);
};

KE.count = function(id, mode) {
	mode = (mode || 'html').toLowerCase();
	if (mode === 'html') {
		return KE.html(id).length;
	} else if (mode === 'text') {
		var data = KE.util.getPureData(id);
		data = data.replace(/<(?:img|embed).*?>/ig, 'K');
		data = data.replace(/\r\n|\n|\r/g, '');
		data = KE.util.trim(data);
		return data.length;
	}
	return 0;
};

KE.remove = function(id, mode) {
	var g = KE.g[id];
	if (!g.container) return false;
	mode = (typeof mode == "undefined") ? 0 : mode;
	KE.util.setData(id);
	var container = g.container;
	var eventStack = g.eventStack;
	for (var i = 0, len = eventStack.length; i < len; i++) {
		var item = eventStack[i];
		if (item) KE.event.remove(item.el, item.type, item.fn, id);
	}
	g.iframeDoc.src = 'javascript:false';
	g.iframe.parentNode.removeChild(g.iframe);
	if (mode == 1) {
		document.body.removeChild(container);
	} else {
		var srcTextarea = g.srcTextarea;
		srcTextarea.parentNode.removeChild(container);
		if (mode == 0) srcTextarea.style.display = '';
	}
	document.body.removeChild(g.hideDiv);
	document.body.removeChild(g.maskDiv);
	g.container = null;
	g.dialogStack = [];
	g.contextmenuItems = [];
	g.getHtmlHooks = [];
	g.setHtmlHooks = [];
	g.onchangeHandlerStack = [];
	g.eventStack = [];
};

KE.create = function(id, mode) {
	if (KE.g[id].beforeCreate) KE.g[id].beforeCreate(id);
	if (KE.browser.IE && KE.browser.VERSION < 7) try { document.execCommand('BackgroundImageCache', false, true); }catch(e){}
	var srcTextarea = KE.$(id) || document.getElementsByName(id)[0];
	mode = (typeof mode == "undefined") ? 0 : mode;
	if (mode == 0 && KE.g[id].container) return;
	var width = KE.g[id].width || srcTextarea.style.width || srcTextarea.offsetWidth + 'px';
	var height = KE.g[id].height || srcTextarea.style.height || srcTextarea.offsetHeight + 'px';
	var tableObj = KE.util.createTable();
	var container = tableObj.table;
	container.className = 'ke-container';
	container.style.width = width;
	container.style.height = height;
	var toolbarOuter = tableObj.cell;
	toolbarOuter.className = 'ke-toolbar-outer';
	var textareaOuter = container.insertRow(1).insertCell(0);
	textareaOuter.className = 'ke-textarea-outer';
	tableObj = KE.util.createTable();
	var textareaTable = tableObj.table;
	textareaTable.className = 'ke-textarea-table';
	var textareaCell = tableObj.cell;
	textareaOuter.appendChild(textareaTable);
	var bottomOuter = container.insertRow(2).insertCell(0);
	bottomOuter.className = 'ke-bottom-outer';
	srcTextarea.style.display = 'none';
	if (mode == 1) document.body.appendChild(container);
	else srcTextarea.parentNode.insertBefore(container, srcTextarea);
	var toolbarTable = KE.toolbar.create(id);
	toolbarTable.style.height = KE.g[id].toolbarHeight + 'px';
	toolbarOuter.appendChild(toolbarTable);
	var iframe = KE.g[id].iframe || KE.$$('iframe');
	iframe.className = 'ke-iframe';
	iframe.setAttribute("frameBorder", "0");
	var newTextarea = KE.$$('textarea');
	newTextarea.className = 'ke-textarea';
	newTextarea.style.display = 'none';
	KE.g[id].container = container;
	KE.g[id].iframe = iframe;
	KE.g[id].newTextarea = newTextarea;
	KE.util.resize(id, width, height);
	textareaCell.appendChild(iframe);
	textareaCell.appendChild(newTextarea);
	var bottom = KE.$$('table');
	bottom.className = 'ke-bottom';
	bottom.cellPadding = 0;
	bottom.cellSpacing = 0;
	bottom.border = 0;
	bottom.style.height = KE.g[id].statusbarHeight + 'px';
	var row = bottom.insertRow(0);
	var bottomLeft = row.insertCell(0);
	bottomLeft.className = 'ke-bottom-left';
	var leftImg = KE.$$('span');
	leftImg.className = 'ke-bottom-left-img';
	if (KE.g[id].config.resizeMode == 0 || mode == 1) {
		bottomLeft.style.cursor = 'default';
		leftImg.style.visibility = 'hidden';
	}
	bottomLeft.appendChild(leftImg);
	var bottomRight = row.insertCell(1);
	bottomRight.className = 'ke-bottom-right';
	var rightImg = KE.$$('span');
	rightImg.className = 'ke-bottom-right-img';
	if (KE.g[id].config.resizeMode == 0 || mode == 1) {
		bottomRight.style.cursor = 'default';
		rightImg.style.visibility = 'hidden';
	} else if (KE.g[id].config.resizeMode == 1) {
		bottomRight.style.cursor = 's-resize';
		rightImg.style.visibility = 'hidden';
	}
	bottomRight.appendChild(rightImg);
	bottomOuter.appendChild(bottom);
	var hideDiv = KE.$$('div');
	hideDiv.className = 'ke-reset';
	hideDiv.style.display = 'none';
	var maskDiv = KE.$$('div');
	maskDiv.className = 'ke-mask';
	KE.util.setOpacity(maskDiv, 50);
	KE.event.bind(maskDiv, 'click', function(e){}, id);
	KE.event.bind(maskDiv, 'mousedown', function(e){}, id);
	document.body.appendChild(hideDiv);
	document.body.appendChild(maskDiv);
	KE.util.setDefaultPlugin(id);
	var iframeWin = iframe.contentWindow;
	var iframeDoc = KE.util.getIframeDoc(iframe);
	if (!KE.browser.IE || KE.browser.VERSION < 8) iframeDoc.designMode = 'on';
	var html = KE.util.getFullHtml(id);
	iframeDoc.open();
	iframeDoc.write(html);
	iframeDoc.close();
	if (!KE.g[id].wyswygMode) {
		newTextarea.value = KE.util.execSetHtmlHooks(id, srcTextarea.value);
		newTextarea.style.display = 'block';
		iframe.style.display = 'none';
		KE.toolbar.disable(id, ['source', 'fullscreen']);
		KE.toolbar.select(id, 'source');
	}
	function hideMenu() {
		KE.hideMenu(id);
	}
	function updateToolbar() {
		KE.toolbar.updateState(id);
	}
	if (KE.browser.WEBKIT) {
		KE.event.add(iframeDoc, 'click', function(e) {
			KE.util.selectImageWebkit(id, e, true);
		}, id);
	}
	if (KE.browser.IE) {
		KE.event.add(iframeDoc, 'keydown', function(e) {
			if (e.keyCode == 8) {
				var range = KE.g[id].range;
				if (range.item) {
					var item = range.item(0);
					item.parentNode.removeChild(item);
					KE.util.execOnchangeHandler(id);
					KE.event.stop(id);
					return false;
				}
			}
		}, id);
	}
	KE.event.add(iframeDoc, 'click', hideMenu, id);
	KE.event.add(iframeDoc, 'click', updateToolbar, id);
	KE.event.input(iframeDoc, updateToolbar, id);
	KE.event.bind(newTextarea, 'click', hideMenu, id);
	KE.event.add(document, 'click', hideMenu, id);
	KE.g[id].toolbarTable = toolbarTable;
	KE.g[id].textareaTable = textareaTable;
	KE.g[id].srcTextarea = srcTextarea;
	KE.g[id].bottom = bottom;
	KE.g[id].hideDiv = hideDiv;
	KE.g[id].maskDiv = maskDiv;
	KE.g[id].iframeWin = iframeWin;
	KE.g[id].iframeDoc = iframeDoc;
	KE.g[id].width = width;
	KE.g[id].height = height;
	KE.util.drag(id, bottomRight, container, function(objTop, objLeft, objWidth, objHeight, top, left) {
		if (KE.g[id].resizeMode == 2) KE.util.resize(id, (objWidth + left) + 'px', (objHeight + top) + 'px', true);
		else if (KE.g[id].resizeMode == 1) KE.util.resize(id, objWidth + 'px', (objHeight + top) + 'px', true, false);
	});
	KE.util.drag(id, bottomLeft, container, function(objTop, objLeft, objWidth, objHeight, top, left) {
		if (KE.g[id].resizeMode > 0) KE.util.resize(id, objWidth + 'px', (objHeight + top) + 'px', true, false);
	});
	KE.each(KE.plugin, function(cmd, plugin) {
		if (plugin.init) plugin.init(id);
	});
	KE.g[id].getHtmlHooks.push(function(html) {
		return html.replace(/(<[^>]*)kesrc="([^"]+)"([^>]*>)/ig, function(full, start, src, end) {
			full = full.replace(/(\s+(?:href|src)=")[^"]+(")/i, '$1' + src + '$2');
			full = full.replace(/\s+kesrc="[^"]+"/i, '');
			return full;
		});
	});
	KE.g[id].setHtmlHooks.push(function(html) {
		return html.replace(/(<[^>]*)(href|src)="([^"]+)"([^>]*>)/ig, function(full, start, key, src, end) {
			if (full.match(/\skesrc="[^"]+"/i)) return full;
			full = start + key + '="' + src + '"' + ' kesrc="' + src + '"' + end;
			return full;
		});
	});
	KE.util.addContextmenuEvent(id);
	KE.util.addNewlineEvent(id);
	KE.util.addTabEvent(id);
	function setSelectionHandler() {
		KE.util.setSelection(id);
	}
	KE.event.input(iframeDoc, setSelectionHandler, id);
	KE.event.add(iframeDoc, 'mouseup', setSelectionHandler, id);
	KE.event.add(document, 'mousedown', setSelectionHandler, id);
	KE.onchange(id, function(id) {
		if (KE.g[id].autoSetDataMode) {
			KE.util.setData(id);
			if (KE.g[id].afterSetData) KE.g[id].afterSetData(id);
		}
		KE.history.add(id, KE.g[id].minChangeSize);
	});
	if (KE.browser.IE && KE.browser.VERSION > 7) KE.readonly(id, false);
	KE.util.setFullHtml(id, srcTextarea.value);
	KE.history.add(id, 0);
	if (mode > 0) KE.util.focus(id);
	if (KE.g[id].afterCreate) KE.g[id].afterCreate(id);
};

KE.onchange = function(id, func) {
	var g = KE.g[id];
	function handler() {
		func(id);
	};
	g.onchangeHandlerStack.push(handler);
	KE.event.input(g.iframeDoc, handler, id);
	KE.event.input(g.newTextarea, handler, id);
	KE.event.add(g.iframeDoc, 'mouseup', function(e) {
		window.setTimeout(function() {
			func(id);
		}, 0);
	}, id);
};

KE.init = function(args) {
	var g = KE.g[args.id] = args;
	g.config = {};
	g.undoStack = [];
	g.redoStack = [];
	g.dialogStack = [];
	g.contextmenuItems = [];
	g.getHtmlHooks = [];
	g.setHtmlHooks = [];
	g.onchangeHandlerStack = [];
	g.eventStack = [];
	KE.each(KE.setting, function(key, val) {
		g[key] = (typeof args[key] == 'undefined') ? val : args[key];
		g.config[key] = g[key];
	});
	if (g.loadStyleMode) KE.util.loadStyle(g.skinsPath + g.skinType + '.css');
}

KE.show = function(args) {
	KE.init(args);
	KE.event.ready(function() { KE.create(args.id); });
};

if (window.KE === undefined) window.KE = KE;
window.KindEditor = KE;

})();

(function (KE, undefined) {

KE.langType = 'zh_CN';

KE.lang = {
	source : 'HTML代码',
	undo : '后退(Ctrl+Z)',
	redo : '前进(Ctrl+Y)',
	cut : '剪切(Ctrl+X)',
	copy : '复制(Ctrl+C)',
	paste : '粘贴(Ctrl+V)',
	plainpaste : '粘贴为无格式文本',
	wordpaste : '从Word粘贴',
	selectall : '全选',
	justifyleft : '左对齐',
	justifycenter : '居中',
	justifyright : '右对齐',
	justifyfull : '两端对齐',
	insertorderedlist : '编号',
	insertunorderedlist : '项目符号',
	indent : '增加缩进',
	outdent : '减少缩进',
	subscript : '下标',
	superscript : '上标',
	title : '标题',
	fontname : '字体',
	fontsize : '文字大小',
	textcolor : '文字颜色',
	bgcolor : '文字背景',
	bold : '粗体(Ctrl+B)',
	italic : '斜体(Ctrl+I)',
	underline : '下划线(Ctrl+U)',
	strikethrough : '删除线',
	removeformat : '删除格式',
	image : '图片',
	flash : '插入Flash',
	media : '插入多媒体',
	table : '插入表格',
	hr : '插入横线',
	emoticons : '插入表情',
	link : '超级链接',
	unlink : '取消超级链接',
	fullscreen : '全屏显示',
	about : '关于',
	print : '打印',
	fileManager : '浏览服务器',
	advtable : '表格',
	yes : '确定',
	no : '取消',
	close : '关闭',
	editImage : '图片属性',
	deleteImage : '删除图片',
	editLink : '超级链接属性',
	deleteLink : '取消超级链接',
	tableprop : '表格属性',
	tableinsert : '插入表格',
	tabledelete : '删除表格',
	tablecolinsertleft : '左侧插入列',
	tablecolinsertright : '右侧插入列',
	tablerowinsertabove : '上方插入行',
	tablerowinsertbelow : '下方插入行',
	tablecoldelete : '删除列',
	tablerowdelete : '删除行',
	noColor : '无颜色',
	invalidImg : "请输入有效的URL地址。\n只允许jpg,gif,bmp,png格式。",
	invalidMedia : "请输入有效的URL地址。\n只允许swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",
	invalidWidth : "宽度必须为数字。",
	invalidHeight : "高度必须为数字。",
	invalidBorder : "边框必须为数字。",
	invalidUrl : "请输入有效的URL地址。",
	invalidRows : '行数为必选项，只允许输入大于0的数字。',
	invalidCols : '列数为必选项，只允许输入大于0的数字。',
	invalidPadding : '边距必须为数字。',
	invalidSpacing : '间距必须为数字。',
	invalidBorder : '边框必须为数字。',
	pleaseInput : "请输入内容。",
	invalidJson : '服务器发生故障。',
	cutError : '您的浏览器安全设置不允许使用剪切操作，请使用快捷键(Ctrl+X)来完成。',
	copyError : '您的浏览器安全设置不允许使用复制操作，请使用快捷键(Ctrl+C)来完成。',
	pasteError : '您的浏览器安全设置不允许使用粘贴操作，请使用快捷键(Ctrl+V)来完成。'
};

var plugins = KE.lang.plugins = {};

plugins.about = {
	version : KE.version,
	title : 'HTML可视化编辑器'
};

plugins.plainpaste = {
	comment : '请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。'
};

plugins.wordpaste = {
	comment : '请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。'
};

plugins.link = {
	url : 'URL地址',
	linkType : '打开类型',
	newWindow : '新窗口',
	selfWindow : '当前窗口'
};

plugins.flash = {
	url : 'Flash地址',
	width : '宽度',
	height : '高度'
};

plugins.media = {
	url : '媒体文件地址',
	width : '宽度',
	height : '高度',
	autostart : '自动播放'
};

plugins.image = {
	remoteImage : '远程图片',
	localImage : '本地上传',
	remoteUrl : '图片地址',
	localUrl : '图片地址',
	size : '图片大小',
	width : '宽',
	height : '高',
	resetSize : '重置大小',
	align : '对齐方式',
	defaultAlign : '默认方式',
	leftAlign : '左对齐',
	rightAlign : '右对齐',
	imgTitle : '图片说明',
	viewServer : '浏览...'
};

plugins.file_manager = {
	emptyFolder : '空文件夹',
	moveup : '移到上一级文件夹',
	viewType : '显示方式：',
	viewImage : '缩略图',
	listImage : '详细信息',
	orderType : '排序方式：',
	fileName : '名称',
	fileSize : '大小',
	fileType : '类型'
};

plugins.advtable = {
	cells : '单元格数',
	rows : '行数',
	cols : '列数',
	size : '表格大小',
	width : '宽度',
	height : '高度',
	percent : '%',
	px : 'px',
	space : '边距间距',
	padding : '边距',
	spacing : '间距',
	align : '对齐方式',
	alignDefault : '默认',
	alignLeft : '左对齐',
	alignCenter : '居中',
	alignRight : '右对齐',
	border : '表格边框',
	borderWidth : '边框',
	borderColor : '颜色',
	backgroundColor : '背景颜色'
};

plugins.title = {
	h1 : '标题 1',
	h2 : '标题 2',
	h3 : '标题 3',
	h4 : '标题 4',
	p : '正 文'
};

plugins.fontname = {
	fontName : {
		'SimSun' : '宋体',
		'NSimSun' : '新宋体',
		'FangSong_GB2312' : '仿宋_GB2312',
		'KaiTi_GB2312' : '楷体_GB2312',
		'SimHei' : '黑体',
		'Microsoft YaHei' : '微软雅黑',
		'Arial' : 'Arial',
		'Arial Black' : 'Arial Black',
		'Times New Roman' : 'Times New Roman',
		'Courier New' : 'Courier New',
		'Tahoma' : 'Tahoma',
		'Verdana' : 'Verdana'
	}
};

})(KindEditor);

(function (KE, undefined) {

KE.plugin['about'] = {
	click : function(id) {
		KE.util.selection(id);
		var dialog = new KE.dialog({
			id : id,
			cmd : 'about',
			file : 'about.html',
			width : 300,
			height : 70,
			loadingMode : true,
			title : KE.lang['about'],
			noButton : KE.lang['close']
		});
		dialog.show();
	}
};

KE.plugin['undo'] = {
	init : function(id) {
		KE.event.ctrl(KE.g[id].iframeDoc, 'Z', function(e) {
			KE.plugin['undo'].click(id);
			KE.util.focus(id);
		}, id);
		KE.event.ctrl(KE.g[id].newTextarea, 'Z', function(e) {
			KE.plugin['undo'].click(id);
			KE.util.focus(id);
		}, id);
	},
	click : function(id) {
		KE.history.undo(id);
		KE.util.execOnchangeHandler(id);
	}
};

KE.plugin['redo'] = {
	init : function(id) {
		KE.event.ctrl(KE.g[id].iframeDoc, 'Y', function(e) {
			KE.plugin['redo'].click(id);
			KE.util.focus(id);
		}, id);
		KE.event.ctrl(KE.g[id].newTextarea, 'Y', function(e) {
			KE.plugin['redo'].click(id);
			KE.util.focus(id);
		}, id);
	},
	click : function(id) {
		KE.history.redo(id);
		KE.util.execOnchangeHandler(id);
	}
};

KE.plugin['cut'] = {
	click : function(id) {
		try {
			if (!KE.g[id].iframeDoc.queryCommandSupported('cut')) throw 'e';
		} catch(e) {
			alert(KE.lang.cutError);
			return;
		}
		KE.util.execCommand(id, 'cut', null);
	}
};

KE.plugin['copy'] = {
	click : function(id) {
		try {
			if (!KE.g[id].iframeDoc.queryCommandSupported('copy')) throw 'e';
		} catch(e) {
			alert(KE.lang.copyError);
			return;
		}
		KE.util.execCommand(id, 'copy', null);
	}
};

KE.plugin['paste'] = {
	click : function(id) {
		try {
			if (!KE.g[id].iframeDoc.queryCommandSupported('paste')) throw 'e';
		} catch(e) {
			alert(KE.lang.pasteError);
			return;
		}
		KE.util.execCommand(id, 'paste', null);
	}
};

KE.plugin['plainpaste'] = {
	click : function(id) {
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'plainpaste',
			file : 'plainpaste.html',
			width : 450,
			height : 300,
			loadingMode : true,
			title : KE.lang['plainpaste'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	exec : function(id) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var html = KE.$('textArea', dialogDoc).value;
		html = KE.util.escape(html);
		html = html.replace(/ /g, '&nbsp;');
		html = html.replace(/\r\n|\n|\r/g, "<br />$&");
		KE.util.insertHtml(id, html);
		this.dialog.hide();
		KE.util.focus(id);
	}
};

KE.plugin['wordpaste'] = {
	click : function(id) {
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'wordpaste',
			file : 'wordpaste.html',
			width : 450,
			height : 300,
			loadingMode : true,
			title : KE.lang['wordpaste'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	exec : function(id) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var wordIframe = KE.$('wordIframe', dialogDoc);
		var str = KE.util.getIframeDoc(wordIframe).body.innerHTML;
		str = str.replace(/<meta(\n|.)*?>/ig, "");
		str = str.replace(/<!(\n|.)*?>/ig, "");
		str = str.replace(/<style[^>]*>(\n|.)*?<\/style>/ig, "");
		str = str.replace(/<script[^>]*>(\n|.)*?<\/script>/ig, "");
		str = str.replace(/<w:[^>]+>(\n|.)*?<\/w:[^>]+>/ig, "");
		str = str.replace(/<xml>(\n|.)*?<\/xml>/ig, "");
		str = str.replace(/\r\n|\n|\r/ig, "");
		str = KE.util.execGetHtmlHooks(id, str);
		str = KE.format.getHtml(str, KE.g[id].htmlTags, KE.g[id].urlType);
		KE.util.insertHtml(id, str);
		this.dialog.hide();
		KE.util.focus(id);
	}
};

KE.plugin['fullscreen'] = {
	click : function(id) {
		var g = KE.g[id];
		var self = this;
		var resetSize = function() {
			var el = KE.util.getDocumentElement();
			g.width = el.clientWidth + 'px';
			g.height = el.clientHeight + 'px';
		};
		var windowSize = '';
		var resizeListener = function() {
			if (!self.isSelected) return;
			var el = KE.util.getDocumentElement();
			var size = [el.clientWidth, el.clientHeight].join('');
			if (windowSize != size) {
				windowSize = size;
				resetSize();
				KE.util.resize(id, g.width, g.height);
			}
		}
		if (this.isSelected) {
			this.isSelected = false;
			KE.util.setData(id);
			KE.remove(id, 1);
			g.width = this.width;
			g.height = this.height;
			KE.create(id, 2);
			document.body.parentNode.style.overflow = 'auto';
			KE.event.remove(window, 'resize', resizeListener);
			g.resizeMode = g.config.resizeMode;
			KE.toolbar.unselect(id, "fullscreen");
		} else {
			this.isSelected = true;
			this.width = g.container.style.width;
			this.height = g.container.style.height;
			KE.util.setData(id);
			KE.remove(id, 2);
			document.body.parentNode.style.overflow = 'hidden';
			resetSize();
			KE.create(id, 1);
			var pos = KE.util.getScrollPos();
			var div = g.container;
			div.style.position = 'absolute';
			div.style.left = pos.x + 'px';
			div.style.top = pos.y + 'px';
			div.style.zIndex = 19811211;
			KE.event.add(window, 'resize', resizeListener);
			g.resizeMode = 0;
			KE.toolbar.select(id, "fullscreen");
		}
	}
};

KE.plugin['bgcolor'] = {
	click : function(id) {
		KE.util.selection(id);
		var color = KE.queryCommandValue(KE.g[id].iframeDoc, 'bgcolor');
		this.menu = new KE.menu({
			id : id,
			cmd : 'bgcolor'
		});
		this.menu.picker(color);
	},
	exec : function(id, value) {
		var cmd = new KE.cmd(id);
		if (value == '') {
			cmd.remove({
				'span' : ['.background-color']
			});
		} else {
			cmd.wrap('span', [{'.background-color': value}]);
		}
		KE.util.execOnchangeHandler(id);
		this.menu.hide();
		KE.util.focus(id);
	}
};

KE.plugin['fontname'] = {
	click : function(id) {
		var fontName = KE.lang.plugins.fontname.fontName;
		var cmd = 'fontname';
		KE.util.selection(id);
		var menu = new KE.menu({
			id : id,
			cmd : cmd,
			width : 150
		});
		var font = KE.queryCommandValue(KE.g[id].iframeDoc, cmd);
		KE.each(fontName, function(key, value) {
			var html = '<span class="ke-reset" style="font-family: ' + key + ';">' + value + '</span>';
			menu.add(
				html,
				function() { KE.plugin[cmd].exec(id, key); },
				{ checked : (font === key.toLowerCase() || font === value.toLowerCase()) }
			);
		});
		menu.show();
		this.menu = menu;
	},
	exec : function(id, value) {
		var cmd = new KE.cmd(id);
		cmd.wrap('span', [{'.font-family': value}]);
		KE.util.execOnchangeHandler(id);
		this.menu.hide();
		KE.util.focus(id);
	}
};

KE.plugin['fontsize'] = {
	click : function(id) {
		var fontSize = ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px'];
		var cmd = 'fontsize';
		KE.util.selection(id);
		var size = KE.queryCommandValue(KE.g[id].iframeDoc, 'fontsize');
		var menu = new KE.menu({
			id : id,
			cmd : cmd,
			width : 120
		});
		for (var i = 0, len = fontSize.length; i < len; i++) {
			var value = fontSize[i];
			var html = '<span class="ke-reset" style="font-size: ' + value + ';">' + value + '</span>';
			menu.add(
				html,
				(function(value) {
					return function() {
						KE.plugin[cmd].exec(id, value);
					};
				})(value),
				{
					height : (parseInt(value) + 12) + 'px',
					checked : (size === value)
				}
			);
		}
		menu.show();
		this.menu = menu;
	},
	exec : function(id, value) {
		var cmd = new KE.cmd(id);
		cmd.wrap('span', [{'.font-size': value}]);
		KE.util.execOnchangeHandler(id);
		this.menu.hide();
		KE.util.focus(id);
	}
};

KE.plugin['hr'] = {
	click : function(id) {
		KE.util.selection(id);
		KE.util.insertHtml(id, '<hr />');
		KE.util.focus(id);
	}
};

KE.plugin['print'] = {
	click : function(id) {
		KE.util.selection(id);
		KE.g[id].iframeWin.print();
	}
};

KE.plugin['removeformat'] = {
	click : function(id) {
		KE.util.selection(id);
		var cmd = new KE.cmd(id);
		var tags = {
			'*' : ['class', 'style']
		};
		for (var i = 0, len = KE.g[id].inlineTags.length; i < len; i++) {
			tags[KE.g[id].inlineTags[i]] = ['*'];
		}
		cmd.remove(tags);
		KE.util.execOnchangeHandler(id);
		KE.toolbar.updateState(id);
		KE.util.focus(id);
	}
};

KE.plugin['source'] = {
	click : function(id) {
		var g = KE.g[id];
		if (!g.wyswygMode) {
			KE.util.setFullHtml(id, g.newTextarea.value);
			g.iframe.style.display = 'block';
			g.newTextarea.style.display = 'none';
			KE.toolbar.able(id, ['source', 'fullscreen']);
			g.wyswygMode = true;
			this.isSelected = false;
			KE.toolbar.unselect(id, "source");
		} else {
			KE.hideMenu(id);
			g.newTextarea.value = KE.util.getData(id);
			g.iframe.style.display = 'none';
			g.newTextarea.style.display = 'block';
			KE.toolbar.disable(id, ['source', 'fullscreen']);
			g.wyswygMode = false;
			this.isSelected = true;
			KE.toolbar.select(id, "source");
		}
		KE.util.focus(id);
	}
};

KE.plugin['textcolor'] = {
	click : function(id) {
		KE.util.selection(id);
		var color = KE.queryCommandValue(KE.g[id].iframeDoc, 'textcolor');
		this.menu = new KE.menu({
			id : id,
			cmd : 'textcolor'
		});
		this.menu.picker(color);
	},
	exec : function(id, value) {
		var cmd = new KE.cmd(id);
		if (value == '') {
			cmd.remove({
				'span' : ['.color'],
				'font' : ['color']
			});
		} else {
			cmd.wrap('span', [{'.color': value}]);
		}
		KE.util.execOnchangeHandler(id);
		this.menu.hide();
		KE.util.focus(id);
	}
};

KE.plugin['title'] = {
	click : function(id) {
		var lang = KE.lang.plugins.title;
		var title = {
			'H1' : lang.h1,
			'H2' : lang.h2,
			'H3' : lang.h3,
			'H4' : lang.h4,
			'P' : lang.p
		};
		var sizeHash = {
			'H1' : 28,
			'H2' : 24,
			'H3' : 18,
			'H4' : 14,
			'P' : 12
		};
		var cmd = 'title';
		KE.util.selection(id);
		var block = KE.queryCommandValue(KE.g[id].iframeDoc, 'formatblock');
		var menu = new KE.menu({
			id : id,
			cmd : cmd,
			width : (KE.langType == 'en' ? 200 : 150)
		});
		KE.each(title, function(key, value) {
			var style = 'font-size:' + sizeHash[key] + 'px;'
			if (key !== 'P') style += 'font-weight:bold;';
			var html = '<span class="ke-reset" style="' + style + '">' + value + '</span>';
			menu.add(html, function() {
				KE.plugin[cmd].exec(id, '<' + key + '>'); },
				{
					height : (sizeHash[key] + 12) + 'px',
					checked : (block === key.toLowerCase() || block === value.toLowerCase() )
				}
			);
		});
		menu.show();
		this.menu = menu;
	},
	exec : function(id, value) {
		KE.util.select(id);
		KE.util.execCommand(id, 'formatblock', value);
		this.menu.hide();
		KE.util.focus(id);
	}
};

KE.plugin['emoticons'] = {
	click : function(id) {
		var self = this,
			cmd = 'emoticons',
			rows = 5,
			cols = 9,
			total = 135,
			startNum = 0,
			cells = rows * cols,
			pages = Math.ceil(total / cells),
			colsHalf = Math.floor(cols / 2),
			g = KE.g[id],
			path = g.pluginsPath + 'emoticons/',
			allowPreview = (g.allowPreviewEmoticons === undefined) ? true : g.allowPreviewEmoticons;
		KE.util.selection(id);
		var wrapperDiv = KE.$$('div');
		wrapperDiv.className = 'ke-plugin-emoticons-wrapper';
		var previewDiv, previewImg;
		if (allowPreview) {
			previewDiv = KE.$$('div');
			previewDiv.className = 'ke-plugin-emoticons-preview';
			previewDiv.style.right = 0;
			var previewImg = KE.$$('img');
			previewImg.className = 'ke-reset';
			previewImg.src = path + '0.gif';
			previewImg.border = 0;
			previewDiv.appendChild(previewImg);
			wrapperDiv.appendChild(previewDiv);
		}
		function createEmoticonsTable(pageNum) {
			var table = KE.$$('table');
			if (previewDiv) {
				table.onmouseover = function() { previewDiv.style.display = 'block'; };
				table.onmouseout = function() { previewDiv.style.display = 'none'; };
			}
			table.className = 'ke-plugin-emoticons-table';
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.border = 0;
			var num = (pageNum - 1) * cells + startNum;
			for (var i = 0; i < rows; i++) {
				var row = table.insertRow(i);
				for (var j = 0; j < cols; j++) {
					var cell = row.insertCell(j);
					cell.className = 'ke-plugin-emoticons-cell';
					if (previewDiv) {
						cell.onmouseover = (function(j, num) {
							return function() {
								if (j > colsHalf) {
									previewDiv.style.left = 0;
									previewDiv.style.right = '';
								} else {
									previewDiv.style.left = '';
									previewDiv.style.right = 0;
								}
								previewImg.src = path + num + '.gif';;
								this.className = 'ke-plugin-emoticons-cell ke-plugin-emoticons-cell-on';
							};
						})(j, num);
					} else {
						cell.onmouseover = function() {
							this.className = 'ke-plugin-emoticons-cell ke-plugin-emoticons-cell-on';
						};
					}
					cell.onmouseout = function() { this.className = 'ke-plugin-emoticons-cell'; };
					cell.onclick = (function(num) {
						return function() {
							self.exec(id, num);
							return false;
						};
					})(num);
					var span = KE.$$('span');
					span.className = 'ke-plugin-emoticons-img';
					span.style.backgroundPosition = '-' + (24 * num) + 'px 0px';
					cell.appendChild(span);
					num++;
				}
			}
			return table;
		}
		var table = createEmoticonsTable(1);
		wrapperDiv.appendChild(table);
		var pageDiv = KE.$$('div');
		pageDiv.className = 'ke-plugin-emoticons-page';
		wrapperDiv.appendChild(pageDiv);
		function createPageTable(currentPageNum) {
			for (var pageNum = 1; pageNum <= pages; pageNum++) {
				if (currentPageNum !== pageNum) {
					var a = KE.$$('a');
					a.href = 'javascript:;';
					a.innerHTML = '[' + pageNum + ']';
					a.onclick = (function(pageNum) {
						return function() {
							wrapperDiv.removeChild(table);
							var newTable = createEmoticonsTable(pageNum);
							wrapperDiv.insertBefore(newTable, pageDiv);
							table = newTable;
							pageDiv.innerHTML = '';
							createPageTable(pageNum);
							return false;
						};
					})(pageNum);
					pageDiv.appendChild(a);
				} else {
					pageDiv.appendChild(document.createTextNode('[' + pageNum + ']'));
				}
				pageDiv.appendChild(document.createTextNode(' '));
			}
		}
		createPageTable(1);
		var menu = new KE.menu({
			id : id,
			cmd : cmd
		});
		menu.append(wrapperDiv);
		menu.show();
		this.menu = menu;
	},
	exec : function(id, num) {
		var src = KE.g[id].pluginsPath + 'emoticons/' + num + '.gif';
		var html = '<img src="' + src + '" kesrc="' + src + '" border="0" alt="" />';
		KE.util.insertHtml(id, html);
		this.menu.hide();
		KE.util.focus(id);
	}
};

KE.plugin['flash'] = {
	init : function(id) {
		var self = this;
		KE.g[id].getHtmlHooks.push(function(html) {
			return html.replace(/<img[^>]*class="?ke-flash"?[^>]*>/ig, function(imgStr) {
				var width = imgStr.match(/style="[^"]*;?\s*width:\s*(\d+)/i) ? RegExp.$1 : 0;
				var height = imgStr.match(/style="[^"]*;?\s*height:\s*(\d+)/i) ? RegExp.$1 : 0;
				width = width || (imgStr.match(/width="([^"]+)"/i) ? RegExp.$1 : 0);
				height = height || (imgStr.match(/height="([^"]+)"/i) ? RegExp.$1 : 0);
				if (imgStr.match(/kesrctag="([^"]+)"/i)) {
					var attrs = KE.util.getAttrList(unescape(RegExp.$1));
					attrs.width = width || attrs.width || 0;
					attrs.height = height || attrs.height || 0;
					attrs.kesrc = attrs.src;
					return KE.util.getMediaEmbed(attrs);
				}
			});
		});
		KE.g[id].setHtmlHooks.push(function(html) {
			return html.replace(/<embed[^>]*type="application\/x-shockwave-flash"[^>]*>(?:<\/embed>)?/ig, function($0) {
				var src = $0.match(/\s+src="([^"]+)"/i) ? RegExp.$1 : '';
				if ($0.match(/\s+kesrc="([^"]+)"/i)) src = RegExp.$1;
				var width = $0.match(/\s+width="([^"]+)"/i) ? RegExp.$1 : 0;
				var height = $0.match(/\s+height="([^"]+)"/i) ? RegExp.$1 : 0;
				var attrs = KE.util.getAttrList($0);
				attrs.src = src;
				attrs.width = width;
				attrs.height = height;
				return KE.util.getMediaImage(id, 'flash', attrs);
			});
		});
	},
	click : function(id) {
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'flash',
			file : 'flash.html',
			width : 400,
			height : 140,
			loadingMode : true,
			title : KE.lang['flash'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	check : function(id, url, width, height) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		if (!url.match(/^.{3,}$/)) {
			alert(KE.lang['invalidUrl']);
			KE.$('url', dialogDoc).focus();
			return false;
		}
		if (!width.match(/^\d*$/)) {
			alert(KE.lang['invalidWidth']);
			KE.$('width', dialogDoc).focus();
			return false;
		}
		if (!height.match(/^\d*$/)) {
			alert(KE.lang['invalidHeight']);
			KE.$('height', dialogDoc).focus();
			return false;
		}
		return true;
	},
	exec : function(id) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var url = KE.$('url', dialogDoc).value;
		var width = KE.$('width', dialogDoc).value;
		var height = KE.$('height', dialogDoc).value;
		if (!this.check(id, url, width, height)) return false;
		var html = KE.util.getMediaImage(id, 'flash', {
			src : url,
			type : KE.g[id].mediaTypes['flash'],
			width : width,
			height : height,
			quality : 'high'
		});
		KE.util.insertHtml(id, html);
		this.dialog.hide();
		KE.util.focus(id);
	}
};

KE.plugin['image'] = {
	getSelectedNode : function(id) {
		var g = KE.g[id];
		var startNode = g.keRange.startNode;
		var endNode = g.keRange.endNode;
		if (!KE.browser.WEBKIT && !g.keSel.isControl) return;
		if (startNode.nodeType != 1) return;
		if (startNode.tagName.toLowerCase() != 'img') return;
		if (startNode != endNode) return;
		if (!startNode.className.match(/^ke-\w+/i)) return startNode;
	},
	init : function(id) {
		var self = this;
		var g = KE.g[id];
		g.contextmenuItems.push({
			text : KE.lang['editImage'],
			click : function(id, menu) {
				KE.util.select(id);
				menu.hide();
				self.click(id);
			},
			cond : function(id) {
				return self.getSelectedNode(id);
			},
			options : {
				width : '150px',
				iconHtml : '<span class="ke-common-icon ke-common-icon-url ke-icon-image"></span>'
			}
		});
		g.contextmenuItems.push({
			text : KE.lang['deleteImage'],
			click : function(id, menu) {
				KE.util.select(id);
				menu.hide();
				var img = self.getSelectedNode(id);
				img.parentNode.removeChild(img);
				KE.util.execOnchangeHandler(id);
			},
			cond : function(id) {
				return self.getSelectedNode(id);
			},
			options : {
				width : '150px'
			}
		});
		g.contextmenuItems.push('-');
	},
	click : function(id) {
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'image',
			file : 'image/image.html',
			width : 400,
			height : 220,
			loadingMode : true,
			title : KE.lang['image'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	check : function(id) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var type = KE.$('type', dialogDoc).value;
		var width = KE.$('imgWidth', dialogDoc).value;
		var height = KE.$('imgHeight', dialogDoc).value;
		var title = KE.$('imgTitle', dialogDoc).value;
		var urlBox;
		if (type == 2) {
			urlBox = KE.$('imgFile', dialogDoc);
		} else {
			urlBox = KE.$('url', dialogDoc);
		}
		if (!urlBox.value.match(/\.(jpg|jpeg|gif|bmp|png)(\s|\?|$)/i)) {
			alert(KE.lang['invalidImg']);
			urlBox.focus();
			return false;
		}
		if (!width.match(/^\d*$/)) {
			alert(KE.lang['invalidWidth']);
			KE.$('imgWidth', dialogDoc).focus();
			return false;
		}
		if (!height.match(/^\d*$/)) {
			alert(KE.lang['invalidHeight']);
			KE.$('imgHeight', dialogDoc).focus();
			return false;
		}
		return true;
	},
	exec : function(id) {
		var self = this;
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var type = KE.$('type', dialogDoc).value;
		var width = KE.$('imgWidth', dialogDoc).value;
		var height = KE.$('imgHeight', dialogDoc).value;
		var title = KE.$('imgTitle', dialogDoc).value;
		var alignElements = dialogDoc.getElementsByName('align');
		var align = '';
		for (var i = 0, len = alignElements.length; i < len; i++) {
			if (alignElements[i].checked) {
				align = alignElements[i].value;
				break;
			}
		}
		if (!this.check(id)) return false;
		if (type == 2) {
			KE.$('editorId', dialogDoc).value = id;
			var uploadIframe = KE.$('uploadIframe', dialogDoc);
			KE.util.showLoadingPage(id);
			var onloadFunc = function() {
				KE.event.remove(uploadIframe, 'load', onloadFunc);
				KE.util.hideLoadingPage(id);
				var uploadDoc = KE.util.getIframeDoc(uploadIframe);
				var data = '';
				try {
					data = KE.util.parseJson(uploadDoc.body.innerHTML);
				} catch(e) {
					alert(KE.lang.invalidJson);
				}
				if (typeof data === 'object' && 'error' in data) {
					if (data.error === 0) {
						self.insert(id, data.url, title, width, height, 0, align);
					} else {
						alert(data.message);
						return false;
					}
				}
			};
			KE.event.add(uploadIframe, 'load', onloadFunc);
			dialogDoc.uploadForm.submit();
			return;
		} else {
			var url = KE.$('url', dialogDoc).value;
			this.insert(id, url, title, width, height, 0, align);
		}
	},
	insert : function(id, url, title, width, height, border, align) {
		var html = '<img src="' + url + '" kesrc="' + url + '" ';
		if (width > 0) html += 'width="' + width + '" ';
		if (height > 0) html += 'height="' + height + '" ';
		if (title) html += 'title="' + title + '" ';
		if (align) html += 'align="' + align + '" ';
		html += 'alt="' + title + '" ';
		html += 'border="' + border + '" />';
		KE.util.insertHtml(id, html);
		this.dialog.hide();
		KE.util.focus(id);
	}
};

KE.plugin['link'] = {
	getSelectedNode : function(id) {
		return KE.getCommonAncestor(KE.g[id].keSel, 'a');
	},
	init : function(id) {
		var self = this;
		KE.g[id].contextmenuItems.push({
			text : KE.lang['editLink'],
			click : function(id, menu) {
				KE.util.select(id);
				menu.hide();
				self.click(id);
			},
			cond : function(id) {
				return self.getSelectedNode(id);
			},
			options : {
				width : '150px',
				iconHtml : '<span class="ke-common-icon ke-common-icon-url ke-icon-link"></span>'
			}
		});
	},
	click : function(id) {
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'link',
			file : 'link/link.html',
			width : 400,
			height : 90,
			loadingMode : true,
			title : KE.lang['link'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	exec : function(id) {
		var g = KE.g[id];
		KE.util.select(id);
		var range = g.keRange;
		var startNode = range.startNode;
		var endNode = range.endNode;
		var iframeDoc = g.iframeDoc;
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var url = KE.$('hyperLink', dialogDoc).value;
		var target = KE.$('linkType', dialogDoc).value;
		if (!url.match(/.+/) || url.match(/^\w+:\/\/\/?$/)) {
			alert(KE.lang['invalidUrl']);
			KE.$('hyperLink', dialogDoc).focus();
			return false;
		}
		var node = range.getParentElement();
		while (node) {
			if (node.tagName.toLowerCase() == 'a' || node.tagName.toLowerCase() == 'body') break;
			node = node.parentNode;
		}
		node = node.parentNode;
		var isItem;
		if (KE.browser.IE) {
			isItem = !!g.range.item;
		} else {
			isItem = (startNode.nodeType == 1 && startNode === endNode && startNode.nodeName.toLowerCase() != 'br');
		}
		var isEmpty = !isItem;
		if (!isItem) isEmpty = KE.browser.IE ? g.range.text === '' : g.range.toString() === '';
		if (isEmpty || KE.util.isEmpty(id)) {
			var html = '<a href="' + url + '"';
			if (target) html += ' target="' + target + '"';
			html += '>' + url + '</a>';
			KE.util.insertHtml(id, html);
		} else {
			iframeDoc.execCommand('createlink', false, '__ke_temp_url__');
			var arr = node.getElementsByTagName('a');
			for (var i = 0, l = arr.length; i < l; i++) {
				if (arr[i].href.match(/\/?__ke_temp_url__$/)) {
					arr[i].href = url;
					arr[i].setAttribute('kesrc', url);
					if (target) arr[i].target = target;
					else arr[i].removeAttribute('target');
				}
			}
			if (KE.browser.WEBKIT && isItem && startNode.tagName.toLowerCase() == 'img') {
				var parent = startNode.parentNode;
				if (parent.tagName.toLowerCase() != 'a') {
					var a = KE.$$('a', iframeDoc);
					parent.insertBefore(a, startNode);
					a.appendChild(startNode);
					parent = a;
				}
				parent.href = url;
				parent.setAttribute('kesrc', url);
				if (target) parent.target = target;
				else parent.removeAttribute('target');
				g.keSel.addRange(range);
			}
		}
		KE.util.execOnchangeHandler(id);
		this.dialog.hide();
		KE.util.focus(id);
	}
};

KE.plugin['unlink'] = {
	init : function(id) {
		var self = this;
		KE.g[id].contextmenuItems.push({
			text : KE.lang['deleteLink'],
			click : function(id, menu) {
				KE.util.select(id);
				menu.hide();
				self.click(id);
			},
			cond : function(id) {
				return KE.plugin['link'].getSelectedNode(id);
			},
			options : {
				width : '150px',
				iconHtml : '<span class="ke-common-icon ke-common-icon-url ke-icon-unlink"></span>'
			}
		});
		KE.g[id].contextmenuItems.push('-');
	},
	click : function(id) {
		var g = KE.g[id];
		var iframeDoc = g.iframeDoc;
		KE.util.selection(id);
		var range = g.keRange;
		var startNode = range.startNode;
		var endNode = range.endNode;
		var isItem = (startNode.nodeType == 1 && startNode === endNode);
		var isEmpty = !isItem;
		if (!isItem) isEmpty = KE.browser.IE ? g.range.text === '' : g.range.toString() === '';
		if (isEmpty) {
			var linkNode = KE.plugin['link'].getSelectedNode(id);
			if (!linkNode) return;
			var range = g.keRange;
			range.selectTextNode(linkNode);
			g.keSel.addRange(range);
			KE.util.select(id);
			iframeDoc.execCommand('unlink', false, null);
			if (KE.browser.WEBKIT && startNode.tagName.toLowerCase() == 'img') {
				var parent = startNode.parentNode;
				if (parent.tagName.toLowerCase() == 'a') {
					KE.util.removeParent(parent);
					g.keSel.addRange(range);
				}
			}
		} else {
			iframeDoc.execCommand('unlink', false, null);
		}
		KE.util.execOnchangeHandler(id);
		KE.toolbar.updateState(id);
		KE.util.focus(id);
	}
};

KE.plugin['media'] = {
	init : function(id) {
		var self = this;
		var typeHash = {};
		KE.each(KE.g[id].mediaTypes, function(key, val) {
			typeHash[val] = key;
		});
		KE.g[id].getHtmlHooks.push(function(html) {
			return html.replace(/<img[^>]*class="?ke-\w+"?[^>]*>/ig, function($0) {
				var width = $0.match(/style="[^"]*;?\s*width:\s*(\d+)/i) ? RegExp.$1 : 0;
				var height = $0.match(/style="[^"]*;?\s*height:\s*(\d+)/i) ? RegExp.$1 : 0;
				width = width || ($0.match(/width="([^"]+)"/i) ? RegExp.$1 : 0);
				height = height || ($0.match(/height="([^"]+)"/i) ? RegExp.$1 : 0);
				if ($0.match(/\s+kesrctag="([^"]+)"/i)) {
					var attrs = KE.util.getAttrList(unescape(RegExp.$1));
					attrs.width = width || attrs.width || 0;
					attrs.height = height || attrs.height || 0;
					attrs.kesrc = attrs.src;
					return KE.util.getMediaEmbed(attrs);
				}
			});
		});
		KE.g[id].setHtmlHooks.push(function(html) {
			return html.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function($0, $1) {
				if (typeof typeHash[$1] == 'undefined') return $0;
				var src = $0.match(/\s+src="([^"]+)"/i) ? RegExp.$1 : '';
				if ($0.match(/\s+kesrc="([^"]+)"/i)) src = RegExp.$1;
				var width = $0.match(/\s+width="([^"]+)"/i) ? RegExp.$1 : 0;
				var height = $0.match(/\s+height="([^"]+)"/i) ? RegExp.$1 : 0;
				var attrs = KE.util.getAttrList($0);
				attrs.src = src;
				attrs.width = width;
				attrs.height = height;
				return KE.util.getMediaImage(id, '', attrs);
			});
		});
	},
	click : function(id) {
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'media',
			file : 'media.html',
			width : 400,
			height : 170,
			loadingMode : true,
			title : KE.lang['media'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	check : function(id, url, width, height) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		if (!url.match(/^.{3,}\.(swf|flv|mp3|wav|wma|wmv|mid|avi|mpg|mpeg|asf|rm|rmvb)(\?|$)/i)) {
			alert(KE.lang['invalidMedia']);
			KE.$('url', dialogDoc).focus();
			return false;
		}
		if (!width.match(/^\d*$/)) {
			alert(KE.lang['invalidWidth']);
			KE.$('width', dialogDoc).focus();
			return false;
		}
		if (!height.match(/^\d*$/)) {
			alert(KE.lang['invalidHeight']);
			KE.$('height', dialogDoc).focus();
			return false;
		}
		return true;
	},
	exec : function(id) {
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var url = KE.$('url', dialogDoc).value;
		var width = KE.$('width', dialogDoc).value;
		var height = KE.$('height', dialogDoc).value;
		if (!this.check(id, url, width, height)) return false;
		var autostart = KE.$('autostart', dialogDoc).checked ? 'true' : 'false';
		var html = KE.util.getMediaImage(id, '', {
			src : url,
			type : KE.g[id].mediaTypes[KE.util.getMediaType(url)],
			width : width,
			height : height,
			autostart : autostart,
			loop : 'true'
		});
		KE.util.insertHtml(id, html);
		this.dialog.hide();
		KE.util.focus(id);
	}
};

KE.plugin['advtable'] = {
	getSelectedTable : function(id) {
		return KE.getCommonAncestor(KE.g[id].keSel, 'table');
	},
	getSelectedRow : function(id) {
		return KE.getCommonAncestor(KE.g[id].keSel, 'tr');
	},
	getSelectedCell : function(id) {
		return KE.getCommonAncestor(KE.g[id].keSel, 'td');
	},
	tableprop : function(id) {
		this.click(id);
	},
	tableinsert : function(id) {
		this.click(id, 'insert');
	},
	tabledelete : function(id) {
		var table = this.getSelectedTable(id);
		table.parentNode.removeChild(table);
	},
	tablecolinsert : function(id, offset) {
		var table = this.getSelectedTable(id),
			cell = this.getSelectedCell(id),
			index = cell.cellIndex + offset;
		for (var i = 0, len = table.rows.length; i < len; i++) {
			var newCell = table.rows[i].insertCell(index);
			newCell.innerHTML = '&nbsp;';
		}
	},
	tablecolinsertleft : function(id) {
		this.tablecolinsert(id, 0);
	},
	tablecolinsertright : function(id) {
		this.tablecolinsert(id, 1);
	},
	tablerowinsert : function(id, offset) {
		var table = this.getSelectedTable(id),
			row = this.getSelectedRow(id),
			newRow = table.insertRow(row.rowIndex + offset);
		for (var i = 0, len = row.cells.length; i < len; i++) {
			var cell = newRow.insertCell(i);
			cell.innerHTML = '&nbsp;';
		}
	},
	tablerowinsertabove : function(id) {
		this.tablerowinsert(id, 0);
	},
	tablerowinsertbelow : function(id) {
		this.tablerowinsert(id, 1);
	},
	tablecoldelete : function(id) {
		var table = this.getSelectedTable(id);
		var cell = this.getSelectedCell(id);
		for (var i = 0, len = table.rows.length; i < len; i++) {
			table.rows[i].deleteCell(cell.cellIndex);
		}
	},
	tablerowdelete : function(id) {
		var table = this.getSelectedTable(id);
		var row = this.getSelectedRow(id);
		table.deleteRow(row.rowIndex);
	},
	init : function(id) {
		var self = this;
		var zeroborder = 'ke-zeroborder';
		var tableCmds = 'prop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,coldelete,rowdelete,insert,delete'.split(',');
		for (var i = 0, len = tableCmds.length; i < len; i++) {
			var name = 'table' + tableCmds[i];
			KE.g[id].contextmenuItems.push({
				text : KE.lang[name],
				click : (function(name) {
					return function(id, menu) {
						KE.util.select(id);
						menu.hide();
						if (self[name] !== undefined) self[name](id);
						if (!/prop/.test(name)) {
							KE.util.execOnchangeHandler(id);
						}
					};
				})(name),
				cond : (function(name) {
					if (KE.util.inArray(name, ['tableprop', 'tabledelete'])) {
						return function(id) {
							return self.getSelectedTable(id);
						};
					} else {
						return function(id) {
							return self.getSelectedCell(id);
						};
					}
				})(name),
				options : {
					width : '170px',
					iconHtml : '<span class="ke-common-icon ke-common-icon-url ke-icon-' + name + '"></span>'
				}
			});
		}
		KE.g[id].contextmenuItems.push('-');
		KE.g[id].setHtmlHooks.push(function(html) {
			return html.replace(/<table([^>]*)>/ig, function($0, $1) {
				if ($1.match(/\s+border=["']?(\d*)["']?/ig)) {
					var border = RegExp.$1;
					if ($1.indexOf(zeroborder) < 0 && (border === '' || border === '0')) {
						return KE.addClass($0, zeroborder);
					} else {
						return $0;
					}
				} else {
					return KE.addClass($0, zeroborder);
				}
			});
		});
	},
	click : function(id, mode) {
		mode = mode || 'default';
		var cmd = 'advtable';
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : cmd,
			file : 'advtable/advtable.html?mode=' + mode,
			width : 420,
			height : 220,
			loadingMode : true,
			title : KE.lang['advtable'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	exec : function(id) {
		var zeroborder = 'ke-zeroborder';
		var dialogDoc = KE.util.getIframeDoc(this.dialog.iframe);
		var modeBox = KE.$('mode', dialogDoc);
		var rowsBox = KE.$('rows', dialogDoc);
		var colsBox = KE.$('cols', dialogDoc);
		var widthBox = KE.$('width', dialogDoc);
		var heightBox = KE.$('height', dialogDoc);
		var widthTypeBox = KE.$('widthType', dialogDoc);
		var heightTypeBox = KE.$('heightType', dialogDoc);
		var paddingBox = KE.$('padding', dialogDoc);
		var spacingBox = KE.$('spacing', dialogDoc);
		var alignBox = KE.$('align', dialogDoc);
		var borderBox = KE.$('border', dialogDoc);
		var borderColorBox = KE.$('borderColor', dialogDoc);
		var backgroundColorBox = KE.$('backgroundColor', dialogDoc);
		var rows = rowsBox.value;
		var cols = colsBox.value;
		var width = widthBox.value;
		var height = heightBox.value;
		var widthType = widthTypeBox.value;
		var heightType = heightTypeBox.value;
		var padding = paddingBox.value;
		var spacing = spacingBox.value;
		var align = alignBox.value;
		var border = borderBox.value;
		var borderColor = borderColorBox.innerHTML;
		var backgroundColor = backgroundColorBox.innerHTML;
		if (rows == '' || rows == 0 || !rows.match(/^\d*$/)) {
			alert(KE.lang['invalidRows']);
			rowsBox.focus();
			return false;
		}
		if (cols == '' || cols == 0 || !cols.match(/^\d*$/)) {
			alert(KE.lang['invalidCols']);
			colsBox.focus();
			return false;
		}
		if (!width.match(/^\d*$/)) {
			alert(KE.lang['invalidWidth']);
			widthBox.focus();
			return false;
		}
		if (!height.match(/^\d*$/)) {
			alert(KE.lang['invalidHeight']);
			heightBox.focus();
			return false;
		}
		if (!padding.match(/^\d*$/)) {
			alert(KE.lang['invalidPadding']);
			paddingBox.focus();
			return false;
		}
		if (!spacing.match(/^\d*$/)) {
			alert(KE.lang['invalidSpacing']);
			spacingBox.focus();
			return false;
		}
		if (!border.match(/^\d*$/)) {
			alert(KE.lang['invalidBorder']);
			borderBox.focus();
			return false;
		}
		if (modeBox.value === 'update') {
			var table = this.getSelectedTable(id);
			if (width !== '') {
				table.style.width = width + widthType;
			} else if (table.style.width) {
				table.style.width = '';
			}
			if (table.width !== undefined) {
				table.removeAttribute('width');
			}
			if (height !== '') {
				table.style.height = height + heightType;
			} else if (table.style.height) {
				table.style.height = '';
			}
			if (table.height !== undefined) {
				table.removeAttribute('height');
			}
			if (backgroundColor !== '') {
				table.style.backgroundColor = backgroundColor;
			} else if (table.style.backgroundColor) {
				table.style.backgroundColor = '';
			}
			if (table.bgColor !== undefined) {
				table.removeAttribute('bgColor');
			}
			if (padding !== '') {
				table.cellPadding = padding;
			} else {
				table.removeAttribute('cellPadding');
			}
			if (spacing !== '') {
				table.cellSpacing = spacing;
			} else {
				table.removeAttribute('cellSpacing');
			}
			if (align !== '') {
				table.align = align;
			} else {
				table.removeAttribute('align');
			}
			if (border === '' || border === '0') {
				KE.addClass(table, zeroborder);
			} else {
				KE.removeClass(table, zeroborder);
			}
			if (border !== '') {
				table.setAttribute('border', border);
			} else {
				table.removeAttribute('border');
			}
			if (borderColor !== '') {
				table.setAttribute('borderColor', borderColor);
			} else {
				table.removeAttribute('borderColor');
			}
			KE.util.execOnchangeHandler(id);
		} else {
			var style = '';
			if (width !== '') style += 'width:' + width + widthType + ';';
			if (height !== '') style += 'height:' + height + heightType + ';';
			if (backgroundColor !== '') style += 'background-color:' + backgroundColor + ';';
			var html = '<table';
			if (style !== '') html += ' style="' + style + '"';
			if (padding !== '') html += ' cellpadding="' + padding + '"';
			if (spacing !== '') html += ' cellspacing="' + spacing + '"';
			if (align !== '') html += ' align="' + align + '"';
			if (border === '' || border === '0') html += ' class="' + zeroborder + '"';
			if (border !== '') html += ' border="' + border + '"';
			if (borderColor !== '') html += ' bordercolor="' + borderColor + '"';
			html += '>';
			for (var i = 0; i < rows; i++) {
				html += '<tr>';
				for (var j = 0; j < cols; j++) {
					html += '<td>&nbsp;</td>';
				}
				html += '</tr>';
			}
			html += '</table>';
			KE.util.insertHtml(id, html);
		}
		this.dialog.hide();
		KE.util.focus(id);
	}
};

})(KindEditor);
