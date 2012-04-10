<?php

require_once dirname(__FILE__) . '/php-webdriver/__init__.php';

class KindEditorDriver {

	public $webDriver;
	public $session;
	public $element;

	public function __construct($url, $browser = 'internet explorer', $serverUrl = 'http://localhost:4444/wd/hub') {

		$options = getopt('', array(
			"browser:",
		));
		$browser = isset($options['browser']) ? $options['browser'] : $browser;

		$this->webDriver = new WebDriver($serverUrl);
		$this->session = $this->webDriver->session($browser);
		$this->session->open($url);
	}

	public function open($url) {
		$this->session->open($url);
		return $this;
	}

	public function selector($selector, $index = 0) {
		if ($index > 0) {
			$elements = $this->session->elements('css selector', $selector);
			$this->element = $elements[$index];
		} else {
			$this->element = $this->session->element('css selector', $selector);
		}
		return $this;
	}

	public function xpath($xpath) {
		$this->element = $this->session->element('xpath', $xpath);
		return $this;
	}

	public function value($val) {
		$this->element->value(array('value' => str_split($val)));
		return $this;
	}

	public function keys($val) {
		$this->session->keys(array('value' => str_split($val)));
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
		// set iframe ID
		$this->script("KindEditor('.ke-edit-iframe').eq(0).attr('id', '$id');");
		$this->selector("#$id");
		$this->session->frame(array('id' => $id));
		$this->keys($val);
	}

	public function close() {
		$this->session->close();
	}

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
