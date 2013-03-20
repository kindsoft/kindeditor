
module.exports = function(grunt) {

var BANNER = '/* <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>), Copyright (C) kindsoft.net, Licence: http://www.kindsoft.net/license.php */\n';

grunt.initConfig({
	pkg : grunt.file.readJSON('package.json'),
	concat : {
		options : {
			banner : BANNER,
			stripBanners : true,
			block : true,
			line : true
		},
		dist : {
			src : [
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
				'src/footer.js'
			],
			dest : 'kindeditor.js'
		}
	},
	uglify : {
		options : {
			banner : BANNER
		},
		build : {
			src : 'src/<%= pkg.name %>.js',
			dest : 'build/<%= pkg.name %>.min.js'
		}
	},
	compress: {
		main: {
			options: {
				archive: 'dist/<%= pkg.filename %>-<%= pkg.version %>.zip'
			},
			files: [
				{src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
				{src: ['path/**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs
				{expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // makes all src relative to cwd
				{flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level
			]
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');

grunt.registerTask('default', ['concat', 'embed', 'uglify']);

};
