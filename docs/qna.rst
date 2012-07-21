常见问题
========================================================

.. contents::
	:depth: 2

编辑器好像是UTF-8编码的，可以在GB2312页面上使用吗？
--------------------------------------------------------
可以使用。有两种方法，一种方法是引入kindeditor.js文件时将script的charset属性设置成utf-8。

还有一种方法是直接将html/js/css文件编码都转换成GB2312编码（用Notepad++、editPlus等文本编辑器就可以转换编码），不过转换格式后升级比较困难，建议使用第一种方法。

.. sourcecode:: html

	<script charset="utf-8" src="/editor/kindeditor.js"></script>

我取不到编辑器数据，直接取得textarea的value也没用。
--------------------------------------------------------
KindEditor的可视化操作在新创建的iframe上执行，代码模式下的textarea框也是新创建的，所以最后提交前需要执行 :ref:`KEditor.sync` 将HTML数据设置到原来的textarea。

KindEditor在默认情况下自动寻找textarea所属的form元素，找到form后onsubmit事件里添加editor.sync()函数，所以用form方式提交数据，不需要手动执行editor.sync()函数。

.. sourcecode:: js

	// 将编辑器的HTML数据同步到textarea
	editor.sync();

为什么有些标签被过滤？
--------------------------------------------------------
KindEditor默认采用白名单过滤方式，可用 :ref:`htmlTags` 参数定义要保留的标签和属性。当然也可以用 :ref:`filterMode` 参数关闭过滤模式，保留所有标签。

.. sourcecode:: js

	// 关闭过滤模式，保留所有标签
	KindEditor.options.filterMode = false;

	KindEditor.ready(function(K)) {
		K.create('#editor_id');
	}
