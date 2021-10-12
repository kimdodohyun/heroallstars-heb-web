/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var HAutoScreen = new function() {
    // SCENE 오토스크린 로직
    this.autoScreen = function() {
        if (UIMgr.AUTO_SCREEN == true) {
            var gameWidth = window.innerWidth;
            var gameHeight = window.innerHeight;
            var scaleToFitX = gameWidth / SCREEN_WIDTH;
            var scaleToFitY = gameHeight / SCREEN_HEIGHT;

            var currentScreenRatio = gameWidth / gameHeight;
            var optimalRatio = Math.min(scaleToFitX, scaleToFitY);

            if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) {
                CANVAS.style.width = Math.floor(gameWidth) + "px";
                CANVAS.style.height = Math.floor(gameHeight) + "px";

                // 가운데로 정렬
                var emptyWidthSize = window.innerWidth - gameWidth;
                var emptyHeightSize = window.innerHeight - gameHeight;

                if (emptyWidthSize >= 0)
                    CANVAS.style.marginLeft = emptyWidthSize / 2 + "px";
                else
                    CANVAS.style.marginLeft = 0 + "px";

                if (emptyHeightSize >= 0)
                    CANVAS.style.marginTop = emptyHeightSize / 2 + "px";
                else
                    CANVAS.style.marginTop = 0 + "px";
            } else {
                CANVAS.style.width = Math.floor(SCREEN_WIDTH * optimalRatio) + "px";
                CANVAS.style.height = Math.floor(SCREEN_HEIGHT * optimalRatio) + "px";

                // 가운데로 정렬
                var emptyWidthSize = window.innerWidth - (SCREEN_WIDTH * optimalRatio);
                var emptyHeightSize = window.innerHeight - (SCREEN_HEIGHT * optimalRatio);

                if (emptyWidthSize >= 0)
                    CANVAS.style.marginLeft = emptyWidthSize / 2 + "px";
                else
                    CANVAS.style.marginLeft = 0 + "px";

                if (emptyHeightSize >= 0)
                    CANVAS.style.marginTop = emptyHeightSize / 2 + "px";
                else
                    CANVAS.style.marginTop = 0 + "px";
            }

        } else {
            // 가운데로 정렬
            CANVAS.style.width = SCREEN_WIDTH + "px";
            CANVAS.style.height = SCREEN_HEIGHT + "px";

            var emptyWidthSize = window.innerWidth - SCREEN_WIDTH;
            var emptyHeightSize = window.innerHeight - SCREEN_HEIGHT;
            if (emptyWidthSize >= 0)
                CANVAS.style.marginLeft = emptyWidthSize / 2 + "px";
            else
                CANVAS.style.marginLeft = 0 + "px";
            if (emptyHeightSize >= 0)
                CANVAS.style.marginTop = emptyHeightSize / 2 + "px";
            else
                CANVAS.style.marginTop = 0 + "px";
        }
    };

    // 로딩바 오토스크린
    this.autoScreen_loadingbar = function() {
        if (UIMgr.AUTO_SCREEN == true) {
            var gameWidth = window.innerWidth;
            var gameHeight = window.innerHeight;
            var scaleToFitX = gameWidth / SCREEN_WIDTH;
            var scaleToFitY = gameHeight / SCREEN_HEIGHT;

            var currentScreenRatio = gameWidth / gameHeight;
            var optimalRatio = Math.min(scaleToFitX, scaleToFitY);

            if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) {
                L_CANVAS.style.width = Math.floor(gameWidth) + "px";
                L_CANVAS.style.height = Math.floor(gameHeight) + "px";

                // 가운데로 정렬
                var emptyWidthSize = window.innerWidth - gameWidth;
                var emptyHeightSize = window.innerHeight - gameHeight;

                if (emptyWidthSize >= 0)
                    L_CANVAS.style.marginLeft = emptyWidthSize / 2 + "px";
                else
                    L_CANVAS.style.marginLeft = 0 + "px";

                if (emptyHeightSize >= 0)
                    L_CANVAS.style.marginTop = emptyHeightSize / 2 + "px";
                else
                    L_CANVAS.style.marginTop = 0 + "px";
            } else {
                L_CANVAS.style.width = Math.floor(SCREEN_WIDTH * optimalRatio) + "px";
                L_CANVAS.style.height = Math.floor(SCREEN_HEIGHT * optimalRatio) + "px";

                // 가운데로 정렬
                var emptyWidthSize = window.innerWidth - (SCREEN_WIDTH * optimalRatio);
                var emptyHeightSize = window.innerHeight - (SCREEN_HEIGHT * optimalRatio);

                if (emptyWidthSize >= 0)
                    L_CANVAS.style.marginLeft = emptyWidthSize / 2 + "px";
                else
                    L_CANVAS.style.marginLeft = 0 + "px";

                if (emptyHeightSize >= 0)
                    L_CANVAS.style.marginTop = emptyHeightSize / 2 + "px";
                else
                    L_CANVAS.style.marginTop = 0 + "px";
            }
        } else {
            // 가운데로 정렬
            L_CANVAS.style.width = SCREEN_WIDTH + "px";
            L_CANVAS.style.height = SCREEN_HEIGHT + "px";

            var emptyWidthSize = window.innerWidth - SCREEN_WIDTH;
            var emptyHeightSize = window.innerHeight - SCREEN_HEIGHT;
            if (emptyWidthSize >= 0)
                L_CANVAS.style.marginLeft = emptyWidthSize / 2 + "px";
            else
                L_CANVAS.style.marginLeft = 0 + "px";
            if (emptyHeightSize >= 0)
                L_CANVAS.style.marginTop = emptyHeightSize / 2 + "px";
            else
                L_CANVAS.style.marginTop = 0 + "px";
        }
    };
};