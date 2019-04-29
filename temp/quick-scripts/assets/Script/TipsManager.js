(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TipsManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '155ecX/DaBDe5J8uC1gEZvR', 'TipsManager', __filename);
// Script/TipsManager.js

"use strict";

cc.Class({
  extends: cc.Component,
  properties: {
    tispPrefab: cc.Prefab
  },

  init: function init() {
    if (this.tipsPrefab) return;

    // cc.loader.loadRes("tips/Tips", (err, prefab) => {
    //   this.tipsPrefab = prefab;
    // });
    console.log("tips prefab ok");
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
  }
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
        //# sourceMappingURL=TipsManager.js.map
        