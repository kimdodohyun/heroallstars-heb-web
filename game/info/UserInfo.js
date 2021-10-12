var UserInfo = function () {
    // User Info Variable
    var INSTANCE = this;
    var constructor = function (userKey, userName, pattern, patternLev, equipedCard, rank) {
        INSTANCE.userKey = userKey;
        
        var na;
        if (userName != null || userName != undefined) {
            if (userName.length > 8) {
                na = userName.substr(0, 8) + "..";
            } else {
                na = userName;
            }
        } else {
            na = userName;
        }
        
        INSTANCE.userName = na;
        INSTANCE.pattern = pattern;
        INSTANCE.patternLev = patternLev - 0;
        INSTANCE.equipedCard = equipedCard;
        INSTANCE.rank = rank - 0;
    };

    if (arguments.length === 3) {
        var datas = arguments[2].split('#');
        constructor(arguments[0], arguments[1], PatternManager.getPatternInfo(parseInt(datas[3])), parseInt(datas[4]), new Card(parseInt(datas[0]), -1, parseInt(datas[1]), parseInt(datas[2])), 50000);
    } else if (arguments.length === 5) {
        constructor(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], 50000);
    } else if (arguments.length === 6) {
        constructor.apply(null, arguments);
    } else if(arguments.length === 0) {
        constructor();
    }
};

UserInfo.prototype.getUserKey = function () {
    return this.userKey;
};
UserInfo.prototype.getUserName = function () {
    return this.userName;
};
UserInfo.prototype.getEquipCard = function () {
    return this.equipedCard;
};
UserInfo.prototype.getPatternInfo = function () {
    return this.pattern;
};
UserInfo.prototype.getPatternLev = function () {
    return this.patternLev;
};

UserInfo.prototype.getCardLevel = function () {
    return this.getEquipCard().getLevel();
};
UserInfo.prototype.getCardGrade = function () {
    return this.getEquipCard().getGradeType();
};

UserInfo.prototype.getDesignation = function () {
    if (this.rank < 0) return -1;
    else if (this.rank == 1)return 3;
    else if (this.rank >= 2 && this.rank <= 10) return 2;
    else if (this.rank >= 11 && this.rank <= 100) return 1;
    else return 0;
};

/**
 * 랭킹의 chrCode에 등록할 형식의 스트링데이터.
 * @return
 */
UserInfo.prototype.makeCardInfoStr = function () {
    return this.getEquipCard().getCardInfo().getIdx() + "#" + this.getEquipCard().getLevel() + "#" + this.getEquipCard().getGrade() + "#"
        + this.getPatternInfo().getExeType() + "#" + this.getPatternLev();
};

UserInfo.prototype.setRank = function (rank) {
    this.rank = rank;
};
