/* 
 * @Author: Bill
 * @Date:   2015-01-22 16:53:56
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-22 17:34:31
 *
 * https://github.com/ctalkington/node-archiver
 * https://github.com/EvanOxfeld/node-unzip
 */

'use strict';

var fs = require('fs');
var archiver = require('archiver');
var unzip = require('unzip');

function main() {
    zipTest();
    // unzipTest();
}

function zipTest() {

    zipFolder('../own_tools/', 'archiver-unzip.zip');
}

function zipFolder(srcDir, destFilePath, cb) {
    var output = fs.createWriteStream(destFilePath);
    var archive = archiver('zip');

    archive.on('error', function(err) {
        if (cb) cb(err);
    });

    archive.on('end', function() {
        if (cb) cb(null, 'zip end');
    });

    archive.pipe(output);
    archive.bulk([{
        src: [srcDir + '**']
    }]);
    archive.finalize();
}

function unzipTest() {
    fs.createReadStream('archiver-unzip.zip').pipe(unzip.Extract({
        path: 'unarchive'
    }));
}

main();