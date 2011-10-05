事件(Event) API
========================================================

.. contents::
	:depth: 2

.. index:: ctrl

.. _ctrl:

K.ctrl(el , key, fn)
--------------------------------------------------------
将指定函数绑定到ctrl + [key]组合键事件上。

* 参数:
	* element el: DOM元素
	* int|string key: 键名
	* function fn: 回调函数
* 返回: 无

示例:

.. sourcecode:: js

	K.ctrl(document.body, 'Z', function() {
		alert('ctrl + Z');
	});
	K.ctrl(document.body, 13, function() {
		alert('ctrl + enter');
	});	

.. index:: ready

.. _ready:

K.ready(fn)
--------------------------------------------------------
将指定函数绑定到DOM加载完成事件(DOMContentLoaded)上。

* 参数:
	* function fn: 回调函数
* 返回: 无

.. sourcecode:: js

	K.ready(function() {
		alert('DOM loaded');
	});





