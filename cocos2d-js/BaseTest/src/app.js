
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
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

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 60);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        // add the label as a child to this layer
        // this.addChild(helloLabel, 5);
        helloLabel.color = cc.color(255, 125, 0);

        var clip = new cc.ClippingNode();
        var stencil = new cc.Sprite(res.GameTitle_png);
//        var stencil = new cc.DrawNode();
//        stencil.drawDot(cc.visibleRect.center, 200, cc.color(1, 1, 1, 0));
        stencil.setPosition(this.width / 2, this.height/ 2);
        // stencil.scale = 3;
        clip.setStencil(stencil);
        clip.setInverted(true);
        clip.setAlphaThreshold(0);
        this.addChild(clip, 2);

        var content = new MaskLayer(cc.color(1, 1, 1, 157));
        clip.addChild(content);

        console.log(clip.getBoundingBox());



        // helloLabel.runAction(
        //     cc.spawn(
        //         cc.moveBy(2.5, cc.p(0, size.height - 40)),
        //         cc.tintTo(2.5,255,125,0)
        //     )
        // );
        return true;
    },

    clippingTest: function() {

    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

