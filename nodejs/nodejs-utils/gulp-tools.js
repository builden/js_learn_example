/**
 * 对外接口:
 *   buildSheet(globList, destDir, cb);  -- 生成spriteSheet资源到destDir目录，并做压缩和hash
 *   concatJs(jsList, concatName, destDir, cb); -- 拼接js，并做压缩和hash
 *   hashFile(globList, destDir, cb); -- hash文件，并到destDir目录
 *   jpgMin(file, quality, destDir, cb); -- 压缩jpg图片
 *   writeH5ProjectJson(frameRate); -- 生成发布用的project.json文件
 *   writeResource(resObj, destFile); -- 生成资源文件到指定目录
 *   webJshint(globList); -- web端做jshint
 *   nodeJshint(globList); -- node端做jshint
 *   imgToWebBase64(file, needCompress, cb); -- 生成web用的image
 *   selTask(taskList, cb); -- console中选择Task
 *   cocosCompile(pf, cb); -- cocos compile
 *   buildResourceJs(fileList, projName, cb); -- 生成对应工程的resource文件
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');
var QUANT_QUALITY = '70-85'; // 默认图片压缩质量
var mozjpeg = require('imagemin-mozjpeg');
var JPG_QUALITY = 70; // 默认JPG图片压缩质量

var _ = require('lodash');
var gm = require('gm');
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var glob = require('glob-all');
var exec = require('child_process').exec;
var s = require('underscore.string');
var plist = require('plist');

// 系统临时目录
var tmpdir = require('os').tmpdir();

var buildSheet = exports.buildSheet = function(globList, destDir, cb) {
  var dirs = glob.sync(globList);
  async.map(dirs, function(dir, callback) {
    var name = path.relative('res-origin', dir);
    var plistFile = path.join(tmpdir, name + '.plist');
    var pngFile = path.join(tmpdir, name + '.png');
    var outDir = path.join(destDir, path.dirname(name));

    execTP(plistFile, pngFile, dir, function(err) {
      if (!err) {
        minAndHashTP(plistFile, pngFile, outDir, callback);
      } else {
        callback(err);
      }
    });
  }, cb);
};

/**
 * 合并js文件列表，并修改文件的hash值
 * @param  {Array}   jsList
 * @param  {String}   concatName 合并后的文件，如：main.min.js
 * @param  {String}   destDir    生成后的目标目录
 * @param  {Function} cb         (err, hashName) - 返回hash之后的文件名称
 */
var concatJs = exports.concatJs = function(jsList, concatName, destDir, cb) {
  var hashName = '';
  gulp.src(jsList)
    .pipe(plugins.concat(concatName))
    .pipe(plugins.md5(7))
    .on('data', function(file) {
      hasName = path.basename(file.path);
    })
    .pipe(gulp.dest(destDir))
    .on('finish', function() {
      cb && cb(null, hashName);
    });
};

var hashFile = exports.hashFile = function(globList, destDir, cb) {
  gulp.src(globList)
    .pipe(plugins.md5(7))
    .pipe(gulp.dest(destDir))
    .on('finish', cb);
};

var imgMin = exports.imgMin = function(globList, destDir, cb) {
  gulp.src(globList)
    .pipe(plugins.imagemin({
      progressive: true,
      use: [pngquant({
        speed: 3,
        quality: QUANT_QUALITY
      }), mozjpeg({
        quality: JPG_QUALITY
      })]
    }))
    .pipe(plugins.md5(7))
    .pipe(gulp.dest(destDir))
    .on('finish', cb);
};

/**
 * 压缩jpg文件
 * @param  {[type]}   file    [description]
 * @param  {Number}   quality 0 - 100之间，100是最好的质量
 * @param  {[type]}   destDir [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
var jpgMin = exports.jpgMin = function(file, quality, destDir, cb) {
  var tmpFile = path.join(tmpdir, path.basename(file));
  gm(file)
    .quality(quality)
    .write(tmpFile, function(err) {
      if (err) {
        console.error('jpgMin failed: ' + err);
        cb && cb(err);
      } else {
        hashFile(tmpFile, destDir, cb);
      }
    });
}

var writeH5ProjectJson = exports.writeH5ProjectJson = function(frameRate) {
  var ctx = fs.readFileSync(__dirname + '/project.json.tmpl');
  var compiled = _.template(ctx);
  var rst = compiled({
    frameRate: frameRate || 60
  });
  fs.writeFileSync('./publish/html5/project.json', rst);
};

var writeResource = exports.writeResource = function(resObj, destFile) {
  var ctx = fs.readFileSync(__dirname + '/resource.tmpl');
  var compiled = _.template(ctx);
  var rst = compiled({});
  fs.writeFileSync(destFile, rst);
};

var webJshint = exports.webJshint = function(globList) {
  gulp.src(globList)
    .pipe(plugins.jshint(__dirname + '/web.jshintrc'))
    .pipe(plugins.jshint.reporter('default'));
};

var nodeJshint = exports.nodeJshint = function(globList) {
  gulp.src(globList)
    .pipe(plugins.jshint(__dirname + '/node.jshintrc'))
    .pipe(plugins.jshint.reporter('default'));
};

var execTP = function(plistFile, pngFile, dir, cb) {
  var cmd = 'TexturePacker --data ' + plistFile + ' --sheet ' + pngFile + ' --max-size 2048 --size-constraints AnySize ' + dir;
  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      console.error(stderr);
    } else {
      console.log(stdout);
    }

    cb && cb(err);
  });
}

var minAndHashTP = function(plistFile, pngFile, destDir, cb) {
  var hashPngFile = '';
  gulp.src(pngFile)
    .pipe(plugins.imagemin({
      progressive: true,
      use: [pngquant({
        speed: 3,
        quality: QUANT_QUALITY
      }), mozjpeg({
        quality: JPG_QUALITY
      })]
    }))
    .pipe(plugins.md5(7))
    .on('data', function(file) {
      hashPngFile = file.path;
    })
    .pipe(gulp.dest(destDir))
    .on('finish', function() {
      gulp.src(plistFile)
        .pipe(plugins.replace(path.basename(pngFile), path.basename(hashPngFile)))
        .pipe(plugins.md5(7))
        .pipe(gulp.dest(destDir))
        .on('finish', cb);
    });
}

var fileToBase64 = function(file) {
  var ctx = fs.readFileSync(file);
  return new Buffer(ctx).toString('base64');
};

var imgToWebBase64 = exports.imgToWebBase64 = function(file, needCompress, cb) {
  if (needCompress) {
    var basename = path.basename(file);
    var ext = path.extname(file);
    var tmpFile = path.join(tmpdir, basename);
    gulp.src(file)
      .pipe(plugins.imagemin({
        progressive: true,
        use: [pngquant({
          speed: 3,
          quality: QUANT_QUALITY
        }), mozjpeg({
          quality: JPG_QUALITY
        })]
      }))
      .pipe(gulp.dest(tmpFile))
      .on('finish', function() {
        cb && cb(null, 'data:image/' + ext.slice(1) + ';base64,/' + fileToBase64(tmpFile));
      });
  } else {
    var f = path.parse(file);
    cb && cb(null, 'data:image/' + f.ext.slice(1) + ';base64,/' + fileToBase64(file));
  }
};

var replaceAndLogo = exports.replaceAndLogo = function(file, cb) {
  var logoPath = 'frameworks/runtime-src/proj.android/res/';
  var fileList = {
    'drawable-hdpi/icon.png': 72,
    'drawable-mdpi/icon.png': 48,
    'drawable-ldpi/icon.png': 32
  };

  async.forEachOf(fileList, function(value, key, callback) {
    var destFile = logoPath + key;
    gm(file)
      .resize(value, value)
      .write(destFile, function(err) {
        if (err) {
          return callback(err);
        }
        gulp.src(destFile)
          .pipe(plugins.imagemin({
            progressive: true,
            use: [pngquant({
              speed: 3,
              quality: QUANT_QUALITY
            })]
          }))
          .pipe(gulp.dest(destFile))
          .on('finish', callback);
      });
  }, function(err) {
    console.log('replaceAndLogo finished!');
    cb && cb();
  });
};

/**
 * 选择任务
 * @param  {Array}   taskList 显示的选择列表
 * @param  {Function} cb      (err, taskname)
 */
var selTask = exports.selTask = function(taskList, cb) {
  var inquirer = require('inquirer');
  inquirer.prompt([{
    type: "list",
    name: "task",
    message: "What do you want to do?",
    choices: taskList
  }], function(answers) {
    cb && cb(null, answers.task);
  });
};

/**
 * cocos compile
 * @param  {String}   pf (web | and | ios)
 * @param  {Function} cb (err)
 */
var cocosCompile = exports.cocosCompile = function(pf, cb) {
  var cmd = 'cocos compile -m release -p web --source-map';
  if (pf === 'and') {
    cmd = 'cocos compile -m release -p android';
  } else if (pf === 'ios') {
    cmd = 'cocos compile -m release -p ios';
  }

  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      console.error(stderr);
    } else {
      console.log(stdout);
    }
    cb && cb(err);
  });
};

var buildResourceJs = exports.buildResourceJs = function(fileList, projName, cb) {
  var resList = {};
  var resInList = {};
  fileList.forEach(function(file) {
    var ext = path.extname(file);
    var base = path.basename(file, ext);
    if (path.extname(file) === '.plist') {
      var obj = plist.parse(fs.readFileSync(file, 'utf8'));

      var groupName = s.strRight(base, 'tp-');
      groupName = s.strLeftBack(groupName, '_');
      var group = resInList[groupName] = {};
      for (var frame in obj.frames) {
        group[path.parse(frame).name] = '#' + frame;
      }
    }

    var key = s.strLeftBack(base, '_') + '_' + s.strRight(ext, '.');
    resList[key] = file;
  });

  var rst = {
    resList: JSON.stringify(resList, null, 2),
    resInList: JSON.stringify(resInList, null, 2)
  };

  var ctx = fs.readFileSync(path.join(__dirname, 'resource.tmpl'), 'utf8');
  var compiled = _.template(ctx);
  var rst = compiled(rst);

  var outName = 'src/' + projName + '/' + projName + '-resource.js';
  fs.writeFileSync(outName, rst);
  cb && cb();
}