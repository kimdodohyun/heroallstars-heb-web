// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * ResourceManager
 * @public
 * @description File & Image Management
 * @author Lazuli
 * @since 2015.1.2
 */

var ResourceMgr = (function() {
    var TIMEOUT_TIME = 15000;
    var TIMEOUT_IMAGE = "";
    var TIMEOUT_LISTENER;
    var isTimeout = false;

    function setTimeoutListener(_listener) {
        TIMEOUT_LISTENER = _listener;
    }

    function timeoutFunc() {
        if (!isTimeout) {
            isTimeout = true;
            console.error("Resource Load === TIMEOUT !!!");
            if (window.stop !== undefined) window.stop();
            else if (document.execCommand !== undefined) document.execCommand("Stop", false);
            if (TIMEOUT_LISTENER) TIMEOUT_LISTENER();
        }
    }

    function errorFunc(_timer, cb) {
        if (_timer) {
            clearTimeout(_timer);
            _timer = undefined;
        }
        if (!isTimeout && cb) cb();
    }

    /**
     * 로컬 이미지 로딩
     * imgs : 이미지 저장할 배열, urls : 이미지주소, onload : 로딩완료 후 실행, errCallback : 콜백함수
     */
    function loadImageGroup(imgs, urls, onload, errCallback) {
        var numImagesNotYetLoaded = urls.length;
        var length = urls.length;
        for (var i = 0; i < length; i++) {
            if (isTimeout) return;
            loadImage(imgs[i] = new Image(), urls[i], function() {
                if (--numImagesNotYetLoaded == 0) {
                    onload();
                }
            }, errCallback);
        }
    }

    function loadImage(img, src, loadComplete, loadError) {
        if (isTimeout) return;
        var timer;

        function clearTimer() {
            if (timer) {
                clearTimeout(timer);
                timer = undefined;
            }
        }

        function loadFail() {
            this.onload = this.onabort = this.onerror = function() {};
            clearTimer();
            if (window.stop !== undefined) window.stop();
            else if (document.execCommand !== undefined) document.execCommand("Stop", false);
            if (loadError && !isTimeout) loadError();
            if (this.src === src && TIMEOUT_IMAGE) {
                this.src = TIMEOUT_IMAGE;
            }
        }

        if (Object.prototype.toString.call(img) != "[object HTMLImageElement]") img = new Image();
        img.src = src;
        img.onerror = img.onabort = loadFail;
        img.onload = function() {
            clearTimer();
            if (loadComplete) loadComplete();
        };
        timer = setTimeout(function() {
            img.timeout = true;
            timeoutFunc();
            loadFail.call(img);
            if (isTimeout) return;
            console.error("TIMEOUT IMAGE === " + src);
        }, TIMEOUT_TIME);
    }

    function makeImageList(paramArr, onload, errCallback) {
        var imageLength = paramArr.length;
        if(imageLength<=0) {
            onload();
            return;
        }

        var loadingComplete = 0;
        var timer = setTimeout(function() {
            clearTimeout(timer);
            timer = undefined;
            timeoutFunc();
        }, TIMEOUT_TIME);
        try {
            for (var i = 0; i < imageLength; i++) {
                if (Object.prototype.toString.call(paramArr[i][0]) == '[object Array]') {
                    if (Object.prototype.toString.call(paramArr[i][1]) == '[object String]') {
                        var tmpImg = new Image();
                        loadImage(tmpImg, paramArr[i][1], function() {
                            loadingComplete++;
                            if (loadingComplete >= imageLength) {
                                clearTimeout(timer);
                                timer = undefined;
                                if (!isTimeout) onload();
                            }
                        }, function() {errorFunc(timer, errCallback)});
                        paramArr[i][0].push(tmpImg);
                    } else if (Object.prototype.toString.call(paramArr[i][1]) == '[object Array]') {
                        loadImageGroup(paramArr[i][0], paramArr[i][1], function() {
                            loadingComplete++;
                            if (loadingComplete >= imageLength) {
                                clearTimeout(timer);
                                timer = undefined;
                                if (!isTimeout) onload();
                            }
                        }, function() {errorFunc(timer, errCallback)});
                    }
                } else if (Object.prototype.toString.call(paramArr[i][0]) == "[object HTMLImageElement]") {
                    if (Object.prototype.toString.call(paramArr[i][1]) == '[object Array]') {
                        paramArr[i][0] = [];
                        loadImageGroup(paramArr[i][0], paramArr[i][1], function() {
                            loadingComplete++;
                            if (loadingComplete >= imageLength) {
                                clearTimeout(timer);
                                timer = undefined;
                                if (!isTimeout) onload();
                            }
                        }, function() {errorFunc(timer, errCallback)});
                    } else {
                        loadImage(paramArr[i][0], paramArr[i][1], function() {
                            loadingComplete++;
                            if (loadingComplete >= imageLength) {
                                clearTimeout(timer);
                                timer = undefined;
                                if (!isTimeout) onload();
                            }
                        }, function() {errorFunc(timer, errCallback)});
                    }
                } else {
                    console.error("Wrong Image Type === " + paramArr[i]);
                }
            }
        } catch (err) {
            errorFunc(timer, errCallback)
        }
    }

    return {
        toString: function() {return "ResourceManager"},
        loadImage: loadImage,
        loadImageGroup: function(imgs, urls, onload, errCallback) {
            var timer = setTimeout(function() {
                clearTimeout(timer);
                timer = undefined;
                timeoutFunc();
            }, TIMEOUT_TIME);
            loadImageGroup(imgs, urls, function() {
                clearTimeout(timer);
                timer = undefined;
                if (!isTimeout) onload();
            }, function() {
                clearTimeout(timer);
                timer = undefined;
                if (!isTimeout) errCallback();
            });
        },
        makeImageList: makeImageList,
        setTimeoutListener: setTimeoutListener
    }
}());

