// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 * 레이어 생성 가이드
 */

// 레이어 이름 지정
var ChangerScene = new function () {
    var INSTANCE = this;
    //#########################################################################
    // Layer Sample
    //#########################################################################
    var nextLayer;
    var showLoading;
    var threadCnt;
    var nextIFrame = null;
    
    var frameX;
    
    var iframe;
    var loading;
    var loading_icon;
    var isReady = false;
    
    var setResource = function (onload) {
        
        var ran = SGUtil.getRandomInt(0, 4);
        loading_icon = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "loading/loading_" + ran + EXT_IFRAME],
            [loading = new Image(), ROOT_IMG + "loading/loading" + EXT_PNG],
            [loading_icon = [], HTool.getURLs(ROOT_IMG, "loading/loading_icon_", EXT_PNG, 4)]
        ];
        ResourceMgr.makeImageList(imgParam, function () {
            imgParam = null;
            onload();
        }, function (err) {
            GameManager.openDisconnectPopup("ChangerScene setReosurce fail!! -> " + err);
            onload();
        });
    };

    INSTANCE.setNextScene = function (_layer, _showLoading, _nextIFrame) {
        nextLayer = _layer;
        showLoading = _showLoading;
        nextIFrame = _nextIFrame;
    };
    
//    var isFade = false;
//    var fadeCnt = 0;
//    var fadeAni = function(g) {
//        if (isFade && fadeCnt > 0) {
//            fadeCnt--;
//        }
//        
//        if (!isFade && fadeCnt < 30) {
//            fadeCnt++;
//        }
//        
//        if (fadeCnt == 30) {
//            isFade = true;
//        }
//        
//        g.globalAlpha = fadeCnt / 10;
//    };
    
    
    //
    // HMF Default Function
    return {
        toString: function () {
            return "ChangerScene";
        },
        init: function (onload, loadData) {
            threadCnt = 0;
            frameX = 0;
//            fadeCnt = 0; //1;
//            isFade = false;
            isReady = false;
            setResource(onload);
        },
        start: function () {
            setTimeout(function() {
                nextLayer.getInstance().load(function () {
                    UIMgr.changeLayer(nextLayer);
                    isReady = true;
                });
            }, 3000);
        },
        run: function () {
            
//            if (isReady && threadCnt == 15) {
//                UIMgr.changeLayer(nextLayer);
//            }
            
            threadCnt++;
            UIMgr.repaint();
        },
        paint: function () {
            
//            fadeAni(g);
            
            g.drawImage(iframe, 0, 0);
            g.drawImage(loading, 970, 643);
            g.drawImage(loading_icon[threadCnt % 4], 1138, 592);
        },
        stop: function () {
            iframe =  null;
            nextIFrame = null;
            loading = null;
            loading_icon = null;
        },
        dispose: function() {
            
        },
        onKeyPressed: function (key) {
            switch (key) {
                case KEY_BLUE:
                case KEY_PC_BLUE :
                case KEY_PREV:
                    break;
                case KEY_ENTER :
                    break;
            }
        },
        onKeyReleased: function (key) {
            switch (key) {
                case KEY_ENTER :
                    break;
            }
        },
        getInstance: function () {
            return INSTANCE;
        }
    };
};
