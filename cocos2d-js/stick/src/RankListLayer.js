/**
 * 游戏排行层
 */
var RankListLayer = cc.Layer.extend({
    cellNum: 0,
    tableView: null,
    vRc: null,

    ctor: function() {
        this._super();
        this.vRc = cc.visibleRect;
        this.init();
    },

    init: function() {
        /*        var size = this.getContentSize();
                this._rankStat = rankStat;

                if (this._rankStat === 0) {
                    this._cellNum = dataMgr.worldRankList.length;
                } else {
                    this._cellNum = dataMgr.friendRankList.length;
                }

                var tableView = new cc.TableView(this, size);
                tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
                tableView.x = 0;
                tableView.y = 0;
                tableView.setDelegate(this);
                tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
                this.addChild(tableView);
                this._tableView = tableView;*/

        this.cellNum = 10;
        var bg = Ltc.exNode(new cc.Sprite(inRes.rank_bg_png)).pos_(this.vRc.center.x, this.vRc.center.y + 100).addTo_(this);

        var size = bg.getContentSize();
        var table = new cc.TableView(this, size);
        table.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        table.x = 0;
        table.y = 0;
        table.setDelegate(this);
        table.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        bg.addChild(table);
        this.tableView = table;

        var selfBg = new cc.Sprite(inRes.rank_self_bg_png);
        Ltc.exNode(selfBg).pos_(bg.width / 2, 65).addTo_(bg);
        Ltc.exNode(new cc.Sprite(inRes.rank_self_logo_png)).pos_(30, selfBg.height / 2).addTo_(selfBg);
        Ltc.exNode(new cc.Sprite(inRes.rank_face_bg_png)).pos_(100, selfBg.height / 2).addTo_(selfBg).z_(1);

        var name = Ltc.exNode(new cc.LabelTTF(dataMgr.nick || "我看看我看看", "Arial", 20)).pos_(150, 60).addTo_(selfBg).anchor_(0, 0.5).color_(cc.color(50, 50, 50));
        name.width = 100;
        Ltc.exNode(new cc.LabelTTF(dataMgr.highScore + "", "Arial", 34)).pos_(150, 24).addTo_(selfBg).anchor_(0, 0.5).color_(
            cc.color(229, 67, 85));

        var titleRes = getNameTitleResByScore(dataMgr.highScore);
        Ltc.exNode(new cc.Sprite(titleRes)).pos_(selfBg.width - 45, selfBg.height / 2).addTo_(selfBg);

        var btn = Ltc.sampleBtn(this, inRes.play_png, cc.p(this.vRc.center.x, this.vRc.center.y - 300), function() {
            this.removeFromParent();
            Ltc.playAudio(res.kick_mp3);
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
    tableCellTouched: function(table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

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
    /*
        var userId = 0;
        var nick = "";
        var score = 0;
        var faceurl = "";
        if (this._rankStat === 0) {
            userId = dataMgr.worldRankList[idx][0];
            nick = dataMgr.worldRankList[idx][1];
            score = dataMgr.worldRankList[idx][2];
            faceurl = dataMgr.worldRankList[idx][3];
            // console.log(JSON.stringify(dataMgr.worldRankList[idx]));
        } else {
            userId = dataMgr.friendRankList[idx]._id;
            nick = dataMgr.friendRankList[idx].nick;
            score = dataMgr.friendRankList[idx].score;
            faceurl = dataMgr.friendRankList[idx].faceurl;
            // console.log(JSON.stringify(dataMgr.friendRankList[idx]));
        }


        var isSelf = false;
        if (userId === dataMgr._id) {
            isSelf = true;
        }

        var sprite = Ltc.addSpriteChild(target, (isSelf ? inRes.LaunchSortBarSelf_png : inRes.LaunchSortBar_png), 0, 0);
        sprite.anchorX = 0;
        sprite.anchorY = 0;

        var faceBg = Ltc.addSpriteChild(sprite, inRes.LaunchFaceBg_png, 140, sprite.height / 2);

        // 好友列表
        if (this._rankStat === 1 && !isSelf) {
            var sendBtn = Ltc.addBtnChild(sprite, inRes.LaunchSendHeart_png, null,
                this.getContentSize().width - 92, 22);
            sendBtn.setTouchCallback(function() {
                var friendId = dataMgr.friendRankList[arguments[0]]._id;
                dataMgr.sendStrength(friendId, function(sendcd) {
                    // cc.log("xxxxxxxx" + sendcd);
                }.bind(this));
            }.bind(this, idx));

            var sendLimit = Ltc.addSpriteChild(sprite, inRes.LaunchSendLimit_png,
                sprite.width - 60, sprite.height / 2);
            var countDown = Ltc.addLabelChild(target, "", sprite.width - 63, 84, "Arial", "16");

            this.updateSendBtn(idx, sendBtn, sendLimit, countDown);

            cc.eventManager.addCustomListener(UPDATE_SEND_COUNTDOWN, function(event) {
                var _idx = arguments[0];
                var _sendBtn = arguments[1];
                var _sendLimit = arguments[2];
                var _countDown = arguments[3];
                this.updateSendBtn(_idx, _sendBtn, _sendLimit, _countDown);
            }.bind(this, idx, sendBtn, sendLimit, countDown));
        }

        var label = Ltc.addLabelChild(target, nick, 200, sprite.height / 2 + 20, "Arial", "24");
        label.color = cc.color(40, 150, 0);
        label.anchorX = 0;
        // label.anchorY = 0;
        label = Ltc.addLabelChild(target, score.toString(), 200, sprite.height / 2 - 16, "Arial", "36");
        label.color = cc.color(40, 150, 0);
        label.anchorX = 0;

        var rankLeft = 54;
        if (idx === 0) {
            Ltc.addSpriteChild(target, inRes.LaunchSortFirst_png, rankLeft, sprite.height / 2);
        } else if (idx === 1) {
            Ltc.addSpriteChild(target, inRes.LaunchSortSecond_png, rankLeft, sprite.height / 2);
        } else if (idx === 2) {
            sp2 = Ltc.addSpriteChild(target, inRes.LaunchSortThird_png, rankLeft, sprite.height / 2);
        } else {
            label = Ltc.addLabelChild(target, idx + 1, rankLeft, sprite.height / 2, "Arial", 44);
            label.color = cc.color(40, 150, 0);
        }

        cc.loader.loadImg(faceurl, {
            isCrossOrigin: false
        }, function(err, img) {
            var texture2d = new cc.Texture2D();
            texture2d.initWithElement(img);
            texture2d.handleLoadedTexture();
            var sprite = new cc.Sprite(texture2d);
            sprite.x = this.width / 2 - 2;
            sprite.y = this.height / 2 + 4;
            sprite.scale = 1.5;
            this.addChild(sprite);
            Ltc.addSpriteChild(this, inRes.LaunchFaceBg_png, this.width / 2, this.height / 2);
        }.bind(faceBg));
*/
        console.log("draw cell");
        var selfBg = new cc.Sprite(inRes.rank_other_bg_png);
        Ltc.exNode(selfBg).pos_(target.width / 2, 65).addTo_(target).anchor_(0, 0);
        if (idx === 0) {
            Ltc.exNode(new cc.Sprite(inRes.rank_first_png)).pos_(30, selfBg.height / 2).addTo_(selfBg);
        } else if (idx === 1) {
            Ltc.exNode(new cc.Sprite(inRes.rank_second_png)).pos_(30, selfBg.height / 2).addTo_(selfBg);
        } else if (idx === 2) {
            Ltc.exNode(new cc.Sprite(inRes.rank_third_png)).pos_(30, selfBg.height / 2).addTo_(selfBg);
        } else {
            Ltc.exNode(new cc.LabelTTF(idx + 1, "Arial", 34)).pos_(30, selfBg.height / 2).addTo_(selfBg).color_(cc.color(229, 67, 85));
        }
        Ltc.exNode(new cc.Sprite(inRes.rank_face_bg_png)).pos_(100, selfBg.height / 2).addTo_(selfBg).z_(1);

        var name = Ltc.exNode(new cc.LabelTTF(dataMgr.nick || "我看看我看看", "Arial", 20)).pos_(150, 60).addTo_(selfBg).anchor_(0, 0.5).color_(cc.color(50, 50, 50));
        name.width = 100;
        Ltc.exNode(new cc.LabelTTF(dataMgr.highScore + "", "Arial", 34)).pos_(150, 24).addTo_(selfBg).anchor_(0, 0.5).color_(
            cc.color(229, 67, 85));

        var titleRes = getNameTitleResByScore(dataMgr.highScore);
        Ltc.exNode(new cc.Sprite(titleRes)).pos_(selfBg.width - 45, selfBg.height / 2).addTo_(selfBg);
    }
});

var RankTableViewCell = cc.TableViewCell.extend({
    draw: function(ctx) {
        this._super(ctx);
    }
});