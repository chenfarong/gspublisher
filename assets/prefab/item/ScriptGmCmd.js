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
    Name: cc.Label
    //    Cmdline: "",
    //    Note: ""
  },

  // LIFE-CYCLE CALLBACKS:

  SetData(callback, target, title, cmdline, note) {
    this.Target = target;
    this.Callback = callback;
    this.Name.string = title;
    this.Cmdline = cmdline;
    this.Note = note;
  },

  // onLoad () {},
  Click() {
    if (this.Callback) {
      this.Callback(this.Target, this.Cmdline, this.Note);
    }
  },

  start() {}

  // update (dt) {},
});