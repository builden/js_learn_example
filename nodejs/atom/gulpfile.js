/* 
* @Author: Bill
* @Date:   2015-03-26 17:35:59
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-26 17:50:48
*/

'use strict';

var gulp = require('gulp');
var atomshell = require('gulp-atom-shell');
 
gulp.task('default', function () {
    return gulp.src('./**')
        .pipe(atomshell({ version: '0.0.1', platform: 'win32' }))
        .pipe(atomshell.zfsdest('app.zip'));
});