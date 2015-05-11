/*
 * @Author: Bill
 * @Date:   2015-05-11 21:02:51
 * @Last Modified by:   dengtao
 * @Last Modified time: 2015-05-11 23:43:56
 */

'use strict';

var glob = require('glob-all');
var fs = require('fs-extra');
var path = require('path');
var s = require('underscore.string');

function readFiles() {
  return glob.sync('res/particles/**');
}

function writeResFile(files) {
  var res = {};
  files.forEach(function(file) {
    var extname = path.extname(file);
    if (extname === '.plist' || extname === '.png') {
      var basename = path.basename(file, extname);
      res[basename + '_' + s.strRight(extname, '.')] = file;
    }
  });

  var content = 'var res = ' + JSON.stringify(res, null, 2) + ';\n\n';
  content += 'var g_resources = [];\n' +
    'for (var i in res) {\n' +
    '  g_resources.push(res[i]);\n' +
    '}';
  fs.writeFileSync('src/resource.js', content);
}

exports.build = function() {
  var files = readFiles();
  writeResFile(files);
};
