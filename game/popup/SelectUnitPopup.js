// Strict Mode On (엄격모드)
"use strict";
"use warning";

var SelectUnitPopup = new function() {
    var INSTANCE = this;
    var callbackfunc;
    
    var focus = 0;
    var frameCnt = 0;
    var str;
    var teamScore;
    var isMenu;
    
    var popX = 0, popY = 0;
    
    var selectBox;
    
    var myUnitIconImg;
    var myUnitImg;
    
    var focusImg;
    var button_exit_off;
    var button_exit_on;
    var num;
    var numberFont;
    var star;
    var starBack;
    
    var typeImg;
    var type_s_Img;
    var iconImg;
    var iconAtk;
    var lvIconArr;
    
    var popup_monster_select;
    
    var unitTypeStr = ["근거리 공격", "원거리 공격"];
    var unitAttrStr = ["무속성", "물리속성", "마법속성"];
    var unitSkillStr = ["스킬 없음", "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 단일 개체의 적에게|매초당 공격력의 20%의 피해를 입힌다.",
                        "몬스터를 공격하여 단일 개체의 적의|이동속도를 5초간 10% 감소 시킨다.", "몬스터를 공격하여 다수의 적에게|공격력의 50%의 피해를 입힌다.",
                       "몬스터를 공격하여 다수의 적의|이동을 1초간 방해 한다.", "몬스터를 공격하여 다수의 적에게|매 초당 공격력의 35%의 피해를 입힌다.", "몬스터를 공격하여 다수의 적의|이동속도를 5초간 20% 감소 시킨다."];
    
    var setResource = function(onload) {
        myUnitIconImg = [];
//        myUnitImg = [];
        button_exit_on = [];
//        num = [];
        
//        typeImg = [];
//        type_s_Img = [];
//        iconImg = [];
        
        var imgParam = [
            [popup_monster_select = new Image(), ROOT_IMG + "popup/popup_monster_select" + EXT_PNG],
//            [button_exit_off = new Image(), ROOT_IMG + "popup/b_exit_off" + EXT_PNG],
            [button_exit_on = [], HTool.getURLs(ROOT_IMG, "popup/p_b_exit_", EXT_PNG, 3)],
            [focusImg = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_select_", EXT_PNG, 2)],
//            [num = [], HTool.getURLs(ROOT_IMG, "number/w_", EXT_PNG, 10)],
//            [star = new Image(), ROOT_IMG + "etc/star_1" + EXT_PNG],
//            [starBack = new Image(), ROOT_IMG + "etc/star_0" + EXT_PNG],
            [selectBox = new Image(), ROOT_IMG + "waitroom/select_box" + EXT_PNG]
        ];
        for (var i = 0; i <  UnitManager.getUseHeroInfo().length; i++) {
            imgParam.push([myUnitIconImg[i] = new Image(), ROOT_IMG + "game/myUnit/icon/s_hero_" + UnitManager.getUseHeroInfo()[i].getRes() + EXT_PNG]);
//            imgParam.push([myUnitImg[i] = new Image(), ROOT_IMG + "game/myUnit/hero/hero_" + UnitManager.getUseHeroInfo()[i].getRes() + "_l_w_0" + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
//            numberFont = new NumberFontImage(num);
//            typeImg[0] = PlayResManager.getIconMap().get("type_none");
//            typeImg[1] = PlayResManager.getIconMap().get("type_physics");
//            typeImg[2] = PlayResManager.getIconMap().get("type_magic");
            
//            type_s_Img[0] = PlayResManager.getIconMap().get("type_s_none");
//            type_s_Img[1] = PlayResManager.getIconMap().get("type_s_physics");
//            type_s_Img[2] = PlayResManager.getIconMap().get("type_s_magic");
            
//            iconImg[0] = PlayResManager.getIconMap().get("icon_melee");
//            iconImg[1] = PlayResManager.getIconMap().get("icon_range");
//            
//            iconAtk = PlayResManager.getIconMap().get("icon_attack");
            
//            lvIconArr = [];
//            for (var i = 0; i < 4; i++) {
//                lvIconArr[i] = PlayResManager.getIconMap().get("lv_icon_" + i);
//            }
            onload();
        }, function(err) {
            appMgr.openDisconnectPopup("SelectUnitPopup setResource Fail!!");
            onload();
        });
    };
    
    var heroRender = function(g) {
        
        if (UnitManager.getUseHeroInfo()[focus] != null) {
//            g.setFont(FONT_24);
//            g.setColor(COLOR_YELLOW);
//            HTextRender.oriRender(g, UnitManager.getUseHeroInfo()[focus].getName(), 455, 219, HTextRender.CENTER);
            
//            g.drawImage(lvIconArr[UnitManager.getUseHeroInfo()[focus].getGrade()], 264, 239);
            
//            g.drawImage(myUnitImg[focus], 367 - (myUnitImg[focus].width / 2), 407 - myUnitImg[focus].height);

//            for (var j = 0; j < 6; j++) {
//                g.drawImage(starBack, 335 + (j * 15), 252);
//            }
//            for (var j = 0; j < UnitManager.getUseHeroInfo()[focus].getExp(); j++) {
//                g.drawImage(star, 335 + (j * 15), 252);
//            }
            
//            g.drawImage(typeImg[UnitManager.getUseHeroInfo()[focus].getAttr()], 447, 252);
//            g.drawImage(iconImg[UnitManager.getUseHeroInfo()[focus].getType()], 447, 302);
//            g.drawImage(iconAtk, 447, 352);
//            
//            g.setFont(FONT_19);
//            g.setColor(COLOR_WHITE);
//            HTextRender.oriRender(g, unitAttrStr[UnitManager.getUseHeroInfo()[focus].getAttr()], 546, 282, HTextRender.LEFT);
//            HTextRender.oriRender(g, unitTypeStr[UnitManager.getUseHeroInfo()[focus].getType()], 546, 332, HTextRender.LEFT);
//            HTextRender.oriRender(g, UnitManager.getUseHeroInfo()[focus].getAttack(), 546, 382, HTextRender.LEFT);
//            
//            str = UnitManager.getUseHeroInfo()[focus].getPresent();
//            for (var i = 0; i < str.length; i++) {
//                HTextRender.oriRender(g, str[i], 257, 455 + (i * 22), HTextRender.LEFT);
//            }
            
        } else {
//            g.setFont(FONT_24);
//            g.setColor(COLOR_YELLOW);
//            HTextRender.oriRender(g, "EMPTY", 455, 219, HTextRender.CENTER);

//            g.setFont(FONT_19);
//            g.setColor(COLOR_WHITE);
//            HTextRender.oriRender(g, "EMPTY", 546, 282, HTextRender.LEFT);
//            HTextRender.oriRender(g, "EMPTY", 546, 332, HTextRender.LEFT);
//            HTextRender.oriRender(g, "EMPTY", 546, 382, HTextRender.LEFT);
//
//            HTextRender.oriRender(g, "EMPTY", 257, 455, HTextRender.LEFT);
        }
        
        for (var i = 0; i < 6; i++) {
            if (i < UnitManager.getUseHeroInfo().length) {
                
                if (UnitManager.getUseHeroInfo()[i].getUsed()) {
//                    g.drawImage(selectBox, 681 + ((i % 3) * 115), 249 + Math.floor(i / 3) * 116);
                    g.drawImage(selectBox, popX + 107 + (i * 70), popY - 24);
                }
            }
        }
        
        if (isMenu) {
            g.drawImage(button_exit_on[Math.floor(frameCnt / 2 % 2) + 1], popX + 263, popY + 78);
        } else {
            g.drawImage(focusImg[frameCnt % 2], popX + 105 + (focus * 70), popY - 1);
        }
        
        for (var i = 0; i < 6; i++) {
            if (i < UnitManager.getUseHeroInfo().length) {
                
//                g.drawImage(myUnitIconImg[i], 686 + ((i % 3) * 115), 254 + Math.floor(i / 3) * 116);
                g.drawImage(myUnitIconImg[i], popX + 111 + (i * 70), popY + 5);
//                g.drawImage(type_s_Img[UnitManager.getUseHeroInfo()[i].getAttr()], 674 + ((i % 3) * 115), 246 + Math.floor(i / 3) * 116);
//                for (var j = 0; j < 6; j++) {
//                    g.drawImage(starBack, 687 + ((i % 3) * 115) + (j * 15), 329 + Math.floor(i / 3) * 116);
//                }
//                for (var j = 0; j < UnitManager.getUseHeroInfo()[i].getExp(); j++) {
//                    g.drawImage(star, 687 + ((i % 3) * 115) + (j * 15), 329 + Math.floor(i / 3) * 116);
//                }
            }
        }
    };
    
    this.setPosition = function(_x, _y) {
        popX = _x;
        popY = _y - 100;
    };
    
    var setFocus = function(_focus) {
        focus = _focus;
    };
    
    return {
        toString: function() {
            return "SelectUnitPopup";
        },
        init: function(onload, callback) {
            callbackfunc = callback;
            focus = 0;
            frameCnt = 0;
            teamScore = 0;
            isMenu = false;
            
            for (var i = 0; i < UnitManager.getUseHeroInfo().length; i++) {
                teamScore = teamScore + UnitManager.getUseHeroInfo()[i].getAttack();
            }
            
            setResource(onload);
        },
        start: function() {

        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            
//            g.setColor(COLOR_POPUPBACK);
//            g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            
            g.drawImage(popup_monster_select, popX + 60, popY - 9);
            g.drawImage(button_exit_on[0], popX + 263, popY + 78);
            
//            numberFont.render(g, teamScore, 801, 198, 17, HTextRender.LEFT);

            heroRender(g);
        },
        stop: function() {
            selectBox = null;
            myUnitIconImg = null;
            myUnitImg = null;
            focusImg = null;
            popup_monster_select = null;
            num = null;
            numberFont = null;
            
            button_exit_off = null;
            button_exit_on = null;
            star = null;
            starBack = null;
            typeImg = null;
            type_s_Img = null;
            iconImg = null;
            iconAtk = null;
            lvIconArr = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    
                    if (isMenu) {
                        PopupMgr.closeAllPopup();
                    } else {
                        if (UnitManager.getUseHeroInfo()[focus] != null) {
                            if (UnitManager.getUseHeroInfo()[focus].getUsed()) {
                                PopupMgr.openPopup(appMgr.getMessage0BtnPopup("이미 배치한 영웅입니다."), null, 1500); 
                                return;
                            }
                            callbackfunc(INSTANCE, UnitManager.getUseHeroInfo()[focus]);
                        }
                    }
                    break;
                    
                case KEY_LEFT:
                    
                    focus = HTool.getIndex(focus, -1, 6);
                    
//                    if (focus % 3 <= 0) {
//                        setFocus(focus + 2);
//                    } else {
//                        setFocus(focus - 1);
//                    }
                    break;
                    
                case KEY_RIGHT:
                    
                    focus = HTool.getIndex(focus, 1, 6);
                    
//                    if (focus % 3 >= 2) {
//                        setFocus(focus - 2);
//                    } else {
//                        setFocus(focus + 1);
//                    }
                    break;
                    
                case KEY_UP:
                    isMenu = !isMenu;
                    
//                    if (isMenu) {
//                        isMenu = false;
//                        if (Math.floor(focus / 3) <= 0) {
//                            setFocus(focus + 3);                            
//                        }
//                    } else {
//                        if (Math.floor(focus / 3) <= 0) {
//                            isMenu = true;
//                        } else {
//                            setFocus(focus - 3);
//                        }
//                    }
//                    
////                    if (Math.floor(focus / 3) <= 0) {
////                        setFocus(focus + 3);
////                    } else {
////                        setFocus(focus - 3);
////                    }
                    break;
                    
                case KEY_DOWN:
                    
                    isMenu = !isMenu
                    
//                    if (isMenu) {
//                        isMenu = false;
//                        
//                        if (Math.floor(focus / 3) >= 1) {
//                            setFocus(focus - 3);
//                        }
//                    } else {
//                        if (Math.floor(focus / 3) >= 1) {
//                            isMenu = true;
//                        } else {
//                            setFocus(focus + 3);
//                        }
//                    }
//                    
//                    
////                    if (Math.floor(focus / 3) >= 1) {
////                        setFocus(focus - 3);
////                    } else {
////                        setFocus(focus + 3);
////                    }
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