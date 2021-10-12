// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @description Scene & Popup Management
 * @author Lazuli
 * @since 2015.1.2
 */
//
//#########################################################################
// Popup Manager
//#########################################################################

var PopupMgr = new function () {
    var closeTimeout;
    this.POPUP_BACK_COLOR = "rgba(0,0,0,0.75)";
	this.POPUP_TRUE_BACK_COLOR = "rgba(0,0,0,0.85)";
    // 활성화 팝업 관리할 ArrayList 선언 (여러개의 팝업을 띄울 수 있도록 ArrayList로 관리)
    this.currentPopup = new ArrayList();
    
    this.setBackColor = function(color) {
        this.POPUP_TRUE_BACK_COLOR = color;
    };

    this.isPopupOpened = function () {
        return this.currentPopup.size() > 0;
    };
    /**
     * Open Popup
     * @param {Layer} popID Target Popup Layer
     * @param {data or function} handler sendData or callback Function
     * @param {int} closeTime Auto Close Time (setTimeout)
     * @example 일반적인 팝업 : openPopup(sample, data);
     * @example 1초뒤에 닫히는 팝업 : openPopup(sample, data, 1000);
     */
    this.openPopup = function (popID, handler, closetime) {
        UIMgr.layerChanging = true;
        try {
            if (PopupMgr.currentPopup.array.indexOf(popID) < 0) {
                // 로딩시작
                if (arguments.length <= 2) {
                    // 팝업리스트에 팝업추가
                    popID.init(function () {
                        // 리소스 로딩완료
                        PopupMgr.currentPopup.add(popID);
                        UIMgr.requestFocusLayer(popID);
                        HAutoScreen.autoScreen();
                        // 팝업 출력 및 시작
                        popID.start();
                        popID.run();
                        HLog.info("Open Popup Complete !! - " + popID.toString(), this);
                        UIMgr.layerChanging = false;
                        UIMgr.repaint();
                    }, handler);
                } else if (arguments.length == 3 && !isNaN(arguments[2])) {
                    // 팝업리스트에 팝업추가
                    PopupMgr.currentPopup.add(popID);
                    UIMgr.requestFocusLayer(popID);
                    HAutoScreen.autoScreen();
                    popID.init(function () {
                        // 리소스 로딩완료
                        // 팝업 출력 및 시작
                        popID.start();
                        popID.run();
                        HLog.info("Open Timer Popup Complete !! - " + popID.toString(), this);
                        clearTimeout(closeTimeout);
                        closeTimeout = null;
                        closeTimeout = setTimeout(function () {
                            PopupMgr.closePopup(popID);
                            clearTimeout(closeTimeout);
                            closeTimeout = null;
                        }, closetime);
                        UIMgr.layerChanging = false;
                        UIMgr.repaint();
                    }, handler);
                } else {
                    HLog.err("Wrong Argument --- (openPopup) " + popID.toString());
                }
            } else {
                HLog.err("Already Exists This Popup", popID.toString(), this);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * Close Popup
     * @param {Layer} popID Target Popup Layer
     */
    this.closePopup = function (popID) {
        UIMgr.layerChanging = true;
        try {
            // 팝업 정지 및 소멸
            var cp;
            if (PopupMgr.currentPopup.size() != 0) {
                if (popID == null) {
                    cp = PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1);
                } else {
                    for (var ps = 0; ps < PopupMgr.currentPopup.size(); ps++) {
                        if (PopupMgr.currentPopup.get(ps) == popID) {
                            cp = popID;
                            break;
                        }
                    }
                }
                if (cp == null) {
                    HLog.err("You Have Entered The Wrong PopID", popID.toString() ? popID.toString() : popID, this);
                    return;
                }
                clearTimeout(closeTimeout);
                closeTimeout = null;
                PopupMgr.currentPopup.remove(cp);
                cp.stop();
                UIMgr.requestFocusLayer();
                HLog.info("Close Popup Complete !! - " + cp.toString(), this);
                UIMgr.layerChanging = false;
                UIMgr.repaint();
            }
            cp = null;
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * Close All Popup
     */
    this.closeAllPopup = function () {
        UIMgr.layerChanging = true;
        try {
            if (PopupMgr.currentPopup.size() != 0) {
                clearTimeout(closeTimeout);
                closeTimeout = null;
                for (var i = PopupMgr.currentPopup.size() - 1; i > -1; i--) {
                    var cp = PopupMgr.currentPopup.get(i);
                    PopupMgr.currentPopup.remove(cp);
                    cp.stop();
                    cp = null;
                }
            }
            UIMgr.requestFocusLayer();
            HLog.info("Close All Popup Complete !! - ", this);
            UIMgr.layerChanging = false;
            UIMgr.repaint();
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * ChangePopup
     * @param {Layer} closePopup 클로즈 할 팝업
     * @param {Layer} openPopup 오픈 할 팝업
     * @param {data or function} handler sendData or callback Function
     * @param {int} closeTime Auto Close Time (setTimeout)
     */
    this.changePopup = function (closePopup, openPopup, handler, closeTime) {
        UIMgr.layerChanging = true;
        try {
            clearTimeout(closeTimeout);
            closeTimeout = null;
            if (PopupMgr.currentPopup.size() != 0) {
                closePopup.stop();
                for (var ps = 0; ps < PopupMgr.currentPopup.size(); ps++) {
                    if (PopupMgr.currentPopup.get(ps) == closePopup) {
                        PopupMgr.currentPopup.array[ps] = openPopup;
                        // 팝업리스트에 팝업추가
                        UIMgr.requestFocusLayer(openPopup);
                        HAutoScreen.autoScreen();
                        if (arguments.length <= 3) {
                            openPopup.init(function () {
                                // 리소스 로딩완료
                                // 팝업 출력 및 시작
                                openPopup.start();
                                openPopup.run();
                                HLog.info("Change Popup Complete !! - " + openPopup.toString(), this);
                                UIMgr.layerChanging = false;
                                UIMgr.repaint();
                            }, handler);
                        } else if (arguments.length == 4 && !isNaN(arguments[3])) {
                            openPopup.init(function () {
                                openPopup.start();
                                openPopup.run();
                                HLog.info("Change Timer Popup Complete !! - " + openPopup.toString(), this);
                                clearTimeout(closeTimeout);
                                closeTimeout = null;
                                closeTimeout = setTimeout(function () {
                                    PopupMgr.closePopup(openPopup);
                                    HLog.info("Close Popup Complete !! - " + openPopup.toString(), this);
                                    clearTimeout(closeTimeout);
                                    closeTimeout = null;
                                }, closeTime);
                                UIMgr.layerChanging = false;
                                UIMgr.repaint();
                            }, handler);
                        }
                        break;
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    this.setCloserTimer = function (target, closeTime) {
        var checkTimer = setTimeout(function () {
            PopupMgr.closePopup(target);
            clearTimeout(checkTimer);
            checkTimer = null;
        }, closeTime);
    };
};