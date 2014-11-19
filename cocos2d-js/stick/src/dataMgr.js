var DataMgr = cc.Class.extend({
    openid: null,
    openkey: null,
    highScore: 0,   // 历史最高
    ctor: function() {

    },

    tryUpdateScore: function(score) {
        if (score > this.highScore) {
            this.highScore = score;
        }
    }
});

var dataMgr = null;