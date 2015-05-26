var gm = require('gm');
var images = require('images');
var path = require('path');
var fs = require('fs-extra');
var async = require('async');

var splitImg = module.exports = function(imgPath, tpInfo, outputPath, cb) {
  if (!fs.existsSync(imgPath)) {
    console.log('cannot find img ' + imgPath);
    cb && cb();
    return;
  };

  fs.mkdirsSync('tmp');
  fs.mkdirsSync(outputPath);

  async.mapLimit(tpInfo.frames, 1, function(frame, callback) {
    var img = gm(imgPath);
    if (frame.r) {
      img.crop(frame.rect.w, frame.rect.h, frame.rect.x, frame.rect.y);
      img.rotate('#FFFF', -90);
    } else {
      img.crop(frame.rect.w, frame.rect.h, frame.rect.x, frame.rect.y);
    }
    (function(frame) {
      var tmpFile = 'tmp/' + frame.n;
      fs.mkdirsSync(path.dirname(tmpFile));
      img.write(tmpFile, function(err) {
        if (err) {
          console.log('gm write file error ' + err);
        } else {
          resizeImg(tmpFile, path.join(outputPath, frame.n), frame.oRect);
        }
        callback(null, err);
      });
    }(frame));
  }, function(err, results) {
    cb && cb(err);
  });
};

function resizeImg(tmpFile, outputFile, oRect) {
  var img = images(oRect.w, oRect.h);
  img.draw(images(tmpFile), oRect.x, oRect.y);
  fs.mkdirsSync(path.dirname(outputFile));
  img.save(outputFile);
}