
var menu = null;
K('#menu').bind('click', function(e) {
	if (menu) {
		menu.remove();
		menu = null;
	} else {
		var menuPos = K('#menu').pos();
		menu = K.menu({
			width : 200,
			x : menuPos.x,
			y : menuPos.y + K('#menu').height(),
			z : 19811212,
			centerLineMode : false
		});
		K.each('9px,10px,12px,14px,16px,18px,24px,32px'.split(','), function(i, val) {
			menu.addItem({
				title : '<span style="font-size:' + val + ';">' + val + '</span>',
				click : function() {
					alert(val);
				},
				height : parseInt(val, 10) + 12,
				checked : val === '12px'
			});
		});
	}
});

var contextmenu = null;
K('#contextmenu').bind('click', function(e) {
	if (contextmenu) {
		contextmenu.remove();
		contextmenu = null;
	} else {
		var contextmenuPos = K('#contextmenu').pos();
		contextmenu = K.menu({
			width : 200,
			x : contextmenuPos.x,
			y : contextmenuPos.y + K('#contextmenu').height(),
			z : 19811213
		});
		K.each('image,flash,media,-,bold,cut,copy,paste,-,selectall'.split(','), function(i, val) {
			contextmenu.addItem({
				title : val,
				click : function() {
					alert(val);
				},
				iconClass : 'ke-icon-' + val
			});
		});
	}
});

var colorpicker = null;
K('#colorpicker').bind('click', function(e) {
	if (colorpicker) {
		colorpicker.remove();
		colorpicker = null;
	} else {
		var colorpickerPos = K('#colorpicker').pos();
		colorpicker = K.colorpicker({
			x : colorpickerPos.x,
			y : colorpickerPos.y + K('#colorpicker').height(),
			z : 19811214,
			selectedColor : 'default',
			noColor : '无颜色',
			click : function(color) {
				alert(color);
			}
		});
	}
});