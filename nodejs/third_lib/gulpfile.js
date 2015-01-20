/* 
* @Author: Bill
* @Date:   2015-01-20 15:41:38
* @Last Modified by:   Bill
* @Last Modified time: 2015-01-20 16:20:24
*/

'use strict';

var gulp = require('gulp');

// API
// 数据源
// gulp.src(globs[, options])
//   globs - String or Array
// 
// 目标文件夹
// gulp.dest(path[, options])
// 
// 任务
// gulp.task(name[, deps], fn)
// 
// 监视到文件变化后，执行任务
// gulp.watch(glob[, opts], tasks)
// 
// 监视文件变化，响应事件cb(event)
// gulp.watch(glob[, opts, cb])
//   event.type -- added, changed or deleted.
//   event.path -- filepath


// watch的两种用法
// var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

// gulp.watch('js/**/*.js', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

// gulp.src('client/templates/*.jade')
//   .pipe(jade())
//   .pipe(minify())
//   .pipe(gulp.dest('build/minified_templates'));

gulp.task('one', function(cb) {
    console.log('in task one');
    cb(); // 任务完成，异步函数中用于跳出任务
    // cb('error'); 出错中断，提示异常
});

gulp.task('two', ['one'], function() {
    console.log('in task two');
});

// 这里task one只会执行一次
gulp.task('default', ['two', 'one'], function() {
    console.log('in default task');
});