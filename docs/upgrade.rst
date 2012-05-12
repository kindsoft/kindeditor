3.x升级到4.x版本
========================================================

1. 替换文件
-----------------------------------------------------------------
移除3.x版本文件。

.. sourcecode:: html

	<script charset="utf-8" src="/ke3/kindeditor.js"></script>

添加4.x版本文件。

.. sourcecode:: html

	<script charset="utf-8" src="/ke4/kindeditor.js"></script>
	<script charset="utf-8" src="/ke4/lang/zh_CN.js"></script>

2. 替换javascript代码
-----------------------------------------------------------------

移除3.x版本代码。

.. sourcecode:: html

	<script>
		KE.show({
			id : 'editor_id',
			resizeMode : 2,
			imageUploadJson : '../../php/upload_json.php' // 相对于plugins/image/image.html的路径
		});
	</script>

添加4.x版本代码。

.. sourcecode:: html

	<script>
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('#editor_id', {
				resizeType : 2,
				uploadJson : '../php/upload_json.php' // 相对于当前页面的路径
			});
		});
	</script>

.. note ::

	* 4.x修改过一些参数名，所以3.x的初始化参数不一定直接兼容4.x，具体参数请参考 :doc:`option` 。
	* 4.x通过K.create返回的editor对象调用编辑器API，具体方法请参考 :doc:`editor` 。
	* 4.x插件采用js动态加载机制，uploadJson和fileManagerJson是相对于当前页面的路径，使用相对路径时需要注意。
	* 如果需要在其它函数内调用editor对象，可以将editor对象设置成全局变量。

.. sourcecode:: html

	<script>
		KindEditor.ready(function(K) {
			window.EditorObject = K.create('#editor_id');
		});
		//取得编辑器内容
		function getEditorData() {
			return EditorObject.html();
		}
	</script>



