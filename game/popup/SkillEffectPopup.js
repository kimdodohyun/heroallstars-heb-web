// Strict Mode On (엄격모드)
"use strict";
"use warning";

var SkillEffectPopup = new function() {
    var INSTANCE = this;
    var listener;
    var frameCnt = 0;
    var type;
    
    var characterX;
    var textX;
    var easeInX;

    var skill_effect_character;
    var skill_effect_text;
    
    var characterWidth;
    var textWidth;
    
    this.setResource = function(onload) {
        
        skill_effect_character = [];
        skill_effect_text = [];

        var imgParam = [
            [skill_effect_character = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_effect_", "_1" + EXT_PNG, 3)],
            [skill_effect_text = [], HTool.getURLs(ROOT_IMG, "game/skill/skill_effect_", EXT_PNG, 3)]
        ];
        
        ResourceMgr.makeImageList(imgParam, function() {
            imgParam = null;
            characterWidth = skill_effect_character[0].width;
            textWidth = skill_effect_text[0].width;
            onload();
        }, function(err) {
            onload();
            appMgr.openDisconnectPopup("SkillEffectPopup setResource Fail", this);
        });
    };
    
    this.clear = function() {
        skill_effect_character = null;
        skill_effect_text = null;
    };
    
    this.setType = function(_type) {
        type = _type;
    };
    
    return {
        toString: function() {
            return "SkillEffectPopup";
        },
        init: function(onload, callback) {
            frameCnt = 0;
            characterX = -characterWidth;
            textX = -textWidth;
            listener = callback;
            onload();
        },
        start: function() {

        },
        run: function() {
            if (frameCnt < 40) {
                
                if (frameCnt < 10) {
                    characterX = Panner.easeOutBack(frameCnt, -characterWidth, characterWidth - 5, 10);
                } else if (frameCnt > 9 && frameCnt < 20) {
                    textX = Panner.easeOutBack(frameCnt - 10, -textWidth, textWidth + (Math.floor(SCREEN_WIDTH / 2) - Math.floor(textWidth / 2)), 10);
                } else if (frameCnt > 19 && frameCnt < 30) {
                    easeInX = textX;
                } else if (frameCnt > 29 && frameCnt < 40) {
                    textX = Panner.easeInBack(frameCnt - 30, easeInX, textWidth + (Math.floor(SCREEN_WIDTH / 2) - Math.floor(textWidth / 2)), 10);
                }
                
                frameCnt++;
            } else {
                if (listener) listener(INSTANCE, 0);
            }
            UIMgr.repaint();
        },
        paint: function() {
            g.drawImage(skill_effect_character[type], characterX, 31); //0
            g.drawImage(skill_effect_text[type], textX, 265); //400
        },
        stop: function() {
        },
        onKeyPressed: function(key) {
            switch(key) {
                case KEY_ENTER :
                    break;
            }
        },
        onKeyReleased: function(key) {
            switch(key) {
                case KEY_ENTER :
                    break;
            }
        },
        getInstance: function() {
            return INSTANCE;
        }
    };
};