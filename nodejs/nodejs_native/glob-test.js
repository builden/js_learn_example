/* 
 * @Author: Bill
 * @Date:   2015-03-31 10:10:08
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-03-31 11:01:05
 *
 * https://github.com/isaacs/node-glob
 * https://www.npmjs.com/package/glob-all
 * https://github.com/isaacs/minimatch
 * 
 */

'use strict';

var glob = require('glob-all');

function main() {
  // nodirTest();
  excludeTest();
}

function nodirTest() {
  glob('**', {
    nodir: true
  }, function(err, files) {
    console.log(files);
  });
}

function excludeTest() {
  glob(['**', '!cluster_test/**'], {mark: true}, function(err, files) {
    console.log(files);
  });
}

main();