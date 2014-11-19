var RUN_ANI = "run_ani";
var STICK_WIDTH = 4;
var STICK_COLOR = cc.color(124, 78, 31);
var LIGHT_RED_COLOR = cc.color(229, 66, 85);

var MainLayer = cc.Layer.extend({
    step:0,     // 步数
    stepLabel: null,
    stepBgSprite: null,
    vRc: null,  // VisualRect
    mountainHeight: 0, // 山体高度
    startX: 120, // 起点位置
    maxMountainWidth: 160,  // 最大山体宽度
    minMountainWidth: 10,    // 最小山体宽度
    runner:null, // 猴子sprite
    stick: null, // 棍子sprite
    longerAction: null, // 边长的Action
    actionRunning: false,
    mountain1: null,
    mountain2: null,
    distance: 0,         // 起点与mountain的距离
    mountainWidth: 0,   // 山体宽度
    isGameOver: false,
    playLayer: null,


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

        this.playLayer = new cc.Layer();
        this.addChild(this.playLayer);

        this.initAni();
        this.initRunner();

        var initWidth = 120;
        this.mountain1 = this.drawMountain(this.startX - initWidth, initWidth);
        this.mountainWidth = 100;
        this.distance = 100;
        this.mountain2 = this.drawMountain(this.startX + this.distance, this.mountainWidth);
        this.drawStick();

        this.showStartPanel();
        return true;
    },

    showStartPanel: function() {
        var layer = new cc.Layer();
        this.addChild(layer);

        Ltc.exNode(new cc.Sprite(res.title_png)).pos_(this.vRc.center.x, (this.vRc.top.y + this.vRc.center.y) / 2).addTo_(layer);

        Ltc.sampleBtn(layer, res.help_png, cc.p(this.vRc.bottomRight.x - 50, this.vRc.bottomRight.y + 80), function() {
            console.log("click help btn");
//            layer.removeFromParent();
//            this.startGame();
        }.bind(this, layer));

        Ltc.sampleBtn(layer, res.play_png, cc.p(this.vRc.center.x, this.vRc.center.y), function() {
            layer.removeFromParent();
            this.startGame();
        }.bind(this, layer));
    },

    startGame: function() {
        this.updateStep();
        this.addTouchListener();
    },

    replayGame: function() {
        var initWidth = 120;
        this.step = 0;
        this.updateStep();
        this.playLayer.setPosition(0, 0);
        this.stepBgSprite.setVisible(true);
        this.mountain1.removeFromParent();
        this.mountain1 = this.drawMountain(this.startX - initWidth, initWidth);
        this.mountainWidth = 100;
        this.distance = 100;
        this.mountain2.removeFromParent();
        this.mountain2 = this.drawMountain(this.startX + this.distance, this.mountainWidth);

        this.runner.setPosition(this.startX - 3 - this.playLayer.x, this.mountainHeight - 2);
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
        var aniTime = 0.3;
        this.runner.runAction(cc.moveBy(aniTime, 0, -1 * (this.mountainHeight + 60)).easing(cc.easeIn(3.0)));
        var func = cc.callFunc(function() {
            var gameOverFunc = cc.callFunc(function() {
                this.actionRunning = false;
                this.showSettlementPanel();
            }, this);
            var moveAct1 = cc.moveBy(0.1, 0, 5);
            var moveAct2 = cc.moveBy(0.1, 0, 5);
            var moveAct3 = cc.moveBy(0.1, 0, 3);
            this.runAction(cc.sequence(moveAct1, moveAct1.reverse(), moveAct2, moveAct2.reverse(), moveAct3, moveAct3.reverse(), gameOverFunc));
            this.isGameOver = true;
            this.stick.setVisible(false);
            Ltc.playAudio(res.dead_mp3, false);
        }, this);
        this.stick.runAction(cc.sequence(cc.rotateBy(aniTime, 90).easing(cc.easeIn(3.0)), func));
    },

    showSettlementPanel: function() {
        this.stepBgSprite.setVisible(false);
        var layer = Ltc.addMaskLayer(this);
        var panel = new cc.Sprite(res.settlement_bg_png);
        Ltc.exNode(panel).pos_(this.vRc.center.x, this.vRc.center.y + 80).addTo_(layer);
        Ltc.exNode(new cc.LabelTTF("Game Over", "Arial", 46)).pos_(panel.width / 2, panel.height - 80).addTo_(panel).color_(LIGHT_RED_COLOR);

        Ltc.exNode(new cc.LabelTTF("分数", "Arial", 24)).pos_(panel.width / 2, panel.height - 160).addTo_(panel).color_(cc.color.BLACK);
        Ltc.exNode(new cc.LabelTTF(this.step + "", "Arial", 38)).pos_(panel.width / 2, panel.height - 194).addTo_(panel).color_(LIGHT_RED_COLOR);
        dataMgr.tryUpdateScore(this.step);

        Ltc.exNode(new cc.LabelTTF("最佳", "Arial", 24)).pos_(panel.width / 2, panel.height - 240).addTo_(panel).color_(cc.color.BLACK);
        Ltc.exNode(new cc.LabelTTF(dataMgr.highScore + "", "Arial", 38)).pos_(panel.width / 2, panel.height - 274).addTo_(panel).color_(LIGHT_RED_COLOR);

        Ltc.sampleBtn(panel, res.share_btn_png, cc.p(panel.width / 2, 60), function() {
            console.log("click share btn");
        }.bind(this, layer));

        Ltc.sampleBtn(layer, res.rank_btn_png, cc.p(layer.width / 2 - 60, layer.height / 2 - 200), function() {
            console.log("click rank btn");
            arguments[0].removeFromParent();
        }.bind(this, layer));

        Ltc.sampleBtn(layer, res.replay_btn_png, cc.p(layer.width / 2 + 60, layer.height / 2 - 200), function() {
            console.log("click replay btn");
            arguments[0].removeFromParent();
            this.replayGame();
        }.bind(this, layer));
    },

    initRunner: function() {
        var sprite = new cc.Sprite(res.run1_png);
        var x = this.startX - 3;
        var y = this.mountainHeight - 2;
        Ltc.exNode(sprite).pos_(x, y).addTo_(this.playLayer).scale_(0.5).anchor_(1, 0).z_(1);
        this.runner = sprite;
    },

    drawMountain: function(pos, width) {
        var sprite = Ltc.exNode(new cc.Sprite(res.blank_png)).pos_(pos, 0).
            addTo_(this.playLayer).scale_(width, this.mountainHeight).
            anchor_(0, 0).color_(STICK_COLOR);

        return sprite;
    },

    makeStickLonger: function() {
        Ltc.playAudio(res.stick_grow_loop_mp3, true);

        // 棍子变长
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
        Ltc.stopAllAudio();
        // 棍子横过来
        var actTime = 0.6;
        this.longerAction.stop();
        var rotate = cc.rotateBy(actTime, 90).easing(cc.easeIn(3.0));
        var func = cc.callFunc(function() {
            var stickLen = this.stick.height * this.stick.scaleY - 1;
            console.log("stop height " + this.stick.height + "; sclayY " + this.stick.scaleY);
            console.log("stick long " + stickLen + "; distance " + this.distance + "; mountain width " + this.mountainWidth);
            Ltc.playAudio(res.fall_mp3, false);
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
        // running 跑动
        console.log("doRun " + distance);
        var animate = new cc.Animate(cc.animationCache.getAnimation(RUN_ANI));
        this.runner.runAction(cc.repeatForever(animate));
        var func = cc.callFunc(function() {
            this.runner.stopAllActions();
            if (arguments[1]) {
                this.gameOver();
            } else {
                Ltc.playAudio(res.score_mp3, false);
                this.backToStartPos(arguments[0]);
            }
        }.bind(this, distance, isOver), this);
        this.runner.runAction(cc.sequence(cc.moveBy(distance / 200, distance, 0), func));

        // TODO: 背景移动
    },

    backToStartPos: function(distance) {
        // 更新分数
        this.step += 1;
        this.updateStep();

        var backTime = 0.4;
        var moveAct = cc.moveBy(backTime, -1 * distance, 0);
        this.playLayer.runAction(moveAct);

        this.mountainWidth = Ltc.random(this.minMountainWidth, this.maxMountainWidth);
        var tmp = this.drawMountain(this.vRc.width - this.playLayer.x + distance, this.mountainWidth);
        var tmpFunc = cc.callFunc(function() {
            this.mountain1.removeFromParent();
            this.mountain1 = this.mountain2;
            this.mountain2 = arguments[0];
        }.bind(this, tmp), this);
        this.distance = Ltc.random(6, this.vRc.width - this.startX - this.mountainWidth);
        tmp.runAction(cc.sequence(cc.moveBy(backTime, -1 * (this.vRc.width - this.startX - this.distance), 0), tmpFunc));

        // 棍子收缩
        var spawn = cc.spawn(cc.rotateBy(0.3, 360 * 3), cc.moveBy(0.3, 0, 140), cc.scaleTo(0.3, 2, 40));
        var spawn2 = cc.spawn(cc.rotateBy(0.1, 360 * 1), cc.moveTo(0.1, this.startX - 10, this.mountainHeight + 10), cc.scaleTo(0.1, 1, 1));

        var func1 = cc.callFunc(function() {

        }, this.stick);

        var func2 = cc.callFunc(function() {
            this.stick.setAnchorPoint(0, 0);
            Ltc.exNode(this.stick).show_(false);
            this.actionRunning = false;
        }, this);

        this.stick.x += this.distance / 2;
        this.stick.setAnchorPoint(0.5, 0.5);
        this.stick.runAction(cc.sequence(spawn, spawn2, func2));
    },

    drawStick: function() {
        var sprite = Ltc.exNode(new cc.Sprite(res.blank_png)).pos_(this.startX - 1, this.mountainHeight).addTo_(this).
            anchor_(0.5, 0).color_(STICK_COLOR).show_(false).scale_(STICK_WIDTH, 1).z_(2);
        this.stick = sprite;
    },

    updateStep: function() {
        if (!this.stepLabel) {
            this.stepBgSprite = new cc.Sprite(res.score_bg_png);
            this.stepBgSprite.setPosition(this.vRc.center.x, this.vRc.top.y - 100);
            this.addChild(this.stepBgSprite);
            this.stepLabel = new cc.LabelTTF(this.step + "", "Arial", 40);
            this.stepLabel.setPosition(this.stepBgSprite.width / 2, this.stepBgSprite.height / 2);
            this.stepBgSprite.addChild(this.stepLabel);
        } else {
            this.stepLabel.setString(this.step + "");
            var scaleAct = cc.scaleBy(0.15, 1.3).easing(cc.easeIn(3.0));
            // var scaleAct2 = cc.scaleBy(0.1, 1.1);
            this.stepLabel.runAction(cc.sequence(scaleAct, scaleAct.reverse()));
        }
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

