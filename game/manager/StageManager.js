"use strict";
"use warning";

var StageManager = new function() {
    var INSTANCE = this;
    
    var stageInfoArr = [];
    var stageNameArr = [];
    
    var lasStageArea = 0;
    
    this.Rev_setStageInfo = function(response) {
        var str;
        for (var i = 0; i < response.length; i++) {
            var obj = response[i];
            str = obj.code.split("_");
            stageInfoArr[str[1] - 1][[str[2] - 1]] = Number(obj.state);
        }
    };
    
    this.Rev_setStageMgntInfo = function(response) {
        for (var i = 0; i < Math.floor(response.length / 10); i++) {
            stageInfoArr[i] = [];
            stageNameArr[i] = "stage_" + (i + 1);
        }
        
        lasStageArea = stageInfoArr.length - 1;
        
        for (var i = 0; i < response.length; i++) {
            var obj = response[i];
            var str = obj.code.split("_");
            
            for (var j = 0; j < stageNameArr.length; j++) {
                if (str[0] + "_" + str[1] == stageNameArr[j]) {
                    stageInfoArr[j][obj.idx] = Number(obj.type);
                }
            }
        }
    };
    
    this.getStageInfo = function() {
        return stageInfoArr;
    };
    
    this.getLastStageArea = function() {
        return lasStageArea;
    };
    
    this.getStageAreaLength = function() {
        return stageNameArr.length;
    };
    
    this.destroy = function() {
        stageInfoArr = null;
        stageNameArr = null;
    };
};