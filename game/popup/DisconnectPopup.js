// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var DisconnectPopup = new function() {
    var INSTANCE = this;
    //#########################################################################
    // Service Error Popup
    //#########################################################################

    //
    // User Private Function & Variable
    var errorImg = new Image();
    errorImg.src = ROOT_UPDATE + "netErrPopup" + EXT_PNG;
    //
    // HMF Default Function
    return {
        toString: function() {
            return "Disconnect Popup";
        },
        init: function(onload) {
            document.getElementById("PLAYZ").style.visibility = "hidden";
            onload();
        },
        start: function() {

        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(errorImg, (SCREEN_WIDTH / 2) - (errorImg.width / 2), (SCREEN_HEIGHT / 2) - (errorImg.height / 2));
        },
        stop: function() {
            document.getElementById("PLAYZ").style.visibility = "visible";
            errorImg = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_PREV:
                case KEY_ENTER :
                    PopupMgr.closeAllPopup();
                    // BTV 장애 팝업 발생시 어플 종료 메소드 
                    android.exitGame();
//                    ApplicationDestroyRequest(true);
                    break;
            }
        },
        onKeyReleased: function(key) {
            switch(key) {
                case KEY_ENTER :
                    break;
            }
        },
        getInstance: function() {
            return INSTANCE;
        }
    };
};