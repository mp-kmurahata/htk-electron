// (A-3) #close_main_window クリック時に、preload.jsの「callDisposingMainWindow()」経由で、disposeMainWindow()を呼び出す
const closeMainWindowButton = document.querySelector("#close_main_window")
closeMainWindowButton.addEventListener('click', function (e) {
    window.indexDi.callDisposingMainWindow()
})
