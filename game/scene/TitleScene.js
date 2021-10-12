"use strict";
"use warning";

var TitleScene = new function() {    
    var INSTANCE = this;
    
    /* 플레이 선택 확인 */
    var netMgr = NetMgr;

    var focusCnt = 0;
    var focusX = 0;
    var focusY = 0;
    
    var isNewMsg;
    
    // Image
    var iframe;
    var btnB_off;
    var btnB_on;
    var btnS_off;
    var btnS_on;
    var btn_quest_coming;
    var newTag = [];
    var shopNewTag = [];
    var btnB_Name = ["btn_hero_", "btn_summon_", "btn_battle_", "btn_shop_", "btn_raid_"];
    var btnS_Name = ["btn_book_", "btn_mail_", "btn_quest_", "btn_exit_"];
    
    this.load = function(onload) {
        
        var loadCnt = 0;
        
        var checkOnload = function() {
            loadCnt++;
            if (loadCnt == 3) {
                onload();
            }
        }
        
        this.msgCheck(checkOnload);
        setResource(checkOnload);
        POPUP.POP_MAILBOX.getInstance().setResource(checkOnload);
    };
    
	var setResource = function(onload) {
        
        btnB_off = [];
        btnS_off = [];
        btnB_on = [];
        btnS_on = [];
        newTag = [];
        shopNewTag = [];

		var imgParam = [
			[iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [newTag = [], HTool.getURLs(ROOT_IMG, "title/new_", EXT_PNG, 4)],
            [shopNewTag = [], HTool.getURLs(ROOT_IMG, "title/tag_new_", EXT_PNG, 4)]
//            [btn_quest_coming = new Image(), ROOT_IMG + "title/btn_quest_coming" + EXT_PNG]
		];
        
        for (var i = 0; i < btnB_Name.length; i++) {
            imgParam.push([btnB_on[i] = new Image(), ROOT_IMG + "title/" + btnB_Name[i] + "on" + EXT_PNG]);
            imgParam.push([btnB_off[i] = new Image(), ROOT_IMG + "title/" + btnB_Name[i] + "off" + EXT_PNG]);
        }
        
        for (var i = 0; i < btnS_Name.length; i++) {
            imgParam.push([btnS_on[i] = new Image(), ROOT_IMG + "title/" + btnS_Name[i] + "on" + EXT_PNG]);
            imgParam.push([btnS_off[i] = new Image(), ROOT_IMG + "title/" + btnS_Name[i] + "off" + EXT_PNG]);
        }
        
		ResourceMgr.makeImageList(imgParam, function() {
			imgParam = null;
//            btnS_off[2] = btn_quest_coming;
            onload();
		}, function(err) {
			GameManager.openDisconnectPopup("TitleScene setResource Fail!!");
            onload();
		});
	};
    
    this.msgCheck = function(onload) {
        NetManager.Req_GetNewMailCnt(function(response) {
            if (NetManager.isSuccess(response)) {
                var arr = NetManager.getResult(response, 0);
                if (arr.length > 0) {
                    var obj = arr[0];
                    isNewMsg = (obj.cnt > 0);
                    onload();
                } else {
                    isNewMsg = false;
                    onload();
                }
            } else {
                isNewMsg = false;
                onload();
                appMgr.openDisconnectPopup("msgCheck Fail !!!");
            }
        });
    };

	return {
		toString: function() {
			return "TitleScene";
		},
		init: function(onload, loadData) {
			UIMgr.setFPS(12);
            focusCnt = 0;
            focusX = 2;
            focusY = 0;
            onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
            NoticeManager.openNoticePopup();
		},
		run: function() {
            focusCnt++;
			UIMgr.repaint();
		},
		paint: function() {
            
			g.drawImage(iframe, 0, 0);
            
            for (var i = 0; i < btnB_off.length; i++) {
                g.drawImage(btnB_off[i], 55 + (i * 236), 124);
            }
            
            for (var i = 0; i < btnS_off.length; i++) {
                g.drawImage(btnS_off[i], 182 + (i * 236), 469);     
            }
            
            if (focusY == 0) {
                g.drawImage(btnB_on[focusX], 14 + (focusX * 236), 71);
            } else {
                g.drawImage(btnS_on[focusX], 153 + (focusX * 236), 442);
            }
            
            if (isNewMsg) {
                g.drawImage(newTag[focusCnt % 4], 539, 541);
            }
            
            g.drawImage(shopNewTag[focusCnt % 4], 897, 330);
            
            g.drawImage(shopNewTag[focusCnt % 4], 1135, 330);
            
            for (var i = 0; i < 6; i++) {
                if (QuestManager.getState()[i] == "1") {
                    if (QuestManager.getRewardState()[i] == "0") {
                        g.drawImage(newTag[focusCnt % 4], 771, 541);
                    }
                }
            }
            
            uiDrawMgr.renderMain(g);
		},
		dispose: function() {
            btnB_Name = null;
            btnS_Name = null;
		},
		stop: function() {
            iframe = null;
            btnB_off = null;
            btnS_off = null;
            btnB_on = null;
            btnS_on = null;
            newTag = null;
            shopNewTag = null;
            btn_quest_coming = null;
            POPUP.POP_MAILBOX.getInstance().clear();
		},
		onKeyPressed: function(key) {
            
			switch(key) {
                    
                case KEY_PREV:
                    case 90:
                    POPUP.POP_MSG_2BTN.getInstance().setMessage("게임을 종료하시겠습니까?");
                    PopupMgr.openPopup(POPUP.POP_MSG_2BTN, function (code, data) {
                        PopupMgr.closeAllPopup();
                        if( data==0 ) android.exitGame(); // BTV에서 이전키 눌렀을때 게임이 종료되는 메소드로 변경 appMgr.goGniPortal();
                    });
                    break;
                    
				case KEY_ENTER:
                    if (focusY == 0) {
                        switch (focusX) {
                            case 0:
                                appMgr.changeLayer(SCENE.SC_INVEN, false, "monster_list");
                                break;
                            case 1:
                                //소환진
                                appMgr.changeLayer(SCENE.SC_SUMMON, false, "summon");
                                break;
                            case 2:
                                appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                break;
                            case 3:
                                appMgr.changeLayer(SCENE.SC_SHOP, false, "shop");
                                break;
                            case 4:
                                //레이드
                                appMgr.changeLayer(SCENE.SC_RAID, false, "shop");
//                                PopupMgr.openPopup(appMgr.getMessage1BtnPopup("보스와의 끝없는 대전!!|업데이트 준비 중입니다."));
                                break;
                        }
                    } else if (focusY == 1) {
                        switch (focusX) {
                            case 0:
                                appMgr.changeLayer(SCENE.SC_MONSTERBOOK, false, "monster_list");
                                break;
                            case 1:
                                isNewMsg = false;
                                PopupMgr.openPopup(POPUP.POP_WAITING);
                                NetManager.Req_getMsgList(1, function(response) {
                                    PopupMgr.closePopup(POPUP.POP_WAITING);
                                    if (NetManager.isSuccess(response)) {

                                        MessageManager.Rev_DateTime(response);
                                        MessageManager.Rev_Message(NetManager.getResult(response, 0));
                                        MessageManager.Rev_MessageCnt(NetManager.getResult(response, 1));

                                        NetManager.Req_MsgList(function(response) {
                                            PopupMgr.closeAllPopup();
                                            if (NetManager.isSuccess(response)) {
                                                MessageManager.Rev_Products(NetManager.getResult(response, 0));
                                                PopupMgr.openPopup(POPUP.POP_MAILBOX);
                                            } else {
                                                appMgr.openDisconnectPopup("Req_MsgList Fail!!!!");
                                            }
                                        });
                                    } else {
                                        appMgr.openDisconnectPopup("Req_getMsgList Fail!!!!");
                                    }
                                });
                                break;
                            case 2:
                                //퀘스트
                                PopupMgr.openPopup(POPUP.POP_QUEST);
                                break;
                            case 3:
                                //게임 종료
                                POPUP.POP_MSG_2BTN.getInstance().setMessage("게임을 종료하시겠습니까?");
                                PopupMgr.openPopup(POPUP.POP_MSG_2BTN, function (code, data) {
                                    PopupMgr.closeAllPopup();
                                    if( data==0 ) android.exitGame(); // BTV에서 이전키 눌렀을때 게임이 종료되는 메소드로 변경 appMgr.goGniPortal();
                                });
                                break;
                        }
                    }
                    break;
				case KEY_UP:
                    focusY = HTool.getIndex(focusY, -1, 2);
                    if (focusY == 1 && focusX == 4) {
                        focusX = 3;
                    }
					break;
				case KEY_DOWN:
                    focusY = HTool.getIndex(focusY, 1, 2);
                    if (focusY == 1 && focusX == 4) {
                        focusX = 3;
                    }
					break;
                    
                case KEY_LEFT:
                    if (focusY == 0) {
                        focusX = HTool.getIndex(focusX, -1, 5);
                    } else if (focusY == 1) {
                        focusX = HTool.getIndex(focusX, -1, 4);
                    }
                    break;
                case KEY_RIGHT:
                    if (focusY == 0) {
                        focusX = HTool.getIndex(focusX, 1, 5);
                    } else if (focusY == 1) {
                        focusX = HTool.getIndex(focusX, 1, 4);
                    }
                    break;
			};
            UIMgr.repaint();
		},
		onKeyReleased: function(key) {

		},
		getInstance: function() {
			return INSTANCE;
		}
	};
};