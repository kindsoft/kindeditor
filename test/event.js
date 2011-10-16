module('event');

test('bind/unbind/fire', function() {
	var result = '';
	function click1(e) {
		result += 'click1';
	}
	//bind
	K(document).click(click1);
	result = '';
	K(document).click();
	equals(result, 'click1');
	//unbind
	K(document).unbind('click', click1);
	result = '';
	K(document).click();
	equals(result, '');
	function click2(e) {
		K(this).html('click2');
	}
	K('#test-data-01').click(click2);
	K('#test-data-01').click();
	equals(K('#test-data-01').html(), 'click2');
});

test('unbind(el, type, fn)', function() {
	var result = '';
	function click1(e) {
		result += 'click1';
	}
	function click2(e) {
		result += 'click2';
	}
	function mousedown1(e) {
		result += 'mousedown1';
	}
	K(document).click(click1);
	K(document).click(click2);
	K(document).mousedown(mousedown1);
	result = '';
	K(document).click();
	equals(result, 'click1click2');
	result = '';
	K(document).mousedown();
	equals(result, 'mousedown1');
	K(document).unbind('click', click1);
	result = '';
	K(document).click();
	equals(result, 'click2');
	K(document).unbind('click', click2);
	result = '';
	K(document).click();
	equals(result, '');
	K(document).unbind('mousedown', mousedown1);
	result = '';
	K(document).mousedown();
	equals(result, '');
});

test('unbind(el, type)', function() {
	var result = '';
	function click1(e) {
		result += 'click1';
	}
	function click2(e) {
		result += 'click2';
	}
	function mousedown1(e) {
		result += 'mousedown1';
	}
	K(document).click(click1);
	K(document).click(click2);
	K(document).mousedown(mousedown1);
	//unbind click
	K(document).unbind('click');
	result = '';
	K(document).click();
	equals(result, '');
	//unbind mousedown
	K(document).unbind('mousedown');
	result = '';
	K(document).mousedown();
	equals(result, '');
});

test('unbind(el)', function() {
	var result = '';
	function click1(e) {
		result += 'click1';
		console.log('check');
	}
	function click2(e) {
		result += 'click2';
		console.log('check');
	}
	function mousedown1(e) {
		result += 'mousedown1';
		console.log('check');
	}
	K(document).click(click1);
	K(document).click(click2);
	K(document).mousedown(mousedown1);
	//unbind
	K(document).unbind();
	result = '';
	K(document).click();
	equals(result, '');
	result = '';
	K(document).mousedown();
	equals(result, '');
});

(function () {
	var outerEvent = K('#outerEvent'),
		innerEvent = K('#innerEvent'),
		eventMethod = K('#eventMethod'),
		outerDiv = K('#outerDiv'),
		innerDiv = K('#innerDiv');
	outerEvent.change(function(e) {
		outerDiv.unbind();
		if (outerEvent.val() === 'none') return;
		outerDiv.bind(outerEvent.val(), function(e) {
			console.log('outer: ' + outerEvent.val());
			if (eventMethod.val() === 'none') return;
			e[eventMethod.val()]();
		});
	});
	innerEvent.change(function(e) {
		innerDiv.unbind();
		if (innerEvent.val() === 'none') return;
		innerDiv.bind(innerEvent.val(), function(e) {
			console.log('inner: ' + innerEvent.val());
			if (eventMethod.val() === 'none') return;
			e[eventMethod.val()]();
		});
	});
})();

K.ready(function() {
	console.log('ready1');
});
K.ready(function() {
	console.log('ready2');
});
K.ready(function() {
	console.log('ready3');
});
K.ready(function() {
	console.log('ready4');
});
K.ready(function() {
	console.log('ready5');
});