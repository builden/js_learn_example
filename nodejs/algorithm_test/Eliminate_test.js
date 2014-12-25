/**
 * @Author: Bill
 * @Date:   2014-12-25 16:54:19
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-25 19:30:33
 */

'use strict';

// var _ = require('lodash');

var matrix = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 3, 3, 3],
    [1, 1, 1, 1, 1, 2, 0, 0],
    [0, 1, 0, 1, 0, 2, 0, 0],
    [0, 0, 0, 1, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

function main() {
    var row = 8;
    var col = 8;
    for (var r = 0; r < row; ++r) {
        for (var c = 0; c < col; ++c) {
            var val = matrix[r][c];
            if (val > 0) {
                var maxLen = 0;
                var rc = [[r, c]];
                matrix[r][c] = -1 * val;

                for (var i = 0; i < rc.length; ++i) {
                    var r0 = rc[i][0];
                    var c0 = rc[i][1];

                    // 左
                    var r1 = r0;
                    while (r1 - 1 >= 0 && (Math.abs(matrix[r1 - 1][c0]) == val)) {
                        r1 -= 1;
                    }

                    //右
                    var r2 = r0;
                    while (r2 + 1 < row && (Math.abs(matrix[r2 + 1][c0]) == val)) {
                        r2 += 1;
                    }

                    if (r2 - r1 >= 2) {
                        maxLen = Math.max(maxLen, r2 - r1 + 1);
                        for (var r3 = r1; r3 <= r2; ++r3) {
                            if (matrix[r3][c0] == val) {
                                rc.push([r3, c0]);
                                matrix[r3][c0] = -1 * val;
                            }
                        }
                    }


                    // 下
                    var c1 = c0;
                    while (c1 - 1 >= 0 && (Math.abs(matrix[r0][c1 - 1]) == val)) {
                        c1 -= 1;
                    }

                    // 上
                    var c2 = c0;
                    while (c2 + 1 < row && (Math.abs(matrix[r0][c2 + 1]) == val)) {
                        c2 += 1;
                    }

                    if (c2 - c1 >= 2) {
                        maxLen = Math.max(maxLen, c2 - c1 + 1);
                        for (var c3 = c1; c3 <= c2; ++c3) {
                            if (matrix[r0][c3] == val) {
                                rc.push([r0, c3]);
                                matrix[r0][c3] = -1 * val;
                            }
                        }
                    }
                }

                if (rc.length >= 3) {
                    console.log('==================');
                    console.log(JSON.stringify(rc));
                    console.log('maxLen ' + maxLen);
                }
            }
        }
    }

    console.log(JSON.stringify(matrix));
}

main();