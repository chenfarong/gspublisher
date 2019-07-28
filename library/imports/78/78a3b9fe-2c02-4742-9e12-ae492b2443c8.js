"use strict";
cc._RF.push(module, '78a3bn+LAJHQp4SrkkrJEPI', 'Game');
// Script/Game.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//import { XNet } from "./Network";

var XGame = cc.Class({
  extends: cc.Component,
  statics: {
    username: "",
    password: "",
    accid: "", //账号
    aid: "", //角色编号
    token: "", //令牌
    host: "", //游戏服务位置
    sdtime: 0, //和服务器之间的时间差 毫秒

    whereUrl: ["http://where.9966886699.com/xx/", "http://where.9966886699.com/xx/", "http://where.9966886699.com/xx/"],

    Where: function Where(callback, who, n) {
      n = n % 3;
      var url = "http://where.9966886699.com/xx/"; //this.whereUrl[n];

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