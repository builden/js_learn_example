var SplitedImgMgr = cc.Class.extend({
    tex: null,
    texW: 0,
    texH: 0,
    row: 0,
    col: 0,
    intervalW: 0,   // 图片之间的间隔宽度
    intervalH: 0,
    imgOff: 4,

    /**
     * @param  {[type]} res [wholeTextureRes]
     * @param  {[type]} row [description]
     * @param  {[type]} col [description]
     * @return {[type]}     [description]
     */
    ctor: function(res, row, col) {
        this.tex = cc.textureCache.addImage(res);
        this.texW = this.tex.width;
        this.texH = this.tex.height;
        this.row = row;
        this.col = col;
        this.intervalW = parseInt(this.texW / row);
        this.intervalH = parseInt(this.texH / col);
    },

    getSprite: function(x, y) {
        var w = this.intervalW, h = this.intervalH, o = this.imgOff;
        return new cc.Sprite(this.tex,
            cc.rect(x * w + o / 2, y * h + o / 2, w - o, h - o))
    },

    getWholeSprite: function() {
        return new cc.Sprite(this.tex);
    }
});