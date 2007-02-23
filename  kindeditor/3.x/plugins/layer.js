
KindEditorVar.plugin['layer'] = {
	'icon'	: 'layer.gif',
	'title'	: '插入层',
	'click' : function(textareaName)
	{
		var cmd = 'layer';
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
		var html = '<div style="padding:5px;border:1px solid #AAAAAA;background-color:' + value + '">请输入内容</div>';
		KindEditorUtil.insertHtml(textareaName, html);
		KindEditorUtil.hideWindow(textareaName);
	}
};
