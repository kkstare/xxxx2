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

    private _playerData: PlayerData;
    public get playerData(): PlayerData {
        return this._playerData;
    }
    public set playerData(value: PlayerData) {
        this._playerData = value;
  
    }


    onLoad() {
        // this._playerData = new PlayerData()
        this._playerData.on(PlayerData.PLAYER_COLOR_CHANGE,this.colorChange,this)
        this._playerData.on(PlayerData.PLAYER_POS_CHANGE,this.posChange,this)
    }
 
    start () {
        // this._playerData.color = cc.color(2,2,2,2)
    }
    posChange() {
        // console.log(arguments)

        // console.log(arguments[0])
        this.node.position = arguments[0]
        // console.log(this.node.position.x,this.node.position.y)

    }
    colorChange() {
        // console.log(arguments)
        // this.img.color = arguments[0]
    }
    // update (dt) {}
}
