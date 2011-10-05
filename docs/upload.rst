上传文件
========================================================
KindEditor默认提供ASP、ASP.NET、PHP、JSP上传程序，这些程序是演示程序，建议不要直接在实际项目中使用。
如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。

选择程序语言
-----------------------------------------------------------------

.. sourcecode:: js

	// ASP
	KindEditor.ready(function(K) {
		K.create('#textarea_id', {
			uploadJson : '../asp/upload_json.asp',
			fileManagerJson : '../asp/file_manager_json.asp',
			allowFileManager : true
		});
	});
	// ASP.NET
	KindEditor.ready(function(K) {
		K.create('#textarea_id', {
			uploadJson : '../asp.net/upload_json.ashx',
			fileManagerJson : '../asp.net/file_manager_json.ashx',
			allowFileManager : true
		});
	});
	// JSP
	KindEditor.ready(function(K) {
		K.create('#textarea_id', {
			uploadJson : '../jsp/upload_json.jsp',
			fileManagerJson : '../jsp/file_manager_json.jsp',
			allowFileManager : true
		});
	});

.. note::

	具体使用方法请参见各语言(asp、asp.net、php、jsp)目录下的demo.xxx文件。

POST参数
-----------------------------------------------------------------
* imgFile: 文件form名称
* dir: 上传类型，分别为image、flash、media、file 

返回格式(JSON)
-----------------------------------------------------------------

.. sourcecode:: js

	//成功时
	{
		"error" : 0,
		"url" : "http://www.example.com/path/to/file.ext"
	}
	//失败时
	{
		"error" : 1,
		"message" : "错误信息"
	}