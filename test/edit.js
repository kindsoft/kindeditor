
var edit = null;

var cmds = {
	bold : '',
	italic : '',
	underline : '',
	strikethrough : '',
	forecolor : '#FF0000',
	hilitecolor : '#DDDDDD',
	fontsize : '32px',
	fontfamily : 'Arial Black',
	removeformat : '',
	selectall : ''
};

K.each(cmds, function(key, val) {
	var a = K('<a href="javascript:;">' + key + '</a>').bind('click', (function(key, val) {
		return function(e) {
			edit.cmd[key](val);
			e.stop();
		};
	})(key, val));
	K('#cmdArea').append(a);
	K('#cmdArea').append(document.createTextNode(' '));
});

edit = K.edit({
	src : 'div#edit',
	srcElement : 'body textarea',
	width : '700px',
	height : '200px',
	designMode : true,
	bodyClass : 'ke-content',
	cssData : 'body {font-size:12px;margin:0;}'
});

K('#design').bind('click', function(e) {
	if (edit) {
		edit.design(true);
	}
});
K('#source').bind('click', function(e) {
	if (edit) {
		edit.design(false);
	}
});
K('#toggle').bind('click', function(e) {
	if (edit) {
		edit.design();
	}
});