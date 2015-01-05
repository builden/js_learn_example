/**
 * @Author: Bill
 * @Date:   2015-01-05 11:02:08
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-05 17:27:37
 *
 * redis支持的数据类型
 * string           set / get, incr / decr, mset / mget(同时设置或获取多个键值)
 *                  mset key value [key value ...] / mget key [key ...]
 *                  setbit / getbit(位操作，一个字节有八位)
 * hash（散列）     键key 字段field 字段值value
 *                  hset key field value / hget key filed
 *                  hmset key field value [field value ...] / hmget key field [field ...]
 *                  hgetall key
 * list（列表）     双向数据链表（访问两端的数据快，访问中间的数据慢）
 *                  lpush / rpush(从左/右增加原元素) lpush key value
 *                  lpop / rpop（从两端弹出并删除）
 *                  llen key 返回元素个数
 *                  lrange key star stop 获取列表片段
 *                  lrem key count value 删除count个值为value的元素
 *                  lindex key index 获取索引处的元素
 *                  lset key index value 修改索引处的元素
 *                  ltrim key start stop 只保留列表指定片段
 *                  linsert key before|after pivot value, 查找值为pivot的元素，把新值插入到该元素的前面或后面
 * set （集合）     集合中的每个元素都是唯一的，且没有顺序
 *                  sadd key member [member ...] 增加元素
 *                  sdel key member [member ...] 删除元素
 *                  smembers key 获取所有元素
 *                  sismember key member 判断元素是否存在
 *                  sdiff key [key ...] 集合间差集运算
 *                  sinter key [key ...] 集合间交集运算
 *                  sunion key [key ...] 集合间并集运算
 *                  scard key 获取集合中的元素个数
 *                  srandommember key 随机获取元素
 * zset（有序集合） 通过散列表和跳跃表实现，可以快速的访问所有数据（相对于list，更耗内存）
 *                  元素从小到大排序
 *                  zadd key score member [score member] 增加/修改元素
 *                  zrem key member [member ...] 删除元素
 *                  zscore key member 获取某个元素的score
 *                  zrange key start stop [withscores] 获取某个区间的元素，从左到右
 *                  zrevrange key start stop [withscores] 从右到左
 *                  zrangebyscore key min max [withscores] [limit offset count] 获取某个分数区间的元素
 *                  zincreby key increment member 增加某个元素的分数
 *                  zcard key 获取集合中的元素个数
 *                  zcount key min max 获得指定分数范围内的元素个数
 *                  zremrangebyrank key start stop 删除在排名范围内的元素
 *                  zremrangebyscore key min max 删除分数范围内的元素
 *                  zrank key member 获取元素的排名
 */

'use strict';

var redis = require('redis'),
    client = redis.createClient(); // 默认使用：redis.createClient(6379, '127.0.0.1')
// 选择数据库表，默认使用0
client.select(1, function() {});

function main() {
    initRedis();
    // stringTest();
    // hashTest();
    // listTest();
    // setTest();
    // zsetTest();
    multiTest();
    expireTest();


    client.quit();
}

function initRedis() {
    // redis.debug_mode = true;

    // 验证密码
    client.auth('Ltc2014');

    client.on("connect", function() {
        console.log('redis connected');
    });

    client.on('error', function(err) {
        console.error('Error: ' + err);
    });

    client.on('end', function() {
        console.log('redis connection closed');
    });
}

function hashTest() {
    // client.hmset(hash, obj, [callback])
    // client.hmset(hash, key1, val1, ... keyn, valn, [callback])
    client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234", redis.print);
    client.hgetall("hosts", function(err, obj) {
        console.dir(obj);
        //=> { mjr: '1', another: '23', home: '1234' }
    });

    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);

    // 只获取fields hkeys(key)
    client.hkeys("hash key", function(err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function(reply, i) {
            console.log("    " + i + ": " + reply);
        });
    });
    // 只获取keys hvals(key)
    // 获取字段数量 hlen(key)

    // 判读字段是否存在 hexists(key, field);
    // 当字段不存在时赋值 hsetnx(key, filed, value);
    // 递增 hincrby(key, field)
    // 删除字段 hdel(key, field [, field...])
}

function stringTest() {
    // 递增
    client.incr('bar', redis.print);
    client.get('bar', function(err, reply) {
        console.log(reply);
    });

    // 判断是否存在
    client.exists('bar', function(err, reply) {
        console.log('is exist ' + reply);
    });

    client.type('foo', redis.print);

    client.set("string key", "string val", redis.print);
    client.get("string key", function(err, reply) {
        if (err) console.error(err);
        // reply is null when the key is missing
        console.log(reply);
        //=> string val
    });

    // 删除键(可以一次删除多个)
    // client.del('bar', 'foo', redis.print);
}

function listTest() {

}

function multiTest() {
    // 多条语句原子操作
    // 还可以关注一下watch命令
    client.multi()
        .scard("bigset")
        .smembers("bigset")
        .keys("*", function(err, replies) {
            // NOTE: code in this callback is NOT atomic
            // this only happens after the the .exec call finishes.
            client.mget(replies, redis.print);
        })
        .dbsize()
        .exec(function(err, replies) {
            console.log("MULTI got " + replies.length + " replies");
            replies.forEach(function(reply, index) {
                console.log("Reply " + index + ": " + reply.toString());
            });
        });
}

function expireTest() {
    // expire key seconds 设置某个键的过期时间，到点后自动清除
}

main();