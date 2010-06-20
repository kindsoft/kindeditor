module("Format");

test("URL format test", function() {
	equals(KE.format.getUrl(KE.$("test01").value, "absolute", 'http://localhost', '/ke/test'), '/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test01").value, "relative", 'http://localhost', '/ke/test'), '../images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test01").value, "domain", 'http://localhost', '/ke/test'), 'http://localhost/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test01").value), '../images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test02").value, "absolute", 'http://localhost:8080', '/ke/test'), '/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test02").value, "relative", 'http://localhost:8080', '/ke/test'), '../../images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test02").value, "domain", 'http://localhost:8080', '/ke/test'), 'http://localhost:8080/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test02").value), './../../images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test03").value, "absolute", 'http://localhost', '/ke/test'), '/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test03").value, "relative", 'http://localhost', '/ke/test'), '../images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test03").value, "domain", 'http://localhost', '/ke/test'), 'http://localhost/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test03").value), '/ke/images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test04").value, "absolute", 'http://localhost', '/ke/test'), '/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test04").value, "relative", 'http://localhost', '/ke/images'), 'xxx.gif');
	equals(KE.format.getUrl(KE.$("test04").value, "domain", 'http://localhost', '/ke'), 'http://localhost/ke/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test04").value), 'http://localhost/ke/images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test05").value, "absolute", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test05").value, "relative", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test05").value, "domain", 'http://localhost', '/ke'), 'http://www.163.com/images/xxx.gif');
	equals(KE.format.getUrl(KE.$("test05").value), 'http://www.163.com/images/xxx.gif');

	equals(KE.format.getUrl(KE.$("test06").value, "absolute", 'http://kindsoft.net', '/'), '/kindeditor/plugins/emoticons/etc_01.gif');
	equals(KE.format.getUrl(KE.$("test06").value, "relative", 'http://kindsoft.net', '/'), 'kindeditor/plugins/emoticons/etc_01.gif');
	equals(KE.format.getUrl(KE.$("test06").value, "domain", 'http://kindsoft.net', '/'), 'http://kindsoft.net/kindeditor/plugins/emoticons/etc_01.gif');
	equals(KE.format.getUrl(KE.$("test06").value), 'http://kindsoft.net/kindeditor/plugins/emoticons/etc_01.gif');

	equals(KE.format.getUrl(KE.$("test07").value, "absolute", 'http://kindsoft.net', '/'), 'mailto:test@test.com');
	equals(KE.format.getUrl(KE.$("test07").value, "relative", 'http://kindsoft.net', '/'), 'mailto:test@test.com');
	equals(KE.format.getUrl(KE.$("test07").value, "domain", 'http://kindsoft.net', '/'), 'mailto:test@test.com');
	equals(KE.format.getUrl(KE.$("test07").value), 'mailto:test@test.com');

});

test("HTML format test", function() {
	equals(KE.format.getHtml(KE.$("test11").innerHTML).toLowerCase(), '<span style="color:#ff0000;"><strong>test</strong></span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:[".color"]}).toLowerCase(), '<span style="color:#ff0000;">test</span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:[".font-size", "class"]}), '<span>test</span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {div:[".font-size", "class"]}), 'test');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:["style"]}).toLowerCase(), '<span style="color:#ff0000;">test</span>');
	equals(KE.format.getHtml(KE.$("test11").innerHTML, {span:[]}), '<span>test</span>');

	equals(KE.format.getHtml(KE.$("test12").innerHTML).toLowerCase(), '123<div style="color:#ff0000;background-color:#00ff00;font-size:18px;font-weight:bold;" class="spanclass">test</div>\n123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {span:[".color"]}), '123test123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {div:[".font-size", "class"]}), '123<div style="font-size:18px;" class="spanclass">test</div>\n123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {div:[".color"]}).toLowerCase(), '123<div style="color:#ff0000;">test</div>\n123');
	equals(KE.format.getHtml(KE.$("test12").innerHTML, {div:[".color", ".font-weight"]}).toLowerCase(), '123<div style="color:#ff0000;font-weight:bold;">test</div>\n123');

	equals(KE.format.getHtml(KE.$("test13").innerHTML), '<input type="checkbox" id="chk" value="1" checked="checked" /> <label for="chk"><strong>checkbox</strong></label>');
	equals(KE.format.getHtml(KE.$("test13").innerHTML, {input:["type", "value"]}), '<input type="checkbox" value="1" /> checkbox');
	equals(KE.format.getHtml(KE.$("test13").innerHTML, {input:["checked"],label:[]}), '<input checked="checked" /> <label>checkbox</label>');
	equals(KE.format.getHtml(KE.$("test13").innerHTML, {}), 'checkbox');

	equals(KE.format.getHtml(KE.$("test14").innerHTML, null, "relative"), '<img src="../plugins/emoticons/etc_01.gif" /> test');

	equals(KE.format.getHtml(KE.$("test16").innerHTML), '<span style="font-family:times new roman;"><strong>test</strong></span>');
	equals(KE.format.getHtml(KE.$("test17").innerHTML), '<svg:a>test</svg:a>');

	equals(KE.format.getHtml(KE.$("test18").innerHTML), '<span style="font-family:\'Arial Black\';">ddd</span>');
	equals(KE.format.getHtml(KE.$("test19").innerHTML), '<span style="font-size:xx-large;">ddd</span>');
	equals(KE.format.getHtml(KE.$("test20").innerHTML).toLowerCase(), '<span style="color:#ff0000;">ddd</span>');
	equals(KE.format.getHtml(KE.$("test21").innerHTML), '<span style="background-color:#d8d8d8;font-family:\'Arial Black\';color:#ff0000;font-size:xx-large;">ddd</span>');
});
