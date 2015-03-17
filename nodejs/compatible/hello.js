/* 
 * @Author: Bill
 * @Date:   2015-03-17 16:48:37
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-03-17 17:41:37
 */

'use strict';

(function(name, definition) {
    var hasExports = typeof module !== 'undefined' && module.exports;;
    if (hasExports) {
        module.exports = definition();
    } else {
        window[name] = definition();
    }
})('hello', function() {
    console.log('enter func');
    var hello = function(arg) {
        this.property1 = arg;
    };

    hello.prototype.func1 = function() {
        console.log('call func1');
        console.log('property1 ' + this.property1);
        this.property1 = 1;
    };

    hello.prototype.func2 = function(arg) {
        console.log('call func2 and arg is ' + arg);
        console.log('property1 ' + this.property1);
    };

    return hello;
});