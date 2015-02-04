/**
 * @Author: Bill
 * @Date:   2014-12-05 15:16:20
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-30 10:31:23
 * @note https://github.com/caolan/async/blob/master/README.md
 */

'use strict';

var async = require('async');
var log = console.log;

function main() {
    // eachTest();
    // mapTest();
    // filterTest();
    // reduceTest();
    // detectTest();
    // sortByTest();
    // parallelTest(); // 并行执行，result顺序是task申明的顺序
    // seriesTest(); // 串行执行
    // waterfallTest(); // 按顺序执行，每一个函数产生的值都将传给下一个
    // autoTest();
    mapLimitTest();
}

/**
 * [paralleTest description]
 * @return {[type]} [description]
 * enter func1
 * enter func2
 * callback func2
 * callback func1
 */
function parallelTest() {
    async.parallel([
            function(callback) {
                console.log('enter func1');
                setTimeout(function() {
                    console.log('callback func1');
                    callback(null, 'one');
                }, 200);
            },
            function(callback) {
                console.log('enter func2');
                setTimeout(function() {
                    console.log('callback func2');
                    callback(null, 'two');
                }, 100);
            }
        ],
        // optional callback
        function(err, results) {
            console.log(err);
            console.log(results);
            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.
        });
}

/**
 * [seriesTest description]
 * @return {[type]} [description]
 * enter func1
 * callback func1
 * enter func2
 * callback func2
 */
function seriesTest() {
    async.series({
        one: function(callback) {
            console.log('enter func1');
            setTimeout(function() {
                console.log('callback func1');
                callback(null, 1);
            }, 200);
        },
        two: function(callback) {
            console.log('enter func2');
            setTimeout(function() {
                console.log('callback func2');
                callback(null, 2);
            }, 100);
        }
    }, function(err, results) {
        console.log(err);
        console.log(results);
        // results is now equal to: {one: 1, two: 2}
    });

    async.series([function(callback) {
        callback(null);
    }, function(callback) {
        callback('find', '2');
    }, function(callback) {
        callback('find', '3');
    }], function(err, results) {
        if (err) {
            console.log(results[results.length - 1]);
            //=> [ undefined, '2' ]
        }
    });
}

/**
 * 瀑布流，下一个函数执行依赖上一个函数的结果
 * @return {[type]} [description]
 */
function waterfallTest() {
    async.waterfall([
        function(callback) {
            callback(null, 'one', 'two');
        },
        function(arg1, arg2, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
            callback(null, 'three');
        },
        function(arg1, callback) {
            // arg1 now equals 'three'
            callback(null, 'done');
        }
    ], function(err, result) {
        console.log(err);
        console.log(result);
        // result now equals 'done'
    });
}

/**
 * 综合了paraller和series
 * @return {[type]} [description]
 *
 * get_data和make_folder并行
 * write_file依赖前两个函数执行完，并可以得到前两个函数的结果
 * email_link依赖write_file执行完
 */
function autoTest() {
    async.auto({
        get_data: function(callback) {
            console.log('in get_data');
            // async code to get some data
            callback(null, 'data', 'converted to array');
        },
        make_folder: function(callback) {
            console.log('in make_folder');
            // async code to create a directory to store a file in
            // this is run at the same time as getting the data
            callback(null, 'folder');
        },
        write_file: ['get_data', 'make_folder', function(callback, results) {
            console.log('in write_file', JSON.stringify(results));
            // once there is some data and the directory exists,
            // write the data to a file in the directory
            callback(null, 'filename');
        }],
        email_link: ['write_file', function(callback, results) {
            console.log('in email_link', JSON.stringify(results));
            // once the file is written let's email a link to it...
            // results.write_file contains the filename returned by write_file.
            callback(null, {
                'file': results.write_file,
                'email': 'user@example.com'
            });
        }]
    }, function(err, results) {
        console.log('err = ', err);
        console.log('results = ', results);
    });
}

function func(item, cb) {
    console.log('enter func ' + item);
    setTimeout(function() {
        console.log('cb func ' + item);
        if (item === 2) cb(true, item);
        else
            cb(null, item);
    }, 10 * item);
}

function mapLimitTest() {
    async.mapLimit([5, 2, 3, 1], 1, func, function(err, results) {
        if (err) {
            console.log('err: ' + err);
            console.log('results: ' + results);
        } else {
            console.log('results: ' + results);
        }
    });
}

var arr = [{
    name: 'Jack',
    delay: 200
}, {
    name: 'Mike',
    delay: 100
}, {
    name: 'Freewind',
    delay: 300
}];

/**
 * each
 * 同一个集合中的所有元素都执行同一个异步操作
 * each  中间出错了依然会继续执行
 * eachSeries 按顺序执行，第一个执行完之后第二个才进入，中间出错了则不再继续
 * eachLimit 分批执行
 * each(arr, iterator(item, callback), callback(err))
 */
function eachTest() {
    async.each(arr, function(item, callback) {
        log('1.1 enter: ' + item.name);
        setTimeout(function() {
            log('1.1 handle: ' + item.name);
            // callback(null, item.name);
            callback();
        }, item.delay);
    }, function(err) {
        if (err) {
            log('1.1 err: ' + err);
        } else {
            log('1.1 all succ');
        }
    });

    /*
    async.each(arr, function(item, callback) {
        log('1.2 enter: ' + item.name);
        setTimeout(function() {
            log('1.2 handle: ' + item.name);
            if (item.name === 'Jack') {
                callback('myerr');
            }
        }, item.delay);
    }, function(err) {
        if (err) {
            log('1.2 err: ' + err);
        } else {
            log('1.2 all succ');
        }
    });*/
}

/**
 * map
 * 对集合中的每一个元素，执行某个异步操作，得到结果。所有的结果将汇总到最终的callback里
 * map(arr, iterator(item, callback), callback(err, results))
 *
 * https://github.com/bsspirit/async_demo/blob/master/map.js
 */
function mapTest() {
    async.map(arr, function(item, callback) {
        log('1.1 enter: ' + item.name);
        setTimeout(function() {
            log('1.1 handle: ' + item.name);
            callback(null, item.name + '!!!');
        }, item.delay);
    }, function(err, results) {
        if (err) {
            log('1.1 err: ', err);
        } else {
            // 按进入的先后顺序输出
            log('1.1 results: ', results);
        }
    });

    /*    async.map(arr, function(item, callback) {
            log('1.2 enter: ' + item.name);
            setTimeout(function() {
                log('1.2 handle: ' + item.name);
                if (item.name === 'Jack') callback('myerr');
                else callback(null, item.name + '!!!');
            }, item.delay);
        }, function(err, results) {
            if (err) {
                log('1.2 err: ', err);
                log('1.2 err results: ', results);
            } else {
                log('1.2 results: ', results);
            }
        });*/
}

/**
 * filter
 * 使用异步操作对集合中的元素进行筛选。需要注意的是，iterator的callback只有一个参数，只能接收true或false。
 * 对于出错，该函数没有做出任何处理，直接由nodejs抛出。所以需要注意对Error的处理。
 *
 * filter(arr, iterator(item, callback(test)), callback(results))
 *
 * reject和filter相反，当测试为true时，抛弃
 */
function filterTest() {
    async.filter(arr, function(item, callback) {
        log('1.1 enter: ' + item.name);
        setTimeout(function() {
            log('1.1 test: ' + item.name);
            callback(item.delay >= 200);
        }, 200);
    }, function(results) {
        log('1.1 results: ', results);
    });
}

/**
 * Reduce可以让我们给定一个初始值，用它与集合中的每一个元素做运算，最后得到一个值。reduce从左向右来遍历元素，如果想从右向左，可使用reduceRight。
 *
 * reduce(arr, memo, iterator(memo,item,callback), callback(err,result))
 */
function reduceTest() {
    async.reduce([1, 2, 3], 100, function(memo, item, callback) {
        log('1.1 enter: ' + memo + ', ' + item);
        setTimeout(function() {
            callback(null, memo + item);
        }, 100);
    }, function(err, result) {
        log('1.1 err: ', err);
        log('1.1 result: ', result);
    });
}

/**
 * 用于取得第一个满足条件的元素
 *
 * detect(array, iterator(item,callback(test)), callback(result)
 */
function detectTest() {
    var arr = [{
        value: 1,
        delay: 500
    }, {
        value: 2,
        delay: 200
    }, {
        value: 3,
        delay: 300
    }];

    /**
     *  并行执行，通过t.inc做一个累加器，得到第一个满足条件的结果对象
     */
    async.detect(arr, function(item, callback) {
        log('1.1 enter: ', item.value);
        inc(item.value, function(err, n) {
            log('1.1 handle: ', item.value);
            callback(n % 2 === 0);
        }, item.delay);
    }, function(result) {
        log('1.1 result: ', result);
    });
    // 09.928> 1.1 enter: 1
    // 09.928> 1.1 enter: 2
    // 09.928> 1.1 enter: 3
    // 10.138> 1.1 handle: 2
    // 10.228> 1.1 handle: 3
    // 10.228> 1.1 result: { value: 3, delay: 300 }
    // 10.438> 1.1 handle: 1
    // 10.438> 1.1 handle: 1
}

/**
 * 对集合内的元素进行排序，依据每个元素进行某异步操作后产生的值，从小到大排序。
 */
// sortBy(array, iterator(item,callback(err,result)), callback(err,results))
function sortByTest() {
    async.sortBy(arr, function(item, callback) {
        setTimeout(function() {
            callback(null, item.name);
        }, 200);
    }, function(err, results) {
        log('1.1 err: ', err);
        log('1.1 results: ', results);
    });
}

/**
 * 当集合中是否有至少一个元素满足条件时，最终callback得到的值为true，否则为false.
 */
// some(arr, iterator(item,callback(test)), callback(result))
function someTest() {
    async.some(arr, function(item, callback) {
        log('1.1 enter: ', item);
        setTimeout(function() {
            log('1.1 handle: ', item);
            callback(item <= 3);
        }, 100);
    }, function(result) {
        log('1.1 result: ', result);
    });
}

/**
 * 如果集合里每一个元素都满足条件，则传给最终回调的result为true，否则为false
 */
// every(arr, iterator(item,callback), callback(result))

/**
 * 将多个异步操作的结果合并为一个数组。
 */
// concat(arr, iterator(item,callback(err,result)), callback(err,result))

/**
 * 并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序。
 *
 * 如果某个函数出错，则立刻将err和已经执行完的函数的结果值传给parallel最终的callback。其它未执行完的函数的值不会传到最终数据，但要占个位置。
 * 同时支持json形式的tasks，其最终callback的结果也为json形式。
 */
// parallel(tasks, [callback])


var inc = function(n, callback, timeout) {
    //将参数n自增1之后的结果返回给async
    timeout = timeout || 200;
    setTimeout(function() {
        callback(null, n + 1);
    }, timeout);
};

main();