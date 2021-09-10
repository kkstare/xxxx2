import AssetUtil from "../../commonScript/AssetUtil";
import * as ByteBuffer from "../../myNodeModules/bytebuffer";
import SKPacket from "./SKPacket";
// import SKTimeUtil from "../util/SKTimeUtil";
// import GameModel from "../../core/GameModel";

export enum SocketCode {
    SUCCESS = 0,
    IP_ERROR = 1,
    PORT_ERROR = 2,
    TIMEOUT = 3,
    ERROR = 4,
    CLOSE = 5,
    PING = 6,
}

export default class SKSocket {
    static shared = new SKSocket();
    static pbroot: any;
    static pbname: string = "c2s";
    static stringBlock: (msg: string) => void;
    static disconnectBlock: () => void;
    ip: string;
    port: number;
    socket: WebSocket;
    pingTimer: number;
    lastTime: number;
    isReconnect: boolean = false;
    lastCode: SocketCode;

    callList: { [key: string]: (data: any) => void };

    constructor() {
        this.callList = {};
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("SKSocket:重新返回游戏");
            this.lastTime = Date.now();
        }, this);
        this.lastCode = SocketCode.SUCCESS;
    }

    static register(prefix: string, call: (data: any) => void) {
        if (!prefix || prefix.length < 1) {
            cc.warn(`$警告:无效的注册前缀!`);
            return;
        }
        if (this.shared.callList[prefix]) {
            cc.warn(`$警告:${prefix}已注册!`);
        }
        this.shared.callList[prefix] = call;
    }

    static loadProto(url: string, complteBlock: () => void) {
        // cc.loader.loadRes(url, cc.TextAsset, (error: Error, result: cc.TextAsset) => {
        //     if (error) {
        //         cc.log(`加载协议失败${error.message}`);
        //         return;
        //     }
            
        //     let text = result.text;
        //     protobuf
        //     let temp = protobuf.parse(text);
        //     this.pbroot = temp.root;
        //     complteBlock();
        // })

        AssetUtil.loadBundle("commonRes").then(() => {
            cc.assetManager.getBundle("commonRes").load<cc.TextAsset>("proto/c2s",cc.TextAsset,(err, asset:cc.TextAsset) => {
                if (err) {
                    cc.log(`加载协议失败${err.message}`);
                    return;
                }      
                let text = asset.text;
                let temp = protobuf.parse(text);
                this.pbroot = temp.root;
                complteBlock();
                
            })  
        })
    }

    static connect(ip: string, port: number, failedBlock: (code: SocketCode) => void, successBlock: () => void) {
        this.shared.connect(ip, port, failedBlock, successBlock);
    }
    // 重连
    static reconnect(failedBlock: (code: SocketCode) => void, successBlock: () => void) {
        if (this.shared.isReconnect) {
            return;
        }
        this.shared.isReconnect = true;
        this.shared.connect(this.shared.ip, this.shared.port, failedBlock, successBlock);
    }
    // 发送
    static send(prefix: string, properties: any) {
        this.shared.send(prefix, properties);
    }
    // 关闭
    static close() {
        this.shared.close();
    }

    private connect(ip: string, port: number, failedBlock: (code: number) => void, successBlock: () => void) {
        if (!ip || ip.length < 1) {
            this.isReconnect = false;
            this.lastCode = SocketCode.IP_ERROR;
            failedBlock(this.lastCode);
            return;
        }
        if (!port) {
            this.isReconnect = false;
            this.lastCode = SocketCode.PORT_ERROR;
            failedBlock(this.lastCode);
            return;
        }
        this.ip = ip;
        this.port = port;
        let link = `ws://${this.ip}:${this.port}`;
        if (this.socket) {
            this.isReconnect = false;
            successBlock();
            return;
        }
        this.socket = new WebSocket(link);
        this.socket.binaryType = "arraybuffer";
        let self = this;
        this.socket.onopen = (event: Event) => {
            cc.log(`${self.isReconnect ? "重连" : "连接"}服务器:${link}成功`);
            self.onConnect();
            if (successBlock) {
                successBlock();
            }
        }
        this.socket.onmessage = (event: MessageEvent) => {
            self.lastTime = Date.now();
            if (typeof event.data == 'string') {
                if (event.data == "ping") {
                    return;
                }
                if (SKSocket.stringBlock) {
                    SKSocket.stringBlock(event.data);
                }
                return;
            }
            try {
                let buffer = new ByteBuffer();
                buffer.append(event.data);
                buffer.flip();
                let len = buffer.readShort();
                let prefix = buffer.readString(len);
                let call = self.callList[prefix];
                if (call) {
                    let leftBuffer = new Uint8Array(buffer.buffer).subarray(buffer.offset, buffer.limit);
                    let packet = SKPacket.create(prefix);
                    let data = packet.decode(leftBuffer);
                    call(data);
                    // if (GameModel.isDebug) {
                        cc.log(`接收协议:${prefix}`);
                    // }
                } else {
                    cc.warn(`未响应的协议:${prefix}`);
                }
            } catch (error) {
                cc.warn(error);
            }
        }
        this.socket.onerror = (event: Event) => {
            cc.warn(`连接服务器错误!`);
            self.lastCode = SocketCode.ERROR;
            failedBlock(self.lastCode);
            self.close();
        }
        this.socket.onclose = (event: CloseEvent) => {
            cc.warn(`服务器关闭!`);
            self.lastCode = SocketCode.CLOSE;
            failedBlock(self.lastCode);
            self.close();
        }
        cc.log(`开始连接服务器:${link}`);
    }

    onConnect() {
        this.isReconnect = false;
        this.lastCode = SocketCode.SUCCESS;
        this.lastTime = Date.now();
        // SKTimeUtil.cancelLoop(this.pingTimer);
        // // 5秒心跳
        // this.pingTimer = SKTimeUtil.loop(() => {
        //     let current = Date.now();
        //     // 20秒超时
        //     if (current - this.lastTime > 20000) {
        //         console.log(`超时断开链接`);
        //         this.lastCode = SocketCode.PING;
        //         this.close();
        //         return;
        //     }
        //     if (this.socket) {
        //         this.socket.send("ping");
        //     }
        // }, 5000);
    }

    close() {
        if (!this.socket) {
            return;
        }
        // SKTimeUtil.cancelLoop(this.pingTimer);
        if (this.socket.readyState < 2) {
            this.socket.close();
        }
        this.socket.onopen = null;
        this.socket.onmessage = null;
        this.socket.onerror = null;
        this.socket.onclose = null;
        this.socket = null;
        if (this.isReconnect) {
            this.isReconnect = false;
            return;
        }
        if (SKSocket.disconnectBlock) {
            SKSocket.disconnectBlock();
        }
    }

    private send(prefix: string, properties: any) {
        console.log(prefix, properties)
        if (!this.socket || this.socket.readyState != 1) {
            if (SKSocket.disconnectBlock) {
                SKSocket.disconnectBlock();
            }
            return;
        }
        let packet = SKPacket.create(prefix);
        let buffer = packet.encode(properties);
        this.socket.send(buffer);
        // if (GameModel.isDebug) {
            cc.log(`发送协议:${prefix}`);
        // }
    }
}