/**
 * 显示消星星独立版本广告
 * @Author: Bill
 * @Date:   2014-12-11 17:26:31
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-12 10:08:14
 */

'use strict';

var starAd_jpg = "res/ad.jpg";
var close_png = "res/close.png";
var loadedStarAd = false;
var adTexture = null;
var closeTexture = null;

function initStarAd() {
    var checkLoaded = function() {
        if (adTexture && closeTexture) {
            loadedStarAd = true;
            return true;
        }
        return false;
    }
    Ltc.loadImg(starAd_jpg, function(texture) {
        adTexture = texture;
        checkLoaded();
    });

    Ltc.loadImg(close_png, function(texture) {
        closeTexture = texture;
        checkLoaded();
    });
}

function tryShowStarAd(target, cb) {
    if (!loadedStarAd) {
        cb();
        return;
    }

    var layer = Ltc.addMaskLayer(target);

    var x = layer.width / 2, y = layer.height / 2;
    var ad = Ltc.sampleBtn(layer, adTexture, cc.p(x, y), function() {
        console.log('click ad btn');
        window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.zeusky.star");
    });

    var close = Ltc.sampleBtn(layer, closeTexture, cc.p(x + ad.width / 2 - 6, y + ad.height / 2 - 6), function() {
        console.log('click close btn');
        layer.removeFromParent();
        cb();
    });
}
