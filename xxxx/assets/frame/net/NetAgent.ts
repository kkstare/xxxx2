import BaseApp from "../BaseApp";
import SKSocket from "./SKSocket";




export default class NetAgent {
  private static _instance:NetAgent = null;
  public static get instance() {
    if (NetAgent._instance == null) {
      NetAgent._instance = new NetAgent()
    }
    return NetAgent._instance
  }


  registerProto() {
    let self = this;
    SKSocket.register("s2c_login", (data: any) => {
      console.log("登陆成功", data)
      BaseApp.instance.noticeMgr.addMsg("登陆成功")
    });
    

  }
}

