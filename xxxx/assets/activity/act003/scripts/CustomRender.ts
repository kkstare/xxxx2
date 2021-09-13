// // Learn TypeScript:
// //  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// // Learn Attribute:
// //  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// // Learn life-cycle callbacks:
// //  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// import CustomAssembler from "./CustomAssembler";

// const {ccclass, property} = cc._decorator;

// @ccclass
// export default class CustomRender  extends cc.RenderComponent {

//     @property(cc.Texture2D)
//     private _texture: cc.Texture2D = null;
//     @property(cc.Texture2D)
//     public get texture(): cc.Texture2D {
//         return this._texture;
//     }
//     public set texture(value: cc.Texture2D) {
//         this._texture = value;
//     }

//     public _assembler
//     private _spriteMaterial
//     private uv
//     private _renderData
//     private _material
//     ctor () {
//         // 顶点数据装配器
//         this._assembler = null;
//         // 材质
//         this._spriteMaterial = null;
//         // 纹理 UV 数据
//         this.uv = [];
//     }

//     // onLoad () {}

//     start () {

//     }

//     onEnable() {
//         // this._super();

//         this._updateAssembler();
//         this._activateMaterial();
//         this._calculateUV();

//         // this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onNodeSizeDirty, this);
//         // this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._onNodeSizeDirty, this);
//     }
//     onDisable () {
//         // this._super();

//         // this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onNodeSizeDirty, this);
//         // this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._onNodeSizeDirty, this);
//     }
    
//     // 设置组件的 Assembler
//     _updateAssembler() {

//         let assembler = new CustomAssembler();
        
//         if (this._assembler !== assembler) {
//             this._assembler = assembler;
//             this._renderData = null;
//         }

//         if (!this._renderData) {
//             this._renderData = this._assembler.init(this);
//             this._renderData.material = this._material;
//             // this.markForUpdateRenderData(true);
//         }
//     }
//     // 创建用于渲染图片的材质
//     _activateMaterial () {
//         let material = this._material;
//         if (!material) {
//             // material = this._material = new SpriteMaterial();
//         }
//         // 是否使用 Uniform 变量传递节点颜色
//         material.useColor = true;
//         if (this._texture) {
//             material.texture = this._texture;
//             // 标记渲染组件的渲染状态
//             // this.markForUpdateRenderData(true);
//             // this.markForRender(true);
//         } else {
//             // this.disableRender();
//         }

//         // this._updateMaterial(material);
//     }
//     // 设置纹理的 UV 数据
//     _calculateUV () {
//         let uv = this.uv;
//         // 设置纹理 UV 起始值
//         let l = 0, r = 1, b = 1,t = 0;

//         uv[0] = l;
//         uv[1] = b;
//         uv[2] = r;
//         uv[3] = b;
//         uv[4] = l;
//         uv[5] = t;
//         uv[6] = r;
//         uv[7] = t;
//     }
//     // LIFE-CYCLE CALLBACKS:


//     // update (dt) {}
// }
