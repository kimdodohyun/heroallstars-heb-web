var Unit = function() {
    
    this.curState = 0;
    
    this.atkDam = 0;
    this.atkSpeed = 0;
    this.atkInc = 0;
    this.critical = 0;
    this.moveSpeed = 0;
    this.hpValue = 0;
    this.hpDefault = 0;
    this.attr = 0;
    this.type = 0;
    this.skill = 0;
    this.skillCoolTime = 0;
    this.skillCoolTimeCnt = 0;
    this.updgradePoint = 0;
    
    this.posX = 0;
    this.posY = 0;
    
    this.coinAniCnt = 0;
    this.coinAniCnt2 = 0;
    this.coinPosX = 0;
    this.coinPosY = 0;
    
    this.destiPosX = 0;
    this.destiPosY = 0;
    
    this.rangePosX = 0;
    this.rangePosY = 0;
    this.rangeValue = 0;
    this.splashValue = 0;
    
    this.unitWidth = 0;
    this.unitHeight = 0;
    
    this.targetIdx = 0;
    
    this.atkDistance = 0;
    this.hitDistance = 0;
    
    this.isAtk = false;
    this.isSplash = false;
    this.isDead = false;
    this.isHit = false;
    this.isFast = false;
    this.isVerti = false;
    this.isHoriz = false;
    this.isSkill = false;
    this.isSkillCoolTime = false;
    
    this.unitImg = [];
};

Unit.prototype.constructor = function(_x, _y) {
    this.setPositionX(_x);
    this.setPositionY(_y);
};

Unit.prototype.setPositionX = function(_x) {
    this.posX = _x;
};

Unit.prototype.setPositionY = function(_y) {
    this.posY = _y;
};

Unit.prototype.setDestinationPosX = function(_destinationPosX) {
    this.destiPosX = _destinationPosX;
};

Unit.prototype.setDestinationPosY = function(_destinationPosY) {
    this.destiPosY = _destinationPosY;
};

Unit.prototype.getDestinationPosX = function() {
    return this.destiPosX;
};

Unit.prototype.getDestinationPosY = function() {
    return this.destiPosY;
};

Unit.prototype.getAttackDamage = function() {
    return this.atkDam;
};

Unit.prototype.getCritical = function() {
    return this.critical;
};

Unit.prototype.getAttr = function() {
    return this.attr;
};

Unit.prototype.getType = function() {
    return this.type;
};

Unit.prototype.getSkill = function() {
    return this.skill;
};

Unit.prototype.getIsSkillCoolTime = function() {
    return this.isSkillCoolTime;
};

Unit.prototype.setSkillCoolTime = function() {
    this.skillCoolTimeCnt = 0;
};

Unit.prototype.setIsAttack = function(_isAttack) {
    this.isAtk = _isAttack;
    if (!this.isAtk && !this.isDead) {
        this.curState = STATE_IDLE;
    }
};

Unit.prototype.getSplashRange = function() {
    return this.splashValue;
};

Unit.prototype.getIsSplash = function() {
    return this.isSplash;
};

Unit.prototype.getIsAttack = function() {
    return this.isAtk;
};

Unit.prototype.getIsHit = function() {
    return this.isHit;
};

Unit.prototype.setIsHit = function(_isHitCheck) {
    this.isHit = _isHitCheck;
};

Unit.prototype.setTargetEnemyIndex = function(_index) {
    this.targetIdx = _index;
};

Unit.prototype.getTargetEnemyIndex = function() {
    return this.targetIdx;
};

Unit.prototype.getPositionX = function() {
    return this.posX;
};

Unit.prototype.getPositionY = function() {
    return this.posY;
};

Unit.prototype.getWidth = function() {
    return this.unitWidth;
};

Unit.prototype.getHeight = function() {
    return this.unitHeight;
};

Unit.prototype.getIsDead = function() {
    return this.isDead;
};

Unit.prototype.getState = function() {
    return this.curState;
};

//Unit.prototype.upgrade = function() {
//    this.atkDam = (this.atkDam * 2);
//};

Unit.prototype.attackRangeDistanceCheck = function(_targetPointX, _centerPointX, _targetPointY, _centerPointY) {
    return Math.sqrt(((_targetPointX - _centerPointX) * (_targetPointX - _centerPointX)) + ((_targetPointY - _centerPointY) * (_targetPointY - _centerPointY)));
};

Unit.prototype.setHPPercent = function(_barLength) {
    var reHp = this.hpValue / this.hpDefault * _barLength;
    return Math.floor(Math.round(reHp));
};

Unit.prototype.getHpValue = function() {
    return this.hpDefault;
};

Unit.prototype.setHPValue = function(_damageValue) {
    if (this.hpValue > 0) {
        this.hpValue -= _damageValue;
    }
    
    if (this.hpValue <= 0 && !this.isDead) {
        
        this.coinPosX = [];
        this.coinPosY = [];
        this.coinAniCnt = [];
        this.coinAniCnt2 = [];
        
//        for (var i = 0; i < 3; i++) {
//            this.coinPosX[i] = this.posX;
//            this.coinPosY[i] = this.posY;
//            this.coinAniCnt[i] = 0;
//            this.coinAniCnt2[i] = 0;
//        }
        
        this.coinPosX[0] = this.posX;
        this.coinPosY[0] = this.posY;
        this.coinAniCnt[0] = 0;
        this.coinAniCnt2[0] = 0;
        
        this.coinPosX[1] = this.posX;
        this.coinPosY[1] = this.posY;
        this.coinAniCnt[1] = 0;
        this.coinAniCnt2[1] = 0;
        
        this.coinPosX[2] = this.posX;
        this.coinPosY[2] = this.posY;
        this.coinAniCnt[2] = 0;
        this.coinAniCnt2[2] = 0;
        
        this.isDead = true;
        this.isAtk = false;
        this.isHit = false;
        this.curState = STATE_DEAD;
        this.hpValue = 0;
        UnitManager.unitDeadCnt();
        UnitManager.unitKillCnt();
        CommonUIDrawManager.increaseGameMoney(UnitManager.getCoinReward());
    }
};
