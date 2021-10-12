// Strict Mode On (엄격모드)
"use strict";
"use warning";

var RaidScene = new function() {
	var INSTANCE = this;
    
    var focusX, focusY;
    var moveCnt = 0;
    var frameCnt = 0;
    
    var myInfo = {};
    var rankInfo = [];
    
    var page = 0;
    var maxPage = 0;
    var rankCount = 0;
    var playCount = 0;

	var iframe;
    var raid_key;
    var raid_record;
    var ranking_back;
    var ranking_icon;
    var ranking_reward;
    var page_arrow;
    var page_on;
    var title;
    var btn_raid_off;
    var btn_raid_on;
    var btn_off;
    var btn_on;
    var btn_str = ["btn_back_", "btn_hero_", "btn_summon_", "btn_shop_"];
    
    this.load = function(onload) {
        
        var loadCnt = 0;
        var checkOnload = function() {
            loadCnt++;
            if (loadCnt == 2) {
                onload();
            }
        }
        
        Req_RankInfo(1, checkOnload);
        setResource(checkOnload);
    };
    
    var Req_RankInfo = function(_page, onload) {
        PopupMgr.openPopup(POPUP.POP_WAITING);
        NetManager.Req_WeeklyRaidRankInfo(_page, function(response) {
            if (NetManager.isSuccess(response)) {
                PopupMgr.closePopup(POPUP.POP_WAITING);
                
                myInfo = {};
                rankInfo = [];
                
                var myObj = NetManager.getResult(response, 0);
                if (myObj.length > 0) {
                    myInfo.rank = myObj[0].rank;
                    myInfo.name = myObj[0].userId;
                    myInfo.score = myObj[0].lastStage;
                } else {
                    myInfo.rank = 0;
                    myInfo.name = "none";
                    myInfo.score = NetManager.getResult(response, 3).lastStage;
                    if (myInfo.score == null || myInfo.score == undefined) {
                        myInfo.score = 0;
                    }
                }
                
                var rankObj = NetManager.getResult(response, 1);
                for (var i = 0; i < rankObj.length; i++) {
                    var info = {};
                    info.rank = rankObj[i].rank;
                    info.name = rankObj[i].userId;
                    info.score = rankObj[i].lastStage;
                    
                    rankInfo[i] = info;
                }
                
                rankCount = NetManager.getResult(response, 2).length;
                maxPage = Math.floor(rankCount / 5);
                if (rankCount % 5 > 0) {
                    maxPage++;
                }
                
                playCount = NetManager.getResult(response, 3).weeklyCountPlay;
                
                if (onload) onload();
            } else {
                if (onload) onload();
                appMgr.openDisconnectPopup("Req_RankInfo Fail !!!");
            }
        });
    };
    
    var setResource = function(onload) {
      
        btn_off = [];
        btn_on = [];
        page_arrow = [];
        ranking_icon = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [title = new Image(), ROOT_IMG + "raid/title_raid" + EXT_PNG],
            [raid_key = new Image(), ROOT_IMG + "raid/raid_key" + EXT_PNG],
            [raid_record = new Image(), ROOT_IMG + "raid/raid_record" + EXT_PNG],
            [btn_raid_off = new Image(), ROOT_IMG + "raid/btn_raid_off" + EXT_PNG],
            [btn_raid_on = new Image(), ROOT_IMG + "raid/btn_raid_on" + EXT_PNG],
            [page_arrow = [], HTool.getURLs(ROOT_IMG, "raid/page_arrow_", EXT_PNG, 2)],
            [page_on = new Image(), ROOT_IMG + "raid/page_on" + EXT_PNG],
            [ranking_back = new Image(), ROOT_IMG + "raid/ranking_back" + EXT_PNG],
            [ranking_reward = new Image() ,ROOT_IMG + "raid/ranking_reward" + EXT_PNG],
            [ranking_icon = [], HTool.getURLs(ROOT_IMG, "raid/ranking_icon_", EXT_PNG, 4)]
        ];
        
        for (var i = 0; i < btn_str.length; i++) {
            imgParam.push([btn_off[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "off" + EXT_PNG]);
            imgParam.push([btn_on[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "on" + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            GameManager.openDisconnectPopup("Raid setResource Fail!!");
        });
    };
    
	return {
		toString: function() {
			return "RaidScene";
		},
		init: function(onload) {
            
            focusX = 0;
            focusY = 0
            page = 1;
            moveCnt = 0;
            frameCnt = 0;
            onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
		},
		run: function() {
            
            frameCnt++;
            if (focusY == 0) {
                if (Math.floor(frameCnt / 2 % 2) == 0) {
                    moveCnt = 3;
                } else {
                    moveCnt = 0;
                }
            } else if (focusY == 1) {
                moveCnt = 0;
            }
            
            UIMgr.repaint();
		},
		paint: function() {
            g.drawImage(iframe, 0, 0);
            g.drawImage(title, 0, 0);
            
            g.drawImage(ranking_back, 46, 106);
            g.drawImage(raid_record, 685, 105);
            g.drawImage(ranking_reward, 685, 257);
            
            ///
            
            for (var i = 0; i < rankInfo.length; i++) {
                g.setFont(FONT_22);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, rankInfo[i].name, 316, 219 + (i * 62), HTextRender.CENTER);
                HTextRender.oriRender(g, rankInfo[i].score, 512, 221 + (i * 62), HTextRender.CENTER);
                
                g.setFont(FONT_30);
                switch (Number(rankInfo[i].rank)) {
                    case 1:
                        g.setColor(COLOR_RANK_1);
                        HTextRender.oriRender(g, rankInfo[i].rank, 113, 225 + (i * 62), HTextRender.CENTER);
                        g.drawImage(ranking_icon[0], 152, 190 + (i * 62));
                        break;
                    case 2:
                        g.setColor(COLOR_RANK_2);
                        HTextRender.oriRender(g, rankInfo[i].rank, 113, 225 + (i * 62), HTextRender.CENTER);
                        g.drawImage(ranking_icon[1], 152, 190 + (i * 62));
                        break;
                    case 3:
                        g.setColor(COLOR_RANK_3);
                        HTextRender.oriRender(g, rankInfo[i].rank, 113, 225 + (i * 62), HTextRender.CENTER);
                        g.drawImage(ranking_icon[2], 152, 190 + (i * 62));
                        break;
                    default:
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, rankInfo[i].rank, 113, 225 + (i * 62), HTextRender.CENTER);
                        g.drawImage(ranking_icon[3], 152, 190 + (i * 62));
                        break;
                }
            }
            
            ///
            
            g.setFont(FONT_22);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, myInfo.score, 1110, 156, HTextRender.CENTER);
            HTextRender.oriRender(g, myInfo.rank + "위", 987, 215, HTextRender.CENTER);
            HTextRender.oriRender(g, playCount + "회", 1160, 215, HTextRender.CENTER);
            
            g.setFont(FONT_18);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, "※ 도전을 위해 열쇠 5개가 필요합니다.", 1111, 683, HTextRender.RIGHT);
            
            g.drawImage(btn_raid_off, 1116, 573);
            for (var i = 0; i < btn_off.length; i++) {
                g.drawImage(btn_off[i], 45 + (i * 119), 573);
            }
            
            if (focusY == 1) {
                switch (focusX) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        g.drawImage(btn_on[focusX], 45 + (focusX * 119), 573);
                        break;
                    case 4:
                        g.drawImage(btn_raid_on, 1116, 573);
                        break;
                }
            } else if (focusY == 0) {
                g.drawImage(page_on, 250, 496);
            }
            
            ///
            
            g.setFont(FONT_20);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, page, 323, 526, HTextRender.CENTER);
            HTextRender.oriRender(g, maxPage, 360, 526, HTextRender.CENTER);
            
            for (var i = 0; i < page_arrow.length; i++) {
                if (i == 0) {
                    g.drawImage(page_arrow[i], 270 + (i * 117) + moveCnt, 506);
                } else if (i == 1) {
                    g.drawImage(page_arrow[i], 270 + (i * 117) + (-1 * moveCnt), 506);
                }
            }
            
            CommonUIDrawManager.renderMoney(g);
		},
		stop: function() {
            iframe = null;
            raid_key = null;
            raid_record = null;
            ranking_back = null;
            ranking_icon = null;
            ranking_reward = null;
            page_arrow = null;
            page_on = null;
            title = null;
            btn_raid_off = null;
            btn_raid_on = null;
            btn_off = null;
            btn_on = null;
            
            myInfo = null;
            rankInfo = null;
		},
		dispose: function() {
            btn_str = null;
		},
		onKeyPressed: function(key) {
			switch(key) {
                case KEY_PREV:
                    appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                    break;
				case KEY_UP:
                    focusY = HTool.getIndex(focusY, -1, 2);
                    if (focusY == 0) {
                        focusX = page - 1;
                    } else if (focusY == 1) {
                        focusX = 0;
                    }
					break;
				case KEY_DOWN:
                    focusY = HTool.getIndex(focusY, 1, 2);
                    if (focusY == 0) {
                        focusX = page - 1;
                    } else if (focusY == 1) {
                        focusX = 0;
                    }
					break;
                case KEY_LEFT:
                    if (focusY == 0) {
                        if (maxPage > 0) {
                            focusX = HTool.getIndex(focusX, -1, maxPage);
                            page = focusX + 1;
                            Req_RankInfo(page);
                        }
                    } else if (focusY == 1) {
                        focusX = HTool.getIndex(focusX, -1, 5);
                    }
                    break;
                case KEY_RIGHT:
                    if (focusY == 0) {
                        if (maxPage > 0) {
                            focusX = HTool.getIndex(focusX, 1, maxPage);
                            page = focusX + 1;
                            Req_RankInfo(page);
                        }
                    } else if (focusY == 1) {
                        focusX = HTool.getIndex(focusX, 1, 5);
                    }
                    break;
				case KEY_ENTER:
                    
                    if (focusY == 1) {
                        switch (focusX) {
                            case 0:
                                appMgr.changeLayer(SCENE.SC_TITLE, false, "waitroom");
                                break;
                            case 1:
                                appMgr.changeLayer(SCENE.SC_INVEN, false, "waitroom");
                                break;
                            case 2:
                                appMgr.changeLayer(SCENE.SC_SUMMON, false, "waitroom");
                                break;
                            case 3:
                                appMgr.changeLayer(SCENE.SC_SHOP, false, "waitroom");
                                break;
                            case 4:
                                GameEngine.setGameMode(GAME_MODE_RAID);
                                appMgr.changeLayer(SCENE.SC_READY, false, "waitroom");
                                break;
                        }
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