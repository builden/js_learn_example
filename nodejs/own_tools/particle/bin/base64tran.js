#!/usr/bin/env node

var glob = require('glob-all');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var argv = require('optimist').argv;
var s = require('underscore.string');
var ftb = require('../lib/file-tran-base64.js');

function main() {
  if (argv.h || argv.help || process.argv.length === 2) {
    console.log([
      'usage: particle file [options]',
      '  -w --web      for web',
      '  -h --help     print the help list'
    ].join('\n'));
    return;
  }

  var file = argv._[0];
  if (!fs.existsSync(file)) {
    console.log("can't find dest file");
    return;
  }

  var ctx = ftb.f2b(file);
  var f = path.parse(file);

  if (argv.w || argv.web) {
    var shExt = s.strRight(f.ext, '.');
    if (!_.includes(['png', 'jpg'], shExt)) {
      console.log('unknow file type ' + shExt);
      return;
    }
    ctx = 'data:image/' + shExt + ';base64,' + ctx;
    fs.writeFileSync(f.name + '.web.base64', ctx);
  } else {
    fs.writeFileSync(f.name + '.base64', ctx);
  }
}

main();