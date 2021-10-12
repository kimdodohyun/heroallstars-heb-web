"use strict";
"use warning";

var TokenManager = new function() {
    var INSTANCE = this;
    
    var amount;
    var remainTime;
    var pivotTime;
    var lock = false;
    var renderTime;
    
    this.init = function() {
        lock = false;
        requestServer();
    };
    
    this.Rev_setToken = function(_amount, _dateTime, _endTime) {
        
        amount = _amount;
        
//        console.error("Token amount >> " + amount);
        
        remainTime = (SGUtil.compareTime(_dateTime, _endTime) + 600000);
        pivotTime = getCurrentTimeMillis();
        lock = false;
//        ItemManager.setTicket(amount);
    };
    
    var getCurrentTimeMillis = function() {
        var time = new Date();
        return time.getTime();
    };
    
    var getRemainTime = function() {
        var result = remainTime - (getCurrentTimeMillis() - pivotTime);
        if (result < 0) {
            requestServer();
            return 0;
        }
        
        return result;
    };
    
    var requestServer = function() {
        if (lock) return;
        lock = true;
        netMgr.Req_TokenUpdate(function(response) {
            if (netMgr.isSuccess(response)) {
                var jo = netMgr.getResult(response, 1);
                
                console.error("jo " + JSON.stringify(jo));
                
                INSTANCE.Rev_setToken(jo[0].amount, response.dateTime, jo[0].dateEnd);
            } else {
                appMgr.openDisconnectPopup(" Fail!!!!");
            }
            lock = false;
        });
    };
    
    this.getRemainMinStr = function() {
        renderTime = getRemainTime();
        if (Math.floor(renderTime / 60000) < 10) {
            return Math.floor(renderTime / 60000);
        }
        return Math.floor(renderTime / 60000);
    };
    
    this.getRemainSecStr = function() {
        if (Math.floor(renderTime / 1000 % 60) < 10) {
            return Math.floor(renderTime / 1000 % 60);
        }
        return Math.floor(renderTime / 1000 % 60);
    };
    
    this.update = function() {
        requestServer();
    };
    
    this.getAmount = function() {
        return amount;
    };
};

var tokenMgr = TokenManager;