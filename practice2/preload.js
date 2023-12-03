// *************************************************************************************
// プリロードプロセスでは Node.js の全 API が利用可能です。
// Chrome 拡張機能と同じサンドボックスも持っています。
// *************************************************************************************

// [memo] importを利用する場合、以下エラーが発生した
// >>>
// Unable to load preload script:
// SyntaxError: Cannot use import statement outside a module
// <<<
// import {contextBridge, ipcRenderer} from "electron"

const { contextBridge, ipcRenderer} = require('electron')

// ================================================================
// index.html用
// ================================================================
contextBridge.exposeInMainWorld("indexDi", {
    // (A-2)レンダラー側で「window.indexDi.callDisposeMainWindow()」で呼び出せるようになります
    callDisposingMainWindow() {
        ipcRenderer.invoke('disposeMainWindowChannel')
    }
})