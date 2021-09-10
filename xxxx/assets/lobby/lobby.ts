// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ActivityDownloadUtil from "../commonScript/ActivityDownloadUtil";
import AssetUtil from "../commonScript/AssetUtil";
import BaseApp from "../frame/BaseApp";
import NetManager from "../frame/net/NetManager";
import SKSocket from "../frame/net/SKSocket";
import UpdateAble from "../frame/update/UpdateAble";
// import { xxxx } from "../proto/proto";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lobby extends cc.Component implements UpdateAble {

    frameUpdate(dt: any): void {
        console.log("帧刷新方法")
    }
    secondUpdate(): void {
        console.log("秒刷新方法")
    }

    @property(cc.Node)
    btn1:cc.Node = null
    @property(cc.Node)
    btn2: cc.Node = null
    @property(cc.Node)
    btn3:cc.Node = null
    @property(cc.Node)
    btnSend:cc.Node = null
    
    private _text = "hello kkFrame"

    onLoad() {
        this.btn1.on(cc.Node.EventType.TOUCH_END,this.act1Click,this)
        this.btn2.on(cc.Node.EventType.TOUCH_END,this.act2Click,this)
        this.btn3.on(cc.Node.EventType.TOUCH_END,this.act3Click,this)
        this.btnSend.on(cc.Node.EventType.TOUCH_END,this.sendClick,this)

        // BaseApp.instance.updateMgr.regist(this)

    }

    start () {
        let arr = [1, 2, 3, 4, 5, 6]
        let a = arr.shift()
        console.log(a)
        console.log(arr)

        // NetManager.instance.connect({
        //     ip: "127.0.0.1",
        //     port: 3000,
        //     protocol: "ws"
        // }, 1000)
    }
    sendClick() {
        // let msg = xxxx.Login.create({
        //     userId: "1",
        //     password:"2"
        // })
        // let encode = xxxx.Login.encode(msg).finish();
        // console.log("编码",JSON.stringify(encode))

        // NetManager.instance.send(encode)
        SKSocket.send("c2s_login", {
            userId: 1,
            password:2
        })
    }
    btn1Click() {
        console.log("btn1 click")

        // BaseApp.instance.layerMgr.addToBaseLayer(this.btn1)
        AssetUtil.loadWindow("act001", "prefab/runView").then((res) => {
            let node = cc.instantiate(res)
            BaseApp.instance.layerMgr.addToBaseLayer(node)
        })
         // AssetUtil.loadWindow("commonRes", "prefab/tipWindow").then((res) => {
        //     let node = cc.instantiate(res)
        //     BaseApp.instance.layerMgr.addToBaseLayer(node)
        // })
        // BaseApp.instance.tipMgr.showTipWindow(this,"测试弹窗",this.fun1)
    }
    act1Click() {
        if (ActivityDownloadUtil.checkAct("act001")) {
            AssetUtil.loadWindow("act001", "prefab/runView").then((res) => {
                let node = cc.instantiate(res)
                BaseApp.instance.layerMgr.addToBaseLayer(node)
            })
        } else {
            ActivityDownloadUtil.downloadBundle("act001")    
 
        }
    }
    act2Click() {
     
    }
    act3Click() {
       
    }
    fun1() {
        console.log("点击了确认",this._text) 
    }
    fun2() {
        console.log("点击了取消")
        console.log(this._text)
    }
    // update (dt) {}
}
