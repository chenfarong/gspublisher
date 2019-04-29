"use strict";
cc._RF.push(module, 'ec30bQXQlNFCpahszR10Pe5', 'main');
// Script/main.js

"use strict";

var _Network = require("./Network");

//import { TipsManager } from "./TipsManager";
//const TipsManager = require("./TipsManager");

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
    netEvListener: null,
    netMsgListener: null,
    Version: cc.EditBox,
    WsHost: cc.Label,
    TxLog: cc.Label,
    NetReady: Boolean,
    CmdWait: null
  },

  // LIFE-CYCLE CALLBACKS:

  netEvent: function netEvent(event, msg) {
    //这里处理游戏来的所有事件
    /*
    if (event == XOpcodes.XC_NET_CONNECTED) {
      this.auth();
      return;
    }*/

    if (event == "GX_APP_BUILD_MSG") {
      this.TxLog.string = msg.text;
    }
    console.log("netEvent:" + JSON.stringify(msg));
  },

  netSocketEvent: function netSocketEvent(msg, target) {
    if (msg.cmd == _Network.XNetEvent.CONNECTED) {
      target.WsHost.string = _Network.XNet.ws_host;
      target.WsHost.node.color = cc.color(0, 255, 0, 100);
      target.WsHost.node.opacity = 255;
      target.NetReady = true;

      if (target.CmdWait) {
        _Network.XNet.Send(JSON.stringify(target.CmdWait));
      }
    }

    if (msg.cmd == _Network.XNetEvent.CONNECT_TIMEOUT || msg.cmd == _Network.XNetEvent.CONNECT_ERROR) {
      target.TxLog.string = "网络连接错误";
    }

    if (msg.cmd == _Network.XNetEvent.CONNECT) {
      target.TxLog.string = "连接->" + _Network.XNet.ws_host;
      cc.director.getScheduler().schedule(target.ConnectCheck, target, 6, 1, 6, false);
    }
  },

  ConnectCheck: function ConnectCheck() {
    _Network.XNet.ConnectCheck(false);
  },

  netMsgProc: function netMsgProc(msg, target) {},

  onLoad: function onLoad() {
    this.netEvListener = { callback: this.netSocketEvent, target: this };
    this.netMsgListener = { callback: this.netMsgProc, target: this };

    _Network.XNet.EarAdd(this);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECTED, this.netEvListener);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECT, this.netEvListener);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECT_ERROR, this.netEvListener);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECT_TIMEOUT, this.netEvListener);

    //XNet.Host("ws://192.168.1.99:3737/appPub");
    //XNet.Open();
  },
  start: function start() {},
  ClickBuild: function ClickBuild() {
    this.CmdWait = {
      cmd: "GX_APP_BUILD",
      ver: this.Version.string,
      app: "XX"
    };

    _Network.XNet.Close();
    _Network.XNet.Host("ws://192.168.1.99:3737/appPub");
    _Network.XNet.Open();

    //let ver = this.Version.string;
    //console.log("build..." + JSON.stringify(scmd));
    //XNet.Send(JSON.stringify(scmd));
  },
  ClickTestUpgrade: function ClickTestUpgrade() {
    _Network.XNet.Close();
    _Network.XNet.Host("ws://test.9966886699.com:3737/appPub");
    _Network.XNet.Open();
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.Version.string,
      app: "XX"
    };
  },
  ClickAuditInstall: function ClickAuditInstall() {
    _Network.XNet.Close();
    _Network.XNet.Host("ws://app.9966886699.com:3737/appPub");
    _Network.XNet.Open();
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.Version.string,
      app: "XX"
    };
  },
  ClickGameSwitchPort: function ClickGameSwitchPort() {
    //console.log("ClickGameSwitchPort");
    //TipsManager.CreateTips("现不支持");
  },
  ClickAuditPass: function ClickAuditPass() {}

  // update (dt) {},

});

cc._RF.pop();