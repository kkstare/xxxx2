import BaseApp from "../../frame/BaseApp"
import { BaseData } from "../../frame/data/BaseData"
import SKSocket from "../../frame/net/SKSocket"
import UpdateAble from "../../frame/update/UpdateAble"
import FightView from "./FightView"


export default class PlayerData extends BaseData implements UpdateAble{

    public static PLAYER_COLOR_CHANGE = "player_color_change"
    public static PLAYER_POS_CHANGE = "player_pos_change"

    constructor() {
        super()
        this._moveSpeed = 5
        this._touch =new cc.Vec2(0,0)
    }


    private _id: number
    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }

    private _nickName: string
    public get nickName(): string {
        return this._nickName
    }
    public set nickName(value: string) {
        this._nickName = value
    }
    
    private _moveSpeed: number
    public get moveSpeed(): number {
        return this._moveSpeed
    }
    public set moveSpeed(value: number) {
        this._moveSpeed = value
    }
    

    private _color: cc.Color
    public get mycolor(): cc.Color {
        return this._color
    }
    public set mycolor(value: cc.Color) {
        this._color = value
        this.changeProperty(PlayerData.PLAYER_COLOR_CHANGE,this._color)
    }


    private _pos: cc.Vec2
    public get pos(): cc.Vec2 {
        return this._pos
    }
    public set pos(value: cc.Vec2) {
        this._pos = value
        // console.log("坐标变化")
        this.changeProperty(PlayerData.PLAYER_POS_CHANGE,this._pos)

    }

    private _touch: cc.Vec2 
    public get touch(): cc.Vec2 {
        return this._touch
    }
    public set touch(value: cc.Vec2) {
        // console.error("value")
        this._touch = value
    }


    frameUpdate(dt: any): void {
        this.pos = this.pos.add(this._touch.mul(this._moveSpeed))
        if (this._id == BaseApp.appData.agentId) {
            SKSocket.send("c2s_move", {
                agentId: BaseApp.appData.agentId,
                touchX: this._touch.x,
                touchY: this._touch.y,
                frame:FightView.instance.fightData.frames
            }) 
        }
 
        // this.pos.addSelf(this._touch.mul(this._moveSpeed))
    }
    secondUpdate(): void {

    }
}
