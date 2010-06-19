
(function (KE, undefined) {

KE.langType = 'en';

KE.lang = {
	source : 'Source',
	undo : 'Undo(Ctrl+Z)',
	redo : 'Redo(Ctrl+Y)',
	cut : 'Cut(Ctrl+X)',
	copy : 'Copy(Ctrl+C)',
	paste : 'Paste(Ctrl+V)',
	plainpaste : 'Paste as plain text',
	wordpaste : 'Paste from Word',
	selectall : 'Select all',
	justifyleft : 'Align left',
	justifycenter : 'Align center',
	justifyright : 'Align right',
	justifyfull : 'Align full',
	insertorderedlist : 'Ordered list',
	insertunorderedlist : 'Unordered list',
	indent : 'Increase indent',
	outdent : 'Decrease indent',
	subscript : 'Subscript',
	superscript : 'Superscript',
	title : 'Paragraph format',
	fontname : 'Font family',
	fontsize : 'Font size',
	textcolor : 'Text color',
	bgcolor : 'Highlight color',
	bold : 'Bold(Ctrl+B)',
	italic : 'Italic(Ctrl+I)',
	underline : 'Underline(Ctrl+U)',
	strikethrough : 'Strikethrough',
	removeformat : 'Remove format',
	image : 'Image',
	flash : 'Insert Flash',
	media : 'Insert embeded media',
	table : 'Insert table',
	hr : 'Insert horizontal line',
	emoticons : 'Insert emoticon',
	link : 'Link',
	unlink : 'Unlink',
	fullscreen : 'Toggle fullscreen mode',
	about : 'About',
	print : 'Print',
	fileManager : 'File Manager',
	advtable : 'Table',
	yes : 'OK',
	no : 'Cancel',
	close : 'Close',
	editImage : 'Image properties',
	deleteImage : 'Delete image',
	editLink : 'Link properties',
	deleteLink : 'Unlink',
	tableprop : 'Table properties',
	tableinsert : 'Insert table',
	tabledelete : 'Delete table',
	tablecolinsertleft : 'Insert column left',
	tablecolinsertright : 'Insert column right',
	tablerowinsertabove : 'Insert row above',
	tablerowinsertbelow : 'Insert row below',
	tablecoldelete : 'Delete column',
	tablerowdelete : 'Delete row',
	noColor : 'Default',
	invalidImg : "Please type valid URL.\nAllowed file extension: jpg,gif,bmp,png",
	invalidMedia : "Please type valid URL.\nAllowed file extension: swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb",
	invalidWidth : "The width must be number.",
	invalidHeight : "The height must be number.",
	invalidBorder : "The border must be number.",
	invalidUrl : "Please type valid URL.",
	invalidRows : 'Invalid rows.',
	invalidCols : 'Invalid columns.',
	invalidPadding : 'The padding must be number.',
	invalidSpacing : 'The spacing must be number.',
	invalidBorder : 'The border width must be number.',
	pleaseInput : "Please type content.",
	invalidJson : 'Invalid JSON string.',
	cutError : 'Currently not supported by your browser, use keyboard shortcut(Ctrl+X) instead.',
	copyError : 'Currently not supported by your browser, use keyboard shortcut(Ctrl+C) instead.',
	pasteError : 'Currently not supported by your browser, use keyboard shortcut(Ctrl+V) instead.'
};

var plugins = KE.lang.plugins = {};

plugins.about = {
	version : KE.version,
	title : 'WYSIWYG Editor'
};

plugins.plainpaste = {
	comment : 'Use keyboard shortcut(Ctrl+V) to paste the text into the window.'
};

plugins.wordpaste = {
	comment : 'Use keyboard shortcut(Ctrl+V) to paste the text into the window.'
};

plugins.link = {
	url : 'Link URL',
	linkType : 'Target',
	newWindow : 'New window',
	selfWindow : 'Same window'
};

plugins.flash = {
	url : 'Flash URL',
	width : 'Width',
	height : 'Height'
};

plugins.media = {
	url : 'Media URL',
	width : 'Width',
	height : 'Height',
	autostart : 'Auto start'
};

plugins.image = {
	remoteImage : 'Insert URL',
	localImage : 'Upload',
	remoteUrl : 'Image URL',
	localUrl : 'Image File',
	size : 'Dimensions',
	width : 'Width',
	height : 'Height',
	resetSize : 'Reset dimensions',
	align : 'Align',
	defaultAlign : 'Default',
	leftAlign : 'Left',
	rightAlign : 'Right',
	imgTitle : 'Title',
	viewServer : 'Browse'
};

plugins.file_manager = {
	emptyFolder : 'Blank',
	moveup : 'Parent folder',
	viewType : 'Display: ',
	viewImage : 'Thumbnails',
	listImage : 'List',
	orderType : 'Sorting: ',
	fileName : 'By name',
	fileSize : 'By size',
	fileType : 'By type'
};

plugins.advtable = {
	cells : 'Cells',
	rows : 'Rows',
	cols : 'Columns',
	size : 'Dimensions',
	width : 'Width',
	height : 'Height',
	percent : '%',
	px : 'px',
	space : 'Space',
	padding : 'Padding',
	spacing : 'Spacing',
	align : 'Align',
	alignDefault : 'Default',
	alignLeft : 'Left',
	alignCenter : 'Center',
	alignRight : 'Right',
	border : 'Border',
	borderWidth : 'Width',
	borderColor : 'Color',
	backgroundColor : 'Background'
};

plugins.title = {
	h1 : 'Heading 1',
	h2 : 'Heading 2',
	h3 : 'Heading 3',
	h4 : 'Heading 4',
	p : 'Normal'
};

plugins.fontname = {
	fontName : {
		'Arial' : 'Arial',
		'Arial Black' : 'Arial Black',
		'Comic Sans MS' : 'Comic Sans MS',
		'Courier New' : 'Courier New',
		'Garamond' : 'Garamond',
		'Georgia' : 'Georgia',
		'Tahoma' : 'Tahoma',
		'Times New Roman' : 'Times New Roman',
		'Trebuchet MS' : 'Trebuchet MS',
		'Verdana' : 'Verdana'
	}
};

})(KindEditor);
