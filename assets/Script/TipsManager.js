cc.Class({
  extends: cc.Component,
  properties: {
    tispPrefab: cc.Prefab
  },

  init() {
    if (this.tipsPrefab) return;

    // cc.loader.loadRes("tips/Tips", (err, prefab) => {
    //   this.tipsPrefab = prefab;
    // });
    console.log("tips prefab ok");
  },

  createTips(content) {
    var n = cc.instantiate(this.tipsPrefab);
    if (n) {
      let tipsCtrl = n.getComponent("TipsCtrl");
      if (content && tipsCtrl) {
        tipsCtrl.setContent(content);
      }
      n.parent = cc.director.getScene();
    }
  }
});
