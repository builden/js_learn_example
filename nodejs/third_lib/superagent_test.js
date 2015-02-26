/* 
 * @Author: Bill
 * @Date:   2015-02-09 11:08:55
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-02-09 11:34:43
 *
 * https://github.com/visionmedia/superagent
 */

'use strict';

var request = require('superagent');

function main() {
    getTest();
    // postTest();
}

function getTest() {
    request.get('http://www.baidu.com')
        .timeout(1000) // 设置超时
        .query({
            query: 'Manny',
            range: '1..5',
            order: 'desc'
        }) // <==> ?query=Manny&range=1..5&order=desc
        .on('error', errorHandle)
        .end(function(res) {
            if (res.ok) {
                // res.body is the parsed object
                console.log(res.text);
                console.log('res headers %j', res.headers);
                console.log('res header content-type ' + res.header['content-type']);
                console.log('res type ' + res.type);
                console.log('res charset ' + res.charset);
            } else {
                console.log('Oh no! error ' + res.text);
            }
        });
}

function errorHandle(err) {
    console.log('errorHandle err ' + err);
}

function postTest() {
    request.post('/user')
        .type('form') // default is json(application/x-www-form-urlencoded)
        .set('Content-Type', 'application/json')
        .send('{"name":"tj","pet":"tobi"}') // <=> .send({ name: 'tj', pet: 'tobi' })
        .end(function(res) {

        });
}

main();