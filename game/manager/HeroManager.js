var HeroManager = new function () {
    var heroInfos;
    var heroBook;
    var randomAvailable;
    var hasHero;
    var inventory;
    var heroJson;
    var stageJson;
    var dailyJson;
    var raidJson;
    
    var checkArr;

    var curHero;
    var invenLength;
    var curHeroPosition;
    var gradeStr = ["D급", "C급", "B급", "A급", "S급", "S+급"];

    function constructor() {
        heroJson = JSON.parse(NetManager.ajaxRequest(ROOT_PROP + "unit.json"));
        stageJson = JSON.parse(NetManager.ajaxRequest(ROOT_PROP + "stage.json"));
        dailyJson = JSON.parse(NetManager.ajaxRequest(ROOT_PROP + "daily.json"));
        raidJson = JSON.parse(NetManager.ajaxRequest(ROOT_PROP + "raid.json"));
        heroInfos = [];
        heroBook = [];
        checkArr = new ArrayList();
        inventory = new Array(72);
    }

    constructor();

    this.Rev_HeroInfo = function (arr) {
        hasHero = [];
        
        for (var i = 0; i < arr.length && i < inventory.length; i++) {
            var obj = arr[i];
            var idx = obj.code.split('_')[1] - 0;
            
            var hObj = heroJson[idx];
            hasHero[i] = new UnitInfo(hObj.res, hObj.grade, hObj.attack, hObj.attackInc, hObj.attackRange, hObj.splashRange, hObj.attackSpd, hObj.critical, hObj.moveSpd, hObj.type, hObj.attr, hObj.skill, hObj.skillCoolTime, hObj.isSplash, hObj.name, obj.code, obj.recKey, obj.lev, obj.exp, hObj.present, hObj.weaponName);
        }
        
        var temp;
        for (var i = 0; i < hasHero.length - 1; i++) {
            for (var j = 0; j < hasHero.length - 1 - i; j++) {
                if (hasHero[j].getGrade() < hasHero[j + 1].getGrade()) {
                    temp = hasHero[j];
                    hasHero[j] = hasHero[j + 1];
                    hasHero[j + 1] = temp;
                }
            }
        }
        
        if (checkArr.size() > 0) {
            for (var i = 0; i < hasHero.length; i++) {
                for (var j = 0; j < checkArr.size(); j++) {
                    if (hasHero[i].getRecKey() == checkArr.get(j)) {
                        hasHero[i].setCheck(true);
                    }
                }
            }
        }
    };
    
    this.addCheckRecKey = function(recKey) {
        checkArr.add(recKey);
    };
    
    this.removeCheckRecKey = function(recKey) {
        for (var i = 0; i < checkArr.size(); i++) {
            if (checkArr.get(i) == recKey) {
                checkArr.removeIndex(i);
            }
        }
    };
    
    this.getAllHeroAmount = function () {
        return heroJson.length;
    };
    this.getMyHeroAmount = function() {
        return hasHero.length;
    };
    this.getGradeStr = function (grade) {
        return gradeStr[grade];
    };
    this.getAllHeroInfo = function () {
        return heroJson;
    };
    this.getMyHeroInfo = function() {
        return hasHero;
    };
    
    this.getStageJson = function() {
        return stageJson;
    };
    
    this.getDailyJson = function() {
        return dailyJson;
    };
    
    this.getRaidJson = function() {
        return raidJson;
    };
    
    this.hasHeroRimitCheck = function(_amount) {
        var amount = Number(_amount);
        if ((hasHero.length + amount) <= inventory.length) {
            return false;
        } else {
            return true;
        }
    };

    //////////////////////////////////
    //			도감 관련 함수			//
    //////////////////////////////////

    /**
     * 현재 카드를 보유하고 있는지 여부 (도감에서 사용)
     * @param type 카드 인덱스
     * @param level 카드 레벨
     * @return 보유 여부
     */
//    this.hasHero = function (type) {
//        return hasHero[type];
//    };

    this.getHeroBookLength = function () {
        return heroBook.length;
    };
    this.getHeroBookHero = function (idx) {
        return heroBook[idx];
    };

    //////////////////////////////////////
    //			인벤토리 관련 함수			//
    //////////////////////////////////////
    var invenFocusedRecKey = -1;
    var invenFocusedPosition = 0;

    this.getInventoryLength = function () {
        return inventory.length;
    };
    this.getHeroInInventory = function (idx) {
        return inventory[idx];
    };
    this.setInvenFocusRecKey = function (recKey, defPos) {
        invenFocusedRecKey = recKey;
        invenFocusedPosition = defPos;
    };
    this.getInventoryFocusPos = function () {
        return invenFocusedPosition;
    };

    this.destroy = function () {
        heroInfos = null;
        heroBook = null;
        hasHero = null;
        inventory = null;
        gradeStr = null;
        checkArr.clear();
        checkArr = null;
    };
};

var heroMgr = HeroManager;