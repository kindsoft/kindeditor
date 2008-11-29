#######################################################################
# 
# KindEditor 3.x 自述文件
#
#######################################################################

一 简单使用方法

1. 把所有文件上传到程序所在目录下，例如：http://你的域名/kindeditor/。

2. 要添加编辑器的页面头部添加以下代码。
   注意：如果不想用压缩后的JS文件，可以直接包含src/lang/zh_CN.js、src/kindeditor-core.js、src/plugin-all.js文件。
-----------------------------------------------------------------------
<script type="text/javascript" charset="utf-8" src="/kindeditor/build/kindeditor.js"></script>
<script type="text/javascript">
    KE.show({
        id : 'content_1',
        cssPath : './index.css'
    });
</script>
<textarea id="content_1" name="content" style="width:700px;height:300px;visibility:hidden;"></textarea>
<!-- 注意: 原来有TEXTAREA的话，属性里只加id,width,height即可。 -->
-----------------------------------------------------------------------

* 要了解详情，请参考examples里的演示，或访问 http://www.kindsoft.net/。

-----------------------------------------------------------------------

二 属性介绍
-----------------------------------------------------------------------
1. wyswygMode
true或false，可视化模式或代码模式
默认值：true

2. autoOnsubmitMode
true或false，true时form的onsubmit里自动添加setData事件
默认值：true

3. skinType
风格类型，default或tinymce
默认值：default

4. cssPath
指定编辑器的CSS
默认值：空

5. skinsPath
指定编辑器的skins目录。
默认值：KE.scriptPath + 'skins/'

6. pluginsPath
指定编辑器的plugins目录。
默认值：KE.scriptPath + 'plugins/'

7. minWidth
指定编辑器最小宽度，单位为像素。
默认值：200

8. minHeight
指定编辑器最小高度，单位为像素。
默认值：100

-----------------------------------------------------------------------

三 常量
-----------------------------------------------------------------------
1. KE.version
编辑器版本

2. KE.scriptPath
JS文件所在目录路径

3. KE.htmlPath
HTML文件所在目录路径

4. KE.browser
浏览器类型，根据浏览器返回IE、GECKO、OPERA。
Firefox、Safari、Chrome等返回GECKO。

-----------------------------------------------------------------------

四 函数
-----------------------------------------------------------------------
1. KE.$(id, doc)
doc.getElementById(id)的别名。

2. KE.$$(name, doc)
doc.createElement(name)的别名。

3. KE.event.add(element, event, listener)
添加事件。

4. KE.event.remove(element, event, listener)
移除事件。
