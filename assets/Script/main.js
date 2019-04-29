import { XNet, XNetEvent } from "./Network";

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

  netEvent: function(event, msg) {
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

  netSocketEvent: function(msg, target) {
    if (msg.cmd == XNetEvent.CONNECTED) {
      target.WsHost.string = XNet.ws_host;
      target.WsHost.node.color = cc.color(0, 255, 0, 100);
      target.WsHost.node.opacity = 255;
      target.NetReady = true;

      if (target.CmdWait) {
        XNet.Send(JSON.stringify(target.CmdWait));
      }
    }

    if (
      msg.cmd == XNetEvent.CONNECT_TIMEOUT ||
      msg.cmd == XNetEvent.CONNECT_ERROR
    ) {
      target.TxLog.string = "网络连接错误";
    }

    if (msg.cmd == XNetEvent.CONNECT) {
      target.TxLog.string = "连接->" + XNet.ws_host;
      cc.director
        .getScheduler()
        .schedule(target.ConnectCheck, target, 6, 1, 6, false);
    }
  },

  ConnectCheck: function() {
    XNet.ConnectCheck(false);
  },

  netMsgProc: function(msg, target) {},

  onLoad() {
    this.netEvListener = { callback: this.netSocketEvent, target: this };
    this.netMsgListener = { callback: this.netMsgProc, target: this };

    XNet.EarAdd(this);
    XNet.ListenerAdd(XNetEvent.CONNECTED, this.netEvListener);
    XNet.ListenerAdd(XNetEvent.CONNECT, this.netEvListener);
    XNet.ListenerAdd(XNetEvent.CONNECT_ERROR, this.netEvListener);
    XNet.ListenerAdd(XNetEvent.CONNECT_TIMEOUT, this.netEvListener);

    //XNet.Host("ws://192.168.1.99:3737/appPub");
    //XNet.Open();
  },

  start() {},

  ClickBuild() {
    this.CmdWait = {
      cmd: "GX_APP_BUILD",
      ver: this.Version.string,
      app: "XX"
    };

    XNet.Close();
    XNet.Host("ws://192.168.1.99:3737/appPub");
    XNet.Open();

    //let ver = this.Version.string;
    //console.log("build..." + JSON.stringify(scmd));
    //XNet.Send(JSON.stringify(scmd));
  },

  ClickTestUpgrade() {
    XNet.Close();
    XNet.Host("ws://test.9966886699.com:3737/appPub");
    XNet.Open();
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.Version.string,
      app: "XX"
    };
  },

  ClickAuditInstall() {
    XNet.Close();
    XNet.Host("ws://app.9966886699.com:3737/appPub");
    XNet.Open();
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.Version.string,
      app: "XX"
    };
  },

  ClickGameSwitchPort() {
    //console.log("ClickGameSwitchPort");
    //TipsManager.CreateTips("现不支持");
  },

  ClickAuditPass() {}

  // update (dt) {},
});
