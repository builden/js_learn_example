/**
 * @Author: Bill
 * @Date:   2014-12-17 16:14:48
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-05-05 12:02:01
 *
 * https://lodash.com/docs
 */

'use strict';

var _ = require('lodash');

function main() {
    sumTest();
    // mapTest();
    // eachTest();
    // cloneTest();
    // reduceTest();
    // rangeTest();
    removeTest();
    // containsTest();
    // forEachTest();
    // assignTest();
    // groupByTest();
    mergeTest();

    var require2;
    if (_.isUndefined(require2)) {
        console.log('require2 is undefined');
    }
}

function sumTest() {
    var arr = [{
        star: 1,
        score: 12
    }, {
        star: 2,
        score: 13
    }];
    console.log('sum: ' + _.sum(arr, 'star'));
}

function mergeTest() {
    var obj1 = {
        x: 1
    };
    var obj2 = {
        y:2,
        z: {a:1, b: 2}
    };
    var obj3 = _.merge(obj1, obj2);
    console.log(obj1);
    //=> { x: 1, y: 2, z: { a: 1, b: 2 } }
    console.log(obj2);
    //=> { y: 2, z: { a: 1, b: 2 } }
    console.log(obj3);
    //=> { x: 1, y: 2, z: { a: 1, b: 2 } }
}

function mapTest() {
    var i = 0;
    var arr = _.map(new Array(5), function() {
        if (++i % 2 === 0)
            return 0;
    });
    console.log(arr);
    //=> [ undefined, 0, undefined, 0, undefined ]

    var obj = {
        one: 1,
        tow: 2,
        three: 3
    };
    var ao = _.map(obj, function(num, key) {
        console.log(key + " " + num);
        return ++num;
    });
    console.log(JSON.stringify(ao));
    //=> [2, 3, 4]
}

function eachTest() {
    var arr = _.map(new Array(5), function() {
        return 0;
    });

    _.each(arr, function(num) {
        num = new Array(3);
        console.log(num);
    });
    console.log(arr);
}

function cloneTest() {
    var srca = [1, 2, 3, 4, 5];
    var desta = _.clone(srca);
    desta[0] = 2;
    console.log('srca: ' + srca);
    //=> srca: 1,2,3,4,5
    console.log('desta: ' + desta);
    //=> desta: 2,2,3,4,5

    var srco = {
        a: 1,
        b: 2,
        c: {
            a: 2,
            b: 3
        }
    };
    var desto = _.clone(srco);
    desto.a = 2;
    console.log('srco: ' + JSON.stringify(srco));
    //=> srco: {"a":1,"b":2,"c":{"a":2,"b":3}}
    console.log('desto: ' + JSON.stringify(desto));
    //=> desto: {"a":2,"b":2,"c":{"a":2,"b":3}}

    var units = [
        [{
            item: 0,
            exMagic: 1,
            obj: {
                a: 1,
                b: 1
            }
        }, {
            item: 1,
            exMagic: 2,
            obj: {
                a: 2,
                b: 2
            }
        }],
        [{
            item: 0,
            exMagic: 1,
            obj: {
                a: 1,
                b: 1
            }
        }, {
            item: 1,
            exMagic: 2,
            obj: {
                a: 2,
                b: 2
            }
        }]
    ];

    var tmpUnits = _.clone(units);
    console.log(JSON.stringify(tmpUnits));
    tmpUnits[0][0].obj.a = 3;
    console.log(JSON.stringify(units));
}

// 缩减
function reduceTest() {
    var arr = [{
        item: 1,
        w: 10
    }, {
        item: 2,
        w: 10
    }, {
        item: 3,
        w: 10
    }, {
        item: 4,
        w: 10
    }, {
        item: 5,
        w: 10
    }];
    // var arr = [1, 2, 3];
    var sum = _.reduce(arr, function(left, right) {
        left.w += right.w;
        return left;
    });
    console.log(arr);
    //=> [ { item: 1, w: 50 },
    //=>   { item: 2, w: 10 },
    //=>   { item: 3, w: 10 },
    //=>   { item: 4, w: 10 },
    //=>   { item: 5, w: 10 } ]
    console.log(sum);
    //=> { item: 1, w: 50 }
}

// _.range([start=0], end, [step=1])
function rangeTest() {
    console.log(_.range(1, 6, 2));
    //=> [ 1, 3, 5 ]
}

function removeTest() {
    var arr = [1, 2, 3, 4, 5];
    console.log(_.remove(arr, function(v) {
        return v % 2 === 0;
    }));
    //=> [ 2, 4 ]
    console.log(arr);
    //=> [ 1, 3, 5 ]

    var arr2 = [{
        x: 1,
        y: 2
    }, {
        x: 1,
        y: 1
    }, {
        x: 1,
        y: 3
    }];
    console.log(_.remove(arr2, function(v) {
        return (v.y === 2);
    }));
    console.log(arr2);

    var arr3 = [1, 2, 3];
    _.remove(arr3, function(item) {
        return item == 2;
    });
    console.log('==== %j', arr3);
}

function containsTest() {
    var arr = [{
        item: 1,
        w: 10
    }, {
        item: 2,
        w: 10
    }, {
        item: 3,
        w: 10
    }, {
        item: 4,
        w: 10
    }, {
        item: 5,
        w: 10
    }];
    var ex = [2, 3];
    _.remove(arr, function(v) {
        return _.contains(ex, v.item);
    });
    console.log(arr);
    //=> [ { item: 1, w: 10 }, { item: 4, w: 10 }, { item: 5, w: 10 } ]
}

function forEachTest() {
    var arr = [{
        item: 1,
        w: 10
    }, {
        item: 2,
        w: 10
    }, {
        item: 3,
        w: 10
    }, {
        item: 4,
        w: 10
    }, {
        item: 5,
        w: 10
    }];
    _.forEach(arr, function(v) {
        console.log(JSON.stringify(v));
    });
}

function assignTest() {
    console.log(_.assign({
        'name': 'fred'
    }, {
        'employer': 'slate'
    }));
    //=> { 'name': 'fred', 'employer': 'slate' }
}

function groupByTest() {
    var arr = [{
        x: 1,
        y: 1
    }, {
        x: 2,
        y: 2
    }, {
        x: 1,
        y: 2
    }, {
        x: 2,
        y: 3
    }, {
        x: 3,
        y: 2
    }];
    console.log(_.groupBy(arr, function(item) {
        return 'item' + item.y;
    }));
}

main();