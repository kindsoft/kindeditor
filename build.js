
var Path = require('path');
var Fs = require('fs');
var Iconv = require('iconv-lite');
var Handlebars = require('handlebars');
var Showdown = require('showdown');

var linefeed = process.platform === 'win32' ? '\r\n' : '\n';

function info(str) {
	console.info('\033[36m', str, '\033[0m');
}

function warn(str) {
	console.warn('\033[33m', str, '\033[0m');
}

function error(str) {
	console.error('\033[31m', str, '\033[0m');
}

function mkdir(dirPath, mode) {
	var list = [];
	while (true) {
		if (Fs.existsSync(dirPath)) {
			break;
		}

		list.push(dirPath);

		var parentPath = Path.dirname(dirPath);

		if (parentPath == dirPath) {
			break;
		}

		dirPath = parentPath;
	}

	list.reverse().forEach(function(path) {
		Fs.mkdirSync(path, mode);

		info('Directory "' + path + '" created.' + linefeed);
	});
}

function readFileSync(filePath, encoding) {
	var buffer = new Buffer('');

	try {
		buffer = Fs.readFileSync(filePath);
	} catch (e) {
		error(e.toString());
	}

	if (!encoding) {
		return buffer;
	}

	var fileStr = Iconv.fromEncoding(buffer, encoding);

	return fileStr;
}

function writeFileSync(filePath, content) {
	mkdir(Path.dirname(filePath), '0777');
	Fs.writeFileSync(filePath, content);

	info('File "' + filePath + '" created.' + linefeed);
}

function grepPaths(rootDirPath, checkFn) {
	var paths = [];

	function walk(dirPath) {
		var files = Fs.readdirSync(dirPath);

		for (var i = 0, len = files.length; i < len; i++) {
			var file = files[i];

			if (file.charAt(0) === '.') {
				continue;
			}

			var path = Path.resolve(dirPath + '/' + file);

			var stat = Fs.statSync(path);

			if (stat.isDirectory()) {
				walk(path);
			} else if (checkFn(path)) {
				paths.push(path);
			}
		}
	}

	walk(rootDirPath);

	return paths;
}

function main() {
	var markdown = new Showdown.converter();

	var layoutHtml = readFileSync('./src/layout.html', 'utf-8');
	var layoutTemplate = Handlebars.compile(layoutHtml);

	var pathList =  grepPaths('./src', function(path) {
		if (/layout\.html$/.test(path)) {
			return;
		}
		return /\.(html|md)$/.test(path);
	});

	pathList.forEach(function(path) {
		var relativePath = Path.relative('./src/', path);
		var page = relativePath.split(Path.sep)[0].replace(/\.\w+$/, '');

		var env = {};

		env[page] = true;
		env.test = 'test';

		var content = readFileSync(path, 'utf-8');

		var contentTemplate = Handlebars.compile(content);
		content = contentTemplate({
			env : env
		});

		if (/\.md$/.test(path)) {
			content = markdown.makeHtml(content);
		}

		var html = layoutTemplate({
			env : env,
			content : content
		});

		var filePath = Path.resolve(relativePath).replace(/\.md$/, '.html');
		writeFileSync(filePath, html);
	});
}

main();
