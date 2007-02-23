
KindEditorVar.plugin['table'] = {
	'icon'	: 'table.gif',
	'title'	: '插入表格',
	'selected' : function(textareaName, i, j)
	{
		var obj = KindEditorVar.editor[textareaName];
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
		KindEditorUtil.getSelection(textareaName);
		var obj = KindEditorVar.editor[textareaName];
		var div = KindEditorUtil.getPopupMenu(textareaName, cmd);
		var num = 10;
		var html = '<table cellpadding="0" cellspacing="0" border="0" style="width:130px;">';
		for (i = 1; i <= num; i++) {
			html += '<tr>';
			for (j = 1; j <= num; j++) {
				var value = i.toString(10) + ',' + j.toString(10);
				html += '<td id="tableTd' + textareaName + i.toString(10) + '_' + j.toString(10) + 
				'" style="font-size:1px;width:12px;height:12px;background-color:#FFFFFF;border:1px solid #DDDDDD;cursor:pointer;" ' + 
				'onclick="javascript:KindEditorVar.plugin[\'table\'].exec(\'' + textareaName + '\', \'' + value + '\');" ' +
				'onmouseover="javascript:KindEditorVar.plugin[\'table\'].selected(\'' + textareaName + '\', \'' + i.toString(10) + '\', \'' + j.toString(10) + '\');"' + 
				'onmouseout="javascript:;">&nbsp;</td>';
			}
			html += '</tr>';
		}
		html += '<tr><td colspan="10" id="tableLocation' + textareaName + '" style="font-size:12px;text-align:center;height:20px;"></td></tr>';
		html += '</table>';
		div.innerHTML = html;
		KindEditorUtil.showWindow(textareaName, div);
	},
	'exec' : function(textareaName, value)
	{
		var obj = KindEditorVar.editor[textareaName];
		if (KindEditorVar.browser == 'IE') {
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
		KindEditorUtil.insertHtml(textareaName, html);
		KindEditorUtil.hideWindow(textareaName);
	}
};