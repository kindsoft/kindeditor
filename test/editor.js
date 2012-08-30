module("editor");

KindEditor.ready(function (K) {

	var editor = K.create('#content1', {
		basePath : '../',
		filterMode : false,
		wellFormatMode : false
	});

	var editor2 = K.create('#content2', {
		basePath : '../',
		filterMode : false,
		wellFormatMode : false
	});

	test("K.instances", function() {
		ok(editor == K.instances[0]);
		ok(editor2 == K.instances[1]);
	});

	test("editor.html", function() {
		editor.html('<h3>abc</h3>');
		equals(editor.html(), '<h3>abc</h3>');
		editor.html('<div class="aaa bbb ccc">abc</div>');
		equals(editor.html(), '<div class="aaa bbb ccc">abc</div>');
		editor.html('');
		equals(editor.html(), '');
		editor.html('<div class="aaa bbb ccc">abc</div>');
		equals(editor.html(), '<div class="aaa bbb ccc">abc</div>');
		editor.html('<p>　abc</p>');
		equals(editor.html(), '<p>　abc</p>');
		editor.html('<noscript><img src="" /></noscript>');
		equals(editor.html(), '<noscript><img src="" /></noscript>');
		editor.html('<a href="test.php?id=1&name=test">test</a>');
		equals(editor.html(), '<a href="test.php?id=1&name=test">test</a>');
	});

	test("editor.text", function() {
		editor.html('<h3>abc</h3>');
		equals(editor.text(), 'abc');
		editor.html('<div class="aaa bbb ccc">abc</div>');
		equals(editor.text(), 'abc');
		editor.text('<p class="a"></p>');
		equals(editor.text(), '&lt;p class="a"&gt;&lt;/p&gt;');
		editor.text('');
		equals(editor.text(), '');
	});

	test("editor.insertHtml", function() {
		editor.html('<h3 id="test-h3">abc</h3>');
		var h3 = K('#test-h3', editor.edit.doc);
		editor.cmd.range.selectNodeContents(h3[0]);
		editor.cmd.select();
		editor.insertHtml('<a href="abc">abc</a>');
		equals(editor.html(), '<h3 id="test-h3"><a href="abc">abc</a></h3>');
		editor.html('');
	});

	test("editor.selectedHtml", function() {
		editor.html('<span id="test">abc</span>');
		var span = K('#test', editor.edit.doc);
		editor.cmd.range.setStart(span.first()[0], 0).setEnd(span.first()[0], 2);
		editor.cmd.select();
		equals(editor.selectedHtml().replace(/<.+?>/g, ''), 'ab');
		editor.html('');
	});

	test("editor.appendHtml", function() {
		editor.html('');
		editor.appendHtml('<h3>abc</h3>');
		equals(editor.html(), '<h3>abc</h3>');
		editor.appendHtml('<div class="aaa bbb ccc">abc</div>');
		equals(editor.html(), '<h3>abc</h3><div class="aaa bbb ccc">abc</div>');
		editor.html('');
		editor.appendHtml('<a href="abc">abc</a>');
		equals(editor.html(), '<a href="abc">abc</a>');
	});

	test("editor.isEmpty", function() {
		editor.html('<h3>abc</h3>');
		ok(editor.isEmpty() === false);
		editor.html('<h3></h3>');
		ok(editor.isEmpty() === true);
		editor.html('<img src="" />');
		ok(editor.isEmpty() === false);
		editor.html('');
	});

	test("editor.count", function() {
		editor.html('<h3>abc</h3>');
		ok(editor.count('html') === 12);
		ok(editor.count('text') === 3);
		editor.html('<h3></h3>');
		ok(editor.count('html') === 9);
		ok(editor.count('text') === 0);
		editor.html('<img src="" />');
		ok(editor.count('html') === 14);
		ok(editor.count('text') === 1);
		editor.html('');
	});

});
