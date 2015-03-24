/* 
* @Author: Bill
* @Date:   2015-03-24 17:37:16
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-24 18:36:16
*/

'use strict';

var fs = require('fs');
var muk = require('muk');
var expect = require('chai').expect;

describe('mock test', function () {
    before(function() {
        muk(fs, 'readFileSync', function(filename, encoding) {
            throw new Error('mock readFileSync error');
        });

        muk(fs, 'readFile', function(filename, callback) {
            callback(new Error('mock readFile error'));
        })
    });

    it('fs readFileSync mock', function() {
        expect(function() {
            fs.readFileSync('fibonacci', 'utf-8');
        }).to.throw('mock readFileSync error');
    });

    it('fs readFile mock', function(done) {
        fs.readFile('fibo', function(err, data) {
            expect(err.message).to.equal('mock readFile error');
            done();
        });
    });

    after(function() {
        muk.restore();
    });
});