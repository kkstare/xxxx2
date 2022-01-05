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
    road:cc.Node = null

    private _carSpeed = 0; 
    public get carSpeed() {
        return this._carSpeed;
    }
    public set carSpeed(value) {
        this._carSpeed = value;
        if(this._carSpeed > this.maxSpeed){
            this._carSpeed = this.maxSpeed
        }else if(this._carSpeed<0){
            this._carSpeed = 0
        }
    }
    
    private maxSpeed = 1.2

    private type = 0
    onLoad () {

        this.initRegister()
    }
    initRegister(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(event){
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                console.log('Press a key');
                this.type = 1
                break;
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
            case cc.macro.KEY.s:
                console.log('Press a key');
                this.type = 2

                break;
            case cc.macro.KEY.d:
                console.log('Press a key');
                break;
        }
    }
    onKeyUp(event){
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                console.log('Press a key');
                this.type = 0
                break;
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
            case cc.macro.KEY.s:
                console.log('Press a key');
                this.type = 0
                break;
            case cc.macro.KEY.d:
                console.log('Press a key');
                break;
        }

    }

    start () {
        let canvas = cc.find("Canvas")

        console.log(new window["JsBarcode"](canvas, "Hello"))

    }

    update (dt) {
        if(this.type == 1){
            this.carSpeed +=0.02
        }else if(this.type == 2){
            this.carSpeed -=0.02
        }else{
            // this.carSpeed -=0.01
        }
        console.log(this.carSpeed)
        this.road.getComponent(cc.Sprite).getMaterials()[0].setProperty('speed',this.carSpeed)
    }
}
