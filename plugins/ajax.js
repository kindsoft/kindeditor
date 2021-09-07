/* global ActiveXObject */

(function(K) {
	//From http://www.json.org/json2.js
	function _json(text) {
		var match;
		if ((match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text))) {
			text = match[0];
		}
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		cx.lastIndex = 0;
		if (cx.test(text)) {
			text = text.replace(cx, function (a) {
				return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			});
		}
		if (/^[\],:{}\s]*$/.
		test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
			return eval('(' + text + ')');
		}
		throw 'JSON parse error';
	}

	function _ajax(url, fn, method, param, dataType) {
		method = method || 'GET'; //POST or GET
		dataType = dataType || 'json'; //json or html
		var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open(method, url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (fn) {
					var data = K.trim(xhr.responseText);
					if (dataType == 'json') {
						data = _json(data);
					}
					fn(data);
				}
			}
		};
		if (method == 'POST') {
			var params = [];
			K.each(param, function(key, val) {
				params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
			});
			try {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			} catch (e) {}
			xhr.send(params.join('&'));
		} else {
			xhr.send(null);
		}
	}

	K.json = _json;
	K.ajax = _ajax;

})(KindEditor);
