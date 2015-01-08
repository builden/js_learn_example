/**
 * @Author: Bill
 * @Date:   2015-01-06 10:00:46
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-06 14:01:13
 */

'use strict';
var redis = require('redis');
var async = require('async');
var util = require('util');
var client = null;
var RANK_KEY = 'gameRank';

process.on('uncaughtException', function(e) {
    console.error('rankChild Caught exception: ' + e.stack);
});

function init(host, port, auth, dbKey, selectId) {
    client = redis.createClient(port || 6379, host || 'localhost');
    if (auth) client.auth(auth);
    if (dbKey) RANK_KEY = dbKey;
    if (selectId) client.select(selectId);
    
    client.on('error', function(err) {
        console.error('redis error: ' + err);
    });
}
exports.init = init;

function insertScore(id, score, cb) {
    console.log('insertScore ' + id + ' ' + score);
    var rank = 0;
    async.waterfall([
        function(callback) {
            client.zscore(RANK_KEY, id, callback);
        },
        function(oldScore, callback) {
            if (score > oldScore) {
                client.zadd(RANK_KEY, score, id, function(err, reply) {
                    callback(null, score);
                });
            } else {
                callback(null, oldScore);
            }
        },
        function(realScore, callback) {
            client.zrevrank(RANK_KEY, id, function(err, reply) {
                rank = reply;
                callback(null, realScore);
            });
        }
    ], function(err, result) {
        cb(null, {
            rank: rank,
            realScore: result
        });
    });
}
exports.insertScore = insertScore;

function removeAll() {
    client.zremrangebyrank(RANK_KEY, 0, -1);
}
exports.removeAll = removeAll;

// rank 从0开始
function getRankAndScoreById(id, cb) {
    async.parallel([
        function(callback) {
            client.zrevrank(RANK_KEY, id, callback);
        },
        function(callback) {
            client.zscore(RANK_KEY, id, callback);
        }
    ], function(err, results) {
        cb(err, {rank: results[0], score: results[1]});
    });
}
exports.getRankAndScoreById = getRankAndScoreById;

function getTopRanks(len, cb) {
    client.zrevrange(RANK_KEY, 0, len, 'WITHSCORES', cb);
}
exports.getTopRanks = getTopRanks;

process.on('message', function(m) {
    switch (m.cmd) {
        case 'init':
            init(m.host, m.port, m.auth);
            break;
        case 'insert':
            insertScore(m.id, m.score, function(err, result) {
                sendToParent({
                    cmd: m.cmd,
                    id: m.id,
                    score: m.score,
                    rank: result.rank,
                    realScore: result.realScore
                });
            });
            break;
        case 'removeAll':
            removeAll();
            break;
        case 'getRankAndScore':
            getRankAndScoreById(m.id, function(err, result) {
                sendToParent({
                    cmd: m.cmd,
                    id: m.id,
                    rank: result.rank,
                    score: result.score
                });
            });
            break;
        case 'getTopRanks':
            getTopRanks(m.len, function(err, result) {
                console.log(result);
            });
            break;
    }
});

function sendToParent(msg) {
    console.log('sendToParent ' + util.inspect(msg));
    process.send(msg);
}