"use strict";
cc._RF.push(module, '06830FtSFROFbFsw54s2SLI', 'Config');
// Script/Config.js

"use strict";

module.exports = {
  /*  
    FeildName = new Array(),
    ConfigName = "",
    Loaded = false,
    Data = new Array(),
  */
  properties: {
    //Rows: new Map()
  },

  LoadFromFile: function LoadFromFile(fname, callback, arg) {
    cc.loader.loadRes(fname, function (err, jsonAsset) {
      this.Data = jsonAsset.json;
      //console.log(JSON.stringify(jsonAsset.json));
      this._onAfterLoaded();
      if (callback) callback(arg);
    }.bind(this));
  },
  _onAfterLoaded: function _onAfterLoaded() {
    //处理第一行
    if (Array.isArray(this.Data)) {
      this.FeildName = this.Data[0];
      this.Loaded = true;
    }
  },
  RowObject: function RowObject(index) {
    index = index + 1;
    if (index >= this.Data.length) return null;
    var res = new Object();
    var o = this.Data[index];
    for (var i = 0; i < this.FeildName.length; i++) {
      res[this.FeildName[i].toString()] = o[i];
    }
    return res;
  },
  Count: function Count() {
    if (this.Data.length == 0) return 0;
    return this.Data.length - 1;
  },
  FeildIndex: function FeildIndex(kname) {
    if (Array.isArray(this.FeildName)) {
      for (var i = 0; i < this.FeildName.length; i++) {
        if (this.FeildName[i] == kname) {
          return i;
        }
      }
    }
    return -1;
  },
  RowFeildValueFirst: function RowFeildValueFirst(kname, kvalue) {
    var idx = this.FeildIndex(kname);
    if (idx < 0) return null;
    for (var r = 0; r < this.Data.length; r++) {
      var o = this.Data[r];
      if (o[idx] == kvalue) {
        this.Current = o;
        return o;
      }
    }
    return null;
  },
  RowFeildValue: function RowFeildValue(kname, kvalue) {
    this.Select = new Array();
    var idx = this.FeildIndex(kname);
    if (idx < 0) return res;
    for (var r = 0; r < this.Data; r++) {
      var o = this.Data[r];
      if (o[idx] == kvalue) {
        this.Select.push(o);
      }
    }
    return this.Select;
  },
  RowFeildValueFirstEx: function RowFeildValueFirstEx(kname, kvalue, ksecond) {
    var idx = this.FeildIndex(kname);
    if (idx < 0) return "";
    for (var r = 0; r < this.Data.length; r++) {
      var o = this.Data[r];
      if (o[idx] == kvalue) {
        var jx = this.FeildIndex(ksecond);
        if (jx < 0) return "";
        return o[jx];
      }
    }
    return "";
  }
};

//var XConfig = new AConfig();
//export { AConfig };

cc._RF.pop();