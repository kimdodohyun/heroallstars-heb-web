var CommonUIDrawManager = new function(){
	var bNumFont = null, rNumFont = null, yNumFont = null, wNumFont = null;;
    var lNumFont = null, l2NumFont = null;
	var slash = null, colon = null, max = null, lv = null, percent = null;
    
    var bar_id, bar_key, bar_stone_red, bar_stone_blue, bar_stone_black, bar_coin, bar_gem;
	
	this.renderMoney = function(g) {
		
		if (bNumFont != null) {
            this.renderToken(g);
            
            g.drawImage(bar_stone_red, 492, 12);
            g.drawImage(bar_stone_blue, 638, 12);
            g.drawImage(bar_stone_black, 782, 12);
            g.drawImage(bar_coin, 926, 12);
            g.drawImage(bar_gem, 1097, 13);
            
            g.setFont(FONT_20);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, itemMgr.getRedStoneAmount(), 585, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getBlueStoneAmount(), 730, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getBlackStoneAmount(), 874, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getGoldAmountForRender(), 1029, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getGemAmountForRender(), 1201, 43, HTextRender.CENTER);
		}
	};
    
    this.renderMain = function(g) {
        if (bNumFont != null) {
            this.renderInfo(g);
            this.renderToken(g);
            
            g.drawImage(bar_stone_red, 492, 12);
            g.drawImage(bar_stone_blue, 638, 12);
            g.drawImage(bar_stone_black, 782, 12);
            g.drawImage(bar_coin, 926, 12);
            g.drawImage(bar_gem, 1097, 13);
            
            g.setFont(FONT_20);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, itemMgr.getRedStoneAmount(), 585, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getBlueStoneAmount(), 730, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getBlackStoneAmount(), 874, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getGoldAmountForRender(), 1029, 43, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getGemAmountForRender(), 1201, 43, HTextRender.CENTER);
		}
    };
    
    var gameMoney = 0;
    
    this.setGameMoney = function() {
        gameMoney = 0;
    };
    
    this.increaseGameMoney = function(_gold) {
        gameMoney += _gold;
    };
    
    this.decreaseGameMoney = function(_gold) {
        gameMoney -= _gold;
    };
    
    this.getGameMoneyGold = function() {
        return gameMoney;
    };
    
    this.renderMoneyForGame = function(g) {
        rNumFont.render(g, gameMoney, 910, 18, 16, HTextRender.CENTER);
    };
	
    this.checkPrice = function(code, price) {
        if (code == "GEM") return gameGem - price;
        else if (code == "GOLD") return gameMoney - price;
        else return 0;
    };
    
	this.renderToken = function(g) {
		var amount = tokenMgr.getAmount();
        
        g.drawImage(bar_key, 349, 11);
        g.setFont(FONT_20);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, tokenMgr.getAmount(), 440, 43, HTextRender.CENTER);
        if (amount < 10) {
            if (tokenMgr.getRemainSecStr() < 10) {
                HTextRender.oriRender(g, tokenMgr.getRemainMinStr() + ":0" + tokenMgr.getRemainSecStr(), 440, 75, HTextRender.CENTER);
            } else {
                HTextRender.oriRender(g, tokenMgr.getRemainMinStr() + ":" + tokenMgr.getRemainSecStr(), 440, 75, HTextRender.CENTER);    
            }
        }
	};
	
	this.renderStone = function(g) {
		bNumFont.render(g, itemMgr.getGoldAmountForRender(), 74, 37, 11, HTextRender.LEFT);
		bNumFont.render(g, itemMgr.getGemAmountForRender(), 199, 37, 11, HTextRender.LEFT);
	};
    
    this.renderInfo = function(g) {
        g.drawImage(bar_id, 24, 14);
        g.setFont(FONT_20);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, MyInfo.getUserName(), 114, 43, HTextRender.CENTER);
    };

	this.setResource = function(onload) {
		bNumFont = PlayResManager.getMoneyMap().get("bNumFont");
        rNumFont = PlayResManager.getMoneyMap().get("rNumFont");
        yNumFont = PlayResManager.getMoneyMap().get("yNumFont");
        lNumFont = PlayResManager.getMoneyMap().get("lNumFont");
        l2NumFont = PlayResManager.getMoneyMap().get("l2NumFont");
        wNumFont = PlayResManager.getMoneyMap().get("wNumFont");
        lv = PlayResManager.getMoneyMap().get("lv");
        percent = PlayResManager.getMoneyMap().get("percent");
        
        
        bar_id = PlayResManager.getMoneyMap().get("bar_id");
        bar_key = PlayResManager.getMoneyMap().get("bar_key");
        bar_stone_red = PlayResManager.getMoneyMap().get("bar_stone_red");
        bar_stone_blue = PlayResManager.getMoneyMap().get("bar_stone_blue");
        bar_stone_black = PlayResManager.getMoneyMap().get("bar_stone_black");
        bar_coin = PlayResManager.getMoneyMap().get("bar_coin");
        bar_gem = PlayResManager.getMoneyMap().get("bar_gem");
        
        
        onload();
	};
	
	this.removeResource = function() {
		if(bNumFont!=null) bNumFont.dispose();
		if(rNumFont!=null) rNumFont.dispose();
        if(yNumFont!=null) yNumFont.dispose();
        if(lNumFont!=null) lNumFont.dispose();
        if(l2NumFont!=null) l2NumFont.dispose();
        
		bNumFont = null;
		rNumFont = null;
        yNumFont = null;
        lNumFont = null;
        l2NumFont = null;
        wNumFont = null;
		slash = null;
		colon = null;
		max = null;
        lv = null;
        percent = null;
        
        bar_id = null;
        bar_key = null;
        bar_stone_red = null;
        bar_stone_blue = null;
        bar_stone_black = null;
        bar_coin = null;
        bar_gem = null;
	};
	
	this.destroy = function() {
		this.removeResource();
	};
};

var uiDrawMgr = CommonUIDrawManager;
