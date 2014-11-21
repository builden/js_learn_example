var HIGH_SCORE = "high_score";
var SVR_URL_PRE = "http://203.195.202.83:9001/api/stick/info?";

var DataMgr = cc.Class.extend({
    openid: null,
    openkey: null,
    zoonid: null,
    highScore: 0, // 历史最高
    isShowAd: false, // 是否显示屏幕下的广告
    isShowRank: false, // 是否显示排行榜
    isShowShareBtn: false, // 是否显示分享按钮
    isShowNewbieGuide: false, // 是否显示新手引导

    ctor: function() {
        // this.highScore = parseInt(cc.sys.localStorage.getItem(HIGH_SCORE)) || 0;
        this.init();
    },

    init: function() {
        this.openid = getQueryStringByName("openid");
        this.openkey = getQueryStringByName("openkey");
        this.zoonid = (cc.sys.os === cc.sys.OS_IOS) ? 2 : 1;

        // for test
        if (!Ltc.isEmpty(getQueryStringByName("test"))) {
            console.log("is local test");
            SVR_URL_PRE = "http://localhost:9001/api/stick/info?";
        }

        this._showAd(true);
        this._login();
    },

    _login: function() {
        if (!Ltc.isEmpty(this.openid)) {
            var cmd = {
                cmd: "login",
                openid: this.openid,
                openkey: this.openkey,
                zoonid: this.zoonid
            };
            var url = SVR_URL_PRE + "data=" + JSON.stringify(cmd);
            console.log("req _login url: " + url);
            Ltc.loadTxt(url, function(status, doc) {
                if (doc) {
                    console.log("res _login: " + doc);
                    try {
                        var data = JSON.parse(doc);
                        if (data.ret === 0) {
                            if (data.showAd === 0) {
                                console.log("hide ad");
                                this.isShowAd = false;
                                this._showAd(this.isShowAd);
                                this.highScore = data.highScore;
                            }
                        }
                    } catch (e) {
                        console.error("parse login rst:", e);
                    }
                }
            }.bind(this));
        } else {
            console.error("have not login, openid is null");
        }
    },

    tryUpdateScore: function(score) {
        if (score > this.highScore) {
            this.highScore = score;
            // cc.sys.localStorage.setItem(HIGH_SCORE, score);

            if (!Ltc.isEmpty(this.openid)) {
                var cmd = {
                    cmd: "upScore",
                    openid: this.openid,
                    openkey: this.openkey,
                    zoonid: this.zoonid,
                    score: score
                };
                var url = SVR_URL_PRE + "data=" + JSON.stringify(cmd);
                console.log("req upScore url: " + url);
                Ltc.loadTxt(url, function(status, doc) {
                    if (doc) {
                        console.log("res upScore: " + doc);
                    }
                }.bind(this));
            }
        }
    },

    _showAd: function(isShow) {
        if (!cc.sys.isNative) {
            this.isShowAd = true;
            var elm = document.getElementById("ad_container");
            if (elm) {
                elm.style.display = isShow ? "block" : "none";
            }
        }
    },

    _showFPSInfo: function() {
        cc.director.setDisplayStats(true);
    },

    canShowInviteOrShare: function() {
        var pf = getQZPlatform();
        if (pf !== -1 && pf !== 3) {
            return true;
        }
        return false;
    }
});

var dataMgr = null;