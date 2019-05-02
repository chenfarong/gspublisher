"use strict";
cc._RF.push(module, '78315SGwBJA5aCdosZBC7sg', 'Gm');
// Script/Gm.js

"use strict";

var _Network = require("./Network");

cc.Class({
  extends: cc.Component,

  properties: {
    WsHost: cc.EditBox,
    CmdSend: cc.EditBox,
    CmdResult: cc.EditBox,
    Recv: cc.EditBox,
    LastCmdName: "", //最后发出的命令名
    RecvCount: 0,
    LabRecvCount: cc.Label,
    GmJson: { default: null, type: cc.JsonAsset }
  },

  netEvent: function netEvent(event, msg) {
    //这里处理游戏来的所有事件
    /*
    if (event == XOpcodes.XC_NET_CONNECTED) {
      this.auth();
      return;
    }*/
    var cmdline = JSON.stringify(msg);
    if (event == "GX_APP_BUILD_MSG") {
      this.TxLog.string = msg.text;
    }
    console.log("netEvent:" + JSON.stringify(msg));
    if (msg.cmd === this.LastCmdName + "_R") {
      this.CmdResult.string = cmdline;
    }

    this.Recv.string = cmdline;
    this.RecvCount++;
    this.LabRecvCount.string = "接收数据:" + this.RecvCount.toString();
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    _Network.XNet.EarAdd(this);

    cc.loader.loadRes("db/gm_cmd", function (err, jsonAsset) {
      this.GmJson = jsonAsset;
      //console.log(JSON.stringify(jsonAsset.json));
      this._onAfterGmJsonDBLoaded();
    }.bind(this));
  },
  start: function start() {},
  _onAfterGmJsonDBLoaded: function _onAfterGmJsonDBLoaded() {
    if (this.GmJson) {
      console.log(JSON.stringify(this.GmJson.json));
    }
  },


  // update (dt) {},

  ClickConnect: function ClickConnect() {
    if (this.WsHost.string.length < 1) {
      return;
    }
    _Network.XNet.Close();
    _Network.XNet.Host("ws://test.9966886699.com:8086/xx");
    _Network.XNet.Open();
    /*
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.Version.string,
      app: "XX"
    };
    */
  },
  ClickDisconnect: function ClickDisconnect() {
    _Network.XNet.Close();
  },

  //服务器连接库
  ClickWsLibrary: function ClickWsLibrary() {},


  //发出命令
  ClickCmdSend: function ClickCmdSend() {
    var cmdline = this.CmdSend.string;
    console.log("cmdline:" + cmdline);
    try {
      var msg = JSON.parse(cmdline);
      this.LastCmdName = msg.cmd;
      _Network.XNet.Send(cmdline);
    } catch (e) {
      this.CmdResult.string = e.message;
    }
  }
});

cc._RF.pop();