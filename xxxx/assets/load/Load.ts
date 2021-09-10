// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import AssetUtil from "../commonScript/AssetUtil";
import SKSocket from "../frame/net/SKSocket";

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    proText:cc.Label = null

    @property(cc.Node)
    beginBtn:cc.Node = null
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let list: Promise<any>[] = []
        // list.push(new Promise<any>(
        //     (resolve, reject) => {
        //         cc.assetManager.loadBundle("configs", null, (err, res) => {
        //             if (err) {
        //                 reject(err)
        //             }
        //             console.log("加载configbundle成功")
        //             resolve(res)
        //         })
              
        //     })
        // )
        // list.push(new Promise<any>(
        //     (resolve, reject) => {
        //         cc.assetManager.loadBundle("commonRes", null, (err, res) => {
        //             if (err) {
        //                 reject(err)
        //             }
        //             console.log("加载commonResbundle成功")
        //             resolve(res)
        //         })      
        //     })
        // )
        // list.push(new Promise<any>(
        //     (resolve, reject) => {
        //         cc.assetManager.loadBundle("lobby", null, (err,res) => {
        //             if (err) {
        //                 reject(err)
        //             }
        //             console.log("加载lobbybundle成功")
        //             resolve(res)
        //         })   
        //     })
        // )
        
        list.push(AssetUtil.loadBundle("configs"))
        list.push(AssetUtil.loadBundle("commonRes"))
        list.push(AssetUtil.loadBundle("lobby"))
        SKSocket.loadProto("./c2s", () => {
            console.log("加载协议成功")
        })

        SKSocket.connect("127.0.0.1", 3000, (code) => {
            console.log("连接成功")
        }, () => {
            console.log("连接成功2")

        });


        Promise.all(list).then(() => {
            this.beginBtn.on(cc.Node.EventType.TOUCH_END, () => {
                this.beginGame()
            })
        })
    }

    beginGame() {
        cc.director.loadScene("Lobby")

    }

    start () {
    }

    // update (dt) {}
}
