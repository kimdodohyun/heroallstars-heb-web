// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var ResultPopup = new function() {
    var INSTANCE = this;
    var frameCnt = 0;
    
    var focus = 0;
    var result = 0;
    var grade = 0;
    
    var isLastStage = false;
    
    var firstReward;
    var starReward;
    
    var firstRewardAmount = 0;
    var goldRewardAmount = 0;
    var starRewardAmount = 0;
    
    var starRewardCodeAmount = 0;
    
    var bar;
    var btn_exit_off;
    var btn_exit_on;
    var btn_hero_off;
    var btn_hero_on;
    var btn_next_off;
    var btn_next_on;
    var btn_retry_off;
    var btn_retry_on;
    var star;
    var effect;
    var game_over;
    var stage_clear;
    var tag;
    var rewardIcon;
    var complete;
    
    var rewardIconStr = ["gem", "gold", "key", "magic_stone", "hyper_stone", "black_stone", "blue_stone", "red_stone"];
    var rewardIconCode = ["GEM", "GOLD", "ENTRANCE_KEY", "MAGIC_STONE", "HYPER_STONE", "BLACK_STONE", "BLUE_STONE", "RED_STONE"];
    var tagStr = ["tag_firstclear", "tag_gold", "tag_star"];
    
    INSTANCE.setClear = function(_grade, _firstReward, _firstRewardAmount, _goldRewardAmount, _starReward, _starRewardAmount) {
        
        if (StageManager.getLastStageArea() == UnitManager.getStageArea() && UnitManager.getStageNum() == 9) {
            isLastStage = true;            
        } else {
            isLastStage = false;
        }
        
        result = 0;
        grade = _grade;
        
        for (var i = 0; i < rewardIconStr.length; i++) {
            if (_firstReward == rewardIconStr[i]) {
                firstReward = i;
            }
            
            if (_starReward == rewardIconStr[i]) {
                starReward = i;
            }
        }
        
        firstRewardAmount = _firstRewardAmount;
        goldRewardAmount = _goldRewardAmount;
        starRewardAmount = _starRewardAmount[grade];
        
        switch (starReward) {
            case 0:
                starRewardCodeAmount = itemMgr.getGemAmount() + starRewardAmount;
                break;
                
            case 1:
                starRewardCodeAmount = itemMgr.getGoldAmount() + starRewardAmount;
                break;
                
            case 2:
                starRewardCodeAmount = TokenManager.getAmount() + starRewardAmount;
                break;
                
            case 3:
                starRewardCodeAmount = itemMgr.getMagicStoneAmount() + starRewardAmount;
                break;
                
            case 4:
                starRewardCodeAmount = itemMgr.getHyperStoneAmount() + starRewardAmount;
                break;
                
            case 5:
                starRewardCodeAmount = itemMgr.getBlackStoneAmount() + starRewardAmount;
                break;
                
            case 6:
                starRewardCodeAmount = itemMgr.getBlueStoneAmount() + starRewardAmount;
                break;
                
            case 7:
                starRewardCodeAmount = itemMgr.getRedStoneAmount() + starRewardAmount;
                break;
        }
    };
    
    INSTANCE.setDefeat = function(_result) {
        result = _result;
    };
    
    INSTANCE.setResource = function(onload) {
        
        tag = [];
        rewardIcon = [];
      
        var imgParam = [
            [bar = new Image(), ROOT_IMG + "popup/result/bar" + EXT_PNG],
            [btn_exit_off = new Image(), ROOT_IMG + "popup/result/btn_exit_off" + EXT_PNG],
            [btn_exit_on = new Image(), ROOT_IMG + "popup/result/btn_exit_on" + EXT_PNG],
            [btn_hero_off = new Image(), ROOT_IMG + "popup/result/btn_hero_off" + EXT_PNG],
            [btn_hero_on = new Image(), ROOT_IMG + "popup/result/btn_hero_on" + EXT_PNG],
            [btn_next_off = new Image(), ROOT_IMG + "popup/result/btn_next_off" + EXT_PNG],
            [btn_next_on = new Image(), ROOT_IMG + "popup/result/btn_next_on" + EXT_PNG],
            [btn_retry_off = new Image(), ROOT_IMG + "popup/result/btn_retry_off" + EXT_PNG],
            [btn_retry_on = new Image(), ROOT_IMG + "popup/result/btn_retry_on" + EXT_PNG],
            [star = new Image(), ROOT_IMG + "popup/result/star" + EXT_PNG],
            [effect = new Image(), ROOT_IMG + "popup/result/effect" + EXT_PNG],
            [game_over = new Image(), ROOT_IMG + "popup/result/game_over" + EXT_PNG],
            [stage_clear = new Image(), ROOT_IMG + "popup/result/stage_clear" + EXT_PNG],
            [complete = new Image(), ROOT_IMG + "etc/complete" + EXT_PNG]
        ];
        
        for (var i = 0; i < tagStr.length; i++) {
            imgParam.push([tag[i] = new Image(), ROOT_IMG + "popup/result/" + tagStr[i] + EXT_PNG]);
        }
        
        for (var i = 0; i < rewardIconStr.length; i++) {
            imgParam.push([rewardIcon[i] = new Image(), ROOT_IMG + "popup/result/" + rewardIconStr[i] + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("ResultPopup setResource Fail", this);
        });
    };
    
    INSTANCE.clear = function() {
        bar = null;
        btn_exit_off = null;
        btn_exit_on = null;
        btn_hero_off = null;
        btn_hero_on = null;
        btn_next_off = null;
        btn_next_on = null;
        btn_retry_off = null;
        btn_retry_on = null;
        star = null;
        effect = null;
        game_over = null;
        stage_clear = null;
        tag = null;
        rewardIcon = null;
        complete = null;
    };
    
    return {
        toString: function() {
            return "ResultPopup";
        },
        init: function(onload) {
            focus = 0;
            frameCnt = 0;
            QuestManager.questUpdt(2, function() {
                onload();
            });
        },
        start: function() {
            
            if (result == 0) {
                appMgr.playNetSound(ROOT_SOUND + "result" + EXT_SOUND);
            } else if (result == 1) {
                appMgr.playNetSound(ROOT_SOUND + "gameover" + EXT_SOUND);
            } else if (result == 2) {
                appMgr.playNetSound(ROOT_SOUND + "result" + EXT_SOUND);
            }
            
        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            
            if (result == 0) {
                for (var i = 0; i < grade + 1; i++) {
                    
                    g.save();
                    g.transform(1, 0.5, -0.5, 1, 640 + (i * 108) - (grade * 54), 118);
//                    g.translate(480 + (i * 81) - (grade * 41), 90);
                    g.rotate(frameCnt * Math.PI / 180);
                    g.drawImage(effect, -Math.floor(effect.width / 2), -Math.floor(effect.height / 2));
                    g.restore();
                    g.drawImage(star, 584 + (i * 108) - (grade * 54), 58);
                }
                
                g.drawImage(stage_clear, 377, 161);
                
                if (StageManager.getStageInfo()[UnitManager.getStageArea()][UnitManager.getStageNum()] > -1) {
                    for (var i = 0; i < 2; i++) {
                        g.drawImage(bar, 521 + (i * 120), 305);
                        g.drawImage(tag[i + 1], 543 + (i * 120), 292);
                    }

                    g.drawImage(rewardIcon[1], 545, 324);
                    g.drawImage(rewardIcon[starReward], 665, 324);

                    g.setFont(FONT_23);
                    g.setColor(COLOR_YELLOW);
                    HTextRender.oriRender(g, goldRewardAmount, 580, 432, HTextRender.CENTER);
                    HTextRender.oriRender(g, starRewardAmount, 700, 432, HTextRender.CENTER);
                    
                    
                } else {
                    for (var i = 0; i < 3; i++) {
                        g.drawImage(bar, 461 + (i * 120), 305);
                        g.drawImage(tag[i], 483 + (i * 120), 292);
                    }

                    g.drawImage(rewardIcon[firstReward], 485, 324);
                    g.drawImage(rewardIcon[1], 605, 324);
                    g.drawImage(rewardIcon[starReward], 725, 324);

                    g.setFont(FONT_23);
                    g.setColor(COLOR_YELLOW);
                    HTextRender.oriRender(g, firstRewardAmount, 520, 432, HTextRender.CENTER);
                    HTextRender.oriRender(g, goldRewardAmount, 640, 432, HTextRender.CENTER);
                    HTextRender.oriRender(g, starRewardAmount, 760, 432, HTextRender.CENTER);
                }
                
                
                
                if (isLastStage) {
                    
                    g.drawImage(btn_retry_off, 483, 539);
                    g.drawImage(btn_exit_off, 643, 539);
                    
                    switch (focus) {
                        case 0:
                            g.drawImage(btn_retry_on, 483, 539);
                            break;
                        case 1:
                            g.drawImage(btn_exit_on, 643, 539);
                            break;
                    }
                    
                } else {
                    g.setFont(FONT_24);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, "다음 스테이지를 진행하시겠습니까?", 638, 506, HTextRender.CENTER);
                    
                    g.drawImage(btn_retry_off, 401, 539);
                    g.drawImage(btn_next_off, 561, 539);
                    g.drawImage(btn_exit_off, 721, 539);
                    
                    switch (focus) {
                        case 0:
                            g.drawImage(btn_retry_on, 401, 539);
                            break;
                        case 1:
                            g.drawImage(btn_next_on, 561, 539);
                            break;
                        case 2:
                            g.drawImage(btn_exit_on, 721, 539);
                            break;
                    }
                }
                
            } else if (result == 1) {
                g.drawImage(game_over, 458, 194);
                
                g.setFont(FONT_24);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, "몬스터를 막아내기 어려우신가요?", 638, 366, HTextRender.CENTER);
                HTextRender.oriRender(g, "히어로를 강화한 후 다시한번 도전하세요.", 638, 398, HTextRender.CENTER);
                
                g.drawImage(btn_retry_off, 401, 448);
                g.drawImage(btn_hero_off, 561, 448);
                g.drawImage(btn_exit_off, 721, 448);
                
                switch (focus) {
                    case 0:
                        g.drawImage(btn_retry_on, 401, 448);
                        break;
                    case 1:
                        g.drawImage(btn_hero_on, 561, 448);
                        break;
                    case 2:
                        g.drawImage(btn_exit_on, 721, 448);
                        break;
                }
            } else if (result == 2 ) {
                for (var i = 0; i < 3; i++) {
                    
                    g.save();
                    g.transform(1, 0.5, -0.5, 1, 640 + (i * 108) - (2 * 54), 118);
                    g.rotate(frameCnt * Math.PI / 180);
                    g.drawImage(effect, -Math.floor(effect.width / 2), -Math.floor(effect.height / 2));
                    g.restore();
                    g.drawImage(star, 584 + (i * 108) - (2 * 54), 58);
                }
                
                g.drawImage(stage_clear, 377, 161);
                
                g.setFont(FONT_80);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, UnitManager.getDamageStack(), 640, 393, HTextRender.CENTER);
                
                g.drawImage(btn_retry_off, 483, 539);
                g.drawImage(btn_exit_off, 643, 539);

                switch (focus) {
                    case 0:
                        g.drawImage(btn_retry_on, 483, 539);
                        break;
                    case 1:
                        g.drawImage(btn_exit_on, 643, 539);
                        break;
                }
            }
        },
        stop: function() {
        },
        onKeyPressed: function(key) {
            switch(key) {
                    
                case KEY_ENTER:
                    PopupMgr.closeAllPopup();
                    if (result == 0) {
                        if (StageManager.getLastStageArea() == UnitManager.getStageArea() && UnitManager.getStageNum() == 9) {
                            
                            console.error("LastStageClear");
                            
                            PopupMgr.openPopup(POPUP.POP_WAITING);
                            NetManager.Req_LastStageClear(UnitManager.getStageArea(), UnitManager.getStageNum(), UnitManager.getStarGrade(), CommonUIDrawManager.getGameMoneyGold(), rewardIconCode[starReward], starRewardAmount, -UnitManager.getSkillUseCnt()[0], -UnitManager.getSkillUseCnt()[1], -UnitManager.getSkillUseCnt()[2], function(response) {
                                console.error(response);
                                if (NetManager.isSuccess(response)) {
                                    PopupMgr.closePopup(POPUP.POP_WAITING);
                                    switch (focus) {
                                        case 0:// 재도전
                                            var areaNum = UnitManager.getStageArea();
                                            var stageNum = UnitManager.getStageNum();

                                            SCENE.SC_WORLD.getInstance().setStageIndex(areaNum, stageNum, UnitManager.getStarGrade());
                                            appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                            break;

                                        case 1:// 나가기
                                            appMgr.changeLayer(SCENE.SC_TITLE, false, "world");
                                            break;
                                    }
                                } else {
                                    appMgr.openDisconnectPopup("Netmanager Fail", this);
                                }
                            });
                        } else {
                            var grade;
                            if (StageManager.getStageInfo()[UnitManager.getStageArea()][UnitManager.getStageNum()] < UnitManager.getStarGrade()) {
                                grade = UnitManager.getStarGrade();
                            } else {
                                grade = StageManager.getStageInfo()[UnitManager.getStageArea()][UnitManager.getStageNum()];
                            }

                            // 이미 클리어한 스테이지 재 플레이 시
                            if (StageManager.getStageInfo()[UnitManager.getStageArea()][UnitManager.getStageNum()] >= 0) {
                                
                                console.error("StageSecondClear");
                                
                                PopupMgr.openPopup(POPUP.POP_WAITING);
                                NetManager.Req_StageClear2(UnitManager.getStageArea(), UnitManager.getStageNum(), grade, CommonUIDrawManager.getGameMoneyGold(), rewardIconCode[starReward], starRewardAmount, -UnitManager.getSkillUseCnt()[0], -UnitManager.getSkillUseCnt()[1], -UnitManager.getSkillUseCnt()[2], function(response) {
                                    console.error(response);
                                    if (NetManager.isSuccess(response)) {
                                        PopupMgr.closePopup(POPUP.POP_WAITING);
                                        switch (focus) {
                                            case 0:// 재도전
                                                
                                                var areaNum = UnitManager.getStageArea();
                                                var stageNum = UnitManager.getStageNum();
                                                
                                                SCENE.SC_WORLD.getInstance().setStageIndex(areaNum, stageNum, grade);
                                                appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                                break;

                                            case 1:// 다음스테이지
                                                
                                                var areaNum;
                                                var stageNum;
                                                
                                                if (UnitManager.getStageNum() == 9) {
                                                    areaNum = UnitManager.getStageArea() + 1;
                                                    stageNum = 0;
                                                } else {
                                                    areaNum = UnitManager.getStageArea();
                                                    stageNum = UnitManager.getStageNum() + 1;
                                                }
                                                
                                                SCENE.SC_WORLD.getInstance().setStageIndex(areaNum, stageNum, grade);
                                                appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                                break;

                                            case 2:// 나가기
                                                appMgr.changeLayer(SCENE.SC_TITLE, false, "world");
                                                break;
                                        }
                                    } else {
                                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                                    }
                                });
                            } else {
                                console.error("StageFirstClear");
                                // 처음 시도하는 스테이지 플레이 시
                                PopupMgr.openPopup(POPUP.POP_WAITING);
                                NetManager.Req_StageClear(UnitManager.getStageArea(), UnitManager.getStageNum(), grade, CommonUIDrawManager.getGameMoneyGold(), rewardIconCode[starReward], starRewardAmount, -UnitManager.getSkillUseCnt()[0], -UnitManager.getSkillUseCnt()[1], -UnitManager.getSkillUseCnt()[2], function(response) {
                                    console.error(response);
                                    if (NetManager.isSuccess(response)) {
                                        PopupMgr.closePopup(POPUP.POP_WAITING);
                                        switch (focus) {
                                            case 0:// 재도전
                                                var areaNum = UnitManager.getStageArea();
                                                var stageNum = UnitManager.getStageNum();
                                                
                                                SCENE.SC_WORLD.getInstance().setStageIndex(areaNum, stageNum, grade);
                                                appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                                break;

                                            case 1:// 다음스테이지
                                                var areaNum;
                                                var stageNum;
                                                
                                                if (UnitManager.getStageNum() == 9) {
                                                    areaNum = UnitManager.getStageArea() + 1;
                                                    stageNum = 0;
                                                } else {
                                                    areaNum = UnitManager.getStageArea();
                                                    stageNum = UnitManager.getStageNum() + 1;
                                                }
                                                
                                                SCENE.SC_WORLD.getInstance().setStageIndex(areaNum, stageNum, grade);
                                                appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                                break;

                                            case 2:// 나가기
                                                appMgr.changeLayer(SCENE.SC_TITLE, false, "world");
                                                break;
                                        }
                                    } else {
                                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                                    }
                                });
                            }
                        }
                        
                    } else if (result == 1) {
                        PopupMgr.openPopup(POPUP.POP_WAITING);
                        NetManager.Req_GameEndItemUpdt(CommonUIDrawManager.getGameMoneyGold(), -UnitManager.getSkillUseCnt()[0], -UnitManager.getSkillUseCnt()[1], -UnitManager.getSkillUseCnt()[2], function(response) {
                            console.error(response);
                            if (NetManager.isSuccess(response)) {
                                PopupMgr.closePopup(POPUP.POP_WAITING);
                                switch (focus) {
                                    case 0:// 재도전
                                        
                                        var areaNum = UnitManager.getStageArea();
                                        var stageNum = UnitManager.getStageNum();

                                        SCENE.SC_WORLD.getInstance().setStageIndex(areaNum, stageNum);
                                        
                                        appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                        break;

                                    case 1:// 히어로
                                        appMgr.changeLayer(SCENE.SC_INVEN, false, "world");
                                        break;

                                    case 2:// 나가기
                                        appMgr.changeLayer(SCENE.SC_TITLE, false, "world");
                                        break;
                                }
                            } else {
                                appMgr.openDisconnectPopup("Netmanager Fail", this);
                            }
                        });
                    } else if (result == 2) {
                        PopupMgr.openPopup(POPUP.POP_WAITING);
                        NetManager.Req_RaidPlayEnd(UnitManager.getDamageStack(), -UnitManager.getSkillUseCnt()[0], -UnitManager.getSkillUseCnt()[1], -UnitManager.getSkillUseCnt()[2], function(response) {
                            console.error(response);
                            if (NetManager.isSuccess(response)) {
                                PopupMgr.closePopup(POPUP.POP_WAITING);
                                switch (focus) {
                                    case 0:// 재도전
                                        appMgr.changeLayer(SCENE.SC_RAID, false, "world");
                                        break;

                                    case 1:// 나가기
                                        appMgr.changeLayer(SCENE.SC_TITLE, false, "world");
                                        break;
                                }
                            } else {
                                appMgr.openDisconnectPopup("Netmanager Fail", this);
                            }
                        });
                    }
                    break;
                case KEY_LEFT:
                    if (result == 0) {
                        if (isLastStage) {
                            focus = HTool.getIndex(focus, -1, 2);
                        } else {
                            focus = HTool.getIndex(focus, -1, 3);
                        }
                    } else if (result == 1) {
                        focus = HTool.getIndex(focus, -1, 3);
                    } else if (result == 2) {
                        focus = HTool.getIndex(focus, -1, 2);
                    }
                    break;
                case KEY_RIGHT:
                    if (result == 0) {
                        if (isLastStage) {
                            focus = HTool.getIndex(focus, 1, 2);
                        } else {
                            focus = HTool.getIndex(focus, 1, 3);
                        }
                    } else if (result == 1) {
                        focus = HTool.getIndex(focus, 1, 3);
                    } else if (result == 2) {
                        focus = HTool.getIndex(focus, 1, 2);
                    }
                    break;
            }
            
            UIMgr.repaint();
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