var HIGH_SCORE = "high_score";
var DataMgr = cc.Class.extend({
    openid: null,
    openkey: null,
    zoonid: null,
    highScore: 0,   // 历史最高
    isShowAd: false,    // 是否显示屏幕下的广告
    isShowRank: false,  // 是否显示排行榜
    isShowShareBtn: false,  // 是否显示分享按钮
    isShowNewbieGuide: false, // 是否显示新手引导

    ctor: function() {
        this.highScore = parseInt(cc.sys.localStorage.getItem(HIGH_SCORE)) || 0;
        this.init();
    },

    init: function() {
        this._showAd(this.isShowAd);
    },

    tryUpdateScore: function(score) {
        if (score > this.highScore) {
            this.highScore = score;
            cc.sys.localStorage.setItem(HIGH_SCORE, score);
        }
    },

    _showAd: function(isShow) {
        if (!cc.sys.isNative) {
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
