/**
 * 一些常用的算法
 */

var Ltc = Ltc || {};

// 生成一个随机数，闭区间
// Return a random integer between min and max (inclusive).
Ltc.random = function(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

// 数组洗牌
// Shuffle a collection, using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
Ltc.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : Ltc.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = Ltc.random(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = set [index];
    }
    return shuffled;
};

Ltc.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

// Retrieve the values of an object's properties.
// Ltc.values({one: 1, two: 2, three: 3});
// => [1, 2, 3]
Ltc.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
    }
    return values;
};
