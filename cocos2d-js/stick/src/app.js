var RUN_ANI = "run_ani";
var STICK_WIDTH = 4;
var STICK_COLOR = cc.color(124, 78, 31);

var MainLayer = cc.Layer.extend({
    step:0,     // 步数
    vRc: null,  // VisualRect
    mountainHeight: 0, // 山体高度
    startX: 120, // 起点位置
    maxMountainWidth: 160,  // 最大山体宽度
    minMountainWidth: 6,    // 最小山体宽度
    runner:null, // 猴子sprite
    stick: null, // 棍子sprite
    longerAction: null, // 边长的Action
    actionRunning: false,
    mountain1: null,
    mountain2: null,
    mountain3: null,
    distance: 0,         // 起点与mountain的距离
    mountainWidth: 0,   // 山体宽度
//    bgAction: null,
//    bgFrontAction: null,


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
        console.log("mountain height " + this.mountainHeight);

        this.initBg(res.bg_jpg, 100);
        this.initBg(res.bg_front_png, 60);
        this.initAni();
        this.runAni();

        var initWidth = 120;
        this.mountain1 = this.drawMountain(this.startX - initWidth, initWidth);
        this.mountainWidth = 100;// Ltc.random(2, this.maxMountainWidth);
        this.distance = Ltc.random(6, this.vRc.width - this.startX - this.mountainWidth);
        this.mountain2 = this.drawMountain(this.startX + this.distance, this.mountainWidth);
        this.drawStick();

        this.addTouchListener();
        return true;
    },

    addTouchListener: function() {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                if (this.actionRunning) {
                    return false;
                } else {
                    this.actionRunning = true;
                    this.makeStickLonger();
                    return true;
                }
            }.bind(this),

            onTouchMoved: function(touch, event) {

            }.bind(this),

            onTouchEnded: function(touch, event) {
                this.stopStickLonger();
            }.bind(this),

            onTouchCancelled: function(touch, event) {

            }.bind(this)
        });
        cc.eventManager.addListener(this.touchListener, this);
    },

    onExit: function() {
        cc.eventManager.removeListener(this.touchListener);
        this._super();
    },

    initBg: function(bgRes, time) {
        var bg = Ltc.exNode(new cc.Sprite(bgRes)).addTo_(this).pos_(0, 0).
            anchor_(0, 0);
        var move = cc.moveBy(time, -1 * bg.width, 0);
        var func = cc.callFunc(function() {

        }, bg);
        var seq = cc.sequence(move, func);
        bg.runAction(seq);

        var bg2 = new cc.Sprite(bgRes);
        Ltc.exNode(bg2).addTo_(this).pos_(bg.width - 1, 0).anchor_(0, 0).flipX_(true);
        bg2.runAction(seq.clone());
    },

    initAni: function() {
        var ani = new cc.Animation();
        ani.addSpriteFrameWithFile(res.run1_png);
        ani.addSpriteFrameWithFile(res.run2_png);
        ani.addSpriteFrameWithFile(res.run1_png);
        ani.addSpriteFrameWithFile(res.run3_png);
        ani.setDelayPerUnit(0.1);
        ani.setRestoreOriginalFrame(true);
        cc.animationCache.addAnimation(ani, RUN_ANI);
    },

    gameOver: function() {
        var aniTime = 0.8;
        this.runner.runAction(cc.moveBy(aniTime, 0, -1 * (this.mountainHeight + 60)).easing(cc.easeIn(3.0)));
        var func = cc.callFunc(function() {
            this.actionRunning = false;
            var moveAct1 = cc.moveBy(0.1, 0, 3);
            var moveAct2 = cc.moveBy(0.1, 0, 2);
            var moveAct3 = cc.moveBy(0.1, 0, 1);
            this.runAction(cc.sequence(moveAct1, moveAct1.reverse(), moveAct2, moveAct2.reverse(), moveAct3, moveAct3.reverse()));
        }, this);
        this.stick.runAction(cc.sequence(cc.rotateBy(aniTime, 90).easing(cc.easeIn(3.0)), func));
    },

    runAni: function() {
        var sprite = new cc.Sprite(res.run1_png);
        var x = this.startX - 3;
        var y = this.mountainHeight - 2;
        Ltc.exNode(sprite).pos_(x, y).addTo_(this).scale_(0.5).anchor_(1, 0).z_(1);
        this.runner = sprite;
    },

    drawMountain: function(pos, width) {
        var sprite = Ltc.exNode(new cc.Sprite(res.blank_png)).pos_(pos, 0).
            addTo_(this).scale_(width, this.mountainHeight).
            anchor_(0, 0).color_(STICK_COLOR);

        return sprite;
    },

    makeStickLonger: function() {
        this.runner.setPosition(this.startX - 3, this.mountainHeight - 2);
        var stick = this.stick;
        stick.setPosition(this.startX - 1, this.mountainHeight);
        stick.setRotation(0);
        stick.setVisible(true);
        stick.scaleX = 4;
        stick.scaleY = 1;
        if (!this.longerAction) {
            var destLong = this.vRc.height - this.mountainHeight;
            this.longerAction = cc.scaleBy(2, 1, destLong);
        }
        stick.runAction(this.longerAction);
    },

    stopStickLonger: function() {
        this.longerAction.stop();
        // console.log("stick long " + this.stick.getBoundingBox().height);
        var rotate = cc.rotateBy(1, 90).easing(cc.easeIn(3.0));
        var func = cc.callFunc(function() {
            var stickLen = parseInt(this.stick.getBoundingBox().width);
            console.log("stick long " + stickLen + "; distance " + this.distance + "; mountain width " + this.mountainWidth);
            if (stickLen < this.distance) {
                this.doRun(stickLen + 16, true);
            } else if (stickLen > (this.distance + this.mountainWidth)) {
                this.doRun(Math.min(stickLen, this.vRc.width - this.startX) + 16, true);
            } else {
                this.doRun(this.distance + this.mountainWidth, false);
            }

        }, this);
        this.stick.runAction(cc.sequence(rotate, func));
    },

    doRun: function(distance, isOver) {
        console.log("doRun " + distance);
        var animate = new cc.Animate(cc.animationCache.getAnimation(RUN_ANI));
        this.runner.runAction(cc.repeatForever(animate));
        var func = cc.callFunc(function() {
            this.runner.stopAllActions();
            if (arguments[1]) {
                this.gameOver();
            } else {
                this.backToStartPos(arguments[0]);
            }
        }.bind(this, distance, isOver), this);
        this.runner.runAction(cc.sequence(cc.moveBy(distance / 200, distance, 0), func));
    },

    backToStartPos: function(distance) {
        this.runner.runAction(cc.moveBy(1, -1 * distance, 0));

        // var seq1 = cc.sequence(cc.rotateBy(1, 90), cc.delayTime(1), cc.scaleTo(1, 1, 40));
        var spawn = cc.spawn(cc.rotateBy(0.5, 360 * 3), cc.moveBy(0.5, 0, 100));
        var spawn2 = cc.spawn(cc.rotateBy(0.5, 360 * 3), cc.moveTo(0.5, this.startX - 10, this.mountainHeight + 10), cc.scaleTo(0.5, 1, 1));

        var func1 = cc.callFunc(function() {

        }, this.stick);

        var func2 = cc.callFunc(function() {
            this.stick.setAnchorPoint(0, 0);
            Ltc.exNode(this.stick).show_(false);
            this.actionRunning = false;
        }, this);

        this.stick.x += this.distance / 2;
        this.stick.setAnchorPoint(0.5, 0.5);
        this.stick.runAction(cc.sequence(cc.scaleTo(0.5, 2, 40), cc.delayTime(0.5), func1, spawn, spawn2, func2));
    },

    drawStick: function() {
        var sprite = Ltc.exNode(new cc.Sprite(res.blank_png)).pos_(this.startX - 1, this.mountainHeight).addTo_(this).
            anchor_(0.5, 0).color_(STICK_COLOR).show_(false).scale_(STICK_WIDTH, 1).z_(2);
        this.stick = sprite;
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

