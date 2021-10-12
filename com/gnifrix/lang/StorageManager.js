// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 * 2014.07.30
 */

var StorageMgr = new function() {
    
    /**
     * Session Storage Function 
     */
    this.saveData = function(key, sessionData) {
        if (Object.prototype.toString.call(sessionData) == '[object Object]' || Object.prototype.toString.call(sessionData) == '[object Array]') {
            sessionData = JSON.stringify(sessionData);
        }
        sessionStorage.setItem(key, sessionData);
    };

    this.loadData = function(key, valid) {
        var result = sessionStorage.getItem(key);
        
        // 세션스토리지에서 데이터를 불러들인 후 해당 데이터를 삭제하려면 valid 를 true 로 호출
        if (valid == true)
            sessionStorage.removeItem(key);
        try {
            var retObj = JSON.parse(result);
            return retObj;
        } catch (e) {
            return result;
        }
    };

    this.deleteData = function(key) {
        sessionStorage.removeItem(key);
    };

    this.clearData = function() {
        sessionStorage.clear();
    };

    /**
     * Local Storage Function 
     */
    this.saveLocalData = function(key, localData) {
        if (Object.prototype.toString.call(localData) == '[object Object]' || Object.prototype.toString.call(localData) == '[object Array]') {
            localData = JSON.stringify(localData);
        }
        localStorage.setItem(key, localData);
    };

    this.loadLocalData = function(key, valid) {
        var result = localStorage.getItem(key);

        // 로컬스토리지에서 데이터를 불러들인 후 해당 데이터를 삭제하려면 valid 를 true 로 호출
        if (valid == true)
            localStorage.removeItem(key);
        try {
            var retObj = JSON.parse(result);
            return retObj;
        } catch (e) {
            return result;
        }
    };

    this.deleteLocalData = function(key) {
        localStorage.removeItem(key);
    };
    
    this.clearLocalData = function() {
        localStorage.clear();
    };
};

