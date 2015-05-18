#!/usr/bin/env node

var fs = require('fs-extra');
var argv = require('optimist').argv;
var opener = require('opener');
var s = require('underscore.string');

var globalPath = null;
if (process.platform === 'win32') {
  globalPath = '%appdata%\\npm';
}


var cmd = [
  '@IF EXIST "%~dp0\\node.exe" (',
  '  "%~dp0\\node.exe"  "%~dp0\\node_modules\\http-server\\bin\\http-server" %*',
  ') ELSE (',
  '  @SETLOCAL',
  '  @SET PATHEXT=%PATHEXT:;.JS;=;%',
  '  node  "%~dp0\node_modules\http-server\bin\http-server" %*',
  ')'
].join('\n');
console.log(cmd);
