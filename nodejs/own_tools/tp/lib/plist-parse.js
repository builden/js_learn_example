var bplist = require('bplist-parser');
var plist = require('plist');
var fs = require('fs');

/**
 * 待解析的plist文件，解析成JSON对象
 * @param  {String}   file
 * @param  {Function} cb   (err, obj)
 */
var parse = exports.parse = function parse(file, cb) {
  var ctx = fs.readFileSync(file, 'utf8');
  if (ctx.slice(0, 'bplist'.length) === 'bplist') {
    bplist.parseFile(file, function(err, doc) {
      if (err) {
        cb && cb(err);
      } else {
        cb(null, doc[0]);
        fs.writeFileSync(file + '.parsed', build(doc[0]));
      }
    });
  } else {
    var obj = plist.parse(ctx);
    cb && cb(null, obj);
  }
};

/**
 * 根据obj生成plist文件格式的字符串
 * @param  {Object} obj 
 * @return {String}
 */
var build = exports.build = function build(obj) {
  return plist.build(obj);
};