var android = new function() {
    
    this.getPriId = function() {
        sPriId = "7D30D1AC-F706-11DF-8E17-49E15D8C28F8"; //"B6225013-E72B-11E5-A490-FDCFBFF8EC17";
//        console.error("sPriId >> " + sPriId);
//        return "B6225013-E72B-11E5-A490-FDCFBFF8EC17";
    };
    
    this.getHostMac = function() {
        sHostMac = "94:3b:b1:a9:50:80"; //"80:8c:97:01:1e:01";
//        console.error("sHostMac >> " + sHostMac);
//        return "80:8c:97:01:1e:01";
    };

    this.getToken = function() {
        sDpsToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHBzLnNrLW5leHRtZWRpYS5jb20iLCJzdWIiOiJIRUIiLCJleHAiOjE2MzQwMjA3NzcsImlhdCI6MTYzNDAxODk3NywiYWlkIjoiTlVMTCIsImRpZCI6IiIsInNpZCI6IiJ9.vQbV7k6D_yg8Ph7s739NL0uzgUs7V5GbWQ78z5Zi-bI";
    }
    
    this.getUserId = function() {
        sUserName = "BTV_WEB_TESTER";
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