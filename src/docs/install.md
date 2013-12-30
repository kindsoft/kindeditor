# KindEditor - WYSIWYG HTML editor

### Installation

1. Download the latest version of the editor.

2. Extract the downloaded archive to a directory called kindeditor in the root of your website.

3. Insert the following code fragment into your page.

	```html
	<!-- Place inside the <head> of your HTML -->
	<link href="/kindeditor/themes/default/default.css" rel="stylesheet" />
	<script src="/kindeditor/kindeditor-all-min.js"></script>
	<script>
		KindEditor.ready(function(K) {
			window.editor = K.create('#editor_id');
		});
	</script>

	<!-- Place this in the body of the page content -->
	<textarea id="editor_id" name="content" cols="100" rows="8"></textarea>
	```
