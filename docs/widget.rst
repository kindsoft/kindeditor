Widget API
========================================================

.. contents::
	:depth: 2

.. index:: widget

.. _K.widget:

K.widget(options)
--------------------------------------------------------
创建widget。

* 参数:
	* object options: 配置信息
* 返回: KWidget

示例:

.. sourcecode:: js

	var widget = K.widget({
		z : 100,
		width : 200,
		height : 100,
		html : '<strong>abc</strong>123<strong>abc</strong><strong>abc</strong>',
		css : {
			border : '1px solid #A0A0A0',
			background : '#F0F0F0'
		}
	});

