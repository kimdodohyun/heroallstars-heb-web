// Strict Mode On (엄격모드)
"use strict";
"use warning";

var PlayZPurchasePopup = new function() {
    var INSTANCE = this;

    var bg_choice;

    var btn_cancel = [];
    var btn_card = [];
    var btn_payment = [];
    var btn_phone = [];

    var check = [];

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var step = 0;
    var step_0_focus = 0;
    var step_1_focus = 0;
    var bg_choice_x = 340, bg_choice_y = 70;
    var paymentCheck = 0;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var productName;
    var productCode;
    var amount;
    var price;
    var purchasePrice;
    var tax;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    INSTANCE.setResource = function(onload) {

        var PATH = ROOT_IMG + "popup/playz/";
        
        btn_cancel = [];
        btn_card = [];
        btn_payment = [];
        btn_phone = [];
        check = [];
        
        var imgParam = [
            [bg_choice = new Image(), PATH + "bg_choice" + EXT_PNG],

            [btn_cancel = [], HTool.getURLs(PATH, "cancel_", EXT_PNG, 2)],
            [btn_card = [], HTool.getURLs(PATH, "card_", EXT_PNG, 2)],
            [btn_payment = [], HTool.getURLs(PATH, "payment_", EXT_PNG, 2)],
            [btn_phone = [], HTool.getURLs(PATH, "phone_", EXT_PNG, 2)],
            [check = [], HTool.getURLs(PATH, "check_", EXT_PNG, 3)],
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("PlayZPurchasePopup setResource Fail!!!!", this);
        });
    };

    // INSTANCE.setProduct = function(_productName, _productCode, _amount, _price) {
    //     productName = _productName;
    //     productCode = _productCode;
    //     amount = _amount;
    //     price = _price;
    //     tax = Math.floor(price / 10);
    //     purchasePrice = price + tax;
    //     // POPUP.POP_PLAYZ_VERIFICATION.getInstance().setProduct(productCode, purchasePrice);
    //     price = YUtil.format(price);
    //     tax = YUtil.format(tax);
    //     purchasePrice = YUtil.format(purchasePrice);
    // };

    return {
        toString: function() {
            return "PlayZPurchasePopup";
        },
        init: function(onload) {

            step = 0;
        
            step_0_focus = 0;
            step_1_focus = 0;
            paymentCheck = 0;

            onload();
        },
        start: function() {

        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {

            g.drawImage(bg_choice, bg_choice_x, bg_choice_y);
            g.drawImage(btn_card[0], bg_choice_x + 128, bg_choice_y + 140);
            g.drawImage(btn_phone[0], bg_choice_x + 338, bg_choice_y + 140);
            g.drawImage(btn_payment[0], bg_choice_x + 98, bg_choice_y + 444);
            g.drawImage(btn_cancel[0], bg_choice_x + 300, bg_choice_y + 444);

            if (paymentCheck == 0) {
                g.drawImage(check[2], bg_choice_x + 100, bg_choice_y + 152);
            } else if (paymentCheck == 1) {
                g.drawImage(check[2], bg_choice_x + 310, bg_choice_y + 152);
            }

            switch(step) {
                case 0:
                    if (step_0_focus == 0) {
                        g.drawImage(btn_card[1], bg_choice_x + 114, bg_choice_y + 140);
                    } else if (step_0_focus == 1) {
                        g.drawImage(btn_phone[1], bg_choice_x + 325, bg_choice_y + 140);
                    }
                    break;
                case 1:
                    if (step_1_focus == 0) {
                        g.drawImage(btn_payment[1], bg_choice_x + 85, bg_choice_y + 444);
                    } else if (step_1_focus == 1) {
                        g.drawImage(btn_cancel[1], bg_choice_x + 287, bg_choice_y + 444);
                    }
                    break;

                default:
                    break;
            }

            g.setColor(COLOR_PURPLE);
            g.setPlayZFont(FONT_30);
            HTextRender.playZRender(g, playApi.getProductName() + "개", bg_choice_x + 100, bg_choice_y + 60, HTextRender.LEFT);
            g.setColor(COLOR_BLACK);
            g.setPlayZFont(FONT_24);
            HTextRender.playZRender(g, YUtil.format(playApi.getPrice()) + "원", bg_choice_x + 500, bg_choice_y + 255, HTextRender.RIGHT);
            g.setPlayZFont(FONT_18);
            HTextRender.playZRender(g, YUtil.format(playApi.getTax()) + "원", bg_choice_x + 500, bg_choice_y + 295, HTextRender.RIGHT);
            g.setColor(COLOR_PURPLE);
            g.setPlayZFont(FONT_30);
            HTextRender.playZRender(g, YUtil.format(playApi.getPurchasePrice()) + "원", bg_choice_x + 500, bg_choice_y + 390, HTextRender.RIGHT);
        },
        stop: function() {
        },
        dispose: function() {
            bg_choice = null;

            btn_cancel = null;
            btn_card = null;
            btn_payment = null;
            btn_phone = null;

            check = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_PREV:
                    PopupMgr.closePopup(POPUP.POP_PLAYZ_PURCHASE);
                    break;
                case KEY_ENTER:
                    switch(step) {
                        case 0:
                            if (step_0_focus == 0) {
                                paymentCheck = 0;
                            } else if (step_0_focus == 1) {
                                paymentCheck = 1;
                            }
                            break;
                        case 1:
                            if (step_1_focus == 0) {
                                if (paymentCheck == 0) {
                                    // 신용카드 결제
                                } else if (paymentCheck == 1) {
                                    PopupMgr.changePopup(POPUP.POP_PLAYZ_PURCHASE, POPUP.POP_PLAYZ_CLAUSE);
                                }
                            } else if (step_1_focus == 1) {
                                PopupMgr.closePopup(POPUP.POP_PLAYZ_PURCHASE);
                            }
                            break;
                    }
                    break;

                case KEY_LEFT:
                    switch(step) {
                        case 0:
                            step_0_focus = 0;
                            break;
                        case 1:
                            step_1_focus = 0;
                            break;
                    }
                    break;

                case KEY_RIGHT:
                    switch(step) {
                        case 0:
                            step_0_focus = 1;
                            break;
                        case 1:
                            step_1_focus = 1;
                            break;
                    }
                    break;

                case KEY_UP:
                    if (step == 1) {
                        step = 0;
                    }
                    step_1_focus = 0;
                    break;

                case KEY_DOWN:
                    if (step == 0) {
                        step = 1;
                    }
                    step_1_focus = 0;
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