import { BaseData } from "../../frame/data/BaseData"


export default class PlayerData extends BaseData {
    public static PLAYER_COLOR_CHANGE = "player_color_change"
    public static PLAYER_POS_CHANGE = "player_pos_change"

    private _id: number
    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
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
    }

    private _touch: cc.Vec2
    public get touch(): cc.Vec2 {
        return this._touch
    }
    public set touch(value: cc.Vec2) {
        this._touch = value
    }

}
