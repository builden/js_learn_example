/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends cc.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
var MyLoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    progressBg: null,
    progress: null,
    starSprite: null,
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color.WHITE);
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 0);

        if (!cc.sys.isNative) {
            Ltc.loadImg(logoBase64, function(sprite) {
                sprite.setPosition(cc.visibleRect.center.x, cc.visibleRect.center.y + 200);
                this.addChild(sprite);
            }.bind(this));

            Ltc.loadImg(titleBase64, function(sprite) {
                sprite.setPosition(cc.visibleRect.center.x, cc.visibleRect.center.y + 40);
                sprite.scale = 0.75;
                this.addChild(sprite);
            }.bind(this));

            Ltc.exNode(new cc.LabelTTF("首次加载时间稍长，请耐心等待...", "Arial", 14)).pos_(cc.visibleRect.center.x, cc.visibleRect.center.y - 70).
                color_(cc.color(80, 80, 80)).addTo_(this);

            // progress
            Ltc.loadImg(pbgBase64, function(sprite) {
                this.progressBg = sprite;
                sprite.setPosition(cc.visibleRect.center.x, cc.visibleRect.center.y - 110);
                sprite.scale = 0.75;
                this.addChild(sprite);

                Ltc.loadImg(starBase64, function(sprite) {
                    sprite.setPosition(0, this.progressBg.height / 2);
                    this.progressBg.addChild(sprite);
                    sprite.runAction(cc.repeatForever(cc.rotateBy(1.5, 360)));
                    this.starSprite = sprite;
                }.bind(this));

                Ltc.loadImg(pppBase64, function(sprite) {
                    this.initProgress(sprite);
                }.bind(this));

            }.bind(this));
        }
        return true;
    },

    initProgress: function(sprite) {
        var progress = this.progress = new cc.ProgressTimer(sprite);
        progress.type = cc.ProgressTimer.TYPE_BAR;  // 水平进度条
        progress.minPoint = cc.p(1, 0);
        progress.setPosition(this.progressBg.width / 2, this.progressBg.height / 2);
        progress.setMidpoint(cc.p(0, 0));   // 从左起点开始
        progress.setBarChangeRate(cc.p(1, 0)); // 长度和高度变化的大小
        progress.setPercentage(0); // 当前进度
        this.progressBg.addChild(progress);
    },

    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     */
    initWithResources: function (resources, cb) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                // self._label.setString("Loading... " + percent + "%");
                if (self.progress && self.starSprite) {
                    self.starSprite.x = self.progressBg.width / 100 * percent;
                    self.progress.setPercentage(percent);
                }
                console.log("percent: " + percent);
            }, function () {
                if (self.progress && self.starSprite) {
                    self.progress.setPercentage(100);
                    self.starSprite.x = self.progressBg.width;
                }

                if (self.cb)
                    self.cb();
            });
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
MyLoaderScene.preload = function(resources, cb){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new MyLoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};