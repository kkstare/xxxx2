// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import AssetUtil from "../commonScript/AssetUtil";

@ccclass
export default class NewClass extends cc.Component {


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

        Promise.all(list).then(() => {
            cc.director.loadScene("Lobby")
        })

    }

    start () {
    }

    // update (dt) {}
}
