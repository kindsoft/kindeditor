上传按钮(UplaodButton) API
========================================================

.. contents::
	:depth: 2

.. index:: uploadbutton

.. _K.uploadbutton:

K.uploadbutton(options)
--------------------------------------------------------
创建上传按钮。

* 参数:
	* object options: 配置信息
* 返回: KUploadButton

示例:

.. sourcecode:: js

	var uploadbutton = K.uploadbutton({
		button : K('#ke-upload-button')[0],
		fieldName : 'imgFile',
		url : '../php/upload_json.php',
		afterUpload : function(data) {
			if (data.error === 0) {
				alert(data.url);
			} else {
				alert(data.message);
			}
		}
	});
	uploadbutton.fileBox.change(function(e) {
		uploadbutton.submit();
	});