基础(Base) API
========================================================

.. contents::
	:depth: 2

.. index:: VERSION

.. _VERSION:

K.VERSION
--------------------------------------------------------
当前KindEditor的版本号。

.. note::

	当前浏览器的版本号为 :ref:`V` 。

.. index:: IE

.. _IE:

K.IE
--------------------------------------------------------
当前浏览器内核为IE时true，否则false。

.. index:: GECKO

.. _GECKO:

K.GECKO
--------------------------------------------------------
当前浏览器内核为Gecko（Firefox）时true，否则false。

.. index:: WEBKIT

.. _WEBKIT:

K.WEBKIT
--------------------------------------------------------
当前浏览器内核为Webkit（Safari、Chrome）时true，否则false。

.. index:: OPERA

.. _OPERA:

K.OPERA
--------------------------------------------------------
当前浏览器内核为Opera时true，否则false。

.. index:: MOBILE

.. _MOBILE:

K.MOBILE
--------------------------------------------------------
当前浏览器为移动设备上的浏览器时true，否则false。

.. index:: QUIRKS

.. _QUIRKS:

K.QUIRKS
--------------------------------------------------------
true时怪异模式，false时标准模式。

.. index:: V

.. _V:

K.V
--------------------------------------------------------
当前浏览器的版本号。

.. index:: TIME

.. _TIME:

K.TIME
--------------------------------------------------------
加载JS时的时间。

.. index:: isArray

.. _isArray:

K.isArray(val)
--------------------------------------------------------
判断一个变量是否数组。

* 参数:
	* mixed val: 目标变量
* 返回: 当变量为数组时返回true，否则返回false。

示例:

.. sourcecode:: js

	bool = K.isArray([1, 2, 3]); //返回true
	bool = K.isArray({one : 1}); //返回false

.. index:: isFunction

.. _isFunction:

K.isFunction(val)
--------------------------------------------------------
判断一个变量是不是函数。

* 参数:
	* mixed val: 目标变量
* 返回: 当变量为函数时返回true，否则返回false。

示例:

.. sourcecode:: js

	bool = K.isFunction(function () { }); //返回true
	bool = K.isFunction({}); //返回false

.. index:: inArray

.. _inArray:

K.inArray(val , arr)
--------------------------------------------------------
查找一个变量在一个数组中第一次出现的索引位置。

* 参数:
	* mixed val: 任意变量
	* array arr: 数组
* 返回: 返回第一次出现的索引位置，如果没找到，则返回-1。

示例:

.. sourcecode:: js

	index = K.inArray(2, [1, 2, 3]); //返回1
	index = K.inArray(1, [1, 2, 3]); //返回0
	index = K.inArray(10, [1, 2, 3]); //返回-1

.. index:: each

.. _each:

K.each(obj , fn)
--------------------------------------------------------
遍历一个对象或数组。

* 参数:
	* object|array obj: 目标对象或数组
	* function fn: 回调函数，回调函数的第一个参数为key，第二个参数为value。
* 返回: 无

示例:

.. sourcecode:: js

	//遍历数组
	K.each([1, 2, 3], function (i) {
		console.log(i + ':' + this);
	});
	//遍历对象
	K.each({one : 1, two : 2}, function (key, val) {
		console.log(key + ':' + val);
	});

.. index:: trim

.. _trim:

K.trim(str)
--------------------------------------------------------
清除字符串两边的空白。

* 参数:
	* string str: 目标字符串
* 返回: string

示例:

.. sourcecode:: js

	var str = K.trim(' abc '); //返回"abc"

.. index:: inString

.. _inString:

K.inString(val , str [, delimiter])
--------------------------------------------------------
判断一个字符串是否包含在目标字符串里。

* 参数:
	* string val: 要判断的字符串
	* string str: 用delimiter分隔的目标字符串
	* string delimiter: 分隔符，默认值为逗号(,)。
* 返回: boolean

示例:

.. sourcecode:: js

	bool = K.inString('aaa', 'abc,aaa,bbb,ccc'); //返回true
	bool = K.inString('aaa', 'abc aaa bbb ccc', ' '); //返回true

.. index:: addUnit

.. _addUnit:

K.addUnit(val [, unit])
--------------------------------------------------------
一个数字后面添加指定字符串，如果val不是数字则返回原值。

* 参数:
	* string val: 任意数字或字符串
	* string str: 单位，默认值为px
* 返回: string

示例:

.. sourcecode:: js

	width = K.addUnit(100); //返回"100px"
	width = K.addUnit('100px'); //返回"100px"
	width = K.addUnit('80%'); //返回"80%"
	width = K.addUnit(80, '%'); //返回"80%"
	width = K.addUnit(''); //返回""
	width = K.addUnit(null); //返回null

.. index:: removeUnit

.. _removeUnit:

K.removeUnit(val)
--------------------------------------------------------
从一个字符串中提取数字，如果该字符串中没有数字则返回0。

* 参数:
	* int|string val: 任意字符串
* 返回: int

示例:

.. sourcecode:: js

	width = K.removeUnit('100px'); //返回100
	width = K.removeUnit(''); //返回0
	width = K.removeUnit(null); //返回0

.. index:: escape

.. _escape:

K.escape(val)
--------------------------------------------------------
将特殊字符转换成HTML entities。

* 参数:
	* string val: 任意字符串
* 返回: string

示例:

.. sourcecode:: js

	var str = K.escape('<div id="abc">&</div>'); //返回"&lt;div id=&quot;abc&quot;&gt;&amp;&lt;/div&gt;"

.. index:: unescape

.. _unescape:

K.unescape(val)
--------------------------------------------------------
将特殊HTML entities转换成字符。

* 参数:
	* string val: 任意字符串
* 返回: string

示例:

.. sourcecode:: js

	var str = K.unescape('&lt;div id=&quot;abc&quot;&gt;&amp;&lt;/div&gt;'); //返回"<div id="abc">&</div>"

.. index:: toCamel

.. _toCamel:

K.toCamel(val)
--------------------------------------------------------
将to-camel格式的字符串转换成toCamel格式。

* 参数:
	* string val:
* 返回: string

示例:

.. sourcecode:: js

	str = K.toCamel('font-weight'); //返回"fontWeight"

.. index:: toHex

.. _toHex:

K.toHex(val)
--------------------------------------------------------
将任意字符串中的RGB颜色转换成16进制颜色。

* 参数:
	* string val: 包含RGB颜色的字符串
* 返回: string 16进制颜色

示例:

.. sourcecode:: js

	var hex = K.toHex('rgb(0, 0, 0)'); //返回"#000000"

.. index:: toMap

.. _toMap:

K.toMap(val [, delimiter])
--------------------------------------------------------
将一个字符串或数字转换成key-value对象。

* 参数:
	* string|array val: 字符串或者数组，字符串时用delimiter分隔的字符串
	* string delimiter: 分隔符，当val为字符串时有效，默认值为逗号(,)
* 返回: object

示例:

.. sourcecode:: js

	map = K.toMap('abc,aaa,bbb'); //返回{abc : true, aaa : true, bbb : true}
	map = K.toMap('abc-aaa-bbb', '-'); //返回{abc : true, aaa : true, bbb : true}
	map = K.toMap(['abc', 'aaa', 'bbb']); //返回{abc : true, aaa : true, bbb : true}

.. index:: toArray

.. _toArray:

K.toArray(obj [, offset])
--------------------------------------------------------
将一个数组风格对象转换成真正的数组。

* 参数:
	* object obj: 任意对象
* 返回: array

示例:

.. sourcecode:: js

	var arr = K.toArray(document.getElementsByTagName('div'));

.. index:: undef

.. _undef:

K.undef(val , defaultVal)
--------------------------------------------------------
当val为undefined时返回defaultVal，否则返回val。

* 参数:
	* mixed val: 任意变量
* 返回: val或defaultVal

示例:

.. sourcecode:: js

	val = K.undef(1, 0); //返回1
	var obj = {};
	val = K.undef(obj.aaa, 0); //返回0

.. index:: invalidUrl

.. _invalidUrl:

K.invalidUrl(val)
--------------------------------------------------------
判断URL或路径是否合法。

* 参数:
	* string val: URL或路径
* 返回: boolean

示例:

.. sourcecode:: js

	val = K.invalidUrl('abc<">.html'); //返回true
	val = K.invalidUrl('abc.html'); //返回false

.. index:: addParam

.. _addParam:

K.addParam(url, param)
--------------------------------------------------------
URL添加GET参数，拼接时自动判断连接字符(&或?)。

* 参数:
	* string url: URL
	* string param: GET参数
* 返回: boolean

示例:

.. sourcecode:: js

	url = K.addParam('http://www.example.com/test.php', 'abc=123');
	url = K.addParam('http://www.example.com/test.php?cde=456', 'abc=123');

.. index:: extend

.. _extend:

K.extend(fn , proto)
--------------------------------------------------------
创建class。

* 参数:
	* function fn: Function
	* object proto: fn的prototype
* 返回: undefined

示例:

.. sourcecode:: js

	function Animal() {
		this.init();
	}
	K.extend(Animal, {
		init : function() {
			console.log('init animal.');
		},
		run : function() {
			console.log('animal is running.');
		}
	});
	var animal = new Animal();
	animal.run();

K.extend(child , parent , proto)
--------------------------------------------------------
继承class。

* 参数:
	* function child: 子类
	* function parent: 父类
	* object proto: 子类的prototype
* 返回: undefined

示例:

.. sourcecode:: js

	// create Animal class
	function Animal(name) {
		this.init(name);
	}
	K.extend(Animal, {
		init : function(name) {
			this.name = name;
		},
		run : function() {
			console.log(this.name + ' is running.');
		}
	});
	// create Cat class
	function Cat(name, age) {
		this.init(name, age);
	}
	K.extend(Cat, Animal, {
		init : function(name, age) {
			Cat.parent.init.call(this, name);
			this.age = age;
		}
	});
	var myCat = new Cat('Tony', 5);
	console.log(myCat.name); // print 'Tony'
	console.log(myCat.age); // print 5
	myCat.run(); // print 'Tony is running.'

.. index:: json

.. _json:

K.json(text)
--------------------------------------------------------
将JSON字符串转换成JSON对象。

* 参数:
	* string text: JSON字符串
* 返回: object JSON对象

示例:

.. sourcecode:: js

	var obj = K.json('{"a", 0}'); //返回{a : 0}


