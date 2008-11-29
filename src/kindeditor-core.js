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
            if (elements[i].src && elements[i].src.indexOf('kindeditor') != -1) {
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
            if (obj.wyswygMode == true) {
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
                KE.event.remove(document, 'mousemove', moveListener);
                KE.event.remove(document, 'mouseup', upListener);
                if (obj.wyswygMode == true) {
                    obj.iframe.style.display = 'block';
                }
                dragFlag = false;
            };
            KE.event.add(document, 'mousemove', moveListener);
            KE.event.add(document, 'mouseup', upListener);
        };
    },
    setDefaultPlugin : function(id) {
        var items = [
            'undo', 'redo', 'cut', 'copy', 'paste', 'selectall', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript','superscript',
            'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'unlink'
        ];
        for (var i in items) {
            KE.plugin[items[i]] = {
                click : new Function('id', 'KE.g[id].iframeDoc.execCommand("' + items[i] + '", false, null);')
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
    getFullHtml : function(id, body) {
        var html = '<html>';
        html += '<head>';
        html += '<base href="' + KE.htmlPath + '" />';
        html += '<title>editor</title>';
        if (KE.g[id].cssPath) {
            html += '<link href="' + KE.g[id].cssPath + '" rel="stylesheet" type="text/css" />';
        }
        html += '</head>';
        html += '<body>';
        if (parent.KE.browser == 'IE') {
            html += (body) ? body : '';
        } else {
            html += (body) ? body : '<br />';
        }
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
        height = height - diff - formBorder;
        obj.formDiv.style.height = height + 'px';
        obj.iframe.style.height = height + 'px';
        if (KE.browser == 'IE') {
            var border = obj.container.offsetWidth - obj.container.clientWidth;
            obj.newTextarea.style.width = (width - border) + 'px';
            obj.newTextarea.style.height = (height - formBorder) + 'px';
        } else {
            obj.newTextarea.style.width = '100%';
            obj.newTextarea.style.height = height + 'px';
        }
    },
    getData : function(id) {
        var data;
        if (KE.g[id].wyswygMode == true) {
            data = KE.g[id].iframeDoc.body.innerHTML;
        } else {
            data = KE.g[id].newTextarea.value;
        }
        return data;
    },
    setData : function(id) {
        var data = this.getData(id);
        KE.g[id].srcTextarea.value = data;
    },
    getPureData : function(id) {
        var data = this.getData(id);
        data = data.replace(/<br[\s\/]{0,2}>/ig, "\r\n");
        data = data.replace(/<.*?>/ig, "");
        return data;
    },
    setPureData : function(id) {
        var data = this.getPureData(id);
        KE.g[id].srcTextarea.value = data;
    },
    focus : function(id) {
        if (KE.g[id].wyswygMode == true) {
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
        var selection, range, rangeText;
        if (KE.g[id].iframeDoc.selection) {
            selection = KE.g[id].iframeDoc.selection;
            range = selection.createRange();
            rangeText = range.text;
        } else {
            selection = KE.g[id].iframeWin.getSelection();
            range = selection.getRangeAt(0);
            rangeText = range.toString();
        }
        KE.g[id].selection = selection;
        KE.g[id].range = range;
        KE.g[id].rangeText = rangeText;
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
    insertHtml : function(id, html) {
        if (html == '') return;
        KE.util.select(id);
        if (KE.browser == 'IE') {
            if (KE.g[id].selection.type.toLowerCase() == 'control') {
                KE.g[id].range.item(0).outerHTML = html;
            } else {
                KE.g[id].range.pasteHTML(html);
            }
        } else {
            KE.g[id].iframeDoc.execCommand('inserthtml', false, html);
        }
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
        var colorTable = [
                ["#FFFFFF","#E5E4E4","#D9D8D8","#C0BDBD","#A7A4A4","#8E8A8B","#827E7F","#767173","#5C585A","#000000"],
                ["#FEFCDF","#FEF4C4","#FEED9B","#FEE573","#FFED43","#F6CC0B","#E0B800","#C9A601","#AD8E00","#8C7301"],
                ["#FFDED3","#FFC4B0","#FF9D7D","#FF7A4E","#FF6600","#E95D00","#D15502","#BA4B01","#A44201","#8D3901"],
                ["#FFD2D0","#FFBAB7","#FE9A95","#FF7A73","#FF483F","#FE2419","#F10B00","#D40A00","#940000","#6D201B"],
                ["#FFDAED","#FFB7DC","#FFA1D1","#FF84C3","#FF57AC","#FD1289","#EC0078","#D6006D","#BB005F","#9B014F"],
                ["#FCD6FE","#FBBCFF","#F9A1FE","#F784FE","#F564FE","#F546FF","#F328FF","#D801E5","#C001CB","#8F0197"],
                ["#E2F0FE","#C7E2FE","#ADD5FE","#92C7FE","#6EB5FF","#48A2FF","#2690FE","#0162F4","#013ADD","#0021B0"],
                ["#D3FDFF","#ACFAFD","#7CFAFF","#4AF7FE","#1DE6FE","#01DEFF","#00CDEC","#01B6DE","#00A0C2","#0084A0"],
                ["#EDFFCF","#DFFEAA","#D1FD88","#BEFA5A","#A8F32A","#8FD80A","#79C101","#3FA701","#307F00","#156200"],
                ["#D4C89F","#DAAD88","#C49578","#C2877E","#AC8295","#C0A5C4","#969AC2","#92B7D7","#80ADAF","#9CA53B"]
            ];
        var table = KE.$$('table');
        table.cellPadding = 0;
        table.cellSpacing = 1;
        table.border = 0;
        for (var i = 0; i < colorTable.length; i++) {
            var row = table.insertRow(i);
            for (var j = 0; j < colorTable[i].length; j++) {
                var cell = row.insertCell(j);
                cell.className = 'ke-picker-cell';
                cell.style.background = colorTable[i][j];
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
        var x = 0;
        var y = 0;
        var pos = KE.util.getElementPos(KE.g[id].container);
        var height = arg.height + this.topHeight + this.bottomHeight;
        var xDiff = Math.round(parseInt(KE.g[id].container.style.width) / 2) - Math.round(arg.width / 2);
        var yDiff = Math.round(parseInt(KE.g[id].container.style.height) / 2) - Math.round(height / 2);
        if (xDiff < 0) {
            x = pos.x;
        } else {
            x = pos.x + xDiff;
        }
        if (yDiff < 0) {
            y = pos.y;
        } else {
            y = pos.y + yDiff;
        }
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
            var html = KE.util.getFullHtml(id, arg.html);
            dialogDoc.open();
            dialogDoc.write(html);
            dialogDoc.close();
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
    able : function(id, arr)
    {
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
    disable : function(id, arr)
    {
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
    create : function(id)
    {
        KE.g[id].toolbarIcon = [];
        var toolbar = KE.$$('table');
        toolbar.className = 'ke-toolbar';
        toolbar.cellPadding = 0;
        toolbar.cellSpacing = 0;
        toolbar.border = 0;
        var row = toolbar.insertRow(0);
        var toolbarCell = row.insertCell(0);
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
            var url = KE.g[id].skinsPath + KE.g[id].skinType + '.gif';
            obj.style.backgroundImage = "url(" + url + ")";
            obj.className = "ke-icon-" + cmd;
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
KE.create = function(id)
{
    var srcTextarea = KE.$(id);
    var width = srcTextarea.style.width;
    var height = srcTextarea.style.height;
    var container = KE.$$('div');
    container.className = 'ke-container';
    container.style.width = width;
    container.style.height = height;
    srcTextarea.parentNode.insertBefore(container, srcTextarea);
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
    var html = KE.util.getFullHtml(id, srcTextarea.value);
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
    if (KE.g[id].wyswygMode == false) {
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
            KE.util.resize(id, objWidth + left, objHeight + top);
        });
    KE.util.drag(id, bottomLeft, container, function(objTop, objLeft, objWidth, objHeight, top, left) {
            KE.util.resize(id, objWidth, objHeight + top);
        });
    if (KE.g[id].hideBottomMode) KE.util.hideBottom(id);
    KE.util.pToBr(id);
    KE.util.focus(id);
};
KE.version = '3.0 alpha';
KE.scriptPath = KE.util.getScriptPath();
KE.htmlPath = KE.util.getHtmlPath();
KE.browser = KE.util.getBrowser();
KE.plugin = {};
KE.g = {};
KE.init = function(config) {
    config.wyswygMode = (config.wyswygMode == false) ? false : true;
    config.autoOnsubmitMode = (config.autoOnsubmitMode == false) ? false : true;
    config.hideBottomMode = (config.hideBottomMode == true) ? true : false;
    config.skinType = config.skinType || 'default';
    config.cssPath = config.cssPath || '';
    config.skinsPath = KE.scriptPath + 'skins/';
    config.pluginsPath = KE.scriptPath + 'plugins/';
    config.minWidth = config.minWidth || 200;
    config.minHeight = config.minHeight || 100;
    config.items = config.items || [
        'source', 'preview', 'fullscreen', 'print', 'undo', 'redo', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
        'superscript', 'date', 'time', '-',
        'title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold',
        'italic', 'underline', 'strikethrough', 'removeformat', 'selectall', 'image',
        'flash', 'media', 'layer', 'table', 'specialchar', 'hr',
        'emoticons', 'link', 'unlink', 'about'
    ];
    KE.g[config.id] = config;
    KE.util.loadStyle(config.skinsPath + config.skinType + '.css');
}
KE.show = function(config)
{
    KE.init(config);
    KE.event.add(window, 'load', new Function('KE.create("' + config.id + '")'));
};