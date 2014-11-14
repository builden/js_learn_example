var MainLayer = cc.Layer.extend({
    touchListener: null,
    splitedImgMgr: null,
    ctor: function() {
        //////////////////////////////
        // 1. super init first
        this._super();
        console.log(this.getBoundingBox());

        this.addTouchListener();
        this.initGameLayer(res.GameTest_jpg);

        return true;
    },

    addTouchListener: function() {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                return false;
            },

            onTouchMoved: function(touch, event) {

            },

            onTouchEnded: function(touch, event) {

            },

            onTouchCancelled: function(touch, event) {

            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    },

    onExit: function() {
        cc.eventManager.removeListener(this.touchListener);
        this._super();
    },

    initGameLayer: function(res) {
        var gameLayer = new cc.Layer();
        this.addChild(gameLayer);
        var row = 4,
            col = 5;
        var mgr = this.splitedImgMgr = new SplitedImgMgr(res, row, col);

        // var row = 4,
        //     col = 5,
        //     offset = 4;
        // var randomArr = [];
        // for (var i = 0; i < row * col; i++) {
        //     randomArr.push(i);
        // }
        // randomArr = Ltc.shuffle(randomArr);

        // var texture = cc.textureCache.addImage(res);
        var w = mgr.intervalW;
        var h = mgr.intervalH;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                // var pos = i * (row + 1) + j;
                // var rc = cc.rect(parseInt(randomArr[pos] / (row + 1)) * w,
                //     randomArr[pos] % col * h, w - offset, h - offset);
                // console.log(i + " " + j);
                // console.log(rc);
                var img = Ltc.exNode(mgr.getSprite(i, j)).addTo_(
                    gameLayer).pos_(i * w + 2, (col - j - 1) * h).anchor_(0, 0);
                console.log(img.getBoundingBox());
            }
        }
    },

    checkGameOver: function() {
        // 是否已经按照顺序排好了

        // 是否步数已用尽
    },

    /**
     * 游戏失败
     * @return {[type]} [description]
     */
    onGameOver: function() {

    },

    /**
     * 游戏成功完成
     * @return {[type]} [description]
     */
    onMissionComplete: function() {

    }
});

var MainScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});