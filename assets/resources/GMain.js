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
    TryTick: 0,
    Loading: cc.Prefab
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

  createLoading() {
    var n = cc.instantiate(this.Loading);
    if (n) {
      // let tipsCtrl = n.getComponent("TipsCtrl");
      // if (content && tipsCtrl) {
      //   tipsCtrl.setContent(content);
      // }
      let sz = cc.director.getWinSize();
      n.setPosition(sz.width / 2, sz.height / 2, 0);
      n.parent = cc.director.getScene();
      n.name = "loading";
    }
  },
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.createLoading();
    //var loading = cc.instantiate(Loading);
    //cc.director.getScene().addChild(loading);
  },

  start() {
    this.TryTick = 1;
    XGame.Where(this.cbWhere, this, this.TryTick);
  },

  cbWhere: function(who, response) {
    //    console.log(response);
    //    console.log(typeof who);
    who.TryTick++;
    //    console.log(who.TryTick);
    if (response == null) {
      XGame.Where(who.cbWhere, who.TryTick);
    } else {
      //进行热更新判断
      XNet.dispatchXNet("GX_WHERE_R", response);

      who.WhereAfter();
    }
  },

  WhereAfter: function() {
    let v = cc.find("loading/ShowText", cc.director.getScene());
    if (v != null) {
      let showText = v.getComponent(cc.Label);
      if (showText != null) {
        showText.string = "成功获取游戏服务器位置";
      }
    }
    //console.log("222", JSON.stringify(XGame.whereResult));
    if (XGame.whereResult.rc != 0) {
      //中部一直显示文本内容
    } else {
      XGame.Version(this.cbUpgrade, this);
    }
  },

  //
  cbUpgrade: function(who, response) {
    //如果返回要求升级JS代码部分
  }

  // update (dt) {},
});
