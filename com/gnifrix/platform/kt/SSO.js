///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
//var SSO = new function() {
//    this.SERVICE_ID = "";
//    this.SSID = "";
//    this.PIN = "";
//    this.UserAuthInfo = "";
//    this.isLogon = false;
//
//    /**
//     * SSO LOGON
//     * @param {function} handler 로그인 결과를 리턴 받을 콜백 함수
//     */
//    this.logon = function(handler) {
//        var sso = oipfObjectFactory.createSSOClient();
//        sso.addUserLogonEventListener(function(data) {
//            SSO.SSID = sso.getSAID();
//            SSO.PIN = sso.getPINNumber();
//            SSO.UserAuthInfo = data.result;
//            SSO.isLogon = data.success;
//            if (handler) handler(data.success);
//        });
//        sso.terminalLogon(SSO.SERVICE_ID);
//    };
//};
