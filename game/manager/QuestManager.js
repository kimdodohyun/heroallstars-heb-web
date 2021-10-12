"use strict";
"use warning";

var QuestManager = new function() {
  
    var INSTANCE = this;

    var code;
    
    var name;
    var maxClearValue;
    var rewardAmount;
    var index;
    
    var state;
    var rewardState;
    var clearValue;
    var currentValue;
    
    var product = [1, 2, 3, 1, 4, 0];
    var rewardAmountValue = [1000, 3, 1, 1000, 1, 1];
    
    this.Rev_QuestMgntInfo = function(response) {
        
        name = [];
        code = [];
        maxClearValue = [];
        rewardAmount = [];
        index = [];
        
        for (var i = 0; i < response.length; i++) {
            var obj = response[i];
            
            index[i] = obj.idx;
            name[i] = obj.name;
            code[i] = obj.code;
            maxClearValue[i] = Number(obj.maxClearValue);
            rewardAmount[i] = rewardAmountValue[i];
        }
    };
    
    this.Rev_QuestInfo = function(response) {
        
        state = [];
        rewardState = [];
        clearValue = [];
        currentValue = [];
        
        for (var i = 0; i < response.length; i++) {
            
            if (response[i] == null) {
                
                state[i] = 0;
                rewardState[i] = 0;
                clearValue[i] = maxClearValue[i];
                currentValue[i] = 0;
                
            } else {
                var obj = response[i];
                
                state[i] = Number(obj.state);
                rewardState[i] = Number(obj.rewardState);
                clearValue[i] = Number(obj.clearValue);
                currentValue[i] = Number(obj.currentValue);
            }
        }
    };
    
    this.getName = function() { return name; };
    this.getCode = function() { return code; };
    this.getMaxClearValue = function() { return maxClearValue; };
    this.getRewardAmount = function() { return rewardAmount; };
    this.getIndex = function() { return index; };
    
    this.getState = function() { return state; };
    this.getRewardState = function() { return rewardState; };
    this.getClearValue = function() { return clearValue; };
    this.getCurrentValue = function() { return currentValue; };
    
    this.getProduct = function() {
        return product;
    };
    
    this.questUpdt = function(index, callback) {
        if (clearValue[index] <= currentValue[index]) {
            if (callback) callback();
            return;
        }
        NetManager.Req_QuestUpdate(code[index], function(response) {
           if (NetManager.isSuccess(response)) {
               if (callback) callback();
           } else {
               appMgr.openDisconnectPopup("Req_QuestUpdate Fail", this);
           }
        });
    };
    
    this.questUpdts = function(index, count, callback) {
        if (clearValue[index] <= currentValue[index]) {
            if (callback) callback();
            return;
        }
        NetManager.Req_QuestUpdates(code[index], count, function(response) {
           if (NetManager.isSuccess(response)) {
               if (callback) callback();
           } else {
               appMgr.openDisconnectPopup("Req_QuestUpdate Fail", this);
           }
        });
    };
    
    this.questReward = function(index, callback) {
        
        if (rewardState[index] == 1) {
            if (callback) callback(1);
            return;
        }
        
        if (clearValue[index] > currentValue[index]) {
            if (callback) callback(2);
            return;
        }
        
        NetManager.Req_QuestReward(code[index], function(response) {
            if (NetManager.isSuccess(response)) {
                if (callback) callback(0);
            } else {
                appMgr.openDisconnectPopup("Req_QuestReward Fail", this);
            }
        });
    };
};