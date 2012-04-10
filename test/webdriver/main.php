<?php

// Usage: php /path/to/webdriver/main.php --browser=chrome

$options = getopt('', array(
	"browser:",
	"help"
));
if (isset($options['help'])) {
	echo 'php main.php --browser=chrome|firefox|"internet explorer"' . "\n";
	exit;
}
$browser = isset($options['browser']) ? $options['browser'] : 'internet explorer';

$dirPath = dirname(__FILE__);
$dirHandle = @opendir($dirPath);
if ($dirHandle) {
	while (false !== ($fileName = readdir($dirHandle))) {
		if (preg_match('/test.*\.php/', $fileName)) {
			$cmd = "php $dirPath/$fileName --browser=\"$browser\"";
			echo $cmd . "\n";
			system($cmd);
		}
	}
}

echo "tests finished.\n";
