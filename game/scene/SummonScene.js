// Strict Mode On (엄격모드)
"use strict";
"use warning";

var SummonScene = new function() {
	var INSTANCE = this;

    var frameCnt;
    
    var isResult;
    var focusX;
    var focusY;
    var resultFocusX;
    var summonType;
    
    var iframe;
    var title;
    
    var bar_summonstone_normal;
    var bar_summonstone_special;
    var btn_hero_off;
    var btn_hero_on;
    var btn_ok_off;
    var btn_ok_on;
    var btn_retry_off;
    var btn_retry_on;
    var btn_summon_off;
    var btn_summon_on;
    var list_box;
    var name_normal;
    var name_special;
    var summonstone_normal;
    var summonstone_special;
    var summonstone_normal_s;
    var summonstone_special_s;
    var effect = [];
    var effect_test = [];
    
    var star;
    
    var btn_off;
    var btn_on;
    var btn_str = ["btn_back_", "btn_hero_", "btn_shop_", "btn_battle_", "btn_summon_chance_"];
    
    var idx;
    var grade;
    
    var unitJson;
    var heroImg;
    var heroName;
    var heroGrade;
    var lvIconArr = [];
    
    var isEffect;
    var effectCnt = [0, 0, 0, 0, 0];
    var effectMove = [10, 10, 10, 10, 10];
    
    var isKeyLock = false;
    
    this.load = function(onload) {
        unitJson = HeroManager.getAllHeroInfo();
        
        heroName = [];
        heroGrade = [];
        
        for (var i = 0; i < unitJson.length; i++) {
            var obj = unitJson[i];
            heroName[i] = obj.name;
            heroGrade[i] = obj.grade;
        }
        
        setResource(onload);
    };
    
    var setResource = function(onload) {
        
        effect = [];
        effect_test = [];
        btn_off = [];
        btn_on = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [bar_summonstone_normal = new Image(), ROOT_IMG + "summon/bar_summonstone_normal" + EXT_PNG],
            [bar_summonstone_special = new Image(), ROOT_IMG + "summon/bar_summonstone_special" + EXT_PNG],
            [btn_hero_off = new Image(), ROOT_IMG + "summon/btn_hero_off" + EXT_PNG],
            [btn_hero_on = new Image(), ROOT_IMG + "summon/btn_hero_on" + EXT_PNG],
            [btn_ok_off = new Image(), ROOT_IMG + "summon/btn_ok_off" + EXT_PNG],
            [btn_ok_on = new Image(), ROOT_IMG + "summon/btn_ok_on" + EXT_PNG],
            [btn_retry_off = new Image(), ROOT_IMG + "summon/btn_retry_off" + EXT_PNG],
            [btn_retry_on = new Image(), ROOT_IMG + "summon/btn_retry_on" + EXT_PNG],
            [btn_summon_off = new Image(), ROOT_IMG + "summon/btn_summon_off" + EXT_PNG],
            [btn_summon_on = new Image(), ROOT_IMG + "summon/btn_summon_on" + EXT_PNG],
            [btn_summon_off = new Image(), ROOT_IMG + "summon/btn_summon_off" + EXT_PNG],
            [btn_summon_on = new Image(), ROOT_IMG + "summon/btn_summon_on" + EXT_PNG],
            [list_box = new Image(), ROOT_IMG + "summon/list_box" + EXT_PNG],
            [name_normal = new Image(), ROOT_IMG + "summon/name_normal" + EXT_PNG],
            [name_special = new Image(), ROOT_IMG + "summon/name_special" + EXT_PNG],
            [summonstone_normal = new Image(), ROOT_IMG + "summon/summonstone_normal" + EXT_PNG],
            [summonstone_special = new Image(), ROOT_IMG + "summon/summonstone_special" + EXT_PNG],
            [summonstone_normal_s = new Image(), ROOT_IMG + "summon/summonstone_normal_s" + EXT_PNG],
            [summonstone_special_s = new Image(), ROOT_IMG + "summon/summonstone_special_s" + EXT_PNG],
            [effect = [], HTool.getURLs(ROOT_IMG, "summon/effect_", EXT_PNG, 4)],
            [effect_test = [], HTool.getURLs(ROOT_IMG, "summon/effect_test_", EXT_PNG, 5)],
            [title = new Image(), ROOT_IMG + "etc/title_summon" + EXT_PNG],
            [star = new Image(), ROOT_IMG + "etc/star" + EXT_PNG]
        ];
        
        for (var i = 0; i < btn_str.length; i++) {
            imgParam.push([btn_off[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "off" + EXT_PNG]);
            imgParam.push([btn_on[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "on" + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            
            lvIconArr = [];
            for (var i = 0; i < 4; i++) {
                lvIconArr[i] = PlayResManager.getIconMap().get("lv_icon_" + i);
            }
            
            onload();
        }, function(err) {
            appMgr.openDisconnectPopup("SummonScene setResource Fail!!", this); 
            onload();
        });
    };
    
    var summon = function(code) {
        isResult = false;
        appMgr.stopSound();
        PopupMgr.openPopup(POPUP.POP_WAITING);
        NetManager.Req_ItemPurchase(code, 0, function(response) {
            PopupMgr.closeAllPopup();
            if (NetManager.isSuccess(response)) {
                QuestManager.questUpdt(1, function() {
                    var reward = [];
                    reward[0] = NetManager.getResult(response, 0)["rewardContents"];
                    effectCnt[0] = 0;
                    onPicked(reward);
                });
            } else {
                appMgr.openDisconnectPopup("Netmanager Fail", this);
            }
        });
    };
        
    var summon5 = function(code) {
        isResult = false;
        appMgr.stopSound();
        PopupMgr.openPopup(POPUP.POP_WAITING);
        NetManager.Req_ItemPurchase5(code, 0, function(response) {
            PopupMgr.closeAllPopup();
            if (NetManager.isSuccess(response)) {
                QuestManager.questUpdts(1, 3, function() {
                    var reward = [];
                    for (var i = 0; i < 5; i++) {
                        reward[i] = NetManager.getResult(response, i)["rewardContents"];
                        effectCnt[i] = 0;
                    }
                    onPicked(reward);
                });
            } else {
                appMgr.openDisconnectPopup("Netmanager Fail", this);
            }
        });
    };

    var lack = function(code, price) {
        var str;
        if (code == "MAGIC_STONE") {
            str = "소환석";
        } else if (code == "HYPER_STONE") {
            str = "소환석";
        }

        var remainAmount = ItemManager.checkPrice(code, price);
        if (remainAmount < 0) {
            PopupMgr.openPopup(appMgr.getMessage2BtnPopup(str + "이 부족합니다.|상점으로 이동하여 " + str + "을 충전하시겠습니까?"), function (code, data) {
                if (data == ("0")) {
                    isKeyLock = false;
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    appMgr.changeLayer(SCENE.SC_SHOP, false, "shop");
                } else {
                    isKeyLock = false;
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                }
            });
            return false;
        }

        return true;
    };
    
    var setReward = function (reward) {
        var imgParam = [];
        
        idx = [];
        grade = [];
        heroImg = [];
        
        for (var i = 0; i < reward.length; i++) {
            idx[i] = parseInt(reward[i][0].code.split('_')[1]);
            grade[i] = reward[i][0].lev;
            imgParam.push([heroImg[i] = new Image(), ROOT_IMG + "game/myUnit/thumbnail/hero_" + idx[i] + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function () {
            imgParam = null;
            isEffect = true;
            resultFocusX = 0;
        }, function (err) {
            appManager.openDisconnectPopup("setReward fail!! -> " + err, INSTANCE);
        });
    };

    var onPicked = function (reward) {
        var rewardList = reward;
        setReward(rewardList);
    };
    
	return {
		toString: function() {
			return "SummonScene";
		},
		init: function(onload) {
            isResult = false;
            isEffect = false;
            isKeyLock = false;
            frameCnt = 0;
            
            for (var i = 0; i < 5; i++) {
                effectCnt[i] = 0;
            }
            
            focusX = 0;
            focusY = 0;
            resultFocusX = 0;
            summonType = 0;
            onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
        },
		run: function() {
            frameCnt++;
            UIMgr.repaint();
            
            if (isEffect) {
                
                if (summonType == 0 || summonType == 2) {
                    
                    if (effectCnt[0] == 24) {
                        appMgr.playNetSound(ROOT_SOUND + "get_card" + EXT_SOUND);
                    }
                    
                    if (effectCnt[0] < 25) {
                        if (effectCnt[0] < 20) {
                            if (effectCnt[0] % 2 == 0) {
                                effectMove[0] -= 10;
                            } else {
                                effectMove[0] += 10;
                            }
                        }
                        effectCnt[0]++;
                    } else if (effectCnt[0] == 25) {
                        isResult = true;
                        isEffect = false;
                        isKeyLock = false;
                    }
                } else {
                    if (effectCnt[0] == 24) {
                        appMgr.playNetSound(ROOT_SOUND + "get_card" + EXT_SOUND);
                    }
                    
                    if (effectCnt[1] == 24) {
                        appMgr.playNetSound(ROOT_SOUND + "get_card" + EXT_SOUND);
                    }
                    
                    if (effectCnt[2] == 24) {
                        appMgr.playNetSound(ROOT_SOUND + "get_card" + EXT_SOUND);
                    }
                    
                    if (effectCnt[3] == 24) {
                        appMgr.playNetSound(ROOT_SOUND + "get_card" + EXT_SOUND);
                    }
                    
                    if (effectCnt[4] == 24) {
                        appMgr.playNetSound(ROOT_SOUND + "get_card" + EXT_SOUND);
                    }
                    
                    if (effectCnt[0] < 25) {
                        if (effectCnt[0] < 20) {
                            if (effectCnt[0] % 2 == 0) {
                                effectMove[0] -= 10;
                            } else {
                                effectMove[0] += 10;
                            }
                        }
                        effectCnt[0]++;
                    } else if (effectCnt[1] < 25) {
                        if (effectCnt[1] < 20) {
                            if (effectCnt[1] % 2 == 0) {
                                effectMove[1] -= 10;
                            } else {
                                effectMove[1] += 10;
                            }
                        }
                        effectCnt[1]++;
                    } else if (effectCnt[2] < 25) {
                        if (effectCnt[2] < 20) {
                            if (effectCnt[2] % 2 == 0) {
                                effectMove[2] -= 10;
                            } else {
                                effectMove[2] += 10;
                            }
                        }
                        effectCnt[2]++;
                    } else if (effectCnt[3] < 25) {
                        if (effectCnt[3] < 20) {
                            if (effectCnt[3] % 2 == 0) {
                                effectMove[3] -= 10;
                            } else {
                                effectMove[3] += 10;
                            }
                        }
                        effectCnt[3]++;
                    } else if (effectCnt[4] < 25) {
                        if (effectCnt[4] < 20) {
                            if (effectCnt[4] % 2 == 0) {
                                effectMove[4] -= 10;
                            } else {
                                effectMove[4] += 10;
                            }
                        }
                        effectCnt[4]++;
                    } else if (effectCnt[4] == 25) {
                        isEffect = false;
                        isResult = true;
                        isKeyLock = false;
                    }
                }
            }
		},
		paint: function() {
            g.drawImage(iframe, 0, 0);
            g.drawImage(title, 0, 0);
            
            g.setFont(FONT_24);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, "전설 등급 히어로는 고급소환으로 획득 할 수 있습니다.", 640, 133, HTextRender.CENTER);

            for (var i = 0; i < 4; i++) {
                g.drawImage(list_box, 164 + (i * 238), 152);
                g.drawImage(btn_summon_off, 204 + (i * 238), 484);
            }
            
            for (var i = 0; i < btn_str.length; i++) {
                g.drawImage(btn_off[i], 45 + (i * 119), 573);
            }
            
            for (var i = 0; i < 2; i++) {
                g.drawImage(name_normal, 255 + (i * 238), 173);
                g.drawImage(name_special, 731 + (i * 238), 173);
                
                g.setFont(FONT_30);
                HTextRender.oriRender(g, 1, 283 + (i * 476), 369, HTextRender.CENTER);
                HTextRender.oriRender(g, 5, 521 + (i * 476), 369, HTextRender.CENTER);
                
                g.setFont(FONT_20);
                HTextRender.oriRender(g, "일반~영웅 등급", 282 + (i * 238), 450, HTextRender.CENTER);
                HTextRender.oriRender(g, "희귀~전설 등급", 758 + (i * 238), 450, HTextRender.CENTER);
                
                g.drawImage(summonstone_normal, 246 + (i * 238), 244);
                g.drawImage(summonstone_special, 722 + (i * 238), 244);
            }
            
            if (summonType == 0 || summonType == 2) {
                if (isEffect) {
                    g.setColor(COLOR_POPUPBACK);
                    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                    
                    if (effectCnt[0] < 25) {
                        if (summonType == 0) {
                            g.drawImage(summonstone_normal, 600 + effectMove[0], 220);
                        } else {
                            g.drawImage(summonstone_special, 600 + effectMove[0], 220);
                        }
                    }
                    
                    if (effectCnt[0] > 19 && effectCnt[0] < 25) {
                        g.drawImage(effect_test[effectCnt[0] - 20], 342, -42);
                    }
                }
            } else {
                if (isEffect) {
                    
                    g.setColor(COLOR_POPUPBACK);
                    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                    
                    for (var i = 0; i < 5; i++) {
                        
                        if (effectCnt[i] < 25) {
                            if (summonType == 1) {
                                g.drawImage(summonstone_normal, 100 + (i * 252) + effectMove[i], 230);
                            } else {
                                g.drawImage(summonstone_special, 100 + (i * 252) + effectMove[i], 230);
                            }
                        }
                        
                        if (effectCnt[i] > 19 && effectCnt[i] < 25) {
                            g.drawImage(effect_test[effectCnt[i] - 20], -162 + (i * 252), -32);
                        }
                        
                        if (effectCnt[i] == 25) {
                            g.save();
                            g.transform(1, 0.5, -0.5, 1, 140 + ( i * 250), 280);
//                            g.translate(110 + (i * 187), 210);
                            g.rotate(frameCnt * Math.PI / 180);
                            g.drawImage(effect[heroGrade[idx[i]]], -Math.floor(effect[1].width / 2), -Math.floor(effect[1].height / 2));
                            g.restore();

                            g.drawImage(heroImg[i], 45 + (i * 250), 138);
                            g.drawImage(star, 160 + (i * 250), 403);
                            g.drawImage(lvIconArr[heroGrade[idx[i]]], 28 + (i * 250), 394);
                            g.setFont(FONT_22);
                            g.setColor(COLOR_WHITE);
                            HTextRender.oriRender(g, heroName[idx[i]], 172 + (i * 250), 455, HTextRender.CENTER);
                        }
                    }
                }
            }
            
            if (isResult) {
                g.setColor(COLOR_POPUPBACK);
                g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                
                if (summonType == 0 || summonType == 2) {
                    
                    
                    g.save();
                    
                    g.transform(1, 0.5, -0.5, 1, 640, 280);
                    
//                    g.translate(477, 210);
                    g.rotate(frameCnt * Math.PI / 180);
                    g.drawImage(effect[heroGrade[idx[0]]], -Math.floor(effect[1].width / 2), -Math.floor(effect[1].height / 2));
//                    g.drawImage(effect[1], -Math.floor(effect[1].width / 2), -Math.floor(effect[1].height / 2));
                    g.restore();
                    
                    
                    g.drawImage(heroImg[0], 545, 138);
                    g.drawImage(star, 660, 403);
                    g.drawImage(lvIconArr[heroGrade[idx[0]]], 528, 394);
                    g.setFont(FONT_22);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, heroName[idx[0]], 672, 455, HTextRender.CENTER);
                    
                } else {
                    
                    for (var i = 0; i < heroImg.length; i++) {
                        
                        g.save();
                        g.transform(1, 0.5, -0.5, 1, 140 + ( i * 250), 280);
//                        g.translate(110 + (i * 187), 210);
                        g.rotate(frameCnt * Math.PI / 180);
                        g.drawImage(effect[heroGrade[idx[i]]], -Math.floor(effect[1].width / 2), -Math.floor(effect[1].height / 2));
//                        g.drawImage(effect[1], -Math.floor(effect[1].width / 2), -Math.floor(effect[1].height / 2));
                        g.restore();
                        
                        g.drawImage(heroImg[i], 45 + (i * 250), 138);
                        g.drawImage(star, 160 + (i * 250), 403);
                        g.drawImage(lvIconArr[heroGrade[idx[i]]], 28 + (i * 250), 394);
                        g.setFont(FONT_22);
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, heroName[idx[i]], 172 + (i * 250), 455, HTextRender.CENTER);
                    }
                }
                
                g.drawImage(btn_retry_off, 401, 499);
                g.drawImage(btn_hero_off, 561, 499);
                g.drawImage(btn_ok_off, 721, 499);

                switch (resultFocusX) {
                    case 0:
                        g.drawImage(btn_retry_on, 401, 499);
                        break;

                    case 1:
                        g.drawImage(btn_hero_on, 561, 499);
                        break;

                    case 2:
                        g.drawImage(btn_ok_on, 721, 499);
                        break;
                }
                
                switch (summonType) {
                    case 0:
                        g.drawImage(summonstone_normal_s, 417, 512);
                        g.setFont(FONT_29);
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, 1, 450, 548, HTextRender.CENTER);
                        break;
                        
                    case 1:
                        g.drawImage(summonstone_normal_s, 417, 512);
                        g.setFont(FONT_29);
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, 5, 450, 548, HTextRender.CENTER);
                        break;
                        
                    case 2:
                        g.drawImage(summonstone_special_s, 417, 512);
                        g.setFont(FONT_29);
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, 1, 450, 548, HTextRender.CENTER);
                        break;
                        
                    case 3:
                        g.drawImage(summonstone_special_s, 417, 512);
                        g.setFont(FONT_29);
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, 5, 450, 548, HTextRender.CENTER);
                        break;
                }
                
            } 
            
            if (!isResult && !isEffect) {
                if (focusY == 0) {
                    g.drawImage(btn_summon_on, 204 + (focusX * 238), 484);
                } else {
                    g.drawImage(btn_on[focusX], 45 + (focusX * 119), 573);
                }
            }
            
            g.drawImage(bar_summonstone_normal, 929, 585);
            g.drawImage(bar_summonstone_special, 1071, 585);
            g.setFont(FONT_20);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, itemMgr.getMagicStoneAmount(), 1019, 642, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getHyperStoneAmount(), 1161, 642, HTextRender.CENTER);
            
            uiDrawMgr.renderMoney(g);
		},
		stop: function() {
            heroImg = null;
            iframe = null;
            title = null;
            bar_summonstone_normal = null;
            bar_summonstone_special = null;
            btn_hero_off = null;
            btn_hero_on = null;
            btn_ok_off = null;
            btn_ok_on = null;
            btn_summon_off = null;
            btn_summon_on = null;
            btn_retry_off = null;
            btn_retry_on = null;
            list_box = null;
            name_normal = null;
            name_special = null;
            summonstone_normal = null;
            summonstone_special = null;
            summonstone_normal_s = null;
            summonstone_special_s = null;
            effect = null;
            effect_test = null;
            btn_off = null;
            btn_on = null;
            star = null;
		},
		dispose: function() {
            btn_str = null;
		},
		onKeyPressed: function(key) {
            
            if(isKeyLock) return;
            if (isEffect) return;
            
            switch(key) {
                case KEY_LEFT:
                    if (isResult) {
                        resultFocusX = HTool.getIndex(resultFocusX, -1, 3);
                    } else {
                        if (focusY == 0) {
                            focusX = HTool.getIndex(focusX, -1, 4);
                        } else {
                            focusX = HTool.getIndex(focusX, -1, 5);
                        }
                    }
                    break;
                case KEY_RIGHT:
                    if (isResult) {
                        resultFocusX = HTool.getIndex(resultFocusX, 1, 3);
                    } else {
                        if (focusY == 0) {
                            focusX = HTool.getIndex(focusX, 1, 4);
                        } else {
                            focusX = HTool.getIndex(focusX, 1, 5);
                        }
                    }
                    break;
                case KEY_UP:
                    if (isResult) return;
                    focusY = HTool.getIndex(focusY, -1, 2);
                    focusX = 0;
                    break;
                case KEY_DOWN:
                    if (isResult) return;
                    focusY = HTool.getIndex(focusY, 1, 2);
                    focusX = 0;
                    break;
                case KEY_ENTER:
                    if (isResult) {
                        switch (resultFocusX) {
                            case 0:
                                isResult = false;
                                
                                var amount = 0;
                                if (focusX == 0 || focusX == 2) {
                                    amount = 1;
                                } else if (focusX == 1 || focusX == 3) {
                                    amount = 5;
                                }
                                
                                if (HeroManager.hasHeroRimitCheck(amount)) {
                                    PopupMgr.openPopup(appMgr.getMessage2BtnPopup("인벤토리가 부족하여 더 이상 소환할 수 없습니다.|히어로 메뉴에서 히어로를 판매 후 다시 소환해 주세요.", "btn_hero_"), function (code, data) {
                                        if (data == ("0")) {
                                            PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                            appMgr.changeLayer(SCENE.SC_INVEN, false, "shop");
                                        } else {
                                            PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                        }
                                    });
                                } else {
                                    
                                    isKeyLock = true;
                                    
                                    switch (summonType) {
                                        case 0:
                                            if (lack("MAGIC_STONE", 1)) {
                                                summon("MAGIC_STONEPICK");
                                            }
                                            break;

                                        case 1:
                                            if (lack("MAGIC_STONE", 5)) {
                                                summon5("MAGIC_STONEPICK");
                                            }
                                            break;

                                        case 2:
                                            if (lack("HYPER_STONE", 1)) {
                                                console.error("isKeyLock >> " + isKeyLock);
                                                summon("HYPER_STONEPICK");
                                            }
                                            break;

                                        case 3:
                                            if (lack("HYPER_STONE", 5)) {
                                                console.error("isKeyLock >> " + isKeyLock);
                                                summon5("HYPER_STONEPICK");
                                            }
                                            break;
                                    }
                                }
                                break;
                                
                            case 1:
                                appMgr.changeLayer(SCENE.SC_INVEN, false, "monster_list");
                                break;
                                
                            case 2:
                                appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
                                isResult = false;
                                break;
                        }
                    } else {
                        if (focusY == 0) {
                            isResult = false;
                            
                            var amount = 0;
                            if (focusX == 0 || focusX == 2) {
                                amount = 1;
                            } else if (focusX == 1 || focusX == 3) {
                                amount = 5;
                            }
                            
                            if (HeroManager.hasHeroRimitCheck(amount)) {
                                PopupMgr.openPopup(appMgr.getMessage2BtnPopup("인벤토리가 부족하여 더 이상 소환할 수 없습니다.|히어로 메뉴에서 히어로를 판매 후 다시 소환해 주세요.", "btn_hero_"), function (code, data) {
                                    if (data == ("0")) {
                                        PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                        appMgr.changeLayer(SCENE.SC_INVEN, false, "shop");
                                    } else {
                                        PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                    }
                                });
                            } else {
                                
                                isKeyLock = true;
                                summonType = focusX;
                                switch (focusX) {
                                    case 0:
                                        if (lack("MAGIC_STONE", 1)) {
                                            summon("MAGIC_STONEPICK");
                                        }
                                        break;

                                    case 1:
                                        if (lack("MAGIC_STONE", 5)) {
                                            summon5("MAGIC_STONEPICK");
                                        }
                                        break;

                                    case 2:
                                        if (lack("HYPER_STONE", 1)) {
                                            console.error("isKeyLock >> " + isKeyLock);
                                            summon("HYPER_STONEPICK");
                                        }
                                        break;

                                    case 3:
                                        if (lack("HYPER_STONE", 5)) {
                                            console.error("isKeyLock >> " + isKeyLock);
                                            summon5("HYPER_STONEPICK");
                                        }
                                        break;
                                }
                            }
                            
                        } else if (focusY == 1) {
                            
                            switch (focusX) {
                                case 0:
                                    appMgr.changeLayer(SCENE.SC_TITLE, false, "main");  
                                    break;

                                case 1:
                                    appMgr.changeLayer(SCENE.SC_INVEN, false, "main");  
                                    break;

                                case 2:
                                    appMgr.changeLayer(SCENE.SC_SHOP, false, "main");  
                                    break;

                                case 3:
                                    appMgr.changeLayer(SCENE.SC_WORLD, false, "main");  
                                    break;

                                case 4:
                                    PopupMgr.openPopup(POPUP.POP_SUMMONCHANCE);
                                    break;
                            }
                        }
                    }
                    break;
                case KEY_PREV:
                case KEY_PC_F4:
                    if (isResult) {
                        isResult = false;
                    } else {
                        appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
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