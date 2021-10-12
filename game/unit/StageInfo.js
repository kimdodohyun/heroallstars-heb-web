var StageInfo = function(res, hp, moveSpd, type, attr, destiPosX, destiPosY, endPosX, endPosY, name) {
    this.res = res.split("_")[1];
    this.hp = Number(hp);
    this.moveSpd = Number(moveSpd);
    this.type = Number(type);
    this.attr = Number(attr);
    this.destiPosX = destiPosX;
    this.destiPosY = destiPosY;
    this.endPosX = destiPosX[destiPosX.length - 1]; //Number(endPosX) * 60;
    this.endPosY = destiPosY[destiPosY.length - 1]; //(Number(endPosY) * 57 + 35);
    this.name = name;
};

StageInfo.prototype.getRes = function() {
    return this.res;
};

StageInfo.prototype.getHp = function() {
    return this.hp;
};

StageInfo.prototype.getMoveSpd = function() {
    return this.moveSpd;
};

StageInfo.prototype.getType = function() {
    return this.type;
};

StageInfo.prototype.getAttr = function() {
    return this.attr;
};

StageInfo.prototype.getDestiPosX = function() {
    return this.destiPosX;
};

StageInfo.prototype.getDestiPosY = function() {
    return this.destiPosY;
};

StageInfo.prototype.getEndPosX = function() {
    return this.endPosX;
};

StageInfo.prototype.getEndPosY = function() {
    return this.endPosY;
};

StageInfo.prototype.getName = function() {
    return this.name;
};