// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var HeroRankUpPopup = new function() {
    var INSTANCE = this;
    
    var frameCnt = 0;
    
    INSTANCE.setResource = function(onload) {
      
        var imgParam = [
            
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("HeroRankUpPopup setResource Fail", this);
        });
    };
    
    INSTANCE.setHeroData = function(_data) {
        
    };
    
    INSTANCE.clear = function() {
        
    };
    
    return {
        toString: function() {
            return "HeroRankUpPopup";
        },
        init: function(onload) {
            frameCnt = 0;
            onload();
        },
        start: function() {

        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
        },
        stop: function() {
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    break;
                case KEY_LEFT:
                case KEY_RIGHT:
                    break;
                case KEY_PREV:
                    PopupMgr.closePopup(POPUP.POP_HERORANKUP);
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