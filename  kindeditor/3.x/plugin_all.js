/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0 alpha
*/
KE.toolbar.items = [
	'source', 'preview', 'zoom', 'undo', 'redo', 'cut', 'copy', 'paste', 
	'selectall', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
	'numberedlist', 'unorderedlist', 'indent', 'outdent', 'subscript',
	'superscript', 'date', 'time', '',
	'title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold', 
	'italic', 'underline', 'strikethrough', 'removeformat', 'image',
	'flash', 'media', 'real', 'layer', 'table', 'specialchar', 'hr', 
	'emoticons', 'link', 'unlink', 'about'
];
KE.plugin['about'] = {
	'icon'	: 'about.gif',
	'title'	: '关于',
	'click' : function(textareaName)
	{
		var cmd = 'about';
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupWindow(textareaName, 250, 50);
		div.style.fontSize = '12px';
		div.style.paddingTop = '15px';
		div.style.textAlign = 'center';
		div.onclick = new Function('KE.util.hideWindow("' + textareaName + '")');
		div.innerHTML = '<a href="http://www.kindsoft.net/" target="_blank" style="color:#4169e1;">KindEditor</a> ' + KE.version;
		KE.util.showWindow(textareaName, div);
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
KE.plugin['bold'] = {
	'icon'	: 'bold.gif',
	'title'	: '粗体',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['bgcolor'] = {
	'icon'				: 'bgcolor.gif',
	'title'				: '文字背景',
	'click' : function(textareaName)
	{
		var cmd = 'bgcolor';
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
		var table = KE.util.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
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
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['copy'] = {
	'icon'	: 'copy.gif',
	'title'	: '复制',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('copy', false, null);
	}
};
KE.plugin['cut'] = {
	'icon'	: 'cut.gif',
	'title'	: '剪切',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('cut', false, null);
	}
};
KE.plugin['date'] = {
	'icon'	: 'date.gif',
	'title'	: '日期',
	'click' : function(textareaName)
	{
		var obj = KE.global[textareaName];
		var date = new Date();
		var year = date.getFullYear().toString(10);
		var month = (date.getMonth() + 1).toString(10);
		month = month.length < 2 ? '0' + month : month;
		var day = date.getDate().toString(10);
		day = day.length < 2 ? '0' + day : day;
		var value = year + '-' + month + '-' + day;
		KE.util.getSelection(textareaName);
		KE.util.insertHtml(textareaName, value);
	}
};
KE.plugin['fontname'] = {
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
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var fontName = KE.plugin[cmd].menu;
		var div = KE.util.getPopupMenu(textareaName, cmd);
		for (key in fontName) {
			var cDiv = document.createElement('div');
			cDiv.style.padding = '2px';
			cDiv.style.width = '160px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'ke-menu-selected'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + key + '")');
			cDiv.appendChild(document.createTextNode(fontName[key]));
			div.appendChild(cDiv);
		}
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		obj.iframeDoc.execCommand('fontname', false, value);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['fontsize'] = {
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
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var fontSize = KE.plugin[cmd].menu;
		var div = KE.util.getPopupMenu(textareaName, cmd);
		for (key in fontSize) {
			var cDiv = document.createElement('div');
			cDiv.style.fontSize = '12px';
			cDiv.style.padding = '2px';
			cDiv.style.width = '100px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'ke-menu-selected'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + key + '")');
			cDiv.appendChild(document.createTextNode(fontSize[key]));
			div.appendChild(cDiv);
		}
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		value = value.substr(0, 1);
		obj.iframeDoc.execCommand('fontsize', false, value);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['hr'] = {
	'icon'	: 'hr.gif',
	'title'	: '插入横线',
	'click' : function(textareaName)
	{
		var cmd = 'hr';
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
		var table = KE.util.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		var html = '<hr color="' + value + '"; size="1">';
		KE.util.insertHtml(textareaName, html);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['indent'] = {
	'icon'	: 'indent.gif',
	'title'	: '减少缩进',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('indent', false, null);
	}
};
KE.plugin['italic'] = {
	'icon'	: 'italic.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('italic', false, null);
	}
};
KE.plugin['justifycenter'] = {
	'icon'	: 'justifycenter.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('justifycenter', false, null);
	}
};
KE.plugin['justifyfull'] = {
	'icon'	: 'justifyfull.gif',
	'title'	: '两端对齐',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('justifyfull', false, null);
	}
};
KE.plugin['justifyleft'] = {
	'icon'	: 'justifyleft.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('justifyleft', false, null);
	}
};
KE.plugin['justifyright'] = {
	'icon'	: 'justifyright.gif',
	'title'	: '斜体',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('justifyright', false, null);
	}
};
KE.plugin['numberedlist'] = {
	'icon'	: 'numberedlist.gif',
	'title'	: '编号',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('insertorderedlist', false, null);
	}
};
KE.plugin['outdent'] = {
	'icon'	: 'outdent.gif',
	'title'	: '增加缩进',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('outdent', false, null);
	}
};
KE.plugin['paste'] = {
	'icon'	: 'paste.gif',
	'title'	: '粘贴',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('paste', false, null);
	}
};
KE.plugin['preview'] = {
	'icon'	: 'preview.gif',
	'title'	: '预览',
	'click' : function(textareaName)
	{
		var html = KE.util.getData(textareaName);
		var newWin = window.open('', 'kindPreview','width=800,height=600,left=30,top=30,resizable=yes,scrollbars=yes');
		newWin.document.open();
		newWin.document.write(html);
		newWin.document.close();
	}
};
KE.plugin['print'] = {
	'icon'	: 'print.gif',
	'title'	: '打印',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('print', false, null);
	}
};
KE.plugin['redo'] = {
	'icon'	: 'redo.gif',
	'title'	: '前进',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('redo', false, null);
	}
};
KE.plugin['removeformat'] = {
	'icon'	: 'removeformat.gif',
	'title'	: '删除格式',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('removeformat', false, null);
	}
};
KE.plugin['selectall'] = {
	'icon'	: 'selectall.gif',
	'title'	: '全选',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('selectall', false, null);
	}
};
KE.plugin['source'] = {
	'icon'	: 'source.gif',
	'title'	: '源代码',
	'click' : function(textareaName)
	{
		var obj = KE.global[textareaName];
		if (obj.wyswygMode == true) {
			KE.util.hideWindow(textareaName);
			obj.newTextarea.value = obj.iframeDoc.body.innerHTML;
			obj.iframe.style.display = 'none';
			obj.newTextarea.style.display = 'block';
			for (var cmd in obj.toolbarIcon) {
				if (cmd != 'source' && cmd != 'preview' && cmd != 'about') {
					obj.toolbarIcon[cmd].className = 'ke-icon-disabled';
					obj.toolbarIcon[cmd].onmouseover = function(){ };
					obj.toolbarIcon[cmd].onmouseout = function(){ };
					obj.toolbarIcon[cmd].onclick = function(){ };
				}
			}
			obj.wyswygMode = false;
		} else {
			obj.iframeDoc.body.innerHTML = obj.newTextarea.value;
			obj.iframe.style.display = 'block';
			obj.newTextarea.style.display = 'none';
			for (var cmd in obj.toolbarIcon) {
				if (cmd != 'source' && cmd != 'preview' && cmd != 'about') {
					obj.toolbarIcon[cmd].className = 'ke-icon';
					obj.toolbarIcon[cmd].onmouseover = new Function('KE.$("toolbarIcon' + cmd + '").className = "ke-icon-selected"');
					obj.toolbarIcon[cmd].onmouseout = new Function('KE.$("toolbarIcon' + cmd + '").className = "ke-icon"');
					obj.toolbarIcon[cmd].onclick = new Function('KE.util.click("' + textareaName + '", "' + cmd + '")');
				}
			}
			obj.wyswygMode = true;
		}
	}
};
KE.plugin['strikethrough'] = {
	'icon'	: 'strikethrough.gif',
	'title'	: '删除线',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('strikethrough', false, null);
	}
};
KE.plugin['subscript'] = {
	'icon'	: 'subscript.gif',
	'title'	: '下标',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('subscript', false, null);
	}
};
KE.plugin['superscript'] = {
	'icon'	: 'superscript.gif',
	'title'	: '上标',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('superscript', false, null);
	}
};
KE.plugin['textcolor'] = {
	'icon'				: 'textcolor.gif',
	'title'				: '文字颜色',
	'click' : function(textareaName)
	{
		var cmd = 'textcolor';
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
		var table = KE.util.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		obj.iframeDoc.execCommand('forecolor', false, value);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['time'] = {
	'icon'	: 'time.gif',
	'title'	: '时间',
	'click' : function(textareaName)
	{
		var obj = KE.global[textareaName];
		var date = new Date();
		var hour = date.getHours().toString(10);
		hour = hour.length < 2 ? '0' + hour : hour;
		var minute = date.getMinutes().toString(10);
		minute = minute.length < 2 ? '0' + minute : minute;
		var second = date.getSeconds().toString(10);
		second = second.length < 2 ? '0' + second : second;
		var value = hour + ':' + minute + ':' + second;
		KE.util.getSelection(textareaName);
		KE.util.insertHtml(textareaName, value);
	}
};
KE.plugin['title'] = {
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
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var title = KE.plugin[cmd].menu;
		
		var div = KE.util.getPopupMenu(textareaName, cmd);
		for (key in title) {
			var cDiv = document.createElement('div');
			cDiv.style.fontSize = '12px';
			cDiv.style.padding = '2px';
			cDiv.style.width = '100px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'ke-menu-selected'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "<' + key + '>")');
			cDiv.appendChild(document.createTextNode(title[key]));
			div.appendChild(cDiv);
		}
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		obj.iframeDoc.execCommand('formatblock', false, value);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['underline'] = {
	'icon'	: 'underline.gif',
	'title'	: '下划线',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('underline', false, null);
	}
};
KE.plugin['undo'] = {
	'icon'	: 'undo.gif',
	'title'	: '后退',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('undo', false, null);
	}
};
KE.plugin['unlink'] = {
	'icon'	: 'unlink.gif',
	'title'	: '取消超级连接',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('unlink', false, null);
	}
};
KE.plugin['unorderedlist'] = {
	'icon'	: 'unorderedlist.gif',
	'title'	: '项目符号',
	'click' : function(textareaName)
	{
		KE.global[textareaName].iframeDoc.execCommand('insertunorderedlist', false, null);
	}
};
KE.plugin['zoom'] = {
	'menu' : ['250%', '200%', '150%', '120%', '100%', '80%', '50%'],
	'icon'				: 'zoom.gif',
	'title'				: '显示比例',
	'click' : function(textareaName)
	{
		var cmd = 'zoom';
		var obj = KE.global[textareaName];
		var zoom = KE.plugin[cmd].menu;
		var div = KE.util.getPopupMenu(textareaName, cmd);
		div.style.fontSize = '12px';
		for (var i in zoom) {
			var cDiv = document.createElement('div');
			cDiv.style.padding = '2px';
			cDiv.style.width = '120px';
			cDiv.style.cursor = 'pointer';
			cDiv.onmouseover = function() { this.className = 'ke-menu-selected'; }
			cDiv.onmouseout = function() { this.className = null; }
			cDiv.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + zoom[i] + '")');
			cDiv.appendChild(document.createTextNode(zoom[i]));
			div.appendChild(cDiv);
		}
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		obj.iframeDoc.body.style.zoom = value;
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['emoticons'] = {
	'icon'	: 'emoticons.gif',
	'title'	: '插入表情符号',
	'emoticonPath' : KE.scriptPath + 'emoticons/',
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
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
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
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + emoticonTable[i][j] + '")');
				cell.innerHTML = '<img src="' + KE.plugin[cmd].emoticonPath + emoticonTable[i][j] + '">';
			}
		}
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		var html = '<img src="' + KE.plugin['emoticons'].emoticonPath + value + '" border="0">';
		KE.util.insertHtml(textareaName, html);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['flash'] = {
	'icon'	: 'flash.gif',
	'title'	: '插入Flash',
	'click' : function(textareaName)
	{
		//KE.global[textareaName].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['image'] = {
	'icon'	: 'image.gif',
	'title'	: '插入图片',
	'click' : function(textareaName)
	{
		//KE.global[textareaName].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['layer'] = {
	'icon'	: 'layer.gif',
	'title'	: '插入层',
	'click' : function(textareaName)
	{
		var cmd = 'layer';
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
		var table = KE.util.getColorTable(textareaName, cmd);
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		var html = '<div style="padding:5px;border:1px solid #AAAAAA;background-color:' + value + '">请输入内容</div>';
		KE.util.insertHtml(textareaName, html);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['link'] = {
	'icon'	: 'link.gif',
	'title'	: '创建超级连接',
	'click' : function(textareaName)
	{
		var cmd = 'link';
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupWindow(textareaName, 400, 100);
		var table = document.createElement('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		for (var i = 0; i < charTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < charTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.style.padding = '1px';
				cell.style.border = '1px solid #AAAAAA';
				cell.style.fontSize = '12px';
				cell.style.cursor = 'pointer';
				cell.onmouseover = function() {this.style.borderColor = '#000000'; }
				cell.onmouseout = function() {this.style.borderColor = '#AAAAAA'; }
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + charTable[i][j] + '")');
				cell.innerHTML = charTable[i][j];
			}
		}
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
		/*
		str += '<table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;">' + 
				'<tr><td style="width:50px;padding:5px;">URL</td>' +
				'<td style="width:200px;padding-top:5px;padding-bottom:5px;"><input type="text" id="hyperLink" value="http://" style="width:190px;border:1px solid #555555;background-color:#FFFFFF;"></td>' +
				'<tr><td style="padding:5px;">'+KE_LANG['TARGET']+'</td>' +
				'<td style="padding-bottom:5px;"><select id="hyperLinkTarget"><option value="_blank" selected="selected">'+KE_LANG['NEW_WINDOW']+'</option><option value="">'+KE_LANG['CURRENT_WINDOW']+'</option></select></td></tr>' + 
				'<tr><td colspan="2" style="padding-bottom:5px;" align="center">' +
				'<input type="submit" name="button" id="'+cmd+'submitButton" value="'+KE_LANG['CONFIRM']+'" onclick="javascript:parent.KindDrawLinkEnd();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
				'<input type="button" name="button" value="'+KE_LANG['CANCEL']+'" onclick="javascript:parent.KindDisableMenu();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /></td></tr>';
			str += '</table>';
		*/
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		KE.util.insertHtml(textareaName, value);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['media'] = {
	'icon'	: 'media.gif',
	'title'	: '插入Window Media Player',
	'click' : function(textareaName)
	{
		//KE.global[textareaName].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['real'] = {
	'icon'	: 'real.gif',
	'title'	: '插入Real Player',
	'click' : function(textareaName)
	{
		//KE.global[textareaName].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['specialchar'] = {
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
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
		var table = document.createElement('table');
		table.cellPadding = 0;
		table.cellSpacing = 2;
		table.border = 0;
		for (var i = 0; i < charTable.length; i++) {
			var row = table.insertRow(i);
			for (var j = 0; j < charTable[i].length; j++) {
				var cell = row.insertCell(j);
				cell.style.padding = '1px';
				cell.style.border = '1px solid #AAAAAA';
				cell.style.fontSize = '12px';
				cell.style.cursor = 'pointer';
				cell.onmouseover = function() {this.style.borderColor = '#000000'; }
				cell.onmouseout = function() {this.style.borderColor = '#AAAAAA'; }
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + textareaName + '", "' + charTable[i][j] + '")');
				cell.innerHTML = charTable[i][j];
			}
		}
		div.appendChild(table);
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		KE.util.insertHtml(textareaName, value);
		KE.util.hideWindow(textareaName);
	}
};
KE.plugin['table'] = {
	'icon'	: 'table.gif',
	'title'	: '插入表格',
	'selected' : function(textareaName, i, j)
	{
		var obj = KE.global[textareaName];
		var text = i.toString(10) + ' by ' + j.toString(10) + ' Table';
		document.getElementById('tableLocation' + textareaName).innerHTML = text;
		var num = 10;
		for (var m = 1; m <= num; m++) {
			for (var n = 1; n <= num; n++) {
				var td = document.getElementById('tableTd' + textareaName + m.toString(10) + '_' + n.toString(10) + '');
				if (m <= i && n <= j) {
					td.style.backgroundColor = '#CCCCCC';
				} else {
					td.style.backgroundColor = '#FFFFFF';
				}
			}
		}
	},
	'click' : function(textareaName)
	{
		var cmd = 'table';
		KE.util.getSelection(textareaName);
		var obj = KE.global[textareaName];
		var div = KE.util.getPopupMenu(textareaName, cmd);
		var num = 10;
		var html = '<table cellpadding="0" cellspacing="0" border="0" style="width:130px;">';
		for (i = 1; i <= num; i++) {
			html += '<tr>';
			for (j = 1; j <= num; j++) {
				var value = i.toString(10) + ',' + j.toString(10);
				html += '<td id="tableTd' + textareaName + i.toString(10) + '_' + j.toString(10) + 
				'" style="font-size:1px;width:12px;height:12px;background-color:#FFFFFF;border:1px solid #DDDDDD;cursor:pointer;" ' + 
				'onclick="javascript:KE.plugin[\'table\'].exec(\'' + textareaName + '\', \'' + value + '\');" ' +
				'onmouseover="javascript:KE.plugin[\'table\'].selected(\'' + textareaName + '\', \'' + i.toString(10) + '\', \'' + j.toString(10) + '\');"' + 
				'onmouseout="javascript:;">&nbsp;</td>';
			}
			html += '</tr>';
		}
		html += '<tr><td colspan="10" id="tableLocation' + textareaName + '" style="font-size:12px;text-align:center;height:20px;"></td></tr>';
		html += '</table>';
		div.innerHTML = html;
		KE.util.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KE.global[textareaName];
		if (KE.browser == 'IE') {
			obj.range.select();
		}
		var location = value.split(',');
		var html = '<table border="1">';
		for (var i = 0; i < location[0]; i++) {
			html += '<tr>';
			for (var j = 0; j < location[1]; j++) {
				html += '<td>&nbsp;</td>';
			}
			html += '</tr>';
		}
		html += '</table>';
		KE.util.insertHtml(textareaName, html);
		KE.util.hideWindow(textareaName);
	}
};