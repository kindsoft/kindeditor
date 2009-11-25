module("KE.format");

test("URL format test", function() {
	equals(KE.format.getUrl(KE.$("test01").value, "absolute"), '/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test01").value, "relative"), './../images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test01").value, "domain", 'http://localhost', '/ke'), 'http://localhost/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test01").value), '../images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test02").value, "absolute"), '/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test02").value, "relative"), './../../images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test02").value, "domain", 'http://localhost:8080', '/ke/test'), 'http://localhost:8080/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test02").value), './../../images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test03").value, "absolute"), '/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test03").value, "relative"), './../images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test03").value, "domain", 'http://localhost', '/ke/test'), 'http://localhost/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test03").value), '/ke/images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test04").value, "absolute"), '/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test04").value, "relative", 'http://localhost', '/ke/images'), './xxx.gif');
	equals(KE.format.getUrl(KE.$("test04").value, "domain", 'http://localhost', '/ke'), 'http://localhost/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test04").value), 'http://localhost/ke/images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test05").value, "absolute"), 'http://www.163.com/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test05").value, "relative"), 'http://www.163.com/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test05").value, "domain", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test05").value), 'http://www.163.com/images/xxx.gif');
});

test("HTML format test", function() {
	equals(KE.format.getHtml(KE.$("test11").innerHTML), '<span style="color:#ff0000;"><strong>test</strong></span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:[".color"]}), '<span style="color:#ff0000;">test</span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:[".font-size", "class"]}), '<span>test</span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {div:[".font-size", "class"]}), 'test');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:["style"]}), '<span style="color:#ff0000;">test</span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:[]}), '<span>test</span>');

	equals(KE.format.getHtml(KE.$("test12").innerHTML), '123<div style="color:#ff0000;background-color:#00ff00;font-size:18px;font-weight:bold;" class="spanclass">test</div>\r\n123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {span:[".color"]}), '123test123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {div:[".font-size", "class"]}), '123<div style="font-size:18px;" class="spanclass">test</div>\r\n123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {div:[".color"]}), '123<div style="color:#ff0000;">test</div>\r\n123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {div:[".color", ".font-weight"]}), '123<div style="color:#ff0000;font-weight:bold;">test</div>\r\n123');

	equals(KE.format.getHtml(KE.$("test13").innerHTML), '<input type="checkbox" id="chk" value="1" checked="checked" /> <label for="chk"><strong>checkbox</strong></label>');
	equals(KE.format.getHtml(KE.$("test13").innerHTML, {input:["type", "value"]}), '<input type="checkbox" value="1" /> checkbox');
	equals(KE.format.getHtml(KE.$("test13").innerHTML, {input:["checked"],label:[]}), '<input checked="checked" /> <label>checkbox</label>');
	equals(KE.format.getHtml(KE.$("test13").innerHTML, {}), ' checkbox');

	equals(KE.format.getHtml(KE.$("test14").innerHTML, null, "relative"), '<img src="./../plugins/emoticons/etc_01.gif" /> test');

	equals(KE.format.getHtml(KE.$("test15").innerHTML, null, "absolute"), '<img src="http://www.kindsoft.net/images/logo_180_30.gif" /> test');
	equals(KE.format.getHtml(KE.$("test16").innerHTML), '<span style="font-family:times new roman;"><strong>test</strong></span>');
});
