"use strict";
"use warning";

var NoticeMsgManager = new function() {
  
    var sleepTime = 20000;
    var isLive = true;
    var isOn = false;
    var msgQueue = new ArrayList();
    var curMsg;
    var curMsgEnd;
    
    var bg;
    var icon;
    
    var colorIdx = 0;
    var colorLength = 0;
    
    this.turnOn = function() {
        isOn = true;
    };
    
    this.turnOff = function() {
        isOn = false;
    };
    
    this.render = function(g) {
        
        if ((!isOn) || (curMsg == null)) return;
        
        g.drawImage(bg, 117, 69);
        g.drawImage(icon, 480 - Math.floor(HTextRender.getStrWidth(g, curMsg) / 2) - 9 - icon.width, 75);
        g.setColor(COLOR_WHITE);
		g.setFont(FONT_17);
        if (colorIdx != -1) {
            HTextRender.renderHighlightedTxt(g, curMsg, 480, 93, HTextRender.CENTER, COLOR_RED, colorIdx, colorLength);
        } else {
            HTextRender.renderCenter(g, FM_17, curMsg, 480, 93);
        }
        
        if (new Date().getTime() > curMsgEnd) {
            curMsg = null;
        }
    };
    
    this.setSleep = function(millsec) {
        sleepTime = millsec;
    };
    
    this.setResource = function() {
        var imgParam = [
            [bg = new Image(), ROOT_IMG + "notice_back" + EXT_PNG],
            [icon = new Image(), ROOT_IMG + "notice_icon" + EXT_PNG]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
        }, function(err) {
            appMgr.openDisconnectPopup("NoticeMsgMgr setResource Fail", this);
        });
    };
    
    this.stop = function() {
        isLive = false;
    };
    
    this.destroy = function() {
        isLive = false;
        isOn = false;
        msgQueue.clear();
        msgQueue = null;
        curMsg = null;

        bg = null;
        icon = null;
    };
    
    this.addMsg = function(msg) {
        if (!isLive) return;
        msgQueue.add(new Message(0, msg));
        NetManager.Req_InsertNoticeMsg(msg, function() {
        });
    };
    
    var Message = function(_recKey, _contents) {
        this.recKey = _recKey;
        this.contents = _contents;
        this.equal = function(e) {
            if (e instanceof Message) {
                return e.recKey == this.recKey;
            }
            return false;
        }
    };
    
    var request = function() {
        NetManager.Req_GetNoticeMsg(sleepTime, function(response) {
            if (!NetManager.isSuccess(response)) return;
            var result = NetManager.getResult(response, 0);
            for (var i = 0; i < result.length; i++) {
                var msgObj = result[i];
                if (msgObj["code"] == "ALL_STOP") isLive = false;
                var msg = new Message(msgObj["recKey"], msgObj["msgContents"]);
                if (!msgQueue.contains(msg)) msgQueue.add(msg);
            }
        });
    };
    
    this.msgRequest = function() {
        NetManager.Req_GetNoticeMsg(sleepTime, function(response) {
            if (!NetManager.isSuccess(response)) return;
            var result = NetManager.getResult(response, 0);
            for (var i = 0; i < result.length; i++) {
                var msgObj = result[i];
                if (msgObj["code"] == "ALL_STOP") isLive = false;
                var msg = new Message(msgObj["recKey"], msgObj["msgContents"]);
                if (!msgQueue.contains(msg)) msgQueue.add(msg);
            }
        });
    };
    
    var requestThread = function() {
        setInterval(function() {
            if (!isLive) return;
            if (isOn) {
                request();
            }
        }, sleepTime)
    };
    requestThread();
    
    var popThread = function() {
        setTimeout(function() {
            if (!isLive) return;
            if (isOn && msgQueue.size() > 0) popMessage();
            popThread();
        }, (Math.floor(sleepTime / 5) + (Math.random() * 3000 - 1500)))
    };
    popThread();
    
    var popMessage = function() {
        curMsg = msgQueue.get(0).contents;
        msgQueue.removeIndex(0);
        curMsgEnd = new Date().getTime() + 3500;
        setColorIdx();
        return curMsg;
    };
    
    var setColorIdx = function() {
        colorIdx = curMsg.indexOf("님이") + 3;
        colorLength = curMsg.indexOf("아이템") - colorIdx;
    };
};