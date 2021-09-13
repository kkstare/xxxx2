// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseApp from "../../frame/BaseApp";
import SKSocket from "../../frame/net/SKSocket";
import FightView from "./FightView";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchNode extends cc.Component {
    private static _instance: TouchNode;
    public static get instance(): TouchNode {
        return TouchNode._instance;
    }



    @property(cc.Node)
    moveNode: cc.Node = null;

    @property(cc.Node)
    player:cc.Node = null

    private _beginPos
    onLoad() {
        TouchNode._instance = this
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegin, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this)

    }

    start () {

    }
    touchBegin(event:cc.Event.EventTouch) {
        // this.player.getComponent(Player).playerData.mycolor = cc.color(1,1,1,1)
        this._beginPos = event.getLocation()
    }
    touchMove(event:cc.Event.EventTouch) {

        let delta = event.getLocation().sub(new cc.Vec2(150,150) )
        let noDelta = delta.normalize()
        this.moveNode.position = new cc.Vec3(noDelta.x*50,noDelta.y*50,0)
        this.player.getComponent(Player).playerData.touch = noDelta


    }
    touchEnd(event:cc.Event.EventTouch) {
        this.player.getComponent(Player).playerData.touch = new cc.Vec2(0,0)
    }
    touchCancel(event:cc.Event.EventTouch) {
        this.player.getComponent(Player).playerData.touch = new cc.Vec2(0,0)

    }
    // update (dt) {}
}
