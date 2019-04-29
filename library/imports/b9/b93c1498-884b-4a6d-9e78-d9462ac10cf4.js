"use strict";
cc._RF.push(module, 'b93c1SYiEtKbZ542UYqwQz0', 'Network');
// Script/Network.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

//import { XOpcodes } from "./Opcodes";

var XNetEvent = {
  CONNECT: "XC_NET_CONNECT",
  CONNECT_ERROR: "XC_NET_CONNECT_ERROR",
  CONNECT_TIMEOUT: "XC_NET_CONNECT_TIMEOUT",
  CONNECTED: "XC_NET_CONNECTED",
  CLOSE: "XC_NET_CLOSE"
};

//个人采用文本方式来收发数据
//频率高的采用二进制数据进行收发 例如 移动数据包

var XNet = cc.Class({
  extends: cc.Component,
  statics: {
    _socket: {},
    ws_host: "ws://test.9966886699.com:8086/game",
    _netPros: new Map(),
    _netEars: new Array(),
    _connectTimeout: 5,
    _wsReConnectTimes: 0,
    _reConnectFlag: false,
    _reConnectMax: 3,

    dispatchXNet: function dispatchXNet(event, msg) {
      //        XGame.DoXEvent(event,msg);

      this._netEars.forEach(function (item, index, array) {
        item.netEvent(event, msg);
      });

      if (this._netPros[event]) {
        var listeners = this._netPros[event].slice();
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].callback(msg, listeners[i].target);
        }
      }
    },


    Host: function Host(uri) {
      this.ws_host = uri;
    },

    Open: function Open() {
      if (this._socket.readyState != WebSocket.OPEN) {
        console.log("connect " + this.ws_host);
        //            if(this._socket!=null) delete this._socket;

        this._socket = new WebSocket(this.ws_host);
        this._socket.onopen = this._onOpen.bind(this);
        this._socket.onerror = this._onError.bind(this);
        this._socket.onclose = this._onClose.bind(this);
        this._socket.onmessage = this._onMessage.bind(this);

        //cc.director.getScheduler().schedule(this.connectTimeoutCheck,this,1, 5, 3,false);
        this.dispatchXNet(XNetEvent.CONNECT, {
          cmd: XNetEvent.CONNECT,
          rc: 0
        });
      }
      return this;
    },

    Close: function Close() {
      if (this._socket && this._socket.readyState == 1) {
        delete this._socket;
        //        this._socket = nil;//这个不需要
        //cc.director.getScheduler().
      }
    },
    readyState: function readyState() {
      if (this._socket) return this._socket.readyState;
      return -1;
    },


    _onOpen: function _onOpen(event) {
      console.log("connected " + this.ws_host);
      //utils.OutObj(evt);
      //var event = new cc.Event(this,"Network",true);
      //event.setUserData("{...}");
      //cc.eventTarget.dispatchEvent(event);
      // cc.EventTarget.dispatchEvent("adas","123",evt);

      //
      //cc.eventManager.dispatchCustomEvent("XNetOpened", {a:1,b:2});

      //var event=new cc.EventCustom("XNetOpened");
      //cc.SystemEvent.dispatchCustomEvent(event);
      this.dispatchXNet(XNetEvent.CONNECTED, {
        cmd: XNetEvent.CONNECTED,
        rc: 0
      });
    },

    _onError: function _onError(event) {
      XNet.dispatchXNet(XNetEvent.CONNECT_ERROR, {
        cmd: XNetEvent.CONNECT_ERROR,
        rc: event
      });
      console.error("WebSocket error observed:", event);
    },

    _onClose: function _onClose(event) {
      console.log("WebSocket is closed now.");
      XNet.dispatchXNet(XNetEvent.CLOSE, {
        cmd: XNetEvent.CLOSE,
        rc: 0
      });
    },

    _onMessage: function _onMessage(event) {
      console.log("WebSocket message received:" + event.data);
      var msg = JSON.parse(event.data);
      //console.log(msg.cmd);
      XNet.dispatchXNet(msg.cmd, msg);
    },

    ListenerAdd: function ListenerAdd(event, callback) {
      if (!event || !callback) return;
      var listenerList = this._netPros[event];
      if (!listenerList) listenerList = this._netPros[event] = new Array();
      for (var i = 0; i < listenerList.length; i++) {
        if (listenerList[i] == callback) return;
      }
      listenerList.push(callback);
    },
    ListenerRemove: function ListenerRemove(event, callback) {
      if (!event || !callback) return;
      var listenerList = this._netPros[event];
      if (listenerList) {
        for (var i = 0; i < listenerList.length; i++) {
          if (listenerList[i] == callback) {
            listenerList.splice(i, 1);
            return;
          }
        }
      }
    },
    EarAdd: function EarAdd(ear) {
      this._netEars.push(ear);
    },
    EarRemove: function EarRemove(ear) {
      var pos = this._netEars.indexOf(ear);
      this._netEars.splice(pos, 1);
    },


    ConnectCheck: function ConnectCheck(flagReconn) {
      if (this._socket == null) return;

      if (this._socket.readyState == WebSocket.CONNECTING) {
        console.log("websocket connect timeout");
        XNet.dispatchXNet(XNetEvent.CONNECT_TIMEOUT, {
          cmd: XNetEvent.CONNECT_TIMEOUT,
          rc: 0
        });
        if (flagReconn) this.Open();
      }

      if (this._socket.readyState == WebSocket.CLOSED) {
        console.log("websocket reconnect");
        //this.connect();
      }
    },

    Send: function Send(text) {
      if (!this._socket) return;
      if (this._socket.readyState == WebSocket.OPEN) {
        this._socket.send(text);
      }
    }
  }
});

exports.XNet = XNet;
exports.XNetEvent = XNetEvent;

cc._RF.pop();