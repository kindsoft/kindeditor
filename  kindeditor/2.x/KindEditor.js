/**
* WYSIWYG HTML Editor for Internet
* 
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 2.5.5
*/
var KE_VERSION = "2.5.5";
var KE_EDITOR_TYPE = "full"; //full or simple
var KE_SAFE_MODE = false; // true or false
var KE_UPLOAD_MODE = true; // true or false
var KE_FONT_FAMILY = "Courier New";
var KE_WIDTH = "700px";
var KE_HEIGHT = "400px";
var KE_SITE_DOMAIN = "";
var KE_SKIN_PATH  = "./skins/default/";
var KE_ICON_PATH = "./icons/";
var KE_IMAGE_ATTACH_PATH = "./attached/";
var KE_IMAGE_UPLOAD_CGI = "./upload_cgi/upload.php";
var KE_CSS_PATH = "/editor/common.css";
var KE_MENU_BORDER_COLOR = '#AAAAAA';
var KE_MENU_BG_COLOR = '#EFEFEF';
var KE_MENU_TEXT_COLOR = '#222222';
var KE_MENU_SELECTED_COLOR = '#CCCCCC';
var KE_TOOLBAR_BORDER_COLOR = '#DDDDDD';
var KE_TOOLBAR_BG_COLOR = '#EFEFEF';
var KE_FORM_BORDER_COLOR = '#DDDDDD';
var KE_FORM_BG_COLOR = '#FFFFFF';
var KE_BUTTON_COLOR = '#AAAAAA';
var KE_LANG = {
	INPUT_URL		: "请输入正确的URL地址。",
	SELECT_IMAGE	: "请选择图片。",
	INVALID_IMAGE	: "只能选择GIF,JPG,PNG,BMP格式的图片，请重新选择。",
	INVALID_FLASH	: "只能选择SWF格式的文件，请重新选择。",
	INVALID_MEDIA	: "只能选择MP3,WAV,WMA,WMV,MID,AVI,MPG,ASF格式的文件，请重新选择。",
	INVALID_REAL	: "只能选择RM,RMVB格式的文件，请重新选择。",
	INVALID_WIDTH	: "宽度不是数字，请重新输入。",
	INVALID_HEIGHT	: "高度不是数字，请重新输入。",
	INVALID_BORDER	: "边框不是数字，请重新输入。",
	INVALID_HSPACE	: "横隔不是数字，请重新输入。",
	INVALID_VSPACE	: "竖隔不是数字，请重新输入。",
	INPUT_CONTENT	: "请输入内容",
	TITLE			: "描述",
	WIDTH			: "宽",
	HEIGHT			: "高",
	BORDER			: "边",
	ALIGN			: "对齐方式",
	HSPACE			: "横隔",
	VSPACE			: "竖隔",
	CONFIRM			: "确定",
	CANCEL			: "取消",
	PREVIEW			: "预览",
	LISTENING		: "试听",
	LOCAL			: "本地",
	REMOTE			: "远程",
	NEW_WINDOW		: "新窗口",
	CURRENT_WINDOW	: "当前窗口",
	TARGET			: "目标",
	ABOUT			: "访问技术支持网站",
	SUBJECT			: "标题"
}
var KE_FONT_NAME = Array(
	Array('SimSun', '宋体'), 
	Array('SimHei', '黑体'), 
	Array('FangSong_GB2312', '仿宋体'), 
	Array('KaiTi_GB2312', '楷体'), 
	Array('NSimSun', '新宋体'), 
	Array('Arial', 'Arial'), 
	Array('Arial Black', 'Arial Black'), 
	Array('Times New Roman', 'Times New Roman'), 
	Array('Courier New', 'Courier New'), 
	Array('Tahoma', 'Tahoma'), 
	Array('Verdana', 'Verdana'), 
	Array('GulimChe', 'GulimChe'), 
	Array('MS Gothic', 'MS Gothic') 
);
var KE_SPECIAL_CHARACTER = Array(
	'§','№','☆','★','○','●','◎','◇','◆','□','℃','‰','■','△','▲','※',
	'→','←','↑','↓','〓','¤','°','＃','＆','＠','＼','︿','＿','￣','―','α',
	'β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ',
	'σ','τ','υ','φ','χ','ψ','ω','≈','≡','≠','＝','≤','≥','＜','＞','≮',
	'≯','∷','±','＋','－','×','÷','／','∫','∮','∝','∞','∧','∨','∑','∏',
	'∪','∩','∈','∵','∴','⊥','∥','∠','⌒','⊙','≌','∽','〖','〗',
	'【','】','（','）','［','］'
);
var KE_TOP_TOOLBAR_ICON = Array(
	Array('KE_SOURCE', 'source.gif', '视图转换'),
	Array('KE_PREVIEW', 'preview.gif', '预览'),
	Array('KE_ZOOM', 'zoom.gif', '显示比例'),
	Array('KE_PRINT', 'print.gif', '打印'),
	Array('KE_UNDO', 'undo.gif', '回退'),
	Array('KE_REDO', 'redo.gif', '前进'),
	Array('KE_CUT', 'cut.gif', '剪切'),
	Array('KE_COPY', 'copy.gif', '复制'),
	Array('KE_PASTE', 'paste.gif', '粘贴'),
	Array('KE_SELECTALL', 'selectall.gif', '全选'),
	Array('KE_JUSTIFYLEFT', 'justifyleft.gif', '左对齐'),
	Array('KE_JUSTIFYCENTER', 'justifycenter.gif', '居中'),
	Array('KE_JUSTIFYRIGHT', 'justifyright.gif', '右对齐'),
	Array('KE_JUSTIFYFULL', 'justifyfull.gif', '两端对齐'),
	Array('KE_NUMBEREDLIST', 'numberedlist.gif', '编号'),
	Array('KE_UNORDERLIST', 'unorderedlist.gif', '项目符号'),
	Array('KE_INDENT', 'indent.gif', '减少缩进'),
	Array('KE_OUTDENT', 'outdent.gif', '增加缩进'),
	Array('KE_SUBSCRIPT', 'subscript.gif', '下标'),
	Array('KE_SUPERSCRIPT', 'superscript.gif', '上标'),
	Array('KE_DATE', 'date.gif', '日期'),
	Array('KE_TIME', 'time.gif', '时间')
);
var KE_BOTTOM_TOOLBAR_ICON = Array(
	Array('KE_TITLE', 'title.gif', '标题'),
	Array('KE_FONTNAME', 'font.gif', '字体'),
	Array('KE_FONTSIZE', 'fontsize.gif', '文字大小'),
	Array('KE_TEXTCOLOR', 'textcolor.gif', '文字颜色'),
	Array('KE_BGCOLOR', 'bgcolor.gif', '文字背景'),
	Array('KE_BOLD', 'bold.gif', '粗体'),
	Array('KE_ITALIC', 'italic.gif', '斜体'),
	Array('KE_UNDERLINE', 'underline.gif', '下划线'),
	Array('KE_STRIKE', 'strikethrough.gif', '删除线'),
	Array('KE_REMOVE', 'removeformat.gif', '删除格式'),
	Array('KE_IMAGE', 'image.gif', '图片'),
	Array('KE_FLASH', 'flash.gif', 'Flash'),
	Array('KE_MEDIA', 'media.gif', 'Windows Media Player'),
	Array('KE_REAL', 'real.gif', 'Real Player'),
	Array('KE_LAYER', 'layer.gif', '层'),
	Array('KE_TABLE', 'table.gif', '表格'),
	Array('KE_SPECIALCHAR', 'specialchar.gif', '特殊字符'),
	Array('KE_HR', 'hr.gif', '横线'),
	Array('KE_ICON', 'emoticons.gif', '笑脸'),
	Array('KE_LINK', 'link.gif', '创建超级连接'),
	Array('KE_UNLINK', 'unlink.gif', '删除超级连接'),
	Array('KE_ABOUT', 'about.gif', '关于')
);
var KE_SIMPLE_TOOLBAR_ICON = Array(
	Array('KE_FONTNAME', 'font.gif', '字体'),
	Array('KE_FONTSIZE', 'fontsize.gif', '文字大小'),
	Array('KE_TEXTCOLOR', 'textcolor.gif', '文字颜色'),
	Array('KE_BGCOLOR', 'bgcolor.gif', '文字背景'),
	Array('KE_BOLD', 'bold.gif', '粗体'),
	Array('KE_ITALIC', 'italic.gif', '斜体'),
	Array('KE_UNDERLINE', 'underline.gif', '下划线'),
	Array('KE_JUSTIFYLEFT', 'justifyleft.gif', '左对齐'),
	Array('KE_JUSTIFYCENTER', 'justifycenter.gif', '居中'),
	Array('KE_JUSTIFYRIGHT', 'justifyright.gif', '右对齐'),
	Array('KE_IMAGE', 'image.gif', '图片'),
	Array('KE_LAYER', 'layer.gif', '层'),
	Array('KE_HR', 'hr.gif', '横线'),
	Array('KE_ICON', 'emoticons.gif', '笑脸'),
	Array('KE_LINK', 'link.gif', '创建超级连接'),
	Array('KE_ABOUT', 'about.gif', '关于')
);
var KE_TITLE_TABLE = Array(
	Array('H1', KE_LANG['SUBJECT'] + ' 1'), 
	Array('H2', KE_LANG['SUBJECT'] + ' 2'), 
	Array('H3', KE_LANG['SUBJECT'] + ' 3'), 
	Array('H4', KE_LANG['SUBJECT'] + ' 4'), 
	Array('H5', KE_LANG['SUBJECT'] + ' 5'), 
	Array('H6', KE_LANG['SUBJECT'] + ' 6')
);
var KE_ZOOM_TABLE = Array('250%', '200%', '150%', '120%', '100%', '80%', '50%');
var KE_FONT_SIZE = Array(
	Array(1,'8pt'), 
	Array(2,'10pt'), 
	Array(3,'12pt'), 
	Array(4,'14pt'), 
	Array(5,'18pt'), 
	Array(6,'24pt'), 
	Array(7,'36pt')
);
var KE_POPUP_MENU_TABLE = Array(
	"KE_ZOOM", "KE_TITLE", "KE_FONTNAME", "KE_FONTSIZE", "KE_TEXTCOLOR", "KE_BGCOLOR", 
	"KE_LAYER", "KE_TABLE", "KE_HR", "KE_ICON", "KE_SPECIALCHAR", "KE_ABOUT", 
	"KE_IMAGE", "KE_FLASH", "KE_MEDIA", "KE_REAL", "KE_LINK"
);
var KE_COLOR_TABLE = Array(
	"#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#FFFFFF", "#F5F5F5", "#DCDCDC", "#FFFAFA",
	"#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969", "#000000", "#2F4F4F", "#708090", "#778899", "#4682B4",
	"#4169E1", "#6495ED", "#B0C4DE", "#7B68EE", "#6A5ACD", "#483D8B", "#191970", "#000080", "#00008B", "#0000CD",
	"#1E90FF", "#00BFFF", "#87CEFA", "#87CEEB", "#ADD8E6", "#B0E0E6", "#F0FFFF", "#E0FFFF", "#AFEEEE", "#00CED1",
	"#5F9EA0", "#48D1CC", "#00FFFF", "#40E0D0", "#20B2AA", "#008B8B", "#008080", "#7FFFD4", "#66CDAA", "#8FBC8F",
	"#3CB371", "#2E8B57", "#006400", "#008000", "#228B22", "#32CD32", "#00FF00", "#7FFF00", "#7CFC00", "#ADFF2F",
	"#98FB98", "#90EE90", "#00FF7F", "#00FA9A", "#556B2F", "#6B8E23", "#808000", "#BDB76B", "#B8860B", "#DAA520",
	"#FFD700", "#F0E68C", "#EEE8AA", "#FFEBCD", "#FFE4B5", "#F5DEB3", "#FFDEAD", "#DEB887", "#D2B48C", "#BC8F8F",
	"#A0522D", "#8B4513", "#D2691E", "#CD853F", "#F4A460", "#8B0000", "#800000", "#A52A2A", "#B22222", "#CD5C5C",
	"#F08080", "#FA8072", "#E9967A", "#FFA07A", "#FF7F50", "#FF6347", "#FF8C00", "#FFA500", "#FF4500", "#DC143C",
	"#FF0000", "#FF1493", "#FF00FF", "#FF69B4", "#FFB6C1", "#FFC0CB", "#DB7093", "#C71585", "#800080", "#8B008B",
	"#9370DB", "#8A2BE2", "#4B0082", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD", "#D8BFD8",
	"#E6E6FA", "#F8F8FF", "#F0F8FF", "#F5FFFA", "#F0FFF0", "#FAFAD2", "#FFFACD", "#FFF8DC", "#FFFFE0", "#FFFFF0",
	"#FFFAF0", "#FAF0E6", "#FDF5E6", "#FAEBD7", "#FFE4C4", "#FFDAB9", "#FFEFD5", "#FFF5EE", "#FFF0F5", "#FFE4E1"
);
var KE_IMAGE_ALIGN_TABLE = Array(
	"baseline", "top", "middle", "bottom", "texttop", "absmiddle", "absbottom", "left", "right"
);
var KE_OBJ_NAME;
var KE_SELECTION;
var KE_RANGE;
var KE_RANGE_TEXT;
var KE_EDITFORM_DOCUMENT;
var KE_IMAGE_DOCUMENT;
var KE_FLASH_DOCUMENT;
var KE_MEDIA_DOCUMENT;
var KE_REAL_DOCUMENT;
var KE_LINK_DOCUMENT;
var KE_BROWSER;
var KE_TOOLBAR_ICON;
function KindString(){
	this.arr = new Array();
	this.append = function(){
	   this.arr.push.apply(this.arr, arguments);
	}
	this.toString = function(){
	   return this.arr.join('');
	}
}
function KindGetBrowser()
{
	var browser = '';
	var agentInfo = navigator.userAgent.toLowerCase();
	if (agentInfo.indexOf("msie") > -1) {
		var re = new RegExp("msie\\s?([\\d\\.]+)","ig");
		var arr = re.exec(agentInfo);
		if (parseInt(RegExp.$1) >= 5.5) {
			browser = 'IE';
		}
	} else if (agentInfo.indexOf("firefox") > -1) {
		browser = 'FF';
	} else if (agentInfo.indexOf("netscape") > -1) {
		var temp1 = agentInfo.split(' ');
		var temp2 = temp1[temp1.length-1].split('/');
		if (parseInt(temp2[1]) >= 7) {
			browser = 'NS';
		}
	} else if (agentInfo.indexOf("gecko") > -1) {
		browser = 'ML';
	} else if (agentInfo.indexOf("opera") > -1) {
		var temp1 = agentInfo.split(' ');
		var temp2 = temp1[0].split('/');
		if (parseInt(temp2[1]) >= 9) {
			browser = 'OPERA';
		}
	}
	return browser;
}
function KindGetFileName(file, separator)
{
	var temp = file.split(separator);
	var len = temp.length;
	var fileName = temp[len-1];
	return fileName;
}
function KindGetFileExt(fileName)
{
	var temp = fileName.split(".");
	var len = temp.length;
	var fileExt = temp[len-1].toLowerCase();
	return fileExt;
}
function KindCheckImageFileType(file, separator)
{
	if (separator == "/" && file.match(/http:\/\/.{3,}/) == null) {
		alert(KE_LANG['INPUT_URL']);
		return false;
	}
	var fileName = KindGetFileName(file, separator);
	var fileExt = KindGetFileExt(fileName);
	if (fileExt != 'gif' && fileExt != 'jpg' && fileExt != 'png' && fileExt != 'bmp') {
		alert(KE_LANG['INVALID_IMAGE']);
		return false;
	}
	return true;
}
function KindCheckFlashFileType(file, separator)
{
	if (file.match(/http:\/\/.{3,}/) == null) {
		alert(KE_LANG['INPUT_URL']);
		return false;
	}
	var fileName = KindGetFileName(file, "/");
	var fileExt = KindGetFileExt(fileName);
	if (fileExt != 'swf') {
		alert(KE_LANG['INVALID_FLASH']);
		return false;
	}
	return true;
}
function KindCheckMediaFileType(cmd, file, separator)
{
	if (file.match(/http:\/\/.{3,}/) == null) {
		alert(KE_LANG['INPUT_URL']);
		return false;
	}
	var fileName = KindGetFileName(file, "/");
	var fileExt = KindGetFileExt(fileName);
	if (cmd == 'KE_REAL') {
		if (fileExt != 'rm' && fileExt != 'rmvb') {
			alert(KE_LANG['INVALID_REAL']);
			return false;
		}
	} else {
		if (fileExt != 'mp3' && fileExt != 'wav' && fileExt != 'wma' && fileExt != 'wmv' && fileExt != 'mid' && fileExt != 'avi' && fileExt != 'mpg' && fileExt != 'asf') {
			alert(KE_LANG['INVALID_MEDIA']);
			return false;
		}
	}
	return true;
}
function KindHtmlToXhtml(str) 
{
	str = str.replace(/<br.*?>/gi, "<br />");
	str = str.replace(/(<hr\s+[^>]*[^\/])(>)/gi, "$1 />");
	str = str.replace(/(<img\s+[^>]*[^\/])(>)/gi, "$1 />");
	str = str.replace(/(<\w+)(.*?>)/gi, function ($0,$1,$2) {
						return($1.toLowerCase() + KindConvertAttribute($2));
					}
				);
	str = str.replace(/(<\/\w+>)/gi, function ($0,$1) {
						return($1.toLowerCase());
					}
				);
	return str;
}
function KindConvertAttribute(str)
{
	if (KE_SAFE_MODE == true) {
		str = KindClearAttributeScriptTag(str);
	}
	return str;
}
function KindClearAttributeScriptTag(str)
{
	var re = new RegExp("(\\son[a-z]+=)[\"']?[^>]*?[^\\\\\>][\"']?([\\s>])","ig");
	str = str.replace(re, function ($0,$1,$2) {
						return($1.toLowerCase() + "\"\"" + $2);
					}
				);
	return str;
}
function KindClearScriptTag(str)
{
	if (KE_SAFE_MODE == false) {
		return str;
	}
	str = str.replace(/<(script.*?)>/gi, "[$1]");
	str = str.replace(/<\/script>/gi, "[/script]");
	return str;
}
function KindHtmlentities(str)
{
	str = str.replace(/&/g,'&amp;');
	str = str.replace(/</g,'&lt;');
	str = str.replace(/>/g,'&gt;');
	str = str.replace(/"/g,'&quot;');
	return str;
}
function KindGetTop(id)
{
	var top = 28;
	var tmp = '';
	var obj = document.getElementById(id);
	while (eval("obj" + tmp).tagName != "BODY") {
		tmp += ".offsetParent";
		top += eval("obj" + tmp).offsetTop;
	}
	return top;
}
function KindGetLeft(id)
{
	var left = 2;
	var tmp = '';
	var obj = document.getElementById(id);
	while (eval("obj" + tmp).tagName != "BODY") {
		tmp += ".offsetParent";
		left += eval("obj" + tmp).offsetLeft;
	}
	return left;
}
function KindDisplayMenu(cmd)
{
	KindEditorForm.focus();
	if (cmd != 'KE_ABOUT') {
		KindSelection();
	}
	KindDisableMenu();
	var top, left;
	top = KindGetTop(cmd);
	left = KindGetLeft(cmd);
	if (cmd == 'KE_ABOUT') {
		left -= 200;
	} else if (cmd == 'KE_LINK') {
		left -= 220;
	}
	var str = KindPopupMenu(cmd);
	document.getElementById('menuDiv').style.display = 'none';
	document.getElementById('menuDiv').innerHTML = str;
	document.getElementById('POPUP_'+cmd).style.top =  top.toString(10) + 'px';
	document.getElementById('POPUP_'+cmd).style.left = left.toString(10) + 'px';
	document.getElementById('POPUP_'+cmd).style.display = 'block';
	document.getElementById('menuDiv').style.display = 'block';
}
function KindDisableMenu()
{
	document.getElementById('menuDiv').innerHTML = '';
	document.getElementById('menuDiv').style.display = 'none';
}
function KindGetMenuCommonStyle()
{
	var ks = new KindString();
	ks.append('position:absolute;top:1px;left:1px;font-size:12px;color:');
	ks.append(KE_MENU_TEXT_COLOR, ';background-color:', KE_MENU_BG_COLOR);
	ks.append(';border:solid 1px ', KE_MENU_BORDER_COLOR, ';z-index:1;display:none;');
	return ks.toString();
}
function KindGetCommonMenu(cmd, content)
{
	var ks = new KindString();
	ks.append('<div id="POPUP_', cmd, '" style="', KindGetMenuCommonStyle(), '">');
	ks.append(content, '</div>');
	return ks.toString();
}
function KindCreateColorTable(cmd, eventStr)
{
	var ks = new KindString();
	ks.append('<table cellpadding="0" cellspacing="2" border="0">');
	for (i = 0; i < KE_COLOR_TABLE.length; i++) {
		if (i == 0 || (i >= 10 && i%10 == 0)) {
			ks.append('<tr>');
		}
		ks.append('<td style="width:12px;height:12px;border:1px solid #AAAAAA;font-size:1px;cursor:pointer;background-color:');
		ks.append(KE_COLOR_TABLE[i], ';" onmouseover="javascript:this.style.borderColor=\'#000000\';');
		ks.append(((eventStr) ? eventStr : ''), '" ');
		ks.append('onmouseout="javascript:this.style.borderColor=\'#AAAAAA\';" '); 
		ks.append('onclick="javascript:KindExecute(\'', cmd, '_END\', \'');
		ks.append(KE_COLOR_TABLE[i], '\');">&nbsp;</td>');
		if (i >= 9 && i%(i-1) == 0) {
			ks.append('</tr>');
		}
	}
	ks.append('</table>');
	return ks.toString();
}
function KindDrawColorTable(cmd)
{
	var ks = new KindString();
	ks.append('<div id="POPUP_', cmd, '" style="width:160px;padding:2px;');
	ks.append(KindGetMenuCommonStyle(), '">');
	ks.append(KindCreateColorTable(cmd));
	ks.append('</div>');
	return ks.toString();
}
function KindDrawMedia(cmd)
{
	var ks = new KindString();
	ks.append('<table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;">');
	ks.append('<tr><td colspan="2"><table border="0"><tr><td id="', cmd);
	ks.append('preview" style="width:240px;height:240px;border:1px solid #AAAAAA;');
	ks.append('background-color:#FFFFFF;" align="center" valign="middle">&nbsp;</td></tr></table></td></tr>');	
	ks.append('<tr><td style="width:40px;padding:5px;">', KE_LANG['REMOTE'], '</td>');
	ks.append('<td style="width:210px;padding-bottom:5px;"><input type="text" id="');
	ks.append(cmd, 'link" value="http://" style="width:190px;border:1px solid #555555;" /></td></tr>');
	ks.append('<tr><td colspan="2" style="margin:5px;padding-bottom:5px;" align="center">');
	ks.append('<input type="button" name="button" value="', KE_LANG['LISTENING']);
	ks.append('" onclick="javascript:parent.KindMediaPreview(\'', cmd);
	ks.append('\');" style="border:1px solid #555555;background-color:', KE_BUTTON_COLOR, ';" /> ');
	ks.append('<input type="submit" name="button" id="', cmd, 'submitButton" value="');
	ks.append(KE_LANG['CONFIRM'], '" onclick="javascript:parent.KindDrawMediaEnd(\'');
	ks.append(cmd, '\');" style="border:1px solid #555555;background-color:');
	ks.append(KE_BUTTON_COLOR, ';" /> ', '<input type="button" name="button" value="');
	ks.append(KE_LANG['CANCEL'], '" onclick="javascript:parent.KindDisableMenu();"');
	ks.append('style="border:1px solid #555555;background-color:', KE_BUTTON_COLOR, ';" /></td></tr></table>');
	return ks.toString();
}
function KindPopupMenu(cmd)
{
	switch (cmd)
	{
		case 'KE_ZOOM':
			var str = '';
			for (i = 0; i < KE_ZOOM_TABLE.length; i++) {
				str += '<div style="padding:2px;width:120px;cursor:pointer;" ' + 
				'onclick="javascript:KindExecute(\'KE_ZOOM_END\', \'' + KE_ZOOM_TABLE[i] + '\');" ' + 
				'onmouseover="javascript:this.style.backgroundColor=\''+KE_MENU_SELECTED_COLOR+'\';" ' +
				'onmouseout="javascript:this.style.backgroundColor=\''+KE_MENU_BG_COLOR+'\';">' + 
				KE_ZOOM_TABLE[i] + '</div>';
			}
			str = KindGetCommonMenu('KE_ZOOM', str);
			return str;
			break;
		case 'KE_TITLE':
			var str = '';
			for (i = 0; i < KE_TITLE_TABLE.length; i++) {
				str += '<div style="width:140px;cursor:pointer;" ' + 
				'onclick="javascript:KindExecute(\'KE_TITLE_END\', \'' + KE_TITLE_TABLE[i][0] + '\');" ' + 
				'onmouseover="javascript:this.style.backgroundColor=\''+KE_MENU_SELECTED_COLOR+'\';" ' +
				'onmouseout="javascript:this.style.backgroundColor=\''+KE_MENU_BG_COLOR+'\';"><' + KE_TITLE_TABLE[i][0] + ' style="margin:2px;">' + 
				KE_TITLE_TABLE[i][1] + '</' + KE_TITLE_TABLE[i][0] + '></div>';
			}
			str = KindGetCommonMenu('KE_TITLE', str);
			return str;
			break;
		case 'KE_FONTNAME':
			var str = '';
			for (i = 0; i < KE_FONT_NAME.length; i++) {
				str += '<div style="font-family:' + KE_FONT_NAME[i][0] + 
				';padding:2px;width:160px;cursor:pointer;" ' + 
				'onclick="javascript:KindExecute(\'KE_FONTNAME_END\', \'' + KE_FONT_NAME[i][0] + '\');" ' + 
				'onmouseover="javascript:this.style.backgroundColor=\''+KE_MENU_SELECTED_COLOR+'\';" ' +
				'onmouseout="javascript:this.style.backgroundColor=\''+KE_MENU_BG_COLOR+'\';">' + 
				KE_FONT_NAME[i][1] + '</div>';
			}
			str = KindGetCommonMenu('KE_FONTNAME', str);
			return str;
			break;
		case 'KE_FONTSIZE':
			var str = '';
			for (i = 0; i < KE_FONT_SIZE.length; i++) {
				str += '<div style="font-size:' + KE_FONT_SIZE[i][1] + 
				';padding:2px;width:120px;cursor:pointer;" ' + 
				'onclick="javascript:KindExecute(\'KE_FONTSIZE_END\', \'' + KE_FONT_SIZE[i][0] + '\');" ' + 
				'onmouseover="javascript:this.style.backgroundColor=\''+KE_MENU_SELECTED_COLOR+'\';" ' +
				'onmouseout="javascript:this.style.backgroundColor=\''+KE_MENU_BG_COLOR+'\';">' + 
				KE_FONT_SIZE[i][1] + '</div>';
			}
			str = KindGetCommonMenu('KE_FONTSIZE', str);
			return str;
			break;
		case 'KE_TEXTCOLOR':
			var str = '';
			str = KindDrawColorTable('KE_TEXTCOLOR');
			return str;
			break;
		case 'KE_BGCOLOR':
			var str = '';
			str = KindDrawColorTable('KE_BGCOLOR');
			return str;
			break;
		case 'KE_HR':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:160px;'+KindGetMenuCommonStyle()+'">';
			str += '<div id="hrPreview" style="margin:10px 2px 10px 2px;height:1px;border:0;font-size:0;background-color:#FFFFFF;"></div>';
			str += KindCreateColorTable(cmd, 'document.getElementById(\'hrPreview\').style.backgroundColor = this.style.backgroundColor;');
			str += '</div>';
			return str;
			break;
		case 'KE_LAYER':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:160px;'+KindGetMenuCommonStyle()+'">';
			str += '<div id="divPreview" style="margin:5px 2px 5px 2px;height:20px;border:1px solid #AAAAAA;font-size:1px;background-color:#FFFFFF;"></div>';
			str += KindCreateColorTable(cmd, 'document.getElementById(\'divPreview\').style.backgroundColor = this.style.backgroundColor;');
			str += '</div>';
			return str;
			break;
		case 'KE_ICON':
			var str = '';
			var iconNum = 36;
			str += '<table id="POPUP_'+cmd+'" cellpadding="0" cellspacing="2" style="'+KindGetMenuCommonStyle()+'">';
			for (i = 0; i < iconNum; i++) {
				if (i == 0 || (i >= 6 && i%6 == 0)) {
					str += '<tr>';
				}
				var num;
				if ((i+1).toString(10).length < 2) {
					num = '0' + (i+1);
				} else {
					num = (i+1).toString(10);
				}
				var iconUrl = KE_ICON_PATH + 'etc_' + num + '.gif';
				str += '<td style="padding:2px;border:0;cursor:pointer;" ' + 
				'onclick="javascript:KindExecute(\'KE_ICON_END\', \'' + iconUrl + '\');">' +
				'<img src="' + iconUrl + '" style="border:1px solid #EEEEEE;" onmouseover="javascript:this.style.borderColor=\'#AAAAAA\';" ' +
				'onmouseout="javascript:this.style.borderColor=\'#EEEEEE\';">' + '</td>';
				if (i >= 5 && i%(i-1) == 0) {
					str += '</tr>';
				}
			}
			str += '</table>';
			return str;
			break;
		case 'KE_SPECIALCHAR':
			var str = '';
			str += '<table id="POPUP_'+cmd+'" cellpadding="0" cellspacing="2" style="'+KindGetMenuCommonStyle()+'">';
			for (i = 0; i < KE_SPECIAL_CHARACTER.length; i++) {
				if (i == 0 || (i >= 10 && i%10 == 0)) {
					str += '<tr>';
				}
				str += '<td style="padding:2px;border:1px solid #AAAAAA;cursor:pointer;" ' + 
				'onclick="javascript:KindExecute(\'KE_SPECIALCHAR_END\', \'' + KE_SPECIAL_CHARACTER[i] + '\');" ' +
				'onmouseover="javascript:this.style.borderColor=\'#000000\';" ' +
				'onmouseout="javascript:this.style.borderColor=\'#AAAAAA\';">' + KE_SPECIAL_CHARACTER[i] + '</td>';
				if (i >= 9 && i%(i-1) == 0) {
					str += '</tr>';
				}
			}
			str += '</table>';
			return str;
			break;
		case 'KE_TABLE':
			var str = '';
			var num = 10;
			str += '<table id="POPUP_'+cmd+'" cellpadding="0" cellspacing="0" style="'+KindGetMenuCommonStyle()+'">';
			for (i = 1; i <= num; i++) {
				str += '<tr>';
				for (j = 1; j <= num; j++) {
					var value = i.toString(10) + ',' + j.toString(10);
					str += '<td id="kindTableTd' + i.toString(10) + '_' + j.toString(10) + 
					'" style="width:15px;height:15px;background-color:#FFFFFF;border:1px solid #DDDDDD;cursor:pointer;" ' + 
					'onclick="javascript:KindExecute(\'KE_TABLE_END\', \'' + value + '\');" ' +
					'onmouseover="javascript:KindDrawTableSelected(\''+i.toString(10)+'\', \''+j.toString(10)+'\');" ' + 
					'onmouseout="javascript:;">&nbsp;</td>';
				}
				str += '</tr>';
			}
			str += '<tr><td colspan="10" id="tableLocation" style="text-align:center;height:20px;"></td></tr>';
			str += '</table>';
			return str;
			break;
		case 'KE_IMAGE':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:250px;'+KindGetMenuCommonStyle()+'">';
			str += '<iframe name="KindImageIframe" id="KindImageIframe" frameborder="0" style="width:250px;height:390px;padding:0;margin:0;border:0;">';
			str += '</iframe></div>';
			return str;
			break;
		case 'KE_FLASH':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:250px;'+KindGetMenuCommonStyle()+'">';
			str += '<iframe name="KindFlashIframe" id="KindFlashIframe" frameborder="0" style="width:250px;height:300px;padding:0;margin:0;border:0;">';
			str += '</iframe></div>';
			return str;
			break;
		case 'KE_MEDIA':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:250px;'+KindGetMenuCommonStyle()+'">';
			str += '<iframe name="KindMediaIframe" id="KindMediaIframe" frameborder="0" style="width:250px;height:300px;padding:0;margin:0;border:0;">';
			str += '</iframe></div>';
			return str;
			break;
		case 'KE_REAL':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:250px;'+KindGetMenuCommonStyle()+'">';
			str += '<iframe name="KindRealIframe" id="KindRealIframe" frameborder="0" style="width:250px;height:300px;padding:0;margin:0;border:0;">';
			str += '</iframe></div>';
			return str;
			break;
		case 'KE_LINK':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:250px;'+KindGetMenuCommonStyle()+'">';
			str += '<iframe name="KindLinkIframe" id="KindLinkIframe" frameborder="0" style="width:250px;height:85px;padding:0;margin:0;border:0;">';
			str += '</iframe></div>';
			return str;
			break;
		case 'KE_ABOUT':
			var str = '';
			str += '<div id="POPUP_'+cmd+'" style="width:230px;'+KindGetMenuCommonStyle()+';padding:5px;">';
			str += '<span style="margin-right:10px;">KindEditor ' + KE_VERSION + '</span>' + 
				'<a href="http://www.kindsoft.net/" target="_blank" style="color:#4169e1;" onclick="javascript:KindDisableMenu();">'+KE_LANG['ABOUT']+'</a><br />';
			str += '</div>';
			return str;
			break;
		default: 
			break;
	}
}
function KindDrawIframe(cmd)
{
	switch (cmd)
	{
		case 'KE_IMAGE':
			if (KE_BROWSER == 'IE') {
				KE_IMAGE_DOCUMENT = document.frames("KindImageIframe").document;
			} else {
				KE_IMAGE_DOCUMENT = document.getElementById('KindImageIframe').contentDocument;
			}
			var str = '';
			str += '<div align="center">' +
				'<form name="uploadForm" style="margin:0;padding:0;" method="post" enctype="multipart/form-data" ' +
				'action="' + KE_IMAGE_UPLOAD_CGI + '" onsubmit="javascript:if(parent.KindDrawImageEnd()==false){return false;};">' +
				'<input type="hidden" name="fileName" id="fileName" value="" />' + 
				'<table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;">' + 
				'<tr><td colspan="2"><table border="0" style="margin-bottom:3px;"><tr><td id="imgPreview" style="width:240px;height:240px;border:1px solid #AAAAAA;background-color:#FFFFFF;" align="center" valign="middle">&nbsp;</td></tr></table></td></tr>' +  	
				'<tr><td style="width:50px;padding-left:5px;">';
			if (KE_UPLOAD_MODE == true) {
				str += '<select id="imageType" onchange="javascript:parent.KindImageType(this.value);document.getElementById(\''+cmd+'submitButton\').focus();"><option value="1" selected="selected">'+KE_LANG['LOCAL']+'</option><option value="2">'+KE_LANG['REMOTE']+'</option></select>';
			} else {
				str += KE_LANG['REMOTE'];
			}
			str += '</td><td style="width:200px;padding-bottom:3px;">';
			if (KE_UPLOAD_MODE == true) {
				str += '<input type="text" id="imgLink" value="http://" maxlength="255" style="width:95%;border:1px solid #555555;display:none;" />' +
				'<input type="file" name="fileData" id="imgFile" size="14" style="border:1px solid #555555;" onclick="javascript:document.getElementById(\'imgLink\').value=\'http://\';" />';
			} else {
				str += '<input type="text" id="imgLink" value="http://" maxlength="255" style="width:95%;border:1px solid #555555;" />' +
				'<input type="hidden" name="imageType" id="imageType" value="2"><input type="hidden" name="fileData" id="imgFile" value="" />';
			}
			str += '</td></tr><tr><td colspan="2" style="padding-bottom:3px;">' +
				'<table border="0" style="width:100%;font-size:12px;"><tr>' +
				'<td width="18%" style="padding:2px 2px 2px 5px;">'+KE_LANG['TITLE']+'</td><td width="82%"><input type="text" name="imgTitle" id="imgTitle" value="" maxlength="100" style="width:95%;border:1px solid #555555;" /></td></tr></table>' +	
				'<table border="0" style="width:100%;font-size:12px;"><tr>' +
				'<td width="10%" style="padding:2px 2px 2px 5px;">'+KE_LANG['WIDTH']+'</td><td width="23%"><input type="text" name="imgWidth" id="imgWidth" value="0" maxlength="4" style="width:40px;border:1px solid #555555;" /></td>' +
				'<td width="10%" style="padding:2px;">'+KE_LANG['HEIGHT']+'</td><td width="23%"><input type="text" name="imgHeight" id="imgHeight" value="0" maxlength="4" style="width:40px;border:1px solid #555555;" /></td>' +
				'<td width="10%" style="padding:2px;">'+KE_LANG['BORDER']+'</td><td width="23%"><input type="text" name="imgBorder" id="imgBorder" value="0" maxlength="1" style="width:20px;border:1px solid #555555;" /></td></tr></table>' +
				'<table border="0" style="width:100%;font-size:12px;"><tr>' +
				'<td width="39%" style="padding:2px 2px 2px 5px;"><select id="imgAlign" name="imgAlign"><option value="">'+KE_LANG['ALIGN']+'</option>';
			for (var i = 0; i < KE_IMAGE_ALIGN_TABLE.length; i++) {
				str += '<option value="' + KE_IMAGE_ALIGN_TABLE[i] + '">' + KE_IMAGE_ALIGN_TABLE[i] + '</option>';
			}
			str += '</select></td>' +
				'<td width="15%" style="padding:2px;">'+KE_LANG['HSPACE']+'</td><td width="15%"><input type="text" name="imgHspace" id="imgHspace" value="0" maxlength="1" style="width:20px;border:1px solid #555555;" /></td>' +
				'<td width="15%" style="padding:2px;">'+KE_LANG['VSPACE']+'</td><td width="15%"><input type="text" name="imgVspace" id="imgVspace" value="0" maxlength="1" style="width:20px;border:1px solid #555555;" /></td></tr></table>' +
				'</td></tr><tr><td colspan="2" style="margin:5px;padding-bottom:5px;" align="center">' +
				'<input type="button" name="button" value="'+KE_LANG['PREVIEW']+'" onclick="javascript:parent.KindImagePreview();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
				'<input type="submit" name="button" id="'+cmd+'submitButton" value="'+KE_LANG['CONFIRM']+'" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
				'<input type="button" name="button" value="'+KE_LANG['CANCEL']+'" onclick="javascript:parent.KindDisableMenu();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /></td></tr>' + 
				'</table></form></div>';
			KindDrawMenuIframe(KE_IMAGE_DOCUMENT, str);
			break;
		case 'KE_FLASH':
			if (KE_BROWSER == 'IE') {
				KE_FLASH_DOCUMENT = document.frames("KindFlashIframe").document;
			} else {
				KE_FLASH_DOCUMENT = document.getElementById('KindFlashIframe').contentDocument;
			}
			var str = '<table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;">' + 
			'<tr><td colspan="2"><table border="0"><tr><td id="flashPreview" style="width:240px;height:240px;border:1px solid #AAAAAA;background-color:#FFFFFF;" align="center" valign="middle">&nbsp;</td></tr></table></td></tr>' +  	
			'<tr><td style="width:40px;padding:5px;">'+KE_LANG['REMOTE']+'</td>' +
			'<td style="width:210px;padding-bottom:5px;"><input type="text" id="flashLink" value="http://" style="width:190px;border:1px solid #555555;" /></td></tr>' +
			'<tr><td colspan="2" style="margin:5px;padding-bottom:5px;" align="center">' +
			'<input type="button" name="button" value="'+KE_LANG['PREVIEW']+'" onclick="javascript:parent.KindFlashPreview();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
			'<input type="submit" name="button" id="'+cmd+'submitButton" value="'+KE_LANG['CONFIRM']+'" onclick="javascript:parent.KindDrawFlashEnd();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
			'<input type="button" name="button" value="'+KE_LANG['CANCEL']+'" onclick="javascript:parent.KindDisableMenu();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /></td></tr>' + 
			'</table>';
			KindDrawMenuIframe(KE_FLASH_DOCUMENT, str);
			break;
		case 'KE_MEDIA':
			if (KE_BROWSER == 'IE') {
				KE_MEDIA_DOCUMENT = document.frames("KindMediaIframe").document;
			} else {
				KE_MEDIA_DOCUMENT = document.getElementById('KindMediaIframe').contentDocument;
			}
			var str = KindDrawMedia(cmd);
			KindDrawMenuIframe(KE_MEDIA_DOCUMENT, str);
			break;
		case 'KE_REAL':
			if (KE_BROWSER == 'IE') {
				KE_REAL_DOCUMENT = document.frames("KindRealIframe").document;
			} else {
				KE_REAL_DOCUMENT = document.getElementById('KindRealIframe').contentDocument;
			}
			var str = KindDrawMedia(cmd);
			KindDrawMenuIframe(KE_REAL_DOCUMENT, str);
			break;
		case 'KE_LINK':
			if (KE_BROWSER == 'IE') {
				KE_LINK_DOCUMENT = document.frames("KindLinkIframe").document;
			} else {
				KE_LINK_DOCUMENT = document.getElementById('KindLinkIframe').contentDocument;
			}
			var str = '';
			str += '<table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;">' + 
				'<tr><td style="width:50px;padding:5px;">URL</td>' +
				'<td style="width:200px;padding-top:5px;padding-bottom:5px;"><input type="text" id="hyperLink" value="http://" style="width:190px;border:1px solid #555555;background-color:#FFFFFF;"></td>' +
				'<tr><td style="padding:5px;">'+KE_LANG['TARGET']+'</td>' +
				'<td style="padding-bottom:5px;"><select id="hyperLinkTarget"><option value="_blank" selected="selected">'+KE_LANG['NEW_WINDOW']+'</option><option value="">'+KE_LANG['CURRENT_WINDOW']+'</option></select></td></tr>' + 
				'<tr><td colspan="2" style="padding-bottom:5px;" align="center">' +
				'<input type="submit" name="button" id="'+cmd+'submitButton" value="'+KE_LANG['CONFIRM']+'" onclick="javascript:parent.KindDrawLinkEnd();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /> ' +
				'<input type="button" name="button" value="'+KE_LANG['CANCEL']+'" onclick="javascript:parent.KindDisableMenu();" style="border:1px solid #555555;background-color:'+KE_BUTTON_COLOR+';" /></td></tr>';
			str += '</table>';
			KindDrawMenuIframe(KE_LINK_DOCUMENT, str);
			break;
		default:
			break;
	}
}
function KindDrawMenuIframe(obj, str)
{
	obj.open();
	obj.write(str);
	obj.close();
	obj.body.style.color = KE_MENU_TEXT_COLOR;
	obj.body.style.backgroundColor = KE_MENU_BG_COLOR;
	obj.body.style.margin = 0;
	obj.body.scroll = 'no';
}
function KindDrawTableSelected(i, j)
{
	var text = i.toString(10) + ' by ' + j.toString(10) + ' Table';
	document.getElementById('tableLocation').innerHTML = text;
	var num = 10;
	for (m = 1; m <= num; m++) {
		for (n = 1; n <= num; n++) {
			var obj = document.getElementById('kindTableTd' + m.toString(10) + '_' + n.toString(10) + '');
			if (m <= i && n <= j) {
				obj.style.backgroundColor = KE_MENU_SELECTED_COLOR;
			} else {
				obj.style.backgroundColor = '#FFFFFF';
			}
		}
	}
}
function KindImageType(type)
{
	if (type == 1) {
		KE_IMAGE_DOCUMENT.getElementById('imgFile').style.display = 'block';
		KE_IMAGE_DOCUMENT.getElementById('imgLink').style.display = 'none';
		KE_IMAGE_DOCUMENT.getElementById('imgLink').value = 'http://';
	} else {
		KE_IMAGE_DOCUMENT.getElementById('imgFile').style.display = 'none';
		KE_IMAGE_DOCUMENT.getElementById('imgLink').style.display = 'block';
	}
	KE_IMAGE_DOCUMENT.getElementById('imgPreview').innerHTML = "&nbsp;";
	KE_IMAGE_DOCUMENT.getElementById('imgWidth').value = 0;
	KE_IMAGE_DOCUMENT.getElementById('imgHeight').value = 0;
}
function KindImagePreview()
{
	var type = KE_IMAGE_DOCUMENT.getElementById('imageType').value;
	var url = KE_IMAGE_DOCUMENT.getElementById('imgLink').value;
	var file = KE_IMAGE_DOCUMENT.getElementById('imgFile').value;
	if (type == 1) {
		if (KE_BROWSER != 'IE') {
			return false;
		}
		if (file == '') {
			alert(KE_LANG['SELECT_IMAGE']);
			return false;
		}
		url = 'file:///' + file;
		if (KindCheckImageFileType(url, "\\") == false) {
			return false;
		}
	} else {
		if (KindCheckImageFileType(url, "/") == false) {
			return false;
		}
	}
	var imgObj = KE_IMAGE_DOCUMENT.createElement("IMG");
	imgObj.src = url;
	var width = parseInt(imgObj.width);
	var height = parseInt(imgObj.height);
	KE_IMAGE_DOCUMENT.getElementById('imgWidth').value = width;
	KE_IMAGE_DOCUMENT.getElementById('imgHeight').value = height;
	var rate = parseInt(width/height);
	if (width >230 && height <= 230) {
		width = 230;
		height = parseInt(width/rate);
	} else if (width <=230 && height > 230) {
		height = 230;
		width = parseInt(height*rate);
	} else if (width >230 && height > 230) {
		if (width >= height) {
			width = 230;
			height = parseInt(width/rate);
		} else {
			height = 230;
			width = parseInt(height*rate);
		}
	}
	imgObj.style.width = width;
	imgObj.style.height = height;
	var el = KE_IMAGE_DOCUMENT.getElementById('imgPreview');
	if (el.hasChildNodes()) {
		el.removeChild(el.childNodes[0]);
	}
	el.appendChild(imgObj);
	return imgObj;
}
function KindDrawImageEnd()
{
	var type = KE_IMAGE_DOCUMENT.getElementById('imageType').value;
	var url = KE_IMAGE_DOCUMENT.getElementById('imgLink').value;
	var file = KE_IMAGE_DOCUMENT.getElementById('imgFile').value;
	var width = KE_IMAGE_DOCUMENT.getElementById('imgWidth').value;
	var height = KE_IMAGE_DOCUMENT.getElementById('imgHeight').value;
	var border = KE_IMAGE_DOCUMENT.getElementById('imgBorder').value;
	var title = KE_IMAGE_DOCUMENT.getElementById('imgTitle').value;
	var align = KE_IMAGE_DOCUMENT.getElementById('imgAlign').value;
	var hspace = KE_IMAGE_DOCUMENT.getElementById('imgHspace').value;
	var vspace = KE_IMAGE_DOCUMENT.getElementById('imgVspace').value;
	if (type == 1) {
		if (file == '') {
			alert(KE_LANG['SELECT_IMAGE']);
			return false;
		}
		if (KindCheckImageFileType(file, "\\") == false) {
			return false;
		}
	} else {
		if (KindCheckImageFileType(url, "/") == false) {
			return false;
		}
	}
	if (width.match(/^\d+$/) == null) {
		alert(KE_LANG['INVALID_WIDTH']);
		return false;
	}
	if (height.match(/^\d+$/) == null) {
		alert(KE_LANG['INVALID_HEIGHT']);
		return false;
	}
	if (border.match(/^\d+$/) == null) {
		alert(KE_LANG['INVALID_BORDER']);
		return false;
	}
	if (hspace.match(/^\d+$/) == null) {
		alert(KE_LANG['INVALID_HSPACE']);
		return false;
	}
	if (vspace.match(/^\d+$/) == null) {
		alert(KE_LANG['INVALID_VSPACE']);
		return false;
	}
	var fileName;
	KindEditorForm.focus();
	if (type == 1) {
		fileName = KindGetFileName(file, "\\");
		var fileExt = KindGetFileExt(fileName);
		var dateObj = new Date();
		var year = dateObj.getFullYear().toString(10);
		var month = (dateObj.getMonth() + 1).toString(10);
		month = month.length < 2 ? '0' + month : month;
		var day = dateObj.getDate().toString(10);
		day = day.length < 2 ? '0' + day : day;
		var ymd = year + month + day;
		fileName = ymd + dateObj.getTime().toString(10) + '.' + fileExt;
		KE_IMAGE_DOCUMENT.getElementById('fileName').value = fileName;
	} else {
		KindInsertImage(url, width, height, border, title, align, hspace, vspace);
	}
}
function KindInsertImage(url, width, height, border, title, align, hspace, vspace)
{
	var ks = new KindString();
	ks.append('<img src="', url);
	if (width > 0) {
		ks.append('" width="', width);
	}
	if (height > 0) {
		ks.append('" height="', height);
	}
	if (align != "") {
		ks.append('" align="', align);
	}
	if (hspace > 0) {
		ks.append('" hspace="', hspace);
	}
	if (vspace > 0) {
		ks.append('" vspace="', vspace);
	}
	ks.append('" border="', border);
	ks.append('" alt="', KindHtmlentities(title), '" />');
	KindSelect();
	KindInsertHtml(ks.toString());
	KindDisableMenu();
}
function KindGetFlashHtmlTag(url)
{
	var str = '<embed src="'+url+'" type="application/x-shockwave-flash" quality="high"></embed>';
	return str;
}
function KindFlashPreview()
{
	var url = KE_FLASH_DOCUMENT.getElementById('flashLink').value;
	if (KindCheckFlashFileType(url, "/") == false) {
		return false;
	}
	var el = KE_FLASH_DOCUMENT.getElementById('flashPreview');
	el.innerHTML = KindGetFlashHtmlTag(url);
}
function KindDrawFlashEnd()
{
	var url = KE_FLASH_DOCUMENT.getElementById('flashLink').value;
	if (KindCheckFlashFileType(url, "/") == false) {
		return false;
	}
	KindEditorForm.focus();
	KindSelect();
	var ks = new KindString();
	ks.append('<embed src="', url);
	ks.append('" type="', "application/x-shockwave-flash");
	ks.append('" quality="', "high", '" />');
	KindInsertHtml(ks.toString());
	KindDisableMenu();
}
function KindGetMediaHtmlTag(cmd, url)
{
	var ks = new KindString();
	ks.append('<embed src="', url);
	ks.append('" type="');
	if (cmd == "KE_REAL") {
		ks.append("audio/x-pn-realaudio-plugin");
	} else {
		ks.append("video/x-ms-asf-plugin");
	}
	ks.append('" width="', '230');
	ks.append('" height="', '230');
	ks.append('" loop="', 'true');
	ks.append('" autostart="', "true", '" />');
	KindInsertHtml(ks.toString());
	return ks.toString();
}
function KindMediaPreview(cmd)
{
	var mediaDocument;
	if (cmd == 'KE_REAL') {
		mediaDocument = KE_REAL_DOCUMENT;
	} else {
		mediaDocument = KE_MEDIA_DOCUMENT;
	}
	var url = mediaDocument.getElementById(cmd+'link').value;
	if (KindCheckMediaFileType(cmd, url, "/") == false) {
		return false;
	}
	var el = mediaDocument.getElementById(cmd+'preview');
	el.innerHTML = KindGetMediaHtmlTag(cmd, url);
}
function KindDrawMediaEnd(cmd)
{
	var mediaDocument;
	if (cmd == 'KE_REAL') {
		mediaDocument = KE_REAL_DOCUMENT;
	} else {
		mediaDocument = KE_MEDIA_DOCUMENT;
	}
	var url = mediaDocument.getElementById(cmd+'link').value;
	if (KindCheckMediaFileType(cmd, url, "/") == false) {
		return false;
	}
	KindEditorForm.focus();
	KindSelect();
	KindInsertHtml(KindGetMediaHtmlTag(cmd));
	KindDisableMenu(cmd);
}
function KindDrawLinkEnd()
{
	var range;
	var url = KE_LINK_DOCUMENT.getElementById('hyperLink').value;
	var target = KE_LINK_DOCUMENT.getElementById('hyperLinkTarget').value;
	if (url.match(/http:\/\/.{3,}/) == null) {
		alert(KE_LANG['INPUT_URL']);
		return false;
	}
	KindEditorForm.focus();
	KindSelect();
	var element;
    if (KE_BROWSER == 'IE') {
		if (KE_SELECTION.type.toLowerCase() == 'control') {
			var el = document.createElement("a");
			el.href = url;
			if (target) {
				el.target = target;
			}
			KE_RANGE.item(0).applyElement(el);
		} else if (KE_SELECTION.type.toLowerCase() == 'text') {
			KindExecuteValue('CreateLink', url);
			element = KE_RANGE.parentElement();
			if (target) {
				element.target = target;
			}
		}
	} else {
		KindExecuteValue('CreateLink', url);
		element = KE_RANGE.startContainer.previousSibling;
		element.target = target;
		if (target) {
			element.target = target;
		}
    }
	KindDisableMenu();
}
function KindSelection()
{
	if (KE_BROWSER == 'IE') {
		KE_SELECTION = KE_EDITFORM_DOCUMENT.selection;
		KE_RANGE = KE_SELECTION.createRange();
		KE_RANGE_TEXT = KE_RANGE.text;
	} else {
		KE_SELECTION = document.getElementById("KindEditorForm").contentWindow.getSelection();
        KE_RANGE = KE_SELECTION.getRangeAt(0);
		KE_RANGE_TEXT = KE_RANGE.toString();
	}
}
function KindSelect()
{
	if (KE_BROWSER == 'IE') {
		KE_RANGE.select();
	}
}
function KindInsertHtml(html)
{
	if (KE_BROWSER == 'IE') {
		if (KE_SELECTION.type.toLowerCase() == 'control') {
			KE_RANGE.item(0).outerHTML = html;
		} else {
			KE_RANGE.pasteHTML(html);
		}
	} else {
		KE_EDITFORM_DOCUMENT.execCommand('inserthtml', false, html);
	}
}
function KindExecuteValue(cmd, value)
{
	KE_EDITFORM_DOCUMENT.execCommand(cmd, false, value);
}
function KindSimpleExecute(cmd)
{
	KindEditorForm.focus();
	KE_EDITFORM_DOCUMENT.execCommand(cmd, false, null);
	KindDisableMenu();
}
function KindExecute(cmd, value)
{
	switch (cmd)
	{
		case 'KE_SOURCE':
			var length = document.getElementById(KE_TOP_TOOLBAR_ICON[0][0]).src.length - 10;
			var image = document.getElementById(KE_TOP_TOOLBAR_ICON[0][0]).src.substr(length,10);
			if (image == 'source.gif') {
				document.getElementById("KindCodeForm").value = KindHtmlToXhtml(KE_EDITFORM_DOCUMENT.body.innerHTML);
				document.getElementById("KindEditorIframe").style.display = 'none';
				document.getElementById("KindEditTextarea").style.display = 'block';
				KindDisableToolbar(true);
			} else {
				KE_EDITFORM_DOCUMENT.body.innerHTML = KindClearScriptTag(document.getElementById("KindCodeForm").value);
				document.getElementById("KindEditTextarea").style.display = 'none';
				document.getElementById("KindEditorIframe").style.display = 'block';
				KindDisableToolbar(false);
			}
			KindDisableMenu();
			break;
		case 'KE_PRINT':
			KindSimpleExecute('print');
			break;
		case 'KE_UNDO':
			KindSimpleExecute('undo');
			break;
		case 'KE_REDO':
			KindSimpleExecute('redo');
			break;
		case 'KE_CUT':
			KindSimpleExecute('cut');
			break;
		case 'KE_COPY':
			KindSimpleExecute('copy');
			break;
		case 'KE_PASTE':
			KindSimpleExecute('paste');
			break;
		case 'KE_SELECTALL':
			KindSimpleExecute('selectall');
			break;
		case 'KE_SUBSCRIPT':
			KindSimpleExecute('subscript');
			break;
		case 'KE_SUPERSCRIPT':
			KindSimpleExecute('superscript');
			break;
		case 'KE_BOLD':
			KindSimpleExecute('bold');
			break;
		case 'KE_ITALIC':
			KindSimpleExecute('italic');
			break;
		case 'KE_UNDERLINE':
			KindSimpleExecute('underline');
			break;
		case 'KE_STRIKE':
			KindSimpleExecute('strikethrough');
			break;
		case 'KE_JUSTIFYLEFT':
			KindSimpleExecute('justifyleft');
			break;
		case 'KE_JUSTIFYCENTER':
			KindSimpleExecute('justifycenter');
			break;
		case 'KE_JUSTIFYRIGHT':
			KindSimpleExecute('justifyright');
			break;
		case 'KE_JUSTIFYFULL':
			KindSimpleExecute('justifyfull');
			break;
		case 'KE_NUMBEREDLIST':
			KindSimpleExecute('insertorderedlist');
			break;
		case 'KE_UNORDERLIST':
			KindSimpleExecute('insertunorderedlist');
			break;
		case 'KE_INDENT':
			KindSimpleExecute('indent');
			break;
		case 'KE_OUTDENT':
			KindSimpleExecute('outdent');
			break;
		case 'KE_REMOVE':
			KindSimpleExecute('removeformat');
			break;
		case 'KE_ZOOM':
			KindDisplayMenu(cmd);
			break;
		case 'KE_ZOOM_END':
			KindEditorForm.focus();
			KE_EDITFORM_DOCUMENT.body.style.zoom = value;
			KindDisableMenu();
			break;
		case 'KE_TITLE':
			KindDisplayMenu(cmd);
			break;
		case 'KE_TITLE_END':
			KindEditorForm.focus();
			value = '<' + value + '>';
			KindSelect();
			KindExecuteValue('FormatBlock', value);
			KindDisableMenu();
			break;
		case 'KE_FONTNAME':
			KindDisplayMenu(cmd);
			break;
		case 'KE_FONTNAME_END':
			KindEditorForm.focus();
			KindSelect();
			KindExecuteValue('fontname', value);
			KindDisableMenu();
			break;
		case 'KE_FONTSIZE':
			KindDisplayMenu(cmd);
			break;
		case 'KE_FONTSIZE_END':
			KindEditorForm.focus();
			value = value.substr(0, 1);
			KindSelect();
			KindExecuteValue('fontsize', value);
			KindDisableMenu();
			break;
		case 'KE_TEXTCOLOR':
			KindDisplayMenu(cmd);
			break;
		case 'KE_TEXTCOLOR_END':
			KindEditorForm.focus();
			KindSelect();
			KindExecuteValue('ForeColor', value);
			KindDisableMenu();
			break;
		case 'KE_BGCOLOR':
			KindDisplayMenu(cmd);
			break;
		case 'KE_BGCOLOR_END':
			KindEditorForm.focus();
			if (KE_BROWSER == 'IE') {
				KindSelect();
				KindExecuteValue('BackColor', value);
			} else {
				var startRangeNode = KE_RANGE.startContainer;
				if (startRangeNode.nodeType == 3) {
					var parent = startRangeNode.parentNode;
					var element = document.createElement("font");
					element.style.backgroundColor = value;
					element.appendChild(KE_RANGE.extractContents());
					var startRangeOffset = KE_RANGE.startOffset;
					var newRange = document.createRange();
					var afterNode;
					var textNode = startRangeNode;
					startRangeNode = textNode.parentNode;
					var text = textNode.nodeValue;
					var textBefore = text.substr(0, startRangeOffset);
					var textAfter = text.substr(startRangeOffset);
					var beforeNode = document.createTextNode(textBefore);
					var afterNode = document.createTextNode(textAfter);
					startRangeNode.insertBefore(afterNode, textNode);
					startRangeNode.insertBefore(element, afterNode);
					startRangeNode.insertBefore(beforeNode, element);
					startRangeNode.removeChild(textNode);
					newRange.setEnd(afterNode, 0);
					newRange.setStart(afterNode, 0);
					KE_SELECTION.addRange(newRange);
				}
			}
			KindDisableMenu();
			break;
		case 'KE_ICON':
			KindDisplayMenu(cmd);
			break;
		case 'KE_ICON_END':
			KindEditorForm.focus();
			var ks = new KindString();
			ks.append('<img src="', value);
			ks.append('" border="', '0');
			ks.append('" alt="', '" />');
			KindSelect();
			KindInsertHtml(ks.toString());
			KindDisableMenu();
			break;
		case 'KE_IMAGE':
			KindDisplayMenu(cmd);
			KindDrawIframe(cmd);
			KindImageIframe.focus();
			KE_IMAGE_DOCUMENT.getElementById(cmd+'submitButton').focus();
			break;
		case 'KE_FLASH':
			KindDisplayMenu(cmd);
			KindDrawIframe(cmd);
			KindFlashIframe.focus();
			KE_FLASH_DOCUMENT.getElementById(cmd+'submitButton').focus();
			break;
		case 'KE_MEDIA':
			KindDisplayMenu(cmd);
			KindDrawIframe(cmd);
			KindMediaIframe.focus();
			KE_MEDIA_DOCUMENT.getElementById(cmd+'submitButton').focus();
			break;
		case 'KE_REAL':
			KindDisplayMenu(cmd);
			KindDrawIframe(cmd);
			KindRealIframe.focus();
			KE_REAL_DOCUMENT.getElementById(cmd+'submitButton').focus();
			break;
		case 'KE_LINK':
			KindDisplayMenu(cmd);
			KindDrawIframe(cmd);
			KindLinkIframe.focus();
			KE_LINK_DOCUMENT.getElementById(cmd+'submitButton').focus();
			break;
		case 'KE_UNLINK':
			KindSimpleExecute('unlink');
			break;
		case 'KE_SPECIALCHAR':
			KindDisplayMenu(cmd);
			break;
		case 'KE_SPECIALCHAR_END':
			KindEditorForm.focus();
			KindSelect();
			KindInsertHtml(value);
			KindDisableMenu();
			break;
		case 'KE_LAYER':
			KindDisplayMenu(cmd);
			break;
		case 'KE_LAYER_END':
			KindEditorForm.focus();
			var ks = new KindString();
			ks.append('<div style="padding:5px;border:1px solid #AAAAAA;background-color:');
			ks.append(value, '">', KE_LANG['INPUT_CONTENT'], '</div>');
			KindSelect();
			KindInsertHtml(ks.toString());
			KindDisableMenu();
			break;
		case 'KE_TABLE':
			KindDisplayMenu(cmd);
			break;
		case 'KE_TABLE_END':
			KindEditorForm.focus();
			var location = value.split(',');
			var ks = new KindString();
			ks.append('<table style="width:100px;height:100px;" ');
			ks.append('cellpadding="0" cellspacing="0" border="1">');
			for (var i = 0; i < location[0]; i++) {
				ks.append('<tr>');
				for (var j = 0; j < location[1]; j++) {
					ks.append('<td>&nbsp;</td>');
				}
				ks.append('</tr>');
			}
			ks.append('</table>');
			KindSelect();
			KindInsertHtml(ks.toString());
			KindDisableMenu();
			break;
		case 'KE_HR':
			KindDisplayMenu(cmd);
			break;
		case 'KE_HR_END':
			KindEditorForm.focus();
			var ks = new KindString();
			ks.append('<hr width="100%" color="', value, '" size="1" />');
			KindSelect();
			KindInsertHtml(ks.toString());
			KindDisableMenu();
			break;
		case 'KE_DATE':
			KindEditorForm.focus();
			KindSelection();
			var date = new Date();
			var year = date.getFullYear().toString(10);
			var month = (date.getMonth() + 1).toString(10);
			month = month.length < 2 ? '0' + month : month;
			var day = date.getDate().toString(10);
			day = day.length < 2 ? '0' + day : day;
			var value = year + '-' + month + '-' + day;
			KindInsertHtml(value);
			KindDisableMenu();
			break;
		case 'KE_TIME':
			KindEditorForm.focus();
			KindSelection();
			var date = new Date();
			var hour = date.getHours().toString(10);
			hour = hour.length < 2 ? '0' + hour : hour;
			var minute = date.getMinutes().toString(10);
			minute = minute.length < 2 ? '0' + minute : minute;
			var second = date.getSeconds().toString(10);
			second = second.length < 2 ? '0' + second : second;
			var value = hour + ':' + minute + ':' + second;
			KindInsertHtml(value);
			KindDisableMenu();
			break;
		case 'KE_PREVIEW':
			eval(KE_OBJ_NAME).data();
			var newWin = window.open('', 'kindPreview','width=800,height=600,left=30,top=30,resizable=yes,scrollbars=yes');
			KindWriteFullHtml(newWin.document, document.getElementsByName(eval(KE_OBJ_NAME).hiddenName)[0].value);
			KindDisableMenu();
			break;
		case 'KE_ABOUT':
			KindDisplayMenu(cmd);
			break;
		default: 
			break;
	}
}
function KindDisableToolbar(flag)
{
	if (flag == true) {
		document.getElementById(KE_TOP_TOOLBAR_ICON[0][0]).src = KE_SKIN_PATH + 'design.gif';
		for (i = 0; i < KE_TOOLBAR_ICON.length; i++) {
			var el = document.getElementById(KE_TOOLBAR_ICON[i][0]);
			if (KE_TOOLBAR_ICON[i][0] == 'KE_SOURCE' || KE_TOOLBAR_ICON[i][0] == 'KE_PREVIEW' || KE_TOOLBAR_ICON[i][0] == 'KE_ABOUT') {
				continue;
			}
			el.style.visibility = 'hidden';
		}
	} else {
		document.getElementById(KE_TOP_TOOLBAR_ICON[0][0]).src = KE_SKIN_PATH + 'source.gif';
		for (i = 0; i < KE_TOOLBAR_ICON.length; i++) {
			var el = document.getElementById(KE_TOOLBAR_ICON[i][0]);
			el.style.visibility = 'visible';
			KE_EDITFORM_DOCUMENT.designMode = 'On';
		}
	}
}
function KindCreateIcon(icon)
{
	var str = '<img id="'+ icon[0] +'" src="' + KE_SKIN_PATH + icon[1] + '" alt="' + icon[2] + '" title="' + icon[2] + 
			'" align="absmiddle" style="border:1px solid ' + KE_TOOLBAR_BG_COLOR +';cursor:pointer;height:20px;';
	str += '" onclick="javascript:KindExecute(\''+ icon[0] +'\');" '+
			'onmouseover="javascript:this.style.border=\'1px solid ' + KE_MENU_BORDER_COLOR + '\';" ' +
			'onmouseout="javascript:this.style.border=\'1px solid ' + KE_TOOLBAR_BG_COLOR + '\';" ';
	str += '>';
	return str;
}
function KindCreateToolbar()
{
	var htmlData = '<table cellpadding="0" cellspacing="0" border="0" height="26"><tr>';
	if (KE_EDITOR_TYPE == 'full') {
		for (i = 0; i < KE_TOP_TOOLBAR_ICON.length; i++) {
			htmlData += '<td style="padding:2px;">' + KindCreateIcon(KE_TOP_TOOLBAR_ICON[i]) + '</td>';
		}
		htmlData += '</tr></table><table cellpadding="0" cellspacing="0" border="0" height="26"><tr>';
		for (i = 0; i < KE_BOTTOM_TOOLBAR_ICON.length; i++) {
			htmlData += '<td style="padding:2px;">' + KindCreateIcon(KE_BOTTOM_TOOLBAR_ICON[i]) + '</td>';
		}
	} else {
		for (i = 0; i < KE_SIMPLE_TOOLBAR_ICON.length; i++) {
			htmlData += '<td style="padding:2px;">' + KindCreateIcon(KE_SIMPLE_TOOLBAR_ICON[i]) + '</td>';
		}
	}
	htmlData += '</tr></table>';
	return htmlData;
}
function KindWriteFullHtml(documentObj, content)
{
	var editHtmlData = '';
	editHtmlData += '<html>\r\n<head>\r\n<title>KindEditor</title>\r\n';
	editHtmlData += '<link href="'+KE_CSS_PATH+'" rel="stylesheet" type="text/css">\r\n</head>\r\n<body>\r\n';
	editHtmlData += content;
	editHtmlData += '\r\n</body>\r\n</html>\r\n';
	documentObj.open();
	documentObj.write(editHtmlData);
	documentObj.close();
}
function KindEditor(objName) 
{
	this.objName = objName;
	this.hiddenName = objName;
	this.siteDomain;
	this.editorType;
	this.safeMode;
	this.uploadMode;
	this.editorWidth;
	this.editorHeight;
	this.skinPath;
	this.iconPath;
	this.imageAttachPath;
	this.imageUploadCgi;
	this.cssPath;
	this.menuBorderColor;
	this.menuBgColor;
	this.menuTextColor;
	this.menuSelectedColor;
	this.toolbarBorderColor;
	this.toolbarBgColor;
	this.formBorderColor;
	this.formBgColor;
	this.buttonColor;
	this.init = function()
	{
		if (this.siteDomain) KE_SITE_DOMAIN = this.siteDomain;
		if (this.editorType) KE_EDITOR_TYPE = this.editorType.toLowerCase();
		if (this.safeMode) KE_SAFE_MODE = this.safeMode;
		if (this.uploadMode) KE_UPLOAD_MODE = this.uploadMode;
		if (this.editorWidth) KE_WIDTH = this.editorWidth;
		if (this.editorHeight) KE_HEIGHT = this.editorHeight;
		if (this.skinPath) KE_SKIN_PATH = this.skinPath;
		if (this.iconPath) KE_ICON_PATH = this.iconPath;
		if (this.imageAttachPath) KE_IMAGE_ATTACH_PATH = this.imageAttachPath;
		if (this.imageUploadCgi) KE_IMAGE_UPLOAD_CGI = this.imageUploadCgi;
		if (this.cssPath) KE_CSS_PATH = this.cssPath;
		if (this.menuBorderColor) KE_MENU_BORDER_COLOR = this.menuBorderColor;
		if (this.menuBgColor) KE_MENU_BG_COLOR = this.menuBgColor;
		if (this.menuTextColor) KE_MENU_TEXT_COLOR = this.menuTextColor;
		if (this.menuSelectedColor) KE_MENU_SELECTED_COLOR = this.menuSelectedColor;
		if (this.toolbarBorderColor) KE_TOOLBAR_BORDER_COLOR = this.toolbarBorderColor;
		if (this.toolbarBgColor) KE_TOOLBAR_BG_COLOR = this.toolbarBgColor;
		if (this.formBorderColor) KE_FORM_BORDER_COLOR = this.formBorderColor;
		if (this.formBgColor) KE_FORM_BG_COLOR = this.formBgColor;
		if (this.buttonColor) KE_BUTTON_COLOR = this.buttonColor;
		KE_OBJ_NAME = this.objName;
		KE_BROWSER = KindGetBrowser();
		KE_TOOLBAR_ICON = Array();
		for (var i = 0; i < KE_TOP_TOOLBAR_ICON.length; i++) {
			KE_TOOLBAR_ICON.push(KE_TOP_TOOLBAR_ICON[i]);
		}
		for (var i = 0; i < KE_BOTTOM_TOOLBAR_ICON.length; i++) {
			KE_TOOLBAR_ICON.push(KE_BOTTOM_TOOLBAR_ICON[i]);
		}
	}
	this.show = function()
	{
		this.init();
		var widthStyle = 'width:' + KE_WIDTH + ';';
		var widthArr = KE_WIDTH.match(/(\d+)([px%]{1,2})/);
		var iframeWidthStyle = 'width:' + (parseInt(widthArr[1]) - 2).toString(10) + widthArr[2] + ';';
		var heightStyle = 'height:' + KE_HEIGHT + ';';
		var heightArr = KE_HEIGHT.match(/(\d+)([px%]{1,2})/);
		var iframeHeightStyle = 'height:' + (parseInt(heightArr[1]) - 3).toString(10) + heightArr[2] + ';';
		if (KE_BROWSER == '') {
			var htmlData = '<div id="KindEditTextarea" style="' + widthStyle + heightStyle + '">' +
			'<textarea name="KindCodeForm" id="KindCodeForm" style="' + widthStyle + heightStyle + 
			'padding:0;margin:0;border:1px solid '+ KE_FORM_BORDER_COLOR + 
			';font-size:12px;line-height:16px;font-family:'+KE_FONT_FAMILY+';background-color:'+ 
			KE_FORM_BG_COLOR +';">' + document.getElementsByName(this.hiddenName)[0].value + '</textarea></div>';
			document.open();
			document.write(htmlData);
			document.close();
			return;
		}
		var ks = new KindString();
		ks.append('<div style="font-family:', KE_FONT_FAMILY, ';">');
		ks.append('<div style="', widthStyle, ';border:1px solid ');
		ks.append(KE_TOOLBAR_BORDER_COLOR, ';background-color:');
		ks.append(KE_TOOLBAR_BG_COLOR, '">');
		ks.append(KindCreateToolbar());
		ks.append('</div><div id="KindEditorIframe" style="', widthStyle, heightStyle); 
		ks.append('border:1px solid ', KE_FORM_BORDER_COLOR, ';border-top:0;">');
		ks.append('<iframe name="KindEditorForm" id="KindEditorForm" frameborder="0" style="');
		ks.append(iframeWidthStyle, iframeHeightStyle);
		ks.append('padding:0;margin:0;border:0;"></iframe></div>');
		if (KE_EDITOR_TYPE == 'full') {
			ks.append('<div id="KindEditTextarea" style="', widthStyle, heightStyle); 
			ks.append('border:1px solid ', KE_FORM_BORDER_COLOR, ';background-color:');
			ks.append(KE_FORM_BG_COLOR, ';border-top:0;display:none;">');
			ks.append('<textarea name="KindCodeForm" id="KindCodeForm" style="');
			ks.append(iframeWidthStyle, iframeHeightStyle); 
			ks.append('padding:0;margin:0;border:0;font-size:12px;line-height:16px;font-family:');
			ks.append(KE_FONT_FAMILY, ';background-color:', KE_FORM_BG_COLOR);
			ks.append(';" onclick="javascirit:parent.KindDisableMenu();"></textarea></div>');
		}
		ks.append('<div id="menuDiv">');
		ks.append('</div>');
		ks.append('</div>');
		document.open();
		document.write(ks.toString());
		document.close();
		if (KE_BROWSER == 'IE') {
			KE_EDITFORM_DOCUMENT = document.frames("KindEditorForm").document;
		} else {
			KE_EDITFORM_DOCUMENT = document.getElementById('KindEditorForm').contentDocument;
		}
		KE_EDITFORM_DOCUMENT.designMode = 'On';
		KindWriteFullHtml(KE_EDITFORM_DOCUMENT, document.getElementsByName(eval(KE_OBJ_NAME).hiddenName)[0].value);
		var el = KE_EDITFORM_DOCUMENT.body;
		if (KE_EDITFORM_DOCUMENT.addEventListener){
			KE_EDITFORM_DOCUMENT.addEventListener('click', KindDisableMenu, false); 
		} else if (el.attachEvent){
			el.attachEvent('onclick', KindDisableMenu);
		}
	}
	this.data = function()
	{
		var htmlResult;
		if (KE_BROWSER == '') {
			htmlResult = document.getElementById("KindCodeForm").value;
		} else {
			if (KE_EDITOR_TYPE == 'full') {
				var length = document.getElementById(KE_TOP_TOOLBAR_ICON[0][0]).src.length - 10;
				var image = document.getElementById(KE_TOP_TOOLBAR_ICON[0][0]).src.substr(length,10);
				if (image == 'source.gif') {
					htmlResult = KE_EDITFORM_DOCUMENT.body.innerHTML;
				} else {
					htmlResult = document.getElementById("KindCodeForm").value;
				}
			} else {
				htmlResult = KE_EDITFORM_DOCUMENT.body.innerHTML;
			}
		}
		KindDisableMenu();
		htmlResult = KindHtmlToXhtml(htmlResult);
		htmlResult = KindClearScriptTag(htmlResult);
		document.getElementsByName(this.hiddenName)[0].value = htmlResult;
		return htmlResult;
	}
}
