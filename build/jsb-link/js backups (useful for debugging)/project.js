window.__require = function t(e, n, i) {
function s(c, r) {
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
var h = n[c] = {
exports: {}
};
e[c][0].call(h.exports, function(t) {
return s(e[c][1][t] || t);
}, h, h.exports, t, e, n, i);
}
return n[c].exports;
}
for (var o = "function" == typeof __require && __require, c = 0; c < i.length; c++) s(i[c]);
return s;
}({
Config: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "06830FtSFROFbFsw54s2SLI", "Config");
e.exports = {
properties: {},
LoadFromFile: function(t, e, n) {
cc.loader.loadRes(t, function(t, i) {
this.Data = i.json;
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
for (var e = new Object(), n = this.Data[t], i = 0; i < this.FeildName.length; i++) e[this.FeildName[i].toString()] = n[i];
return e;
},
FindObject: function(t, e, n) {
for (var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, s = 0, o = 0; o < this.Count(); o++) {
var c = RowObject(o);
if (c[e] == n) {
t.push(c);
s++;
}
if (i > 0 && s >= i) break;
}
},
FindObjectIndexOf: function(t, e, n) {
for (var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, s = 0, o = 0; o < this.Count(); o++) {
var c = RowObject(o);
if (-1 != c[e].indexOf(n)) {
t.push(c);
s++;
}
if (i > 0 && s >= i) break;
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
for (var i = 0; i < this.Data.length; i++) {
var s = this.Data[i];
if (s[n] == e) {
this.Current = s;
return s;
}
}
return null;
},
RowFeildValue: function(t, e) {
this.Select = new Array();
var n = this.FeildIndex(t);
if (n < 0) return res;
for (var i = 0; i < this.Data; i++) {
var s = this.Data[i];
s[n] == e && this.Select.push(s);
}
return this.Select;
},
RowFeildValueFirstEx: function(t, e, n) {
var i = this.FeildIndex(t);
if (i < 0) return "";
for (var s = 0; s < this.Data.length; s++) {
var o = this.Data[s];
if (o[i] == e) {
var c = this.FeildIndex(n);
return c < 0 ? "" : o[c];
}
}
return "";
}
};
cc._RF.pop();
}, {} ],
GMain: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "04eb4hVhTJB+oLGVnCuAdiX", "GMain");
var i = t("./Game"), s = t("./Network");
cc.Class({
extends: cc.Component,
properties: {
TryTick: 0,
Loading: cc.Prefab
},
createLoading: function() {
var t = cc.instantiate(this.Loading);
if (t) {
var e = cc.director.getWinSize();
t.setPosition(e.width / 2, e.height / 2, 0);
t.parent = cc.director.getScene();
t.name = "loading";
}
},
onLoad: function() {
this.createLoading();
},
start: function() {
this.TryTick = 1;
i.XGame.Where(this.cbWhere, this, this.TryTick);
},
cbWhere: function(t, e) {
t.TryTick++;
if (null == e) i.XGame.Where(t.cbWhere, t.TryTick); else {
s.XNet.dispatchXNet("GX_WHERE_R", e);
t.WhereAfter();
}
},
WhereAfter: function() {
var t = cc.find("loading/ShowText", cc.director.getScene());
if (null != t) {
var e = t.getComponent(cc.Label);
null != e && (e.string = "成功获取游戏服务器位置");
}
0 != i.XGame.whereResult.rc || i.XGame.Version(this.cbUpgrade, this);
},
cbUpgrade: function(t, e) {}
});
cc._RF.pop();
}, {
"./Game": "Game",
"./Network": void 0
} ],
Game: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "78a3bn+LAJHQp4SrkkrJEPI", "Game");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc.Class({
extends: cc.Component,
statics: {
clientVersion: 1e4,
resVersion: 1e4,
username: "",
password: "",
accid: "",
aid: "",
token: "",
whereResult: {},
sdtime: 0,
whereUrl: [ "http://where.9966886699.com/xx/", "http://where.9966886699.com/xx/", "http://where.9966886699.com/xx/" ],
Where: function(t, e, n) {
n %= 3;
var s;
s = this.whereUrl[n];
var o = {
cmd: "GX_WHERE",
ver: "1000",
realm: "android"
}, c = cc.loader.getXMLHttpRequest();
c.onreadystatechange = function() {
if (4 === c.readyState) if (200 === c.status) {
i.whereResult = JSON.parse(c.responseText);
t(e, c.responseText);
} else t(e, null);
};
c.open("POST", s);
c.timeout = 5e3;
c.ontimeout = function() {
console.error("Timeout!!");
t(e, null);
};
c.send(JSON.stringify(o));
},
Version: function(t, e) {
console.log(JSON.stringify(i.whereResult));
var n;
n = "http://" + i.whereResult.server[0] + "/version";
console.log("Version", n);
var s = {
cmd: "GX_VERSION",
aver: 1e3
}, o = cc.loader.getXMLHttpRequest();
o.onreadystatechange = function() {
if (4 === o.readyState) {
console.log("recv:" + o.responseText);
200 === o.status ? t(e, o.responseText) : t(e, null);
}
};
o.open("POST", n);
o.timeout = 5e3;
o.ontimeout = function() {
console.error("Timeout!!");
t(e, null);
};
o.send(JSON.stringify(s));
},
Update: function(t) {}
}
});
n.XGame = i;
cc._RF.pop();
}, {} ],
Gm: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "78315SGwBJA5aCdosZBC7sg", "Gm");
var i = t("./Network"), s = t("./Game"), o = t("Config");
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
var i = cc.instantiate(this.ScrollItem), s = i.getComponent("ScriptGmCmd");
s && s.SetData(this._onGmCmdClick, this, t, e, n);
this.ScrollCmd.content.addChild(i);
},
onLoad: function() {
this.Info.string = "ud=" + s.XGame.username + ":" + s.XGame.password;
i.XNet.EarAdd(this);
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
var i = o.RowObject(n);
i && t.GmInsert(i.NAME, i.CMDLINE, i.NOTE);
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
i.XNet.Host("ws://test.9966886699.com:8086/xx");
i.XNet.Open();
}
},
ClickDisconnect: function() {
i.XNet.Close();
},
ClickWsLibrary: function() {},
ClickCmdSend: function() {
var t = this.CmdSend.string;
console.log("cmdline:" + t);
try {
var e = JSON.parse(t);
this.LastCmdName = e.cmd;
i.XNet.Send(t);
} catch (t) {
this.CmdResult.string = t.message;
}
},
ClickScrollItem: function() {}
});
cc._RF.pop();
}, {
"./Game": void 0,
"./Network": "Network",
Config: "Config"
} ],
Home: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "Home");
var i = t("./Network");
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
ShowStory: function() {},
netEvent: function(t, e) {
"GX_APP_BUILD_MSG" == t && (this.label.string = e.text);
console.log("netEvent:" + JSON.stringify(e));
},
netSocketEvent: function(t, e) {
if (t.cmd == i.XNetEvent.CONNECTED) {
e.NetReady = !0;
e.CmdWait && i.XNet.Send(JSON.stringify(e.CmdWait));
}
t.cmd != i.XNetEvent.CONNECT_TIMEOUT && t.cmd != i.XNetEvent.CONNECT_ERROR || (e.label.string = "网络连接错误");
if (t.cmd == i.XNetEvent.CONNECT) {
e.label.string = "连接->" + i.XNet.ws_host;
cc.director.getScheduler().schedule(e.ConnectCheck, e, 6, 1, 6, !1);
}
},
ConnectCheck: function() {
i.XNet.ConnectCheck(!1);
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
var i = t.getComponent(cc.Label);
if (i) {
i.string = n.responseText;
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
i.XNet.EarAdd(this);
i.XNet.ListenerAdd(i.XNetEvent.CONNECTED, this.netEvListener);
i.XNet.ListenerAdd(i.XNetEvent.CONNECT, this.netEvListener);
i.XNet.ListenerAdd(i.XNetEvent.CONNECT_ERROR, this.netEvListener);
i.XNet.ListenerAdd(i.XNetEvent.CONNECT_TIMEOUT, this.netEvListener);
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
i.XNet.Close();
i.XNet.Host("ws://192.168.1.99:3737/appPub");
i.XNet.Open();
this.label.string = "build:" + this.appVer.string;
},
ClickAppUpgradeTest: function() {
i.XNet.Close();
i.XNet.Host("ws://test.9966886699.com:3737/appPub");
i.XNet.Open();
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
Loading: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "58723Ghl8lDlrMl5EEfr5dx", "Loading");
cc.Class({
extends: cc.Component,
properties: {
ShowText: cc.Label
},
start: function() {},
SetShowText: function(t) {
this.ShowText.string = t;
}
});
cc._RF.pop();
}, {} ],
Login: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "7e5441nJUBGvJMY/kYgRhBa", "Login");
var i = t("./Game");
cc.Class({
extends: cc.Component,
properties: {
Username: cc.EditBox,
Password: cc.EditBox
},
start: function() {},
ClickStart: function() {
i.XGame.username = this.Username.string;
i.XGame.password = this.Password.string;
cc.director.loadScene("gm");
}
});
cc._RF.pop();
}, {
"./Game": void 0
} ],
Network: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "b93c1SYiEtKbZ542UYqwQz0", "Network");
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = i || window.WebSocket || window.MozWebSocket, s = {
CONNECT: "XC_NET_CONNECT",
CONNECT_ERROR: "XC_NET_CONNECT_ERROR",
CONNECT_TIMEOUT: "XC_NET_CONNECT_TIMEOUT",
CONNECTED: "XC_NET_CONNECTED",
CLOSE: "XC_NET_CLOSE"
}, o = cc.Class({
extends: cc.Component,
statics: {
_socket: null,
ws_host: "ws://test.9966886699.com:8086/game",
_netPros: new Map(),
_netEars: new Array(),
_connectTimeout: 5,
_wsReConnectTimes: 0,
_reConnectFlag: !1,
_reConnectMax: 3,
dispatchXNet: function(t, e) {
this._netEars.forEach(function(n, i, s) {
n.netEvent(t, e);
});
if (this._netPros[t]) for (var n = this._netPros[t].slice(), i = 0; i < n.length; i++) n[i].callback(e, n[i].target);
},
Host: function(t) {
this.ws_host = t;
},
Open: function() {
if (null == this._socket) {
console.log("connect " + this.ws_host);
this._socket = new i(this.ws_host);
this._socket.onopen = this._onOpen.bind(this);
this._socket.onerror = this._onError.bind(this);
this._socket.onclose = this._onClose.bind(this);
this._socket.onmessage = this._onMessage.bind(this);
this.dispatchXNet(s.CONNECT, {
cmd: s.CONNECT,
rc: 0
});
}
return this;
},
Close: function() {
if (null != this._socket) {
this._socket.close();
delete this._socket;
console.log("WebSocket is closed now.");
o.dispatchXNet(s.CLOSE, {
cmd: s.CLOSE,
rc: 0
});
}
},
readyState: function() {
return this._socket ? this._socket.readyState : -1;
},
_onOpen: function(t) {
console.log("connected " + this.ws_host);
this.dispatchXNet(s.CONNECTED, {
cmd: s.CONNECTED,
rc: 0
});
},
_onError: function(t) {
o.dispatchXNet(s.CONNECT_ERROR, {
cmd: s.CONNECT_ERROR,
rc: t
});
console.error("WebSocket error observed:", t);
},
_onClose: function(t) {
console.log("WebSocket is closed now.");
o.dispatchXNet(s.CLOSE, {
cmd: s.CLOSE,
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
for (var i = 0; i < n.length; i++) if (n[i] == e) return;
n.push(e);
}
},
ListenerRemove: function(t, e) {
if (t && e) {
var n = this._netPros[t];
if (n) for (var i = 0; i < n.length; i++) if (n[i] == e) {
n.splice(i, 1);
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
if (this._socket.readyState == i.CONNECTING) {
console.log("websocket connect timeout");
o.dispatchXNet(s.CONNECT_TIMEOUT, {
cmd: s.CONNECT_TIMEOUT,
rc: 0
});
t && this.Open();
}
this._socket.readyState == i.CLOSED && console.log("websocket reconnect");
}
},
Send: function(t) {
this._socket && this._socket.readyState == i.OPEN && this._socket.send(t);
}
}
});
n.XNet = o;
n.XNetEvent = s;
cc._RF.pop();
}, {} ],
NewScript: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "d56c9NLgY1B26vLuJ+DeoVO", "NewScript");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {}
});
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
SetData: function(t, e, n, i, s) {
this.Target = e;
this.Callback = t;
this.Name.string = n;
this.Cmdline = i;
this.Note = s;
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
var i = t("./Network");
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
if (t.cmd == i.XNetEvent.CONNECTED) {
e.WsHost.string = i.XNet.ws_host;
e.WsHost.node.color = cc.color(0, 255, 0, 100);
e.WsHost.node.opacity = 255;
e.NetReady = !0;
e.CmdWait && i.XNet.Send(JSON.stringify(e.CmdWait));
}
t.cmd != i.XNetEvent.CONNECT_TIMEOUT && t.cmd != i.XNetEvent.CONNECT_ERROR || (e.TxLog.string = "网络连接错误");
if (t.cmd == i.XNetEvent.CONNECT) {
e.TxLog.string = "连接->" + i.XNet.ws_host;
cc.director.getScheduler().schedule(e.ConnectCheck, e, 6, 1, 6, !1);
}
},
ConnectCheck: function() {
i.XNet.ConnectCheck(!1);
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
i.XNet.EarAdd(this);
i.XNet.ListenerAdd(i.XNetEvent.CONNECTED, this.netEvListener);
i.XNet.ListenerAdd(i.XNetEvent.CONNECT, this.netEvListener);
i.XNet.ListenerAdd(i.XNetEvent.CONNECT_ERROR, this.netEvListener);
i.XNet.ListenerAdd(i.XNetEvent.CONNECT_TIMEOUT, this.netEvListener);
},
start: function() {},
ClickBuild: function() {
this.CmdWait = {
cmd: "GX_APP_BUILD",
ver: this.Version.string,
app: "XX"
};
i.XNet.Close();
i.XNet.Host("ws://192.168.1.99:3737/appPub");
i.XNet.Open();
},
ClickTestUpgrade: function() {
i.XNet.Close();
i.XNet.Host("ws://test.9966886699.com:3737/appPub");
i.XNet.Open();
this.CmdWait = {
cmd: "GX_APP_UPGRADE",
ver: this.Version.string,
app: "XX"
};
},
ClickAuditInstall: function() {
i.XNet.Close();
i.XNet.Host("ws://app.9966886699.com:3737/appPub");
i.XNet.Open();
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
}, {}, [ "Config", "Gm", "Home", "Login", "Network", "NewScript", "TipsCtrl", "TipsManager", "main", "ScriptGmCmd", "GMain", "Game", "Loading" ]);
//# sourceMappingURL=project.js.map