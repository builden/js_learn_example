var fs = require('fs');
var path = require('path');
var png = require('pngjs-image');
var debug = true;
function log() {
  debug && console.log(require('util').format.apply(null, arguments));
}

var a2p = module.exports = function(file, cb) {
  var buf = fs.readFileSync(file);
  if (buf.slice(0, 'ATF'.length).toString('utf8') !== 'ATF') {
    return console.error("Invalid binary atf. Expected 'ATF' at offset 0.");
  }

  var offset = 0;
  log('Signature: ' + buf.slice(offset, 'ATF'.length).toString('utf8'));
  log('Reverved: ' + buf.readUInt32BE(offset += 3).toString(16));
  log('Version: ' + buf.readUInt8(offset += 4).toString(16));
  log('Length: ' + buf.readUInt32BE(offset += 1).toString(16)); // 文件字节数 - Signature...
  var tmp = buf.readUInt8(offset += 4);
  log('Cubemap: ' + ((tmp >> 7 === 0) ? 'normal texture' : 'cube map texture'));
  var fmtArr = ['RGB888', 'RGBA8888', 'Compressed', 'RAW Compressed', 'Compressed With Alpha', 'RAW Compressed With Alpha'];
  log('Format: ' + fmtArr[tmp & 0x7F]);
  var width = Math.pow(2, buf.readUInt8(offset += 1));
  log('Log2Width: ' + width);
  var height = Math.pow(2, buf.readUInt8(offset += 1));
  log('Log2Heigth: ' + height);
  // Total Number of Texture encoded per face. Maximum value allowed is 13
  var tCount = buf.readUInt8(offset += 1);
  log('Count: ' + tCount.toString(16));
  offset += 1;

  function parseRawCompressedAlpha() {
    var dxt5Len = buf.readUInt32BE(offset);
    log('DXT5ImageDataLength: ' + dxt5Len.toString(16));
    offset += dxt5Len + 4;
    var pvrtcLen = buf.readUInt32BE(offset);
    log('PVRTCImageDataLength: ' + pvrtcLen.toString(16));
    var pvrBuf = buf.slice(offset + 4, offset + 4 + pvrtcLen);

    var off = 0;
    var outBuf = new Buffer(0x34 + pvrtcLen);
    outBuf.writeUInt32LE(0x34, off);
    outBuf.writeUInt32LE(height, off += 4);
    outBuf.writeUInt32LE(width, off += 4);
    outBuf.writeUInt32LE(0, off += 4);
    outBuf.writeUInt32LE(8019, off += 4);
    outBuf.writeUInt32LE(pvrtcLen, off += 4);
    outBuf.writeUInt32LE(4, off += 4);
    outBuf.writeUInt32LE(0, off += 4);
    outBuf.writeUInt32LE(0, off += 4);
    outBuf.writeUInt32LE(0, off += 4);
    outBuf.writeUInt32LE(1, off += 4);
    outBuf.writeUInt32LE(1232323, off += 4);
    outBuf.writeUInt32LE(1, off += 4);
    log(pvrBuf);
    for (var i = 0; i < pvrBuf.length; i++) {
      outBuf.writeUInt8(pvrBuf[i], 0x34 + i);
    }
    // outBuf.writeUIntLE(pvrBuf, 0x34, pvrtcLen);
    log(outBuf.slice(0x34, outBuf.length));
    log(outBuf.length.toString(16));
    fs.writeFileSync('tt.pvr', outBuf);

    var etcLen = buf.readUInt32BE(offset);
    log('ETC1ImageDataLength: ' + etcLen.toString(16));
    offset += etcLen + 4;
  }
  parseRawCompressedAlpha();
};

a2p('../test/res/age-cp2m-0.atf');


