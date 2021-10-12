// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var DailyItemMonthPopup = new function() {
    var INSTANCE = this;
    
    var days;
    var code;
    var amount;
    var rewardIdx;
    
    var frameCnt;
    
    var widthCnt;
    var heightCnt;
    
    var oriWidthCnt;
    var oriHeightCnt;
    
    var back;
    var reward;
    var btn_ok_on;
    var complete;
    var focus_slot;
    var today_icon;
    
    var setResource = function(onload) {
        
        reward = [];
        
        var imgParam = [
            [back = new Image(), ROOT_IMG + "popup/daymonth/day_check_back" + EXT_PNG],
            [btn_ok_on = new Image(), ROOT_IMG + "popup/btn_ok_on" + EXT_PNG],
            [complete = new Image(), ROOT_IMG + "etc/complete" + EXT_PNG],
            [focus_slot = new Image(), ROOT_IMG + "popup/daymonth/focus_slot" + EXT_PNG],
            [today_icon = new Image(), ROOT_IMG + "popup/daymonth/today_icon" + EXT_PNG],
            [reward = [], HTool.getURLs(ROOT_IMG, "popup/daymonth/day_check_reward_", EXT_PNG, 8)]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("DailyItemMonthPopup setResource Fail", this);
        });
    };
    
    this.Rev_Info = function(arr) {
        days = [];
        code = [];
        amount = [];
        rewardIdx = [];
        
//        for (var i = 0; i < 29; i++) {
//            days.push(1);
//        }
        
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].rcvYN == 1) {
                days.push(arr[i].rcvYN);
            }
        }
        
        for (var i = 0; i < HeroManager.getDailyJson().length; i++) {
            code[i] = HeroManager.getDailyJson()[i].code;
            amount[i] = HeroManager.getDailyJson()[i].amount;
            
            if (code[i] == "GEM") {
                rewardIdx[i] = 0;
            } else if (code[i] == "GOLD") {
                rewardIdx[i] = 1;
            } else if (code[i] == "ENTRANCE_KEY") {
                rewardIdx[i] = 2;
            } else if (code[i] == "MAGIC_STONE") {
                rewardIdx[i] = 3;
            } else if (code[i] == "HYPER_STONE") {
                rewardIdx[i] = 4;
            } else if (code[i] == "BLACK_STONE") {
                rewardIdx[i] = 5;
            } else if (code[i] == "BLUE_STONE") {
                rewardIdx[i] = 6;
            } else if (code[i] == "RED_STONE") {
                rewardIdx[i] = 7;
            }
        }
    };
    
    return {
        toString: function() {
            return "DailyItemMonthPopup";
        },
        init: function(onload) {
//            PopupMgr.openPopup(POPUP.POP_WAITING);
//            NetManager.Req_RewardGive("QUEST_CLEAR_0", function(res) {
//                if (NetManager.isSuccess(res)) {
//                    PopupMgr.closePopup(POPUP.POP_WAITING);
//                    
//                    frameCnt = 0;
//            
//                    oriWidthCnt = 40;
//                    oriHeightCnt = 40;
//
//                    widthCnt = 120;
//                    heightCnt = 120;
//                    
//                    onload();
//                } else {
//                    appMgr.openDisconnectPopup("DailyItemMonth RewardGive Fail!!", this);
//                }
//            });
            
            
            frameCnt = 0;
            
            oriWidthCnt = 40;
            oriHeightCnt = 40;

            widthCnt = 120;
            heightCnt = 120;

            setResource(onload);
            
//            onload();
        },
        start: function() {
            
        },
        run: function() {
            
            if (widthCnt > oriWidthCnt) {
                widthCnt -= 10;
            } else {
                widthCnt = oriWidthCnt;
            }
            
            if (heightCnt > oriHeightCnt) {
                heightCnt -= 10;
            } else {
                heightCnt = oriHeightCnt;
            }
            
            UIMgr.repaint();
        },
        paint: function() {
            
            g.drawImage(back, 172, 46);
            
            g.setColor(COLOR_WHITE);
            g.setFont(FONT_22);
            
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 7; j++) {
                    g.drawImage(reward[rewardIdx[j + (i * 7)]], 228 + (j * 120), 150 + (i * 120));
                    // j + (i * 7) >> 1 ~ 28까지
                    HTextRender.oriRender(g, ((j + 1) + (i * 7)) + "일", 232 + (j * 120), 173 + ( i * 120), HTextRender.LEFT);
                    HTextRender.oriRender(g, amount[j + (i * 7)], 324 + (j * 120), 241 + ( i * 120), HTextRender.RIGHT);
                }
            }
            
            for (var i = 0; i < days.length; i++) {
                if (i < 7) {
                    g.drawImage(complete, 239 + (i * 120), 170);
                    if (i == days.length - 1) {
                        g.drawImage(focus_slot, 219 + (i * 120), 141);
                        g.drawImage(today_icon, 240 + (i * 120), 130);
                    }
                } else if (i > 6 && i < 14) {
                    g.drawImage(complete, 239 + ((i - 7) * 120), 290);
                    if (i == days.length - 1) {
                        g.drawImage(focus_slot, 219 + ((i - 7) * 120), 261);
                        g.drawImage(today_icon, 240 + ((i - 7) * 120), 250);
                    }
                } else if (i > 13 && i < 21) {
                    g.drawImage(complete, 239 + ((i - 14) * 120), 410);
                    if (i == days.length - 1) {
                        g.drawImage(focus_slot, 219 + ((i - 14) * 120), 381);
                        g.drawImage(today_icon, 240 + ((i - 14) * 120), 370);
                    }
                } else if (i > 20 && i < 28) {
                    g.drawImage(complete, 239 + ((i - 21) * 120), 530);
                    if (i == days.length - 1) {
                        g.drawImage(focus_slot, 219 + ((i - 21) * 120), 501);
                        g.drawImage(today_icon, 240 + ((i - 21) * 120), 490);
                    }
                }
            }
            
            g.drawImage(btn_ok_on, 560, 628);
        },
        stop: function() {
            days = null;
            back = null;
            reward = null;
            btn_ok_on = null;
            complete = null;
            focus_slot = null;
            today_icon = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_PREV:
                case KEY_ENTER:
                    PopupMgr.closeAllPopup();
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