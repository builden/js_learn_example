/* 
* @Author: Bill
* @Date:   2015-03-24 16:43:12
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-24 16:48:10
*/

'use strict';

var gulp = require('gulp');

var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
 
// 设置reporter格式
//   如:mocha({reporter: 'nyan'})
// mocha --reporters可以查看mocha支持的reporter格式
gulp.task('test', function (cb) {
  gulp.src(['lib/**/*.js', 'main.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});