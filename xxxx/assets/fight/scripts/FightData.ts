// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UpdateAble from "../../frame/update/UpdateAble";
import playerData from "./PlayerData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FightData extends cc.Component implements UpdateAble {
    public players: playerData[] = [] 
    public frames: number
    
    constructor() {
        super()
        this.frames = 0
    }


    frameUpdate(dt: any): void {
        this.frames ++
    }
    secondUpdate(): void {
        // throw new Error("Method not implemented.");
    }

}
