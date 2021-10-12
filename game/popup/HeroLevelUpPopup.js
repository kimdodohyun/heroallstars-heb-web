// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var HeroLevelUpPopup = new function() {
    var INSTANCE = this;
    
    var listener;
    
    var frameCnt = 0;
    var focus = 0;
    var state = 0;
    var levelupAtk = 0;
    
    var priceGold = 0;
    var priceGem = 0;
    var priceStone = 0;
    
    var isApply = false;;
    
    var back;
    var arrow_upgrade;
    var bar_stone = [];
    
    var btn_cancel_off;
    var btn_cancel_on;
    var btn_gem_off;
    var btn_gem_on;
    var btn_gold_off;
    var btn_gold_on;
    var btn_retry_off;
    var btn_retry_on;
    var btn_upgrade_off;
    var btn_upgrade_on;
    var btn_ok_off;
    var btn_ok_on;
    var use_stone;
    
    var effect_upgrade;
    var icon = [];
    var tag_att;
    var tag_gem;
    var tag_normal;
    var upgrade_fail;
    var upgrade_success;
    
    var wsNumFont;
    
    var loading_back;
    var loadingbar;
    var star;
    var slot;
    
    ///////////////
    var heroImg;
    var heroData;
    
    var isFail;
    
    var iconStr = ["icon_upgradestone_black", "icon_upgradestone_blue", "icon_upgradestone_red"];
    var barStr = ["bar_stonered", "bar_stoneblue", "bar_stoneblack"];
    var stoneStr = ["BLACK_STONE", "BLUE_STONE", "RED_STONE"];
    
    INSTANCE.setResource = function(onload) {
      
        loadingbar = [];
        bar_stone = [];
        icon = [];
        effect_upgrade = [];
        
        var imgParam = [
            
            [back = new Image(), ROOT_IMG + "inventory/upgrade/back" + EXT_PNG],
            [arrow_upgrade = new Image(), ROOT_IMG + "inventory/upgrade/arrow_upgrade" + EXT_PNG],
            [btn_cancel_off = new Image(), ROOT_IMG + "inventory/upgrade/btn_cancel_off" + EXT_PNG],
            [btn_cancel_on = new Image(), ROOT_IMG + "inventory/upgrade/btn_cancel_on" + EXT_PNG],
            [btn_gem_off = new Image(), ROOT_IMG + "inventory/upgrade/btn_gem_off" + EXT_PNG],
            [btn_gem_on = new Image(), ROOT_IMG + "inventory/upgrade/btn_gem_on" + EXT_PNG],
            [btn_gold_off = new Image(), ROOT_IMG + "inventory/upgrade/btn_gold_off" + EXT_PNG],
            [btn_gold_on = new Image(), ROOT_IMG + "inventory/upgrade/btn_gold_on" + EXT_PNG],
            [btn_retry_off = new Image(), ROOT_IMG + "inventory/upgrade/btn_retry_off" + EXT_PNG],
            [btn_retry_on = new Image(), ROOT_IMG + "inventory/upgrade/btn_retry_on" + EXT_PNG],
            [btn_upgrade_off = new Image(), ROOT_IMG + "inventory/upgrade/btn_upgrade_off" + EXT_PNG],
            [btn_upgrade_on = new Image(), ROOT_IMG + "inventory/upgrade/btn_upgrade_on" + EXT_PNG],
            [btn_ok_off = new Image(), ROOT_IMG + "inventory/upgrade/btn_ok_off" + EXT_PNG],
            [btn_ok_on = new Image(), ROOT_IMG + "inventory/upgrade/btn_ok_on" + EXT_PNG],
            [use_stone = new Image(), ROOT_IMG + "inventory/upgrade/use_stone" + EXT_PNG],
            
            [effect_upgrade = [], HTool.getURLs(ROOT_IMG, "summon/effect_", EXT_PNG, 4)],
//            [effect_upgrade = new Image(), ROOT_IMG + "inventory/upgrade/effect_upgrade" + EXT_PNG],
            
            [tag_att = new Image(), ROOT_IMG + "inventory/upgrade/tag_att" + EXT_PNG],
            [tag_gem = new Image(), ROOT_IMG + "inventory/upgrade/tag_gem" + EXT_PNG],
            [tag_normal = new Image(), ROOT_IMG + "inventory/upgrade/tag_normal" + EXT_PNG],
            [upgrade_fail = new Image(), ROOT_IMG + "inventory/upgrade/upgrade_fail" + EXT_PNG],
            [upgrade_success = new Image(), ROOT_IMG+ "inventory/upgrade/upgrade_success" + EXT_PNG],
            
            [loading_back = new Image(), ROOT_IMG + "inventory/loadingbar_back" + EXT_PNG],
            [loadingbar = [], HTool.getURLs(ROOT_IMG, "inventory/loadingbar_", EXT_PNG, 2)],
            [star = new Image(), ROOT_IMG + "etc/star" + EXT_PNG],
            [slot = new Image(), ROOT_IMG + "inventory/slot" + EXT_PNG]
        ];
        
        for (var i = 0; i < iconStr.length; i++) {
            imgParam.push([icon[i] = new Image(), ROOT_IMG + "inventory/upgrade/" + iconStr[i] + EXT_PNG]);
        }
        
        for (var i = 0; i < barStr.length; i++) {
            imgParam.push([bar_stone[i] = new Image(), ROOT_IMG + "inventory/upgrade/" + barStr[i] + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            wsNumFont = PlayResManager.getMoneyMap().get("wsNumFont");
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("HeroLevelUpPopup setResource Fail", this);
        });
    };
    
    INSTANCE.setHeroData = function(_data, _img) {
        heroData = _data;
        heroImg = _img;
        
        levelupAtk = heroData.getAttack() + Math.floor(heroData.getAttack() * heroData.getAttackInc() / 100);
        
        switch (heroData.getExp()) {
            case 1:
                priceGold = 5000;
                priceGem = 10;
                priceStone = 30;
                break;
            case 2:
                priceGold = 12500;
                priceGem = 25;
                priceStone = 90;
                break;
            case 3:
                priceGold = 31250;
                priceGem = 63;
                priceStone = 270;
                break;
            case 4:
                priceGold = 78125;
                priceGem = 156;
                priceStone = 810;
                break;
            case 5:
                priceGold = 195313;
                priceGem = 391;
                priceStone = 2430;
                break;
        }
    };
    
    INSTANCE.clear = function() {
        back = null;
        arrow_upgrade = null;
        bar_stone = null;

        btn_cancel_off = null;
        btn_cancel_on = null;
        btn_gem_off = null;
        btn_gem_on = null;
        btn_gold_off = null;
        btn_gold_on = null;
        btn_retry_off = null;
        btn_retry_on = null;;
        btn_upgrade_off = null;
        btn_upgrade_on = null;
        btn_ok_off = null;
        btn_ok_on = null;
        use_stone = null;

        effect_upgrade = null;
        icon = null;
        tag_att = null;
        tag_gem = null;
        tag_normal = null;
        upgrade_fail = null;
        upgrade_success = null;
        slot = null;
        
        wsNumFont = null;
        loading_back = null;
        loadingbar = null;
        star = null;
        heroData = null;
        heroImg = null;
    };

    var levelup = function() {
        
        if (isApply) return;
        isApply = true;
        isFail = false;
        
        if (levelupRate(heroData.getExp())) {
            PopupMgr.openPopup(POPUP.POP_WAITING);
            NetManager.Req_HeroLevelUp(heroData, 1, "GOLD", priceGold, stoneStr[heroData.getAttr()], priceStone, function(response) {
                if (NetManager.isSuccess(response)) {
                    QuestManager.questUpdt(4, function() {
                        focus = 0;
                        state = 3;
                        frameCnt = 0;
                        isApply = false;
                        PopupMgr.closePopup(POPUP.POP_WAITING);
                    });
                } else {
                    appMgr.openDisconnectPopup("Netmanager Fail", this);
                }
            });
        } else {
            PopupMgr.openPopup(POPUP.POP_WAITING);
            NetManager.Req_HeroLevelUp(heroData, 0, "GOLD", priceGold, stoneStr[heroData.getAttr()], priceStone, function(response) {
                if (NetManager.isSuccess(response)) {
                    QuestManager.questUpdt(4, function() {
                        focus = 0;
                        state = 3;
                        frameCnt = 0;
                        isApply = false;
                        isFail = true;
                        PopupMgr.closePopup(POPUP.POP_WAITING);
                    });
                } else {
                    appMgr.openDisconnectPopup("Netmanager Fail", this);
                }
            });
        }
    };
    
    var levelupGem = function() {
        
        if (isApply) return;
        isApply = true;
        PopupMgr.openPopup(POPUP.POP_WAITING);
        NetManager.Req_HeroLevelUp(heroData, 1, "GEM", priceGem, stoneStr[heroData.getAttr()], priceStone, function(response) {
            if (NetManager.isSuccess(response)) {
                QuestManager.questUpdt(4, function() {
                    focus = 0;
                    state = 4;
                    frameCnt = 0;
                    isApply = false;
                    PopupMgr.closePopup(POPUP.POP_WAITING);
                });
            } else {
                appMgr.openDisconnectPopup("Netmanager Fail", this);
            }
        });
    };
    
    var lackCheck = function(_code) {
        
        var str;
        var code = _code;
        var remainAmount;
        
        if (code == "GOLD") {
            remainAmount = ItemManager.checkPrice(code, priceGold);
            str = "골드가";
        } else if (code == "GEM") {
            remainAmount = ItemManager.checkPrice(code, priceGem);
            str = "보석이";
        }
        
        if (remainAmount < 0) {
            PopupMgr.openPopup(appMgr.getMessage2BtnPopup(str + " 부족합니다.|충전하러 이동 하시겠습니까?"), function (code, data) {
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
    
    var lackCheckStone = function(_code) {
        
        var str;
        var code = _code;
        var remainAmount;
        
        if (code == "RED_STONE") {
            remainAmount = ItemManager.checkPrice(code, priceStone);
            str = "레드스톤이";
        } else if (code == "BLUE_STONE") {
            remainAmount = ItemManager.checkPrice(code, priceStone);
            str = "블루스톤이";
        } else if (code == "BLACK_STONE") {
            remainAmount = ItemManager.checkPrice(code, priceStone);
            str = "블랙스톤이";
        }
        
        console.error("remainAmount >> " + remainAmount);
        
        if (remainAmount < 0) {
            PopupMgr.openPopup(appMgr.getMessage0BtnPopup(str + " 부족하여 강화 할수 없습니다."), null, 1500);
            return false;
        }
        
        return true;
    };
    
    var levelupRate = function(level) {
        var rate = Math.floor(Math.random() * 100);
        
        switch (level) {
            case 1:
                if (rate < 100) return true;
                break;
            case 2:
                if (rate < 40) return true;
                break;
            case 3:
                if (rate < 16) return true;
                break;
            case 4:
                if (rate < 6) return true;
                break;
            case 5:
                if (rate < 3) return true;
                break;
        }
        
        return false;
    };
    
    var levelupRender = function(g) {
        
        g.drawImage(back, 300, 118);

        g.drawImage(slot, 415, 215);
        g.drawImage(heroImg, 423, 222);
        for (var i = 0; i < heroData.getExp(); i++) {
            g.drawImage(star, 471 + (i * 18) - (heroData.getExp() * 9), 311);
        }
        g.drawImage(tag_att, 425, 353);
        g.setFont(FONT_22);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, heroData.getAttack(), 525, 372, HTextRender.RIGHT);

        
        g.drawImage(arrow_upgrade, 557, 227);
        
        
        g.drawImage(slot, 746, 215);
        g.drawImage(heroImg, 754, 220);
        
        for (var i = 0; i < (heroData.getExp() + 1); i++) {
            g.drawImage(star, 802 + (i * 18) - ((heroData.getExp() + 1) * 9), 311);
        }
        g.drawImage(tag_att, 756, 353);
        g.setFont(FONT_22);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, levelupAtk, 856, 372, HTextRender.RIGHT);

        
        g.drawImage(use_stone, 558, 219);
        
        g.drawImage(icon[heroData.getAttr()], 572, 252);
        g.setFont(FONT_28);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, priceStone, 666, 280, HTextRender.CENTER);
        
        
        
        g.setFont(FONT_22);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, "히어로를 강화하시겠습니까?", 640, 464, HTextRender.CENTER);

        
        
        g.drawImage(btn_gold_off, 401, 499);
        g.drawImage(btn_gem_off, 561, 499);
        g.drawImage(btn_cancel_off, 721, 499);
        
        
        
        g.setFont(FONT_26);
        g.setColor(COLOR_YELLOW);
        
        switch (focus) {
            case 0:
                g.drawImage(btn_gold_on, 401, 499);
                
                switch (heroData.getExp()) {
                    case 1:
                        HTextRender.oriRender(g, "강화확률 100%", 638, 356, HTextRender.CENTER);
                        break;
                    case 2:
                        HTextRender.oriRender(g, "강화확률 40%", 638, 356, HTextRender.CENTER);
                        break;
                    case 3:
                        HTextRender.oriRender(g, "강화확률 16%", 638, 356, HTextRender.CENTER);
                        break;
                    case 4:
                        HTextRender.oriRender(g, "강화확률 6%", 638, 356, HTextRender.CENTER);
                        break;
                    case 5:
                        HTextRender.oriRender(g, "강화확률 3%", 638, 356, HTextRender.CENTER);
                        break;
                }
                break;
            case 1:
                g.drawImage(btn_gem_on, 561, 499);
                HTextRender.oriRender(g, "강화확률 100%", 638, 356, HTextRender.CENTER);
                break;
            case 2:
                g.drawImage(btn_cancel_on, 721, 499);
                
                switch (heroData.getExp()) {
                    case 1:
                        HTextRender.oriRender(g, "강화확률 100%", 638, 356, HTextRender.CENTER);
                        break;
                    case 2:
                        HTextRender.oriRender(g, "강화확률 40%", 638, 356, HTextRender.CENTER);
                        break;
                    case 3:
                        HTextRender.oriRender(g, "강화확률 16%", 638, 356, HTextRender.CENTER);
                        break;
                    case 4:
                        HTextRender.oriRender(g, "강화확률 6%", 638, 356, HTextRender.CENTER);
                        break;
                    case 5:
                        HTextRender.oriRender(g, "강화확률 3%", 638, 356, HTextRender.CENTER);
                        break;
                }
                break;
        }
        
        g.drawImage(tag_normal, 434, 551);
        g.drawImage(tag_gem, 594, 551);
        
        
        g.setFont(FONT_24);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, priceGold, 499, 539, HTextRender.CENTER);
        HTextRender.oriRender(g, priceGem, 659, 539, HTextRender.CENTER);
        
        
//        for (var i = 0; i < bar_stone.length; i++) {
//            g.drawImage(bar_stone[i], 443 + (i * 135), 646);
//        }
//        g.setFont(FONT_20);
//        g.setColor(COLOR_WHITE);
//        HTextRender.oriRender(g, itemMgr.getRedStoneAmount(), 525, 672, HTextRender.CENTER);
//        HTextRender.oriRender(g, itemMgr.getBlueStoneAmount(), 660, 672, HTextRender.CENTER);
//        HTextRender.oriRender(g, itemMgr.getBlackStoneAmount(), 794, 672, HTextRender.CENTER);
        uiDrawMgr.renderMoney(g);
    };
    
    var levelupSuccess = function(g) {
        
        g.save();
        g.transform(1, 0.5, -0.5, 1, 640, 285);
//        g.translate(477, 210);
        g.rotate(frameCnt * Math.PI / 180);
        g.drawImage(effect_upgrade[heroData.getGrade()], -Math.floor(effect_upgrade[1].width / 2), -Math.floor(effect_upgrade[1].height / 2));
        g.restore();
        
        g.drawImage(upgrade_success, 505, 96);
        g.drawImage(slot, 581, 226);
        g.drawImage(heroImg, 589, 233);
        g.drawImage(tag_att, 591, 364);
        
        for (var i = 0; i < heroData.getExp() + 1; i++) {
            g.drawImage(star, 637 + (i * 18) - ((heroData.getExp() + 1) * 9), 321);
        }
        
        g.setFont(FONT_22);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, levelupAtk, 691, 383, HTextRender.RIGHT);
        HTextRender.oriRender(g, "강화에 성공하였습니다.", 640, 471, HTextRender.CENTER);
        
        g.drawImage(btn_ok_on, 561, 544);
    };
    
    var levelupFail = function(g) {
        
        g.drawImage(upgrade_fail, 505, 96);
        g.drawImage(slot, 581, 226);
        g.drawImage(heroImg, 589, 233);
        g.drawImage(tag_att, 591, 364);
        
        for (var i = 0; i < heroData.getExp(); i++) {
            g.drawImage(star, 637 + (i * 18) - ((heroData.getExp()) * 9), 321);
        }
        
        g.setFont(FONT_22);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, heroData.getAttack(), 691, 383, HTextRender.RIGHT);
        HTextRender.oriRender(g, "강화에 실패하였습니다.", 640, 455, HTextRender.CENTER);
        HTextRender.oriRender(g, "다시 도전하시겠습니까?", 640, 487, HTextRender.CENTER);
        
        g.drawImage(btn_retry_off, 481, 544);
        g.drawImage(btn_cancel_off, 641, 544);
        
        if (focus == 0) {
            g.drawImage(btn_retry_on, 481, 544);
        } else if (focus == 1) {
            g.drawImage(btn_cancel_on, 641, 544);
        }
    };
    
    var levelupLoading = function(g) {
        g.drawImage(loading_back, 395, 339);
        g.drawImage(loadingbar[0], 402, 346, frameCnt, 29);
    };
    
    var levelupEnterKeyAction = function(_focus) {
        switch (_focus) {
            case 0:
                if (lackCheck("GOLD") && lackCheckStone(stoneStr[heroData.getAttr()])) {
                    levelup();
                }
                break;
                
            case 1:
                if (lackCheck("GEM") && lackCheckStone(stoneStr[heroData.getAttr()])) {
                    levelupGem();
                }
                break;
                
            case 2:
                PopupMgr.closePopup(POPUP.POP_HEROLEVELUP);
                break;
        }
    };
    
    var levelupSuccessEnterKeyAction = function(_focus) {
        if (listener) listener(INSTANCE, focus + "");
    };
    
    var levelupFailEnterKeyAction = function(_focus) {
        switch (_focus) {
            case 0:
                state = 0;
                focus = 0;
                break;
                
            case 1:
                PopupMgr.closePopup(POPUP.POP_HEROLEVELUP);
                break;
        }
    };
    
    return {
        toString: function() {
            return "HeroLevelUpPopup";
        },
        init: function(onload, callback) {
            frameCnt = 0;
            focus = 0;
            state = 0;
            isFail = false;
            isApply = false;
            listener = callback;
            onload();
        },
        start: function() {

        },
        run: function() {
            
            if (state == 3) {
                frameCnt += 45;
                if (frameCnt >= 450) {
                    frameCnt = 456;
                    if (isFail) {
                        state = 2;
                        appMgr.stopSound();
                        appMgr.playNetSound(ROOT_SOUND + "upgradeFail" + EXT_SOUND);
                    } else {
                        state = 1;
                        appMgr.stopSound();
                        appMgr.playNetSound(ROOT_SOUND + "upgradeSuccess" + EXT_SOUND);
                    }
                }
            } else if (state == 4) {
                frameCnt += 45;
                if (frameCnt >= 450) {
                    frameCnt = 456;
                    state = 1;
                    appMgr.stopSound();
                    appMgr.playNetSound(ROOT_SOUND + "upgradeSuccess" + EXT_SOUND);
                }
            } else {
                frameCnt++;
            }
            
            UIMgr.repaint();
        },
        paint: function() {
            
            switch (state) {
                case 0:
                    levelupRender(g);
                    break;
                case 1:
                    levelupSuccess(g);
                    break;
                case 2:
                    levelupFail(g);
                    break;
                case 3:
                case 4:
                    levelupLoading(g);
                    break;
            }
        },
        stop: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    switch (state) {
                        case 0:
                            levelupEnterKeyAction(focus);
                            break;
                        case 1:
                            levelupSuccessEnterKeyAction(focus);
                            break;
                        case 2:
                            levelupFailEnterKeyAction(focus);
                            break;
                    }
                    break;
                case KEY_LEFT:
                    switch (state) {
                        case 0:
                            focus = HTool.getIndex(focus, -1, 3);
                            break;
                        case 1:
                            break;
                        case 2:
                            focus = HTool.getIndex(focus, -1, 2);
                            break;
                    }
                    break;
                case KEY_RIGHT:
                    switch (state) {
                        case 0:
                            focus = HTool.getIndex(focus, 1, 3);
                            break;
                        case 1:
                            break;
                        case 2:
                            focus = HTool.getIndex(focus, 1, 2);
                            break;
                    }
                    break;
                case KEY_PREV:
                case KEY_PC_F4:
                    levelupSuccessEnterKeyAction(focus);
//                    PopupMgr.closePopup(POPUP.POP_HEROLEVELUP);
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