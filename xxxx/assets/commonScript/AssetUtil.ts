// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AssetUtil extends cc.Component {
    static loadBundle(name) {
       return new Promise<any>(
            (resolve, reject) => {
                cc.assetManager.loadBundle(name, null, (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    console.log(name+"加载bundle成功")
                    resolve(res)
                })
            })
    }

}
