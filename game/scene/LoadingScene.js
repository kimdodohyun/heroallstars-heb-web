// Strict Mode On (엄격모드)
"use strict";
"use warning";

var LoadingScene = new function() {
	var INSTANCE = this;

	var iframe;
    
    var isBlind;
    var isLoadSuccess;
    var isSceneClose;
    var blackScreenWid;
    
    var loadingProcess = function() {
        console.error("loading start");
        isBlind = true;
//        PlayResourceManager.gameLoad();
//        SCENE.SC_PLAY.getInstance().receiveResource();
        SCENE.SC_TITLE.getInstance().setResource();
        isSceneClose = true;
        checkNextScene();
        console.error("loading end");
    };
    
    var checkNextScene = function() {
        if (isLoadSuccess && isSceneClose) {
            isLoadSuccess = false;
            isSceneClose = false;
//            ShooterManager.openGameLoadingPopup();
//            HSoundMgr.stopSound();
        }  
    };

	return {
		toString: function() {
			return "LoadingScene";
		},
		init: function(onload) {
            UIMgr.setSleep(SLEEP_GAME);
            ResourceMgr.loadImage(iframe = new Image(), ROOT_IFRAME + "intro" + EXT_IFRAME, function() {
                
                isLoadSuccess = false;
                isSceneClose = false;
                
//                UIDrawMgr.selectRandomTip(g);
                blackScreenWid = 0;
                isBlind = false;
                console.error("onload");
				onload();
			}, function(err) {
				console.error(err);
			});
			
		},
		start: function() {
            console.error("start");
			loadingProcess();
		},
		run: function() {
            if (isBlind) {
                if (blackScreenWid >= 960) {
                    isLoadSuccess = true;
                    checkNextScene();
                } else {
                    blackScreenWid += 30;
                }
            }
            UIMgr.repaint();
		},
		paint: function() {
            
            g.drawImage(iframe, 0, 0);
            
			if (isBlind) {
                g.save();
                g.beginPath();
                g.rect(0, 0, blackScreenWid, SCREEN_WIDTH);
                g.closePath();
                g.clip();
                
                g.setColor(COLOR_BLACK);
                g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                
//                UIDrawMgr.renderLoadingTip(g);
                
                g.restore();
            }
		},
		stop: function() {

		},
		dispose: function() {

		},
		onKeyPressed: function(key) {
			switch(key) {
				case KEY_UP:
					break;
				case KEY_DOWN:
					break;
				case KEY_ENTER:
					break;
			}
		},
		onKeyReleased: function(key) {
			switch(key) {
				case KEY_ENTER:
					break;
			}
		},
		getInstance: function() {
			return INSTANCE;
		}
	};
};