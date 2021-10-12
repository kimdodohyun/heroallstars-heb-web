// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * JS Loader
 * @description Load JavascriptFile & Add Scene/Popup
 * @author Lazuli
 * @since 2015.1.2
 */

// 동적 프리로딩
window.addEventListener('load', function() {
    // @formatter:off
    var jsArr = [
        /** HMF Module */
        "HMFSetting.js",
        "com/gnifrix/tool/HTool.js",
        "com/gnifrix/tool/ResourceManager.js",
        "com/gnifrix/lang/StorageManager.js",
        "com/gnifrix/ui/UIManager.js",
        "com/gnifrix/ui/PopupManager.js",
        // HSeries
        "com/gnifrix/tool/HLog.js",
        "com/gnifrix/ui/text/HTextRender.js",
        "com/gnifrix/ui/HAutoScreen.js",
        "com/gnifrix/ui/HLayout.js",
        "com/gnifrix/ui/HDrawManager.js",
        "com/gnifrix/media/HSoundManager.js",
        "com/gnifrix/net/GF_NET.js",
        "com/gnifrix/net/NetManager.js",
        "com/gnifrix/net/jsgfnet.js",
        /** STB Platform Module*/
        // KT //
        "lib/KT/tripledes.js",
//        "com/gnifrix/platform/kt/KTPlatform.js",   KT 관련 BTV 포팅 시 주석처리
//        "com/gnifrix/platform/kt/SSO.js",
//        "com/gnifrix/platform/kt/KTVOD.js",
        "com/gnifrix/platform/btv/BTVPlatform.js",
        "com/hgnifrix/ApplicationDestroyRequest.js",
        /** Support */
        "game/GameLoadList.js",
        "game/GameManager.js",
        "game/NetManager.js",
        /** Sample Context */
        "game/GameContext.js",
        /** Starmon Scene */
        "game/scene/InitScene.js",
        /** Starmon Popup */
        "game/popup/DisconnectPopup.js"
    ];
    
    if (typeof android === "undefined") {
        jsArr.push("com/hgnifrix/android.js");
    }


    // 동적 로딩 시작
    HMFLoader.load(jsArr, function() {
        // 모든 파일의 로드 및 실행이 완료되면 호출
        MainframeSetting();
        loadComplete();
        document.addEventListener("keydown", UIMgr.HandleKeyEvent);
        document.addEventListener("keyup", UIMgr.HandleKeyEventUp);
//        KTPlatform.addEventListener("ApplicationDestroyRequest", ApplicationDestroyRequest);   KT 관련 BTV 포팅 시 주석처리
    }, function(err) {
        console.error(err);
    });

    function loadComplete() {
        // Scene 등록
        SCENE.SC_INIT = InitScene;
        POPUP.POP_ERROR = DisconnectPopup;
        UIMgr.changeLayer(SCENE.SC_INIT);
    }
}, false);

var HMFLoader = new function() {
    this.load = function(urls, callback, errorCallback) {
        var loadScripts = function(files) {
            function loadNext() {
                var path = files.shift();
                if (!path) {
                    console.log('[HMFLoader] All JS Loaded');
                    callback();
                    return;
                }
                var scriptElm = document.createElement('script');
                scriptElm.type = 'text/javascript';
                scriptElm.src = path;
                scriptElm.onload = scriptElm.onreadystatechange = function() {
                    console.log('[HMFLoader]', path, 'is ready');
                    loadNext();
                }
                scriptElm.onerror = function(err) {
                    console.error('[HMFLoader] ERROR !! ', path);
                    errorCallback(err);
                }
                var headElm = document.head || document.getElementsByTagName('head')[0];
                headElm.appendChild(scriptElm);
            }
            loadNext();
        }
        loadScripts(urls);
    };
};