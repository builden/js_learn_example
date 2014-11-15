var RUN_ANI = "run_ani";

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    step:0,     // 步数
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

/*        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );*/

        this.initAni();
        this.runAni();
        this.drawMontain(0, 20);
        this.drawMontain(60, 100);
        return true;
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
        var sprite = Ltc.exNode(new cc.Sprite(res.run1_png)).pos_(100, 228).addTo_(this).scale_(0.5);
        var animate = new cc.Animate(cc.animationCache.getAnimation(RUN_ANI));
        sprite.runAction(new cc.repeatForever(animate));
    },

    drawMontain: function(start, end) {
        var montain = Ltc.exNode(new cc.DrawNode()).addTo_(this);
        var clr = cc.color.WHITE;
        montain.drawRect(cc.p(start, 0), cc.p(end, 200), clr, 0, clr);
    },

    drawStick: function() {

    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

