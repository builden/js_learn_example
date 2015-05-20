var fs = require('fs');

var f2b = exports.f2b = function f2b(file) {
  var buf = fs.readFileSync(file);
  return buf.toString('base64');
};

var b2f = exports.b2f = function(base64, file) {
  var buf = new Buffer(base64, 'base64');
  fs.writeFileSync(file, buf);
};