
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

        var texture = cc.textureCache.addImage(res.GameTest_png);
        var w = texture.width / 4;
        var h = texture.height / 5;
        console.log("text " + w + " " + h);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 5; j++) {
                var rc = cc.rect(i * w, j * h, w - 4, h - 4);
                Ltc.exNode(new cc.Sprite(texture, rc)).addTo_(this).pos_(i * w, (5 - j) * h);
            }
        }

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

