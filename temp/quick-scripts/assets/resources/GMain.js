(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/GMain.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04eb4hVhTJB+oLGVnCuAdiX', 'GMain', __filename);
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
    //console.log("222", JSON.stringify(XGame.whereResult));
    if (_Game.XGame.whereResult.rc != 0) {
      //中部一直显示文本内容
    } else {
      _Game.XGame.Version(this.cbUpgrade, this);
    }
  },

  //
  cbUpgrade: function cbUpgrade(who, response) {}
  //如果返回要求升级JS代码部分


  // update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GMain.js.map
        