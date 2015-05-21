var bp = require('./lib/bplist-parse.js');

var o1 = bp.parse('xa');
var o2 = bp.parse('xx');
var o3 = bp.parse('xb');

console.log(o1.file);
console.log(o1.isB);
console.log(o2.file);
console.log(o2.isB);
console.log(o3.file);
console.log(o3.isB);