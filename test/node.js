module('node');

test('K(html)', function(){
	var node = K('<div class="abc" style="font-size:12px;"></div>abc<p></p>');
	equals(node.name, 'div');
	equals(node.length, 3);
	equals(node.attr('class'), 'abc');
	equals(node.css('font-size'), '12px');
	equals(K('@p > strong').get().nodeValue, 'p > strong');
	equals(K('@1 2 ').get().nodeValue, '1 2 ');
});

test('K(selector)', function(){
	var node = K('p > strong');
	equals(node.name, 'strong');
	equals(node.get(1).nodeName.toLowerCase(), 'strong');
	equals(node.get(2).nodeName.toLowerCase(), 'strong');
	equals(node.length, 3);
});

test('K(node)', function(){
	var node = K(document.createTextNode('abc'), document.createElement('div'));
	equals(node.name, '#text');
	equals(node.get(1).nodeName.toLowerCase(), 'div');
	equals(node.length, 2);
});

test('get', function() {
	var div = K('div');
	ok(div.get(0) === div[0]);
});

test('eq', function() {
	var div = K('div');
	ok(div.eq(0)[0] === div[0]);
});

test('attr/removeAttr', function() {
	equals(K('#test-data-01').attr('src', 'aaa').attr('src'), 'aaa');
	equals(K('#test-data-02').attr('src', 'aaa').removeAttr('src').attr('src'), '');
	equals(K('#test-data-01').attr('id'), 'test-data-01');
	equals(K('#test-data-01').attr('class'), 'test-class');
	equals(K('#test-data-01 p img').attr('src'), './data/logo_180_30.gif');
	equals(K('#test-data-03 p span').attr('style'), 'color:red;');
	equals(K('#test-data-01 p img').attr('border'), '0');
	equals(K('#test-data-01').attr('class'), 'test-class');
	equals(K('<div></div>').attr('class', 'aaa').attr('class'), 'aaa');
	equals(K('<div></div>').removeAttr('class').attr('class'), '');
	equals(K('<div style="color:red;"></div>').attr('style'), 'color:red;');
});

test("hasClass/addClass/removeClass", function() {
	var knode = K('<div></div>');
	var div = knode.get();
	knode.addClass('aaa');
	ok(knode.hasClass('aaa'));
	equals(div.className, 'aaa');
	knode.addClass('aaa');
	equals(div.className, 'aaa');
	knode.addClass('bbb');
	ok(knode.hasClass('bbb'));
	equals(div.className, 'aaa bbb');
	knode.addClass('ccc');
	ok(knode.hasClass('ccc'));
	equals(div.className, 'aaa bbb ccc');
	knode.removeClass('aaa');
	ok(!knode.hasClass('aaa'));
	equals(div.className, 'bbb ccc');
	knode.removeClass('bbb');
	ok(!knode.hasClass('bbb'));
	equals(div.className, 'ccc');
	knode.removeClass('ccc');
	ok(!knode.hasClass('ccc'));
	equals(div.className, '');
	equals(K('<div></div>').addClass('aaa').removeClass('aaa').addClass('bbb').get().className, 'bbb');
});

test("contains",function(){
	ok(K('#test-data-01 p').contains(K('#test-data-01 p')) === false);
	ok(K('#test-data-01').contains(K('#test-data-01 p')) === true);
	ok(K('#test-data-01 strong').contains(K('#test-data-01 strong').first()) === true);
	ok(K(document).contains(K('#test-data-01 strong')) === true);
	ok(K(document).contains(document) === false);
	ok(K(document).contains(document.body));
	ok(K('#test-data-01 strong').first().contains(K('#test-data-01 strong')) === false);
});

test("val",function(){
	equals(K('<input value="aa" />').val(), "aa");
	equals(K('<div value="aa"></div>').val(), "aa");
	equals(K('<input value="aa" />').val("bb").val(), "bb");
	equals(K('<div value="aa"></div>').val("").val(), "");
	equals(K('<textarea></textarea>').val('abc').val(), 'abc');
});

test("css",function(){
	var node = K('<div></div>');
	equals(node.css('width','300px').css('width'), '300px');
	equals(node.css('border','1px solid #ccc').css('border'),node.css('border'));
	node = K('#test-data-01');
	equals(node.css('width'), '300px');
});

test("width/height",function(){
	equals(K('#test-data-01').width(), 300);
	ok(K('#test-data-01').height() > 110);
});

test("append",function(){
	var node = K('<div class="abcd"></div><p></p>').append('@abc');
	equals(node.html(), 'abc');
	equals(K(node[1]).html(), 'abc');
});

test("before",function(){
	var parent = K('<div><div class="abc"></div><p class="abc"></p></div>');
	K(document.body).append(parent);
	K('.abc', parent).before('<span>def</span>');
	var children = parent.children();
	equals(children.length, 4);
	equals(K(children[0]).name, 'span');
	equals(K(children[1]).name, 'div');
	equals(K(children[2]).name, 'span');
	equals(K(children[3]).name, 'p');
	parent.remove();
});

test("after",function(){
	var parent = K('<div><div class="abc"></div><p class="abc"></p></div>');
	K(document.body).append(parent);
	K('.abc', parent).after('<span>def</span>');
	var children = parent.children();
	equals(children.length, 4);
	equals(K(children[0]).name, 'div');
	equals(K(children[1]).name, 'span');
	equals(K(children[2]).name, 'p');
	equals(K(children[3]).name, 'span');
	parent.remove();
});

test("replaceWith",function(){
	var node = K('<div></div>').replaceWith('<p></p>');
	equals(node.length, 1);
	equals(node.name, 'p');
});

test("remove",function(){
	var node = K('<div></div><p>123</p>').addClass('abc').html('test');
	node.remove();
	equals(node.length, 0);
	// Test preserve child nodes. 
	var node = K('<div><p><span>123</span><span>456</span>789</p></div>');
	K('p', node).remove(true);
	equals(node.html(), '<span>123</span><span>456</span>789');
});

test("html",function(){
	var node = K('<div>xxx</div>');
	K(document.body).append(node);
	equals(node.html(), 'xxx');
	equals(node.html('bbb').html(), 'bbb');
	equals(K('<textarea></textarea>').html('abc').html(), 'abc');
	equals(node.html('<p><br></p>').html(), '<p><br /></p>');
	equals(node.html('<script></script>').html(), '<script></script>');
	node.remove();
});

test("outer",function(){
	var node = K('<div>xxx</div>');
	equals(node.outer(), '<div>xxx</div>');
	equals(node.addClass('aaa').outer(), '<div class="aaa">xxx</div>');
});

test("chidren",function(){
	var node = K('<div><span>abc</span>123</div>');
	equals(node.children().length, 2);
	equals(node.children().name, 'span');
	equals(K('<div></div>').children().length, 0);
});

test('show/hide',function(){
	var node = K('<div/>');
	equals(node.show().outer(), '<div></div>');
	equals(node.hide().outer(), '<div style="display:none;"></div>');
	equals(node.show().outer(), '<div></div>');

	node = K('<div style="display:inline;"/>');
	equals(node.show().outer(), '<div style="display:inline;"></div>');
	equals(node.hide().outer(), '<div style="display:none;"></div>');
	equals(node.show().outer(), '<div style="display:inline;"></div>');

	node = K('<div style="display:block;"/>');
	equals(node.show().outer(), '<div style="display:block;"></div>');
	equals(node.hide().outer(), '<div style="display:none;"></div>');
	equals(node.show().outer(), '<div style="display:block;"></div>');
});

test("data", function(){
	K(document).data('abc', '123');
	K('body').data('abc', '1234');
	K('body div').data('abc', '12345');

	equals(K(document).data('abc'), '123');
	equals(K('body').data('abc'), '1234');
	equals(K('body div').data('abc'), '12345');
});
