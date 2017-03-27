const REMOTE = require('electron').remote;
const MAIN = REMOTE.require('./main.js');
const SHELL = require('electron').shell;
const URL = 'http://192.168.0.125:8081';
const USERNAME = 'admin';
const PASSWORD = 'qbadmin';
let myIframe = document.getElementById('frame');
let _eventHandlers = {}; // somewhere global

function addListener(node, event, handler, capture) {
    if(!(node in _eventHandlers)) {
        // _eventHandlers stores references to nodes
        _eventHandlers[node] = {};
    }
    if(!(event in _eventHandlers[node])) {
        // each entry contains another entry for each event type
        _eventHandlers[node][event] = [];
    }
    // capture reference
    _eventHandlers[node][event].push([handler, capture]);
    node.addEventListener(event, handler, capture);
}

function removeAllListeners(node, event) {
    if(node in _eventHandlers) {
        let handlers = _eventHandlers[node];
        if(event in handlers) {
            let eventHandlers = handlers[event];
            for(let i = eventHandlers.length; i--;) {
                let handler = eventHandlers[i];
                node.removeEventListener(event, handler[0], handler[1]);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    let myIframe = document.getElementById('frame');
    let doc = document.getElementById('frame').contentDocument;
    console.log('myIframe = ', myIframe);
    console.log('doc = ', doc);
    doc.addEventListener("DOMContentLoaded", function(event) {
        console.log('this = ', this);
    });
    doc.addEventListener("load", function(event) {
        console.log('this.b = ', this);
    });
    myIframe.addEventListener("load", function(event) {
        console.log('this.c = ', this.contentDocument);
        let doc = this.contentDocument;
        let username = doc.getElementById('username');
        let password = doc.getElementById('password');
        let loginButton = doc.getElementById('login');
        console.log(username);
        console.log(password);
        if (username !== null && username !== undefined){
            username.value = USERNAME;
            password.value = PASSWORD;
            loginButton.click();
        }
        let links = doc.querySelectorAll('a[target]');
        console.log(links);
        let propertiesPanel = doc.getElementById('propertiesPanel');
        console.log('propertiesPanel = ' + propertiesPanel);
        console.log(doc);
        removeAllListeners(propertiesPanel,'click');
        addListener(propertiesPanel, 'click', function () {
            let links = doc.querySelectorAll('a[target]');
            console.log(links);
            console.log('DOM Changed at ' + new Date());
            let link = links[2];
            if (link !== null && link !== undefined){
                const url = link.getAttribute('href');
                console.log('url = ' + url);
                removeAllListeners(link, 'click');
                addListener(link, 'click', function (e) {
                    e.preventDefault();
                    console.log('open SHELL.openExternal(url) ' + url);
                    SHELL.openExternal(url)
                })
            }
        });
    });
});

myIframe.src = URL;
