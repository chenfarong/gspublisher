(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/prefab/item/ScriptGmCmd.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8aa5erVzE1HoZC5lpUPpA6u', 'ScriptGmCmd', __filename);
// prefab/item/ScriptGmCmd.js

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
    Name: cc.Label
    //    Cmdline: "",
    //    Note: ""
  },

  // LIFE-CYCLE CALLBACKS:

  SetData: function SetData(callback, target, title, cmdline, note) {
    this.Target = target;
    this.Callback = callback;
    this.Name.string = title;
    this.Cmdline = cmdline;
    this.Note = note;
  },


  // onLoad () {},
  Click: function Click() {
    if (this.Callback) {
      this.Callback(this.Target, this.Cmdline, this.Note);
    }
  },
  start: function start() {}

  // update (dt) {},

});

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
        //# sourceMappingURL=ScriptGmCmd.js.map
        