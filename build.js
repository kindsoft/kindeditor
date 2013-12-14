
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

		info('Directory "' + path + '" created.');
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

	info('File "' + filePath + '" created.');
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

function escape(val) {
	return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showdownHtml() {
	return [{
		type : 'lang',
		regex   : '````([\\s\\S]*?)````',
		replace : function(match, content) {
			return content;
		}
	}];
}

function showdownCode() {
	return [{
		type : 'lang',
		regex   : '```([\\w\\-]*)([\\s\\S]*?)```',
		replace : function(match, lang, content) {
			content = escape(content);
			return '<pre class="prettyprint' + (lang ? (' lang-' + lang) : '') + '">' + content + '</pre>';
		}
	}];
}

function md2html(content) {
	var markdown = new Showdown.converter({
		extensions : [showdownHtml, showdownCode]
	});
	content = '{{include /header}}<div class="md-content">\n' + markdown.makeHtml(content) + '\n</div>{{include /footer}}';
	return content;
}

function main() {
	var pathList =  grepPaths('./src', function(path) {
		if (/\.inc\.html$/.test(path)) {
			return;
		}
		return /\.(html|md)$/.test(path);
	});

	pathList.forEach(function(path) {
		var dirPath = Path.dirname(path);
		var relativePath = Path.relative('./src/', path);
		var pathParts = relativePath.split(Path.sep);
		var pageName = pathParts[0].replace(/\.\w+$/, '');
		var depth = pathParts.length - 1;

		var appUrl = '.';
		for (var i = 0; i < depth; i++) {
			appUrl += '/..';
		}

		if (pageName == 'examples') {
			pageName = 'demo';
		}

		var page = {};
		page[pageName] = true;

		var data = {
			appUrl : appUrl,
			page : page,
			pageTitle : pageName
		};

		var content = readFileSync(path, 'utf-8');

		content = content.replace(/<title>(.*?)<\/title>/i, function(full, title) {
			data.pageTitle = title;
			return '';
		});
		content = content.replace(/^\s*#([^#].*)/, function(full, title) {
			data.pageTitle = title;
			return '';
		});

		if (/\.md$/.test(path)) {
			content = md2html(content);
		}

		content = content.replace(/\{\{include (.*?)\}\}/ig, function(full, subPath) {
			if (subPath.charAt(0) == '/') {
				subPath = Path.resolve('./src' + subPath + '.inc.html');
			} else {
				subPath = Path.resolve(dirPath + '/' + subPath + '.inc.html');
			}
			return readFileSync(subPath, 'utf-8');
		});

		var contentTemplate = Handlebars.compile(content);
		content = contentTemplate(data);

		var filePath = Path.resolve(relativePath).replace(/\.md$/, '.html');
		writeFileSync(filePath, content);
	});
}

main();
