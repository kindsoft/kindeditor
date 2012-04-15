<?php

require_once dirname(__FILE__) . '/KindEditorDriver.php';

$testFiles = array(
	'test/core.html',
	'test/event.html',
	'test/html.html',
	'test/selector.html',
	'test/node.html',
	'test/range.html',
	'test/cmd.html',
	'test/editor.html',
);

$driver = new KindEditorDriver();

foreach ($testFiles as $file) {
	$driver->open($file);
	equals($driver->selector('.failed')->element->text(), '0');
}

$driver->close();
