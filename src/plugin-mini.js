/*******************************************************************************
* WYSIWYG HTML Editor for Internet
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
* @version 3.0
*******************************************************************************/
KE.plugin['undo'] = {
    click : function(id) {
        KE.history.undo(id);
    }
};
KE.plugin['redo'] = {
    click : function(id) {
        KE.history.redo(id);
    }
};
KE.plugin['bgcolor'] = {
    icon : 'bgcolor.gif',
    click : function(id) {
        KE.util.selection(id);
        var menu = new KE.menu({
                id : id,
                cmd : 'bgcolor'
            });
        menu.picker();
    },
    exec : function(id, value) {
        KE.util.select(id);
        if (KE.browser == 'IE') {
            KE.util.execCommand(id, 'backcolor', value);
        } else  {
            KE.util.execCommand(id, 'hiliteColor', value);
        }
        KE.layout.hide(id);
        KE.util.focus(id);
    }
};
KE.plugin['fontname'] = {
    click : function(id) {
        var cmd = 'fontname';
        KE.util.selection(id);
        var fontName = KE.lang.fontTable;
        var menu = new KE.menu({
                id : id,
                cmd : cmd,
                width : '160px'
            });
        for (var i in fontName) {
            var html = '<span style="font-family: ' + i + ';">' + fontName[i] + '</span>';
            menu.add(html, new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + i + '")'));
        }
        menu.show();
    },
    exec : function(id, value) {
        KE.util.select(id);
        KE.util.execCommand(id, 'fontname', value);
        KE.layout.hide(id);
        KE.util.focus(id);
    }
};
KE.plugin['fontsize'] = {
    click : function(id) {
        var fontSize = {
            '1' : '8pt',
            '2' : '10pt',
            '3' : '12pt',
            '4' : '14pt',
            '5' : '18pt',
            '6' : '24pt'
        };
        var cmd = 'fontsize';
        KE.util.selection(id);
        var menu = new KE.menu({
                id : id,
                cmd : cmd,
                width : '100px'
            });
        for (var i in fontSize) {
            var html = '<span style="font-size: ' + fontSize[i] + ';">' + fontSize[i] + '</span>';
            menu.add(html, new Function('KE.plugin["' + cmd + '"].exec("' + id + '", "' + i + '")'));
        }
        menu.show();
    },
    exec : function(id, value) {
        KE.util.select(id);
        KE.util.execCommand(id, 'fontsize', value.substr(0, 1));
        KE.layout.hide(id);
        KE.util.focus(id);
    }
};
KE.plugin['textcolor'] = {
    icon : 'textcolor.gif',
    click : function(id) {
        KE.util.selection(id);
        var menu = new KE.menu({
                id : id,
                cmd : 'textcolor'
            });
        menu.picker();
    },
    exec : function(id, value) {
        KE.util.select(id);
        KE.util.execCommand(id, 'forecolor', value);
        KE.layout.hide(id);
    }
};
