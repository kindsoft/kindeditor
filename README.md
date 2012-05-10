
KindEditor
=================================================

KindEditor is a lightweight, Open Source(LGPL), cross browser, web based WYSIWYG HTML editor, easy to integrate with all of server side language such as Java, .NET, PHP, ASP, Python, Perl and Ruby.

## Features

* Lightweight: Only 28KB after gziped.
* Cross browser: Supports IE6-IE9, Firefox, Chrome, Safari and Opera.
* Customizable: Easy to change themes and plugins.

## Examples

http://www.kindsoft.net/ke4/examples/multi-language.html

## Getting started

	<link href="/path/to/themes/default/default.css" rel="stylesheet" />
	<script charset="utf-8" src="/path/to/kindeditor-min.js"></script>
	<script charset="utf-8" src="/path/to/lang/en.js"></script>
	<script>
		KindEditor.ready(function(K) {
			window.editor = K.create('#editor_id', {
				langType : 'en'
			});
		});
	</script>
	<textarea id="editor_id" name="content" cols="100" rows="8"></textarea>

For more information, please visit http://kindsoft.net/docs/ (Chinese)

## Compatible

* Internet Explorer 6.0+
* Mozilla Firefox 3+
* Chrome 3+
* Safari 4+
* Opera 10+

## Contributors

* Timon Lin
* daif alotaibi (http://daif.net/) : Arabic Translation
* fisker (https://github.com/fisker) : QQ style theme
