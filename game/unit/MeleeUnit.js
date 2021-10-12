"use strict";
"use warning";

var MeleeUnit = function(_positionX, _positionY, _unitInfo, _powerUpCost) {
    
    this.walkImg = [];
    this.atkImg = [];
    this.upgradeImg;
    this.hitImg = [];
    this.fastImg = []; //PlayResManager.getMyUnitMap().get("buff_fast");
    
    this.walkImg[0] = [];
    this.walkImg[1] = [];
    
    this.atkImg[0] = [];
    this.atkImg[1] = [];
    
    for (var i = 0; i < 4; i++) {
        this.walkImg[0][i] = PlayResManager.getMyUnitMap().get("my_" + _unitInfo.getRes() + "_r_w_" + i);
        this.walkImg[1][i] = PlayResManager.getMyUnitMap().get("my_" + _unitInfo.getRes() + "_l_w_" + i);
        this.atkImg[0][i] = PlayResManager.getMyUnitMap().get("my_" + _unitInfo.getRes() + "_r_a_" + i);
        this.atkImg[1][i] = PlayResManager.getMyUnitMap().get("my_" + _unitInfo.getRes() + "_l_a_" + i);
    }
    
    for (var i = 0; i < 2; i++) {
        this.hitImg[i] = PlayResManager.getMyUnitMap().get("d_effect_" + i);
    }
    
    for (var i = 0; i < 3; i++) {
        this.fastImg[i] = PlayResManager.getMyUnitMap().get("speedUp_" + i);
    }
    
    this.upgradeImg = PlayResManager.getMyUnitMap().get("upgrade");
    
    this.unitWidth = this.walkImg[0][0].width;
    this.unitHeight = this.walkImg[0][0].height;
    
    this.directValue = 0;
    this.frameCnt = 0;
    this.fastCnt = 170;
    this.upgradeAniCnt = 10;
    this.atkIdx = 0;
    this.oldAtkSpeed = 0;
    this.idleCnt = 0;
    this.powerUpCost = _powerUpCost;
    this.powerUpGold = _powerUpCost;
    this.initAtkDam = 0;
    
    this.enPosX = 0;
    this.enPosY = 0;
    this.enWidth = 0;
    this.enHeight = 0;
    
    this.myPosX = 0;
    this.myPosY = 0;
    
    this.name;
    
    this.constructor(_positionX, _positionY, _unitInfo);
};

MeleeUnit.prototype = new Unit();

MeleeUnit.prototype.constructor = function(_positionX, _positionY, _unitInfo) {
//    Unit.prototype.constructor.call(this, _positionX, _positionY);
    this.curState = STATE_IDLE;
    
    this.name = _unitInfo.getName();
    
     // 캐릭터 속성
    this.rangeValue = _unitInfo.getAttackRange();
    this.splashValue = _unitInfo.getSplashRange();
    this.atkDam = _unitInfo.getAttack();
    this.critical = _unitInfo.getCritical();
    this.attr = _unitInfo.getAttr();
    this.type = _unitInfo.getType();
    this.atkSpeed = _unitInfo.getAttackSpd();
    this.atkInc = _unitInfo.getAttackInc();
    this.moveSpeed = _unitInfo.getMoveSpd();
    this.isSplash = _unitInfo.getIsSplash();
    this.skill = _unitInfo.getSkill();
    
    this.initAtkDam = this.atkDam;
    
    this.skillCoolTime = _unitInfo.getSkillCoolTime();
    this.isSkillCoolTime = false;
    
    this.oldAtkSpeed = this.atkSpeed;
    
    this.upgradePoint = 0;
    this.hpValue = 2000;
    this.hpDefault = this.hpValue;
    // 생성 위치에 이미지를 그리기 위해 이미지의 넓이와 높이의 반씩 마이너스 한다
    
    this.posX = _positionX - Math.floor(this.unitWidth / 2);
    this.posY = _positionY - this.unitHeight;
    
    this.myPosX = this.posX;
    this.myPosY = this.posY;
    
    // 공격 사정거리 좌표
    this.rangePosX = this.posX + Math.floor((this.unitWidth / 2)) - this.rangeValue;
    this.rangePosY = this.posY + Math.floor((this.unitHeight / 2)) - this.rangeValue;
    // 목표물 좌표
    this.destiPosX = this.rangePosX + this.rangeValue;
    this.destiPosY = this.rangePosY + this.rangeValue;
};

MeleeUnit.prototype.unitDataRefresh = function() {
//    this.posX = this.posX - (this.unitWidth / 2);
//    this.posY = this.posY - (this.unitHeight / 2);
    
//    this.rangePosX = this.posX + Math.floor(this.unitWidth / 2) - this.rangeValue;
//    this.rangePosY = this.posY + Math.floor(this.unitHeight / 2) - this.rangeValue;
    
    this.destiPosX = this.rangePosX + this.rangeValue;
    this.destiPosY = this.rangePosY + this.rangeValue;
};

MeleeUnit.prototype.update = function() {
    
    this.frameCnt++;
    if (!this.isAtk && !this.isDead) {
        this.curState = STATE_IDLE;
        this.isAtk = false;
        this.isHit = false;
        this.destiPosX = this.rangePosX + this.rangeValue;
        this.destiPosY = this.rangePosY + this.rangeValue;
    }
    
    // 업그레이드 모션
    if (this.upgradeAniCnt < 10) {
        this.upgradeAniCnt++;
    }
    
    // 가지고 있는 스킬 모션
    if (this.skillCoolTimeCnt < this.skillCoolTime) {
        this.skillCoolTimeCnt++;
        this.isSkillCoolTime = false;
    } else {
//        console.error("Hero " + this.name + " is Skill Action!!!");
        this.isSkillCoolTime = true;
    }
    
    // 전체 공속 업 스킬 모션
    if (this.fastCnt < 170) {
        this.fastCnt++;
    } else {
        this.atkSpeed = this.oldAtkSpeed;
    }
    
    switch (this.curState) {
        case STATE_IDLE:
            this.isHit = false;
            this.isAtk = false;
            this.atkIdx = 0;
            
            if (Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2))) <= this.moveSpeed && Math.abs(this.destiPosY - (this.posY + Math.floor(this.unitHeight / 2))) <= this.moveSpeed) {
                this.posX = this.myPosX;
                this.posY = this.myPosY;
                this.frameCnt = 1;
                
                this.idleCnt++;
                
                if (Math.floor(this.idleCnt % 50) == 0) {
                    if (this.directValue == 0) {
                        this.directValue = 1;
                    } else {
                        this.directValue = 0;
                    }
                }
            } else {
                
                if (this.destiPosX < this.posX + Math.floor(this.unitWidth / 2)) {
                    this.posX -= this.moveSpeed;
                }
                
                if (this.destiPosX > this.posX + Math.floor(this.unitWidth / 2)) {
                    this.posX += this.moveSpeed;
                }

                if (this.destiPosY < this.posY + Math.floor(this.unitHeight / 2)) {
                    this.posY -= this.moveSpeed;
                }
                
                if (this.destiPosY > this.posY + Math.floor(this.unitHeight / 2)) {
                    this.posY += this.moveSpeed;
                }
            }
            
            break;
        case STATE_ATTACK:
            
            if (this.destiPosX < this.posX + Math.floor(this.unitWidth / 2)) {
                this.posX -= this.moveSpeed;
            }

            if (this.destiPosX > this.posX + Math.floor(this.unitWidth / 2)) {
                this.posX += this.moveSpeed;
            }

            if (this.destiPosY < this.posY + Math.floor(this.unitHeight / 2)) {
                this.posY -= this.moveSpeed;
            }

            if (this.destiPosY > this.posY + Math.floor(this.unitHeight / 2)) {
                this.posY += this.moveSpeed;
            }
            
            this.atkIdx++;
            
            if (Math.floor(((this.atkIdx / this.atkSpeed % 2)) == 0 || Math.floor(((this.atkIdx / this.atkSpeed % 2)) == 1))) {
                this.isHit = true;
            } else {
                this.isHit = false;
            }
            break;
            
        case STATE_DEAD:
            break;
        default:
            break;
    }
};

MeleeUnit.prototype.render = function(g) {
    
    if (this.isDead) return;
    
//    g.setColor(COLOR_BLACK);
//    g.fillRect(this.posX, this.posY, this.unitWidth, this.unitHeight);
    
    if (GameEngine.getGameMode() == GAME_READY) {
        g.setColor(COLOR_ALPHA);
        HDrawMgr.drawCircle(g, this.rangePosX, this.rangePosY, (this.rangeValue * 2), (this.rangeValue * 2), this.rangeValue);
    }
    
    switch (this.curState) {
        case STATE_IDLE:
            
            if (Math.floor(this.idleCnt / 10 % 5) == 0) {
                g.drawImage(this.walkImg[this.directValue][Math.floor(this.idleCnt / 2 % 4)], this.posX, this.posY);
            } else {
                g.drawImage(this.walkImg[this.directValue][Math.floor(this.frameCnt / 2 % 4)], this.posX, this.posY);
            }
            break;
        case STATE_ATTACK:
            g.drawImage(this.atkImg[this.directValue][Math.floor(this.atkIdx / (this.atkSpeed / 2) % 4)], this.posX, this.posY);
            
            if (this.isHit) {
                if (this.directValue == 0) { // directValue == 0 오른쪽
                    g.drawImage(this.hitImg[Math.floor(this.atkIdx % 2)], this.enPosX, this.enPosY);
                } else {
                    g.drawImage(this.hitImg[Math.floor(this.atkIdx % 2)], this.enPosX, this.enPosY);
                }
            }
            break;
        case STATE_DEAD:
            break;
        default:
            break;
    }
    
    if (this.fastCnt < 170) {
        g.drawImage(this.fastImg[Math.floor(this.fastCnt / 3 % 3)], this.posX + Math.floor(this.walkImg[0][0].width / 2) - Math.floor(this.fastImg[0].width / 2), this.posY + this.walkImg[0][0].height - Math.floor(this.fastImg[0].height / 2) - 20);
    }
    
    if (this.upgradeAniCnt < 10) {
        g.drawImage(this.upgradeImg, this.posX + Math.floor(this.unitWidth / 2) - Math.floor(130 / 2), this.posY - this.upgradeAniCnt, 130, 30);
    }
};

MeleeUnit.prototype.keyAction = function() {
    switch (this.curState) {
        case STATE_IDLE:
            break;
        case STATE_ATTACK:
            break;
        case STATE_DEAD:
            break;
        default:
            break;
    }
};

MeleeUnit.prototype.getPurposeX = function() {
    return this.enPosX;
};

MeleeUnit.prototype.getPurposeY = function() {
    return this.enPosY;
};

MeleeUnit.prototype.getPurposeW = function() {
    return this.enWidth;
};

MeleeUnit.prototype.getPurposeH = function() {
    return this.enHeight;
};

MeleeUnit.prototype.getPowerUpGold = function() {
    return this.powerUpGold;
};

MeleeUnit.prototype.upgrade = function() {
    this.upgradePoint++;
    this.atkDam = (this.atkDam + Math.floor(this.initAtkDam * 5 / 100));
    this.upgradeAniCnt = 0;
    this.powerUpGold = this.powerUpGold + this.powerUpCost;
};

MeleeUnit.prototype.getUpgradePoint = function() {
    return this.upgradePoint;
};

MeleeUnit.prototype.setFast = function() {
    this.fastCnt = 0;
    this.atkSpeed = Math.floor(this.atkSpeed / 2);
};

MeleeUnit.prototype.unitAttackCheck = function(positionX, positionY, unitWidth, unitHeight) {
    
    // 공격 사정거리 // 원거리의 경우 atkDistance와 hiDistance가 같다
    this.atkDistance = Math.floor(this.attackRangeDistanceCheck(positionX + Math.floor(unitWidth / 2), this.rangePosX + this.rangeValue, positionY + Math.floor(unitHeight / 2), this.rangePosY + this.rangeValue));
    // 실제 공격거리 // 근거리의 경우 atkDistance로 몬스터에게 다가가고 hitDistance로 공격한다
    this.hitDistance = Math.floor(this.attackRangeDistanceCheck(positionX + Math.floor(unitWidth / 2), this.posX + Math.floor(this.unitWidth / 2), positionY + Math.floor(unitHeight / 2), this.posY + Math.floor(this.unitHeight / 2)));
    
    if (this.atkDistance < this.rangeValue) {
        // 1=왼쪽 / 0=오른쪽
        
        this.directValue = (positionX + Math.floor(unitWidth / 2) < (this.posX + Math.floor((this.unitWidth / 2))) ? 1 : 0);
        this.isAtk = true;
        
        if (this.directValue == 0) {
            this.destiPosX = positionX;
        } else {
            this.destiPosX = positionX + unitWidth;
        }
        this.destiPosY = positionY + Math.floor(unitHeight / 2);
        
        this.enPosX = positionX;
        this.enPosY = positionY;
        this.enWidth = unitWidth;
        this.enHeight = unitHeight;
        
        if (this.directValue == 0) {
            if (this.hitDistance <= (Math.abs(this.posX) + Math.floor(this.unitWidth / 2))) {
                this.curState = STATE_ATTACK;
            } else {
                this.isHit = false;
                this.curState = STATE_IDLE;
            }
        } else {
            if (this.hitDistance <= (Math.abs(this.posX) + Math.floor(this.unitWidth / 2))) {
                this.curState = STATE_ATTACK;
            } else {
                this.isHit = false;
                this.curState = STATE_IDLE;
            }
        }
        
        return true;
    } else {
        this.curState = STATE_IDLE
        this.isAtk = false;
        this.isHit = false;
        this.destiPosX = this.rangePosX + this.rangeValue;
        this.destiPosY = this.rangePosY + this.rangeValue;
    }
    
    return false;
};

MeleeUnit.prototype.stop = function() {
    this.walkImg = null;
    this.atkImg = null;
    this.upgradeImg = null;
    this.hitImg = null;
    this.fastImg = null;
};