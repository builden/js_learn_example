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
     * 设置控件位置
     * @param  {[type]} newPosOrxValue cc.p(x, y) or x
     * @param  {[type]} yValue         [description]
     * @return {[type]}                [description]
     */
    node.pos_ = function(newPosOrxValue, yValue) {
        node.setPosition(newPosOrxValue, yValue);
        return node;
    }

    node.scale_ = function(x, y) {
        node.setScale(x, y);
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

    node.flipY_ = function(flippedY) {
        node.setFlippedY(flippedY);
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
     * 设置透明度
     * @param  {[type]} opacity [0 - 255]
     * @return {[type]}         [description]
     */
    node.opacity_ = function(opacity) {
        node.setOpacity(opacity);
        return node;
    }

    node.clr_ = function(color) {
        return node;
    }
    return node;
}
