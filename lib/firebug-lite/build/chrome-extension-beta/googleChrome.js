/* See license.txt for terms of usage */

Firebug.extend(function(FBL) { with (FBL) {
// ************************************************************************************************

if (!Env.isChromeExtension) return;

// ************************************************************************************************
// local variables

var channel;
var channelEvent;

// ************************************************************************************************
// GoogleChrome Module

Firebug.GoogleChrome = extend(Firebug.Module,
{
    initialize: function()
    {
        var doc = FBL.Env.browser.document;
        
        if (!doc.getElementById("FirebugChannel"))
        {
            channel = doc.createElement("div");
            channel.id = "FirebugChannel";
            channel.firebugIgnore = true;
            channel.style.display = "none";
            doc.documentElement.insertBefore(channel, doc.documentElement.firstChild);
            
            channelEvent = document.createEvent("Event");
            channelEvent.initEvent("FirebugChannelEvent", true, true);
            
            channel.addEventListener("FirebugChannelEvent", onFirebugChannelEvent);
        }
    },

    dispatch: function(message)
    {
        channel.innerText = message;
        channel.dispatchEvent(channelEvent);
    }
});

// ************************************************************************************************
// internals

var onFirebugChannelEvent = function()
{
    var name = channel.innerText;
    
    if (name.indexOf("FB_contextMenuClick") == 0)
    {
        var doc = FBL.Env.browser.document;
        var contextMenuElementXPath = name.split(",")[1];
        var contextMenuElement = getElementsByXPath(doc, contextMenuElementXPath)[0];

        // If not open, open it first
        Firebug.chrome.toggle(true);
        
        setTimeout(function(){

            // Select the HTML panel
            Firebug.chrome.selectPanel("HTML");

            // Select the clicked element in the HTML tree
            Firebug.HTML.select(contextMenuElement);
        
        },50);
    }
    else if (name == "FB_toggle")
    {
        Firebug.chrome.toggle();
    }
    else if (name == "FB_openInNewWindow")
    {
        setTimeout(function(){
            Firebug.chrome.toggle(true, true);
        },0);
    }
};

var getElementsByXPath = function(doc, xpath)
{
    var nodes = [];

    try {
        var result = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
        for (var item = result.iterateNext(); item; item = result.iterateNext())
            nodes.push(item);
    }
    catch (exc)
    {
        // Invalid xpath expressions make their way here sometimes.  If that happens,
        // we still want to return an empty set without an exception.
    }

    return nodes;
};

// ************************************************************************************************

Firebug.registerModule(Firebug.GoogleChrome);

// ************************************************************************************************
}});