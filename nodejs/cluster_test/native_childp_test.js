/**
 * @Author: Bill
 * @Date:   2015-01-06 10:00:36
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-06 13:52:26
 */

'use strict';

var util = require('util');
var readline = require('readline');
var fork = require('child_process').fork;
var rankWorker = fork('./rank_child.js');

process.on('uncaughtException', function(e) {
    console.error('parent Caught exception: ' + e.stack);
});

rankWorker.on('message', function(m) {
    switch (m.cmd) {
        case 'insert':
        break;
        case 'getRank':
        break;
        case 'getTopRanks':
        break;
    }
    console.log('get message ' + util.inspect(m));
});

(function initRankWorker(host, port, auth) {
    rankWorker.send({
        cmd: 'init',
        host: host,
        port: port,
        auth: auth
    })
})(null, null, 'Ltc2014');

function insertScore(id, score) {
    rankWorker.send({
        cmd: 'insert',
        id: id,
        score: score
    });
}

function removeAllRank() {
    rankWorker.send({
        cmd: 'removeAll'
    });
}

function getRankAndScoreById(id) {
    rankWorker.send({
        cmd: 'getRankAndScore',
        id: id
    });
}

function getTopRanks(len) {
    rankWorker.send({
        cmd: 'getTopRanks',
        len: len
    });
}

insertScore('test1', 120);
insertScore('test2', 123);
insertScore('test3', 11);
insertScore('test1', 10);
getRankAndScoreById('test1');
getTopRanks(5);