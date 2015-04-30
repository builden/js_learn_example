/* 
 * @Author: Bill
 * @Date:   2015-04-29 11:36:18
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-04-29 11:54:41
 */

'use strict';

var glob = require('glob-all');
var path = require('path');
var fs = require('fs-extra');
var _s = require('underscore.string');

var files = glob.sync('res/outParticles/**/*.*');

function createResFile(files) {
  var content = 'var res = {\n';
  files.forEach(function(file) {
    var extname = path.extname(file)
    var basename = path.basename(file, extname);
    var key = basename + '_' + _s.strRight(extname, '.');
    content += '  "' + key + '": ' + '"' + file + '",\n';

    if (extname === '.plist') {
      var str = 'this.addPaticle(res.' + key + ', pos.x, pos.y);'
      console.log(str);
    }
  });

  content += '};\n' +
    '\n' +
    'var g_resources = [];\n' +
    'for (var i in res) {\n' +
    '    g_resources.push(res[i]);\n' +
    '}';

  fs.writeFileSync('src/resource.js', content);
}

createResFile(files);