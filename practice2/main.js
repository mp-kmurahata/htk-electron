// main.js

// このモジュールはアプリケーションの生き死にを制御し、ネイティブブラウザウインドウを作成します
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')

const createWindow = () => {
    // ブラウザウインドウを作成します。
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // そしてアプリの index.html を読み込みます。
    mainWindow.loadFile('index.html')

    // デベロッパー ツールを開きます。
    // mainWindow.webContents.openDevTools()
}

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない
        // 場合、アプリのウインドウを再作成するのが一般的です。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// (A-1)メインウィンドゥの終了処理を、レンダラー側から呼び出せるように、disposeMainWindowChannelというチャネル名で登録
const disposeMainWindow = (e) => {
    app.quit()
}
ipcMain.handle('disposeMainWindowChannel', disposeMainWindow)

// このファイルでは、アプリ内のとある他のメインプロセスコードを
// インクルードできます。 
// 別々のファイルに分割してここで require することもできます。