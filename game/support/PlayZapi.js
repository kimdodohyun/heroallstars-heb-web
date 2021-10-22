var PlayZapi = new function() {
    var INSTANCE = this;

    var preKey = "SK";
    var iv = "1161266980123456";

    var productName;
    var productCode;
    var prodCode;
    var amount;
    var price;
    var purchasePrice;
    var tax;

    this.setProductInfo = function(_productName, _productCode, _prodCode, _amount, _price) {
        productName = _productName;
        productCode = _productCode;
        prodCode = _prodCode;
        amount = _amount;
        price = _price;
        
        tax = Math.floor(price / 10);
        purchasePrice = price + tax;
    }

    this.getProductName = function() {
        return productName;
    }

    this.getProductCode = function() {
        return productCode;
    }

    this.getProdCode = function() {
        return prodCode;
    }

    this.getAmount = function() {
        return amount;
    }

    this.getPrice = function() {
        return price;
    }

    this.getTax = function() {
        return tax;
    }

    this.getPurchasePrice = function() {
        return purchasePrice;
    }

    this.getPreKey = function() {
        return preKey;
    }

    this.getInitialVector = function() {
        return iv;
    }

    function converToLocalTime() {
        var d = new Date(); 
        return d.getFullYear() + _pad((1 + d.getMonth()), "2") + _pad(d.getDate(), "2") + d.getHours() + _pad(d.getMinutes(), "2") + d.getSeconds(); // +"."+ d.getMilliseconds();       
    }

    function _pad(n, width) {
        n = n + ''; 
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; 
    }

    function getAuthVal(tokenGW, timeStamp) {
        const strTemp = tokenGW + timeStamp;
        const encrypt = CryptoJS.SHA256(strTemp);
        const authVal = CryptoJS.enc.Base64.stringify(encrypt);
        console.error("getAuthVal - " + authVal);
        return authVal;
    };

    this.checkcPurchaseStatus = function(productId, callback, errCallback) {

        var strTimeStamp = converToLocalTime();

        var reqHeader = {
            Client_ID: "{"+sPriId+"}",
            Client_IP: navigator.ipAddress,
            TimeStamp: strTimeStamp,
            Auth_Val: getAuthVal(sDpsToken, strTimeStamp), //"tyJ5tYalSzzR/YAUXeJwAx0sSxtnevrd7DxqmjiBarc=",
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

        commonGameApiGet(strHeader, reqUrl, reqParam, callback, errCallback);
    };

    this.getPhoneAuth = function(amount, productId, corpCode, registNumber, phoneNumber, callback, errCallback) {

        console.error("amount >> " + amount);
        console.error("productId >> " + productId);
        console.error("corpCode >> " + corpCode);
        console.error("registNumber >> " + registNumber);
        console.error("phoneNumber >> " + phoneNumber);
        
        var addUrl = "phone/auth?method=POST";
        var reqUrl = "http://61.252.137.148/commongame-api/btv/replace/action/";
        var preKey = "SK";
        var iv = "1161266980123456";
        var requestDateTime = converToLocalTime();
        var keyUTF = CryptoJS.enc.Utf8.parse(preKey + requestDateTime);
        var ivUTF = CryptoJS.enc.Utf8.parse(iv);

        console.error("preKey >> " + preKey);
        console.error("iv >> " + iv);
        console.error("requestDateTime >> " + requestDateTime);

        console.error("keyUTF >> " + keyUTF);
        console.error("ivUTF >> " + ivUTF);

        var reqHeader = {
            Client_ID: "{"+sPriId+"}",
            Client_IP: navigator.ipAddress,
            TimeStamp: requestDateTime,
            Auth_Val: getAuthVal(sDpsToken, requestDateTime), //"tyJ5tYalSzzR/YAUXeJwAx0sSxtnevrd7DxqmjiBarc=",
            Api_Key: "l7xx851d12cc66dc4d2e86a461fb5a530f4a",
            Trace: "IPTV",
            Accept: "application/json;charset=utf-8"
        };

        var reqPhone = {
            corpCode: corpCode,
            registNumber: registNumber,
            phoneNumber: phoneNumber,
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

        commonGameApiPost(addUrl, strHeader, reqUrl, strBody, callback, errCallback);
    }

    this.purchaseProduct = function(corpCode, registNumber, phoneNumber, amount, phoneData, authNumber, callback, errCallback) {
        var addUrl = "product/" + productCode + "?method=POST";
        var reqUrl = "http://61.252.137.148/commongame-api/btv/replace/action/";
        var preKey = "SK";
        var iv = "1161266980123456";
        var requestDateTime = converToLocalTime();
        var keyUTF = CryptoJS.enc.Utf8.parse(preKey + requestDateTime);
        var ivUTF = CryptoJS.enc.Utf8.parse(iv);

        console.error("Client_ID >> " + sPriId);
        console.error("Client_IP >> " + navigator.ipAddress);
        console.error("TimeStamp >> " + requestDateTime);
        console.error("auth_Val >> " + getAuthVal(sDpsToken, requestDateTime));

        var reqHeader = {
            Client_ID: "{"+sPriId+"}",
            Client_IP: navigator.ipAddress,
            TimeStamp: requestDateTime,
            Auth_Val: getAuthVal(sDpsToken, requestDateTime), //"tyJ5tYalSzzR/YAUXeJwAx0sSxtnevrd7DxqmjiBarc=",
            Api_Key: "l7xx851d12cc66dc4d2e86a461fb5a530f4a",
            Trace: "IPTV",
            Accept: "application/json;charset=utf-8"
        };

        console.error("addUrl >> " + addUrl);
        console.error("corpCode >> " + corpCode);
        console.error("registNumber >> " + registNumber);
        console.error("phoneNumber >> " + phoneNumber);
        console.error("amount >> " + amount);
        console.error("corpTypeCode >> " + phoneData.corpTypeCode);
        console.error("authKey1 >> " + phoneData.authKey1);
        console.error("authKey2 >> " + phoneData.authKey2);
        console.error("authKey3 >> " + phoneData.authKey3);
        console.error("authNumber >> " + authNumber);

        var reqPhone = {
            corpCode: corpCode + "",
            registNumber: registNumber + "",
            phoneNumber: phoneNumber + "",
            amount: amount + "",
            corpTypeCode: phoneData.corpTypeCode + "",
            authKey1: phoneData.authKey1 + "",
            authKey2: phoneData.authKey2 + "",
            authKey3: phoneData.authKey3 + "",
            authNumber: authNumber + ""
        };

        var strPhone = JSON.stringify(reqPhone);
        var aesPhone = CryptoJS.AES.encrypt(strPhone, keyUTF, {iv: ivUTF}).toString();

        console.error("aesPhone >> " + aesPhone);
        console.error("mac >> " + sHostMac);

        var reqBody = {
            if: "IF-EPS-001",
            ver: "5.0",
            ui_name: "HEBEPS",
            client_name: "HEBEPS",
            response_format: "json",
            stb_id: "{"+sPriId+"}",
            mac: sHostMac,
            inApp: "true",
            requestDateTime: requestDateTime,
            usePhone: "true",
            phoneData: aesPhone
        }

        var strHeader = JSON.stringify(reqHeader);
        var strBody = JSON.stringify(reqBody);

        console.error("strHeader >>> " + strHeader);
        console.error("strBody >>> " + strBody);
 
        commonGameApiPost(addUrl, strHeader, reqUrl, strBody, callback, errCallback);
    }

    var commonGameApiGet = function(reqHeader, reqUrl, reqParam, callback, errCallback) {
        $.ajax({
            type: "GET",
            url: "http://61.252.137.148/commongame-api/btv/replace/header/" + encodeURIComponent(btoa(reqHeader))
            + "/url/" + encodeURIComponent(btoa(reqUrl))
            + "/param/" + encodeURIComponent(btoa(reqParam)),
            contentType: "application/json; charset=utf-8",
            success: function(resData) {
                console.error("commonGameApi success >> " + JSON.stringify(resData));
                if (callback) {
                    callback();
                }
            },
            error: function(err) {
                console.error("commonGameApi error >> " + JSON.stringify(err));
                if (errCallback) {
                    errCallback(err);
                }
            }
        });
    }

    var commonGameApiPost = function(addUrl, reqHeader, reqUrl, reqBody, callback, errCallback) {
        $.ajax({
            type: "POST",
            url: reqUrl,
            data: JSON.stringify({
                urlPath: "https://agw.sk-iptv.com:8443/eps/v5/payment/" + addUrl,
                header: reqHeader,
                body: reqBody
            }),
            contentType: "application/json;charset=utf-8",
            success: function(resData) {
                console.error("commonGameApiPost success >> " + JSON.stringify(resData));
                if (callback) {
                    callback(resData);
                }
            },
            error: function(err) {
                console.error("commonGameApiPost error >> " + JSON.stringify(err));
                if (errCallback) {
                    errCallback(err);
                }
            }
        })
    }
}

var playApi = PlayZapi;