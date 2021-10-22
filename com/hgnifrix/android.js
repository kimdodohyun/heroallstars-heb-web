var android = new function() {
    
    this.getPriId = function() {
        sPriId = "E04D49C7-2B1D-11EC-981F-47B74DFEF8FB"; //"B6225013-E72B-11E5-A490-FDCFBFF8EC17";
//        console.error("sPriId >> " + sPriId);
//        return "B6225013-E72B-11E5-A490-FDCFBFF8EC17";
    };
    
    this.getHostMac = function() {
        sHostMac = "00:09:74:6E:8E:B8"; //"80:8c:97:01:1e:01";
//        console.error("sHostMac >> " + sHostMac);
//        return "80:8c:97:01:1e:01";
    };

    this.getToken = function() {
        sDpsToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHBzLnNrLW5leHRtZWRpYS5jb20iLCJzdWIiOiJIRUIiLCJleHAiOjE2MzQwMjA3NzcsImlhdCI6MTYzNDAxODk3NywiYWlkIjoiTlVMTCIsImRpZCI6IiIsInNpZCI6IiJ9.vQbV7k6D_yg8Ph7s739NL0uzgUs7V5GbWQ78z5Zi-bI";
    }
    
    this.getUserId = function() {
        sUserName = "BIP-EB100";
//        return "BTV_WEB_TESTER";
    };
    
    this.introInvisible = function() {
        console.error("Intro Invisible!!");  
    };
    
    this.exitGame = function() {
        ApplicationDestroyRequest(true);
    };
    
    this.loopSound = function(path) {
        console.error("loopSound >> " + path);
    };
    
    this.stopSound = function() {
        console.error("stopSound");
    }
}