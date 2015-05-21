#!/usr/bin/env node

var glob = require('glob-all');
var path = require('path');
var co = require('../lib/copy-opacity.js');
var s = require('underscore.string');
var fs = require('fs');

function main() {
  greyscaleType();
  aType();
}

function greyscaleType() {
  var tailGrey = '_greyscale'
  var files = glob.sync(path.join(process.cwd(), '**/*' + tailGrey + '.png'));
  files.forEach(function(file) {
    var f = path.parse(file);
    var rgbFilePre = path.join(f.dir, s.strLeft(f.name, tailGrey));
    var rgbFile = rgbFilePre + '.png';
    if (!fs.existsSync(rgbFile)) {
      rgbFile = rgbFilePre + '.tga';
      if (!fs.existsSync(rgbFile)) {
        rgbFile = rgbFilePre + '.jpg';
      }
    };
    var outFile = rgbFilePre + '.comp.png';
    co(file, rgbFile, outFile);
  });
}

function aType() {
  var tailGrey = '_a';
  var files = glob.sync(path.join(process.cwd(), '**/*' + tailGrey + '.png'));
  files.forEach(function(file) {
    var f = path.parse(file);
    var rgbFilePre = path.join(f.dir, s.strLeft(f.name, tailGrey));
    var rgbFile = rgbFilePre + '_rgb.png';
    if (!fs.existsSync(rgbFile)) {
      rgbFile = rgbFilePre + '_rgb.tga';
      if (!fs.existsSync(rgbFile)) {
        rgbFile = rgbFilePre + '_rgb.jpg';
      }
    };
    var outFile = rgbFilePre + '.png';
    co(file, rgbFile, outFile);
  });
}

main();