var exec = require('child_process').exec;
var path = require('path');
var s = require('underscore.string');

// pvr文件还可以通过PVRTexToolCLI转化
//   PVRTexToolCLI -f PVRTC1_4 -i _0000_chip2.pvr -d _0000_chip2.png
   
// 出现问题可以参考
// TexturePacker.exe "%%d" --sheet "%%~dpnd.png" --data "%%~dpnd.plist" --opt RGBA8888 --allow-free-size --algorithm Basic --no-trim --dither-fs
// 参数说明：
//   --sheet png文件路径
//   --opt   图片格式
//   --allow-free--size 居中
//   --algorithm Basic
//   --no-trim
//   --dither-fs
module.exports = function pvr2png(file, cb) {
  var f = path.parse(file);
  var ext = f.ext;
  var name = f.dir + '/' + f.name;
  if (ext === '.ccz') {
    name = s.strLeft(name, '.pvr');
    ext = '.pvr.ccz';
  }
  var cmd = 'TexturePacker --opt RGBA8888 --sheet "' + name + '.png" "' + name + ext + '"' + ' --no-trim --allow-free-size';
  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.log('Error: ' + err);
      // console.log(stderr);
      cb && cb(null, 'error');
    } else {
      cb && cb();
    }
  });
};