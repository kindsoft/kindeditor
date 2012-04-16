<?php

require_once dirname(__FILE__) . '/KindEditorDriver.php';

$driver = new KindEditorDriver('test/total.html');

$driver->html('');
// bold
$driver->clickToolbar('bold');
$driver->input('abc');
equals($driver->html(), '<strong>abc</strong>');
// fontsize
$driver->clickToolbar('fontsize');
$driver->selector('.ke-menu-item', 6)->mouseover()->click();
$driver->input('abc');
equals($driver->html(), '<strong>abc<span style="font-size:24px;">abc</span></strong>');
// removeformat
$driver->clickToolbar('removeformat');
$driver->input('123');
equals($driver->html(), '<strong>abc<span style="font-size:24px;">abc</span></strong>123');

$driver->close();
