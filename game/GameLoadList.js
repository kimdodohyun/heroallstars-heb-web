/* 
 * Init 단계에서 로딩할 스크립트 리스트.
 */

function loadStarmonScripts(onload) {
    HMFLoader.load([
        /** CustomClass */
        "com/hgnifrix/util/Map.js",
        "com/hgnifrix/skkwon/util/SGUtil.js",
        "com/hgnifrix/util/YUtil.js",
        "com/hgnifrix/util/MovingEquation.js",
        "com/hgnifrix/skkwon/util/NumberFontImage.js",
        "com/hgnifrix/skkwon/util/NumberFontImg_5x2.js",

        /* Support Loading */
        "game/support/Panner.js",
        "game/support/HRandom.js",
        "game/support/PlayZapi.js",
		// "game/support/EventHelper.js"

//        "game/NetManager.js",
        /* Unit Module Loading */
        "game/unit/Unit.js",
        "game/unit/UnitInfo.js",
        "game/unit/StageInfo.js",
        "game/unit/MeleeUnit.js",
        "game/unit/RangeUnit.js",
        "game/unit/EnemyUnit.js",
        "game/unit/FireSkillAction.js",
        "game/unit/Missile.js",
        /* Info Loading */
        "game/info/UserInfo.js",
        "game/info/MyInfo.js",
        "game/info/CashProductInfo.js",
        /* Manager Loading */
        "game/manager/PlayResManager.js",
        "game/manager/GameEngine.js",
        "game/manager/UnitManager.js",
        "game/manager/ItemManager.js",
        "game/manager/HeroManager.js",
        "game/manager/NoticeManager.js",
        "game/manager/TokenManager.js",
        "game/manager/CommonUIDrawManager.js",
        "game/manager/StageManager.js",
        "game/manager/MessageManager.js",
        "game/manager/QuestManager.js",
        /* Popup Loading */
        "game/popup/MessagePopup.js",
        "game/popup/SelectUnitPopup.js",
        "game/popup/MailPopup.js",
        "game/popup/HeroLevelUpPopup.js",
        "game/popup/HeroRankUpPopup.js",
        "game/popup/HeroSellPopup.js",
        "game/popup/PurchasePopup.js",
        "game/popup/SkillPurchasePopup.js",
        "game/popup/ResultPopup.js",
        "game/popup/InputPasswordPopup.js",
        "game/popup/NoticePopup.js",
        "game/popup/WaitingPopup.js",
        "game/popup/QuestPopup.js",
        "game/popup/DailyItemMonthPopup.js",
        "game/popup/SkillEffectPopup.js",
        "game/popup/SummonChancePopup.js",
        "game/popup/PlayZPurchasePopup.js",
        "game/popup/PlayZClausePopup.js",
        "game/popup/PlayZVerificationPopup.js",
        
        /* Scene Loading */
        "game/scene/EntryScene.js",
        "game/scene/TitleScene.js",
        "game/scene/WorldScene.js",
        "game/scene/InvenScene.js",
        "game/scene/LoadingScene.js",
        "game/scene/ChangerScene.js",
        "game/scene/ReadyScene.js",
        "game/scene/GameScene.js",
        "game/scene/SummonScene.js",
        "game/scene/ShopScene.js",
        "game/scene/RaidScene.js",
        "game/scene/MonsterBookScene.js",
        
        /* Tutorial Loading */
        "game/tutorial/TutorialManager.js",
        "game/tutorial/TutorialScene.js",
        "game/tutorial/TutorialPopup.js"
        
        /** ExtraVars */
    ], function () {
        // Scene 등록
        SCENE.SC_ENTRY = EntryScene;
        SCENE.SC_TITLE = TitleScene;
        SCENE.SC_WORLD = WorldScene;
        SCENE.SC_INVEN = InvenScene;
        SCENE.SC_LOADING = LoadingScene;
        SCENE.SC_CHANGER = ChangerScene;
        SCENE.SC_READY = ReadyScene;
        SCENE.SC_GAME = GameScene;
        SCENE.SC_SUMMON = SummonScene;
        SCENE.SC_SHOP = ShopScene;
        SCENE.SC_RAID = RaidScene;
        SCENE.SC_MONSTERBOOK = MonsterBookScene;
        SCENE.SC_TUTORIAL = TutorialScene;

        //popup 등록
        POPUP.POP_MSG_0BTN = Message0BtnPopup;
        POPUP.POP_MSG_1BTN = Message1BtnPopup;
        POPUP.POP_MSG_2BTN = Message2BtnPopup;
        POPUP.POP_INVEN_1BTN = Inven1BtnPopup;
        POPUP.POP_INVEN_2BTN = Inven2BtnPopup;
        POPUP.POP_INPUTPASSWORD = InputPasswordPopup;
        POPUP.POP_GET_MAIL_ITEM = GetMailItemPopup;
        POPUP.POP_NOTICE = NoticePopup;
        POPUP.POP_WAITING = WaitingPopup;
        
        POPUP.POP_SELECT_UNIT = SelectUnitPopup;
        POPUP.POP_MAILBOX = MailPopup;
        POPUP.POP_HEROLEVELUP = HeroLevelUpPopup;
        POPUP.POP_HERORANKUP = HeroRankUpPopup;
        POPUP.POP_HEROSELL = HeroSellPopup;
        POPUP.POP_PURCHASE = PurchasePopup;
        POPUP.POP_SKILLPURCHASE = SkillPurchasePopup;
        POPUP.POP_RESULT = ResultPopup;
        POPUP.POP_QUEST = QuestPopup;
        POPUP.POP_TUTORIAL = TutorialPopup;
        POPUP.POP_DAILYITEMMONTH = DailyItemMonthPopup;
        POPUP.POP_SKILLEFFECT = SkillEffectPopup;
        POPUP.POP_SUMMONCHANCE = SummonChancePopup;

        POPUP.POP_PLAYZ_PURCHASE = PlayZPurchasePopup;
        POPUP.POP_PLAYZ_CLAUSE = PlayZClausePopup;
        POPUP.POP_PLAYZ_VERIFICATION = PlayZVerificationPopup;
        onload();
    }, function (err) {
        GameManager.openDisconnectPopup("JS Load Fail!!!!", this);
    });
}

