#!/usr/bin/env node

var fs = require('fs-extra');
var argv = require('optimist').argv;
var glob = require('glob-all');
var path = require('path');
var u3d = require('./lib/disunity.js');

function main() {
  if (argv.h || argv.help || process.argv.length === 2) {
    console.log([
      'usage: u3d glob ...',
      '',
      'options:',
      '  -h --help        print the help list'
    ].join('\n'));
    return;
  }

  var globArr = [];
  argv._.forEach(function(item) {
    globArr.push(path.join(process.cwd(), item))
  });
  var files = glob.sync(globArr);
  if (argv.d || argv.debug) {
    console.log('match files:');
    console.log(files);
  }
  files.forEach(function(file) {
    u3d(file);
  });
}

main();