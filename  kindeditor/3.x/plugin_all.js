/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0 alpha
*/
KE.toolbar.items = [
	'source', 'preview', 'zoom', 'print', 'undo', 'redo', 'cut', 'copy', 'paste', 
	'selectall', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
	'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
	'superscript', 'date', 'time', '-',
	'title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold', 
	'italic', 'underline', 'strikethrough', 'removeformat', 'image',
	'flash', 'media', 'real', 'layer', 'table', 'specialchar', 'hr', 
	'emoticons', 'link', 'unlink', 'about'
];
KE.plugin['about'] = {
	icon : 'about.gif',
	click : function(id)
	{
		var msg ='<a href="http://www.kindsoft.net/" target="_blank" style="color:#4169e1;">KindEditor</a>' + KE.version;
		var box = new KE.box({
				id : id,
				width : 250,
				height : 100,
				title : '关于'
			});
		box.alert(msg);
	}
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
		var fontName = KE.lang[KE.g[id].langType].fontTable;
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
			KE.toolbar.disable(id, ['source', 'preview', 'about']);
			obj.wyswygMode = false;
		} else {
			obj.iframeDoc.body.innerHTML = obj.newTextarea.value;
			obj.iframe.style.display = 'block';
			obj.newTextarea.style.display = 'none';
			KE.toolbar.able(id, ['source', 'preview', 'about']);
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
		var title = KE.lang[KE.g[id].langType].titleTable;
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
		html += '<td><input type="text" id="' + id + 'hyperLink" value="http://" style="width:190px;" class="ke-text-input"></td>'; 
		html += '<tr><td style="padding:5px;">打开方式</td>';
		html += '<td><select id="' + id + 'hyperLinkTarget"><option value="_blank" selected="selected">新窗口</option><option value="">当前窗口</option></select></td></tr>'; 
		html += '</table>';
		var box = new KE.box({
				id : id,
				cmd : cmd,
				width : 280,
				height : 130,
				title : '超级连接'
			});
		box.dialog(html);
	},
	exec : function(id)
	{
		KE.editor.focus(id);
		KE.editor.select(id);
		var url = KE.get(id + 'hyperLink').value;
		var target = KE.get(id + 'hyperLinkTarget').value;
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
					if (target) el.target = target;
					KE.g[id].range.item(0).applyElement(el);
				} else if (KE.g[id].selection.type.toLowerCase() == 'text') {
					KE.g[id].iframeDoc.execCommand("createlink", false, url);
					element = KE.g[id].range.parentElement();
					if (target) element.target = target;
				}
			} else {
				KE.g[id].iframeDoc.execCommand("createlink", false, url);
				element = KE.g[id].range.startContainer.previousSibling;
				element.target = target;
				if (target) element.target = target;
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