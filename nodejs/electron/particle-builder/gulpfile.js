/* 
 * @Author: Bill
 * @Date:   2015-05-12 15:21:46
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-05-12 15:41:42
 */

'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var images = require('images');
var glob = require('glob-all');
var gm = require('gm');

gulp.task('imagemin', function() {
  gulp.src(['res/**/*.png', 'res/**/*.jpg'])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant({
        speed: 3
      })]
    }))
    .pipe(gulp.dest('res/'));
});

gulp.task('resave', function() {
  var files = glob.sync(['res/**/*.png', 'res/**/*.jpg']);
  files.forEach(function(file) {
    console.log(file);
    var img = gm(file);
    img.write(file, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('succ');
      }
    });
  });
});