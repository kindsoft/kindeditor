#!/usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');
const AdmZip = require('adm-zip');
const pkg = require('./package.json');
const today = new Date().toISOString().replace(/T.*/, ''); // yyyy-mm-dd

const lang = 'zh-CN';

// noinspection HttpUrlsUsage
const BANNER = `/* ${pkg.name} ${pkg.version} (${today}), Copyright (C) kindeditor.net, Licence: http://kindeditor.net/license.php */\n`;

// noinspection SpellCheckingInspection
const PLUGIN_FILES = [
    'plugins/ajax.js',
    `lang/${lang}.js`,
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
    'plugins/media/media.js',
    'plugins/multiimage/multiimage.js',
    'plugins/pagebreak/pagebreak.js',
    'plugins/plainpaste/plainpaste.js',
    'plugins/preview/preview.js',
    'plugins/quickformat/quickformat.js',
    'plugins/table/table.js',
    'plugins/template/template.js',
    'plugins/wordpaste/wordpaste.js',
    'plugins/fixtoolbar/fixtoolbar.js',
];

const concat = (...plugins) => ['src/header.js', 'dist/main.js', ...plugins, 'src/footer.js']
    .map(file => fs.readFileSync(file, 'utf8').replace(/\r/g, ''))
    // remove webpack generated codes
    .map((src, index) => index !== 1 ? src : src.replace(RegExp(('^'
        + '/******/ (function() { // webpackBootstrap\n'
        + '/******/ \t"use strict";\n'
        + 'var __webpack_exports__ = {};\n'
        + '%' // place holder for body
        + '/******/ })()\n;'
        + '$').replace(/[*(){}]/g, '\\$&').replace('%', '([\\s\\S]*)')), '$1')
    ).join('\n')
    .replace(/\${VERSION}/g, `${pkg.version} (${today})`) // yyyy-mm-dd
    .replace(/\${THISYEAR}/g, today.replace(/-.*/, '')) // yyyy
    .replace(/([\s\S])\/\*[\s\S]*?\*\//g, '$1') // remove block comments except header
    .replace(/(^;?|\s)\/\/.*$/mg, '')           // remove line comments
    .replace(/\s+$/mg, '')                      // remove trailing white spaces
    .replace(/\n+/g, '\n')                      // merge multiple blank lines to one
;

const fsize = /* Stats | string */x => `${x.size || Buffer.from(x, 'utf8').length}`.replace(/\d(?=(\d{3})+$)/g, '$&,');
const generate = (outputFilename, content, ie6) => {
    if (ie6) {
        content = content.replace(/,\s*json\s*:\s*JSON\.parse\b/, ''); // remove K.json initial for IE6 compatible
        console.log(`  - ${outputFilename} ${fsize(content)} (ie6 enabled)`);
    } else {
        console.log(`  - ${outputFilename} ${fsize(content)}`);
    }
    fs.writeFileSync(outputFilename, content, 'utf8');
    if (content.match(/webpack|CONCATENATED|harmony/)) {
        console.log('    ERR: webpack generated code still not striped');
        process.exit(1);
    }
    if (ie6 && content.match(/JSON\.parse/)) {
        console.log('    ERR: global JSON is not IE6 compatible');
        process.exit(1);
    }
    try {
        child_process.execSync('npm exec eslint -- '
            + `--color --no-ignore --no-eslintrc -c .eslintrc-es3.yaml ${outputFilename}`, {stdio : 'inherit'});
    } catch (e) {
        process.exit(1);
    }
};

(async () => {
    child_process.execSync('npm exec webpack', {stdio : 'inherit'});

    console.log();
    console.log('generating artifacts');
    generate('kindeditor.js', concat());
    generate('kindeditor-all.js', concat(...PLUGIN_FILES), true);

    const minify = async file => (await require('terser').minify(fs.readFileSync(file, 'utf8'), {
        ie8 : true, format : {comments : false},
    })).code;
    // generate('kindeditor-min.js', BANNER + (await minify('kindeditor.js')));
    generate('kindeditor-all-min.js', BANNER + (await minify('kindeditor-all.js')), true);

    const zipFileName = `dist/${pkg.filename}-${pkg.version}-${lang}.zip`;
    const zip = new AdmZip(null, {});
    fs.readdirSync('.', 'utf8').filter(name => /^(asp(\.net)?|jsp|lang|php|plugins|themes)$/.test(name))
        .forEach(name => zip.addLocalFolder(name, `kindeditor/${name}/`));
    fs.readdirSync('.', 'utf8').filter(name => /^(kindeditor.*\.js|license\.txt)$/.test(name))
        .forEach(name => zip.addLocalFile(name, 'kindeditor/'));
    zip.writeZip(zipFileName, () => {
        console.log(`  - ${zipFileName} ${fsize(fs.statSync(zipFileName))}`);
    });
})();
