/**
 * @name kindeditor
 * @version dist
 * @description A WYSIWYG HTML editor.
 * @author Longhao Luo
 * @url http://www.kindsoft.net/
 *
 * @root ../../
 * @src kindeditor-all.js
 * @min kindeditor-all-min.js
 */

define('#{{id}}', [], function(require, exports, module) {

/*{{code}}*/

KindEditor.basePath = seajs.pluginSDK.util.dirname(module.realUri);

return KindEditor;

});
