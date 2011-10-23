
function _createButton(arg) {
	arg = arg || {};
	var name = arg.name || '',
		span = K('<span class="ke-button-common ke-button-outer" title="' + name + '"></span>'),
		btn = K('<input class="ke-button-common ke-button" type="button" value="' + name + '" />');
	if (arg.click) {
		btn.click(arg.click);
	}
	span.append(btn);
	return span;
}

// create KToolbar class
function KDialog(options) {
	this.init(options);
}
_extend(KDialog, KWidget, {
	init : function(options) {
		var self = this;
		options.z = options.z || 811213;
		KDialog.parent.init.call(self, options);
		var title = options.title,
			body = K(options.body, self.doc),
			previewBtn = options.previewBtn,
			yesBtn = options.yesBtn,
			noBtn = options.noBtn,
			closeBtn = options.closeBtn,
			shadowMode = _undef(options.shadowMode, true),
			showMask = _undef(options.showMask, true);

		self.div.addClass('ke-dialog').bind('click,mousedown', function(e){
			e.stopPropagation();
		}).addClass('ke-dialog-' + (shadowMode ? '' : 'no-') + 'shadow');

		var headerDiv = K('<div class="ke-dialog-header"></div>');
		self.div.append(headerDiv);
		headerDiv.html(title);
		self.closeIcon = K('<span class="ke-dialog-icon-close" title="' + closeBtn.name + '"></span>').click(closeBtn.click);
		headerDiv.append(self.closeIcon);
		self.draggable({
			clickEl : headerDiv,
			beforeDrag : options.beforeDrag
		});
		var bodyDiv = K('<div class="ke-dialog-body"></div>');
		self.div.append(bodyDiv);
		bodyDiv.append(body);
		var footerDiv = K('<div class="ke-dialog-footer"></div>');
		if (previewBtn || yesBtn || noBtn) {
			self.div.append(footerDiv);
		}
		_each([
			{ btn : previewBtn, name : 'preview' },
			{ btn : yesBtn, name : 'yes' },
			{ btn : noBtn, name : 'no' }
		], function() {
			if (this.btn) {
				var button = _createButton(this.btn);
				button.addClass('ke-dialog-' + this.name);
				footerDiv.append(button);
			}
		});
		if (self.height) {
			bodyDiv.height(_removeUnit(self.height) - headerDiv.height() - footerDiv.height());
		}
		self.mask = null;
		if (showMask) {
			var docEl = _docElement(self.doc),
				docWidth = Math.max(docEl.scrollWidth, docEl.clientWidth),
				docHeight = Math.max(docEl.scrollHeight, docEl.clientHeight);
			self.mask = _widget({
				x : 0,
				y : 0,
				z : self.z - 1,
				cls : 'ke-dialog-mask',
				width : docWidth,
				height : docHeight
			});
			if (_IE && _V < 7) {
				self.iframeMask = K('<iframe src="about:blank" style="position:absolute;top:0;left:0;z-index:' +
					(self.z - 2) + ';width:' + docWidth + 'px;height:' + docHeight +
					'px;filter:alpha(opacity=0)"></iframe>').appendTo(document.body);
			}
		}
		self.autoPos(self.div.width(), self.div.height());
		self.footerDiv = footerDiv;
		self.bodyDiv = bodyDiv;
		self.headerDiv = headerDiv;
	},
	setMaskIndex : function(z) {
		var self = this;
		self.mask.div.css('z-index', z);
		self.iframeMask && self.iframeMask.css('z-index', z - 1);
	},
	showLoading : function() {
		var self = this, body = self.bodyDiv;
		self.loading = K('<div class="ke-dialog-loading"></div>')
			.width(body.width()).height(body.height())
			.css('top', self.headerDiv.height() + 'px');
		body.css('visibility', 'hidden').after(self.loading);
		return self;
	},
	hideLoading : function() {
		this.loading && this.loading.remove();
		this.bodyDiv.css('visibility', 'visible');
		return this;
	},
	remove : function() {
		var self = this;
		if (self.options.beforeRemove) {
			self.options.beforeRemove.call(self);
		}
		self.mask && self.mask.remove();
		self.iframeMask && self.iframeMask.remove();
		self.closeIcon.unbind();
		K('input', self.div).unbind();
		self.footerDiv.unbind();
		self.bodyDiv.unbind();
		self.headerDiv.unbind();
		KDialog.parent.remove.call(self);
		return self;
	}
});

function _dialog(options) {
	return new KDialog(options);
}

K.dialog = _dialog;
