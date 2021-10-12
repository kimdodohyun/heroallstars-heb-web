var NoticeManager = new function() {
    var noticeList = [];
    var count = 0;
    
    
    var isDailyOpen = false;

    this.Rev_setNotice = function (arr) {
        for(var i=0; i<arr.length; i++) {
            noticeList[i] = arr[i]["url"];
        }
    };

    this.openNoticePopup = function () {
        var INSTANCE = this;
        if(count<noticeList.length) {
            POPUP.POP_NOTICE.getInstance().setResource(noticeList[count++], function () {
                PopupMgr.openPopup(POPUP.POP_NOTICE, function(data) {
                    if (data == "CLOSE") {
                        PopupMgr.closePopup(POPUP.POP_NOTICE);
                        INSTANCE.openNoticePopup();
                    }
                });
            });
        } else {
            
            // TEST
            if (!isDailyOpen) {
                isDailyOpen = true;
                PopupMgr.openPopup(POPUP.POP_DAILYITEMMONTH);
            }
            
//            if (QuestManager.getCurrentValue()[0] == "0") {
//                PopupMgr.openPopup(POPUP.POP_DAILYITEMMONTH);
//            }
            
//            if (appMgr.getFirstConn()) {
//                PopupMgr.openPopup(POPUP.POP_DAILYITEMMONTH);
//            }
        }
    };

    this.destroy = function () {
        noticeList = null;
    };
};
