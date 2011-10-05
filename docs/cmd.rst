Command API
========================================================

.. contents::
	:depth: 2

.. index:: cmd

.. _K.cmd:

K.cmd(doc)
--------------------------------------------------------
创建KCmd对象，KCmd用于操作可视化编辑区域的DOM。

* 参数:
	* document doc: document或KRange ( :doc:`range` )
* 返回: KCmd

示例:

.. sourcecode:: js

	var cmd = K.cmd(document);
	cmd.bold();
	cmd.wrap('<span style="color:red;"></span>');
	cmd.remove({
		span : '*',
		div : 'class,border'
	});

.. index:: doc

.. _KCmd.doc:

doc
--------------------------------------------------------
document对象。

.. index:: win

.. _KCmd.win:

win
--------------------------------------------------------
window对象。

.. index:: sel

.. _KCmd.sel:

sel
--------------------------------------------------------
原生selection对象。

.. index:: range

.. _KCmd.range:

range
--------------------------------------------------------
KRange对象 ( :doc:`range` )

.. index:: selection

.. _KCmd.selection:

selection([forceReset])
--------------------------------------------------------
根据当前选中状态，重新设置range。

* 参数:
	* Boolean forceReset: 默认值为false，值为true时如果当前没有选中信息，自动选择文档的最后位置，
* 返回: KCmd

示例:

.. sourcecode:: js

	cmd.selection();

.. index:: select

.. _KCmd.select:

select()
--------------------------------------------------------
选中range。

* 参数: 无
* 返回: KCmd

示例:

.. sourcecode:: js

	cmd.select();

.. index:: wrap

.. _KCmd.wrap:

wrap(val)
--------------------------------------------------------
用指定element围住range。

* 参数:
	* string|node val: DOM元素、HTML代码
* 返回: KCmd

示例:

.. sourcecode:: js

	cmd.wrap('<strong></strong>');

.. index:: split

.. _KCmd.split:

split(isStart , map)
--------------------------------------------------------
根据map规则分割range的开始位置或结束位置。

* 参数:
	* boolean isStart: true或false
	* object map: 规则
* 返回: KCmd

示例:

.. sourcecode:: js

	cmd.split(true, {
		span : '*',
		div : 'class,border'
	});

.. index:: remove

.. _KCmd.remove:

remove(map)
--------------------------------------------------------
根据map规则删除range中的element或attribute。

* 参数:
	* object map: 规则
* 返回: KCmd

示例:

.. sourcecode:: js

	cmd.remove({
		span : '*',
		div : 'class,border'
	});

.. index:: commonAncestor

.. _KCmd.commonAncestor:

commonAncestor(tagName)
--------------------------------------------------------
根据map规则取得range的共同祖先。

* 参数:
	* string tagName: 规则
* 返回: KNode ( :doc:`node` )

示例:

.. sourcecode:: js

	var knode = cmd.commonAncestor('table');

.. index:: state

.. _KCmd.state:

state(commandName)
--------------------------------------------------------
Determines whether the given command has been executed on the current selection.

* 参数:
	* string commandName: 命令名
* 返回: boolean

.. note::

	Reference: https://developer.mozilla.org/en/Midas

示例:

.. sourcecode:: js

	bool = cmd.state('bold');

.. index:: val

.. _KCmd.val:

val(commandName)
--------------------------------------------------------
Determines the current value of the document, range, or current selection for the given command.

* 参数:
	* string commandName: 命令名
* 返回: string

示例:

.. sourcecode:: js

	fontSize = cmd.val('fontsize');

.. note::

	目前只支持以下命令:
	* fontfamily (fontname)
	* formatblock
	* forecolor
	* hilitecolor

.. index:: bold

.. _KCmd.bold:

bold()
--------------------------------------------------------
粗体

* 参数: 无
* 返回: KCmd

.. index:: italic

.. _KCmd.italic:

italic()
--------------------------------------------------------
斜体

* 参数: 无
* 返回: KCmd

.. index:: underline

.. _KCmd.underline:

underline()
--------------------------------------------------------
下划线

* 参数: 无
* 返回: KCmd

.. index:: strikethrough

.. _KCmd.strikethrough:

strikethrough()
--------------------------------------------------------
删除线

* 参数: 无
* 返回: KCmd

.. index:: forecolor

.. _KCmd.forecolor:

forecolor(val)
--------------------------------------------------------
文字颜色

* 参数:
	* string val: 颜色
* 返回: KCmd

.. index:: hilitecolor

.. _KCmd.hilitecolor:

hilitecolor(val)
--------------------------------------------------------
文字背景

* 参数:
	* string val: 颜色
* 返回: KCmd

.. index:: fontsize

.. _KCmd.fontsize:

fontsize(val)
--------------------------------------------------------
文字大小

* 参数:
	* string val: 文字大小
* 返回: KCmd

.. index:: fontfamily

.. _KCmd.fontfamily:

fontfamily(val)
--------------------------------------------------------
字体

* 参数:
	* string val: 字体
* 返回: KCmd

.. index:: fontname

.. _KCmd.fontname:

fontname(val)
--------------------------------------------------------
字体， :ref:`KCmd.fontfamily` 的别名。

* 参数:
	* string val: 字体
* 返回: KCmd

.. index:: removeformat

.. _KCmd.removeformat:

removeformat()
--------------------------------------------------------
删除inline样式

* 参数: 无
* 返回: KCmd

.. index:: inserthtml

.. _KCmd.inserthtml:

inserthtml(val)
--------------------------------------------------------
插入HTML

* 参数:
	* string val: HTML
* 返回: KCmd

.. index:: hr

.. _KCmd.hr:

hr()
--------------------------------------------------------
插入水平线

* 参数: 无
* 返回: KCmd

.. index:: print

.. _KCmd.print:

print()
--------------------------------------------------------
弹出打印窗口

* 参数: 无
* 返回: KCmd

.. index:: insertimage

.. _KCmd.insertimage:

insertimage(url , title , width , height , border , align)
-----------------------------------------------------------------------
插入图片

* 参数:
	* string url: 图片URL
	* string title: 图片alt
	* int width: 图片宽度
	* int height: 图片高度
	* int border: 图片边框
	* string align: 对齐方式
* 返回: KCmd

.. index:: createlink

.. _KCmd.createlink:

createlink(url , target)
--------------------------------------------------------
超级链接

* 参数:
	* string url: URL
	* string target: 打开方式
* 返回: KCmd

.. index:: unlink

.. _KCmd.unlink:

unlink()
--------------------------------------------------------
取消超级链接

* 参数: 无
* 返回: KCmd

.. index:: formatblock

.. _KCmd.formatblock:

formatblock(val)
--------------------------------------------------------
段落

* 参数:
	* string val: 段落标签
* 返回: KCmd

.. index:: selectall

.. _KCmd.selectall:

selectall()
--------------------------------------------------------
全选

* 参数: 无
* 返回: KCmd

.. index:: justifyleft

.. _KCmd.justifyleft:

justifyleft()
--------------------------------------------------------
左对齐

* 参数: 无
* 返回: KCmd

.. index:: justifycenter

.. _KCmd.justifycenter:

justifycenter()
--------------------------------------------------------
居中

* 参数: 无
* 返回: KCmd

.. index:: justifyright

.. _KCmd.justifyright:

justifyright()
--------------------------------------------------------
右对齐

* 参数: 无
* 返回: KCmd

.. index:: justifyfull

.. _KCmd.justifyfull:

justifyfull()
--------------------------------------------------------
两端对齐

* 参数: 无
* 返回: KCmd

.. index:: insertorderedlist

.. _KCmd.insertorderedlist:

insertorderedlist()
--------------------------------------------------------
编号

* 参数: 无
* 返回: KCmd

.. index:: insertunorderedlist

.. _KCmd.insertunorderedlist:

insertunorderedlist()
--------------------------------------------------------
项目符号

* 参数: 无
* 返回: KCmd

.. index:: indent

.. _KCmd.indent:

indent()
--------------------------------------------------------
增加缩进

* 参数: 无
* 返回: KCmd

.. index:: outdent

.. _KCmd.outdent:

outdent()
--------------------------------------------------------
减少缩进

* 参数: 无
* 返回: KCmd

.. index:: subscript

.. _KCmd.subscript:

subscript()
--------------------------------------------------------
下标

* 参数: 无
* 返回: KCmd

.. index:: superscript

.. _KCmd.superscript:

superscript()
--------------------------------------------------------
上标

* 参数: 无
* 返回: KCmd

.. index:: cut

.. _KCmd.cut:

cut()
--------------------------------------------------------
剪切

* 参数: 无
* 返回: KCmd

.. index:: copy

.. _KCmd.copy:

copy()
--------------------------------------------------------
复制

* 参数: 无
* 返回: KCmd

.. index:: paste

.. _KCmd.paste:

paste()
--------------------------------------------------------
粘贴

* 参数: 无
* 返回: KCmd
