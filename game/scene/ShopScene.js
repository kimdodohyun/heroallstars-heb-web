// Strict Mode On (엄격모드)
"use strict";
"use warning";

var ShopScene = new function() {
	var INSTANCE = this;

	var iframe;
    
    var bar_summonstone_normal;
    var bar_summonstone_special;
    var btn_empty_off;
    var btn_empty_on;
    
    var btn_gem_off;
    var btn_gem_on;
    var btn_gold_off;
    var btn_gold_on;
    
    var inapp_list;
    
    var title;
    
    var gem;
    var gold;
    var key;
    var stone;
    var packages;
    var list_box;
    var tag_event;
    var sale_line;
    
    var tab_gem_off;
    var tab_gem_on;
    var tab_gold_off;
    var tab_gold_on;
    var tab_key_off;
    var tab_key_on;
    var tab_stone_off;
    var tab_stone_on;
    var tab_package_off;
    var tab_package_on;
    
    var btn_off;
    var btn_on;
    var btn_str = ["btn_back_", "btn_hero_", "btn_summon_", "btn_battle_", "btn_inapp_"];
    var sale_str = ["70%", "70%", "80%", "70%", "80%"];
    var sale = "Sale";
    var salePrice = [200, 400, 1000, 1300, 5000];
    var packageName = ["초보자패키지", "소환패키지", "강화패키지", "일반 패키지", "고급 패키지"];
    var packageCode = ["NEWBIE_PACKAGE", "SUMMON_PACKAGE", "UPGRADE_PACKAGE", "NORMAL_PACKAGE", "HIGH_PACKAGE"];
    var packageCodeAmount = [[60, 65000, 20], [15, 20, 40000], [200, 200, 200, 100000], [100, 100000, 50, 25, 100, 100, 100], [150, 300000, 100, 100, 500, 500, 500]];
    
    var gemAmount = [30, 63, 97, 137, 188];
    var goldAmount = [5000, 11000, 22000, 50000, 99000];
    var stoneAmount = [1, 5, 1, 5, 10];
    var keyAmount = [5, 11, 33, 60, 130];
    var packageAmount = [["열쇠 60", "금화 65,000", "일반소환석 20"], ["고급소환석 15", "일반소환석 20", "금화 40,000"], ["강화스톤 200", "금화 100,000"], ["열쇠 100", "금화 100,000", "일반소환석 50", "고급소환석 25", "모든강화석 100"], ["열쇠 150", "금화 300,000", "일반소환석 100", "고급소환석 100", "모든강화석 500"]];
    
    var gemPrice = [3000, 6000, 9000, 12000, 15000];
    var goldPrice = [5, 10, 20, 45, 90];
    var stonePrice = [3000, 12000, 20, 100, 180];
    var keyPrice = [5, 10, 30, 50, 100];
    var packagePrice = [60, 120, 200, 390, 1000];
    
    var frameCnt;
    var isKeyLock;
    var focusX, focusY;
    var tabIdx;
    
    this.load = function(onload) {
        var onloadCnt = 0;
        var checkOnload = function () {
            onloadCnt++;
            if (onloadCnt == 3) {
                onload();
            }
        };
        
        setResource(checkOnload);
        POPUP.POP_PURCHASE.getInstance().setResource(checkOnload);
        POPUP.POP_INPUTPASSWORD.getInstance().setResource(checkOnload);
    };
    
    var setResource = function(onload) {
      
        gem = [];
        gold = [];
        key = [];
        stone = [];
        packages = [];
        btn_off = [];
        btn_on = [];
        
        var imgParam = [
            [iframe = new Image(), ROOT_IFRAME + "back" + EXT_IFRAME],
            [bar_summonstone_normal = new Image(), ROOT_IMG + "shop/bar_summonstone_normal" + EXT_PNG],
            [bar_summonstone_special = new Image(), ROOT_IMG + "shop/bar_summonstone_special" + EXT_PNG],
            [btn_empty_off = new Image(), ROOT_IMG + "shop/btn_off" + EXT_PNG],
            [btn_empty_on = new Image(), ROOT_IMG + "shop/btn_on" + EXT_PNG],
            [btn_gem_off = new Image(), ROOT_IMG + "popup/purchase/btn_gem_off" + EXT_PNG],
            [btn_gem_on = new Image(), ROOT_IMG + "popup/purchase/btn_gem_on" + EXT_PNG],
            [btn_gold_off = new Image(), ROOT_IMG + "popup/purchase/btn_gold_off" + EXT_PNG],
            [btn_gold_on = new Image(), ROOT_IMG + "popup/purchase/btn_gold_on" + EXT_PNG],
            [title = new Image(), ROOT_IMG + "etc/title_shop" + EXT_PNG],
            [gem = [], HTool.getURLs(ROOT_IMG, "shop/gem_", EXT_PNG, 5)],
            [gold = [], HTool.getURLs(ROOT_IMG, "shop/gold_", EXT_PNG, 5)],
            [key = [], HTool.getURLs(ROOT_IMG, "shop/key_", EXT_PNG, 5)],
            [stone = [], HTool.getURLs(ROOT_IMG, "shop/stone_", EXT_PNG, 5)],
            [packages = [], HTool.getURLs(ROOT_IMG, "shop/package_", EXT_PNG, 5)],
            [list_box = new Image(), ROOT_IMG + "shop/list_box" + EXT_PNG],
            [tag_event = new Image(), ROOT_IMG + "shop/tag_event" + EXT_PNG],
            [sale_line = new Image(), ROOT_IMG + "shop/sale_line" + EXT_PNG],
            [tab_gem_off = new Image(), ROOT_IMG + "shop/tab_gem_off" + EXT_PNG],
            [tab_gem_on = new Image(), ROOT_IMG + "shop/tab_gem_on" + EXT_PNG],
            [tab_gold_off = new Image(), ROOT_IMG + "shop/tab_gold_off" + EXT_PNG],
            [tab_gold_on = new Image(), ROOT_IMG + "shop/tab_gold_on" + EXT_PNG],
            [tab_key_off = new Image(), ROOT_IMG + "shop/tab_key_off" + EXT_PNG],
            [tab_key_on = new Image(), ROOT_IMG + "shop/tab_key_on" + EXT_PNG],
            [tab_stone_off = new Image(), ROOT_IMG + "shop/tab_stone_off" + EXT_PNG],
            [tab_stone_on = new Image(), ROOT_IMG + "shop/tab_stone_on" + EXT_PNG],
            [tab_package_off = new Image(), ROOT_IMG + "shop/tab_package_off" + EXT_PNG],
            [tab_package_on = new Image(), ROOT_IMG + "shop/tab_package_on" + EXT_PNG],
            [inapp_list = new Image(), ROOT_IMG + "shop/inapp_list" + EXT_PNG]
        ];
        
        for (var i = 0; i < btn_str.length; i++) {
            imgParam.push([btn_off[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "off" + EXT_PNG]);
            imgParam.push([btn_on[i] = new Image(), ROOT_IMG + "etc/" + btn_str[i] + "on" + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("ShopScene setResource Fail!!!!", this);
        });
    };
    
    
    var product_render = function(g) {
        
        g.setColor(COLOR_WHITE);
        
        for (var i = 0; i < 5; i++) {
            g.drawImage(list_box, 45 + (i * 238), 182);
            switch (tabIdx) {
                case 0:
                    g.drawImage(btn_gem_off, 85 + (i * 238), 484);
                    g.drawImage(packages[i], 86 + (i * 238), 241);

                    g.setColor(COLOR_WHITE);
                    g.setFont(FONT_24);
                    HTextRender.oriRender(g, packageName[i], 164 + (i * 238), 224, HTextRender.CENTER);

                    g.setFont(FONT_15);
                    for (var j = 0; j < packageAmount[i].length; j++) {
                        
                        switch (i) {
                            case 0:
                            case 1:
                                HTextRender.oriRender(g, packageAmount[i][j], 164 + (i * 238), 423 + (j * 16), HTextRender.CENTER);
                                break;
                                
                            case 2:
                                HTextRender.oriRender(g, packageAmount[i][j], 164 + (i * 238), 431 + (j * 16), HTextRender.CENTER);
                                break;
                                
                            case 3:
                            case 4:
                                HTextRender.oriRender(g, packageAmount[i][j], 164 + (i * 238), 404 + (j * 16), HTextRender.CENTER);
                                break;
                        }
                    }

                    g.setFont(FONT_22);
                    g.setColor(COLOR_RED);
                    HTextRender.oriRender(g, sale_str[i], 85 + (i * 238), 253, HTextRender.CENTER);
                    HTextRender.oriRender(g, sale, 85 + (i * 238), 275, HTextRender.CENTER);
                    break;

                case 1:
                    g.drawImage(btn_empty_off, 85 + (i * 238), 484);
                    g.drawImage(gem[i], 86 + (i * 238), 241);
                    g.setFont(FONT_30);
                    HTextRender.oriRender(g, ItemManager.getCashProducts()[i].getChargeAmount(), 164 + (i * 238), 431, HTextRender.CENTER);
                    break;

                case 2:
                    g.drawImage(btn_gem_off, 85 + (i * 238), 484);
                    g.drawImage(gold[i], 86 + (i * 238), 241);
                    g.setFont(FONT_30);
                    HTextRender.oriRender(g, YUtil.format(goldAmount[i]), 164 + (i * 238), 431, HTextRender.CENTER);
                    break;

                case 3:
                    if (i < 2) {
                        g.drawImage(btn_gold_off, 85 + (i * 238), 484);
                    } else {
                        g.drawImage(btn_gem_off, 85 + (i * 238), 484);
                    }
                    g.drawImage(stone[i], 86 + (i * 238), 241);
                    g.setFont(FONT_30);
                    HTextRender.oriRender(g, stoneAmount[i], 164 + (i * 238), 431, HTextRender.CENTER);
                    break;
                    
                case 4:
                    g.drawImage(btn_gem_off, 85 + (i * 238), 484);
                    g.drawImage(key[i], 86 + (i * 238), 241);
                    g.setFont(FONT_30);
                    HTextRender.oriRender(g, keyAmount[i], 164 + (i * 238), 431, HTextRender.CENTER);
                    break;

                default:
                    break;
            }
        }
    };
    
    var enterKeyActionForProduct = function() {
        switch (tabIdx) {
            case 0:
                isKeyLock = true;
                enterKeyActionForPackage();
                break;
                
            case 1:
                isKeyLock = true;
                enterKeyActionForGem();
                break;
                
            case 2:
                isKeyLock = true;
                enterKeyActionForGold();
                break;
                
            case 3:
                isKeyLock = true;
                enterKeyActionForStone();
                break;
                
            case 4:
                isKeyLock = true;
                enterKeyActionForKey();
                break;
        }
    };
    
    var enterKeyActionForMenu = function() {
        
        switch (focusX) {
            case 0:
                appMgr.changeLayer(SCENE.SC_TITLE, false, "back");
                break;
                
            case 1:
                appMgr.changeLayer(SCENE.SC_INVEN, false, "back");
                break;
                
            case 2:
                appMgr.changeLayer(SCENE.SC_SUMMON, false, "back");
                break;
                
            case 3:
                appMgr.changeLayer(SCENE.SC_WORLD, false, "back");
                break;

            case 4:
                console.error("isOnPopup >> " + isOnPopup);
                document.getElementById("onPop").src="http://61.251.167.74/btv/inappinfo/index.html?stbId=" + sPriId 
                + "&userKey=" + GF_NET.userKey 
                + "&svcaId=" + GF_NET.svcaId
                + "&userId=" + sUserName;
                document.getElementById("onPop").style.visibility = "visible";
                isOnPopup = true;
                return;
        }
    };

    function converToLocalTime() {
        var d = new Date(); 
        return d.getFullYear() + _pad((1 + d.getMonth()), "2") + _pad(d.getDate(), "2") + d.getHours() + _pad(d.getMinutes(), "2") + d.getSeconds(); // +"."+ d.getMilliseconds();       
    }

    function _pad(n, width) {
        n = n + ''; 
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; 
    }

    var checkcPurchaseStatus = function(productId) {
        var reqHeader = {
            Client_ID: "{"+sPriId+"}",
            Client_IP: navigator.ipAddress,
            TimeStamp: converToLocalTime(),
            Auth_Val: sDpsToken, //"tyJ5tYalSzzR/YAUXeJwAx0sSxtnevrd7DxqmjiBarc=",
            Api_Key: "l7xx851d12cc66dc4d2e86a461fb5a530f4a",
            Trace: "IPTV",
            Accept: "application/json; charset=utf-8"
        };
        var strHeader = JSON.stringify(reqHeader);

        var reqUrl = "https://agw.sk-iptv.com:8443/eps/v5/payment/check/" + productId;

        var reqParam = "if=IF-EPS-021&"
        + "ver=5.0&"
        + "ui_name=HEBEPS&"
        + "client_name=HEBEPS&"
        + "response_format=json&"
        + "stb_id=" + encodeURIComponent("{" + sPriId + "}") + "&"
        + "mac=" + encodeURIComponent(sHostMac);

        commonGameApiGet(strHeader, reqUrl, reqParam);
    };

    var getPhoneAuth = function(amount, productId) {

        var reqUrl = "http://61.252.137.148/commongame-api/btv/replace/action/";
        var preKey = "SK";
        var iv = "1161266980123456";
        var requestDateTime = converToLocalTime();
        var keyUTF = CryptoJS.enc.Utf8.parse(preKey + requestDateTime);
        var ivUTF = CryptoJS.enc.Utf8.parse(iv);

        var reqHeader = {
            Client_ID: "{"+sPriId+"}",
            Client_IP: navigator.ipAddress,
            TimeStamp: converToLocalTime(),
            Auth_Val: "tyJ5tYalSzzR/YAUXeJwAx0sSxtnevrd7DxqmjiBarc=",
            Api_Key: "l7xx851d12cc66dc4d2e86a461fb5a530f4a",
            Trace: "IPTV",
            Accept: "application/json;charset=utf-8"
        };

        var reqPhone = {
            corpCode: "KTF",
            registNumber: "8809161",
            phoneNumber: "01047838816",
            amount: amount
        };

        var strPhone = JSON.stringify(reqPhone);
        var aesPhone = CryptoJS.AES.encrypt(strPhone, keyUTF, {iv: ivUTF}).toString();

        var reqBody = {
            if: "IF-EPS-105",
            ver: "5.0",
            ui_name: "HEBEPS",
            client_name: "HEBEPS",
            response_format: "json",
            stb_id: "{"+sPriId+"}",
            mac: sHostMac,
            productId: productId,
            requestDateTime: requestDateTime,
            phoneData: aesPhone
        }

        var strHeader = JSON.stringify(reqHeader);
        var strBody = JSON.stringify(reqBody);

        commonGameApiPost(strHeader, reqUrl, strBody);
    }

    var purchaseProduct = function(authNumber) {

    }

    var commonGameApiGet = function(reqHeader, reqUrl, reqParam) {
        $.ajax({
            type: "GET",
            url: "http://61.252.137.148/commongame-api/btv/replace/header/" + encodeURIComponent(btoa(reqHeader))
            + "/url/" + encodeURIComponent(btoa(reqUrl))
            + "/param/" + encodeURIComponent(btoa(reqParam)),
            contentType: "application/json; charset=utf-8",
            success: function(resData) {
                console.error("commonGameApi success >> " + JSON.stringify(resData));
            },
            error: function(err) {
                console.error("commonGameApi error >> " + JSON.stringify(err));
            }
        });
    }

    var commonGameApiPost = function(reqHeader, reqUrl, reqBody) {
        $.ajax({
            type: "POST",
            url: reqUrl,
            data: JSON.stringify({
                urlPath: "https://agw.sk-iptv.com:8443/eps/v5/payment/phone/auth?method=POST",
                header: reqHeader,
                body: reqBody
            }),
            contentType: "application/json;charset=utf-8",
            success: function(resData) {
                console.error("commonGameApiPost success >> " + JSON.stringify(resData));
            },
            error: function(err) {
                console.error("commonGameApiPost error >> " + JSON.stringify(err));
            }
        })
    }





    
    var enterKeyActionForGem = function() {
        var cashProduct = ItemManager.getCashProducts()[focusX];
        var code = "GEM";
        var amount = cashProduct.getChargeAmount();
        var price = cashProduct.getAmount();
        var productCode = cashProduct.getMainCode();

        if (ItemManager.itemFullCheck(code, Number(amount))) {
            isKeyLock = false;
            PopupMgr.openPopup(appMgr.getMessage1BtnPopup("보유 보석이 가득차서 구매할 수 없습니다."));
            return;
        }

        // step 1. 신용카드 또는 휴대폰 결제 선택
        // step 2. 휴대폰 결제시 통신사, 휴대폰번호, 생년월일 + 주민번호 앞자리 입력 받기

        // checkcPurchaseStatus(productCode);
        getPhoneAuth(price, productCode);
        // purchaseProduct(authNumber);

        // step 3. 휴대폰 인증번호 받고 입력하기
        // step 4. 결제 프로세스 진행
        
        // isKeyLock = false;
        // POPUP.POP_INPUTPASSWORD.getInstance().setProduct(ItemManager.getCashProducts()[focusX].getProdCode(), amount, ItemManager.getCashProducts()[focusX].getAmount());
        // PopupMgr.openPopup(POPUP.POP_INPUTPASSWORD);
    };
    
    var enterKeyActionForGold = function() {
        
        var code = "GOLD_";
        var checkCode = "GOLD";
        var price = goldPrice[focusX];
        
        code = "GOLD_" + focusX;
        
        if (lackCheck("GEM", price)) {
            return;
        }
        
        if (ItemManager.itemFullCheck(checkCode, Number(goldAmount[focusX]))) {
            isKeyLock = false;
            PopupMgr.openPopup(appMgr.getMessage1BtnPopup("보유 골드가 가득차서 구매할 수 없습니다."));
            return;
        }
        
        POPUP.POP_PURCHASE.getInstance().setProduct(gold[focusX], goldPrice[focusX], goldAmount[focusX], 0);
        PopupMgr.openPopup(POPUP.POP_PURCHASE, function(kode, data) {
            if (data == ("0")) {
                PopupMgr.openPopup(POPUP.POP_WAITING);
                NetManager.Req_ItemPurchase(code, 0, function(response) {
                    console.error(response);
                    PopupMgr.closeAllPopup();
                    isKeyLock = false;
                    if (NetManager.isSuccess(response)) {
                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("아이템을 구매하였습니다."), null, 1500);
                    } else {
                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                    }
                });
            } else {
                isKeyLock = false;
                PopupMgr.closePopup(POPUP.POP_PURCHASE);
            }
        });
    };
    
    var enterKeyActionForKey = function() {
        
        var code = "ENTRANCE_KEY";
        var checkCode = "ENTRANCE_KEY";
        var price = keyPrice[focusX];
        
        code = "ENTRANCE_KEY_" + focusX;
        
        if (lackCheck("GEM", price)) {
            return;
        }
        
        if (ItemManager.itemFullCheck(checkCode, Number(keyAmount[focusX]))) {
            isKeyLock = false;
            PopupMgr.openPopup(appMgr.getMessage1BtnPopup("보유 입장권이 가득차서 구매할 수 없습니다."));
            return;
        }
        
        POPUP.POP_PURCHASE.getInstance().setProduct(key[focusX], keyPrice[focusX], keyAmount[focusX], 0);
        PopupMgr.openPopup(POPUP.POP_PURCHASE, function(kode, data) {
            if (data == ("0")) {
                PopupMgr.openPopup(POPUP.POP_WAITING);
                NetManager.Req_ItemPurchase(code, 0, function(response) {
                    console.error(response);
                    PopupMgr.closeAllPopup();
                    isKeyLock = false;
                    if (NetManager.isSuccess(response)) {
                        TokenManager.update();
                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("아이템을 구매하였습니다."), null, 1500);
                    } else {
                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                    }
                });
            } else {
                isKeyLock = false;
                PopupMgr.closePopup(POPUP.POP_PURCHASE);
            }
        });
    };
    
    var enterKeyActionForPackage = function() {
        
        var code = packageCode[focusX];
        var price = packagePrice[focusX];
//        var checkCode = [];
//        
//        switch (focusX) {
//            case 0:
//                checkCode.push("ENTRANCE_KEY");
//                checkCode.push("GOLD");
//                checkCode.push("MAGIC_STONE");
//                break;
//            case 1:
//                checkCode.push("HYPER_STONE");
//                checkCode.push("MAGIC_STONE");
//                checkCode.push("GOLD");
//                break;
//            case 2:
//                checkCode.push("BLACK_STONE");
//                checkCode.push("BLUE_STONE");
//                checkCode.push("RED_STONE");
//                checkCode.push("GOLD");
//                break;
//        }
        
        if (lackCheck("GEM", price)) {
            return;
        }
        
//        for (var i = 0; i < checkCode.length; i++) {
//            if (ItemManager.itemFullCheck(checkCode[i], Number(packageCodeAmount[focusX][i]))) {
//                isKeyLock = false;
//                PopupMgr.openPopup(appMgr.getMessage1BtnPopup("아이템이 가득차서 구매할 수 없습니다."));
//                return;
//            }
//        }
        
        POPUP.POP_PURCHASE.getInstance().setProduct(packages[focusX], packagePrice[focusX], packageAmount[focusX], 0);
        PopupMgr.openPopup(POPUP.POP_PURCHASE, function(kode, data) {
            if (data == ("0")) {
                PopupMgr.openPopup(POPUP.POP_WAITING);
                NetManager.Req_PackageRewardGive(code, function(response) {
                    console.error(response);
                    PopupMgr.closeAllPopup();
                    isKeyLock = false;
                    if (NetManager.isSuccess(response)) {
                        TokenManager.update();
                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("아이템을 구매하였습니다."), null, 1500);
                    } else {
                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                    }
                });
            } else {
                isKeyLock = false;
                PopupMgr.closePopup(POPUP.POP_PURCHASE);
            }
        });
    };
    
    var enterKeyActionForStone = function() {
        
        var code;
        var price;
        var type;
        var checkCode;
        
        switch (focusX) {
            case 0:
                code = "MAGIC_STONE_0";
                checkCode = "MAGIC_STONE";
                price = 3000;
                type = 1;
                if (lackCheck("GOLD", price)) {
                    return;
                }
                break;
            case 1:
                code = "MAGIC_STONE_1";
                checkCode = "MAGIC_STONE";
                price = 12000;
                type = 1;
                if (lackCheck("GOLD", price)) {
                    return;
                }
                break;
            case 2:
                code = "HYPER_STONE_0";
                checkCode = "HYPER_STONE";
                price = 20;
                type = 0;
                if (lackCheck("GEM", price)) {
                    return;
                }
                break;
            case 3:
                code = "HYPER_STONE_1";
                checkCode = "HYPER_STONE";
                price = 100;
                type = 0;
                if (lackCheck("GEM", price)) {
                    return;
                }
                break;
            case 4:
                code = "HYPER_STONE_2";
                checkCode = "HYPER_STONE";
                price = 180;
                type = 0;
                if (lackCheck("GEM", price)) {
                    return;
                }
                break;
        }
        
        if (ItemManager.itemFullCheck(checkCode, Number(stoneAmount[focusX]))) {
            isKeyLock = false;
            PopupMgr.openPopup(appMgr.getMessage1BtnPopup("보유 스톤이 가득차서 구매할 수 없습니다."));
            return;
        }
        
        POPUP.POP_PURCHASE.getInstance().setProduct(stone[focusX], stonePrice[focusX], stoneAmount[focusX], type);
        PopupMgr.openPopup(POPUP.POP_PURCHASE, function(kode, data) {
            if (data == ("0")) {
                PopupMgr.openPopup(POPUP.POP_WAITING);
                NetManager.Req_ItemPurchase(code, 0, function(response) {
                    console.error(response);
                    PopupMgr.closeAllPopup();
                    isKeyLock = false;
                    if (NetManager.isSuccess(response)) {
                        QuestManager.questUpdt(5, function() {
                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup("아이템을 구매하였습니다."), null, 1500);
                        });
                    } else {
                        appMgr.openDisconnectPopup("Netmanager Fail", this);
                    }
                });
            } else {
                isKeyLock = false;
                PopupMgr.closePopup(POPUP.POP_PURCHASE);
                
            }
        });
    };
    
    var lackCheck = function(_code, _price) {
        
        var str;
        var code = _code;
        var remainAmount;
        
        if (code == "GOLD") {
            remainAmount = ItemManager.checkPrice(code, _price);
            str = "골드가";
        } else if (code == "GEM") {
            remainAmount = ItemManager.checkPrice(code, _price);
            str = "보석이";
        }
        
        if (remainAmount < 0) {
            PopupMgr.openPopup(appMgr.getMessage2BtnPopup(str + " 부족합니다.|충전하러 이동 하시겠습니까?"), function (code, data) {
                
                isKeyLock = false;
                
                if (data == ("0")) {
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                    if (_code == "GOLD") {
                        tabIdx = 2;
                    } else if (_code == "GEM") {
                        tabIdx = 1;
                    }
                } else {
                    PopupMgr.closePopup(POPUP.POP_MSG_2BTN);
                }
            });
            return true;
        }
        
        return false;
    };
    
	return {
		toString: function() {
			return "ShopScene";
		},
		init: function(onload) {
            isKeyLock = false;
            frameCnt = 0;
            focusX = 0;
            focusY = 0;
            tabIdx = 0;
            
            onload();
		},
		start: function() {
            appMgr.loopNetSound(ROOT_SOUND + "title" + EXT_MP3);
		},
		run: function() {
            frameCnt++;
            UIMgr.repaint();
		},
		paint: function() {
			g.drawImage(iframe, 0, 0);
            g.drawImage(title, 0, 0);
            
            g.drawImage(tab_package_off, 45, 106);
            g.drawImage(tab_gem_off, 203, 106);
            g.drawImage(tab_gold_off, 361, 106);
            g.drawImage(tab_stone_off, 519, 106);
            g.drawImage(tab_key_off, 677, 106);
            
            g.drawImage(bar_summonstone_normal, 955, 99);
            g.drawImage(bar_summonstone_special, 1097, 99);
            
            g.setFont(FONT_20);
            g.setColor(COLOR_WHITE);
            HTextRender.oriRender(g, itemMgr.getMagicStoneAmount(), 1045, 156, HTextRender.CENTER);
            HTextRender.oriRender(g, itemMgr.getHyperStoneAmount(), 1187, 156, HTextRender.CENTER);
            
            product_render(g);
            
            for (var i = 0; i < btn_off.length; i++) {
                g.drawImage(btn_off[i], 45 + (i * 119), 573);
            }
            
            if (focusY == 0) {
                if (Math.floor(frameCnt / 2 % 2) == 0) {
                    switch (tabIdx) {
                        case 0:
                            g.drawImage(tab_package_on, 45, 106);
                            break;
                        case 1:
                            g.drawImage(tab_gem_on, 203, 106);
                            break;
                        case 2:
                            g.drawImage(tab_gold_on, 361, 106);
                            break;
                        case 3:
                            g.drawImage(tab_stone_on, 519, 106);
                            break;
                        case 4:
                            g.drawImage(tab_key_on, 677, 106);
                            break;
                    }
                }
            } else {
                switch (tabIdx) {
                    case 0:
                        g.drawImage(tab_package_on, 45, 106);
                        break;
                    case 1:
                        g.drawImage(tab_gem_on, 203, 106);
                        break;
                    case 2:
                        g.drawImage(tab_gold_on, 361, 106);
                        break;
                    case 3:
                        g.drawImage(tab_stone_on, 519, 106);
                        break;
                    case 4:
                        g.drawImage(tab_key_on, 677, 106);
                        break;
                }
            }
            
            g.drawImage(tag_event, 54, 94);
            
            switch (focusY) {
                case 0:
                    break;
                case 1:
                    
                    switch (tabIdx) {
                        case 0:
                            g.drawImage(btn_gem_on, 85 + (focusX * 238), 484);
                            break;
                            
                        case 1:
                            g.drawImage(btn_empty_on, 85 + (focusX * 238), 484);
                            break;
                            
                        case 2:
                            g.drawImage(btn_gem_on, 85 + (focusX * 238), 484);
                            break;
                            
                        case 3:
                            if (focusX < 2) {
                                g.drawImage(btn_gold_on, 85 + (focusX * 238), 484);
                            } else {
                                g.drawImage(btn_gem_on, 85 + (focusX * 238), 484);
                            }
                            break;
                            
                        case 4:
                            g.drawImage(btn_gem_on, 85 + (focusX * 238), 484);
                            break;
                    }
                    break;
                    
                case 2:
                    g.drawImage(btn_on[focusX], 45 + (focusX * 119), 573);
                    break;
            }
            
            for (var i = 0; i < 5; i++) {
                switch (tabIdx) {
                    case 0:
                        g.setFont(FONT_24);
                        g.setColor(COLOR_WHITE);
                        HTextRender.oriRender(g, YUtil.format(packagePrice[i]), 175 + (i * 238), 534, HTextRender.CENTER);

                        g.setFont(FONT_18);
                        g.setColor(COLOR_RED);
                        HTextRender.oriRender(g, YUtil.format(salePrice[i]), 175 + (i * 238), 508, HTextRender.CENTER);

                        g.drawImage(sale_line, 145 + (i * 238), 502);
                        break;
                    case 1:
                        g.setFont(FONT_24);
                        HTextRender.oriRender(g, YUtil.format(ItemManager.getCashProducts()[i].getAmount() + (ItemManager.getCashProducts()[i].getAmount() / 10)) + "원", 163 + (i * 238), 524, HTextRender.CENTER);
                        break;
                    case 2:
                        g.setFont(FONT_24);
                        HTextRender.oriRender(g, YUtil.format(goldPrice[i]), 175 + (i * 238), 524, HTextRender.CENTER);
                        break;
                    case 3:
                        g.setFont(FONT_24);
                        HTextRender.oriRender(g, YUtil.format(stonePrice[i]), 175 + (i * 238), 524, HTextRender.CENTER);
                        break;
                    case 4:
                        g.setFont(FONT_24);
                        HTextRender.oriRender(g, YUtil.format(keyPrice[i]), 175 + (i * 238), 524, HTextRender.CENTER);
                        break;

                    default:
                        break;
                }
            }
            

            // g.drawImage(inapp_list, 1100, 650);

            CommonUIDrawManager.renderMoney(g);
		},
		stop: function() {
            iframe = null;
            
            POPUP.POP_PURCHASE.getInstance().clear();
            POPUP.POP_INPUTPASSWORD.getInstance().clear();
            
            bar_summonstone_normal = null;
            bar_summonstone_special = null;
            btn_empty_off = null;
            btn_empty_on = null;
            btn_gem_off = null;
            btn_gem_on = null;
            btn_gold_off = null;
            btn_gold_on = null;
            gem = null;
            gold = null;
            key = null;
            stone = null;
            packages = null;
            list_box = null;
            title = null;
            tag_event = null;
            sale_line = null;

            inapp_list = null;

            tab_gem_off = null;
            tab_gem_on = null;
            tab_gold_off = null;
            tab_gold_on = null;
            tab_key_off = null;
            tab_key_on = null;
            tab_stone_off = null;
            tab_stone_on = null;
            tab_package_off = null;
            tab_package_on = null;

            btn_off = null;
            btn_on = null;
		},
		dispose: function() {
            btn_str = null;
            sale_str = null;
            sale = null;
            salePrice = null;
            packageName = null;
            packageCode = null;
            packageCodeAmount = null;
            
            gemAmount = null;
            goldAmount = null;
            stoneAmount = null;
            keyAmount = null;
            packageAmount = null;
    
            gemPrice = null;
            goldPrice = null;
            stonePrice = null;
            keyPrice = null;
            packagePrice = null;
		},
		onKeyPressed: function(key) {
            
            if (isKeyLock) return;

            ////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (isOnPopup) {
                if (key == KEY_ENTER || key == KEY_PREV) {
                    document.getElementById("onPop").src = "";
                    document.getElementById("onPop").style.visibility = "hidden";
                    isOnPopup = false;
                } else {
                    document.getElementById("onPop").contentWindow.postMessage({key: key}, "*");
                }
                return;
            } 
            // else {
            //     if (key == KEY_RED) {
            //         console.error("isOnPopup >> " + isOnPopup);
            //         document.getElementById("onPop").src="http://61.251.167.74/btv/inappinfo/index.html?stbId=" + sPriId 
            //         + "&userKey=" + GF_NET.userKey 
            //         + "&svcaId=" + GF_NET.svcaId
            //         + "&userId=" + sUserName;
            //         document.getElementById("onPop").style.visibility = "visible";
            //         isOnPopup = true;
            //         return;
            //     }
            // }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////

			switch(key) {
                case KEY_PREV:
                case KEY_PC_F4:
                    appMgr.changeLayer(SCENE.SC_TITLE, false, "main");
                    break;
                case KEY_ENTER:
                    
                    switch (focusY) {
                        case 0:
                            break;
                        case 1:
                            enterKeyActionForProduct();
                            break;
                        case 2:
                            enterKeyActionForMenu();
                            break;
                    }
                    
					break;
				case KEY_UP:
                    focusY = HTool.getIndex(focusY, -1, 3);
                    focusX = 0;
					break;
				case KEY_DOWN:
                    focusY = HTool.getIndex(focusY, 1, 3);
                    focusX = 0;
					break;
                case KEY_LEFT:
                    switch (focusY) {
                        case 0:
                            tabIdx = HTool.getIndex(tabIdx, -1, 5);
                            break;
                        case 1:
                            focusX = HTool.getIndex(focusX, -1, 5);
                            break;
                        case 2:
                            focusX = HTool.getIndex(focusX, -1, 5);
                            break;
                    }
                    break;
                case KEY_RIGHT:
                    switch (focusY) {
                        case 0:
                            tabIdx = HTool.getIndex(tabIdx, 1, 5);
                            break;
                        case 1:
                            focusX = HTool.getIndex(focusX, 1, 5);
                            break;
                        case 2:
                            focusX = HTool.getIndex(focusX, 1, 5);
                            break;
                    }
                    break;
			}
            UIMgr.repaint();
		},
		onKeyReleased: function(key) {
			switch(key) {
				case KEY_ENTER:
					break;
			}
		},
		getInstance: function() {
			return INSTANCE;
		}
	};
};