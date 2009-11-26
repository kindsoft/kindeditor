// http://www.JSON.org/json2.js
// See http://www.JSON.org/js.html
if (!this.JSON) {
	this.JSON = {};
}
(function () {
	function f(n) {
		return n < 10 ? '0' + n : n;
	}
	if (typeof Date.prototype.toJSON !== 'function') {
		Date.prototype.toJSON = function (key) {
			return isFinite(this.valueOf()) ?
				   this.getUTCFullYear()   + '-' +
				 f(this.getUTCMonth() + 1) + '-' +
				 f(this.getUTCDate())	  + 'T' +
				 f(this.getUTCHours())	 + ':' +
				 f(this.getUTCMinutes())   + ':' +
				 f(this.getUTCSeconds())   + 'Z' : null;
		};
		String.prototype.toJSON =
		Number.prototype.toJSON =
		Boolean.prototype.toJSON = function (key) {
			return this.valueOf();
		};
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap,
		indent,
		meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		},
		rep;
	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ?
			'"' + string.replace(escapable, function (a) {
				var c = meta[a];
				return typeof c === 'string' ? c :
					'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' :
			'"' + string + '"';
	}
	function str(key, holder) {
		var i,		  // The loop counter.
			k,		  // The member key.
			v,		  // The member value.
			length,
			mind = gap,
			partial,
			value = holder[key];
		if (value && typeof value === 'object' &&
				typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}
		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}
		switch (typeof value) {
		case 'string':
			return quote(value);
		case 'number':
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
		case 'null':
			return String(value);
		case 'object':
			if (!value) {
				return 'null';
			}
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === '[object Array]') {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}
				v = partial.length === 0 ? '[]' :
					gap ? '[\n' + gap +
							partial.join(',\n' + gap) + '\n' +
								mind + ']' :
						  '[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}
			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					k = rep[i];
					if (typeof k === 'string') {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			} else {
				for (k in value) {
					if (Object.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}
			v = partial.length === 0 ? '{}' :
				gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
						mind + '}' : '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}
	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function (value, replacer, space) {
			var i;
			gap = '';
			indent = '';
			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}
			} else if (typeof space === 'string') {
				indent = space;
			}
			rep = replacer;
			if (replacer && typeof replacer !== 'function' &&
					(typeof replacer !== 'object' ||
					 typeof replacer.length !== 'number')) {
				throw new Error('JSON.stringify');
			}
			return str('', {'': value});
		};
	}
	if (typeof JSON.parse !== 'function') {
		JSON.parse = function (text, reviver) {
			var j;
			function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function (a) {
					return '\\u' +
						('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}
			if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
				j = eval('(' + text + ')');
				return typeof reviver === 'function' ?
					walk({'': j}, '') : j;
			}
			throw new SyntaxError('JSON.parse');
		};
	}
}());
// http://www.JSON.org/json2.js end

var JSON_URL = './../../php/file_manager_json.php';

var KE = parent.KE;
location.href.match(/\?id=([\w-]+)/i);
var id = RegExp.$1;
KE.event.ready(function() {
	var moveupLink = KE.$('moveup', document);
	var viewType = KE.$('viewType', document);
	var orderType = KE.$('orderType', document);
	var listTable = KE.$('listTable', document);
	var viewTable = KE.$('viewTable', document);
	var listDiv = KE.$('listDiv', document);
	var viewDiv = KE.$('viewDiv', document);
	var changeType = function(type) {
		if (type == 'VIEW') {
			listDiv.style.display = 'none';
			viewDiv.style.display = '';
		} else {
			listDiv.style.display = '';
			viewDiv.style.display = 'none';
		}
	};
	var insertLink = function(url) {
		var stack = KE.g[id].dialogStack;
		if (stack.length > 1) {
			var parentDialog = stack[stack.length - 2];
			var dialogDoc = KE.util.getIframeDoc(parentDialog.iframe);
			KE.$('url', dialogDoc).value = url;
			var currentDialog = stack[stack.length - 1];
			currentDialog.hide();
			return true;
		} else {
			return false;
		}
	}
	var insertImage = function(url, title) {
		if (!insertLink(url)) {
			KE.util.insertHtml(id, '<img src="' + url + '" alt="' + title + '" border="0" />');
		}
	};
	var insertFile = function(url, title) {
		if (!insertLink(url)) {
			KE.util.insertHtml(id, '<a href="' + url + '" target="_blank">' + title + '</a>');
		}
	};
	var makeFileTitle = function (filename, filesize, datetime) {
		var title = filename + ' (' + Math.ceil(filesize / 1024) + 'KB, ' + datetime + ')';
		return title;
	};
	var bindTitle = function (el, data) {
		if (data.is_dir) {
			el.title = data.filename;
		} else {
			el.title = makeFileTitle(data.filename, data.filesize, data.datetime);
		}
	};
	var bindEvent = function (el, result, data, createFunc) {
		var fileUrl = result.current_url + data.filename;
		fileUrl = KE.format.getUrl(fileUrl, KE.g[id].urlType);
		if (data.is_dir) {
			el.onclick = (function (url, path, title) {
				return function () {
					reloadPage(path, orderType.value, createFunc);
				}
			})(fileUrl, escape(result.current_dir_path + data.filename + '/'), data.filename);
		} else if (data.is_photo) {
			el.onclick = (function (url, title) {
				return function () {
					insertImage(url, title);
				}
			})(fileUrl, data.filename);
		} else {
			el.onclick = (function (url, title) {
				return function () {
					insertFile(url, title);
				}
			})(fileUrl, data.filename);
		}
	};
	var createCommon = function(result, createFunc) {
		if (result.current_dir_path) {
			moveupLink.onclick = function () {
				reloadPage(result.moveup_dir_path, orderType.value, createFunc);
			};
		} else {
			moveupLink.onclick = null;
		}
		var onchangeFunc = function() {
			changeType(viewType.value);
			if (viewType.value == 'VIEW') reloadPage(result.current_dir_path, orderType.value, createView);
			else reloadPage(result.current_dir_path, orderType.value, createList);
		};
		viewType.onchange = onchangeFunc;
		orderType.onchange = onchangeFunc;
	};
	var createList = function(responseText) {
		listDiv.innerHTML = '';
		var result = JSON.parse(responseText);
		createCommon(result, createList);
		var table = KE.$$('table', document);
		table.className = 'file-list-table';
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		listDiv.appendChild(table);
		var fileList = result.file_list;
		for (var i = 0, len = fileList.length; i < len; i++) {
			var data = fileList[i];
			var row = table.insertRow(i);
			row.onmouseover = function () { this.className = 'selected'; };
			row.onmouseout = function () { this.className = 'noselected'; };
			var cell0 = row.insertCell(0);
			cell0.className = 'name';
			var iconName = data.is_dir ? 'folder-16.gif' : 'file-16.gif';
			var img = KE.$$('img', document);
			img.src = './images/' + iconName;
			img.width = 16;
			img.height = 16;
			img.alt = data.filename;
			cell0.appendChild(img);
			cell0.appendChild(document.createTextNode(' ' + data.filename));
			if (!data.is_dir || data.has_file) {
				row.style.cursor = 'pointer';
				img.title = data.filename;
				cell0.title = data.filename;
				bindEvent(cell0, result, data, createList);
			} else {
				img.title = '空文件夹';
				cell0.title = '空文件夹';
			}
			var cell1 = row.insertCell(1);
			cell1.className = 'size';
			cell1.innerHTML = data.is_dir ? '-' : Math.ceil(data.filesize / 1024) + 'KB';
			var cell2 = row.insertCell(2);
			cell2.className = 'datetime';
			cell2.innerHTML = data.datetime;
		}
	};
	var createView = function(responseText) {
		viewDiv.innerHTML = '';
		var result = JSON.parse(responseText);
		createCommon(result, createView);
		var fileList = result.file_list;
		for (var i = 0, len = fileList.length; i < len; i++) {
			var data = fileList[i];
			var div = KE.$$('div', document);
			div.className = 'file-view-area';
			viewDiv.appendChild(div);
			var tableObj = KE.util.createTable(document);
			var table = tableObj.table;
			table.className = 'photo noselected';
			table.onmouseover = function () { this.className = 'photo selected'; };
			table.onmouseout = function () { this.className = 'photo noselected'; };
			var cell = tableObj.cell;
			cell.valign = 'middle';
			cell.align = 'center';
			var fileUrl = result.current_url + data.filename;
			var iconUrl = data.is_dir ? './images/folder-64.gif' : (data.is_photo ? fileUrl : './images/file-64.gif');
			var img = KE.$$('img', document);
			img.src = iconUrl;
			img.width = data.is_dir ? 64 : 80;
			img.height = data.is_dir ? 64 : 80;
			img.alt = data.filename;
			if (!data.is_dir || data.has_file) {
				table.style.cursor = 'pointer';
				bindTitle(img, data);
				bindTitle(table, data);
				bindEvent(table, result, data, createView);
			} else {
				img.title = '空文件夹';
				table.title = '空文件夹';
			}
			cell.appendChild(img);
			div.appendChild(table);
			var titleDiv = KE.$$('div', document);
			titleDiv.className = 'name';
			titleDiv.title = data.filename;
			titleDiv.innerHTML = data.filename;
			div.appendChild(titleDiv);
		}
	};
	var httpRequest = function (param, func) {
		KE.util.showLoadingPage(id);
		var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		var url = JSON_URL;
		url += param;
		url += (url.match(/\?/) ? "&" : "?") + (new Date()).getTime()
		req.open('GET', url, true);
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if(req.status == 200) {
					func(req.responseText);
					KE.util.hideLoadingPage(id);
				}
			}
		};
		req.send(null);
	};
	var reloadPage = function (path, order, func) {
		httpRequest('?path=' + path + '&order=' + order, func);
	};
	changeType('VIEW');
	viewType.value = 'VIEW';
	reloadPage('', orderType.value, createView);
}, window, document);