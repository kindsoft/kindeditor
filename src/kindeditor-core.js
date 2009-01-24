/*******************************************************************************
* WYSIWYG HTML Editor for Internet
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0
*******************************************************************************/

KE.$ = function(id, doc){
    var doc = doc || document;
    return doc.getElementById(id);
};
KE.$$ = function(name, doc){
    var doc = doc || document;
    return doc.createElement(name);
};
KE.event = {
    add : function(el, event, listener) {
        if (el.addEventListener){
            el.addEventListener(event, listener, false);
        } else if (el.attachEvent){
            el.attachEvent('on' + event, listener);
        }
    },
    remove : function(el, event, listener) {
        if (el.removeEventListener){
            el.removeEventListener(event, listener, false);
        } else if (el.detachEvent){
            el.detachEvent('on' + event, listener);
        }
    }
};
KE.util = {
    getDocumentElement : function() {
        return (document.compatMode != "CSS1Compat") ? document.body : document.documentElement;
    },
    getDocumentHeight: function() {
        var el = this.getDocumentElement();
        return Math.max(el.scrollHeight, el.clientHeight);
    },
    getDocumentWidth: function() {
        var el = this.getDocumentElement();
        return Math.max(el.scrollWidth, el.clientWidth);
    },
    getScriptPath : function() {
        var elements = document.getElementsByTagName('script');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].src && elements[i].src.match(/kindeditor[\w\-\.]*\.js/) != null) {
                return elements[i].src.substring(0, elements[i].src.lastIndexOf('/') + 1);
            }
        }
    },
    getHtmlPath : function() {
        return location.href.substring(0, location.href.lastIndexOf('/') + 1);
    },
    getBrowser : function() {
        var browser = '';
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("msie") > -1) {
            browser = 'IE';
        } else if (ua.indexOf("gecko") > -1) {
            browser = 'GECKO';
        } else if (ua.indexOf("opera") > -1) {
            browser = 'OPERA';
        }
        return browser;
    },
    loadStyle : function(path) {
        var link = KE.$$('link');
        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', path);
        document.getElementsByTagName("head")[0].appendChild(link);
    },
    inArray : function(str, arr) {
        for (var i in arr) {if (str == arr[i]) return true;}
        return false;
    },
    escape : function(html) {
        html = html.replace(/&/g, "&amp;");
        html = html.replace(/</g, "&lt;");
        html = html.replace(/>/g, "&gt;");
        return html;
    },
    getElementPos : function(el) {
        var x = 0;
        var y = 0;
        if (el.getBoundingClientRect) {
            var box = el.getBoundingClientRect();
            var el = this.getDocumentElement();
            x = box.left + el.scrollLeft - el.clientLeft;
            y = box.top + el.scrollTop - el.clientTop;
        } else {
            x = el.offsetLeft;
            y = el.offsetTop;
            var parent = el.offsetParent;
            while (parent) {
                x += parent.offsetLeft;
                y += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }
        return {'x' : x, 'y' : y};
    },
    getCoords : function(ev) {
        ev = ev || window.event;
        var el = this.getDocumentElement();
        if (ev.pageX) return { x : ev.pageX, y : ev.pageY};
        return {
            x : ev.clientX + el.scrollLeft - el.clientLeft,
            y : ev.clientY + el.scrollTop - el.clientTop
        };
    },
    setOpacity : function(el, opacity) {
        if (KE.browser == 'IE') {
            el.style.filter = (opacity == 100) ? "" : "gray() alpha(opacity=" + opacity + ")";
        } else {
            el.style.opacity = (opacity == 100) ? "" : "0." + opacity.toString();
        }
    },
    showBottom : function(id) {
        KE.g[id].bottom.style.display = 'block';
    },
    hideBottom : function(id) {
        KE.g[id].bottom.style.display = 'none';
    },
    drag : function(id, mousedownObj, moveObj, func) {
        var obj = KE.g[id];
        mousedownObj.onmousedown = function(event) {
            if (obj.wyswygMode) {
                obj.iframe.style.display = 'none';
            }
            if (KE.browser != 'IE') event.preventDefault();
            var ev = event || window.event;
            var pos = KE.util.getCoords(ev);
            var objTop = parseInt(moveObj.style.top);
            var objLeft = parseInt(moveObj.style.left);
            var objWidth = parseInt(moveObj.style.width);
            var objHeight = parseInt(moveObj.style.height);
            var mouseTop = pos.y;
            var mouseLeft = pos.x;
            var dragFlag = true;
            var moveListener = function(event) {
                if (dragFlag) {
                    var ev = event || window.event;
                    var pos = KE.util.getCoords(ev);
                    var top = pos.y - mouseTop;
                    var left = pos.x - mouseLeft;
                    func(objTop, objLeft, objWidth, objHeight, top, left);
                }
                return false;
            };
            var upListener = function(event) {
                if (obj.wyswygMode) {
                    obj.iframe.style.display = '';
                }
                dragFlag = false;
                KE.event.remove(document, 'mousemove', moveListener);
                KE.event.remove(document, 'mouseup', upListener);
            };
            KE.event.add(document, 'mousemove', moveListener);
            KE.event.add(document, 'mouseup', upListener);
        };
    },
    setDefaultPlugin : function(id) {
        var items = [
            'cut', 'copy', 'paste', 'selectall', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript','superscript',
            'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'unlink'
        ];
        for (var i in items) {
            KE.plugin[items[i]] = {
                click : new Function('id', 'KE.util.execCommand(id, "' + items[i] + '", null);')
            };
        }
    },
    getIframeDoc : function(iframe) {
        var win = iframe.contentWindow;
        var doc = null;
        if (iframe.contentDocument) {
            doc = iframe.contentDocument;
        } else {
            doc = win.document;
        }
        return doc;
    },
    getFullHtml : function(id) {
        var html = '<html>';
        html += '<head>';
        html += '<base href="' + KE.htmlPath + '" />';
        html += '<title>editor</title>';
        if (KE.g[id].cssPath) {
            html += '<link href="' + KE.g[id].cssPath + '" rel="stylesheet" type="text/css" />';
        }
        html += '</head>';
        html += '<body>';
        html += '</body>';
        html += '</html>';
        return html;
    },
    resize : function(id, width, height) {
        var obj = KE.g[id];
        if (width <= obj.minWidth || height <= obj.minHeight) return;
        obj.container.style.width = width + 'px';
        obj.container.style.height = height + 'px';
        obj.formDiv.style.height = height + 'px';
        var diff = obj.toolbarDiv.offsetHeight + obj.bottom.offsetHeight;
        var formBorder = obj.formDiv.offsetHeight - obj.formDiv.clientHeight;
        height -= diff + formBorder;
        if (KE.browser == 'IE') {
            var border = obj.container.offsetWidth - obj.container.clientWidth;
            if (document.compatMode != "CSS1Compat") {
                height -= border;
                width -= border;
                obj.formDiv.style.height = (height + formBorder) + 'px';
            } else {
                obj.formDiv.style.height = height + 'px';
            }
            obj.iframe.style.height = height + 'px';
            obj.newTextarea.style.width = (width - border) + 'px';
            obj.newTextarea.style.height = (height - formBorder) + 'px';
        } else {
            obj.formDiv.style.height = height + 'px';
            obj.iframe.style.height = height + 'px';
            obj.newTextarea.style.width = '100%';
            obj.newTextarea.style.height = height + 'px';
        }
    },
    getData : function(id, filterMode) {
        var data;
        filterMode = (typeof filterMode == "undefined") ? true : filterMode;
        if (KE.g[id].wyswygMode) {
            if (filterMode) {
                data = KE.util.outputHtml(id, KE.g[id].iframeDoc.body);
            } else {
                data = KE.g[id].iframeDoc.body.innerHTML;
            }
        } else {
            data = KE.g[id].newTextarea.value;
        }
        return data;
    },
    setData : function(id) {
        var data = this.getData(id, KE.g[id].filterMode);
        KE.g[id].srcTextarea.value = data;
    },
    getPureData : function(id) {
        var data = this.getData(id, false);
        data = data.replace(/<br[\s\/]{0,2}>/ig, "\r\n");
        data = data.replace(/<.*?>/ig, "");
        return data;
    },
    setPureData : function(id) {
        var data = this.getPureData(id);
        KE.g[id].srcTextarea.value = data;
    },
    focus : function(id) {
        if (KE.g[id].wyswygMode) {
            KE.g[id].iframeWin.focus();
        } else {
            KE.g[id].newTextarea.focus();
        }
    },
    click : function(id, cmd) {
        KE.layout.hide(id);
        KE.util.focus(id);
        KE.plugin[cmd].click(id);
    },
    selection : function(id) {
        var win = KE.g[id].iframeWin;
        var doc = KE.g[id].iframeDoc;
        var sel = win.getSelection ? win.getSelection() : doc.selection;
        var range;
        try {
            if (sel.rangeCount > 0) {
                range = sel.getRangeAt(0);
            } else {
                range = sel.createRange ? sel.createRange() : doc.createRange();
            }
        } catch(e) {}
        if (!range) {
            range = (KE.browser = 'IE') ? doc.body.createTextRange() : doc.createRange();
        }
        KE.g[id].selection = sel;
        KE.g[id].range = range;
    },
    select : function(id) {
        if (KE.browser == 'IE') KE.g[id].range.select();
    },
    pToBr : function(id) {
        if(KE.browser == 'IE') {
            KE.event.add(KE.g[id].iframeDoc, 'keydown', function(e) {
                if (e.keyCode == 13) {
                    KE.util.selection(id);
                    if(KE.g[id].range.parentElement().tagName != 'LI') {
                        KE.util.insertHtml(id, '<br />');
                        return false;
                    }
                }
            });
        }
    },
    execCommand : function(id, cmd, value) {
        try {
            KE.g[id].iframeDoc.execCommand(cmd, false, value);
        } catch(e) {}
        KE.history.add(id, false);
    },
    insertHtml : function(id, html) {
        if (html == '') return;
        KE.util.select(id);
        if (KE.browser == 'IE') {
            if (KE.g[id].selection.type.toLowerCase() == 'control') {
                KE.g[id].range.item(0).outerHTML = html;
            } else {
                KE.g[id].range.pasteHTML(html);
            }
            KE.history.add(id, false);
        } else {
            this.execCommand(id, 'inserthtml', html);
        }
    },
    removeDomain : function(id, url) {
        for (var i = 0; i < KE.g[id].siteDomains.length; i++) {
            var domain = "http://" + KE.g[id].siteDomains;
            if (url.indexOf(domain) == 0) {
                url = url.substr(domain.length);
            }
        }
        return url;
    },
    outputHtml : function(id, element) {
        var htmlList = [];
        var startTags = [];
        var setStartTag = function(tagName, attr, style, endFlag) {
            var html = '';
            html += '<' + tagName;
            if (attr) html += attr;
            if (style) html += ' style="' + style + '"';
            html += endFlag ? ' />' : '>';
            if (KE.browser == 'IE' && endFlag && KE.util.inArray(tagName, ['br', 'hr'])) html += "\n";
            htmlList.push(html);
            if (!endFlag) startTags.push(tagName);
        }
        var setEndTag = function() {
            if (startTags.length > 0) {
                var endTag = startTags.pop();
                var html = '</' + endTag + '>';
                if (KE.browser == 'IE' && KE.util.inArray(endTag, ['p', 'div', 'table', 'ol', 'ul'])) html += "\n";
                htmlList.push(html);
            }
        }
        var scanNodes = function(el) {
            var nodes = el.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                switch (node.nodeType) {
                case 1:
                    var tagName = node.tagName.toLowerCase();
                    var attr = '';
                    var style = '';
                    switch (tagName) {
                    case 'font':
                        if (node.color) attr += ' color="' + node.color + '"';
                        if (node.size) attr += ' size="' + node.size + '"';
                        if (node.face) attr += ' face="' + node.face + '"';
                        if (node.style.backgroundColor) style += 'background-color:' + node.style.backgroundColor + ';';
                        setStartTag(tagName, attr, style, false);
                        break;
                    case 'span':
                        if (node.style.color) style += 'color:' + node.style.color + ';';
                        if (node.style.backgroundColor) style += 'background-color:' + node.style.backgroundColor + ';';
                        if (node.style.fontSize) style += 'font-size:' + node.style.fontSize + ';';
                        if (node.style.fontFamily) style += 'font-family:' + node.style.fontFamily + ';';
                        if (node.style.fontWeight) style += 'font-weight:' + node.style.fontWeight + ';';
                        if (node.style.fontStyle) style += 'font-style:' + node.style.fontStyle + ';';
                        if (node.style.textDecoration) style += 'text-decoration:' + node.style.textDecoration + ';';
                        if (node.style.verticalAlign) style += 'vertical-align:' + node.style.verticalAlign + ';';
                        setStartTag(tagName, attr, style, false);
                        break;
                     case 'div':
                        if (node.align) attr += ' align="' + node.align + '"';
                        if (node.style.border) {
                            style += 'border:' + node.style.border + ';';
                        } else {
                            if (node.style.borderWidth && node.style.borderStyle && node.style.borderColor) {
                                style += 'border:' + node.style.borderWidth + ' ' + node.style.borderStyle + ' ' + node.style.borderColor + ';';
                            }
                        }
                        if (node.style.margin) {
                            style += 'margin:' + node.style.margin + ';';
                        } else {
                            if (node.style.marginLeft) style += 'margin-left:' + node.style.marginLeft + ';';
                            if (node.style.marginRight) style += 'margin-right:' + node.style.marginRight + ';';
                            if (node.style.marginTop) style += 'margin-top:' + node.style.marginTop + ';';
                            if (node.style.marginBottom) style += 'margin-bottom:' + node.style.marginBottom + ';';
                        }
                        if (node.style.padding) {
                            style += 'padding:' + node.style.padding + ';';
                        } else {
                            if (node.style.paddingLeft) style += 'padding-left:' + node.style.paddingLeft + ';';
                            if (node.style.paddingRight) style += 'padding-right:' + node.style.paddingRight + ';';
                            if (node.style.paddingTop) style += 'padding-top:' + node.style.paddingTop + ';';
                            if (node.style.paddingBottom) style += 'padding-bottom:' + node.style.paddingBottom + ';';
                        }
                        if (node.style.textAlign) style += 'text-align:' + node.style.textAlign + ';';
                        setStartTag(tagName, attr, style, false);
                        break;
                     case 'a':
                        if (node.href) attr += ' href="' + KE.util.removeDomain(id, node.href) + '"';
                        if (node.target) attr += ' target="' + node.target + '"';
                        setStartTag(tagName, attr, style);
                        break;
                    case 'table':
                        if (typeof node.border != 'undefined') attr += ' border="' + node.border + '"';
                        setStartTag(tagName, attr, style, false);
                        break;
                    case 'embed':
                        if (node.src) attr += ' src="' + KE.util.removeDomain(id, node.src) + '"';
                        if (node.getAttribute('type')) attr += ' type="' + node.getAttribute('type') + '"';
                        if (node.getAttribute('loop')) attr += ' loop="' + node.getAttribute('loop') + '"';
                        if (node.getAttribute('autostart')) attr += ' autostart="' + node.getAttribute('autostart') + '"';
                        if (node.getAttribute('quality')) attr += ' quality="' + node.getAttribute('quality') + '"';
                        if (node.style.width) style += 'width:' + node.style.width + ';';
                        if (node.style.height) style += 'height:' + node.style.height + ';';
                        setStartTag(tagName, attr, style, true);
                        break;
                    case 'img':
                        if (node.src) attr += ' src="' + KE.util.removeDomain(id, node.src) + '"';
                        if (node.width) attr += ' width="' + node.width + '"';
                        if (node.height) attr += ' height="' + node.height + '"';
                        if (node.border) attr += ' border="' + node.border + '"';
                        if (node.alt) attr += ' alt="' + node.alt + '"';
                        if (node.title) attr += ' title="' + node.title + '"';
                        setStartTag(tagName, attr, style, true);
                        break;
                    case 'hr':
                    case 'br':
                        setStartTag(tagName, attr, style, true);
                        break;
                    case 'p':
                        if (node.align) attr += ' align="' + node.align + '"';
                        setStartTag(tagName, attr, style, false);
                        break;
                    case 'tbody':
                    case 'tr':
                    case 'td':
                    case 'strong':
                    case 'b':
                    case 'ol':
                    case 'ul':
                    case 'li':
                    case 'sub':
                    case 'sup':
                    case 'blockquote':
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                    case 'em':
                    case 'u':
                    case 'strike':
                        setStartTag(tagName, attr, style, false);
                        break;
                    default:
                        break;
                    }
                    if (node.hasChildNodes()) {
                        scanNodes(node);
                    } else {
                        if (startTags.length > 0) {
                            var prevHtml = htmlList[htmlList.length - 1];
                            if (prevHtml.match(/^<p|^<div/) != null) {
                                htmlList.push("&nbsp;");
                                setEndTag();
                            }
                        }
                    }
                    break;
                case 3:
                    htmlList.push(KE.util.escape(node.nodeValue));
                    break;
                default:
                    break;
                }
            }
            setEndTag();
        };
        scanNodes(element);
        return htmlList.join('');
    }
};
KE.layout = {
    show : function(id, div)
    {
        KE.layout.hide(id);
        KE.g[id].hideDiv.appendChild(div);
        KE.g[id].hideDiv.style.display = 'block';
        KE.g[id].layoutDiv = div;
    },
    hide : function(id)
    {
        try {
            KE.g[id].hideDiv.removeChild(KE.g[id].layoutDiv);
        } catch (e) {}
        KE.g[id].hideDiv.style.display = 'none';
        KE.g[id].maskDiv.style.display = 'none';
        KE.util.focus(id);
    },
    make : function(id)
    {
        var div = KE.$$('div');
        div.style.position = 'absolute';
        div.style.zIndex = 19811214;
        return div;
    }
};
KE.menu = function(arg){
    this.arg = arg;
    var div = KE.layout.make(arg.id);
    div.className = 'ke-menu';
    var obj = KE.g[arg.id].toolbarIcon[arg.cmd];
    var pos = KE.util.getElementPos(obj);
    div.style.top = pos.y + obj.offsetHeight + 'px';
    div.style.left = pos.x + 'px';
    this.div = div;
    this.add = function(html, event)
    {
        var cDiv = KE.$$('div');
        cDiv.className = 'ke-menu-noselected';
        cDiv.style.width = this.arg.width;
        cDiv.onmouseover = function() { this.className = 'ke-menu-selected'; }
        cDiv.onmouseout = function() { this.className = 'ke-menu-noselected'; }
        cDiv.onclick = event;
        cDiv.innerHTML = html;
        this.append(cDiv);
    };
    this.append = function(el)
    {
        this.div.appendChild(el);
    };
    this.insert = function(html)
    {
        this.div.innerHTML = html;
    };
    this.show = function()
    {
        KE.layout.show(this.arg.id, this.div);
    };
    this.picker = function()
    {
        var colorTable = KE.lang['colorTable'];
        var table = KE.$$('table');
        table.cellPadding = 0;
        table.cellSpacing = 0;
        table.border = 0;
        table.style.margin = 0;
        table.style.padding = 0;
        table.style.borderCollapse = 'separate';
        for (var i = 0; i < colorTable.length; i++) {
            var row = table.insertRow(i);
            for (var j = 0; j < colorTable[i].length; j++) {
                var cell = row.insertCell(j);
                cell.className = 'ke-picker-cell';
                cell.style.backgroundColor = colorTable[i][j];
                cell.title = colorTable[i][j];
                cell.onmouseover = function() {this.style.borderColor = '#000000'; }
                cell.onmouseout = function() {this.style.borderColor = '#F0F0EE'; }
                cell.onclick = new Function('KE.plugin["' + this.arg.cmd + '"].exec("' +
                                            this.arg.id + '", "' + colorTable[i][j] + '")');
                cell.innerHTML = '&nbsp;';
            }
        }
        this.append(table);
        this.show();
    };
};
KE.dialog = function(arg){
    this.arg = arg;
    this.topHeight = 20;
    this.bottomHeight = 76;
    this.getPos = function() {
        var arg = this.arg;
        var id = this.arg.id;
        var pos = KE.util.getElementPos(KE.g[id].container);
        var height = arg.height + this.topHeight + this.bottomHeight;
        var xDiff = Math.round(parseInt(KE.g[id].container.style.width) / 2) - Math.round(arg.width / 2);
        var yDiff = Math.round(parseInt(KE.g[id].container.style.height) / 2) - Math.round(height / 2);
        var x = xDiff < 0 ? pos.x : pos.x + xDiff;
        var y = yDiff < 0 ? pos.y : pos.y + yDiff;
        return {'x' : x, 'y' : y};
    };
    this.show = function() {
        var arg = this.arg;
        var id = arg.id;
        var div = KE.layout.make(arg.id);
        div.className = 'ke-dialog';
        var pos = this.getPos();
        div.style.width = (arg.width + this.topHeight) + 'px';
        div.style.height = (arg.height + this.bottomHeight) + 'px';
        div.style.top = pos.y + 'px';
        div.style.left = pos.x + 'px';
        var titleDiv = KE.$$('div');
        titleDiv.className = 'ke-dialog-title';
        titleDiv.innerHTML = arg.title;
        var img = KE.$$('img');
        img.src = KE.g[id].skinsPath + 'spacer.gif';
        var url = KE.g[id].skinsPath + KE.g[id].skinType + '.gif';
        img.style.backgroundImage = "url(" + url + ")";
        img.className = "ke-toolbar-close";
        img.alt = KE.lang['close'];
        img.title = KE.lang['close'];
        img.onclick = new Function("KE.layout.hide('" + id + "')");
        titleDiv.appendChild(img);
        KE.util.drag(id, titleDiv, div, function(objTop, objLeft, objWidth, objHeight, top, left) {
            div.style.top = (objTop + top) + 'px';
            div.style.left = (objLeft + left) + 'px';
        });
        div.appendChild(titleDiv);
        var bodyDiv = KE.$$('div');
        bodyDiv.className = 'ke-dialog-body';
        var dialog = KE.$$('iframe');
        if (arg.useFrameCSS) {
            dialog.className = 'ke-dialog-iframe';
        }
        dialog.width = arg.width + 'px';
        dialog.height = arg.height + 'px';
        dialog.setAttribute("frameBorder", "0");
        bodyDiv.appendChild(dialog);
        div.appendChild(bodyDiv);

        var bottomDiv = KE.$$('div');
        bottomDiv.className = 'ke-dialog-bottom';
        var noButton = null;
        var yesButton = null;
        var previewButton = null;
        if (arg.noButton) {
            noButton = KE.$$('input');
            noButton.className = 'ke-dialog-no';
            noButton.type = 'button';
            noButton.name = 'noButton';
            noButton.value = arg.noButton;
            noButton.onclick = new Function("KE.layout.hide('" + id + "')");
            bottomDiv.appendChild(noButton);
        }
        if (arg.yesButton) {
            yesButton = KE.$$('input');
            yesButton.className = 'ke-dialog-yes';
            yesButton.type = 'button';
            yesButton.name = 'yesButton';
            yesButton.value = arg.yesButton;
            yesButton.onclick = new Function("KE.plugin['" + arg.cmd  + "'].exec('" + id + "')");
            bottomDiv.appendChild(yesButton);
        }
        if (arg.previewButton) {
            previewButton = KE.$$('input');
            previewButton.className = 'ke-dialog-preview';
            previewButton.type = 'button';
            previewButton.name = 'previewButton';
            previewButton.value = arg.previewButton;
            previewButton.onclick = new Function("KE.plugin['" + arg.cmd  + "'].preview('" + id + "')");
            bottomDiv.appendChild(previewButton);
        }
        div.appendChild(bottomDiv);
        KE.layout.show(id, div);
        window.focus();
        if (yesButton) yesButton.focus();
        else if (noButton) noButton.focus();
        if (typeof arg.html != "undefined") {
            var dialogDoc = KE.util.getIframeDoc(dialog);
            var html = KE.util.getFullHtml(id);
            dialogDoc.open();
            dialogDoc.write(html);
            dialogDoc.close();
            dialogDoc.body.innerHTML = arg.html;
        } else {
            dialog.src = KE.g[id].pluginsPath + arg.cmd + '.html';
        }
        KE.g[id].maskDiv.style.width = KE.util.getDocumentWidth() + 'px';
        KE.g[id].maskDiv.style.height = KE.util.getDocumentHeight() + 'px';
        KE.g[id].maskDiv.style.display = 'block';
        KE.g[id].dialog = dialog;
        KE.g[id].noButton = noButton;
        KE.g[id].yesButton = yesButton;
        KE.g[id].previewButton = previewButton;
    };
};
KE.toolbar = {
    able : function(id, arr) {
        for (var cmd in KE.g[id].toolbarIcon) {
            if (KE.util.inArray(cmd, arr)) continue;
            var obj = KE.g[id].toolbarIcon[cmd];
            obj.className = 'ke-icon';
            KE.util.setOpacity(obj, 100);
            obj.onmouseover = function(){ this.className = "ke-icon-selected"; };
            obj.onmouseout = function(){ this.className = "ke-icon"; };
            obj.onclick = new Function('KE.util.click("' + id + '", "' + cmd + '")');
        }
    },
    disable : function(id, arr) {
        for (var cmd in KE.g[id].toolbarIcon) {
            if (KE.util.inArray(cmd, arr)) continue;
            var obj = KE.g[id].toolbarIcon[cmd];
            obj.className = 'ke-icon-disabled';
            KE.util.setOpacity(obj, 50);
            obj.onmouseover = null;
            obj.onmouseout = null;
            obj.onclick = null;
        }
    },
    create : function(id) {
        KE.g[id].toolbarIcon = [];
        var toolbar = KE.$$('table');
        toolbar.className = 'ke-toolbar';
        toolbar.cellPadding = 0;
        toolbar.cellSpacing = 0;
        toolbar.border = 0;
        var row = toolbar.insertRow(0);
        var toolbarCell = row.insertCell(0);
        toolbarCell.style.padding = 0;
        toolbarCell.style.margin = 0;
        toolbarCell.style.border = 0;
        var length = KE.g[id].items.length;
        var cellNum = 0;
        var row;
        for (var i = 0; i < length; i++) {
            var cmd = KE.g[id].items[i];
            if (i == 0 || cmd == '-') {
                var table = KE.$$('table');
                table.cellPadding = 0;
                table.cellSpacing = 0;
                table.border = 0;
                table.className = 'ke-toolbar-table';
                row = table.insertRow(0);
                cellNum = 0;
                toolbarCell.appendChild(table);
                if (cmd == '-') continue;
            }
            var cell = row.insertCell(cellNum);
            cellNum++;
            var obj = KE.$$('img');
            obj.src = KE.g[id].skinsPath + 'spacer.gif';
            if (KE.util.inArray(cmd, KE.g[id].defaultItems)) {
                var url = KE.g[id].skinsPath + KE.g[id].skinType + '.gif';
                obj.style.backgroundImage = "url(" + url + ")";
            }
            obj.className = "ke-common-icon ke-icon-" + cmd;
            obj.alt = KE.lang[cmd];
            cell.className = 'ke-icon';
            cell.title = KE.lang[cmd];
            cell.onmouseover = function(){ this.className = "ke-icon-selected"; };
            cell.onmouseout = function(){ this.className = "ke-icon"; };
            cell.onclick = new Function('KE.util.click("' + id + '", "' + cmd + '")');
            cell.appendChild(obj);
            KE.g[id].toolbarIcon[cmd] = cell;
        }
        return toolbar;
    }
};
KE.history = {
    add : function(id, minChangeFlag) {
        var obj = KE.g[id];
        var html = KE.util.getData(id, false);
        if (obj.undoStack.length > 0) {
            var prevHtml = obj.undoStack[obj.undoStack.length - 1];
            if (html == prevHtml) return;
            if (minChangeFlag && Math.abs(html.length - prevHtml.length) < obj.minChangeSize) return;
        }
        obj.undoStack.push(html);
        obj.redoStack = [];
    },
    undo : function(id) {
        var obj = KE.g[id];
        if (obj.undoStack.length == 0) return;
        var html = KE.util.getData(id, false);
        obj.redoStack.push(html);
        var prevHtml = obj.undoStack.pop();
        if (html == prevHtml && obj.undoStack.length > 0) {
            prevHtml = obj.undoStack.pop();
        }
        obj.iframeDoc.body.innerHTML = prevHtml;
        obj.newTextarea.value = prevHtml;
    },
    redo : function(id) {
        var obj = KE.g[id];
        if (obj.redoStack.length == 0) return;
        var html = KE.util.getData(id, false);
        obj.undoStack.push(html);
        var nextHtml = obj.redoStack.pop();
        obj.iframeDoc.body.innerHTML = nextHtml;
        obj.newTextarea.value = nextHtml;
    }
};
KE.remove = function(id, mode) {
    mode = (typeof mode == "undefined") ? 0 : mode;
    var container = KE.g[id].container;
    if (mode == 1) {
        document.body.removeChild(container);
    } else {
        var srcTextarea = KE.$(id);
        srcTextarea.parentNode.removeChild(container);
    }
    document.body.removeChild(KE.g[id].hideDiv);
    document.body.removeChild(KE.g[id].maskDiv);
    KE.g[id].containner = null;
};
KE.create = function(id, mode) {
    var srcTextarea = KE.$(id);
    mode = (typeof mode == "undefined") ? 0 : mode;
    if (mode == 0 && KE.g[id].container != null) return;
    var width = srcTextarea.style.width;
    var height = srcTextarea.style.height;
    var container = KE.$$('div');
    container.className = 'ke-container';
    container.style.width = width;
    container.style.height = height;
    if (mode == 1) document.body.appendChild(container);
    else srcTextarea.parentNode.insertBefore(container, srcTextarea);
    var toolbarDiv = KE.toolbar.create(id);
    container.appendChild(toolbarDiv);
    var iframe = KE.$$('iframe');
    iframe.className = 'ke-iframe';
    iframe.setAttribute("frameBorder", "0");
    var newTextarea = KE.$$('textarea');
    newTextarea.className = 'ke-textarea';
    newTextarea.style.display = 'none';
    var formDiv = KE.$$('div');
    formDiv.className = 'ke-form';
    formDiv.appendChild(iframe);
    formDiv.appendChild(newTextarea);
    container.appendChild(formDiv);
    var bottom = KE.$$('table');
    bottom.className = 'ke-bottom';
    bottom.cellPadding = 0;
    bottom.cellSpacing = 0;
    bottom.border = 0;
    var row = bottom.insertRow(0);
    var bottomLeft = row.insertCell(0);
    bottomLeft.className = 'ke-bottom-left';
    var bottomRight = row.insertCell(1);
    bottomRight.className = 'ke-bottom-right';
    var img = KE.$$('img');
    img.className = 'ke-bottom-right-img';
    img.src = KE.g[id].skinsPath + 'spacer.gif';
    bottomRight.appendChild(img);
    container.appendChild(bottom);
    var hideDiv = KE.$$('div');
    hideDiv.style.display = 'none';
    var maskDiv = KE.$$('div');
    maskDiv.className = 'ke-mask';
    KE.util.setOpacity(maskDiv, 50);
    document.body.appendChild(hideDiv);
    document.body.appendChild(maskDiv);
    srcTextarea.style.display = "none";
    KE.util.setDefaultPlugin(id);
    var iframeWin = iframe.contentWindow;
    var iframeDoc = KE.util.getIframeDoc(iframe);
    iframeDoc.designMode = "On";
    var html = KE.util.getFullHtml(id);
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
    if (srcTextarea.value) iframeDoc.body.innerHTML = srcTextarea.value;
    if (!KE.g[id].wyswygMode) {
        newTextarea.value = srcTextarea.value;
        newTextarea.style.display = 'block';
        iframe.style.display = 'none';
        KE.toolbar.disable(id, ['source', 'preview', 'fullscreen']);
    }
    if (KE.g[id].autoOnsubmitMode) {
        var form = srcTextarea.parentNode;
        while (form != null && form.tagName != 'FORM') { form = form.parentNode; }
        if (form != null && form.tagName == 'FORM') {
            KE.event.add(form, 'submit', new Function('KE.util.setData("' + id + '")'));
        }
    }
    KE.event.add(iframeDoc, 'click', new Function('KE.layout.hide("' + id + '")'));
    KE.event.add(newTextarea, 'click', new Function('KE.layout.hide("' + id + '")'));
    KE.event.add(iframeDoc, 'keyup', new Function('KE.history.add("' + id + '", true)'));
    KE.event.add(newTextarea, 'keyup', new Function('KE.history.add("' + id + '", true)'));
    KE.g[id].container = container;
    KE.g[id].toolbarDiv = toolbarDiv;
    KE.g[id].formDiv = formDiv;
    KE.g[id].iframe = iframe;
    KE.g[id].newTextarea = newTextarea;
    KE.g[id].srcTextarea = srcTextarea;
    KE.g[id].bottom = bottom;
    KE.g[id].hideDiv = hideDiv;
    KE.g[id].maskDiv = maskDiv;
    KE.g[id].iframeWin = iframeWin;
    KE.g[id].iframeDoc = iframeDoc;
    width = container.offsetWidth;
    height = container.offsetHeight;
    KE.g[id].width = width + 'px';
    KE.g[id].height = height + 'px';
    KE.util.resize(id, width, height);
    KE.util.drag(id, bottomRight, container, function(objTop, objLeft, objWidth, objHeight, top, left) {
        if (KE.g[id].resizeMode == 2) KE.util.resize(id, objWidth + left, objHeight + top);
        else if (KE.g[id].resizeMode == 1) KE.util.resize(id, objWidth, objHeight + top);
    });
    KE.util.drag(id, bottomLeft, container, function(objTop, objLeft, objWidth, objHeight, top, left) {
        KE.util.resize(id, objWidth, objHeight + top);
    });
    if (!KE.g[id].resizeMode) KE.util.hideBottom(id);
    KE.history.add(id, false);
    KE.util.focus(id);
};
KE.version = '3.0';
KE.scriptPath = KE.util.getScriptPath();
KE.htmlPath = KE.util.getHtmlPath();
KE.browser = KE.util.getBrowser();
KE.plugin = {};
KE.g = {};
KE.init = function(config) {
    config.wyswygMode = (typeof config.wyswygMode == "undefined") ? true : config.wyswygMode;
    config.autoOnsubmitMode = (typeof config.autoOnsubmitMode == "undefined") ? true : config.autoOnsubmitMode;
    config.resizeMode = (typeof config.resizeMode == "undefined") ? 2 : config.resizeMode;
    config.filterMode = (typeof config.filterMode == "undefined") ? true : config.filterMode;
    config.skinType = config.skinType || 'default';
    config.cssPath = config.cssPath || '';
    config.skinsPath = config.skinsPath || KE.scriptPath + 'skins/';
    config.pluginsPath = config.pluginsPath || KE.scriptPath + 'plugins/';
    config.minWidth = config.minWidth || 200;
    config.minHeight = config.minHeight || 100;
    config.minChangeSize = config.minChangeSize || 5;
    config.siteDomains = config.siteDomains || [];
    var defaultItems = [
        'source', 'preview', 'fullscreen', 'undo', 'redo', 'print', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
        'superscript', 'date', 'time', '-',
        'title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold',
        'italic', 'underline', 'strikethrough', 'removeformat', 'selectall', 'image',
        'flash', 'media', 'layer', 'table', 'specialchar', 'hr',
        'emoticons', 'link', 'unlink', 'about'
    ];
    config.defaultItems = defaultItems;
    config.items = config.items || defaultItems;
    KE.g[config.id] = config;
    KE.g[config.id].undoStack = [];
    KE.g[config.id].redoStack = [];
    KE.util.loadStyle(config.skinsPath + config.skinType + '.css');
}
KE.show = function(config) {
    KE.init(config);
    KE.event.add(window, 'load', new Function('KE.create("' + config.id + '")'));
};
