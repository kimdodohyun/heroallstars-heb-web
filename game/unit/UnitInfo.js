var UnitInfo = function(res, grade, attack, attackInc, attackRange, splashRange, attackSpd, critical, moveSpd, type, attr, skill, skillCoolTime, isSplash, name, code, recKey, lev, exp, present, weaponName) {
    
    this.res = res.split("_")[1];
    this.grade = Number(grade);
    this.attack = Number(attack);
    this.attackInc = Number(attackInc);
    this.attackRange = Number(attackRange);
    this.splashRange = Number(splashRange);
    this.attackSpd = Number(attackSpd);
    this.critical = Number(critical);
    this.moveSpd = Number(moveSpd);
    this.type = Number(type);
    this.attr = Number(attr);
    this.skill = Number(skill);
    this.skillCoolTime = Number(skillCoolTime);
    this.isSplash = isSplash;
    this.name = name;
    this.code = code;
    this.recKey = recKey;
    this.lev = Number(lev);
    this.exp = Number(exp);
    this.present = String(present).split("|");
    this.weaponName = weaponName;
    
    this.check = false;
    this.used = false;
    
    for (var i = 0; i < this.exp; i++) {
        this.attack = this.attack + Math.floor(this.attack * this.attackInc / 100);
    }
};

UnitInfo.prototype.setCheck = function(_check) {
    this.check = _check;
};

UnitInfo.prototype.getCheck = function() {
    return this.check;
};

UnitInfo.prototype.setUsed = function(_used) {
    this.used = _used;
};

UnitInfo.prototype.getUsed = function() {
    return this.used;
};

UnitInfo.prototype.getGrade = function() {
    return this.grade;
};

UnitInfo.prototype.getRes = function() {
    return this.res;
};

UnitInfo.prototype.getAttack = function() {
    return this.attack;
};

UnitInfo.prototype.getAttackInc = function() {
    return this.attackInc;
};

UnitInfo.prototype.getAttackRange = function() {
    return this.attackRange;
};

UnitInfo.prototype.getSplashRange = function() {
    return this.splashRange;
};

UnitInfo.prototype.getAttackSpd = function() {
    return this.attackSpd;
};

UnitInfo.prototype.getCritical = function() {
    return this.critical;
};

UnitInfo.prototype.getMoveSpd = function() {
    return this.moveSpd;
};

UnitInfo.prototype.getType = function() {
    return this.type;
};

UnitInfo.prototype.getAttr = function() {
    return this.attr;
};

UnitInfo.prototype.getSkill = function() {
    return this.skill;
};

UnitInfo.prototype.getSkillCoolTime = function() {
    return this.skillCoolTime;
};

UnitInfo.prototype.getIsSplash = function() {
    return this.isSplash;
};

UnitInfo.prototype.getName = function() {
    return this.name;
};

UnitInfo.prototype.getCode = function() {
    return this.code;
};

UnitInfo.prototype.getRecKey = function() {
    return this.recKey;
};

UnitInfo.prototype.isRankUp = function() {
    return this.exp >= this.lev * 10 + 10;
};

UnitInfo.prototype.getExp = function() {
    return this.exp + 1;
}

UnitInfo.prototype.getLev = function() {
    return this.lev;
};

UnitInfo.prototype.getPresent = function() {
    return this.present;
};

UnitInfo.prototype.getWeaponName = function() {
    return this.weaponName;
};