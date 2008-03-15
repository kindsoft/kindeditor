#######################################################################
# 
# KindEditor 自述文件
#
#######################################################################

一 简单使用方法

1. 把所有文件上传到程序所在目录下，例如：http://你的域名/editor/。

2. 在此目录下创建attached文件夹，并把权限改成777。

3. 要添加编辑器的地方加入以下代码。（原来的TEXTAREA或其它编辑器可以先注释。）
   这里[]里的内容要根据你的实际情况修改。
-----------------------------------------------------------------------
<input type="hidden" name="[原TEXTAREA名字]" value="[这里放你要编辑的内容]">
<script type="text/javascript" charset="utf-8" src="[JS路径]/KindEditor.js"></script>
<script type="text/javascript">
var editor = new KindEditor("editor"); //创建编辑器对象
editor.hiddenName = "[原TEXTAREA名字]";
editor.editorWidth = "[编辑器宽度,例如：700px]";
editor.editorHeight = "[编辑器高度,例如：400px]";
editor.show(); //显示
//提交时获得最终HTML代码的函数
function KindSubmit() {
	editor.data();
}
</script>
-----------------------------------------------------------------------

4. FORM的onsubmit属性里添加KindSubmit()函数。
<form name="formname" onsubmit="javascript:KindSubmit();">
或可以放在提交按钮的onclick属性里。
<input type="button" value="Submit" onclick="javascript:KindSubmit();">

5. 如果KindEditor文件放在其它目录下，那就需要通过skinPath、iconPath属性指定图片、笑脸目录。

* 使用方法可以参考demo文件。

-----------------------------------------------------------------------

二 属性介绍
-----------------------------------------------------------------------
1. editorType
simple或full，简单模式或完全模式
默认值：full

2. safeMode
true或false，安全模式。true时过滤Script脚本。
默认值：false

3. uploadMode
true或false，上传模式。true时使用上传功能。
默认值：true

4. hiddenName
提交时编辑内容的POST参数名
默认值：无

5. editorWidth
编辑器宽度
默认值：700px

6. editorHeight
编辑器高度
默认值：400px

7. skinPath
编辑器图片路径
默认值：./skins/default/

8. iconPath
编辑器笑脸图片路径
默认值：./icons/

9. imageAttachPath
保存上传图片的路径
默认值：./attached/

10. imageUploadCgi
上传图片的CGI文件路径
默认值：./upload_cgi/upload.php

11. menuBorderColor
下拉菜单边框颜色
默认值：#AAAAAA

12. menuBgColor
下拉菜单背景颜色
默认值：#EFEFEF

13. menuTextColor
下拉菜单文本颜色
默认值：#222222

14. menuSelectedColor
下拉菜单选中颜色
默认值：#DDDDDD

15. toolbarBorderColor
工具栏背景颜色
默认值：#DDDDDD

16. toolbarBgColor
工具栏背景颜色
默认值：#EFEFEF

17. formBorderColor
编辑框边框颜色
默认值：#DDDDDD

18. formBgColor
编辑框背景颜色
默认值：#FFFFFF

19. buttonColor
按钮背景颜色
默认值：#AAAAAA

20. cssPath
指定CSS文件路径
默认值：./common.css
-----------------------------------------------------------------------

属性例子：
-----------------------------------------------------------------------
<input type="hidden" name="content" value="[这里放你要编辑的内容]">
<script type="text/javascript" src="./KindEditor.js"></script>
<script type="text/javascript">
var editor = new KindEditor("editor");
editor.safeMode = true; // true 或 false
editor.uploadMode = true; // true 或 false
editor.hiddenName = "content"; //上面hidden的名字
editor.imageUploadCgi = "./upload_cgi/upload.php"; //图片上传CGI程序
editor.editorType = "simple"; // simple 或 full
editor.skinPath = "./skins/fck/"; //编辑器图片目录
editor.editorWidth = "700px"; //宽度
editor.editorHeight = "400px"; //高度
editor.menuBorderColor = '#696969';
editor.menuBgColor = '#EFEFDE';
editor.menuTextColor = '#000000';
editor.menuSelectedColor = '#C7C78F';
editor.toolbarBorderColor = '#696969';
editor.toolbarBgColor = '#EFEFDE';
editor.formBorderColor = '#696969';
editor.buttonColor = '#C7C78F';
editor.show();
function KindSubmit() {
	editor.data(); //把编辑器的内容放在content隐藏Form里。
}
</script>
-----------------------------------------------------------------------

三 编写上传CGI
-----------------------------------------------------------------------
KindEditor不建议您使用upload_cgi里自带的CGI程序，因为用这个上传图片无法进行管理。
建议您图片原名和更改后名字一起保存到文件或数据库里，并按栏目保存在不同的目录下。

1. Form结构
--------------------------------------
<form name="uploadForm" method="post" enctype="multipart/form-data" action="[imageUploadCgi指定的处理程序]">
更改后文件名<input type="hidden" name="fileName" value="">
文件<input type="file" name="fileData">
描述<input type="text" name="imgTitle" value="">
宽<input type="text" name="imgWidth" value="">
高<input type="text" name="imgHeight" value="">
边<input type="text" name="imgBorder" value="">
<select name="imgAlign">
<option value="">对齐方式</option>
</select>
横隔<input type="text" name="imgHspace" value="">
竖隔<input type="text" name="imgVspace" value="">
<input type="submit" name="button" value="确定">
</form>
--------------------------------------

2. 调用的JavaScript函数
parent.KindInsertImage("[图片URL]","[图片宽度]","[图片高度]","[图片边框]","[ALT里的描述]","[图片对齐方式]","[图片横向空白]","[图片竖向空白]");
最后上传成功后执行这个函数插入图片并关闭下拉菜单。
* 注意点: 文件要上传到JavaScript里imageAttachPath目录里。

parent.KindDisableMenu();
隐藏所有弹出菜单。

parent.KindReloadIframe();
重新装载图片弹出菜单。

3. 具体编写方法请参考upload_cgi里的程序。

-----------------------------------------------------------------------

四、风格制作方法
-----------------------------------------------------------------------
1. 首先在skins目录下建立一个目录。例如： skins/myskin/

2. 把skins/default/目录下的所有文件复制到自定义风格目录下。
然后可以一个一个替换，大小可以不同，但名字必须保持一致。

3. 在调用编辑器的地方，通过属性配置风格路径和编辑器颜色。

例如：
editor.skinPath = "./skins/myskin/"; //指向刚才制作好的目录
editor.menuBorderColor = '#696969';
editor.menuBgColor = '#EFEFDE';
editor.menuTextColor = '#000000';
editor.menuSelectedColor = '#C7C78F';
editor.toolbarBorderColor = '#696969';
editor.toolbarBgColor = '#EFEFDE';
editor.formBorderColor = '#696969';
editor.buttonColor = '#C7C78F';
-----------------------------------------------------------------------

-----------------------------------------------------------------------

五、常见问题
-----------------------------------------------------------------------
1. 怎么在GB2312编码下使用KindEditor？

答：本编辑器默认采用UTF-8格式。要改成GB2312格式，用任何带有编码转换功能的编辑器（UltraEdit, EditPlus等）把KindEditor.js文件格式转换成GB2312就可以。
若使用图片上传功能，upload程序也要改成GB2312。
或者包含KindEditor.js时指定charset。
<script type="text/javascript" charset="utf-8" src="[JS路径]/KindEditor.js"></script>
-----------------------------------------------------------------------

要了解详情或有疑问，请访问http://www.kindsoft.net。