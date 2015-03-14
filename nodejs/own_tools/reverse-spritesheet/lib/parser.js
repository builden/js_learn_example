/* 
 * @Author: Bill
 * @Date:   2015-03-13 11:29:16
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-03-14 11:09:48
 *
 * note:
 *   cheerio如果处理的是xml文件（非标准的html），则需要在load的时候指定{xmlMode: true}选项，否则会出现如下问题
 *   1. 标签属性，会自动变成小写（因为html中不区分大小写）
 *   2. 如果xml中存在self-closing tag(自封闭标签)，使用children遍历会被中断
 */

'use strict';
var fs = require('fs-extra');
var path = require('path');
var cheerio = require('cheerio');

/**
 * [exports description]
 * @param  {[type]} plistPath [description]
 * @return {[type]} {
 *         imagePath: spritesheet文件,
 *         frames: [{
 *             n: sprite文件名,
 *             rect: {
 *                 x: 相对于spritesheet的x坐标,
 *                 y: 相对于spritesheet的y坐标,
 *                 w: 在spritesheet中所占宽度,
 *                 h: 在spritesheet中所占高度,
 *             },
 *             oRect: {
 *                 x: sprite裁剪后相对于原始x坐标偏移位置,
 *                 y: sprite裁剪后相对于原始y坐标偏移位置,
 *                 w: sprite裁剪前实际宽度,
 *                 h: sprite裁剪前实际高度,
 *             },
 *             r: true / false // 是否翻转了
 *         }, ...]
 * }
 */
var parser = module.exports = function(plistPath) {
    var $ = cheerio.load(fs.readFileSync(plistPath), {
        xmlMode: true
    });
    var rst = {
        frames: []
    };
    if ($('TextureAtlas').length !== 0) { // candy crush格式
        // console.log('find TextureAtlas');
        parseType1($, rst);
    } else if ($('plist').children('dict').first().children('key').last().text() === 'metadata') { // TexturePacker 3.4
        // console.log('find metadata');
        parseType2($, rst);
    } else if ($('plist').children('dict').first().children('key').first().text() === 'texture') { // TexturePacker (小鸟爆破)
        // console.log('find texture');
        rst.imagePath = path.basename(plistPath, path.extname(plistPath)) + '.png';
        parseType3($, rst);
    } else {
        console.log('unknown file');
    }

    return rst;
};

// candy crush游戏所用格式
function parseType1($, rst) {
    rst.imagePath = $('TextureAtlas').attr('imagePath');
    $('TextureAtlas').children('sprite').each(function() {
        rst.frames.push({
            n: $(this).attr('n'),
            rect: {
                x: parseInt($(this).attr('x')),
                y: parseInt($(this).attr('y')),
                w: parseInt($(this).attr('w')),
                h: parseInt($(this).attr('h'))
            },
            oRect: {
                x: parseInt($(this).attr('oX')) || 0,
                y: parseInt($(this).attr('oY')) || 0,
                w: parseInt($(this).attr('oW')) || parseInt($(this).attr('w')),
                h: parseInt($(this).attr('oH')) || parseInt($(this).attr('h'))
            },
            r: $(this).attr('r') === 'y' ? true : false
        });
    });
}

// Texture Packer所用格式
function parseType2($, rst) {
    $('plist').children('dict').first().children('key').last().next().children('key').each(function() {
        if ($(this).text() === 'realTextureFileName') {
            rst.imagePath = $(this).next().text();
        }
    });

    $('plist').children('dict').first().children('key').first().next().children('key').each(function() {
        var frame = {
            n: $(this).text()
        };

        var oSize = null;
        $(this).next().children('key').each(function() {
            var v = $(this).text();
            if (v === 'frame') {
                frame.rect = parseRect($(this).next().text());
            } else if (v === 'sourceColorRect') {
                frame.oRect = parseRect($(this).next().text());
            } else if (v === 'rotated') {
                frame.r = $(this).next()[0].tagName === 'true' ? true : false;
            } else if (v === 'sourceSize') {
                oSize = parseSize($(this).next().text());
            }
        });
        frame.oRect.w = oSize.w;
        frame.oRect.h = oSize.h;
        rst.frames.push(frame);
    });
}

// 小鸟爆破所用格式
function parseType3($, rst) {
    $('plist').children('dict').first().children('key').last().next().children('key').each(function() {
        var frame = {
            n: $(this).text(),
            rect: {},
            oRect: {}
        };
        $(this).next().children('key').each(function() {
            var v = $(this).text();
            var num = parseInt($(this).next().text());
            if (v === 'x') {
                frame.rect.x = num;
            } else if (v === 'y') {
                frame.rect.y = num;
            } else if (v === 'width') {
                frame.rect.w = num;
            } else if (v === 'height') {
                frame.rect.h = num;
            } else if (v === 'offsetX') {
                frame.oRect.x = parseFloat($(this).next().text());
            } else if (v === 'offsetY') {
                frame.oRect.y = parseFloat($(this).next().text());
            } else if (v === 'originalWidth') {
                frame.oRect.w = num;
            } else if (v === 'originalHeight') {
                frame.oRect.h = num;
            }
        });
        frame.oRect.x = parseInt(((frame.oRect.w - frame.rect.w) / 2) + frame.oRect.x);
        frame.oRect.y = parseInt(((frame.oRect.h - frame.rect.h) / 2) - frame.oRect.y);
        rst.frames.push(frame);
    });
}

/**
 * 解析字符串类型的Rect
 * @param  {[String]} str eg. {{2,244},{115,44}}
 * @return {[Object]} {x:2, y:244, w:115, h:44}
 */
function parseRect(str) {
    // 去掉大括号
    str = str.replace(/{/g, "").replace(/}/g, "");
    var arr = str.split(',');
    return {
        x: parseInt(arr[0]),
        y: parseInt(arr[1]),
        w: parseInt(arr[2]),
        h: parseInt(arr[3])
    }
}

function parseSize(str) {
    str = str.replace(/{/g, "").replace(/}/g, "");
    var arr = str.split(',');
    return {
        w: parseInt(arr[0]),
        h: parseInt(arr[1]),
    }
}

// console.log(JSON.stringify(parser('../test/spritesheet/candy_c_hi_hd.xml')));
// console.log(JSON.stringify(parser('../test/spritesheet/Character_ice_RETINA.plist')));
// console.log(JSON.stringify(parser('../test/spritesheet/crayon_bg_ed069c4.plist')));