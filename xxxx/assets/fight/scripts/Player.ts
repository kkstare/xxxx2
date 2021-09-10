// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PlayerData from "./PlayerData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    img: cc.Node = null;
    @property(cc.Label)
    playerId: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    public _playerData:PlayerData

    onLoad() {
        this._playerData = new PlayerData()
        this._playerData.on(PlayerData.PLAYER_COLOR_CHANGE,this.colorChange.bind(this) )
    }

    start () {
        // this._playerData.color = cc.color(2,2,2,2)
    }

    colorChange() {
        console.log(arguments)
        this.img.color = arguments[0]
    }
    // update (dt) {}
}
