/**
 * @Author: Bill
 * @Date:   2014-12-13 13:55:34
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-13 14:02:33
 */

'use strict';
var querystring = require('querystring');

function main() {
    var queryStr = 'foo=bar&baz=qux&baz=quux&corge=';
    console.log(querystring.parse(queryStr));
    //=> { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }

    var queryObj = {foo:'bar', baz: ['qux', 'quux']};
    // var queryObj = {data: {foo:'bar', baz: ['qux', 'quux']}};
    console.log(querystring.stringify(queryObj));
}

main();