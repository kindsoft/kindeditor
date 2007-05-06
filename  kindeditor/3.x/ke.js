/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0 alpha
*/
var KE = {};
KE.lang = {
	source : '模式',
	preview : '预览',
	zoom : '放大',
	undo : '后退',
	redo : '前进',
	cut : '剪切',
	copy : '复制',
	paste : '粘贴',
	selectall : '全选',
	justifyleft : '左对齐',
	justifycenter : '居中',
	justifyright : '右对齐',
	justifyfull : '两端对齐',
	insertorderedlist : '编号',
	insertunorderedlist : '项目符号',
	indent : '减少缩进',
	outdent : '增加缩进',
	subscript : '下标',
	superscript : '上标',
	date : '日期',
	time : '时间',
	title : '标题',
	fontname : '字体',
	fontsize : '文字大小',
	textcolor : '文字颜色',
	bgcolor : '文字背景',
	bold : '粗体',
	italic : '斜体',
	underline : '下划线',
	strikethrough : '删除线',
	removeformat : '删除格式',
	image : '图片',
	flash : 'Flash',
	media : 'Windows Media Player',
	real : 'Real Player',
	layer : '层',
	table : '表格',
	specialchar : '特殊字符',
	hr : '插入横线',
	emoticons : '笑脸',
	link : '超级连接',
	unlink : '取消超级连接',
	about : '关于',
	print : '打印',
	fontTable : {
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
		'Verdana'			: 'Verdana'
	},
	titleTable : {
		'H1' : '标题 1', 
		'H2' : '标题 2', 
		'H3' : '标题 3', 
		'H4' : '标题 4', 
		'H5' : '标题 5', 
		'H6' : '标题 6'
	}
};
KE.get = function(str, doc){
	var doc = doc || document;
	return doc.getElementById(str);
};
KE.el = function(str, doc){
	var doc = doc || document;
	return doc.createElement(str);
};
KE.text = function(str, doc){
	var doc = doc || document;
	return doc.createTextNode(str);
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
KE.alert = function(id, msg){
	alert(msg);
	window.focus();
	KE.g[id].leftButton.focus();
};
KE.util = {
    getDocumentHeight: function() {
        var scrollHeight = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
        return Math.max(scrollHeight, this.getViewportHeight());
    },
    getDocumentWidth: function() {
        var scrollWidth = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
        return Math.max(scrollWidth, this.getViewportWidth());
    },
    getViewportHeight: function() {
        var height = self.innerHeight;
        var mode = document.compatMode;
        if ((mode || KE.browser == 'IE') && KE.browser != 'OPERA') {
            height = (mode == "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
        }
        return height;
    },
    getViewportWidth: function() {
        var width = self.innerWidth;
        var mode = document.compatMode;
        if (mode || KE.browser == 'IE') {
            width = (mode == "CSS1Compat") ? document.documentElement.clientWidth : document.body.clientWidth;
        }
        return width;
    },
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
		if (ua.indexOf("msie") > -1) {
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
			'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript','superscript', 
			'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'unlink', 'print'
		];
		for (var i in items) {
			KE.plugin[items[i]] = {
				icon : items[i] + '.gif',
				click : new Function('KE.g["' + id + '"].iframeDoc.execCommand("' + items[i] + '", false, null)')
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
		if (KE.g[id].cssPath) {
			html += '<link href="' + KE.g[id].cssPath + '" rel="stylesheet" type="text/css" />';
		}
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
		if (KE.g[id].wyswygMode == true) {
			html = KE.g[id].iframeDoc.body.innerHTML;
		} else {
			html = KE.g[id].newTextarea.value;
		}
		KE.g[id].hideInput.value = html;
		return html;
	},
	focus : function(id)
	{
		if (KE.g[id].wyswygMode == true) {
			KE.g[id].iframeWin.focus();
		} else {
			KE.g[id].newTextarea.focus();
		}
	},
	click : function(id, cmd)
	{
		KE.layout.hide(id);
		KE.editor.focus(id);
		KE.plugin[cmd].click(id);
	},
	selection : function(id)
	{
		var selection, range, rangeText;
		if (KE.g[id].iframeDoc.selection) {
			selection = KE.g[id].iframeDoc.selection;
			range = selection.createRange();
			rangeText = range.text;
		} else {
			selection = KE.g[id].iframeWin.getSelection();
			range = selection.getRangeAt(0);
			rangeText = range.toString();
		}
		KE.g[id].selection = selection;
		KE.g[id].range = range;
		KE.g[id].rangeText = rangeText;
	},
	select : function(id)
	{
		if (KE.browser == 'IE') KE.g[id].range.select();
	},
	pToBr : function(id)
	{
		if(KE.browser == 'IE') {
			KE.event.add(KE.g[id].iframeDoc, 'keydown', function(e) {
				KE.editor.selection(id);
				if(e.keyCode == 13 && KE.g[id].range.parentElement().tagName != 'LI') {
					KE.editor.insertHtml(id, '<br>');
					return false;
				}
			});
		}
	},
	insertHtml : function(id, html)
	{
		KE.editor.select(id);
		if (KE.browser == 'IE') {
			if (KE.g[id].selection.type.toLowerCase() == 'control') {
				KE.g[id].range.item(0).outerHTML = html;
			} else {
				KE.g[id].range.pasteHTML(html);
			}
		} else {
			KE.g[id].iframeDoc.execCommand('inserthtml', false, html);
		}
	}
};
KE.button = function(cf){
	var doc = cf.doc || document;
	var input = KE.el('input', doc);
	input.type = cf.type || 'button';
	input.className = 'ke-button';
	input.value = cf.text;
	input.onclick = cf.click;
	return input;
};
KE.box = function(cf){
	this.cf = cf;
	var div = KE.el('div');
	div.style.width = cf.width + 'px';
	div.style.height = cf.height + 'px';
	var t = KE.util.getTop(KE.g[cf.id].containerDiv) + Math.round(parseInt(KE.g[cf.id].height) / 2) - Math.round(cf.height / 2);
	var l = KE.util.getLeft(KE.g[cf.id].containerDiv) + Math.round(parseInt(KE.g[cf.id].width) / 2) - Math.round(cf.width / 2);
	if (Math.round(parseInt(KE.g[cf.id].height) / 2) < Math.round(cf.height / 2)) t = KE.util.getTop(KE.g[cf.id].containerDiv);
	if (Math.round(parseInt(KE.g[cf.id].width) / 2) < Math.round(cf.width / 2)) l = KE.util.getLeft(KE.g[cf.id].containerDiv);
	div.style.top = t + 'px';
	div.style.left = l + 'px';
	this.div = div;
	this.getTitle = function()
	{
		var div = KE.el('div', this.cf.doc);
		div.className = 'ke-box-title';
		div.innerHTML = this.cf.title;
		return div;
	};
	this.getCloseIcon = function(click)
	{
		var div = KE.el('div', this.cf.doc);
		div.className = 'ke-box-close';
		var img = KE.el('img', this.cf.doc);
		img.src = KE.g[cf.id].skinsPath + 'close.gif';
		img.alt = '关闭';
		img.title = '关闭';
		img.onclick = click;
		div.appendChild(img);
		return div;
	};
	this.getBody = function(config)
	{
		var table = KE.el('table', this.cf.doc);
		table.className = 'ke-box-body';
		table.border = 0;
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.align = 'center';
		cell.valign = 'middle';
		cell.style.wordBreak = 'break-all';
		cell.style.width = (this.cf.width - 10) + 'px';
		cell.style.height = (this.cf.height - 65) + 'px';
		if (typeof(config.content) == 'string') {
			cell.innerHTML = config.content;
		} else {
			cell.appendChild(config.content);
		}
		row = table.insertRow(1);
		cell = row.insertCell(0);
		cell.align = 'center';
		if (config.lb) {
			cell.appendChild(config.lb);
			cell.appendChild(KE.text('  ', this.cf.doc));
		}
		if (config.cb) {
			cell.appendChild(config.cb);
			cell.appendChild(KE.text('  ', this.cf.doc));
		}
		if (config.rb) {
			cell.appendChild(config.rb);
			cell.appendChild(KE.text('  ', this.cf.doc));
		}
		return table;
	};
	this.alert = function(msg)
	{
		this.div.className = 'ke-box';
		this.div.appendChild(this.getTitle());
		this.div.appendChild(this.getCloseIcon(
			new Function('KE.layout.hide("' + this.cf.id + '")')
		));
		var button = KE.button({
			text : '确定',
			click : new Function('KE.layout.hide("' + this.cf.id + '")')
		});
		this.div.appendChild(this.getBody({
				content : msg,
				lb : button
			}));
		this.show();
		window.focus();
		button.focus();
		KE.g[this.cf.id].maskDiv.style.display = 'block';
	};
	this.getDoc = function()
	{
		var html = '<html>';
		html += '<head>';
		html += '<title>dialog</title>';
		html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
		html += '<link href="' + KE.scriptPath + 'skins/' + KE.g[this.cf.id].skinType + '.css" rel="stylesheet" type="text/css">';
		html += '</head>';
		html += '<body style="margin:0;">';
		html += '</body>';
		html += '</html>';
		return html;
	};
	this.dialog = function(html)
	{
		this.div.className = 'ke-box';
		this.div.appendChild(this.getTitle());
		this.div.appendChild(this.getCloseIcon(
			new Function('KE.layout.hide("' + this.cf.id + '")')
		));
		var lb = KE.button({
			text : '确定',
			click : new Function('KE.plugin["' + this.cf.cmd + '"].exec("' + this.cf.id + '")')
		});
		var rb = KE.button({
			text : '取消',
			click : new Function('KE.layout.hide("' + this.cf.id + '")')
		});
		this.div.appendChild(this.getBody({
				content : html,
				lb : lb,
				rb : rb
			}));
		this.show();
		window.focus();
		lb.focus();
		KE.g[this.cf.id].leftButton = lb;
		KE.g[this.cf.id].maskDiv.style.display = 'block';
	};
	this.baseFrameDialog = function(html)
	{
		var iframe = KE.el('iframe');
		iframe.id = this.cf.id + 'Dialog';
		iframe.name = this.cf.id + 'Dialog';
		iframe.style.width = (this.cf.width + 4) + 'px';
		iframe.style.height = (this.cf.height + 6) + 'px';
		iframe.setAttribute("frameBorder", "0");
		this.div.className = "ke-dialog";
		this.div.appendChild(iframe);
		this.show();
		var dialogWin = iframe.contentWindow;
		var dialogDoc = dialogWin.document;
		dialogDoc.open();
		dialogDoc.write(this.getDoc());
		dialogDoc.close();
		
		this.cf.doc = dialogDoc;
		var dialogDiv = KE.el('div', this.cf.doc);
		dialogDiv.className = 'ke-box';
		dialogDiv.style.width = cf.width + 'px';
		dialogDiv.style.height = cf.height + 'px';
		dialogDiv.appendChild(this.getTitle());
		dialogDiv.appendChild(this.getCloseIcon(
			new Function('parent.KE.layout.hide("' + this.cf.id + '")')
		));
		var d = KE.el('div', this.cf.doc);
		d.innerHTML = html;
		dialogDiv.appendChild(d);
		KE.g[this.cf.id].dialogDiv = dialogDiv;
		KE.g[this.cf.id].maskDiv.style.display = 'block';
		KE.g[this.cf.id].dialogWin = dialogWin;
		KE.g[this.cf.id].dialogDoc = dialogDoc;
		KE.g[this.cf.id].dialogAction = function(id) {
			KE.g[id].dialogDoc.body.appendChild(KE.g[id].dialogDiv);
			KE.g[id].dialogWin.focus();
		}
		setTimeout('KE.g["' + this.cf.id + '"].dialogAction("' + this.cf.id + '")', 10);
	};
	this.frameDialog = function(html)
	{
		var iframe = KE.el('iframe');
		iframe.id = this.cf.id + 'Dialog';
		iframe.name = this.cf.id + 'Dialog';
		iframe.style.width = (this.cf.width + 4) + 'px';
		iframe.style.height = (this.cf.height + 6) + 'px';
		iframe.setAttribute("frameBorder", "0");
		this.div.className = "ke-dialog";
		this.div.appendChild(iframe);
		this.show();
		var dialogWin = iframe.contentWindow;
		var dialogDoc = dialogWin.document;
		dialogDoc.open();
		dialogDoc.write(this.getDoc());
		dialogDoc.close();
		
		this.cf.doc = dialogDoc;
		var dialogDiv = KE.el('div', this.cf.doc);
		dialogDiv.className = 'ke-box';
		dialogDiv.style.width = cf.width + 'px';
		dialogDiv.style.height = cf.height + 'px';
		dialogDiv.appendChild(this.getTitle());
		dialogDiv.appendChild(this.getCloseIcon(
			new Function('parent.KE.layout.hide("' + this.cf.id + '")')
		));
		var lb = KE.button({
			doc : this.cf.doc,
			text : '确定',
			click : new Function('parent.KE.plugin["' + this.cf.cmd + '"].exec("' + this.cf.id + '")')
		});
		var rb = KE.button({
			doc : this.cf.doc,
			text : '取消',
			click : new Function('parent.KE.layout.hide("' + this.cf.id + '")')
		});
		dialogDiv.appendChild(this.getBody({
				content : html,
				lb : lb,
				rb : rb
			}));
		KE.g[this.cf.id].dialogDiv = dialogDiv;
		KE.g[this.cf.id].maskDiv.style.display = 'block';
		KE.g[this.cf.id].dialogWin = dialogWin;
		KE.g[this.cf.id].dialogDoc = dialogDoc;
		KE.g[this.cf.id].dialogAction = function(id) {
			KE.g[id].dialogDoc.body.appendChild(KE.g[id].dialogDiv);
			KE.g[id].dialogWin.focus();
		}
		setTimeout('KE.g["' + this.cf.id + '"].dialogAction("' + this.cf.id + '")', 10);
	};
	this.show = function()
	{
		KE.layout.show(this.cf.id, this.div);
	};
};
KE.layout = {
	show : function(id, div)
	{
		KE.layout.hide(id);
		KE.g[id].hideDiv.appendChild(div);
		KE.g[id].hideDiv.style.display = 'block';
		KE.g[id].layoutDiv = div;
	},
	hide : function(id)
	{
		try {
			KE.g[id].hideDiv.removeChild(KE.g[id].layoutDiv);
		} catch (e) {}
		KE.g[id].hideDiv.style.display = 'none';
		KE.g[id].maskDiv.style.display = 'none';
	},
	get : function(id)
	{
		var div = KE.el('div');
		div.style.position = 'absolute';
		div.style.zIndex = 10000;
		return div;
	}
};
KE.menu = function(cf){
	this.cf = cf;
	var div = KE.layout.get(cf.id);
	div.className = 'ke-menu';
	var obj = KE.g[cf.id].toolbarIcon[cf.cmd];
	div.style.top = KE.util.getTop(obj) + obj.offsetHeight + 'px';
	div.style.left = KE.util.getLeft(obj) + 'px';
	this.div = div;
	this.add = function(text, event)
	{
		var cDiv = KE.el('div');
		cDiv.className = 'ke-menu-noselected';
		cDiv.style.width = this.cf.width;
		cDiv.onmouseover = function() { this.className = 'ke-menu-selected'; }
		cDiv.onmouseout = function() { this.className = 'ke-menu-noselected'; }
		cDiv.onclick = event;
		cDiv.innerHTML = text;
		this.append(cDiv);
	};
	this.append = function(el)
	{
		this.div.appendChild(el);
	};
	this.insert = function(html)
	{
		this.div.innerHTML = html;
	};
	this.show = function()
	{
		KE.layout.show(this.cf.id, this.div);
	};
	this.picker = function()
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
				cell.onclick = new Function('KE.plugin["' + this.cf.cmd + '"].exec("' + this.cf.id + '", "' + colorTable[i][j] + '")');
				cell.innerHTML = '&nbsp;';
			}
		}
		this.append(table);
		this.show();
	};
};
KE.toolbar = {
	able : function(id, arr)
	{
		for (var cmd in KE.g[id].toolbarIcon) {
			if (KE.util.inArray(cmd, arr)) continue;
			var obj = KE.g[id].toolbarIcon[cmd];
			obj.className = 'ke-icon';
			obj.onmouseover = function(){ this.className = "ke-icon-selected"; };
			obj.onmouseout = function(){ this.className = "ke-icon"; };
			obj.onclick = new Function('KE.editor.click("' + id + '", "' + cmd + '")');
		}
	},
	disable : function(id, arr)
	{
		for (var cmd in KE.g[id].toolbarIcon) {
			if (KE.util.inArray(cmd, arr)) continue;
			var obj = KE.g[id].toolbarIcon[cmd];
			obj.className = 'ke-icon-disabled';
			obj.onmouseover = function(){ };
			obj.onmouseout = function(){ };
			obj.onclick = function(){ };
		}
	},
	create : function(id)
	{
		KE.g[id].toolbarIcon = [];
		var el = KE.el('div');
		el.className = 'ke-toolbar';
		for (var i in KE.g[id].items) {
			var cmd = KE.g[id].items[i];
			var obj;
			if (cmd == '-') {
				obj = KE.el('br');
			} else {
				obj = KE.el('img');
				obj.src = KE.g[id].skinsPath + KE.plugin[cmd].icon;
				obj.align = 'absmiddle';
				obj.className = 'ke-icon';
				obj.alt = KE.lang[cmd];
				obj.title = KE.lang[cmd];
				obj.onmouseover = function(){ this.className = "ke-icon-selected"; };
				obj.onmouseout = function(){ this.className = "ke-icon"; };
				obj.onclick = new Function('KE.editor.click("' + id + '", "' + cmd + '")');
				KE.g[id].toolbarIcon[cmd] = obj;
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
	var formWidth = (parseInt(widthArr[1]) - 2).toString(10) + widthArr[2];
	var heightArr = height.match(/(\d+)([px%]{1,2})/);
	var formHeight = (parseInt(heightArr[1]) - 4).toString(10) + heightArr[2];
	
	var containerDiv = KE.el('div');
	containerDiv.className = 'ke-container';
	containerDiv.style.width = width;
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
	
	var maskDiv = KE.el('div');
	maskDiv.className = 'ke-mask';
	maskDiv.style.width = KE.util.getDocumentWidth(true);
	maskDiv.style.height = KE.util.getDocumentHeight(true);

	KE.editor.setDefaultPlugin(id);
	containerDiv.appendChild(KE.toolbar.create(id));
	containerDiv.appendChild(formDiv);
	containerDiv.appendChild(hideInput);
	containerDiv.appendChild(hideDiv);
	containerDiv.appendChild(maskDiv);
	var iframeWin = iframe.contentWindow;
	var iframeDoc = iframeWin.document;
	iframeDoc.designMode = "on";
	var html = KE.editor.getFullHtml(id, oldTextarea.value);
	iframeDoc.open();
	iframeDoc.write(html);
	iframeDoc.close();
	if (KE.g[id].wyswygMode == false) {
		newTextarea.value = oldTextarea.value;
		newTextarea.style.display = 'block';
		iframe.style.display = 'none';
		KE.toolbar.disable(id, ['source', 'preview']);
	}
	oldTextarea.parentNode.removeChild(oldTextarea);

	var form = hideDiv.parentNode;
	while (form.tagName != 'FORM') { form = form.parentNode; }
	KE.event.add(form, 'submit', new Function('KE.editor.getData("' + id + '")'));
	KE.event.add(iframeDoc, 'mousedown', new Function('KE.layout.hide("' + id + '")'));
	KE.event.add(newTextarea, 'mousedown', new Function('KE.layout.hide("' + id + '")'));

	KE.g[id].containerDiv = containerDiv;
	KE.g[id].iframe = iframe;
	KE.g[id].newTextarea = newTextarea;
	KE.g[id].hideInput = hideInput;
	KE.g[id].hideDiv = hideDiv;
	KE.g[id].maskDiv = maskDiv;
	KE.g[id].iframeWin = iframeWin;
	KE.g[id].iframeDoc = iframeDoc;
	KE.g[id].width = width;
	KE.g[id].height = height;

	KE.editor.pToBr(id);
	KE.editor.focus(id);
};
KE.version = '3.0 alpha';
KE.scriptPath = KE.util.getScriptPath();
KE.htmlPath = KE.util.getHtmlPath();
KE.browser = KE.util.getBrowser();
KE.plugin = {};
KE.g = {};
KE.show = function(config) 
{
	config.wyswygMode = config.wyswygMode || true;
	config.skinType = config.skinType || 'default';
	config.cssPath = config.cssPath || '';
	config.skinsPath = KE.scriptPath + 'skins/' + config.skinType + '/';
	config.items = config.items || [
		'source', 'preview', 'zoom', 'print', 'undo', 'redo', 'cut', 'copy', 'paste', 
		'selectall', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
		'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		'superscript', 'date', 'time', '-',
		'title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold', 
		'italic', 'underline', 'strikethrough', 'removeformat', 'image',
		'flash', 'media', 'real', 'layer', 'table', 'specialchar', 'hr', 
		'emoticons', 'link', 'unlink'
	];
	KE.g[config.id] = config;
	KE.util.loadStyle(KE.scriptPath + 'skins/' + config.skinType + '.css');
	KE.event.add(window, 'load', new Function('KE.create("' + config.id + '")'));
};
KE.plugin['bgcolor'] = {
	icon : 'bgcolor.gif',
	click : function(id)
	{
		KE.editor.selection(id);
		var menu = new KE.menu({
				id : id,
				cmd : 'bgcolor'
			});
		menu.picker();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		if (KE.browser == 'IE') {
			KE.g[id].iframeDoc.execCommand('backcolor', false, value);
		} else {
			var startRangeNode = KE.g[id].range.startContainer;
			if (startRangeNode.nodeType == 3) {
				var font = KE.el("font");
				font.style.backgroundColor = value;
				font.appendChild(KE.g[id].range.extractContents());
				var startOffset = KE.g[id].range.startOffset;
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
		KE.layout.hide(id);
	}
};
KE.plugin['date'] = {
	icon : 'date.gif',
	click : function(id)
	{
		var date = new Date();
		var year = date.getFullYear().toString(10);
		var month = (date.getMonth() + 1).toString(10);
		month = month.length < 2 ? '0' + month : month;
		var day = date.getDate().toString(10);
		day = day.length < 2 ? '0' + day : day;
		var value = year + '-' + month + '-' + day;
		KE.editor.selection(id);
		KE.editor.insertHtml(id, value);
	}
};
KE.plugin['fontname'] = {
	icon: 'font.gif',
	click : function(id)
	{
		var cmd = 'fontname';
		KE.editor.selection(id);
		var fontName = KE.lang.fontTable;
		var menu = new KE.menu({
				id : id,
				cmd : cmd,
				width : '160px'
			});
		for (var i in fontName) {
			menu.add(fontName[i], new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + i + '")'));
		}
		menu.show();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		KE.g[id].iframeDoc.execCommand('fontname', false, value);
		KE.layout.hide(id);
	}
};
KE.plugin['fontsize'] = {
	icon : 'fontsize.gif',
	click : function(id)
	{
		var fontSize = {
			'1' : '8pt', 
			'2' : '10pt', 
			'3' : '12pt', 
			'4' : '14pt', 
			'5' : '18pt', 
			'6' : '24pt', 
			'7' : '36pt'
		};
		var cmd = 'fontsize';
		KE.editor.selection(id);
		var menu = new KE.menu({
				id : id,
				cmd : cmd,
				width : '100px'
			});
		for (var i in fontSize) {
			menu.add(fontSize[i], new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + i + '")'));
		}
		menu.show();
	},
	'exec' : function(id, value)
	{
		KE.editor.select(id);
		KE.g[id].iframeDoc.execCommand('fontsize', false, value.substr(0, 1));
		KE.layout.hide(id);
	}
};
KE.plugin['hr'] = {
	icon : 'hr.gif',
	click : function(id)
	{
		KE.editor.selection(id);
		var menu = new KE.menu({
				id : id,
				cmd : 'hr'
			});
		menu.picker();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		var html = '<hr color="' + value + '" size="1">';
		KE.editor.insertHtml(id, html);
		KE.layout.hide(id);
	}
};
KE.plugin['preview'] = {
	icon : 'preview.gif',
	click : function(id)
	{
		var iframe = KE.el('iframe');
		iframe.style.width = '490px';
		iframe.style.height = '340px';
		iframe.setAttribute("frameBorder", "0");
		var box = new KE.box({
				id : id,
				width : 500,
				height : 400,
				title : '预览'
			});
		box.alert(iframe);
		var html = KE.editor.getData(id);
		var dialogWin = iframe.contentWindow;
		var dialogDoc = dialogWin.document;
		dialogDoc.open();
		dialogDoc.write(KE.editor.getFullHtml(id, html));
		dialogDoc.close();
	}
};
KE.plugin['source'] = {
	icon : 'source.gif',
	click : function(id)
	{
		var obj = KE.g[id];
		if (obj.wyswygMode == true) {
			KE.layout.hide(id);
			obj.newTextarea.value = obj.iframeDoc.body.innerHTML;
			obj.iframe.style.display = 'none';
			obj.newTextarea.style.display = 'block';
			KE.toolbar.disable(id, ['source', 'preview']);
			obj.wyswygMode = false;
		} else {
			obj.iframeDoc.body.innerHTML = obj.newTextarea.value;
			obj.iframe.style.display = 'block';
			obj.newTextarea.style.display = 'none';
			KE.toolbar.able(id, ['source', 'preview']);
			obj.wyswygMode = true;
		}
	}
};
KE.plugin['textcolor'] = {
	icon : 'textcolor.gif',
	click : function(id)
	{
		KE.editor.selection(id);
		var menu = new KE.menu({
				id : id,
				cmd : 'textcolor'
			});
		menu.picker();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		KE.g[id].iframeDoc.execCommand('forecolor', false, value);
		KE.layout.hide(id);
	}
};
KE.plugin['time'] = {
	icon : 'time.gif',
	click : function(id)
	{
		var date = new Date();
		var hour = date.getHours().toString(10);
		hour = hour.length < 2 ? '0' + hour : hour;
		var minute = date.getMinutes().toString(10);
		minute = minute.length < 2 ? '0' + minute : minute;
		var second = date.getSeconds().toString(10);
		second = second.length < 2 ? '0' + second : second;
		var value = hour + ':' + minute + ':' + second;
		KE.editor.selection(id);
		KE.editor.insertHtml(id, value);
	}
};
KE.plugin['title'] = {
	icon : 'title.gif',
	click : function(id)
	{
		var title = KE.lang.titleTable;
		var cmd = 'title';
		KE.editor.selection(id);
		var menu = new KE.menu({
				id : id,
				cmd : cmd,
				width : '100px'
			});
		for (var i in title) {
			menu.add(title[i], new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "<' + i + '>")'));
		}
		menu.show();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		KE.g[id].iframeDoc.execCommand('formatblock', false, value);
		KE.layout.hide(id);
	}
};
KE.plugin['zoom'] = {
	icon : 'zoom.gif',
	click : function(id)
	{
		var cmd = 'zoom';
		var zoom = ['250%', '200%', '150%', '120%', '100%', '80%', '50%'];
		var menu = new KE.menu({
				id : id,
				cmd : cmd,
				width : '120px'
			});
		for (var i in zoom) {
			menu.add(zoom[i], new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + zoom[i] + '")'));
		}
		menu.show();
	},
	exec : function(id, value)
	{
		KE.g[id].iframeDoc.body.style.zoom = value;
		KE.layout.hide(id);
	}
};
KE.plugin['emoticons'] = {
	icon : 'emoticons.gif',
	click : function(id)
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
		KE.editor.selection(id);
		var table = KE.el('table');
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
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + emoticonTable[i][j] + '")');
				cell.innerHTML = '<img src="' + KE.scriptPath + 'emoticons/' + emoticonTable[i][j] + '">';
			}
		}
		var menu = new KE.menu({
				id : id,
				cmd : cmd
			});
		menu.append(table);
		menu.show();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		var html = '<img src="' + KE.scriptPath + 'emoticons/' + value + '" border="0">';
		KE.editor.insertHtml(id, html);
		KE.layout.hide(id);
	}
};
KE.plugin['flash'] = {
	icon : 'flash.gif',
	click : function(id)
	{
		//KE.g[id].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['image'] = {
	icon : 'image.gif',
	click : function(id)
	{
		var cmd = 'link';
		KE.editor.selection(id);
		var html = '';
		/*
		html += '<form name="uploadForm" style="margin:0;padding:0;" method="post" enctype="multipart/form-data" ';
		html += 'action="' + KE.g[id].upload + '" onsubmit="javascript:if(parent.KindDrawImageEnd()==false){return false;};">' +
			'<input type="hidden" name="fileName" id="fileName" value="" />' + 
			'<table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;">' + 
			'<tr><td colspan="2"><table border="0" style="margin-bottom:3px;"><tr><td id="imgPreview" style="width:240px;height:240px;border:1px solid #AAAAAA;background-color:#FFFFFF;" align="center" valign="middle">&nbsp;</td></tr></table></td></tr>' +  	
			'<tr><td style="width:50px;padding-left:5px;">';
		if (KE_UPLOAD_MODE == true) {
			str += '<select id="imageType" onchange="javascript:parent.KindImageType(this.value);document.getElementById(\''+cmd+'submitButton\').focus();"><option value="1" selected="selected">'+KE_LANG['LOCAL']+'</option><option value="2">'+KE_LANG['REMOTE']+'</option></select>';
		} else {
			str += KE_LANG['REMOTE'];
		}
		str += '</td><td style="width:200px;padding-bottom:3px;">';
		if (KE_UPLOAD_MODE == true) {
			str += '<input type="text" id="imgLink" value="http://" maxlength="255" style="width:95%;border:1px solid #555555;display:none;" />' +
			'<input type="file" name="fileData" id="imgFile" size="14" style="border:1px solid #555555;" onclick="javascript:document.getElementById(\'imgLink\').value=\'http://\';" />';
		} else {
			str += '<input type="text" id="imgLink" value="http://" maxlength="255" style="width:95%;border:1px solid #555555;" />' +
			'<input type="hidden" name="imageType" id="imageType" value="2"><input type="hidden" name="fileData" id="imgFile" value="" />';
		}
		str += '</td></tr><tr><td colspan="2" style="padding-bottom:3px;">' +
			'<table border="0" style="width:100%;font-size:12px;"><tr>' +
			'<td width="18%" style="padding:2px 2px 2px 5px;">'+KE_LANG['TITLE']+'</td><td width="82%"><input type="text" name="imgTitle" id="imgTitle" value="" maxlength="100" style="width:95%;border:1px solid #555555;" /></td></tr></table>' +	
			'<table border="0" style="width:100%;font-size:12px;"><tr>' +
			'<td width="10%" style="padding:2px 2px 2px 5px;">'+KE_LANG['WIDTH']+'</td><td width="23%"><input type="text" name="imgWidth" id="imgWidth" value="0" maxlength="4" style="width:40px;border:1px solid #555555;" /></td>' +
			'<td width="10%" style="padding:2px;">'+KE_LANG['HEIGHT']+'</td><td width="23%"><input type="text" name="imgHeight" id="imgHeight" value="0" maxlength="4" style="width:40px;border:1px solid #555555;" /></td>' +
			'<td width="10%" style="padding:2px;">'+KE_LANG['BORDER']+'</td><td width="23%"><input type="text" name="imgBorder" id="imgBorder" value="0" maxlength="1" style="width:20px;border:1px solid #555555;" /></td></tr></table>' +
			'<table border="0" style="width:100%;font-size:12px;"><tr>' +
			'<td width="39%" style="padding:2px 2px 2px 5px;"><select id="imgAlign" name="imgAlign"><option value="">'+KE_LANG['ALIGN']+'</option>';
		for (var i = 0; i < KE_IMAGE_ALIGN_TABLE.length; i++) {
			str += '<option value="' + KE_IMAGE_ALIGN_TABLE[i] + '">' + KE_IMAGE_ALIGN_TABLE[i] + '</option>';
		}
		str += '</select></td>' +
			'<td width="15%" style="padding:2px;">'+KE_LANG['HSPACE']+'</td><td width="15%"><input type="text" name="imgHspace" id="imgHspace" value="0" maxlength="1" style="width:20px;border:1px solid #555555;" /></td>' +
			'<td width="15%" style="padding:2px;">'+KE_LANG['VSPACE']+'</td><td width="15%"><input type="text" name="imgVspace" id="imgVspace" value="0" maxlength="1" style="width:20px;border:1px solid #555555;" /></td></tr></table>' +
			'</td></tr><tr><td colspan="2" style="margin:5px;padding-bottom:5px;" align="center">' +
			'<input type="button" name="button" value="'+KE_LANG['PREVIEW']+'" onclick="javascript:parent.KindImagePreview();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
			'<input type="submit" name="button" id="'+cmd+'submitButton" value="'+KE_LANG['CONFIRM']+'" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
			'<input type="button" name="button" value="'+KE_LANG['CANCEL']+'" onclick="javascript:parent.KindDisableMenu();parent.KindReloadIframe();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /></td></tr>' + 
			'</table></form></div>';
		*/
		var box = new KE.box({
				id : id,
				cmd : cmd,
				width : 580,
				height : 330,
				title : '插入图片'
			});

		box.frameDialog(html);
	}
};
KE.plugin['layer'] = {
	icon : 'layer.gif',
	click : function(id)
	{
		KE.editor.selection(id);
		var menu = new KE.menu({
				id : id,
				cmd : 'layer'
			});
		menu.picker();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		var html = '<div style="padding:5px;border:1px solid #AAAAAA;background-color:' + value + '">请输入内容</div>';
		KE.editor.insertHtml(id, html);
		KE.layout.hide(id);
	}
};
KE.plugin['link'] = {
	icon : 'link.gif',
	click : function(id)
	{
		var cmd = 'link';
		KE.editor.selection(id);
		var html = '<table border="0" class="ke-text">';
		html += '<tr><td style="width:50px;padding:5px;">URL</td>';
		html += '<td><input type="text" id="' + id + 'hyperLink" value="http://" style="width:190px;" class="ke-text-input"></td></tr>'; 
		html += '</table>';
		var box = new KE.box({
				id : id,
				cmd : cmd,
				width : 280,
				height : 100,
				title : '超级连接'
			});
		box.dialog(html);
	},
	exec : function(id)
	{
		KE.editor.focus(id);
		KE.editor.select(id);
		var url = KE.get(id + 'hyperLink').value;
		if (url.match(/http:\/\/.{3,}/) == null) {
			KE.alert(id, 'URL不正确。');
			return false;
		}
		if (KE.g[id].rangeText != '') {
			var element;
			if (KE.browser == 'IE') {
				if (KE.g[id].selection.type.toLowerCase() == 'control') {
					var el = KE.el("a");
					el.href = url;
					KE.g[id].range.item(0).applyElement(el);
				} else if (KE.g[id].selection.type.toLowerCase() == 'text') {
					KE.g[id].iframeDoc.execCommand("createlink", false, url);
				}
			} else {
				KE.g[id].iframeDoc.execCommand("createlink", false, url);
			}
		}
		KE.layout.hide(id);
	}
};
KE.plugin['media'] = {
	icon : 'media.gif',
	click : function(id)
	{
		var cmd = 'media';
		var html = '<table class="ke-text">';
		html += '<tr><td colspan="2"><div border="0"><tr><td id="'+cmd+'preview" style="width:240px;height:200px;border:1px solid #AAAAAA;background-color:#FFFFFF;" align="center" valign="middle">&nbsp;</td></tr></table></td></tr>';
		html += '<tr><td style="width:40px;padding:5px;">远程</td>';
		html += '<td style="width:210px;padding-bottom:5px;"><input type="text" id="'+cmd+'link" value="http://" style="width:190px;border:1px solid #555555;" /></td></tr>';
		html += '</table>';
		var box = new KE.box({
				id : id,
				cmd : cmd,
				width : 300,
				height : 310,
				title : '插入WMP文件'
			});
		box.div.className = 'ke-box';
		box.div.appendChild(box.getTitle());
		box.div.appendChild(box.getCloseIcon(
			new Function('KE.layout.hide("' + box.cf.id + '")')
		));
		var lb = KE.button({
			text : '试听',
			click : new Function('KE.plugin["' + box.cf.cmd + '"].exec("' + box.cf.id + '")')
		});
		var cb = KE.button({
			text : '确定',
			click : new Function('KE.plugin["' + box.cf.cmd + '"].exec("' + box.cf.id + '")')
		});
		var rb = KE.button({
			text : '取消',
			click : new Function('KE.layout.hide("' + box.cf.id + '")')
		});
		box.div.appendChild(box.getBody({
				text : html,
				lb : lb,
				cb : cb,
				rb : rb
			}));
		box.show();
		window.focus();
		lb.focus();
		KE.g[box.cf.id].leftButton = lb;
		KE.g[box.cf.id].maskDiv.style.display = 'block';
	}
};
KE.plugin['real'] = {
	icon : 'real.gif',
	click : function(id)
	{
		//KE.g[id].iframeDoc.execCommand('bold', false, null);
	}
};
KE.plugin['specialchar'] = {
	icon : 'specialchar.gif',
	click : function(id)
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
		KE.editor.selection(id);
		var table = KE.el('table');
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
				cell.onclick = new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + charTable[i][j] + '")');
				cell.innerHTML = charTable[i][j];
			}
		}
		var menu = new KE.menu({
				id : id,
				cmd : cmd
			});
		menu.append(table);
		menu.show();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
		KE.editor.insertHtml(id, value);
		KE.layout.hide(id);
	}
};
KE.plugin['table'] = {
	icon	: 'table.gif',
	selected : function(id, i, j)
	{
		var text = i.toString(10) + ' by ' + j.toString(10) + ' Table';
		KE.get('tableLocation' + id).innerHTML = text;
		var num = 10;
		for (var m = 1; m <= num; m++) {
			for (var n = 1; n <= num; n++) {
				var td = KE.get('tableTd' + id + m.toString(10) + '_' + n.toString(10) + '');
				if (m <= i && n <= j) {
					td.style.backgroundColor = '#CCCCCC';
				} else {
					td.style.backgroundColor = '#FFFFFF';
				}
			}
		}
	},
	click : function(id)
	{
		var cmd = 'table';
		KE.editor.selection(id);
		var num = 10;
		var html = '<table cellpadding="0" cellspacing="0" border="0" style="width:130px;">';
		for (i = 1; i <= num; i++) {
			html += '<tr>';
			for (j = 1; j <= num; j++) {
				var value = i.toString(10) + ',' + j.toString(10);
				html += '<td id="tableTd' + id + i.toString(10) + '_' + j.toString(10) + 
				'" style="font-size:1px;width:12px;height:12px;background-color:#FFFFFF;border:1px solid #DDDDDD;cursor:pointer;" ' + 
				'onclick="javascript:KE.plugin[\'table\'].exec(\'' + id + '\', \'' + value + '\');" ' +
				'onmouseover="javascript:KE.plugin[\'table\'].selected(\'' + id + '\', \'' + i.toString(10) + '\', \'' + j.toString(10) + '\');"' + 
				'onmouseout="javascript:;">&nbsp;</td>';
			}
			html += '</tr>';
		}
		html += '<tr><td colspan="10" id="tableLocation' + id + '" style="font-size:12px;text-align:center;height:20px;"></td></tr>';
		html += '</table>';
		var menu = new KE.menu({
				id : id,
				cmd : cmd
			});
		menu.insert(html);
		menu.show();
	},
	exec : function(id, value)
	{
		KE.editor.select(id);
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
		KE.editor.insertHtml(id, html);
		KE.layout.hide(id);
	}
};