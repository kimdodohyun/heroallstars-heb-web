// Strict Mode On (엄격모드)
"use strict";
"use warning";

var PlayZVerificationPopup = new function() {
    var INSTANCE = this;

    var bg_common;
    var input_info;
    var focus_info;
    var btn_confirm = [];

    var step = 0;
    var bg_common_x = 340, bg_common_y = 40;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var step_0_input = [];
    var step_0_focus = 0, step_0_confirm = 0;
    var step_0_info = [];

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var tag_telecom;
    var tag_phoneNumber;
    var input_phone;
    var focus_phone;
    var input_telecom;
    var focus_telecom;
    var arrow;
    var select_telecom;
    var telecom = [];

    var step_1_input;
    var step_1_focus = 0, step_1_confirm = 0;
    var step_1_info = [];
    var selectTelecom = 0, choiceTelecom = 0;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var input_verificationCode;
    var tag_verificationCode;
    var focus_verificationCode;
    var timer;
    var timerInterval;

    var timerCount = 180;

    var step_2_input;
    var step_2_info;
    var step_2_confirm = 0;
    var phoneData;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var counter = function() {
        timerInterval = setInterval(function() {
            if (timerCount > 0) {
                timerCount--;
                UIMgr.repaint();
            } else {
                console.error("인증번호가 만료되었습니다.");
                clearInterval(timerInterval);
                PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                PopupMgr.openPopup(appMgr.getMessage0BtnPopup("인증번호 입력 시간이 초과되었습니다.|인증번호를 다시 요청해 주세요."), null, 1500);
            }
        }, 1000);
    }

    var setStep_0_info = function(index) {
        step_0_info[index] = step_0_input[index].value;
    }

    var setStep_1_info = function() {
        step_1_info[1] = step_1_input.value;
    }

    var setStep_2_info = function() {
        step_2_info = step_2_input.value;
    }

    var setStep_0_Elements = function() {
        step_0_input[0] = document.createElement('input');
        step_0_input[1] = document.createElement('input');

        step_0_input[0].onkeydown = function(e) {
            if (e.keyCode == KEY_ENTER) {
                e.stopPropagation();
                setStep_0_info(0);
                step_0_input[0].blur();
                step_0_input[0].style.visibility = "hidden";
            }
        };

        step_0_input[1].onkeydown = function(e) {
            if (e.keyCode == KEY_ENTER) {
                e.stopPropagation();
                setStep_0_info(1);
                step_0_input[1].blur();
                step_0_input[1].style.visibility = "hidden";
            }
        };

        step_0_input[0].type = "tel";
        step_0_input[0].maxLength = "6";
        step_0_input[0].style.border = "none";
        step_0_input[0].style.outline = "none";
        step_0_input[0].style.textAlign = "center";
        step_0_input[0].style.left = "335px";
        step_0_input[0].style.top = "153px";
        step_0_input[0].style.width = "130px";
        step_0_input[0].style.position = "absolute";
        step_0_input[0].autofocus = true;

        step_0_input[1].type = "tel";
        step_0_input[1].maxLength = "1";
        step_0_input[1].style.border = "none";
        step_0_input[1].style.outline = "none";
        step_0_input[1].style.textAlign = "center";
        step_0_input[1].style.left = "492px";
        step_0_input[1].style.top = "153px";
        step_0_input[1].style.width = "130px";
        step_0_input[1].style.position = "absolute";
        step_0_input[1].style.visibility = "hidden";

        document.getElementById("PLAYZ").appendChild(step_0_input[0]);
        document.getElementById("PLAYZ").appendChild(step_0_input[1]);
    }

    var setStep_1_Elements = function() {
        step_1_input = document.createElement('input');

        step_1_input.onkeydown = function(e) {
            if (e.keyCode == KEY_ENTER) {
                e.stopPropagation();
                setStep_1_info();
                step_1_input.blur();
                step_1_input.style.visibility = "hidden";
            }
        };

        step_1_input.type = "tel";
        step_1_input.maxLength = "11";
        step_1_input.style.border = "none";
        step_1_input.style.outline = "none";
        step_1_input.style.textAlign = "center";
        step_1_input.style.left = "470px";
        step_1_input.style.top = "155px";
        step_1_input.style.width = "130px";
        step_1_input.style.position = "absolute";
        step_1_input.blur();
        step_1_input.style.visibility = "hidden";
        // step_1_input.autofocus = true;

        document.getElementById("PLAYZ").appendChild(step_1_input);
    }

    var setStep_2_Elements = function() {
        step_2_input = document.createElement('input');

        step_2_input.onkeydown = function(e) {
            if (e.keyCode == KEY_ENTER) {
                e.stopPropagation();
                setStep_2_info();
                step_2_input.blur();
                step_2_input.style.visibility = "hidden";
            }
        };

        step_2_input.type = "tel";
        step_2_input.maxLength = "6";
        step_2_input.style.border = "none";
        step_2_input.style.outline = "none";
        step_2_input.style.textAlign = "center";
        step_2_input.style.left = "380px";
        step_2_input.style.top = "154px";
        step_2_input.style.width = "130px";
        step_2_input.style.position = "absolute";
        step_2_input.autofocus = true;

        document.getElementById("PLAYZ").appendChild(step_2_input);
    }

    INSTANCE.setResource = function(onload) {

        var PATH = ROOT_IMG + "popup/playz/";
        
        btn_confirm = [];
        telecom = [];

        var imgParam = [
            [bg_common = new Image(), PATH + "bg_common" + EXT_PNG],
            [input_info = new Image(), PATH + "input_info" + EXT_PNG],
            [focus_info = new Image(), PATH + "focus_info" + EXT_PNG],
            [btn_confirm = [], HTool.getURLs(PATH, "confirm_", EXT_PNG, 2)],

            [tag_telecom = new Image(), PATH + "telecom" + EXT_PNG],
            [tag_phoneNumber = new Image(), PATH + "phoneNumber" + EXT_PNG],
            [input_phone = new Image(), PATH + "input_phone" + EXT_PNG],
            [focus_phone = new Image(), PATH + "focus_phone" + EXT_PNG],
            [input_telecom = new Image(), PATH + "input_telecom" + EXT_PNG],
            [focus_telecom = new Image(), PATH + "focus_telecom" + EXT_PNG],
            [arrow = new Image(), PATH + "arrow" + EXT_PNG],
            [select_telecom = new Image(), PATH + "select_telecom" + EXT_PNG],
            [telecom = [], HTool.getURLs(PATH, "telecom_", EXT_PNG, 3)],

            [input_verificationCode = new Image(), PATH + "input_verificationCode" + EXT_PNG],
            [tag_verificationCode = new Image(), PATH + "verificationCode" + EXT_PNG],
            [focus_verificationCode = new Image(), PATH + "focus_purchase" + EXT_PNG],
            [timer = new Image(), PATH + "timer" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("PlayZVerificationPopup setResource Fail!!!!", this);
        });
    };

    var isFocusCheck = function(el) {
        return (el == document.activeElement);
    }

    var pad = function(n, width) {
        n = n + ''; 
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; 
    }

    var paymentProcess = function() {
        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제 중입니다."));
        
        NetManager.Req_PaymentBegin(playApi.getProdCode(), function(response) {
            
            if (NetManager.isSuccess(response)) {
                
                var resultObj = NetManager.getResult(response, 0);
                
                NetManager.Req_PaymentEnd(playApi.getProdCode(), resultObj["mon"], resultObj["recKey"], function(response) {
                    if (NetManager.isSuccess(response)) {
                        PopupMgr.closeAllPopup();
                        ItemManager.Rev_AllItem(NetManager.getResult(response, 1), response.dateTime, true);
                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제가 완료되었습니다."), null, 1500);
                    } else {
                        PopupMgr.closePopup(POPUP.POP_MSG_0BTN);
                        if (response["errCode"] == -22) {
                            PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("TV결제 한도가 초과되어|충전하기를 이용할 수 없습니다."), null, 1500);
                        } else {
                            PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("충전에 실패하였습니다.|(errorCode : " + response["errCode"] + ")"), null, 1500);
                        }
                    }
                });
            } else {
                PopupMgr.closePopup(POPUP.POP_MSG_0BTN);
                if (response["errCode"] == -22) {
                    PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("TV결제 한도가 초과되어|충전하기를 이용할 수 없습니다."), null, 1500);
                } else if (response["errCode"] == -24) {
                    PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("고객님께서 이용하시는 지역은|리모콘 결제가 불가합니다."), null, 1500);
                } else {
                    appMgr.openDisconnectPopup("PLAYZ VERIFICATION payment Fail", this);
                }
            }
        });
    };

    return {
        toString: function() {
            return "PlayZVerificationPopup";
        },
        init: function(onload) {
            step = 0;

            step_0_info = [];
            step_0_focus = 0;
            step_0_confirm = 0;
            setStep_0_Elements();

            step_1_info = [];
            // step_1_info[1] = "01047838816";
            step_1_focus = 0;
            step_1_confirm = 0;
            selectTelecom = 0;
            choiceTelecom = 0;

            
            timerCount = 180;
            step_2_info = "";
            step_2_confirm = 0;

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
            HTextRender.playZRender(g, "휴대폰 본인 인증", SCREEN_WIDTH / 2, bg_common_y + 53, HTextRender.CENTER);
            g.drawImage(btn_confirm[0], bg_common_x + 199, bg_common_y + 280);

            switch (step) {
                case 0:
                    g.setPlayZFont(FONT_14);
                    HTextRender.playZRender(g, "생년월일과 주민번호 뒤 1자리를 입력해주세요.", SCREEN_WIDTH / 2, bg_common_y + 105, HTextRender.CENTER);
                    g.drawImage(input_info, bg_common_x + 100, bg_common_y + 156);
                    g.drawImage(input_info, bg_common_x + 310, bg_common_y + 156);

                    if (step_0_info[0]) {
                        HTextRender.playZRender(g, step_0_info[0], bg_common_x + 195, bg_common_y + 178, HTextRender.CENTER);
                    }

                    if (step_0_info[1]) {
                        HTextRender.playZRender(g, step_0_info[1] + "******", bg_common_x + 405, bg_common_y + 178, HTextRender.CENTER);
                    }

                    g.setColor(COLOR_GRAY);
                    HTextRender.playZRender(g, '"-" 없이 번호만 입력해 주세요.', SCREEN_WIDTH / 2, bg_common_y + 225, HTextRender.CENTER);

                    if (step_0_confirm == 0) {
                        if (step_0_focus == 0) {
                            g.drawImage(focus_info, bg_common_x + 100, bg_common_y + 156);
                        } else if (step_0_focus == 1) {
                            g.drawImage(focus_info, bg_common_x + 310, bg_common_y + 156);
                        }
                    } else if (step_0_confirm == 1) {
                        g.drawImage(btn_confirm[1], bg_common_x + 186, bg_common_y + 280);
                    }
                    break;
                
                case 1:
                    g.setPlayZFont(FONT_14);
                    HTextRender.playZRender(g, "사용 중이신 이동 통신사와 휴대폰 번호를 입력해주세요.", SCREEN_WIDTH / 2, bg_common_y + 105, HTextRender.CENTER);

                    g.drawImage(tag_telecom, bg_common_x + 100, bg_common_y + 127);
                    g.drawImage(tag_phoneNumber, bg_common_x + 260, bg_common_y + 127);
                    g.drawImage(input_telecom, bg_common_x + 100, bg_common_y + 160);
                    g.drawImage(input_phone, bg_common_x + 260, bg_common_y + 160);
                    g.drawImage(arrow, bg_common_x + 163, bg_common_y + 174);

                    if (step_1_info[0] >= 0) {
                        g.drawImage(telecom[step_1_info[0]], bg_common_x + 100, bg_common_y + 160);
                    }

                    if (step_1_info[1]) {
                        HTextRender.playZRender(g, step_1_info[1], bg_common_x + 380, bg_common_y + 182, HTextRender.CENTER);
                    }

                    g.setColor(COLOR_GRAY);
                    HTextRender.playZRender(g, '"-" 없이 번호만 입력해 주세요.', SCREEN_WIDTH / 2, bg_common_y + 225, HTextRender.CENTER);

                    if (step_1_confirm == 0) {
                        if (step_1_focus == 0) {
                            if (selectTelecom == 0) {
                                g.drawImage(focus_telecom, bg_common_x + 100, bg_common_y + 160);
                            } else if (selectTelecom == 1) {
                                g.drawImage(select_telecom, bg_common_x + 100, bg_common_y + 200);
                                g.drawImage(focus_telecom, bg_common_x + 100, bg_common_y + 200 + (choiceTelecom * 40));
                            }
                        } else if (step_1_focus == 1) {
                            g.drawImage(focus_phone, bg_common_x + 260, bg_common_y + 160);
                        }
                    } else if (step_1_confirm == 1) {
                        g.drawImage(btn_confirm[1], bg_common_x + 186, bg_common_y + 280);
                    }
                    break;
                
                case 2:
                    g.setPlayZFont(FONT_14);
                    HTextRender.playZRender(g, "휴대폰에 전달 받은 인증 번호 6자리를 입력해주세요.", SCREEN_WIDTH / 2, bg_common_y + 105, HTextRender.CENTER);

                    g.drawImage(tag_verificationCode, bg_common_x + 100, bg_common_y + 127);
                    g.drawImage(input_verificationCode, bg_common_x + 100, bg_common_y + 160);
                    g.drawImage(timer, bg_common_x + 420, bg_common_y + 160);

                    if (step_2_info) {
                        HTextRender.playZRender(g, step_2_info, bg_common_x + 252, bg_common_y + 182, HTextRender.CENTER);
                    }

                    g.setColor(COLOR_PURPLE);
                    HTextRender.playZRender(g, parseInt((timerCount % 3600) / 60) + ":" + pad(timerCount % 60, 2), bg_common_x + 458, bg_common_y + 182, HTextRender.CENTER);

                    g.setColor(COLOR_GRAY);
                    HTextRender.playZRender(g, '"-" 없이 번호만 입력해 주세요.', SCREEN_WIDTH / 2, bg_common_y + 225, HTextRender.CENTER);

                    if (step_2_confirm == 0) {
                        g.drawImage(focus_verificationCode, bg_common_x + 100, bg_common_y + 160);
                    } else if (step_2_confirm == 1) {
                        g.drawImage(btn_confirm[1], bg_common_x + 186, bg_common_y + 280);
                    }
                    break;
            }
        },
        stop: function() {
        },
        dispose: function() {
            bg_common = null;
            btn_confirm = null;
            
            input_info = null;
            focus_info = null;

            tag_telecom = null;
            tag_phoneNumber = null;
            input_phone = null;
            focus_phone = null;
            input_telecom = null;
            focus_telecom = null;
            arrow = null;
            select_telecom = null;
            telecom = null;

            input_verificationCode = null;
            tag_verificationCode = null;
            focus_verificationCode = null;
            timer = null;
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_PREV:
                    switch (step) {
                        case 0:
                            if (isFocusCheck(step_0_input[0]) || isFocusCheck(step_0_input[1])) {
                                step_0_input[0].blur();
                                step_0_input[1].blur();
                                step_0_input[0].style.visibility = "hidden";
                                step_0_input[1].style.visibility = "hidden";
                            } else {
                                PopupMgr.changePopup(POPUP.POP_PLAYZ_VERIFICATION, POPUP.POP_PLAYZ_CLAUSE);
                            }
                            break;

                        case 1:
                            if (isFocusCheck(step_1_input)) {
                                step_1_input.blur();
                                step_1_input.style.visibility = "hidden";
                            } else {
                                PopupMgr.changePopup(POPUP.POP_PLAYZ_VERIFICATION, POPUP.POP_PLAYZ_CLAUSE);
                            }
                            break;

                        case 2:
                            if (isFocusCheck(step_2_input)) {
                                step_2_input.blur();
                                step_2_input.style.visibility = "hidden";
                            } else {
                                PopupMgr.changePopup(POPUP.POP_PLAYZ_VERIFICATION, POPUP.POP_PLAYZ_CLAUSE);
                            }
                            break;
                    }

                    break;
                case 23:
                    switch (step) {
                        case 0:
                            if (step_0_confirm == 0) {
                                if (step_0_focus == 0) {
                                    if (isFocusCheck(step_0_input[0])) {
                                        setStep_0_info(0);
                                        step_0_input[0].blur();
                                        step_0_input[0].style.visibility = "hidden";
                                    } else {
                                        step_0_input[0].style.visibility = "visible";
                                        step_0_input[0].focus();
                                    }
                                } else if (step_0_focus == 1) {
                                    if (isFocusCheck(step_0_input[1])) {
                                        setStep_0_info(1);
                                        step_0_input[1].blur();
                                        step_0_input[1].style.visibility = "hidden";
                                    } else {
                                        step_0_input[1].style.visibility = "visible";
                                        step_0_input[1].focus();
                                    }
                                }
                            }
                            break;

                        case 1:
                            if (step_1_confirm == 0) {
                                if (step_1_focus == 1) {
                                    if (isFocusCheck(step_1_input)) {
                                        setStep_1_info();
                                        step_1_input.blur();
                                        step_1_input.style.visibility = "hidden";
                                    } else {
                                        step_1_input.style.visibility = "visible";
                                        step_1_input.focus();
                                    }
                                }
                            }
                            break;

                        case 2:
                            if (step_2_confirm == 0) {
                                if (isFocusCheck(step_2_input)) {
                                    setStep_2_info();
                                    step_2_input.blur();
                                    step_2_input.style.visibility = "hidden";
                                } else {
                                    step_2_input.style.visibility = "visible";
                                    step_2_input.focus();
                                }
                            }
                            break;
                    }

                    break;
                case KEY_ENTER:
                    switch(step) {
                        case 0:
                            if (step_0_confirm == 0) {
                                if (step_0_focus == 0) {
                                    if (isFocusCheck(step_0_input[0])) {
                                        setStep_0_info(0);
                                        step_0_input[0].blur();
                                        step_0_input[0].style.visibility = "hidden";
                                    } else {
                                        step_0_input[0].style.visibility = "visible";
                                        step_0_input[0].focus();
                                    }
                                } else if (step_0_focus == 1) {
                                    if (isFocusCheck(step_0_input[1])) {
                                        setStep_0_info(1);
                                        step_0_input[1].blur();
                                        step_0_input[1].style.visibility = "hidden";
                                    } else {
                                        step_0_input[1].style.visibility = "visible";
                                        step_0_input[1].focus();
                                    }
                                }
                            } else if (step_0_confirm == 1) {
                                if ((step_0_info[0].toString().length == 6) && (step_0_info[1].toString().length == 1)) {
                                    setStep_1_Elements();
                                    step = 1;
                                } else {
                                    PopupMgr.openPopup(appMgr.getMessage0BtnPopup("정확한 생년월일과 주민번호를 입력해주세요."), null, 1500);
                                    console.error("정확한 생년월일과 주민번호를 입력해주세요.");
                                }
                            }
                            break;

                        case 1:
                            if (step_1_confirm == 0) {
                                if (step_1_focus == 0) {
                                    if (selectTelecom == 0) {
                                        selectTelecom = 1;
                                    } else if (selectTelecom == 1) {
                                        step_1_info[0] = choiceTelecom;
                                        selectTelecom = 0;
                                    }
                                } else if (step_1_focus == 1) {
                                    if (isFocusCheck(step_1_input)) {
                                        setStep_1_info();
                                        step_1_input.blur();
                                        step_1_input.style.visibility = "hidden";
                                    }
                                }
                            } else if (step_1_confirm == 1) {
                                if ((step_1_info[0] != undefined) && (step_1_info[1].length == 11)) {
                                    var registNumber = step_0_info[0] + step_0_info[1];
                                    var phoneNumber = step_1_info[1];
                                    var corpCode = "";
                                    switch (step_1_info[0]) {
                                        case 0:
                                            corpCode = "SKT";
                                            break;
                                        case 1:
                                            corpCode = "KTF";
                                            break;
                                        case 2:
                                            corpCode = "LGU";
                                            break;
                                    }

                                    playApi.getPhoneAuth(playApi.getPurchasePrice(), playApi.getProductCode(), corpCode, registNumber, phoneNumber, function(resData) {
                                        if (resData.reason == "OK" && resData.result == "0000") {

                                            var requestDateTime = resData.responseDateTime;
                                            var keyUTF = CryptoJS.enc.Utf8.parse(playApi.getPreKey() + requestDateTime);
                                            var ivUTF = CryptoJS.enc.Utf8.parse(playApi.getInitialVector());

                                            var dec = CryptoJS.AES.decrypt(resData.phoneData, keyUTF, {iv: ivUTF});
                                            var decStr = CryptoJS.enc.Utf8.stringify(dec);
                                            phoneData = JSON.parse(decStr);

                                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("입력한 휴대폰 번호로 인증번호를 보내드렸어요."), null, 1500);
                                            setStep_2_Elements();
                                            step = 2;
                                            counter();
                                        } else {
                                            PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup(resData.reason + " : " + resData.result), null, 1500);    
                                        }
                                    }, function(err) {
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("정확한 휴대폰 번호를 입력해주세요." + err), null, 1500);
                                        console.error("정확한 휴대폰 번호를 입력해주세요.");
                                    });
                                }
                            }
                            break;
                        case 2:
                            if (step_2_confirm == 0) {
                                if (isFocusCheck(step_2_input)) {
                                    setStep_2_info();
                                    step_2_input.blur();
                                    step_2_input.style.visibility = "hidden";
                                }
                            } else {
                                if (step_2_info != undefined && step_2_info.length == 6) {
                                    var registNumber = step_0_info[0] + step_0_info[1];
                                    var phoneNumber = step_1_info[1];
                                    var authNumber = step_2_info;
                                    var corpCode = "";
                                    switch (step_1_info[0]) {
                                        case 0:
                                            corpCode = "SKT";
                                            break;
                                        case 1:
                                            corpCode = "KTF";
                                            break;
                                        case 2:
                                            corpCode = "LGU";
                                            break;
                                    }
                                    playApi.purchaseProduct(corpCode, registNumber, phoneNumber, playApi.getPurchasePrice(), phoneData, authNumber, function(resData) {
                                        if (resData.reason == "OK" && resData.result == "0000") {
                                            paymentProcess();
                                        } else {
                                            PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup(resData.reason + " : " + resData.result), null, 1500);    
                                        }
                                    }, function(err) {
                                        PopupMgr.closePopup(POPUP.POP_PLAYZ_VERIFICATION);
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("결제에 실패하였습니다." + err), null, 1500);
                                    });
                                }
                            }
                            break;
                        case 3:
                            break;
                    }
                    break;

                case KEY_LEFT:
                    switch(step) {
                        case 0:
                            if (step_0_confirm == 0) {
                                if (!isFocusCheck(step_0_input[0]) && !isFocusCheck(step_0_input[1])) {
                                    step_0_focus = 0;
                                }
                            }
                            break;

                        case 1:
                            if (step_1_confirm == 0) {
                                if (!isFocusCheck(step_1_input)) {
                                    step_1_focus = 0;
                                }
                            }
                            break;
                    }
                    break;

                case KEY_RIGHT:
                    switch(step) {
                        case 0:
                            if (step_0_confirm == 0) {
                                if (!isFocusCheck(step_0_input[0]) && !isFocusCheck(step_0_input[1])) {
                                    step_0_focus = 1;
                                }
                            }
                            break;

                        case 1:
                            if (step_1_confirm == 0) {
                                if (!isFocusCheck(step_1_input)) {
                                    step_1_focus = 1;
                                }
                            }
                            break;
                    }
                    break;

                case KEY_UP:
                    switch (step) {
                        case 0:
                            if (!isFocusCheck(step_0_input[0]) && !isFocusCheck(step_0_input[1])) {
                                if (step_0_confirm == 1) {
                                    step_0_confirm = 0;
                                }
                            }
                            break;

                        case 1:
                            if (step_1_confirm == 0) {
                                if (step_1_focus == 0) {
                                    if (selectTelecom == 1) {
                                        choiceTelecom = HTool.getIndex(choiceTelecom, -1, 3);
                                    }
                                } 
                            } else if (step_1_confirm == 1) {
                                step_1_confirm = 0;
                            }
                            break;

                        case 2:
                            step_2_confirm = 0;
                            break;
                    }
                    break;

                case KEY_DOWN:
                    switch (step) {
                        case 0:
                            if (!isFocusCheck(step_0_input[0]) && !isFocusCheck(step_0_input[1])) {
                                if (step_0_confirm == 0) {
                                    step_0_confirm = 1;
                                }
                            }
                            break;

                        case 1:
                            if (step_1_confirm == 0) {
                                if (step_1_focus == 0) {
                                    if (selectTelecom == 1) {
                                        choiceTelecom = HTool.getIndex(choiceTelecom, 1, 3);
                                    } else {
                                        if (choiceTelecom >= 0) {
                                            step_1_confirm = 1;
                                        }
                                    }
                                } else if (step_1_focus == 1) {
                                    if (!isFocusCheck(step_1_input)) {
                                        step_1_confirm = 1;
                                    }
                                }
                            } 
                            break;

                        case 2:
                            if (!isFocusCheck(step_2_input)) {
                                step_2_confirm = 1;
                            }
                            break;
                    }
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