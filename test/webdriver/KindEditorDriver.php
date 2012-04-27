<?php

require_once dirname(__FILE__) . '/php-webdriver/__init__.php';

class KindEditorDriver {

	public $webDriver;
	public $session;
	public $element;
	public $timeout = 30;
	public $baseUrl = 'http://localhost/github-kindsoft/kindeditor/';

	public function __construct($url = '', $browser = 'internet explorer', $serverUrl = 'http://localhost:4444/wd/hub') {

		$options = getopt('', array(
			"browser:",
		));
		$browser = isset($options['browser']) ? $options['browser'] : $browser;

		$this->webDriver = new WebDriver($serverUrl);
		$this->session = $this->webDriver->session($browser);
		if ($url !== '') {
			$this->open($url);
		}
	}

	public function open($url) {
		if (strpos($url, 'http://') !== 0) {
			$url = $this->baseUrl . $url;
		}
		$this->session->open($url);
		return $this;
	}

	public function selector($selector, $index = 0) {
		$endTime = time() + $this->timeout;
		while (true) {
			try {
				if ($index > 0) {
					$elements = $this->session->elements('css selector', $selector);
					$this->element = $elements[$index];
				} else {
					$this->element = $this->session->element('css selector', $selector);
				}
				return $this;
			} catch (NoSuchElementWebDriverError $e) {
			}
			sleep(1);
			if (time() > $endTime) {
				break;
			}
		}
		throw new TimeOutWebDriverError('The element could not be found', '');
	}

	public function value($val) {
		$this->element->value(array('value' => strSplitUnicode($val)));
		return $this;
	}

	public function keys($val) {
		$this->session->keys(array('value' => strSplitUnicode($val)));
		return $this;
	}

	public function click() {
		$this->element->click('');
		return $this;
	}

	public function mouseover() {
		$this->session->moveto(array('element' => $this->element->getID()));
		return $this;
	}

	public function script($script) {
		return $this->session->execute(array(
			'script' => $script,
			'args' => array(),
		));
	}

	public function clickToolbar($name) {
		$this->session->frame(array('id' => null));
		return $this->selector('.ke-icon-' . $name)->click();
	}

	// get or set editor content
	public function html($val = null) {
		$this->session->frame(array('id' => null));
		if ($val === null) {
			return preg_replace('/[\r\n\t]/', '', $this->script("return editor.html();"));
		}
		$this->script("editor.html('$val');");
		return $this;
	}

	// input editor content
	public function input($val) {
		$id = 'ke-edit-iframe';
		$this->script("KindEditor('.ke-edit-iframe').eq(0).attr('id', '$id');");
		$this->selector("#$id");
		$this->session->frame(array('id' => $id));
		$this->keys($val);
		return $this;
	}

	// drag element
	public function drag($x, $y) {
		//$id = 'document-body';
		//$this->script("KindEditor('body').attr('id', '$id');");

		$this->mouseover();
		$this->session->buttondown("");
		$this->session->moveto(array(
			//'element' => $id,
			'xoffset' => $x,
			'yoffset' => $y,
		));
		$this->session->buttonup("");
		return $this;
	}

	public function close() {
		$this->session->close();
		return $this;
	}

}

function strSplitUnicode($str, $l = 1) {
	if ($l > 0) {
		$ret = array();
		$len = mb_strlen($str, "UTF-8");
		for ($i = 0; $i < $len; $i += $l) {
			$ret[] = mb_substr($str, $i, $l, "UTF-8");
		}
		return $ret;
	}
	return preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY);
}

function equals($a, $b) {
	if ($a === $b) {
		echo "[OK] \"$a\"\n";
	} else {
		echo "[FAILED]\n";
		echo "Expected: \"$b\"\n";
		echo "Result: \"$a\"\n";
	}
}
