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
import { XNet } from "./Network";

cc.Class({
  extends: cc.Component,

  properties: {
    TryTick: 0
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {
    this.TryTick = 1;
    XGame.Where(this.cbWhere, this, this.TryTick);
  },

  cbWhere: function(who, response) {
    console.log(response);
    console.log(typeof who);
    who.TryTick++;
    console.log(who.TryTick);
    if (response == null) {
      XGame.Where(who.cbWhere, who.TryTick);
    } else {
      //进行热更新判断
      XNet.dispatchXNet("GX_WHERE_R", response);
    }
  },

  //
  cbUpgrade: function(who, response) {}

  // update (dt) {},
});
