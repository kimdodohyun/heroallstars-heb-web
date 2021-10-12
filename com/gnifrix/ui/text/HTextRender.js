// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * Text Render
 * @public
 * @since 2015.1.2
 * @description HTextRender Class (Single Tone)
 * @author Ninei, Lazuli
 */

var HTextRender = new function () {
    var ctx;

    this.LEFT = 0;
    this.CENTER = 0.5;
    this.RIGHT = 1;

    /**
     * 중앙정렬 Text Rendering.
     * @param str text
     * @param x x position
     * @param y y position
     */
    this.renderCenter = function (_ctx, str, x, y) {
        ctx = _ctx;
        x -= ctx.measureText(str).width * this.CENTER;
        ctx.save();
        ctx.scale(ZOOM, ZOOM);
        ctx.fillText(str, x, y);
        ctx.restore();
    };

    /**
     * 왼쪽정렬 Text Rendering.
     * @param str text
     * @param x x position
     * @param y y position
     */
    this.renderLeft = function (_ctx, str, x, y) {
        ctx = _ctx;
        ctx.save();
        ctx.scale(ZOOM, ZOOM);
        ctx.fillText(str, x, y);
        ctx.restore();
    };
    /**
     * 오른쪽정렬 Text Rendering.
     * @param str text
     * @param x x position
     * @param y y position
     */
    this.renderRight = function (_ctx, str, x, y) {
        ctx = _ctx;
        x -= ctx.measureText(str).width * this.RIGHT;
        ctx.save();
        ctx.scale(ZOOM, ZOOM);
        ctx.fillText(str, x, y);
        ctx.restore();
    };

    /**
     * Highlighted Text Rendering.
     * @param str text
     * @param x x position
     * @param y y position
     */
    this.render = function (_ctx, str, x, y, align) {
        ctx = _ctx;
        if (align != null)
            x -= ctx.measureText(str).width * align;
        ctx.save();
        ctx.scale(ZOOM, ZOOM);
        ctx.fillText(str, x, y);
        ctx.restore();
    };
    
    this.oriRender = function(_ctx, str, x, y, align) {
        ctx = _ctx;
        if (align != null)
            x -= ctx.measureText(str).width * align;
        
        ctx.save();
        ctx.setColor(COLOR_BLACK);
        ctx.fillText(str, x + 2, y + 2);
        ctx.restore();
        
        ctx.fillText(str, x, y);
//        ctx.save();
//        ctx.setFont(FONT_22)
//        ctx.strokeText(str, x - 4, y - 2);
//        ctx.restore();
    };
    
    this.oriRenderUp = function(_ctx, str, x, y, align) {
        ctx = _ctx;
        if (align != null)
            x -= ctx.measureText(str).width * align;
        
        ctx.fillText(str, x, y);
    };

    /**
     * Highlighted Text Rendering.
     * @param str text
     * @param x x position
     * @param y y position
     * @param align horizontal align
     * @param highlighted highlighted color
     * @param offset highlighting position
     * @param length highlighting length
     */
    this.renderHighlightedTxt = function (_ctx, str, x, y, align, highlighted, offset, length) {
        ctx = _ctx;
        x -= ctx.measureText(str).width * align;
        var s0 = str.substring(0, offset);
        var s1 = str.substring(offset, offset + length);
        var s2 = str.substring(offset + length, str.length);
        var x1 = x + ctx.measureText(s0).width;
        var x2 = x1 + ctx.measureText(s1).width;
        ctx.save();
        ctx.scale(ZOOM, ZOOM);
        ctx.fillText(s0, x, y);
        ctx.fillText(s2, x2, y);
        ctx.fillStyle = highlighted;
        ctx.fillText(s1, x1, y);
        ctx.restore();
    };

    this.getStrWidth = function (_ctx, str) {
        ctx = _ctx;
        return ctx.measureText(str).width;
    };
    
    this.getStrHeight = function(_ctx, str) {
        ctx = _ctx;
        return ctx.measureText(str).height;
    };
};
