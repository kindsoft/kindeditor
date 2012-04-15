<?php

require_once dirname(__FILE__) . '/KindEditorDriver.php';

$driver = new KindEditorDriver('test/dialog.html');

// drag dialog
$prevTop = intval($driver->script("return KindEditor('.ke-dialog').css('top')"));
$prevLeft = intval($driver->script("return KindEditor('.ke-dialog').css('left')"));
$driver->selector('.ke-dialog-header')->drag(100, 200);
equals(intval($driver->script("return KindEditor('.ke-dialog').css('top')")), $prevTop + 200);
equals(intval($driver->script("return KindEditor('.ke-dialog').css('left')")), $prevLeft + 100);

// close dialog
$driver->selector('.ke-dialog-icon-close')->click();

$driver->close();
