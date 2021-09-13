// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    otherTeam: cc.Node = null
    @property(cc.Node)
    myTeam:cc.Node = null

    @property(cc.Prefab)
    playerLoadNode:cc.Prefab = null

    onLoad() {
        
    }

    start () {

    }

    // update (dt) {}
}
