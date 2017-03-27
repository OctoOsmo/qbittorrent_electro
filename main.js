'use strict';

const electron = require('electron');
const {app, BrowserWindow} = require('electron');

const path = require('path');
const url = 'http://192.168.0.125:8081';
let indexUrl = 'file://${__dirname}/index.html';
const height = 650;
const width = 1000;
const appIcon = path.join(__dirname, 'images', 'app.ico');
let appName = app.getName();

app.on('ready', () => {
  let win = createMainWindow();
  // win.webContents.openDevTools();
  win.webContents.on('dom-ready', () => {
    win.on('close', function () { win = null })
  })
});

function createMainWindow() {
  var win = new electron.BrowserWindow({
    title: appName,
    height: height,
    width: width,
    icon: appIcon
  });
  // win.loadURL(url)
  win.loadURL(`file://${__dirname}/index.html`);
  return win
}

exports.openWindow = () => {
  let win = createMainWindow()
};

app.on('window-all-closed', () => {
  app.quit()
});
