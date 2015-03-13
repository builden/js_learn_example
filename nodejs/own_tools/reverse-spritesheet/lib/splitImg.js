/* 
 * @Author: Bill
 * @Date:   2015-03-13 11:30:08
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-03-13 18:58:34
 */

'use strict';

var gm = require('gm');
var images = require('images');
var path = require('path');
var fs = require('fs-extra');

var splitImg = module.exports = function(imgPath, frames, outputPath) {
    if (!fs.existsSync(imgPath)) {
        console.log('cannot find img ' + imgPath);
        return;
    };

    fs.mkdirsSync('tmp');
    fs.mkdirsSync(outputPath);
    // 生成临时文件
    for (var i = 0, len = frames.length; i < len; i++) {
        var frame = frames[i];
        var img = gm(imgPath);
        if (frame.r) {
            img.crop(frame.rect.h, frame.rect.w, frame.rect.x, frame.rect.y);
            img.rotate('#FFFF', -90);
        } else {
            img.crop(frame.rect.w, frame.rect.h, frame.rect.x, frame.rect.y);
        }
        (function(frame) {
            var tmpFile = 'tmp/' + frame.n;
            fs.mkdirsSync(path.dirname(tmpFile));
            img.write(tmpFile, function(err) {
                if (err) {
                    console.log('gm write file error ' + err);
                } else {
                    resizeImg(tmpFile, path.join(outputPath, frame.n), frame.oRect);
                }
            });
        }(frame));
    }
};

function resizeImg(tmpFile, outputFile, oRect) {
    var img = images(oRect.w, oRect.h);
    img.draw(images(tmpFile), oRect.x, oRect.y);
    fs.mkdirsSync(path.dirname(outputFile));
    img.save(outputFile);
}

/*
splitImg('../test/spritesheet/crayon_bg_ed069c4.jpg', [{
    "n": "BG_04.jpg",
    "rect": {
        "x": 2,
        "y": 2,
        "w": 640,
        "h": 1136
    },
    "r": true,
    "oRect": {
        "x": 0,
        "y": 0,
        "w": 640,
        "h": 1136
    }
}, {
    "n": "qzone_default_face.jpg",
    "rect": {
        "x": 1140,
        "y": 2,
        "w": 50,
        "h": 50
    },
    "r": false,
    "oRect": {
        "x": 0,
        "y": 0,
        "w": 50,
        "h": 50
    }
}, {
    "n": "roles/heros_bg.jpg",
    "rect": {
        "x": 2,
        "y": 644,
        "w": 582,
        "h": 360
    },
    "r": false,
    "oRect": {
        "x": 0,
        "y": 0,
        "w": 582,
        "h": 360
    }
}, {
    "n": "roles/pets_bg.jpg",
    "rect": {
        "x": 586,
        "y": 644,
        "w": 582,
        "h": 360
    },
    "r": false,
    "oRect": {
        "x": 0,
        "y": 0,
        "w": 582,
        "h": 360
    }
}], 'output');

splitImg('../test/spritesheet/Character_ice_RETINA.png', [{"n":"modeA_block_bomb@2x.png","rect":{"x":400,"y":199,"w":76,"h":75},"oRect":{"x":11,"y":17,"w":100,"h":100}},{"n":"modeA_block_clock@2x.png","rect":{"x":477,"y":199,"w":76,"h":75},"oRect":{"x":11,"y":17,"w":100,"h":100}},{"n":"modeA_block_egg@2x.png","rect":{"x":554,"y":199,"w":76,"h":75},"oRect":{"x":11,"y":17,"w":100,"h":100}},{"n":"modeA_blockA_piece@2x.png","rect":{"x":175,"y":199,"w":74,"h":75},"oRect":{"x":12,"y":17,"w":100,"h":100}},{"n":"modeA_blockB_piece@2x.png","rect":{"x":325,"y":199,"w":74,"h":74},"oRect":{"x":12,"y":18,"w":100,"h":100}},{"n":"modeA_blockB@2x.png","rect":{"x":250,"y":199,"w":74,"h":75},"oRect":{"x":12,"y":17,"w":100,"h":100}},{"n":"modeA_box00@2x.png","rect":{"x":631,"y":199,"w":76,"h":88},"oRect":{"x":11,"y":4,"w":100,"h":100}},{"n":"modeA_box01@2x.png","rect":{"x":708,"y":199,"w":81,"h":84},"oRect":{"x":7,"y":8,"w":100,"h":100}},{"n":"modeA_box02@2x.png","rect":{"x":790,"y":199,"w":77,"h":92},"oRect":{"x":11,"y":0,"w":100,"h":100}},{"n":"modeA_box03@2x.png","rect":{"x":868,"y":199,"w":76,"h":92},"oRect":{"x":11,"y":0,"w":100,"h":100}},{"n":"modeA_box04@2x.png","rect":{"x":1,"y":298,"w":86,"h":85},"oRect":{"x":4,"y":7,"w":100,"h":100}},{"n":"modeA_box05@2x.png","rect":{"x":88,"y":298,"w":77,"h":92},"oRect":{"x":11,"y":0,"w":100,"h":100}},{"n":"modeA_box06@2x.png","rect":{"x":166,"y":298,"w":77,"h":89},"oRect":{"x":11,"y":3,"w":100,"h":100}},{"n":"modeA_box07@2x.png","rect":{"x":244,"y":298,"w":77,"h":92},"oRect":{"x":11,"y":0,"w":100,"h":100}},{"n":"modeA_clock@2x.png","rect":{"x":322,"y":298,"w":59,"h":74},"oRect":{"x":2,"y":2,"w":64,"h":76}},{"n":"modeA_egg@2x.png","rect":{"x":382,"y":298,"w":64,"h":73},"oRect":{"x":0,"y":3,"w":64,"h":76}},{"n":"box00_burn@2x.png","rect":{"x":1,"y":1,"w":86,"h":94},"oRect":{"x":6,"y":4,"w":100,"h":100}},{"n":"box01_burn@2x.png","rect":{"x":262,"y":1,"w":86,"h":90},"oRect":{"x":6,"y":8,"w":100,"h":100}},{"n":"box02_burn@2x.png","rect":{"x":523,"y":1,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box03_burn@2x.png","rect":{"x":784,"y":1,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box04_burn@2x.png","rect":{"x":88,"y":100,"w":86,"h":91},"oRect":{"x":6,"y":7,"w":100,"h":100}},{"n":"box05_burn@2x.png","rect":{"x":349,"y":100,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box06_burn@2x.png","rect":{"x":610,"y":100,"w":86,"h":95},"oRect":{"x":6,"y":3,"w":100,"h":100}},{"n":"box07_burn@2x.png","rect":{"x":871,"y":100,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box00_normal_00@2x.png","rect":{"x":88,"y":1,"w":86,"h":94},"oRect":{"x":6,"y":4,"w":100,"h":100}},{"n":"box01_normal_00@2x.png","rect":{"x":349,"y":1,"w":86,"h":90},"oRect":{"x":6,"y":8,"w":100,"h":100}},{"n":"box02_normal_00@2x.png","rect":{"x":610,"y":1,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box03_normal_00@2x.png","rect":{"x":871,"y":1,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box04_normal_00@2x.png","rect":{"x":175,"y":100,"w":86,"h":91},"oRect":{"x":6,"y":7,"w":100,"h":100}},{"n":"box05_normal_00@2x.png","rect":{"x":436,"y":100,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box06_normal_00@2x.png","rect":{"x":697,"y":100,"w":86,"h":95},"oRect":{"x":6,"y":3,"w":100,"h":100}},{"n":"box07_normal_00@2x.png","rect":{"x":1,"y":199,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box00_normal_02@2x.png","rect":{"x":175,"y":1,"w":86,"h":94},"oRect":{"x":6,"y":4,"w":100,"h":100}},{"n":"box01_normal_02@2x.png","rect":{"x":436,"y":1,"w":86,"h":90},"oRect":{"x":6,"y":8,"w":100,"h":100}},{"n":"box02_normal_02@2x.png","rect":{"x":697,"y":1,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box03_normal_02@2x.png","rect":{"x":1,"y":100,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box04_normal_02@2x.png","rect":{"x":262,"y":100,"w":86,"h":91},"oRect":{"x":6,"y":7,"w":100,"h":100}},{"n":"box05_normal_02@2x.png","rect":{"x":523,"y":100,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}},{"n":"box06_normal_02@2x.png","rect":{"x":784,"y":100,"w":86,"h":95},"oRect":{"x":6,"y":3,"w":100,"h":100}},{"n":"box07_normal_02@2x.png","rect":{"x":88,"y":199,"w":86,"h":98},"oRect":{"x":6,"y":0,"w":100,"h":100}}], 'output');

splitImg('../test/spritesheet/candy_c_hi_hd.png', [{"n":"2x2_jelly_cake_background_c.png","rect":{"x":1046,"y":160,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"bear_collected.png","rect":{"x":456,"y":488,"w":230,"h":296},"oRect":{"x":0,"y":0,"w":230,"h":296},"r":false},{"n":"bear_in_bubble_c.png","rect":{"x":782,"y":160,"w":256,"h":256},"oRect":{"x":0,"y":0,"w":256,"h":256},"r":false},{"n":"blue_c.png","rect":{"x":1046,"y":316,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"blue_striped_h_c.png","rect":{"x":902,"y":704,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"blue_striped_v_c.png","rect":{"x":1522,"y":436,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"blue_wrapped_c.png","rect":{"x":1850,"y":4,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"bubblegum_1_c.png","rect":{"x":1226,"y":596,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"bubblegum_2_c.png","rect":{"x":1382,"y":596,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"bubblegum_klet_h_c.png","rect":{"x":584,"y":1918,"w":148,"h":40},"oRect":{"x":0,"y":0,"w":148,"h":40},"r":false},{"n":"bubblegum_klet_v_c.png","rect":{"x":1678,"y":436,"w":40,"h":148},"oRect":{"x":0,"y":0,"w":40,"h":148},"r":false},{"n":"candy_cannon_bottles_and_liqswirl_bg.png","rect":{"x":456,"y":792,"w":200,"h":104},"oRect":{"x":0,"y":0,"w":200,"h":104},"r":false},{"n":"candy_cannon_bottles_bg.png","rect":{"x":782,"y":424,"w":200,"h":104},"oRect":{"x":0,"y":0,"w":200,"h":104},"r":false},{"n":"candy_cannon_liqswirl_bg.png","rect":{"x":694,"y":704,"w":200,"h":104},"oRect":{"x":0,"y":0,"w":200,"h":104},"r":false},{"n":"candy_cannon_spinner.png","rect":{"x":664,"y":816,"w":200,"h":90},"oRect":{"x":0,"y":0,"w":200,"h":90},"r":false},{"n":"chocolate_c.png","rect":{"x":1538,"y":592,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"coloring_candy_blue_c.png","rect":{"x":418,"y":904,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"coloring_candy_cyan_c.png","rect":{"x":418,"y":1072,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"coloring_candy_green_c.png","rect":{"x":418,"y":1240,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"coloring_candy_orange_c.png","rect":{"x":418,"y":1408,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"coloring_candy_purple_c.png","rect":{"x":418,"y":1576,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"coloring_candy_red_c.png","rect":{"x":1202,"y":268,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"coloring_candy_yellow_c.png","rect":{"x":1370,"y":268,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"cupcake_layer1_c.png","rect":{"x":1258,"y":752,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"cupcake_layer2_c.png","rect":{"x":1258,"y":908,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"cupcake_layer3_c.png","rect":{"x":1258,"y":1064,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"cupcake_layer4_c.png","rect":{"x":1258,"y":1220,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"cupcake_layer5_c.png","rect":{"x":1258,"y":1376,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"cyan_c.png","rect":{"x":1090,"y":1816,"w":156,"h":156},"oRect":{"x":0,"y":0,"w":156,"h":156},"r":false},{"n":"cyan_striped_h_c.png","rect":{"x":476,"y":1754,"w":156,"h":156},"oRect":{"x":0,"y":0,"w":156,"h":156},"r":false},{"n":"cyan_striped_v_c.png","rect":{"x":640,"y":1754,"w":156,"h":156},"oRect":{"x":0,"y":0,"w":156,"h":156},"r":false},{"n":"cyan_wrapped_c.png","rect":{"x":1538,"y":268,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"electricity.png","rect":{"x":308,"y":1912,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"fish_blue_c.png","rect":{"x":694,"y":536,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_blue_striped_c.png","rect":{"x":862,"y":536,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_blue_wrapped_c.png","rect":{"x":586,"y":914,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_cyan_c.png","rect":{"x":586,"y":1082,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_cyan_striped_c.png","rect":{"x":586,"y":1250,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_cyan_wrapped_c.png","rect":{"x":586,"y":1418,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_green_c.png","rect":{"x":586,"y":1586,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_green_striped_c.png","rect":{"x":754,"y":914,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_green_wrapped_c.png","rect":{"x":754,"y":1082,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_jam_1_c.png","rect":{"x":444,"y":1918,"w":132,"h":106},"oRect":{"x":0,"y":0,"w":132,"h":106},"r":false},{"n":"fish_orange_c.png","rect":{"x":754,"y":1250,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_orange_striped_c.png","rect":{"x":754,"y":1418,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_orange_wrapped_c.png","rect":{"x":754,"y":1586,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_pink_c.png","rect":{"x":1030,"y":472,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_purple_c.png","rect":{"x":922,"y":860,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_purple_striped_c.png","rect":{"x":922,"y":1028,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_purple_wrapped_c.png","rect":{"x":922,"y":1196,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_red_c.png","rect":{"x":922,"y":1364,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_red_striped_c.png","rect":{"x":922,"y":1532,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_red_wrapped_c.png","rect":{"x":1058,"y":640,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_yellow_c.png","rect":{"x":1090,"y":808,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_yellow_striped_c.png","rect":{"x":1090,"y":976,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fish_yellow_wrapped_c.png","rect":{"x":1090,"y":1144,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"fishbag_break.png","rect":{"x":1730,"y":4,"w":112,"h":222},"oRect":{"x":0,"y":0,"w":112,"h":222},"r":false},{"n":"giant_bear.png","rect":{"x":4,"y":4,"w":444,"h":888},"oRect":{"x":0,"y":0,"w":444,"h":888},"r":false},{"n":"giant_fish.png","rect":{"x":4,"y":900,"w":406,"h":834},"oRect":{"x":0,"y":0,"w":406,"h":834},"r":false},{"n":"glow.png","rect":{"x":1202,"y":4,"w":256,"h":256},"oRect":{"x":0,"y":0,"w":256,"h":256},"r":false},{"n":"green_c.png","rect":{"x":1258,"y":1532,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"green_striped_h_c.png","rect":{"x":1258,"y":1688,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"green_striped_v_c.png","rect":{"x":1254,"y":1844,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"green_wrapped_c.png","rect":{"x":1090,"y":1312,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"honey_bear_1_c.png","rect":{"x":1414,"y":752,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_bear_2_c.png","rect":{"x":1414,"y":908,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_empty_1_c.png","rect":{"x":1414,"y":1064,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_empty_2_c.png","rect":{"x":1414,"y":1220,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_solid_1_c.png","rect":{"x":1414,"y":1376,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_solid_2_c.png","rect":{"x":1414,"y":1532,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_solid_3_c.png","rect":{"x":1414,"y":1688,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_solid_4_c.png","rect":{"x":1410,"y":1844,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_special_1_c.png","rect":{"x":1570,"y":748,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_special_2_c.png","rect":{"x":1570,"y":904,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"honey_splat.png","rect":{"x":804,"y":1754,"w":110,"h":110},"oRect":{"x":0,"y":0,"w":110,"h":110},"r":false},{"n":"icecube_1_c.png","rect":{"x":1202,"y":436,"w":152,"h":152},"oRect":{"x":0,"y":0,"w":152,"h":152},"r":false},{"n":"icecube_2_c.png","rect":{"x":1362,"y":436,"w":152,"h":152},"oRect":{"x":0,"y":0,"w":152,"h":152},"r":false},{"n":"icecube_3_c.png","rect":{"x":1570,"y":1060,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"icecube_4_c.png","rect":{"x":1570,"y":1216,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"icecube_5_c.png","rect":{"x":1570,"y":1372,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"icecube_6_c.png","rect":{"x":1570,"y":1528,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"jellycake_base_c.png","rect":{"x":456,"y":160,"w":318,"h":320},"oRect":{"x":0,"y":0,"w":318,"h":320},"r":false},{"n":"jellycake_pieces_c.png","rect":{"x":456,"y":4,"w":738,"h":148},"oRect":{"x":0,"y":0,"w":738,"h":148},"r":false},{"n":"liqlock_c.png","rect":{"x":1466,"y":4,"w":256,"h":256},"oRect":{"x":0,"y":0,"w":256,"h":256},"r":false},{"n":"liquorice_swirl_break.png","rect":{"x":4,"y":1742,"w":296,"h":296},"oRect":{"x":0,"y":0,"w":296,"h":296},"r":false},{"n":"liquorice_swirl_c.png","rect":{"x":1570,"y":1684,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"orange_c.png","rect":{"x":1694,"y":592,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"orange_striped_h_c.png","rect":{"x":1726,"y":748,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"orange_striped_v_c.png","rect":{"x":1726,"y":904,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"orange_wrapped_c.png","rect":{"x":1090,"y":1480,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"purple_c.png","rect":{"x":1726,"y":1060,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"purple_striped_h_c.png","rect":{"x":1726,"y":1216,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"purple_striped_v_c.png","rect":{"x":1726,"y":1372,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"purple_wrapped_c.png","rect":{"x":1850,"y":172,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"red_c.png","rect":{"x":1726,"y":1528,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"red_striped_h_c.png","rect":{"x":1726,"y":1684,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"red_striped_v_c.png","rect":{"x":804,"y":1872,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"red_wrapped_c.png","rect":{"x":308,"y":1744,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"selected_candy.png","rect":{"x":922,"y":1700,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false},{"n":"soda_goal.png","rect":{"x":1566,"y":1844,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"waterballoon_blue_c.png","rect":{"x":1706,"y":268,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"waterballoon_cyan_c.png","rect":{"x":1882,"y":808,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"waterballoon_green_c.png","rect":{"x":1882,"y":944,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"waterballoon_orange_c.png","rect":{"x":1882,"y":1080,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"waterballoon_purple_c.png","rect":{"x":1882,"y":1216,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"waterballoon_red_c.png","rect":{"x":1882,"y":1352,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"waterballoon_yellow_c.png","rect":{"x":1882,"y":1488,"w":128,"h":128},"oRect":{"x":0,"y":0,"w":128,"h":128},"r":false},{"n":"white_chocolate_1_c.png","rect":{"x":1722,"y":1840,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"white_chocolate_2_c.png","rect":{"x":1726,"y":404,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"yellow_c.png","rect":{"x":1882,"y":340,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"yellow_striped_h_c.png","rect":{"x":1882,"y":496,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"yellow_striped_v_c.png","rect":{"x":1882,"y":652,"w":148,"h":148},"oRect":{"x":0,"y":0,"w":148,"h":148},"r":false},{"n":"yellow_wrapped_c.png","rect":{"x":1090,"y":1648,"w":160,"h":160},"oRect":{"x":0,"y":0,"w":160,"h":160},"r":false}], 'output');
*/