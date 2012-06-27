
// create KColorPicker class
function KColorPicker(options) {
	this.init(options);
}
_extend(KColorPicker, KWidget, {
	init : function(options) {
		var self = this;
		options.z = options.z || 811213;
		KColorPicker.parent.init.call(self, options);
		var colors = options.colors || [
			['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
			['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
			['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
			['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
		];
		self.selectedColor = (options.selectedColor || '').toLowerCase();
		self._cells = [];
		self.div.addClass('ke-colorpicker').bind('click,mousedown', function(e){
			e.stopPropagation();
		}).attr('unselectable', 'on');
		var table = self.doc.createElement('table');
		self.div.append(table);
		table.className = 'ke-colorpicker-table';
		table.cellPadding = 0;
		table.cellSpacing = 0;
		table.border = 0;
		var row = table.insertRow(0), cell = row.insertCell(0);
		cell.colSpan = colors[0].length;
		self._addAttr(cell, '', 'ke-colorpicker-cell-top');
		for (var i = 0; i < colors.length; i++) {
			row = table.insertRow(i + 1);
			for (var j = 0; j < colors[i].length; j++) {
				cell = row.insertCell(j);
				self._addAttr(cell, colors[i][j], 'ke-colorpicker-cell');
			}
		}
	},
	_addAttr : function(cell, color, cls) {
		var self = this;
		cell = K(cell).addClass(cls);
		if (self.selectedColor === color.toLowerCase()) {
			cell.addClass('ke-colorpicker-cell-selected');
		}
		cell.attr('title', color || self.options.noColor);
		cell.mouseover(function(e) {
			K(this).addClass('ke-colorpicker-cell-on');
		});
		cell.mouseout(function(e) {
			K(this).removeClass('ke-colorpicker-cell-on');
		});
		cell.click(function(e) {
			e.stop();
			self.options.click.call(K(this), color);
		});
		if (color) {
			cell.append(K('<div class="ke-colorpicker-cell-color" unselectable="on"></div>').css('background-color', color));
		} else {
			cell.html(self.options.noColor);
		}
		K(cell).attr('unselectable', 'on');
		self._cells.push(cell);
	},
	remove : function() {
		var self = this;
		_each(self._cells, function() {
			this.unbind();
		});
		KColorPicker.parent.remove.call(self);
		return self;
	}
});

function _colorpicker(options) {
	return new KColorPicker(options);
}

K.ColorPickerClass = KColorPicker;
K.colorpicker = _colorpicker;
