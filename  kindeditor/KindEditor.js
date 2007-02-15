/**
This is a HTML Editor by DHTML technology.
Copyright (c) 2005 kindsoft.net

Author: Roddy(luolonghao@gmail.com)
Created: 2005/12/09
Last Modified: 2005/12/12
version: 1.0
*/

function KindEditor(name, width, height) {

	this.hiddenName = name;
	this.width = width;
	this.height = height;
	this.fontName = Array('Arial', 'Arial Black', 'Times New Roman', 'Courier New', 'Tahoma', 'Verdana', 'Wingdings', 'Simsun', 'Simhei', 'Gulimche', 'Batangche', 'MS Gothic', 'MS Mincho');
	this.formatBlock = Array('H1', 'H2', 'H3', 'H4', 'H5', 'H6');
	this.fontSize = Array('8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt');
	this.color = Array('White', 'Black', 'Red', 'Yellow', 'Pink', 'Green', 'Orange', 'Purple', 'Blue', 'Beige', 'Brown', 'Teal', 'Navy', 'Maroon', 'LimeGreen');
	this.toolbarIcon = Array(
							Array('SOURCE', 'source.gif', 'Code or Design mode'),
							Array('UNDO', 'undo.gif', 'Undo'),
							Array('REDO', 'redo.gif', 'Redo'),
							Array('BOLD', 'bold.gif', 'Bold'),
							Array('ITALIC', 'italic.gif', 'Italic'),
							Array('UNDERLINE', 'underline.gif', 'Underline'),
							Array('STRIKE', 'strikethrough.gif', 'Strikethrough'),
							//Array('TEXTCOLOR', 'textcolor.gif', 'Text Color'),
							//Array('BGCOLOR', 'bgcolor.gif', 'Background Color'),
							//Array('IMAGE', 'image.gif', 'Image'),
							Array('JUSTIFYLEFT', 'justifyleft.gif', 'Left'),
							Array('JUSTIFYCENTER', 'justifycenter.gif', 'Center'),
							Array('JUSTIFYRIGHT', 'justifyright.gif', 'Right'),
							//Array('JUSTIFYFULL', 'justifyfull.gif', 'Full'),
							Array('NUMBEREDLIST', 'numberedlist.gif', 'Numberedlist'),
							Array('UNORDERLIST', 'unorderedlist.gif', 'Unorderedlist'),
							Array('INDENT', 'indent.gif', 'Indent'),
							Array('OUTDENT', 'outdent.gif', 'Outdent'),
							Array('LINK', 'link.gif', 'Link'),
							Array('UNLINK', 'unlink.gif', 'Unlink')
					  );
	this.show = function()
	{
		var iframeSize = '';
		if (typeof this.width != 'undefined') iframeSize += 'width:' + this.width + ';';
		else iframeSize += 'width:100%;';
		if (typeof this.height != 'undefined') iframeSize += 'height:' + this.height + ';';
		else iframeSize += 'height:150px;';
		document.open();
		document.write('<input type="hidden" id="'+ this.hiddenName +'_text" name="'+ this.hiddenName +'_text" value="">');
		document.write('<input type="hidden" id="editmode" value="">');
		document.write('<table id="editorTable" cellspacing="0" cellpadding="2" border="0">');
		document.write('<tr>');
		document.write('<td id="toolbarTd" align="left" bgcolor="#dddddd">');
		document.write('<div style="margin:0 0 4px 0;padding:0;">');
		for (i = 0; i < this.toolbarIcon.length; i++) {
			document.write('<img id="img'+ this.toolbarIcon[i][0] +'" src="images/' + this.toolbarIcon[i][1] + '" width="21" height="21" alt="' + this.toolbarIcon[i][2] + '" align="absmiddle" onclick="javascript:editor.execute(\'' + this.toolbarIcon[i][0] + '\')" onmouseover="javascript:editor.overIcon(this)" onmouseout="javascript:editor.outIcon(this)" onmousedown="javascript:editor.downIcon(this)" onmouseup="javascript:editor.upIcon(this)" style="margin:2px;border:1px solid #AAAAAA;display:inline;">');
		}
		document.write('</div><div>');
		/*
		document.write('<select id="formatblock" onchange="javascript:editor.execute(\'FORMATBLOCK\')">');
		for (i = 0; i < this.formatBlock.length; i++) {
			document.write('<option value="' + i +'">' + this.formatBlock[i] + '</option>');
		}
		document.write('</select>');
		*/
		document.write('<select id="fontname" onchange="javascript:editor.execute(\'FONTNAME\')" style="background-color:#EEEEEE">');
		document.write('<option value="" selected="selected">文字字体</option>');
		for (i = 0; i < this.fontName.length; i++) {
			document.write('<option value="' + i +'">' + this.fontName[i] + '</option>');
		}
		document.write('</select>');
		document.write('<select id="fontsize" onchange="javascript:editor.execute(\'FONTSIZE\')" style="background-color:#EEEEEE">');
		document.write('<option value="" selected="selected">文字大小</option>');
		for (i = 0; i < this.fontSize.length; i++) {
			document.write('<option value="' + i +'">' + this.fontSize[i] + '</option>');
		}
		document.write('</select>');
		document.write('<select id="textcolor" onchange="javascript:editor.execute(\'TEXTCOLOR\')" style="background-color:#EEEEEE">');
		document.write('<option value="" selected="selected">文字颜色</option>');
		for (i = 0; i < this.color.length; i++) {
			document.write('<option value="' + i +'" style="color:' + this.color[i] + ';">' + this.color[i] + '</option>');
		}
		document.write('</select>');
		document.write('<select id="bgcolor" onchange="javascript:editor.execute(\'BGCOLOR\')" style="background-color:#EEEEEE">');
		document.write('<option value="" selected="selected">文字背景</option>');
		for (i = 0; i < this.color.length; i++) {
			document.write('<option value="' + i +'" style="color:' + this.color[i] + ';">' + this.color[i] + '</option>');
		}
		document.write('</select>');
		document.write('</div>');
		document.write('</td></tr>');
		document.write('<tr>');
		document.write('<td bgcolor="#eeeeee">');
		document.write('<div id="editIframe">');
		document.write('<iframe name="EditForm" id="EditForm" frameborder="0" style="' + iframeSize + 'padding;0;margin:0;border:1px solid #AAAAAA;">');
		document.write('</iframe>');
		document.write('</div>');
		document.write('<div id="editTextarea"  style="display:none">');
		document.write('<textarea name="Codeform" id="CodeForm" style="' + iframeSize + 'padding;0;margin:0;border:1px solid #AAAAAA;font-size:12px;line-height:16px;font-family:Courier New;background-color:#ffffff"></textarea>');
		document.write('</div>');
		document.write('</td>');
		document.write('</tr>');
		document.write('</table>');
		
		var editor = EditForm.document;
		editor.designMode = 'On';
		var content = document.getElementsByName(this.hiddenName)[0].value;
		editor.open();
		editor.write('<html><head>');
		editor.write('<meta content="KindEditor 1.0" name="generator"></head>');
		editor.write('<html><head>');
		editor.write('<html><head>');
		editor.write('<html><head>');
		editor.write('<style type="text/css">p {margin:0;}</style>');
		editor.write('<body style="font-size:12px;margin:5px;font-family:Courier New;background-color:#ffffff">');
		if( content.length > 0 )
		{
			editor.write(this.htmlentitiesDecode(content));
		}
		else {
			editor.write(' ');
		}
		editor.write('</body></html>');
		editor.close();
	}
	
	this.htmlentities = function(str)
	{
		str = str.replace(/</g,'&lt;');
		str = str.replace(/>/g,'&gt;');
		str = str.replace(/&/g,'&amp;');
		str = str.replace(/"/g,'&quot;');
		return str;
	}

	this.htmlentitiesDecode = function(str)
	{
		str = str.replace(/&lt;/g,'<');
		str = str.replace(/&gt;/g,'>');
		str = str.replace(/&amp;/g,'&');
		str = str.replace(/&quot;/g,'"');
		return str;
	}

	this.overIcon = function(obj)
	{
		obj.style.borderColor = '#222222';
		obj.style.backgroundColor = '#B5BED6';
		obj.style.cursor = 'pointer';
	}
	
	this.outIcon = function(obj)
	{
		obj.style.borderColor = '#AAAAAA';
		obj.style.backgroundColor = '#DDDDDD';
	}

	this.downIcon = function(obj)
	{
		obj.style.backgroundColor = '#8492B5';
	}

	this.upIcon = function(obj)
	{
		obj.style.backgroundColor = '#B5BED6';
	}
	
	this.disableToolbar = function(flag)
	{
		if (flag == true) {
			document.getElementById('toolbarTd').style.backgroundColor = '#EEEEEE';
			//document.getElementById('formatblock').disabled = true;
			document.getElementById('fontname').disabled = true;
			document.getElementById('fontsize').disabled = true;
			document.getElementById('textcolor').disabled = true;
			document.getElementById('bgcolor').disabled = true;
			for (i = 0; i < this.toolbarIcon.length; i++) {
				if ( this.toolbarIcon[i][0] == 'SOURCE') continue;
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onclick', '');
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmouseover', '');
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmouseout', '');
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmousedown', '');
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmouseup', '');
				document.getElementById('img' + this.toolbarIcon[i][0]).style.backgroundColor = '#EEEEEE';
				document.getElementById('img' + this.toolbarIcon[i][0]).style.cursor = 'auto';
				document.getElementById('img' + this.toolbarIcon[i][0]).style.borderColor = '#DDDDDD';
			}
		} else {
			document.getElementById('toolbarTd').style.backgroundColor = '#DDDDDD';
			//document.getElementById('formatblock').disabled = false;
			document.getElementById('fontname').disabled = false;
			document.getElementById('fontsize').disabled = false;
			document.getElementById('textcolor').disabled = false;
			document.getElementById('bgcolor').disabled = false;
			for (i = 0; i < this.toolbarIcon.length; i++) {
				if ( this.toolbarIcon[i][0] == 'SOURCE') continue;
				eval("document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onclick', function(){editor.execute('" + this.toolbarIcon[i][0] + "')});");
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmouseover', function(){editor.overIcon(this)});
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmouseout', function(){editor.outIcon(this)});
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmousedown', function(){editor.downIcon(this)});
				document.getElementById('img' + this.toolbarIcon[i][0]).setAttribute('onmouseup', function(){editor.upIcon(this)});
				document.getElementById('img' + this.toolbarIcon[i][0]).style.backgroundColor = '#DDDDDD';
				document.getElementById('img' + this.toolbarIcon[i][0]).style.cursor = 'pointer';
				document.getElementById('img' + this.toolbarIcon[i][0]).style.borderColor = '#AAAAAA';
			}
		}
	}

	this.execute = function(mode)
	{
		var str;
		var editor = EditForm.document;
		//var content = document.getElementsByName(this.hiddenName)[0].value;
		try {
			sel = editor.selection.createRange();
			str = sel.text;
		}catch(e){
			//sel = document.getElementById("EditForm").contentWindow.getSelection();
			//str = sel.text;
		}
		switch (mode)
		{
			case 'SOURCE':
				//alert(document.getElementById("editmode").value);
				if (document.getElementById("editmode").value == 'CODE') {
					var text = document.getElementById("CodeForm").value;
					editor.body.innerHTML = text;
					document.getElementById("editTextarea").style.display = 'none';
					document.getElementById("editIframe").style.display = 'block';
					this.disableToolbar(false);
					document.getElementById("editmode").value = "";
				} else {
					var html = editor.body.innerHTML;
					document.getElementById("CodeForm").value = html;
					this.disableToolbar(true);
					document.getElementById("editIframe").style.display = 'none';
					document.getElementById("editTextarea").style.display = 'block';
					document.getElementById("editmode").value = 'CODE';
				}
				break;
			case 'FONTNAME':
				value = this.fontName[document.getElementById("fontname").value];
				editor.execCommand('fontname', false, value);
				document.getElementById("fontname").options[0].selected = true;
				EditForm.focus();
				break;
			case 'FONTSIZE':
				value = parseInt(document.getElementById("fontsize").value) + 1;
				editor.execCommand('fontsize', false, value);
				document.getElementById("fontsize").options[0].selected = true;
				EditForm.focus();
				break;
			case 'TEXTCOLOR':
				value = this.color[document.getElementById("textcolor").value];
				editor.execCommand('ForeColor', false, value);
				document.getElementById("textcolor").options[0].selected = true;
				EditForm.focus();
				break;
			case 'BGCOLOR':
				value = this.color[document.getElementById("bgcolor").value];
				editor.execCommand('BackColor', false, value);
				document.getElementById("bgcolor").options[0].selected = true;
				EditForm.focus();
				break;
			case 'FORMATBLOCK':
				value = '<' + this.formatBlock[document.getElementById("formatblock").value] + '>';
				editor.execCommand('formatBlock', false, value);
				EditForm.focus();
				break;
			case 'UNDO':
				editor.execCommand('undo', false, null);
				EditForm.focus();
				break;
			case 'REDO':
				editor.execCommand('redo', false, null);
				EditForm.focus();
				break;
			case 'BOLD':
				editor.execCommand('bold', false, null);
				EditForm.focus();
				break;
			case 'ITALIC':
				editor.execCommand('italic', false, null);
				EditForm.focus();
				break;
			case 'UNDERLINE':
				editor.execCommand('underline', false, null);
				EditForm.focus();
				break;
			case 'STRIKE':
				editor.execCommand('StrikeThrough', false, null);
				EditForm.focus();
				break;
			case 'TEXTCOLOR':

				break;
			case 'JUSTIFYLEFT':
				editor.execCommand('justifyleft', false, null);
				EditForm.focus();
				break;
			case 'JUSTIFYCENTER':
				editor.execCommand('justifycenter', false, null);
				EditForm.focus();
				break;
			case 'JUSTIFYRIGHT':
				editor.execCommand('justifyright', false, null);
				EditForm.focus();
				break;
			case 'JUSTIFYFULL':
				editor.execCommand('justifyfull', false, null);
				EditForm.focus();
				break;
			case 'NUMBEREDLIST':
				editor.execCommand('InsertOrderedList', false, null);
				EditForm.focus();
				break;
			case 'UNORDERLIST':
				editor.execCommand('InsertUnorderedList', false, null);
				EditForm.focus();
				break;
			case 'INDENT':
				editor.execCommand('Indent', false, null);
				EditForm.focus();
				break;
			case 'OUTDENT':
				editor.execCommand('outdent', false, null);
				EditForm.focus();
				break;
			case 'LINK':
				if (value = prompt('请输入 URL。', 'http://')) {
					editor.execCommand('CreateLink', false, value);
				}
				EditForm.focus();
				break;
			case 'UNLINK':
				editor.execCommand('Unlink', false, null);
				EditForm.focus();
				break;	
			default: 
				break;
		}
	}

	this.getValue = function()
	{
		if (document.getElementById("editmode").value == 'CODE') {
			document.getElementsByName(this.hiddenName)[0].value = document.getElementById("CodeForm").value;
		} else {
			document.getElementsByName(this.hiddenName)[0].value = EditForm.document.body.innerHTML;
		}
		//alert(document.getElementsByName(this.hiddenName)[0].value);
	}
}
