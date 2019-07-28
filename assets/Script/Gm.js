import { XNet, XNetEvent } from "./Network";
import { XGame } from "./Game";

//import "./Config";
var AConfig = require("Config");

cc.Class({
  extends: cc.Component,

  properties: {
    Info: cc.Label,
    WsHost: cc.EditBox,
    CmdSend: cc.EditBox,
    CmdResult: cc.EditBox,
    Recv: cc.EditBox,
    LastCmdName: "", //最后发出的命令名
    RecvCount: 0,
    LabRecvCount: cc.Label,
    GmJson: { default: null, type: cc.JsonAsset },
    ScrollItem: cc.Prefab,
    ScrollCmd: cc.ScrollView
    //GmConfig: new AConfig()
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
  _onGmCmdClick(tar, cmdline, note) {
    console.log("_onGmCmdClick:" + cmdline);
    tar.CmdSend.string = cmdline;
    tar.CmdResult.string = note;
  },

  GmInsert(title, cmdline, note) {
    var item = cc.instantiate(this.ScrollItem);
    //这里是脚本组件的名字
    //item.getComponent("RankItem").init(i, playerInfo);
    let sc = item.getComponent("ScriptGmCmd");
    if (sc) {
      sc.SetData(this._onGmCmdClick, this, title, cmdline, note); //.bind(this);
    }
    this.ScrollCmd.content.addChild(item);
  },

  onLoad() {
    this.Info.string = "ud=" + XGame.username + ":" + XGame.password;

    XNet.EarAdd(this);

    /*    
    for (var i = 0; i < 20; i++) {
      var item = cc.instantiate(this.ScrollItem);
      //这里是脚本组件的名字
      //item.getComponent("RankItem").init(i, playerInfo);
      let sc = item.getComponent("ScriptGmCmd");
      if (sc) {
        sc.SetData(this._onGmCmdClick, this, "echo" + i, "echo" + i, "echo"); //.bind(this);
      }
      this.ScrollCmd.content.addChild(item);
      console.log("++:" + i.toString());
    }
*/

    cc.loader.loadRes(
      "db/gm_cmd",
      function(err, jsonAsset) {
        this.GmJson = jsonAsset;
        //console.log(JSON.stringify(jsonAsset.json));
        this._onAfterGmJsonDBLoaded();
      }.bind(this)
    );

    //this.GmConfig.LoadFromFile("db/gm_cmd", this._onAfterGmConfig, this);
    AConfig.LoadFromFile("db/gm_cmd", this._onAfterGmConfig, this);
  },

  _onAfterGmConfig(arg) {
    let v = AConfig.RowFeildValueFirstEx("ID", "10001", "NAME");
    console.log("++++++++++++++" + v);
    for (let i = 0; i < AConfig.Count(); i++) {
      let o = AConfig.RowObject(i);
      if (o) {
        arg.GmInsert(o.NAME, o.CMDLINE, o.NOTE);
      }
    }
  },

  start() {},

  _onAfterGmJsonDBLoaded() {
    if (this.GmJson) {
      //console.log(JSON.stringify(this.GmJson.json));
      if (Array.isArray(this.GmJson.json)) {
        //this.GmJson.json.forEach(function(item, index, array)
        for (let i = 0; i < this.GmJson.json.length; i++) {
          //console.log(item, index);
          let j = this.GmJson.json[i];
          console.log(JSON.stringify(j));
        }
      }
    }
  },

  // update (dt) {},

  ClickConnect() {
    if (this.WsHost.string.length < 1) {
      return;
    }
    //XNet.Close();
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
  },

  //
  ClickScrollItem() {
    //看属于行  json instanceof JSONArray
  }
});
