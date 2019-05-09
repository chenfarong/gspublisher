// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { XGame } from "./Game";

cc.Class({
  extends: cc.Component,

  properties: {
    Username: cc.EditBox,
    Password: cc.EditBox
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  ClickStart() {
    XGame.username = this.Username.string;
    XGame.password = this.Password.string;
    cc.director.loadScene("gm");
  }

  // update (dt) {},
});
