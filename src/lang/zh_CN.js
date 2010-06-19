
(function (KE, undefined) {

KE.langType = 'zh_CN';

KE.lang = {
	source : 'HTML代码',
	undo : '后退(Ctrl+Z)',
	redo : '前进(Ctrl+Y)',
	cut : '剪切(Ctrl+X)',
	copy : '复制(Ctrl+C)',
	paste : '粘贴(Ctrl+V)',
	plainpaste : '粘贴为无格式文本',
	wordpaste : '从Word粘贴',
	selectall : '全选',
	justifyleft : '左对齐',
	justifycenter : '居中',
	justifyright : '右对齐',
	justifyfull : '两端对齐',
	insertorderedlist : '编号',
	insertunorderedlist : '项目符号',
	indent : '增加缩进',
	outdent : '减少缩进',
	subscript : '下标',
	superscript : '上标',
	title : '标题',
	fontname : '字体',
	fontsize : '文字大小',
	textcolor : '文字颜色',
	bgcolor : '文字背景',
	bold : '粗体(Ctrl+B)',
	italic : '斜体(Ctrl+I)',
	underline : '下划线(Ctrl+U)',
	strikethrough : '删除线',
	removeformat : '删除格式',
	image : '图片',
	flash : '插入Flash',
	media : '插入多媒体',
	table : '插入表格',
	hr : '插入横线',
	emoticons : '插入表情',
	link : '超级链接',
	unlink : '取消超级链接',
	fullscreen : '全屏显示',
	about : '关于',
	print : '打印',
	fileManager : '浏览服务器',
	advtable : '表格',
	yes : '确定',
	no : '取消',
	close : '关闭',
	editImage : '图片属性',
	deleteImage : '删除图片',
	editLink : '超级链接属性',
	deleteLink : '取消超级链接',
	tableprop : '表格属性',
	tableinsert : '插入表格',
	tabledelete : '删除表格',
	tablecolinsertleft : '左侧插入列',
	tablecolinsertright : '右侧插入列',
	tablerowinsertabove : '上方插入行',
	tablerowinsertbelow : '下方插入行',
	tablecoldelete : '删除列',
	tablerowdelete : '删除行',
	noColor : '无颜色',
	invalidImg : "请输入有效的URL地址。\n只允许jpg,gif,bmp,png格式。",
	invalidMedia : "请输入有效的URL地址。\n只允许swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",
	invalidWidth : "宽度必须为数字。",
	invalidHeight : "高度必须为数字。",
	invalidBorder : "边框必须为数字。",
	invalidUrl : "请输入有效的URL地址。",
	invalidRows : '行数为必选项，只允许输入大于0的数字。',
	invalidCols : '列数为必选项，只允许输入大于0的数字。',
	invalidPadding : '边距必须为数字。',
	invalidSpacing : '间距必须为数字。',
	invalidBorder : '边框必须为数字。',
	pleaseInput : "请输入内容。",
	invalidJson : '服务器发生故障。',
	cutError : '您的浏览器安全设置不允许使用剪切操作，请使用快捷键(Ctrl+X)来完成。',
	copyError : '您的浏览器安全设置不允许使用复制操作，请使用快捷键(Ctrl+C)来完成。',
	pasteError : '您的浏览器安全设置不允许使用粘贴操作，请使用快捷键(Ctrl+V)来完成。'
};

var plugins = KE.lang.plugins = {};

plugins.about = {
	version : KE.version,
	title : 'HTML可视化编辑器'
};

plugins.plainpaste = {
	comment : '请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。'
};

plugins.wordpaste = {
	comment : '请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。'
};

plugins.link = {
	url : 'URL地址',
	linkType : '打开类型',
	newWindow : '新窗口',
	selfWindow : '当前窗口'
};

plugins.flash = {
	url : 'Flash地址',
	width : '宽度',
	height : '高度'
};

plugins.media = {
	url : '媒体文件地址',
	width : '宽度',
	height : '高度',
	autostart : '自动播放'
};

plugins.image = {
	remoteImage : '远程图片',
	localImage : '本地上传',
	remoteUrl : '图片地址',
	localUrl : '图片地址',
	size : '图片大小',
	width : '宽',
	height : '高',
	resetSize : '重置大小',
	align : '对齐方式',
	defaultAlign : '默认方式',
	leftAlign : '左对齐',
	rightAlign : '右对齐',
	imgTitle : '图片说明',
	viewServer : '浏览...'
};

plugins.file_manager = {
	emptyFolder : '空文件夹',
	moveup : '移到上一级文件夹',
	viewType : '显示方式：',
	viewImage : '缩略图',
	listImage : '详细信息',
	orderType : '排序方式：',
	fileName : '名称',
	fileSize : '大小',
	fileType : '类型'
};

plugins.advtable = {
	cells : '单元格数',
	rows : '行数',
	cols : '列数',
	size : '表格大小',
	width : '宽度',
	height : '高度',
	percent : '%',
	px : 'px',
	space : '边距间距',
	padding : '边距',
	spacing : '间距',
	align : '对齐方式',
	alignDefault : '默认',
	alignLeft : '左对齐',
	alignCenter : '居中',
	alignRight : '右对齐',
	border : '表格边框',
	borderWidth : '边框',
	borderColor : '颜色',
	backgroundColor : '背景颜色'
};

plugins.title = {
	h1 : '标题 1',
	h2 : '标题 2',
	h3 : '标题 3',
	h4 : '标题 4',
	p : '正 文'
};

plugins.fontname = {
	fontName : {
		'SimSun' : '宋体',
		'NSimSun' : '新宋体',
		'FangSong_GB2312' : '仿宋_GB2312',
		'KaiTi_GB2312' : '楷体_GB2312',
		'SimHei' : '黑体',
		'Microsoft YaHei' : '微软雅黑',
		'Arial' : 'Arial',
		'Arial Black' : 'Arial Black',
		'Times New Roman' : 'Times New Roman',
		'Courier New' : 'Courier New',
		'Tahoma' : 'Tahoma',
		'Verdana' : 'Verdana'
	}
};

})(KindEditor);
