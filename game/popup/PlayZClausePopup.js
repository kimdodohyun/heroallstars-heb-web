// Strict Mode On (엄격모드)
"use strict";
"use warning";

var PlayZClausePopup = new function() {
    var INSTANCE = this;

    var bg_common;

    var allPass;
    var license;
    var personal_information;
    var focus_purchase;

    var btn_confirm = [];
    var btn_detail = [];

    var check = [];

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var step = 0;
    var step_1_focus = 0;
    var step_2_focus = 0;
    var bg_common_x = 340, bg_common_y = 145;
    var step_1_check = 0;
    var step_2_check = 0;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    INSTANCE.setResource = function(onload) {

        var PATH = ROOT_IMG + "popup/playz/";
        
        btn_confirm = [];
        btn_detail = [];
        check = [];
        
        var imgParam = [
            [bg_common = new Image(), PATH + "bg_common" + EXT_PNG],
            
            [allPass = new Image(), PATH + "allPass" + EXT_PNG],
            [license = new Image(), PATH + "license" + EXT_PNG],
            [personal_information = new Image(), PATH + "personal_information" + EXT_PNG],
            [focus_purchase = new Image(), PATH + "focus_purchase" + EXT_PNG],

            [btn_confirm = [], HTool.getURLs(PATH, "confirm_", EXT_PNG, 2)],
            [btn_detail = [], HTool.getURLs(PATH, "detail_", EXT_PNG, 2)],
            [check = [], HTool.getURLs(PATH, "check_", EXT_PNG, 3)],
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("PlayZClausePopup setResource Fail!!!!", this);
        });
    };

    return {
        toString: function() {
            return "PlayZClausePopup";
        },
        init: function(onload) {

            step = 0;
            step_1_focus = 0;
            step_2_focus = 0;
            step_1_check = 0;
            step_2_check = 0;

            onload();
        },
        start: function() {

        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {

            g.drawImage(bg_common, bg_common_x, bg_common_y);
            g.setColor(COLOR_BLACK);
            g.setPlayZFont(FONT_30);
            HTextRender.playZRender(g, "구매 약관 동의", SCREEN_WIDTH / 2, bg_common_y + 53, HTextRender.CENTER);

            g.drawImage(allPass, bg_common_x + 100, bg_common_y + 101);
            g.drawImage(license, bg_common_x + 100, bg_common_y + 151);
            g.drawImage(personal_information, bg_common_x + 100, bg_common_y + 201);

            for (var i = 0; i < 2; i++) {
                g.drawImage(btn_detail[0], bg_common_x + 420, bg_common_y + 151 + (i * 50));
            }

            g.drawImage(btn_confirm[0], bg_common_x + 199, bg_common_y + 280);

            switch(step) {
                case 0:
                    g.drawImage(focus_purchase, bg_common_x + 100, bg_common_y + 101);
                    break;
                case 1:
                    if (step_1_focus == 0) {
                        g.drawImage(focus_purchase, bg_common_x + 100, bg_common_y + 151);
                    } else if (step_1_focus == 1) {
                        g.drawImage(btn_detail[1], bg_common_x + 420, bg_common_y + 151);
                    }
                    break;
                case 2:
                    if (step_2_focus == 0) {
                        g.drawImage(focus_purchase, bg_common_x + 100, bg_common_y + 201);
                    } else if (step_2_focus == 1) {
                        g.drawImage(btn_detail[1], bg_common_x + 420, bg_common_y + 201);
                    }
                    break;
                case 3:
                    g.drawImage(btn_confirm[1], bg_common_x + 186, bg_common_y + 280);
                    break;
                default:
                    break;
            }

            if (step_1_check + step_2_check == 2) {
                g.drawImage(check[2], bg_common_x + 110, bg_common_y + 111);
            }

            if (step_1_check == 1) {
                g.drawImage(check[2], bg_common_x + 110, bg_common_y + 161);
            } 
            
            if (step_2_check == 1) {
                g.drawImage(check[2], bg_common_x + 110, bg_common_y + 211);
            }
        },
        stop: function() {
        },
        dispose: function() {
            bg_common = null;

            allPass = null;
            license = null;
            personal_information = null;
            focus_purchase = null;

            btn_confirm = null;
            btn_detail = null;

            check = null;
        },
        onKeyPressed: function(key) {

             if (isOnPopup) {
                if (key == KEY_ENTER || key == KEY_PREV) {
                    document.getElementById("onPop").src = "";
                    document.getElementById("onPop").style.visibility = "hidden";
                    isOnPopup = false;
                }
                return;
            }




            switch(key) {
                case KEY_PREV:
                    PopupMgr.changePopup(POPUP.POP_PLAYZ_CLAUSE, POPUP.POP_PLAYZ_PURCHASE);
                    break;
                case KEY_ENTER:
                    switch(step) {
                        case 0:
                            if (step_1_check + step_2_check > 0) {
                                step_1_check = 0;
                                step_2_check = 0;
                            } else {
                                step_1_check = 1;
                                step_2_check = 1;
                            }
                            break;
                        case 1:
                            if (step_1_focus == 0) {
                                if (step_1_check == 1) {
                                    step_1_check = 0;
                                } else if (step_1_check == 0) {
                                    step_1_check = 1;
                                }
                            } else if (step_1_focus == 1) {
                                console.error("isOnPopup >> " + isOnPopup);
                                document.getElementById("onPop").src="http://61.251.167.91/html5/Btv/heb/verification/index.html?verification=" + step;
                                document.getElementById("onPop").style.visibility = "visible";
                                document.getElementById("onPop").focus();
                                isOnPopup = true;
                            }
                            break;
                        case 2:
                            if (step_2_focus == 0) {
                                if (step_2_check == 1) {
                                    step_2_check = 0;
                                } else if (step_2_check == 0) {
                                    step_2_check = 1;
                                }
                            } else if (step_2_focus == 1) {
                                console.error("isOnPopup >> " + isOnPopup);
                                document.getElementById("onPop").src="http://61.251.167.91/html5/Btv/heb/verification/index.html?verification=" + step;
                                document.getElementById("onPop").style.visibility = "visible";
                                document.getElementById("onPop").focus();
                                isOnPopup = true;
                            }
                            break;
                        case 3:
                            if (step_1_check + step_2_check == 2) {
                                PopupMgr.changePopup(POPUP.POP_PLAYZ_CLAUSE, POPUP.POP_PLAYZ_VERIFICATION);
                            } else {
                                // 안드로이드 토스트 팝업
                                PopupMgr.openPopup(appMgr.getMessage0BtnPopup("모든 필수 항목의 동의가 필요합니다."), null, 1500);
                                console.error("약관에 동의 하셔야 합니다.");
                            }
                            break;
                    }
                    break;

                case KEY_LEFT:
                    switch(step) {
                        case 1:
                            step_1_focus = 0;
                            break;
                        case 2:
                            step_2_focus = 0;
                            break;
                    }
                    break;

                case KEY_RIGHT:
                    switch(step) {
                        case 1:
                            step_1_focus = 1;
                            break;
                        case 2:
                            step_2_focus = 1;
                            break;
                    }
                    break;

                case KEY_UP:

                    switch (step) {
                        case 3:
                            step = 2;
                            break;

                        case 2:
                            step = 1;
                            break;

                        case 1:
                            step = 0;
                            break;
                    }

                    // step = HTool.getIndex(step, -1, 4);
                    step_1_focus = 0;
                    step_2_focus = 0;
                    break;

                case KEY_DOWN:
                    switch (step) {
                        case 0:
                            step = 1;
                            break;
                        
                        case 1:
                            step = 2;
                            break;
                        
                        case 2:
                            step = 3;
                            break;
                    }
                    // step = HTool.getIndex(step, 1, 4);
                    step_1_focus = 0;
                    step_2_focus = 0;
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