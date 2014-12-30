/**
 * @Author: Bill
 * @Date:   2014-12-25 16:54:19
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-29 21:16:35
 */

'use strict';

var _ = require('lodash');
var assert = require('assert');


var arr = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 8, 7, 6, 5, 4, 3],
    [2, 1, 0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 0, 9],
    [8, 7, 6, 5, 4, 3, 2, 1],
    [0, 1, 3, 5, 7, 9, 8, 6],
    [4, 2, 0, 1, 2, 3, 4, 5]
]

function main() {
    getContinuousUnitsTest();
    // getAroundCoords(2);
    // transToMatrixArrayTest();
}

function transToMatrixArrayTest() {
    var matrix = transToMatrixArray(arr);
    console.log(matrix);
    assert.equal(4, matrix[0][0], 'left bottom');
    assert.equal(0, matrix[0][7], 'left top');
    assert.equal(7, matrix[7][7], 'right top');
    assert.equal(5, matrix[7][0], 'right bottom');
}

/**
 * 把普通二维数组转变成左下角坐标为[0, 0]的数组
 * @param  {Array} arr 原二维数组
 * @return {Array} 目标二维数组
 *
 * x 从左至右，y从下至上，访问方式为matrix[x][y]
 */
function transToMatrixArray(arr) {
    var rst = [],
        rowLen = arr.length,
        colLen = arr[0].length;

    for (var x = 0; x < colLen; x++) {
        rst.push([]);
        for (var y = 0; y < rowLen; y++) {
            rst[x].push(arr[rowLen - 1 - y][x]);
        }
    }
    return rst;
}

/**
 * 根据深度获取围绕方块的坐标
 * @param  {Number} depth 深度
 * @return {Array}        坐标数组
 *
 * 从左顶点开始，向右遍历，如depth===1
 *  [ [ -1, 1 ],
      [ 0, 1 ],
      [ 1, 1 ],
      [ 1, 0 ],
      [ 1, 1 ],
      [ 0, 1 ],
      [ -1, 1 ],
      [ 1, 0 ] ]
 */
function getAroundCoords(depth) {
    var opposite = -1 * depth;
    var arr = [];
    // 上（从左到右）
    for (var i = opposite; i <= depth; i++) {
        arr.push([i, depth]);
    }

    // 右（从上到下）
    for (var j = depth - 1; j >= opposite + 1; j--) {
        arr.push([depth, j]);
    }

    // 下（从右到左）
    for (var i = depth; i >= opposite; i--) {
        arr.push([i, opposite]);
    }

    // 左（从下到上）
    for (var j = opposite + 1; j <= depth - 1; j++) {
        arr.push([opposite, j]);
    }
    return arr;
}

var EExMagic = {
    NONE: 0, // 无扩展魔法
    LINE_H: 1, // 行消除, 水平（4个一字型消除）
    LINE_V: 2, // 行消除, 垂直
    LINE_S: 3, // 行消除，正斜
    LINE_B: 4, // 行消除，反斜
    CROSS: 5, // 横竖消除（十字型消除）
    BOMB: 6, // 3*3的爆炸范围（L型或T型消除）
    SAME_COLOR: 7 // 行消除（5个一字型消除）
};

/**
 * 获取相连的方块组
 * @param  {Array} units [description]
 * @return {Array}       eg. [{"item":2,"magic":1,"coord":[0,6],"units":[[0,4],[0,5],[0,6],[0,7]]}]
 */
function getContinuousUnits(units) {
    var rowLen = units.length,
        colLen = units[0].length,
        rstGroups = [];

    function insertGroup(item, magicType, centerCoord, cUnits) {
        rstGroups.push({
            item: item,
            magic: magicType,
            coord: centerCoord,
            units: cUnits
        });
    }

    for (var x = 0; x < colLen; x++) {
        for (var y = 0; y < rowLen; y++) {
            var val = units[x][y];
            if (val > 0) {
                var maxRowLen = 0,
                    maxColLen = 0,
                    haveCross = false, // 是否有交叉，L型，T型
                    haveTenCross = false, // 是否有十字交叉
                    FiveCenterCoord = null, // 5个以上直线相连时，取中间坐标
                    tenCenterCoord = null, // 十字交叉的中心坐标
                    crossCenterCoord = null, // L型获T型的连接点坐标
                    FourCenterCoord = null, // 四个相连时的中心坐标（2 | 3)
                    uGroup = [];
                uGroup.push([x, y]);
                units[x][y] = -1 * val;

                for (var i = 0; i < uGroup.length; i++) {
                    var _x = uGroup[i][0],
                        _y = uGroup[i][1],
                        haveLeft = false, // 左侧是否有相同元素
                        haveRight = false, // 右侧
                        haveUp = false,
                        haveDown = false,
                        haveRow = false, // 同行是否有三个以上元素
                        haveCol = false; // 同列

                    // 左
                    var xl = _x;
                    while (xl - 1 >= 0 && (Math.abs(units[xl - 1][_y]) === val)) {
                        haveLeft = true;
                        xl--;
                    }

                    // 右
                    var xr = _x;
                    while (xr + 1 < colLen && (Math.abs(units[xr + 1][_y]) === val)) {
                        haveRight = true;
                        xr++;
                    }

                    // 左右是否至少有三个相同的方块
                    if (xr - xl >= 2) {
                        haveCol = true;
                        maxColLen = Math.max(maxColLen, xr - xl + 1);
                        var xc = parseInt((xr + xl) / 2);
                        if (maxColLen >= 5) {
                            if ((xr + xl) % 2 === 1) xc = _.random(xc, xc + 1);
                            FiveCenterCoord = [xc, _y];
                        } else if (maxColLen === 4) {
                            xc = _.random(xc, xc + 1);
                            FourCenterCoord = [xc, _y];
                        }
                        for (var j = xl; j <= xr; j++) {
                            if (units[j][_y] === val) {
                                uGroup.push([j, _y]);
                                units[j][_y] = -1 * val;
                            }
                        }
                    }

                    // 下
                    var yd = _y;
                    while (yd - 1 >= 0 && (Math.abs(units[_x][yd - 1]) === val)) {
                        haveDown = true;
                        yd--;
                    }

                    // 上
                    var yu = _y;
                    while (yu + 1 < rowLen && (Math.abs(units[_x][yu + 1]) === val)) {
                        haveUp = true;
                        yu++;
                    }

                    // 上下是否至少有三个相同的方块
                    if (yu - yd >= 2) {
                        haveRow = true;
                        maxRowLen = Math.max(maxRowLen, yu - yd + 1);
                        var yc = parseInt((yu + yd) / 2);
                        if (maxRowLen >= 5) {
                            if ((yu + yd) % 2 === 1) yc = _.random(yc, yc + 1);
                            FiveCenterCoord = [_x, yc];
                        } else if (maxRowLen === 4) {
                            yc = _.random(yc, yc + 1);
                            FourCenterCoord = [_x, yc];
                        }
                        for (var j = yd; j <= yu; j++) {
                            if (units[_x][j] === val) {
                                uGroup.push([_x, j]);
                                units[_x][j] = -1 * val;
                            }
                        }
                    }

                    if (haveUp && haveDown && haveLeft && haveRight) {
                        haveTenCross = true;
                        tenCenterCoord = [_x, _y];
                    } else if (haveRow && haveCol) {
                        haveCross = true;
                        crossCenterCoord = [_x, _y];
                    }
                }

                if (uGroup.length >= 3) {
                    var exMagic = EExMagic.NONE;
                    if (maxRowLen >= 5 || maxColLen >= 5) {
                        insertGroup(val, EExMagic.SAME_COLOR, FiveCenterCoord, uGroup);
                    } else if (haveTenCross) {
                        insertGroup(val, EExMagic.CROSS, tenCenterCoord, uGroup);
                    } else if (haveCross) {
                        insertGroup(val, EExMagic.BOMB, crossCenterCoord, uGroup);
                    } else if (maxRowLen === 4) {
                        insertGroup(val, EExMagic.LINE_H, FourCenterCoord, uGroup);
                    } else if (maxColLen === 4) {
                        insertGroup(val, EExMagic.LINE_V, FourCenterCoord, uGroup);
                    } else {
                        insertGroup(val, EExMagic.NONE, null, uGroup);
                    }
                }
            }
        }
    }

    return rstGroups;
}

function getContinuousUnitsTest() {
    var arr = [
        [2, 0, 1, 0, 4, 4, 4, 0],
        [2, 0, 1, 1, 0, 0, 3, 0],
        [2, 1, 0, 0, 0, 3, 3, 3],
        [2, 1, 1, 2, 1, 1, 3, 0],
        [0, 1, 0, 1, 0, 2, 0, 0],
        [0, 1, 0, 1, 0, 2, 0, 0],
        [0, 1, 0, 0, 2, 2, 2, 2],
        [0, 1, 6, 6, 6, 6, 0, 0]
    ];

    var units = transToMatrixArray(arr);
    var rstGroups = getContinuousUnits(units);

    _.forEach(rstGroups, function(v) {
        console.log(JSON.stringify(v));
    });
}

main();