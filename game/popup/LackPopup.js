"use strict";
"use warning";

var LackPopup = new function() {
    var INSTANCE = this;
    
    var frameCnt;
    var xKey;
    var flag;
    
    var exchangeRuby;
    var exchangeGold;
    var isKeyLock;
    
    var num;
    var button_s_on;
    var close;
    var ok;
    var use;
    var button_reset_on;
    var charge;
    var ruby;
    var button_s_off;
    var button_reset_off;
    var popup_s_center;
    var popup_s_left;
    var popup_s_right;
    
    var ticketToRuby = [" 티켓이 부족합니다.", "보석을 사용하여 구매하실 수 있습니다."];
	var goldToRuby = [" 골드가 부족합니다.", "보석을 사용하여 구매하실 수 있습니다."];
	var rubyCharge_Str = "보석이 부족합니다. 충전 하시겠습니까?";
    
    INSTANCE.setResource = function(onload) {
        
        var imgParam = [
            [num = [], HTool.getURLs(ROOT_IMG + "popup/result/num/", "num_", EXT_PNG, 10)],
            [button_s_on = [], HTool.getURLs(ROOT_IMG + "popup/payment/", "button_s_on_", EXT_PNG, 2)],
            [close = [], HTool.getURLs(ROOT_IMG + "popup/payment/", "close_", EXT_PNG, 2)],
            [ok = [], HTool.getURLs(ROOT_IMG + "popup/payment/", "ok_", EXT_PNG, 2)],
            [charge = [], HTool.getURLs(ROOT_IMG + "popup/payment/", "charge_", EXT_PNG, 2)],
            [use = [], HTool.getURLs(ROOT_IMG + "popup/payment/", "use_", EXT_PNG, 2)],
            [button_reset_on = [], HTool.getURLs(ROOT_IMG + "skillscene/", "button_reset_on_", EXT_PNG, 2)],
          
            [button_reset_off = new Image(), ROOT_IMG + "skillscene/button_reset_off" + EXT_PNG],
            [button_s_off = new Image(), ROOT_IMG + "popup/payment/button_s_off" + EXT_PNG],
            [popup_s_center = new Image(), ROOT_IMG + "popup/payment/popup_s_center" + EXT_PNG],
            [popup_s_left = new Image(), ROOT_IMG + "popup/payment/popup_s_left" + EXT_PNG],
            [popup_s_right = new Image(), ROOT_IMG + "popup/payment/popup_s_right" + EXT_PNG],
            [ruby = new Image(), ROOT_IMG + "popup/payment/ruby" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            console.error("POP_LACK setResource end");
            onload();
            imgParam = null;
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("LackPopup setResource Fail", this);
        });
    };
    
    INSTANCE.setFlag = function(_flag) {
        flag = _flag;
    };
    
    INSTANCE.exchageGoldToRuby = function(amount) {
        exchangeGold = amount;
        if (exchangeGold < 1000) {
            exchangeRuby = 1;
        } else {
            exchangeRuby = exchangeGold / 100;
        }
        
        flag = 3;
    };
    
    var lackRender = function(g) {
        g.drawImage(button_s_off, 339, 315);
		g.drawImage(button_s_off, 493, 315);
		g.drawImage(ok[0], 384, 326);
		g.drawImage(close[0], 538, 327);
		
		switch (xKey) {
            case 0:
                g.drawImage(button_s_on[Math.floor(frameCnt / 2 % 2)], 339, 315);
                g.drawImage(ok[1], 384, 326);
                break;
            case 1:
                g.drawImage(button_s_on[Math.floor(frameCnt / 2 % 2)], 493, 315);
                g.drawImage(close[1], 538, 327);
                break;
		}
    };
    
    var changeRender = function(g) {
        g.drawImage(button_reset_off, 323, 315);
		g.drawImage(button_s_off, 509, 315);
		g.drawImage(use[0], 419, 327);
		g.drawImage(close[0], 554, 327);
		
		switch (xKey) {
		case 0:
			g.drawImage(button_reset_on[Math.floor(frameCnt / 2 % 2)], 323, 315);
			g.drawImage(use[1], 419, 327);
			break;
		case 1:
			g.drawImage(button_s_on[Math.floor(frameCnt / 2 % 2)], 509, 315);
			g.drawImage(close[1], 554, 327);
			break;
		}
		
		g.drawImage(ruby, 342, 328);
		KUtil.centerNumberDraw(g, num, KUtil.convertNumber(exchangeRuby), 388, 330, 11);
    };
    
    return {
        toString: function() {
            return "LackPopup";
        },
        init: function(onload) {
            frameCnt = 0;
            xKey = 0;
            isKeyLock = false;
            
            onload();
        },
        start: function() {

        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            
            g.setColor(COLOR_SKILL_POPUP_BASE);
            g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            g.drawImage(popup_s_left, 255, 177);
            g.drawImage(popup_s_center, 279, 177, 402, 168);
            g.drawImage(popup_s_right, 681, 177);

            g.setColor(COLOR_POPUP_TEXT);
            g.setFont(FONT_17);
            
            switch (flag) {
                case 0: // 티켓부족

                    HTextRender.oriRender(g, ticketToRuby[0], 480, 249, HTextRender.CENTER);
                    HTextRender.oriRender(g, ticketToRuby[1], 480, 275, HTextRender.CENTER);
                    lackRender(g);

                    break;
                case 1: // 골드부족

                    HTextRender.oriRender(g, goldToRuby[0], 480, 249, HTextRender.CENTER);
                    HTextRender.oriRender(g, goldToRuby[1], 480, 275, HTextRender.CENTER);
                    lackRender(g);

                    break;
                case 2: // 루비부족

                    HTextRender.oriRender(g, rubyCharge_Str, 481, 267, HTextRender.CENTER);
                    lackRender(g);

                    break;

                case 3: // 골드대체

                    HTextRender.oriRender(g, exchangeGold + goldToRuby[0], 480, 249, HTextRender.CENTER);
                    HTextRender.oriRender(g, goldToRuby[1], 480, 275, HTextRender.CENTER);
                    changeRender(g);

                    break;
            }
        },
        stop: function() {
        },
        dispose: function() {
            num = null;
            button_s_on = null;
            close = null;
            ok = null;
            use = null;
            button_reset_on = null;
            ruby = null;
            button_s_off = null;
            button_reset_off = null;
            popup_s_center = null;
            popup_s_left = null;
            popup_s_right = null;
            charge = null;
        },
        onKeyPressed: function(key) {
            
            if (isKeyLock) return;
            
            switch(key) {
                case KEY_PREV:
                    PopupMgr.closePopup(POPUP.POP_LACK);
                    break;
                    
                case KEY_ENTER:
                    
                    switch (flag) {
                        case 3:
                            
                            switch (xKey) {
                                case 0:
                                    isKeyLock = true;
                                    NetManager.Req_ChargeMoney("RUBY", -exchangeRuby, "EXCHANGE", function(response) {
                                        if (NetManager.isSuccess(response)) {
                                            PopupMgr.closePopup(POPUP.POP_INPUTPASSWORD);
                                            ItemManager.Rev_ConsumeItem(NetManager.getResult(response, 1));
                                            isKeyLock = false;
                                        } else {
                                            isKeyLock = false;
                                            appMgr.openDisconnectPopup(" Fail!!!!");
                                        }
                                    });
                                    break;
                                    
                                case 1:
                                    PopupMgr.closePopup(POPUP.POP_LACK);
                                    break;
                            }
                            break;
                            
                        default:
                            
                            switch (xKey) {
                                case 0:
                                    PopupMgr.closePopup(POPUP.POP_LACK);
                                    POPUP.POP_PURCHASE.getInstance().setPurchaseType(flag);
                                    PopupMgr.openPopup(POPUP.POP_PURCHASE);
                                    break;
                                    
                                case 1:
                                    PopupMgr.closePopup(POPUP.POP_LACK);
                                    break;
                            }
                            
                            break;
                    }
                    break;
                    
                case KEY_LEFT:
                    xKey = HTool.getIndex(xKey, -1, 2);
                    break;
                    
                case KEY_RIGHT:
                    xKey = HTool.getIndex(xKey, 1, 2);
                    break;
            }
            UIMgr.repaint();
        },
        onKeyReleased: function(key) {
            switch(key) {
                case KEY_ENTER :
                    break;
            }
        },
        getInstance: function() {
            return INSTANCE;
        }
    };
};