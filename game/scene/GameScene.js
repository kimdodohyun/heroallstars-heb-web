"use strict";
"use warning";

var GameScene = new function() {    
    var INSTANCE = this;
    // Image
    var iframe;
    var stage_title;
    var stage_num;
    
    var movePos = 0;
    var moveCnt = 0;
    
    this.load = function(onload) {
        
        var onloadCnt = 0;
        var checkOnload = function () {
            onloadCnt++;
            if (onloadCnt == 2) {
                onload();
            }
        };
        
        if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
            setResource(checkOnload);
        } else if (GameEngine.getGameMode() == GAME_MODE_RAID) {
            setResourceForRaid(checkOnload);
        }
        POPUP.POP_SKILLEFFECT.getInstance().setResource(checkOnload);
    };
    
    
    var setResourceForRaid = function(onload) {
        
        var stageFrame = "world/" + UnitManager.getStageName();
        
		var imgParam = [
			[iframe = new Image(), ROOT_IFRAME + stageFrame + EXT_IFRAME],
            [stage_title = new Image(), ROOT_IMG + "game/etc/stage_raid_0" + EXT_PNG],
            [stage_num = new Image(), ROOT_IMG + "game/etc/stage_num_1" + EXT_PNG],
		];

		ResourceMgr.makeImageList(imgParam, function() {
			imgParam = null;
            PlayResManager.setResourceForDefence(HeroManager.getMyHeroInfo(), UnitManager.getEnUnitInfo(), function() {
                GameEngine.setResource(onload);
            });
		}, function(err) {
			appMgr.openDisconnectPopup("GameScene setResource Fail!!");
            onload();
		});
    };
    
	var setResource = function(onload) {
        
        var stageNum = 0;

        if (UnitManager.getStageNum() < 3) {
            stageNum = 0;
        }
        
        var stageFrame = "world/" + UnitManager.getStageName();
        
		var imgParam = [
			[iframe = new Image(), ROOT_IFRAME + stageFrame + EXT_IFRAME],
            [stage_title = new Image(), ROOT_IMG + "game/etc/stage_title_" + UnitManager.getStageArea() + EXT_PNG],
            [stage_num = new Image(), ROOT_IMG + "game/etc/stage_num_" + UnitManager.getStageNum() + EXT_PNG],
		];

		ResourceMgr.makeImageList(imgParam, function() {
			imgParam = null;
            PlayResManager.setResourceForDefence(HeroManager.getMyHeroInfo(), UnitManager.getEnUnitInfo(), function() {
                GameEngine.setResource(onload);
            });
		}, function(err) {
			appMgr.openDisconnectPopup("GameScene setResource Fail!!");
            onload();
		});
	};
    
    var fps = 0;

	return {
		toString: function() {
			return "GameScene";
		},
		init: function(onload, loadData) {
            fps = 12;
            UIMgr.setFPS(fps);
            onload();
		},
		start: function() {
//            appMgr.loopNetSound(ROOT_SOUND + "stage_" + UnitManager.getStageArea() + EXT_MP3);
		},
		run: function() {
            moveCnt++;
            GameEngine.update();
			UIMgr.repaint();
		},
		paint: function() {
            
            if (UnitManager.getIsFireSkill()) {
                if (moveCnt % 2 == 0) {
                    movePos+=10;
                } else {
                    movePos-=10;
                }
                g.drawImage(iframe, 0 + movePos, 0);
            } else {
                g.drawImage(iframe, 0, 0);
            }
			
            g.drawImage(stage_title, 15, 13);
            if (GameEngine.getGameMode() == GAME_MODE_DEFENCE) {
                g.drawImage(stage_num, stage_title.width + 14, 14);
            }
            GameEngine.render(g);
		},
		dispose: function() {

		},
		stop: function() {
            iframe = null;
            stage_title = null;
            stage_num = null;
            appMgr.stopSound();
            GameEngine.stop();
            POPUP.POP_SKILLEFFECT.getInstance().clear();
		},
		onKeyPressed: function(key) {
            GameEngine.keyAction(key);
		},
		onKeyReleased: function(key) {

		},
		getInstance: function() {
			return INSTANCE;
		}
	};
};