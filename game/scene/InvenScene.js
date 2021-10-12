// Strict Mode On (엄격모드)
"use strict";
"use warning";

var InvenScene = new function() {
	var INSTANCE = this;

	var iframe;
    var unitJson;
    var myUnitInfo;
    var allUnitInfo;
    
    var focus = 0;
    var focusM = 0;
    var frameCnt = 0;
    var page = 0;
    var maxPage = 0;
    var isMenu;
    var isKeyLock;
    
    var subPop;
    
    // new Image
    var info_back;
    var hero_thumbnail;
    var page_long;
    var slot;
    var title;
    
    var btn_off;
    var btn_on;
    var btn_str = ["btn_back_", "btn_shop_", "btn_summon_", "btn_battle_", "btn_herobook_"];
    
    var myUnitIconImg = [];
    var focusImg;
    var pNumFont;
    
    var star;
    var info_empty;
    
    var type_s_Img;
    var lvIconArr;
    
    var skillName;
    var str;
    var unitTypeStr = ["근거리", "원거리"];
    var unitAttrStr = ["무속성", "물리속성", "마법속성"];
    
    var unitSkillStr = ["스킬 없음", "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 단일 개체의 적에게|매초당 공격력의 20%의 피해를 입힌다.",
                        "몬스터를 공격하여 단일 개체의 적의|이동속도를 5초간 10% 감소 시킨다.", "몬스터를 공격하여 다수의 적에게|공격력의 50%의 피해를 입힌다.",
                       "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 다수의 적에게|매 초당 공격력의 35%의 피해를 입힌다.", "몬스터를 공격하여 다수의 적의|이동속도를 5초간 20% 감소 시킨다."];
    
    this.load = function(onload) {
        var onloadCnt = 0;
        var checkOnload = function () {
            onloadCnt++;
            if (onloadCnt == 4) {
                onload();
            }
        };
        
        setResource(checkOnload);
        POPUP.POP_HEROLEVELUP.getInstance().setResource(checkOnload);
        POPUP.POP_HEROSELL.getInstance().setResource(checkOnload);
        setHeroData(checkOnload);
    };
    
    var setResource = function(onload) {
        unitJson = HeroManager.getAllHeroInfo(); // JSON.parse(NetManager.ajaxRequest(ROOT_PROP + "unit.json"));
        
        hero_thumbnail = [];
        myUnitIconImg = [];
        btn_off = [];
        btn_on = [];
        myUnitInfo = [];
        allUnitInfo = [];
        focusImg = [];
        type_s_Img = [];
        
        var subBg, subFocus = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [info_back = new Image(), ROOT_IMG + "inventory/info_back" + EXT_PNG],
            [page_long = new Image(), ROOT_IMG + "inventory/bar_page_long" + EXT_PNG],
            [slot = new Image(), ROOT_IMG + "inventory/slot" + EXT_PNG],
            [focusImg = [], HTool.getURLs(ROOT_IMG, "inventory/focus_slot_", EXT_PNG, 4)],
            [subBg = new Image(), ROOT_IMG_INVENTORY + "subpopup/" + "popup_slotback" + EXT_PNG],
            [subFocus = [], HTool.getURLs(ROOT_IMG_INVENTORY + "subpopup/", "b_sub_", EXT_PNG, 3)],
            [title = new Image(), ROOT_IMG + "etc/title_hero" + EXT_PNG],
            [star = new Image(), ROOT_IMG + "etc/star" + EXT_PNG],
            [info_empty = new Image(), ROOT_IMG + "etc/info_empty" + EXT_PNG]
        ];
        
        for (var i = 0; i < btn_str.length; i++) {
            imgParam.push([btn_off[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "off" + EXT_PNG]);
            imgParam.push([btn_on[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "on" + EXT_PNG]);
        }
        
        for (var i = 0; i < unitJson.length; i++) {
            var obj = unitJson[i];
            
            allUnitInfo[i] = new UnitInfo(obj.res, obj.grade, obj.attack, obj.attackInc, obj.attackRange, obj.splashRange, obj.attackSpd, obj.critical, obj.moveSpd, obj.type, obj.attr, obj.skill, obj.skillCoolTime, obj.isSplash, obj.name, "", "", 0, 0, obj.present);
            
            imgParam.push([hero_thumbnail[i] = new Image(), ROOT_IMG + "game/myUnit/thumbnail/hero_" + allUnitInfo[i].getRes() + EXT_PNG]);
            imgParam.push([myUnitIconImg[i] = new Image(), ROOT_IMG + "game/myUnit/thumbnail_icon/hero_" + allUnitInfo[i].getRes() + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            pNumFont = PlayResManager.getMoneyMap().get("pNumFont");
            
            type_s_Img[0] = PlayResManager.getIconMap().get("type_s_none");
            type_s_Img[1] = PlayResManager.getIconMap().get("type_s_physics");
            type_s_Img[2] = PlayResManager.getIconMap().get("type_s_magic");
            
            lvIconArr = [];
            for (var i = 0; i < 4; i++) {
                lvIconArr[i] = PlayResManager.getIconMap().get("lv_icon_" + i);
            }
            subPop = new subPopup(subBg, subFocus);
            
            subBg = null;
            subFocus = null;
            
            onload();
        }, function(err) {
            GameManager.openDisconnectPopup("InvenScene setResource Fail!!");
            onload();
        });
    };
    
    var setPage = function(_page) {
        page = _page;
        setHeroData();
    };
    
    var setHeroData = function(onload) {
        var i = 0;
        
        if (Math.floor(HeroManager.getMyHeroInfo().length % 18) == 0) {
            maxPage = Math.floor(HeroManager.getMyHeroInfo().length / 18);
        } else {
            maxPage = Math.floor(HeroManager.getMyHeroInfo().length / 18) + 1;
        }

        myUnitInfo = [];
        for (i = page * 18; i < HeroManager.getMyHeroInfo().length; i++) {
            myUnitInfo[i - (page * 18)] = HeroManager.getMyHeroInfo()[i];
        }
        
        if (onload) onload();
    };
    
    var renderMyUnitSlot = function(g) {
        
        if (myUnitInfo != null) {
            if (myUnitInfo[focus] != null) {
                
                g.drawImage(info_back, 45, 118);
                g.drawImage(hero_thumbnail[myUnitInfo[focus].getRes()], 64, 136);

                g.setColor(COLOR_WHITE);
                g.setFont(FONT_22);
                HTextRender.oriRender(g, myUnitInfo[focus].getName(), 407, 199, HTextRender.CENTER);
                g.drawImage(lvIconArr[myUnitInfo[focus].getGrade()], 254, 138);
                
                for (var j = 0; j < myUnitInfo[focus].getExp(); j++) {
                    g.drawImage(star, 405 + (j * 18) - (myUnitInfo[focus].getExp() * 9), 147);
                }
                
                g.setFont(FONT_18);
                g.setColor(COLOR_WHITE);
                HTextRender.oriRender(g, unitTypeStr[myUnitInfo[focus].getType()] + "/" + unitAttrStr[myUnitInfo[focus].getAttr()], 476, 250, HTextRender.RIGHT);
                HTextRender.oriRender(g, myUnitInfo[focus].getAttack(), 476, 292, HTextRender.RIGHT);
                HTextRender.oriRender(g, myUnitInfo[focus].getAttackRange(), 476, 334, HTextRender.RIGHT);
                
                switch (myUnitInfo[focus].getSkill()) {
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
                str = myUnitInfo[focus].getPresent();
                for (var i = 0; i < str.length; i++) {
                    HTextRender.oriRender(g, str[i], 89, 439 + (i * 26), HTextRender.LEFT);    
                }
            } else {
                g.drawImage(info_empty, 45, 118);
            }

            for (var i = 0; i < 18; i++) {
                g.drawImage(slot, 521 + ((i % 6) * 119), 182 + Math.floor(i / 6) * 119);
                
//                if (i < myUnitInfo.length) {
                if (myUnitInfo[i] != null) {
                    g.drawImage(myUnitIconImg[myUnitInfo[i].getRes()], 529 + ((i % 6) * 119), 189 + Math.floor(i / 6) * 119);
                }
            }
            
            if (!isMenu) g.drawImage(focusImg[frameCnt % 4], 520 + (focus % 6) * 119, 180 + Math.floor(focus / 6) * 119);
            
            for (var i = 0; i < 18; i++) {
//                if (i < myUnitInfo.length) {
                if (myUnitInfo[i] != null) {
                    g.drawImage(type_s_Img[myUnitInfo[i].getAttr()], 522 + ((i % 6) * 119), 180 + Math.floor(i / 6) * 119);
                    for (var j = 0; j < myUnitInfo[i].getExp(); j++) {
                        g.drawImage(star, 577 + ((i % 6) * 119) + (j * 18) - ((myUnitInfo[i].getExp() * 9)), 277 + Math.floor(i / 6) * 119);
                    }
                }
            }
        }
    };
    
    var levelUp = function () {
        if (myUnitInfo[focus].getExp() >= 6) {
            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("더이상 레벨을 올릴 수 없습니다."), null, 1500);
            return;
        }
        
        POPUP.POP_HEROLEVELUP.getInstance().setHeroData(myUnitInfo[focus], myUnitIconImg[myUnitInfo[focus].getRes()]);
        PopupMgr.openPopup(POPUP.POP_HEROLEVELUP, function(code, data) {
            if (data == ("0")) {
                PopupMgr.closePopup(POPUP.POP_HEROLEVELUP);
                setHeroData();
                subPop.close();
                UIMgr.repaint();
            } else {
                PopupMgr.closePopup(POPUP.POP_HEROLEVELUP);
                setHeroData();
                subPop.close();
                UIMgr.repaint();
//                                    isApply = false;
            }
        });
    };
    
    var subPopup = function(_bg, _focusImg) {
        var _this = this;
        var bg = _bg;
        var focusImg = _focusImg;
        this.isOpen;
        var x, y, subFocus;

        this.clear = function() {
            bg = null;
            focusImg = null;
        };

        this.render = function(g) {
            if (!this.isOpen) return;
            g.drawImage(bg, x, y);
            g.drawImage(focusImg[subFocus], x + 14, y + 13 + (subFocus * 33));
        };

        this.open = function(_x, _y) {
            
            if (_x + bg.width >= SCREEN_WIDTH) {
                x = _x - (bg.width * 2) + 30;
            } else {
                x = _x - 20;
            }
            
            y = _y + 10;
            
            subFocus = 0;
            this.isOpen = true;
        };

        this.close = function() {
            this.isOpen = false;
        };

        this.onKeyAction = function(keyCode) {
            switch(keyCode) {
                case KEY_LEFT:
                case KEY_RIGHT:
                    _this.close();
                    InvenScene.onKeyPressed(keyCode);
                    break;
                case KEY_PREV:
                case KEY_BLUE:
                    _this.close();
                    break;
                case KEY_UP:
                    subFocus = YUtil.indexMinus(subFocus, 3);
                    break;
                case KEY_DOWN:
                    subFocus = YUtil.indexPlus(subFocus, 3);
                    break;
                case KEY_ENTER:
                    switch(subFocus) {
                        case 0:
                            levelUp();
                            break;
                        case 1:
                            
                            var idxs = Number(myUnitInfo[focus].getAttr());
                            var codes
                            var amounts;
                            
                            switch (idxs) {
                                case 0: codes = "BLACK_STONE"; break;
                                case 1: codes = "BLUE_STONE"; break;
                                case 2: codes = "RED_STONE"; break;
                            } 
                            
                            switch (myUnitInfo[focus].getGrade()) {
                                case 0: amounts = 2; break;
                                case 1: amounts = 6; break;
                                case 2: amounts = 18; break;
                                case 3: amounts = 32; break;
                            }
                            
                            if (ItemManager.itemFullCheck(codes, amounts)) {
                                
                                POPUP.POP_INVEN_2BTN.getInstance().setMessage("정말로 해당 히어로를 판매 하시겠습니까?", idxs, amounts, myUnitInfo[focus].getRes());
                                PopupMgr.openPopup(POPUP.POP_INVEN_2BTN, function(code, data) {
                                    if (data == ("0")) {
                                        PopupMgr.closeAllPopup();
                                        PopupMgr.openPopup(POPUP.POP_WAITING);
                                        NetManager.Req_ItemLoss(myUnitInfo[focus].getCode(), myUnitInfo[focus].getRecKey(), function(response) {
                                            PopupMgr.closeAllPopup();
                                            if (NetManager.isSuccess(response)) {
                                                QuestManager.questUpdt(3, function() {
                                                    PopupMgr.openPopup(appMgr.getMessage1BtnPopup("판매가 완료 되었습니다.|보유 스톤이 가득차서 스톤을 획득 할 수 없습니다."));
                                                    setHeroData();
                                                    _this.close(); // 임시
                                                    UIMgr.repaint();
                                                });
                                            } else {
                                                console.error(response);
                                                appMgr.openDisconnectPopup("Netmanager Fail", this);
                                            }
                                        });
                                    } else {
                                        PopupMgr.closeAllPopup();
                                    }
                                });
                            } else {
                                
                                POPUP.POP_INVEN_2BTN.getInstance().setMessage("정말로 해당 히어로를 판매 하시겠습니까?", idxs, amounts, myUnitInfo[focus].getRes());
                                PopupMgr.openPopup(POPUP.POP_INVEN_2BTN, function(code, data) {
                                    if (data == ("0")) {
                                        PopupMgr.closeAllPopup();
                                        PopupMgr.openPopup(POPUP.POP_WAITING);
                                        NetManager.Req_ItemSell(myUnitInfo[focus].getCode(), myUnitInfo[focus].getLev(), myUnitInfo[focus].getRecKey(), function(response) {
                                            PopupMgr.closeAllPopup();
                                            if (NetManager.isSuccess(response)) {
                                                QuestManager.questUpdt(3, function() {
                                                    POPUP.POP_INVEN_1BTN.getInstance().setMessage("아이템을 획득하였습니다.", idxs, amounts);
                                                    PopupMgr.openPopup(POPUP.POP_INVEN_1BTN);

                                                    setHeroData();
                                                    _this.close(); // 임시
                                                    UIMgr.repaint();
                                                });
                                            } else {
                                                appMgr.openDisconnectPopup("Netmanager Fail", this);
                                            }
                                        });
                                    } else {
                                        PopupMgr.closeAllPopup();
                                    }
                                });
                            }
                            break;
                        case 2:
                            _this.close();
                            return;
                    }
                    _this.close();
                    break;
            }
        };
    };
    
    var setFocus = function(_focus) {
        focus = _focus;
    };
    
	return {
		toString: function() {
			return "InvenScene";
		},
		init: function(onload) {
            focus = 0;
            focusM = 0;
            frameCnt = 0;
            isMenu = false;
			onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
		},
		run: function() {
            frameCnt++;
            UIMgr.repaint();
		},
		paint: function() {
			g.drawImage(iframe, 0, 0);
            
            g.drawImage(title, 0, 0);
            
            renderMyUnitSlot(g);
            g.drawImage(page_long, 521, 118);
            g.setColor(COLOR_WHITE);
            g.setFont(FONT_24);
            HTextRender.oriRender(g, (page + 1) + "/" + maxPage, 878, 150, HTextRender.CENTER);

            subPop.render(g);
            
            
            g.setFont(FONT_21);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, HeroManager.getMyHeroAmount() + "/" + HeroManager.getInventoryLength(), 879, 564, HTextRender.CENTER);

            for (var i = 0; i < btn_off.length; i++) {
                if (i == btn_off.length - 1) {
                    g.drawImage(btn_off[i], 1116, 573);
                } else {
                    g.drawImage(btn_off[i], 45 + (i * 119), 573);
                }
            }

            if (isMenu) {
                switch (focusM) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        g.drawImage(btn_on[focusM], 45 + (focusM * 119), 573);
                        break;
                    case 4:
                        g.drawImage(btn_on[focusM], 1116, 573);
                        break;
                }
            }
            
            uiDrawMgr.renderMoney(g);
		},
		stop: function() {
            iframe = null;
            myUnitInfo = null;
            allUnitInfo = null;
            info_empty = null;
            
            info_back = null;
            hero_thumbnail = null;
            page_long = null;
            slot = null;
            btn_off = null;
            btn_on = null;
            title = null;
            
            myUnitIconImg = null;
            focusImg = null;
            
            str = null;
            pNumFont = null;
            subPop.clear();
            
            star = null;
            
            type_s_Img = null;
            lvIconArr = null;
            
            POPUP.POP_HEROLEVELUP.getInstance().clear();
            POPUP.POP_HEROSELL.getInstance().clear();
		},
		dispose: function() {
            btn_str = null;
		},
		onKeyPressed: function(key) {
            
            if (subPop.isOpen) {
                subPop.onKeyAction(key);
            } else {
                switch(key) {
                    case KEY_UP:
                        if (isMenu) {
                            isMenu = false;
                            if (Math.floor(focus / 6) <= 0) {
                                setFocus(focus + 12);                            
                            }
                        } else {
                            if (Math.floor(focus / 6) <= 0) {
                                isMenu = true;
                                focusM = 0;
                            } else {
                                setFocus(focus - 6);
                            }
                        }
                        break;
                    case KEY_DOWN:
                        if (isMenu) {
                            isMenu = false;
                            if (Math.floor(focus / 6) >= 2) {
                                setFocus(focus - 12);
                            }
                        } else {
                            if (Math.floor(focus / 6) >= 2) {
                                isMenu = true;
                                focusM = 0;
                            } else {
                                setFocus(focus + 6);
                            }
                        }
                        break;
                    case KEY_LEFT:
                        if (isMenu) {
                            focusM = HTool.getIndex(focusM, -1, 5);
                        } else {
                            if (focus % 6 <= 0) {
                                setFocus(focus + 5);
                                if (HeroManager.getMyHeroInfo().length > 0) {
                                    setPage(YUtil.indexMinus(page, maxPage));
                                }
                            } else {
                                setFocus(focus - 1);
                            }
                        }
                        break;
                    case KEY_RIGHT:
                        if (isMenu) {
                            focusM = HTool.getIndex(focusM, 1, 5);
                        } else {
                            if (focus % 6 >= 5) {
                                setFocus(focus - 5);
                                if (HeroManager.getMyHeroInfo().length > 0) {
                                    setPage(YUtil.indexPlus(page, maxPage));
                                }
                            } else {
                                setFocus(focus + 1);
                            }
                        }
                        break;
                    case KEY_ENTER:
                        if (isMenu) {
                            switch (focusM) {
                                case 0:
                                    appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                                    break;
                                case 1:
                                    appMgr.changeLayer(SCENE.SC_SHOP, false, "shop");
                                    break;
                                case 2:
                                    appMgr.changeLayer(SCENE.SC_SUMMON, false, "summon");
                                    break;
                                case 3:
                                    appMgr.changeLayer(SCENE.SC_WORLD, false, "world");
                                    break;
                                case 4:
                                    appMgr.changeLayer(SCENE.SC_MONSTERBOOK, false, "world");
                                    break;
                            }
                        } else {
                            if (myUnitInfo != null) {
                                if (myUnitInfo[focus] != null) {
                                    subPop.open(645 + focus % 6 * 119, 180 + Math.floor(focus / 6) * 119);
                                }
                            }
                        }
                        break;
                    case KEY_PC_F4:
                    case KEY_PREV:
                        appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                        keyac
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