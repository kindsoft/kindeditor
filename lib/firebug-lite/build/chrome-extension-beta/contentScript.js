// *************************************************************************************************

var isActive = false;
var isOpen = false;
var extensionURL = null;

var contextMenuElementXPath = null;
var isListeningKeyboardActivation = false;

// *************************************************************************************************

// restore Firebug Lite state
var loadStateData = function()
{
    var FirebugData = localStorage.getItem("Firebug");

    isActive = false;
    isOpen = false;
    extensionURL = chrome.extension.getURL("");
    
    if (FirebugData)
    {
        FirebugData = FirebugData.split(",");
        isActive = FirebugData[0] == "1";
        isOpen = FirebugData[1] == "1";
    }
}

// *************************************************************************************************

// load Firebug Lite application
var loadFirebug = function()
{
    document.documentElement.setAttribute("debug", isOpen);

    injectScriptText("("+listenConsoleCalls+")()");

    // TODO: xxxpedro - change to XHR when Issue 41024 is solved
    // Issue 41024: XHR using file: and chrome-extension: protocols not working.
    // http://code.google.com/p/chromium/issues/detail?id=41024
    injectFirebugScript();
}

// TODO: think a better solution than using the stateData parameter, required
// by the keyboard activation.
var loadFirebugAndWait = function(callback, stateData)
{
    stateData = stateData || ('1,1,'+extensionURL);
    localStorage.setItem('Firebug', stateData);
    loadStateData();
    chrome.extension.sendRequest({name: isActive ? "FB_enableIcon" : "FB_disableIcon"});

    document.documentElement.setAttribute("debug", isOpen);

    injectFirebugScript();

    setTimeout(function(){
        waitFirebug(callback);
    },0);
};

var waitFirebug = function(callback)
{
    if (document && document.getElementById("FirebugChannel"))
    {
        stopListeningKeyboardActivation();
        callback();
    }
    else
        setTimeout(function(){ waitFirebug(callback); }, 100);
    
};

// *************************************************************************************************

// inject Firebug Lite script into the page
var injectFirebugScript = function(url)
{
    scriptElement = document.getElementById("FirebugLite");
    if (scriptElement)
    {
        firebugDispatch("FB_toggle");
    }
    else
    {
        var script = document.createElement("script");

        script.src = extensionURL + "firebug-lite-beta.js";
        script.setAttribute("id", "FirebugLite");
        script.setAttribute("firebugIgnore", "true");
        script.setAttribute("extension", "Chrome");
        document.documentElement.appendChild(script);

        script.onload = function() {
            // TODO: xxxpedro remove this files when deploy the new structure
            script = document.createElement("script");
            script.src = extensionURL + "googleChrome.js";
            document.documentElement.appendChild(script);
        };
    }
}

// inject a script into the page
var injectScriptText = function(text)
{
    var script = document.createElement("script");
    var parent = document.documentElement;
    
    script.text = text;
    script.setAttribute("id", "FirebugLite");
    script.setAttribute("firebugIgnore", "true");
    script.setAttribute("extension", "Chrome");
    parent.appendChild(script);
    parent.removeChild(script);
}

// *************************************************************************************************

// communication with the background page
chrome.extension.onRequest.addListener
(
    function(request, sender, sendResponse)
    {
        // check if Firebug Lite is active
        if (request.name == "FB_isActive")
        {
            loadStateData();
            sendResponse({value: ""+isActive});
        }
        // load Firebug Lite application
        else if (request.name == "FB_loadFirebug")
        {
            setTimeout(function(){
            
                loadStateData();

                //loadFirebug();
                loadFirebugAndWait(function(){
                
                    isActive = true;
                    var message = isActive ? "FB_enableIcon" : "FB_disableIcon";
                    chrome.extension.sendRequest({name: message});

                    loadChannel();
                });

            },0);
            
            sendResponse({});
        }
        // handle context menu click by sending "FB_contextMenuClick" message 
        // to Firebug Lite application
        else if (request.name == "FB_contextMenuClick")
        {
            // TODO: if not active, activate first, wait the activation to complete
            // and only then dispatch the event to Firebug Lite application
            if (isActive)
                firebugDispatch("FB_contextMenuClick,"+contextMenuElementXPath);
            else
                loadFirebugAndWait(function(){
                    firebugDispatch("FB_contextMenuClick,"+contextMenuElementXPath);
                });
        }
        else if (request.name == "FB_deactivate")
        {
            listenKeyboardActivation();
        }
        else
            sendResponse({}); // snub them.
    }
);

// *************************************************************************************************

// communication with the page
var channel = null;
var channelEvent;

var onFirebugChannelEvent = function()
{
    channel = document.getElementById("FirebugChannel");

    if (channel)
    {
        chrome.extension.sendRequest({name: channel.innerText});
    }
};

var loadChannel = function()
{
    channel = document.getElementById("FirebugChannel");

    if (channel)
    {
        channel.addEventListener("FirebugChannelEvent", onFirebugChannelEvent);
        channelEvent = document.createEvent("Event");
        channelEvent.initEvent("FirebugChannelEvent", true, true);
    }
}

var firebugDispatch = function(data)
{
    if (!channel)
        loadChannel();

    channel.innerText = data;
    channel.dispatchEvent(channelEvent);
};

// *************************************************************************************************

var onContextMenu = function(event)
{
    contextMenuElementXPath = getElementXPath(event.target);
};

var loadListeners = function()
{
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("unload", unloadListeners);
};

var unloadListeners = function()
{
    if (channel)
    {
        channel.removeEventListener("FirebugChannelEvent", onFirebugChannelEvent);
    }
    
    window.removeEventListener("contextmenu", onContextMenu);
    window.removeEventListener("unload", unloadListeners);
};

// *************************************************************************************************

// listen to console calls before Firebug Lite finishes to load
var listenConsoleCalls = function()
{
    // TODO: xxxpedro add all console functions
    var fns = ["log", "info", "warn", "error"];

    var listener = {consoleQueue: ["chromeConsoleQueueHack"]};
    var queue = listener.consoleQueue;

    for (var i=0, l=fns.length; i<l; i++)
    {
        var fn = fns[i];

        (function(fn){

            listener[fn] = function()
            {
                queue.push([fn, arguments]);
            }

        })(fn);
    }

    window.console = listener;
};

// *************************************************************************************************

var onGlobalKeyDown = function onGlobalKeyDown(event)
{
    var keyCode = event.keyCode;
    var shiftKey = event.shiftKey;
    var ctrlKey = event.ctrlKey;

    if (keyCode == 123 /* F12 */ && !shiftKey)
    {
        loadFirebugAndWait(function(){
        
            if (ctrlKey)
            {
                firebugDispatch("FB_openInNewWindow");
            }
            else
            {
                firebugDispatch("FB_toggle");
            }
            
        },"1,0,"); // TODO: think a better solution than using the stateData parameter
    }
    else if (keyCode == 67 /* C */ && ctrlKey && shiftKey)
    {
        Firebug.Inspector.toggleInspect();
        //cancelEvent(event, true);
    }
    else if (keyCode == 76 /* L */ && ctrlKey && shiftKey)
    {
        Firebug.chrome.focusCommandLine();
        //cancelEvent(event, true);
    }
};

var listenKeyboardActivation = function()
{
    // TODO: listen to F12 key. if pressed activate Firebug Lite, and open

    // TODO: this function could also listen to CTRL+SHIFT+C, triggering
    // Firebug Lite activation, opening it, and starting the inspection,
    // like in Firebug for Firefox

    // TODO: this function should be called also when Firebug Lite is deactivated
    window.addEventListener("keydown", onGlobalKeyDown);
    
    isListeningKeyboardActivation = true;
};

var stopListeningKeyboardActivation = function()
{
    // TODO: remove listener when Firebug Lite application is activated/loaded

    // TODO: remove listener on window onunload (if not removed already)
    if (isListeningKeyboardActivation)
    {
        window.removeEventListener("keydown", onGlobalKeyDown);
    }
};

// *************************************************************************************************

var getElementXPath = function(element)
{
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return this.getElementTreeXPath(element);
};

var getElementTreeXPath = function(element)
{
    var paths = [];

    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var index = 0;
        var nodeName = element.nodeName;

        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
        {
            if (sibling.nodeType != 1) continue;

            if (sibling.nodeName == nodeName)
                ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (index ? "[" + (index+1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};

// *************************************************************************************************

// startup Firebug Lite if it is active for the current page
loadStateData();

if (isActive)
{
    loadFirebugAndWait(function(){
        loadChannel();
    })
}
else
{
    listenKeyboardActivation();
}

loadListeners();

// *************************************************************************************************

// adjust the browser icon according Firebug Lite's current state
chrome.extension.sendRequest({name: isActive ? "FB_enableIcon" : "FB_disableIcon"});
