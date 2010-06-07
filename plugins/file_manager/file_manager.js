var JSON_URL = '../../php/file_manager_json.php';

var KE = parent.KindEditor;
location.href.match(/\?id=([\w-]+)/i);
var id = RegExp.$1;
var fileManagerJson = (typeof KE.g[id].fileManagerJson == 'undefined') ? JSON_URL : KE.g[id].fileManagerJson;
var lang = KE.lang.plugins.file_manager;
KE.event.ready(function() {
	var moveupImg = KE.$('moveupImg', document);
	var moveupLink = KE.$('moveup', document);
	var viewType = KE.$('viewType', document);
	var orderType = KE.$('orderType', document);
	var listTable = KE.$('listTable', document);
	var viewTable = KE.$('viewTable', document);
	var listDiv = KE.$('listDiv', document);
	var viewDiv = KE.$('viewDiv', document);
	moveupImg.alt = moveupImg.title = lang.moveup;
	viewType.options[0] = new Option(lang.viewImage, 'VIEW');
	viewType.options[1] = new Option(lang.listImage, 'LIST');
	orderType.options[0] = new Option(lang.fileName, 'NAME');
	orderType.options[1] = new Option(lang.fileSize, 'SIZE');
	orderType.options[2] = new Option(lang.fileType, 'TYPE');
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
		fileUrl = KE.format.getUrl(fileUrl, 'absolute');
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
		var result = KE.util.parseJson(responseText);
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
			img.align = 'absmiddle';
			img.alt = data.filename;
			cell0.appendChild(img);
			cell0.appendChild(document.createTextNode(' ' + data.filename));
			if (!data.is_dir || data.has_file) {
				row.style.cursor = 'pointer';
				img.title = data.filename;
				cell0.title = data.filename;
				bindEvent(cell0, result, data, createList);
			} else {
				img.title = lang.emptyFolder;
				cell0.title = lang.emptyFolder;
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
		var result = KE.util.parseJson(responseText);
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
				img.title = lang.emptyFolder;
				table.title = lang.emptyFolder;
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
		var url = fileManagerJson;
		url += param;
		url += (url.match(/\?/) ? "&" : "?") + (new Date()).getTime()
		req.open('GET', url, true);
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if(req.status == 200) {
					func(req.responseText);
					KE.util.pluginLang('file_manager', document);
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