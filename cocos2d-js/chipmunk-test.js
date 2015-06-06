var SPRITE_WIDTH = 100;
var SPRITE_HEIGHT = 100;
var DEBUG_NODE_SHOW = true;
var BODY_RES = '#dice-action/dice_1.png';

var CPTestLayer = cc.Layer.extend({
  space: null,
  sprites: null,
  ctor: function() {
    this._super();

    this.sprites = [];
    Ltc.addSpriteFrameCache(res.dice_plist);
    this.flag = 0;

    var diceActNames = Ltc.createSeqFrameFileList('dice-action/dice_Action_', 0, 4, 1);
    Ltc.createAnimationCache('DICE_ACT', diceActNames, 0.1, true);

    this.initPhysics();
    this.scheduleUpdate();
    return true;
  },
  initPhysics: function() {
    var size = cc.winSize;
    var space = this.space = new cp.Space();
    this.setupDebugNode();

    space.gravity = cp.v(0, 0); // -100表示沿着y轴重力向下
    // space.sleepTimeThreshold = 0.5; // 休眠临界时间
    // space.collisionSlop = 0.5;
    var staticBody = space.staticBody;

    // 设置空间边界，由线段组成的矩形
    var segW = 20;
    var wall = [
      new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(size.width, 0), segW), // 第四个参数是线段宽度
      new cp.SegmentShape(staticBody, cp.v(0, size.height / 2), cp.v(size.width, size.height / 2), segW),
      new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(0, size.height / 2), segW),
      new cp.SegmentShape(staticBody, cp.v(size.width, 0), cp.v(size.width, size.height / 2), segW)
    ];
    wall.forEach(function(shape) {
      shape.setElasticity(0.8); // 弹性系数为1
      shape.setFriction(2); // 摩擦系数为1
      space.addStaticShape(shape); // 把shape加到space中
    }, this);

    // 实心圆
  /*  var shape = new cp.CircleShape(staticBody, 300, cp.v(size.width / 2, size.height / 2));
    shape.setElasticity(0.8);
    shape.setFriction(1);
    space.addStaticShape(shape);*/

    // 多边形，组成的也是一个实心
/*    var vecs = [
      0, 0,
      0, size.height / 2,
      size.width - 100, size.height / 2,
      size.width  - 100, 0
    ];

    var shape = new cp.PolyShape(staticBody, vecs, cp.v(50, 50));
    shape.setElasticity(0.8);
    shape.setFriction(1);
    space.addStaticShape(shape);*/

    // 同样是实心
/*    var shape = new cp.BoxShape(staticBody, 400, 400);
    shape.setElasticity(0.8);
    shape.setFriction(1);
    space.addStaticShape(shape);*/
  },

  addNewSpriteAtPosition: function(p) {
    // 第一个参数质量，第二个参数惯性值
    var body = new cp.Body(1, cp.momentForBox(1, SPRITE_WIDTH, SPRITE_HEIGHT));
    body.setPos(p); // 设置物体重心
    this.space.addBody(body);

    var shape = new cp.BoxShape(body, SPRITE_WIDTH, SPRITE_HEIGHT);
    // var shape = new cp.CircleShape(body, SPRITE_WIDTH / 2, 0);
    shape.setElasticity(0.8);
    shape.setFriction(1);
    this.space.addShape(shape);

    var sprite = new cc.PhysicsSprite(BODY_RES);
    sprite.setBody(body);
    sprite.setPosition(cc.p(p.x, p.y));
    this.sprites.push(sprite);
    this.addChild(sprite);

    var diceAct = Ltc.createAnimateActionFromCache('DICE_ACT');
    // sprite.runAction(cc.repeatForever(diceAct));
  },

  update: function(dt) {
    // console.log(dt);
    var timeStep = 0.03;
    this.space.step(timeStep);
  },

  setupDebugNode: function() {
    this._debugNode = new cc.PhysicsDebugNode(this.space);
    this._debugNode.visible = DEBUG_NODE_SHOW;
    this.addChild(this._debugNode);
  },

  onEnter: function() {
    this._super();
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: this.onTouchBegan.bind(this),
      onTouchMoved: this.onTouchMoved.bind(this),
      onTouchEnded: this.onTouchEnded
    }, this);
  },

  onTouchBegan: function(touch, event) {
    var target = event.getCurrentTarget();
    var location = touch.getLocation();
    var sprite = this.touchOnBody(location);
    if (sprite) {
      var body = sprite.getBody();
      this.curSprite = sprite;
      body.setVel(cp.v(2000, 0));
      // body.setAngVel(5);
      this.flag++;
      // if (this.flag % 2 === 0)
        // body.sleep();
      // body.applyForce(100, 4);
    } else {
      target.addNewSpriteAtPosition(location);
    }
    return true;
  },

  touchOnBody: function(p) {
    for (var i = 0, len = this.sprites.length; i < len; i++) {
      var sprite = this.sprites[i];
      if (cc.rectContainsPoint(sprite.getBoundingBox(), cc.p(p.x, p.y))) {
        return sprite;
      }
    }
    return null;
  },

  onTouchMoved: function(touch, event) {
    var p = touch.getLocation();
    // this.curBody && this.curBody.setPosition(cc.p(p.x, p.y));
  },

  onTouchEnded: function(touch, event) {
    this.curSprite = null;
  },

  onExit: function() {
    cc.eventManager.removeListener(cc.EventListener.TOUCH_ONE_BY_ONE);
  }
});

var CPScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new CPTestLayer();
    this.addChild(layer);
  }
});