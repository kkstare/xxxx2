// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AssetUtil from "../../../commonScript/AssetUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bagItems:cc.Node
    @property(cc.Node)
    closeBtn: cc.Node
    
    // LIFE-CYCLE CALLBACKS:
    private _bagItem:cc.Prefab
    private _column: number = 7
    private _left:number = 50
    private _top:number = 50
    private _itemSize:cc.Vec2 =new cc.Vec2(80,80)
    private _dataLength: number = 100
    

    onLoad() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
        AssetUtil.loadWindow("act004", "prefab/bagItem").then((res) => {
            this._bagItem = res
            this.initItems()
        })  
    }
    initItems() {
        this.bagItems.setContentSize(cc.size(600,this._top+this._itemSize.y*Math.ceil(this._dataLength/this._column)))
        for (let index = 0; index < this._dataLength; index++) {
            let node = cc.instantiate(this._bagItem)
            // node.parent = this.bagItems
            this.addToLayer(node,index)
        }
    }

    addToLayer(node: cc.Node, curIndex: number) {
        let rows = Math.floor(curIndex/this._column)
        let column = curIndex%this._column
        for (let index = 0; index < node.children.length; ) {
            let childNode = node.children[index]
            let layerName = childNode.name+"layer"
            if (curIndex == 0) {
                let layerNode = new cc.Node()
                layerNode.name = layerName
                this.bagItems.addChild(layerNode)
            }
            childNode.removeFromParent()
            childNode.position = childNode.position.addSelf(new cc.Vec3(column*this._itemSize.x+this._left,rows*-this._itemSize.y-this._top,0))
            this.bagItems.getChildByName(layerName).addChild(childNode)
        }
    }
    close() {
        this.node.destroy()

    }
    start () {

    }

    // update (dt) {}
}
