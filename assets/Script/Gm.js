import { XNet, XNetEvent } from "./Network";

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

  netEvent: function(event, msg) {
    //这里处理游戏来的所有事件
    /*
    if (event == XOpcodes.XC_NET_CONNECTED) {
      this.auth();
      return;
    }*/
    let cmdline = JSON.stringify(msg);
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

  onLoad() {
    XNet.EarAdd(this);

    cc.loader.loadRes(
      "db/gm_cmd",
      function(err, jsonAsset) {
        this.GmJson = jsonAsset;
        //console.log(JSON.stringify(jsonAsset.json));
        this._onAfterGmJsonDBLoaded();
      }.bind(this)
    );
  },

  start() {},

  _onAfterGmJsonDBLoaded() {
    if (this.GmJson) {
      console.log(JSON.stringify(this.GmJson.json));
    }
  },

  // update (dt) {},

  ClickConnect() {
    if (this.WsHost.string.length < 1) {
      return;
    }
    XNet.Close();
    XNet.Host("ws://test.9966886699.com:8086/xx");
    XNet.Open();
    /*
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.Version.string,
      app: "XX"
    };
    */
  },
  ClickDisconnect() {
    XNet.Close();
  },
  //服务器连接库
  ClickWsLibrary() {},

  //发出命令
  ClickCmdSend() {
    let cmdline = this.CmdSend.string;
    console.log("cmdline:" + cmdline);
    try {
      let msg = JSON.parse(cmdline);
      this.LastCmdName = msg.cmd;
      XNet.Send(cmdline);
    } catch (e) {
      this.CmdResult.string = e.message;
    }
  }
});
