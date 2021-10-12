// Strict Mode On (엄격모드)
"use strict";
"use warning";

var InitScene = new function() {
	var INSTANCE = this;

	var iframe;
    
    // vod Value
    var videoUrl;
    var isVodUrl = false;
    var arr;
    var index = 0;
    var time = [];

    var playVod = function() {
        $("#loading_bar").animate({
            width: "267" 
        }, time[index], function() {
            KTVODMgr.endVod();
            $("#loading").remove();
        });
        
        KTVODMgr.playVod(videoUrl);
    };
    
    var getVod = function(onload) {
        var compCnt = 0;
        var complete = function() {
            compCnt++;
            if (compCnt == 2) {
                onload();
            }
        }
        
        GameManager.init(complete);
        NetManager.getVod(function(data) {
            
            if (data.list.length > 0 && !ISWEB) {
                isVodUrl = true;
                for (var i = 0; i < data.list.length; i++) {

                    if (data.list[i].bnrTitle.indexOf("_") != -1) {
                        arr = data.list[i].bnrTitle.split("_");
                        time[i] = Number(arr[1] + "000");
                    } else {
                        time[i] = Number("15000");
                    }
                }

                index = Number(Math.floor(Math.random() * data.list.length));
                console.error("index >> " + index);
                console.error("bnt >> " + data.list[index].bnrTitle);
                videoUrl = "MXCJ72OQSGL100005100"; //data.list[index].url;
                
                complete();
            } else {
                $("#loading").remove();
                ResourceMgr.loadImage(iframe = new Image(), ROOT_IFRAME + "xletLoad" + EXT_JPG, function() {
                    
                    isVodUrl = false;
                    complete();
                }, function(err) {
                    console.error(err);
                });
            }
        });
    };

	return {
		toString: function() {
			return "InitScene";
		},
		init: function(onload) {
            
            getVod(onload);

//			ResourceMgr.loadImage(iframe = new Image(), ROOT_IFRAME + "xletLoad" + EXT_JPG, function() {
//				GameManager.init(onload);
//			}, function(err) {
//				console.error(err);
//                onload();
//                appMgr.openDisconnectPopup("connection Fail ", this);
//			});
		},
		start: function() {
            
            if (isVodUrl) {
                playVod();    
            } else {
                setTimeout(function() {
                    UIMgr.changeLayer(SCENE.SC_ENTRY);
                }, 3000);
            }
            
//            setTimeout(function() {
//                UIMgr.changeLayer(SCENE.SC_ENTRY);
//            }, 3000);
		},
		run: function() {

		},
		paint: function() {
			if (!isVodUrl) {
                g.drawImage(iframe, 0, 0);
            }
		},
		stop: function() {
            iframe = null;
		},
		dispose: function() {

		},
		onKeyPressed: function(key) {
			switch(key) {
				case KEY_UP:
					break;
				case KEY_DOWN:
					break;
                case KEY_LEFT:
                    break;
                case KEY_RIGHT:
                    break;
				case KEY_ENTER:
					break;
			}
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