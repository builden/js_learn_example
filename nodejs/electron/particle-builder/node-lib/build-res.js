/* 
 * @Author: Bill
 * @Date:   2015-05-11 21:02:51
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-05-11 21:23:00
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

  fs.writeFileSync('src/resource2.js', 'var res = ' + JSON.stringify(res, null, 2) + ';');
}

exports.build = function() {
  var files = readFiles();
  writeResFile(files);
};
