var plist = require('./lib/plist-parse.js');
var fs = require('fs');

var file = './test/res/ui_ingameplay.plist';
var nFile = './test/res/effects.plist';

plist.parse(file, function(err, obj) {
  fs.writeFileSync(file + '.parsed', plist.build(obj));
});

