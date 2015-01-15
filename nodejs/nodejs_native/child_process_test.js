var child = require('child_process');
var spawn = child.spawn;// 调用子进程
var exec = child.exec;  // 直接执行系统命令

var iconv= require('iconv-lite');

//*
var cmd = exec('netstat -an', function(err, stdout, stderr) {
    var str = iconv.decode(stdout, 'GBK');
    console.log('child log:\n' + str);
});
//*/

/*
var cmd = exec('dir', {encoding: 'binary'});

cmd.stdout.on('data', function(data) {
    var str = iconv.decode(data, 'GBK');
    console.log('child log:\n' + str);
});

cmd.stderr.on('data', function(data) {
    console.log('child err:\n' + data);
});
//*/

cmd.on('exit', function(code, signal) {
    console.log('child exit, code: ' + code);
});