取色器(ColorPicker) API
========================================================

.. contents::
	:depth: 2

.. index:: colorpicker

.. _K.colorpicker:

K.colorpicker(options)
--------------------------------------------------------
创建取色器。

* 参数:
	* object options: 配置信息
* 返回: KColorPicker
* 继承: KWidget ( :ref:`K.widget` )

示例:

.. sourcecode:: js

	var colorpicker = K.colorpicker({
		x : 100,
		y : 200,
		z : 1000,
		selectedColor : 'default',
		click : function(color) {
			alert(color);
		}
	});
