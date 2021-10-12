var MyInfo = new function() {
	var _this = new UserInfo();
	var lev, exp, rankPt;
	var treasureCnt;
	var emblem;
    
	_this.Rev_MyInfo = function(info) {
		setName(info.userId);
		setUserKey(info.userKey-0);
//		setRaidInfo(info.attrStr01);
		setRankScore(info.weeklyScore-0);
		treasureCnt = (info.attrNum01) ? info.attrNum01-0 : 0;
//		StoryModeManager.Rev_LastStage(info.lastStage);
        TutorialManager.setTutorial(info.tutorial);
	};

	_this.Rev_MyLevel = function(result) {
//		var maxLev = GameProperty.getMaxLevel();
//		lev = Math.min(maxLev, result.lev-0);
//		exp = lev==maxLev?0:(result.exp-0);
	};

	_this.Rev_MyRank = function(rankarr) {
		if(rankarr.length==0) _this.rank = 0;
		else {
			var rankInfo = rankarr[0];
			if(rankInfo.userKey==_this.userKey) {
				_this.rank = rankInfo.rank-0;
				rankPt = rankInfo.score-0;
			} else {
				_this.rank = 0;
			}
		}
	};
    
//    this.renderUserInfo = function(g) {
//        g.drawImage(userCharImg, 48, 415);
//        g.drawImage(userDesignation, 41, 358);
//        g.setColor(COLOR_WHITE);
//        g.setFont(FONT_15);
//        EmblemManager.renderLeft(g, userEmblem, myinfo.getUserName(), 152, 399);
//
//        lFont.render(g, myinfo.getLevel(), 181, 428, 11, FONT_LEFT);
//        lFont.render(g, myinfo.getRankPoint(), 253, 455, 11, FONT_LEFT);
//        lFont.renderWithAfterIcon(g, myinfo.getRanking(), 253, 482, 11, wiImg, 11, -1, FONT_LEFT);
//        g.drawImage(expbar, 0, 0, Math.floor(133 * expRate), 18, 210, 428, Math.floor(133 * expRate), 18);
//        g.drawImage(expImg, 220, 430);
//        sFont.renderWithAfterIcon(g, Math.floor(expRate * 100), 259, 429, 9, percent, 12, 1, FONT_LEFT);
//    }
    
	var setEmblem = function(string) { _this.emblem = string; };
	var setUserKey = function(userkey) { _this.userKey = userkey; };
	var setName = function(name) {
        var na;
        if (name != null || name != undefined) {
            if (name.length > 8) {
                na = name.substr(0, 8) + "..";
            } else {
                na = name;
            }
        } else {
            na = name;
        }
        _this.userName = na;
    };
//	var setRaidInfo = function(data) { RaidModeManager.parseRaidInfo(data); };
	var setRankScore = function(score) { rankPt = score; };
	_this.loadEmblem = function(info, onload) {
		EmblemManager.loadEmblem(info["emblem"], function (_emblem) {
			emblem = _emblem;
			if(onload) onload();
		});
	};

	_this.isLevelUp = function(expAmount) { return GameProperty.getLevelupExp(lev)<=exp+expAmount; };
	_this.getExpRate = function() { return (exp-GameProperty.getLevelupExp(lev-1))/(GameProperty.getLevelupExp(lev)-GameProperty.getLevelupExp(lev-1)); };
	_this.getEquipCard = function() { return CardManager.getCurCard(); };
	_this.getPatternInfo = function() { return PatternManager.getCurPatternInfo(); };
	_this.getPatternLev = function() { return PatternManager.getCurPatternLev(); };
	_this.getRankPoint = function() { return rankPt; };
	_this.getRanking = function() { return _this.rank; };
	_this.getLevel = function() { return lev; };
	_this.getExp = function() { return exp; };
	_this.getEmblem = function() { return emblem; };
	_this.getTreasureCnt = function() { return Math.min(20, treasureCnt); };

	return _this;
};
