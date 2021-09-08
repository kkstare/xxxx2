// import BundleManager from "../BundleManager";
// import NetModel from "../Net/NetModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpdate extends cc.Component {
    @property(cc.Node)
    winUpdate: cc.Node = null;
    @property(cc.Label)
    update_prog_lab: cc.Label = null;
    // @property(cc.Node)
    // update_prom: cc.Node = null;

    @property({ type: cc.Asset })
    manifestUrl: cc.Asset = null;

    @property(cc.Node)
    closeBtn: cc.Node = null;

    private _storagePath: string;
    private _assetsManager = null;

    start() {
        // BundleManager.instance.loadBundle("load", () => {
        this.winUpdate.active = false;
        if (cc.sys.isNative) {
            this._storagePath = jsb.fileUtils.getWritablePath() + "asset/";
            this._assetsManager = new jsb.AssetsManager(this.manifestUrl.nativeUrl, this._storagePath);
            this._assetsManager.setMaxConcurrentTask(3);
            this.checkAsset();
        } else {
            console.log("非原生跳过热更")
        }
    }

    closeClick(): void {
        this.winUpdate.active = false;
        // NetModel.instance.load.startGame();
    }

    checkAsset(): void {
        this._assetsManager.setEventCallback(this.callCheck.bind(this));
        this._assetsManager.checkUpdate();
    }

    upDateClick(): void {
        // this.update_prom.active = false;
        this.update_prog_lab.node.active = true;
        this.updateAsset();
    }

    updateAsset() {
        this._assetsManager.setEventCallback(this.callUpdate.bind(this));
        this._assetsManager.update();
    }

    callCheck(event) {
        let update = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('No local manifest file found, hot update skipped.');
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Already up to date with the latest remote version.');
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('New version found, please try to update.');
                this.update_prog_lab.node.active = true;
                let bytes = this._assetsManager.getTotalBytes() / 1024 / 1024;
                this.update_prog_lab.string = bytes.toFixed(2) + "M更新"
                update = true;
                break;
            default:
                return;
        }
        this._assetsManager.setEventCallback(null);
        if (update) {
            this.showUpdatePop();
        } else {
            // this.beginGame();
            // NetModel.instance.load.startGame();
        }
    }

    showUpdatePop(): void {
        this.winUpdate.active = true;
        // this.update_prom.active = true;
        // this.update_prog_lab.node.active = false;
        // this.closeBtn.active = false;
        // this.update_prog_lab.string = "正在更新..."
    }

    callUpdate(event) {
        let finished = false;
        let failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('No local manifest file found, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let progress = event.getPercent() * 100
                this.update_prog_lab.string = progress.toFixed(2) + "%";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('Update finished. ' + event.getMessage());
                finished = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log('Update failed. ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log(event.getMessage());
                break;
            default:
                break;
        }
        if (failed) {
            this._assetsManager.setEventCallback(null);
        } if (finished) {
            this._assetsManager.setEventCallback(null);
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._assetsManager.getLocalManifest().getSearchPaths();
            Array.prototype.unshift.apply(searchPaths, newPaths);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            cc.sys.localStorage.setItem("HotUpdateVersion", new Date().getTime())
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.audioEngine.stopAll();
            cc.game.restart();
            // this.winUpdate.active = false;
            // NetModel.instance.load.startGame();
        }
    }

    // update (dt) {}
}
