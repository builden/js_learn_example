var HelloWorldLayer = cc.Layer.extend({
  pIdx: 0,
  p: null,
  lName: null,
  ctor: function() {
    this._super();

    var size = cc.winSize;

    dataMgr.initParticleList();
    this.lName = new cc.LabelTTF('', 'Arial', '24');
    this.lName.x = size.width / 2;
    this.lName.y = size.height - 60;
    this.addChild(this.lName);

    this.listenTouchEvent();
    return true;
  },

  listenTouchEvent: function() {
    var self = this;
    this.touchListener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function(touch, event) {
        var pos = touch.getLocation();
        return true;
      },

      onTouchMoved: function(touch, event) {
        // 触摸移动的偏移量
        var delta = touch.getDelta();

        // 设置位置
        // var pos = self.star.getPosition();
        // pos.x += delta.x;
        // pos.y += delta.y;
        // self.star.setPosition(pos);
        // self.streak.setPosition(pos);
      },

      onTouchEnded: function(touch, event) {
        var pos = touch.getLocation();
        self.touchOnPos(pos);
      },

      onTouchCancelled: function(touch, event) {}
    });

    cc.eventManager.addListener(this.touchListener, this);
  },

  touchOnPos: function(pos) {
    if (this.p) {
      this.p.removeFromParent();
    }
    
    var plist = dataMgr.particleList[this.pIdx];
    var plistPath = res[plist];
    this.lName.setString(plist);
    this.p = this.addParticle(plistPath, pos.x, pos.y);
    this.pIdx++;
    if (this.pIdx === dataMgr.particleList.length) {
      this.pIdx = 0;
    }
    // $('.fullscreen.demo.modal').modal('show');
  },

  addParticle: function(xml, x, y) {
    console.log('addParticle ' + xml)
    var particleSystem = new cc.ParticleSystem(xml);
    particleSystem.x = x;
    particleSystem.y = y;
    this.addChild(particleSystem);
    return particleSystem;
  },
});

var HelloWorldScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new HelloWorldLayer();
    this.addChild(layer);
  }
});