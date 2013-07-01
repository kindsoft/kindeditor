Node API
========================================================

.. contents::
	:depth: 2

.. index:: K

.. _K:

K(expr , root)
--------------------------------------------------------
创建或选取KNode对象，KNode是原生node的封装，KNode对象拥有以下属性和方法。

* 参数:
	* string|node expr: DOM元素、选择器表达式、HTML代码
	* element root: DOM根元素，在root范围内选择DOM元素
* 返回: KNode

示例:

.. sourcecode:: js

	node = K('<div>abc</div>');
	node = K('#id div');
	node = K(document.getElementById('id'));
	firstNode = node[0];

.. index:: length

.. _KNode.length:

length
--------------------------------------------------------
node数量

.. sourcecode:: js

	var length = K('#id div').length;

.. index:: doc

.. _KNode.doc:

doc
--------------------------------------------------------
第一个node的document对象。

.. sourcecode:: js

	var doc = K('#id div').doc;

.. index:: name

.. _KNode.name:

name
--------------------------------------------------------
第一个node的nodeName。

.. index:: type

.. _KNode.type:

type
--------------------------------------------------------
第一个node的nodeType。1: Element, 3: textNode


.. index:: bind

.. _KNode.bind:

bind(type , fn)
--------------------------------------------------------
将指定函数绑定到所有KNode的指定事件上。

* 参数:
	* string type: 事件类型
	* function fn: 回调函数
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id div').bind('click', function() {
		alert(this.nodeName + ': clicked');
	});
	K('#id div').click(function() {
		alert(this.nodeName + ': clicked');
	});

.. index:: unbind

.. _KNode.unbind:

unbind([type , fn])
--------------------------------------------------------
移除已绑定的事件函数。

* 参数:
	* string type: 事件类型
	* function fn: 回调函数
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').unbind('click', functionName); //移除指定的事件函数
	K('#id').unbind('click'); //移除所有click事件函数
	K('#id').unbind(); //移除所有事件函数

.. index:: fire

.. _KNode.fire:

fire(type)
--------------------------------------------------------
执行绑定在第一个node上的事件函数。

* 参数:
	* string type: 事件类型
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').fire('click');
	K('#id').click();

.. index:: hasAttr

.. _KNode.hasAttr:

hasAttr(key)
--------------------------------------------------------
判断第一个node是否拥有指定属性。

* 参数:
	* string key: 属性名
* 返回: boolean

示例:

.. sourcecode:: js

	var bool = K('#id').hasAttr('border');

.. index:: attr

.. _KNode.attr:

attr()
--------------------------------------------------------
取得第一个node的所有属性.

* 参数: 无
* 返回: object

示例:

.. sourcecode:: js

	var attrList = K('#id').attr(); //return key-value data

attr(key)
--------------------------------------------------------
取得第一个node的指定属性.

* 参数:
	* string key: 属性名
* 返回: string

示例:

.. sourcecode:: js

	var border = K('#id').attr('border');

attr(key, val)
--------------------------------------------------------
设置所有node的属性。

* 参数:
	* string key: 属性名
	* string val: 属性值
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id img').attr('border', 1);

attr(obj)
--------------------------------------------------------
设置所有node的多个属性。

* 参数:
	* object obj: key-value数组
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id img').attr({
		'width' : '100px',
		'border' : 1
	});

.. index:: removeAttr

.. _KNode.removeAttr:

removeAttr(key)
--------------------------------------------------------
移除所有node的指定属性.

* 参数:
	* string key: 属性名
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id img').removeAttr('border');

.. index:: get

.. _KNode.get:

get([i])
--------------------------------------------------------
取得原生node，当KNode的length为0时，返回null.

* 参数:
	* int i: offset，默认值为0
* 返回: node

示例:

.. sourcecode:: js

	div1 = K('#id div').get(0);
	div2 = K('#id div').get(1);

.. index:: eq

.. _KNode.eq:

eq(i)
--------------------------------------------------------
将KNode对象转换成length为1的KNode对象。

* 参数:
	* int i: The index of the element in the KNode object.
* 返回: KNode

示例:

.. sourcecode:: js

	K('div').eq(2).addClass('blue');

.. index:: hasClass

.. _KNode.hasClass:

hasClass(cls)
--------------------------------------------------------
判断第一个node是否拥有指定class。

* 参数:
	* string cls: className
* 返回: boolean

示例:

.. sourcecode:: js

	var bool = K('#id').hasClass('class-name');

.. index:: addClass

.. _KNode.addClass:

addClass(cls)
--------------------------------------------------------
将指定className添加到所有node。

* 参数:
	* string cls: className
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').addClass('class-name');

.. index:: removeClass

.. _KNode.removeClass:

removeClass(cls)
--------------------------------------------------------
移除所有node上的指定className。

* 参数:
	* string cls: className
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').removeClass('class-name');

.. index:: html

.. _KNode.html:

html()
--------------------------------------------------------
取得第一个node的innerHTML。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var html = K('#id').html();

html(val)
--------------------------------------------------------
设置所有node的innerHTML。

* 参数:
	* string val: HTML字符串
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').html('<strong>abc</strong>');

.. index:: hasVal

.. _KNode.hasVal:

hasVal()
--------------------------------------------------------
判断第一个node是否拥有value属性。

* 参数: 无
* 返回: boolean

示例:

.. sourcecode:: js

	bool = K('#textarea').hasVal(); //return true
	bool = K('#div').hasVal(); //return false

.. index:: val

.. _KNode.val:

val()
--------------------------------------------------------
取得第一个node的value。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var value = K('#textarea').val();

val(val)
--------------------------------------------------------
设置所有node的value。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	K('#textarea').val('abc');

.. index:: css

.. _KNode.css:

css()
--------------------------------------------------------
取得第一个node的所有CSS.

* 参数: 无
* 返回: object

示例:

.. sourcecode:: js

	var cssList = K('#id').css(); //return key-value data

css(key)
--------------------------------------------------------
取得第一个node的指定CSS.

* 参数:
	* string key: CSS key
* 返回: string

示例:

.. sourcecode:: js

	var padding = K('#id').css('padding');

css(key, val)
--------------------------------------------------------
设置所有node的CSS。

* 参数:
	* string key: CSS key
	* string val: CSS value
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id div').css('border', '1px solid #000');

css(obj)
--------------------------------------------------------
设置所有node的多个CSS。

* 参数:
	* object obj: key-value数组
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id div').css({
		'width' : '100px',
		'height' : '50px',
		'padding' : '10px'
	});

.. index:: width

.. _KNode.width:

width()
--------------------------------------------------------
取得第一个node的宽度(px).

* 参数: 无
* 返回: int

示例:

.. sourcecode:: js

	var width = K('#id').width();

width(val)
--------------------------------------------------------
设置所有node的宽度。

* 参数:
	* string val: 宽度
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id div').width(200);
	K('#id div').width('200px');
	K('#id div').width('100%');

.. index:: height

.. _KNode.height:

height()
--------------------------------------------------------
取得第一个node的高度(px).

* 参数: 无
* 返回: int

示例:

.. sourcecode:: js

	var height = K('#id').height();

height(val)
--------------------------------------------------------
设置所有node的高度。

* 参数:
	* string val: 高度
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id div').height(200);
	K('#id div').height('200px');
	K('#id div').height('100%');

.. index:: opacity

.. _KNode.opacity:

opacity(val)
--------------------------------------------------------
设置所有node的透明度.

* 参数:
	* float val: 透明度，0~1
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').opacity(0.5);

.. index:: data

.. _KNode.data:

data(key)
--------------------------------------------------------
取得已绑定的自定义数据。

* 参数:
	* string key: data key
* 返回: string

示例:

.. sourcecode:: js

	var data = K('#id').data('data_id');

data(key, val)
--------------------------------------------------------
绑定自定义数据。

* 参数:
	* string key: data key
	* string val: data value
* 返回: string

示例:

.. sourcecode:: js

	K('#id').data('abc', 1);

.. index:: pos

.. _KNode.pos:

pos()
--------------------------------------------------------
取得第一个node在整个document上的x坐标和y坐标。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var pos = K('#id').pos();
	var x = pos.x;
	var y = pos.y;

.. index:: clone

.. _KNode.clone:

clone(bool)
--------------------------------------------------------
复制第一个node，并返回第一个node的KNode。

* 参数:
	* boolean bool: true时复制所有子节点，false时只复制父节点
* 返回: 新的KNode

示例:

.. sourcecode:: js

	var newKNode = K('#id').clone();

.. index:: append

.. _KNode.append:

append(expr)
--------------------------------------------------------
element添加一个子节点。

* 参数:
	*  string|node expr: DOM元素、选择器表达式、HTML代码
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').append(divNode);
	K('#id').append('<div class="abc">def</div>');

.. index:: before

.. _KNode.before:

before(expr)
--------------------------------------------------------
node的前面添加一个节点。

* 参数:
	*  string|node expr: DOM元素、选择器表达式、HTML代码
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').before(divNode);
	K('#id').before('<div class="abc">def</div>');

.. index:: after

.. _KNode.after:

after(expr)
--------------------------------------------------------
node的后面添加一个节点。

* 参数:
	*  string|node expr: DOM元素、选择器表达式、HTML代码
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').after(divNode);
	K('#id').after('<div class="abc">def</div>');

.. index:: replaceWith

.. _KNode.replaceWith:

replaceWith(expr)
--------------------------------------------------------
替换node。

* 参数:
	*  string|node expr: DOM元素、选择器表达式、HTML代码
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').replaceWith(divNode);
	K('#id').replaceWith('<div class="abc">def</div>');

.. index:: remove

.. _KNode.remove:

remove([keepChilds])
--------------------------------------------------------
删除node。

* 参数:
	*  boolean keepChilds: 是否保留子节点，true或false，默认值为false
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').remove();

.. index:: show

.. _KNode.show:

show([val])
--------------------------------------------------------
显示element。

* 参数:
	*  string val: display的值，默认值为block
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').show();

.. index:: hide

.. _KNode.hide:

hide()
--------------------------------------------------------
隐藏element。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').hide();

.. index:: outer

.. _KNode.outer:

outer()
--------------------------------------------------------
取得第一个element的outerHTML。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var html = K('#id').outer();

.. index:: isSingle

.. _KNode.isSingle:

isSingle()
--------------------------------------------------------
判断第一个element是否有闭合标签。

* 参数: 无
* 返回: boolean

示例:

.. sourcecode:: js

	if (K('div').isSingle()) {
		console.log('false');
	}

.. index:: isInline

.. _KNode.isInline:

isInline()
--------------------------------------------------------
判断第一个element是不是inline element。

* 参数: 无
* 返回: boolean

示例:

.. sourcecode:: js

	if (K('div').isInline()) {
		console.log('false');
	}

.. index:: isBlock

.. _KNode.isBlock:

isBlock()
--------------------------------------------------------
判断第一个element是不是block element。

* 参数: 无
* 返回: boolean

示例:

.. sourcecode:: js

	if (K('div').isBlock()) {
		console.log('true');
	}

.. index:: contains

.. _KNode.contains:

contains(otherNode)
--------------------------------------------------------
判断第一个element是否包含指定node。

* 参数:
	* node otherNode: 任意节点
* 返回: boolean

示例:

.. sourcecode:: js

	if (K('div#id').contains(K('div#id p')[0])) {
		console.log('true');
	}

.. index:: parent

.. _KNode.parent:

parent()
--------------------------------------------------------
取得第一个node的父节点。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	var parentNode = K('#id').parent();

.. index:: children

.. _KNode.children:

children()
--------------------------------------------------------
取得第一个node的子节点列表。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	K('#id').children().css('color', 'red');

.. index:: first

.. _KNode.first:

first()
--------------------------------------------------------
取得第一个node的第一个子节点。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	var firstNode = K('#id').first();

.. index:: last

.. _KNode.last:

last()
--------------------------------------------------------
取得第一个node的最后一个子节点。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	var lastNode = K('#id').last();

.. index:: index

.. _KNode.index:

index()
--------------------------------------------------------
取得第一个node在父节点中的偏移位置。

* 参数: 无
* 返回: int

示例:

.. sourcecode:: js

	var index = K('div#id p').index();

.. index:: prev

.. _KNode.prev:

prev()
--------------------------------------------------------
取得第一个node的上一个节点。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	var prevNode = K('#id').prev();

.. index:: next

.. _KNode.next:

next()
--------------------------------------------------------
取得第一个node的下一个节点。

* 参数: 无
* 返回: KNode

示例:

.. sourcecode:: js

	var nextNode = K('#id').next();

.. index:: scan

.. _KNode.scan:

scan(fn [, order])
--------------------------------------------------------
遍历第一个node的所有子节点。

* 参数:
	* function fn: 回调函数
	* boolean order: 遍历方向，true为顺序，false为逆序，默认值为true
* 返回: KNode

示例:

.. sourcecode:: js

	K('div#id').scan(function(node) (
		console.log(node);
	));


