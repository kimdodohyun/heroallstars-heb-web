// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * HLayout
 * @public
 * @description Layout Class
 * @author Lazuli
 * @since 2015. 1. 2
 */

/**
 * 레이아웃 영역 지정
 * @param {Context} ctx
 * @param {Int} x
 * @param {Int} y
 * @param {Int} width
 * @param {Int} height
 */
var HLayout = function(ctx, x, y, width, height) {
    this.X = x;
    this.Y = y;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.CTX = ctx;
};

// 컨텍스트 렌더링 함수 추가
HLayout.prototype.drawImage = function(_image, _x, _y, _w, _h) {
    if (arguments.length == 5)
        this.CTX.drawImage(_image, this.X + _x, this.Y + _y, _w, _h);
    else if (arguments.length == 3)
        this.CTX.drawImage(_image, this.X + _x, this.Y + _y);
};

HLayout.prototype.strokeRect = function(_x, _y, _w, _h) {
    this.CTX.strokeRect(this.X + _x, this.Y + _y, _w, _h);
};

HLayout.prototype.fillRect = function(_x, _y, _w, _h) {
    this.CTX.fillRect(this.X + _x, this.Y + _y, _w, _h);
};

HLayout.prototype.fillRoundRect = function(_x, _y, _w, _h, radius) {
    this.CTX.beginPath();
    this.CTX.moveTo(_x, _y);
    this.CTX.arcTo(_x + _w, _y, _x + _w, _y + _h - radius, radius);
    this.CTX.arcTo(_x + _w, _y + _h, _x + radius, _y + _h, radius);
    this.CTX.arcTo(_x, _y + _h, _x, _y + radius, radius);
    this.CTX.arcTo(_x, _y, _x + radius, _y, radius);
    this.CTX.fill();
};

HLayout.prototype.clearRect = function() {
    this.CTX.clearRect(this.X, this.Y, this.WIDTH, this.HEIGHT);
};

HLayout.prototype.HTextRender = function(str, _x, _y, align) {
    if (align != null)
        _x -= this.CTX.measureText(str).width * align;
    this.CTX.fillText(str, this.X + _x, this.Y + _y);
};