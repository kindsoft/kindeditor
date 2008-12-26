#######################################################################
# 
# KindEditor 3.x 自述文件
#
#######################################################################

简单使用方法

1. 下载KindEditor最新版本。
   下载地址：http://code.google.com/p/kindeditor/downloads/list

2. 解压zip文件，并把所有文件上传到您的网站程序目录下，例如：http://你的域名/kindeditor/。

3. 要添加编辑器的页面头部添加以下代码。
   注意：如果不想用压缩后的JS文件，可以直接包含src/lang/zh_CN.js、src/kindeditor-core.js、src/plugin-all.js文件。
   -----------------------------------------------------------------------
   <script type="text/javascript" charset="utf-8" src="/kindeditor/build/kindeditor.js"></script>
   <script type="text/javascript">
       KE.show({
           id : 'content_1',
           cssPath : './index.css'
       });
   </script>
   -----------------------------------------------------------------------

4. 要显示编辑器的位置添加TEXTAREA输入框。
   <textarea id="content_1" name="content" style="width:700px;height:300px;visibility:hidden;"></textarea>
   <!-- 注意: 如果原来有TEXTAREA，属性里只加id,width,height即可。 -->

要了解详情，请参考examples里的演示，或访问 http://www.kindsoft.net/。
