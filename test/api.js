module("Editor API");

KE.init({
	id : 'content1',
	skinsPath : '../skins/',
	pluginsPath : '../plugins/'
});

KE.event.ready(function () {
	var id = 'content1';
	KE.create(id);
	test("KE.addClass/KE.removeClass test", function() {
		//element
		var div = KE.$("test01");
		KE.addClass(div, 'aaa');
		equals(div.className, 'aaa');
		KE.addClass(div, 'aaa');
		equals(div.className, 'aaa');
		KE.addClass(div, 'bbb');
		equals(div.className, 'aaa bbb');
		KE.addClass(div, 'ccc');
		equals(div.className, 'aaa bbb ccc');
		KE.removeClass(div, 'aaa');
		equals(div.className, 'bbb ccc');
		KE.removeClass(div, 'bbb');
		equals(div.className, 'ccc');
		KE.removeClass(div, 'ccc');
		equals(div.className, '');
		//tag string
		var tag = '<div>';
		tag = KE.addClass(tag, 'aaa');
		equals(tag, '<div class="aaa">');
		tag = KE.addClass(tag, 'bbb');
		equals(tag, '<div class="aaa bbb">');
		tag = KE.addClass(tag, 'ccc');
		equals(tag, '<div class="aaa bbb ccc">');
		// no implementation
		/*
		tag = KE.removeClass(tag, 'aaa');
		equals(tag, '<div class="bbb ccc">');
		tag = KE.removeClass(tag, 'bbb');
		equals(tag, '<div class="ccc">');
		tag = KE.removeClass(tag, 'ccc');
		equals(tag, '<div>');
		*/
	});

	test("KE.html test", function() {
		KE.html(id, '<h3>abc</h3>');
		equals(KE.html(id), '<h3>abc</h3>');
		KE.html(id, '<div class="aaa bbb ccc">abc</div>');
		equals(KE.html(id), '<div class="aaa bbb ccc">abc</div>');
		KE.html(id, '');
		equals(KE.html(id), '');
	});

	test("KE.text test", function() {
		KE.html(id, '<h3>abc</h3>');
		equals(KE.text(id), 'abc');
		KE.html(id, '<div class="aaa bbb ccc">abc</div>');
		equals(KE.text(id), 'abc');
		KE.text(id, '<p class="a"></p>');
		equals(KE.text(id), '&lt;p class="a"&gt;&lt;/p&gt;');
		KE.text(id, '');
		equals(KE.text(id), '');
	});

	test("KE.insertHtml test", function() {
		KE.html(id, '<h3 id="test-h3">abc</h3>');
		var doc = KE.g[id].iframeDoc;
		var h3 = KE.$('test-h3', doc);
		KE.util.focus(id);
		KE.util.setSelection(id);
		var keRange = KE.g[id].keRange;
		keRange.selectTextNode(h3);
		var keSel = KE.g[id].keSel;
		keSel.addRange(keRange);
		KE.insertHtml(id, '<b>abc</b>');
		equals(KE.html(id), '<h3 id="test-h3"><b>abc</b></h3>');
		KE.html(id, '');
	});

	test("KE.selectedHtml test", function() {
		KE.html(id, '<span id="test">abc</span>');
		var doc = KE.g[id].iframeDoc;
		var span = KE.$('test', doc);
		KE.util.focus(id);
		KE.util.setSelection(id);
		var keRange = KE.g[id].keRange;
		keRange.setStart(span.firstChild, 0);
		keRange.setEnd(span.firstChild, 2);
		var keSel = KE.g[id].keSel;
		keSel.addRange(keRange);
		equals(KE.selectedHtml(id), 'ab');
		KE.html(id, '');
	});

	test("KE.appendHtml test", function() {
		KE.appendHtml(id, '<h3>abc</h3>');
		equals(KE.html(id), '<h3>abc</h3>');
		KE.appendHtml(id, '<div class="aaa bbb ccc">abc</div>');
		equals(KE.html(id), '<h3>abc</h3>\n<div class="aaa bbb ccc">abc</div>');
		KE.html(id, '');
	});

	test("KE.isEmpty test", function() {
		KE.html(id, '<h3>abc</h3>');
		ok(KE.isEmpty(id) === false);
		KE.html(id, '<h3></h3>');
		ok(KE.isEmpty(id) === true);
		KE.html(id, '<img src="" />');
		ok(KE.isEmpty(id) === false);
		KE.html(id, '');
	});

	test("KE.count test", function() {
		KE.html(id, '<h3>abc</h3>');
		ok(KE.count(id, 'html') === 12);
		ok(KE.count(id, 'text') === 3);
		KE.html(id, '<h3></h3>');
		ok(KE.count(id, 'html') === 9);
		ok(KE.count(id, 'text') === 0);
		KE.html(id, '<img src="" />');
		ok(KE.count(id, 'html') === 14);
		ok(KE.count(id, 'text') === 1);
		KE.html(id, '');
	});

	test("KE.remove/KE.create test", function() {
		KE.html(id, '<h3>abc</h3>');
		KE.remove(id);
		KE.create(id);
		equals(KE.html(id), '<h3>abc</h3>');
		KE.html(id, '');
	});

	test("KE.cmd test", function() {
		KE.html(id, '<h3 id="test-h3">abc</h3>');
		equals(KE.html(id), '<h3 id="test-h3">abc</h3>');
		var doc = KE.g[id].iframeDoc;
		var h3 = KE.$('test-h3', doc);
		KE.util.focus(id);
		KE.util.setSelection(id);
		var keRange = KE.g[id].keRange;
		keRange.selectTextNode(h3);
		var keSel = KE.g[id].keSel;
		keSel.addRange(keRange);
		var cmd = new KE.cmd(id);
		cmd.wrap('span', [{'class' : 'aaa'}]);
		equals(KE.html(id), '<h3 id="test-h3"><span class="aaa">abc</span></h3>');
		cmd.wrap('span', [{'class' : 'bbb'}]);
		equals(KE.html(id), '<h3 id="test-h3"><span class="bbb">abc</span></h3>');
		cmd.remove({
			'span' : ['class']
		});
		equals(KE.html(id), '<h3 id="test-h3">abc</h3>');
		cmd.wrap('span', [{'.color' : '#000000'}]);
		cmd.wrap('span', [{'.background-color' : '#FF0000'}]);
		cmd.remove({
			'span' : ['.background-color']
		});
		equals(KE.html(id), '<h3 id="test-h3"><span style="color:#000000;">abc</span></h3>');
		cmd.remove({
			'span' : ['.color']
		});
		equals(KE.html(id), '<h3 id="test-h3">abc</h3>');
		cmd.wrap('small');
		equals(KE.html(id), '<h3 id="test-h3"><small>abc</small></h3>');
		cmd.wrap('span');
		equals(KE.html(id), '<h3 id="test-h3"><small><span>abc</span></small></h3>');
		KE.html(id, '');
	});
});

