"use strict";
"use warning";

var InputPasswordPopup = new function() {
    var INSTANCE = this;
    
    var flag;
	var xKey, yKey;
    
    
    var amount;
    var price;
    var prodCode;
    
    
    
    var back;
    var btn_cancel_off;
    var btn_cancel_on;
    var btn_charge_off;
    var btn_charge_on;
    var btn_ok_on;
    var focus_pw = [];
    var gem;
	
	var isApply;
	var frameCnt;
	var incorrectCnt;
	var password = "";
	var passTxt = "";

	var PASS_FOCUS = "|";
	var PASS_STR = "●";
	var won = "원";
	var pay = "결제 금액: ";
	var tax = "(부가세 포함)";
	
	var payment_Str = ["결제를 원하시면 구매 비밀번호 4자리를 입력하세요.", "(비밀번호 관련 문의: 국번없이 106번)"];
	var subscription = ["※ 본 상품은 청약철회가 불가능한 상품입니다.", "단, 해당 콘텐츠가 표시 광고된 내용과 다를 시", "구매일로부터 3개월 이내 취소할 수 있습니다."];
	var incorrectPass = ["비밀번호를 잘못 입력하셨습니다.", "비밀번호 확인 후 다시 입력해 주세요.", "(비밀번호 관련 문의: 국번없이 106번)"];
	var threeIncorrectPass = ["비밀번호가 3회 연속 일치하지 않았습니다.", "비밀번호를 잊어버렸을 경우", "자녀안심설정 > 비밀번호 변경/초기화를 이용해 주세요."];
    
    INSTANCE.setResource = function(onload) {
        
        focus_pw = [];
        
        var imgParam = [
            
            [back = new Image(), ROOT_IMG + "popup/cash/back" + EXT_PNG],
            [btn_cancel_off = new Image(), ROOT_IMG + "popup/cash/btn_cancel_off" + EXT_PNG],
            [btn_cancel_on = new Image(), ROOT_IMG + "popup/cash/btn_cancel_on" + EXT_PNG],
            [btn_charge_off = new Image(), ROOT_IMG + "popup/cash/btn_charge_off" + EXT_PNG],
            [btn_charge_on = new Image(), ROOT_IMG + "popup/cash/btn_charge_on" + EXT_PNG],
            [btn_ok_on = new Image(), ROOT_IMG + "popup/btn_ok_on" + EXT_PNG],
            [focus_pw = [], HTool.getURLs(ROOT_IMG, "popup/cash/focus_pw_", EXT_PNG, 2)],
            [gem = new Image(), ROOT_IMG + "popup/cash/gem" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            console.error("POP_INPUTPASSWORD setResource end");
            onload();
            imgParam = null;
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("InputPasswordPopup setResource Fail", this);
        });
    };
    
    INSTANCE.setProduct = function(_prodCode, _amount, _price) {
        prodCode = _prodCode;
        amount = _amount;
        price = _price + Math.floor(_price / 10);
    };
    
    INSTANCE.clear = function() {
        back = null;
        btn_cancel_off = null;
        btn_cancel_on = null;
        btn_charge_off = null;
        btn_charge_on = null;;
        btn_ok_on = null;
        focus_pw = null;
        gem = null;
    };
    
    var product_render = function(g) {
        
        g.drawImage(back, 300, 92);
        g.drawImage(gem, 448, 183);
        g.setFont(FONT_30);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, "x" + amount, 555, 231, HTextRender.CENTER);

        g.setFont(FONT_20);
        HTextRender.oriRender(g, tax, 790, 250, HTextRender.CENTER);
        
        g.setFont(FONT_34);
        g.setColor(COLOR_YELLOW);
        HTextRender.oriRender(g, YUtil.format(price) + "원", 790, 225, HTextRender.CENTER);
        
		
//		g.setFont(FONT_18);
//		g.setColor(COLOR_GRAY);
//		HTextRender.oriRender(g, subscription[0], 640, 489, HTextRender.CENTER);
//		HTextRender.oriRender(g, subscription[1], 640, 513, HTextRender.CENTER);
//		HTextRender.oriRender(g, subscription[2], 640, 537, HTextRender.CENTER);
		
		g.setFont(FONT_34);
		g.setColor(COLOR_WHITE);
		HTextRender.oriRender(g, passTxt, 640, 440, HTextRender.CENTER);
    };
    
    var checkPassword = function(callback) {
        // BTV 안드로이드에서 비밀번호 체크 후 다시 웹으로 콜백 넘기는 메소드
        return BTVPlatform.checkPurchasePin(password, callback);
//        return KTPlatform.checkPurchasePin(password, callback);
    };
    
    var clearPassword = function() {
        var len = password.length - 1;
        if (len < 0) return;
        password = password.substring(0, len);
        passTxt = passTxt.substring(0, len);
    };
    
    var inputPassword = function(_num) {
        if (password.length >= 4) return;
        password += _num;
        passTxt += PASS_STR;
        if (password.length >= 4) yKey = 1;
    };
    
    var incorrect = function() {
        isApply = false;
        flag = 1;
        resetData();
        yKey = 0;
//        if (++incorrectCnt >= 3) {
//            openThreeTimeIncorrectPopup();
//        }
    };
    
    var resetData = function() {
        passTxt = "";
        password = "";
    };
    
    var openThreeTimeIncorrectPopup = function() {
        
        PopupMgr.openPopup(appMgr.getMessage1BtnPopup(threeIncorrectPass[0] + "|" + threeIncorrectPass[1] + "|" + threeIncorrectPass[2]));
        
        
//        flag = 2;
    };
    
    var chargeProcess = function() {
        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제 중입니다."));
        
        NetManager.Req_ChargeMoney("GEM", amount, function(response) {
            if (NetManager.isSuccess(response)) {
                PopupMgr.closeAllPopup();
                ItemManager.Rev_AllItem(NetManager.getResult(response, 1), response.dateTime, true);
                PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제가 완료되었습니다."), null, 1500);
            } else {
                appMgr.openDisconnectPopup(" Fail!!!!");
            }
        });
    };
    
    var paymentProcess = function() {
        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제 중입니다."));
        
        NetManager.Req_PaymentBegin(prodCode, function(response) {
            
            if (NetManager.isSuccess(response)) {
                
                var resultObj = NetManager.getResult(response, 0);
                
                NetManager.Req_PaymentEnd(prodCode, resultObj["mon"], resultObj["recKey"], function(response) {
                    if (NetManager.isSuccess(response)) {
                        PopupMgr.closeAllPopup();
                        ItemManager.Rev_AllItem(NetManager.getResult(response, 1), response.dateTime, true);
                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제가 완료되었습니다."), null, 1500);
                    } else {
                        PopupMgr.closePopup(POPUP.POP_MSG_0BTN);
                        if (response["errCode"] == -22) {
                            PopupMgr.closePopup(POPUP.POP_INPUTPASSWORD);
                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("TV결제 한도가 초과되어|충전하기를 이용할 수 없습니다."), null, 1500);
                        } else {
                            PopupMgr.closePopup(POPUP.POP_INPUTPASSWORD);
                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("충전에 실패하였습니다.|(errorCode : " + response["errCode"] + ")"), null, 1500);
                        }
                    }
                });
            } else {
                PopupMgr.closePopup(POPUP.POP_MSG_0BTN);
                if (response["errCode"] == -22) {
                    PopupMgr.closePopup(POPUP.POP_INPUTPASSWORD);
                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("TV결제 한도가 초과되어|충전하기를 이용할 수 없습니다."), null, 1500);
                } else if (response["errCode"] == -24) {
                    PopupMgr.closePopup(POPUP.POP_INPUTPASSWORD);
                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("고객님께서 이용하시는 지역은|리모콘 결제가 불가합니다."), null, 1500);
                } else {
                    appMgr.openDisconnectPopup("InputPasswordPopup payment Fail", this);
                }
            }
        });
    };
    
    return {
        toString: function() {
            return "InputPasswordPopup";
        },
        init: function(onload) {
            isApply = false;
            flag = 0;
            yKey = 0;
            xKey = 0;
            incorrectCnt = 0;
            frameCnt = 0;
            resetData();
            onload();
        },
        start: function() {

        },
        run: function() {
            frameCnt++;
            UIMgr.repaint();
        },
        paint: function() {
            
            product_render(g);

            switch (flag) {
            case 0:
                g.setColor(COLOR_WHITE);
                g.setFont(FONT_22);
                HTextRender.oriRender(g, payment_Str[0], 640, 331, HTextRender.CENTER);
                HTextRender.oriRender(g, payment_Str[1], 640, 363, HTextRender.CENTER);
                    
                g.drawImage(btn_charge_off, 481, 563);
                g.drawImage(btn_cancel_off, 641, 563);


                if (yKey == 0) {
                    g.drawImage(focus_pw[frameCnt % 2], 518, 397);
                } else {
                    if (xKey == 0) {
                        g.drawImage(btn_charge_on, 481, 563);
                    } else {
                        g.drawImage(btn_cancel_on, 641, 563);
                    }
                }
                break;

            case 1:
                g.setColor(COLOR_PASSWORD);
                g.setFont(FONT_22);
                HTextRender.oriRender(g, incorrectPass[0], 640, 315, HTextRender.CENTER);
                HTextRender.oriRender(g, incorrectPass[1], 640, 347, HTextRender.CENTER);
                HTextRender.oriRender(g, incorrectPass[2], 640, 379, HTextRender.CENTER);
                    
                g.drawImage(btn_charge_off, 481, 563);
                g.drawImage(btn_cancel_off, 641, 563);


                if (yKey == 0) {
                    g.drawImage(focus_pw[frameCnt % 2], 518, 397);
                } else {
                    if (xKey == 0) {
                        g.drawImage(btn_charge_on, 481, 563);
                    } else {
                        g.drawImage(btn_cancel_on, 641, 563);
                    }
                }
                break;

            case 2:
                g.setColor(COLOR_WHITE);
                g.setFont(FONT_22);
                HTextRender.oriRender(g, threeIncorrectPass[0], 640, 315, HTextRender.CENTER);
                HTextRender.oriRender(g, threeIncorrectPass[1], 640, 347, HTextRender.CENTER);
                HTextRender.oriRender(g, threeIncorrectPass[2], 640, 379, HTextRender.CENTER);

                g.drawImage(btn_ok_on, 562, 563);
                break;
            }
        },
        stop: function() {
        },
        dispose: function() {
            back = null;
            btn_cancel_off = null;
            btn_cancel_on = null;
            btn_charge_off = null;
            btn_charge_on = null;;
            focus_pw = [] = null;
            gem = null;
        },
        onKeyPressed: function(key) {
            
            if (isApply) return;
            
            if (yKey == 0) {
                if ((key == KEY_RED) || (key == KEY_LEFT) || (key == KEY_DELETE)) {
                    clearPassword();
                } else if ((key >= 48) && (key <= 57)) {
                    inputPassword(key - 48);
                }
            }
            
            switch (key) {
                case KEY_PREV:
                    PopupMgr.closePopup(POPUP.POP_INPUTPASSWORD);
                    break;
                    
                case KEY_ENTER:
                    switch (flag) {
                        case 0:
                        case 1:
                            if (yKey == 1) {
                                if (xKey == 0) {
                                    if (password.length < 4) {
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("비밀번호를 입력하세요."), null, 1500);
                                    } else {
                                        isApply = true;
                                        checkPassword(function(res) {
                                            if (res.isError) {
                                                PopupMgr.closePopup();
                                                PopupMgr.openPopup(appMgr.getMessage0BtnPopup("충전에 실패하였습니다."), null, 1500);
                                                appMgr.openDisconnectPopup("InputPasswordPopup payment Fail", this);
                                            } else if (res.result) {
//                                                if (DMC_LIVE) {
//                                                    if (ISWEB) {
//                                                        chargeProcess();
////                                                        paymentProcess();
//                                                    } else {
//                                                        paymentProcess();
//                                                    }
//
//                                                } else {
//                                                    chargeProcess();
//                                                }
                                                if (ISWEB) {
//                                                    chargeProcess();
                                                    paymentProcess();
                                                } else {
                                                    paymentProcess();
                                                }
                                            } else {
                                                incorrect();
                                            }
                                        });
                                    }
                                } else {
                                    PopupMgr.closeAllPopup();
                                }
                            }
                            break;
                            
                        case 2:
                            PopupMgr.closeAllPopup();
                            break;
                    }
                    break;
                    
                case KEY_UP:
                    switch (flag) {
                        case 0:
                        case 1:
                            if (yKey == 1) {
                                resetData();
                            }
                            yKey = HTool.getIndex(yKey, -1, 2);
                            break;
                    }
                    break;
                    
                case KEY_DOWN:
                    switch (flag) {
                        case 0:
                        case 1:
                            yKey = HTool.getIndex(yKey, 1, 2);
                            break;
                    }
                    break;
                    
                case KEY_LEFT:
                    switch (flag) {
                        case 0:
                        case 1:
                            if (yKey == 1) {
                                xKey = HTool.getIndex(xKey, -1, 2);    
                            }
                            break;
                    }
                    break;
                    
                case KEY_RIGHT:
                    switch (flag) {
                        case 0:
                        case 1:
                            if (yKey == 1) {
                                xKey = HTool.getIndex(xKey, 1, 2);
                            }
                            break;
                    }
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