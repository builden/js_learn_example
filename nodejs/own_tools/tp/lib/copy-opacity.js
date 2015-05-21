var gm = require('gm');

module.exports = function copyOpacity(alphaFile, rgbFile, outFile, cb) {
  var img = gm(rgbFile).compose('copyopacity').composite(alphaFile);
  img.write(outFile, function(err) {
    if (err) {
      console.error('copyopacity failed ' + err);
    } else {
      console.log('compose succ ' + outFile);
    }
    cb && cb(err);
  });
};