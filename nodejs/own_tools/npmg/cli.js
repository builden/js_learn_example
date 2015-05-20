#!/usr/bin/env node

var fs = require('fs-extra');
var argv = require('optimist').argv;
var opener = require('opener');
var s = require('underscore.string');
var path = require('path');
var _ = require('lodash');
var glob = require('glob-all');
var del = require('del');
require('shelljs/global');

var isWin32 = false;
function main() {
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
    return;
  }

  var pf = process.platform;
  if (pf === 'win32') {
    isWin32 = true;
    inWin32();
  } else if (pf === 'darwin') {
    inOSX();
  }

  inCommon();
}

var globalPath = null;
var cmdTemp = [
  '@IF EXIST "%~dp0\\node.exe" (',
  '  "%~dp0\\node.exe"  "<%= path %>" %*',
  ') ELSE (',
  '  @SETLOCAL',
  '  @SET PATHEXT=%PATHEXT:;.JS;=;%',
  '  node  "<%= path %>" %*',
  ')'
].join('\n');

function inWin32() {
  globalPath = process.env.APPDATA + '/npm/';

  if (argv.s || argv.self) {
    createWinG('npmg', __filename);
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

  if (argv.o || argv.open) {
    opener(globalPath);
  }
}

function inOSX() {
  globalPath = '/usr/local/bin/';
  if (argv.s || argv.self) {
    createOSXG('npmg', __filename);
  }

  if (argv.l || argv.ls) {

  }

  if (argv.r || argv.remove) {
    var name = argv.r || argv.remove;
    if (!fs.existsSync(globalPath + name)) {
      console.log("can't find " + name);
    } else {
      rm('-f', globalPath + name);
    }
  }
}

function inCommon() {
  if (argv.n || argv.name) {
    var name = argv.n || argv.name;
    var js = argv.j || argv.js || 'cli.js';
    var jsPath = path.join(process.cwd(), js);
    if (!fs.existsSync(jsPath)) {
      console.log("can't find js: " + jsPath);
    } else {
      isWin32 ? createWinG(name, jsPath) : createOSXG(name, jsPath);
    }
  }
}

function createWinG(name, jsPath) {
  var cmdPath = globalPath + name + '.cmd';
  var compiled = _.template(cmdTemp);
  var ctx = compiled({
    path: jsPath
  });

  fs.writeFileSync(cmdPath, ctx);
  console.log('add global module ' + name + ' succ!');
}

function createOSXG(name, jsPath) {
  chmod('+x', jsPath);
  ln('-s', jsPath, globalPath + name);
}

main();
