// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import AssetUtil from "../commonScript/AssetUtil";
import NetAgent from "../frame/net/NetAgent";

import SKSocket from "../frame/net/SKSocket";

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    proText:cc.Label = null

    @property(cc.Node)
    beginBtn:cc.Node = null
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
      
    }

    beginGame() {
        cc.director.loadScene("Lobby")
    }

    start() {
        let list: Promise<any>[] = []
        
        NetAgent.instance.registerProto()

        list.push(AssetUtil.loadBundle("configs"))
        list.push(AssetUtil.loadBundle("commonRes"))
        list.push(AssetUtil.loadBundle("lobby"))
        list.push(new Promise<any>(
            (resolve, reject) => {
                SKSocket.loadProto("./c2s", () => {
                    console.log("加载协议成功")
                    resolve(true)
                })
            }
        ) )  

        Promise.all(list).then(() => {

            SKSocket.connect("127.0.0.1", 3000, (code) => {
                console.log("连接失败",code)
            }, () => {
                console.log("连接成功2")
                SKSocket.send("c2s_login", {
                    userId: 1,
                    password:2
                })
            });

            this.beginBtn.on(cc.Node.EventType.TOUCH_END, () => {
                this.beginGame()
            })
        })
    }

    // update (dt) {}
}
