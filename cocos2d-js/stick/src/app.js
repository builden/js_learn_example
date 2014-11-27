var RUN_ANI = "run_ani";
var LIGHT_RED_COLOR = cc.color(229, 66, 85);
var BLACK_COLOR = cc.color(1, 1, 2);
var STICK_INIT_SCALEY = 0.00125;

var MainLayer = cc.Layer.extend({
    step: 0, // 步数
    stepLabel: null,
    stepBgSprite: null,
    vRc: null, // VisualRect
    mountainHeight: 0, // 山体高度
    startX: 120, // 起点位置
    maxMountainWidth: 160, // 最大山体宽度
    minMountainWidth: 12, // 最小山体宽度
    runner: null, // 猴子sprite
    stick: null, // 棍子sprite
    longerAction: null, // 变长的Action
    actionRunning: false,
    mountain1: null,
    mountain2: null,
    distance: 0, // 起点与mountain的距离
    mountainWidth: 0, // 山体宽度
    isGameOver: false,
    playLayer: null,
    tipLabel: null,
    repeatBg: null,
    repeatFrontBg: null,
    midStick: null,


    ctor: function() {
        //////////////////////////////
        // 1. super init first
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.stick_plist);

        this.vRc = cc.visibleRect;
        console.log(cc.formatStr("left {%d, %d}, bottomRight {%d, %d}",
            this.vRc.left.x, this.vRc.left.y, this.vRc.bottomRight.x, this.vRc.bottomRight.y));
        this.mountainHeight = parseInt(this.vRc.height * 0.3);
        console.log("mountain height " + this.mountainHeight);

        this.repeatBg = Ltc.addRepeatBgLayer(this, res.bg_jpg, 0.5);
        this.repeatFrontBg = Ltc.addRepeatBgLayer(this, inRes.bg_front_png, 1.5);
        this.repeatFrontBg.setBottom();

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

        Ltc.exNode(new cc.Sprite(inRes.title_png)).pos_(this.vRc.center.x, (this.vRc.top.y + this.vRc.center.y) / 2).addTo_(layer);

        if (dataMgr.isShowNewbieGuide) {
            Ltc.sampleBtn(layer, inRes.help_png, cc.p(this.vRc.bottomRight.x - 50, this.vRc.bottomRight.y + 80), function() {
                console.log("click help btn");
            }.bind(this, layer));
        }

        Ltc.sampleBtn(layer, inRes.play_png, cc.p(this.vRc.center.x, this.vRc.center.y), function() {
            layer.removeFromParent();
            Ltc.playAudio(res.kick_mp3);
            this.startGame();
        }.bind(this, layer));
    },

    startGame: function() {
        this.updateStep();
        this.addTouchListener();

        this.showTipLabel(true);
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
        this.showTipLabel(true);
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

    initAni: function() {
        var frames = [];
        frames.push(cc.spriteFrameCache.getSpriteFrame(aniRes.run1_png));
        frames.push(cc.spriteFrameCache.getSpriteFrame(aniRes.run2_png));
        frames.push(cc.spriteFrameCache.getSpriteFrame(aniRes.run1_png));
        frames.push(cc.spriteFrameCache.getSpriteFrame(aniRes.run3_png));
        var ani = new cc.Animation(frames);
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
        var panel = new cc.Sprite(inRes.settlement_bg_png);
        Ltc.exNode(panel).pos_(this.vRc.center.x, this.vRc.center.y + 80).addTo_(layer);
        Ltc.exNode(new cc.LabelTTF("Game Over", "Arial", 46)).pos_(panel.width / 2, panel.height - 80).addTo_(panel).color_(LIGHT_RED_COLOR);

        Ltc.exNode(new cc.LabelTTF("分数", "Arial", 24)).pos_(panel.width / 2, panel.height - 160).addTo_(panel).color_(BLACK_COLOR);
        Ltc.exNode(new cc.LabelTTF(this.step + "", "Arial", 38)).pos_(panel.width / 2, panel.height - 194).addTo_(panel).color_(LIGHT_RED_COLOR);
        dataMgr.tryUpdateScore(this.step);

        Ltc.exNode(new cc.LabelTTF("最佳", "Arial", 24)).pos_(panel.width / 2, panel.height - 240).addTo_(panel).color_(BLACK_COLOR);
        Ltc.exNode(new cc.LabelTTF(dataMgr.highScore + "", "Arial", 38)).pos_(panel.width / 2, panel.height - 274).addTo_(panel).color_(LIGHT_RED_COLOR);

        if (dataMgr.canShowInviteOrShare()) {
            Ltc.sampleBtn(panel, inRes.share_btn_png, cc.p(panel.width / 2, 60), function() {
                console.log("click share btn");
                shareGame();
            }.bind(this, layer));
        }

        var replayBtnPosXOffset = 0;
        var btnPosYOffset = 200;
        if (this.vRc.height < 600) {
            btnPosYOffset = 170;
        }
        if (dataMgr.isShowRank) {
            Ltc.sampleBtn(layer, inRes.rank_btn_png, cc.p(layer.width / 2 - 60, layer.height / 2 - btnPosYOffset), function() {
                console.log("click rank btn");
                arguments[0].removeFromParent();
            }.bind(this, layer));
            replayBtnPosXOffset = 60;
        }


        Ltc.sampleBtn(layer, inRes.replay_btn_png, cc.p(layer.width / 2 + replayBtnPosXOffset, layer.height / 2 - btnPosYOffset), function() {
            console.log("click replay btn");
            arguments[0].removeFromParent();
            Ltc.playAudio(res.kick_mp3);
            this.replayGame();
        }.bind(this, layer));
    },

    initRunner: function() {
        var sprite = new cc.Sprite(inRes.run1_png);
        var x = this.startX - 3;
        var y = this.mountainHeight - 2;
        Ltc.exNode(sprite).pos_(x, y).addTo_(this.playLayer).scale_(0.5).anchor_(1, 0).z_(1);
        this.runner = sprite;
    },

    drawMountain: function(pos, width) {
        var sprite = null;
        sprite = new cc.Sprite(inRes.blank_png);
        Ltc.exNode(sprite).pos_(pos, 0).
            addTo_(this.playLayer).scale_(width, this.mountainHeight).
            anchor_(0, 0);

        return sprite;
    },

    makeStickLonger: function() {
        Ltc.playAudio(res.stick_grow_loop_mp3, true);

        // 棍子变长
        var stick = this.stick;
        stick.setPosition(this.startX - 1, this.mountainHeight);
        stick.setRotation(0);
        stick.setVisible(true);
        stick.scaleX = 1;
        stick.scaleY = STICK_INIT_SCALEY;
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
            Ltc.playAudio(inRes.fall_mp3, false);
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
            this.repeatBg.pause();
            this.repeatFrontBg.pause();
            this.runner.stopAllActions();
            this.showTipLabel(false);
            if (arguments[1]) {
                this.gameOver();
            } else {
                Ltc.playAudio(res.score_mp3, false);
                this.backToStartPos(arguments[0]);
            }
        }.bind(this, distance, isOver), this);
        this.runner.runAction(cc.sequence(cc.moveBy(distance / 200, distance, 0), func));

        // 背景移动
        this.repeatBg.play();
        this.repeatFrontBg.play();
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
        var spawn = cc.spawn(cc.rotateBy(0.3, 360 * 3), cc.moveBy(0.3, 0, 140), cc.scaleTo(0.3, 0.5, 0.1));
        var spawn2 = cc.spawn(cc.rotateBy(0.1, 360 * 1), cc.moveTo(0.1, this.startX - 10, this.mountainHeight + 10), cc.scaleTo(0.1, 0.25, STICK_INIT_SCALEY));

        var func = cc.callFunc(function() {
            this.stick.setAnchorPoint(0, 0);
            Ltc.exNode(this.stick).show_(false);
            this.actionRunning = false;
        }, this);

        this.stick.x += this.distance / 2;
        this.stick.setAnchorPoint(0.5, 0.5);
        this.stick.runAction(cc.sequence(spawn, spawn2, func));
    },

    drawStick: function() {
        var sprite = null;
        if (stickTexture) {
            sprite = new cc.Sprite(stickTexture);
        } else {
            sprite = new cc.Sprite(inRes.blank_png);
        }
        Ltc.exNode(sprite).pos_(this.startX - 1, this.mountainHeight).addTo_(this).
        anchor_(0.5, 0).show_(false).scale_(1, STICK_INIT_SCALEY).z_(2);
        this.stick = sprite;
    },

    updateStep: function() {
        if (!this.stepLabel) {
            this.stepBgSprite = new cc.Sprite(inRes.score_bg_png);
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
    },

    showTipLabel: function(isShow) {
        if (!this.tipLabel) {
            var bg = this.stepBgSprite;
            this.tipLabel = Ltc.exNode(new cc.LabelTTF("将手按住屏幕")).addTo_(bg).pos_(bg.width / 2, -20).color_(BLACK_COLOR);

            Ltc.exNode(new cc.LabelTTF("使棍子变长")).addTo_(this.tipLabel).pos_(this.tipLabel.width / 2, -12).color_(BLACK_COLOR);
        }

        if (isShow) {
            this.tipLabel.setVisible(true);
        } else {
            if (this.tipLabel.isVisible) {
                this.tipLabel.setVisible(false);
            }
        }
    }
});

var MainScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});
