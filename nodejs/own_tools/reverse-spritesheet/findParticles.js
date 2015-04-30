/* 
 * @Author: Bill
 * @Date:   2015-04-29 10:00:11
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-04-29 14:28:03
 */

'use strict';

var path = require('path');
var glob = require('glob-all');
var fs = require('fs-extra');
var cheerio = require('cheerio');
var zlib = require('zlib');

var srcPath = 'G:\\GameResAnalyse\\stellap\\Payload\\CookiePang.app';
var outDir = 'outParticles/';

function main() {
  var files = glob.sync([srcPath + '/**/*.plist', srcPath + '/**/*.xml']);
  files.forEach(function(file) {
    checkParticle(file);
  });
}

function checkParticle(file) {
  var $ = cheerio.load(fs.readFileSync(file), {
    xmlMode: true
  });
  if ($('dict').length > 0) {
    var emitterType = $('dict > key:contains("emitterType")');
    if (emitterType.length > 0) {
      var relative = path.relative(srcPath, file);
      fs.copySync(file, outDir + relative);
      var textureImageData = $('dict > key:contains("textureImageData")');
      var textureFileName = $('dict > key:contains("textureFileName")');
      var outDirname = path.dirname(outDir + relative);
      var imgName = textureFileName.next().text();
      if (textureImageData.length > 0) {
        console.log('base ' + file);
        base64ToImg(textureImageData.next().text(), path.join(outDirname, imgName));
      } else {
        console.log('src ' + file);
        var imgs = glob.sync(srcPath + '/**/' + imgName);
        if (imgs.length > 0) {
          fs.copy(imgs[0], path.join(outDirname, imgName));
        } else {
          console.log('can not find img ' + imgName);
        }
      }
    }
  }
}

function base64ToImg(base64Data, file) {
  var buf = new Buffer(base64Data, 'base64');
  zlib.unzip(buf, function(err, buffer) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFileSync(file, buffer);
    }
  });
}

main();