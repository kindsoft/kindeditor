
var items = [
	'source', '|', 'fullscreen', 'undo', 'redo', 'print', 'cut', 'copy', 'paste',
	'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
	'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
	'superscript', '|', 'selectall', '/',
	'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
	'italic', 'underline', 'strikethrough', 'removeformat', '|', 'image',
	'flash', 'media', 'table', 'hr', 'emoticons', 'link', 'unlink', '|', 'about'
];
var list = [];
K.each(items, function(i, name) {
	if (name == '|') {
		list.push('<span class="ke-inline-block ke-separator"></span>');
	} else if (name == '/') {
		list.push('<br />');
	} else {
		list.push('<span class="ke-inline-block ke-outline" unselectable="on" data-name="' + name + '" title="' + name + '">');
		list.push('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span></span>');
	}
});

var toolbar = K.toolbar({
	src : 'div#toolbar',
	width : '100%',
	html : list.join(''),
	click : function(e, name) {
		alert(name);
	}
});

K('#enable').bind('click', function(e) {
	if (toolbar) {
		toolbar.disableAll(false);
	}
});

K('#disable').bind('click', function(e) {
	if (toolbar) {
		toolbar.disableAll(true);
	}
});

K('#toggle').bind('click', function(e) {
	if (toolbar) {
		toolbar.disableAll();
	}
});

K('#select').bind('click', function(e) {
	if (toolbar) {
		toolbar.select('bold');
	}
});

K('#unselect').bind('click', function(e) {
	if (toolbar) {
		toolbar.unselect('bold');
	}
});
