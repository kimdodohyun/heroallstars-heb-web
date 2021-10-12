// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 */

var TutorialPopup = new function() {
    var INSTANCE = this;
    
    return {
        toString: function() {
            return "TutorialPopup";
        },
        init: function(onload) {
            onload();
        },
        start: function() {

        },
        run: function() {
            UIMgr.repaint();
        },
        paint: function() {
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