"use strict";
cc._RF.push(module, '04eb4hVhTJB+oLGVnCuAdiX', 'GMain');
// resources/GMain.js

"use strict";

var _Game = require("./Game");

var _Network = require("./Network");

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

  createLoading: function createLoading() {
    var n = cc.instantiate(this.Loading);
    if (n) {
      // let tipsCtrl = n.getComponent("TipsCtrl");
      // if (content && tipsCtrl) {
      //   tipsCtrl.setContent(content);
      // }
      var sz = cc.director.getWinSize();
      n.setPosition(sz.width / 2, sz.height / 2, 0);
      n.parent = cc.director.getScene();
      n.name = "loading";
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    this.createLoading();
    //var loading = cc.instantiate(Loading);
    //cc.director.getScene().addChild(loading);
  },
  start: function start() {
    this.TryTick = 1;
    _Game.XGame.Where(this.cbWhere, this, this.TryTick);
  },


  cbWhere: function cbWhere(who, response) {
    //    console.log(response);
    //    console.log(typeof who);
    who.TryTick++;
    //    console.log(who.TryTick);
    if (response == null) {
      _Game.XGame.Where(who.cbWhere, who.TryTick);
    } else {
      //进行热更新判断
      _Network.XNet.dispatchXNet("GX_WHERE_R", response);

      who.WhereAfter();
    }
  },

  WhereAfter: function WhereAfter() {
    var v = cc.find("loading/ShowText", cc.director.getScene());
    if (v != null) {
      var showText = v.getComponent(cc.Label);
      if (showText != null) {
        showText.string = "成功获取游戏服务器位置";
      }
    }
  },

  //
  cbUpgrade: function cbUpgrade(who, response) {}

  // update (dt) {},
});

cc._RF.pop();