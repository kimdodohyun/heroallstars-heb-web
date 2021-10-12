// Strict Mode On (엄격모드)
"use strict";
"use warning";

var WaitingPopup = new function () {
    var INSTANCE = this;
    var callback;

    var threadCnt;

    var loading;
    var loading_icon = [];
    
    var x, y;

    var setResource = function (onload) {
        loading_icon = [];
        var imgParam = [
            [loading = new Image(), ROOT_IMG_LOADING + "loading" + EXT_PNG],
            [loading_icon = [], HTool.getURLs(ROOT_IMG_LOADING, "loading_icon_", EXT_PNG, 4)]
        ];
        ResourceMgr.makeImageList(imgParam, function () {
            imgParam = null;
            x = Math.floor(SCREEN_WIDTH / 2) - Math.floor(loading.width / 2);
            y = Math.floor(SCREEN_HEIGHT / 2) - Math.floor(loading.height / 2);
            onload();
        }, function (err) {
            StarmonManager.openDisconnectPopup("setReosurce fail!! -> " + err);
        });
    };

    return {
        toString: function () {
            return "WaitingPopup";
        },
        setResource: function(onload){
            setResource(onload);
        },
        init: function (onload, callbackFunc) {
            callback = callbackFunc;
            threadCnt = 0;
            onload();
        },
        start: function () {

        },
        run: function () {
            threadCnt++;
            UIMgr.repaint();
        },
        paint: function () {
            g.drawImage(loading, x, y);
            g.drawImage(loading_icon[threadCnt % 4], x + 168, y - 51);
        },
        stop: function () {
        },
        dispose: function () {
            loading = null;
            loading_icon = null;
        },
        onKeyPressed: function (key) {
            switch (key) {
                case KEY_ENTER :
                case KEY_PREV:
                    break;
            }
        },
        onKeyReleased: function (key) {
        },
        getInstance: function () {
            return INSTANCE;
        }
    };
};
