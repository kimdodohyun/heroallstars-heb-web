var UnitManager = new function() {
  
    var myUnit = [];
    var enUnit = [];
    var tempArr = [];
    
    var useHeroInfo;
    var myUnitInfoArr;
    var enUnitInfo;
    
    var createUnitPos = [];
    
    var stageArea;
    var stageNum;
    var stageName;
    
    var starOff;
    var starOn;
    
    var iconKill;
    var gage_left;
    var gege_middle;
    var gege_right;
    
    var max;
    var lvNumFont;
    var rNumFont;
    var plus;
    var arrow;
    var arrow2;
    
    var upArrow = [];
    var upLv;
    var upgradeBack;
    var burn = [];
    
    var gauge;
    var gaugeBack;
    
    var bar_enemy;
    var bar_gage;
    var bar_gold;
    
    var btn_pause_off;
    var btn_pause_on = [];
    var cover_top;
    var cover_bottom;
    var cooltime;
    
    var nonePos = [];
    var focus = [];
    var focusUp = [];
    var selectFocus = [];
    var unFocus = [];
    var skill = [];
    var skill_off = [];
    var slot_skill;
    var giveup = [];
    var cristal = [];
    var starAni = [];
    var burnPos = [];
    var starAniCnt = [0, 0, 0];
    var skill_cooltime = [0, 0, 0];
    var skillCnt = [0, 0, 0];
    var skillRimitCnt = [2, 2, 2];
    var skillUseCnt = [0, 0, 0];
    var fireSkill = [];
    
    var focusX, focusY, frameCnt, focusIdx;
    var focusIdxX, focusIdxY;
    var endPosX, endPosY;
    
    var gageCnt = 0;
    var starGrade = 0;
    var remainAmount = 0;
    var tmpIdx = 0;
    var myUnitLen = 0;
    var enUnitLen = 0;
    var enUnitDeadCnt = 0;
    var enUnitEndCnt = 0;
    var myKillCnt = 0;
    var cristalMoveCnt = 0;
    var cristalAniCnt = 0;
    var movePos = 0;
    var rimitCnt = 5; // 몇마리 까지 나올건지
    var rimitSum = 0; // 현재 웨이브까지 합친 몬스터 수
    var rimitCntSum = 0;
    var crystalCnt = 5; // 크리스탈 카운트
    var myCrystalCnt = 0;
    var regenTime = 0;
    var startPosX = 0;
    var startPosY = 0;
    var tmpTargetIdx = 0;
    var tmpPosX = 0;
    var tmpPosY = 0;
    var wave = 0;
    var damageStack = 0;
    var waveCnt = 0;
    var isGameEnd = 0; // 0 게임중, 1 게임오버, 2 클리어
    var isMenu = false;
    var isMenuIdx = 0;
    
    
    var isKeyLock = false;
    var isFireSkill = false;
    
    var powerUpCost;
    var firstReward;
    var firstRewardAmount;
    var coinReward;
    var reward;
    var rewardAmount;
    
    this.init = function() {
        tmpIdx = 0;
        myUnitLen = 0;
        enUnitLen = 0;
        enUnitDeadCnt = 0;
        enUnitEndCnt = 0;
        myKillCnt = 0;
        tmpTargetIdx = 0;
        isGameEnd = 0;
        damageStack = 0;
        
        focusX = 0;
        focusY = 0;
        frameCnt = 0;
        focusIdx = 0;
    };
    
    this.isGameEndCheck = function() {
        
        if (enUnitLen == rimitSum) {
            if (waveCnt < wave) {
                waveCnt++;
                rimitSum = rimitSum + rimitCnt[waveCnt];
                isGameEnd = 3;
                return isGameEnd;

            }
        }
        
        if (crystalCnt <= 0) {
            isGameEnd = 1;
            return isGameEnd;
        }
        
        if (enUnitDeadCnt >= rimitCntSum) {
            isGameEnd = 2;
            return isGameEnd;
        }
        
        return isGameEnd;
    };
    
    this.getSkillUseCnt = function() {
        return skillUseCnt;
    };
    
    this.continueGame = function() {
        isGameEnd = 0;
    };
    
    this.getEnUnitEndCnt = function() {
        return enUnitEndCnt;
    };
    
    this.increaseEnUnitEndCnt = function() {
        enUnitEndCnt++;
    };
    
    this.getRimitCnt = function() {
        return rimitSum;
    };
    
    this.getRegenTime = function() {
        return regenTime;
    };
    
    this.setUseHeroInfo = function(useHero) {
        useHeroInfo = useHero
    };
    
    this.getUseHeroInfo = function() {
        return useHeroInfo;
    };
    
    this.getMyUnitInfoArr = function() {
        return myUnitInfoArr;
    };
    
    this.getEnUnitInfo = function() {
        return enUnitInfo;
    };
    
    this.setUnitUsed = function(_index) {
        myUnitInfo[_index].setUsed(true);
    };
    
    this.getUnitUsed = function(_index) {
        return myUnitInfo[_index].getUsed();
    };
    
    this.setStageArea = function(_area) {
        stageArea = _area;
    };
    
    this.setStageNum = function(_num) {
        stageNum = _num;
    };
    
    this.getStageArea = function() {
        return stageArea;
    };
    
    this.getStageNum = function() {
        return stageNum;
    };
    
    this.getStageName = function() {
        return stageName;
    };
    
    this.getStartPosX = function() {
        return startPosX;
    };
    
    this.getStartPosY = function() {
        return startPosY;
    };
    
    this.setCreateUnitPos = function(_unitPos) {
        createUnitPos = _unitPos;
    };
    
    this.getIsFireSkill = function() {
        return isFireSkill;
    };
    
    this.getSkillCnt = function(_index) {
        return skillCnt[_index];
    };
    
    this.setSkillCnt = function(_index, amount) {
        skillCnt[_index] = amount;
    };
    
    this.getStarGrade = function() {
        
        starGrade = -1;
        
        if (myKillCnt >= (rimitCntSum * 50 / 100)) {
            starGrade = 0;
        }
        
        if (myKillCnt >= (rimitCntSum * 70 / 100)) {
            starGrade = 1;
        }
        
        if (myKillCnt == rimitCntSum) {
            starGrade = 2;
        }
        
        return starGrade;
    };
    
    this.setFocusIdx = function(_focusIdx) {
        focusIdx = _focusIdx;
        focusIdxY = Math.floor((focusIdx / 22));
        focusIdxX = focusIdx - (focusIdxY * 22);
        focusY = focusIdxY * 57 + 145;
        focusX = focusIdxX * 60 + 10;
    };
    
    this.getNonePos = function() {
        return nonePos;
    };
    
    var convertPos = function(_pos) {
        
        var posXX, posYY, pos;
        var poss = [];
        poss[0] = [];
        poss[1] = [];
        
        pos = _pos;
        for (var i = 0; i < pos.length; i++) {
            posYY = Math.floor((pos[i] / 22));
            posXX = pos[i] - (posYY * 22);
            poss[0][i] = posYY * 57 + 141;
            poss[1][i] = posXX * 60 + 10;
        }
        
        return poss;
    };
    
    this.getCoinReward = function() {
        return coinReward;
    };
    
    this.getFirstReward = function() {
        return firstReward;
    };
    
    this.getFirstRewardAmount = function() {
        return firstRewardAmount;
    }
    
    this.getReward = function() {
        return reward;
    };
    
    this.getRewardAmount = function() {
        return rewardAmount;
    };
    
    this.setRaid = function(onload) {
        var raidJson;
        raidJson = HeroManager.getRaidJson();
        enUnitInfo = [];
        
        var obj = raidJson[0];
        stageName = obj.stageName;
        
        var destiPos = convertPos(obj.destiPos);
        var endPos = convertPos(obj.endPos);
        
        for (var i = 0; i < obj.res.length; i++) {
            enUnitInfo[i] = new StageInfo(obj.res[i], obj.hp[i], obj.moveSpd[i], obj.type, obj.attr[i], destiPos[1], destiPos[0], endPos[1], endPos[0], obj.name);
        }
        
        rimitCnt = [];
        rimitCntSum = 0;
        
        for (var i = 0; i < obj.rimitCnt.length; i++) {
            rimitCnt[i] = Number(obj.rimitCnt[i]);
            rimitCntSum = rimitCntSum + Number(obj.rimitCnt[i]);
        }
        
        myCrystalCnt = Number(obj.crystalCnt);
        crystalCnt = myCrystalCnt;
        regenTime = Number(obj.regenTime);
        startPosX = Number(obj.startPosX);// * 60 + 10;
        startPosY = Number(obj.startPosY);// * 57 + 35;
        
        
        powerUpCost = Number(obj.powerUpCost);
        coinReward = Number(obj.coinReward);
        
        firstReward = obj.firstReward;
        firstRewardAmount = Number(obj.firstRewardAmount);
        
        reward = obj.reward;
        rewardAmount = obj.rewardAmount;
        
        
        endPosX = endPos[1][0];
        endPosY = endPos[0][0] + 20;
        wave = 0;
        wave = obj.res.length - 1;
        waveCnt = 0;
        rimitSum = 0;
        rimitSum = rimitSum + rimitCnt[waveCnt];
        isGameEnd = 0;
        enUnitDeadCnt = 0;
        enUnitEndCnt = 0;
        myKillCnt = 0;
        cristalMoveCnt = 10;
        cristalAniCnt = 0;
        movePos = 0;
        isKeyLock = false;
        isMenu = false;
        isMenuIdx = 0;
        starGrade = 0;
        
        gageCnt = 325 / rimitCntSum;
        
        nonePos = obj.nonePos;
        burnPos = convertPos(nonePos);
        
        focusIdxX = 0;
        focusIdxY = 0;
        
        focusX = focusIdxX * 60 + 10;
        focusY = focusIdxY * 57 + 145;
        
        for (var i = 0; i < 3; i++) {
            skill_cooltime[i] = 0;
            skillUseCnt[i] = 0;
            starAniCnt[i] = 0;
        }
        
        CommonUIDrawManager.setGameMoney();
        
        onload();
    };
    
    this.setStage = function(onload) {
        var stageJson;
        stageJson = HeroManager.getStageJson();
        enUnitInfo = [];
        
        var obj = stageJson[(stageArea * 10) + stageNum];
        stageName = obj.stageName;
        
        var destiPos = convertPos(obj.destiPos);
        var endPos = convertPos(obj.endPos);
        
        for (var i = 0; i < obj.res.length; i++) {
            enUnitInfo[i] = new StageInfo(obj.res[i], obj.hp[i], obj.moveSpd[i], obj.type, obj.attr[i], destiPos[1], destiPos[0], endPos[1], endPos[0], obj.name);
        }
        
        rimitCnt = [];
        rimitCntSum = 0;
        
        for (var i = 0; i < obj.rimitCnt.length; i++) {
            rimitCnt[i] = Number(obj.rimitCnt[i]);
            rimitCntSum = rimitCntSum + Number(obj.rimitCnt[i]);
        }
        
        myCrystalCnt = Number(obj.crystalCnt);
        crystalCnt = myCrystalCnt;
        regenTime = Number(obj.regenTime);
        startPosX = Number(obj.startPosX);// * 60 + 10;
        startPosY = Number(obj.startPosY);// * 57 + 35;
        
        
        powerUpCost = Number(obj.powerUpCost);
        coinReward = Number(obj.coinReward);
        
        firstReward = obj.firstReward;
        firstRewardAmount = Number(obj.firstRewardAmount);
        
        reward = obj.reward;
        rewardAmount = obj.rewardAmount;
        
        
        endPosX = endPos[1][0];
        endPosY = endPos[0][0] + 20;
        wave = 0;
        wave = obj.res.length - 1;
        waveCnt = 0;
        rimitSum = 0;
        rimitSum = rimitSum + rimitCnt[waveCnt];
        isGameEnd = 0;
        enUnitDeadCnt = 0;
        enUnitEndCnt = 0;
        myKillCnt = 0;
        cristalMoveCnt = 10;
        cristalAniCnt = 0;
        movePos = 0;
        isKeyLock = false;
        isMenu = false;
        isMenuIdx = 0;
        starGrade = 0;
        
        gageCnt = 325 / rimitCntSum;
        
        nonePos = obj.nonePos;
        burnPos = convertPos(nonePos);
        
        focusIdxX = 0;
        focusIdxY = 0;
        
        focusX = focusIdxX * 60 + 10;
        focusY = focusIdxY * 57 + 145;
        
        for (var i = 0; i < 3; i++) {
            skill_cooltime[i] = 0;
            skillUseCnt[i] = 0;
            starAniCnt[i] = 0;
        }
        
        CommonUIDrawManager.setGameMoney();
        
        onload();
    };
    
    this.createMyUnitInit = function() {
        
        fireSkill = [];
        for (var i = 0; i < 280; i++) {
            fireSkill[i] = new FireSkillAction();
            fireSkill[i].setResource();
        }
        
        myUnit = [];
        myUnitLen = 0;
        
        myUnitInfoArr = new ArrayList();
        focus = [];
        giveup = [];
        focusUp = [];
        skill = [];
        skill_off = [];
        cristal = [];
        arrow = [];
        arrow2 = [];
        unFocus = [];
        selectFocus = [];
        upArrow = [];
        starAni = [];
        burn = [];
        btn_pause_on = [];
        
        cooltime = PlayResManager.getEtcMap().get("cooltime");
        starOff = PlayResManager.getEtcMap().get("starOff");
        starOn = PlayResManager.getEtcMap().get("starOn");
        bar_enemy = PlayResManager.getEtcMap().get("bar_enemy");
        bar_gage = PlayResManager.getEtcMap().get("bar_gage");
        bar_gold = PlayResManager.getEtcMap().get("bar_gold");
        
        btn_pause_off = PlayResManager.getEtcMap().get("btn_pause_off");
        cover_top = PlayResManager.getEtcMap().get("cover_top");
        cover_bottom = PlayResManager.getEtcMap().get("cover_bottom");
        slot_skill = PlayResManager.getEtcMap().get("slot_skill");
        
        for (var i = 0; i < 2; i++) {
            
            btn_pause_on[i] = PlayResManager.getEtcMap().get("btn_pause_on_" + i);
            focus[i] = PlayResManager.getEtcMap().get("uFocus_" + i);
            giveup[i] = PlayResManager.getEtcMap().get("giveup_" + (i + 1));
            arrow[i] = PlayResManager.getMyUnitMap().get("arrow_" + i);
            arrow2[i] = PlayResManager.getMyUnitMap().get("arrow2_" + i);
            upArrow[i] = PlayResManager.getMyUnitMap().get("up_arrow_" + i);
        }
        for (var i = 0; i < 3; i++) {
            focusUp[i] = PlayResManager.getMyUnitMap().get("focus_" + i);
            unFocus[i] = PlayResManager.getMyUnitMap().get("unFocus_" + i);
        }
        for (var i = 0; i < 3; i++) {
            skill[i] = PlayResManager.getEtcMap().get("skill_" + i);
            skill_off[i] = PlayResManager.getEtcMap().get("skill_off_" + i);
        }
        for (var i = 0; i < 5; i++) {
            cristal[i] = [];
            if (i == 4) {
                cristal[i] = PlayResManager.getEtcMap().get("crystal_40");
            } else {
                for (var j = 0; j < 7; j++) {
                    cristal[i][j] = PlayResManager.getEtcMap().get("crystal_" + i + j);
                }
            }
        }
        
        for (var i = 0; i < 4; i++) {
            selectFocus[i] = PlayResManager.getMyUnitMap().get("focus_select_" + i);
            starAni[i] = PlayResManager.getEtcMap().get("star_ani_" + i);
            burn[i] = PlayResManager.getEtcMap().get("burn_" + i);
        }
        
        iconKill = PlayResManager.getEtcMap().get("iconKill");
        gage_left = PlayResManager.getEtcMap().get("gage_left");
        gage_middle = PlayResManager.getEtcMap().get("gage_middle");
        gage_right = PlayResManager.getEtcMap().get("gage_right");
        
        upLv = PlayResManager.getMyUnitMap().get("up_lv");
        upgradeBack = PlayResManager.getMyUnitMap().get("upgradeBack");
        
        max = PlayResManager.getEtcMap().get("max");
        lvNumFont = PlayResManager.getMoneyMap().get("l2NumFont");
        rNumFont = PlayResManager.getMoneyMap().get("rNumFont");
        plus = PlayResManager.getMoneyMap().get("lv2_plus");
        
        gauge = PlayResManager.getEtcMap().get("gauge");
        gaugeBack = PlayResManager.getEtcMap().get("gaugeBack");
        
        for (var i = 0; i < 3; i++) {
            skill_cooltime[i] = skill[0].height;
        }
    };
    
    this.readyMyUnit = function(_unitInfo, _posX, _posY, _focusIdx) {
        
        var arrSize = myUnitInfoArr.size();
        var unit = [];
        unit[0] = PlayResManager.getMyUnitMap().get("my_" + _unitInfo.getRes() + "_r_w_0");
        unit[1] = _posX;
        unit[2] = _posY;
        unit[3] = _unitInfo;
        unit[4] = _focusIdx;
        unit[5] = PlayResManager.getMyUnitMap().get("myUnitIcon_" + _unitInfo.getRes());
        
        unit[6] = _unitInfo.getAttackRange();
        unit[7] = _posX - unit[6];
        unit[8] = _posY - unit[6];
        
        myUnitInfoArr.add(unit);
        _unitInfo.setUsed(true);
    };
    
    this.removeMyUnit = function(_index) {
        for (var i = 0; i < myUnitInfoArr.size(); i++) {
            if (_index == myUnitInfoArr.get(i)[4]) {
                myUnitInfoArr.get(i)[3].setUsed(false);
                myUnitInfoArr.removeIndex(i);
            }    
        }
    };
    
    this.createEnUnitInit = function() {
        enUnit = [];
        enUnitLen = 0;
        enUnitEndCnt = 0;
    };
    
    var tempUnit = function(_posX, _posY, _info, _type) {
        var posX = _posX;
        var posY = _posY;
        var info = _info;
        var type = _type;
        
        this.getPosX = function() {
            return posX;
        };
        
        this.getPosY = function() {
            return posY;
        };
        
        this.getInfo = function() {
            return info;
        };
        
        this.getType = function() {
            return type;
        };
    };
    
    this.createMyUnit = function() {
        
        tempArr = [];
        
        for (var i = 0; i < myUnitInfoArr.size(); i++) {
            tempArr[i] = new tempUnit(myUnitInfoArr.get(i)[1], myUnitInfoArr.get(i)[2], myUnitInfoArr.get(i)[3], myUnitInfoArr.get(i)[3].getType());
        }
        
        var temp;
        for(var i = 0; i < tempArr.length - 1; i++) {
            for(var j = 0; j < tempArr.length - i - 1; j++) {
                if(tempArr[j].getPosY() > tempArr[j + 1].getPosY()) {
                    temp = tempArr[j];
                    tempArr[j] = tempArr[j + 1];
                    tempArr[j + 1] = temp;
                    
                    temp = createUnitPos[j];
                    createUnitPos[j] = createUnitPos[j + 1];
                    createUnitPos[j + 1] = temp;
                }
            }
        }
        
        var temp2;
        for(var i = 0; i < tempArr.length - 1; i++) {
            for(var j = 0; j < tempArr.length - i - 1; j++) {
                if(tempArr[j].getPosX() < tempArr[j + 1].getPosX()) {
                    temp2 = tempArr[j];
                    tempArr[j] = tempArr[j + 1];
                    tempArr[j + 1] = temp2;
                    
                    temp2 = createUnitPos[j];
                    createUnitPos[j] = createUnitPos[j + 1];
                    createUnitPos[j + 1] = temp2;
                }
            }
        }
        
        
        for (var i = 0; i < tempArr.length; i++) {
//            console.error("tempPs 2 >> " + tempArr[i].getInfo().name);
            myUnitLen = myUnit.length;
            switch (tempArr[i].getType()) {
                case 0:
                    myUnit[i] = new MeleeUnit(tempArr[i].getPosX(), tempArr[i].getPosY(), tempArr[i].getInfo(), powerUpCost);
                    break;
                case 1:
                    myUnit[i] = new RangeUnit(tempArr[i].getPosX(), tempArr[i].getPosY(), tempArr[i].getInfo(), powerUpCost);
                    break;
                default:
                    break;
            }
            myUnitLen = myUnit.length;
        }
    };
    
    this.createEnUnit = function() {
        enUnitLen = enUnit.length;
        enUnit[enUnitLen] = new EnemyUnit(startPosX, startPosY, enUnitInfo[waveCnt]);
        
        tmpPosX = enUnitInfo[waveCnt].getDestiPosX()[0];
        tmpPosY = enUnitInfo[waveCnt].getDestiPosY()[0];
        
        enUnit[enUnitLen].setDestinationPosX(tmpPosX);
        enUnit[enUnitLen].setDestinationPosY(tmpPosY);
        
        enUnitLen = enUnit.length;
    };
    
    this.getCreateUnitIndex = function() {
        return myUnitLen - 1;
    };
    
    this.setEnDeadCnt = function() {
        enUnitDeadCnt++;
    };
    
    this.getEnDeadCnt = function() {
        return enUnitDeadCnt;
    };
    
    var splashSkill = function(myIdx, skill) {
        
        for (var idx = 0; idx < enUnit.length; idx++) {
            
            if ((enUnit[idx].getPositionX() + Math.floor(enUnit[idx].getWidth() / 2)) >= (myUnit[myIdx].getPurposeX() + Math.floor(myUnit[myIdx].getPurposeW() / 2)) - myUnit[myIdx].getSplashRange() &&
                    (enUnit[idx].getPositionX() + Math.floor(enUnit[idx].getWidth() / 2)) <= (myUnit[myIdx].getPurposeX() + Math.floor(myUnit[myIdx].getPurposeW() / 2)) + myUnit[myIdx].getSplashRange() &&
                    (enUnit[idx].getPositionY() + Math.floor(enUnit[idx].getHeight() / 2)) >= (myUnit[myIdx].getPurposeY() + Math.floor(myUnit[myIdx].getPurposeH() / 2)) - myUnit[myIdx].getSplashRange() &&
                    (enUnit[idx].getPositionY() + Math.floor(enUnit[idx].getHeight() / 2)) <= (myUnit[myIdx].getPurposeY() + Math.floor(myUnit[myIdx].getPurposeH() / 2)) + myUnit[myIdx].getSplashRange()) {
            

                switch (skill) {
                    case SKILL_SPLASH:
                        attackCase(idx, myIdx);
                        break;
                    case SKILL_SPLASH_STUN:
                        enUnit[idx].setState(STATE_STUN);
                        attackCase(idx, myIdx);
                        break;
                    case SKILL_SPLASH_DOTDAM:
                        enUnit[idx].setDotDam(35 / 100 * myUnit[myIdx].getAttackDamage());
                        break;
                    case SKILL_SPLASH_SLOW:
                        enUnit[idx].setSlow();
                        attackCase(idx, myIdx);
                        break;
                }
            }
        }
    };
    
    this.raidDamageStack = function(_damage) {
        damageStack += Math.floor(_damage);
        console.error("damageStack >> " + damageStack);
    };
    
    this.getDamageStack = function() {
        return damageStack;
    };
    
    var attackCase = function(eIdx, mIdx) {
        
        switch (myUnit[mIdx].getAttr()) {
            case 0:
                
                if (enUnit[eIdx].getAttr() != 0) {
                    if (Math.floor(Math.random() * 100) < myUnit[mIdx].getCritical()) {
                        enUnit[eIdx].setShot();
                        enUnit[eIdx].setHPValue(myUnit[mIdx].getAttackDamage() * 2);
                        UnitManager.raidDamageStack(myUnit[mIdx].getAttackDamage() * 2);
                    } else {
                        enUnit[eIdx].setShot();
                        enUnit[eIdx].setHPValue(myUnit[mIdx].getAttackDamage());
                        UnitManager.raidDamageStack(myUnit[mIdx].getAttackDamage());
                    }
                }
                break;
            case 1:
                if (enUnit[eIdx].getAttr() != 1) {
                    if (Math.floor(Math.random() * 100) < myUnit[mIdx].getCritical()) {
                        enUnit[eIdx].setShot();
                        enUnit[eIdx].setHPValue(myUnit[mIdx].getAttackDamage() * 2);
                        UnitManager.raidDamageStack(myUnit[mIdx].getAttackDamage() * 2);
                    } else {
                        enUnit[eIdx].setShot();
                        enUnit[eIdx].setHPValue(myUnit[mIdx].getAttackDamage());
                        UnitManager.raidDamageStack(myUnit[mIdx].getAttackDamage());
                    }    
                }
                break;
            case 2:
                if (enUnit[eIdx].getAttr() != 2) {
                    if (Math.floor(Math.random() * 100) < myUnit[mIdx].getCritical()) {
                        enUnit[eIdx].setShot();
                        enUnit[eIdx].setHPValue(myUnit[mIdx].getAttackDamage() * 2);
                        UnitManager.raidDamageStack(myUnit[mIdx].getAttackDamage() * 2);
                    } else {
                        enUnit[eIdx].setShot();
                        enUnit[eIdx].setHPValue(myUnit[mIdx].getAttackDamage());
                        UnitManager.raidDamageStack(myUnit[mIdx].getAttackDamage());
                    }    
                }
                break;
            default:
                break;
        }
    };
    
    var attackAction = function(myIdx) {
        
        if (myUnit[myIdx].getIsAttack()) {
            tmpTargetIdx = myUnit[myIdx].getTargetEnemyIndex();
            myUnit[myIdx].unitAttackCheck(enUnit[tmpTargetIdx].getPositionX(), enUnit[tmpTargetIdx].getPositionY(), enUnit[tmpTargetIdx].getWidth(), enUnit[tmpTargetIdx].getHeight());
            
            if (myUnit[myIdx].getIsHit()) {
                if (myUnit[myIdx].getIsSkillCoolTime()) {
                    myUnit[myIdx].setSkillCoolTime();
                    switch (myUnit[myIdx].getSkill()) {
                        case SKILL_STUN:
                            enUnit[tmpTargetIdx].setState(STATE_STUN);
                            attackCase(tmpTargetIdx, myIdx);
                            break;
                        case SKILL_DOTDAM:
                            enUnit[tmpTargetIdx].setDotDam(20 / 100 * myUnit[myIdx].getAttackDamage());
                            break;
                        case SKILL_SLOW:
                            enUnit[tmpTargetIdx].setSlow();
                            attackCase(tmpTargetIdx, myIdx);
                            break;
                        case SKILL_SPLASH:
                            splashSkill(myIdx, SKILL_SPLASH);
                            break;
                        case SKILL_SPLASH_STUN:
                            splashSkill(myIdx, SKILL_SPLASH_STUN);
                            break;
                        case SKILL_SPLASH_DOTDAM:
                            splashSkill(myIdx, SKILL_SPLASH_DOTDAM);
                            break;
                        case SKILL_SPLASH_SLOW:
                            splashSkill(myIdx, SKILL_SPLASH_SLOW);
                            break;
                        default:
                            attackCase(tmpTargetIdx, myIdx);
                            break;
                    }
                } else {
                    attackCase(tmpTargetIdx, myIdx);
                }
            }

            if (enUnit[tmpTargetIdx].getIsDead()) {
                if (tmpTargetIdx == myUnit[myIdx].getTargetEnemyIndex()) {
                    myUnit[myIdx].setIsAttack(false);
                    myUnit[myIdx].setIsHit(false);
                    myUnit[myIdx].unitDataRefresh();
                }
            }
        }
    };
    
    this.updateMyUnit = function() {
        for (var myIdx = 0; myIdx < myUnitLen; myIdx++) {
            myUnit[myIdx].update();
            
            for (var enIdx = 0; enIdx < enUnitLen; enIdx++) {
                if (!myUnit[myIdx].getIsAttack()) {
                    if (!enUnit[enIdx].getIsDead() && myUnit[myIdx].unitAttackCheck(enUnit[enIdx].getPositionX(), enUnit[enIdx].getPositionY(), enUnit[enIdx].getWidth(), enUnit[enIdx].getHeight())) {
                        myUnit[myIdx].setTargetEnemyIndex(enIdx);
                    }
                }
            }
            attackAction(myIdx);
        }
    };
    
    this.updateEnUnit = function() {
        for (var enIdx = 0; enIdx < enUnitLen; enIdx++) {
            enUnit[enIdx].update();
            
            if (!enUnit[enIdx].getIsDead() && enUnit[enIdx].unitAttackCheck(endPosX - Math.floor(cristal[4].width / 2), endPosY - cristal[4].height, cristal[4].width, cristal[4].height) && enUnit[enIdx].getIsAttack()) {
                crystalCnt--;
                cristalMoveCnt = 0;
                this.unitDeadCnt();
                enUnit[enIdx].setIsAttack(false);
            }
        }
        
        for (var i = 0; i < 3; i++) {
            if (skill_cooltime[i] < skill[0].height) {
                if (Math.floor(frameCnt % 6) == 0) {
                    skill_cooltime[i]++;
                }
            }
        }
    };
    
    this.upgradeMyUnit = function(_index) {
        myUnit[_index].upgrade();
        isKeyLock = false;
    };
    
    this.skillActionFire = function() {
        for (var i = 0; i < fireSkill.length; i++) {
            fireSkill[i].setSkill(i);
        }
        isFireSkill = true;
        skill_cooltime[0] = 0;
    };
    
    var skillActionFireCall = function() {
        for (var i = 0; i < enUnit.length; i++) {
            // todo
            enUnit[i].setHPValue(Math.floor(enUnit[i].getHpValue() * 20 / 100));
        }
        isFireSkill = false;
        isKeyLock = false;
    };
    
    this.skillActionFrozen = function() {
        for (var i = 0; i < enUnit.length; i++) {
            enUnit[i].setState(STATE_STUN);
        }
        isKeyLock = false;
        skill_cooltime[1] = 0;
    };
    
    this.skillActionFast = function() {
        for (var i = 0; i < myUnit.length; i++) {
            myUnit[i].setFast();
        }
        isKeyLock = false;
        skill_cooltime[2] = 0;
    };
    
    this.unitDeadCnt = function() {
        enUnitDeadCnt++;
    };
    
    this.unitKillCnt = function() {
        myKillCnt++;
    };
    
    this.getMyKillCnt = function() {
        return myKillCnt;
    };
    
    this.skillRender = function(g) {
        if (fireSkill[fireSkill.length - 1].getIsSkill()) {
            g.setColor(COLOR_POPUPBACK);
            g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            
            
            for (var i = 0; i < nonePos.length; i++) {
                g.drawImage(burn[frameCnt % 4], burnPos[1][i] - 30, burnPos[0][i] - 50);
            }
        }
        
        for (var i = 0; i < fireSkill.length; i++) {
            if (i == fireSkill.length - 1) {
                fireSkill[i].render(g, function() {
                    skillActionFireCall();    
                });
            } else {
                fireSkill[i].render(g);
            }
        }
    };
    
    this.render = function(g) {
        
        if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
            g.drawImage(bar_enemy, 326, 6);
            g.drawImage(bar_gage, 445, 8);
            g.drawImage(bar_gold, 818, 8);

            CommonUIDrawManager.renderMoneyForGame(g);

            if (myKillCnt == rimitCntSum) {
                g.drawImage(gage_middle, 461, 13, 325, 28);
                g.drawImage(gage_right, 461 + 325, 13, 6, 28);
            } else {
                g.drawImage(gage_middle, 461, 13, (myKillCnt * gageCnt), 28);
                g.drawImage(gage_right, 461 + (myKillCnt * gageCnt), 13, 6, 28);
            }

            if (myKillCnt >= (rimitCntSum * 50 / 100)) {
                g.drawImage(starOn, 448 + (gageCnt * (rimitCntSum * 50 / 100)), 6);
                if (starAniCnt[0] < 4) {
                    g.drawImage(starAni[starAniCnt[0]], 423 + (gageCnt * (rimitCntSum * 50 / 100)), -21);
                    starAniCnt[0]++;
                }
            } else {
                g.drawImage(starOff, 448 + (gageCnt * (rimitCntSum * 50 / 100)), 6);
            }

            if (myKillCnt >= (rimitCntSum * 70 / 100)) {
                g.drawImage(starOn, 448 + (gageCnt * (rimitCntSum * 70 / 100)), 6);
                if (starAniCnt[1] < 4) {
                    g.drawImage(starAni[starAniCnt[1]], 423 + (gageCnt * (rimitCntSum * 70 / 100)), -21);
                    starAniCnt[1]++;
                }
            } else {
                g.drawImage(starOff, 448 + (gageCnt * (rimitCntSum * 70 / 100)), 6);
            }

            if (myKillCnt == rimitCntSum) {
                g.drawImage(starOn, 448 + (gageCnt * rimitCntSum), 6);
                if (starAniCnt[2] < 4) {
                    g.drawImage(starAni[starAniCnt[2]], 423 + (gageCnt * rimitCntSum), -21);
                    starAniCnt[2]++;
                }
            } else {
                g.drawImage(starOff, 448 + (gageCnt * rimitCntSum), 6);
            }
        } else if (GameEngine.getGameMode() == GAME_MODE_RAID) {
            g.drawImage(bar_gage, 445, 8);
            rNumFont.render(g, damageStack, 471, 18, 16, HTextRender.LEFT);
        }
        
        for (var enIdx = enUnitLen; enIdx >= 0; enIdx--) {
            if (enUnit[enIdx] != null) {
                enUnit[enIdx].render(g);
            }
        }
        
        for (var myIdx = 0; myIdx < myUnitLen; myIdx++) {
            myUnit[myIdx].render(g);
        }
        
        if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
            g.drawImage(iconKill, 429, 8);
            rNumFont.render(g, (rimitCntSum - enUnitEndCnt), 385, 18, 16, HTextRender.CENTER);
            rNumFont.render(g, myKillCnt, 471, 18, 16, HTextRender.LEFT);
        }
    };
    
    this.ready2Render = function(g) {
        if (myUnitInfoArr.size() > 0) {
            for (var i = 0; i < myUnitInfoArr.size(); i++) {
                g.drawImage(unFocus[Math.floor(frameCnt / 3 % 3)], myUnitInfoArr.get(i)[1] - (focusUp[0].width / 2), myUnitInfoArr.get(i)[2] - (focusUp[0].height) + 25);
            }
        }
    };
    
    this.readyRender = function(g) {
        if (myUnitInfoArr.size() > 0) {
            for (var i = 0; i < myUnitInfoArr.size(); i++) {
                g.drawImage(myUnitInfoArr.get(i)[0], myUnitInfoArr.get(i)[1] - myUnitInfoArr.get(i)[0].width / 2, myUnitInfoArr.get(i)[2] - myUnitInfoArr.get(i)[0].height);
                g.setColor(COLOR_ALPHA);
                HDrawMgr.drawCircle(g, myUnitInfoArr.get(i)[7], myUnitInfoArr.get(i)[8] - 20, (myUnitInfoArr.get(i)[6] * 2), (myUnitInfoArr.get(i)[6] * 2), myUnitInfoArr.get(i)[6]);
            }
        }
    };
    
    this.upgradeRender = function(g) {
        for (var myIdx = 0; myIdx < myUnitLen; myIdx++) {
            
            if (myUnit[myIdx].getUpgradePoint() >= 20) {
                g.drawImage(max, myUnit[myIdx].myPosX + myUnit[myIdx].unitWidth / 2 - max.width / 2, myUnit[myIdx].myPosY + myUnit[myIdx].unitHeight + 2);
            } else {
                lvNumFont.renderWithIcon(g, myUnit[myIdx].getUpgradePoint(), myUnit[myIdx].myPosX + myUnit[myIdx].unitWidth / 2, myUnit[myIdx].myPosY + myUnit[myIdx].unitHeight, 15, upLv, 20, 0, HTextRender.CENTER);
                
                remainAmount = CommonUIDrawManager.checkPrice("GOLD", myUnit[myIdx].getPowerUpGold());
                if (remainAmount < 0) {
                } else {
                    g.drawImage(upArrow[Math.floor(frameCnt / 2 % 2)], myUnit[myIdx].myPosX + myUnit[myIdx].unitWidth / 2 - 40, myUnit[myIdx].myPosY + myUnit[myIdx].unitHeight - 30);
                }
            }
        }
        
        if (!isMenu) {
            for (var i = 0; i < createUnitPos.length; i++) {
                if (createUnitPos[i] == focusIdx) {
                    g.setColor(COLOR_BLACK);
                    g.setFont(FONT_20);
                    if (myUnit[i].getUpgradePoint() < 20) {
                        g.drawImage(upgradeBack, myUnit[i].myPosX + myUnit[i].unitWidth / 2 + 20, myUnit[i].myPosY + myUnit[i].unitHeight - 70);
                        HTextRender.oriRenderUp(g, myUnit[i].getPowerUpGold(), myUnit[i].myPosX + 75 + myUnit[i].unitWidth / 2, myUnit[i].myPosY - 48 + myUnit[i].unitHeight, HTextRender.CENTER);
                    }
                }   
            }
        }
    };
    
    this.iconRender = function(g) {
        
        frameCnt++;
        
        for (var myIdx = 0; myIdx < myUnitLen; myIdx++) {
            g.drawImage(unFocus[Math.floor(frameCnt / 3 % 3)], myUnitInfoArr.get(myIdx)[1] - (focusUp[0].width / 2), myUnitInfoArr.get(myIdx)[2] - (focusUp[0].height) + 25);
        }
        
        for (var i = 0; i < 3; i++) {
            
            g.drawImage(slot_skill, 536 + (i * 70), 640);
            g.drawImage(skill[i], 544 + (i * 70), 647);
            if (skillCnt[i] == 0 || skill_cooltime[i] < skill[i].height || skillUseCnt[i] == skillRimitCnt[i]) {
                g.drawImage(skill_off[i], 544 + (i * 70), 647);
            }
            
            if (GameEngine.getGameMode() == GAME_MODE_RAID) {
                g.drawImage(skill_off[0], 544, 647);
            }
            
            lvNumFont.render(g, skillCnt[i], 580 + (i * 70), 652, 11, HTextRender.CENTER);
            
            if (skillUseCnt[i] < skillRimitCnt[i]) {
                g.save();
                g.beginPath();
                g.rect(544 + (i * 70), 647 + skill_cooltime[i], skill[0].width, skill[0].height);
                g.closePath();
                g.clip();
                g.drawImage(cooltime, 544 + (i * 70), 647, skill[0].width, skill[0].height);
                g.restore();
            }
        }
        
        if (isMenu) {
            switch (isMenuIdx) {
                case 0:
                case 1:
                case 2:
                    g.drawImage(focus[Math.floor(frameCnt / 2 % 2)], 536 + (isMenuIdx * 70), 639);
                    break;
                case 3:
                    g.drawImage(btn_pause_on[Math.floor(frameCnt / 2 % 2)], 1200, 640);
                    break;
            }
        } else {
            if (GameEngine.getGameMode() == GAME_MODE_DEFENCE || GameEngine.getGameMode() == GAME_MODE_RAID) {
                g.drawImage(focusUp[Math.floor(frameCnt / 3 % 3)], focusX - (focusUp[0].width / 2), focusY - (focusUp[0].height) + 25);
                g.drawImage(selectFocus[Math.floor(frameCnt / 4 % 4)], focusX - (selectFocus[0].width / 2), focusY - (selectFocus[0].height) + 31);
            }
        }
        
        if (cristalMoveCnt < 10) {
            cristalMoveCnt++;
            
            if (cristalMoveCnt % 2 == 0) {
                movePos+=1;
            } else {
                movePos-=1;
            }
        }
        
        g.drawImage(gaugeBack, endPosX - gaugeBack.width / 2, endPosY);
        cristalAniCnt++;
        if (crystalCnt == myCrystalCnt) {
            
            g.drawImage(cristal[0][Math.floor(cristalAniCnt / 2 % 7)], endPosX - (cristal[4].width / 2) + movePos, endPosY - (cristal[4].height));
            g.drawImage(gauge, endPosX - gaugeBack.width / 2 + 1, endPosY, gaugeBack.width - 2, gauge.height);
            
        } else if (crystalCnt < myCrystalCnt && crystalCnt >= Math.floor(myCrystalCnt / 2)) {
            
            g.drawImage(cristal[1][Math.floor(cristalAniCnt / 2 % 7)], endPosX - (cristal[4].width / 2) + movePos, endPosY - (cristal[4].height));
            g.drawImage(gauge, endPosX - gaugeBack.width / 2 + 1, endPosY, (gaugeBack.width / myCrystalCnt) * crystalCnt - 2, gauge.height);
            
        } else if (crystalCnt < Math.floor(myCrystalCnt / 2) && crystalCnt >= Math.floor(myCrystalCnt / 3)) {
            
            g.drawImage(cristal[2][Math.floor(cristalAniCnt / 2 % 7)], endPosX - (cristal[4].width / 2) + movePos, endPosY - (cristal[4].height));
            g.drawImage(gauge, endPosX - gaugeBack.width / 2 + 1, endPosY, (gaugeBack.width / myCrystalCnt) * crystalCnt - 2, gauge.height);
            
        } else if (crystalCnt < Math.floor(myCrystalCnt / 3) && crystalCnt > 0) {
            
            g.drawImage(cristal[3][Math.floor(cristalAniCnt / 2 % 7)], endPosX - (cristal[4].width / 2) + movePos, endPosY - (cristal[4].height));
            g.drawImage(gauge, endPosX - gaugeBack.width / 2 + 1, endPosY, (gaugeBack.width / myCrystalCnt) * crystalCnt - 2, gauge.height);
            
        } else if (crystalCnt == 0) {
            g.drawImage(cristal[4], endPosX - (cristal[4].width / 2) + movePos, endPosY - (cristal[4].height));
        }
    };
    
    this.defenceKeyAction = function(keyCode) {
        if (isKeyLock) return;
        switch (keyCode) {
                
            case KEY_PREV:
                PopupMgr.setBackColor("rgba(0,0,0,0)");
                PopupMgr.openPopup(appMgr.getMessage2BtnPopup("전투를 포기하시겠습니까?"), function (code, data) {
                    if (data == ("0")) {
                        PopupMgr.closeAllPopup();
                        PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                        isKeyLock = true;
                        crystalCnt = 0;
                    } else {
                        PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                        PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    }
                });
                break;
                
            case KEY_ENTER:
                
                if (isMenu) {
                    switch (isMenuIdx) {
                        case 0:
                            if (skill_cooltime[0] < skill[0].height) return;
                            if (skillCnt[0] <= 0) return;
                            if (skillUseCnt[0] >= skillRimitCnt[0]) return;
                            if (GameEngine.getGameMode() == GAME_MODE_RAID) return;
                            
                            var _this = this;
                            
                            POPUP.POP_SKILLEFFECT.getInstance().setType(0);
                            PopupMgr.openPopup(POPUP.POP_SKILLEFFECT, function(code, data) {
                                PopupMgr.closePopup(POPUP.POP_SKILLEFFECT);
                                skillCnt[0]--;
                                skillUseCnt[0]++;
                                _this.skillActionFire();
                            });
                            break;
                        case 1:
                            if (skill_cooltime[1] < skill[0].height) return;
                            if (skillCnt[1] <= 0) return;
                            if (skillUseCnt[1] >= skillRimitCnt[1]) return;
                            
                            var _this = this;
                            
                            POPUP.POP_SKILLEFFECT.getInstance().setType(1);
                            PopupMgr.openPopup(POPUP.POP_SKILLEFFECT, function(code, data) {
                                PopupMgr.closePopup(POPUP.POP_SKILLEFFECT);
                                skillCnt[1]--;
                                skillUseCnt[1]++;
                                _this.skillActionFrozen();  
                            });
                            break;
                        case 2:
                            if (skill_cooltime[2] < skill[0].height) return;
                            if (skillCnt[2] <= 0) return;
                            if (skillUseCnt[2] >= skillRimitCnt[2]) return;
                            
                            var _this = this;
                            
                            POPUP.POP_SKILLEFFECT.getInstance().setType(2);
                            PopupMgr.openPopup(POPUP.POP_SKILLEFFECT, function(code, data) {
                                PopupMgr.closePopup(POPUP.POP_SKILLEFFECT);
                                skillCnt[2]--;
                                skillUseCnt[2]++;
                                _this.skillActionFast();
                            });
                            break;
                        case 3:
                            PopupMgr.setBackColor("rgba(0,0,0,0)");
                            PopupMgr.openPopup(appMgr.getMessage2BtnPopup("전투를 포기하시겠습니까?"), function (code, data) {
                                if (data == ("0")) {
                                    PopupMgr.closeAllPopup();
                                    PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                    isKeyLock = true;
                                    crystalCnt = 0;
                                } else {
                                    PopupMgr.setBackColor("rgba(0,0,0,0.85)");
                                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                                }
                            });
                            break;
                    }
                } else {
                    
                    for (var i = 0; i < createUnitPos.length; i++) {
                        if (createUnitPos[i] == focusIdx) {
                            if (myUnit[i].getUpgradePoint() >= 20) return;

                            var price = myUnit[i].getPowerUpGold();

                            remainAmount = CommonUIDrawManager.checkPrice("GOLD", price);

                            if (remainAmount < 0) {
                                return;
                            }

                            isKeyLock = true;
                            CommonUIDrawManager.decreaseGameMoney(price);
                            this.upgradeMyUnit(i);
                        }   
                    }
                }
                break;

            case KEY_RIGHT:
                if (isMenu) {
                    isMenuIdx = HTool.getIndex(isMenuIdx, 1, 4);
                } else {
                    focusIdxX = HTool.getIndex(focusIdxX, 1, 22);
                    focusIdx = focusIdxX + (focusIdxY * 22);
                    focusX = focusIdxX * 60 + 10;
                }
                break;

            case KEY_LEFT:
                if (isMenu) {
                    isMenuIdx = HTool.getIndex(isMenuIdx, -1, 4);
                } else {
                    focusIdxX = HTool.getIndex(focusIdxX, -1, 22);
                    focusIdx = focusIdxX + (focusIdxY * 22);
                    focusX = focusIdxX * 60 + 10;
                }
                break;
                
            case KEY_UP:
                if (isMenu) {
                    isMenu = false;
                    focusIdxY = 8;
                    focusIdx = focusIdxX + (focusIdxY * 22);
                    focusY = focusIdxY * 57 + 145;
                } else if (focusIdx < 22) {
                    isMenu = true;
                } else {
                    focusIdxY = HTool.getIndex(focusIdxY, -1, 9);
                    focusIdx = focusIdxX + (focusIdxY * 22);
                    focusY = focusIdxY * 57 + 145;
                }
                break;
                
            case KEY_DOWN:
                if (isMenu) {
                    isMenu = false;
                    focusIdxY = 0;
                    focusIdx = focusIdxX + (focusIdxY * 22);
                    focusY = focusIdxY * 57 + 145;
                } else if (focusIdx > 175) {
                    isMenu = true;
                } else {
                    focusIdxY = HTool.getIndex(focusIdxY, 1, 9);
                    focusIdx = focusIdxX + (focusIdxY * 22);
                    focusY = focusIdxY * 57 + 145;
                }
                break;
                
            case KEY_PC_NUM_1:
                for (var i = 0; i < enUnit.length; i++) {
                    enUnit[i].setState(STATE_STUN);
                }
                break;
            case KEY_PC_NUM_2:
                for (var i = 0; i < enUnit.length; i++) {
                    enUnit[i].setSlow();
                }
                break;
            case KEY_PC_NUM_3:
                for (var i = 0; i < enUnit.length; i++) {
                    enUnit[i].setDotDam(1);
                }
                break;
                
            case KEY_PC_NUM_4:
                enUnitDeadCnt = 60;
                myKillCnt = 60;
                break;
        }
    };
    
    this.getEnUnit = function() {
        return enUnit;
    };
    
    this.getMyUnit = function() {
        return myUnit;
    };
    
    this.setMyUnitDataRefresh = function(index) {
        myUnit[index].unitDataRefresh();
    };
    
    this.setMyUnitDestinationX = function(index, destiPosX) {
        myUnit[index].setDestinationPosX(destiPosX);
    };
    
    this.setMyUnitDestinationY = function(index, destiPosY) {
        myUnit[index].setDestinationPosY(destiPosY);
    };
    
    this.setMyUnitPositionX = function(index, posX) {
        myUnit[index].setPositionX(posX);
    };
    
    this.setMyUnitPositionY = function(index, posY) {
        myUnit[index].setPositionY(posY);
    };
    
    this.getMyUnitPositionX = function(index) {
        return myUnit[index].getPositionX();
    };
    
    this.getMyUnitPositionY = function(index) {
        return myUnit[index].getPositionY();
    };
    
    this.getMyUnitWidth = function(index) {
        return myUnit[index].getWidth();
    };
    
    this.getMyUnitHeight = function(index) {
        return myUnit[index].getHeight();
    };
    
    this.stop = function() {
        
        useHeroInfo = null;
        enUnitInfo = null;
        createUnitPos = null;
        nonePos = null;
        skill_off = null;
        burnPos = null;
        stageName = null;
        
        if (myUnit != null) {
            for (var i = 0; i < myUnitLen; i++) {
                myUnit[i].stop();
            }
            myUnit = null;
        }
        
        if (enUnit != null) {
            for (var i = 0; i < enUnitLen; i++) {
                enUnit[i].stop();
            }
            enUnit = null;
        }
        
        tempArr = null;
        
        for (var i = 0; i < myUnitInfoArr.size(); i++) {
            myUnitInfoArr.get(i)[3].setUsed(false);
        }
        
        if (myUnitInfoArr != null) {
            myUnitInfoArr.clear();
        }
        myUnitInfoArr = null;
        
        myUnitLen = 0;
        enUnitLen = 0;
        
        rNumFont = null;
        lvNumFont = null;
        
        focus = null;
        focusUp = null;
        giveup = null;
        skill = null;
        cristal = null;
        cooltime = null;
        max = null;
        
        plus = null;
        arrow = null;
        arrow2 = null;
        selectFocus = null;
        burn = null;
        bar_enemy = null;
        bar_gage = null;
        bar_gold = null;
        slot_skill = null;
        
        btn_pause_off = null;
        btn_pause_on = null;
        cover_top = null;
        cover_bottom = null;
        
        starAni = null;
        starOff = null;
        starOn = null;
        
        iconKill = null;
        gage_left = null;
        gage_middle = null;
        gage_right = null;
        
        upArrow = null;
        upLv = null;
        upgradeBack = null;
        
        gauge = null;
        gaugeBack = null;
        unFocus = null;
        
        for (var i = 0; i < 280; i++) {
            fireSkill[i].clear();
        }
        fireSkill = null;
    };
};