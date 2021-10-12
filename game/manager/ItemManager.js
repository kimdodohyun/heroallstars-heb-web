var ItemManager = new function() {

    function constructor() {
//        loadItemName();

        setGoldAmount(5000);
        setGemAmount(20);
        setMagicStoneAmount(3);
        setHyperStoneAmount(3);
        this.synchronizeMoneyAmount();
    }
    
    ////////////////////////////////////////////
    //				 네트워크 관련				  //
    ////////////////////////////////////////////

    this.Rev_AllItem = function(arr, dateTime, sync) {
        var tmp = [];
        for (var i = 0; i < 3; i++)
            tmp[i] = [];
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            
            if (obj.customType == "MONEY") {
                tmp[0].push(obj);
            } else if (obj.customType == "HERO") {
                tmp[1].push(obj);
            } else if (obj.code == "INVENTORY_SLOT") {
                this.Rev_inventoryAmount(obj);
            } else if (obj.code.indexOf("ENTRANCE") == 0) {
                tmp[2].push(obj);
                console.error("key >> " + tmp[2][0].amount);
            } else if (obj.code == "FIRE_SKILL") {
                this.Rev_setHelpItem(obj, dateTime);
            } else if (obj.code == "ICE_SKILL") {
                this.Rev_setHelpItem(obj, dateTime);
            } else if (obj.code == "FAST_SKILL") {
                this.Rev_setHelpItem(obj, dateTime);
            }
        }
        
        ItemManager.Rev_SetMoneys(tmp[0], false);
        HeroManager.Rev_HeroInfo(tmp[1]);
        if (sync) ItemManager.synchronizeMoneyAmount();
    };

    /**
     * 서버에서 화폐 정보를 받아 설정한다.
     * 인벤토리는 갱신하지 않는다.
     * @param arr 서버에서 받아온 정보
     */
    this.Rev_SetMoneys = function(arr, sync) {
        for (var i = 0; i < arr.length; i++) {
            this.Rev_SetMoney(arr[i], false);
        }
        if (sync) {
            this.synchronizeMoneyAmount();
        }
    };

    /**
     * 서버에서 화폐 정보를 받아 설정한다.
     * 인벤토리는 갱신하지 않는다.
     * @param obj 서버에서 받아온 정보
     */
    var Rev_SetMoneyObj = function(obj, sync) {
        var code = obj.code;
        if (code == "GOLD") {
            setGoldAmount(obj.amount);
        } else if (code == "GEM") {
            setGemAmount(obj.amount);
        } else if (code == "BLUE_STONE") {
            setBlueStoneAmount(obj.amount);
        } else if (code == "RED_STONE") {
            setRedStoneAmount(obj.amount);
        } else if (code == "BLACK_STONE") {
            setBlackStoneAmount(obj.amount);
        } else if (code == "MAGIC_STONE") {
            setMagicStoneAmount(obj.amount);
        } else if (code == "HYPER_STONE") {
            setHyperStoneAmount(obj.amount);
        }
        if (sync) {
            ItemManager.synchronizeMoneyAmount();
        }
    };
    
    var Rev_SetMoneyArr = function (arr, sync) {
        for(var i=0; i<arr.length; i++) {
            Rev_SetMoneyObj(arr[i], false);
        }if(sync) {
            ItemManager.synchronizeMoneyAmount();
        }
    }

    this.Rev_SetMoney = function (obj, sync) {
        if(Array.isArray(obj)) {
            Rev_SetMoneyArr(obj, sync);
        } else {
            Rev_SetMoneyObj(obj, sync);
        }
    };

    this.Rev_inventoryAmount = function(obj) {
        if (obj.code == "INVENTORY_SLOT") {
            inventoryAmount = obj.amount - 0;
        }
    };

    this.Rev_setHelpItem = function(obj, dateTime) {
        var code = obj.code;
        if (code == "FIRE_SKILL") {
            UnitManager.setSkillCnt(0, Number(obj.amount));
        } else if (code == "ICE_SKILL") {
            UnitManager.setSkillCnt(1, Number(obj.amount));
        } else if (code == "FAST_SKILL") {
            UnitManager.setSkillCnt(2, Number(obj.amount));
        }
    };
    
    this.itemFullCheck = function(code, _amount) {
        
        var amount = Number(_amount);
        
        if (code == "GEM") {
            if (gemAmount + amount > 99999) return true;
        } else if (code == "GOLD") {
            if (goldAmount + amount > 999999) return true;
        } else if (code == "ENTRANCE_KEY") {
            if (Number(tokenMgr.getAmount()) + amount > 99999) return true;
        } else if (code == "MAGIC_STONE") {
            if (magicStoneAmount + amount > 99999) return true;
        } else if (code == "HYPER_STONE") {
            if (hyperStoneAmount + amount > 99999) return true;
        } else if (code == "BLACK_STONE") {
            if (blackStoneAmount + amount > 99999) return true;
        } else if (code == "BLUE_STONE") {
            if (blueStoneAmount + amount > 99999) return true;
        } else if (code == "RED_STONE") {
            if (redStoneAmount + amount > 99999) return true;
        } else if (code == "FIRE_SKILL") {
            if (UnitManager.getSkillCnt(0) + amount > 999) return true;
        } else if (code == "ICE_SKILL") {
            if (UnitManager.getSkillCnt(1) + amount > 999) return true;
        } else if (code == "FAST_SKILL") {
            if (UnitManager.getSkillCnt(2) + amount > 999) return true;
        }
        
        return false;
    };


    //////////////////////////////////////
    //			  캐시상품 관련				//
    //////////////////////////////////////
    var cashProducts;

    this.setCashProductInfo = function(jarr) {
        cashProducts = [];
        for (var i = 0; i < jarr.length; i++) {
            cashProducts[i] = new CashProductInfo(jarr[i]);
        }
    };

    this.getCashProducts = function() {
        return cashProducts;
    };


    //////////////////////////////////////
    //				화폐 관련				//
    //////////////////////////////////////

    var goldAmount = 0;
    var gemAmount = 0;
    var blueStoneAmount = 0;
    var redStoneAmount = 0;
    var blackStoneAmount = 0;
    var magicStoneAmount = 0;
    var hyperStoneAmount = 0;
    var goldAmountForRender = 0;
    var gemAmountForRender = 0;

    var exchangeRate = 0.008;

    this.getExchangeRate = function() {
        return exchangeRate;
    };
    this.getGoldAmount = function() {
        return goldAmount;
    };
    this.getGemAmount = function() {
        return gemAmount;
    };
    this.getBlueStoneAmount = function() {
        return blueStoneAmount;
    };
    this.getRedStoneAmount = function() {
        return redStoneAmount;
    };
    this.getBlackStoneAmount = function() {
        return blackStoneAmount;
    };
    this.getMagicStoneAmount = function() {
        return magicStoneAmount;
    };
    this.getHyperStoneAmount = function() {
        return hyperStoneAmount;
    };
    this.getGoldAmountForRender = function() {
        return goldAmountForRender;
    };
    this.getGemAmountForRender = function() {
        return gemAmountForRender;
    };
    this.getMoneyAmount = function(code) {
        if (code == "GEM") return this.getGemAmount();
        else if (code == "GOLD") return this.getGoldAmount();
        else if (code == "MAGIC_STONE") return this.getMagicStoneAmount();
        else if (code == "HYPER_STONE") return this.getHyperStoneAmount();
        else return 0;
    };
    
    this.checkPrice = function(code, price) {
        
        if (code == "GEM") return this.getGemAmount() - price;
        else if (code == "GOLD") return this.getGoldAmount() - price;
        else if (code == "MAGIC_STONE") return this.getMagicStoneAmount() - price;
        else if (code == "HYPER_STONE") return this.getHyperStoneAmount() - price;
        else if (code == "BLUE_STONE") return this.getBlueStoneAmount() - price;
        else if (code == "RED_STONE") return this.getRedStoneAmount() - price;
        else if (code == "BLACK_STONE") return this.getBlackStoneAmount() - price;
        else if (code == "ENTRANCE_KEY") return tokenMgr.getAmount() - price;
        else return 0;
    };

    var setGoldAmount = function(amount) {
        goldAmount = amount - 0;
    };
    var setGemAmount = function(amount) {
        gemAmount = amount - 0;
    };
    var setBlueStoneAmount = function(amount) {
        blueStoneAmount = amount - 0;
    };
    var setRedStoneAmount = function(amount) {
        redStoneAmount = amount - 0;
    };
    var setBlackStoneAmount = function(amount) {
        blackStoneAmount = amount - 0;
    };
    var setMagicStoneAmount = function(amount) {
        magicStoneAmount = amount - 0;
    };
    var setHyperStoneAmount = function(amount) {
        hyperStoneAmount = amount - 0;
    };
    this.synchronizeMoneyAmount = function() {
        goldAmountForRender = goldAmount;
        gemAmountForRender = gemAmount;
    };

    this.getcoinStr = function(code) {
        if (code == "GEM") return "gem";
        else if (code == "GOLD") return "gold";
        else if (code == "MAGIC_STONE") return "magic";
        else if (code == "HYPER_STONE") return "hyper";
        else if (code == "BLUE_STONE") return "blue";
        else if (code == "RED_STONE") return "red";
        else if (code == "BLACK_STONE") return "black";
        return "";
    };

    /**
     * 아이템을 다이아를 포함해 구매한다.
     * @param code 구매할 아이템의 서버코드 (ex> ITEM_FASTSTART_0)
     * @param handler 요청이 완료되었을 때 불릴 핸들러.
     */
    this.buyItemExchange = function(code, handler) {
        var lackAmount = PriceManager.getPaymentPrice(code) - this.getGoldAmount();
        HLog.info("paymentPrice(" + code + ") :: " + PriceManager.getPaymentPrice(code), this);
        HLog.info("lackAmount :: " + lackAmount, this);

        if (Math.ceil(lackAmount * exchangeRate) > ItemManager.getGemAmount()) {
            handler.onFailedByNoMoney(new MoneyLackData("GEM", Math.ceil(lackAmount * exchangeRate) - ItemManager.getGemAmount(), code));
            return;
        }

        NetManager.Req_ExchangeItemPurchase(code, lackAmount, function(response) {
            if (NetManager.isSuccess(response)) {
                ItemManager.Rev_AllItem(NetManager.getResult(response, 2), response.dateTime, true);
                handler.onBuyComplete(null);
            } else {
                handler.onFailedByNetError(response.errCode);
            }
        });
    };

    //////////////////////////////////////
    //			   인벤토리 관련				//
    //////////////////////////////////////
    var inventoryAmount = 15;
    this.getOpenedInventory = function() {
        return inventoryAmount;
    }

    //////////////////////////////////
    //			아이템 관련				//
    //////////////////////////////////
    var itemNameMap;
    var loadItemName = function() {
        var tmps = NetManager.ajaxRequest(ROOT_PROP + "itemName.csv").split('\n');
        itemNameMap = new Map();
        for (var i = 0; i < tmps.length; i++) {
            var tmp = tmps[i].split(',');
            itemNameMap.put(tmp[0], tmp[1]);
        }
    };

    this.getItemName = function(code) {
        return itemNameMap.get(code);
    };
    
    this.getItemAmountbyServerAmount = function(code, amount) {
        if ("GOLDMON_SEARCH" == code) return Math.floor(amount / 1440) + "일";
        else return amount + "개";
    };

    this.moneyLackProcess = function(moneyLackData, handler) {
        if (moneyLackData.equalCode("GEM")) {
            PopupMgr.openPopup(StarmonManager.getMessage2BtnPopup("보석이 부족합니다.|충전하시겠습니까?"), function(code, data) {
                PopupMgr.closeAllPopup();
                if (data == 0) PopupMgr.openPopup(POPUP.POP_BUYDIAMONDLIST);
            });
        } else {
            POPUP.POP_LACKOFGOLD.getInstance().setAmount(moneyLackData.getLackAmount());
            PopupMgr.closeAllPopup();
            PopupMgr.openPopup(POPUP.POP_LACKOFGOLD, function(code, data_0) {
                if (data_0 == "0") {
                    PopupMgr.closeAllPopup();
                    PopupMgr.openPopup(StarmonManager.getMessage0BtnPopup("구매 처리중입니다."), null);
                    ItemManager.buyItemExchange(moneyLackData.getBuyItemcode(), handler);
                } else {
                    PopupMgr.closeAllPopup();
                }
            });
        }
    };


    this.destroy = function() {
        cashProducts = null;
    };

    constructor.apply(this);
};

var itemMgr = ItemManager;