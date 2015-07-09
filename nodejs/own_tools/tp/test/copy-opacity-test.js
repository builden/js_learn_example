var co = require('../lib/copy-opacity.js');

// co('add_move.png', 'add_move.png', 'add_move_res.png')
// 

var _ = require('lodash');
var PNGImage = require('pngjs-image');
/*
PNGImage.readImage('add_move.png', function(err, image) {
  if (err) {
    console.log(err);
    return;
  }
  var w = image.getWidth();
  var h = image.getHeight();
  console.log(w + ' ' + h);
  var dest = PNGImage.createImage(w, h);
  for (var i = 0; i < w * h; i++) {
    var red = image.getRed(i);
    var green = image.getGreen(i);
    var blue = image.getBlue(i);
    var alpha = image.getAlpha(i);

    var ratio = 0;
    ratio = _.max([red, green, blue]);
    if (ratio !== 0) {
      // red = red / ratio;
      // green = green / ratio;
      // blue = blue / ratio;
      alpha = ratio;
    } else {
      alpha = 0;
    }
    dest.setAtIndex(i, { red:red, green:green, blue:blue, alpha:alpha })
  }

  dest.writeImage('add_move_ss.png', function(err) {
    if (err) {
      console.log(err);
    }
  });
});*/

// (0, 0) - 左上角
PNGImage.readImage('bg.png', function(err, bg) {
  PNGImage.readImage('add_move.png', function(err, image) {
    if (err) {
      console.log(err);
      return;
    }
    var w = bg.getWidth();
    var h = bg.getHeight();
    var dest = PNGImage.createImage(w, h);
    for (var k = 0; k < w * h; k++) {
      dest.setAtIndex(k, bg.getAtIndex(k));
    }

    var offX = 100;
    var offY = 100;
    var iW = image.getWidth();
    var iH = image.getHeight();
    for (var i = 0; i < iW; i++) {
      for (var j = 0; j < iH; j++) {
        var idx = j * iW + i;
        var red = image.getRed(idx);
        var green = image.getGreen(idx);
        var blue = image.getBlue(idx);
        

        var dIdx = (j + offY) * w + i + offX;
        var dRed = bg.getRed(dIdx);
        var dGreen = bg.getGreen(dIdx);
        var dBlue = bg.getBlue(dIdx);

        dRed = Math.min(255, red + dRed);
        dGreen = Math.min(255, green + dGreen);
        dBlue = Math.min(255, blue + dBlue);

        dest.setAt(i + offX, j + offY, {
          red: dRed,
          green: dGreen,
          blue: dBlue,
          alpha: 255
        });
      }
    }

    dest.writeImage('add_move_ss.png', function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
});