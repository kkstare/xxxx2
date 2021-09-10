window.__require = function t(o, e, n) {
function c(i, a) {
if (!e[i]) {
if (!o[i]) {
var l = i.split("/");
l = l[l.length - 1];
if (!o[l]) {
var p = "function" == typeof __require && __require;
if (!a && p) return p(l, !0);
if (r) return r(l, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = l;
}
var u = e[i] = {
exports: {}
};
o[i][0].call(u.exports, function(t) {
return c(o[i][1][t] || t);
}, u, u.exports, t, o, e, n);
}
return e[i].exports;
}
for (var r = "function" == typeof __require && __require, i = 0; i < n.length; i++) c(n[i]);
return c;
}({
Lobby: [ function(t, o, e) {
"use strict";
cc._RF.push(o, "43a81c31cpJNZiX8XVZng9L", "Lobby");
var n, c = this && this.__extends || (n = function(t, o) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, o) {
t.__proto__ = o;
} || function(t, o) {
for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);
})(t, o);
}, function(t, o) {
n(t, o);
function e() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (e.prototype = o.prototype, new e());
}), r = this && this.__decorate || function(t, o, e, n) {
var c, r = arguments.length, i = r < 3 ? o : null === n ? n = Object.getOwnPropertyDescriptor(o, e) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, o, e, n); else for (var a = t.length - 1; a >= 0; a--) (c = t[a]) && (i = (r < 3 ? c(i) : r > 3 ? c(o, e, i) : c(o, e)) || i);
return r > 3 && i && Object.defineProperty(o, e, i), i;
};
Object.defineProperty(e, "__esModule", {
value: !0
});
var i = t("../commonScript/ActivityDownloadUtil"), a = t("../commonScript/AssetUtil"), l = t("../frame/BaseApp"), p = cc._decorator, u = p.ccclass, f = p.property, s = function(t) {
c(o, t);
function o() {
var o = null !== t && t.apply(this, arguments) || this;
o.btn1 = null;
o.btn2 = null;
o.btn3 = null;
o._text = "hello kkFrame";
return o;
}
o.prototype.frameUpdate = function() {
console.log("帧刷新方法");
};
o.prototype.secondUpdate = function() {
console.log("秒刷新方法");
};
o.prototype.onLoad = function() {
this.btn1.on(cc.Node.EventType.TOUCH_END, this.act1Click, this);
this.btn2.on(cc.Node.EventType.TOUCH_END, this.act2Click, this);
this.btn3.on(cc.Node.EventType.TOUCH_END, this.act3Click, this);
};
o.prototype.start = function() {
var t = [ 1, 2, 3, 4, 5, 6 ], o = t.shift();
console.log(o);
console.log(t);
};
o.prototype.btn1Click = function() {
console.log("btn1 click");
a.default.loadWindow("act001", "prefab/runView").then(function(t) {
var o = cc.instantiate(t);
l.default.instance.layerMgr.addToBaseLayer(o);
});
};
o.prototype.act1Click = function() {
i.default.checkAct("act001") ? a.default.loadWindow("act001", "prefab/runView").then(function(t) {
var o = cc.instantiate(t);
l.default.instance.layerMgr.addToBaseLayer(o);
}) : i.default.downloadBundle("act001");
};
o.prototype.act2Click = function() {};
o.prototype.act3Click = function() {};
o.prototype.fun1 = function() {
console.log("点击了确认", this._text);
};
o.prototype.fun2 = function() {
console.log("点击了取消");
console.log(this._text);
};
r([ f(cc.Node) ], o.prototype, "btn1", void 0);
r([ f(cc.Node) ], o.prototype, "btn2", void 0);
r([ f(cc.Node) ], o.prototype, "btn3", void 0);
return r([ u ], o);
}(cc.Component);
e.default = s;
cc._RF.pop();
}, {
"../commonScript/ActivityDownloadUtil": void 0,
"../commonScript/AssetUtil": void 0,
"../frame/BaseApp": void 0
} ]
}, {}, [ "Lobby" ]);