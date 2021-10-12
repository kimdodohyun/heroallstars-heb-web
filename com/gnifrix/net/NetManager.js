/**
 * @author Lazuli
 * @since 2015.06.12
 * @description 외부와의 통신
 */
var NetMgr = new function() {
    // 구매형 VOD 시청 인증
    // reqPathCd 는 시청목록일 때 02, 구매목록일 때 03
//    this.KT_authorizePVOD = function(contsId, buyingDate, catId, reqPathCd, onload) {
//        var reqUrl = "https://webui.ktipmedia.co.kr/amoc-api/vod/start/pvod";
//        var reqData = "";
//        reqData += "saId=" + KTPlatform.getSaid();
//        reqData += "&contsId=" + contsId;
//        reqData += "&buyingDate=" + buyingDate;
//        reqData += "&catId=" + catId;
//        reqData += "&appCd=" + "H";
//        reqData += "&reqPathCd=" + reqPathCd;
//        reqData += "&startPoint=" + "0";
//        reqData += "&WMOCKey=" + "OTVHome";
//        HLog.netSend(reqUrl + "?" + reqData);
//        $.ajax({
//            type: "POST",
//            async: "async",
//            url: reqUrl,
//            data: reqData,
//            dataType: "json",
//            success: function(resData) {
//                HLog.netRecv(JSON.stringify(resData));
//                if (onload) onload(resData);
//            },
//            error: function(request, status, er) {
//                console.error(request.status);
//                console.error(request.responseText);
//                if (err) err(request);
//            }
//        });
//    }
//    // 무료 VOD 시청 인증
//    // reqPathCd 는 시청목록일 때 02, 구매목록일 때 03
//    this.KT_authorizeFVOD = function(contsId, catId, reqPathCd, onload) {
//        var reqUrl = "https://webui.ktipmedia.co.kr/amoc-api/vod/start/fvod";
//        var reqData = "";
//        var today = new Date();
//        reqData += "saId=" + KTPlatform.getSaid();
//        reqData += "&contsId=" + contsId;
//        reqData += "&systemDate=" + HTool.getDateStrWithMilliSeconds();
//        reqData += "&catId=" + catId;
//        reqData += "&appCd=" + "H";
//        reqData += "&reqPathCd=" + reqPathCd;
//        reqData += "&startPoint=" + "0";
//        reqData += "&WMOCKey=" + "OTVHome";
//        HLog.netSend(reqUrl + "?" + reqData);
//        $.ajax({
//            type: "POST",
//            async: "async",
//            url: reqUrl,
//            data: reqData,
//            dataType: "json",
//            success: function(resData) {
//                HLog.netRecv(JSON.stringify(resData));
//                if (onload) onload(resData);
//            },
//            error: function(request, status, er) {
//                console.error(request.status);
//                console.error(request.responseText);
//                if (err) err(request);
//            }
//        });
//    }
//    // 구매여부 확인 
//    this.KT_getLinkTime = function(contsId, onload) {
//        var reqUrl = "http://webui.ktipmedia.co.kr:8080/amoc-api/vod/prepare";
//        var reqData = "";
//        reqData += "saId=" + KTPlatform.getSaid();
//        reqData += "&contsId=" + contsId;
//        reqData += "&uhdYn=" + "N";
//        reqData += "&WMOCKey=" + "OTVHome";
//        HLog.netSend(reqUrl + "?" + reqData);
//        $.ajax({
//            type: "POST",
//            async: "async",
//            url: reqUrl,
//            data: reqData,
//            dataType: "json",
//            success: function(resData) {
//                HLog.netRecv(JSON.stringify(resData));
//                if (onload) onload(resData);
//            },
//            error: function(request, status, er) {
//                console.error(request.status);
//                console.error(request.responseText);
//                if (err) err(request);
//            }
//        });
//    }
//    // VOD 구간별 썸네일 이미지 받아오기
//    this.KT_getThumb = function(contsId, onload) {
//        var reqUrl = "http://wapi.ktipmedia.co.kr/api/thumbnail/list.json";
//        var reqData = "";
//        reqData += "SAID=" + KTPlatform.getSaid();
//        reqData += "&content_id=" + contsId;
//        reqData += "&WMOCKey=" + "OTVHome";
//        HLog.netSend(reqUrl + "?" + reqData);
//        $.ajax({
//            type: "get",
//            async: "async",
//            url: reqUrl,
//            data: reqData,
//            dataType: "json",
//            success: function(resData) {
//                HLog.netRecv(JSON.stringify(resData));
//                if (onload) onload(resData);
//            },
//            error: function(request, status, er) {
//                console.error(request.status);
//                console.error(request.responseText);
//                if (err) err(request);
//            }
//        });
//    }
};