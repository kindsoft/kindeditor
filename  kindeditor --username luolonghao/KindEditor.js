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
	'getMenuDiv' : function(textareaName, cmd)
	{
		var iconObj = document.getElementById(textareaName + 'icon' + cmd);
		var obj = KindEditorVar.editor[textareaName];
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = KindEditorUtil.getTop(iconObj) + iconObj.offsetHeight + 'px';
		div.style.left = KindEditorUtil.getLeft(iconObj) + 'px';
		div.style.color = obj.menuTextColor;
		div.style.border = obj.menuBorder;
		div.style.background = obj.menuBgColor;
		div.style.zIndex = 1;
		return div;
	},
	'getAlertWindow' : function(textareaName, width, height)
	{
		var obj = KindEditorVar.editor[textareaName];
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.width = width;
		div.style.height = height;
		div.style.top = (KindEditorUtil.getTop(obj.div) + Math.round(parseInt(obj.editorHeight) / 2) - Math.round(height / 2)) + 'px';
		div.style.left = (KindEditorUtil.getLeft(obj.div) + Math.round(parseInt(obj.editorWidth) / 2) - Math.round(width / 2)) + 'px';
		div.style.color = obj.menuTextColor;
		div.style.border = obj.menuBorder;
		div.style.background = obj.menuBgColor;
		div.style.zIndex = 1;
		return div;
	},
	'getColorTable' : function(textareaName, cmd)
	{
		var colorTable = [
			["#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#FFFFFF", "#F5F5F5", "#DCDCDC", "#FFFAFA"],
			["#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969", "#000000", "#2F4F4F", "#708090", "#778899", "#4682B4"],
			["#4169E1", "#6495ED", "#B0C4DE", "#7B68EE", "#6A5ACD", "#483D8B", "#191970", "#000080", "#00008B", "#0000CD"],
			["#1E90FF", "#00BFFF", "#87CEFA", "#87CEEB", "#ADD8E6", "#B0E0E6", "#F0FFFF", "#E0FFFF", "#AFEEEE", "#00CED1"],
			["#5F9EA0", "#48D1CC", "#00FFFF", "#40E0D0", "#20B2AA", "#008B8B", "#008080", "#7FFFD4", "#66CDAA", "#8FBC8F"],
			["#3CB371", "#2E8B57", "#006400", "#008000", "#228B22", "#32CD32", "#00FF00", "#7FFF00", "#7CFC00", "#ADFF2F"],
			["#98FB98", "#90EE90", "#00FF7F", "#00FA9A", "#556B2F", "#6B8E23", "#808000", "#BDB76B", "#B8860B", "#DAA520"],
			["#FFD700", "#F0E68C", "#EEE8AA", "#FFEBCD", "#FFE4B5", "#F5DEB3", "#FFDEAD", "#DEB887", "#D2B48C", "#BC8F8F"],
			["#A0522D", "#8B4513", "#D2691E", "#CD853F", "#F4A460", "#8B0000", "#800000", "#A52A2A", "#B22222", "#CD5C5C"],
			["#F08080", "#FA8072", "#E9967A", "#FFA07A", "#FF7F50", "#FF6347", "#FF8C00", "#FFA500", "#FF4500", "#DC143C"],
			["#FF0000", "#FF1493", "#FF00FF", "#FF69B4", "#FFB6C1", "#FFC0CB", "#DB7093", "#C71585", "#800080", "#8B008B"],
			["#9370DB", "#8A2BE2", "#4B0082", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD", "#D8BFD8"],
			["#E6E6FA", "#F8F8FF", "#F0F8FF", "#F5FFFA", "#F0FFF0", "#FAFAD2", "#FFFACD", "#FFF8DC", "#FFFFE0", "#FFFFF0"],
			["#FFFAF0", "#FAF0E6", "#FDF5E6", "#FAEBD7", "#FFE4C4", "#FFDAB9", "#FFEFD5", "#FFF5EE", "#FFF0F5", "#FFE4E1"]
		];
		var iconObj = document.getElementById(textareaName + 'icon' + cmd);
		var obj = KindEditorVar.editor[textareaName];
		var table = document.createElement('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		for (var i = 0; i < colorTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < colorTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.style.width = '12px';
				cell.style.height = '12px';
				cell.style.border = '1px solid #AAAAAA';
				cell.style.fontSize = '1px';
				cell.style.cursor = 'pointer';
				cell.style.background = colorTable[i][j];
				cell.title = colorTable[i][j];
				cell.onmouseover = function() {this.style.borderColor = '#000000'; }
				cell.onmouseout = function() {this.style.borderColor = '#AAAAAA'; }
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
		if (KindEditorVar.browser == '') {
			html = obj.textarea.value;
		} else {
			if (obj.codeMode == 'no') {
				if (obj.fullHtml == 'yes') {
					html = '<html>' + obj.iframeDoc.documentElement.innerHTML + '</html>';
				} else {
					html = obj.iframeDoc.body.innerHTML;
				}
			} else {
				html = obj.newTextarea.value;
			}
		}
		obj.input.value = html;
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
		if (obj.codeMode == 'yes') {
			if (cmd != 'source' && cmd != 'preview' && cmd != 'about') {
				alert(KindEditorVar.lang[obj.langType].cmdNoSupport);
				return false;
			}
		}
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

		for (var i in editorObj.toolbar) {
			var cmd = editorObj.toolbar[i];
			var obj;
			if (cmd == '') {
				obj = document.createElement('br');
				editorObj.toolbarDiv.appendChild(obj);
				continue;
			} else {
				if (typeof(plugin[cmd]) == "undefined") continue;
				if (plugin[cmd].icon) {
					obj = document.createElement('img');
					obj.src = editorObj.skinsPath + plugin[cmd].icon;
					obj.alt = plugin[cmd].title;
					obj.align = 'absmiddle';
				} else {
					obj = document.createElement('span');
					obj.style.fontSize = '12px';
					obj.style.padding = '2px';
					obj.appendChild(document.createTextNode(plugin[cmd].title));
					obj.title = plugin[cmd].title;
				}
			}
			obj.id = textareaName + 'icon' + cmd;
			obj.style.border = '1px solid ' + editorObj.toolbarBgColor;
			obj.style.margin = '0 1px 0 1px';
			obj.style.cursor = 'pointer';
			obj.onmouseover = function(){ this.style.border = editorObj.menuBorder; };
			obj.onmouseout = function(){ this.style.borderColor = editorObj.menuBgColor; };
			obj.onclick = new Function('KindEditorUtil.click("' + editorObj.textareaName + '", "' + cmd + '")');
			editorObj.toolbarDiv.appendChild(obj);
		}
		editorObj.div.style.visibility = 'visible';
		if (editorObj.codeMode == 'yes') {
			editorObj.textarea.style.display = 'block';
			editorObj.iframe.style.display = 'none';
		}
		KindEditorUtil.focus(textareaName);
	}
};
function KindEditor() 
{
	this.textareaName = '';
	this.formName = '';
	this.codeMode = 'no'; //yes or no
	this.fullHtml = 'no'; //yes or no
	this.skinType = 'default';
	this.editorWidth = '700px';
	this.editorHeight = '400px';
	this.menuBorder = '1px solid #CCCCCC';
	this.menuBgColor = '#F0F0EE';
	this.menuTextColor = '#222222';
	this.menuSelectedColor = '#CCCCCC';
	this.editorBorder = '3px solid #CCCCCC';
	this.toolbarBgColor = '#F0F0EE';
	this.formBorder = '1px solid #CCCCCC';
	this.iframeBgColor = '#FFFFFF';
	this.textareaTextColor = '#000000';
	this.textareaBgColor = '#FFFFFF';
	this.buttonColor = '#DDDDDD';
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
	this.fontFamily = 'Courier New';
	
	this.print = function()
	{
		this.langsPath = KindEditorVar.scriptPath + 'langs/';
		this.skinsPath = KindEditorVar.scriptPath + 'skins/' + this.skinType + '/';
		this.pluginsPath = KindEditorVar.scriptPath + 'plugins/';
		KindEditorFunc.loadScript(this.langsPath + this.langType + '.js');
		for (var i in this.toolbar) {
			if (KindEditorVar.plugin[this.toolbar[i]]) continue;
			KindEditorFunc.loadScript(this.pluginsPath + this.toolbar[i] + '.js');
		}
		var widthArr = this.editorWidth.match(/(\d+)([px%]{1,2})/);
		var formWidth, formHeight;
		if (widthArr[2] == '%') formWidth = this.editorWidth;
		else formWidth = (parseInt(widthArr[1]) - 2).toString(10) + widthArr[2];
		var heightArr = this.editorHeight.match(/(\d+)([px%]{1,2})/);
		if (heightArr[2] == '%') formHeight = this.editorHeight;
		else formHeight = (parseInt(heightArr[1]) - 4).toString(10) + heightArr[2];

		var div = document.createElement('div');
		div.style.width = this.editorWidth;
		div.style.padding = '1px';
		div.style.border = this.editorBorder;
		div.style.backgroundColor = this.toolbarBgColor;
		div.style.visibility = 'hidden';
		var textarea = document.getElementsByName(this.textareaName)[0];
		textarea.removeAttribute('name');
		textarea.parentNode.insertBefore(div, textarea);
		textarea.style.display = 'none';
		var newTextarea = document.createElement('textarea');
		newTextarea.value = textarea.value;
		newTextarea.style.width = formWidth;
		newTextarea.style.height = formHeight;
		newTextarea.style.margin = 0;
		newTextarea.style.padding = 0;
		newTextarea.style.border = 0;
		newTextarea.style.background = this.textareaBgColor;
		newTextarea.style.color = this.textareaTextColor;
		newTextarea.style.fontSize = '12px';
		newTextarea.style.fontFamily = this.fontFamily;
		newTextarea.style.lineHeight = '16px';
		newTextarea.style.display = 'none';
		var input;
		if (KindEditorVar.browser == 'IE') {
			input = document.createElement('<input type="hidden" name="'+this.textareaName+'">');
		} else {
			input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', this.textareaName);
		}
		var toolbarDiv = document.createElement('div');
		toolbarDiv.style.padding = '2px';
		toolbarDiv.style.textAlign = 'left';
		var formDiv = document.createElement('div');
		formDiv.style.border = this.formBorder;
		formDiv.style.background = this.iframeBgColor;
		formDiv.style.height = this.editorHeight;
		
		var iframe = document.createElement('iframe');
		iframe.id = this.textareaName + 'Iframe';
		iframe.name = this.textareaName + 'Iframe';
		iframe.style.width = formWidth;
		iframe.style.height = formHeight;
		iframe.setAttribute("frameBorder", "0");
		formDiv.appendChild(iframe);
		formDiv.appendChild(newTextarea);
		
		var hideDiv = document.createElement('div');
		hideDiv.style.display = 'none';

		div.appendChild(toolbarDiv);
		div.appendChild(formDiv);
		div.appendChild(input);
		div.appendChild(hideDiv);

		var iframeWin = iframe.contentWindow;
		var iframeDoc = iframeWin.document;
		iframeDoc.designMode = "on";
		var html = KindEditorUtil.getFullHtml(this.iframeCssPath, textarea.value);
		iframeDoc.open();
		iframeDoc.write(html);
		iframeDoc.close();
		KindEditorFunc.addEvent(iframeDoc, 'mousedown', new Function('KindEditorUtil.hideWindow("' + this.textareaName + '")'));
		KindEditorFunc.addEvent(newTextarea, 'mousedown', new Function('KindEditorUtil.hideWindow("' + this.textareaName + '")'));
		this.div = div;
		this.toolbarDiv = toolbarDiv;
		this.formDiv = formDiv;
		this.iframe = iframe;
		this.textarea = textarea;
		this.newTextarea = newTextarea;
		this.input = input;
		this.hideDiv = hideDiv;
		this.iframeWin = iframeWin;
		this.iframeDoc = iframeDoc;
		KindEditorVar.editor[this.textareaName] = this;
		KindEditorFunc.addEvent(window, 'load', new Function('KindEditorUtil.init("' + this.textareaName + '")'));
		var form;
		if (this.formName == '') {
			form = document.getElementsByTagName('form')[0];
		} else {
			form = document.getElementsByName(this.formName)[0];
		}
		KindEditorFunc.addEvent(form, 'submit', new Function('KindEditorUtil.getData("' + this.textareaName + '")'));
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
		var div = KindEditorUtil.getAlertWindow(textareaName, 250, 50);
		div.style.fontSize = '12px';
		div.style.paddingTop = '15px';
		div.style.textAlign = 'center';
		div.onclick = new Function('KindEditorUtil.hideWindow("' + textareaName + '")');
		div.innerHTML = '<a href="http://www.kindsoft.net/" target="_blank" style="color:#4169e1;">KindEditor</a> ' + KindEditorVar.version;
		KindEditorUtil.showWindow(textareaName, div);
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
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
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
				var parent = startRangeNode.parentNode;
				var element = document.createElement("font");
				element.style.backgroundColor = value;
				element.appendChild(obj.range.extractContents());
				var startRangeOffset = obj.range.startOffset;
				var textNode = startRangeNode;
				startRangeNode = textNode.parentNode;
				var text = textNode.nodeValue;
				var textBefore = text.substr(0, startRangeOffset);
				var textAfter = text.substr(startRangeOffset);
				var beforeNode = document.createTextNode(textBefore);
				var afterNode = document.createTextNode(textAfter);
				startRangeNode.insertBefore(afterNode, textNode);
				startRangeNode.insertBefore(element, afterNode);
				startRangeNode.insertBefore(beforeNode, element);
				startRangeNode.removeChild(textNode);
				var newRange = document.createRange();
				newRange.setStart(afterNode, 0);
				newRange.setEnd(afterNode, 0);
				obj.selection.addRange(newRange);
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
KindEditorVar.plugin['emoticons'] = {
	'icon'	: 'emoticons.gif',
	'title'	: '插入表情符号',
	'click' : function(textareaName)
	{
		var emoticonTable = [
				['etc_01.gif','etc_02.gif','etc_03.gif','etc_04.gif','etc_05.gif','etc_06.gif'],
				['etc_07.gif','etc_08.gif','etc_09.gif','etc_10.gif','etc_11.gif','etc_12.gif'],
				['etc_13.gif','etc_14.gif','etc_15.gif','etc_16.gif','etc_17.gif','etc_18.gif'],
				['etc_19.gif','etc_20.gif','etc_21.gif','etc_22.gif','etc_23.gif','etc_24.gif'],
				['etc_25.gif','etc_26.gif','etc_27.gif','etc_28.gif','etc_29.gif','etc_30.gif'],
				['etc_31.gif','etc_32.gif','etc_33.gif','etc_34.gif','etc_35.gif','etc_36.gif']
			];
		var cmd = 'emoticons';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
		var table = document.createElement('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		for (var i = 0; i < emoticonTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < emoticonTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.style.padding = '2px';
				cell.style.border = 0;
				cell.style.cursor = 'pointer';
				cell.onmouseover = function() {this.style.borderColor = '#000000'; }
				cell.onmouseout = function() {this.style.borderColor = '#AAAAAA'; }
				cell.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "' + emoticonTable[i][j] + '")');
				cell.innerHTML = '<img src="' + KindEditorVar.scriptPath + 'emoticons/' + emoticonTable[i][j] + '">';
			}
		}
		div.appendChild(table);
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		var html = '<img src="' + KindEditorVar.scriptPath + 'emoticons/' + value + '" border="0">';
		KindEditorUtil.insertHtml(textareaName, html);
		KindEditorUtil.hideWindow(textareaName);
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
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
		div.style.fontSize = '12px';
		for (key in fontName) {
			var cDiv = document.createElement('div');
			cDiv.style.fontFamily = key;
			cDiv.style.padding = '2px';
			cDiv.style.width = '160px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.style.background = obj.menuSelectedColor; }
			cDiv.onmouseout = function() { this.style.background = obj.menuBgColor; }
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
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
		for (key in fontSize) {
			var cDiv = document.createElement('div');
			cDiv.style.fontSize = fontSize[key];
			cDiv.style.padding = '2px';
			cDiv.style.width = '160px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.style.background = obj.menuSelectedColor; }
			cDiv.onmouseout = function() { this.style.background = obj.menuBgColor; }
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
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
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
KindEditorVar.plugin['layer'] = {
	'icon'	: 'layer.gif',
	'title'	: '插入层',
	'click' : function(textareaName)
	{
		var cmd = 'layer';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
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
		var html = '<div style="padding:5px;border:1px solid #AAAAAA;background-color:' + value + '">请输入内容</div>';
		KindEditorUtil.insertHtml(textareaName, html);
		KindEditorUtil.hideWindow(textareaName);
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
			obj.codeMode = 'no';
		}
	}
};
KindEditorVar.plugin['specialchar'] = {
	'icon'	: 'specialchar.gif',
	'title'	: '插入特殊符号',
	'click' : function(textareaName)
	{
		var charTable = [
			['§','№','☆','★','○','●','◎','◇','◆','□'],
			['℃','‰','■','△','▲','※','→','←','↑','↓'],
			['〓','¤','°','＃','＆','＠','＼','︿','＿','￣'],
			['―','α','β','γ','δ','ε','ζ','η','θ','ι'],
			['κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ'],
			['υ','φ','χ','ψ','ω','≈','≡','≠','＝','≤'],
			['≥','＜','＞','≮','≯','∷','±','＋','－','×'],
			['÷','／','∫','∮','∝','∞','∧','∨','∑','∏'],
			['∪','∩','∈','∵','∴','⊥','∥','∠','⌒','⊙'],
			['≌','∽','〖','〗','【','】','（','）','［','］']
		];
		var cmd = 'specialchar';
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
		var table = document.createElement('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		for (var i = 0; i < charTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < charTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.style.padding = '2px';
				cell.style.border = '1px solid #AAAAAA';
				cell.style.fontSize = '12px';
				cell.style.cursor = 'pointer';
				cell.onmouseover = function() {this.style.borderColor = '#000000'; }
				cell.onmouseout = function() {this.style.borderColor = '#AAAAAA'; }
				cell.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "' + charTable[i][j] + '")');
				cell.innerHTML = charTable[i][j];
			}
		}
		div.appendChild(table);
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
			obj.range.select();
		}
		KindEditorUtil.insertHtml(textareaName, value);
		KindEditorUtil.hideWindow(textareaName);
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
KindEditorVar.plugin['table'] = {
	'icon'	: 'table.gif',
	'title'	: '插入表格',
	'click' : function(textareaName)
	{
		//KindEditorVar.editor[textareaName].iframeDoc.execCommand('bold', false, null);
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
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
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
		
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
		for (key in title) {
			var cDiv = document.createElement('div');
			cDiv.style.padding = '2px';
			cDiv.style.width = '160px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.style.background = obj.menuSelectedColor; }
			cDiv.onmouseout = function() { this.style.background = obj.menuBgColor; }
			cDiv.onclick = new Function('KindEditorVar.plugin["' + cmd + '"].exec("' + textareaName + '", "<' + key + '>")');
			var h = document.createElement(key);
			h.style.margin = '2px';
			h.appendChild(document.createTextNode(title[key]));
			cDiv.appendChild(h);
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
		var div = KindEditorUtil.getMenuDiv(textareaName, cmd);
		div.style.fontSize = '12px';
		for (var i in zoom) {
			var cDiv = document.createElement('div');
			cDiv.style.padding = '2px';
			cDiv.style.width = '120px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.style.background = obj.menuSelectedColor; }
			cDiv.onmouseout = function() { this.style.background = obj.menuBgColor; }
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
