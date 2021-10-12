// Strict Mode On (엄격모드)
"use strict";
"use warning";

var EntryScene = new function() {
	var INSTANCE = this;
    
	var iframe;
    var loading;
    var btn_start;
    var logo;
    var all;
    
    var frameCnt = 0;
    
    var isLoadTitle = false;
    var onClicked = false;
    var gotoTutorial = false;
    
    var setResource = function(onload) {
        
        btn_start = [];
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [loading = new Image(), ROOT_IMG + "entry/loading" + EXT_PNG],
            [btn_start = [], HTool.getURLs(ROOT_IMG, "entry/btn_start_", EXT_PNG, 2)],
            [logo = new Image(), ROOT_IMG + "entry/logo" + EXT_PNG],
            [all = new Image(), ROOT_UPDATE + "loading/all" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function () {
            imgParam = null;
            PlayResManager.setResourceForMoney(onload);
        }, function (err) {
            appMgr.openDisconnectPopup("setReosurce fail!!");
        });
    };
    
    var entryLoading = function() {
        try {
            NetManager.Req_EntryLoading(function(response) {
                if (NetManager.isSuccess(response)) {
                    
                    ItemManager.setCashProductInfo(NetManager.getResult(response, 0));
                    MyInfo.Rev_MyLevel(NetManager.getResult(response, 1)[0]);
                    ItemManager.Rev_AllItem(NetManager.getResult(response, 2), response.dateTime, true);
                    NoticeManager.Rev_setNotice(NetManager.getResult(response, 3));
                    MyInfo.Rev_MyInfo(NetManager.getResult(response, 4));
                    StageManager.Rev_setStageMgntInfo(NetManager.getResult(response, 5));
                    StageManager.Rev_setStageInfo(NetManager.getResult(response, 6));
                    QuestManager.Rev_QuestInfo(NetManager.getResult(response, 9));
                    POPUP.POP_DAILYITEMMONTH.getInstance().Rev_Info(NetManager.getResult(response, 10));
                    
                    if (QuestManager.getCurrentValue()[0] == "0") {
                        QuestManager.questUpdt(0, function() {
                            if (TutorialManager.getTutorial()) {
                                appMgr.changeLayer(SCENE.SC_TUTORIAL, false, "main");
                            } else {
                                appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                            }
                        });
                    } else {
                        if (TutorialManager.getTutorial()) {
                            appMgr.changeLayer(SCENE.SC_TUTORIAL, false, "main");
                        } else {
                            appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                        }
                    }
                    
//                    if (appMgr.getFirstConn()) {
//                        QuestManager.questUpdt(0, function() {
//                            if (TutorialManager.getTutorial()) {
//                                appMgr.changeLayer(SCENE.SC_TUTORIAL, false, "main");
//                            } else {
//                                appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
//                            }
//                        });
//                    } else {
//                        if (TutorialManager.getTutorial()) {
//                            appMgr.changeLayer(SCENE.SC_TUTORIAL, false, "main");
//                        } else {
//                            appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
//                        }
//                    }
                    
                } else {
                    appMgr.openDisconnectPopup("Req_EntryLoading Fail!!", this);
                }
            });
        } catch (e) {
            HLog.err(e);
            appMgr.openDisconnectPopup("Req_EntryLoading Fail!!", this);
        }
    };
    
	return {
		toString: function() {
			return "EntryScene";
		},
		init: function(onload) {
            setResource(onload);
		},
		start: function() {
            // BTV 에서 인트로화면이 끝나면 인트로 이미지를 없앤다.
            android.introInvisible();
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
		},
		run: function() {
            frameCnt++;
            UIMgr.repaint();
		},
		paint: function() {
			g.drawImage(iframe, 0, 0);
            g.drawImage(logo, 275, 41);
            if (isLoadTitle) {
                g.drawImage(loading, 574, 591);
            } else {
                g.drawImage(btn_start[Math.floor(frameCnt / 2 % 2)], 521, 566);
            }
            g.drawImage(all, 1150, 30);
		},
		stop: function() {
            iframe = null;
            loading = null;
            btn_start = null;
            logo = null;
            all = null;
		},
		dispose: function() {

		},
		onKeyPressed: function(key) {
			switch(key) {
                    
//                case KEY_DOWN:
//                    NetManager.Req_TUTOTEST();
//                    break;
                    
                case KEY_PREV:
                    POPUP.POP_MSG_2BTN.getInstance().setMessage("게임을 종료하시겠습니까?");
                    PopupMgr.openPopup(POPUP.POP_MSG_2BTN, function (code, data) {
                        PopupMgr.closeAllPopup();
                        if( data==0 ) android.exitGame(); // BTV에서 이전키 눌렀을때 게임이 종료되는 메소드로 변경 appMgr.goGniPortal();
                    });
                    break;
				case KEY_ENTER:
                    isLoadTitle = true;
                    entryLoading();
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