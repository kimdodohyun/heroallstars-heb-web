var GameEngine = new function() {
    
    var gameMode;
    var focusX, focusY, focusIdx;
    var focusIdxX = 0;
    var focusIdxY = 0;
    var focusM = 0;
    var frameCnt;
    var termCnt;
    var isCreate;
    
    var isGameStart = false;
    var isGameFocus = false;
    var fx = -241;
    var img_y = -62;
    var curMode;
    var gameEndCnt = 0;
    var createCnt = 0;
    var gameEndDelayCnt = 0;
    var enUnitEndCnt = 0;
    
    // image
    var focusImg = [];
    var unFocusImg = [];
    var dontsettingImg = [];
    var arrow = [];
    var arrow2 = [];
    var crystalImg;
    
    var btn_exit_off;
    var btn_exit_on = [];
    var btn_start_off;
    var btn_start_on = [];
    var btn_pause_off;
    var btn_pause_on = [];
    
    var createUnitPos = [];
    var noneFocus;
    
    var start;
    var clear;
    var ready;
    var gameover;
    var bar_message;
    
    var selectUnitPop;
    
    // result
    
    var stNumFont;
    var rewardItem = [];
    var btnExit = [];
    var btnRestart = [];
    var rewardItemBack;
    
    this.setGameMode = function(_gameMode) {
        curMode = _gameMode;
        gameMode = _gameMode;
        UnitManager.init();
    };
    
    this.gameOver = function() {
        gameMode = GAME_OVER;
    };
    
    this.getGameMode = function() {
        return gameMode;
    };
    
    this.getCreateUnitPos = function() {
        return createUnitPos;
    };
    
    this.setResource = function(onload) {
        switch (curMode) {
            case GAME_MODE_DEFENCE:
            case GAME_MODE_RAID:
                
                gameMode = GAME_READY;
                
                
                var onloadCnt = 0;
                var checkOnload = function () {
                    onloadCnt++;
                    if (onloadCnt == 2) {
                        onload();
                    }
                };
                
                rewardItem = [];
                btnExit = [];
                btnRestart = [];
                btn_exit_on = [];
                btn_start_on = [];
                btn_pause_on = [];
                focusImg = [];
                dontsettingImg = [];
                unFocusImg = [];
                arrow = [];
                arrow2 = [];
                
                btn_pause_off = PlayResManager.getEtcMap().get("btn_pause_off");
                btn_exit_off = PlayResManager.getEtcMap().get("btn_exit_off");
                btn_start_off = PlayResManager.getEtcMap().get("btn_start_off");
                clear = PlayResManager.getEtcMap().get("clear");
                ready = PlayResManager.getEtcMap().get("ready");
                start = PlayResManager.getEtcMap().get("start");
                gameover = PlayResManager.getEtcMap().get("gameover");
                stNumFont = PlayResManager.getMoneyMap().get("stNumFont");
                rewardItemBack = PlayResManager.getEtcMap().get("stage_clear_item_back");
                bar_message = PlayResManager.getEtcMap().get("bar_message");
                
                for (var i = 0; i < 2; i++) {
                    btn_pause_on[i] = PlayResManager.getEtcMap().get("btn_pause_on_" + i);
                    btn_exit_on[i] = PlayResManager.getEtcMap().get("btn_exit_on_" + i);
                    btn_start_on[i] = PlayResManager.getEtcMap().get("btn_start_on_" + i);
                    unFocusImg[i] = PlayResManager.getMyUnitMap().get("unFocus_" + i);
                    arrow[i] = PlayResManager.getMyUnitMap().get("arrow_" + i);
                    arrow2[i] = PlayResManager.getMyUnitMap().get("arrow2_" + i);
                    dontsettingImg[i] = PlayResManager.getEtcMap().get("dontsetting_" + i);
                }
                
                for (var i = 0; i < 4; i++) {
                    rewardItem[i] = PlayResManager.getEtcMap().get("stage_clear_item_" + i);
                }
                
                for (var i = 0; i < 3; i++) {
                    focusImg[i] = PlayResManager.getMyUnitMap().get("focus_" + i);
                    btnExit[i] = PlayResManager.getEtcMap().get("b_exit_" + i);
                    btnRestart[i] = PlayResManager.getEtcMap().get("b_restart_" + i);
                }
                
                UnitManager.createMyUnitInit();
                UnitManager.createEnUnitInit();
                
                createCnt = UnitManager.getRegenTime();
                createUnitPos = [];

                frameCnt = 0;
                termCnt = 0;
                focusM = 0;
                focusIdx = 77;
                focusIdxY = Math.floor(focusIdx / 22);
                focusIdxX = focusIdx - (focusIdxY * 22);
                focusX = focusIdxX * 60 + 10;
                focusY = focusIdxY * 57 + 145;
                
                fx = -241;
                img_y = -62;
                gameEndCnt = 0;
                enUnitEndCnt = 0;
                gameEndDelayCnt = 0;

                isGameStart = false;
                isGameFocus = false;
                isCreate = true;
                
                selectUnitPop = new SelectUnitPopup();
                selectUnitPop.setResource(checkOnload);
                POPUP.POP_RESULT.getInstance().setResource(checkOnload);
                
                noneFocus = UnitManager.getNonePos();;
                break;
            case GAME_MODE_ARENA:
                break;
            default:
                appMgr.openDisconnectPopup("GameEngnie setResource default!!", this);
                onload();
                break;
        };
    };
    
    this.update = function() {
        frameCnt++;
        if (!isGameStart) return;
        switch (UnitManager.isGameEndCheck()) {
            case 0:
                break;
            case 1:
                gameEndDelayCnt++;
                if (gameEndDelayCnt == 20) {
                    
                    if (curMode == GAME_MODE_DEFENCE) {
                        POPUP.POP_RESULT.getInstance().setDefeat(1);
                    } else if (curMode == GAME_MODE_RAID) {
                        POPUP.POP_RESULT.getInstance().setDefeat(2);
                    }
                    PopupMgr.openPopup(POPUP.POP_RESULT);
                }
                break;
            case 2:
                gameEndDelayCnt++;
                if (gameEndDelayCnt == 20) {
                    POPUP.POP_RESULT.getInstance().setClear(UnitManager.getStarGrade(), UnitManager.getFirstReward(), UnitManager.getFirstRewardAmount(), CommonUIDrawManager.getGameMoneyGold(), UnitManager.getReward(), UnitManager.getRewardAmount());
                    PopupMgr.openPopup(POPUP.POP_RESULT);
                }
                break;
            case 3:
                if (termCnt < 50) {
                    termCnt++;
                } else if (termCnt == 50) {
                    termCnt = 0;
                    UnitManager.continueGame();
                }
                break;
            default:
                break;
        }
        
        switch (gameMode) {
            case GAME_INTRO:
                if (frameCnt == 1) {
                    appMgr.playNetSound(ROOT_SOUND + "readystart" + EXT_SOUND);
                }
                fx = Panner.linearTween(frameCnt, fx, 449 - fx, 10);
                if (frameCnt == 25) {
                    
                    if (curMode == GAME_MODE_DEFENCE) {
                        appMgr.loopNetSound(ROOT_SOUND + "stage_" + UnitManager.getStageArea() + EXT_MP3);
                    } else {
                        appMgr.loopNetSound(ROOT_SOUND + "stage_0" + EXT_MP3);
                    }
                    gameMode = curMode;
                }
                break;
            case GAME_MODE_DEFENCE:
            case GAME_MODE_RAID:
                UnitManager.updateEnUnit();
                UnitManager.updateMyUnit();
                
                if (UnitManager.isGameEndCheck() == 3) {
                    return;
                }

                if (createCnt > 0) {
                    createCnt--;
                } else {
                    if (UnitManager.getEnUnitEndCnt() < UnitManager.getRimitCnt()) {
                        UnitManager.createEnUnit();
                        createCnt = UnitManager.getRegenTime();
                        UnitManager.increaseEnUnitEndCnt();
                    } else {
                        
                    }
                }
                break;
            case GAME_MODE_ARENA:
                break;

            case GAME_OVER:
                
                if (gameEndCnt == 0) {
                    focusX = 0;
                    focusY = 0;
                    img_y = -62;
                }
                
                if (gameEndCnt < 5) {
                    img_y += 61;
                }
                
                if (gameEndCnt == 5) {
                    img_y -= 5;
                }
                
                if (gameEndCnt == 6) {
                    img_y += 5;
                }
                
                if (gameEndCnt++ > 24) {
                }
                break;

            case GAME_CLEAR:
                
                if (gameEndCnt == 0) {
                    focusX = 0;
                    focusY = 0;
                    img_y = -122;
                }
                
                if (gameEndCnt < 5) {
                    img_y += 61;
                }
                
                if (gameEndCnt == 5) {
                    img_y -= 5;
                }
                
                if (gameEndCnt == 6) {
                    img_y += 5;
                } 
                
                if (gameEndCnt++ > 24) {
                }
                break;

            default:
                break;
        }
    };
    
    this.render = function(g) {
        switch (gameMode) {
            case GAME_READY:
                
                g.drawImage(btn_start_off, 490, 640);
                g.drawImage(btn_exit_off, 642, 640);
                
                UnitManager.ready2Render(g);
                
                if (isCreate && !isGameFocus) {
                    g.drawImage(focusImg[Math.floor(frameCnt / 3 % 3)], focusX - (focusImg[0].width / 2), focusY - (focusImg[0].height) + 25);
                    
                     for (var i = 0; i < noneFocus.length; i++) {
                        if (noneFocus[i] == focusIdx) {
                            g.drawImage(dontsettingImg[Math.floor(frameCnt / 2 % 2)], focusX - (dontsettingImg[0].width / 2), focusY - (dontsettingImg[0].height) + 25);
                        }
                    }
                }
                
                UnitManager.render(g);
                UnitManager.readyRender(g);
                
                if (isGameFocus) {
                    if (focusM == 0) {
                        g.drawImage(btn_start_on[Math.floor(frameCnt / 2 % 2)], 490, 640);
                    } else {
                        g.drawImage(btn_exit_on[Math.floor(frameCnt / 2 % 2)], 642, 640);
                    }
                }
                
                selectUnitPop.heroRender(g);
                
                g.drawImage(bar_message, 289, 0);
                g.setFont(FONT_22);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, "적절한 위치에 히어로를 배치하세요.", 640, 36, HTextRender.CENTER);
                
                break;
            case GAME_INTRO:
                g.drawImage(btn_pause_off, 1200, 640);
                UnitManager.iconRender(g);
                UnitManager.render(g);
                
                if (frameCnt < 15) {
                    g.drawImage(ready, fx, 278);
                } 

                if (frameCnt > 14) {
                    g.drawImage(start, 449, 278);
                }
                break;
            case GAME_MODE_DEFENCE:
            case GAME_MODE_RAID:
                g.drawImage(btn_pause_off, 1200, 640);
                UnitManager.iconRender(g);
                UnitManager.skillRender(g);
                UnitManager.render(g);
                UnitManager.upgradeRender(g);
                break;
            case GAME_MODE_ARENA:
                break;
                
            case GAME_OVER:
                
                UnitManager.iconRender(g);
                UnitManager.render(g);
                
                g.drawImage(btn_pause_off, 1200, 640);
                
                g.setColor(COLOR_POPUPBACK);
                g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                g.drawImage(gameover, 458, 194);
                break;
            case GAME_CLEAR:
                
                UnitManager.iconRender(g);
                UnitManager.render(g);
                
                g.drawImage(btn_pause_off, 1200, 640);
                
                g.setColor(COLOR_POPUPBACK);
                g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                
                g.drawImage(clear, 377, 161);                
                break;
            default:
                break;
        };
    };
    
    this.stop = function() {

        createUnitPos = null;
        noneFocus = null;
        pospos = null;
        
        focusImg = null;
        unFocusImg = null;
        dontsettingImg = null;
        crystalImg = null;
        bar_message = null;

        start = null;
        clear = null;
        ready = null;
        gameover = null;
        
        btn_exit_off = null;
        btn_exit_on = null;
        btn_start_off = null;
        btn_start_on = null;
        btn_pause_off = null;
        btn_pause_on = null;
        
        stNumFont.dispose();
        stNumFont = null;
        rewardItem = null;
        btnExit = null;
        btnRestart = null;
        rewardItemBack = null;
        
        arrow = null;
        arrow2 = null;

        selectUnitPop.clear();
        UnitManager.stop();  
        POPUP.POP_RESULT.getInstance().clear();
    };
    
    var pospos = [];
    
    this.keyAction = function(keyCode) {
        
        switch (gameMode) {
            case GAME_READY:
                
                if (selectUnitPop.isOpen) {
                    selectUnitPop.onKeyAction(keyCode);
                } else {
                    switch (keyCode) {
                            
                        case KEY_PC_F4:
                            pospos[pospos.length] = focusIdx;
                            console.error("pospos >> " + pospos);
                            break;
                            
                        case KEY_PC_F9:
                            pospos = [];
                            break;
                            
                        case KEY_PREV:
                            PopupMgr.setBackColor("rgba(0,0,0,0)");
                            PopupMgr.openPopup(appMgr.getMessage2BtnPopup("전투를 종료하시겠습니까?"), function (code, data) {
                                if (data == ("0")) {
                                    PopupMgr.closeAllPopup();
                                    PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                    if (curMode == GAME_MODE_DEFENCE) {
                                        appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                    } else if (curMode == GAME_MODE_RAID) {
                                        appMgr.changeLayer(SCENE.SC_RAID, false, "world");
                                    }
                                } else {
                                    PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                }
                            });
                            break;
                            
                        case KEY_ENTER:
                            if (isGameFocus) {
                                if (focusM == 0) {
                                    if (createUnitPos.length == 0) {
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("배치된 히어로가 없습니다."), null, 1500);
                                        return;
                                    }
                                    
                                    PopupMgr.setBackColor("rgba(0,0,0,0)");
                                    POPUP.POP_MSG_2BTN.getInstance().setTime();
                                    PopupMgr.openPopup(appMgr.getMessage2BtnPopup("히어로 배치를 완료하셨습니다.|전투를 시작하시겠습니까?"), function (code, data) {
                                        if (data == ("0")) {
                                            PopupMgr.closeAllPopup();
                                            PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                            UnitManager.setCreateUnitPos(createUnitPos);
                                            UnitManager.createMyUnit();
                                            UnitManager.setFocusIdx(createUnitPos[0]);

                                            isGameStart = true;
                                            isCreate = false;
                                            focusIdx = HTool.getIndex(focusIdx, 1, createUnitPos.length);
                                            frameCnt = 0;
                                            gameMode = GAME_INTRO;
                                        } else {
                                            PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                            PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                        }
                                    });
                                    
                                } else {
                                    PopupMgr.setBackColor("rgba(0,0,0,0)");
                                    PopupMgr.openPopup(appMgr.getMessage2BtnPopup("전투를 종료하시겠습니까?"), function (code, data) {
                                        if (data == ("0")) {
                                            PopupMgr.closeAllPopup();
                                            PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                            if (curMode == GAME_MODE_DEFENCE) {
                                                appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                            } else if (curMode == GAME_MODE_RAID) {
                                                appMgr.changeLayer(SCENE.SC_RAID, false, "world");
                                            }
                                        } else {
                                            PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                            PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                        }
                                    });
                                }
                                return;
                            }

                            if (!isGameStart) {
                                if (isCreate) {
                                    for (var i = 0; i < createUnitPos.length; i++) {
                                        if (createUnitPos[i] == focusIdx) {
                                            UnitManager.removeMyUnit(focusIdx);
                                            createUnitPos.splice(i, 1);
                                            return;
                                        }
                                    }
                                    
                                    for (var i = 0; i < noneFocus.length; i++) {
                                        if (noneFocus[i] == focusIdx) {
                                            return;
                                        }
                                    }
                                    
                                    selectUnitPop.setPosition(focusX, focusY, function(data) {
                                        createUnitPos[createUnitPos.length] = focusIdx;
                                        UnitManager.readyMyUnit(data, focusX, focusY, focusIdx);
                                        
                                        if (focusIdx >= 197) {
                                            focusIdx = 0;
                                        } else {
                                            focusIdx++;
                                        }
                                        
                                        focusIdxY = Math.floor(focusIdx / 22);
                                        focusIdxX = focusIdx - (focusIdxY * 22);
                                        focusX = focusIdxX * 60 + 10;
                                        focusY = focusIdxY * 57 + 145;
                                        
                                        
                                        if (createUnitPos.length == UnitManager.getUseHeroInfo().length) {
                                            isGameFocus = true;
                                        }
                                        return;
                                    });
                                }
                            }
                            break;

                        case KEY_RIGHT:
                            if (isCreate && !isGameFocus) {
                                focusIdxX = HTool.getIndex(focusIdxX, 1, 22);
                                focusIdx = focusIdxX + (focusIdxY * 22);
                                focusX = focusIdxX * 60 + 10;
                            } else {
                                focusM = HTool.getIndex(focusM, 1, 2);
                            }
                            break;

                        case KEY_LEFT:
                            if (isCreate && !isGameFocus) {
                                focusIdxX = HTool.getIndex(focusIdxX, -1, 22);
                                focusIdx = focusIdxX + (focusIdxY * 22);
                                focusX = focusIdxX * 60 + 10;
                            } else {
                                focusM = HTool.getIndex(focusM, -1, 2);
                            }
                            break;

                        case KEY_UP:
                            
                            if (focusIdx < 22) {
                                isGameFocus = isGameFocus == true ? false : true;
                                if (isGameFocus) {
                                    isCreate = false;
                                } else {
                                    isCreate = true;
                                    focusIdxY = 8;
                                    focusIdx = focusIdxX + (focusIdxY * 22);
                                    focusY = focusIdxY * 57 + 145;
                                }
                            } else if (isGameFocus) {
                                isCreate = true;
                                isGameFocus = false;
                                focusIdxY = 8;
                                focusIdx = focusIdxX + (focusIdxY * 22);
                                focusY = focusIdxY * 57 + 145;
                            } else if (isCreate) {
                                focusIdxY = HTool.getIndex(focusIdxY, -1, 9);
                                focusIdx = focusIdxX + (focusIdxY * 22);
                                focusY = focusIdxY * 57 + 145;
                            }
                            break;

                        case KEY_DOWN:
                            
                            if (focusIdx > 175) {
                                isGameFocus = isGameFocus == true ? false : true;
                                if (isGameFocus) {
                                    isCreate = false;
                                } else {
                                    isCreate = true;
                                    focusIdxY = 0;
                                    focusIdx = focusIdxX + (focusIdxY * 22);
                                    focusY = focusIdxY * 57 + 145;
                                }
                            } else if (isGameFocus) {
                                isCreate = true;
                                isGameFocus = false;
                                focusIdxY = 0;
                                focusIdx = focusIdxX + (focusIdxY * 22);
                                focusY = focusIdxY * 57 + 145;
                            } else if (isCreate) {
                                focusIdxY = HTool.getIndex(focusIdxY, 1, 9);
                                focusIdx = focusIdxX + (focusIdxY * 22);
                                focusY = focusIdxY * 57 + 145;
                            }
                            break;
                    }
                    
                    console.error("focusIdx >> " + focusIdx);
                }
                break;
            case GAME_MODE_DEFENCE:
            case GAME_MODE_RAID:
                 UnitManager.defenceKeyAction(keyCode);
                break;
            case GAME_MODE_ARENA:
                break;
            
            case GAME_OVER:
                
                switch (keyCode) {
                    case KEY_LEFT:
                        focusX = HTool.getIndex(focusX, -1, 2);
                        break;
                    case KEY_RIGHT:
                        focusX = HTool.getIndex(focusX, 1, 2);
                        break;
                    case KEY_ENTER:
                        if (focusX == 0) {
                            appMgr.changeLayer(SCENE.SC_READY, false, "waitroom");
                        } else {
                            appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                        }
                        break;
                }
                break;
            case GAME_CLEAR:
                switch (keyCode) {
                    case KEY_LEFT:
                        focusX = HTool.getIndex(focusX, -1, 2);
                        break;
                    case KEY_RIGHT:
                        focusX = HTool.getIndex(focusX, 1, 2);
                        break;
                    case KEY_ENTER:
                        if (focusX == 0) {
                            appMgr.changeLayer(SCENE.SC_READY, false, "waitroom");
                        } else {
                            appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                        }
                        break;
                }
                break;
            
            default:
                break;
        };
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    var SelectUnitPopup = function() {
        
        var listener;

        var focus = 0;
        var isMenu;

        var popX = 0, popY = 0;
        var posX = 0, posY = 0;
        
        var unitAttackRange;
        var rangeX;
        var rangeY;

        var myUnitIconImg;
        var myUnitImg;
        var focusImg;
        var button_exit_on;
        var deploy;

        var popup_monster_select;
        
        this.isOpen = false;

        this.setResource = function(onload) {
            myUnitIconImg = [];
            myUnitImg = [];
            button_exit_on = [];
            
            var imgParam = [
                [popup_monster_select = new Image(), ROOT_IMG + "popup/popup_monster_select" + EXT_PNG],
                [button_exit_on = [], HTool.getURLs(ROOT_IMG, "popup/p_b_exit_", EXT_PNG, 3)],
                [focusImg = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_select_", EXT_PNG, 2)],
                [deploy = new Image(), ROOT_IMG + "waitroom/deploy" + EXT_PNG]
            ];
            for (var i = 0; i <  UnitManager.getUseHeroInfo().length; i++) {
                imgParam.push([myUnitIconImg[i] = new Image(), ROOT_IMG + "game/myUnit/icon/s_hero_" + UnitManager.getUseHeroInfo()[i].getRes() + EXT_PNG]);
                imgParam.push([myUnitImg[i] = new Image(), ROOT_IMG + "game/myUnit/hero/hero_" + UnitManager.getUseHeroInfo()[i].getRes() + "_r_w_0" + EXT_PNG]);
            }

            ResourceMgr.makeImageList(imgParam, function() {
                imgParam = null;
                onload();
            }, function(err) {
                appMgr.openDisconnectPopup("SelectUnitPopup setResource Fail!!");
                onload();
            });
        };

        this.heroRender = function(g) {
            
            if (!this.isOpen) return;
            
            if (myUnitImg[focus] != null) {
                g.setColor(COLOR_ALPHA2);
                HDrawMgr.drawCircle(g, rangeX[focus], rangeY[focus] - 20, (unitAttackRange[focus] * 2), (unitAttackRange[focus] * 2), unitAttackRange[focus]);
                g.drawImage(myUnitImg[focus], posX - myUnitImg[focus].width / 2, posY - myUnitImg[focus].height);
            }
            
            g.drawImage(popup_monster_select, popX + 60, popY - 9);
            g.drawImage(button_exit_on[0], popX + 263, popY + 78);
            
            for (var i = 0; i < UnitManager.getUseHeroInfo().length; i++) {
                if (UnitManager.getUseHeroInfo()[i].getUsed()) {
                    g.drawImage(deploy, popX + 107 + (i * 70), popY - 24);
                }
            }

            if (isMenu) {
                g.drawImage(button_exit_on[Math.floor(frameCnt / 2 % 2) + 1], popX + 263, popY + 78);
            } else {
                g.drawImage(focusImg[frameCnt % 2], popX + 105 + (focus * 70), popY - 1);
            }

            for (var i = 0; i < UnitManager.getUseHeroInfo().length; i++) {
                g.drawImage(myUnitIconImg[i], popX + 111 + (i * 70), popY + 5);
            }
        };

        this.setPosition = function(_x, _y, _listener) {
            
            posX = _x;
            posY = _y;
            
            if (_x + popup_monster_select.width >= SCREEN_WIDTH) {
                popX = _x - popup_monster_select.width - 70;
            } else {
                popX = _x - 40;
            }
            
            popY = _y - 100;
            
            
            unitAttackRange = [];
            rangeX = [];
            rangeY = [];
            
            for (var i = 0; i < UnitManager.getUseHeroInfo().length; i++) {
                unitAttackRange[i] = UnitManager.getUseHeroInfo()[i].getAttackRange();
                rangeX[i] = posX - unitAttackRange[i];
                rangeY[i] = posY - unitAttackRange[i];
            }
            
            for (var i = 0; i < UnitManager.getUseHeroInfo().length; i++) {
                if (!UnitManager.getUseHeroInfo()[i].getUsed()) {
                    focus = i;
                    break;
                }
            }
            
            
            frameCnt = 0;
            isMenu = false;
            
            listener = _listener;
            
            this.isOpen = true;
        };

        var setFocus = function(_focus) {
            focus = _focus;
        };
        
        this.clear = function() {
            myUnitIconImg = null;
            myUnitImg = null;
            focusImg = null;
            popup_monster_select = null;
            button_exit_on = null;
            deploy = null;
            
            unitAttackRange = null;
            rangeX = null;
            rangeY = null;
        };
        
        this.onKeyAction = function(key) {
            switch(key) {
                case KEY_ENTER :

                    if (isMenu) {
                        this.isOpen = false;
                    } else {
                        if (UnitManager.getUseHeroInfo()[focus] != null) {
                            if (UnitManager.getUseHeroInfo()[focus].getUsed()) {
                                PopupMgr.openPopup(appMgr.getMessage0BtnPopup("이미 배치한 영웅입니다."), null, 1500); 
                                return;
                            }
                            listener(UnitManager.getUseHeroInfo()[focus]);
                            this.isOpen = false;
                        }
                    }
                    break;

                case KEY_LEFT:
                    if (isMenu) return;
                    focus = HTool.getIndex(focus, -1, UnitManager.getUseHeroInfo().length);
                    break;

                case KEY_RIGHT:
                    if (isMenu) return;
                    focus = HTool.getIndex(focus, 1, UnitManager.getUseHeroInfo().length);
                    break;
                case KEY_UP:
                    isMenu = !isMenu;
                    break;
                case KEY_DOWN:
                    isMenu = !isMenu
                    break;
            }
        };
    };
};