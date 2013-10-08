
function KUploadButton(options) {
	this.init(options);
}
_extend(KUploadButton, {
	init : function(options) {
		var self = this,
			button = K(options.button),
			fieldName = options.fieldName || 'file',
			url = options.url || '',
			title = button.val(),
			extraParams = options.extraParams || {},
			cls = button[0].className || '',
			target = options.target || 'kindeditor_upload_iframe_' + new Date().getTime();
		options.afterError = options.afterError || function(str) {
			alert(str);
		};

		var hiddenElements = [];
		for(var k in extraParams){
			hiddenElements.push('<input type="hidden" name="' + k + '" value="' + extraParams[k] + '" />');
		}

		var html = [
			'<div class="ke-inline-block ' + cls + '">',
			(options.target ? '' : '<iframe name="' + target + '" style="display:none;"></iframe>'),
			(options.form ? '<div class="ke-upload-area">' : '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + target + '" action="' + url + '">'),
			'<span class="ke-button-common">',
			hiddenElements.join(''),
			'<input type="button" class="ke-button-common ke-button" value="' + title + '" />',
			'</span>',
			'<input type="file" class="ke-upload-file" name="' + fieldName + '" tabindex="-1" />',
			(options.form ? '</div>' : '</form>'),
			'</div>'].join('');

		var div = K(html, button.doc);
		button.hide();
		button.before(div);

		self.div = div;
		self.button = button;
		self.iframe = options.target ? K('iframe[name="' + target + '"]') : K('iframe', div);
		self.form = options.form ? K(options.form) : K('form', div);
		self.fileBox = K('.ke-upload-file', div);
		var width = options.width || K('.ke-button-common', div).width();
		K('.ke-upload-area', div).width(width);
		self.options = options;
	},
	submit : function() {
		var self = this,
			iframe = self.iframe;
		iframe.bind('load', function() {
			iframe.unbind();
			// 清空file
			var tempForm = document.createElement('form');
			self.fileBox.before(tempForm);
			K(tempForm).append(self.fileBox);
			tempForm.reset();
			K(tempForm).remove(true);

			var doc = K.iframeDoc(iframe),
				pre = doc.getElementsByTagName('pre')[0],
				str = '', data;
			if (pre) {
				str = pre.innerHTML;
			} else {
				str = doc.body.innerHTML;
			}
			// Bugfix: https://github.com/kindsoft/kindeditor/issues/81
			str = _unescape(str);
			// Bugfix: [IE] 上传图片后，进度条一直处于加载状态。
			iframe[0].src = 'javascript:false';
			try {
				data = K.json(str);
			} catch (e) {
				self.options.afterError.call(self, '<!doctype html><html>' + doc.body.parentNode.innerHTML + '</html>');
			}
			if (data) {
				self.options.afterUpload.call(self, data);
			}
		});
		self.form[0].submit();
		return self;
	},
	remove : function() {
		var self = this;
		if (self.fileBox) {
			self.fileBox.unbind();
		}
		// Bugfix: [IE] 上传图片后，进度条一直处于加载状态。
		//self.iframe[0].src = 'javascript:false';
		self.iframe.remove();
		self.div.remove();
		self.button.show();
		return self;
	}
});

function _uploadbutton(options) {
	return new KUploadButton(options);
}

K.UploadButtonClass = KUploadButton;
K.uploadbutton = _uploadbutton;

