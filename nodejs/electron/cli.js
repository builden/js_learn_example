#!/usr/bin/env node

var exec = require('child_process').exec;
var cmd = '/Applications/Electron.app/Contents/MacOS/Electron';

exec(cmd + ' ' + process.cwd(), function(err, stdout, stderr) {
  if (err) {
    console.log(stderr);
  } else {
    console.log(stdout);
  }
});
