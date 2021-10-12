// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * HMF Setting
 * @description HMF Setting
 * @author Lazuli
 * @since 2015.9.25
 */

function MainframeSetting() {
    // FPS
    FPS = 14;
    SLEEP = 1000 / FPS;

    // 스크린 사이즈
    UIMgr.setSCREEN_SIZE(1280, 720);

    // 오토스크린 기능 On / Off
    // On : 브라우저의 크기에 맞게 화면 사이즈 자동 조절 (Full Screen Mode)
    // Off : 브라우저의 크기와 상관 없이 실제 사이즈 대로 보여짐
    UIMgr.AUTO_SCREEN = true;

    // 오토스크린 On / Off 단축키 : 오토스크린 기능을 실시간으로 On/Off 할 수 있는 키
    UIMgr.AUTO_SCREEN_HOTKEY = KEY_PC_F8;

    // 페인트 반복 호출 On / Off
    // On : run이 실행될 때 자동으로 paint가 함께 호출 됨
    // Off : UIMgr.repaint() 호출 시에만 paint가 호출 됨
    UIMgr.AUTO_REPAINT = false;

    // 로딩바 사용 여부 On / Off
    // 현재 보여지는 캔버스의 상위 캔버스 노출 여부
    UIMgr.HAS_LOADINGBAR = false;
    //
    // 기본 폰트 (setFont or setColor 함수 사용시에만 적용되는 폰트)
    UIMgr.DEFAULT_FONT = "'myFont'";

    // 팝업 활성화 시 알파값
    PopupMgr.POPUP_BACK_COLOR = "rgba(0,0,0,0.50)";

    /* SERVER SETTING */
    // URL 세팅
    URL_SERVICE_LIVE = "61.251.167.74";
    URL_SERVICE_UAT = "61.106.28.37";
    URL_SERVICE_TEST = "61.251.167.91";
    DMC_LIVE = window.location.hostname == URL_SERVICE_LIVE;
	DMC_LIVE = true;
    URL_SERVICE = DMC_LIVE ? URL_SERVICE_LIVE : URL_SERVICE_TEST;

    // IP 획득에 실패 했을 경우 사용할 Default IP 설정 / BTV 포팅시 KT관련 부분 제거
    DEFAULT_IP_ADDRESS = "00.00.00.00";

    // 구매 및 성인 인증 - 테스트용 비밀번호 설정 / BTV 포팅시 KT관련 부분 제거
    DEFAULT_PWD = "0000";

    // 양방향 인증 서비스 ID / BTV 포팅시 KT관련 부분 제거
    SERVICE_ID = "ITVGniMDefense";

    /* APP SETTING */
    GF_NET.appId = "6050";
    GF_NET.svcaId = "204";
    
    // BTV Android Bridge 관련 메소드 호출
    android.getPriId();
    android.getHostMac();
    android.getToken();
    android.getUserId();
}

// BTV Android Bridge 관련 메소드 추가

function Rev_PriId(response) {
    sPriId = response;
    console.error("Rev_PriId >> " + sPriId);
}

function Rev_HostMac(response) {
    sHostMac = response;
    console.error("Rev_HostMac >> " + sHostMac);
}

function Rev_UserName(response) {
    sUserName = response;
    console.error("Rev_UserName >> " + sUserName);
}

function Rev_DpsToken(response) {
    sDpsToken = response;
    console.error("Rev_DpsToken >> " + sDpsToken);
}

function Rev_CheckPurchasePin(response) {
    console.error("Rev_CheckPurchasePin >> " + response);
    BTVPlatform.getPurchaseCallback(response);
//    BTVPlatform.result = response;
}
