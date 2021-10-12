// Strict Mode On (엄격모드)
"use strict";
"use warning";

var MonsterBookScene = new function() {
	var INSTANCE = this;

	var iframe;
    var title;
    var unitJson;
    var allUnitInfo;
    var frameCnt = 0;
    
    // new Image
    var info_back;
    var hero_thumbnail;
    var page_short;
    var info_empty;
    var slot;
    
    var btn_off;
    var btn_on;
    
    var monsterBookBtn_off;
    var monsterBookBtn_on;
    
    var btn_str = ["btn_back_", "btn_shop_", "btn_summon_", "btn_battle_", "btn_hero_"];
    var btn_book_str = ["tab_all_", "tab_mag_", "tab_att_", "tab_no_"];
    
    var focusImg;
    var myUnitIconImg = [];
    var star;
    var lvIconArr;
    var type_s_Img;
    
    var bookPage, bookMaxPage;
    var bookMyUnitInfo;
    var bookMyUnitInfoOrigin;
    var focusX, focusY;
    var focusB;

    var btn_on_b;
    var btn_off_b;

    var bookFocus;
    var isMenu = false;
    var isBtn = false;
    
    
    var str;
    var skillName;
    var unitTypeStr = ["근거리", "원거리"];
    var unitAttrStr = ["무속성", "물리속성", "마법속성"];
    
    var unitSkillStr = ["스킬 없음", "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 단일 개체의 적에게|매초당 공격력의 20%의 피해를 입힌다.",
                        "몬스터를 공격하여 단일 개체의 적의|이동속도를 5초간 10% 감소 시킨다.", "몬스터를 공격하여 다수의 적에게|공격력의 50%의 피해를 입힌다.",
                       "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 다수의 적에게|매 초당 공격력의 35%의 피해를 입힌다.", "몬스터를 공격하여 다수의 적의|이동속도를 5초간 20% 감소 시킨다."];
    
    this.load = function(onload) {
        setResource(onload);
    };
    
    var setResource = function(onload) {
        unitJson = HeroManager.getAllHeroInfo(); // JSON.parse(NetManager.ajaxRequest(ROOT_PROP + "unit.json"));
        
        hero_thumbnail = [];
        myUnitIconImg = [];
        btn_off = [];
        btn_on = [];
        monsterBookBtn_on = [];
        monsterBookBtn_off = [];
        allUnitInfo = [];
        type_s_Img = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [info_back = new Image(), ROOT_IMG + "inventory/info_back" + EXT_PNG],
            [page_short = new Image(), ROOT_IMG + "inventory/bar_page_short" + EXT_PNG],
            [slot = new Image(), ROOT_IMG + "inventory/slot" + EXT_PNG],
            [focusImg = [], HTool.getURLs(ROOT_IMG, "inventory/focus_slot_", EXT_PNG, 4)],
            [star = new Image(), ROOT_IMG + "etc/star" + EXT_PNG],
            [title = new Image(), ROOT_IMG + "etc/title_herobook" + EXT_PNG],
            [info_empty = new Image(), ROOT_IMG + "etc/info_empty" + EXT_PNG]
        ];
        
        for (var i = 0; i < btn_book_str.length; i++) {
            imgParam.push([monsterBookBtn_off[i] = new Image(), ROOT_IMG + "inventory/" + btn_book_str[i] + "off" + EXT_PNG]);
            imgParam.push([monsterBookBtn_on[i] = new Image(), ROOT_IMG + "inventory/" + btn_book_str[i] + "on" + EXT_PNG]);
        }
        
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
            type_s_Img[0] = PlayResManager.getIconMap().get("type_s_none");
            type_s_Img[1] = PlayResManager.getIconMap().get("type_s_physics");
            type_s_Img[2] = PlayResManager.getIconMap().get("type_s_magic");
            
            var temp;
            for (var i = 0; i < allUnitInfo.length - 1; i++) {
                for (var j = 0; j < allUnitInfo.length - 1 - i; j++) {
                    if (allUnitInfo[j].getGrade() < allUnitInfo[j + 1].getGrade()) {
                        temp = allUnitInfo[j];
                        allUnitInfo[j] = allUnitInfo[j + 1];
                        allUnitInfo[j + 1] = temp;
                    }
                }
            }
            
            btn_on_b = btn_on;
            btn_off_b = btn_off;
            lvIconArr = [];
            for (var i = 0; i < 4; i++) {
                lvIconArr[i] = PlayResManager.getIconMap().get("lv_icon_" + i);
            }
            onload();
        }, function(err) {
            GameManager.openDisconnectPopup("MonsterBookScene setResource Fail!!");
            onload();
        });
    };
    
    var setFocus = function(_focus) {
        bookFocus = _focus;
    };
        
    var setBookPage = function(_page) {
        bookPage = _page;
        setBookPageHeroData(bookPage);
    };
        
    var setBookPageHeroData = function(_page) {
        var temp = [];

        for (var i = (_page * 18); i < bookMyUnitInfoOrigin.length; i++) {
            temp[i - (_page * 18)] = bookMyUnitInfoOrigin[i];
        }

        bookMyUnitInfo = temp;
    };
        
    var setBookHeroData = function(_type) {
        var i = 0;
        var index = 0;

        bookMyUnitInfo = [];
        bookMyUnitInfoOrigin = [];

        for (i = bookPage * 18; i < allUnitInfo.length; i++) {

            switch (_type) {
                case 0:
                    bookMyUnitInfo[i - (bookPage * 18)] = allUnitInfo[i];
                    break;
                case 1:
                    if (allUnitInfo[i].getAttr() == 2) {
                        bookMyUnitInfo[index - (bookPage * 18)] = allUnitInfo[i];
                        index++;
                    }
                    break;
                case 2:
                    if (allUnitInfo[i].getAttr() == 1) {
                        bookMyUnitInfo[index - (bookPage * 18)] = allUnitInfo[i];
                        index++;
                    }
                    break;
                case 3:
                    if (allUnitInfo[i].getAttr() == 0) {
                        bookMyUnitInfo[index - (bookPage * 18)] = allUnitInfo[i];
                        index++;
                    }
                    break;
                default:
                    bookMyUnitInfo[i - (bookPage * 18)] = allUnitInfo[i];
                    break;
            }
        }

        if (Math.floor(bookMyUnitInfo.length % 18) == 0) {
            bookMaxPage = Math.floor(bookMyUnitInfo.length / 18);
        } else {
            bookMaxPage = Math.floor(bookMyUnitInfo.length / 18) + 1;
        }

        bookMyUnitInfoOrigin = bookMyUnitInfo;
    };
    
    var atk;
        
    var bookRender = function(g) {

        if (bookMyUnitInfo != null) {
            if (bookMyUnitInfo[bookFocus] != null) {

            g.drawImage(info_back, 45, 118);
            g.drawImage(hero_thumbnail[bookMyUnitInfo[bookFocus].getRes()], 64, 136);

            g.setColor(COLOR_WHITE);
            g.setFont(FONT_22);
            HTextRender.oriRender(g, bookMyUnitInfo[bookFocus].getName(), 407, 199, HTextRender.CENTER);
            g.drawImage(lvIconArr[bookMyUnitInfo[bookFocus].getGrade()], 254, 138);
            for (var j = 0; j < 6; j++) {
                    g.drawImage(star, 405 + (j * 18) - (6 * 9), 147);
                }

            g.setFont(FONT_18);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, unitTypeStr[bookMyUnitInfo[bookFocus].getType()] + "/" + unitAttrStr[bookMyUnitInfo[bookFocus].getAttr()], 476, 250, HTextRender.RIGHT);
            
            atk = bookMyUnitInfo[bookFocus].getAttack();
            for (var i = 0; i < 5; i++) {
                atk = atk + Math.floor(atk * bookMyUnitInfo[bookFocus].getAttackInc() / 100);
            }
                
            HTextRender.oriRender(g, atk, 476, 292, HTextRender.RIGHT);
            HTextRender.oriRender(g, bookMyUnitInfo[bookFocus].getAttackRange(), 476, 334, HTextRender.RIGHT);
                
            switch (bookMyUnitInfo[bookFocus].getSkill()) {
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
            str = bookMyUnitInfo[bookFocus].getPresent();
            for (var i = 0; i < str.length; i++) {
                HTextRender.oriRender(g, str[i], 89, 439 + (i * 26), HTextRender.LEFT);    
            }
            } else {
                g.drawImage(info_empty, 45, 118);
            }
        }

        for (var i = 0; i < 18; i++) {

            g.drawImage(slot, 521 + ((i % 6) * 119), 182 + Math.floor(i / 6) * 119);

            if (bookMyUnitInfo[i] != null) {
                g.drawImage(myUnitIconImg[bookMyUnitInfo[i].getRes()], 529 + ((i % 6) * 119), 189 + Math.floor(i / 6) * 119);
            }
        }

        for (var i = 0; i < btn_off.length; i++) {
            if (i == btn_off.length - 1) {
                g.drawImage(btn_off_b[i], 1116, 573);
            } else {
                g.drawImage(btn_off_b[i], 45 + (i * 119), 573);
            }
        }

        for (var i = 0; i < monsterBookBtn_off.length; i++) {
            g.drawImage(monsterBookBtn_off[i], 521 + (i * 119), 118);
        }

        if (isMenu) {
            if (Math.floor(frameCnt / 2 % 2) == 0) {
                g.drawImage(monsterBookBtn_on[focusX], 521 + (focusX * 119), 118);
            }
        } else if (isBtn) {
            switch (focusB) {
                case 0:
                case 1:
                case 2:
                case 3:
                    g.drawImage(btn_on_b[focusB], 45 + (focusB * 119), 573);
                    break;
                case 4:
                    g.drawImage(btn_on_b[focusB], 1116, 573);
                    break;
            }
            g.drawImage(monsterBookBtn_on[focusX], 521 + (focusX * 119), 118);
        } else {
            g.drawImage(focusImg[frameCnt % 4], 520 + (bookFocus % 6) * 119, 180 + Math.floor(bookFocus / 6) * 119);
            g.drawImage(monsterBookBtn_on[focusX], 521 + (focusX * 119), 118);
        }

        for (var i = 0; i < 18; i++) {
            if (bookMyUnitInfo[i] != null) {
                g.drawImage(type_s_Img[bookMyUnitInfo[i].getAttr()], 522 + ((i % 6) * 119), 180 + Math.floor(i / 6) * 119);
            }
        }

        g.drawImage(page_short, 1030, 118);
        g.setColor(COLOR_WHITE);
        g.setFont(FONT_24);
        HTextRender.oriRender(g, (bookPage + 1) + "/" + bookMaxPage, 1132, 150, HTextRender.CENTER);
    };
    
	return {
		toString: function() {
			return "MonsterBookScene";
		},
		init: function(onload) {
            frameCnt = 0;
            focusX = 0;
            focusY = 1;
            focusB = 0;
            bookFocus = 0;
            bookPage = 0;
            bookMaxPage = 0;
            setBookHeroData(focusX);
            isMenu = false;
            isBtn = false;
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
            bookRender(g);
            uiDrawMgr.renderMoney(g);
		},
		stop: function() {
            iframe = null;
            title = null;
            allUnitInfo = null;
            info_empty = null;
            
            info_back = null;
            hero_thumbnail = null;
            page_short = null;
            slot = null;
            btn_off = null;
            btn_on = null;
            
            myUnitIconImg = null;
            
            monsterBookBtn_off = null;
            monsterBookBtn_on = null;
            
            str = null;
            star = null;
            
            type_s_Img = null;
            lvIconArr = null;
            
            btn_on_b = null;
            btn_off_b = null;
		},
		dispose: function() {
            btn_str = null;
            btn_book_str = null;
            unitTypeStr = null;
            unitAttrStr = null;
            unitSkillStr = null;
		},
		onKeyPressed: function(key) {
            
            switch (key) {
                case KEY_LEFT:
                    if (isMenu) {
                        focusX = HTool.getIndex(focusX, -1, 4);
                        bookPage = 0;
                        setBookHeroData(focusX);
                    } else if (isBtn) {
                        focusB = HTool.getIndex(focusB, -1, 5);
                    } else {
                        if (bookFocus % 6 <= 0) {
                            setFocus(bookFocus + 5);
                            setBookPage(YUtil.indexMinus(bookPage, bookMaxPage));
                        } else {
                            setFocus(bookFocus - 1);
                        }
                    }
                    break;
                case KEY_RIGHT:
                     if (isMenu) {
                        focusX = HTool.getIndex(focusX, 1, 4);
                        bookPage = 0;
                        setBookHeroData(focusX);
                    } else if (isBtn) {
                        focusB = HTool.getIndex(focusB, 1, 5);
                    } else {
                        if (bookFocus % 6 >= 5) {
                            setFocus(bookFocus - 5);
                            setBookPage(YUtil.indexPlus(bookPage, bookMaxPage));
                        } else {
                            setFocus(bookFocus + 1);
                        }
                    }
                    break;
                case KEY_UP:
                    if (isMenu) {
                        isMenu = false;
                        isBtn = true;
                    } else if (isBtn) {
                        if (Math.floor(bookFocus / 18) >= 0) {
                            isBtn = false;
                            setFocus(12);
                        }
                    } else {
                        if (Math.floor(bookFocus / 6) <= 0) {
                            isMenu = true;
                        } else {
                            setFocus(bookFocus - 6);
                        }
                    }
                    break;
                case KEY_DOWN:
                    if (isMenu) {
                        isMenu = false;
                        setFocus(0);
                    } else if (isBtn) {
                        isBtn = false;
                        isMenu = true;
                    } else {
                        if (Math.floor(bookFocus / 12) >= 1) {
                            isBtn = true;
                        } else {
                            setFocus(bookFocus + 6);
                        }
                    }
                    break;
                case KEY_ENTER:
                    if (isBtn) {
                        switch (focusB) {
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
                                appMgr.changeLayer(SCENE.SC_INVEN, false, "monster_list");
                                break;
                        }
                    }
                    break;
                case KEY_PREV:
                    appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
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