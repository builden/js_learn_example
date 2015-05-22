/**
 * 主要用于非ascii码转成\u形式
 * @param  {String} str utf8
 * @return {String}     lick: \u6587\u4ef6\u8bfb\u53d6\u5b8c\u6210
 */
exports.toUnicode = function(str) {
  // except ascii
  return str.replace(/[^\u0000-\u00FF]/g, function($0) {
    return escape($0).replace(/(%u)(\w{4})/gi, "\\u$2")
  });
}

/**
 * 还原成UTF8格式
 * @param  {String} str lick: \u6587\u4ef6\u8bfb\u53d6\u5b8c\u6210\x3d
 * @return {String}     utf8
 */
exports.toUTF8 = function(str) {
  str = str.replace(/(\\u)(\w{4})/gi, function($0, $1, $2) {
    return String.fromCharCode(parseInt($2, 16));
  });

  // \x3d <=> '='
  str = str.replace(/(\\x)(\w{2})/gi, function($0, $1, $2) {
    return String.fromCharCode(parseInt($2, 16));
  });
  return str;
}