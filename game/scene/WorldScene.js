// Strict Mode On (엄격모드)
"use strict";
"use warning";

var WorldScene = new function() {
	var INSTANCE = this;

	var iframe;
    
    var frameCnt = 0;
    var focusX = 0;
    var focusY = 0;
    var focusS = 0;
    var focusM = 0;
    var stageNum = 0;
    var convertNum = 0;
    var starCnt = 0;
    var arrowMoveCntName = 0;
    var arrowMoveCntStage = 0;

    var stageline;
    var title;
    var stagenameback;
    var stagenameback_on;
    var stagename;
    var btn_stage_off;
    var btn_stage_on;
    var btn_stage_boss_off;
    var btn_stage_boss_on;
    var arrow_left;
    var arrow_right;
    var stagenumber_boss;
    var star;
    var btn_stage_middleboss_on;
    var btn_stage_middleboss_off;
    var location_burn = [];
    var stageInfo = [];
    var stageNumFont;
    var stagenum_slash;
    
    var stageBtnPosX = [45, 166, 287, 408, 529, 650, 771, 892, 1013, 1134];
    var stageBtnPosY = [245, 278, 311, 278, 245, 278, 311, 344, 311, 278];
    
    var btn_off;
    var btn_on;
    var btn_str = ["btn_back_", "btn_hero_", "btn_summon_", "btn_shop_"];
    
    var bossImg = [];
    var bossTag;
    var max;
    var complete;
    
    // setPopup
    var setPop = null;
    
    var popback;
    var pBtn_cancel_off;
    var pBtn_cancel_on;
    var pBtn_ready_off;
    var pBtn_ready_on;
    var health;
    var pIcon;
    var pIcon_str = ["icon_coin", "icon_gem", "icon_key", "icon_summonstone_normal", "icon_summonstone_special", "icon_upgradestone_red", "icon_upgradestone_blue", "icon_upgradestone_black"];
    var pNumber = [];
    var pStagename = [];
    var pType = [];

    
    
    var isOpen;
    var isPaint = false;
    var stageIndex = 0;
    var stageNumIndex = 0;
    var isFirst = true;
    
    this.load = function(onload) {
        
        var onloadCnt = 0;
        var checkOnload = function () {
            onloadCnt++;

            if (onloadCnt == 3) {
                onload();
            }
        };

        setResource(checkOnload);
        
        if (setPop == null) {
            setPop = new stagePop();
            setPop.setResource(checkOnload);
        } else {
            checkOnload();
        }
        
        if (isFirst) {
            setStageDataInit(stageIndex, checkOnload);
        } else {
            setStageData(focusS, checkOnload);
        }
    };
    
    this.setStageIndex = function(_index, _stage, _grade) {
        stageIndex = _index;
        stageNumIndex = _stage;
        isFirst = false;
        focusX = stageNumIndex;
        focusS = stageIndex;
        setStageData(focusS);
        setPop.setOpen(stageIndex, stageNumIndex, stageInfo[stageNumIndex]);
    };
    
    var setResource = function(onload) {
      
        stagename = [];
        btn_off = [];
        btn_on = [];
        location_burn = [];
        
        var stageNum = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            
            [stageline = new Image(), ROOT_IMG + "world/stageline" + EXT_PNG],
            [title = new Image(), ROOT_IMG + "etc/title_battle" + EXT_PNG],
            [stagenameback = new Image(), ROOT_IMG + "world/stagenameback" + EXT_PNG],
            [stagenameback_on = new Image(), ROOT_IMG + "world/stagenameback_on" + EXT_PNG],
            [stagename = [], HTool.getURLs(ROOT_IMG, "world/stagename_", EXT_PNG, StageManager.getStageAreaLength())],
            [btn_stage_off = new Image(), ROOT_IMG + "world/btn_stage_off" + EXT_PNG],
            [btn_stage_on = new Image(), ROOT_IMG + "world/btn_stage_on" + EXT_PNG],
            [btn_stage_boss_off = new Image(), ROOT_IMG + "world/btn_stage_boss_off" + EXT_PNG],
            [btn_stage_boss_on = new Image(), ROOT_IMG + "world/btn_stage_boss_on" + EXT_PNG],
            [arrow_left = new Image(), ROOT_IMG + "world/arrow_left" + EXT_PNG],
            [arrow_right = new Image(), ROOT_IMG + "world/arrow_right" + EXT_PNG],
            [stagenumber_boss = new Image(), ROOT_IMG + "world/stagenumber_boss" + EXT_PNG],
            [star = new Image(), ROOT_IMG + "world/star_on" + EXT_PNG],
            [stagenum_slash = new Image(), ROOT_IMG + "world/stagenum_slash" + EXT_PNG],
            [stageNum = [], HTool.getURLs(ROOT_IMG, "world/stagenum_", EXT_PNG, 10)],
            [max = new Image(), ROOT_IMG + "game/etc/max" + EXT_PNG],
            [bossTag = new Image(), ROOT_IMG + "world/stage/boss" + EXT_PNG],
            [btn_stage_middleboss_off = new Image(), ROOT_IMG + "world/btn_stage_middleboss_off" + EXT_PNG],
            [btn_stage_middleboss_on = new Image(), ROOT_IMG + "world/btn_stage_middleboss_on" + EXT_PNG],
            [location_burn = [], HTool.getURLs(ROOT_IMG, "world/location_burn_", EXT_PNG, 8)],
            [complete = new Image(), ROOT_IMG + "etc/complete" + EXT_PNG]
        ];
        
        
        for (var i = 0; i < btn_str.length; i++) {
            imgParam.push([btn_off[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "off" + EXT_PNG]);
            imgParam.push([btn_on[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "on" + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            stageNumFont = new NumberFontImage(stageNum);
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            GameManager.openDisconnectPopup("World setResource Fail!!");
        });
    };
    
    var convertStageInfoForRender = function(_stageInfo) {
        
        switch (_stageInfo) {
            case -2:
                return -2;
            case -1:
                return -1;
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 3;
            default:
                break;
        }
    };
    
    var setStageDataInit = function(_index, onload) {
        
        isPaint = true;
        stageInfo = [];
        starCnt = 0;
        
        for (var j = 0; j < StageManager.getStageAreaLength(); j++) {
            for (var i = 0; i < StageManager.getStageInfo()[j].length; i++) {
                stageInfo[i] = convertStageInfoForRender(StageManager.getStageInfo()[j][i]);
                
                if (stageInfo[i] == -1) {
                    stageNumIndex = i;
                    stageIndex = j;
                    break;
                } else if (stageInfo[i] > 0) {
                    stageNumIndex = i;
                    stageIndex = j;
                }
            }
        }
        
        for (var i = 0; i < StageManager.getStageInfo()[stageIndex].length; i++) {
            stageInfo[i] = convertStageInfoForRender(StageManager.getStageInfo()[stageIndex][i]);

            if (stageInfo[i] > 0) {
                starCnt += stageInfo[i];
            }
        }
        
        var resLen = HeroManager.getStageJson()[((stageIndex + 1) * 10) - 1].res.length - 1;
        var str = HeroManager.getStageJson()[((stageIndex + 1) * 10) - 1].res[resLen] + "_l_w_";
        bossImg = [];
        var imgParam = [
            [bossImg = [], HTool.getURLs(ROOT_IMG, "game/enUnit/monster/" + str, EXT_PNG, 4)]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            isPaint = false;
            isFirst = false;
            imgParam = null;
            
            focusX = stageNumIndex;
            focusS = stageIndex;
            
            if (onload) onload();
        }, function(err) {
            appMgr.openDisconnectPopup("fail!!");
        });
    };
    
    var setStageData = function(_index, onload) {
        isPaint = true;
        stageInfo = [];
        starCnt = 0;
        for (var i = 0; i < StageManager.getStageInfo()[_index].length; i++) {
            stageInfo[i] = convertStageInfoForRender(StageManager.getStageInfo()[_index][i]);
            
            if (stageInfo[i] > 0) {
                starCnt += stageInfo[i];
            }
        }
        
        var resLen = HeroManager.getStageJson()[((_index + 1) * 10) - 1].res.length - 1;
        var str = HeroManager.getStageJson()[((_index + 1) * 10) - 1].res[resLen] + "_l_w_";
        bossImg = [];
        var imgParam = [
            [bossImg = [], HTool.getURLs(ROOT_IMG, "game/enUnit/monster/" + str, EXT_PNG, 4)]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            isPaint = false;
            imgParam = null;
            
            if (onload) onload();
        }, function(err) {
            appMgr.openDisconnectPopup("fail!!");
        });
    };
    
    
    
    
    
    
    
    
    var stagePop = function() {
      
        var _this = this;
        var focus = 0;
        
        var miniFrame;
        var monsterImg = [];
        var monsterImgStr = [];
        var monsterName = [];
        var monsterAttr = [];
        var monsterHp = [];
        var attrSTr = ["무속성면역", "물리속성면역", "마법속성면역"];
        
        var json;
        
        var area, stage, stageGrade;
        var firstReward;
        var firstRewardAmount = 0;
        var reward;
        var rewardAmount;
        var coinReward;
        var coinAmount = 0;
        
        this.setResource = function(onload) {
      
            pIcon = [];
            pNumber = [];
            pStagename = [];
            pType = [];

            var imgParam = [
                [popback = new Image(), ROOT_IMG + "world/stage/back" + EXT_PNG],
                [pBtn_cancel_off = new Image(), ROOT_IMG + "world/stage/btn_cancel_off" + EXT_PNG],
                [pBtn_cancel_on = new Image(), ROOT_IMG + "world/stage/btn_cancel_on" + EXT_PNG],
                [pBtn_ready_off = new Image(), ROOT_IMG + "world/stage/btn_ready_off" + EXT_PNG],
                [pBtn_ready_on = new Image(), ROOT_IMG + "world/stage/btn_ready_on" + EXT_PNG],
                [health = new Image(), ROOT_IMG + "world/stage/health" + EXT_PNG],
                [pNumber = [], HTool.getURLs(ROOT_IMG, "world/stage/num_", EXT_PNG, 10)],
                [pStagename = [], HTool.getURLs(ROOT_IMG, "world/stage/stagename_", EXT_PNG, StageManager.getStageAreaLength())],
                [pType = [], HTool.getURLs(ROOT_IMG, "world/stage/type_", EXT_PNG, 3)]
            ];

            for (var i = 0; i < pIcon_str.length; i++) {
                imgParam.push([pIcon[i] = new Image(), ROOT_IMG + "world/stage/" + pIcon_str[i] + EXT_PNG]);
            }

            ResourceMgr.makeImageList(imgParam, function() {
                imgParam = null;
                onload();
            }, function(err) {
                onload();
                GameManager.openDisconnectPopup("World setResource Fail!!");
            });
        }
        
        this.setOpen = function(_area, _stage, _stageInfo) {
            
            firstRewardAmount = 0;
            coinAmount = 0;
            coinReward = 0;
            
            area = _area;
            stage = _stage;
            stageGrade = _stageInfo;
            json = HeroManager.getStageJson()[(area * 10) + stage];
            
            if (json.firstReward == "gem") {
                firstReward = 1;
            } else if (json.firstReward == "magic_stone") {
                firstReward = 3;
            } else if (json.firstReward == "hyper_stone") {
                firstReward = 4;
            }
            firstRewardAmount = Number(json.firstRewardAmount);
            
            if (json.reward == "red_stone") {
                reward = 5;    
            } else if (json.reward == "blue_stone") {
                reward = 6;
            } else if (json.reward == "black_stone") {
                reward = 7;
            }
            rewardAmount = [];
            rewardAmount = json.rewardAmount;
            
            for (var i = 0; i < json.rimitCnt.length; i++) {
                coinAmount = coinAmount + Number(json.rimitCnt[i]);
            }
            coinReward = Number(json.coinReward) * coinAmount;
            
            monsterImgStr = [];
            monsterImg = [];
            monsterName = [];
            monsterAttr = [];
            monsterHp = [];
            
            for (var i = 0; i < json.res.length; i++) {
                monsterImgStr[i] = json.res[i];
                monsterName[i] = json.monsterName[i];
                monsterAttr[i] = json.attr[i];
                monsterHp[i] = json.hp[i];
            }
            
            var imgParam = [
                [miniFrame = new Image(), ROOT_IFRAME + "world/" + json.stageName + EXT_JPG]
            ];
            
            for (var i = 0; i < monsterImgStr.length; i++) {
                imgParam.push([monsterImg[i] = new Image(), ROOT_IMG + "game/enUnit/stage_icon/" + monsterImgStr[i] + EXT_PNG]);
            }
            
            ResourceMgr.makeImageList(imgParam, function() {
                isOpen = true;
                focus = 0;
                imgParam = null;
            }, function(err) {
                appMgr.openDisconnectPopup("miniFrame Fail ", this);
            });
        };
        
        this.update = function() {
            if (!isOpen) return;
        };
        
        this.render = function(g) {
            if (!isOpen) return;
            
            g.setColor(COLOR_POPUPBACK);
            g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            
            g.drawImage(popback, 190, 48);
            g.drawImage(miniFrame, 213, 145, 584, 329);
            g.drawImage(pStagename[area], 532, 66);
            g.drawImage(pNumber[stage], 698, 66);
            
            for (var i = 0; i < monsterImg.length; i++) {
                g.drawImage(monsterImg[i], 820, 158 + (i * 85));
                g.drawImage(pType[monsterAttr[i]], 911, 188 + (i * 85));
                g.drawImage(health, 913, 216 + (i * 85));
                
                g.setFont(FONT_20);
                g.setColor(COLOR_YELLOW);
                HTextRender.oriRender(g, monsterName[i], 913, 182 + (i * 85), HTextRender.LEFT);
                
                g.setFont(FONT_18);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, attrSTr[monsterAttr[i]], 941, 207 + (i * 85), HTextRender.LEFT);
                HTextRender.oriRender(g, monsterHp[i], 942, 231 + (i * 85), HTextRender.LEFT);
                
                if (i == monsterImg.length - 1 && stage == 9) {
                    g.drawImage(bossTag, 818, 158 + (i * 85));
                }
                
            }
            
            g.drawImage(pIcon[firstReward], 258, 531);
            g.drawImage(pIcon[0], 432, 531);
            g.drawImage(pIcon[reward], 640, 531);
            
            g.setFont(FONT_30);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, firstRewardAmount, 311, 567, HTextRender.LEFT);
            HTextRender.oriRender(g, coinReward, 484, 567, HTextRender.LEFT);
            HTextRender.oriRender(g, rewardAmount[0] + "~" + rewardAmount[2], 695, 567, HTextRender.LEFT);
            
            g.drawImage(max, 555, 567);
            
            if (stageGrade > 0) {
                g.drawImage(complete, 266, 523);
            }
            
            g.drawImage(pBtn_ready_off, 481, 609);
            g.drawImage(pBtn_cancel_off, 641, 609);
            
            if (focus == 0) {
                g.drawImage(pBtn_ready_on, 481, 609);
            } else {
                g.drawImage(pBtn_cancel_on, 641, 609);
            }
        };
        
        this.keyAction = function(key) {
            
            switch (key) {
                case KEY_LEFT:
                    focus = HTool.getIndex(focus, -1, 2);
                    break;
                    
                case KEY_RIGHT:
                    focus = HTool.getIndex(focus, 1, 2);
                    break;
                    
                case KEY_ENTER:
                    if (focus == 0) {
                        if (convertStageInfoForRender(StageManager.getStageInfo()[area][stage]) < -1) {
                            PopupMgr.openPopup(appMgr.getMessage1BtnPopup("이전 스테이지를 클리어하세요."));
                            return;
                        }
                        
                        GameEngine.setGameMode(GAME_MODE_DEFENCE);
                        UnitManager.setStageArea(area);
                        UnitManager.setStageNum(stage);
                        isOpen = false;
                        appMgr.changeLayer(SCENE.SC_READY, false, "waitroom");
                    } else {
                        isOpen = false;
                    }
                    break;
                    
                case KEY_PREV:
                    isOpen = false;
                    break;
            }
        }
        
        this.clear = function() {
            miniFrame = null;
            monsterImg = null;
            monsterName = null;
            monsterAttr = null;
            monsterHp = null;
            monsterImgStr = null;
            isOpen = false;
            attrSTr = null;
            json = null;
        };
    };
    
	return {
		toString: function() {
			return "WorldScene";
		},
		init: function(onload) {
//            focusX = stageNumIndex;
            focusY = 1;
//            focusS = stageIndex;
            
            frameCnt = 0;
            arrowMoveCntStage = 0;
            arrowMoveCntName = 0;
//            starCnt = 0;
            isPaint = false;
            
            onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
		},
		run: function() {
            frameCnt++;
            
            if (focusY == 0) {
                if (Math.floor(frameCnt / 2 % 2) == 0) {
                    arrowMoveCntName += 5;
                } else {
                    arrowMoveCntName = 0;
                }
                
            } else if (focusY == 1) {
                if (Math.floor(frameCnt / 2 % 2) == 0) {
                    arrowMoveCntStage += 5;
                } else {
                    arrowMoveCntStage = 0;
                }
            }
            
            UIMgr.repaint();
		},
		paint: function() {
            
			g.drawImage(iframe, 0, 0);
            g.drawImage(stageline, 93, 330);
            g.drawImage(title, 0, 0);
            
            if (isPaint) return;
            
            g.drawImage(stagenameback, 445, 123);
            
            stageNumFont.render(g, starCnt, 650, 192, 20, HTextRender.RIGHT);
            stageNumFont.render(g, 30, 668, 192, 20, HTextRender.LEFT);
            g.drawImage(stagenum_slash, 651, 192);
            
            g.drawImage(arrow_left, 7 + arrowMoveCntStage, 319);
            g.drawImage(arrow_right, 1241 + (-1 * arrowMoveCntStage), 353);
            
            if (focusS == StageManager.getLastStageArea()) {
                for (var i = 0; i < stageInfo.length; i++) {
                    if (stageInfo[i] == -1) {
                        if (i == 0 || i == 9) {
                            g.drawImage(location_burn[frameCnt % 8], stageBtnPosX[i] - 21, stageBtnPosY[i] - 181);
                        } else {
                            g.drawImage(location_burn[frameCnt % 8], stageBtnPosX[i - 1] - 21, stageBtnPosY[i - 1] - 181);   
                        }
                    } 
//                    else {
//                        
//                        console.error("stageInfo >> " + stageInfo[i] + " >> i >> " + i);
//                        
//                        g.drawImage(location_burn[frameCnt % 8], stageBtnPosX[9] - 21, stageBtnPosY[9] - 181);
//                    }
                }
            } else {
                for (var i = 0; i < stageInfo.length; i++) {
                    if (stageInfo[i] == -1) {
                        if (i == 0 || i == 9) {
                            g.drawImage(location_burn[frameCnt % 8], stageBtnPosX[i] - 21, stageBtnPosY[i] - 181);
                        } else {
                            g.drawImage(location_burn[frameCnt % 8], stageBtnPosX[i - 1] - 21, stageBtnPosY[i - 1] - 181);   
                        }
                    }
                }
            }
            
            for (var i = 0; i < 10; i++) {
                if (i == 9) {
                    g.drawImage(btn_stage_boss_off, stageBtnPosX[i], stageBtnPosY[i]);
                } else if (i == 4) {
                    g.drawImage(btn_stage_middleboss_off, stageBtnPosX[i], stageBtnPosY[i]);
                } else {
                    g.drawImage(btn_stage_off, stageBtnPosX[i], stageBtnPosY[i]);
                }
            }
            
            for (var i = 0; i < btn_off.length; i++) {
                g.drawImage(btn_off[i], 45 + (i * 119), 573);
            }
            
            if (focusY == 0) {
                g.drawImage(stagenameback_on, 445, 123);
            } else if (focusY == 1) {
                if (focusX == 9) {
                    g.drawImage(btn_stage_boss_on, stageBtnPosX[focusX], stageBtnPosY[focusX]);
                } else if (focusX == 4) {
                    g.drawImage(btn_stage_middleboss_on, stageBtnPosX[focusX], stageBtnPosY[focusX]);
                } else {
                    g.drawImage(btn_stage_on, stageBtnPosX[focusX], stageBtnPosY[focusX]);
                }
            } else {
                g.drawImage(btn_on[focusM], 45 + (focusM * 119), 573);
            }
            
            g.drawImage(arrow_left, 452 + arrowMoveCntName, 136);
            g.drawImage(arrow_right, 796 + (-1 * arrowMoveCntName), 136);
            g.drawImage(stagename[focusS], 565, 137);
            g.drawImage(star, 565, 186);
            
            g.drawImage(bossImg[frameCnt % 4], stageBtnPosX[9] + Math.floor(btn_stage_boss_off.width / 2) - Math.floor(bossImg[0].width / 2), stageBtnPosY[9] - Math.floor(bossImg[0].height / 2));

            for (var i = 0; i < stageInfo.length; i++) {
                if (stageInfo[i] >= 0) {
                    for (var j = 0; j < stageInfo[i]; j++) {
                        g.drawImage(star, stageBtnPosX[i] + (j * 30), stageBtnPosY[i] + 118);
                    }
                }
            }
            
            for (var i = 0; i < 9; i++) {
                if (i == 4) continue;
                g.setFont(FONT_30);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, (i + 1), stageBtnPosX[i] + 49, stageBtnPosY[i] + 85, HTextRender.CENTER);
            }
            g.drawImage(stagenumber_boss, stageBtnPosX[9] + 23, stageBtnPosY[9] + 67);
            
            CommonUIDrawManager.renderMoney(g);
            
            setPop.render(g);
		},
		stop: function() {
            
            bossTag = null;
            iframe = null;
            stageline = null;
            title = null;
            stagenameback = null;
            stagenameback_on = null;
            stagename = null;
            btn_stage_off = null;
            btn_stage_on = null;
            btn_stage_boss_off = null;
            btn_stage_boss_on = null;
            max = null;
            arrow_left = null;
            arrow_right = null;
            stagenumber_boss = null;
            star = null;
            bossImg = null;
            complete = null;
            stageNumFont.dispose();
            stageNumFont = null;
            stagenum_slash = null;
            btn_off = null;
            btn_on = null;
            btn_stage_middleboss_on = null;
            btn_stage_middleboss_off = null;
            location_burn = null;
            stageInfo = null;
		},
		dispose: function() {
            stageBtnPosX = null;
            stageBtnPosY = null;
            btn_str = null;
            pIcon_str = null;
            
            popback = null;
            pBtn_cancel_off = null;
            pBtn_cancel_on = null;
            pBtn_ready_off = null;
            pBtn_ready_on = null;;
            health = null;
            pIcon = null;
            pNumber = null;
            pStagename = null;
            pType = null;
            
            setPop.clear();
            setPop = null;
		},
		onKeyPressed: function(key) {
            
            if (isOpen) {
                setPop.keyAction(key);
            } else {
                switch (key) {
                    case KEY_PREV:
                        appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                        break;
                        
                    case KEY_ENTER:
                        if (focusY == 0) {
                            
                        } else if (focusY == 1) {
                            setPop.setOpen(focusS, focusX, stageInfo[focusX]);
                        } else {
                            switch (focusM) {
                                case 0:
                                    appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                                    break;
                                case 1:
                                    appMgr.changeLayer(SCENE.SC_INVEN, false, "main");
                                    break;
                                case 2:
                                    appMgr.changeLayer(SCENE.SC_SUMMON, false, "main");
                                    break;
                                case 3:
                                    appMgr.changeLayer(SCENE.SC_SHOP, false, "main");
                                    break;
                            }
                        }
                        break;
                    case KEY_UP:
                        focusY = HTool.getIndex(focusY, -1, 3);
                        focusM = 0;
                        arrowMoveCntStage = 0;
                        arrowMoveCntName = 0;
                        break;
                    case KEY_DOWN:
                        focusY = HTool.getIndex(focusY, 1, 3);
                        focusM = 0;
                        arrowMoveCntStage = 0;
                        arrowMoveCntName = 0;
                        break;
                    case KEY_LEFT:

                        if (focusY == 0) {
                            focusS = HTool.getIndex(focusS, -1, StageManager.getStageAreaLength());
                            stageNum = focusS;
                            setStageData(focusS);
                            focusX = 0;
                        } else if (focusY == 1) {
                            if (focusS == 0 && focusX == 0) {
                                focusS = StageManager.getStageAreaLength() - 1;
                                stageNum = focusS;
                                setStageData(focusS);
                                focusX = 9;
                            } else if (focusX == 0) {
                                focusS--;
                                stageNum = focusS;
                                setStageData(focusS);
                                focusX = 9;
                            } else {
                                focusX = HTool.getIndex(focusX, -1, 10);
                            }
                        } else {
                            focusM = HTool.getIndex(focusM, -1, 4);
                        }

                        break;

                    case KEY_RIGHT:

                        if (focusY == 0) {
                            focusS = HTool.getIndex(focusS, 1, StageManager.getStageAreaLength());
                            stageNum = focusS;
                            setStageData(focusS);
                            focusX = 0;
                        } else if (focusY == 1) {
                            if (focusX == 9 && focusS == StageManager.getStageAreaLength() - 1) {
                                focusS = 0;
                                stageNum = focusS;
                                setStageData(focusS);
                                focusX = 0;
                            } else if (focusX == 9) {
                                focusS++;
                                stageNum = focusS;
                                setStageData(focusS);
                                focusX = 0;
                            } else {
                                focusX = HTool.getIndex(focusX, 1, 10);
                            }
                        } else {
                            focusM = HTool.getIndex(focusM, 1, 4);
                        }

                        break;
                    default:
                        break;
                }
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