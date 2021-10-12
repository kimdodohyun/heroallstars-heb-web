"use strict";
"use warning";

var SceneManager = new function() {
    var INSTANCE = this;
    
    this.ranTip;
    this.tipStrLength;
    this.tipStr_x;
    this.tipImg_x;
    this.tip_Str;
    
    var tip;
    var loadingIdx;
    var scene;
    var prevScene
    var prevWatiScene;
    
    var loadingByte; // img
    var gameLoadingByte;
    var bg_Byte;
    
    INSTANCE.init = function() {
        
        
        var imgParam = [
            [tip = new Image(), ROOT_IMG + "etc/tip" + EXT_PNG]
        ];

        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
        }, function(err) {
            GameManager.openDisconnectPopup("SceneManager init Fail!!", this);
        });
        
        
//        ResourceMgr.loadImage(tip = new Image(), ROOT_IMG + "etc/tip" + EXT_PNG, function() {
//        }, function(err) {
//            GameManager.openDisconnectPopup("SceneManager init Fail!!", this);
//        });
    };
    
    INSTANCE.setTip = function(obj) {
        try {
            this.tip_Str = [];
            this.tip_Str[0] = obj.tip_0;
            this.tip_Str[1] = obj.tip_1;
            this.tip_Str[2] = obj.tip_2;
            this.tip_Str[3] = obj.tip_3;
            this.tip_Str[4] = obj.tip_4;
            this.tip_Str[5] = obj.tip_5;
            this.tip_Str[6] = obj.tip_6;
            this.tip_Str[7] = obj.tip_7;
            this.tip_Str[8] = obj.tip_8;
            
        } catch (e) {
            console.error(e.message);
        }
    };
    
    INSTANCE.setLoadingTip = function() {
        try {
            loadingIdx = 1;
            
            this.ranTip = Math.random() * this.tip_Str.length;
            this.tipStrLength = HTextRender.getStrWidth(g, this.tip_Str[this.ranTip], FONT_15);
            this.tipStr_x = (SCREEN_WIDTH / 2) + (tip.width / 2) + 2;
            this.tipImg_x = (SCREEN_WIDTH / 2) - (tip.width / 2) - (this.tipStrLength / 2) - 2;
        } catch (e) {
            console.error(e.message);
        }
    };
    
    INSTANCE.getLoadingIdx = function() { return loadingIdx; };
    INSTANCE.setLoadingIdx = function(_loadingIdx) {
        loadingIdx = _loadingIdx;
    };
    
//    INSTANCE.setLoadingByte = function() { // 로딩 이미지 -> 필요없으면 제거하기
//        var ran = 0;
//        try {
//            ran = Math.floor(Math.random() * LoadingManager.getLoadingPage().length);
//            
//            console.error("random " + ran);
//            console.error("iframe " + appMgr.getRP_URL() + LoadingManager.getLoadingPage()[ran]);
//            
//            ResourceMgr.loadImage(loadingByte = new Image(), appMgr.getRP_URL() + LoadingManager.getLoadingPage()[ran], function() {
//            }, function(err) {
//                console.error(err);
//                appMgr.openDisconnectPopup("SceneManager setLoadingByte fail ", this);
//            });
//        } catch (e) {
//            console.error(e.message);
//        }
//    };
    
    INSTANCE.getLoadingByte = function() { return loadingByte; };
    INSTANCE.flushLoadingByte = function() { loadingByte = null; };
    
    INSTANCE.setPrevWaitScene = function(_prevWaitScene) {
        prevWatiScene = _prevWaitScene;
    };
    INSTANCE.getPrevWaitScene = function() {
        return prevWatiScene;
    };
    
    INSTANCE.setPrevScene = function(_prevScene) {
        prevScene = _prevScene;
    };
    INSTANCE.getPrevScene = function() {
        return prevScene;
    };
    
    INSTANCE.setScene = function(_thisScene, _scene) {
        scene = _scene;
        if (_thisScene > 0) {
            appMgr.changeLayer(scene, true);
//            UIMgr.changeLayer(scene);
        } else {
            appMgr.changeLayer(scene, true);
//            UIMgr.changeLayer(scene);
        }
    };
    
    INSTANCE.destroy = function() {
        INSTANCE = null;
        
        tip = null;
        this.tip_Str = null;
    };
};