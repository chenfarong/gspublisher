window.__require = function t(e, n, s) {
function i(c, r) {
if (!n[c]) {
if (!e[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!e[a]) {
var l = "function" == typeof __require && __require;
if (!r && l) return l(a, !0);
if (o) return o(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
}
var d = n[c] = {
exports: {}
};
e[c][0].call(d.exports, function(t) {
return i(e[c][1][t] || t);
}, d, d.exports, t, e, n, s);
}
return n[c].exports;
}
for (var o = "function" == typeof __require && __require, c = 0; c < s.length; c++) i(s[c]);
return i;
}({
Config: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "06830FtSFROFbFsw54s2SLI", "Config");
e.exports = {
properties: {},
LoadFromFile: function(t, e, n) {
cc.loader.loadRes(t, function(t, s) {
this.Data = s.json;
this._onAfterLoaded();
e && e(n);
}.bind(this));
},
_onAfterLoaded: function() {
if (Array.isArray(this.Data)) {
this.FeildName = this.Data[0];
this.Loaded = !0;
}
},
RowObject: function(t) {
if ((t += 1) >= this.Data.length) return null;
for (var e = new Object(), n = this.Data[t], s = 0; s < this.FeildName.length; s++) e[this.FeildName[s].toString()] = n[s];
return e;
},
FindObject: function(t, e, n) {
for (var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, i = 0, o = 0; o < this.Count(); o++) {
var c = RowObject(o);
if (c[e] == n) {
t.push(c);
i++;
}
if (s > 0 && i >= s) break;
}
},
FindObjectIndexOf: function(t, e, n) {
for (var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, i = 0, o = 0; o < this.Count(); o++) {
var c = RowObject(o);
if (-1 != c[e].indexOf(n)) {
t.push(c);
i++;
}
if (s > 0 && i >= s) break;
}
},
Count: function() {
return 0 == this.Data.length ? 0 : this.Data.length - 1;
},
FeildIndex: function(t) {
if (Array.isArray(this.FeildName)) for (var e = 0; e < this.FeildName.length; e++) if (this.FeildName[e] == t) return e;
return -1;
},
RowFeildValueFirst: function(t, e) {
var n = this.FeildIndex(t);
if (n < 0) return null;
for (var s = 0; s < this.Data.length; s++) {
var i = this.Data[s];
if (i[n] == e) {
this.Current = i;
return i;
}
}
return null;
},
RowFeildValue: function(t, e) {
this.Select = new Array();
var n = this.FeildIndex(t);
if (n < 0) return res;
for (var s = 0; s < this.Data; s++) {
var i = this.Data[s];
i[n] == e && this.Select.push(i);
}
return this.Select;
},
RowFeildValueFirstEx: function(t, e, n) {
var s = this.FeildIndex(t);
if (s < 0) return "";
for (var i = 0; i < this.Data.length; i++) {
var o = this.Data[i];
if (o[s] == e) {
var c = this.FeildIndex(n);
return c < 0 ? "" : o[c];
}
}
return "";
}
};
cc._RF.pop();
}, {} ],
Game: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "78a3bn+LAJHQp4SrkkrJEPI", "Game");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.XGame = {
username: "",
password: ""
};
cc._RF.pop();
}, {} ],
Gm: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "78315SGwBJA5aCdosZBC7sg", "Gm");
var s = t("./Network"), i = t("./Game"), o = t("Config");
cc.Class({
extends: cc.Component,
properties: {
Info: cc.Label,
WsHost: cc.EditBox,
CmdSend: cc.EditBox,
CmdResult: cc.EditBox,
Recv: cc.EditBox,
LastCmdName: "",
RecvCount: 0,
LabRecvCount: cc.Label,
GmJson: {
default: null,
type: cc.JsonAsset
},
ScrollItem: cc.Prefab,
ScrollCmd: cc.ScrollView
},
netEvent: function(t, e) {
var n = JSON.stringify(e);
"GX_APP_BUILD_MSG" == t && (this.TxLog.string = e.text);
console.log("netEvent:" + JSON.stringify(e));
e.cmd === this.LastCmdName + "_R" && (this.CmdResult.string = n);
this.Recv.string = n;
this.RecvCount++;
this.LabRecvCount.string = "接收数据:" + this.RecvCount.toString();
},
_onGmCmdClick: function(t, e, n) {
console.log("_onGmCmdClick:" + e);
t.CmdSend.string = e;
t.CmdResult.string = n;
},
GmInsert: function(t, e, n) {
var s = cc.instantiate(this.ScrollItem), i = s.getComponent("ScriptGmCmd");
i && i.SetData(this._onGmCmdClick, this, t, e, n);
this.ScrollCmd.content.addChild(s);
},
onLoad: function() {
this.Info.string = "ud=" + i.XGame.username + ":" + i.XGame.password;
s.XNet.EarAdd(this);
cc.loader.loadRes("db/gm_cmd", function(t, e) {
this.GmJson = e;
this._onAfterGmJsonDBLoaded();
}.bind(this));
o.LoadFromFile("db/gm_cmd", this._onAfterGmConfig, this);
},
_onAfterGmConfig: function(t) {
var e = o.RowFeildValueFirstEx("ID", "10001", "NAME");
console.log("++++++++++++++" + e);
for (var n = 0; n < o.Count(); n++) {
var s = o.RowObject(n);
s && t.GmInsert(s.NAME, s.CMDLINE, s.NOTE);
}
},
start: function() {},
_onAfterGmJsonDBLoaded: function() {
if (this.GmJson && Array.isArray(this.GmJson.json)) for (var t = 0; t < this.GmJson.json.length; t++) {
var e = this.GmJson.json[t];
console.log(JSON.stringify(e));
}
},
ClickConnect: function() {
if (!(this.WsHost.string.length < 1)) {
s.XNet.Close();
s.XNet.Host("ws://test.9966886699.com:8086/xx");
s.XNet.Open();
}
},
ClickDisconnect: function() {
s.XNet.Close();
},
ClickWsLibrary: function() {},
ClickCmdSend: function() {
var t = this.CmdSend.string;
console.log("cmdline:" + t);
try {
var e = JSON.parse(t);
this.LastCmdName = e.cmd;
s.XNet.Send(t);
} catch (t) {
this.CmdResult.string = t.message;
}
},
ClickScrollItem: function() {}
});
cc._RF.pop();
}, {
"./Game": "Game",
"./Network": "Network",
Config: "Config"
} ],
HelloWorld: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
var s = t("./Network");
cc.Class({
extends: cc.Component,
properties: {
label: {
default: null,
type: cc.Label
},
labXhr: cc.Label,
NetReady: !1,
appVer: cc.EditBox,
netEvListener: null,
netMsgListener: null,
CmdWait: null,
text: "准备就绪",
tipsPrefab: cc.Prefab
},
netEvent: function(t, e) {
"GX_APP_BUILD_MSG" == t && (this.label.string = e.text);
console.log("netEvent:" + JSON.stringify(e));
},
netSocketEvent: function(t, e) {
if (t.cmd == s.XNetEvent.CONNECTED) {
e.NetReady = !0;
e.CmdWait && s.XNet.Send(JSON.stringify(e.CmdWait));
}
t.cmd != s.XNetEvent.CONNECT_TIMEOUT && t.cmd != s.XNetEvent.CONNECT_ERROR || (e.label.string = "网络连接错误");
if (t.cmd == s.XNetEvent.CONNECT) {
e.label.string = "连接->" + s.XNet.ws_host;
cc.director.getScheduler().schedule(e.ConnectCheck, e, 6, 1, 6, !1);
}
},
ConnectCheck: function() {
s.XNet.ConnectCheck(!1);
},
_onAfterGetXMLHttpRequest: function(t) {
this.label && (this.label.string = "recv:" + t.responseText);
},
UpdateGamePort: function() {
this._xhrXHR = null;
var t = cc.director.getScene().getChildByName("Canvas").getChildByName("LabelGamePort");
if (t) {
var e = t.getComponent(cc.Label);
e && (e.string = "");
}
var n = cc.loader.getXMLHttpRequest();
n.onreadystatechange = function() {
if (4 == n.readyState && n.status >= 200 && n.status <= 207) {
console.log("recv:" + n.responseText);
if (t) {
var e = t.getComponent(cc.Animation);
e && e.play("labGamePort");
var s = t.getComponent(cc.Label);
if (s) {
s.string = n.responseText;
console.log("========" + t.string);
}
}
}
};
n.open("GET", "http://xxgame.9966886699.com/where.php?v=10800&p=1000&");
n.timeout = 5e3;
n.send();
this._xhrXHR = n;
},
UpdateGamePort1: function() {
var t = cc.loader.getXMLHttpRequest();
t.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
t.onreadystatechange = function() {
if (4 == t.readyState && t.status >= 200 && t.status <= 207) {
var e = t.responseText;
console.log("recv:" + t.responseText);
JSON.parse(e).code;
}
};
t.open("GET", "http://xxgame.9966886699.com/where.php?v=10800&p=1000&");
t.timeout = 5e3;
t.send();
},
onLoad: function() {
this.label.string = this.text;
this.netEvListener = {
callback: this.netSocketEvent,
target: this
};
this.netMsgListener = {
callback: this.netMsgProc,
target: this
};
s.XNet.EarAdd(this);
s.XNet.ListenerAdd(s.XNetEvent.CONNECTED, this.netEvListener);
s.XNet.ListenerAdd(s.XNetEvent.CONNECT, this.netEvListener);
s.XNet.ListenerAdd(s.XNetEvent.CONNECT_ERROR, this.netEvListener);
s.XNet.ListenerAdd(s.XNetEvent.CONNECT_TIMEOUT, this.netEvListener);
this.UpdateGamePort();
},
start: function() {},
update: function(t) {},
clickGameSwitch: function() {
this.createTips("还没实现");
},
createTips: function(t) {
var e = cc.instantiate(this.tipsPrefab);
if (e) {
var n = e.getComponent("TipsCtrl");
t && n && n.setContent(t);
e.parent = cc.director.getScene();
}
},
ClickAppBuild: function() {
this.CmdWait = {
cmd: "GX_APP_BUILD",
ver: this.appVer.string,
app: "XX"
};
s.XNet.Close();
s.XNet.Host("ws://192.168.1.99:3737/appPub");
s.XNet.Open();
this.label.string = "build:" + this.appVer.string;
},
ClickAppUpgradeTest: function() {
s.XNet.Close();
s.XNet.Host("ws://test.9966886699.com:3737/appPub");
s.XNet.Open();
this.CmdWait = {
cmd: "GX_APP_UPGRADE",
ver: this.appVer.string,
app: "XX"
};
this.label.string = "test-upgrade:" + this.appVer.string;
},
ClickAppUpgradeAudit: function() {
this.createTips("还没实现");
},
ClickGamePortWhere: function() {
this.UpdateGamePort();
}
});
cc._RF.pop();
}, {
"./Network": "Network"
} ],
Login: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "7e5441nJUBGvJMY/kYgRhBa", "Login");
var s = t("./Game");
cc.Class({
extends: cc.Component,
properties: {
Username: cc.EditBox,
Password: cc.EditBox
},
start: function() {},
ClickStart: function() {
s.XGame.username = this.Username.string;
s.XGame.password = this.Password.string;
cc.director.loadScene("gm");
}
});
cc._RF.pop();
}, {
"./Game": "Game"
} ],
Network: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "b93c1SYiEtKbZ542UYqwQz0", "Network");
Object.defineProperty(n, "__esModule", {
value: !0
});
var s = s || window.WebSocket || window.MozWebSocket, i = {
CONNECT: "XC_NET_CONNECT",
CONNECT_ERROR: "XC_NET_CONNECT_ERROR",
CONNECT_TIMEOUT: "XC_NET_CONNECT_TIMEOUT",
CONNECTED: "XC_NET_CONNECTED",
CLOSE: "XC_NET_CLOSE"
}, o = cc.Class({
extends: cc.Component,
statics: {
_socket: {},
ws_host: "ws://test.9966886699.com:8086/game",
_netPros: new Map(),
_netEars: new Array(),
_connectTimeout: 5,
_wsReConnectTimes: 0,
_reConnectFlag: !1,
_reConnectMax: 3,
dispatchXNet: function(t, e) {
this._netEars.forEach(function(n, s, i) {
n.netEvent(t, e);
});
if (this._netPros[t]) for (var n = this._netPros[t].slice(), s = 0; s < n.length; s++) n[s].callback(e, n[s].target);
},
Host: function(t) {
this.ws_host = t;
},
Open: function() {
if (null == this._socket || this._socket.readyState != s.OPEN) {
console.log("connect " + this.ws_host);
this._socket = new s(this.ws_host);
this._socket.onopen = this._onOpen.bind(this);
this._socket.onerror = this._onError.bind(this);
this._socket.onclose = this._onClose.bind(this);
this._socket.onmessage = this._onMessage.bind(this);
this.dispatchXNet(i.CONNECT, {
cmd: i.CONNECT,
rc: 0
});
}
return this;
},
Close: function() {
this._socket && 1 == this._socket.readyState && delete this._socket;
},
readyState: function() {
return this._socket ? this._socket.readyState : -1;
},
_onOpen: function(t) {
console.log("connected " + this.ws_host);
this.dispatchXNet(i.CONNECTED, {
cmd: i.CONNECTED,
rc: 0
});
},
_onError: function(t) {
o.dispatchXNet(i.CONNECT_ERROR, {
cmd: i.CONNECT_ERROR,
rc: t
});
console.error("WebSocket error observed:", t);
},
_onClose: function(t) {
console.log("WebSocket is closed now.");
o.dispatchXNet(i.CLOSE, {
cmd: i.CLOSE,
rc: 0
});
},
_onMessage: function(t) {
console.log("WebSocket message received:" + t.data);
var e = JSON.parse(t.data);
o.dispatchXNet(e.cmd, e);
},
ListenerAdd: function(t, e) {
if (t && e) {
var n = this._netPros[t];
n || (n = this._netPros[t] = new Array());
for (var s = 0; s < n.length; s++) if (n[s] == e) return;
n.push(e);
}
},
ListenerRemove: function(t, e) {
if (t && e) {
var n = this._netPros[t];
if (n) for (var s = 0; s < n.length; s++) if (n[s] == e) {
n.splice(s, 1);
return;
}
}
},
EarAdd: function(t) {
this._netEars.push(t);
},
EarRemove: function(t) {
var e = this._netEars.indexOf(t);
this._netEars.splice(e, 1);
},
ConnectCheck: function(t) {
if (null != this._socket) {
if (this._socket.readyState == s.CONNECTING) {
console.log("websocket connect timeout");
o.dispatchXNet(i.CONNECT_TIMEOUT, {
cmd: i.CONNECT_TIMEOUT,
rc: 0
});
t && this.Open();
}
this._socket.readyState == s.CLOSED && console.log("websocket reconnect");
}
},
Send: function(t) {
this._socket && this._socket.readyState == s.OPEN && this._socket.send(t);
}
}
});
n.XNet = o;
n.XNetEvent = i;
cc._RF.pop();
}, {} ],
ScriptGmCmd: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "8aa5erVzE1HoZC5lpUPpA6u", "ScriptGmCmd");
cc.Class({
extends: cc.Component,
properties: {
Name: cc.Label
},
SetData: function(t, e, n, s, i) {
this.Target = e;
this.Callback = t;
this.Name.string = n;
this.Cmdline = s;
this.Note = i;
},
Click: function() {
this.Callback && this.Callback(this.Target, this.Cmdline, this.Note);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
TipsCtrl: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "79dc6BynuNKRqGm0O6jjoQ6", "TipsCtrl");
cc.Class({
extends: cc.Component,
properties: {
ShowText: cc.Label
},
onDestroySelf: function() {
this.node.destroy();
},
onEnable: function() {
var t = cc.director.getWinSize();
this.node.setPosition(t.width / 2, t.height / 2, 0);
},
start: function() {},
setContent: function(t) {
t && (this.ShowText.string = t);
},
AutoRemove: function() {
this.node.parent.removeChild(this.node);
}
});
cc._RF.pop();
}, {} ],
TipsManager: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "155ecX/DaBDe5J8uC1gEZvR", "TipsManager");
cc.Class({
extends: cc.Component,
properties: {
tispPrefab: cc.Prefab
},
init: function() {
this.tipsPrefab || console.log("tips prefab ok");
},
createTips: function(t) {
var e = cc.instantiate(this.tipsPrefab);
if (e) {
var n = e.getComponent("TipsCtrl");
t && n && n.setContent(t);
e.parent = cc.director.getScene();
}
}
});
cc._RF.pop();
}, {} ],
main: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "ec30bQXQlNFCpahszR10Pe5", "main");
var s = t("./Network");
cc.Class({
extends: cc.Component,
properties: {
netEvListener: null,
netMsgListener: null,
Version: cc.EditBox,
WsHost: cc.Label,
TxLog: cc.Label,
NetReady: Boolean,
CmdWait: null
},
netEvent: function(t, e) {
"GX_APP_BUILD_MSG" == t && (this.TxLog.string = e.text);
console.log("netEvent:" + JSON.stringify(e));
},
netSocketEvent: function(t, e) {
if (t.cmd == s.XNetEvent.CONNECTED) {
e.WsHost.string = s.XNet.ws_host;
e.WsHost.node.color = cc.color(0, 255, 0, 100);
e.WsHost.node.opacity = 255;
e.NetReady = !0;
e.CmdWait && s.XNet.Send(JSON.stringify(e.CmdWait));
}
t.cmd != s.XNetEvent.CONNECT_TIMEOUT && t.cmd != s.XNetEvent.CONNECT_ERROR || (e.TxLog.string = "网络连接错误");
if (t.cmd == s.XNetEvent.CONNECT) {
e.TxLog.string = "连接->" + s.XNet.ws_host;
cc.director.getScheduler().schedule(e.ConnectCheck, e, 6, 1, 6, !1);
}
},
ConnectCheck: function() {
s.XNet.ConnectCheck(!1);
},
netMsgProc: function(t, e) {},
onLoad: function() {
this.netEvListener = {
callback: this.netSocketEvent,
target: this
};
this.netMsgListener = {
callback: this.netMsgProc,
target: this
};
s.XNet.EarAdd(this);
s.XNet.ListenerAdd(s.XNetEvent.CONNECTED, this.netEvListener);
s.XNet.ListenerAdd(s.XNetEvent.CONNECT, this.netEvListener);
s.XNet.ListenerAdd(s.XNetEvent.CONNECT_ERROR, this.netEvListener);
s.XNet.ListenerAdd(s.XNetEvent.CONNECT_TIMEOUT, this.netEvListener);
},
start: function() {},
ClickBuild: function() {
this.CmdWait = {
cmd: "GX_APP_BUILD",
ver: this.Version.string,
app: "XX"
};
s.XNet.Close();
s.XNet.Host("ws://192.168.1.99:3737/appPub");
s.XNet.Open();
},
ClickTestUpgrade: function() {
s.XNet.Close();
s.XNet.Host("ws://test.9966886699.com:3737/appPub");
s.XNet.Open();
this.CmdWait = {
cmd: "GX_APP_UPGRADE",
ver: this.Version.string,
app: "XX"
};
},
ClickAuditInstall: function() {
s.XNet.Close();
s.XNet.Host("ws://app.9966886699.com:3737/appPub");
s.XNet.Open();
this.CmdWait = {
cmd: "GX_APP_UPGRADE",
ver: this.Version.string,
app: "XX"
};
},
ClickGameSwitchPort: function() {},
ClickAuditPass: function() {}
});
cc._RF.pop();
}, {
"./Network": "Network"
} ]
}, {}, [ "Config", "Game", "Gm", "HelloWorld", "Login", "Network", "TipsCtrl", "TipsManager", "main", "ScriptGmCmd" ]);
//# sourceMappingURL=project.js.map