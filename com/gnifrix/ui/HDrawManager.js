// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @description Image Draw Management
 * @author Lazuli
 * @since 2015.1.20
 */

//// 모듈시작
var HDrawMgr = new function() {

    /**
     * Image Flip
     * @param {Context} Context
     * @param {Image} Image
     * @param {int} x
     * @param {int} y
     * @param {String} Direction H or V
     */
    this.drawFlipImage = function(CTX, Img, x, y, w, h, Dir) {
        CTX.save();
        if (arguments.length == 7) {
            if (Dir.toString().toUpperCase() === "V") {
                CTX.scale(1, -1);
                CTX.drawImage(Img, x, -(y + Img.height), w, h);
            } else if (Dir.toString().toUpperCase() === "H") {
                CTX.scale(-1, 1);
                CTX.drawImage(Img, -(x + Img.width), y, w, h);
            } else if (Dir.toString().toUpperCase() === "VH") {
                CTX.scale(-1, -1);
                CTX.drawImage(Img, -(x + Img.width), -(y + Img.height), w, h);
            } else {
                throw new TypeError("Wrong Direction. Please Insert \"V\" or \"H\" or \"VH\"");
            }
        } else if (arguments.length == 5) {
            if (w.toString().toUpperCase() === "V") {
                CTX.scale(1, -1);
                CTX.drawImage(Img, x, -(y + Img.height));
            } else if (w.toString().toUpperCase() === "H") {
                CTX.scale(-1, 1);
                CTX.drawImage(Img, -(x + Img.width), y);
            } else if (w.toString().toUpperCase() === "VH") {
                CTX.scale(-1, -1);
                CTX.drawImage(Img, -(x + Img.width), -(y + Img.height));
            } else {
                throw new TypeError("Wrong Direction. Please Insert \"V\" or \"H\" or \"VH\"");
            }
        } else {
            throw new TypeError("Wrong arguments");
        }
        CTX.restore();
    };

    /**
     * Image Rotate
     * @param {Context} Context
     * @param {Image} Image
     * @param {int} x
     * @param {int} y
     * @param {int} Degrees
     */
    this.drawRotateImage = function(CTX, Img, x, y, degrees) {
        var xpos = x + (Img.width / 2);
        var ypos = y + (Img.height / 2);
        if (degrees == null || isNaN(degrees)) {
            throw new TypeError("Please Insert degrees");
            return;
        }
        CTX.save();
        CTX.translate(xpos, ypos);
        CTX.rotate(degrees * Math.PI / 180);
        CTX.translate(-xpos, -ypos);
        CTX.drawImage(Img, xpos - Img.width / 2, ypos - Img.height / 2);
        CTX.restore();
    };

    /**
     * Image To GrayScale
     * @param {Context} Context
     * @param {Image} Image
     * @param {int} x
     * @param {int} y
     */
    this.drawGrayScaleImage = function(CTX, Img, X, Y) {
        try {
            var width = Img.width;
            var height = Img.height;

            CTX.drawImage(Img, X, Y);

            var imageData = CTX.getImageData(X, Y, width, height);
            var pixelData = imageData.data;

            var bytesPerPixel = 4;

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var startIdx = (y * bytesPerPixel * width) + (x * bytesPerPixel);

                    var red = pixelData[startIdx];
                    var green = pixelData[startIdx + 1];
                    var blue = pixelData[startIdx + 2];

                    var grayScale = (red * 0.3) + (green * 0.59) + (blue * .11);

                    pixelData[startIdx] = grayScale;
                    pixelData[startIdx + 1] = grayScale;
                    pixelData[startIdx + 2] = grayScale;
                }
            }
            CTX.putImageData(imageData, X, Y);
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * Image To InvertColor
     * @param {Context} Context
     * @param {Image} Image
     * @param {int} x
     * @param {int} y
     */
    this.drawInvertImage = function(CTX, Img, X, Y) {
        CTX.drawImage(Img, X, Y);

        var imageData = CTX.getImageData(X, Y, Img.width, Img.height);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }

        CTX.putImageData(imageData, X, Y);
    };

    /**
     * Image To DropShadow
     * @param {Context} Context
     * @param {Image} Image
     * @param {int} x
     * @param {int} y
     * @param {int} Sets the shadow offset x, positive number is right
     * @param {int} Sets the shadow offset y, positive number is down
     * @param {int} Sets the shadow blur size
     * @param {Color} Sets the shadow color
     */
    this.drawShadowImage = function(CTX, Img, X, Y, OffsetX, OffsetY, Blur, Color) {
        CTX.save();
        if (OffsetX != null && !isNaN(OffsetX))
            CTX.shadowOffsetX = OffsetX;
        else
            CTX.shadowOffsetX = 6;
        if (OffsetY != null && !isNaN(OffsetY))
            CTX.shadowOffsetY = OffsetY;
        else
            CTX.shadowOffsetY = 6;
        if (Blur != null && !isNaN(Blur))
            CTX.shadowBlur = Blur;
        else
            CTX.shadowBlur = 8;
        if (Color != null)
            CTX.shadowColor = Color;
        else
            CTX.shadowColor = 'rgba(0, 0, 0, 0.6)';
        CTX.drawImage(Img, X, Y);
        CTX.restore();
    };

    /**
     * Image To Circle
     * @param {Context} Context
     * @param {Image} Image
     * @param {int} x
     * @param {int} y
     * @param {int} width
     * @param {int} height
     * @param {int} rad
     */
    this.drawCircleImage = function(CTX, Img, x, y, w, h, r) {
        CTX.save();
        CTX.beginPath();
        CTX.arc(x + r, y + r, r, 0, Math.PI * 2, false);
        CTX.clip();
        CTX.drawImage(Img, x, y, w, h);
        CTX.restore();
    }
    
    this.drawCircle = function(CTX, _x, _y, _w, _h, radius) {
        CTX.beginPath();
        CTX.moveTo(_x, _y);
        CTX.arcTo(_x + _w, _y, _x + _w, _y + _h - radius, radius);
        CTX.arcTo(_x + _w, _y + _h, _x + radius, _y + _h, radius);
        CTX.arcTo(_x, _y + _h, _x, _y + radius, radius);
        CTX.arcTo(_x, _y, _x + radius, _y, radius);
        CTX.fill();
    };
};
