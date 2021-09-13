// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AssetUtil from "../../commonScript/AssetUtil";
import BaseApp from "../../frame/BaseApp";
import FightData from "./FightData";
import Player from "./Player";
import PlayerData from "./PlayerData";
import TouchNode from "./TouchNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FightView extends cc.Component {
    @property(cc.Node)
    battleNode: cc.Node = null
    


    private static _instance: FightView;
    public static get instance(): FightView {
        return FightView._instance;
    }

    private _fightData: FightData;
    public get fightData(): FightData {
        return this._fightData;
    }
    public set fightData(value: FightData) {
        this._fightData = value;
    }

    onLoad() {
        FightView._instance = this
        this._fightData = new FightData()
        BaseApp.instance.updateMgr.regist(this._fightData)
    }
    initData(data) {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            console.log(element)
            let playerData = new PlayerData()
            BaseApp.instance.updateMgr.regist(playerData)

            playerData.id = element.agentId
            playerData.nickName = element.heroName
            playerData.pos = new cc.Vec2(Math.random()*300, Math.random()*300)
      
            AssetUtil.loadWindow("fight", "prefab/player").then((res) => {
                let node = cc.instantiate(res)
                node.getComponent(Player).playerData =  playerData
                node.parent = this.battleNode
                //初始化遥感
                if (playerData.id == BaseApp.appData.agentId ) {
                    TouchNode.instance.player = node
                }
            })
        
            this._fightData.players.push(playerData)
        }
    }

    start () {

    }

    // update (dt) {}
}
