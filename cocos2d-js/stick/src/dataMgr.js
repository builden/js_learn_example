var DataMgr = cc.Class.extend({
    openid: null,
    openkey: null,
    highScore: 0,   // 历史最高
    isShowAd: false,    // 是否显示屏幕下的广告
    isShowRank: false,  // 是否显示排行榜
    isShowShareBtn: false,  // 是否显示分享按钮

    ctor: function() {

    },

    tryUpdateScore: function(score) {
        if (score > this.highScore) {
            this.highScore = score;
        }
    },

    _showAd: function(isShow) {
        if (!cc.sys.isNative) {
            showAd(isShow);
        }
    },

    _showFPSInfo: function() {
        cc.director.setDisplayStats(true);
    }
});

var dataMgr = null;