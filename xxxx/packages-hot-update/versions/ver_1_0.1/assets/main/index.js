window.__require = function t(e, o, n) {
function s(i, a) {
if (!o[i]) {
if (!e[i]) {
var c = i.split("/");
c = c[c.length - 1];
if (!e[c]) {
var l = "function" == typeof __require && __require;
if (!a && l) return l(c, !0);
if (r) return r(c, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = c;
}
var p = o[i] = {
exports: {}
};
e[i][0].call(p.exports, function(t) {
return s(e[i][1][t] || t);
}, p, p.exports, t, e, o, n);
}
return o[i].exports;
}
for (var r = "function" == typeof __require && __require, i = 0; i < n.length; i++) s(n[i]);
return s;
}({
ActivityDownloadUtil: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "8a1e1yrFnJDsbvh+mmw/AsB", "ActivityDownloadUtil");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../frame/BaseApp"), a = cc._decorator, c = a.ccclass, l = (a.property, 
function() {
this.isFinish = !1;
this.finish = 0;
this.total = 0;
}), p = function(t) {
s(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
o = e;
e.checkAct = function(t) {
if (o.downloads[t]) {
if (o.downloads[t].isFinish) {
console.log("当前是最新版本");
return !0;
}
console.log("活动正在下载 当前进度", o.downloads[t].finish + "/" + o.downloads[t].total);
i.default.instance.noticeMgr.addMsg("活动正在下载 当前进度" + o.downloads[t].finish + "/" + o.downloads[t].total);
return !1;
}
};
e.downloadBundle = function(t) {
if (o.downloads[t]) {
if (o.downloads[t].isFinish) {
console.log("当前是最新版本");
return !0;
}
console.log("活动正在下载 当前进度", o.downloads[t].finish + "/" + o.downloads[t].total);
return !1;
}
i.default.instance.noticeMgr.addMsg("开始加载活动" + t);
cc.assetManager.loadBundle("http://106.53.94.70/assets/" + t, function(e, n) {
console.log(n);
o.downloads[t] = new l();
console.log(t + "下载config成功");
n.preloadDir("./", function(e, n) {
console.log(e, n);
o.downloads[t].finish = e;
o.downloads[t].total = n;
}, function(e) {
e && console.log(e);
console.log(t + "加载所有资源完成");
o.downloads[t].isFinish = !0;
return !0;
});
});
};
var o;
e.downloads = [];
return o = r([ c ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../frame/BaseApp": "BaseApp"
} ],
AssetUtil: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "54a5c0otLBCL4fzTL/ssgXU", "AssetUtil");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, c = (i.property, function(t) {
s(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
o = e;
e.loadBundle = function(t) {
return new Promise(function(e, o) {
cc.assetManager.loadBundle(t, null, function(n, s) {
n && o(n);
console.log(t + "加载bundle成功");
e(s);
});
});
};
e.loadWindow = function(t, e) {
return new Promise(function(n, s) {
o.loadBundle(t).then(function() {
cc.assetManager.getBundle(t).load(e, function(t, e) {
t ? s(t) : n(e);
});
});
});
};
e.loadRes = function(t, e) {
return new Promise(function(n, s) {
o.loadBundle(t).then(function() {
cc.assetManager.getBundle(t).load(e, cc.SpriteFrame, function(t, e) {
t ? s(t) : n(e);
});
});
});
};
var o;
return o = r([ a ], e);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
BaseApp: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "5a071bb5GpELJAahO7MA/8T", "BaseApp");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../commonScript/AssetUtil"), a = t("./layer/layerMgr"), c = t("./notice/NoticeMgr"), l = t("./tip/TipMgr"), p = t("./update/UpdateMgr"), u = cc._decorator, f = u.ccclass, d = u.property, h = function(t) {
s(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.layer = null;
e.notice = null;
e._root = null;
return e;
}
o = e;
Object.defineProperty(e, "instance", {
get: function() {
return o._instance;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "root", {
get: function() {
return this._root;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "layerMgr", {
get: function() {
return this._layerMgr;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "tipMgr", {
get: function() {
return this._tipMgr;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "noticeMgr", {
get: function() {
return this._noticeMgr;
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "updateMgr", {
get: function() {
return this._updateMgr;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
o._instance = this;
console.log("[ App Loaded ! ]");
this._root = this.node;
cc.game.addPersistRootNode(this._root);
};
e.prototype.start = function() {
this.initMgr();
};
e.prototype.initMgr = function() {
var t = this;
this._layerMgr = new a.default(this.layer);
this._updateMgr = new p.default();
i.default.loadWindow("commonRes", "prefab/tipWindow").then(function(e) {
var o = cc.instantiate(e);
t._tipMgr = new l.default(o);
});
i.default.loadWindow("commonRes", "prefab/notice").then(function(e) {
t._noticeMgr = new c.default(e);
});
};
e.prototype.update = function(t) {
var e;
null === (e = this._updateMgr) || void 0 === e || e.addUpdate(t);
};
var o;
e._instance = new o();
r([ d(cc.Node) ], e.prototype, "layer", void 0);
r([ d(cc.Prefab) ], e.prototype, "notice", void 0);
return o = r([ f ], e);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../commonScript/AssetUtil": "AssetUtil",
"./layer/layerMgr": "layerMgr",
"./notice/NoticeMgr": "NoticeMgr",
"./tip/TipMgr": "TipMgr",
"./update/UpdateMgr": "UpdateMgr"
} ],
LayerCompoent: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "a88e6RG2XhMdrZmWgdSQ9ui", "LayerCompoent");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, c = (i.property, function(t) {
s(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {};
e.prototype.start = function() {};
return r([ a ], e);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
Load: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "33bc4vVtGdFQYlG+xqzoTmP", "Load");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, c = i.property, l = t("../commonScript/AssetUtil"), p = function(t) {
s(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.proText = null;
e.beginBtn = null;
return e;
}
e.prototype.onLoad = function() {
var t = this, e = [];
e.push(l.default.loadBundle("configs"));
e.push(l.default.loadBundle("commonRes"));
e.push(l.default.loadBundle("lobby"));
Promise.all(e).then(function() {
t.beginBtn.on(cc.Node.EventType.TOUCH_END, function() {
t.beginGame();
});
});
};
e.prototype.beginGame = function() {
cc.director.loadScene("Lobby");
};
e.prototype.start = function() {};
r([ c(cc.Label) ], e.prototype, "proText", void 0);
r([ c(cc.Node) ], e.prototype, "beginBtn", void 0);
return r([ a ], e);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../commonScript/AssetUtil": "AssetUtil"
} ],
MyDecorator: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "52c1a/a9AJP34mmFhU6vJGr", "MyDecorator");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.MyDecorator = void 0;
(function(t) {
t.printClass = function(t) {
console.log(t);
};
t.logMethod = function() {
return function(t, e, o) {
console.error("方法装饰器");
console.log(t);
console.log(e);
console.log(o.value);
};
};
t.logMethod2 = function(t, e, o) {
console.error("方法装饰器");
console.log(t);
console.log(e);
console.log(o.value);
};
})(o.MyDecorator || (o.MyDecorator = {}));
cc._RF.pop();
}, {} ],
NoticeMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "fba30S/Y61Pt63sm3J22Q9k", "NoticeMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.NoticeData = void 0;
var n = t("../BaseApp"), s = t("./Notice"), r = function(t, e, o) {
void 0 === t && (t = 1);
void 0 === o && (o = 1);
this.type = t;
this.index = e;
this.number = o;
};
o.NoticeData = r;
var i = function() {
function t(t) {
n.default.instance.updateMgr.regist(this);
this._preNotice = t;
this._noticeQueue = [];
console.log("noticeMgr is loaded");
}
t.prototype.addMsg = function(t, e, o) {
var n = new r(e, t, o);
0 == this._noticeQueue.length ? this._showMsg(n) : this._noticeQueue.push(n);
};
t.prototype._showMsg = function(t) {
var e = cc.instantiate(this._preNotice);
e.getComponent(s.default).init(t);
n.default.instance.layerMgr.addToBaseLayer(e);
};
t.prototype.frameUpdate = function() {};
t.prototype.secondUpdate = function() {
for (var t = 0; t < this._noticeQueue.length; t++) {
var e = this._noticeQueue.shift();
this._showMsg(e);
}
};
return t;
}();
o.default = i;
cc._RF.pop();
}, {
"../BaseApp": "BaseApp",
"./Notice": "Notice"
} ],
Notice: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "23b342Vsy1BhYN5zE9mPPdX", "Notice");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, c = i.property, l = function(t) {
s(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
return e;
}
e.prototype.init = function(t) {
console.log(t);
switch (t.type) {
case 1:
this.initText(t);
break;

default:
console.error("暂未实现");
}
};
e.prototype.initText = function(t) {
this.node.position = cc.v3(0, 0, 0);
this.node.opacity = 255;
this.label.string = t.index;
cc.tween(this.node).by(1, {
y: 200,
opacity: -150
}).delay(.5).call(this.recover.bind(this)).start();
};
e.prototype.recover = function() {
this.node.destroy();
};
e.prototype.start = function() {};
r([ c(cc.Label) ], e.prototype, "label", void 0);
return r([ a ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {} ],
Test: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "28c1aw7qXtBtJoSY3sT0EXm", "Test");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i, a = t("../commonScript/AssetUtil"), c = cc._decorator, l = c.ccclass, p = c.property;
(function(t) {
t[t["测试1号"] = 0] = "测试1号";
t[t["测试2号"] = 1] = "测试2号";
t[t["测试3号"] = 2] = "测试3号";
})(i || (i = {}));
var u = function(t) {
s(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.btnRelease = null;
e.btnCopy = null;
e.img1 = null;
e.img2 = null;
e.test = i.测试1号;
e._testText2 = "7777";
return e;
}
o = e;
e.prototype.getTestText2 = function() {
return this._testText2;
};
Object.defineProperty(e.prototype, "testText2", {
get: function() {
return this._testText2;
},
set: function(t) {
this._testText2 = t;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
var t = this;
console.log(this.test);
console.log(o.testText);
console.log(this.testText2);
this.btnRelease.on(cc.Node.EventType.TOUCH_END, this.release, this);
this.btnCopy.on(cc.Node.EventType.TOUCH_END, this.copy, this);
a.default.loadRes("act001", "res/2").then(function(e) {
console.log(e);
t.img1.spriteFrame = e;
t._res = e;
});
};
e.prototype.release = function() {
cc.assetManager.releaseAsset(this._res);
};
e.prototype.copy = function() {
this.img2.spriteFrame = this.img1.spriteFrame;
};
e.prototype.start = function() {
console.log(o.testText);
console.log(this.testText2);
};
e.prototype.update = function() {};
var o;
e.testText = "6666";
r([ p(cc.Node) ], e.prototype, "btnRelease", void 0);
r([ p(cc.Node) ], e.prototype, "btnCopy", void 0);
r([ p(cc.Sprite) ], e.prototype, "img1", void 0);
r([ p(cc.Sprite) ], e.prototype, "img2", void 0);
r([ p({
type: cc.Enum(i)
}) ], e.prototype, "test", void 0);
r([ p("222") ], e.prototype, "_testText2", void 0);
r([ function(t, e, o) {
console.error("方法装饰器");
console.log(t);
console.log(e);
console.log(o.value);
} ], e.prototype, "getTestText2", null);
r([ ("111", function(t, e) {
console.log(t);
console.log(e);
t[e] = "111";
}) ], e, "testText", void 0);
return o = r([ l ], e);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {
"../commonScript/AssetUtil": "AssetUtil"
} ],
TipMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "13696b+YVFPG4cgOyIZTU/H", "TipMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = t("../BaseApp"), s = t("./TipWindow"), r = function() {
function t(t) {
console.log("layer is loaded");
this._TipWindow = t;
}
t.prototype.showTipWindow = function(t, e, o, r) {
void 0 === r && (r = null);
this._TipWindow.active = !0;
this._TipWindow.getComponent(s.default).showTipWindow(t, e, o, r);
n.default.instance.layerMgr.addToBaseLayer(this._TipWindow);
};
return t;
}();
o.default = r;
cc._RF.pop();
}, {
"../BaseApp": "BaseApp",
"./TipWindow": "TipWindow"
} ],
TipWindow: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6861cn8NLpHNJ6h5j1n5VI9", "TipWindow");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = t("../BaseApp"), a = t("../decorator/MyDecorator"), c = cc._decorator, l = c.ccclass, p = c.property, u = (a.MyDecorator.logMethod, 
a.MyDecorator.logMethod2, function(t) {
s(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.btn1 = null;
e.btn2 = null;
e.text = null;
return e;
}
o = e;
e.prototype.frameUpdate = function() {
this.text.string = i.default.instance.updateMgr.localTime.toString();
};
e.prototype.secondUpdate = function() {
console.log("秒刷新");
this.text.string = i.default.instance.updateMgr.localTime.toString();
};
Object.defineProperty(e, "instance", {
get: function() {
return o._instance;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
o._instance = this;
};
e.prototype.onEnable = function() {
i.default.instance.updateMgr.regist(this);
};
e.prototype.start = function() {};
e.prototype.showTipWindow = function(t, e, o, n) {
void 0 === n && (n = null);
this.text.string = e;
this.btn1.on(cc.Node.EventType.TOUCH_END, o, t);
this.btn1.on(cc.Node.EventType.TOUCH_END, this.close, this);
n && this.btn2.on(cc.Node.EventType.TOUCH_END, n, t);
this.btn2.on(cc.Node.EventType.TOUCH_END, this.close, this);
};
e.prototype.close = function() {
this.node.active = !1;
i.default.instance.updateMgr.unRegist(this);
};
var o;
e._instance = null;
r([ p(cc.Node) ], e.prototype, "btn1", void 0);
r([ p(cc.Node) ], e.prototype, "btn2", void 0);
r([ p(cc.Label) ], e.prototype, "text", void 0);
return o = r([ l ], e);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {
"../BaseApp": "BaseApp",
"../decorator/MyDecorator": "MyDecorator"
} ],
UpdateAble: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "3b993Hd4j5CQK3Q00JR6N9W", "UpdateAble");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
UpdateMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "cf8ccf2vNNEtZZ+LLWnDYvL", "UpdateMgr");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, c = (i.property, function(t) {
s(e, t);
function e() {
var e = t.call(this) || this;
e._updates = [];
e._timeCount = 0;
e._secondCount = 0;
e.localTime = Date.now();
return e;
}
e.prototype.addUpdate = function() {
var t = this;
this._timeCount = Date.now() - this.localTime;
this.localTime += this._timeCount;
this._secondCount += this._timeCount;
this._updates.forEach(function(e) {
e.frameUpdate(t._timeCount);
});
if (this._secondCount - 1e3 > 0) {
this._updates.forEach(function(t) {
t.secondUpdate();
});
this._secondCount -= 1e3;
}
};
e.prototype.regist = function(t) {
-1 == this._updates.indexOf(t) ? this._updates.push(t) : console.warn("重复注册", t);
};
e.prototype.unRegist = function(t) {
this._updates.indexOf(t) >= 0 ? this._updates.splice(this._updates.indexOf(t), 1) : console.warn("未注册", t);
};
return r([ a ], e);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
hotUpdate: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2a669UxklZOsYLzagRPOTCS", "hotUpdate");
var n, s = this && this.__extends || (n = function(t, e) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
})(t, e);
}, function(t, e) {
n(t, e);
function o() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
}), r = this && this.__decorate || function(t, e, o, n) {
var s, r = arguments.length, i = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, o, n); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (i = (r < 3 ? s(i) : r > 3 ? s(e, o, i) : s(e, o)) || i);
return r > 3 && i && Object.defineProperty(e, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, a = i.ccclass, c = i.property, l = function(t) {
s(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.winUpdate = null;
e.update_prog_lab = null;
e.manifestUrl = null;
e.closeBtn = null;
e._assetsManager = null;
return e;
}
e.prototype.start = function() {
this.winUpdate.active = !1;
if (cc.sys.isNative) {
this._storagePath = jsb.fileUtils.getWritablePath() + "asset/";
this._assetsManager = new jsb.AssetsManager(this.manifestUrl.nativeUrl, this._storagePath);
this._assetsManager.setMaxConcurrentTask(3);
this.checkAsset();
} else console.log("非原生跳过热更");
};
e.prototype.closeClick = function() {
this.winUpdate.active = !1;
};
e.prototype.checkAsset = function() {
this._assetsManager.setEventCallback(this.callCheck.bind(this));
this._assetsManager.checkUpdate();
};
e.prototype.upDateClick = function() {
this.update_prog_lab.node.active = !0;
this.updateAsset();
};
e.prototype.updateAsset = function() {
this._assetsManager.setEventCallback(this.callUpdate.bind(this));
this._assetsManager.update();
};
e.prototype.callCheck = function(t) {
var e = !1;
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("No local manifest file found, hot update skipped.");
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
console.log("Fail to download manifest file, hot update skipped.");
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
console.log("Already up to date with the latest remote version.");
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
console.log("New version found, please try to update.");
this.update_prog_lab.node.active = !0;
var o = this._assetsManager.getTotalBytes() / 1024 / 1024;
this.update_prog_lab.string = o.toFixed(2) + "M更新";
e = !0;
break;

default:
return;
}
this._assetsManager.setEventCallback(null);
e && this.showUpdatePop();
};
e.prototype.showUpdatePop = function() {
this.winUpdate.active = !0;
};
e.prototype.callUpdate = function(t) {
var e = !1, o = !1;
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("No local manifest file found, hot update skipped.");
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var n = 100 * t.getPercent();
this.update_prog_lab.string = n.toFixed(2) + "%";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
console.log("Fail to download manifest file, hot update skipped.");
o = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
console.log("Already up to date with the latest remote version.");
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
console.log("Update finished. " + t.getMessage());
e = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
console.log("Update failed. " + t.getMessage());
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
console.log("Asset update error: " + t.getAssetId() + ", " + t.getMessage());
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
console.log(t.getMessage());
}
o && this._assetsManager.setEventCallback(null);
if (e) {
this._assetsManager.setEventCallback(null);
var s = jsb.fileUtils.getSearchPaths(), r = this._assetsManager.getLocalManifest().getSearchPaths();
Array.prototype.unshift.apply(s, r);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(s));
cc.sys.localStorage.setItem("HotUpdateVersion", new Date().getTime());
jsb.fileUtils.setSearchPaths(s);
cc.audioEngine.stopAll();
cc.game.restart();
}
};
r([ c(cc.Node) ], e.prototype, "winUpdate", void 0);
r([ c(cc.Label) ], e.prototype, "update_prog_lab", void 0);
r([ c({
type: cc.Asset
}) ], e.prototype, "manifestUrl", void 0);
r([ c(cc.Node) ], e.prototype, "closeBtn", void 0);
return r([ a ], e);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {} ],
layerMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "70c4c/3VWJOV46cYjAph5Da", "layerMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function t(t) {
console.log("layer is loaded");
this._baseLayer = t;
}
t.prototype.addToBaseLayer = function(t) {
t.parent = this._baseLayer;
};
return t;
}();
o.default = n;
cc._RF.pop();
}, {} ],
update: [ function(t, e) {
"use strict";
cc._RF.push(e, "faf17cE1SpOnZQnTWPRja72", "update");
cc.Class({
extends: cc.Component,
properties: {
manifestUrl: cc.Asset,
_updating: !1,
_canRetry: !1,
_storagePath: "",
label: {
default: null,
type: cc.Label
},
label2: {
default: null,
type: cc.Label
},
updateWindow: {
default: null,
type: cc.Node
}
},
checkCb: function(t) {
cc.log("Code: " + t.getEventCode());
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.label.string = "本地文件丢失";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
this.label.string = "下载远程mainfest文件错误";
break;

case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.label.string = "解析远程mainfest文件错误";
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.label.string = "已经是最新版本";
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this.label.string = "有新版本发现，请点击更新";
this.updateWindow.active = !0;
break;

default:
return;
}
this._am.setEventCallback(null);
this._checkListener = null;
this._updating = !1;
},
updateCb: function(t) {
var e = !1, o = !1;
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.label.string = "本地版本文件丢失，无法更新";
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var n = parseInt(100 * t.getPercent());
Number.isNaN(n) && (n = 0);
this.label.string = "更新进度:" + n;
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.label.string = "下载远程版本文件失败";
o = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.label.string = "当前为最新版本";
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
this.label.string = "更新完成. " + t.getMessage();
e = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.label.string = "更新失败. " + t.getMessage();
this._updating = !1;
this._canRetry = !0;
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
this.label.string = "资源更新错误: " + t.getAssetId() + ", " + t.getMessage();
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
this.label.string = t.getMessage();
}
if (o) {
this._am.setEventCallback(null);
this._updateListener = null;
this._updating = !1;
}
if (e) {
this._am.setEventCallback(null);
this._updateListener = null;
var s = jsb.fileUtils.getSearchPaths(), r = this._am.getLocalManifest().getSearchPaths();
cc.log(JSON.stringify(r));
Array.prototype.unshift(s, r);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(s));
jsb.fileUtils.setSearchPaths(s);
cc.audioEngine.stopAll();
cc.game.restart();
}
},
retry: function() {
if (!this._updating && this._canRetry) {
this._canRetry = !1;
this.label.string = "重现获取失败资源...";
this._am.downloadFailedAssets();
}
},
checkUpdate: function() {
console.log(cc.loader.md5Pipe);
if (this._updating) this.label.string = "检查更新中..."; else {
this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
if (this._am.getLocalManifest() && this._am.getLocalManifest().isLoaded()) {
this._am.setEventCallback(this.checkCb.bind(this));
this._am.checkUpdate();
this._updating = !0;
} else this.label.string = "本地manifest加载失败...";
}
},
hotUpdate: function() {
if (this._am && !this._updating) {
this._am.setEventCallback(this.updateCb.bind(this));
this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
this._failCount = 0;
this._am.update();
this._updating = !0;
}
},
onLoad: function() {
var t = this;
console.log(this.manifestUrl);
console.log(this.manifestUrl.nativeUrl);
var e = JSON.parse(this.manifestUrl._$nativeAsset);
console.log(e);
console.log(e.version);
this.label2.string = e.version;
this.updateWindow.active = !1;
if (cc.sys.isNative) {
this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "remote-asset";
cc.log("Storage path for remote asset : " + this._storagePath);
this.versionCompareHandle = function(e, o) {
t.label.string = "Compare: version A is " + e + ", version B is " + o;
for (var n = e.split("."), s = o.split("."), r = 0; r < n.length; ++r) {
var i = parseInt(n[r]), a = parseInt(s[r] || 0);
if (i !== a) return i - a;
}
return s.length > n.length ? -1 : 0;
};
this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
this._am.setVerifyCallback(function(e, o) {
var n = o.compressed, s = o.md5, r = o.path;
o.size;
if (n) {
t.label.string = "Verification passed : " + r;
return !0;
}
t.label.string = "Verification passed : " + r + " (" + s + ")";
return !0;
});
this.label.string = "热更新组件加载完毕，请手动点击检测按钮";
cc.sys.os === cc.sys.OS_ANDROID && this._am.setMaxConcurrentTask(2);
this.checkUpdate();
}
},
onDestroy: function() {
if (this._updateListener) {
this._am.setEventCallback(null);
this._updateListener = null;
}
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Test", "ActivityDownloadUtil", "AssetUtil", "BaseApp", "MyDecorator", "LayerCompoent", "layerMgr", "Notice", "NoticeMgr", "TipMgr", "TipWindow", "UpdateAble", "UpdateMgr", "Load", "hotUpdate", "update" ]);