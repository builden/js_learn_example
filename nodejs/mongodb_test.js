var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');

var dbHost = 'mongdodb://localhost/forTest';
var testSchema = {
    id: {type: Number, unique: true},
    createTime: {type: Date, default: Date.now}
}

function main() {
    var testModel = mongoose.model('ForTest', testSchema);

    // insert
    var info = {
        id: _.random(10)
    };

    testModel.Create(info, function(err, doc) {
        if (err) {
            console.log('insert error ' + err);
        } else {
            console.log('insert rst ' + doc);
        }
    })
}

main();

/*
mongoose.connect('mongodb://203.195.202.83/gameserver-dev', {db: {safe:true}});

var GameSchema = new mongoose.Schema({
    openid: { type: String, unique: true },
    nick: String,
    coin: {type: Number, default: 0},
    // strength 体力
    stren: {type: Number, default: 0},

    // 当天第一次登录
    dayFirstLogin: {type: Boolean, default: false},
    // 头像url, 玩吧 50 x 50
    faceurl: String,
    // 道具
    props: String,
    // 周最高分数
    weekScore: {type: Number, default: 0},
    // 历史最高分数
    highscore: {type: Number, default: 0},
    // 上一次登录时间
    lastLoginTime: Date,
    // 上一次体力不为满值的时间，如果已经是满值，则为0
    lastNoFullStrenTime: Date
});

var Game = mongoose.model('Game', GameSchema);

var promise = Game.find({openid: {$in: ['49FC0B6F4AAB196C3ED50E6E28D4A61F']}}).exec();
promise.then(
    function(doc) {
        console.log(doc);
    },
    function(err) {
        console.log(err);
    }
)*/