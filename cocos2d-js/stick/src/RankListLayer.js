/**
 * 游戏排行层
 */
var RankListLayer = cc.Layer.extend({
    cellNum: 0,
    tableView: null,
    vRc: null,
    list: null,
    cb: null,

    ctor: function(isNew, cb) {
        this._super();
        this.cb = cb;
        this.vRc = cc.visibleRect;
        this.init(isNew);
    },

    init: function(isNew) {
        this.list = dataMgr.worldRank.sort(function(a, b) {
            return b.highScore - a.highScore;
        });
        this.list = this.list.slice(0, 20);
        this.cellNum = this.list.length;
        var bg = Ltc.exNode(new cc.Sprite(inRes.rank_bg_png)).pos_(this.vRc.center.x, this.vRc.center.y + 100).addTo_(this);

        var size = bg.getContentSize();
        size.width -= 36;
        size.height -= 190;
        console.log(size);
        var table = new cc.TableView(this, size);
        table.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        table.x = 18;
        table.y = 114;
        table.setDelegate(this);
        // 设置tableview cell的index排列，这里设置是从上到下变大，当然也可以从下到上变大。
        table.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        bg.addChild(table);
        this.tableView = table;

        var cellBg = new cc.Sprite(inRes.rank_self_bg_png);
        Ltc.exNode(cellBg).pos_(bg.width / 2, 65).addTo_(bg);
        Ltc.exNode(new cc.Sprite(inRes.rank_self_logo_png)).pos_(30, cellBg.height / 2).addTo_(cellBg);
        Ltc.exNode(new cc.Sprite(inRes.rank_face_bg_png)).pos_(100, cellBg.height / 2).addTo_(cellBg).z_(1);

        // Ltc.loadImg(dataMgr.faceurl, function(texture) {
        //     Ltc.exNode(new cc.Sprite(texture)).pos_(100, cellBg.height / 2).addTo_(cellBg).scale_(1.3);
        // });

        var face = Ltc.exNode(new cc.Sprite(inRes.rank_default_face_jpg)).pos_(100, cellBg.height / 2).addTo_(cellBg).scale_(1.3);
        Ltc.loadImg(dataMgr.faceurl, function(texture) {
            face.setTexture(texture);
            face.setTextureRect(cc.rect(0, 0, texture.width, texture.height));
        });

        var name = Ltc.exNode(new cc.LabelTTF(dataMgr.nick, "Arial", 20)).pos_(150, 60).addTo_(cellBg).anchor_(0, 0.5).color_(cc.color(50, 50, 50));
        name.width = 100;
        Ltc.exNode(new cc.LabelTTF(dataMgr.highScore + "", "Arial", 34)).pos_(150, 24).addTo_(cellBg).anchor_(0, 0.5).color_(
            cc.color(229, 67, 85));

        if (isNew) {
            Ltc.playAudio(res.dead_mp3, false);
            var newIcon = Ltc.exNode(new cc.Sprite(inRes.rank_new_png)).pos_(230, 24).addTo_(cellBg).scale_(6);
            var func = new cc.CallFunc(function() {
                var a1 = cc.scaleBy(0.1, 1.1);
                var a2 = cc.scaleBy(0.1, 0.9);
                var seq = cc.sequence(a1, a1.clone().reverse(), a2, a2.clone().reverse(), cc.delayTime(0.5));
                newIcon.runAction(cc.repeatForever(seq));
            }.bind(this));
            newIcon.runAction(cc.sequence(cc.scaleTo(0.15, 1), func));
        }

        var titleRes = getNameTitleResByScore(dataMgr.highScore, dataMgr.isNo1());
        Ltc.exNode(new cc.Sprite(titleRes)).pos_(cellBg.width - 45, cellBg.height / 2).addTo_(cellBg);

        var btn = Ltc.sampleBtn(this, inRes.play_png, cc.p(this.vRc.center.x, this.vRc.center.y - 270), function() {
            this.removeFromParent();
            this.cb();
        }.bind(this));
        btn.setScale(0.75);
    },

    onExit: function() {
        cc.log("RankListLayer onExit");
        this._super();
    },

    scrollViewDidScroll: function(view) {},
    scrollViewDidZoom: function(view) {},

    // 单元格点击事件
    tableCellTouched: function(table, cell) {},

    // 单元格尺寸设置
    tableCellSizeForIndex: function(table, idx) {
        return cc.size(388, 90);
    },

    // 单元格索引
    tableCellAtIndex: function(table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new RankTableViewCell();
            this.addCellNodes(cell, idx);
        } else {
            cell.removeAllChildren();
            this.addCellNodes(cell, idx);
        }

        return cell;
    },

    // 单元格数量限定
    numberOfCellsInTableView: function(table) {
        return this.cellNum;
    },

    addCellNodes: function(target, idx) {
        var useInfo = this.list[idx];
        var cellBg = new cc.Sprite(inRes.rank_other_bg_png);
        Ltc.exNode(cellBg).pos_(target.width / 2, 0).addTo_(target).anchor_(0, 0);
        if (idx === 0) {
            Ltc.exNode(new cc.Sprite(inRes.rank_first_png)).pos_(30, cellBg.height / 2).addTo_(cellBg);
        } else if (idx === 1) {
            Ltc.exNode(new cc.Sprite(inRes.rank_second_png)).pos_(30, cellBg.height / 2).addTo_(cellBg);
        } else if (idx === 2) {
            Ltc.exNode(new cc.Sprite(inRes.rank_third_png)).pos_(30, cellBg.height / 2).addTo_(cellBg);
        } else {
            Ltc.exNode(new cc.LabelTTF(idx + 1, "Arial", 34)).pos_(30, cellBg.height / 2).addTo_(cellBg).color_(cc.color(229, 67, 85));
        }
        Ltc.exNode(new cc.Sprite(inRes.rank_face_bg_png)).pos_(100, cellBg.height / 2).addTo_(cellBg).z_(1);

        var face = Ltc.exNode(new cc.Sprite(inRes.rank_default_face_jpg)).pos_(100, cellBg.height / 2).addTo_(cellBg).scale_(1.3);
        Ltc.loadImg(useInfo.faceurl, function(texture) {
            face.setTexture(texture);
            face.setTextureRect(cc.rect(0, 0, texture.width, texture.height));
        });

        var name = Ltc.exNode(new cc.LabelTTF(useInfo.nick, "Arial", 20)).pos_(150, 60).addTo_(cellBg).anchor_(0, 0.5).color_(cc.color(40, 40, 40));
        name.width = 100;
        Ltc.exNode(new cc.LabelTTF(useInfo.highScore + "", "Arial", 34)).pos_(150, 24).addTo_(cellBg).anchor_(0, 0.5).color_(
            cc.color(229, 67, 85));

        var titleRes = getNameTitleResByScore(useInfo.highScore, (idx === 0));
        Ltc.exNode(new cc.Sprite(titleRes)).pos_(cellBg.width - 45, cellBg.height / 2).addTo_(cellBg);
    }
});

var RankTableViewCell = cc.TableViewCell.extend({
    draw: function(ctx) {
        this._super(ctx);
    }
});