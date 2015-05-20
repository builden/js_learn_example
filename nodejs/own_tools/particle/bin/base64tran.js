#!/usr/bin/env node

var glob = require('glob-all');
var path = require('path');
var ftb = require('../lib/file-tran-base64.js');


console.log(ftb.f2b(__filename));
