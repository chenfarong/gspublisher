"use strict";
cc._RF.push(module, '155ecX/DaBDe5J8uC1gEZvR', 'TipsManager');
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