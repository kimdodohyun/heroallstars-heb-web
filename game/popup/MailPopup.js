// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var MailPopup = new function () {
    var INSTANCE = this;
    var callback;
    //#########################################################################
    // Default Popup
    //#########################################################################
    var frameCnt = 0;
    var closeCnt = 0;
    var xKey, yKey;
    var focus;
    var pageNum, pageCnt;
    var remainTime;
    var pivotTime;
    var msgIndex;
    var msgAmount;
    var isLoading;
    var isInit;
    var isKeyLock;
    var isAccept;
    
    var popup_0;
    var back;
    var bar_page;
    var btn_ok_on;
    var btn_close_off;
    var btn_close_on;
    var btn_get_off;
    var btn_get_on;
    var btn_getall_off;
    var btn_getall_on;
    var reward = [];
    
    var rewardStr = ["reward_gem", "reward_gold", "reward_key", "reward_summonstone_normal", "reward_summonstone_special", "reward_upgradestone_black", "reward_upgradestone_blue", "reward_upgradestone_red"];
    var reward_Str = ["보석 ", "골드 ", "열쇠 ", "일반소환석 ", "고급소환석 ", "블랙스톤 ", "블루스톤 ", "레드스톤 "];
	var accept_Str = "개를 획득 하였습니다.";
	var allAccept_Str = "모든 메세지를 받았습니다.";
	var emptyMsg_Str = "수신된 메세지가 없습니다.";
    var day = "일 ";
    var hour = "시간 ";
    
    INSTANCE.setResource = function (onload) {
        
        reward = [];
        
        var imgParam = [
            [back = new Image(), ROOT_IMG + "popup/mailbox/bar_list" + EXT_PNG],
            [bar_page = new Image(), ROOT_IMG + "popup/mailbox/bar_page" + EXT_PNG],
            [btn_close_off = new Image(), ROOT_IMG + "popup/mailbox/btn_close_off" + EXT_PNG],
            [btn_close_on = new Image(), ROOT_IMG + "popup/mailbox/btn_close_on" + EXT_PNG],
            [btn_get_off = new Image(), ROOT_IMG + "popup/mailbox/btn_get_off" + EXT_PNG],
            [btn_get_on = new Image(), ROOT_IMG + "popup/mailbox/btn_get_on" + EXT_PNG],
            [btn_getall_off = new Image(), ROOT_IMG + "popup/mailbox/btn_getall_off" + EXT_PNG],
            [btn_getall_on = new Image(), ROOT_IMG + "popup/mailbox/btn_getall_on" + EXT_PNG],
            [popup_0 = new Image(), ROOT_IMG + "popup/popup_0" + EXT_PNG],
            [btn_ok_on = new Image(), ROOT_IMG + "popup/btn_ok_on" + EXT_PNG]
        ];
        
        for (var i = 0; i < rewardStr.length; i++) {
            imgParam.push([reward[i] = new Image(), ROOT_IMG + "popup/mailbox/" + rewardStr[i] + EXT_PNG]);
        }
        
        ResourceMgr.makeImageList(imgParam, function () {
            imgParam = null;
            onload();
        }, function (err) {
            GameManager.openDisconnectPopup("setResource fail!! -> " + err, INSTANCE);
        });
    };
    
    INSTANCE.clear = function() {
        popup_0 = null;
        back = null;
        bar_page = null;
        btn_ok_on = null;;
        btn_close_off = null;
        btn_close_on = null;
        btn_get_off = null;
        btn_get_on = null;
        btn_getall_off = null;
        btn_getall_on = null;
        reward = null;
    };
    
    INSTANCE.destroy = function() {
        this.clear();
        rewardStr = null;
        reward_Str = null;
        accept_Str = null;
        allAccept_Str = null;
        emptyMsg_Str = null;
        day = null;
        hour = null;
    };
    
    var product_render = function(g, i) {
        g.drawImage(back, 283, 103 + (i * 100));
        g.drawImage(btn_get_off, 878, 120 + (i * 100));
        g.drawImage(reward[MessageManager.getProduct()[i]], 312, 121 + (i * 100));
        
        g.setFont(FONT_20);
        g.setColor(COLOR_WHITE);
        HTextRender.oriRender(g, MessageManager.getMsgContents()[i], 393, 146 + (i * 100), HTextRender.LEFT);
        HTextRender.oriRender(g, MessageManager.getSubContents()[i], 393, 174 + (i * 100), HTextRender.LEFT);
        
        var time = remainTime[i] - (new Date().getTime() - pivotTime);
        HTextRender.oriRender(g, Math.floor(time / 1000 / 60 / 60 / 24) + day + Math.floor(time / 1000 / 60 / 60) % 24 + hour, 863, 160 + (i * 100), HTextRender.RIGHT);
    };
    
    var setPageCnt = function() {
        if (MessageManager.getMsgCnt() > 0) {
			pageCnt = (Math.floor(MessageManager.getMsgCnt() / 4));
			if (Math.floor(MessageManager.getMsgCnt() % 4) > 0) {
				pageCnt++;
			}
            
            remainTime = [];
            for (var i = 0; i < MessageManager.getDateEnd().length; i++) {
                remainTime[i] = HTool.compareTime(MessageManager.getDateTime(), MessageManager.getDateEnd()[i]);
                console.error("remainTime >> " + remainTime[i]);
            }
            pivotTime = new Date().getTime();
            
			yKey = 0;
		} else {
			if (isInit) {
				isAccept = 2;
				isInit = false;
			} else {
				PopupMgr.closePopup(POPUP.POP_MAILBOX);
			}
		}
    };

    return {
        toString: function () {
            return "MailBoxPopup";
        },
        init: function (onload, callbackFunc) {
            
            isLoading = true;
            isInit = true;
            isKeyLock = false;
            
            frameCnt = 0;
            closeCnt = 0;
            pageNum = 0;
            xKey = 0;
            
            if (MessageManager.getMsgCnt() > 0) {
                yKey = 0;
                isAccept = 0;
            } else {
                yKey = 4;
                isAccept = 2;
            }
            
//            remainTime = [];
//            for (var i = 0; i < MessageManager.getDateEnd().length; i++) {
//                remainTime[i] = HTool.compareTime(MessageManager.getDateTime(), MessageManager.getDateEnd()[i]);
//            }
            
//            pivotTime = new Date().getTime();
            setPageCnt();
            
            onload();
        },
        start: function () {
            isLoading = false;
        },
        run: function () {
            if (isLoading) return;
            frameCnt++;
            switch (isAccept) {
                case 1:
                    closeCnt++;
                    if (closeCnt >= 15) {
                        if (yKey == 4) {
                            PopupMgr.closePopup(POPUP.POP_MESSAGE);
                        } else {
                            isAccept = 0;
                            closeCnt = 0;
                            yKey = 4;
                        }
                    }
                    break;
                    
                case 2:
//                    closeCnt++;
//                    if (closeCnt >= 15) {
//                        PopupMgr.closePopup(POPUP.POP_MESSAGE);
//                    }
                    break;
            }
            UIMgr.repaint();
        },
        paint: function () {
            if (isLoading) return;
            
            switch (isAccept) {
                case 0:
                    
                    if (MessageManager.getMsgCnt() > 0) {
                        if ((Math.floor(MessageManager.getProduct().length % 4)) == 0) {
                            for (var i = 0; i < 4; i++) {
                                product_render(g, i);
                            }
                        } else if ((Math.floor(MessageManager.getProduct().length % 4)) < 4) {
                            for (var i = 0; i < (Math.floor(MessageManager.getProduct().length % 4)); i++) {
                                product_render(g, i);
                            }
                        }
                    }
                    
                    g.drawImage(bar_page, 283, 513);
                    g.setFont(FONT_24);
                    g.setColor(COLOR_WHITE);
                    
                    HTextRender.oriRender(g, (pageNum +1 ) + "/" + pageCnt, 640, 545, HTextRender.CENTER);
                    
                    
                    g.drawImage(btn_getall_off, 481, 582);
                    g.drawImage(btn_close_off, 641, 582);
                    
                    switch (yKey) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            g.drawImage(btn_get_on, 878, 120 + (yKey * 100));
                            break;
                        case 4:
                            switch (xKey) {
                            case 0:
                                g.drawImage(btn_getall_on, 481, 582);
                                break;
                            case 1:
                                g.drawImage(btn_close_on, 641, 582);
                                break;
                            }
                            break;
                    }
                    break;
                    
                case 1:
                    g.drawImage(popup_0, 300, 206);
                    g.setFont(FONT_22);
                    g.setColor(COLOR_WHITE);
                    if (yKey == 4) {
                        HTextRender.oriRender(g, allAccept_Str, 640, 323, HTextRender.CENTER);
                    }
                    break;
                    
                case 2:
                    g.drawImage(popup_0, 300, 206);
                    g.setFont(FONT_22);
                    g.setColor(COLOR_WHITE);
                    HTextRender.oriRender(g, emptyMsg_Str, 640, 323, HTextRender.CENTER);
                    g.drawImage(btn_ok_on, 562, 386);
                    break;
            }
            
        },
        stop: function () {
            
        },
        onKeyPressed: function (key) {
            if (isKeyLock) return;
            
            switch(key) {
                case KEY_PREV:
                    PopupMgr.closePopup(POPUP.POP_MAILBOX);
                    break;
                    
                case KEY_ENTER:
                    if (isAccept == 1) return;
                    
                    if (isAccept == 2) {
                        PopupMgr.closePopup(POPUP.POP_MESSAGE);
                        return;
                    }
                    
                    switch (yKey) {
                        case 4:
                            switch (xKey) {
                                case 0:
                                    if (MessageManager.getMsgCnt() > 0) {
                                        for (var i = 0; i < MessageManager.getMsgCnt(); i++) {
                                            
                                            switch (MessageManager.getProduct()[i]) {
                                                case 0:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("보석이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 1:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("골드가 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 2:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("입장권이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 3:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("일반소환권이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 4:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("고급소환권이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 5:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("블랙스톤이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 6:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("블루스톤이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;

                                                case 7:
                                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[i], MessageManager.getAttachmentAmount()[i])) {
                                                        isKeyLock = true;
                                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("레드스톤이 가득찼습니다."), null, 1500);
                                                        isKeyLock = false;
                                                        return;
                                                    }
                                                    break;
                                            }
                                        }
                                        
                                        isLoading = true;
                                        isKeyLock = true;
                                        PopupMgr.openPopup(POPUP.POP_WAITING);
                                        NetManager.Req_getRewardAll(function(response) {
                                            if (NetManager.isSuccess(response)) {
                                                ItemManager.Rev_AllItem(NetManager.getResult(response, 1), response.dateTime, true);
                                                var jo = NetManager.getResult(response, 1);
                                                for (var i = 0; i < jo.length; i++) {
                                                    if (jo[i].code == "ENTRANCE_KEY") {
                                                        TokenManager.Rev_setToken(jo[i].amount, response.dateTime, jo[i].dateEnd);        
                                                    }
                                                }
                                                
                                                NetManager.Req_getMsgList(1, function(response) {
                                                    PopupMgr.closePopup(POPUP.POP_WAITING);
                                                    if (NetManager.isSuccess(response)) {
                                                        MessageManager.Rev_DateTime(response);
                                                        MessageManager.Rev_Message(NetManager.getResult(response, 0));
                                                        MessageManager.Rev_MessageCnt(NetManager.getResult(response, 1));
                                                        
                                                        setPageCnt();
                                                        isAccept = 1;
                                                        isLoading = false;
                                                        isKeyLock = false;
                                                    } else {
                                                        isKeyLock = false;
                                                        appMgr.openDisconnectPopup(" Fail!!!!");
                                                    }
                                                });
                                            } else {
                                                appMgr.openDisconnectPopup(" Fail!!!!");
                                            }
                                        });
                                    }
                                    break;
                                    
                                case 1:
                                    PopupMgr.closePopup(POPUP.POP_MESSAGE);
                                    break;
                            }
                            break;
                            
                            
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            
                            switch (MessageManager.getProduct()[yKey]) {
                                case 0:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("보석이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;

                                case 1:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("골드가 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;

                                case 2:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("입장권이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;

                                case 3:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("일반소환권이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;

                                case 4:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("고급소환권이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;
                                    
                                case 5:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("블랙스톤이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;
                                    
                                case 6:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("블루스톤이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;
                                    
                                case 7:
                                    if (ItemManager.itemFullCheck(MessageManager.getAttachmentCode()[yKey], MessageManager.getAttachmentAmount()[yKey])) {
                                        isKeyLock = true;
                                        PopupMgr.openPopup(appMgr.getMessage0BtnPopup("레드스톤이 가득찼습니다."), null, 1500);
                                        isKeyLock = false;
                                        return;
                                    }
                                    break;
                            }
                            
                            isKeyLock = true;
                            PopupMgr.openPopup(POPUP.POP_WAITING);
                            msgIndex = MessageManager.getProduct()[yKey];
                            msgAmount = MessageManager.getAttachmentAmount()[yKey];
                            
                            NetManager.Req_getReward(MessageManager.getRecKey()[yKey], function(response) {
                                if (NetManager.isSuccess(response)) {
                                    ItemManager.Rev_AllItem(NetManager.getResult(response, 1), response.dateTime, true);
                                    var jo = NetManager.getResult(response, 1);
                                    for (var i = 0; i < jo.length; i++) {
                                        if (jo[i].code == "ENTRANCE_KEY") {
                                            TokenManager.Rev_setToken(jo[i].amount, response.dateTime, jo[i].dateEnd);        
                                        }
                                    }
                                    pageNum = 0;
                                    
                                    NetManager.Req_getMsgList((pageNum + 1), function(response) {
                                        PopupMgr.closePopup(POPUP.POP_WAITING);
                                        if (NetManager.isSuccess(response)) {
                                            MessageManager.Rev_DateTime(response);
                                            MessageManager.Rev_Message(NetManager.getResult(response, 0));
                                            MessageManager.Rev_MessageCnt(NetManager.getResult(response, 1));
                                            
                                            setPageCnt();
                                            
                                            PopupMgr.openPopup(appMgr.getMessage0BtnPopup(reward_Str[msgIndex] + msgAmount + accept_Str), null, 1500);
                                            isKeyLock = false;
                                        } else {
                                            isKeyLock = false;
                                            appMgr.openDisconnectPopup(" Fail!!!!");
                                        }
                                    });
                                } else {
                                    appMgr.openDisconnectPopup(" Fail!!!!");
                                }
                            });
                            break;
                    }
                    break;
                    
                case KEY_UP:
                    if (isAccept == 1 || isAccept == 2) return;
                    
                    if (MessageManager.getMsgCnt() > 0) {
                        if (pageNum + 1 == pageCnt && (Math.floor(MessageManager.getProduct().length % 4)) == 0) {
                            yKey = HTool.getIndex(yKey, -1, 5);
                        } else if (pageNum + 1 == pageCnt && (Math.floor(MessageManager.getProduct().length % 4)) < 4) {
                            if (yKey == 4) {
                                yKey = Math.floor(MessageManager.getProduct().length % 4) - 1;
                            } else {
                                if (yKey == 0) {
                                    yKey = 4;
                                } else {
                                    yKey--;
                                }
                            }
                        } else {
                            yKey = HTool.getIndex(yKey, -1, 5);
                        }
                    }
                    break;
                    
                case KEY_DOWN:
                    if (isAccept == 1 || isAccept == 2) return;
                    
                    if (MessageManager.getMsgCnt() > 0) {
                        if (pageNum + 1 == pageCnt && (Math.floor(MessageManager.getProduct().length % 4)) == 0) {
                            yKey = HTool.getIndex(yKey, 1, 5);
                        } else if (pageNum + 1 == pageCnt && (Math.floor(MessageManager.getProduct().length % 4)) < 4) {
                            if (yKey == (Math.floor(MessageManager.getProduct().length % 4)) - 1) {
                                yKey = 4;
                            } else {
                                if (yKey == 4) {
                                    yKey = 0;
                                } else {
                                    yKey++;
                                }
                            }
                        } else {
                            yKey = HTool.getIndex(yKey, 1, 5);
                        }
                    }
                    break;
                    
                case KEY_LEFT:
                    if (isAccept == 1 || isAccept == 2) return;
                    switch (yKey) {
                        case 4:
                            xKey = HTool.getIndex(xKey, -1, 2);
                            break;
                            
                        default:
                            if (pageNum > 0) {
                                pageNum--;
                            } else if (pageNum == 0) {
                                pageNum = pageCnt - 1;
                            }
                            
                            PopupMgr.openPopup(POPUP.POP_WAITING);
                            NetManager.Req_getMsgList((pageNum + 1), function(response) {
                                PopupMgr.closePopup(POPUP.POP_WAITING);
                                if (NetManager.isSuccess(response)) {
                                    MessageManager.Rev_DateTime(response);
                                    MessageManager.Rev_Message(NetManager.getResult(response, 0));
                                    MessageManager.Rev_MessageCnt(NetManager.getResult(response, 1));
                                    setPageCnt();
                                    isLoading = false;
                                    yKey = 0;
                                } else {
                                    appMgr.openDisconnectPopup(" Fail!!!!");
                                }
                            });
                            break;
                    }
                    break;
                    
                case KEY_RIGHT:
                    if (isAccept == 1 || isAccept == 2) return;
                    switch (yKey) {
                        case 4:
                            xKey = HTool.getIndex(xKey, 1, 2);
                            break;
                            
                        default:
                            if (pageNum + 1 < pageCnt) {
                                pageNum++;
                            } else if ((pageNum + 1) == pageCnt) {
                                pageNum = 0;
                            }
                            
                            PopupMgr.openPopup(POPUP.POP_WAITING);
                            NetManager.Req_getMsgList((pageNum + 1), function(response) {
                                PopupMgr.closePopup(POPUP.POP_WAITING);
                                if (NetManager.isSuccess(response)) {
                                    MessageManager.Rev_DateTime(response);
                                    MessageManager.Rev_Message(NetManager.getResult(response, 0));
                                    MessageManager.Rev_MessageCnt(NetManager.getResult(response, 1));
                                    setPageCnt();
                                    isLoading = false;
                                    yKey = 0;
                                } else {
                                    appMgr.openDisconnectPopup(" Fail!!!!");
                                }
                            });
                            break;
                    }
                    break;
            }
            UIMgr.repaint();
        },
        onKeyReleased: function (key) {
        },
        getInstance: function () {
            return INSTANCE;
        }
    };
};
