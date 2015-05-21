
var fs = require('fs');

function BplistObj(file) {
  this.file = file;
  this.isB = false;
  // fs.readFileSync(file);
  if (file === 'xx') {
    this.isB = true;
  }
}

BplistObj.prototype.isBplist = function() {
  return this.isB;
}

BplistObj.prototype.info = function() {

}

var parse = exports.parse = function parse(file) {
  return new BplistObj(file);
}