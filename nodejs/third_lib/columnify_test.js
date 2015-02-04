/* 
 * @Author: Bill
 * @Date:   2015-02-04 12:07:01
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-02-04 15:45:47
 *
 * https://github.com/timoxley/columnify
 */

'use strict';

var columnify = require('columnify');

function main() {
    // simpleTest();
    // arrOfObjectsTest();
    maximumAndMinimumTest();
    // newLineTest();
}

function simpleTest() {
    var data = {
        'key1': 1,
        'key2': 2,
        'key3': 3
    };

    console.log(columnify(data));
    //=>KEY  VALUE
    //=>key1 1
    //=>key2 2
    //=>key3 3

    console.log(columnify(data, {
        columns: ['MODULE', 'COUNT']
    }));
    //=>MODULE COUNT
    //=>key1   1
    //=>key2   2
    //=>key3   3
}

function arrOfObjectsTest() {
    var columns = columnify([{
        name: 'mod1',
        version: '0.0.1'
    }, {
        name: 'module2',
        version: '0.2.0'
    }])

    console.log(columns);
    //=>NAME    VERSION
    //=>mod1    0.0.1
    //=>module2 0.2.0


    var data = [{
        name: 'module1',
        description: 'some description',
        version: '0.0.1',
    }, {
        name: 'module2',
        description: 'another description',
        version: '0.2.0',
    }];

    // filtering and Ordering
    var columns2 = columnify(data, {
        columns: ['version', 'name']
    });

    console.log(columns2);
    //=>VERSION NAME
    //=>0.0.1   module1
    //=>0.2.0   module2
}

function maximumAndMinimumTest() {
    var columns = columnify([{
        name: 'mod1',
        description: 'some description which happens to be far larger than the max',
        version: '0.0.1',
    }, {
        name: 'module-two',
        description: 'another description larger than the max',
        version: '0.2.0',
    }], {
        minWidth: 20,
        // columnSplitter: ' | ', // 自定义列分隔符
        // truncate: true, // 一行显示不全则使用...结尾
        config: {
            description: {
                maxWidth: 30
            },
            // version: {align: 'right'} // 右对其
        }
    });

    console.log(columns);
    //=>NAME                 DESCRIPTION                    VERSION
    //=>mod1                 some description which happens 0.0.1
    //=>                     to be far larger than the max
    //=>module-two           another description larger     0.2.0
    //=>                     than the max
}

function newLineTest() {
    var data = [{
        name: "glob@3.2.9",
        paths: [
            "node_modules/tap/node_modules/glob",
            "node_modules/tape/node_modules/glob"
        ].join('\n')
    }, {
        name: "nopt@2.2.1",
        paths: [
            "node_modules/tap/node_modules/nopt"
        ]
    }, {
        name: "runforcover@0.0.2",
        paths: "node_modules/tap/node_modules/runforcover"
    }];

    console.log(columnify(data, {
        preserveNewLines: true
    }));
    //=>NAME              PATHS
    //=>glob@3.2.9        node_modules/tap/node_modules/glob
    //=>                  node_modules/tape/node_modules/glob
    //=>nopt@2.2.1        node_modules/tap/node_modules/nopt
    //=>runforcover@0.0.2 node_modules/tap/node_modules/runforcover
}
main();