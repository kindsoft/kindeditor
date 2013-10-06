编辑器(Editor) API
========================================================

.. contents::
	:depth: 2

.. index:: create

.. _K.create:

K.create(expr [, options])
--------------------------------------------------------
创建编辑器，返回第一个KEditor对象。4.1版本开始expr支持多个textarea，之前版本只在第一个textarea上创建。

创建编辑器后可以用 KindEditor.instances 数组取得已创建的所有KEditor对象。

* 参数:
	* mixed expr: element或选择器
	* object options: :doc:`option`
* 返回: KEditor

示例:

.. sourcecode:: js

	// 1
	// editor 等于 KindEditor.instances[0]
	editor = K.create('textarea[name="content"]');
	editor.html('HTML code');

	// 2
	editor = K.create('#editor_id', {
		filterMode : true,
		langType : 'en'
	});

.. note ::

	4.1.2版本开始expr可以直接传入jQuery对象。

.. index:: remove

.. _K.remove:

K.remove(expr)
--------------------------------------------------------
移除多个编辑器。

* 参数:
	* mixed expr: element或选择器
* 返回: undefined

示例:

.. sourcecode:: js

	// 移除ID为editor_id的编辑器
	K.remove('#editor_id');

	// 移除class为editor-class的编辑器
	K.remove('.editor-class');

.. note ::

	4.1.2版本开始支持。

.. index:: sync

.. _K.sync:

K.sync(expr)
--------------------------------------------------------
将多个编辑器的内容设置到原来的textarea控件里。。

* 参数:
	* mixed expr: element或选择器
* 返回: undefined

示例:

.. sourcecode:: js

	// 同步ID为editor_id的编辑器
	K.sync('#editor_id');

	// 同步class为editor的编辑器
	K.sync('.editor');

.. note ::

	4.1.2版本开始支持。

.. index:: html

.. _K.html:

K.html(expr, val)
--------------------------------------------------------
设置多个编辑器的HTML内容。

* 参数:
	* mixed expr: element或选择器
	* string val: HTML内容
* 返回: undefined

示例:

.. sourcecode:: js

	K.html('#editor_id', '<div>HTML</div>');

.. note ::

	4.1.8版本开始支持。

.. index:: appendHtml

.. _K.appendHtml:

K.appendHtml(expr, val)
--------------------------------------------------------
将指定的HTML内容添加到多个编辑器的最后位置。

* 参数:
	* mixed expr: element或选择器
	* string val: 内容
* 返回: undefined

示例:

.. sourcecode:: js

	K.appendHtml('#editor_id', '<div>HTML</div>');

.. note ::

	4.1.8版本开始支持。

.. index:: insertHtml

.. _K.insertHtml:

K.insertHtml(expr, val)
--------------------------------------------------------
将指定的HTML内容插入到多个编辑器的光标处。

* 参数:
	* mixed expr: element或选择器
	* string val: 内容
* 返回: undefined

示例:

.. sourcecode:: js

	K.insertHtml('#editor_id', '<strong>HTML</strong>');

.. note ::

	4.1.8版本开始支持。

.. index:: remove

.. _KEditor.remove:

remove()
--------------------------------------------------------
移除编辑器。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.remove();

.. index:: html

.. _KEditor.html:

html()
--------------------------------------------------------
取得编辑器的HTML内容。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var html = editor.html();

html(val)
--------------------------------------------------------
设置编辑器的HTML内容。

* 参数:
	* string val: HTML
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.html('<strong>HTML</strong> code');

.. index:: fullHtml

.. _KEditor.fullHtml:

fullHtml()
--------------------------------------------------------
取得完整的HTML内容，HTML包含<html>标签。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var fullHtml = editor.fullHtml();

.. index:: text

.. _KEditor.text:

text()
--------------------------------------------------------
取得编辑器的纯文本内容。(包含img和embed)

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var text = editor.text();

text(val)
--------------------------------------------------------
设置编辑器的内容，直接显示HTML代码。

* 参数:
	* string val: 文本
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.text('<strong>HTML</strong> code');

.. index:: selectedHtml

.. _KEditor.selectedHtml:

selectedHtml()
--------------------------------------------------------
取得当前被选中的HTML内容。

* 参数: 无
* 返回: string

示例:

.. sourcecode:: js

	var html = editor.selectedHtml();

.. index:: count

.. _KEditor.count:

count([mode])
--------------------------------------------------------
取得当前被选中的HTML内容。

* 参数:
	* string mode: 可选参数，默认值为"html"，mode为"html"时取得字数包含HTML代码，mode为"text"时只包含纯文本、IMG、EMBED。
* 返回: Int

示例:

.. sourcecode:: js

	htmlCount = editor.count();
	textCount = editor.count('text');

.. index:: isEmpty

.. _KEditor.isEmpty:

isEmpty()
--------------------------------------------------------
判断编辑器是否有可见内容，比如文本、图片、视频。

* 参数: 无
* 返回: Boolean

示例:

.. sourcecode:: js

	if (editor.isEmpty()) {
		alert('请输入内容。');
	}

.. index:: insertHtml

.. _KEditor.insertHtml:

insertHtml(val)
--------------------------------------------------------
将指定的HTML内容插入到编辑区域里的光标处。

* 参数:
	* string val: HTML
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.insertHtml('<strong>HTML</strong> code');

.. index:: appendHtml

.. _KEditor.appendHtml:

appendHtml(val)
--------------------------------------------------------
将指定的HTML内容添加到编辑区域的最后位置。

* 参数:
	* string val: HTML
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.appendHtml('<strong>HTML</strong> code');

.. index:: focus

.. _KEditor.focus:

focus()
--------------------------------------------------------
编辑器聚焦。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.focus();

.. index:: blur

.. _KEditor.blur:

blur()
--------------------------------------------------------
编辑器失去焦点。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.blur();

.. index:: sync

.. _KEditor.sync:

sync()
--------------------------------------------------------
将编辑器的内容设置到原来的textarea控件里。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.sync();

.. index:: exec

.. _KEditor.exec:

exec(commandName)
--------------------------------------------------------
执行编辑命令，替代document.execCommmand接口。

* 参数:
	* string commandName: 命令名
* 返回: KEditor

目前可用的命令:

======================= ======================= =========================================================================
commandName             描述                      示例
======================= ======================= =========================================================================
bold                    粗体                      editor.exec('bold');
italic                  斜体                      editor.exec('italic');
underline               下划线                     editor.exec('underline');
strikethrough           删除线                     editor.exec('strikethrough');
forecolor               文字颜色                    editor.exec('forecolor', '#333');
hilitecolor             文字背景                    editor.exec('hilitecolor', '#eee');
fontsize                文字大小                    editor.exec('fontsize', '14px');
fontfamily              字体                      editor.exec('fontfamily', 'SimHei');
fontname                字体，fontfamily的别名        editor.exec('fontname', 'SimHei');
removeformat            删除inline样式              editor.exec('removeformat');
inserthtml              插入HTML                  editor.exec('inserthtml', '<strong>HTML</strong>');
hr                      插入水平线                   editor.exec('hr');
print                   弹出打印窗口                  editor.exec('print');
insertimage             插入图片                    editor.exec('insertimage', '1.jpg', 'title', 200, 100, 1, 'right');
createlink              超级链接                    editor.exec('createlink', '1.html', '_blank');
unlink                  取消超级链接                  editor.exec('unlink');
formatblock             段落                      editor.exec('formatblock', '<h1>');
selectall               全选                      editor.exec('selectall');
justifyleft             左对齐                     editor.exec('justifyleft');
justifycenter           居中                      editor.exec('justifycenter');
justifyright            右对齐                     editor.exec('justifyright');
justifyfull             两端对齐                    editor.exec('justifyfull');
insertorderedlist       编号                      editor.exec('insertorderedlist');
insertunorderedlist     项目符号                    editor.exec('insertunorderedlist');
indent                  增加缩进                    editor.exec('indent');
outdent                 减少缩进                    editor.exec('outdent');
subscript               下标                      editor.exec('subscript');
superscript             上标                      editor.exec('superscript');
cut                     剪切                      editor.exec('cut');
copy                    复制                      editor.exec('copy');
paste                   粘贴                      editor.exec('paste');
======================= ======================= =========================================================================

.. index:: lang

.. _KEditor.lang:

lang(name)
--------------------------------------------------------
取得语言。

* 参数:
	* string name: language key
* 返回: string

示例:

.. sourcecode:: js

	str = editor.lang('table'); // return '表格'

.. index:: loadPlugin

.. _KEditor.loadPlugin:

loadPlugin(name , fn)
--------------------------------------------------------
动态加载插件。

* 参数:
	* string name: 插件名
	* function fn: 加载成功后执行的回调函数
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.loadPlugin('table', function() {
		alert('加载成功。');
	});

.. index:: clickToolbar

.. _KEditor.clickToolbar:

clickToolbar(name)
--------------------------------------------------------
执行绑定在工具栏上的点击事件函数。

* 参数:
	* string name: item name
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.clickToolbar('bold'); // 对选中文本进行加粗

clickToolbar(name [, fn])
--------------------------------------------------------
绑定工具栏的点击事件函数。

* 参数:
	* string name: item name
	* function fn: 点击工具栏时执行的回调函数。
* 返回: fn的return value

示例:

.. sourcecode:: js

	editor.clickToolbar('bold', function() {
		editor.exec('bold');
	});

.. index:: addBookmark

.. _KEditor.addBookmark:

addBookmark()
--------------------------------------------------------
将当前数据添加到undo/redo记录里。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.addBookmark();

.. index:: undo

.. _KEditor.undo:

undo()
--------------------------------------------------------
后退。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.undo();

.. index:: redo

.. _KEditor.redo:

redo()
--------------------------------------------------------
撤销后退。(前进)

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.redo();

.. index:: fullscreen

.. _KEditor.fullscreen:

fullscreen([bool])
--------------------------------------------------------
切换全屏模式。

* 参数:
	* Boolean bool: 默认切换(toggle)全屏模式，false时取消全屏，true时变成全屏。
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.fullscreen();

.. index:: readonly

.. _KEditor.readonly:

readonly(isReadonly)
--------------------------------------------------------
设置成只读状态，或取消只读状态。

* 参数:
	* Boolean isReadonly: false时取消只读状态，true时设置成只读状态。
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.readonly(false);

.. index:: createMenu

.. _KEditor.createMenu:

createMenu(options)
--------------------------------------------------------
显示下拉菜单。

* 参数:
	* object options: 初始化参数
* 返回: KMenu ( :doc:`menu` )

示例:

.. sourcecode:: js

	var menu = editor.createMenu({
		name : 'example1',
		width : 150
	});
	menu.addItem({
		title : '红色',
		click : function() {
			alert('red');
		}
	});
	menu.addItem({
		title : '白色',
		click : function() {
			alert('white');
		}
	});

.. index:: hideMenu

.. _KEditor.hideMenu:

hideMenu()
--------------------------------------------------------
隐藏下拉菜单。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.hideMenu();

.. index:: addContextmenu

.. _KEditor.addContextmenu:

addContextmenu(item)
--------------------------------------------------------
添加自定义右键菜单。

* 参数:
	* object item: 请参考 KMenu.addItem(item)的item参数
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.addContextmenu({
		title : 'test',
		click : function() {
			alert('clicked');
		},
		cond : true,
		width : 150,
	});
	// 插入分割线
	editor.addContextmenu({ title : '-' });

.. index:: hideContextmenu

.. _KEditor.hideContextmenu:

hideContextmenu()
--------------------------------------------------------
隐藏自定义右键菜单。

* 参数: 无
* 返回: KEditor

示例:

.. sourcecode:: js

	editor.hideContextmenu();

.. index:: createDialog

.. _KEditor.createDialog:

createDialog(options)
--------------------------------------------------------
显示弹出窗口(dialog)。

* 参数:
	* object options: 初始化参数
* 返回: KDialog ( :doc:`dialog` )

示例:

.. sourcecode:: js

	var dialog = editor.createDialog({
		name : 'about',
		width : 300,
		title : self.lang('about'),
		body : '<div style="margin:20px;">Hello</div>'
	});

.. index:: hideDialog

.. _KEditor.hideDialog:

hideDialog()
--------------------------------------------------------
隐藏弹出窗口(dialog)。

* 参数: 无
* 返回: KMenu

示例:

.. sourcecode:: js

	editor.hideDialog();