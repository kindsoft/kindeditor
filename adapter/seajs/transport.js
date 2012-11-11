/**
 * @name kindeditor
 * @version 4.1.4
 * @description A WYSIWYG HTML editor.
 * @author Longhao Luo
 * @url http://www.kindsoft.net/
 *
 * @root https://raw.github.com/kindsoft/kindeditor/master/
 * @src kindeditor-all.js
 * @min kindeditor-all-min.js
 */

define('#{{id}}', [], function(require, exports, module) {

/*{{code}}*/

KindEditor.basePath = seajs.pluginSDK.util.dirname(module.realUri);

return KindEditor;

});
