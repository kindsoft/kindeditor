更改编辑器外观
========================================================

1. 添加"example1"风格
--------------------------------------------------------

1) 添加themes/example1/example1.css，在这个文件里定义覆盖default.css里的CSS。

.. sourcecode:: css

	.ke-container-example1 {
		display: block;
		border: 1px solid #CCC;
		background-color: #FFF;
		overflow: hidden;
	}
	.ke-container-example1 .ke-toolbar {
		border-bottom: 1px solid #CCC;
		background-color: #FFF;
		padding: 2px 5px;
		overflow: hidden;
	}
	/* 在这里继续定义其它CSS */

2) 调用编辑器时，引入example1.css，并指定themeType。

.. sourcecode:: html

	<link rel="stylesheet" href="/editor/themes/default/default.css" />
	<link rel="stylesheet" href="/editor/themes/example1/example1.css" />
	<script charset="utf-8" src="/editor/kindeditor.js"></script>
	<script charset="utf-8" src="/editor/lang/zh_CN.js"></script>
	<script>
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('#editor_id', {
				themeType : 'example1'
			});
		});
	</script>
