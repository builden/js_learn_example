var fs = require('fs');
var debug = true;
function log() {
  debug && console.log(require('util').format.apply(null, arguments));
}

var parse = exports.parse = function(file) {
  var buf = fs.readFileSync(file);

  var offset = 0;
  var headerLen = buf.readUInt32LE(offset);
  log('headerLength: ' + headerLen.toString(16));
  var height = buf.readUInt32LE(offset += 4);
  log('height: ' + height.toString(16));
  var width = buf.readUInt32LE(offset += 4);
  log('width: ' + width.toString(16));
  log('numMipmaps: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('flags: ' + buf.readUInt32LE(offset += 4).toString(16));
  var dataLen = buf.readUInt32LE(offset += 4);
  log('dataLength: ' + dataLen.toString(16));
  log('bpp: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('bitmaskRed: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('bitmaskGreen: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('bitmaskBlue: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('bitmaskAlpha: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('pvrTag: ' + buf.readUInt32LE(offset += 4).toString(16));
  log('numSurfs: ' + buf.readUInt32LE(offset += 4).toString(16));

  console.log('buf dataLen: ' + buf.length.toString(16));
  console.log(buf.slice(headerLen));
}

// parse('../test/res/_0000_chip2.pvr');
parse('fire.pvr');