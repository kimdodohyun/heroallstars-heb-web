
// Strict Mode On (엄격모드)
"use strict";
"use warning";

// 레이어 이름 지정
var NoticePopup = new function() {
    var INSTANCE = this;
    var img;
    var listener;
    var ox, oy;
    INSTANCE.setResource = function(path, onload) {
        ResourceMgr.loadImage(img = new Image(), path, function () {
            ox = (SCREEN_WIDTH - img.width) / 2;
            oy = (SCREEN_HEIGHT - img.height) / 2;
            onload();
        }, function (err) {
            appMgr.openDisconnectPopup("notice Popup fail", INSTANCE);
            HLog.err(err.message);
            onload();
        });
    };
    // HMF Default Function
    return {
        toString: function() {
            return "NoticePopup";
        },
        init: function(onload, loadData) {
            listener = loadData;
            onload();
        },
        start: function() {
            // To Do .. 
        },
        run: function() {

        },
        paint: function() {
            g.drawImage(img, ox, oy);
        },
        stop: function() {
            img = null;
        },
        dispose: function() {
            // 어플리케이션이 종료될 때 실행되는 함수
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                case KEY_PREV :
                    if (listener != null) {
                        listener("CLOSE");
                    } else {
                        PopupMgr.closePopup();
                    }
                    break;
            }
            UIMgr.repaint();
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
