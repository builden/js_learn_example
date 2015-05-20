#!/usr/bin/env node

var fs = require('fs-extra');
var argv = require('optimist').argv;
var opener = require('opener');
var s = require('underscore.string');
var path = require('path');
var _ = require('lodash');
var glob = require('glob-all');
var del = require('del');

var globalPath = null;
if (process.platform === 'win32') {
  globalPath = process.env.APPDATA + '/npm/';
}

var cmdTemp = [
  '@IF EXIST "%~dp0\\node.exe" (',
  '  "%~dp0\\node.exe"  "<%= path %>" %*',
  ') ELSE (',
  '  @SETLOCAL',
  '  @SET PATHEXT=%PATHEXT:;.JS;=;%',
  '  node  "<%= path %>" %*',
  ')'
].join('\n');

if (argv.h || argv.help) {
  console.log([
    'usage: npmg [options]',
    '',
    'options:',
    '  -s --self        add self to global path',
    '  -n --name        global module name',
    '  -j --js          dest js file path [cli.js]',
    '  -l --ls          list global module',
    '  -r --remove      remove global module',
    '  -o --open        open global path',
    '  -h --help        print the help list'
  ].join('\n'));
}

if (argv.s || argv.self) {
  var compiled = _.template(cmdTemp);
  var ctx = compiled({
    path: __filename
  });

  fs.writeFileSync(globalPath + 'npmg.cmd', ctx);
}

if (argv.r || argv.remove) {
  var name = argv.r || argv.remove;
  var cmdName = name;
  if (path.parse(name).extname !== '.cmd') {
    cmdName += '.cmd';
  }
  if (!fs.existsSync(globalPath + cmdName)) {
    console.log("can't find " + name);
  } else {
    if (name !== cmdName) {
      del.sync(globalPath + name, {
        force: true
      });
    }
    del.sync(globalPath + cmdName, {
      force: true
    });
    console.log('remove ' + name + ' succ!');
  }
}

if (argv.l || argv.ls) {
  var files = glob.sync([globalPath + '*.cmd']);
  console.log('exist global modules:')
  files.forEach(function(file) {
    console.log('  ' + path.parse(file).name);
  });
}

if (argv.n || argv.name) {
  var name = argv.n || argv.name;
  var js = argv.j || argv.js || 'cli.js';
  var destPath = path.join(process.cwd(), js);
  if (!fs.existsSync(destPath)) {
    console.log("can't find js: " + destPath);
  } else {
    var cmdPath = globalPath + name + '.cmd';
    var compiled = _.template(cmdTemp);
    var ctx = compiled({
      path: destPath
    });

    fs.writeFileSync(cmdPath, ctx);
    console.log('add global module ' + name + ' succ!');
  }
}

if (argv.o || argv.open) {
  opener(globalPath);
}