// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var SkillPurchasePopup = new function() {
    var INSTANCE = this;
    
    var focus = 0;
    var skillIdx = 0;
    var isKeyLock;
    
    var back;
    var btn_buy1_off;
    var btn_buy1_on;
    var btn_buy5_off;
    var btn_buy5_on;
    var btn_cancel_off;
    var btn_cancel_on;
    var skill = [];
    
    var skillCode = ["FIRE_SKILL", "ICE_SKILL", "FAST_SKILL"];
    
    INSTANCE.setResource = function(onload) {
      
        skill = [];
        var imgParam = [
            [back = new Image(), ROOT_IMG + "waitroom/back" + EXT_PNG],
            [btn_buy1_off = new Image(), ROOT_IMG + "waitroom/btn_buy1_off" + EXT_PNG],
            [btn_buy1_on = new Image(), ROOT_IMG + "waitroom/btn_buy1_on" + EXT_PNG],
            [btn_buy5_off = new Image(), ROOT_IMG + "waitroom/btn_buy5_off" + EXT_PNG],
            [btn_buy5_on = new Image(), ROOT_IMG + "waitroom/btn_buy5_on" + EXT_PNG],
            [btn_cancel_off = new Image(), ROOT_IMG + "waitroom/btn_cancel_off" + EXT_PNG],
            [btn_cancel_on = new Image(), ROOT_IMG + "waitroom/btn_cancel_on" + EXT_PNG],
            [skill = [], HTool.getURLs(ROOT_IMG, "waitroom/skill_", EXT_PNG, 3)]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("SkillPurchasePopup setResource Fail", this);
        });
    };
    
    INSTANCE.clear = function() {
        back = null;
        btn_buy1_off = null;
        btn_buy1_on = null;
        btn_buy5_off = null;
        btn_buy5_on = null;
        btn_cancel_off = null;
        btn_cancel_on = null;
        skill = null;
    };
    
    INSTANCE.setSkill = function(_skillIdx) {
        skillIdx = _skillIdx;
    };
    
    var lackCheck = function(_priceGem) {
        var code = "GEM";
        var remainAmount;
        var priceGem = _priceGem;
        
        remainAmount = ItemManager.checkPrice(code, priceGem);
        
        if (remainAmount < 0) {
            PopupMgr.openPopup(appMgr.getMessage2BtnPopup("보석이 부족합니다.|충전하러 이동 하시겠습니까?"), function (code, data) {
                if (data == ("0")) {
                    PopupMgr.closeAllPopup();
                    appMgr.changeLayer(SCENE.SC_SHOP, false, "shop");
                } else {
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                }
            });
            return false;
        }
        
        return true;
    };
    
    return {
        toString: function() {
            return "SkillPurchasePopup";
        },
        init: function(onload) {
            focus = 0;
            isKeyLock = false;
            onload();
        },
        start: function() {

        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {
            
            g.drawImage(back, 300, 136);
            g.drawImage(skill[skillIdx], 392, 249);
            
            g.setFont(FONT_24);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, UnitManager.getSkillCnt(skillIdx), 399, 343, HTextRender.LEFT);
            
            switch (skillIdx) {
                case 0:
                    g.setFont(FONT_20);
                    g.setColor(COLOR_YELLOW);
                    HTextRender.oriRender(g, "메테오", 520, 268, HTextRender.LEFT);
                    
                    g.setFont(FONT_18);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, "- 전체 적군에게 체력의 20% 데미지", 520, 300, HTextRender.LEFT);
                    HTextRender.oriRender(g, "- 쿨타임 30초", 520, 326, HTextRender.LEFT);
                    HTextRender.oriRender(g, "- 스킬은 전투 중 최대 2회만 사용 가능합니다.", 520, 352, HTextRender.LEFT);
                    break;
                    
                case 1:
                    g.setFont(FONT_20);
                    g.setColor(COLOR_YELLOW);
                    HTextRender.oriRender(g, "아이스", 520, 268, HTextRender.LEFT);
                    
                    g.setFont(FONT_18);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, "- 화면에 있는 적군을 10초간 멈추게 한다", 520, 300, HTextRender.LEFT);
                    HTextRender.oriRender(g, "- 쿨타임 30초", 520, 326, HTextRender.LEFT);
                    HTextRender.oriRender(g, "- 스킬은 전투 중 최대 2회만 사용 가능합니다.", 520, 352, HTextRender.LEFT);
                    break;
                    
                case 2:
                    g.setFont(FONT_20);
                    g.setColor(COLOR_YELLOW);
                    HTextRender.oriRender(g, "패스트", 520, 268, HTextRender.LEFT);
                    
                    g.setFont(FONT_18);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, "- 아군 영웅 전체 공격속도 50% 증가", 520, 300, HTextRender.LEFT);
                    HTextRender.oriRender(g, "- 쿨타임 30초", 520, 326, HTextRender.LEFT);
                    HTextRender.oriRender(g, "- 스킬은 전투 중 최대 2회만 사용 가능합니다.", 520, 352, HTextRender.LEFT);
                    break;
            }
            
            g.setFont(FONT_22);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, "스킬을 충전하시겠습니까?", 640, 442, HTextRender.CENTER);
            
            g.drawImage(btn_buy1_off, 401, 477);
            g.drawImage(btn_buy5_off, 561, 477);
            g.drawImage(btn_cancel_off, 721, 477);
            
            switch (focus) {
                case 0:
                    g.drawImage(btn_buy1_on, 401, 477);
                    break;
                case 1:
                    g.drawImage(btn_buy5_on, 561, 477);
                    break;
                case 2:
                    g.drawImage(btn_cancel_on, 721, 477);
                    break;
            }
            
            
        },
        stop: function() {
        },
        onKeyPressed: function(key) {
            
            if (isKeyLock) return;
            
            switch(key) {
                case KEY_PREV:
                case KEY_PC_F4:
                    PopupMgr.closeAllPopup();
                    break;
                    
                case KEY_ENTER:
                    
                    switch (focus) {
                        case 0:
                            
                            if (ItemManager.itemFullCheck(skillCode[skillIdx], 1)) {
                                PopupMgr.openPopup(appMgr.getMessage1BtnPopup("더이상 스킬을 구매할 수 없습니다."));
                                return;
                            }
                            
                            if (lackCheck(5)) {
                                isKeyLock = true;
                                PopupMgr.openPopup(POPUP.POP_WAITING);
                                NetManager.Req_ItemPurchase(skillCode[skillIdx] + "_" + focus, 0, function(response) {
                                    console.error(response);
                                    if (NetManager.isSuccess(response)) {
                                        isKeyLock = false;
                                        PopupMgr.closePopup(POPUP.POP_WAITING);
                                        PopupMgr.openPopup(appMgr.getMessage1BtnPopup("스킬이 충전 되었습니다."));
                                    } else {
                                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                                    }
                                });
                            }
                            break;
                            
                        case 1:
                            
                            if (ItemManager.itemFullCheck(skillCode[skillIdx], 5)) {
                                PopupMgr.openPopup(appMgr.getMessage1BtnPopup("더이상 스킬을 구매할 수 없습니다."));
                                return;
                            }
                            
                            if (lackCheck(25)) {
                                isKeyLock = true;
                                PopupMgr.openPopup(POPUP.POP_WAITING);
                                NetManager.Req_ItemPurchase(skillCode[skillIdx] + "_" + focus, 0, function(response) {
                                    console.error(response);
                                    if (NetManager.isSuccess(response)) {
                                        isKeyLock = false;
                                        PopupMgr.closePopup(POPUP.POP_WAITING);
                                        PopupMgr.openPopup(appMgr.getMessage1BtnPopup("스킬이 충전 되었습니다."));
                                    } else {
                                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                                    }
                                });
                            }
                            break;
                            
                        case 2:
                            PopupMgr.closeAllPopup();
                            break;
                    }
                    break;
                    
                case KEY_LEFT:
                    focus = HTool.getIndex(focus, -1, 3);
                    break;
                    
                case KEY_RIGHT:
                    focus = HTool.getIndex(focus, 1, 3);
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