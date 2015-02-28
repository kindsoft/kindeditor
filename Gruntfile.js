
module.exports = function(grunt) {

var BANNER = '/* <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>), Copyright (C) kindsoft.net, Licence: http://kindeditor.net/license.php */\r\n';

var SRC_FILES = [
	'src/header.js',
	'src/core.js',
	'src/config.js',
	'src/event.js',
	'src/html.js',
	'src/selector.js',
	'src/node.js',
	'src/range.js',
	'src/cmd.js',
	'src/widget.js',
	'src/edit.js',
	'src/toolbar.js',
	'src/menu.js',
	'src/colorpicker.js',
	'src/uploadbutton.js',
	'src/dialog.js',
	'src/tabs.js',
	'src/ajax.js',
	'src/main.js',
	'src/footer.js',
];

var PLUGIN_FILES = [
	'plugins/anchor/anchor.js',
	'plugins/autoheight/autoheight.js',
	'plugins/baidumap/baidumap.js',
	'plugins/map/map.js',
	'plugins/clearhtml/clearhtml.js',
	'plugins/code/code.js',
	'plugins/emoticons/emoticons.js',
	'plugins/filemanager/filemanager.js',
	'plugins/flash/flash.js',
	'plugins/image/image.js',
	'plugins/insertfile/insertfile.js',
	'plugins/lineheight/lineheight.js',
	'plugins/link/link.js',
	'plugins/map/map.js',
	'plugins/media/media.js',
	'plugins/multiimage/multiimage.js',
	'plugins/pagebreak/pagebreak.js',
	'plugins/plainpaste/plainpaste.js',
	'plugins/preview/preview.js',
	'plugins/quickformat/quickformat.js',
	'plugins/table/table.js',
	'plugins/template/template.js',
	'plugins/wordpaste/wordpaste.js',
	'plugins/fixtoolbar/fixtoolbar.js'
];

var pkg = grunt.file.readJSON('package.json');

var lang = grunt.option('lang') || 'en';

grunt.initConfig({
	pkg : pkg,
	concat : {
		options : {
			process : function(src, filepath) {
				src = src.replace(/\$\{VERSION\}/g, pkg.version + ' (' + grunt.template.today('yyyy-mm-dd') + ')');
				src = src.replace(/\$\{THISYEAR\}/g, grunt.template.today('yyyy'));
				src = src.replace(/\/\*\*(\r\n|\n)[\s\S]*?\*\//g, '');
				src = src.replace(/(^|\s)\/\/.*$/mg, '');
				src = src.replace(/(\r\n|\n)\/\*\*\/.*(\r\n|\n)/g, '');
				src = src.replace(/[ \t]+$/mg, '');
				src = src.replace(/(\r\n|\n){2,}/g, '$1');
				return src;
			}
		},
		build : {
			src : SRC_FILES.concat('lang/' + lang + '.js').concat(PLUGIN_FILES),
			dest : 'kindeditor-all.js'
		}
	},
	uglify : {
		options : {
			banner : BANNER,
		},
		build : {
			src : '<%= pkg.filename %>-all.js',
			dest : '<%= pkg.filename %>-all-min.js'
		}
	},
	compress : {
		main : {
			options: {
				archive: 'dist/<%= pkg.filename %>-<%= pkg.version %>-' + lang + '.zip',
			},
			files: [
				{src: ['asp/**'], dest: 'kindeditor/'},
				{src: ['asp.net/**'], dest: 'kindeditor/'},
				{src: ['attached'], dest: 'kindeditor/'},
				{src: ['jsp/**'], dest: 'kindeditor/'},
				{src: ['lang/**'], dest: 'kindeditor/'},
				{src: ['php/**'], dest: 'kindeditor/'},
				{src: ['plugins/**'], dest: 'kindeditor/'},
				{src: ['themes/**'], dest: 'kindeditor/'},
				{src: ['kindeditor*.js'], dest: 'kindeditor/'},
				{src: ['license.txt'], dest: 'kindeditor/'},
			]
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');

grunt.registerTask('build', ['concat', 'uglify']);
grunt.registerTask('zip', ['build', 'compress']);

grunt.registerTask('default', 'build');

};
