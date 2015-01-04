/*
 * @Author: Bill
 * @Date:   2014-10-14 14:14:56
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-04 18:54:46
 *
 * http://mongoosejs.com/
 */


var mongoose = require('mongoose');
var db = mongoose.connection;
var async = require('async');
var _ = require('lodash');
var moment = require('moment');

function main() {
    var testModel = initModel();
    // testModel.remove().exec(function(err, result) {
    //     initInsert(testModel);
    // });
    // createTest(testModel);
    findTest(testModel);
    // removeTest(testModel);
    // updateTest(testModel);
    // incrementVersion(testModel);

    // 统计数量
    // count(condition, function(err, count) {})
}

function initModel() {
    mongoose.set('debug', true);

    // connect mongodb
    // mongodb://user:pass@localhost/...
    var dbHost = 'mongodb://localhost/forTest';
    mongoose.connect(dbHost);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(callback) {
        console.log('one connect opened');
    });

    // Define Schema
    var testSchema = mongoose.Schema({
        id: {
            type: Number,
            unique: true
        },
        name: String,
        createTime: {
            type: Date,
            default: Date.now
        }
    });

    // Define Model
    var testModel = mongoose.model('ForTest', testSchema);
    return testModel;
}

function initInsert(testModel) {
    for (var i = 0; i < 10; i++) {
        var one = new testModel({
            id: i,
            name: 'name' + i
        });
        one.save(function(err, doc) {
            if (err) {
                console.error('save err: ' + err);
            }
        });
    }
}

function createTest(testModel) {
    // 插入
    var insertOne = new testModel({
        id: _.random(10),
        name: 'name' + _.random(1, 10)
    });

    insertOne.save(function(err, doc) {
        if (err) {
            console.error('save error: ' + err);
        } else {
            console.log('=========== insert one ==========');
            console.log(doc);
        }
    });
}

function findTest(testModel) {
    // find([criteria], [callback])
    // 查找所有，限制取前3个
    // .skip(3)，跳过前3个，取剩下的
    // sort({name: 1, id: -1}); // 1是升序，-1是降序 <==> sort('name -id')
    testModel.find().limit(3).sort('-id').exec(function(err, infos) {
        if (err) {
            console.error('find error: ' + err);
        } else {
            console.log('======== find all =========');
            console.log(infos);
        }
    });

    // 根据条件查找，根据正则表达式查找String字段
    /*    testModel.find({
            name: /[0-1]$/
        }, function(err, infos) {
            if (err) {
                console.error('find error: ' + err);
            } else {
                console.log('========= find with condition =======');
                console.log(infos);
            }
        });*/

    // 查找第一个满足条件的document
    /*    testModel.findOne({
            name: /[0-1]$/
        }, function(err, info) {
            if (err) {
                console.error('find error: ' + err);
            } else {
                console.log('========= find one with condition =======');
                console.log(info);
            }
        });*/

    // 根据objecId查找指定document
    /*    testModel.findById('54a8de555854848416ed7d0c', function(err, info) {
            if (err) {
                console.error('find error: ' + err);
            } else {
                console.log('========= findById =======');
                console.log(info);
            }
        });*/

    // 根据条件查找
    // <==> testModel.where('id').gte(0).lte(4).find(callback);
    // <==> testModel.find().gte('id', 0).lte('id', 4).exec(callback);
    // gte -- 大于等于
    // lte -- 小于等于
    // gt  -- 大于
    // lt  -- 小于
    // ne  -- 不等于
    // in  -- 单一键，在数组内的值 find({id: {$in: [1, 3, 5]}});
    // nin -- 单一键，不在数组内的值
    // or  -- 多个键，只需要一个键满足 find({$or: [{id: 3}, {name: '123'}]});
    // mod -- 取模 find({id: {$mod: [5, 1]}}); // 模5余1
    // not -- 取反 find({id: {$not: {$mod: [5, 1]}}});
    // testModel.where('id').gt(1).lte(4).find(function(err, infos) {
    testModel.find({
        id: {
            $gte: 1,
            $lte: 4
        }
    }, function(err, infos) {
        if (err) {
            console.error('find error: ' + err);
        } else {
            console.log('========= find with where =======');
            console.log(infos);
        }
    });
}

function removeTest(testModel) {
    // remove([criteria], [callback])
    testModel.remove({
        id: {
            $gte: 1,
            $lte: 4
        }
    }, function(err, num) {
        if (err) {
            console.error('remove error: ' + err);
        } else {
            console.log('========= remove with where =======');
            console.log('removed ' + num);
        }
    });

    // 删除单个
    // Model.findOneAndRemove(conditions, [options], [callback])
}

function updateTest(testModel) {
    // 方式1 - 先查找，后修改
    /*    async.waterfall([function(cb) {
            testModel.findOne({
                id: 3
            }).exec(cb);
        }, function(doc, cb) {
            if (doc) {
                doc.name = '321';
                doc.save(cb);
            } else {
                cb('have not find doc');
            }
        }], function(err, doc) {
            if (err) {
                console.error('1.1 update err: ' + err);
            } else {
                console.log('====== update result =====');
                console.log(doc);
            }
        });*/

    // 方式二，直接调用update方法
    // Model.update(conditions, update, [options], [callback])
    testModel.update({
        id: 4
    }, {
        name: '4567'
    }).exec(function(err, doc) {
        if (err) {
            console.error('1.2 update err: ' + err);
        } else {
            console.log('====== update result =====');
            console.log(doc);
        }
    });

    // 方式三
    // Model.findOneAndUpdate([conditions], [update], [options], [callback])
}

function incrementVersion(testModel) {
    // 修改__v字段
    testModel.findOne({
        id: 1
    }).exec(function(err, doc) {
        doc.increment();
        doc.save(function(err, doc) {

        })
    });
}

main();