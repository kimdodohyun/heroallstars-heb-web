///**
// * KT Platform Module
// * @author Lazuli
// * @since 2015. 06. 01
// */
//
//var KTPlatform = new function () {
//    this.DEFAULT_IP_ADDRESS = "";
//    this.DEFAULT_PWD = "0000"
//    /**
//     * SAID 정보 요청
//     * @returns {String} SAID
//     */
//    this.getSaid = function () {
//        if (!ISWEB) return oipfObjectFactory.createConfigurationObject().configuration.getText("SAID");
//        else return navigator.ipAddress ? navigator.ipAddress : KTPlatform.DEFAULT_IP_ADDRESS;
//    }
//    /**
//     * IP 정보 요청
//     * @returns {String} IP_ADDRESS
//     */
//    this.getIpAddress = function () {
//        if (!ISWEB) return oipfObjectFactory.createConfigurationObject().localSystem.networkInterfaces.item(0).ipAddress;
//        else return navigator.ipAddress ? navigator.ipAddress : KTPlatform.DEFAULT_IP_ADDRESS;
//    }
//    /**
//     * MAC 정보 요청
//     * @returns {String} MAC_ADDRESS
//     */
//    this.getMacAddress = function () {
//        if (!ISWEB) return oipfObjectFactory.createConfigurationObject().localSystem.networkInterfaces.item(0).macAddress;
//        else return navigator.ipAddress ? navigator.ipAddress : KTPlatform.DEFAULT_IP_ADDRESS;
//    }
//    /**
//     * STB 모델명 요청
//     * @returns {String} MODEL_NAME
//     */
//    this.getModelName = function () {
//        if (ISWEB) return;
//        else return oipfObjectFactory.createConfigurationObject().localSystem.modelName;
//    }
//    /**
//     * STB 파워 상태 변경
//     * @description 0 : 전원 OFF 모드 (본 규격에서는 리부팅 동작을 위해 사용된다.)
//     * @description 1 : 일반 동작 모드
//     * @description 2 : 리모컨 수신, 전면 패널 버튼 처리, 하드웨어 타 이머만 동작하는 대기 모드
//     * @description 3 : 비디오/오디오 출력만 차단하고, 어플리케이션이 모두 동작하는 대기 모드
//     * @description 4 : Passive standby 와 동일하나, passive standby 모 드에서 빠져 나올 때 어플리케이션 동작 상태를 빠르게 복구할 수 있는 모드
//     * @param {int} state 변경 할 상태
//     */
//    this.setPowerState = function (state) {
//        if (ISWEB) return;
//        oipfObjectFactory.createConfigurationObject().localSystem.setPowerState(state);
//    }
//    /**
//     * STB 파워 상태 요청
//     * @description 0 : 전원 OFF 모드 (본 규격에서는 리부팅 동작을 위해 사용된다.)
//     * @description 1 : 일반 동작 모드
//     * @description 2 : 리모컨 수신, 전면 패널 버튼 처리, 하드웨어 타 이머만 동작하는 대기 모드
//     * @description 3 : 비디오/오디오 출력만 차단하고, 어플리케이션이 모두 동작하는 대기 모드
//     * @description 4 : Passive standby 와 동일하나, passive standby 모 드에서 빠져 나올 때 어플리케이션 동작 상태를 빠르게 복구할 수 있는 모드
//     * @returns {int} POWER_STATE
//     */
//    this.getPowerState = function () {
//        if (ISWEB) return;
//        else return oipfObjectFactory.createConfigurationObject().localSystem.powerState;
//    }
//    /**
//     * STB 이전 파워 상태 요청
//     * @description 0 : 전원 OFF 모드 (본 규격에서는 리부팅 동작을 위해 사용된다.)
//     * @description 1 : 일반 동작 모드
//     * @description 2 : 리모컨 수신, 전면 패널 버튼 처리, 하드웨어 타 이머만 동작하는 대기 모드
//     * @description 3 : 비디오/오디오 출력만 차단하고, 어플리케이션이 모두 동작하는 대기 모드
//     * @description 4 : Passive standby 와 동일하나, passive standby 모 드에서 빠져 나올 때 어플리케이션 동작 상태를 빠르게 복구할 수 있는 모드
//     * @returns {int} POWER_STATE
//     */
//    this.getPreviousPowerState = function () {
//        if (ISWEB) return;
//        else return oipfObjectFactory.createConfigurationObject().localSystem.previousPowerState;
//    }
//    /**
//     * 어플리케이션이 사용할 키 셋을 미들웨어에 요청
//     * @param {int} value 어플리케이션이 필요로 하는 키 셋
//     * @param {int[]} otherKeys Value argument에 Keyset.OTHER 가 포함된 경우, OTHER set 에 해당하는 키 중 어플리케이션이 필요로 하는 키를 지정한다.
//     * @example KTPlatform.setKey(KTPlatform.getKeySet().otherKeys, [37, 39]);
//     */
//    this.setKey = function (value, otherKeys) {
//        if (ISWEB) return;
//        KTPlatform.getKeySet().setValue(value, otherKeys);
//    };
//    /**
//     * oipfObjectFactory의 keyset object
//     * @returns {object} keyset object
//     * @example KTPlatform.getKeySet().otherKeys;
//     * @example KTPlatform.getKeySet().maximumOtherKeys;
//     * @example KTPlatform.getKeySet().maximumValue;
//     */
//    this.getKeySet = function () {
//        if (ISWEB) return;
//        return oipfObjectFactory.createApplicationManagerObject().getOwnerApplication().privateData.keyset;
//    };
//
//    /**
//     * 성인 인증 비밀번호 체크
//     * @param {int} inputPwd 입력한 비밀 번호
//     * @returns {Boolean} 비밀번호 체크 결과
//     */
//    this.checkParentalControlPin = function (inputPwd) {
//        try {
//            var result = false;
//            if (DMC_LIVE && !ISWEB) {
//                result = oipfObjectFactory.createParentalControlManagerObject().verifyParentalControlPIN(inputPwd.toString());
//                HLog.info("PINResult >>>>>>>>>>>>>>>>>>>>" + result);
//            } else {
//                result = (inputPwd.toString() == KTPlatform.DEFAULT_PWD);
//                HLog.info("PINResult >>>>>>>>>>>>>>>>>>>>" + result);
//            }
//            return result;
//        } catch (e) {
//            HLog.err("[HMF] checkPurchasePin FAIL", e);
//        } finally {
//            result = null;
//        }
//    };
//
//    /**
//     * 구매 비밀번호 체크
//     * @param {int} inputPwd 입력한 비밀 번호
//     * @param {function} callback 비밀번호 체크 결과를 리턴 받을 콜백 함수
//     * @returns {Boolean}
//     */
//    this.checkPurchasePin = function (inputPwd, callback) {
//        if (!callback) {
//            HLog.err("checkPurchasePin Error - callback is undefined");
//            callback({isError : true});
//            return;
//        }
//        if (!ISWEB) {
//            var checkPIN = function () {
//                //핀 이원화
//                var HDSToken, STBToken, reuslt;
//                var randomNum = HTool.leadingZero(Math.floor(Math.random() * 1000000), 6);
//                try {
//                    var sendString = "Said=" + KTPlatform.getSaid();
//                    sendString += "&PinNo=" + SSO.PIN;
//                    sendString += "&NONCE=" + randomNum;
//
//                    $.ajax({
//                        url: "https://svcm.homen.co.kr/HDSIMNPWebSVC/HDSIMNPWebSVC.asmx/GetHDSToken?" + sendString,
//                        type: 'GET',
//                        success: function (token) {
//                            console.log(sendString);
//                            var tokenStr = $(token).find('string').text();
//                            console.log(tokenStr);
//                            if (tokenStr.split('^')[1].split('|')[0].toLowerCase() != "true") {
//                                console.error(tokenStr);
//                                callback({isError:true});
//                                return;
//                            }
//                            HDSToken = tokenStr.split('^')[2];
//                            var keyValue = randomNum + SSO.PIN + '              ';
//                            var key = CryptoJS.enc.Utf8.parse(keyValue);
//                            var iv = CryptoJS.enc.Utf8.parse(keyValue.substring(0, 8));
//                            STBToken = CryptoJS.TripleDES.encrypt(SSO.SSID + "|" + KTPlatform.getMacAddress().replace(/\-/g, ''), key, {
//                                iv: iv,
//                                mode: CryptoJS.mode.CBC,
//                                padding: CryptoJS.pad.Pkcs7
//                            });
//							
//                            sendString = "Calltype=authbuypin";
//                            sendString += "&input1=" + SSO.SSID;
//                            sendString += "&input2=" + inputPwd;
//                            sendString += "&input3=Reserved";
//                            sendString += "&HDSToken=" + HDSToken;
//                            sendString += "&STBToken=" + STBToken.ciphertext;
//                            $.ajax({
//                                url: "https://svcm.homen.co.kr/HDSIMNPWebSVC/HDSIMNPWebSVC.asmx/HDSDBLogon?" + sendString,
//                                type: 'GET',
//                                success: function (res) {
//                                    console.log(sendString);
//                                    sendString = null;
//                                    tokenStr = $(res).find('string').text();
//                                    console.log(tokenStr.split('^')[2]);
//                                    if (tokenStr.split('^')[1].split('|')[0].toLowerCase() != "true") callback({isError:false, result:false});
//                                    else callback({isError:false, result:true});
//                                },
//                                error: function(data) {
//                                    console.error(data);
//                                    callback({isError:true});
//                                }
//                            });
//                        },
//                        error: function(data) {
//                            console.error(data);
//                            callback({isError:true});
//                        }
//                    });
//                } catch (e) {
//                    console.error(e);
//                    callback({isError:true});
//                }
//            };
//			
//            if (SSO.isLogon) checkPIN();
//            else SSO.logon(function (result) {
//                if (result == true) {
//                    checkPIN();
//                } else {
//                    HLog.err("checkPurchasePin Error - please sso logon");
//                    callback({isError:true});
//                    return;
//                }
//            });
//        } else {
//            callback({isError:false, result:inputPwd.toString() == KTPlatform.DEFAULT_PWD});
//        }
//    };
//
//    /**
//     * 어플리케이션 종료
//     * @deprecated 어플리케이션을 종료한다.
//     * @deprecated 이 경우 ApplicationDestroyRequest 리스너는 호출 되지 않는다.
//     */
//    this.destroyApplication = function () {
//        try {
//            oipfObjectFactory.createApplicationManagerObject().getOwnerApplication().destroyApplication();
//            HLog.err("destroyApplication SUCCESS");
//        } catch (e) {
//            HLog.err("destroyApplication FAIL", e);
//        }
//    };
//
//    /**
//     * HMF로 등록 또는 해제 가능한 이벤트 리스너 목록을 리턴한다.
//     * @returns {StringArray} 이벤트 리스너 목록
//     */
//    this.showEventListenerList = function () {
//        console.info("-- EventListenerList -----------------");
//        var ListenerList = [];
//        ListenerList.push("ApplicationDestroyRequest");
//        console.info("ApplicationDestroyRequest : 어플리케이션 외부의 동작에 의해 어플리케이션 종료가 요청되는 경우, 기 설정된 이벤트 핸들러가 호출된다.");
//        ListenerList.push("LowMemory");
//        console.info("LowMemory : 어플리케이션에서 사용할 수 있는 유휴 메모리 영역이 제한값에 도달할 경우, 기 설정된 이벤트 핸들러가 호출된다.");
//        console.info("--------------------------------------");
//        return ListenerList;
//    };
//
//    /**
//     * 이벤트 리스너 등록
//     * @param {string} eventName 리스너를 등록할 이벤트 네임 ex) "ApplicationDestroyRequest"
//     * @param {function} func 리스너로 등록할 함수
//     * @example KTPlatform.addEventListener("ApplicationDestroyRequest", function(){});
//     */
//    this.addEventListener = function (eventName, func) {
//        if (ISWEB) return;
//        try {
//            switch (eventName) {
//                case "ApplicationDestroyRequest":
//                    oipfObjectFactory.createApplicationManagerObject().getOwnerApplication().onApplicationDestroyRequest = func;
//                    break;
//                case "LowMemory":
//                    oipfObjectFactory.createApplicationManagerObject().applicationManager.onLowMemory = func;
//                    break;
//            }
//        } catch (e) {
//            HLog.err("addEventListener ERROR - " + eventName, e);
//        }
//    };
//
//    /**
//     * 이벤트 리스너 등록 해제
//     * @param {string} eventName 리스너를 해제할 이벤트 네임
//     * @example KTPlatform.removeEventListener("ApplicationDestroyRequest");
//     */
//    this.removeEventListener = function (eventName) {
//        try {
//            switch (eventName) {
//                case "ApplicationDestroyRequest":
//                    oipfObjectFactory.createApplicationManagerObject().getOwnerApplication().onApplicationDestroyRequest = null;
//                    break;
//                case "LowMemory":
//                    oipfObjectFactory.createApplicationManagerObject().applicationManager.onLowMemory = null;
//                    break;
//            }
//        } catch (e) {
//            HLog.err("removeEventListener ERROR - " + eventName, e);
//        }
//    };
//};