
KindEditorVar.plugin['emoticons'] = {
	'icon'	: 'emoticons.gif',
	'title'	: '插入表情符号',
	'emoticonPath' : KindEditorVar.scriptPath + 'emoticons/',
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
				cell.innerHTML = '<img src="' + KindEditorVar.plugin[cmd].emoticonPath + emoticonTable[i][j] + '">';
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
		var html = '<img src="' + KindEditorVar.plugin['emoticons'].emoticonPath + value + '" border="0">';
		KindEditorUtil.insertHtml(textareaName, html);
		KindEditorUtil.hideWindow(textareaName);
	}
};
