var RUN_ANI = "run_ani";

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    step:0,     // 步数
    vRc: null,  // VisualRect
    mountainHeight: 0, // 山体高度
    startX: 120, // 起点位置
    maxMountainWidth: 160,  // 最大山体宽度
    minMountainWidth: 2,    // 最小山体宽度


    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        this.vRc = cc.visibleRect;
        console.log(cc.formatStr("left {%d, %d}, bottomRight {%d, %d}",
            this.vRc.left.x, this.vRc.left.y, this.vRc.bottomRight.x, this.vRc.bottomRight.y));
        this.mountainHeight = parseInt(this.vRc.height * 0.3);
        console.log("montan height " + this.mountainHeight);

        this.initBg();
        this.initAni();
        this.runAni();

        var initWidth = 80;
        this.drawMountain(this.startX - initWidth, initWidth);
        this.drawMountain(this.startX + 100, this.maxMountainWidth);
        this.drawStick();
        return true;
    },

    initBg: function() {
        var bg = Ltc.exNode(new cc.Sprite(res.bg_jpg)).addTo_(this).pos_(0, 0).
            anchor_(0, 0);
        var move = cc.moveBy(20, -1 * bg.width, 0);
        var func = cc.callFunc(function() {

        }, bg);
        var seq = cc.sequence(move, func);
        bg.runAction(seq);

        var bg2 = new cc.Sprite(res.bg_jpg);
        Ltc.exNode(bg2).addTo_(this).pos_(bg.width, 0).anchor_(0, 0);
        bg2.runAction(seq.clone());
    },

    initAni: function() {
        var ani = new cc.Animation();
        ani.addSpriteFrameWithFile(res.run1_png);
        ani.addSpriteFrameWithFile(res.run2_png);
        ani.addSpriteFrameWithFile(res.run3_png);
        ani.addSpriteFrameWithFile(res.run4_png);
        ani.addSpriteFrameWithFile(res.run5_png);
        ani.addSpriteFrameWithFile(res.run6_png);
        ani.setDelayPerUnit(0.4 / 4);
        cc.animationCache.addAnimation(ani, RUN_ANI);
    },

    gameOver: function() {

    },

    runAni: function() {
        var sprite = new cc.Sprite(res.run1_png);
        var x = this.startX - 24;
        var y = this.mountainHeight + 24;
        Ltc.exNode(sprite).pos_(x, y).addTo_(this).scale_(0.5);
        var animate = new cc.Animate(cc.animationCache.getAnimation(RUN_ANI));
        sprite.runAction(cc.repeatForever(animate));
    },

    drawMountain: function(pos, width) {
        var sprite = Ltc.exNode(new cc.Sprite(res.blank_png)).pos_(pos,0).
            addTo_(this).scale_(width, this.mountainHeight).
            anchor_(0, 0).color_(cc.color.RED);

        sprite.runAction(cc.moveBy(3, -100, 0));
    },

    drawStick: function() {
        var sprite = Ltc.exNode(new cc.Sprite(res.blank_png)).pos_(this.startX - 1, this.mountainHeight + 1).addTo_(this).scale_(1, 200).
            anchor_(0, 0).color_(cc.color.GREEN);

        var seq1 = cc.sequence(cc.rotateBy(1, 90), cc.delayTime(1), cc.scaleTo(1, 1, 40));
        var spawn = cc.spawn(cc.rotateBy(0.5, 360 * 3), cc.moveBy(0.5, 0, 100));
        var spawn2 = cc.spawn(cc.rotateBy(0.5, 360 * 3), cc.moveBy(0.5, 0, -50), cc.scaleTo(0.5, 1, 1));

        var func1 = cc.callFunc(function() {
            this.x += 20;
            this.setAnchorPoint(0.5, 0.5);
        }, sprite);

        var func2 = cc.callFunc(function() {
            this.setAnchorPoint(0, 0);
            Ltc.exNode(this).show_(false);
        }, sprite);

        sprite.runAction(cc.sequence(seq1, cc.delayTime(1), func1, spawn, spawn2, func2));
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

