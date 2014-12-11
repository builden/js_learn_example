/**
 * 显示消星星独立版本广告
 * @Author: Bill
 * @Date:   2014-12-11 17:26:31
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-11 18:15:06
 */

'use strict';

function tryShowStarAd(target, cb) {
    if (!dataMgr.isOffline) {
        cb();
        return;
    }

    var layer = Ltc.addMaskLayer(target);
    // var ad = Ltc.exNode(new cc.Sprite(res.starAd_jpg)).pos_(layer.width / 2, layer.height / 2).addTo_(layer).scale_(0.75);

    var ad = Ltc.samBtn(layer, res.starAd_jpg, cc.p(layer.width / 2, layer.height / 2), function() {
        console.log('click ad btn');
        window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.zeusky.star");
    });

    var close = Ltc.samBtn(ad, res.close_png, cc.p(ad.width, ad.height), function() {
        console.log('click close btn');
        layer.removeFromParent();
        cb();
    });
    close.scale = 0.75;
}