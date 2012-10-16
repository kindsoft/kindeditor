
define(function(require, exports, module) {

var KindEditor = require('kindeditor');

KindEditor.ready(function(K) {
	K.create('textarea[name="content"]');
});

});
