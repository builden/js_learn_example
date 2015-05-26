// 破解流程：
// PowerVR 中有各个格式的文档
// PVRTexTool 创建一个空白工程

var fs = require('fs');
var s = require('underscore.string');
var p2p = require('./pvr2png');
var del = require('del');

var debug = false;
function log() {
  debug && console.log(require('util').format.apply(null, arguments));
}

var a2p = module.exports = function(file, cb) {
  var buf = fs.readFileSync(file);
  if (buf.slice(0, 'ATF'.length).toString('utf8') !== 'ATF') {
    return console.error("Invalid binary atf. Expected 'ATF' at offset 0.");
  }
  console.log('atf2png: ' + file);

  var offset = 0;
  log('Signature: ' + buf.slice(offset, 'ATF'.length).toString('utf8'));
  log('Reverved: ' + buf.readUInt32BE(offset += 3).toString(16));
  log('Version: ' + buf.readUInt8(offset += 4).toString(16));
  log('Length: ' + buf.readUInt32BE(offset += 1).toString(16)); // 文件字节数 - Signature...
  var tmp = buf.readUInt8(offset += 4);
  log('Cubemap: ' + ((tmp >> 7 === 0) ? 'normal texture' : 'cube map texture'));
  var fmtArr = ['RGB888', 'RGBA8888', 'Compressed', 'RAW Compressed', 'Compressed With Alpha', 'RAW Compressed With Alpha'];
  var fmt = tmp & 0x7F;
  log('Format: ' + fmtArr[fmt] + '[' + fmt + ']');
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
    offset += pvrtcLen + 4;
   
    var pvrfile = s.strLeft(file, '.atf') + '.pvr';
    buildPVRFile(pvrfile, width, height, pvrBuf);
    p2p(pvrfile, function() {
      del.sync(pvrfile);
      cb && cb(null);
    });
    

    var etcLen = buf.readUInt32BE(offset);
    log('ETC1ImageDataLength: ' + etcLen.toString(16));
    offset += etcLen + 4;
  }

  if (fmt === 5 || fmt === 3) {
  //for (var i = 0; i < tCount; i++) {
    parseRawCompressedAlpha(cb);
  // }
  } else {
    console.error('unknown fmt ' + fmt);
    cb && cb(null, 'error');
  }
};

/**
 * 生成pvr文件
 * @param  {String} file     pvr文件路径
 * @param  {[type]} width    图片宽度
 * @param  {[type]} height   图片高度
 * @param  {[type]} imgData  RVRTC 4bpp格式的图片原始数据
 */
function buildPVRFile(file, width, height, imgData) {
  var len = imgData.length;
  var buf = new Buffer(0x34 + len);

  // header
  var offset = 0;
  buf.writeUInt32BE(0x50565203, offset); // version: 'PVR'0x3
  buf.writeUInt32LE(0, offset += 4); // flags
  buf.writeUIntLE(0x3, offset += 4, 8); // Pixel Format
  buf.writeUInt32LE(0, offset += 8); // Color Space
  buf.writeUInt32LE(0, offset += 4); // Channel Type
  buf.writeUInt32LE(height, offset += 4); // Width
  buf.writeUInt32LE(width, offset += 4); // height
  buf.writeUInt32LE(1, offset += 4); // Depth
  buf.writeUInt32LE(1, offset += 4); // Num. Surfaces
  buf.writeUInt32LE(1, offset += 4); // Num. Faces
  buf.writeUInt32LE(1, offset += 4); // MIP-Map Count
  buf.writeUInt32LE(0, offset += 4); // Meta Data Size

  // copy imgData
  for (var i = 0; i < len; i++) {
    buf[i + 0x34] = imgData[i];
  }
  
  fs.writeFileSync(file, buf);
}