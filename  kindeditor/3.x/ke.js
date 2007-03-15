/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0 alpha
*/
var KE = {};
KE.get = function(str){
	return document.getElementById(str);
};
KE.el = function(str){
	return document.createElement(str);
};
KE.event = {
	add : function(el, event, listener)
	{
		if (el.addEventListener){
			el.addEventListener(event, listener, false); 
		} else if (el.attachEvent){
			el.attachEvent('on' + event, listener);
		}
	}
};
KE.util = {
	getScriptPath : function()
	{
		var elements = document.getElementsByTagName('script');
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].src && elements[i].src.indexOf('ke.js') != -1) {
				return elements[i].src.substring(0, elements[i].src.lastIndexOf('/') + 1);
			}
		}
	},
	getHtmlPath : function()
	{
		return location.href.substring(0, location.href.lastIndexOf('/') + 1);
	},
	getBrowser : function()
	{
		var browser = '';
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("msie 7") > -1) {
			browser = 'IE7';
		} else if (ua.indexOf("msie") > -1) {
			browser = 'IE';
		} else if (ua.indexOf("gecko") > -1) {
			browser = 'GECKO';
		} else if (ua.indexOf("webkit") > -1) {
			browser = 'SAFARI';
		} else if (ua.indexOf("opera") > -1) {
			browser = 'OPERA';
		}
		return browser;
	},
	loadScript : function(path)
	{
		var script = KE.el('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('charset', 'utf-8');
		script.setAttribute('src', path);
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	loadStyle : function(path)
	{
		var link = KE.el('link');
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', path);
		document.getElementsByTagName("head")[0].appendChild(link);
	},
	inArray : function(str, arr)
	{
		for (var i in arr) {if (str == arr[i]) return true;}
		return false;
	},
	getTop : function(el)
	{
		var top = el.offsetTop;
		var parent = el.offsetParent;
		while (parent) { top += parent.offsetTop; parent = parent.offsetParent; }
		return top;
	},
	getLeft : function(el)
	{
		var left = el.offsetLeft;
		var parent = el.offsetParent;
		while (parent) { left += parent.offsetLeft; parent = parent.offsetParent; }
		return left;
	}
}
KE.editor = {
	setDefaultPlugin : function(id)
	{
		var items = [
			'undo', 'redo', 'cut', 'copy', 'paste', 'selectall', 'justifyleft', 'justifycenter', 'justifyright', 
			'justifyfull', 'numberedlist', 'unorderedlist', 'indent', 'outdent', 'subscript','superscript', 
			'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'unlink', 'print'
		];
		for (var i in items) {
			KE.plugin[items[i]] = {
				icon	: items[i] + '.gif',
				click : new Function('KE.cache["' + id + '"].iframeDoc.execCommand("' + items[i] + '", false, null)')
			};
		}
	},
	getFullHtml : function(id, body)
	{
		var html = '<html>';
		html += '<head>';
		html += '<base href="' + KE.htmlPath + '" />';
		html += '<title>blank_page</title>';
		html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
		html += '<link href="' + KE.cache[id].cssPath + '" rel="stylesheet" type="text/css" />';
		html += '</head>';
		html += '<body>';
		html += body;
		html += '</body>';
		html += '</html>';
		return html;
	},
	getData : function(id)
	{
		var html;
		if (KE.cache[id].wyswygMode == true) {
			html = KE.cache[id].iframeDoc.body.innerHTML;
		} else {
			html = KE.cache[id].newTextarea.value;
		}
		KE.cache[id].hideInput.value = html;
		return html;
	},
	focus : function(id)
	{
		if (KE.cache[id].wyswygMode == true) {
			KE.cache[id].iframeWin.focus();
		} else {
			KE.cache[id].newTextarea.focus();
		}
	},
	click : function(id, cmd)
	{
		KE.menu.hide(id);
		KE.editor.focus(id);
		KE.plugin[cmd].click(id);
	},
	selection : function(id)
	{
		var selection, range, rangeText;
		if (KE.cache[id].iframeDoc.selection) {
			selection = KE.cache[id].iframeDoc.selection;
			range = selection.createRange();
			rangeText = range.text;
		} else {
			selection = KE.cache[id].iframeWin.getSelection();
			range = selection.getRangeAt(0);
			rangeText = range.toString();
		}
		KE.cache[id].selection = selection;
		KE.cache[id].range = range;
		KE.cache[id].rangeText = rangeText;
	},
	insertHtml : function(id, html)
	{
		if (KE.browser == 'IE') {
			KE.cache[id].range.select();
			if (KE.cache[id].selection.type.toLowerCase() == 'control') {
				KE.cache[id].range.item(0).outerHTML = html;
			} else {
				KE.cache[id].range.pasteHTML(html);
			}
		} else {
			KE.cache[id].iframeDoc.execCommand('inserthtml', false, html);
		}
	}
};
KE.picker = {
	create : function(id, cmd)
	{
		var colorTable = [
				["#FFFFFF","#E5E4E4","#D9D8D8","#C0BDBD","#A7A4A4","#8E8A8B","#827E7F","#767173","#5C585A","#000000"],
				["#FEFCDF","#FEF4C4","#FEED9B","#FEE573","#FFED43","#F6CC0B","#E0B800","#C9A601","#AD8E00","#8C7301"],
				["#FFDED3","#FFC4B0","#FF9D7D","#FF7A4E","#FF6600","#E95D00","#D15502","#BA4B01","#A44201","#8D3901"],
				["#FFD2D0","#FFBAB7","#FE9A95","#FF7A73","#FF483F","#FE2419","#F10B00","#D40A00","#940000","#6D201B"],
				["#FFDAED","#FFB7DC","#FFA1D1","#FF84C3","#FF57AC","#FD1289","#EC0078","#D6006D","#BB005F","#9B014F"],
				["#FCD6FE","#FBBCFF","#F9A1FE","#F784FE","#F564FE","#F546FF","#F328FF","#D801E5","#C001CB","#8F0197"],
				["#E2F0FE","#C7E2FE","#ADD5FE","#92C7FE","#6EB5FF","#48A2FF","#2690FE","#0162F4","#013ADD","#0021B0"],
				["#D3FDFF","#ACFAFD","#7CFAFF","#4AF7FE","#1DE6FE","#01DEFF","#00CDEC","#01B6DE","#00A0C2","#0084A0"],
				["#EDFFCF","#DFFEAA","#D1FD88","#BEFA5A","#A8F32A","#8FD80A","#79C101","#3FA701","#307F00","#156200"],
				["#D4C89F","#DAAD88","#C49578","#C2877E","#AC8295","#C0A5C4","#969AC2","#92B7D7","#80ADAF","#9CA53B"]
			];
		var table = KE.el('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		table.style.width = '130px';
		for (var i = 0; i < colorTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < colorTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.className = 'ke-picker-cell';
				cell.style.background = colorTable[i][j];
				cell.title = colorTable[i][j];
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + colorTable[i][j] + '")');
				cell.innerHTML = '&nbsp;';
			}
		}
		return table;
	}
};
KE.box = {
	getTop : function(id, width, height)
	{
		return (KE.util.getTop(KE.cache[id].containerDiv) + Math.round(parseInt(KE.cache[id].height) / 2) - Math.round(height / 2)) + 'px';
	},
	getLeft : function(id, width, height)
	{
		return (KE.util.getLeft(KE.cache[id].containerDiv) + Math.round(parseInt(KE.cache[id].width) / 2) - Math.round(width / 2)) + 'px';
	},
	alert : function(id, width, height)
	{
		var div = KE.el('div');
		div.className = 'ke-box';
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		div.style.top = this.getTop(id, width, height);
		div.style.left = this.getLeft(id, width, height);
		return div;
	},
	dialog : function(id, width, height)
	{
		var obj = KE.cache[id];
		var div = KE.el('div');
		div.className = 'ke-dialog';
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		div.style.top = (KE.util.getTop(obj.containerDiv) + Math.round(parseInt(obj.height) / 2) - Math.round(height / 2)) + 'px';
		div.style.left = (KE.util.getLeft(obj.containerDiv) + Math.round(parseInt(obj.width) / 2) - Math.round(width / 2)) + 'px';
		return div;
	}
};
KE.menu = {
	show : function(id, div)
	{
		KE.menu.hide(id);
		KE.cache[id].hideDiv.appendChild(div);
		KE.cache[id].hideDiv.style.display = 'block';
		KE.cache[id].windowDiv = div;
	},
	hide : function(id)
	{
		try {
			KE.cache[id].hideDiv.removeChild(KE.cache[id].windowDiv);
		} catch (e) {}
		KE.cache[id].hideDiv.style.display = 'none';
	},
	create : function(id, cmd)
	{
		var obj = KE.cache[id].toolbarIcon[cmd];
		var div = KE.el('div');
		div.className = 'ke-menu';
		div.style.position = 'absolute';
		div.style.top = KE.util.getTop(obj) + obj.offsetHeight + 'px';
		div.style.left = KE.util.getLeft(obj) + 'px';
		div.style.zIndex = 1;
		return div;
	}
};
KE.toolbar = {
	items : [],
	able : function(id, arr)
	{
		for (var cmd in KE.cache[id].toolbarIcon) {
			if (KE.util.inArray(cmd, arr)) continue;
			KE.cache[id].toolbarIcon[cmd].className = 'ke-icon';
			KE.cache[id].toolbarIcon[cmd].onmouseover = new Function('KE.get("toolbarIcon' + cmd + '").className = "ke-icon-selected"');
			KE.cache[id].toolbarIcon[cmd].onmouseout = new Function('KE.get("toolbarIcon' + cmd + '").className = "ke-icon"');
			KE.cache[id].toolbarIcon[cmd].onclick = new Function('KE.editor.click("' + id + '", "' + cmd + '")');
		}
	},
	disable : function(id, arr)
	{
		for (var cmd in KE.cache[id].toolbarIcon) {
			if (KE.util.inArray(cmd, arr)) continue;
			KE.cache[id].toolbarIcon[cmd].className = 'ke-icon-disabled';
			KE.cache[id].toolbarIcon[cmd].onmouseover = function(){ };
			KE.cache[id].toolbarIcon[cmd].onmouseout = function(){ };
			KE.cache[id].toolbarIcon[cmd].onclick = function(){ };
		}
	},
	create : function(id)
	{
		KE.cache[id].toolbarIcon = [];
		var el = KE.el('div');
		el.className = 'ke-toolbar';
		for (var i in KE.toolbar.items) {
			var cmd = KE.toolbar.items[i];
			var obj;
			if (cmd == '-') {
				obj = KE.el('br');
			} else {
				obj = KE.el('img');
				obj.id = 'toolbarIcon' + cmd;
				obj.src = KE.cache[id].skinsPath + KE.plugin[cmd].icon;
				obj.align = 'absmiddle';
				obj.className = 'ke-icon';
				obj.alt = KE.lang[KE.cache[id].langType][cmd];
				obj.title = KE.lang[KE.cache[id].langType][cmd];
				obj.onmouseover = new Function('KE.get("toolbarIcon' + cmd + '").className = "ke-icon-selected"');
				obj.onmouseout = new Function('KE.get("toolbarIcon' + cmd + '").className = "ke-icon"');
				obj.onclick = new Function('KE.editor.click("' + id + '", "' + cmd + '")');
				KE.cache[id].toolbarIcon[cmd] = obj;
			}
			el.appendChild(obj);
		}
		return el;
	}
};
KE.create = function(id)
{
	var oldTextarea = KE.get(id);
	var width = oldTextarea.style.width;
	var height = oldTextarea.style.height;

	var widthArr = width.match(/(\d+)([px%]{1,2})/);
	var formWidth, formHeight;
	if (widthArr[2] == '%') formWidth = width;
	else formWidth = (parseInt(widthArr[1]) - 2).toString(10) + widthArr[2];
	var heightArr = height.match(/(\d+)([px%]{1,2})/);
	if (heightArr[2] == '%') formHeight = height;
	else formHeight = (parseInt(heightArr[1]) - 4).toString(10) + heightArr[2];
	
	var containerDiv = KE.el('div');
	containerDiv.className = 'ke-container';
	containerDiv.style.width = width;
	//containerDiv.style.visibility = 'hidden';
	oldTextarea.parentNode.insertBefore(containerDiv, oldTextarea);
	
	var formDiv = KE.el('div');
	formDiv.className = 'ke-form';
	formDiv.style.height = height;

	var iframe = KE.el('iframe');
	iframe.id = id + 'Iframe';
	iframe.name = id + 'Iframe';
	iframe.style.width = formWidth;
	iframe.style.height = formHeight;
	iframe.setAttribute("frameBorder", "0");

	var newTextarea = KE.el('textarea');
	newTextarea.className = 'ke-textarea';
	newTextarea.style.width = formWidth;
	newTextarea.style.height = formHeight;
	newTextarea.style.display = 'none';
	var hideInput;
	if (KE.browser == 'IE') {
		hideInput = KE.el('<input type="hidden" name="' + oldTextarea.name + '">');
	} else {
		hideInput = KE.el('input');
		hideInput.setAttribute('type', 'hidden');
		hideInput.setAttribute('name', oldTextarea.name);
	}
	var hideDiv = KE.el('div');
	hideDiv.style.display = 'none';
	formDiv.appendChild(iframe);
	formDiv.appendChild(newTextarea);

	KE.editor.setDefaultPlugin(id);
	containerDiv.appendChild(KE.toolbar.create(id));
	containerDiv.appendChild(formDiv);
	containerDiv.appendChild(hideInput);
	containerDiv.appendChild(hideDiv);
	var iframeWin = iframe.contentWindow;
	var iframeDoc = iframeWin.document;
	iframeDoc.designMode = "on";
	var html = KE.editor.getFullHtml(id, oldTextarea.value);
	iframeDoc.open();
	iframeDoc.write(html);
	iframeDoc.close();
	if (KE.cache[id].wyswygMode == false) {
		newTextarea.value = oldTextarea.value;
		newTextarea.style.display = 'block';
		iframe.style.display = 'none';
	}
	oldTextarea.parentNode.removeChild(oldTextarea);

	var form = hideDiv.parentNode;
	while (form.tagName != 'FORM') { form = form.parentNode; }
	KE.event.add(form, 'submit', new Function('KE.editor.getData("' + id + '")'));
	KE.event.add(iframeDoc, 'mousedown', new Function('KE.menu.hide("' + id + '")'));
	KE.event.add(newTextarea, 'mousedown', new Function('KE.menu.hide("' + id + '")'));
	//containerDiv.style.visibility = 'visible';
	KE.cache[id].containerDiv = containerDiv;
	KE.cache[id].iframe = iframe;
	KE.cache[id].newTextarea = newTextarea;
	KE.cache[id].hideInput = hideInput;
	KE.cache[id].hideDiv = hideDiv;
	KE.cache[id].iframeWin = iframeWin;
	KE.cache[id].iframeDoc = iframeDoc;
	KE.cache[id].width = width;
	KE.cache[id].height = height;
	KE.editor.focus(id);
};
KE.version = '3.0 alpha';
KE.scriptPath = KE.util.getScriptPath();
KE.htmlPath = KE.util.getHtmlPath();
KE.browser = KE.util.getBrowser();
KE.lang = {};
KE.plugin = {};
KE.cache = {};
KE.show = function(config) 
{
	KE.cache[config.id] = config;
	config.skinsPath = KE.scriptPath + 'skins/' + config.skinType + '/';
	KE.util.loadStyle(KE.scriptPath + 'skins/' + config.skinType + '.css');
	KE.util.loadScript(KE.scriptPath + 'langs/' + config.langType + '.js');
	KE.util.loadScript(KE.scriptPath + 'plugin_' + config.pluginType + '.js');
	KE.event.add(window, 'load', new Function('KE.create("' + config.id + '")'));
};
