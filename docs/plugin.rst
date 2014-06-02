添加自定义插件
========================================================

1. 添加"hello"插件
--------------------------------------------------------

1) 添加plugins/hello/hello.js文件。

.. sourcecode:: js

	KindEditor.plugin('hello', function(K) {
		var editor = this, name = 'hello';
		// 点击图标时执行
		editor.clickToolbar(name, function() {
			editor.insertHtml('你好');
		});
	});

2) 定义语言，在页面的<script>标签里添加以下脚本。

.. sourcecode:: js

	KindEditor.lang({
		hello : '你好'
	});

3) 定义工具栏图标的CSS，在页面的<style>标签里添加以下CSS。

.. sourcecode:: css

	.ke-icon-hello {
		background-image: url(../skins/default/default.gif);
		background-position: 0px -672px;
		width: 16px;
		height: 16px;
	}

4) 最后调用编辑器时items数组里添加hello。

.. sourcecode:: js

	K.create('#id', {
		items : ['hello']
	});

完整代码：

.. sourcecode:: html

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8" />
			<title>Hello</title>
			<style>
				.ke-icon-hello {
					background-image: url(../skins/default/default.gif);
					background-position: 0px -672px;
					width: 16px;
					height: 16px;
				}
			</style>
			<link rel="stylesheet" href="../themes/default/default.css" />
			<script charset="utf-8" src="../kindeditor.js"></script>
			<script charset="utf-8" src="../lang/zh-CN.js"></script>
			<script>
				KindEditor.lang({
					hello : '你好'
				});
				KindEditor.ready(function(K) {
					K.create('#id', {
						items : ['hello']
					});
				});
			</script>
		</head>
		<body>
			<textarea id="editor_id" name="content" style="width:700px;height:300px;"></textarea>
		</body>
	</html>