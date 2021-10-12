var GameManager = new function() {
    var RP_URL = null;
    var tutorialState = false;
    var isFirstConn = false;

    var userText = ["임시사용자", "-"];

    this.getUserText = function() {
        return userText;
    };
    
    this.getFirstConn = function() {
        return isFirstConn;
    };

    this.init = function(onload) {
        loadStarmonScripts(function() {
            var compCnt=0;
            var complete=function(){
                compCnt++;
                if(compCnt==3){
                    onload();
                }
            }
            POPUP.POP_WAITING.setResource(complete);
            POPUP.POP_MSG_0BTN.setResource(complete);
            UIMgr.setFPS(12);
            ResourceMgr.setTimeoutListener(function(){GameManager.openDisconnectPopup("Resource Timeout!!!")});
            GameManager.connect(complete);
        });
    };
	
    this.connect = function(onload) {
        onload();
        GF_NET.Connection(function(response) {
            if (NetManager.isSuccess(response)) {
                userText[0] = NetManager.getResult(response, 0).userId;
                userText[1] = "어서오세요~ 반갑습니다!!";
                RP_URL = NetManager.getRsPath();
                initManager();
                
                // BTV 관련 아이디가 무명등록으로 들어올시 안드로이드 셋탑박스 이름으로 변경
                if (userText[0].substr(0, 2) == "무명") {
                    NetManager.Req_ReplaceUserId();
                }

                if (NetManager.getResult(response, 0).connCount == 0) {
                    NetManager.Req_todayInit(function(response) {
                        if (NetManager.isSuccess(response)) {
                            isFirstConn = true;
                        } else {
                            GameManager.openDisconnectPopup("todayInit fail", this);
                        }
                    });
//					EventHelper.eventSetting(true); // 해당 날짜 첫 출석인지 아닌지 true : false
                } else {
                    isFirstConn = false;
//					EventHelper.eventSetting(false);
				}
                onload();
            } else { // 로그인 실패
                this.openDisconnectPopup("Login Fail!!");
            }
        }); // 서버접속
    };

    var initManager = function() {
        TokenManager.update();
//        RaidModeManager.update();
    };

    this.getRP_URL = function() {
//        return RP_URL + DMC_NAME + "/";
        return "http://61.251.167.91/html5/DefenceGame/";
    };

    this.changeLayer = function(layer, showLoading, nextIFrame) {
        SCENE.SC_CHANGER.getInstance().setNextScene(layer, showLoading, nextIFrame);
        UIMgr.changeLayer(SCENE.SC_CHANGER);
    };

    var soundPath;
    this.playNetSound = function(_path) {
        if (!(_path in HSoundMgr.soundMap)) {
            HSoundMgr.add(_path, _path);
            HSoundMgr.playSound(_path)
        } else {
            HSoundMgr.playSound(_path);
        }

    };

    this.loopNetSound = function(_path) {
//        if (_path == soundPath) return;
//        if (soundPath in HSoundMgr.soundMap)
//            HSoundMgr.stopSound(soundPath);
//        soundPath = _path;
//        if (!(soundPath in HSoundMgr.soundMap)) {
//            HSoundMgr.add(soundPath, soundPath);
//            HSoundMgr.loopSound(soundPath)
//        } else {
//            HSoundMgr.loopSound(soundPath);
//        }
        android.loopSound(_path);
    };

    this.stopSound = function() {
//        HSoundMgr.stopSoundAll();
//        soundPath = null;
        android.stopSound();
    };


    this.replaceNetIFrame = function (path, onload) {
        var iframe = new Image();
        ResourceMgr.loadImage(iframe, path, function () {
            if(onload) onload(iframe);
        }, function () {
            appMgr.openDisconnectPopup("replaceNetIfrme load fail!");
            return null;
        });
    };

    /** 통신장애 팝업 */
    this.openDisconnectPopup = function(string, owner) {
        HLog.err(string, null, owner);
        PopupMgr.openPopup(POPUP.POP_ERROR, null);
    };
    
    this.getMessage0BtnPopup = function(msg) {
        Message0BtnPopup.getInstance().setMessage(msg);
        return Message0BtnPopup;
    };

    this.getMessage1BtnPopup = function(msg) {
        Message1BtnPopup.getInstance().setMessage(msg);
        return Message1BtnPopup;
    };

    this.getMessage2BtnPopup = function(msg, str) {
        
        if (str == null) {
            Message2BtnPopup.getInstance().setMessage(msg);
        } else {
            Message2BtnPopup.getInstance().setMessage(msg, str);
        }
         
        return Message2BtnPopup;
    };
    
    this.getTutorialState = function () {
        return tutorialState;
    };

    this.setTutorialState = function (state) {
        tutorialState = state;
    };

    this.goGniPortal = function() {
        HLog.sys("Go To GniPortal Start!!~~");
        var openLink = function(redirectURL) {
            try {
                var xhr = new XMLHttpRequest();
                var ajaxTTimeout = function() {
                    xhr.abort();
                    // KT 로그인 여부 체크 : 직접 구현
                    if (!GF_NET.isLogoutStatus()) {
                        this.openDisconnectPopup("Go To GniPortal Error!!~~(1)");
                    }
                };
                var xmlHttpTimeout = setTimeout(ajaxTTimeout, 20000);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        ApplicationDestroyRequest(false);
                        clearTimeout(xmlHttpTimeout);
                        xmlHttpTimeout = null;
                        window.location.href = redirectURL;
                        HLog.sys("Go To GniPortal Finish!!~~");
                    } else if ((xhr.readyState == 4 && xhr.status == 0) || xhr.status == 403 || xhr.status == 404) {
                        // 에러팝업 : 직접 구현
                        GameManager.openDisconnectPopup("Go To GniPortal Error!!~~(2)");
                        clearTimeout(xmlHttpTimeout);
                        xmlHttpTimeout = null;
                    }
                };
                xhr.open('head', redirectURL);
                xhr.send(null);
            } catch (e) {
                HLog.err(e);
            }
        };
        openLink("../../gniportal/index.html");
    };

    this.destroy = function () {
//		EventHelper.destroyEventHelper();
        CommonUIDrawManager.removeResource();
        HeroManager.destroy();
        ItemManager.destroy();
        MessageManager.destroy();
        NoticeManager.destroy();
        PlayResManager.destroy();
        StageManager.destroy();
        POPUP.POP_MAILBOX.getInstance().destroy();
    };
};

// 공통변수에 할당.
var appMgr = GameManager;

var Point = function (x, y) {
    this.x = x;
    this.y = y;
};
