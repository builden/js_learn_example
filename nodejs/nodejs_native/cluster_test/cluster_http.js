/**
 * @Author: Bill
 * @Date:   2014-12-19 16:36:23
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 21:28:46
 */

'use strict';

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var rssWarn = 12 * 1024 * 1024,
    heapWarn = 12 * 1024 * 1024;

var workers = {};
if (cluster.isMaster) {
    console.log("master start...");

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        createWorker();
    }

    cluster.on('listening', function(worker, address) {
        console.log('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ":" + address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker %d died (%s). restarting...',
            worker.process.pid, signal || code);
        createWorker();
    });

    setInterval(function() {
        var time = new Date().getTime()
        for (pid in workers) {
            if (workers.hasOwnProperty(pid) &&
                workers[pid].lastCb + 5000 < time) {
                console.log(' Long running worker ' + pid + ' killed');
                workers[pid].worker.kill();
                delete workers[pid];
                createWorker();
            }
        }
    }, 1000)
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(0);

    setInterval(function report() {
        process.send({
            cmd: 'reportMem',
            memory: process.memoryUsage(),
            process: process.pid
        }, 1000);
    })
}

function createWorker() {
    var worker = cluster.fork();
    console.log('Created worker: ' + worker.pid);
    // 允许开机时间
    workers[worker.pid] = {
        worker: worker,
        lastCb: new Date().getTime() - 1000
    };
    worker.on('message', function(m) {
        if (m.cmd === "reportMem") {
            workers[m.process].lastCb = new Date().getTime();
            if (m.memory.rss > rssWarn) {
                console.log('Worker ' + m.process + ' using too much memory.');
            }
        }
    });
}