/* 
 * @Author: Bill
 * @Date:   2015-02-04 16:09:44
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-02-04 18:31:29
 */

'use strict';

var assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            // 返回某个指定的元素在数组中首次出现的位置
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});

/*
describe (moduleName, testDetails)
由上述代码可看出，describe是可以嵌套的，比如上述代码嵌套的两个describe就可以理解成测试人员希望测试Array模块下的#indexOf() 子模块。module_name 是可以随便取的，关键是要让人读明白就好。
it (info, function)
具体的测试语句会放在it的回调函数里，一般来说info字符串会写期望的正确输出的简要一句话文字说明。当该it block内的test failed的时候控制台就会把详细信息打印出来。一般是从最外层的describe的module_name开始输出（可以理解成沿着路径或者递归链或者回调链），最后输出info，表示该期望的info内容没有被满足。一个it对应一个实际的test case
assert.equal (exp1, exp2)
断言判断exp1结果是否等于exp2, 这里采取的等于判断是== 而并非 === 。即 assert.equal(1, ‘1’) 认为是True。
 */

describe('Async', function() {
    describe('#setTimeout', function() {
        // 如果是异步函数，则需要在it中回调done函数
        it('should return after 100ms', function(done) {
            setTimeout(function() {
                console.log('setTimeout returned here');
                done();
            }, 100);
        });
    });
});

describe('Before And After', function() {
    describe('#Module1', function() {
        before(function() {
            console.log('before 1');
        });

        // 每个测试用例之前都会执行一次
        beforeEach(function(done) {
            setTimeout(function() {
                console.log('beforeEach 2');
                done();
            }, 100)
        });

        it('before test 1', function() {
            console.log('do test case 3');
        });

        it('before test 2', function() {
            console.log('do test case 4');
        });

        // 所有测试用例都执行完之后再调用
        after(function() {
            console.log('after 5');
        });

        // 每个测试用例执行完之后都会调用一次
        afterEach(function(done) {
            setTimeout(function() {
                console.log('afterEach 6');
                done();
            }, 100)
        });
    })
})