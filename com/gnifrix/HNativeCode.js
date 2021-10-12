// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @description Javascript Native Code Overriding
 * @author Lazuli
 * @since 2015.10.28
 */

/*
 * DrawImage
 */
var originDrawImage = CanvasRenderingContext2D.prototype.drawImage;

//CanvasRenderingContext2D.prototype.drawImage = function() {
//    if (Object.prototype.toString.call(arguments[0]) == "[object HTMLImageElement]") {
//        if (arguments[0].src == "" || !arguments[0].complete || !arguments[0].naturalWidth) {
//            console.warn("[HMF] Wrong Image --- (" + arguments[1] + ", " + arguments[2] + ")");
//            return;
//        }
//        if (RENDER1280) {
//            switch(arguments.length) {
//                case 5:
//                    arguments[3] = (1280 * arguments[3]) / 960;
//                    arguments[4] = (720 * arguments[4]) / 540;
//                case 3:
//                    arguments[1] = (1280 * arguments[1]) / 960;
//                    arguments[2] = (720 * arguments[2]) / 540;
//                    break;
//                case 9:
//                    arguments[1] = Math.floor((1280 * arguments[1]) / 960);
//                    arguments[2] = Math.floor((720 * arguments[2]) / 540);
//                    arguments[3] = Math.floor((1280 * arguments[3]) / 960);
//                    arguments[4] = Math.floor((720 * arguments[4]) / 540);
//                    arguments[5] = (1280 * arguments[5]) / 960;
//                    arguments[6] = (720 * arguments[6]) / 540;
//                    arguments[7] = (1280 * arguments[7]) / 960;
//                    arguments[8] = (720 * arguments[8]) / 540;
//                    break;
//            }
//            originDrawImage.apply(this, arguments);
//        } else originDrawImage.apply(this, arguments);
//    } else {
//        console.warn("[HMF] Not Image --- (" + arguments[1] + ", " + arguments[2] + ")");
//    }
//};

CanvasRenderingContext2D.prototype.drawImage = function() {
    if (Object.prototype.toString.call(arguments[0]) == "[object HTMLImageElement]") {
        if (arguments[0].timeout) return;
        if (arguments[0].src == "" || !arguments[0].complete || !arguments[0].naturalWidth) {
            console.warn("[HMF] Wrong Image --- (" + arguments[0].src + ")");
            return;
        }
        originDrawImage.apply(this, arguments);
    } else {
        console.warn("[HMF] Not Image --- (" + arguments[0] + ")");
    }
};

CanvasRenderingContext2D.prototype.setColor = function(color) {
    this.fillStyle = color;
    this.strokeStyle = COLOR_BLACK;
};

var originTranslate = CanvasRenderingContext2D.prototype.translate;
CanvasRenderingContext2D.prototype.translate = function() {
    arguments[0] = (1280 * arguments[0]) / 960;
    arguments[1] = (720 * arguments[1]) / 540;
    originTranslate.apply(this, arguments);
};

CanvasRenderingContext2D.prototype.setFont = function(fontSize, option) {
    var temp = fontSize.toString() + "px " + UIMgr.DEFAULT_FONT;
    if (option != null)
        temp = option + " " + fontSize.toString() + "px " + UIMgr.DEFAULT_FONT;
    this.font = temp;
    temp = null;
};

/*
 * ParseInt
 */
var originParseint = window.parseInt;
var newParseInt = function(n, r) {
    if (n == null || isNaN(originParseint(n))) {
        console.warn("[HMF] Wrong Number --- (" + n + ")");
        n = 0;
    }
    return originParseint.apply(this, [n, r]);
};