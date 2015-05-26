var argv = require('optimist').argv;
var glob = require('glob-all');
var path = require('path');
var async = require('async');
var parser = require('./lib/tp-parser.js');
var splitImg = require('./lib/split-img.js');
var del = require('del');

var cwd = process.cwd();

function main() {
  if (argv.h || argv.help || process.argv.length === 2) {
    console.log([
      'usage: tp glob ...',
      '',
      'options:',
      '  -h --help        print the help list'
    ].join('\n'));
    return;
  }

  var globArr = [];
  argv._.forEach(function(item) {
    globArr.push(path.join(cwd, item))
  });

  var files = glob.sync(globArr);
  async.mapLimit(files, 1, function(file, callback) {
    var ext = path.extname(file);
    if (ext !== '.xml' && ext !== '.plist') {
      callback();
      return;
    }
    parser(file, function(err, obj) {
      if (err) {
        callback(null, err);
      } else {
        var f = path.parse(file);
        var imgPath = path.join(f.dir, obj.img);
        var outPath = path.join(f.dir, f.name);
        console.log(outPath);
        splitImg(imgPath, obj, outPath, callback);
      }
    });
  }, function(err, results) {
    console.log('split complete');
    del.sync('tmp');
  });
}

main();