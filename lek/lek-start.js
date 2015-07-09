/// <reference path="typings/node/node.d.ts"/>
var async = require('async');
var iconv = require('iconv-lite');
var spawn = require('child_process').spawn;
var colors = require('colors');

var cmds = {
  'logstash.bat': {
    tip: 'logsta',
    args: ['-f', 'logstash.conf'],
    cwd: 'logstash-1.5.1/bin'
  },
  'elasticsearch.bat': {
    tip: 'elasti',
    cwd: 'elasticsearch-1.6.0/bin'
  },
  'kibana.bat': {
    tip: 'kibana',
    cwd: 'kibana-4.1.0-windows/bin'
  }
}

async.forEachOf(cmds, function (opts, cmd, cb) {
  var ls = spawn(cmd, opts.args || [], {cwd: opts.cwd});
  ls.stdout.on('data', function (data) {
    console.log('[' + opts.tip.green + '] ' + iconv.decode(data, 'gbk'));
  });

  ls.stderr.on('data', function (data) {
    console.log('[' + opts.tip.green + '] ' + iconv.decode(data, 'gbk').red);
  });

  ls.on('exit', function () {
    console.log('[' + opts.tip.green + '] ' + 'exit');
  });
}, function (err, results) {

});