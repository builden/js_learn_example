/* 
* @Author: Bill
* @Date:   2015-03-26 16:44:03
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-26 18:22:41
*/

'use strict';

var app = require('app');  // Module to control application life.
var ipc = require('ipc');
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, type: 'splash'});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/online-status.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.log('app closed');
    mainWindow = null;
  });

  mainWindow.setResizable(false);
  // 设置任务栏进度
  mainWindow.setProgressBar(0.5);
  // mainWindow.openDevTools();


/*  var window2 = new BrowserWindow({width: 800, height: 600, frame: false, transparent: true});
  window2.loadUrl('file://' + __dirname + '/index.html');
  window2.on('closed', function() {
    console.log('window2 closed');
    window2 = null;
  });*/
});

ipc.on('online-status-changed', function(event, status) {
  console.log(status);
});

ipc.on('size-status-changed', function(event, status) {
  console.log(status);
});