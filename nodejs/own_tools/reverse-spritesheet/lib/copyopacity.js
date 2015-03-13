/* 
* @Author: Bill
* @Date:   2015-03-13 18:02:37
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-13 18:25:16
*/

'use strict';

var gm = require('gm');

var copyOpacity = exports.copyOpacity = function(alphaFile, rgbFile, outFile, cb) {
    var img = gm(rgbFile).compose('copyopacity').composite(alphaFile);
    img.write(outFile, function(err) {
        if (err) {
            console.log('copyopacity failed ' + err);
        }
        if (cb) {
            cb(err);
        }
    });
};

// copyOpacity('../test/spritesheet/candy_c_hi_hd_a.png', '../test/spritesheet/candy_c_hi_hd_rgb.jpg', '../test/spritesheet/candy_c_hi_hd.png');