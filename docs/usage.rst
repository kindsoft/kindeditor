编辑器使用方法
========================================================

1. 下载编辑器
-----------------------------------------------------------------
下载 KindEditor 最新版本，下载之后打开 examples/index.html 就可以看到演示。

下载页面: http://www.kindsoft.net/down.php

2. 部署编辑器
-----------------------------------------------------------------

解压 kindeditor-x.x.x.zip 文件，将所有文件上传到您的网站程序目录里，例如：http://您的域名/editor/

.. note::

	您可以根据需求删除以下目录后上传到服务器。

	* asp - ASP程序
	* asp.net - ASP.NET程序
	* php - PHP程序
	* jsp - JSP程序
	* examples - 演示文件

3. 修改HTML页面
-----------------------------------------------------------------

1) 在需要显示编辑器的位置添加textarea输入框。

.. sourcecode:: html

	<textarea id="editor_id" name="content" style="width:700px;height:300px;">
	&lt;strong&gt;HTML内容&lt;/strong&gt;
	</textarea>

.. note::

	* id在当前页面必须是唯一的值。
	* 在textarea里设置HTML内容即可实现编辑，在这里需要注意的是，如果从服务器端程序(ASP、PHP、ASP.NET等)直接显示内容，则必须转换HTML特殊字符(>,<,&,")。具体请参考各语言目录下面的demo.xxx程序，目前支持ASP、ASP.NET、PHP、JSP。
	* 在有些浏览器上不设宽度和高度可能显示有问题，所以最好设一下宽度和高度。宽度和高度可用inline样式设置，也可用 :doc:`option` 设置。

2) 在该HTML页面添加以下脚本。

.. sourcecode:: html

	<script charset="utf-8" src="/editor/kindeditor.js"></script>
	<script charset="utf-8" src="/editor/lang/zh_CN.js"></script>
	<script>
		KindEditor.ready(function(K) {
			window.editor = K.create('#editor_id');
		});
	</script>

.. note ::

	* 第一个参数可用其它CSS选择器，匹配多个textarea时只在第一个元素上加载编辑器。
	* 通过K.create函数的第二个参数，可以对编辑器进行配置，具体参数请参考 :doc:`option` 。

.. sourcecode:: js

	var options = {
		cssPath : '/css/index.css',
		filterMode : true
	};
	var editor = K.create('textarea[name="content"]', options);

4. 获取HTML数据
-----------------------------------------------------------------

.. sourcecode:: js

	// 取得HTML内容
	html = editor.html();

	// 同步数据后可以直接取得textarea的value
	editor.sync();
	html = document.getElementById('editor_id').value; // 原生API
	html = K('#editor_id').val(); // KindEditor Node API
	html = $('#editor_id').val(); // jQuery

	// 设置HTML内容
	editor.html('HTML内容');

.. note ::

	* KindEditor的可视化操作在新创建的iframe上执行，代码模式下的textarea框也是新创建的，所以最后提交前需要执行 :ref:`KEditor.sync` 将HTML数据设置到原来的textarea。
	* KindEditor在默认情况下自动寻找textarea所属的form元素，找到form后onsubmit事件里添加sync函数，所以用form方式提交数据，不需要手动执行sync()函数。
	* KindEditor默认采用白名单过滤方式，可用 :ref:`htmlTags` 参数定义要保留的标签和属性。当然也可以用 :ref:`filterMode` 参数关闭过滤模式，保留所有标签。

.. sourcecode:: js

	// 关闭过滤模式，保留所有标签
	KindEditor.options.filterMode = false;

	KindEditor.ready(function(K)) {
		K.create('#editor_id');
	}
