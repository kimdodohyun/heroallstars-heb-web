// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @description Scene & Popup Management
 * @author Lazuli
 * @since 2015.1.2
 */

var SCENE = {};
var POPUP = {};
var CANVAS = document.getElementById("H_CANVAS"), g = CANVAS.getContext("2d"), L_CANVAS, gl;
var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var INTERVAL, isInterval = true, isUseKey = true;
var runnableLayer, keyFocusLayer;
var FPS, SLEEP = 1000 / FPS;
var ZOOM = 4 / 3;

// BTV 용 KEY 관련 내용 정의 팝업은 각 게임에서 사용하는 팝업 이용
function Rev_KeyCode(response) {
    console.error(">> Rev_KeyCode response >> " + response);
    UIMgr.HandleKeyEvent(Number(response));
}

function Rev_DispatchKeyCode(response) {
    console.error(">> Rev_DispatchKeyCode response >> " + response);
    // UIMgr.HandleKeyEvent(Number(response));
    
    var keyCode = Number(response);
    switch (keyCode) {
        case 84:
            // appMgr.getMessage0BtnPopup("앱 실행중에 지원하지 않는 기능입니다.");
            // PopupMgr.openPopup(POPUP.POP_MSG_0BTN, null, 1500);
            break;
            
        case 285:
        case 385:
            var obj = {keyCode:123};
            UIMgr.HandleKeyEvent(obj);
            break;
    }
}

//
//#########################################################################
// Layer Manager
//#########################################################################

var UIMgr = new function () {
    
    this.getCanvas = function() {
        return CANVAS;
    };
    
    this.layerChanging = false;
    /**
     * 스크린 사이즈 설정 및 Canvas 셋팅
     * @param {int} width = 스크린 가로 사이즈(px)
     * @param {int} height = 스크린 세로 사이즈(px)
     */
    this.setSCREEN_SIZE = function (width, height) {
        SCREEN_WIDTH = width;
        SCREEN_HEIGHT = height;
        // CANVAS Setting
        CANVAS.width = SCREEN_WIDTH;
        CANVAS.height = SCREEN_HEIGHT;
    };

    this.AUTO_SCREEN = true;
    this.HAS_LOADINGBAR = false;
    this.DEFAULT_FONT = "'myFont'";
    this.AUTO_SCREEN_HOTKEY = 120;

    this.toString = function () {
        return "UIManager";
    };

    // 활성화 Scene. Default 값 설정
    this.prevLayer = "";
    this.currentLayer = "";
    this.onChangeLayer = null;

    /**
     * Key Pressed Event Handler
     */
    this.HandleKeyEvent = function (e) {
        if ((!isInterval && !isUseKey) || !isUseKey) return;
        // BTV 에서 들어오는 키값으로 인한 이슈 발생으로 사용하지 않음
//        e.stopPropagation();
//        if (e.keyCode == UIMgr.AUTO_SCREEN_HOTKEY) {
//            UIMgr.changeAutoScreen();
//        }
        switch (e.keyCode) {
            default:
                var keyCode = getKeyCode(e);
                // var keyCode = getEmulKeyCode(e);
                // if (keyCode == undefined || keyCode == "undefined") {
                //     keyCode = e;
                // }
                HLog.log("onKeyPressed : " + e.keyCode);
                
                // BTV 에서 나가기 키를 눌렀을 때에도 종료 팝업을 띄우기 위한 소스 추가
                if (keyCode == KEY_EXIT) {
                    
                    if(PopupMgr.currentPopup.contains(POPUP.POP_MSG_2BTN)) {
                        PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    } else {

                        if (isOnPopup) {
                            document.getElementById("onPop").src = "";
                            document.getElementById("onPop").style.visibility = "hidden";
                            isOnPopup = false;
                        }


                        POPUP.POP_MSG_2BTN.getInstance().setMessage("게임을 종료하시겠습니까?");
                        PopupMgr.openPopup(POPUP.POP_MSG_2BTN, function (code, data) {
                            PopupMgr.closeAllPopup();
                            if( data==0 ) android.exitGame();// StarmonManager.goGniPortal();
                        });
                    }
                }
                
                if (!keyFocusLayer) {
                    if (PopupMgr.currentPopup.size() > 0 && PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1).hasOwnProperty("onKeyPressed"))
                    // 활성화되어있는 팝업이 있을경우 가장 마지막에 있는 팝업에 키 이벤트 전달
                    // 활성화되어있는 팝업이 있지만 팝업이 아닌 Scene 에서 키 이벤트 처리하려면
                    // 팝업의 onKeyPressed 함수에
                    // SCENE[UIMgr.currentLayer].onKeyPressed(key); 추가
                        PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1).onKeyPressed(keyCode);
                    else if (UIMgr.currentLayer.hasOwnProperty("onKeyPressed"))
                    // 현재 활성화 되어있는 Scene 으로 키 이벤트 전달
                        UIMgr.currentLayer.onKeyPressed(keyCode);
                } else {
                    keyFocusLayer.onKeyPressed(keyCode);
                }
                break;
        }
    };

    // TEST KEY
    function getEmulKeyCode(e) {
        switch(e) {
            case 22: return KEY_RIGHT;
            case 19: return KEY_UP;
            case 21: return KEY_LEFT;
            case 20: return KEY_DOWN;
            case 66: return KEY_ENTER;
            case 67: return KEY_PREV;
        }
    }
    
    // BTV에서 들어오는 컬러키 관련하여 코드 수정
    function getKeyCode(e) {
        
        if (e.keyCode == 227) {
            return KEY_RED;
        } else if (e.keyCode == 228) {
            return KEY_BLUE;
        }
        
        switch(e) {
            case 89 : return KEY_RED;
            case 85 : return KEY_YELLOW;
            case 86 : return KEY_GREEN;
            case 90 : return KEY_BLUE;
            case 4 : return KEY_PREV;
            default : return e.keyCode;
        }
    }

    /**
     * Key Relessed Event Handler
     */
    this.HandleKeyEventUp = function (e) {
        if (!isInterval) return;
        e.stopPropagation();
        switch (e.keyCode) {
            default:
                HLog.log("onKeyReleased : " + e.keyCode);
                if (!keyFocusLayer) {
                    if (PopupMgr.currentPopup.size() > 0 && PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1).hasOwnProperty("onKeyReleased"))
                        PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1).onKeyReleased(e.keyCode);
                    else if (UIMgr.currentLayer.hasOwnProperty("onKeyReleased"))
                        UIMgr.currentLayer.onKeyReleased(e.keyCode);
                } else if (keyFocusLayer.hasOwnProperty("onKeyReleased")) {
                    keyFocusLayer.onKeyReleased(e.keyCode);
                }
                break;
        }
    }

    /**
     * Mouse Clicked Event Handler
     */
    this.HandleClickEvent = function (e) {
        var x = newParseInt((e.pageX - CANVAS.offsetLeft) / newParseInt(CANVAS.style.width.toString().replace("px", "")) * SCREEN_WIDTH);
        var y = newParseInt((e.pageY - CANVAS.offsetTop) / newParseInt(CANVAS.style.height.toString().replace("px", "")) * SCREEN_HEIGHT);
        console.debug("onClickEvent === (" + x + ", " + y + ")");
        if (!keyFocusLayer) {
            if (PopupMgr.currentPopup.size() > 0 && PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1).hasOwnProperty("onClickEvent"))
                PopupMgr.currentPopup.get(PopupMgr.currentPopup.size() - 1).onClickEvent(x, y);
            else if (UIMgr.currentLayer.hasOwnProperty("onClickEvent"))
                UIMgr.currentLayer.onClickEvent(x, y);
        } else if (keyFocusLayer.hasOwnProperty("onClickEvent")) {
            keyFocusLayer.onClickEvent(x, y);
        }
        x = null, y = null;
    }

    if (this.HAS_LOADINGBAR == true) {
        L_CANVAS = document.getElementById("LOADING_BAR");
        L_CANVAS.width = SCREEN_WIDTH;
        L_CANVAS.height = SCREEN_HEIGHT;
        gl = L_CANVAS.getContext("2d");
    }

    /**
     * 원하는 레이어에 포커스를 줌
     * @param layer : 포커스 전달할 레이어, undefined 일 경우 기본 셋팅으로 설정
     */
    this.requestFocusLayer = function (layer) {
        if (!layer) {
            var ps = PopupMgr.currentPopup.size();
            if (ps > 0) {
                runnableLayer = PopupMgr.currentPopup.get(ps - 1);
                keyFocusLayer = PopupMgr.currentPopup.get(ps - 1);
            } else {
                runnableLayer = null;
                keyFocusLayer = null;
            }
            ps = null;
        } else {
            runnableLayer = layer;
            keyFocusLayer = layer;
        }
    }

    /**
     * 쓰레드 일시 정지
     */
    this.pause = function () {
        clearInterval(INTERVAL);
        INTERVAL = null;
        isInterval = false;
        isUseKey = false;
    };

    /**
     * 쓰레드 일시 정지 해제 (작동)
     */
    this.resume = function () {
        isInterval = true;
        isUseKey = true;
        inter();
    };

    this.setSleep = function (sleep) {
        if (sleep <= 0) sleep = 1;
        SLEEP = sleep;
        FPS = 1000 / SLEEP;
        clearInterval(INTERVAL);
        INTERVAL = null;
        if (isInterval) inter();
    };

    this.setFPS = function (fps) {
        if (fps <= 0) fps = 1;
        FPS = fps;
        SLEEP = 1000 / FPS;
        clearInterval(INTERVAL);
        INTERVAL = null;
        if (isInterval) inter();
    };

    /**
     * 오토스크린 모드를 ON/OFF 하는 펑션
     * 주의 : 오토스크린 모드 적용 시 일부 폰트의 선명도가 떨어질 수 있음.
     */
    this.changeAutoScreen = function () {
        // 오토스크린 모드 변경
        if (UIMgr.AUTO_SCREEN == false) {
            UIMgr.AUTO_SCREEN = true;
            HLog.log("AUTO_SCREEN_ON");
        } else {
            UIMgr.AUTO_SCREEN = false;
            HLog.log("AUTO_SCREEN_OFF");
        }
        // SCENE 크기 변경
        HAutoScreen.autoScreen();

        if (UIMgr.HAS_LOADINGBAR == true)
            HAutoScreen.autoScreen_loadingbar();
    };

    /**
     * 오토스크린 모드를 ON/OFF 하는 펑션
     * 주의 : 오토스크린 모드 적용 시 일부 폰트의 선명도가 떨어질 수 있음.
     * @param {boolean} true설정 / false해제
     */
    this.setAutoScreen = function (bool) {
        if (typeof bool != "boolean" || UIMgr.AUTO_SCREEN == bool) {
            return;
        }
        UIMgr.AUTO_SCREEN = bool;
        // SCENE 크기 변경
        HAutoScreen.autoScreen();

        if (UIMgr.HAS_LOADINGBAR == true)
            HAutoScreen.autoScreen_loadingbar();
    };

    /**
     * Change Scene
     * @param {Scene} Target Scene
     * @param {data} sendData or callback Function
     */
    this.changeLayer = function (Scene) {
        UIMgr.layerChanging = true;
        UIMgr.prevLayer = UIMgr.currentLayer;
        if (UIMgr.HAS_LOADINGBAR == true) {
            HAutoScreen.autoScreen_loadingbar();
            document.getElementById("LOADING_BAR").style.display = 'block';
        }

        // 기존 화면 소멸 및 정지
        clearInterval(INTERVAL);
        INTERVAL = null;
        isInterval = false;
        
        g.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        UIMgr.requestFocusLayer();

        if (UIMgr.currentLayer) {
            HLog.log("ChangeScene === " + UIMgr.currentLayer + " >>> " + Scene.toString());
            UIMgr.currentLayer.stop();
        } else
            HLog.log("StartScene === " + Scene.toString());

        // 새로운 Scene 을 currentLayer 으로 설정
        UIMgr.currentLayer = Scene;

        // 오토스크린 적용
        HAutoScreen.autoScreen();

        // Arguments 셋팅
        var sendData;
        if (arguments.length == 1) sendData = null;
        else if (arguments.length == 2) sendData = arguments[1];
        else {
            sendData = [];
            for (var arg = 1; arg < arguments.length; arg++) {
                sendData.push(arguments[arg]);
            }
        }
        
        UIMgr.currentLayer.init(function () {
            document.getElementById("LOADING_BAR").style.display = 'none';
            // 리소스 로딩완료
            // 새로운 Scene 출력 및 시작
            UIMgr.currentLayer.start();
            if (UIMgr.currentLayer.hasOwnProperty("run")) {
                if (!runnableLayer) UIMgr.currentLayer.run();
                else if (runnableLayer.hasOwnProperty("run")) runnableLayer.run();
            }
            if (UIMgr.prevLayer != UIMgr.currentLayer && UIMgr.onChangeLayer && typeof UIMgr.onChangeLayer == "function") UIMgr.onChangeLayer();
            if (UIMgr.currentLayer.hasOwnProperty("paint")) UIMgr.currentLayer.paint();
            // Interval 설정
            if (!isInterval) {
                isInterval = true;
                inter();
            }
            UIMgr.layerChanging = false;
        }, sendData);
    };
    
    function inter() {
        INTERVAL = setInterval(function () {
            if (!isInterval) return;
            if (isInterval && UIMgr.currentLayer.hasOwnProperty("run")) {
                if (!runnableLayer) UIMgr.currentLayer.run();
                else if (runnableLayer.hasOwnProperty("run") && !PopupMgr.currentPopup.contains(runnableLayer)) runnableLayer.run();
            }
            // 팝업이 있을 경우
            var cs = PopupMgr.currentPopup.size();
            if (cs > 0) {
                for (var i = 0; i < cs; i++) {
                    if (isInterval && PopupMgr.currentPopup.get(i).hasOwnProperty("run")) {
                        if (runnableLayer == PopupMgr.currentPopup.get(i)) PopupMgr.currentPopup.get(i).run();
                    }
                }
            }
            clearInterval(INTERVAL);
            INTERVAL = null;
            cs = null;
            if (isInterval) inter();
        }, SLEEP);
    }
    
    this.repaint = function () {
        if (UIMgr.layerChanging) return;
        g.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            if (UIMgr.currentLayer.hasOwnProperty("paint")) UIMgr.currentLayer.paint();
            // 팝업이 있을 경우
            var cs = PopupMgr.currentPopup.size();
            if (cs > 0) {
                for (var i = 0; i < cs; i++) {
                    if (i == cs - 1) {
                        // 팝업 배경색 조절
                        g.setColor(PopupMgr.POPUP_TRUE_BACK_COLOR);
                        g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                    }
                    if (PopupMgr.currentPopup.get(i).hasOwnProperty("paint")) PopupMgr.currentPopup.get(i).paint();
                }
            }
            cs = null;
    }
};