var png = require('pngjs-image');

var w = 100;
var h = 100;
var img = png.createImage(w, h);
console.log(img.getWidth() + ' ' + img.getHeight());
for (var y = 0; y < w; y++) {
  for (var x = 0; x < h; x++) {
    //img.setAt(x, y, 0x000000FF);  // ABGR A-0透明，FF不透明
    img.setAt(x, y, {
      red: 0xFF,
      green: 0,
      blue: 0,
      alpha: 0xFF
    });
  }
}
img.writeImage('test.png', function(err) {
  console.log('img write complete');
});