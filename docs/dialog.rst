弹出窗口(Dialog) API
========================================================

.. contents::
	:depth: 2

.. index:: dialog

.. _K.dialog:

K.dialog(options)
--------------------------------------------------------
创建弹出窗口。

* 参数:
	* object options: 配置信息
* 返回: KDialog
* 继承: KWidget ( :ref:`K.widget` )

示例:

.. sourcecode:: js

	var dialog = K.dialog({
		width : 500,
		title : '测试窗口',
		body : '<div style="margin:10px;"><strong>内容</strong></div>',
		closeBtn : {
			name : '关闭',
			click : function(e) {
				dialog.remove();
			}
		},
		yesBtn : {
			name : '确定',
			click : function(e) {
				alert(this.value);
			}
		},
		noBtn : {
			name : '取消',
			click : function(e) {
				dialog.remove();
			}
		}
	});

