/*
* @Author: Bill
* @Date:   2015-05-11 20:08:03
* @Last Modified by:   Bill
* @Last Modified time: 2015-05-13 09:57:30
*/

'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var buildRes = require('./node-lib/build-res.js');
buildRes.build();

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var setWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
 mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.openDevTools({
    detach: true
  });

/*
  setWindow = new BrowserWindow({width: 800, height: 600});
  setWindow.loadUrl('file://' + __dirname + '/set.html');

  setWindow.on('closed', function() {
    setWindow = null;
  });

  setWindow.openDevTools({
    detach: true
  });*/
});
