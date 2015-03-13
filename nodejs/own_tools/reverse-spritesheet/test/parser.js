/* 
* @Author: Bill
* @Date:   2015-03-13 11:29:25
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-13 16:39:28
*/

'use strict';

var parser = require('../lib/parser.js');
var expect = require('chai').expect;
describe('parse plist file', function () {
    it('parse candy_c_hi_hd.xml', function() {
        var rst = parser('test/spritesheet/candy_c_hi_hd.xml');
        expect(rst.imagePath).to.equal('candy_c_hi_hd.png');
        expect(rst.frames).to.have.length(113);
    });

    it('parse Character_ice_RETINA.plist', function() {
        var rst = parser(__dirname + '/spritesheet/Character_ice_RETINA.plist');
        expect(rst.imagePath).to.equal('Character_ice_RETINA.png');
        expect(rst.frames).to.have.length(40);
    });

    it('parse crayon_bg_ed069c4.plist', function() {
        var rst = parser(__dirname + '/spritesheet/crayon_bg_ed069c4.plist');
        expect(rst.imagePath).to.equal('crayon_bg_ed069c4.jpg');
        expect(rst.frames).to.have.length(4);
    });
});