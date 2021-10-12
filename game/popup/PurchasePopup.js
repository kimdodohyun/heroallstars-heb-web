// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var PurchasePopup = new function() {
    var INSTANCE = this;
    
    var listener;
    
    var frameCnt = 0;
    var focus = 0;
    var type = 0;
    
    var isKeyLock;
    
    var back;
    var btn_cancel_off;
    var btn_cancel_on;
    var btn_gem_off;
    var btn_gem_on;
    var btn_gold_off;
    var btn_gold_on;
    
    var productImg;
    var price;
    var amount;
    
    INSTANCE.setProduct = function(_img, _price, _amount, _type) {
        productImg = _img;
        price = _price;
        amount = _amount;
        type = _type;
    };
    
    INSTANCE.clear = function() {
        back = null;
        btn_cancel_off = null;
        btn_cancel_on = null;
        btn_gem_off = null;
        btn_gem_on = null;
        btn_gold_off = null;
        btn_gold_on = null;
        productImg = null;
    };
    
    INSTANCE.setResource = function(onload) {
        
        var imgParam = [
            [back = new Image(), ROOT_IMG + "popup/purchase/back" + EXT_PNG],
            [btn_cancel_off = new Image(), ROOT_IMG + "popup/purchase/btn_cancel_off" + EXT_PNG],
            [btn_cancel_on = new Image(), ROOT_IMG + "popup/purchase/btn_cancel_on" + EXT_PNG],
            [btn_gem_off = new Image(), ROOT_IMG + "popup/purchase/btn_gem_off" + EXT_PNG],
            [btn_gem_on = new Image(), ROOT_IMG + "popup/purchase/btn_gem_on" + EXT_PNG],
            [btn_gold_off = new Image(), ROOT_IMG + "popup/purchase/btn_gold_off" + EXT_PNG],
            [btn_gold_on = new Image(), ROOT_IMG + "popup/purchase/btn_gold_on" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("PurchasePopup setResource Fail!!!!", this);
        });
    };
    
    
    var lackCheck = function(_code, _price) {
        
        var str;
        var code = _code;
        var remainAmount;
        
        if (code == "GOLD") {
            remainAmount = ItemManager.checkPrice(code, _price);
            str = "골드가";
        } else if (code == "GEM") {
            remainAmount = ItemManager.checkPrice(code, _price);
            str = "보석이";
        }
        
        if (remainAmount < 0) {
            PopupMgr.openPopup(appMgr.getMessage2BtnPopup(str + " 부족합니다.|충전하러 이동 하시겠습니까?"), function (code, data) {
                if (data == ("0")) {
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    if (_code == "GOLD") {
                        type = 1;
                    } else if (_code == "GEM") {
                        type = 0;
                    }
                } else {
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                }
            });
            return true;
        }
        return false;
    };
    
    var enterKeyAction = function(_focus) {
        if (listener) listener(INSTANCE, focus + "");
    };
    
    return {
        toString: function() {
            return "PurchasePopup";
        },
        init: function(onload, callback) {
            focus = 0;
            isKeyLock = false;
            listener = callback;
            onload();
        },
        start: function() {

        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(back, 300, 121);
            
            g.setFont(FONT_30);
            g.setColor(COLOR_WHITE);
            
            if (amount.length > 1) {
                g.drawImage(productImg, 452, 225);
                
                if (amount.length == 2) {
                    for (var i = 0; i < amount.length; i++) {
                        HTextRender.oriRender(g, amount[i], 740, 295 + (i * 36), HTextRender.CENTER);
                    }
                } else if (amount.length == 5) {
                    for (var i = 0; i < amount.length; i++) {
                        HTextRender.oriRender(g, amount[i], 740, 240 + (i * 36), HTextRender.CENTER);
                    }
                } else {
                    for (var i = 0; i < amount.length; i++) {
                        HTextRender.oriRender(g, amount[i], 740, 280 + (i * 36), HTextRender.CENTER);
                    }
                }
                
                g.setFont(FONT_22);
                HTextRender.oriRender(g, "아이템을 구매하시겠습니까?", 640, 451, HTextRender.CENTER);
                
                g.setFont(FONT_18);
                g.setColor(COLOR_RED);
                HTextRender.oriRender(g, "※구매한 상품은 우편함에서 확인하세요!", 640, 482, HTextRender.CENTER);
            } else {
                g.drawImage(productImg, 562, 213);
                HTextRender.oriRender(g, amount, 640, 393, HTextRender.CENTER);
                
                g.setFont(FONT_22);
                HTextRender.oriRender(g, "아이템을 구매하시겠습니까?", 640, 467, HTextRender.CENTER);
            }
            
            if (type == 0) {
                g.drawImage(btn_gem_off, 481, 502);
            } else {
                g.drawImage(btn_gold_off, 481, 502);
            }
            g.drawImage(btn_cancel_off, 641, 502);
            
            if (focus == 0) {
                
                if (type == 0) {
                    g.drawImage(btn_gem_on, 481, 502);
                } else {
                    g.drawImage(btn_gold_on, 481, 502);
                }
                
            } else {
                g.drawImage(btn_cancel_on, 641, 502);
            }
            
            g.setFont(FONT_24);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, price, 580, 542, HTextRender.CENTER);
        },
        stop: function() {
            
        },
        onKeyPressed: function(key) {
            
            if (isKeyLock) return;
            switch(key) {
                case KEY_ENTER :
                    isKeyLock = true;
                    enterKeyAction(focus);
                    break;
                case KEY_LEFT:
                    focus = HTool.getIndex(focus, -1, 2);
                    break;
                case KEY_RIGHT:
                    focus = HTool.getIndex(focus, 1, 2);
                    break;
                case KEY_PREV:
                case KEY_PC_F4:
                    if (listener) listener(INSTANCE, "1");
                    break;
                default:
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