"use strict";
cc._RF.push(module, '7e5441nJUBGvJMY/kYgRhBa', 'Login');
// Script/Login.js

"use strict";

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
    Username: cc.EditBox,
    Password: cc.EditBox
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {},
  ClickStart: function ClickStart() {
    cc.director.loadScene("gm");
  }

  // update (dt) {},

});

cc._RF.pop();