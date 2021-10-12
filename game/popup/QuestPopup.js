"use strict";
"use warning";

var QuestPopup = new function() {
    var INSTANCE = this;
    
    var frameCnt;
    var focus;
    var isKeyLock;
    var quest;
    var lenHegiht;
    
    var popup_0;
    var back;
    var btn_close_off;
    var btn_close_on;
    var btn_get_off;
    var btn_get_on;
    var btn_complete_off;
    var btn_complete_on;
    var btn_progress_off;
    var btn_progress_on;
    var reward = [];
    
    var rewardStr = ["reward_gem", "reward_gold", "reward_key", "reward_summonstone_normal", "reward_summonstone_special", "reward_upgradestone_black", "reward_upgradestone_blue", "reward_upgradestone_red"];
    var rewardMsg = ["골드 1000개를 획득 하였습니다.", "열쇠 3개를 획득 하였습니다.", "일반소환석 1개를 획득 하였습니다.", "골드 1000개를 획득 하였습니다.", "고급소환석 1개를 획득 하였습니다.", "보석 1개를 획득 하였습니다."];
    
    var setResource = function(onload) {
        
        reward = [];
        
        var imgParam = [
            [back = new Image(), ROOT_IMG + "popup/mailbox/bar_list" + EXT_PNG],
            [btn_close_off = new Image(), ROOT_IMG + "popup/mailbox/btn_close_off" + EXT_PNG],
            [btn_close_on = new Image(), ROOT_IMG + "popup/mailbox/btn_close_on" + EXT_PNG],
            [btn_get_off = new Image(), ROOT_IMG + "popup/mailbox/btn_get_off" + EXT_PNG],
            [btn_get_on = new Image(), ROOT_IMG + "popup/mailbox/btn_get_on" + EXT_PNG],
            [btn_complete_off = new Image(), ROOT_IMG + "popup/mailbox/btn_complete_off" + EXT_PNG],
            [btn_complete_on = new Image(), ROOT_IMG + "popup/mailbox/btn_complete_on" + EXT_PNG],
            [btn_progress_off = new Image(), ROOT_IMG + "popup/mailbox/btn_progress_off" + EXT_PNG],
            [btn_progress_on = new Image(), ROOT_IMG + "popup/mailbox/btn_progress_on" + EXT_PNG],
            [popup_0 = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG]
        ];
        
        for (var i = 0; i < rewardStr.length; i++) {
            imgParam.push([reward[i] = new Image(), ROOT_IMG + "popup/mailbox/" + rewardStr[i] + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            setQuestList();
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("QuestPopup setResource Fail", this);
        });
    };
    
    var setQuestList = function() {
        quest = [];
        
        var cnt = 0;
        
        for (var i = 0; i < 6; i++) {
            if (QuestManager.getRewardState()[i] == "0") {
                var obj = {};
                
                obj.state = QuestManager.getState()[i];
                obj.rewardState = QuestManager.getRewardState()[i];
                obj.name = QuestManager.getName()[i];
                obj.product = QuestManager.getProduct()[i];
                obj.currentValue = QuestManager.getCurrentValue()[i];
                obj.clearValue = QuestManager.getClearValue()[i];
                obj.rewardAmount = QuestManager.getRewardAmount()[i];
                obj.index = QuestManager.getIndex()[i];
                
                quest[cnt] = obj;
                cnt++;
            }
        }
        
        switch (quest.length) {
            case 0:
                PopupMgr.closePopup(POPUP.POP_QUEST);
                PopupMgr.openPopup(appMgr.getMessage1BtnPopup("모든 퀘스트를 완료하였습니다."), null);
                break;
            case 1:
                lenHegiht = 225;
                break;
            case 2:
                lenHegiht = 175;
                break;
            case 3:
                lenHegiht = 125;
                break;
            case 4:
                lenHegiht = 75;
                break;
            case 5:
                lenHegiht = 25;
                break;
            case 6:
                lenHegiht = 0;
                break;
            default:
                lenHegiht = 0;
                break;
        }
    };
    
    return {
        toString: function() {
            return "QuestPopup";
        },
        init: function(onload) {
            frameCnt = 0;
            focus = 0;
            isKeyLock = false;
            setResource(onload);
        },
        start: function() {
//            if (quest.length < 1) {
//                PopupMgr.closePopup(POPUP.POP_QUEST);
//                PopupMgr.openPopup(appMgr.getMessage1BtnPopup("모든 퀘스트를 완료하였습니다."), null);
//            }
            
        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            
            for (var i = 0; i < quest.length; i++) {
                g.drawImage(back, 283, 25 + lenHegiht + (i * 100));
                
                if (quest[i].state == "0") {
                    g.drawImage(btn_progress_off, 878, 42 + lenHegiht + (i * 100));
                } else if (quest[i].state == "1") {
                    
                    if (quest[i].rewardState == "0") {
                        g.drawImage(btn_get_off, 878, 42 + lenHegiht + (i * 100));
                    } else if (quest[i].rewardState == "1") {
                        g.drawImage(btn_complete_off, 878, 42 + lenHegiht + (i * 100));
                    }
                }

                g.drawImage(reward[quest[i].product], 312, 44 + lenHegiht + (i * 100));

                g.setFont(FONT_20);
                g.setColor(COLOR_WHITE);
                
                HTextRender.oriRender(g, quest[i].rewardAmount, 370, 105 + lenHegiht + (i * 100), HTextRender.CENTER);
                
                HTextRender.oriRender(g, quest[i].name, 393, 81 + lenHegiht + (i * 100), HTextRender.LEFT);
                g.setColor(COLOR_YELLOW);
                HTextRender.oriRender(g, quest[i].currentValue + "/" + quest[i].clearValue, 863, 81 + lenHegiht + (i * 100), HTextRender.RIGHT);
            }
            
            g.drawImage(btn_close_off, 561, 53 + (quest.length * 100) + lenHegiht);
            
            if (focus < quest.length) {
                if (quest[focus].state == 0) {
                    g.drawImage(btn_progress_on, 878, 42 + lenHegiht + (focus * 100));
                } else if (quest[focus].state == 1) {
                    if (quest[focus].rewardState == 0) {
                        g.drawImage(btn_get_on, 878, 42 + lenHegiht + (focus * 100));
                    } else if (quest[focus].rewardState == 1) {
                        g.drawImage(btn_complete_on, 878, 42 + lenHegiht + (focus * 100));
                    }
                }
            } else {
                g.drawImage(btn_close_on, 561, 53 + (quest.length * 100) + lenHegiht);
            }

            
            
            
            
            
            
            
            
            
            
            
            
            
            
//            for (var i = 0; i < 6; i++) {
//                g.drawImage(back, 283, 25 + (i * 100));
//                
//                if (QuestManager.getState()[i] == "0") {
//                    g.drawImage(btn_progress_off, 878, 42 + (i * 100));
//                } else if (QuestManager.getState()[i] == "1") {
//                    
//                    if (QuestManager.getRewardState()[i] == "0") {
//                        g.drawImage(btn_get_off, 878, 42 + (i * 100));
//                    } else if (QuestManager.getRewardState()[i] == "1") {
//                        g.drawImage(btn_complete_off, 878, 42 + (i * 100));
//                    }
//                }
//
//                g.drawImage(reward[QuestManager.getProduct()[i]], 312, 44 + (i * 100));
//
//                g.setFont(FONT_20);
//                g.setColor(COLOR_WHITE);
//                
//                HTextRender.oriRender(g, rewardAmount[i], 370, 105 + (i * 100), HTextRender.CENTER);
//                
//                HTextRender.oriRender(g, QuestManager.getName()[i], 393, 81 + (i * 100), HTextRender.LEFT);
//                g.setColor(COLOR_YELLOW);
//                HTextRender.oriRender(g, QuestManager.getCurrentValue()[i] + "/" + QuestManager.getClearValue()[i], 863, 81 + (i * 100), HTextRender.RIGHT);
//            }
//            
//            g.drawImage(btn_close_off, 561, 628);
//
//            switch (focus) {
//                case 0:
//                case 1:
//                case 2:
//                case 3:
//                case 4:
//                case 5:
//                    if (QuestManager.getState()[focus] == 0) {
//                        g.drawImage(btn_progress_on, 878, 42 + (focus * 100));
//                    } else if (QuestManager.getState()[focus] == 1) {
//                        if (QuestManager.getRewardState()[focus] == 0) {
//                            g.drawImage(btn_get_on, 878, 42 + (focus * 100));
//                        } else if (QuestManager.getRewardState()[focus] == 1) {
//                            g.drawImage(btn_complete_on, 878, 42 + (focus * 100));
//                        }
//                    }
//                    break;
//                case 6:
//                    g.drawImage(btn_close_on, 561, 628);
//                    break;
//            }
            
        },
        stop: function() {
            popup_0 = null;
            back = null;
            btn_close_off = null;
            btn_close_on = null;;
            btn_get_off = null;
            btn_get_on = null;
            btn_complete_off = null;
            btn_complete_on = null;
            btn_progress_off = null;
            btn_progress_on = null;
            reward = null;
        },
        dispose: function() {
            rewardStr = null;
            rewardMsg = null;
        },
        onKeyPressed: function(key) {
            
            if (isKeyLock) return;
            
            switch(key) {
                    
                case KEY_PREV:
                    PopupMgr.closePopup(POPUP.POP_QUEST);
                    break;
                    
                case KEY_ENTER :
                    isKeyLock = true;
                    
                    if (focus < quest.length) {
                        QuestManager.questReward(quest[focus].index, function(code) {
                                
                            switch (code) {
                                case 0:
                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup(rewardMsg[quest[focus].index]), null, 1500);
                                    setQuestList();
                                    break;

                                case 1:
                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("이미 보상을 받았습니다."), null, 1500);
                                    break;

                                case 2:
                                    console.error("quset name >> " + quest[focus].name);
                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("퀘스트 완료 후 보상을 받으세요!"), null, 1500);
                                    break;
                            }
                            isKeyLock = false;
                        });
                    } else {
                        PopupMgr.closePopup(POPUP.POP_QUEST);
                    }
                    
//                    switch (focus) {
//                        case 0:
//                        case 1:
//                        case 2:
//                        case 3:
//                        case 4:
//                        case 5:
//                            QuestManager.questReward(focus, function(code) {
//                                
//                            switch (code) {
//                                case 0:
//                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup(rewardMsg[focus]), null, 1500);
//                                    break;
//
//                                case 1:
//                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("이미 보상을 받았습니다."), null, 1500);
//                                    break;
//
//                                case 2:
//                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("퀘스트 완료 후 보상을 받으세요!"), null, 1500);
//                                    break;
//                            }
//                            isKeyLock = false;
//                        });
//                            break;
//                        case 6:
//                            PopupMgr.closePopup(POPUP.POP_QUEST);
//                            break;
//                    }
                    break;
                    
                case KEY_UP:
                    focus = HTool.getIndex(focus, -1, quest.length + 1);
                    break;
                    
                case KEY_DOWN:
                    focus = HTool.getIndex(focus, 1, quest.length + 1);
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