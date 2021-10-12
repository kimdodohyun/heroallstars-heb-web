// Strict Mode On (엄격모드)
"use strict";
"use warning";

//////////////////////////////////////////
//          0버튼 알림 팝업               //
//////////////////////////////////////////
var Message0BtnPopup = new function() {
    var INSTANCE = this;
    var tipColor = "rgb(248,237,152)";

    var bg;

    var Msg = [];

    // custom var

    INSTANCE.setMessage = function(_msg) {
        Msg = _msg.split('|');
    };
    // HMF Default Function
    return {
        toString: function() {
            return "Message0BtnPopup";
        },
        setResource: function(onload) {
            var imgParam = [
                [bg = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG]
            ];
            try {
                ResourceMgr.makeImageList(imgParam, function() {
                    imgParam = null;
                    onload();
                }, function(err) {
                    // 에러처리
                    HLog.err(err.message);
                    GameManager.openDisconnectPopup(err.message, toString());
                    onload();
                });
            } catch (err) {
                HLog.err(err.message);
            }
        },
        init: function(onload) {
            onload();
        },
        start: function() {
            // To Do .. 
        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(bg, 300, 206);

            g.setFont(FONT_22);
            g.setColor(COLOR_WHITE);
            for (var i = 0; i < Msg.length; i++) {
                HTextRender.oriRender(g, Msg[i], 640, 323 - (14 * (Msg.length - 1)) + (32 * i), HTextRender.CENTER);
            }
        },
        stop: function() {
        },
        dispose: function() {
            bg = null;
            Msg = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_PREV:
                    // 일반적인 레이어 전환
                    break;
                case KEY_ENTER :
                    // 전환 될 레이어로 데이터 혹은 콜백 함수를 넘겨주며 전환
                    var data = 0;
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

//////////////////////////////////////////
//          1버튼 알림 팝업               //
//////////////////////////////////////////
var Message1BtnPopup = new function() {
    var INSTANCE = this;
    var tipColor = "rgb(248,237,152)";

    var threadCnt = 0;
    var bg;
    var btn = [];
    var btn_txt;
    var font;

    var Msg = [];

    var listener;
    // custom var

    INSTANCE.setMessage = function() {
        if (arguments.length == 2) {
            font = arguments[1];
        } else if (arguments.length == 1) {
            font = FONT_17;
        }
        Msg = arguments[0].split('|');
    };
    // HMF Default Function
    return {
        toString: function() {
            return "Message1BtnPopup";
        },
        init: function(onload, loadData) {
            listener = loadData;
            btn = [];
            var imgParam = [
                [bg = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG],
                [btn[0] = new Image(), ROOT_IMG + "popup/btn_ok_off" + EXT_PNG],
                [btn[1] = new Image(), ROOT_IMG + "popup/btn_ok_on" + EXT_PNG]
            ];
            
            try {
                ResourceMgr.makeImageList(imgParam, function() {
                    imgParam = null;
                    onload();
                }, function(err) {
                    // 에러처리
                    HLog.err(err.message);
                    GameManager.openDisconnectPopup(err.message, toString());
                    onload();
                });
            } catch (err) {
                HLog.err(err.message);
            }
        },
        start: function() {
            // To Do .. 
        },
        run: function() {
            threadCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(bg, 300, 206);
            g.drawImage(btn[1], 562, 386);

            g.setFont(FONT_22);
            g.setColor(COLOR_WHITE);
            for (var i = 0; i < Msg.length; i++) {
                HTextRender.oriRender(g, Msg[i], 640, 313 - (14 * (Msg.length - 1)) + (32 * i), HTextRender.CENTER);
            }
        },
        stop: function() {
            bg = null;
            btn = null;
            Msg = null;
        },
        dispose: function() {
            // 어플리케이션이 종료될 때 실행되는 함수
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    if (listener != null)
                        listener(key, "OK");
                    else PopupMgr.closeAllPopup(); //PopupMgr.closePopup(POPUP.POP_MESSAGE_1);
                    break;
                case KEY_PREV :
                    if (listener != null)
                        listener(key, "CLOSE");
                    else PopupMgr.closeAllPopup(); //PopupMgr.closePopup(POPUP.POP_MESSAGE_1);
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

var Inven1BtnPopup = new function() {
    var INSTANCE = this;
    var tipColor = "rgb(248,237,152)";

    var threadCnt = 0;
    var bg;
    var btn = [];
    var btn_txt;
    var iconImg;
    var iconIdx;
    var amount;

    var Msg = [];

    var listener;
    // custom var

    INSTANCE.setMessage = function(_msg, _iconIdx, _amount) {
        Msg = _msg.split('|');
        iconIdx = _iconIdx;
        amount = Number(_amount);
    };
    // HMF Default Function
    return {
        toString: function() {
            return "Message1BtnPopup";
        },
        init: function(onload, loadData) {
            listener = loadData;
            btn = [];
            iconImg = [];
            var imgParam = [
                [bg = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG],
                [btn[0] = new Image(), ROOT_IMG + "popup/btn_ok_off" + EXT_PNG],
                [btn[1] = new Image(), ROOT_IMG + "popup/btn_ok_on" + EXT_PNG],
                [iconImg[0] = new Image(), ROOT_IMG + "popup/icon_upgradestone_black" + EXT_PNG],
                [iconImg[1] = new Image(), ROOT_IMG + "popup/icon_upgradestone_blue" + EXT_PNG],
                [iconImg[2] = new Image(), ROOT_IMG + "popup/icon_upgradestone_red" + EXT_PNG]
            ];
            
            try {
                ResourceMgr.makeImageList(imgParam, function() {
                    imgParam = null;
                    onload();
                }, function(err) {
                    // 에러처리
                    HLog.err(err.message);
                    GameManager.openDisconnectPopup(err.message, toString());
                    onload();
                });
            } catch (err) {
                HLog.err(err.message);
            }
        },
        start: function() {
            // To Do .. 
        },
        run: function() {
            threadCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(bg, 300, 206);
            g.drawImage(btn[1], 562, 386);
            
            g.drawImage(iconImg[iconIdx], 583, 251);
            g.setFont(FONT_30);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, amount, 639, 286, HTextRender.LEFT);

            g.setFont(FONT_22);
            for (var i = 0; i < Msg.length; i++) {
                HTextRender.oriRender(g, Msg[i], 640, 345 - (14 * (Msg.length - 1)) + (32 * i), HTextRender.CENTER);
            }
        },
        stop: function() {
            bg = null;
            btn = null;
            Msg = null;
            iconImg = null;
            amount = null;
        },
        dispose: function() {
            // 어플리케이션이 종료될 때 실행되는 함수
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    if (listener != null)
                        listener(key, "OK");
                    else PopupMgr.closeAllPopup(); //PopupMgr.closePopup(POPUP.POP_MESSAGE_1);
                    break;
                case KEY_PREV :
                    if (listener != null)
                        listener(key, "CLOSE");
                    else PopupMgr.closeAllPopup(); //PopupMgr.closePopup(POPUP.POP_MESSAGE_1);
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

//////////////////////////////////////////
//          2버튼 알림 팝업               //
//////////////////////////////////////////
var Message2BtnPopup = new function() {
    var INSTANCE = this;

    var threadCnt = 0;
    var bg;
    var btnOk = [];
    var btnCancel = [];
    var btnOkOff;
    var btnCancelOff;
    var font;
    
    var btnStr;
    
    var Msg = [];

    var listener;
    var isApply;
    var focusId;
    
    var isTimeout;
    var timeoutCnt;
    var closeTimeout;
    var startTimeMS = 0;
    

    INSTANCE.setMessage = function() {
//        if (arguments.length == 2) {
//            font = arguments[1];
//        } else if (arguments.length == 1) {
//            font = FONT_20;
//        }
        if (arguments.length == 2) {
            btnStr = arguments[1];
        } else if (arguments.length == 1) {
            btnStr = "btn_ok_";
        }
        
        Msg = arguments[0].split('|');
    };
    
    INSTANCE.setTime = function() {
        isTimeout = true;
        timeoutCnt = 6000;
    };
    
    var getRemainingTime = function() {
        return Math.floor((timeoutCnt - ((new Date()).getTime() - startTimeMS)) / 1000);
    };
    
    // HMF Default Function
    return {
        toString: function() {
            return "Message2BtnPopup";
        },
        init: function(onload, loadData) {
            listener = loadData;
            isApply = false;
            focusId = 0;
            var imgParam = [
                [bg = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG],
                [btnCancel = new Image(), ROOT_IMG + "popup/btn_cancel_on" + EXT_PNG],
                [btnCancelOff = new Image(),ROOT_IMG + "popup/btn_cancel_off" + EXT_PNG]
            ];
            
            imgParam.push([btnOk = new Image(), ROOT_IMG + "popup/" + btnStr + "on" + EXT_PNG]);
            imgParam.push([btnOkOff = new Image(), ROOT_IMG + "popup/" + btnStr + "off" + EXT_PNG]);
            
            try {
                ResourceMgr.makeImageList(imgParam, function() {
                    imgParam = null;
                    onload();
                }, function(err) {
                    // 에러처리
                    HLog.err(err.message);
                    GameManager.openDisconnectPopup(err.message, toString());
                    onload();
                });
            } catch (err) {
                HLog.err(err.message);
            }
        },
        start: function() {
            if (isTimeout) {
                startTimeMS = (new Date()).getTime();
                clearTimeout(closeTimeout);
                closeTimeout = null;
                closeTimeout = setTimeout(function () {
                    if (listener) listener(INSTANCE, "0");
                    clearTimeout(closeTimeout);
                    closeTimeout = null;
                }, timeoutCnt);
            }
        },
        run: function() {
            threadCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(bg, 300, 206);
            if (focusId == 0) {
                g.drawImage(btnOk, 481, 386);
                g.drawImage(btnCancelOff, 641, 386);
            } else {
                g.drawImage(btnOkOff, 481, 386);
                g.drawImage(btnCancel, 641, 386);
            }

            if (isTimeout) {
                g.setFont(FONT_22);
                g.setColor(COLOR_WHITE);
                for (var i = 0; i < Msg.length; i++) {
                    HTextRender.oriRender(g, Msg[i], 640, 283 - (14 * (Msg.length - 1)) + (32 * i), HTextRender.CENTER);
                }
                
                if (getRemainingTime() > -1) {
                    g.setFont(FONT_36);
                    g.setColor(COLOR_YELLOW);
                    HTextRender.oriRender(g, getRemainingTime(), 640, 356, HTextRender.CENTER);
                }
            } else {
                g.setFont(FONT_22);
                g.setColor(COLOR_WHITE);
                for (var i = 0; i < Msg.length; i++) {
                    HTextRender.oriRender(g, Msg[i], 640, 313 - (14 * (Msg.length - 1)) + (32 * i), HTextRender.CENTER);
                }
            }
        },
        stop: function() {
            bg = null;
            btnOk = null;
            btnCancel = null;
            btnOkOff = null;
            btnCancelOff = null;
            Msg = null;
            isTimeout = false;
            clearTimeout(closeTimeout);
            closeTimeout = null;
        },
        dispose: function() {
            // 어플리케이션이 종료될 때 실행되는 함수
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    if (!isApply) {
                        isApply = true;
                        if (listener)
                             listener(INSTANCE, focusId + "");
                        else if (focusId == 0) PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    }
                    return;
                case KEY_LEFT :
                    focusId = HTool.getIndex(focusId, -1, 2);
                    break;
                case KEY_RIGHT :
                    focusId = HTool.getIndex(focusId, 1, 2);
                    break;
                case KEY_PREV:
                    isApply = false;
                    if (listener) listener(INSTANCE, "CLOSE");
                    else PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
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

//////////////////////////////////////////
//          2버튼 알림 팝업               //
//////////////////////////////////////////
var Inven2BtnPopup = new function() {
    var INSTANCE = this;

    var threadCnt = 0;
    var bg;
    var btnOk = [];
    var btnCancel = [];
    var btnOkOff;
    var btnCancelOff;
    var iconImg = [];
    var heroImg;
    var iconIdx;
    var amount;
    var heroRes;
    var arrow;
    
    var Msg = [];

    var listener;
    var isApply;
    var focusId;
    // custom var

    INSTANCE.setMessage = function() {
        Msg = arguments[0].split('|');
        iconIdx = arguments[1];
        amount = Number(arguments[2]);
        heroRes = arguments[3];
    };
    // HMF Default Function
    return {
        toString: function() {
            return "Message2BtnPopup";
        },
        init: function(onload, loadData) {
            listener = loadData;
            isApply = false;
            focusId = 0;
            
            iconImg = [];
            
            var imgParam = [
                [bg = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG],
                [btnOk = new Image(), ROOT_IMG + "popup/btn_ok_on" + EXT_PNG],
                [btnCancel = new Image(), ROOT_IMG + "popup/btn_cancel_on" + EXT_PNG],
                [btnOkOff = new Image(), ROOT_IMG + "popup/btn_ok_off" + EXT_PNG],
                [btnCancelOff = new Image(),ROOT_IMG + "popup/btn_cancel_off" + EXT_PNG],
                [iconImg[0] = new Image(), ROOT_IMG + "popup/icon_upgradestone_black" + EXT_PNG],
                [iconImg[1] = new Image(), ROOT_IMG + "popup/icon_upgradestone_blue" + EXT_PNG],
                [iconImg[2] = new Image(), ROOT_IMG + "popup/icon_upgradestone_red" + EXT_PNG],
                [heroImg = new Image(), ROOT_IMG + "game/myUnit/icon/s_hero_" + heroRes + EXT_PNG],
                [arrow = new Image(), ROOT_IMG + "world/arrow_right" + EXT_PNG]
            ];
            
            try {
                ResourceMgr.makeImageList(imgParam, function() {
                    imgParam = null;
                    onload();
                }, function(err) {
                    // 에러처리
                    HLog.err(err.message);
                    GameManager.openDisconnectPopup(err.message, toString());
                    onload();
                });
            } catch (err) {
                HLog.err(err.message);
            }
        },
        start: function() {
            // To Do .. 
        },
        run: function() {
            threadCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(bg, 300, 206);
            if (focusId == 0) {
                g.drawImage(btnOk, 481, 386);
                g.drawImage(btnCancelOff, 641, 386);
            } else {
                g.drawImage(btnOkOff, 481, 386);
                g.drawImage(btnCancel, 641, 386);
            }
            
            
            g.drawImage(heroImg, 535, 245);
            g.drawImage(arrow, 630, 253);
            g.drawImage(iconImg[iconIdx], 683, 250);
            
            g.setColor(COLOR_WHITE);
            g.setFont(FONT_30);
            HTextRender.oriRender(g, amount, 739, 281, HTextRender.LEFT);

            g.setFont(FONT_22);
            for (var i = 0; i < Msg.length; i++) {
                HTextRender.oriRender(g, Msg[i], 640, 343 - (14 * (Msg.length - 1)) + (32 * i), HTextRender.CENTER);
            }
        },
        stop: function() {
            bg = null;
            btnOk = null;
            btnCancel = null;
            btnOkOff = null;
            btnCancelOff = null;
            Msg = null;
            heroImg = null;
            arrow = null;
            iconImg = null;
        },
        dispose: function() {
            // 어플리케이션이 종료될 때 실행되는 함수
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    if (!isApply) {
                        isApply = true;
                        if (listener)
                            listener(INSTANCE, focusId + "");
                        else if (focusId == 0) PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    }
                    return;
                case KEY_LEFT :
                    focusId = HTool.getIndex(focusId, -1, 2);
                    break;
                case KEY_RIGHT :
                    focusId = HTool.getIndex(focusId, 1, 2);
                    break;
                case KEY_PREV:
                    isApply = false;
                    if (listener) listener(INSTANCE, "CLOSE");
                    else PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
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


var GetMailItemPopup = new function() {
    var INSTANCE = this;
    var callback;
    //#########################################################################
    // Default Popup
    //#########################################################################
    var bg, icon;
    var rewardStr;
    var grade = ["D급", "C급", "B급", "A급", "S급", "S+급"];

    INSTANCE.setResource = function(onload) {
        var a, b;
        var imgParam = [
            [bg = new Image(), ROOT_IMG + "popup/popup_message" + EXT_PNG]
        ];
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            StarmonManager.openDisconnectPopup("setReosurce fail!! -> " + err, INSTANCE);
        });
    };

    INSTANCE.setAllItems = function(_icon) {
        icon = _icon;
        rewardStr = null;
    };

    INSTANCE.setItem = function(_icon, itemCode, itemAmount, itemLevel) {
        icon = _icon;
        if (HTool.startsWidth(itemCode, "CARD_")) {
            rewardStr = grade[itemLevel] + " " + ItemManager.getItemName(itemCode);
        } else {
            rewardStr = ItemManager.getItemName(itemCode) + " " + ItemManager.getItemAmountbyServerAmount(itemCode, itemAmount);
        }
    };

    INSTANCE.removeResource = function() {
        bg = null;
        icon = null;
    };

    return {
        toString: function() {
            return "GetMailItemPopup";
        },
        init: function(onload, callbackFunc) {
            callback = callbackFunc;
            onload();
        },
        start: function() {

        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(bg, 362, 279);
            if (rewardStr == null) {
                g.drawImage(icon, 450 - ((40 + HTextRender.getStrWidth(g, "모든 선물을 받았습니다.")) / 2), 253);
                g.setFont(FONT_20);
                g.setColor(COLOR_BLACK);
                HTextRender.renderCenter(g, "모든 선물을 받았습니다.", 480 + 20, 277);
            } else {
                g.setFont(FONT_17);
                g.setColor(COLOR_BLACK);
                HTextRender.renderCenter(g, "선물을 받았습니다.", 480, 250);
                g.drawImage(icon, 450 - ((40 + HTextRender.getStrWidth(g, rewardStr)) / 2), 265);
                g.setFont(FONT_20);
                g.setColor(COLOR_BLACK);
                HTextRender.renderCenter(g, rewardStr, 480 + 20, 290);
            }
        },
        stop: function() {
        },
        onKeyPressed: function(key) {
            UIMgr.repaint();
        },
        onKeyReleased: function(key) {
        },
        getInstance: function() {
            return INSTANCE;
        }
    };
};

var LackOfGoldPopup = new function() {
    var INSTANCE = this;
    var callback;
    //#########################################################################
    // Default Popup
    //#########################################################################
    var isApply;
    var isLoad = false;

    var threndCnt = 0;
    var bg;
    var btn = [];
    var btntxt = [];

    var priceFont;
    var icon = [];

    var amountStr;
    var useStr;
    var focusId = 0;

    var setResource = function(onload) {
        try {
            var tmpPrice;
            btn = [];
            btntxt = [];
            icon = [];
            var imgParam = [
                [bg = new Image(), ROOT_IMG_POPUP + "popup_3" + EXT_PNG],
                [btn[0] = [], HTool.getURLs(ROOT_IMG_POPUP, "l_button_", EXT_PNG, 3)],
                [btn[1] = [], HTool.getURLs(ROOT_IMG_POPUP, "button_", EXT_PNG, 3)],
                [btntxt[0] = [], HTool.getURLs(ROOT_IMG_POPUP, "use_", EXT_PNG, 2)],
                [btntxt[1] = [], HTool.getURLs(ROOT_IMG_POPUP, "cancel_", EXT_PNG, 2)],
                [icon[0] = new Image(), ROOT_IMG_COMMON + "s_coin_diamond" + EXT_PNG],
                [icon[1] = new Image(), ROOT_IMG_COMMON + "s_coin_gold" + EXT_PNG],
                [tmpPrice = [], HTool.getURLs(ROOT_IMG_COMMON + "num/", "num_", EXT_PNG, 10)]
            ];
            ResourceMgr.makeImageList(imgParam, function() {
                priceFont = new NumberFontImage(tmpPrice);
                tmpPrice = null;
                isLoad = true;
                imgParam = null;
                onload();
            }, function(err) {
                StarmonManager.openDisconnectPopup("setResource fail!! -> " + err, INSTANCE);
            });
        } catch (e) {
            console.error("err = > " + e);
        }
    };

    INSTANCE.setAmount = function(amount) {
        amountStr = amount.toString();
        useStr = Math.ceil(amount * ItemManager.getExchangeRate()).toString();
    };

    return {
        toString: function() {
            return "LackOfGoldPopup";
        },
        init: function(onload, callbackFunc) {
            isLoad = false;
            callback = callbackFunc;
            isApply = false;
            focusId = 0;
            setResource(onload);
        },
        start: function() {

        },
        run: function() {
            threndCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            if (!isLoad) return;
            g.drawImage(bg, 265, 189);
            if (focusId == 0) {
                g.drawImage(btn[0][threndCnt % 2 + 1], 302, 312);
                g.drawImage(btntxt[0][1], 368 + Math.floor((37 + 11 * useStr.length) / 2), 321);
                priceFont.renderWithIcon(g, useStr, 366, 321, 11, icon[0], 30, 3, HTextRender.CENTER);
                g.drawImage(btn[1][0], 519, 312);
                g.drawImage(btntxt[1][0], 563, 321);
            } else {
                g.drawImage(btn[0][0], 302, 312);
                g.drawImage(btntxt[0][0], 368 + Math.floor((37 + 11 * useStr.length) / 2), 321);
                priceFont.renderWithIcon(g, useStr, 366, 321, 11, icon[0], 30, 3, HTextRender.CENTER);
                g.drawImage(btn[1][Math.floor(threndCnt / 2) % 2 + 1], 519, 312);
                g.drawImage(btntxt[1][1], 563, 321);
            }

            g.setFont(FONT_17);
            g.setColor(COLOR_BLACK);
            priceFont.renderWithIcon(g, amountStr, 480 - Math.floor(HTextRender.getStrWidth(g, "개가 부족합니다.") / 2) - 4, 238, 11, icon[1], 30, 3, HTextRender.CENTER);
            HTextRender.renderCenter(g, "개가 부족합니다.", 480 + 15 + (11 * amountStr.length / 2 + 4), 257);
            HTextRender.renderCenter(g, "다이아를 사용하여 결제 할 수 있습니다.", 480, 288);
        },
        stop: function() {
            bg = null;
            btn = null;
            btntxt = null;
            priceFont.dispose();
            priceFont = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    if (focusId == 0) {
                        if (!isApply) {
                            if (useStr <= ItemManager.getDiamondAmount()) {
                                isApply = true;
                                if (callback)
                                    callback(POPUP.POP_LACKOFGOLD, focusId + "");
                            } else {
                                var msg2BtnPop = StarmonManager.getMessage2BtnPopup("다이아가 부족합니다.|충전하시겠습니까?");
                                PopupMgr.openPopup(msg2BtnPop, function(code, data) {
                                    if (data == ("0")) {
                                        PopupMgr.closePopup();
                                        PopupMgr.openPopup(POPUP.POP_BUYDIAMONDLIST);
                                    } else {
                                        PopupMgr.closePopup();
                                    }
                                });
                            }
                        }
                    } else if (focusId == 1) PopupMgr.closePopup(POPUP.POP_LACKOFGOLD);
                    return;
                case KEY_LEFT :
                case KEY_RIGHT :
                    focusId = (focusId == 0) ? 1 : 0;
                    break;
                case KEY_PREV :
                    if (callback)
                        callback(POPUP.POP_LACKOFGOLD, 1);
                    else PopupMgr.closePopup(POPUP.POP_LACKOFGOLD);
                    break;
            }
            UIMgr.repaint();
        },
        onKeyReleased: function(key) {
        },
        getInstance: function() {
            return INSTANCE;
        }
    };
};