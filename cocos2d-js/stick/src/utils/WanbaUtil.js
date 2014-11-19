/**
 * 邀请
 * @param  {[type]} msg       [description]
 * @param  {[type]} onSuccess [description]
 * @return {[type]}           [description]
 */
function invite(msg, onSuccess) {

    fusion2.dialog.invite({
        msg: msg, // 邀请消息内容
        img: "http://1251001828.cdn.myqcloud.com/1251001828/star/icon.png", // 应用icon图片需发到外网
        context: "invite", // 透传的context，回调的时候会带回来
        onSuccess: onSuccess || function() {},
        onCancel: onCancel = function() {
            console.log("onCancel");
        },
        onClose: onClose = function() {
            console.log("close");
        }
    });
}

/**
 * 购买玩吧积分
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function buyWBScore(num) {
    window.popPayTips({
        is_vip: dataMgr.isVip,
        openkey: dataMgr.openkey,
        openid: dataMgr.openid,
        appid: appid,
        zoneid: dataMgr.zoneid,
        defaultScore: !num ? 10 : num
    });

    if (!window.__paySuccess) {
        window.__paySuccess = function() {
            cc.log("---- paySuccess");

            dataMgr.getQzoneCoin(function(succ) {
                if (succ) {
                    cc.eventManager.dispatchCustomEvent(GET_USER_INFO);
                }
            })
        }
    }

    window.__payError = function() {

    }
}