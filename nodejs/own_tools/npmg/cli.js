#!/usr/bin/env node

var fs = require('fs-extra');
var argv = require('optimist').argv;
var opener = require('opener');
var s = require('underscore.string');
var path = require('path');
var _ = require('lodash');

var globalPath = null;
if (process.platform === 'win32') {
  globalPath = '%appdata%\\npm';
}


var cmd = [
  '@IF EXIST "%~dp0\\node.exe" (',
  '  "%~dp0\\node.exe"  "<%= path %>" %*',
  ') ELSE (',
  '  @SETLOCAL',
  '  @SET PATHEXT=%PATHEXT:;.JS;=;%',
  '  node  "<%= path %>" %*',
  ')'
].join('\n');
var compiled = _.template(cmd);
console.log(compiled({
  path: __filename
}));

if (argv.h || argv.help) {
  console.log([
    'usage: npmg [options]',
    '',
    'options:',
    '  -s --self        register self to system path',
    '  -n --name        global name',
    '  -j --js          dest js file path',
    '  -h --help        print the help list'
    ].join('\n'));
}

if (argv.s || argv.self) {

}


