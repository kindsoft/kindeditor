/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0 alpha
*/
var KE = {};
KE.util = {
	'getScriptPath' : function()
	{
		var elements = document.getElementsByTagName('script');
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].src && elements[i].src.indexOf('ke.js') != -1) {
				return elements[i].src.substring(0, elements[i].src.lastIndexOf('/') + 1);
			}
		}
	},
	'getHtmlPath' : function()
	{
		return location.href.substring(0, location.href.lastIndexOf('/') + 1);
	},
	'getBrowserType' : function()
	{
		var browser = '';
		var agentInfo = navigator.userAgent.toLowerCase();
		if (agentInfo.indexOf("msie") > -1) {
			var re = new RegExp("msie\\s?([\\d\\.]+)","ig");
			var arr = re.exec(agentInfo);
			if (parseInt(RegExp.$1) >= 5.5) {
				browser = 'IE';
			}
		} else if (agentInfo.indexOf("firefox") > -1) {
			browser = 'FF';
		} else if (agentInfo.indexOf("netscape") > -1) {
			var temp1 = agentInfo.split(' ');
			var temp2 = temp1[temp1.length-1].split('/');
			if (parseInt(temp2[1]) >= 7) {
				browser = 'NS';
			}
		} else if (agentInfo.indexOf("gecko") > -1) {
			browser = 'ML';
		} else if (agentInfo.indexOf("opera") > -1) {
			var temp1 = agentInfo.split(' ');
			var temp2 = temp1[0].split('/');
			if (parseInt(temp2[1]) >= 9) {
				browser = 'OPERA';
			}
		}
		return browser;
	},
	'loadScript' : function(path)
	{
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('charset', 'utf-8');
		script.setAttribute('src', path);
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	'loadStyle' : function(path)
	{
		var link = document.createElement('link');
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', path);
		document.getElementsByTagName("head")[0].appendChild(link);
	},
	'addEvent' : function(object, event ,listener)
	{
		if (object.addEventListener){
			object.addEventListener(event, listener, false); 
		} else if (object.attachEvent){
			object.attachEvent('on' + event, listener);
		}
	},
	'getFullHtml' : function(cssPath, body)
	{
		var html = '<html>';
		html += '<head>';
		html += '<base href="' + KE.htmlPath + '" />';
		html += '<title>blank_page</title>';
		html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
		html += '<link href="' + cssPath + '" rel="stylesheet" type="text/css" />';
		html += '</head>';
		html += '<body>';
		html += body;
		html += '</body>';
		html += '</html>';
		return html;
	},
	'getPopupMenu' : function(textareaName, cmd)
	{
		var obj = KE.editor[textareaName];
		var iconObj = obj.toolbarIcon[cmd];
		var div = document.createElement('div');
		div.className = 'editorMenu';
		div.style.position = 'absolute';
		div.style.top = KE.util.getTop(iconObj) + iconObj.offsetHeight + 'px';
		div.style.left = KE.util.getLeft(iconObj) + 'px';
		div.style.zIndex = 1;
		return div;
	},
	'getPopupWindow' : function(textareaName, width, height)
	{
		var obj = KE.editor[textareaName];
		var div = document.createElement('div');
		div.className = 'editorWindow';
		div.style.position = 'absolute';
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		div.style.top = (KE.util.getTop(obj.baseDiv) + Math.round(parseInt(obj.editorHeight) / 2) - Math.round(height / 2)) + 'px';
		div.style.left = (KE.util.getLeft(obj.baseDiv) + Math.round(parseInt(obj.editorWidth) / 2) - Math.round(width / 2)) + 'px';
		div.style.zIndex = 1;
		return div;
	},
	'getColorTable' : function(textareaName, cmd)
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
		var iconObj = document.getElementById(textareaName + 'icon' + cmd);
		var obj = KE.editor[textareaName];
		var table = document.createElement('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		table.style.width = '130px';
		for (var i = 0; i < colorTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < colorTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.style.width = '12px';
				cell.style.height = '12px';
				cell.style.fontSize = '1px';
				cell.style.cursor = 'pointer';
				cell.style.background = colorTable[i][j];
				cell.title = colorTable[i][j];
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + colorTable[i][j] + '")');
				cell.innerHTML = '&nbsp;';
			}
		}
		return table;
	},
	'getTop' : function(el)
	{
		var top = el.offsetTop;
		var parent = el.offsetParent;
		while (parent) { top += parent.offsetTop; parent = parent.offsetParent; }
		return top;
	},
	'getLeft' : function(el)
	{
		var left = el.offsetLeft;
		var parent = el.offsetParent;
		while (parent) { left += parent.offsetLeft; parent = parent.offsetParent; }
		return left;
	},
	'getData' : function(textareaName)
	{
		var obj = KE.editor[textareaName];
		var html;
		if (obj.codeMode == 'no') {
			html = obj.iframeDoc.body.innerHTML;
		} else {
			html = obj.newTextarea.value;
		}
		obj.hideInput.value = html;
		return html;
	},
	'focus' : function(textareaName)
	{
		var obj = KE.editor[textareaName];
		if (obj.codeMode == 'no') {
			obj.iframeWin.focus();
		} else {
			obj.newTextarea.focus();
		}
	},
	'showWindow' : function(textareaName, div)
	{
		KE.util.hideWindow(textareaName);
		var obj = KE.editor[textareaName];
		obj.hideDiv.appendChild(div);
		obj.hideDiv.style.display = 'block';
		KE.editor[textareaName].windowDiv = div;
	},
	'hideWindow' : function(textareaName)
	{
		var obj = KE.editor[textareaName];
		try {
			obj.hideDiv.removeChild(KE.editor[textareaName].windowDiv);
		} catch (e) {}
		obj.hideDiv.style.display = 'none';
	},
	'click' : function(textareaName, cmd)
	{
		var obj = KE.editor[textareaName];
		KE.util.hideWindow(textareaName);
		KE.util.focus(textareaName);
		KE.plugin[cmd].click(textareaName);
	},
	'getSelection' : function(textareaName)
	{
		var obj = KE.editor[textareaName];
		var selection, range, rangeText;
		if (obj.iframeDoc.selection) {
			selection = obj.iframeDoc.selection;
			range = selection.createRange();
			rangeText = range.text;
		} else {
			selection = obj.iframeWin.getSelection();
			range = selection.getRangeAt(0);
			rangeText = range.toString();
		}
		KE.editor[textareaName].selection = selection;
		KE.editor[textareaName].range = range;
		KE.editor[textareaName].rangeText = rangeText;
	},
	'insertHtml' : function(textareaName, html)
	{
		var obj = KE.editor[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
			if (obj.selection.type.toLowerCase() == 'control') {
				obj.range.item(0).outerHTML = html;
			} else {
				obj.range.pasteHTML(html);
			}
		} else {
			obj.iframeDoc.execCommand('inserthtml', false, html);
		}
	}
};
KE.version = '3.0 alpha';
KE.scriptPath = KE.util.getScriptPath();
KE.htmlPath = KE.util.getHtmlPath();
KE.browser = KE.util.getBrowserType();
KE.lang = {};
KE.plugin = {};
KE.toolbar = [];
KE.editor = {};
KE.init = function(textareaName)
{
	var editorObj = KE.editor[textareaName];
	var plugin = KE.plugin;

	var oldTextarea = document.getElementsByName(textareaName)[0];
	editorObj.editorWidth = oldTextarea.style.width;
	editorObj.editorHeight = oldTextarea.style.height;

	var widthArr = editorObj.editorWidth.match(/(\d+)([px%]{1,2})/);
	var formWidth, formHeight;
	if (widthArr[2] == '%') formWidth = editorObj.editorWidth;
	else formWidth = (parseInt(widthArr[1]) - 2).toString(10) + widthArr[2];
	var heightArr = editorObj.editorHeight.match(/(\d+)([px%]{1,2})/);
	if (heightArr[2] == '%') formHeight = editorObj.editorHeight;
	else formHeight = (parseInt(heightArr[1]) - 4).toString(10) + heightArr[2];
	
	var baseDiv = document.createElement('div');
	baseDiv.className = 'editorDiv';
	baseDiv.style.width = editorObj.editorWidth;
	baseDiv.style.padding = '1px';
	baseDiv.style.visibility = 'hidden';
	oldTextarea.parentNode.insertBefore(baseDiv, oldTextarea);
	
	var toolbarDiv = document.createElement('div');
	toolbarDiv.style.padding = '2px';
	toolbarDiv.style.textAlign = 'left';
	var toolbarIcon = Array();
	for (var i in KE.toolbar) {
		var cmd = KE.toolbar[i];
		var obj;
		if (cmd == '') {
			obj = document.createElement('br');
		} else {
			if (typeof(plugin[cmd]) == "undefined") continue;
			obj = document.createElement('img');
			obj.src = editorObj.skinsPath + plugin[cmd].icon;
			obj.alt = plugin[cmd].title;
			obj.align = 'absmiddle';
			obj.className = 'editorIcon';
			obj.title = plugin[cmd].title;
			obj.onmouseover = function(){ this.className = 'editorSelectedIcon'; };
			obj.onmouseout = function(){ this.className = 'editorIcon'; };
			obj.onclick = new Function('KE.util.click("' + textareaName + '", "' + cmd + '")');
			toolbarIcon[cmd] = obj;
		}
		toolbarDiv.appendChild(obj);
	}

	var formDiv = document.createElement('div');
	formDiv.className = 'editorFormDiv';
	formDiv.style.height = editorObj.editorHeight;

	var iframe = document.createElement('iframe');
	iframe.id = editorObj.textareaName + 'Iframe';
	iframe.name = editorObj.textareaName + 'Iframe';
	iframe.style.width = formWidth;
	iframe.style.height = formHeight;
	iframe.setAttribute("frameBorder", "0");

	var newTextarea = document.createElement('textarea');
	newTextarea.className = 'editorTextarea';
	newTextarea.style.width = formWidth;
	newTextarea.style.height = formHeight;
	newTextarea.style.display = 'none';
	var hideInput;
	if (KE.browser == 'IE') {
		hideInput = document.createElement('<input type="hidden" name="' + textareaName + '">');
	} else {
		hideInput = document.createElement('input');
		hideInput.setAttribute('type', 'hidden');
		hideInput.setAttribute('name', textareaName);
	}
	var hideDiv = document.createElement('div');
	hideDiv.style.display = 'none';
	formDiv.appendChild(iframe);
	formDiv.appendChild(newTextarea);
	baseDiv.appendChild(toolbarDiv);
	baseDiv.appendChild(formDiv);
	baseDiv.appendChild(hideInput);
	baseDiv.appendChild(hideDiv);
	var iframeWin = iframe.contentWindow;
	var iframeDoc = iframeWin.document;
	iframeDoc.designMode = "on";
	var html = KE.util.getFullHtml(editorObj.cssPath, oldTextarea.value);
	iframeDoc.open();
	iframeDoc.write(html);
	iframeDoc.close();
	if (editorObj.codeMode == 'yes') {
		newTextarea.value = oldTextarea.value;
		newTextarea.style.display = 'block';
		iframe.style.display = 'none';
	}
	oldTextarea.parentNode.removeChild(oldTextarea);

	var parent = hideDiv.parentElement;
	while (parent.tagName != 'FORM') { parent = parent.parentElement; }
	var form = parent;
	KE.util.addEvent(form, 'submit', new Function('KE.util.getData("' + textareaName + '")'));
	KE.util.addEvent(iframeDoc, 'mousedown', new Function('KE.util.hideWindow("' + textareaName + '")'));
	KE.util.addEvent(newTextarea, 'mousedown', new Function('KE.util.hideWindow("' + textareaName + '")'));
	baseDiv.style.visibility = 'visible';
	editorObj.baseDiv = baseDiv;
	editorObj.iframe = iframe;
	editorObj.newTextarea = newTextarea;
	editorObj.hideInput = hideInput;
	editorObj.hideDiv = hideDiv;
	editorObj.iframeWin = iframeWin;
	editorObj.iframeDoc = iframeDoc;
	editorObj.toolbarIcon = toolbarIcon;
	KE.editor[editorObj.textareaName] = editorObj;
	KE.util.focus(textareaName);
}
KE.show = function(config) 
{
	config.skinsPath = KE.scriptPath + 'skins/' + config.skinType + '/';
	KE.editor[config.textareaName] = config;
	KE.util.loadStyle(config.skinsPath + 'style.css');
	KE.util.loadScript(KE.scriptPath + 'langs/' + config.langType + '.js');
	KE.util.loadScript(KE.scriptPath + 'ke_plugin_' + config.pluginType + '.js');
	KE.util.addEvent(window, 'load', new Function('KE.init("' + config.textareaName + '")'));
}
