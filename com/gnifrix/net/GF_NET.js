// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * GF_NET
 * @description GF_NET Season 3 (지니프릭스 내부 통신)
 * @author Lazuli
 * @since 2015.12.08
 */

/* SERVER SETTING */
var DMC_LIVE = false, URL_SERVICE_LIVE = "", URL_SERVICE_TEST, URL_SERVICE_UAT = "", URL_SERVICE = "";
/* BTV STB SETTING BTV 관련 변수 추가 */ 
var sPriId, sHostMac, sUserName, sDpsToken, SERVICE_ID, DEFAULT_PWD, DEFAULT_IP_ADDRESS;
// Class Static Configure
var SVC_USR = "USR";
var SVC_RNK = "RNK";
var SVC_SNG = "SNG";
var SVC_CACH = "CACH";
var GF_NET = new function() {
    this.appId = "";
    this.svcaId = "";
    this.userKey = "";
    this.recKey = "";
    this.stayMon = "";
    this.rsAddr = "";
    this.rsBase = "";
    this.rsPath = "";
    this.appVer = "";

    var gfnet = null;

    /**
     * Kochic 200416 
     * Request 후 네트워크 단절 시
     * TImeout or Closed 체크하여
     * 통신장애 팝업 발생
     */

    var NET_ERR_UNKNOWN = -1
    var NET_ERR_TIMEOUT = -2;
    var NET_ERR_CLOSED = -3;

    var On_ErrorRecved = function(msg) {

        console.debug("[GF_NET] On_ErrorRecved : " + msg);
        switch (msg) {
            case NET_ERR_CLOSED:
                appMgr.openDisconnectPopup("ConnectionData is Closed");
                break;

            case NET_ERR_TIMEOUT:
                appMgr.openDisconnectPopup("ConnectionData is Timeout");
                break;

            default:
                appMgr.openDisconnectPopup("ConnectionData is Unknown");
                break;
        }
    }

    var logger = function(msg) {
        console.debug("[GF_NET] Logger : " + msg);
    }

    var serverLog = function(msg) {
        console.log("[GF_NET] DebugLog : " + msg);
    }

    var error = function(msg) {
        console.error("[GF_NET] Error : " + msg);
    }

    var request = function(obj, callback, funcId) {
        try {
            if (!GF_NET.ConnectionData) {
                console.error("ConnectionData is Null or Undefined");
                appMgr.openDisconnectPopup("ConnectionData is Null or Undefined");
                return;
            }
            HLog.netSend(funcId, JSON.stringify(obj));
            gfnet.request(obj, function(data) {
                if (data.success == "true") HLog.netRecv(funcId, JSON.stringify(data));
                else HLog.netErr(funcId, JSON.stringify(data));
                if (callback) callback(data);
            });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * @description 서버에 단일 또는 다중 데이터 요청
     * @param {string} cmd 기능(함수) ID (다중일 경우 사용)
     * @param {string} funcId 기능(함수) ID (단일일 경우 사용)
     * @param {string} svcId 서비스(모듈) ID : "USR", "RNK", "SNG", "CACH" (단일일 경우 사용)
     * @param {JsonObject} params 요청 항목
     * @param {function} handler 핸들러(콜백함수)
     * @description 파라미터 셋팅 
     * @description - 단일 (funcId, svcId, params, handler)
     * @description - 다중 (cmd, params, handler)
     */
    this.Req_Send = function() {
        var reqObj = {
            "requests": null
        };
        if (arguments.length == 4) {
            // 단일 요청
            reqObj.requests = [{
                    "reqNo": 0,
                    "funcId": arguments[0],
                    "svcId": arguments[1],
                    "params": arguments[2]
                }];
            request(reqObj, arguments[3], arguments[0]);
        } else if (arguments.length == 3) {
            // 다중 요청
            reqObj.requests = arguments[1];
            request(reqObj, arguments[2], arguments[0]);
        } else {
            console.error("[GF_NET] Req_Send's Parameter Error");
        }
    };

    /**
     * @description 다중데이터를 요청하기 위한 파라미터 형식을 맞춤
     * @param {int} reqNo 요청 번호
     * @param {string} svcId 서비스(모듈) ID : "USR", "RNK", "SNG", "CACH"
     * @param {string} funcId 기능(함수) ID
     * @param {JsonObject} paramObj 요청파라미터
     * @return {JsonObject} 구성된 파라미터 리턴
     */
    this.makeBody = function(reqNo, svcId, funcId, paramObj) {
        var jObj = {};
        try {
            jObj.reqNo = reqNo;
            jObj.svcId = svcId;
            jObj.funcId = funcId;
            jObj.params = paramObj;
            return jObj;
        } catch (e) {
            console.error(e);
        } finally {
            jObj = null;
        }
    };

    /**
     * @description Connection 데이터
     */
    this.ConnectionData = null;
    /**
     * @description Connection 후 로그인
     * @param {function} onload 핸들러(콜백함수)
     * @param {function} eventRecvCallback 이벤트 리시브 핸들러(콜백함수)
     * @param {function} connClosed Connection Closed(콜백함수)
     */
    this.Connection = function(onload, eventRecvCallback, connClosed) {
        if (gfnet && gfnet.isConnected()) {
            gfnet.close();
        } else {
            try {
                gfnet = new GFNet({
                    host: URL_SERVICE,
                    port: "9651",
                    svcaId: GF_NET.svcaId,
                    handlers: {
                        connected: function(data) {
                            logger("connected ->\r\n" + JSON.stringify(data, null, 2));
                            if ("false" == data.success) {
                                GF_NET.ConnectionData = null;
                                error("connect failed.");
                            } else {
                                GF_NET.ConnectionData = data;
                                GF_NET.userKey = GF_NET.ConnectionData.s2LoginUser.userKey;
                                if (GF_NET.userKey === "0") GF_NET.userKey = GF_NET.ConnectionData.users[0].userKey;
                                GF_NET.recKey = GF_NET.ConnectionData.recKey;
                                GF_NET.stayMon = GF_NET.ConnectionData.stayMon;
                                GF_NET.LoginUpdt(onload);
                            }
                        },
                        // fired when some data received from server(uni-directional)
                        eventReceived: function(data) {
                            logger("event received");
                            if (data) {
                                logger(JSON.stringify(data, null, 2));
                                if (eventRecvCallback) eventRecvCallback(data);
                                return;
                            }
                            if (eventRecvCallback) eventRecvCallback();
                        },
                        // fired when connection is closed.
                        connectionClosed: function() {
                            GF_NET.ConnectionData = null;
                            if (connClosed) connClosed();
                            logger("connection closed");
                            On_ErrorRecved(GF_NET.NET_ERR_TIMEOUT);
                        }
                    },
                    logger: serverLog,
                    debug: true
                });
                var connReq = {
                    "priId": sPriId, //KTPlatform.getSaid(), BTV 에서 가져온 sPridId로 변경
                    "appId": GF_NET.appId,
                    "svcaId": GF_NET.svcaId,
                    "hostMac": sHostMac //KTPlatform.getMacAddress() BTV 에서 가져온 sHostMac으로 변경
                };
                logger("connecting ->\r\n" + JSON.stringify(connReq));
                gfnet.connect(connReq);
            } catch (e) {
                console.error(e);
            } finally {
                connReq = null;
            }
        }
    };

    /**
     * @description 로그인
     * @param {function} onload 핸들러(콜백함수)
     */
    this.LoginUpdt = function(onload) {
        try {
            var param = {
                "appId": GF_NET.appId,
                "recKey": GF_NET.recKey,
                "userKey": GF_NET.userKey,
                "stayMon": GF_NET.stayMon,
                "svcaId" : GF_NET.svcaId
            };
            GF_NET.Req_Send("LoginUpdt", SVC_USR, param, onload);
            param = null;
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * @param {function} handler 핸들러(콜백함수)
     * @description 로그아웃
     */
    this.LogoutUpdt = function(handler) {
        try {
            var param = {
                "recKey": GF_NET.recKey,
                "stayMon": GF_NET.stayMon
            };
            GF_NET.Req_Send("LogoutUpdt", SVC_USR, param, handler);
            param = null;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * @param {function} handler 핸들러(콜백함수)
     * @description 캐쉬상품 조회 요청
     */
    this.CashProductList = function(handler) {
        try {
            var param = {
                "svcaId": GF_NET.svcaId,
                "appId": GF_NET.appId
            }
            GF_NET.Req_Send("CashProductList", SVC_SNG, param, handler);
            param = null;
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * @description 결제 시작 요청
     * @param {string} prodCode 상품코드
     * @param {int} paymentType 결제방법코드 0: 일반결제, 1: 지니코인, 2: 핸드폰결제, 3: 무료제공
     * @param {function} handler 핸들러(콜백함수)
     */
    this.ProdCodePaymentBegin = function(prodCode, paymentType, handler) {
        try {
            var param = {
                "svcaId": GF_NET.svcaId,
                "appId": GF_NET.appId,
                "userKey": GF_NET.userKey,
                "prodCode": prodCode,
                "paymentType": paymentType
            }
            GF_NET.Req_Send("ProdCodePaymentBegin", SVC_SNG, param, handler);
            param = null;
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * @description 결제 종료 요청
     * @param {string} recKey PaymentBegin의 결과에 리턴으로 받은 recKey
     * @param {int} state 상태 0: 구매시도(최초값: 0), 1: 실패(RP로부터 수신한 값), 2: 완료, 3: 환불(별도 고객대응 후 코드변경), 4: 구매내역삭제, 5: 결제 한도 초과 
     * @param {string} mon PaymentBegin의 결과에 리턴으로 받은 mon
     * @param {string} prodCode 상품코드
     * @param {string} orderId 결제ID정보
     * @param {function} handler 핸들러(콜백함수)
     */
    this.ProdCodePaymentEnd = function(recKey, state, mon, prodCode, orderId, handler) {
        try {
            var param = {
                "recKey": recKey,
                "svcaId": GF_NET.svcaId,
                "state": state,
                "mon": mon,
                "appId": GF_NET.appId,
                "userKey": GF_NET.userKey,
                "prodCode": prodCode,
                "orderId": orderId
            }
            GF_NET.Req_Send("ProdCodePaymentEnd", SVC_SNG, param, handler);
            param = null;
        } catch (e) {
            console.error(e);
        }
    };
};