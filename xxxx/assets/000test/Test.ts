// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AssetUtil from "../commonScript/AssetUtil";
import { MyDecorator } from "../frame/decorator/MyDecorator";


const { ccclass, property } = cc._decorator;

function logProperty(parms:any) {
    return function (target: any, attr: any) {
        console.log(target)
        console.log(attr)

        target[attr] = parms
    }
}


function logMethod(parms: any) {
    return function (target: any, methodName: any, desc: any) {
        console.error("方法装饰器")
        console.log(target)
        console.log(methodName)
        console.log(desc.value)
    }
}

enum T{
    "测试1号" = 0,
    "测试2号" = 1,
    "测试3号" = 2,
}

@ccclass
export default class Test extends cc.Component {

    @property(cc.Node)
    btnRelease:cc.Node = null
    @property(cc.Node)
    btnCopy:cc.Node = null
    @property(cc.Sprite)
    img1: cc.Sprite = null
    @property(cc.Sprite)
    img2: cc.Sprite = null

    @property({type: cc.Enum(T)})
    test: T = T.测试1号;
        

    private _res: cc.SpriteFrame
    
    @logProperty("111")
    static testText:string = "6666"

    @property("222")
    private _testText2: string = "7777";

    @logMethod("niubi")
    /**
     * getTestText2 这算描述吗
     */
    public getTestText2() {
        return this._testText2
    }
        
    public get testText2(): string {
        return this._testText2;
    }
    public set testText2(value: string) {
        this._testText2 = value;
    }

    onLoad() {

        

        console.log(this.test)
        console.log(Test.testText)
        console.log(this.testText2)

        this.btnRelease.on(cc.Node.EventType.TOUCH_END,this.release,this)
        this.btnCopy.on(cc.Node.EventType.TOUCH_END,this.copy,this)

        AssetUtil.loadRes("act001", "res/2").then((res:cc.SpriteFrame) => {
            console.log(res)
            this.img1.spriteFrame = res
            this._res = res
        })
    }
    release() {
        // cc.assetManager.releaseAsset(this.img1.spriteFrame)

        //在2.4.3版本中 释放的图片资源还能被正常使用
        cc.assetManager.releaseAsset(this._res)

    }
    copy() {
        this.img2.spriteFrame = this.img1.spriteFrame
    }
    start () {
        console.log(Test.testText)
        console.log(this.testText2)

    }

    update(dt) {

    }
}
