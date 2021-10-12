// Strict Mode On (엄격모드)
"use strict";
"use warning";

var TutorialScene = new function() {
	var INSTANCE = this;

	var iframe = [];
    var btn = [];
    var point;
    var coin_effect = [];
    var readyHeroIcon;
    
    var isHeroBatch = false;
    
    var frameCnt = 0;
    var focus = 0;
    
    var pointMove = 5;
    
    this.load = function(onload) {
        setResource(onload);
    };
    
    var setResource = function(onload) {
        
        iframe = [];
        btn = [];
        coin_effect = [];
        
        var imgParam = [
            [iframe = [], HTool.getURLs(ROOT_IFRAME, "tutorial/tutorial_", EXT_JPG, 12)],
            [btn = [], HTool.getURLs(ROOT_IMG, "tutorial/b_", EXT_PNG, 2)],
            [point = new Image(), ROOT_IMG + "tutorial/arrow_0" + EXT_PNG],
            [coin_effect = [], HTool.getURLs(ROOT_IMG, "tutorial/coin_effect_", EXT_PNG, 2)],
            [readyHeroIcon = new Image(), ROOT_IMG + "game/myUnit/thumbnail_icon/hero_23" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            console.error(err);
            appMgr.openDisconnectPopup("TutorialScene Fail", this);
        });
    };
    
	return {
		toString: function() {
			return "TutorialScene";
		},
		init: function(onload) {
            frameCnt = 0;
            focus = 0;
            pointMove = 5;
            isHeroBatch = false;
			onload();
		},
		start: function() {
            
		},
		run: function() {
            frameCnt++;
            if (Math.floor(frameCnt / 2 % 2) == 0) {
                pointMove += 5;
            } else {
                pointMove -= 5;
            }
            UIMgr.repaint();
		},
		paint: function() {
			g.drawImage(iframe[TutorialManager.getTutorialStep()], 0, 0);
            
            
            
            switch (TutorialManager.getTutorialStep()) {
                case 0:
                    if (focus == 0) {
                        g.drawImage(btn[0], 481, 426);
                        g.drawImage(point, 607 + pointMove, 466 + pointMove);
                    } else {
                        g.drawImage(btn[1], 641, 426);
                        g.drawImage(point, 768 + pointMove, 466 + pointMove);
                    }
                    break;

                case 1:
                    g.drawImage(point, 684 + pointMove, 507 + pointMove);
                    break;
                    
                    
                    

                case 2:
                    g.drawImage(point, 684 + pointMove, 477 + pointMove);
                    break;
                case 3:
                    g.drawImage(point, 96 + pointMove, 401 + pointMove);
                    break;
                case 4:
                    g.drawImage(point, 605 + pointMove, 648 + pointMove);
                    break;
                case 5:
                    g.drawImage(point, 607 + pointMove, 387 + pointMove);
                    
                    if (isHeroBatch) {
                        g.drawImage(readyHeroIcon, 529, 125);
                    }
                    break;
                case 6:
                    g.drawImage(point, 726 + pointMove, 660 + pointMove);
                    break;
                    
                    
                    
                    
                    
                case 7:
                    g.drawImage(point, 507 + pointMove, 324 + pointMove);
                    break;
                case 8:
                    g.drawImage(point, 884 + pointMove, 271 + pointMove);
                    break;
                case 9:
                    g.drawImage(point, 507 + pointMove, 324 + pointMove);
                    g.drawImage(coin_effect[Math.floor(frameCnt / 2 % 2)], 800, 0);
                    break;
                case 10:
                    g.drawImage(point, 507 + pointMove, 324 + pointMove);
                    break;
                case 11:
                    break;
            }
		},
		stop: function() {
            
            iframe = null;
            btn = null;
            point = null;
            coin_effect = null;
            readyHeroIcon = null;

		},
		dispose: function() {

		},
		onKeyPressed: function(key) {
			switch(key) {
                    
                case KEY_PREV:
                case KEY_PC_F4:
                    //게임 종료
                    POPUP.POP_MSG_2BTN.getInstance().setMessage("게임을 종료하시겠습니까?");
                    PopupMgr.openPopup(POPUP.POP_MSG_2BTN, function (code, data) {
                        PopupMgr.closeAllPopup();
                        if( data==0 ) appMgr.goGniPortal();
                    });
                    break;
                    
				case KEY_LEFT:
                    if (TutorialManager.getTutorialStep() == 0) {
                        focus = HTool.getIndex(focus, -1, 2);
                    }
					break;
				case KEY_RIGHT:
                    if (TutorialManager.getTutorialStep() == 0) {
                        focus = HTool.getIndex(focus, -1, 2);
                    }
					break;
				case KEY_ENTER:
                    
                    switch (TutorialManager.getTutorialStep()) {
                        case 0:
                            if (focus == 0) {
                                TutorialManager.tutorialPlay();
                            } else {
                                TutorialManager.tutorialGiveup();
                            }
                            break;
                            
                        case 1:
                            console.error("TutirialEnd");
                            PopupMgr.openPopup(POPUP.POP_WAITING);
                            NetManager.Req_TutoPlayEnd(1, function(response) {
                                PopupMgr.closeAllPopup();
                                if (NetManager.isSuccess(response)) {
                                    appMgr.changeLayer(SCENE.SC_TITLE, false, "back");
                                } 
                            });
                            break;
                            
                        case 2:
                        case 3:
                        case 4:
                            TutorialManager.setTutorialStep();
                            break;
                        case 5:
                            if (isHeroBatch) {
                                TutorialManager.setTutorialStep();
                            } else {
                                isHeroBatch = true;
                            }
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            TutorialManager.setTutorialStep();
                            break;
                            
                        case 11:
                            console.error("TutirialEnd");
                            PopupMgr.openPopup(POPUP.POP_WAITING);
                            NetManager.Req_TutoPlayEnd(0, function(response) {
                                PopupMgr.closeAllPopup();
                                if (NetManager.isSuccess(response)) {
                                    appMgr.changeLayer(SCENE.SC_TITLE, false, "back");
                                } 
                            });
                            break;
                            
                    }
					break;
			}
            UIMgr.repaint();
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