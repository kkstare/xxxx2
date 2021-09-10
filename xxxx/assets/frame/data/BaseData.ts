export class BaseData extends cc.Node{
  private _changeProperty: string[] = [];
  private _changePropertyParam: Object = {};

  protected changeProperty(property: string, ...args): void {
    this._changeProperty.push(property);
    this._changePropertyParam[property] = args;
    console.log(this._changeProperty)
    console.log(this._changePropertyParam[property])
    this.emit(property,this._changePropertyParam[property])
  }

  protected register() {
    
  }


}