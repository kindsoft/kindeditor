编辑器初始化参数
========================================================

.. contents::
	:depth: 2

.. index:: width

.. _width:

width
--------------------------------------------------------
编辑器的宽度，可以设置px或%，比textarea输入框样式表宽度优先度高。

* 数据类型: String
* 默认值: textarea输入框的宽度

示例:

.. sourcecode:: js

	K.create('#id', {
		width : '700px'
	});

.. index:: height

.. _height:

height
--------------------------------------------------------
编辑器的高度，只能设置px，比textarea输入框样式表高度优先度高。

* 数据类型: String
* 默认值: textarea输入框的高度

.. index:: minWidth

.. _minWidth:

minWidth
--------------------------------------------------------
指定编辑器最小宽度，单位为px。

* 数据类型: Int
* 默认值: 650

.. index:: minHeight

.. _minHeight:

minHeight
--------------------------------------------------------
指定编辑器最小高度，单位为px。

* 数据类型: Int
* 默认值: 100

.. index:: items

.. _items:

items
--------------------------------------------------------
配置编辑器的工具栏，其中"/"表示换行，"|"表示分隔符。

* 数据类型: Array
* 默认值:

.. sourcecode:: js

	[
		'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
		'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
		'anchor', 'link', 'unlink', '|', 'about'
	]

==========================	=====================
source						HTML代码
preview						预览
undo						后退
redo						前进
cut							剪切
copy						复制
paste						粘贴
plainpaste					粘贴为无格式文本
wordpaste					从Word粘贴
selectall					全选
justifyleft					左对齐
justifycenter				居中
justifyright				右对齐
justifyfull					两端对齐
insertorderedlist			编号
insertunorderedlist			项目符号
indent						增加缩进
outdent						减少缩进
subscript					下标
superscript					上标
formatblock					段落
fontname					字体
fontsize					文字大小
forecolor					文字颜色
hilitecolor					文字背景
bold						粗体
italic						斜体
underline					下划线
strikethrough				删除线
removeformat				删除格式
image						图片
flash						Flash
media						视音频
table						表格
hr							插入横线
emoticons					插入表情
link						超级链接
unlink						取消超级链接
fullscreen					全屏显示
about						关于
print						打印
code						插入程序代码
map							Google地图
baidumap					百度地图
lineheight					行距
clearhtml					清理HTML代码
pagebreak					插入分页符
quickformat					一键排版
insertfile					插入文件
template					插入模板
anchor						插入锚点
==========================	=====================

.. index:: noDisableItems

.. _noDisableItems:

noDisableItems
--------------------------------------------------------
:ref:`designMode` 为false时，要保留的工具栏图标。

* 数据类型: Array
* 默认值: ['source', 'fullscreen']

.. index:: filterMode

.. _filterMode:

filterMode
--------------------------------------------------------
true时根据 :ref:`htmlTags` 过滤HTML代码，false时允许输入任何代码。

* 数据类型: Boolean
* 默认值: true

.. note::

	4.1.1版本开始默认值为true。

.. index:: htmlTags

.. _htmlTags:

htmlTags
--------------------------------------------------------
指定要保留的HTML标记和属性。Object的key为HTML标签名，value为HTML属性数组，"."开始的属性表示style属性。

* 数据类型: Object
* 默认值:

.. sourcecode:: js

	{
		font : ['color', 'size', 'face', '.background-color'],
		span : [
			'.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
		],
		div : [
			'align', '.border', '.margin', '.padding', '.text-align', '.color',
			'.background-color', '.font-size', '.font-family', '.font-weight', '.background',
			'.font-style', '.text-decoration', '.vertical-align', '.margin-left'
		],
		table: [
			'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
			'.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
			'.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
			'.width', '.height', '.border-collapse'
		],
		'td,th': [
			'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
			'.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
			'.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
		],
		a : ['href', 'target', 'name'],
		embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
		img : ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
		'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
			'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
		],
		pre : ['class'],
		hr : ['class', '.page-break-after'],
		'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : []
	}

.. index:: wellFormatMode

.. _wellFormatMode:

wellFormatMode
--------------------------------------------------------
true时美化HTML数据。

* 数据类型: Boolean
* 默认值: true

.. index:: resizeType

.. _resizeType:

resizeType
--------------------------------------------------------
2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。

* 数据类型: Int
* 默认值: 2

.. index:: themeType

.. _themeType:

themeType
--------------------------------------------------------
指定主题风格，可设置"default"、"simple"，指定simple时需要引入simple.css。

* 数据类型: String
* 默认值: "default"

示例:

.. sourcecode:: html

	<link rel="stylesheet" href="../themes/default/default.css" />
	<link rel="stylesheet" href="../themes/simple/simple.css" />
	<script charset="utf-8" src="../kindeditor.js"></script>
	<script charset="utf-8" src="../lang/zh-CN.js"></script>
	<script>
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('#editor_id', {
				themeType : 'simple'
			});
		});
	</script>

.. index:: langType

.. _langType:

langType
--------------------------------------------------------
指定语言，可设置"en"、"zh-CN"，需要引入lang/[langType].js。

* 数据类型: String
* 默认值: "zh-CN"

示例:

.. sourcecode:: html

	<link rel="stylesheet" href="../themes/default/default.css" />
	<script charset="utf-8" src="../kindeditor.js"></script>
	<script charset="utf-8" src="../lang/en.js"></script>
	<script>
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('#editor_id', {
				langType : 'en'
			});
		});
	</script>

.. index:: designMode

.. _designMode:

designMode
--------------------------------------------------------
可视化模式或代码模式

* 数据类型: Boolean
* 默认值: true

.. index:: fullscreenMode

.. _fullscreenMode:

fullscreenMode
--------------------------------------------------------
true时加载编辑器后变成全屏模式。

* 数据类型: Boolean
* 默认值: false

.. index:: basePath

.. _basePath:

basePath
--------------------------------------------------------
指定编辑器的根目录路径。

* 数据类型: String
* 默认值: 根据kindeditor.js文件名自动获取

.. index:: themesPath

.. _themesPath:

themesPath
--------------------------------------------------------
指定编辑器的themes目录路径。

* 数据类型: String
* 默认值: basePath + 'themes/'

.. index:: pluginsPath

.. _pluginsPath:

pluginsPath
--------------------------------------------------------
指定编辑器的plugins目录路径。

* 数据类型: String
* 默认值: basePath + 'plugins/'

.. index:: langPath

.. _langPath:

langPath
--------------------------------------------------------
指定编辑器的lang目录路径。

* 数据类型: String
* 默认值: basePath + 'lang/'

.. index:: minChangeSize

.. _minChangeSize:

minChangeSize
--------------------------------------------------------
undo/redo文字输入最小变化长度，当输入的文字变化小于这个长度时不会添加到undo记录里。

* 数据类型: String
* 默认值: 5

.. index:: urlType

.. _urlType:

urlType
--------------------------------------------------------
改变站内本地URL，可设置""、"relative"、"absolute"、"domain"。空为不修改URL，relative为相对路径，absolute为绝对路径，domain为带域名的绝对路径。

* 数据类型: String
* 默认值: ""

.. index:: newlineTag

.. _newlineTag:

newlineTag
--------------------------------------------------------
设置回车换行标签，可设置"p"、"br"。

* 数据类型: String
* 默认值: "p"

.. index:: pasteType

.. _pasteType:

pasteType
--------------------------------------------------------
设置粘贴类型，0:禁止粘贴, 1:纯文本粘贴, 2:HTML粘贴

* 数据类型: Int
* 默认值: 2

.. index:: dialogAlignType

.. _dialogAlignType:

dialogAlignType
--------------------------------------------------------
设置弹出框(dialog)的对齐类型，可设置""、"page"，指定page时按当前页面居中，指定空时按编辑器居中。

* 数据类型: String
* 默认值: "page"

.. index:: shadowMode

.. _shadowMode:

shadowMode
--------------------------------------------------------
true时弹出层(dialog)显示阴影。

* 数据类型: Boolean
* 默认值: true

.. index:: zIndex

.. _zIndex:

zIndex
--------------------------------------------------------
指定弹出层的基准z-index。

* 数据类型: Int
* 默认值: 811213

.. index:: useContextmenu

.. _useContextmenu:

useContextmenu
--------------------------------------------------------
true时使用右键菜单，false时屏蔽右键菜单。

* 数据类型: Boolean
* 默认值: true

.. index:: syncType

.. _syncType:

syncType
--------------------------------------------------------
同步数据的方式，可设置""、"form"，值为form时提交form时自动同步，空时不会自动同步。

* 数据类型: String
* 默认值: "form"

.. index:: indentChar

.. _indentChar:

indentChar
--------------------------------------------------------
:ref:`wellFormatMode` 为true时，HTML代码缩进字符。

* 数据类型: String
* 默认值: "\\t"

.. index:: cssPath

.. _cssPath:

cssPath
--------------------------------------------------------
指定编辑器iframe document的CSS文件，用于设置可视化区域的样式。

* 数据类型: String或Array
* 默认值: 空

.. index:: cssData

.. _cssData:

cssData
--------------------------------------------------------
指定编辑器iframe document的CSS数据，用于设置可视化区域的样式。

* 数据类型: String
* 默认值: 空

.. index:: bodyClass

.. _bodyClass:

bodyClass
--------------------------------------------------------
指定编辑器iframe document body的className。

* 数据类型: String
* 默认值: "ke-content"

.. index:: colorTable

.. _colorTable:

colorTable
--------------------------------------------------------
指定取色器里的颜色。

* 数据类型: Array
* 默认值:

.. sourcecode:: js

	[
		['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
		['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
		['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
		['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
	]

.. index:: afterCreate

.. _afterCreate:

afterCreate
--------------------------------------------------------
设置编辑器创建后执行的回调函数。

* 数据类型: Function
* 默认值: 无

.. index:: afterChange

.. _afterChange:

afterChange
--------------------------------------------------------
编辑器内容发生变化后执行的回调函数。

* 数据类型: Function
* 默认值: 无

.. index:: afterTab

.. _afterTab:

afterTab
--------------------------------------------------------
按下TAB键后执行的的回调函数。

* 数据类型: Function
* 默认值: 插入4个空格的函数

.. index:: afterFocus

.. _afterFocus:

afterFocus
--------------------------------------------------------
编辑器聚焦(focus)时执行的回调函数。

* 数据类型: Function
* 默认值: 无

.. index:: afterBlur

.. _afterBlur:

afterBlur
--------------------------------------------------------
编辑器失去焦点(blur)时执行的回调函数。

* 数据类型: Function
* 默认值: 无

.. index:: afterUpload

.. _afterUpload:

afterUpload
--------------------------------------------------------
上传文件后执行的回调函数。

* 数据类型: Function
* 默认值: 无

.. sourcecode:: js

	KindEditor.ready(function(K) {
		K.create('#id', {
			afterUpload : function(url) {
				alert(url);
			}
		});
	});

.. index:: uploadJson

.. _uploadJson:

uploadJson
--------------------------------------------------------
指定上传文件的服务器端程序。

* 数据类型: String
* 默认值: basePath + 'php/upload_json.php'

.. index:: fileManagerJson

.. _fileManagerJson:

fileManagerJson
--------------------------------------------------------
指定浏览远程图片的服务器端程序。

* 数据类型: String
* 默认值: basePath + 'php/file_manager_json.php'

.. index:: allowPreviewEmoticons

.. _allowPreviewEmoticons:

allowPreviewEmoticons
--------------------------------------------------------
true时鼠标放在表情上可以预览表情。

* 数据类型: Boolean
* 默认值: true

.. index:: allowImageUpload

.. _allowImageUpload:

allowImageUpload
--------------------------------------------------------
true时显示图片上传按钮。

* 数据类型: Boolean
* 默认值: true

.. index:: allowFlashUpload

.. _allowFlashUpload:

allowFlashUpload
--------------------------------------------------------
true时显示Flash上传按钮。

* 数据类型: Boolean
* 默认值: true

.. index:: allowMediaUpload

.. _allowMediaUpload:

allowMediaUpload
--------------------------------------------------------
true时显示视音频上传按钮。

* 数据类型: Boolean
* 默认值: true

.. index:: allowFileUpload

.. _allowFileUpload:

allowFileUpload
--------------------------------------------------------
true时显示文件上传按钮。

* 数据类型: Boolean
* 默认值: true

.. note::

	4.0.6版本开始支持。

.. index:: allowFileManager

.. _allowFileManager:

allowFileManager
--------------------------------------------------------
true时显示浏览远程服务器按钮。

* 数据类型: Boolean
* 默认值: false

.. index:: fontSizeTable

.. _fontSizeTable:

fontSizeTable
--------------------------------------------------------
指定文字大小。

* 数据类型: Array
* 默认值:

.. sourcecode:: js

	['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px']

.. index:: imageTabIndex

.. _imageTabIndex:

imageTabIndex
--------------------------------------------------------
图片弹出层的默认显示标签索引。

* 数据类型: Int
* 默认值: 0

.. note::

	4.0.6版本开始支持。

.. index:: formatUploadUrl

.. _formatUploadUrl:

formatUploadUrl
--------------------------------------------------------
false时不会自动格式化上传后的URL。

* 数据类型: Boolean
* 默认值: true

.. note::

	4.1版本开始支持。

.. index:: fullscreenShortcut

.. _fullscreenShortcut:

fullscreenShortcut
--------------------------------------------------------
false时禁用ESC全屏快捷键。

* 数据类型: Boolean
* 默认值: false

.. note::

	4.1版本开始支持，从4.1.2版本开始默认值为false。

.. index:: extraFileUploadParams

.. _extraFileUploadParams:

extraFileUploadParams
--------------------------------------------------------
上传图片、Flash、视音频、文件时，支持添加别的参数一并传到服务器。

* 数据类型: Array
* 默认值: {}

.. sourcecode:: js

	KindEditor.ready(function(K) {
		K.create('#id', {
			extraFileUploadParams : {
				item_id : 1000,
				category_id : 1
			}
		});
	});

.. note::

	4.1.1版本开始支持。

.. index:: filePostName

.. _filePostName:

filePostName
--------------------------------------------------------
指定上传文件form名称。

* 数据类型: String
* 默认值: imgFile

.. note::

	4.1.2版本开始支持。

.. index:: fillDescAfterUploadImage

.. _fillDescAfterUploadImage:

fillDescAfterUploadImage
--------------------------------------------------------
true时图片上传成功后切换到图片编辑标签，false时插入图片后关闭弹出框。

* 数据类型: Boolean
* 默认值: false

.. note::

	4.1.2版本开始支持。

.. index:: afterSelectFile

.. _afterSelectFile:

afterSelectFile
--------------------------------------------------------
从图片空间选择文件后执行的回调函数。

* 数据类型: Function
* 默认值: 无

.. note::

	4.1.2版本开始支持。

.. index:: pagebreakHtml

.. _pagebreakHtml:

pagebreakHtml
--------------------------------------------------------
可指定分页符HTML。

* 数据类型: String
* 默认值: `<hr style="page-break-after: always;" class="ke-pagebreak" />`

.. note::

	4.1.3版本开始支持。

.. index:: allowImageRemote

.. _allowImageRemote:

allowImageRemote
--------------------------------------------------------
true时显示网络图片标签，false时不显示。

* 数据类型: Boolean
* 默认值: true

.. note::

	4.1.6版本开始支持。

.. index:: autoHeightMode

.. _autoHeightMode:

autoHeightMode
--------------------------------------------------------
值为true，并引入autoheight.js插件时自动调整高度。

* 数据类型: Boolean
* 默认值: false

.. note::

	4.1.8版本开始支持。
