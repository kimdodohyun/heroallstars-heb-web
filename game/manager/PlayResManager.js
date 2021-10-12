var PlayResManager = new function() {
  
    var etcMap;
    var myUnitMap;
    var enUnitMap;
    var moneyMap;
    var iconMap;
    
    this.setResourceForDefence = function(myInfo, enInfo, onload) {
        etcMap = new Map();
        myUnitMap = new Map();
        enUnitMap = new Map();
        
        var etc = [];
        var tmpUnit = [];
        var myUnit = [];
        var enUnit = [];
        var unitIcon = [];
        var crystal = [];
        var weapon = [];
        
        var imgParam = [
            [tmpUnit[0] = [], HTool.getURLs(ROOT_IMG, "game/etc/focus_", EXT_PNG, 3)],
            [tmpUnit[1] = new Image(), ROOT_IMG + "game/etc/cover_top" + EXT_PNG],
            [tmpUnit[2] = [], HTool.getURLs(ROOT_IMG, "game/myUnit/explo_", EXT_PNG, 5)],
            [tmpUnit[3] = new Image(), ROOT_IMG + "etc/text_upgrade" + EXT_PNG],
            [tmpUnit[4] = new Image(), ROOT_IMG + "game/etc/cover_bottom" + EXT_PNG],
            [tmpUnit[5] = [], HTool.getURLs(ROOT_IMG, "game/enUnit/d_type_", EXT_PNG , 3)],
            [tmpUnit[6] = new Image(), ROOT_IMG + "game/enUnit/debuff_dot" + EXT_PNG],
            [tmpUnit[7] = new Image(), ROOT_IMG + "game/enUnit/debuff_slow" + EXT_PNG],
            [tmpUnit[8] = new Image(), ROOT_IMG + "game/enUnit/debuff_stun" + EXT_PNG],
            [tmpUnit[9] = [], HTool.getURLs(ROOT_IMG, "game/etc/arrow_", EXT_PNG, 2)],
            [tmpUnit[10] = [], HTool.getURLs(ROOT_IMG, "game/etc/arrow2_", EXT_PNG, 2)],
            [tmpUnit[11] = [], HTool.getURLs(ROOT_IMG, "game/etc/d_effect_", EXT_PNG, 2)],
            [tmpUnit[12] = new Image(), ROOT_IMG + "game/etc/buff_fast" + EXT_PNG],
            [tmpUnit[13] = [], HTool.getURLs(ROOT_IMG, "game/etc/focus_select_", EXT_PNG, 4)],
            [tmpUnit[14] = [], HTool.getURLs(ROOT_IMG, "game/etc/up_arrow_", EXT_PNG, 2)],
            [tmpUnit[15] = new Image(), ROOT_IMG + "game/etc/up_lv" + EXT_PNG],
            [tmpUnit[16] = new Image(), ROOT_IMG + "game/etc/upgrade_back" + EXT_PNG],
            [tmpUnit[17] = [], HTool.getURLs(ROOT_IMG, "game/skill/speedUp_effect_", EXT_PNG, 3)],
            [tmpUnit[18] = [], HTool.getURLs(ROOT_IMG, "game/etc/dontsetting_", EXT_PNG, 2)],
            
            [etc[0] = new Image(), ROOT_IMG + "etc/text_start" + EXT_PNG],
            [etc[1] = new Image(), ROOT_IMG + "popup/result/stage_clear" + EXT_PNG],
            [etc[2] = new Image(), ROOT_IMG + "popup/result/game_over" + EXT_PNG],
            [etc[3] = new Image(), ROOT_IMG + "etc/text_ready" + EXT_PNG],
            [etc[4] = new Image(), ROOT_IMG + "game/etc/bar_gold" + EXT_PNG],
            [etc[5] = new Image(), ROOT_IMG + "game/etc/btn_exit_off" + EXT_PNG],
            [etc[6] = [], HTool.getURLs(ROOT_IMG, "game/etc/btn_exit_on_", EXT_PNG, 2)],
            [etc[7] = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_", EXT_PNG, 3)],
            [etc[8] = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_select_", EXT_PNG, 2)],
            [etc[9] = [], HTool.getURLs(ROOT_IMG, "game/enUnit/effect_", EXT_PNG, 6)],
            [etc[10] = new Image(), ROOT_IMG + "game/skill/skill_I" + EXT_PNG],
            [etc[11] = new Image(), ROOT_IMG + "game/etc/star_Off" + EXT_PNG],
            [etc[12] = [], HTool.getURLs(ROOT_IMG, "game/etc/unFocus_", EXT_PNG, 3)],
            [etc[13] = new Image(), ROOT_IMG + "game/etc/icon_Kill" + EXT_PNG],
            [etc[14] = new Image(), ROOT_IMG + "game/etc/btn_pause_off" + EXT_PNG],
            [etc[15] = [], HTool.getURLs(ROOT_IMG, "game/etc/btn_pause_on_", EXT_PNG, 2)],
            [etc[16] = new Image(), ROOT_IMG + "game/etc/btn_start_off" + EXT_PNG],
            [etc[17] = [], HTool.getURLs(ROOT_IMG, "game/etc/btn_start_on_", EXT_PNG, 2)],
            [etc[18] = [], HTool.getURLs(ROOT_IMG, "game/skill/wepn_15_move_", EXT_PNG, 6)],
            [etc[19] = new Image(), ROOT_IMG + "etc/skill_cooltime" + EXT_PNG],
            [etc[20] = new Image(), ROOT_IMG + "game/etc/max" + EXT_PNG],
            [etc[21] = new Image(), ROOT_IMG + "game/etc/star_On" + EXT_PNG],
            [etc[22] = new Image(), ROOT_IMG + "game/etc/gauge" + EXT_PNG],
            [etc[23] = new Image(), ROOT_IMG + "game/etc/gauge_back" + EXT_PNG],
            [etc[24] = new Image(), ROOT_IMG + "game/etc/gage_left" + EXT_PNG],
            [etc[25] = new Image(), ROOT_IMG + "game/etc/gage_middle" + EXT_PNG],
            [etc[26] = new Image(), ROOT_IMG + "game/etc/gage_right" + EXT_PNG],
            [etc[27] = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_off_", EXT_PNG, 3)],
            [etc[28] = new Image(), ROOT_IMG + "game/etc/bar_enemy" + EXT_PNG],
            [etc[29] = new Image(), ROOT_IMG + "game/etc/bar_gage" + EXT_PNG],
            [etc[30] = [], HTool.getURLs(ROOT_IMG, "game/etc/getcoin_effect_", EXT_PNG, 4)],
            [etc[31] = new Image(), ROOT_IMG + "game/etc/icon_coin" + EXT_PNG],
            [etc[32] = [], HTool.getURLs(ROOT_IMG, "game/etc/getstar_effect_", EXT_PNG, 4)],
            [etc[33] = [], HTool.getURLs(ROOT_IMG, "game/etc/burn_", EXT_PNG, 4)],
            [etc[34] = new Image(), ROOT_IMG + "game/etc/bar_message" + EXT_PNG],
            [etc[35] = new Image(), ROOT_IMG + "game/skill/slot_skill" + EXT_PNG],
            
            [crystal[0] = [], HTool.getURLs(ROOT_IMG, "game/etc/crystal_0", EXT_PNG, 7)],
            [crystal[1] = [], HTool.getURLs(ROOT_IMG, "game/etc/crystal_1", EXT_PNG, 7)],
            [crystal[2] = [], HTool.getURLs(ROOT_IMG, "game/etc/crystal_2", EXT_PNG, 7)],
            [crystal[3] = [], HTool.getURLs(ROOT_IMG, "game/etc/crystal_3", EXT_PNG, 7)],
            [crystal[4] = new Image(), ROOT_IMG + "game/etc/crystal_40" + EXT_PNG]
        ];
        
        for (var i = 0; i < enInfo.length; i++) {
            enUnit[i] = [];
            imgParam.push([enUnit[i][0] = [], HTool.getURLs(ROOT_IMG, "game/enUnit/monster/monster_" + enInfo[i].getRes() + "_r_w_", EXT_PNG, 4)]);
            imgParam.push([enUnit[i][1] = [], HTool.getURLs(ROOT_IMG, "game/enUnit/monster/monster_" + enInfo[i].getRes() + "_l_w_", EXT_PNG, 4)]);
            
            imgParam.push([enUnit[i][2] = [], HTool.getURLs(ROOT_IMG, "game/enUnit/monster/monster_" + enInfo[i].getRes() + "_r_d_", EXT_PNG, 4)]);
            imgParam.push([enUnit[i][3] = [], HTool.getURLs(ROOT_IMG, "game/enUnit/monster/monster_" + enInfo[i].getRes() + "_l_d_", EXT_PNG, 4)]);
        }
        
        for (var i = 0; i < myInfo.length; i++) {
            myUnit[i] = [];
            
            imgParam.push([myUnit[i][0] = [], HTool.getURLs(ROOT_IMG, "game/myUnit/hero/hero_" + myInfo[i].getRes() + "_r_w_", EXT_PNG, 4)]);
            imgParam.push([myUnit[i][1] = [], HTool.getURLs(ROOT_IMG, "game/myUnit/hero/hero_" + myInfo[i].getRes() + "_l_w_", EXT_PNG, 4)]);
            imgParam.push([myUnit[i][2] = [], HTool.getURLs(ROOT_IMG, "game/myUnit/hero/hero_" + myInfo[i].getRes() + "_r_a_", EXT_PNG, 4)]);
            imgParam.push([myUnit[i][3] = [], HTool.getURLs(ROOT_IMG, "game/myUnit/hero/hero_" + myInfo[i].getRes() + "_l_a_", EXT_PNG, 4)]);
            
            imgParam.push([weapon[i] = [], HTool.getURLs(ROOT_IMG, "game/myUnit/weapon/" + myInfo[i].getWeaponName() + "_", EXT_PNG, 4)]);
            
            imgParam.push([unitIcon[i] = new Image(), ROOT_IMG + "game/myUnit/icon/s_hero_" +  myInfo[i].getRes() + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            
            etcMap.put("start", etc[0]);
            etcMap.put("clear", etc[1]);
            etcMap.put("gameover", etc[2]);
            etcMap.put("ready", etc[3]);
            etcMap.put("bar_gold", etc[4]);
            
            etcMap.put("btn_exit_off", etc[5]);
            etcMap.put("btn_pause_off", etc[14]);
            etcMap.put("btn_start_off", etc[16]);
            etcMap.put("cover_top", tmpUnit[1]);
            etcMap.put("cover_bottom", tmpUnit[4]);
            
            etcMap.put("skill_Ice", etc[10]);
            etcMap.put("starOff", etc[11]);
            etcMap.put("iconKill", etc[13]);
            etcMap.put("cooltime", etc[19]);
            etcMap.put("max", etc[20]);
            etcMap.put("starOn", etc[21]);
            etcMap.put("gauge", etc[22]);
            etcMap.put("gaugeBack", etc[23]);
            etcMap.put("gage_left", etc[24]);
            etcMap.put("gage_middle", etc[25]);
            etcMap.put("gage_right", etc[26]);
            etcMap.put("bar_enemy", etc[28]);
            etcMap.put("iconCoin", etc[31]);
            etcMap.put("bar_gage", etc[29]);
            etcMap.put("bar_message", etc[34]);
            etcMap.put("slot_skill", etc[35]);
            
            for (var i = 0; i < 2; i++) {
                etcMap.put("btn_exit_on_" + i, etc[6][i]);
                etcMap.put("btn_pause_on_" + i, etc[15][i]);
                etcMap.put("btn_start_on_" + i, etc[17][i]);
                etcMap.put("uFocus_" + i, etc[8][i]);
                etcMap.put("dontsetting_" + i, tmpUnit[18][i]);
            }
            
            for (var i = 0; i < 3; i++) {
                etcMap.put("skill_off_" + i, etc[27][i]);
                myUnitMap.put("speedUp_" + i, tmpUnit[17][i]);
                myUnitMap.put("unFocus_" + i, etc[12][i]);
            }
            
            for (var i = 0; i < 4; i++) {
                etcMap.put("skill_" + i, etc[7][i]);
                myUnitMap.put("focus_select_" + i, tmpUnit[13][i]);
                etcMap.put("coin_ani_" + i, etc[30][i]);
                etcMap.put("star_ani_" + i, etc[32][i]);
                etcMap.put("burn_" + i, etc[33][i]);
            }
            
            for (var i = 0; i < 6; i++) {
                etcMap.put("wepn_15_move_" + i, etc[18][i]);
                etcMap.put("soul_a" + i, etc[9][i]);
            }
            
            for (var i = 0; i < 7; i++) {
                etcMap.put("crystal_0" + i, crystal[0][i]);
                etcMap.put("crystal_1" + i, crystal[1][i]);
                etcMap.put("crystal_2" + i, crystal[2][i]);
                etcMap.put("crystal_3" + i, crystal[3][i]);
            }
            etcMap.put("crystal_40", crystal[4]);
            
            for (var i = 0; i < myInfo.length; i++) {
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_w_0", myUnit[i][0][0]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_w_1", myUnit[i][0][1]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_w_2", myUnit[i][0][2]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_w_3", myUnit[i][0][3]);
                
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_w_0", myUnit[i][1][0]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_w_1", myUnit[i][1][1]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_w_2", myUnit[i][1][2]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_w_3", myUnit[i][1][3]);
                
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_a_0", myUnit[i][2][0]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_a_1", myUnit[i][2][1]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_a_2", myUnit[i][2][2]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_r_a_3", myUnit[i][2][3]);
                
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_a_0", myUnit[i][3][0]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_a_1", myUnit[i][3][1]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_a_2", myUnit[i][3][2]);
                myUnitMap.put("my_" + myInfo[i].getRes() + "_l_a_3", myUnit[i][3][3]);
                
                for (var j = 0; j < 4; j++) {
                    myUnitMap.put("my_" + myInfo[i].getWeaponName() + "_" + j, weapon[i][j]);    
                }
                
                myUnitMap.put("myUnitIcon_" + myInfo[i].getRes(), unitIcon[i]);
            }
            
            for (var i = 0; i < enInfo.length; i++) {
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_w_0", enUnit[i][0][0]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_w_1", enUnit[i][0][1]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_w_2", enUnit[i][0][2]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_w_3", enUnit[i][0][3]);
                
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_w_0", enUnit[i][1][0]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_w_1", enUnit[i][1][1]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_w_2", enUnit[i][1][2]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_w_3", enUnit[i][1][3]);
                
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_d_0", enUnit[i][2][0]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_d_1", enUnit[i][2][1]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_d_2", enUnit[i][2][2]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_r_d_3", enUnit[i][2][3]);
                
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_d_0", enUnit[i][3][0]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_d_1", enUnit[i][3][1]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_d_2", enUnit[i][3][2]);
                enUnitMap.put("en_" + enInfo[i].getRes() + "_l_d_3", enUnit[i][3][3]);
            }
            
            myUnitMap.put("buff_fast", tmpUnit[12]);
            
            for (var i = 0; i < 2; i++) {
                myUnitMap.put("arrow_" + i, tmpUnit[9][i]);
                myUnitMap.put("arrow2_" + i, tmpUnit[10][i]);
                myUnitMap.put("up_arrow_" + i, tmpUnit[14][i]);
                myUnitMap.put("d_effect_" + i, tmpUnit[11][i]);
            }
            
            myUnitMap.put("up_lv", tmpUnit[15]);
            myUnitMap.put("upgradeBack", tmpUnit[16]);
            
            for (var i = 0; i < 5; i++) {
                myUnitMap.put("explo_" + i, tmpUnit[2][i]);
            }
            
            myUnitMap.put("upgrade", tmpUnit[3]);
            
            for (var i = 0; i < 3; i++) {
                myUnitMap.put("focus_" + i, tmpUnit[0][i]);
                enUnitMap.put("type_" + i, tmpUnit[5][i]);
            }
            
            enUnitMap.put("debuff_dot", tmpUnit[6]);
            enUnitMap.put("debuff_slow", tmpUnit[7]);
            enUnitMap.put("debuff_stun", tmpUnit[8]);
            
            tmpUnit = null;
            enUnit = null;
            myUnit = null;
            etc = null;
            unitIcon = null;
            crystal = null;
            weapon = null;
            imgParam = null;
            
            onload();
        }, function(err) {
            appMgr.openDisconnectPopup("PlayResManager setResourceForDefence Error!!", this);
            onload();
        });
    };
    
    this.setResourceForMoney = function(onload) {
        
        moneyMap = new Map();
        iconMap = new Map();
        
        var bNum = [];
        var rNum = [];
        var yNum = [];
        var lNum = [];
        var lNum2 = [];
        var wNum = [];
        var pNum = [];
        var sNum = [];
        var wsNum = [];
        var stNum = [];
        var tmp = [];
        
        var iconArr = [];
        var lvIconArr = [];
        var moneyArr = [];
        
        var imgParam = [
            [tmp[0] = new Image(), ROOT_IMG + "number/lv" + EXT_PNG],
            [tmp[1] = new Image(), ROOT_IMG + "number/lv2_percent" + EXT_PNG],
            [tmp[2] = new Image(), ROOT_IMG + "number/stage_n_underbar" + EXT_PNG],
            [tmp[3] = new Image(), ROOT_IMG + "number/stageClear_n_plus" + EXT_PNG],
            [tmp[4] = new Image(), ROOT_IMG + "number/lv2_plus" + EXT_PNG],
            
            [iconArr[0] = new Image(), ROOT_IMG + "etc/type_s_none" + EXT_PNG],
            [iconArr[1] = new Image(), ROOT_IMG + "etc/type_s_physics" + EXT_PNG],
            [iconArr[2] = new Image(), ROOT_IMG + "etc/type_s_magic" + EXT_PNG],
            
            [moneyArr[0] = new Image(), ROOT_IMG + "etc/bar_id" + EXT_PNG],
            [moneyArr[1] = new Image(), ROOT_IMG + "etc/bar_key" + EXT_PNG],
            [moneyArr[2] = new Image(), ROOT_IMG + "etc/bar_stone_red" + EXT_PNG],
            [moneyArr[3] = new Image(), ROOT_IMG + "etc/bar_stone_blue" + EXT_PNG],
            [moneyArr[4] = new Image(), ROOT_IMG + "etc/bar_stone_black" + EXT_PNG],
            [moneyArr[5] = new Image(), ROOT_IMG + "etc/bar_coin" + EXT_PNG],
            [moneyArr[6] = new Image(), ROOT_IMG + "etc/bar_gem" + EXT_PNG],
            
            [lvIconArr = [], HTool.getURLs(ROOT_IMG, "etc/lv_icon_", EXT_PNG, 4)],
            
            [bNum = [], HTool.getURLs(ROOT_IMG, "number/b_", EXT_PNG, 10)],
            [rNum = [], HTool.getURLs(ROOT_IMG, "number/p_", EXT_PNG, 10)],
            [yNum = [], HTool.getURLs(ROOT_IMG, "number/y_", EXT_PNG, 10)],
            [lNum = [], HTool.getURLs(ROOT_IMG, "number/lv_", EXT_PNG, 10)],
            [lNum2 = [], HTool.getURLs(ROOT_IMG, "number/lv2_", EXT_PNG, 10)],
            [wNum = [], HTool.getURLs(ROOT_IMG, "number/w_", EXT_PNG, 10)],
            [pNum = [], HTool.getURLs(ROOT_IMG, "number/page_n_", EXT_PNG, 10)],
            [sNum = [], HTool.getURLs(ROOT_IMG, "number/stage_n_", EXT_PNG, 10)],
            [wsNum = [], HTool.getURLs(ROOT_IMG, "number/w_s_", EXT_PNG, 10)],
            [stNum = [], HTool.getURLs(ROOT_IMG, "number/stageClear_n_", EXT_PNG, 10)]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            moneyMap.put("lv", tmp[0]);
            moneyMap.put("percent", tmp[1]);
            moneyMap.put("stage_n_underbar", tmp[2]);
            moneyMap.put("stageClear_plus", tmp[3]);
            moneyMap.put("lv2_plus", tmp[4]);
            
            iconMap.put("type_s_none", iconArr[0]);
            iconMap.put("type_s_physics", iconArr[1]);
            iconMap.put("type_s_magic", iconArr[2]);
            
            moneyMap.put("bar_id", moneyArr[0]);
            moneyMap.put("bar_key", moneyArr[1]);
            moneyMap.put("bar_stone_red", moneyArr[2]);
            moneyMap.put("bar_stone_blue", moneyArr[3]);
            moneyMap.put("bar_stone_black", moneyArr[4]);
            moneyMap.put("bar_coin", moneyArr[5]);
            moneyMap.put("bar_gem", moneyArr[6]);
            
            for (var i = 0; i < 4; i++) {
                iconMap.put("lv_icon_" + i, lvIconArr[i]);
            }
            
            moneyMap.put("bNumFont", new NumberFontImage(bNum));
            moneyMap.put("rNumFont", new NumberFontImage(rNum));
            moneyMap.put("yNumFont", new NumberFontImage(yNum));
            moneyMap.put("lNumFont", new NumberFontImage(lNum));
            moneyMap.put("l2NumFont", new NumberFontImage(lNum2));
            moneyMap.put("wNumFont", new NumberFontImage(wNum));
            moneyMap.put("pNumFont", new NumberFontImage(pNum));
            moneyMap.put("sNumFont", new NumberFontImage(sNum));
            moneyMap.put("wsNumFont", new NumberFontImage(wsNum));
            moneyMap.put("stNumFont", new NumberFontImage(stNum));
            
            bNum = null;
            rNum = null;
            yNum = null;
            lNum = null;
            lNum2 = null;
            wNum = null;
            pNum = null;
            sNum = null;
            Num = null;
            wsNum = null;
            stNum = null;
            tmp = null;
            iconArr = null;
            lvIconArr = null;
            moneyArr = null;
            imgParam = null;

            CommonUIDrawManager.setResource(onload);
        }, function(err) {
            appMgr.openDisconnectPopup("ResourceManager setResourceForMoney Fail!!", this); 
        });
    };
    
    
    this.getEtcMap = function() {
        return etcMap;
    };
    
    this.getMyUnitMap = function() {
        return myUnitMap;
    };
    
    this.getEnUnitMap = function() {
        return enUnitMap;
    };
    
    this.getMoneyMap = function() {
        return moneyMap;
    };
    
    this.getIconMap = function() {
        return iconMap;
    };
    
    this.destroy = function() {
        if (etcMap != null) {
            etcMap.clear();
        }
        etcMap = null;
        
        if (myUnitMap != null) {
            myUnitMap.clear();
        }
        myUnitMap = null;
        
        if (enUnitMap != null) {
            enUnitMap.clear();
        }
        enUnitMap = null;
        
        if (numMap != null) {
            numMap.clear();
        }
        numMap = null;
        
        if (moneyMap != null) {
            moneyMap.clear();
        }
        moneyMap = null;
        
        if (iconMap != null) {
            iconMap.clear();
        }
        iconMap = null;
    };
};