// Strict Mode On (엄격모드)
"use strict";
"use warning";

var ReadyScene = new function() {
	var INSTANCE = this;

	var iframe;
    var myUnitIconImg;
    var focusImg;
    var unitInfo;
    
    var info_back;
    var hero_thumbnail;
    var page_long;
    var slot;
    var slot_set;
    var lvIconArr;
    var plus;
    var info_empty;
    
    var btn_off;
    var btn_on;
    var title;
    var skill;
    var skill_off;
    var myUnit = [];
    var pNumFont;
    var wNumFont;
    var selectBox;
    var type_s_Img;
    var star;
    var deploy;
    
    var page = 0;
    var maxPage = 0;
    var focus;
    var focusX, focusY;
    var frameCnt;
    
    var str;
    var isMenu;
    var isCheckMenu;
    
    var btn_str = ["btn_back_", "btn_hero_", "btn_summon_", "btn_battlestart_"];
    var skillName;
    var unitTypeStr = ["근거리", "원거리"];
    var unitAttrStr = ["무속성", "물리속성", "마법속성"];
    
    var unitSkillStr = ["스킬 없음", "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 단일 개체의 적에게|매초당 공격력의 20%의 피해를 입힌다.",
                        "몬스터를 공격하여 단일 개체의 적의|이동속도를 5초간 10% 감소 시킨다.", "몬스터를 공격하여 다수의 적에게|공격력의 50%의 피해를 입힌다.",
                       "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 다수의 적에게|매 초당 공격력의 35%의 피해를 입힌다.", "몬스터를 공격하여 다수의 적의|이동속도를 5초간 20% 감소 시킨다."];
    
    this.load = function(onload) {
        page = 0;
        maxPage = 0;
      
        var loadCnt = 0;
        var checkOnload = function() {
            loadCnt++;
            if (loadCnt == 3) {
                onload();
            }
        };
        
        setResource(checkOnload);
        
        if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
            UnitManager.setStage(checkOnload);
        } else if (GameEngine.getGameMode() == GAME_MODE_RAID) {
            UnitManager.setRaid(checkOnload);
        }
        
        POPUP.POP_SKILLPURCHASE.getInstance().setResource(checkOnload);
    };
    
    var setResource = function(onload) {
        
        myUnitIconImg = [];
        focusImg = [];
        type_s_Img = [];
        
        hero_thumbnail = [];
        btn_off = [];
        btn_on = [];
        skill = [];
        skill_off = [];    
    
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [focusImg = [], HTool.getURLs(ROOT_IMG, "inventory/focus_slot_", EXT_PNG, 4)],
            [star = new Image(), ROOT_IMG + "etc/star" + EXT_PNG],
            [selectBox = new Image(), ROOT_IMG + "waitroom/select_box" + EXT_PNG],
            [deploy = new Image(), ROOT_IMG + "waitroom/deploy" + EXT_PNG],
            [title = new Image(), ROOT_IMG + "etc/title_battle" + EXT_PNG],
            [info_back = new Image(), ROOT_IMG + "inventory/info_back" + EXT_PNG],
            [page_long = new Image(), ROOT_IMG + "inventory/bar_page_long" + EXT_PNG],
            [slot = new Image(), ROOT_IMG + "inventory/slot" + EXT_PNG],
            [slot_set = new Image(), ROOT_IMG + "waitroom/slot_set" + EXT_PNG],
            [plus = new Image(), ROOT_IMG + "waitroom/plus" + EXT_PNG],
            [skill = [], HTool.getURLs(ROOT_IMG, "waitroom/skill_", EXT_PNG, 3)],
            [skill_off = [], HTool.getURLs(ROOT_IMG, "waitroom/skill_", "_off" + EXT_PNG, 3)],
            [info_empty = new Image(), ROOT_IMG + "etc/info_empty" + EXT_PNG]
        ];
        
        for (var i = 0; i < btn_str.length; i++) {
            imgParam.push([btn_off[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "off" + EXT_PNG]);
            imgParam.push([btn_on[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "on" + EXT_PNG]);
        }
        
        var allHeroInfo = HeroManager.getAllHeroInfo();
        for (var i = 0; i < allHeroInfo.length; i++) {
            var res = allHeroInfo[i].res.split("_")[1];
            imgParam.push([hero_thumbnail[i] = new Image(), ROOT_IMG + "game/myUnit/thumbnail/hero_" + res + EXT_PNG]);
            imgParam.push([myUnitIconImg[i] = new Image(), ROOT_IMG + "game/myUnit/thumbnail_icon/hero_" + res + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            pNumFont = PlayResManager.getMoneyMap().get("pNumFont");
            wNumFont = PlayResManager.getMoneyMap().get("wNumFont");
            
            type_s_Img[0] = PlayResManager.getIconMap().get("type_s_none");
            type_s_Img[1] = PlayResManager.getIconMap().get("type_s_physics");
            type_s_Img[2] = PlayResManager.getIconMap().get("type_s_magic");
            
            lvIconArr = [];
            for (var i = 0; i < 4; i++) {
                lvIconArr[i] = PlayResManager.getIconMap().get("lv_icon_" + i);
            }
            
            setHeroData(onload);
        }, function(err) {
            GameManager.openDisconnectPopup("ReadyScene setResource Fail!!");
            onload();
        });
    };
    
    var setPage = function(_page) {
        page = _page;
        setHeroData();
    };
    
    var setHeroData = function(onload) {
        var i = 0;
        
        if (Math.floor(HeroManager.getMyHeroInfo().length % 12) == 0) {
            maxPage = Math.floor(HeroManager.getMyHeroInfo().length / 12);
        } else {
            maxPage = Math.floor(HeroManager.getMyHeroInfo().length / 12) + 1;
        }
        
        unitInfo = [];
        for (i = page * 12; i < HeroManager.getMyHeroInfo().length; i++) {
            unitInfo[i - (page * 12)] = HeroManager.getMyHeroInfo()[i];
        }
        
        if (onload) onload();
    };
    
    var setFocus = function(_focus) {
        focus = _focus;
    };

	return {
		toString: function() {
			return "ReadyScene";
		},
		init: function(onload) {
            focus = 0;
            focusX = 0;
            focusY = 0;
            frameCnt = 0;
            isMenu = false;
            isCheckMenu = false;
            myUnit = [];
			onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
            
            var index = 0;
            for (var i = 0; i < unitInfo.length; i++) {
                if (unitInfo[i].getCheck()) {
                    myUnit[index] = unitInfo[i];
                    index++;
                }
            }
		},
		run: function() {
            frameCnt++;
            UIMgr.repaint();
		},
		paint: function() {
            g.drawImage(iframe, 0, 0);
            g.drawImage(title, 0, 0);
            
            if (isCheckMenu) {
                
                if (myUnit[focusX] != null) {
                    g.drawImage(info_back, 45, 118);
                    g.drawImage(hero_thumbnail[myUnit[focusX].getRes()], 64, 136);

                    g.setColor(COLOR_WHITE);
                    g.setFont(FONT_22);
                    HTextRender.oriRender(g, myUnit[focusX].getName(), 407, 199, HTextRender.CENTER);
                    g.drawImage(lvIconArr[myUnit[focusX].getGrade()], 263, 151);

                    for (var j = 0; j < myUnit[focusX].getExp(); j++) {
                        g.drawImage(star, 405 + (j * 18) - (myUnit[focusX].getExp() * 9), 147);
                    }

                    g.setFont(FONT_18);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, unitTypeStr[myUnit[focusX].getType()] + "/" + unitAttrStr[myUnit[focusX].getAttr()], 476, 250, HTextRender.RIGHT);
                    HTextRender.oriRender(g, myUnit[focusX].getAttack(), 476, 292, HTextRender.RIGHT);

                    HTextRender.oriRender(g, myUnit[focusX].getAttackRange(), 476, 334, HTextRender.RIGHT);

                    switch (myUnit[focusX].getSkill()) {
                        case 0: skillName = "없음";
                            break;
                        case 100: skillName = "단일 스턴";
                            break;
                        case 101: skillName = "단일 도트";
                            break;
                        case 102: skillName = "단일 슬로우";
                            break;
                        case 103: skillName = "스플래쉬 데미지";
                            break;
                        case 200: skillName = "스플래쉬 스턴";
                            break;
                        case 201: skillName = "스플래쉬 도트";
                            break;
                        case 202: skillName = "스플래쉬 슬로우";
                            break;
                    }
                    HTextRender.oriRender(g, skillName, 476, 376, HTextRender.RIGHT);    

                    g.setFont(FONT_18);
                    str = myUnit[focusX].getPresent();
                    for (var i = 0; i < str.length; i++) {
                        HTextRender.oriRender(g, str[i], 89, 439 + (i * 26), HTextRender.LEFT);    
                    }
                } else {
                    g.drawImage(info_empty, 45, 118);
                }
                
            } else {
                if (unitInfo[focus] != null) {
                    g.drawImage(info_back, 45, 118);
                    g.drawImage(hero_thumbnail[unitInfo[focus].getRes()], 64, 136);

                    g.setColor(COLOR_WHITE);
                    g.setFont(FONT_22);
                    HTextRender.oriRender(g, unitInfo[focus].getName(), 407, 199, HTextRender.CENTER);
                    g.drawImage(lvIconArr[unitInfo[focus].getGrade()], 263, 151);

                    for (var j = 0; j < unitInfo[focus].getExp(); j++) {
                        g.drawImage(star, 405 + (j * 18) - (unitInfo[focus].getExp() * 9), 147);
                    }

                    g.setFont(FONT_18);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, unitTypeStr[unitInfo[focus].getType()] + "/" + unitAttrStr[unitInfo[focus].getAttr()], 476, 250, HTextRender.RIGHT);
                    HTextRender.oriRender(g, unitInfo[focus].getAttack(), 476, 292, HTextRender.RIGHT);

                    HTextRender.oriRender(g, unitInfo[focus].getAttackRange(), 476, 334, HTextRender.RIGHT);

                    switch (unitInfo[focus].getSkill()) {
                        case 0: skillName = "없음";
                            break;
                        case 100: skillName = "단일 스턴";
                            break;
                        case 101: skillName = "단일 도트";
                            break;
                        case 102: skillName = "단일 슬로우";
                            break;
                        case 103: skillName = "스플래쉬 데미지";
                            break;
                        case 200: skillName = "스플래쉬 스턴";
                            break;
                        case 201: skillName = "스플래쉬 도트";
                            break;
                        case 202: skillName = "스플래쉬 슬로우";
                            break;
                    }
                    HTextRender.oriRender(g, skillName, 476, 376, HTextRender.RIGHT);    

                    g.setFont(FONT_18);
                    str = unitInfo[focus].getPresent();
                    for (var i = 0; i < str.length; i++) {
                        HTextRender.oriRender(g, str[i], 89, 439 + (i * 26), HTextRender.LEFT);    
                    }
                } else {
                    g.drawImage(info_empty, 45, 118);
                }
            }
            
            for (var i = 0; i < 6; i++) {
                g.drawImage(slot_set, 521 + (i * 119), 118);
                if (myUnit[i] != null) {
                    g.drawImage(myUnitIconImg[myUnit[i].getRes()], 529 + (i * 119), 125);
                }
            }
            
            for (var i = 0; i < 12; i++) {
                g.drawImage(slot, 521 + ((i % 6) * 119), 301 + Math.floor(i / 6) * 119);
                if (i < unitInfo.length) {
                    g.drawImage(myUnitIconImg[unitInfo[i].getRes()], 529 + ((i % 6) * 119), 308 + Math.floor(i / 6) * 119);
                    
                }
            }
            
            if (!isMenu && !isCheckMenu) {
                g.drawImage(focusImg[frameCnt % 4], 520 + (focus % 6) * 119, 299 + Math.floor(focus / 6) * 119);
            }
            
            for (var i = 0; i < 12; i++) {
                if (i < unitInfo.length) {
                    g.drawImage(type_s_Img[unitInfo[i].getAttr()], 522 + ((i % 6) * 119), 299 + Math.floor(i / 6) * 119);
                    
                    if (unitInfo[i].getCheck()) {
                        g.drawImage(deploy, 551 + ((i % 6) * 119), 295 + Math.floor(i / 6) * 119);
                    }
                    
                    for (var j = 0; j < unitInfo[i].getExp(); j++) {
                        g.drawImage(star, 577 + ((i % 6) * 119) + (j * 18) - ((unitInfo[i].getExp() * 9)), 396 + Math.floor(i / 6) * 119);
                    }
                }
            }
            
            g.drawImage(page_long, 521, 246);
            g.setColor(COLOR_WHITE);
            g.setFont(FONT_24);
            HTextRender.oriRender(g, (page + 1) + "/" + maxPage, 878, 278, HTextRender.CENTER);
            
            for (var i = 0; i < btn_off.length; i++) {
                if (i == btn_off.length - 1) {
                    g.drawImage(btn_off[i], 521, 573);
                } else {
                    g.drawImage(btn_off[i], 45 + (i * 119), 573);
                }
            }
            
            g.setFont(FONT_21);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, HeroManager.getMyHeroAmount() + "/" + HeroManager.getInventoryLength(), 879, 564, HTextRender.CENTER);
            
            for (var i = 0; i < 3; i++) {
                g.drawImage(slot, 878 + (i * 119), 573);
                g.drawImage(skill_off[i], 886 + (i * 119), 580);
                if (UnitManager.getSkillCnt(i) > 0) {
                    g.drawImage(skill[i], 886 + (i * 119), 580);
                }
                g.setFont(FONT_24);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, UnitManager.getSkillCnt(i), 893 + (i * 119), 674, HTextRender.LEFT);
            }
            
            
            if (isMenu) {
                if (focusX < btn_on.length - 1) {
                    g.drawImage(btn_on[focusX], 45 + (focusX * 119), 573);
                } else if (focusX == btn_on.length - 1) {
                    g.drawImage(btn_on[focusX], 521, 573);
                } else {
                    g.drawImage(focusImg[frameCnt % 4], 877 + ((focusX - 4) * 119), 571);
                }
            }
            
            if (isCheckMenu) {
                g.drawImage(focusImg[frameCnt % 4], 520 + (focusX * 119), 116);
            }
            
            for (var i = 0; i < 6; i++) {
                if (myUnit[i] != null) {
                    g.drawImage(type_s_Img[myUnit[i].getAttr()], 522 + (i * 119), 116);
                    for (var j = 0; j < myUnit[i].getExp(); j++) {
                        g.drawImage(star, 577 + (i * 119) + (j * 18) - ((myUnit[i].getExp() * 9)), 213);
                    }
                }
            }
            
            for (var i = 0; i < 3; i++) {
                g.drawImage(plus, 950 + (i * 119), 645);
            }
            
            uiDrawMgr.renderMoney(g);
		},
		stop: function() {
            
            unitInfo = null;
            myUnit = null;
            skillName = null;
            
            iframe = null;
            myUnitIconImg = null;
            focusImg = null;
            selectBox = null;
            title = null;
            info_empty = null;
            
            pNumFont.dispose();
            wNumFont.dispose();
            pNumFont = null;
            wNumFont = null;
            star = null;
            str = null;
            type_s_Img = null;
            deploy = null;
            plus = null;
            skill = null;
            skill_off = null;
            
            lvIconArr = null;
            
            
            info_back = null;
            hero_thumbnail = null;
            page_long = null;
            slot = null;
            slot_set = null;
            btn_off = null;
            btn_on = null;;
            
            POPUP.POP_SKILLPURCHASE.getInstance().clear();
		},
		dispose: function() {
            btn_str = null;
            unitTypeStr = null;
            unitAttrStr = null;
            unitSkillStr = null;
		},
		onKeyPressed: function(key) {
			switch(key) {
                case KEY_LEFT:
                    
                    if (isCheckMenu) {
                        focusX = HTool.getIndex(focusX, -1, 6);
                        return;
                    }
                    
                    if (isMenu) {
                        focusX = HTool.getIndex(focusX, -1, 7);
                        return;
                    }
                    
                    if (Math.floor(focus % 6) <= 0) {
                        setFocus(focus + 5);
                        if (HeroManager.getMyHeroInfo().length > 0) {
                            setPage(YUtil.indexMinus(page, maxPage));
                        }
                    } else {
                        setFocus(focus - 1);
                    }
                    break;
                case KEY_RIGHT:
                    
                    if (isCheckMenu) {
                        focusX = HTool.getIndex(focusX, 1, 6);
                        return;
                    }
                    
                    if (isMenu) {
                        focusX = HTool.getIndex(focusX, 1, 7);
                        return;
                    }
                    
                    if (Math.floor(focus % 6) >= 5) {
                        setFocus(focus - 5);
                        if (HeroManager.getMyHeroInfo().length > 0) {
                            setPage(YUtil.indexPlus(page, maxPage));
                        }
                    } else {
                        setFocus(focus + 1);
                    }
                    break;
				case KEY_UP:
                    
                    if (isCheckMenu) {
                        isMenu = true;
                        isCheckMenu = false;
                        focusX = 3;
                        return;
                    }
                    
                    if (isMenu) {
                        isMenu = false;
                        focus = focusX + 6;
                        return;
                    }
                    
                    if (Math.floor(focus / 6) <= 0) {
                        isCheckMenu = true;
                        focusX = Math.floor(focus % 6);
                    } else {
                        setFocus(focus - 6);
                    }
					break;
				case KEY_DOWN:
                    
                    if (isCheckMenu) {
                        isCheckMenu = false;
                        focus = focusX;
                        return;
                    }
                    
                    if (isMenu) {
                        isMenu = false;
                        isCheckMenu = true;
                        focusX = Math.floor(focus % 6);
                        return;
                    }
                    
                    if (Math.floor(focus / 6) >= 1) {
                        isMenu =  true;
                        focusX = 3;
                    } else {
                        setFocus(focus + 6);
                    }
					break;
				case KEY_ENTER:
                    
                    if (isCheckMenu) {
                        
                        if (myUnit[focusX] != null) {
                            if (myUnit[focusX].getCheck()) {

                                var tmpArray = [];
                                var tmpIdx = 0;
                                
                                for (var i = 0; i < HeroManager.getMyHeroInfo().length; i++) {
                                    if (myUnit[focusX].getRecKey() == HeroManager.getMyHeroInfo()[i].getRecKey()) {
                                        HeroManager.getMyHeroInfo()[i].setCheck(false);
                                        HeroManager.removeCheckRecKey(HeroManager.getMyHeroInfo()[i].getRecKey());
                                        myUnit[focusX] = null;
                                        tmpIdx = focusX;
                                        break;
                                    }
                                }
                                
                                for (var i = 0; i < myUnit.length - 1; i++) {
                                    if (i >= tmpIdx) {
                                        if (myUnit[i + 1] != null) {
                                            tmpArray[i] = myUnit[i + 1];
                                        }
                                    } else {
                                        tmpArray[i] = myUnit[i];
                                    }
                                }

                                myUnit = tmpArray;
                            }
                        }
                        return;
                    }
                    
                    if (isMenu) {
                        switch (focusX) {
                                
                            case 0:
                                if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
                                    appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                } else if (GameEngine.getGameMode() == GAME_MODE_RAID) {
                                    appMgr.changeLayer(SCENE.SC_RAID, false, "world");
                                }
                                break;
                                
                            case 1:
                                appMgr.changeLayer(SCENE.SC_INVEN, false, "world");
                                break;
                                
                            case 2:
                                appMgr.changeLayer(SCENE.SC_SUMMON, false, "world");
                                break;
                                
                            case 3:
                                if (myUnit.length == 0) {
                                    PopupMgr.openPopup(appMgr.getMessage1BtnPopup("전투에 참가할 히어로를 배치하세요.")); 
                                    return;
                                }

                                UnitManager.setUseHeroInfo(myUnit);
                                
                                /// 입장권 체크
                                
                                var requireKey = 1;
                                if (GameEngine.getGameMode() == GAME_MODE_RAID) {
                                    requireKey = 5;
                                } else {
                                    requireKey = 1;
                                }
                                
                                var remainAmount;
                                remainAmount = ItemManager.checkPrice("ENTRANCE_KEY", requireKey);
                                if (remainAmount < 0) {
                                    PopupMgr.openPopup(appMgr.getMessage2BtnPopup("입장권이 부족합니다.|충전하러 이동 하시겠습니까?"), function (code, data) {
                                        if (data == ("0")) {
                                            PopupMgr.closeAllPopup();
                                            appMgr.changeLayer(SCENE.SC_SHOP, false, "shop");
                                        } else {
                                            PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                        }
                                    });
                                    return;
                                }
                                
                                PopupMgr.openPopup(POPUP.POP_WAITING);
                                NetManager.Req_GameStart(requireKey, function(response) {
                                    PopupMgr.closeAllPopup();
                                    if (NetManager.isSuccess(response)) {
                                        appMgr.changeLayer(SCENE.SC_GAME, false, "back");
                                    } else {
                                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                                    }
                                });
                                break;
                                
                            case 4:
                                POPUP.POP_SKILLPURCHASE.getInstance().setSkill(0);
                                PopupMgr.openPopup(POPUP.POP_SKILLPURCHASE);
                                break;
                            case 5:
                                POPUP.POP_SKILLPURCHASE.getInstance().setSkill(1);
                                PopupMgr.openPopup(POPUP.POP_SKILLPURCHASE);
                                break;
                            case 6:
                                POPUP.POP_SKILLPURCHASE.getInstance().setSkill(2);
                                PopupMgr.openPopup(POPUP.POP_SKILLPURCHASE);
                                break;
                        }
                        
                        return;    
                    } 
                    
                    
                    if (unitInfo[focus] != null) {
                        if (unitInfo[focus].getCheck()) {

                            var tmpArray = [];
                            var tmpIdx = 0;

                            for (var i = 0; i < myUnit.length; i++) {
                                if (unitInfo[focus].getRecKey() == myUnit[i].getRecKey()) {
                                    unitInfo[focus].setCheck(false);
                                    HeroManager.removeCheckRecKey(unitInfo[focus].getRecKey());
                                    myUnit[i] = null;
                                    tmpIdx = i;
                                }
                            }

                            for (var i = 0; i < myUnit.length - 1; i++) {
                                if (i >= tmpIdx) {
                                    tmpArray[i] = myUnit[i + 1];
                                } else {
                                    tmpArray[i] = myUnit[i];
                                }
                            }

                            myUnit = tmpArray;

                        } else {
                            if (myUnit.length >= 6) return;
                            unitInfo[focus].setCheck(true);
                            HeroManager.addCheckRecKey(unitInfo[focus].getRecKey());
                            myUnit[myUnit.length] = unitInfo[focus];
                        }
                        return;
                    }
					break;
                    
                case KEY_PREV:
                    if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
                        appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                    } else if (GameEngine.getGameMode() == GAME_MODE_RAID) {
                        appMgr.changeLayer(SCENE.SC_RAID, false, "world");
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