/**
 * 触屏环境下没有邀请和分享功能
 */

/**
 * 邀请
 * @param  {[type]} msg       [description]
 * @param  {[type]} onSuccess [description]
 * @return {[type]}           [description]
 */
function inviteFriend(msg, onSuccess) {
    try {
        /** @expose */
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
    } catch (err) {
        console.error("inviteFriend err: " + err);
    }
}

/**
 * 购买玩吧积分
 * @param  {[type]}   appid   [description]
 * @param  {[type]}   zoneid  [description]
 * @param  {[type]}   openid  [description]
 * @param  {[type]}   openkey [description]
 * @param  {Boolean}  isVip   [description]
 * @param  {[type]}   num     [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
function buyWBScore(appid, zoneid, openid, openkey, isVip, num, cb) {
    try {
        /** @expose */
        window.popPayTips({
            is_vip: isVip,
            openkey: openkey,
            openid: openid,
            appid: appid,
            zoneid: zoneid,
            defaultScore: num
        });

        if (!window.__paySuccess) {
            window.__paySuccess = function() {
                cc.log("---- paySuccess");
                cb(true);
            }
        }

        window.__payError = function() {
            cb(false);
        }
    } catch (err) {
        console.log("buyWBScore err: " + err);
        cb(false);
    }
}

/**
 * 分享游戏
 * @return {[type]} [description]
 */
function shareGame() {
    try {
        /** @expose */
        QZAppExternal.qzoneGameBar({
            type: 'share'
        });

    } catch (err) {
        console.error("shareGame error: " + err);
    }
}

/**
 * 获取QZPlatform
 * @return {Number}
 *         -1 未获取到QZAppExternal
 *         3  触屏
 */
function getQZPlatform() {
    /** @expose */
    try {
        if (typeof(QZAppExternal) !== "undefined" && QZAppExternal) {
            var pf = QZAppExternal.getPlatform();
            console.log("getQZPlatform " + pf);
            return pf;
        }
    } catch (err) {
        console.error("getQZPlatform error: " + err);
        return -1;
    }
    return -1;
}
