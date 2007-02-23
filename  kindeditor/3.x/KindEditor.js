/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0 alpha
*/
var KindEditorFunc = {
	'getScriptPath' : function()
	{
		var elements = document.getElementsByTagName('script');
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].src && elements[i].src.indexOf('KindEditor.js') != -1) {
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
	}
};
var KindEditorVar = {
	'version'		: '3.0 alpha',
	'scriptPath'	: KindEditorFunc.getScriptPath(),
	'htmlPath'		: KindEditorFunc.getHtmlPath(),
	'browser'		: KindEditorFunc.getBrowserType(),
	'lang'			: Array(),
	'plugin'		: Array(),
	'editor'		: Array()
};
var KindEditorUtil = {
	'getFullHtml' : function(cssPath, body)
	{
		var html = '<html>';
		html += '<head>';
		html += '<base href="' + KindEditorVar.htmlPath + '" />';
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
		var obj = KindEditorVar.editor[textareaName];
		var iconObj = obj.toolbarIcon[cmd];
		var div = document.createElement('div');
		div.className = 'editorMenu';
		div.style.position = 'absolute';
		div.style.top = KindEditorUtil.getTop(iconObj) + iconObj.offsetHeight + 'px';
		div.style.left = KindEditorUtil.getLeft(iconObj) + 'px';
		div.style.zIndex = 1;
		return div;
	},
	'getPopupWindow' : function(textareaName, width, height)
	{
		var obj = KindEditorVar.editor[textareaName];
		var div = document.createElement('div');
		div.className = 'editorWindow';
		div.style.position = 'absolute';
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		div.style.top = (KindEditorUtil.getTop(obj.baseDiv) + Math.round(parseInt(obj.editorHeight) / 2) - Math.round(height / 2)) + 'px';
		div.style.left = (KindEditorUtil.getLeft(obj.baseDiv) + Math.round(parseInt(obj.editorWidth) / 2) - Math.round(width / 2)) + 'px';
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
		var obj = KindEditorVar.editor[textareaName];
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
				cell.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "' + colorTable[i][j] + '")');
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
		var obj = KindEditorVar.editor[textareaName];
		var html;
		if (obj.codeMode == 'no') {
			if (obj.fullHtml == 'yes') {
				html = '<html>' + obj.iframeDoc.documentElement.innerHTML + '</html>';
			} else {
				html = obj.iframeDoc.body.innerHTML;
			}
		} else {
			html = obj.newTextarea.value;
		}
		obj.hideInput.value = html;
		return html;
	},
	'focus' : function(textareaName)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (obj.codeMode == 'no') {
			obj.iframeWin.focus();
		} else {
			obj.newTextarea.focus();
		}
	},
	'showWindow' : function(textareaName, div)
	{
		KindEditorUtil.hideWindow(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		obj.hideDiv.appendChild(div);
		obj.hideDiv.style.display = 'block';
		KindEditorVar.editor[textareaName].windowDiv = div;
	},
	'hideWindow' : function(textareaName)
	{
		var obj = KindEditorVar.editor[textareaName];
		try {
			obj.hideDiv.removeChild(KindEditorVar.editor[textareaName].windowDiv);
		} catch (e) {}
		obj.hideDiv.style.display = 'none';
	},
	'click' : function(textareaName, cmd)
	{
		var obj = KindEditorVar.editor[textareaName];
		KindEditorUtil.hideWindow(textareaName);
		KindEditorUtil.focus(textareaName);
		KindEditorVar.plugin[cmd].click(textareaName);
	},
	'getSelection' : function(textareaName)
	{
		var obj = KindEditorVar.editor[textareaName];
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
		KindEditorVar.editor[textareaName].selection = selection;
		KindEditorVar.editor[textareaName].range = range;
		KindEditorVar.editor[textareaName].rangeText = rangeText;
	},
	'insertHtml' : function(textareaName, html)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
			if (obj.selection.type.toLowerCase() == 'control') {
				obj.range.item(0).outerHTML = html;
			} else {
				obj.range.pasteHTML(html);
			}
		} else {
			obj.iframeDoc.execCommand('inserthtml', false, html);
		}
	},
	'init' : function(textareaName)
	{
		var editorObj = KindEditorVar.editor[textareaName];
		var lang = KindEditorVar.lang[editorObj.langType];
		var plugin = KindEditorVar.plugin;

		var oldTextarea = document.getElementsByName(textareaName)[0];
		if (oldTextarea.style.width) {
			editorObj.editorWidth = oldTextarea.style.width;
		}
		if (oldTextarea.style.width) {
			editorObj.editorHeight = oldTextarea.style.height;
		}
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
		for (var i in editorObj.toolbar) {
			var cmd = editorObj.toolbar[i];
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
				obj.onclick = new Function('KindEditorUtil.click("' + textareaName + '", "' + cmd + '")');
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
		if (KindEditorVar.browser == 'IE') {
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
		var html = KindEditorUtil.getFullHtml(editorObj.iframeCssPath, oldTextarea.value);
		iframeDoc.open();
		iframeDoc.write(html);
		iframeDoc.close();
		if (editorObj.codeMode == 'yes') {
			newTextarea.value = oldTextarea.value;
			newTextarea.style.display = 'block';
			iframe.style.display = 'none';
		}
		oldTextarea.parentNode.removeChild(oldTextarea);
		var form;
		if (editorObj.formName == '') {
			form = document.getElementsByTagName('form')[0];
		} else {
			form = document.getElementsByName(editorObj.formName)[0];
		}
		KindEditorFunc.addEvent(form, 'submit', new Function('KindEditorUtil.getData("' + textareaName + '")'));
		KindEditorFunc.addEvent(iframeDoc, 'mousedown', new Function('KindEditorUtil.hideWindow("' + textareaName + '")'));
		KindEditorFunc.addEvent(newTextarea, 'mousedown', new Function('KindEditorUtil.hideWindow("' + textareaName + '")'));
		baseDiv.style.visibility = 'visible';
		
		editorObj.baseDiv = baseDiv;
		editorObj.iframe = iframe;
		editorObj.newTextarea = newTextarea;
		editorObj.hideInput = hideInput;
		editorObj.hideDiv = hideDiv;
		editorObj.iframeWin = iframeWin;
		editorObj.iframeDoc = iframeDoc;
		editorObj.toolbarIcon = toolbarIcon;
		KindEditorVar.editor[editorObj.textareaName] = editorObj;
		KindEditorUtil.focus(textareaName);
	}
};
function KindEditor(textareaName) 
{
	this.textareaName = textareaName;
	this.formName = '';
	this.codeMode = 'no'; //yes or no
	this.fullHtml = 'no'; //yes or no
	this.skinType = 'fck';
	this.editorWidth = '700px';
	this.editorHeight = '400px';
	this.langType = 'zh-cn';
	this.toolbar = [
		'source', 'preview', 'zoom', 'undo', 'redo', 'cut', 'copy', 'paste', 
		'selectall', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
		'numberedlist', 'unorderedlist', 'indent', 'outdent', 'subscript',
		'superscript', 'date', 'time', '',
		'title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold', 
		'italic', 'underline', 'strikethrough', 'removeformat', 'image',
		'flash', 'media', 'real', 'layer', 'table', 'specialchar', 'hr', 
		'emoticons', 'link', 'unlink', 'about'
	];
	this.iframeCssPath = KindEditorVar.scriptPath + 'demo/demo.css';
	this.show = function()
	{
		this.langsPath = KindEditorVar.scriptPath + 'langs/';
		this.skinsPath = KindEditorVar.scriptPath + 'skins/' + this.skinType + '/';
		this.pluginsPath = KindEditorVar.scriptPath + 'plugins/';
		KindEditorVar.editor[this.textareaName] = this;
		KindEditorFunc.loadStyle(this.skinsPath + 'style.css');
		KindEditorFunc.loadScript(this.langsPath + this.langType + '.js');
		for (var i in this.toolbar) {
			if (KindEditorVar.plugin[this.toolbar[i]] || this.toolbar[i] == '') continue;
			KindEditorFunc.loadScript(this.pluginsPath + this.toolbar[i] + '.js');
		}
		KindEditorFunc.addEvent(window, 'load', new Function('KindEditorUtil.init("' + this.textareaName + '")'));
	}
}
//plugins begin
KindEditorVar.plugin['about'] = {
	'icon'	: 'about.gif',
	'title'	: '关于',
	'click' : function(textareaName)
	{
		var cmd = 'about';
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getPopupWindow(textareaName, 250, 50);
		div.style.fontSize = '12px';
		div.style.paddingTop = '15px';
		div.style.textAlign = 'center';
		div.onclick = new Function('KindEditorUtil.hideWindow("' + textareaName + '")');
		div.innerHTML = '<a href="http://www.kindsoft.net/" target="_blank" style="color:#4169e1;">KindEditor</a> ' + KindEditorVar.version;
		KindEditorUtil.showWindow(textareaName, div);
		var titleDiv = document.createElement('div');
		//titleDiv.style.width = width + 'px';
		titleDiv.style.height = '25px';
		titleDiv.style.padding = '3px';
		titleDiv.style.background = '#DDDDDD';
		titleDiv.style.textAlign = 'left';
		var bodyDiv = document.createElement('div');
		//bodyDiv.style.width = width + 'px';
		//bodyDiv.style.height = height + 'px';
		bodyDiv.style.padding = '3px';
		var footDiv = document.createElement('div');
		//footDiv.style.width = width + 'px';
		footDiv.style.height = '30px';
		footDiv.style.padding = '3px';
		footDiv.style.background = '#DDDDDD';
		footDiv.style.textAlign = 'center';
		div.appendChild(titleDiv);
		div.appendChild(bodyDiv);
		div.appendChild(footDiv);
	}
};
KindEditorVar.plugin['bold'] = {
	'icon'	: 'bold.gif',
	'title'	: '粗体',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('bold', false, null);
	}
};
KindEditorVar.plugin['bgcolor'] = {
	'icon'				: 'bgcolor.gif',
	'title'				: '文字背景',
	'click' : function(textareaName)
	{
		var cmd = 'bgcolor';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		var table = KindEditorUtil.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
			obj.iframeDoc.execCommand('backcolor', false, value);
		} else {
			var startRangeNode = obj.range.startContainer;
			if (startRangeNode.nodeType == 3) {
				var font = document.createElement("font");
				font.style.backgroundColor = value;
				font.appendChild(obj.range.extractContents());
				var startOffset = obj.range.startOffset;
				var text = startRangeNode.nodeValue;
				var beforeText = text.substr(0, startOffset);
				var afterText = text.substr(startOffset);
				var beforeNode = document.createTextNode(beforeText);
				var afterNode = document.createTextNode(afterText);
				var parentRangeNode = startRangeNode.parentNode;
				parentRangeNode.insertBefore(afterNode, startRangeNode);
				parentRangeNode.insertBefore(font, afterNode);
				parentRangeNode.insertBefore(beforeNode, font);
				parentRangeNode.removeChild(startRangeNode);
			}
		}
		KindEditorUtil.hideWindow(textareaName);
	}
};
KindEditorVar.plugin['copy'] = {
	'icon'	: 'copy.gif',
	'title'	: '复制',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('copy', false, null);
	}
};
KindEditorVar.plugin['cut'] = {
	'icon'	: 'cut.gif',
	'title'	: '剪切',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('cut', false, null);
	}
};
KindEditorVar.plugin['date'] = {
	'icon'	: 'date.gif',
	'title'	: '日期',
	'click' : function(textareaName)
	{
		var obj = KindEditorVar.editor[textareaName];
		var date = new Date();
		var year = date.getFullYear().toString(10);
		var month = (date.getMonth() + 1).toString(10);
		month = month.length < 2 ? '0' + month : month;
		var day = date.getDate().toString(10);
		day = day.length < 2 ? '0' + day : day;
		var value = year + '-' + month + '-' + day;
		KindEditorUtil.getSelection(textareaName);
		KindEditorUtil.insertHtml(textareaName, value);
	}
};
KindEditorVar.plugin['fontname'] = {
	'menu' : {
		'SimSun'			: '宋体', 
		'SimHei'			: '黑体', 
		'FangSong_GB2312'	: '仿宋体', 
		'KaiTi_GB2312'		: '楷体', 
		'NSimSun'			: '新宋体', 
		'Arial'				: 'Arial', 
		'Arial Black'		: 'Arial Black', 
		'Times New Roman'	: 'Times New Roman', 
		'Courier New'		: 'Courier New', 
		'Tahoma'			: 'Tahoma', 
		'Verdana'			: 'Verdana', 
		'GulimChe'			: 'GulimChe', 
		'MS Gothic'			: 'MS Gothic' 
	},
	'icon'				: 'font.gif',
	'title'				: '字体',
	'click' : function(textareaName)
	{
		var cmd = 'fontname';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var fontName = KindEditorVar.plugin[cmd].menu;
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		for (key in fontName) {
			var cDiv = document.createElement('div');
			cDiv.style.padding = '2px';
			cDiv.style.width = '160px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'editorSelectedMenu'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "' + key + '")');
			cDiv.appendChild(document.createTextNode(fontName[key]));
			div.appendChild(cDiv);
		}
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		obj.iframeDoc.execCommand('fontname', false, value);
		KindEditorUtil.hideWindow(textareaName);
	}
};
KindEditorVar.plugin['fontsize'] = {
	'menu' : {
		'1' : '8pt', 
		'2' : '10pt', 
		'3' : '12pt', 
		'4' : '14pt', 
		'5' : '18pt', 
		'6' : '24pt', 
		'7' : '36pt'
	},
	'icon'				: 'fontsize.gif',
	'title'				: '文字大小',
	'click' : function(textareaName)
	{
		var cmd = 'fontsize';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var fontSize = KindEditorVar.plugin[cmd].menu;
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		for (key in fontSize) {
			var cDiv = document.createElement('div');
			cDiv.style.fontSize = '12px';
			cDiv.style.padding = '2px';
			cDiv.style.width = '100px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'editorSelectedMenu'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "' + key + '")');
			cDiv.appendChild(document.createTextNode(fontSize[key]));
			div.appendChild(cDiv);
		}
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		value = value.substr(0, 1);
		obj.iframeDoc.execCommand('fontsize', false, value);
		KindEditorUtil.hideWindow(textareaName);
	}
};
KindEditorVar.plugin['hr'] = {
	'icon'	: 'hr.gif',
	'title'	: '插入横线',
	'click' : function(textareaName)
	{
		var cmd = 'hr';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		var table = KindEditorUtil.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		var html = '<hr color="' + value + '"; size="1">';
		KindEditorUtil.insertHtml(textareaName, html);
		KindEditorUtil.hideWindow(textareaName);
	}
};
KindEditorVar.plugin['indent'] = {
	'icon'	: 'indent.gif',
	'title'	: '减少缩进',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('indent', false, null);
	}
};
KindEditorVar.plugin['italic'] = {
	'icon'	: 'italic.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('italic', false, null);
	}
};
KindEditorVar.plugin['justifycenter'] = {
	'icon'	: 'justifycenter.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('justifycenter', false, null);
	}
};
KindEditorVar.plugin['justifyfull'] = {
	'icon'	: 'justifyfull.gif',
	'title'	: '两端对齐',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('justifyfull', false, null);
	}
};
KindEditorVar.plugin['justifyleft'] = {
	'icon'	: 'justifyleft.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('justifyleft', false, null);
	}
};
KindEditorVar.plugin['justifyright'] = {
	'icon'	: 'justifyright.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('justifyright', false, null);
	}
};
KindEditorVar.plugin['numberedlist'] = {
	'icon'	: 'numberedlist.gif',
	'title'	: '编号',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('insertorderedlist', false, null);
	}
};
KindEditorVar.plugin['outdent'] = {
	'icon'	: 'outdent.gif',
	'title'	: '增加缩进',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('outdent', false, null);
	}
};
KindEditorVar.plugin['paste'] = {
	'icon'	: 'paste.gif',
	'title'	: '粘贴',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('paste', false, null);
	}
};
KindEditorVar.plugin['preview'] = {
	'icon'	: 'preview.gif',
	'title'	: '预览',
	'click' : function(textareaName)
	{
		var html = KindEditorUtil.getData(textareaName);
		var newWin = window.open('', 'kindPreview','width=800,height=600,left=30,top=30,resizable=yes,scrollbars=yes');
		newWin.document.open();
		newWin.document.write(html);
		newWin.document.close();
	}
};
KindEditorVar.plugin['print'] = {
	'icon'	: 'print.gif',
	'title'	: '打印',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('print', false, null);
	}
};
KindEditorVar.plugin['redo'] = {
	'icon'	: 'redo.gif',
	'title'	: '前进',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('redo', false, null);
	}
};
KindEditorVar.plugin['removeformat'] = {
	'icon'	: 'removeformat.gif',
	'title'	: '删除格式',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('removeformat', false, null);
	}
};
KindEditorVar.plugin['selectall'] = {
	'icon'	: 'selectall.gif',
	'title'	: '全选',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('selectall', false, null);
	}
};
KindEditorVar.plugin['source'] = {
	'icon'	: 'source.gif',
	'title'	: '源代码',
	'click' : function(textareaName)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (obj.codeMode == 'no') {
			KindEditorUtil.hideWindow(textareaName);
			var html;
			if (obj.fullHtml == 'yes') {
				obj.newTextarea.value = '<html>' + obj.iframeDoc.documentElement.innerHTML + '</html>';
			} else {
				obj.newTextarea.value = obj.iframeDoc.body.innerHTML;
			}
			obj.iframe.style.display = 'none';
			obj.newTextarea.style.display = 'block';
			for (var cmd in obj.toolbarIcon) {
				if (cmd != 'source' && cmd != 'preview' && cmd != 'about') {
					obj.toolbarIcon[cmd].className = 'editorIconDisabled';
					obj.toolbarIcon[cmd].onmouseover = function(){ };
					obj.toolbarIcon[cmd].onmouseout = function(){ };
					obj.toolbarIcon[cmd].onclick = function(){ };
				}
			}
			obj.codeMode = 'yes';
		} else {
			if (obj.fullHtml == 'yes') {
				obj.iframeDoc.open();
				obj.iframeDoc.write(obj.newTextarea.value);
				obj.iframeDoc.close();
			} else {
				obj.iframeDoc.body.innerHTML = obj.newTextarea.value;
			}
			obj.iframe.style.display = 'block';
			obj.newTextarea.style.display = 'none';
			for (var cmd in obj.toolbarIcon) {
				if (cmd != 'source' && cmd != 'preview' && cmd != 'about') {
					obj.toolbarIcon[cmd].className = 'editorIcon';
					obj.toolbarIcon[cmd].onmouseover = function(){ this.className = 'editorSelectedIcon'; };
					obj.toolbarIcon[cmd].onmouseout = function(){ this.className = 'editorIcon'; };
					obj.toolbarIcon[cmd].onclick = new Function('KindEditorUtil.click("' + textareaName + '", "' + cmd + '")');
				}
			}
			obj.codeMode = 'no';
		}
	}
};
KindEditorVar.plugin['strikethrough'] = {
	'icon'	: 'strikethrough.gif',
	'title'	: '删除线',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('strikethrough', false, null);
	}
};
KindEditorVar.plugin['subscript'] = {
	'icon'	: 'subscript.gif',
	'title'	: '下标',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('subscript', false, null);
	}
};
KindEditorVar.plugin['superscript'] = {
	'icon'	: 'superscript.gif',
	'title'	: '上标',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('superscript', false, null);
	}
};
KindEditorVar.plugin['textcolor'] = {
	'icon'				: 'textcolor.gif',
	'title'				: '文字颜色',
	'click' : function(textareaName)
	{
		var cmd = 'textcolor';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		var table = KindEditorUtil.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		obj.iframeDoc.execCommand('forecolor', false, value);
		KindEditorUtil.hideWindow(textareaName);
	}
};
KindEditorVar.plugin['time'] = {
	'icon'	: 'time.gif',
	'title'	: '时间',
	'click' : function(textareaName)
	{
		var obj = KindEditorVar.editor[textareaName];
		var date = new Date();
		var hour = date.getHours().toString(10);
		hour = hour.length < 2 ? '0' + hour : hour;
		var minute = date.getMinutes().toString(10);
		minute = minute.length < 2 ? '0' + minute : minute;
		var second = date.getSeconds().toString(10);
		second = second.length < 2 ? '0' + second : second;
		var value = hour + ':' + minute + ':' + second;
		KindEditorUtil.getSelection(textareaName);
		KindEditorUtil.insertHtml(textareaName, value);
	}
};
KindEditorVar.plugin['title'] = {
	'menu' : {
		'H1' : '标题 1', 
		'H2' : '标题 2', 
		'H3' : '标题 3', 
		'H4' : '标题 4', 
		'H5' : '标题 5', 
		'H6' : '标题 6'
	},
	'icon' : 'title.gif',
	'title' : '标题',
	'click' : function(textareaName)
	{
		var cmd = 'title';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var title = KindEditorVar.plugin[cmd].menu;
		
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		for (key in title) {
			var cDiv = document.createElement('div');
			cDiv.style.fontSize = '12px';
			cDiv.style.padding = '2px';
			cDiv.style.width = '100px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'editorSelectedMenu'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "<' + key + '>")');
			cDiv.appendChild(document.createTextNode(title[key]));
			div.appendChild(cDiv);
		}
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		obj.iframeDoc.execCommand('formatblock', false, value);
		KindEditorUtil.hideWindow(textareaName);
	}
};
KindEditorVar.plugin['underline'] = {
	'icon'	: 'underline.gif',
	'title'	: '下划线',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('underline', false, null);
	}
};
KindEditorVar.plugin['undo'] = {
	'icon'	: 'undo.gif',
	'title'	: '后退',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('undo', false, null);
	}
};
KindEditorVar.plugin['unlink'] = {
	'icon'	: 'unlink.gif',
	'title'	: '取消超级连接',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('unlink', false, null);
	}
};
KindEditorVar.plugin['unorderedlist'] = {
	'icon'	: 'unorderedlist.gif',
	'title'	: '项目符号',
	'click' : function(textareaName)
	{
		KindEditorVar.editor[textareaName].iframeDoc.execCommand('insertunorderedlist', false, null);
	}
};
KindEditorVar.plugin['zoom'] = {
	'menu' : ['250%', '200%', '150%', '120%', '100%', '80%', '50%'],
	'icon'				: 'zoom.gif',
	'title'				: '显示比例',
	'click' : function(textareaName)
	{
		var cmd = 'zoom';
		var obj = KindEditorVar.editor[textareaName];
		var zoom = KindEditorVar.plugin[cmd].menu;
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		div.style.fontSize = '12px';
		for (var i in zoom) {
			var cDiv = document.createElement('div');
			cDiv.style.padding = '2px';
			cDiv.style.width = '120px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'editorSelectedMenu'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "' + zoom[i] + '")');
			cDiv.appendChild(document.createTextNode(zoom[i]));
			div.appendChild(cDiv);
		}
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		obj.iframeDoc.body.style.zoom = value;
		KindEditorUtil.hideWindow(textareaName);
	}
};
//plugins end
