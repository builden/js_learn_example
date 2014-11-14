/**
 * for cocos 方法扩展
 */

var Ltc = Ltc || {};

Ltc.exNode = function(node) {
    node.addTo_ = function(parent, z, t) {
        parent.addChild(node, z || 0, t || 0);
        return node;
    }

    /**
     * 是否显示控件
     * @param  {[Boolean]} visible [description]
     * @return {[type]}         [description]
     */
    node.show_ = function(visible) {
        node.setVisible(visible);
        return node;
    }

    /**
     * 设置控件位置
     * @param  {[type]} newPosOrxValue cc.p(x, y) or x
     * @param  {[type]} yValue         [description]
     * @return {[type]}                [description]
     */
    node.pos_ = function(newPosOrxValue, yValue) {
        node.setPosition(newPosOrxValue, yValue);
        return node;
    }

    /**
     * 设置锚点(默认是cc.p(0.5, 0.5))
     * @param  {cc.p||Number} point [description]
     * @param  {Number} y     [y] [0.0 - 1.0]
     * @return {[type]}       [description]
     */
    node.anchor_ = function(point, y) {
        node.setAnchorPoint(point, y);
        return node;
    }

    /**
     * 设置ZOrder
     * @param  {Number} z 默认是0，数字越小，越在下面
     * @return {[type]}   [description]
     */
    node.z_ = function(z) {
        node.setZOrder(z);
        return node;
    }

    /**
     * node的tag值
     * @param  {[type]} tag [description]
     * @return {[type]}     [description]
     */
    node.tag_ = function(tag) {
        node.setTag(tag);
        return node;
    }

    /**
     * 缩放
     * @param  {Number} scale  scale or scaleX value
     * @param  {Number} scaleY [scaleY=]
     * @return {[type]}        [description]
     */
    node.scale_ = function(scale, scaleY) {
        node.setScale(scale, scaleY);
        return node;
    }

    /**
     * 水平翻转
     * @param  {[Boolean]} flippedX [是否翻转]
     * @return {[type]}          [description]
     */
    node.flipX_ = function(flippedX) {
        node.setFlippedX(flippedX);
        return node;
    }

    /**
     * 垂直翻转
     * @param  {[type]} flippedY [description]
     * @return {[type]}          [description]
     */
    node.flipY_ = function(flippedY) {
        node.setFlippedY(flippedY);
        return node;
    }

    /**
     * 设置透明度
     * @param  {[type]} opacity [0 - 255]
     * @return {[type]}         [description]
     */
    node.opacity_ = function(opacity) {
        node.setOpacity(opacity);
        return node;
    }

    /**
     * [color_ description]
     * @param  {cc.color} color [description]
     * @return {[type]}       [description]
     * @note   只支持cc.color(r, g, b); 不支持透明，透明请使用opacity
     */
    node.color_ = function(color) {
        node.setColor(color);
        return node;
    }

    /**
     * 旋转
     * @param  {Number} newRotation 度数[0 - 359]，默认的角度
     * @return {[type]}             [description]
     */
    node.rotation_ = function(newRotation) {
        node.setRotation(newRotation);
        return node;
    }

    /**
     * [rotationX_ description]
     * @param  {[type]} rotationX [description]
     * @return {[type]}           [description]
     */
    node.rotationX_ = function(rotationX) {
        node.setRotationX(rotationX);
        return node;
    }

    node.rotationY_ = function(rotationY) {
        node.setRotationY(rotationY);
        return node;
    }

    /**
     * 倾斜、扭曲
     * @param  {Number} newSkewX [description]
     * @return {[type]}          [description]
     */
    node.skewX_ = function(newSkewX) {
        node.setSkewX(newSkewX);
        return node;
    }

    node.skewY_ = function(newSkewY) {
        node.setSkewY(newSkewY);
        return node;
    }

    return node;
}

/**
 * 蒙板层
 * @return {[type]}         [description]
 */
var MaskLayer = cc.LayerColor.extend({
    touchListener: null,
    ctor: function(color) {
        this._super(color);
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    },

    onExit: function() {
        cc.log("layer onExit");
        cc.eventManager.removeListener(this.touchListener);
        this._super();
    }
});

/**
 * 增加半透模版层，屏蔽touch事件
 * @param {cc.node}   target
 * @param {cc.color}  color
 * @returns {MaskLayer}
 */
Ltc.addMaskLayer = function(target, color) {
    var maskColor = color || cc.color(0, 0, 0, 40);
    var layer = new MaskLayer(maskColor);
    target.addChild(layer);
    return layer;
};