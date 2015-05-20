var exec = require('child_process').exec;
var path = require('path');
var del = require('del');
var gm = require('gm');
var fs = require('fs');

module.exports = function(file, cb) {
  var f = path.parse(file);
  var pngFile = path.join(f.dir, f.name) + '.png';
  var pvrFile = path.join(f.dir, f.name) + '.pvr';
  var cmd = 'PVRTexToolCLI -f PVRTC1_4 -i \"' + file + '\" -d \"' + pngFile + '\"';
  exec(cmd, function(err, stdout, stderr) {
    console.log('ktx2png ' + file);
    console.log(stdout);
    if (err) {
      console.log('Error: ' + err);
      cb && cb(null, 'error');
    } else {
      flipPngFile(pngFile);
      del.sync(pvrFile);
      cb && cb();
    }
  });
}

function flipPngFile(png) {
  if (fs.existsSync(png)) {
    var img = gm(png);
    img.flip();
    img.write(png, function(err) {
      if (err) {
        console.log('gm flip ' + png + ' error!!!');
      }
    })
  }
}