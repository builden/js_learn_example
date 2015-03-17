/* 
* @Author: Bill
* @Date:   2015-03-17 17:11:34
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-17 17:38:45
*
* 参考https://github.com/janl/mustache.js/blob/master/mustache.js
*/

'use strict';

(function(global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        factory(exports);
    } else {
        factory(global.Hello = {});
    }
}(this, function(hello) {
    console.log('enter func');
    hello.func1 = function(arg) {
        console.log('call func1 and arg ' + arg);
    };

    hello.version = '1.0.1';
}));