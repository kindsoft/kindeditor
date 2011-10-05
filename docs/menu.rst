下拉菜单(Menu) API
========================================================

.. contents::
	:depth: 2

.. index:: menu

.. _K.menu:

K.menu(options)
--------------------------------------------------------
创建下拉菜单。

* 参数:
	* object options: 配置信息
* 返回: KMenu
* 继承: KWidget ( :ref:`K.widget` )

示例:

.. sourcecode:: js

	var menu = K.menu({
		width : 200,
		x : 100,
		y : 200,
		z : 1000,
		centerLineMode : false
	});
	K.each('9px,10px,12px,14px,16px,18px,24px,32px'.split(','), function(i, val) {
		menu.addItem({
			title : '<span style="font-size:' + val + ';">' + val + '</span>',
			click : function() {
				alert(val);
			},
			height : parseInt(val, 10) + 12,
			checked : val === '12px'
		});
	});

