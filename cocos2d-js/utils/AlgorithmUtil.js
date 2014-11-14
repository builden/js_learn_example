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
        shuffled[rand] = set[index];
    }
    return shuffled;
};

// Retrieve the values of an object's properties.
// Ltc.values({one: 1, two: 2, three: 3});
// => [1, 2, 3]
Ltc.values = function(obj) {
    var keys = Ltc.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
    }
    return values;
};

var nativeKeys = Object.keys;

// Retrieve the names of an object's properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`
Ltc.keys = function(obj) {
    if (!Ltc.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj)
        if (Ltc.has(obj, key)) keys.push(key);
    return keys;
};

// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
Ltc.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
};

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
Ltc.createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
        case 1:
            return function(value) {
                return func.call(context, value);
            };
        case 2:
            return function(value, other) {
                return func.call(context, value, other);
            };
        case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function() {
        return func.apply(context, arguments);
    };
};

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
Ltc.each = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = Ltc.createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
        for (i = 0; i < length; i++) {
            iteratee(obj[i], i, obj);
        }
    } else {
        var keys = Ltc.keys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
Ltc.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    Ltc['is' + name] = function(obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
});

// Define a fallback version of the method in browsers (ahem, IE), where
// there isn't any inspectable "Arguments" type.
Ltc.isArguments = function(obj) {
    return Ltc.has(obj, 'callee');
};

// Is a given variable an object?
Ltc.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

Ltc.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

// Is the given value `NaN`? (NaN is the only number which does not equal itself).
Ltc.isNaN = function(obj) {
    return Ltc.isNumber(obj) && obj !== +obj;
};

// Is a given value a boolean?
Ltc.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
};

// Is a given value equal to null?
Ltc.isNull = function(obj) {
    return obj === null;
};

// Is a given variable undefined?
Ltc.isUndefined = function(obj) {
    return obj === void 0;
};

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
Ltc.isEmpty = function(obj) {
    if (obj == null) return true;
    if (Ltc.isArray(obj) || Ltc.isString(obj) || Ltc.isArguments(obj)) return obj.length === 0;
    for (var key in obj)
        if (Ltc.has(obj, key)) return false;
    return true;
};