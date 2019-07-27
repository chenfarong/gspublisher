// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    ShowText: cc.Label
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  onDestroySelf() {
    this.node.destroy();
  },

  onEnable() {
    //let sz = this.node.parent.getSize();
    let sz = cc.director.getWinSize();
    this.node.setPosition(sz.width / 2, sz.height / 2, 0);
  },

  start() {},

  setContent(text) {
    if (text) this.ShowText.string = text;
    //this.getScheduler().schedule(this.AutoRemove, this, 1, 1, 3, false);
    //this.runAction()
    //cc.director.getScheduler().schedule(this.AutoRemove, this, 1, 1, 3, false);
  },

  AutoRemove() {
    this.node.parent.removeChild(this.node);
  }

  // update (dt) {},
});
