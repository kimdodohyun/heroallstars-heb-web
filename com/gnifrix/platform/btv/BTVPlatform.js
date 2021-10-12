var BTVPlatform = new function () {
    
    var callback_2;
    /**
     * 구매 비밀번호 체크
     * @param {int} inputPwd 입력한 비밀 번호
     * @param {function} callback 비밀번호 체크 결과를 리턴 받을 콜백 함수
     * @returns {Boolean}
     */
    this.checkPurchasePin = function (inputPwd, callback) {
        if (!callback) {
            HLog.err("checkPurchasePin Error - callback is undefined");
            callback({isError : true});
            return;
        }
        
        var checkPIN = function () {
            
            try {
                callback_2 = callback;
                android.getCheckPurchasePin(inputPwd);
            } catch (e) {
                console.error("checkPin Error 1 >> " + e);
                callback({isError:true, e:e});
            }
        };
        checkPIN();
    };
    
    this.getPurchaseCallback = function(response) {
                
        console.error("getPurchaseCallback parse >> " + JSON.parse(response));
        console.error("getPurchaseCallback stringify >> " + JSON.stringify(response));
    
        if (response == null || response == "undefined") {
            callback_2({isError:false});
        } else {
            callback_2({isError:false, result:JSON.parse(response)});
        }
    }
};