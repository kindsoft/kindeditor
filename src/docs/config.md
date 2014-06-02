# KindEditor - WYSIWYG HTML editor

### Configuration

#### width
Default width of the editor.

* Data type: String
* Default value: the width of the textarea

Example:

```js
K.create('#id', {
	width : '700px'
});
```

#### height
Default height of the editor.

* Data type: String
* Default value: the height of the textarea

Example:

```js
K.create('#id', {
	height : '300px'
});
```

#### minWidth
Default minimal width of the editor.

* Data type: Int
* Default value: 650

#### minHeight
Default minimal height of the editor.

* Data type: Int
* Default value: 100

#### items
Default toolbar of editor.

* Data type: Array
* Default value:

Example:

```js
[
	'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
	'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
	'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
	'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
	'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
	'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
	'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
	'anchor', 'link', 'unlink', '|', 'about'
]
```

#### noDisableItems
Enabled toolbar icons when the value of :ref:`designMode` is false.

* Data type: Array
* Default value: ['source', 'fullscreen']

#### filterMode
If strips HTML tags by :ref:`htmlTags` rules.

* Data type: Boolean
* Default value: true

#### htmlTags
Default whitelist tags when filterMode is true.

* Data type: Object
* Default value:

```js
{
	font : ['color', 'size', 'face', '.background-color'],
	span : [
		'.color', '.background-color', '.font-size', '.font-family', '.background',
		'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
	],
	div : [
		'align', '.border', '.margin', '.padding', '.text-align', '.color',
		'.background-color', '.font-size', '.font-family', '.font-weight', '.background',
		'.font-style', '.text-decoration', '.vertical-align', '.margin-left'
	],
	table: [
		'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
		'.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
		'.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
		'.width', '.height', '.border-collapse'
	],
	'td,th': [
		'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
		'.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
		'.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
	],
	a : ['href', 'target', 'name'],
	embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
	img : ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
	'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
		'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
		'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
	],
	pre : ['class'],
	hr : ['class', '.page-break-after'],
	'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : []
}
```

#### wellFormatMode
If Reindent the code of HTML.

* Data type: Boolean
* Default value: true

#### resizeType
Default resize type. 2: resize width and height, 1: only resize height, 0: no resize.

* Data type: Int
* Default value: 2

#### themeType
Default theme, can sets "default"、"simple".

* Data type: String
* Default value: "default"

Example:

```html
<link rel="stylesheet" href="../themes/default/default.css" />
<link rel="stylesheet" href="../themes/simple/simple.css" />
<script charset="utf-8" src="../kindeditor.js"></script>
<script charset="utf-8" src="../lang/en.js"></script>
<script>
	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('#editor_id', {
			themeType : 'simple'
		});
	});
</script>
```

#### langType
Default language, can sets "en"、"zh_CN".

* Data type: String
* Default value: "en"

Example:

```html
<link rel="stylesheet" href="../themes/default/default.css" />
<script charset="utf-8" src="../kindeditor.js"></script>
<script charset="utf-8" src="../lang/en.js"></script>
<script>
	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('#editor_id', {
			langType : 'en'
		});
	});
</script>
```

#### designMode
If wyswyg mode.

* Data type: Boolean
* Default value: true

#### fullscreenMode
If the editor changes to fullscreen after loaded.

* Data type: Boolean
* Default value: false

#### basePath
Root path of editor.

* Data type: String
* Default value: the dirname of the URL of kindeditor.js

#### themesPath
Default themes path.

* Data type: String
* Default value: basePath + 'themes/'

#### pluginsPath
Default plugins path.

* Data type: String
* Default value: basePath + 'plugins/'

#### langPath
Default language path.

* Data type: String
* Default value: basePath + 'lang/'
