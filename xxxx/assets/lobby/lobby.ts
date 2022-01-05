// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ActivityDownloadUtil from "../commonScript/ActivityDownloadUtil";
import AssetUtil from "../commonScript/AssetUtil";
import FightView from "../fight/scripts/FightView";
import BaseApp from "../frame/BaseApp";
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

        // let str = ""
        // for (let index = 1; index < 101; index++) {
        //     let x = "复活第"+index+"次用"+index+"个返魂丹\n"
        //     str += x

        // }
        // console.log(str)
        
        // NetManager.instance.connect({
        //     ip: "127.0.0.1",
        //     port: 3000,
        //     protocol: "ws"
        // }, 1000)

    }


    captureNode(nodeCapture: cc.Node) {
        let nodeCamera = new cc.Node();
        nodeCamera.parent = cc.find("Canvas");
        let camera = nodeCamera.addComponent(cc.Camera);

        let width = nodeCapture.width;
        let height = nodeCapture.height;

        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc["gfx"].RB_FMT_S8);

        camera.targetTexture = texture;

        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext('2d');
        camera.render();

        // 指定需要读取的区域的像素
        let size = nodeCapture.getContentSize();
        let pixels = new Uint8Array(size.width * size.height * 4);
        let x = texture.width / 2 - nodeCapture.width / 2;
        let y = texture.height / 2 - nodeCapture.height / 2;
        let w = nodeCapture.width;
        let h = nodeCapture.height;
        let data = texture.readPixels(pixels, x, y, w, h);

        // write the render data
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }

        let dataURL = canvas.toDataURL("image/png");
        let img = document.createElement("img");
        img.src = dataURL;

        let texture2D = new cc.Texture2D();
        texture2D.initWithElement(img);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture2D);

        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        return node;
    }


    renderNode(nodeCapture: cc.Node) {
        let nodeCamera = new cc.Node();
        nodeCamera.parent = cc.find("Canvas");
        let camera = nodeCamera.addComponent(cc.Camera);

        let position = nodeCapture.getPosition();
        let width = nodeCapture.width;
        let height = nodeCapture.height;

        // 当 alignWithScreen 为 true 的时候，摄像机会自动将视窗大小调整为整个屏幕的大小。如果想要完全自由地控制摄像机，则需要将 alignWithScreen 设置为 false。（v2.2.1 新增）
        camera.alignWithScreen = false;
        // 设置摄像机的投影模式是正交（true）还是透视（false）模式
        camera.ortho = true;
        // 摄像机在正交投影模式下的视窗大小。该属性在 alignWithScreen 设置为 false 时生效。
        camera.orthoSize = height / 2;

        let texture = new cc.RenderTexture();
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        texture.initWithSize(width, height, cc["gfx"].RB_FMT_S8);

        // 如果设置了 targetTexture，那么摄像机渲染的内容不会输出到屏幕上，而是会渲染到 targetTexture 上。
        camera.targetTexture = texture;

        // 创建画布
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext('2d');

        nodeCapture.setPosition(cc.Vec2.ZERO);
        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render(nodeCapture);
        nodeCapture.setPosition(position);

        // 从 render texture 读取像素数据，数据类型为 RGBA 格式的 Uint8Array 数组。
        // 默认每次调用此函数会生成一个大小为 （长 x 高 x 4） 的 Uint8Array。
        let data = texture.readPixels();
        // write the render data
        // PNG 中 1 像素 = 32 bit（RGBA），1 byte = 8 bit，所以 1 像素 = 4 byte
        // 每行 width 像素，即 width * 4 字节
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            // RenderTexture 得到的纹理是上下翻转的
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }

        let dataURL = canvas.toDataURL("image/png");
        let img = document.createElement("img");
        img.src = dataURL;

        nodeCamera.destroy();

        let texture2D = new cc.Texture2D();
        texture2D.initWithElement(img);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture2D);

        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        return node;
    }

    sendClick() {
        // let msg = xxxx.Login.create({
        //     userId: "1",
        //     password:"2"
        // })
        // let encode = xxxx.Login.encode(msg).finish();
        // console.log("编码",JSON.stringify(encode))

        // NetManager.instance.send(encode)

        BaseApp.instance.noticeMgr.addMsg("开始匹配对手")
        console.log(BaseApp.appData.agentId)

        // SKSocket.send("c2s_match", {
        //     agentId: BaseApp.appData.agentId,
        //     heroName:""+Math.random()
        // })

        
        AssetUtil.loadWindow("fight", "prefab/fightView").then((res) => {
            let node = cc.instantiate(res)
            BaseApp.instance.layerMgr.addToBaseLayer(node)
            FightView.instance.initData(null)
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
        let node1 = this.captureNode(this.node.getChildByName("test1"))
        node1.parent = this.node.getChildByName("test3")

        let node2 = this.renderNode(this.node.getChildByName("test1"))
        node2.parent = this.node.getChildByName("test4")

    }
    act3Click() {
        AssetUtil.loadWindow("act004", "prefab/bagView").then((res) => {
            let node = cc.instantiate(res)
            BaseApp.instance.layerMgr.addToBaseLayer(node)
        })
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
