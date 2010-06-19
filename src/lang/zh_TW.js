
(function (KE, undefined) {

KE.langType = 'zh_TW';

KE.lang = {
	source : '原始碼',
	undo : '復原(Ctrl+Z)',
	redo : '重複(Ctrl+Y)',
	cut : '剪下(Ctrl+X)',
	copy : '複製(Ctrl+C)',
	paste : '貼上(Ctrl+V)',
	plainpaste : '貼為純文字格式',
	wordpaste : '自Word貼上',
	selectall : '全選',
	justifyleft : '靠左對齊',
	justifycenter : '置中',
	justifyright : '靠右對齊',
	justifyfull : '左右對齊',
	insertorderedlist : '編號清單',
	insertunorderedlist : '項目清單',
	indent : '增加縮排',
	outdent : '減少縮排',
	subscript : '下標',
	superscript : '上標',
	title : '標題',
	fontname : '字體',
	fontsize : '文字大小',
	textcolor : '文字顏色',
	bgcolor : '背景顏色',
	bold : '粗體(Ctrl+B)',
	italic : '斜體(Ctrl+I)',
	underline : '底線(Ctrl+U)',
	strikethrough : '刪除線',
	removeformat : '清除格式',
	image : '影像',
	flash : '插入Flash',
	media : '插入多媒體',
	table : '插入表格',
	hr : '插入水平線',
	emoticons : '插入表情',
	link : '超連結',
	unlink : '移除超連結',
	fullscreen : '最大化',
	about : '關於',
	print : '列印',
	fileManager : '瀏覽伺服器',
	advtable : '表格',
	yes : '確定',
	no : '取消',
	close : '關閉',
	editImage : '影像屬性',
	deleteImage : '刪除影像',
	editLink : '超連結屬性',
	deleteLink : '移除超連結',
	tableprop : '表格屬性',
	tableinsert : '插入表格',
	tabledelete : '刪除表格',
	tablecolinsertleft : '向左插入列',
	tablecolinsertright : '向右插入列',
	tablerowinsertabove : '向上插入欄',
	tablerowinsertbelow : '下方插入欄',
	tablecoldelete : '删除列',
	tablerowdelete : '删除欄',
	noColor : '自動',
	invalidImg : "請輸入有效的URL。\n只允許jpg,gif,bmp,png格式。",
	invalidMedia : "請輸入有效的URL。\n只允許swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",
	invalidWidth : "寬度必須是數字。",
	invalidHeight : "高度必須是數字。",
	invalidBorder : "邊框必須是數字。",
	invalidUrl : "請輸入有效的URL。",
	invalidRows : '欄數是必須輸入項目，只允許輸入大於0的數字。',
	invalidCols : '列數是必須輸入項目，只允許輸入大於0的數字。',
	invalidPadding : '內距必須是數字。',
	invalidSpacing : '間距必須是數字。',
	invalidBorder : '边框必须为数字。',
	pleaseInput : "請輸入內容。",
	invalidJson : '伺服器發生故障。',
	cutError : '您的瀏覽器安全設置不允許使用剪下操作，請使用快捷鍵(Ctrl+X)完成。',
	copyError : '您的瀏覽器安全設置不允許使用剪下操作，請使用快捷鍵(Ctrl+C)完成。',
	pasteError : '您的瀏覽器安全設置不允許使用剪下操作，請使用快捷鍵(Ctrl+V)完成。'
};

var plugins = KE.lang.plugins = {};

plugins.about = {
	version : KE.version,
	title : 'HTML可視化編輯器'
};

plugins.plainpaste = {
	comment : '請使用快捷鍵(Ctrl+V)把內容貼到下方區域裡。'
};

plugins.wordpaste = {
	comment : '請使用快捷鍵(Ctrl+V)把內容貼到下方區域裡。'
};

plugins.link = {
	url : 'URL',
	linkType : '打開類型',
	newWindow : '新窗口',
	selfWindow : '本頁窗口'
};

plugins.flash = {
	url : 'URL',
	width : '寬度',
	height : '高度'
};

plugins.media = {
	url : 'URL',
	width : '寬度',
	height : '高度',
	autostart : '自動播放'
};

plugins.image = {
	remoteImage : '影像URL',
	localImage : '上傳影像',
	remoteUrl : '影像URL',
	localUrl : '影像URL',
	size : '影像大小',
	width : '寬度',
	height : '高度',
	resetSize : '原始大小',
	align : '對齊方式',
	defaultAlign : '未設定',
	leftAlign : '向左對齊',
	rightAlign : '向右對齊',
	imgTitle : '影像說明',
	viewServer : '瀏覽...'
};

plugins.file_manager = {
	emptyFolder : '空文件夾',
	moveup : '至上一級文件夾',
	viewType : '顯示方式：',
	viewImage : '縮略圖',
	listImage : '詳細信息',
	orderType : '排序方式：',
	fileName : '名稱',
	fileSize : '大小',
	fileType : '類型'
};

plugins.advtable = {
	cells : '儲存格數',
	rows : '欄數',
	cols : '列數',
	size : '表格大小',
	width : '寬度',
	height : '高度',
	percent : '%',
	px : 'px',
	space : '內距間距',
	padding : '內距',
	spacing : '間距',
	align : '對齊方式',
	alignDefault : '未設定',
	alignLeft : '向左對齊',
	alignCenter : '置中',
	alignRight : '向右對齊',
	border : '表格邊框',
	borderWidth : '邊框',
	borderColor : '顏色',
	backgroundColor : '背景顏色'
};

plugins.title = {
	h1 : '標題 1',
	h2 : '標題 2',
	h3 : '標題 3',
	h4 : '標題 4',
	p : '一般'
};

plugins.fontname = {
	fontName : {
		'MingLiU' : '細明體',
		'PMingLiU' : '新細明體',
		'DFKai-SB' : '標楷體',
		'SimSun' : '宋體',
		'NSimSun' : '新宋體',
		'FangSong' : '仿宋體',
		'Arial' : 'Arial',
		'Arial Black' : 'Arial Black',
		'Times New Roman' : 'Times New Roman',
		'Courier New' : 'Courier New',
		'Tahoma' : 'Tahoma',
		'Verdana' : 'Verdana'
	}
};

})(KindEditor);
