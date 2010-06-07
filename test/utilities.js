module("KE.util");

test("addClass/removeClass test", function() {
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

