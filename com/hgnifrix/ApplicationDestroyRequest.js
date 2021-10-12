/**
 * KT Platform Module
 * @author Lazuli
 * @since 2016. 01. 13
 * @description 어플리케이션이 종료될 때 호출 되는 함수
 * @description destroyApplication()으로 종료되는 경우는 호출 되지 않음
 */

var ApplicationDestroyRequest = function(destroy) {
    try {
        // Thread 해제
        UIMgr.pause();
        // 각 SCENE의 dispose 함수 호출
        for (var i = 0; i < Object.keys(SCENE).length; i++) {
            if (!SCENE[Object.keys(SCENE)[i]].hasOwnProperty("dispose")) continue;
            SCENE[Object.keys(SCENE)[i]].dispose();
            console.log("# " + SCENE[Object.keys(SCENE)[i]].toString() + " dispose !!");
        }
        // 각 POPUP의 dispose 함수 호출
        for (var i = 0; i < Object.keys(POPUP).length; i++) {
            if (!POPUP[Object.keys(POPUP)[i]].hasOwnProperty("dispose")) continue;
            POPUP[Object.keys(POPUP)[i]].dispose();
            console.log("# " + POPUP[Object.keys(POPUP)[i]].toString() + " dispose !!");
        }
        appMgr.destroy();
        if (GF_NET.ConnectionData) {
            GF_NET.LogoutUpdt(function(res) {
                console.debug(res);
                console.debug("LOG OUT !!");
            });
        }
    } catch (e) {
        console.error(e);
    } finally {
        console.log("###################################################");
        console.log("# " + "ApplicationDestroy !!");
        console.log("###################################################");
        if (!ISWEB) {
//            KTPlatform.removeEventListener("ApplicationDestroyRequest");   BTV 포팅시 KT관련 부분 제거
            if(destroy) {
                var mgr = oipfObjectFactory.createApplicationManagerObject();
                var obs = mgr.findApplications("dvb.appId", "4e30.3000");  // 옵져버
                obs[0].window.postMessage({method: "obs_setPromoChannel"}, "*");
//                KTPlatform.destroyApplication();
            }
        }
    }
};