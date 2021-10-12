"use strict";
"use warning";

var EnemyUnit = function(_positionX, _positionY, _unitInfo) {
    
    this.walkImg = [];
    this.shotImg = [];
    this.atkImg = [];
    this.deadImg = [];
    this.skillImg;
    this.iconCoin;
    this.coinAni = [];
    
    this.walkImg[0] = [];
    this.walkImg[1] = [];
    
    this.shotImg[0] = [];
    this.shotImg[1] = [];
    
    for (var i = 0; i < 4; i++) {
        this.walkImg[0][i] = PlayResManager.getEnUnitMap().get("en_" + _unitInfo.getRes() + "_r_w_" + i);
        this.walkImg[1][i] = PlayResManager.getEnUnitMap().get("en_" + _unitInfo.getRes() + "_l_w_" + i);
        
        this.shotImg[0][i] = PlayResManager.getEnUnitMap().get("en_" + _unitInfo.getRes() + "_r_d_" + i);
        this.shotImg[1][i] = PlayResManager.getEnUnitMap().get("en_" + _unitInfo.getRes() + "_l_d_" + i);
        
        this.atkImg[i] = PlayResManager.getEnUnitMap().get("eAtk_" + i);
    }
    
    for (var i = 0; i < 4; i++) {
        this.coinAni[i] = PlayResManager.getEtcMap().get("coin_ani_" + i);
    }
    
    for (var i = 0; i < 6; i++) {
        this.deadImg[i] = PlayResManager.getEtcMap().get("soul_a" + i);
    }

    this.skillImg = PlayResManager.getEtcMap().get("skill_Ice");
    this.iconCoin = PlayResManager.getEtcMap().get("iconCoin");
    
    this.typeImg = PlayResManager.getEnUnitMap().get("type_" + _unitInfo.getAttr());
    this.stunImg = PlayResManager.getEnUnitMap().get("debuff_stun");
    this.slowImg = PlayResManager.getEnUnitMap().get("debuff_slow");
    this.dotImg = PlayResManager.getEnUnitMap().get("debuff_dot");
    
    this.typeImgCnt = 0;
    this.stunImgCnt = 0;
    this.slowImgCnt = 0;
    this.dotImgCnt = 0;
    
    this.unitWidth = this.walkImg[0][0].width;
    this.unitHeight = this.walkImg[0][0].height;
    
    this.iconImgPos = Math.floor(this.unitWidth / 2) - Math.floor(this.typeImg.width / 2);
    this.iconImgCnt = [];
    
    this.centerPosX = 0;
    this.centerPosY = 0;
    
    this.endPosX = 0;
    this.endPosY = 0;
    
    this.destiPosLength = 0;
    
    this.nextDestiIdx = 1;
    this.skillCnt = 0;
    this.shotCnt = 20;
    
    this.oldMoveSpeed = 0;
    this.directValue = 0;
    this.frameCnt = 0;
    this.aniCnt = 0;
    
    this.isDotDam = false;
    this.isSlow = false;
    this.dotDamCnt = 0;
    this.slowCnt = 0;
    this.stunCnt = 0;
    this.dotDamValue = 0;
    
    this.unitInfo = _unitInfo;
    
    this.constructor(_positionX, _positionY, _unitInfo);
};

EnemyUnit.prototype = new Unit();

EnemyUnit.prototype.constructor = function(positionX, positionY, _unitInfo) {
//    Unit.prototype.constructor.call(this, positionX, positionY);
    this.curState = STATE_IDLE;
    
    this.posX = positionX - Math.floor(this.unitWidth / 2);
    this.posY = positionY - this.unitHeight;
    
    this.atkDam = 2;
    this.attr = _unitInfo.getAttr();
    this.moveSpeed = _unitInfo.getMoveSpd();
    this.hpValue = _unitInfo.getHp();
    this.destiPosLength = _unitInfo.getDestiPosX().length;
    this.hpDefault = this.hpValue;
    this.oldMoveSpeed = this.moveSpeed;
    
    this.centerPosX = this.posX + Math.floor(this.unitWidth / 2);
    this.centerPosY = this.posY + Math.floor(this.unitHeight / 2);
    
    this.endPosX = _unitInfo.getEndPosX();
    this.endPosY = _unitInfo.getEndPosY();
    
    this.nextDestiIdx = 1;
};

EnemyUnit.prototype.update = function() {
    
    if (this.isSkill) {
        if (this.skillCnt < 20) {
            this.skillCnt++;
        } else {
            this.isSkill = false;
            this.skillCnt = 0;
        }
        return;
    }
    
    if (this.isDotDam) {
        this.dotDamCnt++;

        if (Math.floor(this.dotDamCnt / 2 % 10) == 0) {
            UnitManager.raidDamageStack(this.dotDamValue);
            this.setHPValue(this.dotDamValue);
        }

        if (this.dotDamCnt == 100) {
            var minus = 0;
            this.iconImgCnt.splice(this.iconImgCnt.length - 1, 1);
            if (this.slowImgCnt >= 0) {
                this.slowImgCnt = this.iconImgCnt[minus];
                minus++;
            }
            if (this.stunImgCnt >= 0) {
                this.stunImgCnt = this.iconImgCnt[minus];
            }
            this.dotImgCnt = 0
            this.isDotDam = false;
        }
    }
    
    if (this.isSlow) {
        this.slowCnt++;
        
        if (this.slowCnt == 50) {
            var minus = 0;
            this.iconImgCnt.splice(this.iconImgCnt.length - 1, 1);
            if (this.dotImgCnt >= 0) {
                this.dotImgCnt = this.iconImgCnt[minus];
                minus++;
            }
            if (this.stunImgCnt >= 0) {
                this.stunImgCnt = this.iconImgCnt[minus];
            }
            this.slowImgCnt = 0;
            this.isSlow = false;
            this.moveSpeed = this.oldMoveSpeed;
        }
    }
    
    switch (this.curState) {
        case STATE_IDLE:
            this.frameCnt++;
            this.isAtk = false;
            
            if (this.isHoriz) {
                if (this.destiPosX >= (this.posX + Math.floor(this.unitWidth / 2))) {
                    this.posX += this.moveSpeed; // 몬스터 이동속도
                } else {
                    this.posX -= this.moveSpeed;
                }
            } else {
                if (this.destiPosY >= (this.posY + this.unitHeight)) {
                    this.posY += this.moveSpeed;
                } else {
                    this.posY -= this.moveSpeed;
                }
            }
            
            if (this.isHoriz) {
                if (Math.floor(Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2))) <= this.oldMoveSpeed)) {
                    this.setDestinationPosY(this.unitInfo.getDestiPosY()[this.nextDestiIdx]);
                    if (this.nextDestiIdx < this.destiPosLength) {
                        this.nextDestiIdx++;
                    }
                }
            }
            
            if (this.isVerti) {
                if (Math.floor(Math.abs(this.destiPosY - (this.posY + this.unitHeight)) <= this.oldMoveSpeed)) {
                    this.setDestinationPosX(this.unitInfo.getDestiPosX()[this.nextDestiIdx]);
                    if (this.nextDestiIdx < this.destiPosLength) {
                        if (this.destiPosX < this.posX + Math.floor(this.unitWidth / 2)) {
                            this.directValue = 1;    
                        } else {
                            this.directValue = 0;
                        }
                        this.nextDestiIdx++;
                    } 
                }
            }
            
            if (Math.floor(Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2)))) <= this.oldMoveSpeed) {
                this.isVerti = true;
            } else {
                this.isVerti = false;
            }
            
            if (Math.floor(Math.abs(this.destiPosY - (this.posY + this.unitHeight))) <= this.oldMoveSpeed) {
                this.isHoriz = true;
            } else {
                this.isHoriz = false;
            }
            
            break;
            
        case STATE_SHOT:
            
            this.frameCnt++;
            this.isAtk = false;
            
            if (this.isHoriz) {
                if (this.destiPosX >= (this.posX + Math.floor(this.unitWidth / 2))) {
                    this.posX += this.moveSpeed; // 몬스터 이동속도
                } else {
                    this.posX -= this.moveSpeed;
                }
            } else {
                if (this.destiPosY >= (this.posY + this.unitHeight)) {
                    this.posY += this.moveSpeed;
                } else {
                    this.posY -= this.moveSpeed;
                }
            }
            
            if (this.isHoriz) {
                if (Math.floor(Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2))) <= this.oldMoveSpeed)) {
                    this.setDestinationPosY(this.unitInfo.getDestiPosY()[this.nextDestiIdx]);
                    if (this.nextDestiIdx < this.destiPosLength) this.nextDestiIdx++;
                }
            }
            
            if (this.isVerti) {
                if (Math.floor(Math.abs(this.destiPosY - (this.posY + this.unitHeight)) <= this.oldMoveSpeed)) {
                    this.setDestinationPosX(this.unitInfo.getDestiPosX()[this.nextDestiIdx]);
                    if (this.nextDestiIdx < this.destiPosLength) {
                        if (this.destiPosX < this.posX + Math.floor(this.unitWidth / 2)) {
                            this.directValue = 1;    
                        } else {
                            this.directValue = 0;
                        }
                        this.nextDestiIdx++;
                    }
                }
            }
            
            if (Math.floor(Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2)))) <= this.oldMoveSpeed) {
                this.isVerti = true;
            } else {
                this.isVerti = false;
            }
            
            if (Math.floor(Math.abs(this.destiPosY - (this.posY + this.unitHeight))) <= this.oldMoveSpeed) {
                this.isHoriz = true;
            } else {
                this.isHoriz = false;
            }
            
            if (this.shotCnt < 4) {
                this.shotCnt++;
            } else {
                this.curState = STATE_IDLE;
            }
            break;
            
        case STATE_STUN:
            this.stunCnt++;
            
            
            
            
            if (this.isHoriz) {
                if (Math.floor(Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2))) <= this.oldMoveSpeed)) {
                    this.setDestinationPosY(this.unitInfo.getDestiPosY()[this.nextDestiIdx]);
                    if (this.nextDestiIdx < this.destiPosLength) this.nextDestiIdx++;
                }
            }
            
            if (this.isVerti) {
                if (Math.floor(Math.abs(this.destiPosY - (this.posY + this.unitHeight)) <= this.oldMoveSpeed)) {
                    this.setDestinationPosX(this.unitInfo.getDestiPosX()[this.nextDestiIdx]);
                    if (this.nextDestiIdx < this.destiPosLength) {
                        if (this.destiPosX < this.posX + Math.floor(this.unitWidth / 2)) {
                            this.directValue = 1;    
                        } else {
                            this.directValue = 0;
                        }
                        this.nextDestiIdx++;
                    }
                }
            }
            
            if (Math.floor(Math.abs(this.destiPosX - (this.posX + Math.floor(this.unitWidth / 2)))) <= this.oldMoveSpeed) {
                this.isVerti = true;
            } else {
                this.isVerti = false;
            }
            
            if (Math.floor(Math.abs(this.destiPosY - (this.posY + this.unitHeight))) <= this.oldMoveSpeed) {
                this.isHoriz = true;
            } else {
                this.isHoriz = false;
            }
            
            
            
            
            
            if (this.stunCnt == 120) {
                var minus = 0;
                this.iconImgCnt.splice(this.iconImgCnt.length - 1, 1);
                if (this.dotImgCnt >= 0) {
                    this.dotImgCnt = this.iconImgCnt[minus];
                    minus++;
                }
                if (this.slowImgCnt >= 0) {
                    this.slowImgCnt = this.iconImgCnt[minus];
                }
                this.stunImgCnt = 0;
                this.curState = STATE_IDLE;
            }
            break;
            
        case STATE_SLOW:
            this.frameCnt++;
            
            if (this.frameCnt >= 50) {
                this.moveSpeed = this.oldMoveSpeed;
                this.setState(STATE_IDLE);
            }
            break;
        case STATE_DEAD:
            if (this.aniCnt >= 0) {
                if (this.coinPosX[0] == 816) {
                    if (this.coinAniCnt2[0] < 8) {
                        this.coinAniCnt2[0]++
                    }
                } else {
                    this.coinAniCnt[0]++;
                    this.coinPosX[0] = Panner.linearTween(this.coinAniCnt[0], this.coinPosX[0], 816 - this.coinPosX[0], 6);
                    this.coinPosY[0] = Panner.linearTween(this.coinAniCnt[0], this.coinPosY[0], 6 - this.coinPosY[0], 6);
                }
            }
            
            if (this.aniCnt >= 1) {
                if (this.coinPosX[1] == 816) {
                    if (this.coinAniCnt2[1] < 8) {
                        this.coinAniCnt2[1]++
                    }
                } else {
                    this.coinAniCnt[1]++;
                    this.coinPosX[1] = Panner.linearTween(this.coinAniCnt[1], this.coinPosX[1], 816 - this.coinPosX[1], 6);
                    this.coinPosY[1] = Panner.linearTween(this.coinAniCnt[1], this.coinPosY[1], 6 - this.coinPosY[1], 6);
                }
            }
         
            if (this.aniCnt >= 2) {
                if (this.coinPosX[2] == 816) {
                    this.coinAniCnt[2] = 0;
                    if (this.coinAniCnt2[2] < 8) {
                        this.coinAniCnt2[2]++
                    }
                } else {
                    this.coinAniCnt[2]++;
                    this.coinPosX[2] = Panner.linearTween(this.coinAniCnt[2], this.coinPosX[2], 816 - this.coinPosX[2], 6);
                    this.coinPosY[2] = Panner.linearTween(this.coinAniCnt[2], this.coinPosY[2], 6 - this.coinPosY[2], 6);
                }
            }
            
            if (this.aniCnt < 6) {
                this.aniCnt++;
            }
            
//            if (this.coinPosX == 816) {
//                if (this.coinAniCnt2 < 8) {
//                    this.coinAniCnt2++
//                }
//            }
//
//            this.coinAniCnt++;
//            this.coinPosX = Panner.linearTween(this.coinAniCnt, this.coinPosX, 816 - this.coinPosX, 6);
//            this.coinPosY = Panner.linearTween(this.coinAniCnt, this.coinPosY, 6 - this.coinPosY, 6);
            
            this.isAtk = false;
            break;
        case STATE_CRYSTAL:
            if (this.aniCnt < 6) {
                this.aniCnt++;
            }
            break;
        default:
            break;
    }
};

EnemyUnit.prototype.render = function(g) {
    
//    g.setColor(COLOR_BLACK);
//    g.fillRect(this.posX, this.posY, this.unitWidth, this.unitHeight);
    
//    for (var i = 0; i < this.unitInfo.getDestiPosX().length; i++) {
//        g.setColor(COLOR_BLACK);
//        g.fillRect(this.unitInfo.getDestiPosX()[i], this.unitInfo.getDestiPosY()[i], 50, 5);
//    }
    
//    g.setColor(COLOR_BLACK);
//    g.fillRect(this.destiPosX, this.destiPosY, 5, 5);
//    
//    
//    g.fillRect(this.posX + this.unitWidth / 2, this.posY + this.unitHeight, 5, 5);
    
    switch (this.curState) {
        case STATE_IDLE:
            g.drawImage(this.walkImg[this.directValue][Math.floor(this.frameCnt / 2 % 4)], this.posX, this.posY);
            break;
        case STATE_SHOT:
            g.drawImage(this.shotImg[this.directValue][Math.floor(this.frameCnt / 2 % 4)], this.posX, this.posY);
            break;
        case STATE_STUN:
            g.drawImage(this.walkImg[0][0], this.posX, this.posY);
            g.drawImage(this.skillImg, this.posX + Math.floor(this.unitWidth / 2) - Math.floor(this.skillImg.width / 2), this.posY + (this.unitHeight) - (this.skillImg.height));
            break;
        case STATE_SLOW:
            g.drawImage(this.walkImg[this.directValue][Math.floor(this.frameCnt / 2 % 4)], this.posX, this.posY);
            break;
        case STATE_DEAD:
            if (this.aniCnt < 6) g.drawImage(this.deadImg[this.aniCnt], this.posX + Math.floor(this.unitWidth / 2) - Math.floor(this.deadImg[0].width / 2), this.posY + (this.unitHeight) - (this.deadImg[0].height));
            
            if (this.coinPosX[0] == 816) {
                if (this.coinAniCnt2[0] < 8) g.drawImage(this.coinAni[this.coinAniCnt2[0] % 4], 797, -13);    
            } else {
                g.drawImage(this.iconCoin, this.coinPosX[0], this.coinPosY[0]);
            }
            
            if (this.coinPosX[1] == 816) {
                if (this.coinAniCnt2[1] < 8) g.drawImage(this.coinAni[this.coinAniCnt2[1] % 4], 797, -13);    
            } else {
                g.drawImage(this.iconCoin, this.coinPosX[1], this.coinPosY[1]);
            }
            
            if (this.coinPosX[2] == 816) {
                if (this.coinAniCnt2[2] < 8) g.drawImage(this.coinAni[this.coinAniCnt2[2] % 4], 797, -13);    
            } else {
                g.drawImage(this.iconCoin, this.coinPosX[2], this.coinPosY[2]);
            }
            break;
        case STATE_CRYSTAL:
            if (this.aniCnt < 6) g.drawImage(this.deadImg[this.aniCnt], this.posX + Math.floor(this.unitWidth / 2) - Math.floor(this.deadImg[0].width / 2), this.posY + (this.unitHeight) - (this.deadImg[0].height));
            break;
        default:
            break;
    }
    
    if (this.isDead) return;
    if (this.isSkill) g.drawImage(this.skillImg, this.posX + Math.floor(this.unitWidth / 2) - Math.floor(this.skillImg.width / 2), this.posY + (this.unitHeight) - (this.skillImg.height));
    this.renderHp(g);
};

EnemyUnit.prototype.renderHp = function(g) {
    g.setColor(COLOR_BLACK);
    g.fillRect(this.posX + (Math.floor(this.unitWidth / 2) - 20), this.posY + this.unitHeight, 40, 7);
    g.setColor(COLOR_RED);
    g.fillRect(this.posX + 1 + (Math.floor(this.unitWidth / 2) - 20), this.posY + 1 + this.unitHeight, this.setHPPercent(38), 5);
    
    this.iconImgPos = Math.floor(this.unitWidth / 2) - Math.floor(this.typeImg.width / 2) + (this.iconImgCnt.length * 11);
    
    g.drawImage(this.typeImg, this.posX + this.iconImgPos - ((this.iconImgCnt.length) * 22), this.posY - 22);
    
    if (this.isDotDam) {
        g.drawImage(this.dotImg, this.posX + this.iconImgPos - (this.dotImgCnt * 22), this.posY - 22);
    }
    if (this.isSlow) {
        g.drawImage(this.slowImg, this.posX + this.iconImgPos - (this.slowImgCnt * 22), this.posY - 22);
    }
    if (this.curState == STATE_STUN) {
        g.drawImage(this.stunImg, this.posX + this.iconImgPos - (this.stunImgCnt * 22), this.posY - 22);
    }
};

EnemyUnit.prototype.keyAction = function() {
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

EnemyUnit.prototype.upgrade = function() {
    
};

EnemyUnit.prototype.setShot = function() {
    if (this.curState == STATE_DEAD || this.curState == STATE_STUN || this.curState == STATE_CRYSTAL) return;
    this.shotCnt = 0;
    this.curState = STATE_SHOT;
};

EnemyUnit.prototype.setDotDam = function(_dotDamValue) {
    this.dotDamCnt = 0;
    if (this.isDotDam) return;
    this.isDotDam = true;
    this.iconImgCnt.splice(this.iconImgCnt.length, 0, this.iconImgCnt.length);
    this.dotImgCnt = this.iconImgCnt[this.iconImgCnt.length - 1];
    this.dotDamValue = _dotDamValue;
};

EnemyUnit.prototype.setSlow = function() {
    this.slowCnt = 0;
    if (this.isSlow) return;
    this.isSlow = true;
    this.iconImgCnt.splice(this.iconImgCnt.length, 0, this.iconImgCnt.length);
    this.slowImgCnt = this.iconImgCnt[this.iconImgCnt.length - 1];
    this.moveSpeed = Math.floor(this.moveSpeed / 2);
};

EnemyUnit.prototype.setState = function(state) {
    if (this.curState == STATE_DEAD || this.curState == STATE_STUN || this.curState == STATE_CRYSTAL) return;
    this.stunCnt = 0;
    this.iconImgCnt.splice(this.iconImgCnt.length, 0, this.iconImgCnt.length);
    this.stunImgCnt = this.iconImgCnt[this.iconImgCnt.length - 1];
    this.curState = state;
};

EnemyUnit.prototype.unitAttackCheck = function(positionX, positionY, unitWidth, unitHeight) {
    this.centerPosX = this.posX + Math.floor(this.unitWidth / 2);
    this.centerPosY = this.posY + Math.floor(this.unitHeight / 2);
    
    var crashPointX = positionX;
    var crashPointY = positionY + Math.floor(unitHeight / 2);
    
    this.atkDistance = this.attackRangeDistanceCheck(crashPointX, this.centerPosX, crashPointY, this.centerPosY);
    
    if (this.atkDistance < Math.floor(this.unitWidth / 2)) {
        this.isAtk = true;
        this.curState = STATE_CRYSTAL;
        this.isDead = true;
        return true;
    }
    return false;
};

EnemyUnit.prototype.stop = function() {
    this.walkImg = null;
    this.shotImg = null;
    this.atkImg = null;
    this.deadImg = null;
    this.skillImg = null;
    this.typeImg = null;
    this.stunImg = null;
    this.slowImg = null;
    this.dotImg = null;
    this.iconCoin = null;
    this.coinAni = null;
};