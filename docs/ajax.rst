Ajax API
========================================================

.. contents::
	:depth: 2

.. index:: loadScript

.. _loadScript:

K.loadScript(url [, fn])
--------------------------------------------------------
加载JavaScript文件。

* 参数:
	* string url: JavaScript URL
	* function fn: 回调函数
* 返回: undefined

示例:

.. sourcecode:: js

	K.loadScript('test.js', function() {
		console.log('ok');
	});

.. index:: loadStyle

.. _loadStyle:

K.loadStyle(url)
--------------------------------------------------------
加载CSS文件。

* 参数:
	* string url: CSS URL
* 返回: undefined

示例:

.. sourcecode:: js

	K.loadStyle('test.css');

.. index:: ajax

.. _ajax:

K.ajax(url [, fn , method , data])
--------------------------------------------------------
GET或POST请求。

* 参数:
	* string url: JavaScript URL
	* function fn: 回调函数
	* string method: "GET"或"POST"，默认值为"GET"
	* object data: POST数据，key-value格式
* 返回: undefined

示例:

.. sourcecode:: js

	//GET
	K.ajax('test.php', function(data) {
		console.log(data);
	});
	//POST
	K.ajax('test.php', function(data) {
		console.log(data);
	}, 'POST', {
		aa : 1,
		bb : 2
	});
