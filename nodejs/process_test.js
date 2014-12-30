/**
 * @Author: Bill
 * @Date:   2014-12-30 11:15:17
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 21:00:22
 */

'use strict';
console.log('================== process begin =====================');

process.on('uncaughtException', function(e) {
    console.log('Caught exception: ' + e);
});

function main(argv) {
    // console.log(argv);
    // node.exe的路径
    console.log(process.execPath);

    // cwd获取当前工作目录
    // chdir 改变当前目录
    console.log(process.cwd());

    // process.env获取系统环境变量，放在一个对象中
    // console.log(process.env);
    console.log(process.env.ANT_ROOT);

    // 获取组ID，windows下无效
    // console.log(process.getgid());
    
    // 获取用户ID，同样在windows下无效
    // console.log(process.getuid());
    
    // 获取当前进程的pid
    console.log(process.pid);

    // 获取系统平台win32, linux, darwin
    console.log(process.platform);

    // 获取内存占用情况
    // heapTotal，heapUsed表示V8占用的内存
    console.log(process.memoryUsage());
    //=> { rss: 10915840, heapTotal: 4083456, heapUsed: 2208304 }
    
    throw 'error';
}

// 命令行参数
main(process.argv);