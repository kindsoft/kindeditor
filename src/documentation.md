{{include header}}

<title>KindEditor - WYSIWYG HTML editor</title>

## Installation

1. Download the latest version of the editor.

2. Extract the downloaded archive to a directory called kindeditor in the root of your website.

3. Insert the following code fragment into your page.

	```html
	<link href="/kindeditor/themes/default/default.css" rel="stylesheet" />
	<script charset="utf-8" src="/kindeditor/kindeditor-min.js"></script>
	<script charset="utf-8" src="/kindeditor/lang/en.js"></script>
	<script>
		KindEditor.ready(function(K) {
			window.editor = K.create('#editor_id', {
				langType : 'en'
			});
		});
	</script>
	<textarea id="editor_id" name="content" cols="100" rows="8"></textarea>
	```

4. Fetch HTML data.

	```javascript
	html = editor.html();
	```

5. Synchronize HTML data to the textarea
	```javascript
	editor.sync();

	html = document.getElementById('editor_id').value; // Native API
	html = K('#editor_id').val(); // KindEditor Node API
	html = $('#editor_id').val(); // jQuery API
	```

6. Set HTML data to KindEditor
	```javascript
	editor.html('HTML code');
	```

{{include footer}}