/* 
 * @Author: Bill
 * @Date:   2015-01-27 19:43:08
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-27 20:24:55
 */

'use strict';

var imagemin = require('../utils/imagemin.js');
var walk = require('walk');
var path = require('path');

function main() {
    var walker = walk.walk('./image_src', {
        followLinks: false
    });

    walker.on('file', function(root, stat, next) {
        var extname = path.extname(stat.name);
        var basename = path.basename(stat.name, extname);
        if (extname === '.png') {
            console.log('handle ' + stat.name);
            imagemin.pngMin(path.join(root, stat.name), './image_dst/' + stat.name, 1, function(err, result) {

            });
        } else if (extname === '.jpg') {
            console.log('handle ' + stat.name);
            imagemin.jpgMin(path.join(root, stat.name), './image_dst/' + stat.name, 50, function(err, result) {

            });
        } else {

        }

        next();
    });

}

main();