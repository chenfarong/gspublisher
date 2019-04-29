"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

"use strict";

var _Network = require("./Network");

//import { TipsManager } from "./TipsManager";

cc.Class({
  extends: cc.Component,

  properties: {
    label: {
      default: null,
      type: cc.Label
    },
    labXhr: cc.Label,
    NetReady: false,
    appVer: cc.EditBox,
    netEvListener: null,
    netMsgListener: null,
    CmdWait: null,
    // defaults, set visually when attaching this script to the Canvas
    text: "准备就绪",
    tipsPrefab: cc.Prefab
  },

  netEvent: function netEvent(event, msg) {
    //这里处理游戏来的所有事件
    if (event == "GX_APP_BUILD_MSG") {
      this.label.string = msg.text;
    }
    console.log("netEvent:" + JSON.stringify(msg));
  },

  netSocketEvent: function netSocketEvent(msg, target) {
    if (msg.cmd == _Network.XNetEvent.CONNECTED) {
      //      target.WsHost.string = XNet.ws_host;
      //      target.WsHost.node.color = cc.color(0, 255, 0, 100);
      //      target.WsHost.node.opacity = 255;
      target.NetReady = true;

      if (target.CmdWait) {
        _Network.XNet.Send(JSON.stringify(target.CmdWait));
      }
    }

    if (msg.cmd == _Network.XNetEvent.CONNECT_TIMEOUT || msg.cmd == _Network.XNetEvent.CONNECT_ERROR) {
      target.label.string = "网络连接错误";
    }

    if (msg.cmd == _Network.XNetEvent.CONNECT) {
      target.label.string = "连接->" + _Network.XNet.ws_host;
      cc.director.getScheduler().schedule(target.ConnectCheck, target, 6, 1, 6, false);
    }
  },

  ConnectCheck: function ConnectCheck() {
    _Network.XNet.ConnectCheck(false);
  },

  _onAfterGetXMLHttpRequest: function _onAfterGetXMLHttpRequest(xhr) {
    if (this.label) {
      this.label.string = "recv:" + xhr.responseText;
    }
  },

  UpdateGamePort: function UpdateGamePort() {
    this._xhrXHR = null;
    /*
    cc.loader.load(
      {
        url: "http://xxgame.9966886699.com/where.php?v=10800&p=1000&",
        type: "json"
      },
      function(err, text) {
        console.log(
          "Should load a texture from RESTful API by specify the type: ",
          text
        );
      }
    );
    */

    var cav = cc.director.getScene().getChildByName("Canvas");
    var label = cav.getChildByName("LabelGamePort");
    if (label) {
      var xlab = label.getComponent(cc.Label);
      if (xlab) {
        xlab.string = "";
      }
    }

    var xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 207) {
        console.log("recv:" + xhr.responseText);

        if (label) {
          var anim = label.getComponent(cc.Animation);
          if (anim) {
            anim.play("labGamePort");
          }
          //label.node.color = cc.color(0, 255, 0, 255);
          //label.node.visible = false;
          var _xlab = label.getComponent(cc.Label);
          if (_xlab) {
            _xlab.string = xhr.responseText;
            console.log("========" + label.string);
          }
        }
        //this._onAfterGetXMLHttpRequest(xhr);
      }
    };
    xhr.open("GET", "http://xxgame.9966886699.com/where.php?v=10800&p=1000&");
    xhr.timeout = 5000; //5 seconds for timeout
    xhr.send();
    this._xhrXHR = xhr;
  },

  UpdateGamePort1: function UpdateGamePort1() {
    var xhr = cc.loader.getXMLHttpRequest();
    //    this.streamXHREventsToLabel(xhr, this.xhr, this.xhr, "GET");
    //    var xhr = cc.loader.getXMLHttpRequest();

    //xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 207) {
        var response = xhr.responseText;
        console.log("recv:" + xhr.responseText);
        //this.xhr.string = xhr.responseText;
        //json 解析
        var jsonData = JSON.parse(response);
        var code = jsonData["code"];
        if (code == 1) {
          //                self.successSprite.getComponent(cc.Animation).play('resAnimate');
        }
      }
    };

    xhr.open("GET", "http://xxgame.9966886699.com/where.php?v=10800&p=1000&");
    //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
    //xhr.setRequestHeader("Content-Type","Application/json");
    // Uint8Array is an ArrayBufferView
    xhr.timeout = 5000; //5 seconds for timeout
    xhr.send();
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.label.string = this.text;

    this.netEvListener = { callback: this.netSocketEvent, target: this };
    this.netMsgListener = { callback: this.netMsgProc, target: this };

    _Network.XNet.EarAdd(this);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECTED, this.netEvListener);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECT, this.netEvListener);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECT_ERROR, this.netEvListener);
    _Network.XNet.ListenerAdd(_Network.XNetEvent.CONNECT_TIMEOUT, this.netEvListener);

    this.UpdateGamePort();
  },

  start: function start() {
    //TipsManager.init();
  },


  // called every frame
  update: function update(dt) {},

  clickGameSwitch: function clickGameSwitch() {
    //TipsManager.createTips("还没实现");
    this.createTips("还没实现");
  },
  createTips: function createTips(content) {
    var n = cc.instantiate(this.tipsPrefab);
    if (n) {
      var tipsCtrl = n.getComponent("TipsCtrl");
      if (content && tipsCtrl) {
        tipsCtrl.setContent(content);
      }
      n.parent = cc.director.getScene();
    }
  },
  ClickAppBuild: function ClickAppBuild() {
    //let ver =  appVer.string;
    this.CmdWait = {
      cmd: "GX_APP_BUILD",
      ver: this.appVer.string,
      app: "XX"
    };

    _Network.XNet.Close();
    _Network.XNet.Host("ws://192.168.1.99:3737/appPub");
    _Network.XNet.Open();

    this.label.string = "build:" + this.appVer.string;
  },
  ClickAppUpgradeTest: function ClickAppUpgradeTest() {
    _Network.XNet.Close();
    _Network.XNet.Host("ws://test.9966886699.com:3737/appPub");
    _Network.XNet.Open();
    this.CmdWait = {
      cmd: "GX_APP_UPGRADE",
      ver: this.appVer.string,
      app: "XX"
    };
    this.label.string = "test-upgrade:" + this.appVer.string;
  },
  ClickAppUpgradeAudit: function ClickAppUpgradeAudit() {
    //TipsManager.createTips("还没实现");
    this.createTips("还没实现");
  },
  ClickGamePortWhere: function ClickGamePortWhere() {
    this.UpdateGamePort();
  }
}); //const TipsManager = require("./TipsManager.js"); //浏览器会有问题

cc._RF.pop();