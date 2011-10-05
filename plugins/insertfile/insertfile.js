/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('insertfile', function(K) {
	var self = this, name = 'insertfile',
	allowFileManager = K.undef(self.allowFileManager, false),
	uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php'),
	lang = self.lang(name + '.');
	self.clickToolbar(name, function() {
		var html = [
		'<div style="padding:10px 20px;">',
		'<div class="ke-dialog-row">',
		'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
		'<input type="text" id="keUrl" name="url" class="ke-input-text" style="width:160px;" /> &nbsp;',
		'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
		'<span class="ke-button-common ke-button-outer">',
		'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
		'</span>',
		'</div>',
		//title
		'<div class="ke-dialog-row">',
		'<label for="keTitle" style="width:60px;">' + lang.title + '</label>',
		'<input type="text" id="keTitle" class="ke-input-text" name="title" value="" style="width:160px;" /></div>',
		'</div>',
		//form end
		'</form>',
		'</div>'
		].join('');
		var dialog = self.createDialog({
			name : name,
			width : 450,
			height : 180,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					var url = K.trim(urlBox.val()),
						title = titleBox.val();
					if (url == 'http://' || K.invalidUrl(url)) {
						alert(self.lang('invalidUrl'));
						urlBox[0].focus();
						return;
					}
					if (K.trim(title) === '') {
						title = url;
					}
					var html = '<a href="' + url + '" data-ke-src="' + url + '" target="_blank">' + title + '</a>';
					self.insertHtml(html);
					uploadbutton.remove();
					self.hideDialog().focus();
				}
			}
		}),
		div = dialog.div;

		var urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			titleBox = K('[name="title"]', div);

		var uploadbutton = K.uploadbutton({
			button : K('.ke-upload-button', div)[0],
			fieldName : 'imgFile',
			url : K.addParam(uploadJson, 'dir=file'),
			afterUpload : function(data) {
				if (data.error === 0) {
					var url = K.formatUrl(data.url, 'absolute');
					urlBox.val(url);
					if (self.afterUpload) {
						self.afterUpload.call(self, url);
					}
					alert(self.lang('uploadSuccess'));
				} else {
					alert(data.message);
				}
			}
		});
		uploadbutton.fileBox.change(function(e) {
			uploadbutton.submit();
		});
		if (allowFileManager) {
			viewServerBtn.click(function(e) {
				self.loadPlugin('filemanager', function() {
					self.plugin.filemanagerDialog({
						viewType : 'LIST',
						dirName : 'file',
						clickFn : function(url, title) {
							if (self.dialogs.length > 1) {
								K('[name="url"]', div).val(url);
								self.hideDialog();
							}
						}
					});
				});
			});
		} else {
			viewServerBtn.hide();
		}
		urlBox.val('http://');
		urlBox[0].focus();
		urlBox[0].select();
	});
});
