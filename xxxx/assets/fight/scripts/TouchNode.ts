// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    moveNode: cc.Node = null;

    @property(cc.Node)
    player:cc.Node = null

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchBegin,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
    }

    start () {

    }
    touchBegin(event:cc.Event.EventTouch) {
        this.player.getComponent(Player)._playerData.mycolor = cc.color(1,1,1,1)
    }
    touchMove(event:cc.Event.EventTouch) {
        let delta = event.getDelta()
        console.log(delta.x, delta.y)
        let noDelta = delta.normalize()
        console.log(noDelta.x,noDelta.y)
    }
    touchEnd(event:cc.Event.EventTouch) {
        
    }

    // update (dt) {}
}
