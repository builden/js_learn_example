var plist = require('./lib/plist-parse.js');
var fs = require('fs');
var glob = require('glob-all');
var parseString = require('xml2js').parseString;

var file = './test/res/ui_ingameplay.plist';
var nFile = './test/res/effects.plist';
var xmlFile = './test/res/age-cp2m-0.xml';

// plist.parse(file, function(err, obj) {
//   // fs.writeFileSync(file + '.parsed', plist.build(obj));
//   console.log(obj);
// });

var ctx = fs.readFileSync(xmlFile, 'utf8');
parseString(ctx, function(err, obj) {
  console.log(JSON.stringify(obj, null, 2));
  console.log(obj.TextureAtlas.$.imagePath);
});