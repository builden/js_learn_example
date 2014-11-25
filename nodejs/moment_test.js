var moment = require('moment');

var t1 = moment('2014-10-13 17:44:50');
var t2 = moment('2014-10-13 17:45:51');
var t3 = moment(new Date());
console.log(t1.format());
console.log(t2.format());
console.log(t3.format());
t3.add(6, 'second');
console.log(t3.format());
console.log(t2.diff(t1, "seconds"));
console.log(t3.startOf('day'));
console.log(t3.dayOfYear());

if (t3.dayOfYear() === moment('2014-10-21 12:30:01').dayOfYear()) {
    console.log("is the same day");
} else {
    console.log("is not the same day");
}
