module('selector');

test('query', function() {
	var div = K.query('#test-data-01');
	var strong = K.query('#test-data-01 strong');

	ok(K.query('p', div) === jQuery('p', div).get(0));
	ok(K.query('strong', strong) === null);
	ok(K.query('strong', div) === jQuery('strong', div).get(0));
	ok(K.query('img[border]', div) === jQuery('img[border]', div).get(0));
	ok(K.query('img[alt]', div) === null);
	ok(K.query('img[border="0"]', div) === jQuery('img[border="0"]', div).get(0));
	ok(K.query('img[border="1"]', div) === null);
	ok(typeof K.query('img[src="\\.\\/data\\/logo_180_30\\.gif"]') === 'object'); // note: jquery has a bug
	ok(K.query('.test-class') === jQuery('.test-class').get(0));
	ok(K.query('.test-class', document.body) === jQuery('.test-class').get(0));
	ok(K.query('[class="test-class"]') === jQuery('[class="test-class"]').get(0));
	ok(K.query('[id="test-data-01"]') === jQuery('[id="test-data-01"]').get(0));
	ok(K.query('img.test-class') === null);
	ok(K.query('img#test-data-01') === null);
	ok(K.query('div#escaped-id\\:\\.') === jQuery('div#escaped-id\\:\\.').get(0));
	ok(K.query('input[name="escaped-name\\:\\."]') === jQuery('input[name="escaped-name\\:\\."]').get(0));
	ok(K.query('input[name="escaped-name\\:\\."]', div) === jQuery('input[name="escaped-name\\:\\."]').get(0));
	ok(K.query('img[border="0"]', div) === jQuery('img[border="0"]', div).get(0));
	ok(K.query('img[border]', div) === jQuery('img[border]', div).get(0));
	ok(K.query('.test-class') === jQuery('.test-class').get(0));
	ok(K.query('img #test-data-01') === null);
	ok(K.query('body #test-data-01') === jQuery('body #test-data-01').get(0));

	ok(K.query('div#test-data-01 strong') === jQuery('div#test-data-01 strong').get(0));
	ok(K.query('div#test-data-01 p strong') === jQuery('div#test-data-01 p strong').get(0));
	ok(K.query('div#test-data-01 > p > strong') === jQuery('div#test-data-01 > p > strong').get(0));
	ok(K.query('div#test-data-01>p>strong') === jQuery('div#test-data-01>p>strong').get(0));
	ok(K.query('div#test-data-01 > p > img[border="0"]') === jQuery('div#test-data-01 > p > img[border="0"]').get(0));
	ok(K.query('div#test-data-01 > strong', document, false) === null);
});

test('queryAll', function() {
	var div = K.query('#test-data-01');
	var strong = K.query('#test-data-01 strong');

	ok(K.queryAll('*').length === jQuery('*').length);
	ok(K.queryAll('div').length === jQuery('div').length);
	ok(K.queryAll('.test-class').length === jQuery('.test-class').length);
	ok(K.queryAll('*', div).length === jQuery('*', div).length);
	ok(K.queryAll('[border]', div).length === jQuery('[border]', div).length);
	ok(K.queryAll('[border="0"]', div).length === jQuery('[border="0"]', div).length);
	ok(K.queryAll('[border="1"]', div).length === jQuery('[border="1"]', div).length);
	ok(K.queryAll('div', div).length === jQuery('div', div).length);
	ok(K.queryAll('p *', div).length === jQuery('p *', div).length);
	ok(K.queryAll('strong', div).length === jQuery('strong', div).length);
	ok(K.queryAll('strong', strong).length === jQuery('strong', strong).length);
	ok(K.queryAll('div p').length === jQuery('div p').length);
	ok(K.queryAll('div,.test-class').length === jQuery('div,test-class').length);
});
