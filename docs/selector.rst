选择器(Selector) API
========================================================

.. contents::
	:depth: 2

.. index:: query

.. _query:

K.query(expr [, root])
--------------------------------------------------------
根据expr在root范围内查找DOM元素，并返回第一个元素。没找到则返回null。

* 参数:
	* string expr: 选择器表达式
	* element root: 根元素，默认值为document
* 返回: DOM元素

.. sourcecode:: js

	var div = K.query('#id div');
	var span = K.query('span.class', div);

.. note::

	目前仅支持以下表达式:

	* \*: any element
	* E: an element of type E
	* E[foo]: an E element with a "foo" attribute
	* E[foo="bar"]: an E element whose "foo" attribute value is exactly equal to "bar"
	* E.warning: an E element whose class is "warning" (the document language specifies how class is determined)
	* E#myid: an E element with ID equal to "myid"
	* E F: an F element descendant of an E element
	* E > F: an F element child of an E element

参考文档: http://www.w3.org/TR/css3-selectors/

.. index:: queryAll

.. _queryAll:

K.queryAll(expr [, root])
--------------------------------------------------------
根据expr在root范围内查找DOM元素，并返回所有元素，如果没找到则返回空数组。

* 参数:
	* string expr: 选择器表达式
	* element root: 根元素，默认值为document
* 返回: array

示例:

.. sourcecode:: js

	var divArray = K.queryAll('#id div');
	var spanArray = K.queryAll('span.class', div);

