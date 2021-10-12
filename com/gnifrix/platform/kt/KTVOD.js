///**
// * @author Lazuli
// * 2015.06.12
// */
//
//var SCREEN_WIDTH = 1280;
//var SCREEN_HEIGHT = 720;
//var vod_url_1;
//var vod_url_2;
//var vodState;
//
//
//var KTVODMgr = new function () {
//    
//    this.videoPlayer = document.getElementById("vod");
//    this.isplay = false;
//    
//    this.endVod = function() {
//        if(KTVODMgr.videoPlayer == null) KTVODMgr.videoPlayer = document.getElementById("vod");
//        KTVODMgr.isplay = false;
//        KTVODMgr.videoPlayer.pause;
//        KTVODMgr.videoPlayer.stop();
//        KTVODMgr.videoPlayer.style.visibility = "hidden";
//        UIMgr.changeLayer(SCENE.SC_ENTRY);
////        vodState = 5;
//    };
//    
//    // VOD 이벤트 리스너
//    function addVODEventListener() {
//        
//        KTVODMgr.videoPlayer.onPlaySpeedChanged = function (speed) {
//        }
//        KTVODMgr.videoPlayer.onPlayStateChange = function (state) {
//            vodState = state;
//            console.debug("[HMF] onPlayStateChange === " + vodState);
//            
//            if(vodState == 5){//종료
//                KTVODMgr.isplay = false;
//                KTVODMgr.videoPlayer.style.visibility = "hidden";
//                UIMgr.changeLayer(SCENE.SC_ENTRY);
//                
//            }else if(vodState == 1){//시작
//                KTVODMgr.isplay = true;
//            }
//        }
//        KTVODMgr.videoPlayer.onPlayPositionChanged = function (position) {
//        }
//    }
//    function leadingZeros(n, digits) {
//        // 1 -> 01 과 같이 변경하기
//        var zero = '';
//        n = n.toString();
//    
//        if (n.length < digits) {
//            for ( var i = 0; i < digits - n.length; i++)
//                zero += '0';
//        }
//        return zero + n;
//    }
//    function getTimeStamp() {
//        // 현재시간 구하기
//        var d = new Date();
//
//        // 20080301103025 표현식
//        var s = leadingZeros(d.getFullYear(), 4)
//            + leadingZeros(d.getMonth() + 1, 2) + leadingZeros(d.getDate(), 2)
//            + leadingZeros(d.getHours(), 2) + leadingZeros(d.getMinutes(), 2)
//            + leadingZeros(d.getSeconds(), 2);
//
//        return s;
//    }
//
//    this.playVod = function (vod_id) {
//        var xmlHttp = new XMLHttpRequest();
//        xmlHttp.onreadystatechange = function () {
//            
//            if (xmlHttp.readyState == 4) {
//                if (xmlHttp.status == 200) {
//                    
//                    var json = JSON.parse(xmlHttp.responseText);
//                    
//                    console.error("json >> " + JSON.stringify(xmlHttp.responseText));
//                    
//                    if (json != null) {
//                        if (json.vodServer1a != "" && json.advParam != "" && json.ticketId != "") {
//                            vod_url_1 = json.vodServer1a + "?p=" + json.advParam + ":S1;;" + json.ticketId + "X:";
//                            vod_url_2 = json.vodServer2a + "?p=" + json.advParam + ":S1;;" + json.ticketId + "X:";
//                            
//                            console.error("vod_url_1 >> " + vod_url_1);
//                            console.error("vod_url_2 >> " + vod_url_2);
//
//                            if(KTVODMgr.videoPlayer == null) KTVODMgr.videoPlayer = document.getElementById("vod");
//                            addVODEventListener();
//                            KTVODMgr.videoPlayer.data = vod_url_1;
//                            KTVODMgr.videoPlayer.style.visibility = "visible";
//                            KTVODMgr.videoPlayer.play(1);
//                        } else {
//                            console.error("json.vodServer1a && json.advParam && json.ticketId is null ");
//                        }
//                    } else {
//                        console.error("json is null");
//                    }
//                } else {
//                    console.error("xmlHttp.status >> " + xmlHttp.status);
//                }
//            }
//        };
//        
//        xmlHttp.open("POST", "https://webui.ktipmedia.co.kr/amoc-api/vod/start/viewx", true);
//        xmlHttp.timeout = 10000;
//        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//        xmlHttp.send("WMOCKey="
//                + "WalHous"
//                + "&authType=VOD&saId="
//                + KTPlatform.getSaid()
//                + "&buyingDate="
//                + getTimeStamp()
//                + "&catId=CV000000000005577375&appCd=H&reqPathCd=01&startPoint=0&contsId="
//                + vod_id);
//    }
//};