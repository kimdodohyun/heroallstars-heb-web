var NetManager = new function() {

    // Ajax URL Request (GET)
    // 'callback' 파라메터가 있는경우는 서버가 비동기 호출되며, callback함수로 결과 값을 리턴한다.
    // 'callback' 파라메터가 없는경우는 서버가 동기 호출 되며, 함수 수행이 끝나고 호출한곳으로 결과값을 리턴한다.
    this.ajaxRequest = function(targetUrl, callback) {
        var result = null;
        $.ajax({
            type: "get",
            async: callback ? true : false,
            url: targetUrl,
            crossDomain: true,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            contentEncoding: "utf-8",
            dataType: "text",
            success: function(data) {
                result = data;
                if (callback != null)
                    callback(result.trim());
            },
            error: function(e, state) {
                console.error(e);
                result = state;
                if (callback != null)
                    callback(result);
            }
        });
        return result;
    };
    
    // BTV 관련 아이디가 무명등록으로 들어올시 안드로이드 셋탑박스 이름으로 변경
    this.Req_ReplaceUserId = function(handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["userId"] = sUserName;
        SG_Send("GameUserIdUpdt", SVC_USR, params, handler);
    };
    
    this.getVod = function(handler) {
        var reqUrl = "http://wp-api.gnigame.com/webportal-api/bnr/list";
        $.ajax({
            type: "POST",
            async: "async",
            url: reqUrl,
            data: JSON.stringify({codeId: "VIDEO", useYn: "Y"}),
            contentType: "application/json",
            dataType: "json",
            success: function(resData) {
                console.error("getVod is Success");
                handler(resData);
                HLog.netRecv(JSON.stringify(resData));
            },
            error: function(request, status, er) {
                console.error("getVod is Fail");
                handler(request);
                console.error(er.code);
                console.error(request.status);
                console.error(request.responseText);
                if (err) err(request);
            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////////////
    this.Req_EntryLoading = function(handler) {
        var reqarr = [];
        var params = {};

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "CashProductList", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customType"] = "USER";
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "CharSelt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyListSelt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "NotifySelt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(4, SVC_SNG, "EachUserGameSelt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        reqarr.push(GF_NET.makeBody(5, SVC_SNG, "StageMgntSelt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(6, SVC_SNG, "StageSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        reqarr.push(GF_NET.makeBody(7, SVC_SNG, "MissionMgntSelt", params));
        
        var questArr = [];
        for (var i = 0; i < 6; i++) {
            var questParams = {};
            questParams["code"] = "DAILY_MISSION_" + i;
            questParams["lev"] = 0;
            questArr.push(questParams);
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["missionList"] = questArr;
        reqarr.push(GF_NET.makeBody(8, SVC_SNG, "MissionListUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(9, SVC_SNG, "MissionSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(10, SVC_SNG, "DailyItemMonth", params));

        SG_Send("Req_EntryLoading", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                QuestManager.Rev_QuestMgntInfo(NetManager.getResult(response, 7));
            }
            handler(response);
        });
    };

    this.Req_todayInit = function(handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["attrNum01"] = 0;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "UserGameUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "EachUserGameSelt", params));
        
        var questArr = [];
        for (var i = 0; i < 6; i++) {
            var questParams = {};
            questParams["code"] = "DAILY_MISSION_" + i;
            questParams["lev"] = 0;
            questArr.push(questParams);
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["missionList"] = questArr;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "MissionListInit", params));

//        params = {};
//        params[PM_APP_ID] = GF_NET.appId;
//        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "MissionMgntSelt", params));

        SG_Send("Req_EntryLoading", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
//                QuestManager.Rev_QuestMgntInfo(NetManager.getResult(response, 3));
            }
            handler(response);
        });
    };
    
    this.Req_TUTOTEST = function() {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["tutorial"] = "0";
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "UserGameUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "EachUserGameSelt", params));
        
        SG_Send("Req_TUTOTEST", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                console.error("response >> " + response);
            }
        });
    };
    
    this.Req_TutoPlayEnd = function(tutoIdx, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["tutorial"] = "1";
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "UserGameUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "EachUserGameSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["rewardCode"] = "TUTORIAL_CLEAR_" + tutoIdx;
        params["rewardLev"] = 2;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "RewardGive", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "ItemMyListSelt", params));
        
        SG_Send("Req_TutoPlayEnd", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                console.error("response >> " + response);
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 3), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_WeeklyRaidRankInfo = function(pageNo, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["pageNo"] = 1;
        params["pageSize"] = 50;
        reqarr.push(GF_NET.makeBody(0, SVC_RNK, "WeeklyStageRankPageSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params["pageNo"] = pageNo;
        params["pageSize"] = 5;
        reqarr.push(GF_NET.makeBody(1, SVC_RNK, "WeeklyStageRankPageSelt", params));
        
//        params = {};
//        params[PM_APP_ID] = GF_NET.appId;
//        reqarr.push(GF_NET.makeBody(2, SVC_RNK, "WeeklyStageRankCountSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params["pageNo"] = 1;
        params["pageSize"] = 50;
        reqarr.push(GF_NET.makeBody(2, SVC_RNK, "WeeklyStageRankPageSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "EachUserGameSelt", params));

        SG_Send("Req_WeeklyRaidRankInfo", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                console.error("response >> " + response);
//                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 1), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_RaidPlayEnd = function(score, fireSkillAmount, iceSkillAmount, fastSkillAmount, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(0, SVC_RNK, "UserPlayUpdt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["lastStage"] = score;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "OnlyLastStageUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FIRE_SKILL";
        params["amount"] = fireSkillAmount;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyUpdt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "ICE_SKILL";
        params["amount"] = iceSkillAmount;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "ItemMyUpdt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FAST_SKILL";
        params["amount"] = fastSkillAmount;
        reqarr.push(GF_NET.makeBody(4, SVC_SNG, "ItemMyUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(5, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("Req_RaidPlayEnd", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 5), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_ItemPurchase = function(code, lev, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemPurchase", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("ItemPurchase", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                console.error("response >> " + response);
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 1), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_ItemPurchase5 = function(code, lev, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemPurchase", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemPurchase", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemPurchase", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "ItemPurchase", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        reqarr.push(GF_NET.makeBody(4, SVC_SNG, "ItemPurchase", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(5, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("ItemPurchase", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                console.error("response >> " + response);
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 5), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_ItemSell = function(code, grade, recKey, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["recKey"] = recKey;
        params["code"] = code;
        params["lev"] = grade;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemSell", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("HeroSell", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 1), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_ItemLoss = function(code, recKey, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["recKey"] = recKey;
        params["code"] = code;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemLoss", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("Req_ItemLoss", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 1), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_HeroLevelUp = function(hero, exp, pCode1, price1, pCode2, price2, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["recKey"] = hero.getRecKey();
        params["exp"] = exp;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemMyUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = pCode1;
        params["amount"] = -price1;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = pCode2;
        params["amount"] = -price2;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("HeroLevelUp", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 3), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_ItemMyUpdt = function(code, amount, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = code;
        params["amount"] = amount;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemMyUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("ItemMyUpdt", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 1), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_GameStart = function(requireKey, handler) {
		var reqarr = [];
		var params = null;
		
		params = {};
		params[PM_APP_ID] = GF_NET.appId;
		params[PM_USER_KEY] = GF_NET.userKey;
		params["amount"] = -requireKey;
		reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemPirodoUpdt", params));
		
		params = {};
		params[PM_APP_ID] = GF_NET.appId;
		params[PM_USER_KEY] = GF_NET.userKey;
		params["code"] = "ENTRANCE_KEY";
		reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));
		
		SG_Send("GameStart", reqarr, function(response) {
			if (NetManager.isSuccess(response)) {
				var jo = INSTANCE.getResult(response, 1)[0];
                console.error("joamount >> " + jo.amount);
				TokenManager.Rev_setToken(jo.amount, response.dateTime, jo.dateEnd);
			}
			if (handler) handler(response);
		});
    }
    
    this.Req_GameEndItemUpdt = function(goldAmount, fireSkillAmount, iceSkillAmount, fastSkillAmount, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "GOLD";
        params["amount"] = goldAmount;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemMyUpdt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FIRE_SKILL";
        params["amount"] = fireSkillAmount;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyUpdt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "ICE_SKILL";
        params["amount"] = iceSkillAmount;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyUpdt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FAST_SKILL";
        params["amount"] = fastSkillAmount;
        reqarr.push(GF_NET.makeBody(3, SVC_SNG, "ItemMyUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(4, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("GameEndItemUpdt", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 4), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_ItemMyListSelt = function(handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("Req_ItemMyListSelt", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
            }
            handler(response);
        });
    };
    
    //////////////////////////////////////
    //			   스테이지 관련 함수		//
    //////////////////////////////////////
    
    this.Req_StageClear = function(stageArea, stageNumber, state, goldAmount, starRewardCode, starRewardCodeAmount, fireSkillAmount, iceSkillAmount, fastSkillAmount, handler) {
        
        var reqarr = [];
        var params = null;
        var reqIdx = 0;
        
        
        var goldCheckAmount;
        var starCheckAmount;
        
        if (ItemManager.itemFullCheck("GOLD", Number(goldAmount))) {
            goldCheckAmount = 0;
        } else {
            goldCheckAmount = goldAmount;
        }
        
        if (ItemManager.itemFullCheck(starRewardCode, Number(starRewardCodeAmount))) {
            starCheckAmount = 0;
        } else {
            starCheckAmount = starRewardCodeAmount;
        }
        
        var nextStageState = -2;
        var nextStageCode;
        
        if (stageNumber < 9) {
            nextStageCode = "stage_" + (stageArea + 1) + "_" + (stageNumber + 2);
        } else {
            nextStageCode = "stage_" + (stageArea + 2) + "_1";
        }
        
        if (state > -1) {
            nextStageState = -1;
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "stage_" + (stageArea + 1) + "_" + (stageNumber + 1);
        params["state"] = state;
        params["lev"] = 0;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = nextStageCode;
        params["state"] = nextStageState;
        params["lev"] = 0;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageSelt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "GOLD";
        params["amount"] = goldCheckAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = starRewardCode;
        params["amount"] = starCheckAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FIRE_SKILL";
        params["amount"] = fireSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "ICE_SKILL";
        params["amount"] = iceSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FAST_SKILL";
        params["amount"] = fastSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["rewardCode"] = "STAGE_CLEAR_FIRST_" + (stageArea + 1) + "_" + (stageNumber + 1);
        params["rewardLev"] = 0;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "RewardGive", params));
        reqIdx++;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyListSelt", params));
        
        SG_Send("Req_StageClear", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                StageManager.Rev_setStageInfo(NetManager.getResult(response, 2));
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, reqIdx), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_StageClear2 = function(stageArea, stageNumber, state, goldAmount, starRewardCode, starRewardCodeAmount, fireSkillAmount, iceSkillAmount, fastSkillAmount, handler) {
        
        var reqarr = [];
        var params = null;
        var reqIdx = 0;
        
        var goldCheckAmount;
        var starCheckAmount;
        
        if (ItemManager.itemFullCheck("GOLD", Number(goldAmount))) {
            goldCheckAmount = 0;
        } else {
            goldCheckAmount = goldAmount;
        }
        
        if (ItemManager.itemFullCheck(starRewardCode, Number(starRewardCodeAmount))) {
            starCheckAmount = 0;
        } else {
            starCheckAmount = starRewardCodeAmount;
        }
        
        var nextStageCode;
        if (stageNumber < 9) {
            nextStageCode = "stage_" + (stageArea + 1) + "_" + (stageNumber + 2);
        } else {
            nextStageCode = "stage_" + (stageArea + 2) + "_1";
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "stage_" + (stageArea + 1) + "_" + (stageNumber + 1);
        params["state"] = state;
        params["lev"] = 0;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageUpdt", params));
        reqIdx++;
        
        if (stageArea < StageManager.getLastStageArea()) {
            if (StageManager.getStageInfo()[stageArea][0] < -1) {
                params = {};
                params[PM_APP_ID] = GF_NET.appId;
                params[PM_USER_KEY] = GF_NET.userKey;
                params["code"] = nextStageCode;
                params["state"] = -1;
                params["lev"] = 0;
                reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageUpdt", params));
                reqIdx++;
            }
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "GOLD";
        params["amount"] = goldCheckAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = starRewardCode;
        params["amount"] = starCheckAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FIRE_SKILL";
        params["amount"] = fireSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "ICE_SKILL";
        params["amount"] = iceSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FAST_SKILL";
        params["amount"] = fastSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageSelt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyListSelt", params));
        
        SG_Send("Req_StageClear2", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                StageManager.Rev_setStageInfo(NetManager.getResult(response, reqIdx - 1));
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, reqIdx), response.dateTime, true);
            }
            handler(response);
        });
    };
    
    this.Req_LastStageClear = function(stageArea, stageNumber, state, goldAmount, starRewardCode, starRewardCodeAmount, fireSkillAmount, iceSkillAmount, fastSkillAmount, handler) {
        var reqarr = [];
        var params = null;
        var reqIdx = 0;
        
        var goldCheckAmount;
        var starCheckAmount;
        
        if (ItemManager.itemFullCheck("GOLD", Number(goldAmount))) {
            goldCheckAmount = 0;
        } else {
            goldCheckAmount = goldAmount;
        }
        
        if (ItemManager.itemFullCheck(starRewardCode, Number(starRewardCodeAmount))) {
            starCheckAmount = 0;
        } else {
            starCheckAmount = starRewardCodeAmount;
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "stage_" + (stageArea + 1) + "_" + (stageNumber + 1);
        params["state"] = state;
        params["lev"] = 0;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "StageSelt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "GOLD";
        params["amount"] = goldCheckAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = starRewardCode;
        params["amount"] = starCheckAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FIRE_SKILL";
        params["amount"] = fireSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "ICE_SKILL";
        params["amount"] = iceSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "FAST_SKILL";
        params["amount"] = fastSkillAmount;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyUpdt", params));
        reqIdx++;
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["rewardCode"] = "STAGE_CLEAR_FIRST_" + (stageArea + 1) + "_" + (stageNumber + 1);
        params["rewardLev"] = 0;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "RewardGive", params));
        reqIdx++;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(reqIdx, SVC_SNG, "ItemMyListSelt", params));
        
        SG_Send("Req_LastStageClear", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                StageManager.Rev_setStageInfo(NetManager.getResult(response, 1));
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, reqIdx), response.dateTime, true);
            }
            handler(response);
        });
    }
    
    //////////////////////////////////////
    //			   입장권 관련 함수		//
    //////////////////////////////////////
    this.Req_TokenUpdate = function(handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemPirodoUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "ENTRANCE_KEY";
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("ItemPirodoSelt", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                var jo = INSTANCE.getResult(response, 1)[0];
                TokenManager.Rev_setToken(jo.amount, response.dateTime, jo.dateEnd);
            }
            if (handler) handler(response);
        });
    };

    //////////////////////////////////////
    //			  결제 관련 함수들			//
    //////////////////////////////////////
    this.Req_PaymentBegin = function(prodCode, handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["prodCode"] = prodCode;
        params["paymentType"] = 0;

        SG_Send("ProdCodePaymentBegin", SVC_SNG, params, handler);
    };

    this.Req_PaymentEnd = function(prodCode, mon, recKey, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params[PM_REC_KEY] = recKey;
        params["mon"] = mon;
        params["prodCode"] = prodCode;
        params["state"] = 2;
//        params["orderId"] = orderId;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ProdCodePaymentEnd", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customType"] = "MONEY";
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("ProdCodePaymentEnd", reqarr, handler);
    };

    this.Req_PaymentFail = function(prodCode, mon, recKey, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params[PM_REC_KEY] = recKey;
        params["mon"] = mon;
        params["prodCode"] = prodCode;
        params["state"] = 1;
//        params["orderId"] = orderId;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ProdCodePaymentEnd", params));

        SG_Send("ProdCodePaymentEnd", reqarr, handler);
    };

    this.Req_ChargeMoney = function(code, amount, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = code;
        params["amount"] = amount;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "CashPointFreeCharge", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
//        params["customType"] = "MONEY";
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("Req_ChargeCash", reqarr, handler);
    };
	
	//////////////////////////////////////
    //	 	   EventHelper 관련 함수들	//
    //////////////////////////////////////
	
	this.Req_EventRewardGive = function(code, handler) {
		var reqarr = [];
        var params = null;
		
		params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["rewardCode"] = code;
        params["rewardLev"] = 0;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "RewardGive", params));
		
		params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));
		
		SG_Send("EventRewardGive", reqarr, handler);
	};
	
	this.Req_EventPackageRewardGive = function(code, amount, handler) {
	
		var reqarr = [];
		var params = null;
		var reqCnt = 0;
		
		console.error("amount ", amount);
		
		params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = "DIAMOND";
        params["amount"] = -amount;
        reqarr.push(GF_NET.makeBody(reqCnt, SVC_SNG, "ItemMyUpdt", params));
		reqCnt++;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(reqCnt, SVC_SNG, "ItemMyListSelt", params));
		reqCnt++;
		
		for (var i = 0; i < code.length; i++) {
			
			console.error("code >> ", code[i]);
			
			params = {};
			params[PM_APP_ID] = GF_NET.appId;
			params[PM_USER_KEY] = GF_NET.userKey;
			params["rewardCode"] = code[i];
			params["rewardLev"] = 0;
			reqarr.push(GF_NET.makeBody(reqCnt, SVC_SNG, "RewardGive", params));
			reqCnt++;
		}
		
		SG_Send("EventPackageRewardGive", reqarr, handler);
	};
    
    this.Req_PackageRewardGive = function(code, handler) {
        var reqarr = [];
        var params = null;
        
        console.error("code >> " +code);
        
        console.error("appId >> " + GF_NET.appId);
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["lev"] = 0;
        params["code"] = code;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemPurchase", params));
		
		params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["rewardCode"] = code;
        params["rewardLev"] = 1;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "RewardGive", params));
		
		params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyListSelt", params));
		
		SG_Send("Req_PackageRewardGive", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 2), response.dateTime, true);
                var jo = INSTANCE.getResult(response, 2)[0];
                TokenManager.Rev_setToken(jo.amount, response.dateTime, jo.dateEnd);
            }
            if (handler) handler(response);
        });
    };

    //////////////////////////////////////
    //	 	   MAILBOX 관련 함수들		//
    //////////////////////////////////////

    this.Req_GetNewMailCnt = function(handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["state"] = 0;

        SG_Send("MsgSeltCnt", SVC_SNG, params, handler);
    };

    this.Req_getMsgList = function(page, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["pageNo"] = page;
        params["pageSize"] = 4;
        params["read"] = "T";
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MsgSeltPage", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "MsgSeltCnt", params));

        SG_Send("MsgSeltPage", reqarr, handler);
    };
    
    this.Req_MsgList = function(handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["pageNo"] = 1;
        params["pageSize"] = MessageManager.getMsgCnt();
        params["read"] = "T";

        SG_Send("MsgSeltPage", SVC_SNG, params, handler);
    };

    this.Req_getRewardAll = function(handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MsgAtcmAllRecv", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("MsgAtcmAllRecv", reqarr, handler);
    };

    this.Req_getReward = function(recKey, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["recKey"] = recKey;
        params["state"] = 3;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MsgUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("MsgAtcmRecv", reqarr, handler);
    };

    this.Req_deleteMessage = function(recKey, handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["recKey"] = recKey;
        params["state"] = 4;

        SG_Send("MsgUpdt", SVC_SNG, params, handler);
    };

    this.Req_ItemGain = function(code, lev, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params[PM_SVCA_ID] = GF_NET.svcaId;
        params["code"] = code;
        params["lev"] = lev;
        params["usingForm"] = "GIFTBOX";
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "ItemGain", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("ItemPurchase", reqarr, handler);
    };
    
    //////////////////////////////////////
    //		    일일 퀘스트 관련 함수	 //
    //////////////////////////////////////	
    
    this.Req_QuestInit = function(handler) {
        var reqarr = [];
        var params = null;
        
        var questArr = [];
        for (var i = 0; i < 6; i++) {
            var questParams = {};
            questParams["code"] = "DAILY_MISSION_" + i;
            questParams["lev"] = 0;
            questArr.push(questParams);
        }
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["missionList"] = questArr;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MissionListInit", params));

        SG_Send("Req_QuestInit", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
            }
            if (handler) handler(response);
        });
    };
    
    this.Req_QuestUpdate = function(code, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = code;
        params["lev"] = 0;
        params["currentValue"] = 1;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MissionUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "MissionSelt", params));

        SG_Send("Req_QuestUpdate", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                QuestManager.Rev_QuestInfo(INSTANCE.getResult(response, 1));
            }
            if (handler) handler(response);
        });
    };
    
    this.Req_QuestUpdates = function(code, count, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = code;
        params["lev"] = 0;
        params["currentValue"] = count;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MissionUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "MissionSelt", params));

        SG_Send("Req_QuestUpdate", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                QuestManager.Rev_QuestInfo(INSTANCE.getResult(response, 1));
            }
            if (handler) handler(response);
        });
    };
    
    this.Req_QuestReward = function(code, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["code"] = code;
        params["lev"] = 0;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "MissionRewardUpdt", params));

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "MissionSelt", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(2, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("Req_QuestUpdate", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                QuestManager.Rev_QuestInfo(INSTANCE.getResult(response, 1));
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 2), response.dateTime, true);
                var jo = INSTANCE.getResult(response, 2)[0];
                TokenManager.Rev_setToken(jo.amount, response.dateTime, jo.dateEnd);
            }
            if (handler) handler(response);
        });
    };

    //////////////////////////////////////
    //		    실시간 메시지 관련 함수	 //
    //////////////////////////////////////	
    this.Req_GetNoticeMsg = function(sleepTime, handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params["fromUserKey"] = GF_NET.userKey;
        params["myMsgFlag"] = "N";
        params["msgCnt"] = 10;
        params["effectiveTime"] = Math.floor(sleepTime / 1000);

        SG_Send("NoticeMsgSelt", SVC_SNG, params, handler);
    };

    this.Req_InsertNoticeMsg = function(msg, handler) {
        var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params["code"] = "ALL_NOTICE";
        params["fromUserKey"] = GF_NET.userKey;
        params["msgContents"] = msg;
        params["msgUseFlag"] = "Y";

        SG_Send("NoticeMsgInsert", SVC_SNG, params, handler);
    };
    
    //////////////////////////////////////
    //		    친구초대 관련 함수		   //
    //////////////////////////////////////	
    this.Req_RandomFriendSelt = function(handler) {
         var params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["count"] = "5";

        SG_Send("AppIdRandomFriendsSelt", SVC_SNG, params, handler);
    };
    
    this.Req_RewardGive = function(code, handler) {
        var reqarr = [];
        var params = null;

        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["rewardCode"] = code;
        params["rewardLev"] = 0;
        reqarr.push(GF_NET.makeBody(0, SVC_SNG, "RewardGive", params));
        
        params = {};
        params[PM_APP_ID] = GF_NET.appId;
        params[PM_USER_KEY] = GF_NET.userKey;
        params["customSort"] = itemSort;
        reqarr.push(GF_NET.makeBody(1, SVC_SNG, "ItemMyListSelt", params));

        SG_Send("Req_RewardGive", reqarr, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(INSTANCE.getResult(response, 1), response.dateTime, true);
                var jo = INSTANCE.getResult(response, 1)[0];
                TokenManager.Rev_setToken(jo.amount, response.dateTime, jo.dateEnd);
            }
            if (handler) handler(response);
        });
    };
    
    
    
    
    
    
    
    
    

    var SG_Send = function() {
        if (arguments.length === 3) {
            var cmd = arguments[0], parmObj = arguments[1], handler = arguments[2];
            GF_Send(cmd, parmObj, handler);
        } else if (arguments.length === 4) {
            var funcId = arguments[0], svcId = arguments[1], parmObj = arguments[2], handler = arguments[3];
            GF_Send(funcId, svcId, parmObj, handler);
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////

    var itemSort = "\"exp\" DESC, \"lev\" DESC, \"code\" DESC";
    ////////////////////////////////////////////////////////////////////////////
    var GF_Send = function() {
        GF_NET.Req_Send.apply(GF_NET, arguments);
    };

    this.isSuccess = function(jObj) {
        return HTool.getBoolean(jObj[PM_SUCCESS]);
    };
    this.getResult = function(response, index) {
        return response.results[index].results.result;
    };
    this.getEventResult = function(response, index) {
        return response.results[index].results.eventResult;
    }
    this.getResultRank = function(data, index) {
        return data["results"][index]["results"];
    };
    this.getReward = function(data, index) {
        return data["results"][index]["results"]["result"]["rewardContents"];
    };

    this.getUsrKey = function() {
        return GF_NET.userKey;
    };
    this.getRsPath = function() {
        return GF_NET.ConnectionData.envVars.webHost + "/" + GF_NET.ConnectionData.envVars.webBase;
    };

    var INSTANCE = this;
    var PM_SVCA_ID = "svcaId";
    var PM_SVC_ID = "svcId";
    var PM_FUNC_ID = "funcId";
    var PM_APP_ID = "appId";
    var PM_REC_KEY = "recKey";
    var PM_USER_KEY = "userKey";
    var PM_STAY_MON = "stayMon";
    var PM_PARAMS = "params";
    var PM_REQUEST = "requests";
    var PM_SUCCESS = "success";
};

var netMgr = NetManager;