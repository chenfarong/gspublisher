(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '78a3bn+LAJHQp4SrkkrJEPI', 'Game', __filename);
// resources/Game.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//import { XNet } from "./Network";

var XGame = cc.Class({
  extends: cc.Component,
  statics: {
    clientVersion: 10000, //客户端程序版本号
    resVersion: 10000, //资源版本号
    username: "",
    password: "",
    accid: "", //账号
    aid: "", //角色编号
    token: "", //令牌
    whereResult: {}, //游戏服务位置
    sdtime: 0, //和服务器之间的时间差 毫秒

    whereUrl: ["http://where.9966886699.com/xx/", "http://where.9966886699.com/xx/", "http://where.9966886699.com/xx/"],

    //向服务获取游戏服务器位置
    Where: function Where(callback, who, n) {
      n = n % 3;
      var url = "http://where.9966886699.com/xx/";
      url = this.whereUrl[n];

      //从位置中心查询游戏服务器位置 http post 获得
      var req = {};
      req.cmd = "GX_WHERE";
      req.ver = "1000";
      req.realm = "android";
      //XNet.HttpPost("http://where.9966886699.com/xx/", req);
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          //console.log("recv:" + xhr.responseText);
          if (xhr.status === 200) {
            //收到内容后处理
            XGame.whereResult = JSON.parse(xhr.responseText);
            //console.log("====", JSON.stringify(XGame.whereResult));
            callback(who, xhr.responseText);
          } else {
            callback(who, null);
          }
        }
      };
      xhr.open("POST", url);
      xhr.timeout = 5000; //5 seconds for timeout
      xhr.ontimeout = function () {
        console.error("Timeout!!");
        callback(who, null);
      };

      xhr.send(JSON.stringify(req));
    },

    //向游戏服务器查询版本号
    Version: function Version(callback, who) {
      console.log(JSON.stringify(XGame.whereResult));

      var url = "http://where.9966886699.com/xx/";
      url = "http://" + XGame.whereResult.server[0] + "/version";
      console.log("Version", url);

      //发送请求版本命令
      var req = {};
      req.cmd = "GX_VERSION";
      req.aver = 1000;
      var xhr = cc.loader.getXMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log("recv:" + xhr.responseText);
          if (xhr.status === 200) {
            //收到内容后处理
            //XGame.whereResult = JSON.parse(xhr.responseText);
            //console.log("====", JSON.stringify(XGame.whereResult));
            callback(who, xhr.responseText);
          } else {
            callback(who, null);
          }
        }
      };
      xhr.open("POST", url);
      xhr.timeout = 5000; //5 seconds for timeout
      xhr.ontimeout = function () {
        console.error("Timeout!!");
        callback(who, null);
      };

      xhr.send(JSON.stringify(req));
    },

    //这里实现逻辑帧
    //dt 上一帧到本帧时间差
    Update: function Update(dt) {}
  }
});

exports.XGame = XGame;

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
        //# sourceMappingURL=Game.js.map
        