var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js').parseString;
var plist = require('./plist-parse.js');

/**
 * 解析成通用的结构
 * @param  {String}   file
 * @param  {Function} cb   (err, obj)
 *   obj - {
 *     img: 对应的图片文件名,
 *     frames: [
 *       n: frame文件名,
 *       rect : {
 *         x: 相对于spritesheet的x坐标,
 *         y: 相对于spritesheet的y坐标,
 *         w: 在spritesheet中所占宽度,
 *         h: 在spritesheet中所占高度
 *       },
 *       oRect: {
 *         x: sprite裁剪后相对于原始x坐标偏移位置,
 *         y: sprite裁剪后相对于原始y坐标偏移位置,
 *         w: sprite裁剪前实际宽度,
 *         h: sprite裁剪前实际高度
 *       },
 *       r: true
 *     ]
 *   }
 */
var parser = module.exports = function(file, cb) {
  var ext = path.extname(file);
  if (ext === '.plist') {
    parsePlist(file, cb);
  } else if (ext === '.xml') {
    parseXml(file, cb);
  } else {
    console.error('unknown file: ' + file);
    cb && cb('unkonwn');
  }
}

function parseXml(file, cb) {
  var ctx = fs.readFileSync(file, 'utf8');
  xml2js(ctx, function(err, obj) {
    if (err) {
      console.error('parse xml failed, ' + file);
      cb && cb('error');
      return;
    }

    if (!isXmlValid(obj)) {
      console.error('unknown xml: ' + file);
      cb && cb('error');
      return;
    }

    var rst = {
      img: obj.TextureAtlas.$.imagePath,
      frames: []
    };

    var frames = obj.TextureAtlas.sprite || obj.TextureAtlas.SubTexture;
    frames.forEach(function(frame) {
      var f = frame.$;
      var w = parseInt(f.w) || parseInt(f.width);
      var h = parseInt(f.h) || parseInt(f.height);
      var r = (f.r === 'y') || (f.rotated === 'true');

      var one = {
        n: f.n || f.name,
        rect: {
          x: parseInt(f.x),
          y: parseInt(f.y),
          w: w,
          h: h
        },
        oRect: {
          x: parseInt(f.oX) || 0,
          y: parseInt(f.oY) || 0,
          w: parseInt(f.oW) || (r ? h : w),
          h: parseInt(f.oH) || (r ? w : h)
        },
        r: r
      };

      if (!path.extname(one.n)) {
        one.n += '.png';
      }

      if (obj.TextureAtlas.SubTexture) {
        var oW = parseInt(f.frameWidth);
        var oH = parseInt(f.framwHeight)
        one.oRect.x = -1 * parseInt(f.frameX) || 0;
        one.oRect.y = -1 * parseInt(f.frameY) || 0;
        one.oRect.w = oW || w;
        one.oRect.h = oH || h;
      }
      rst.frames.push(one);
    });

    cb && cb(null, rst);
  });
}

function isXmlValid(obj) {
  var isValid = false;
  if (obj.TextureAtlas) {
    if (obj.TextureAtlas.SubTexture || obj.TextureAtlas.sprite) {
      isValid = true;
    }
  }
  return isValid;
}

function parsePlist(file, cb) {

}

// var file = '../test/res/candy_c_hi_hd.xml';
var file = '../test/res/age-cp2m-0.xml';

parseXml(file, function(err, obj) {
  console.log(JSON.stringify(obj, null, 2));
});
