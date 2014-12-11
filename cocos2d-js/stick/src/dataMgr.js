var HIGH_SCORE = "high_score";
var SVR_URL_PRE = "http://203.195.202.83:9001/api/stick/info?";

var NAME_TITLE = [{
    score: 81,
    res: inRes.rank_01_png
}, {
    score: 80,
    res: inRes.rank_02_png
}, {
    score: 60,
    res: inRes.rank_03_png
}, {
    score: 40,
    res: inRes.rank_04_png
}, {
    score: 20,
    res: inRes.rank_05_png
}, {
    score: 10,
    res: inRes.rank_06_png
}, {
    score: 5,
    res: inRes.rank_07_png
}, {
    score: 0,
    res: inRes.rank_08_png
}];

function getNameTitleResByScore(score, isNo1) {
    if (score >= 80) {
        if (isNo1) {
            return NAME_TITLE[0].res;
        } else {
            return NAME_TITLE[1].res;
        }
    } else if (score >= 60) {
        return NAME_TITLE[2].res;
    } else if (score >= 40) {
        return NAME_TITLE[3].res;
    } else if (score >= 20) {
        return NAME_TITLE[4].res;
    } else if (score >= 10) {
        return NAME_TITLE[5].res;
    } else if (score >= 5) {
        return NAME_TITLE[6].res;
    } else {
        return NAME_TITLE[7].res;
    }
}

var DataMgr = cc.Class.extend({
    openid: null,
    openkey: null,
    zoonid: null,
    highScore: 0, // 历史最高
    isShowAd: false, // 是否显示屏幕下的广告
    isShowRank: false, // 是否显示排行榜
    isShowShareBtn: false, // 是否显示分享按钮
    isShowNewbieGuide: false, // 是否显示新手引导
    isTest: false,
    nick: "",
    faceurl: null,
    worldRank: null,
    gameTimes: 0, // 对局数
    isOffline: false,

    ctor: function() {
        this.init();
    },

    init: function() {
        this.openid = getQueryStringByName("openid");
        this.openkey = getQueryStringByName("openkey");
        this.zoonid = (cc.sys.os === cc.sys.OS_IOS) ? 2 : 1;

        // for test
        if (!Ltc.isEmpty(getQueryStringByName("test"))) {
            this.isTest = true;
            console.log("is local test");
            SVR_URL_PRE = "http://localhost:9001/api/stick/info?";
        }

        this._showAd(true);
        this._login();
        this._setResUrl();

        if (this.isOffline) {
            this.highScore = parseInt(cc.sys.localStorage.getItem(HIGH_SCORE)) || 0;
        }
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
                            }
                            this.nick = data.nick;
                            this.faceurl = data.faceurl;
                            this.highScore = data.highScore;
                            this.worldRank = data.worldRank.sort(function(a, b) {
                                return b.highScore - a.highScore;
                            });
                            this.isShowRank = true;
                        }
                    } catch (e) {
                        console.error("parse login rst:", e);
                    }
                }
            }.bind(this));
        } else {
            console.log("have not login, openid is null");
            this.isOffline = true;
        }
    },

    tryUpdateScore: function(score) {
        if (score > this.highScore) {
            this.highScore = score;

            if (this.isOffline) {
                cc.sys.localStorage.setItem(HIGH_SCORE, score);
            }

            // 是否高于世界排行最后一名
            if (this.worldRank) {
                var len = this.worldRank.length;
                if (len > 0 && score > this.worldRank[len - 1].highScore) {
                    // 是否已经在榜中
                    var isFind = false;
                    var needSort = false;
                    for (var i = 0; i < len; i++) {
                        if (this.worldRank[i].openid === this.openid) {
                            isFind = true;
                            if (this.worldRank[i].highScore < score) {
                                this.worldRank[i].highScore = score;
                                needSort = true;
                            }
                        }
                    }

                    if (!isFind) {
                        this.worldRank.pop();
                        this.worldRank.push({
                            openid: this.openid,
                            nick: this.nick,
                            highScore: this.highScore,
                            faceurl: this.faceurl
                        })
                        needSort = true;
                    }

                    if (needSort) {
                        this.worldRank = this.worldRank.sort(function(a, b) {
                            return b.highScore - a.highScore;
                        });
                    }
                }
            }

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
                        try {
                            var data = JSON.parse(doc);
                            if (data.ret === 0) {
                                this.worldRank = data.worldRank.sort(function(a, b) {
                                    return b.highScore - a.highScore;
                                });
                            }
                        } catch (e) {
                            console.error("parse login rst:", e);
                        }
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
    },

    isNo1: function() {
        if (dataMgr.worldRank && dataMgr.worldRank.length > 0 && dataMgr.worldRank[0].openid === dataMgr.openid) {
            return true;
        }
        return false;
    },

    _setResUrl: function() {
        if (!this.isOffline && !this.isTest) {
            var resPath = "http://star-cdn.zeusky.com/stick";
            cc.loader.resPath = resPath;
            cc.loader.audioPath = resPath;
        }
    }
});

var dataMgr = null;