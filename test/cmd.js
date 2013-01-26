module('cmd');

test('cmd.wrap', function() {
	var p = K.query('#test-data-01 p'),
		cloneP, div, strong, range, cmd;

	var div = K('<div></div>');
	document.body.appendChild(div.get());
	//1
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNode(strong);
	cmd = K.cmd(range);
	cmd.wrap('<span class="aaa"></span>');
	equals(range.html(), '<strong><span class="aaa">efg</span></strong>');
	document.body.removeChild(cloneP);
	//2
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNode(strong);
	cmd = K.cmd(range);
	cmd.wrap('<span style="color:red;"></span>');
	equals(range.html(), '<strong><span style="color:red;">efg</span></strong>');
	document.body.removeChild(cloneP);
	//3
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNodeContents(cloneP);
	cmd = K.cmd(range);
	cmd.wrap('<span style="color:red;"></span>');
	ok(K.queryAll('span[style]', cloneP).length === 7);
	equals(range.toString(), 'abcdefghijkxyz0123456789');
	document.body.removeChild(cloneP);
	//4
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNodeContents(cloneP);
	cmd = K.cmd(range);
	cmd.wrap('<span class="aaa"></span>');
	ok(K.queryAll('span[class="aaa"]', cloneP).length === 7);
	equals(range.toString(), 'abcdefghijkxyz0123456789');
	document.body.removeChild(cloneP);
	//5
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.wrap('<span class="aaa"></span>');
	equals(range.html(), '<span class="aaa">f</span>');
	document.body.removeChild(cloneP);
	//6
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 3);
	cmd = K.cmd(range);
	cmd.wrap('<span class="aaa"></span>');
	equals(range.html(), '<strong><span class="aaa">fg</span></strong>');
	document.body.removeChild(cloneP);
	//7
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	equals(range.html(), '<strong>f</strong>');
	document.body.removeChild(cloneP);
	//8
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(cloneP, 1);
	range.setEnd(strong.firstChild, 3);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	equals(range.html(), '<strong>efg</strong>');
	document.body.removeChild(cloneP);
	//9
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNodeContents(strong);
	range.collapse(true);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	equals(strong.innerHTML.toLowerCase(), '<strong></strong>efg');
	document.body.removeChild(cloneP);
	//10
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNodeContents(cloneP);
	cmd = K.cmd(range);
	cmd.wrap('<div></div>');
	equals(K(cloneP).first().name, 'div');
	same(K(cloneP).children().length, 1);
	document.body.removeChild(cloneP);
	//11
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 3);
	range.setEnd(strong.nextSibling, 3);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	equals(cmd.range.html(), '<strong>hij</strong>');
	document.body.removeChild(cloneP);
	//12
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNode(strong);
	cmd = K.cmd(range);
	cmd.wrap('<div><p></p></div>');
	equals(range.html().replace(/\s/g, ''), '<div><p><strong>efg</strong></p></div>');
	document.body.removeChild(cloneP);
	//13
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.wrap('<span class="aaa"><strong></strong></span>');
	equals(range.html(), '<span class="aaa"><strong>f</strong></span>');
	document.body.removeChild(cloneP);
	//14
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.wrap('<span class="aaa"><strong><em></em></strong></span>');
	equals(range.html(), '<span class="aaa"><strong><em>f</em></strong></span>');
	document.body.removeChild(cloneP);
	//15
	cloneP = K('<p>abc</p>').get();
	document.body.appendChild(cloneP);
	range = K.range(document);
	range.selectNodeContents(cloneP);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	cmd.wrap('<em></em>');
	equals(range.html(), '<strong><em>abc</em></strong>');
	document.body.removeChild(cloneP);
	//16
	div.html('<p>123</p><p>456</p>');
	range = K.range(document);
	range.setStart(div.first().first()[0], 0);
	range.setEnd(div.last().last()[0], 3);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	equals(div.html().replace(/\n/, ''), '<p><strong>123</strong></p><p><strong>456</strong></p>');
	div.html('');
	//17
	div.html('123<strong>4</strong>56');
	range = K.range(document);
	range.setStart(div.first()[0], 2);
	range.setEnd(div.first()[0], 3);
	cmd = K.cmd(range);
	cmd.wrap('<strong></strong>');
	equals(range.html(), '<strong>3</strong>');
	div.html('');
});

test('cmd.remove', function() {
	var p = K.query('#test-data-01 p'),
		cloneP, strong, range, cmd;

	var div = K('<div></div>');
	document.body.appendChild(div[0]);
	//1
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNode(strong);
	cmd = K.cmd(range);
	cmd.remove({
		strong : '*'
	});
	equals(cmd.range.html(), 'efg');
	document.body.removeChild(cloneP);
	//2
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNode(strong);
	cmd = K.cmd(range);
	cmd.remove({
		'*' : '*'
	});
	equals(cmd.range.html(), 'efg');
	document.body.removeChild(cloneP);
	//3
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNode(strong);
	cmd = K.cmd(range);
	cmd.remove({
		'span' : '*'
	});
	equals(cmd.range.html(), '<strong>efg</strong>');
	document.body.removeChild(cloneP);
	//4
	div.html('<strong>efg</strong>');
	range = K.range(document);
	range.setStart(div.first().first()[0], 1);
	range.setEnd(div.first().first()[0], 2);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	equals(div.html(), '<strong>e</strong>f<strong>g</strong>');
	equals(cmd.range.toString(), 'f');
	div.html('');
	//5
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 0);
	range.setEnd(strong.firstChild, 3);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	equals(cmd.range.toString(), 'efg');
	document.body.removeChild(cloneP);
	//6
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	K(strong).addClass('abc').css('color', '#FF0000');
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : 'class'
	});
	equals(range.html().toLowerCase(), '<strong style="color:#ff0000;">f</strong>');
	document.body.removeChild(cloneP);
	//7
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	K(strong).addClass('abc').css('color', '#FF0000');
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : 'class,style'
	});
	equals(cmd.range.html().toLowerCase(), '<strong>f</strong>');
	document.body.removeChild(cloneP);
	//8
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	K(strong).addClass('abc').css('color', '#FF0000');
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : 'class,.color,.background-color'
	});
	equals(cmd.range.html().toLowerCase(), '<strong>f</strong>');
	document.body.removeChild(cloneP);
	//9
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(cloneP, 1);
	range.setEnd(strong.firstChild, 3);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	equals(range.html(), 'efg');
	document.body.removeChild(cloneP);
	//10
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	strong.innerHTML = '<strong>efg</strong>';
	range = K.range(document);
	range.setStart(strong.firstChild.firstChild, 1);
	range.setEnd(strong.firstChild.firstChild, 2);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	equals(range.html(), 'f');
	document.body.removeChild(cloneP);
	//11
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	strong.innerHTML = '<strong>efg</strong>';
	range = K.range(document);
	range.setStart(strong.firstChild.firstChild, 0);
	range.setEnd(strong.firstChild.firstChild, 3);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	equals(K(cloneP).html().substr(0, 11), 'abcdefghijk');
	document.body.removeChild(cloneP);
	//12
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 1);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	var str = 'abcd<strong>e</strong><strong>fg';
	equals(K(cloneP).html().substr(0, str.length), str);
	document.body.removeChild(cloneP);
	//13
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.setStart(strong.firstChild, 1);
	range.setEnd(strong.firstChild, 2);
	cmd = K.cmd(range);
	cmd.remove({
		'strong' : '*'
	});
	cmd.wrap('<strong></strong>');
	equals(range.html(), '<strong>f</strong>');
	document.body.removeChild(cloneP);
	//14
	cloneP = p.cloneNode(true);
	document.body.appendChild(cloneP);
	strong = K.query('strong', cloneP);
	range = K.range(document);
	range.selectNodeContents(strong);
	cmd = K.cmd(range);
	cmd.remove({
		strong : '*'
	});
	equals(range.html(), 'efg');
	document.body.removeChild(cloneP);
});

test('cmd.execute', function() {
	var div = K('<div></div>'), node, range;
	document.body.appendChild(div[0]);
	//1
	node = K('<strong>abcd</strong>').get();
	div.append(node);
	range = K.range(document);
	range.selectNode(node);
	cmd = K.cmd(range);
	cmd.bold();
	cmd.bold();
	equals(range.html(), '<strong>abcd</strong>');
	div.html('');
	//2
	div.html('abcd');
	range = K.range(document);
	range.setStart(div.first().get(), 0);
	range.setEnd(div.first().get(), 4);
	cmd = K.cmd(range);
	cmd.bold();
	cmd.italic();
	equals(range.html(), '<strong><em>abcd</em></strong>');
	div.html('');
	//3
	div.html('abcd');
	range = K.range(document);
	range.setStart(div.first().get(), 0);
	range.setEnd(div.first().get(), 4);
	cmd = K.cmd(range);
	cmd.bold();
	cmd.italic();
	cmd.bold();
	equals(range.html(), '<em>abcd</em>');
	div.html('');
	//4
	div.html('<strong>abc</strong><strong>def</strong><strong>ghi</strong>');
	range = K.range(document);
	range.setStart(div.first().first().get(), 3);
	range.setEnd(div.first().next().first().get(), 3);
	cmd = K.cmd(range);
	cmd.bold();
	equals(range.html(), 'def');
	div.html('');
	//5
	div.html('<div>abcd<img /><strong>efg</strong><br />hijk</div>');
	range = K.range(document);
	range.selectNodeContents(div[0]);
	cmd = K.cmd(range);
	cmd.removeformat();
	equals(range.html(), '<div>abcd<img />efg<br />hijk</div>');
	div.html('');
	//6
	div.html('<p>abcd</p><p>1234</p>');
	range = K.range(document);
	range.selectNodeContents(div[0]);
	cmd = K.cmd(range);
	cmd.bold();
	equals(range.html().replace(/\n/, ''), '<p><strong>abcd</strong></p><p><strong>1234</strong></p>');
	cmd.removeformat();
	equals(range.html().replace(/\n/, ''), '<p>abcd</p><p>1234</p>');
	div.html('');
	//7
	div.html('<p><strong>abcd</strong></p><p><strong>1234</strong></p>');
	range = K.range(document);
	range.setStart(div.first().first().last()[0], 0);
	range.setEnd(div.last().last().last()[0], 4);
	cmd = K.cmd(range);
	cmd.removeformat();
	equals(range.html().replace(/\n/, ''), '<p>abcd</p><p>1234</p>');
	div.html('');
	//8
	div.html('<p><strong>abcd</strong></p><p><strong>1234</strong></p>');
	range = K.range(document);
	range.setStart(div.first().first().first()[0], 0);
	range.setEnd(div.last().last().last()[0], 4);
	cmd = K.cmd(range);
	cmd.italic();
	equals(range.html().replace(/\n/, ''), '<p><strong><em>abcd</em></strong></p><p><strong><em>1234</em></strong></p>');
	div.html('');
	//9
	div.html('<p><strong>abcd</strong></p><p><strong>1234</strong></p>');
	range = K.range(document);
	range.setStart(div.first().first()[0], 0);
	range.setEnd(div.last().last()[0], 1);
	cmd = K.cmd(range);
	cmd.italic();
	equals(range.html().replace(/\n/, ''), '<p><strong><em>abcd</em></strong></p><p><strong><em>1234</em></strong></p>');
	div.html('');
	//10
	div.html('<table><tr><td>1</td></tr></table><img>0123456789');
	range = K.range(document);
	range.setStart(div.last()[0], 4);
	range.setEnd(div.last()[0], 6);
	cmd = K.cmd(range);
	cmd.bold();
	cmd.bold();
	cmd.bold();
	equals(range.html().replace(/\n/, ''), '<strong>45</strong>');
	div.html('');
	//11
	div.html('<table><tr><td>1</td></tr></table><img>0123<strong>45</strong>6789');
	range = K.range(document);
	range.setStart(div.last().prev().prev()[0], 4);
	range.setEnd(div.last()[0], 0);
	cmd = K.cmd(range);
	cmd.bold();
	equals(range.html().replace(/\n/, ''), '45');
	div.html('');
	//12
	div.html('<p><strong><em>123456789</em></strong></p>');
	range = K.range(document);
	range.setStart(div.first().first().first()[0], 0);
	range.setEnd(div.first().first().first().first()[0], 9);
	cmd = K.cmd(range);
	cmd.underline();
	equals(div.html().replace(/\n/, ''), '<p><strong><em><u>123456789</u></em></strong></p>');
	div.html('');
	//13
	div.html('<p><strong><em>123456789</em></strong></p>');
	range = K.range(document);
	range.setStart(div.first().first().first()[0], 0);
	range.setEnd(div.first().first().first().first()[0], 9);
	cmd = K.cmd(range);
	cmd.bold();
	equals(div.html().replace(/\n/, ''), '<p><em>123456789</em></p>');
	div.html('');
	//14
	div.html('<p style="background-color:#000000;">1234</p>');
	range = K.range(document);
	range.setStart(div.first().first()[0], 0);
	range.setEnd(div.first().first()[0], 4);
	cmd = K.cmd(range);
	cmd.removeformat();
	equals(div.html().replace(/\n/, ''), '<p>1234</p>');
	div.html('');
	//15
	div.html('<span style="color:#e56600;">abc</span><span><span style="color:#e56600;">d</span><span style="color:#e56600;">efg</span></span>');
	range = K.range(document);
	range.setStart(div[0], 0);
	range.setEnd(div[0], 2);
	cmd = K.cmd(range);
	cmd.removeformat();
	same(range.html(), 'abcdefg');
	div.html('');
	//14
	div.html('\n<span></span><span><span style="font-size:18px;">abcd</span><span style="font-size:18px;"></span><span style="font-size:18px;"></span></span>\n');
	range = K.range(document);
	range.setEnd(div[0], 0);
	range.setEnd(div.first().next()[0], 1);
	cmd = K.cmd(range);
	cmd.removeformat();
	same(range.html(), 'abcd');
	div.html('');
	//15
	div.html('<img src="/kindeditor/plugins/emoticons/images/0.gif" /><strong>abc</strong>');
	range = K.range(document);
	range.selectNodeContents(div.last()[0]);
	cmd = K.cmd(range);
	cmd.bold();
	equals(div.html(), '<img src="/kindeditor/plugins/emoticons/images/0.gif" />abc');
	div.html('');
});

test('cmd.inserthtml', function() {
	//1
	var div = K('<div>1234</div>');
	K(document.body).append(div);
	range = K.range(document);
	range.setStart(div.first()[0], 1);
	range.setEnd(div.first()[0], 1);
	cmd = K.cmd(range);
	cmd.inserthtml('<strong>abcd</strong>');
	equals(div.html().replace(/\n/, ''), '1<strong>abcd</strong>234');
	div.remove();
});

test('cmd.insertimage', function() {
	//1
	var div = K('<div><p align="center">123</p><p align="center"><img style="margin-right:10px;" height="100" width="100" /></p><p align="center">123</p></div>');
	K(document.body).append(div);
	range = K.range(document);
	var img = K('img', div);
	range.selectNode(img[0]);
	cmd = K.cmd(range);
	var url = 'http://www.kindsoft.net/images/logo.png';
	cmd.insertimage(url);
	equals(K('img', div).attr('src'), url);
	div.remove();
});
