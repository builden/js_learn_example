var HelloWorldLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();

    var size = cc.winSize;

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
        // self.addParticle(res.ghost_star_plist, pos.x, pos.y);
        $('.fullscreen.demo.modal').modal('show');
      },

      onTouchCancelled: function(touch, event) {}
    });

    cc.eventManager.addListener(this.touchListener, this);
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