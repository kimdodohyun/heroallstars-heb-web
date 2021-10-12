/**
 * @author Taesang
 */
var NumberFontImg_5x2 = function (_font, fW, fH) {
    this.font = _font;
    this.fW = fW;
    this.fH = fH;
};

NumberFontImg_5x2.prototype.render = function () {
    if(arguments.length == 5) {
        this.render_normal(arguments[0], arguments[1], arguments[2], arguments[3], this.fW, arguments[4]);
    } else {
        this.render_normal(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
};
NumberFontImg_5x2.prototype.render_normal = function (CTX, valueStr, x, y, margin, align) {
    var temp = HTool.toCharArray(valueStr.toString());
    var length = temp.length;
    var alignVal = parseInt((length * margin + this.fW - margin) * align);


    for (var pi = length - 1; pi >= 0; pi--) {
        var num = temp[pi] - '0';
        var dx = x + (pi * margin) - alignVal;
        CTX.drawImage(this.font, this.fW * (num % 5), this.fH * Math.floor(num / 5), this.fW, this.fH, dx, y, this.fW, this.fH);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImg_5x2.prototype.render_zoom = function (CTX, valueStr, x, y, margin, align, zoom) {
    margin *= zoom;
    var temp = HTool.toCharArray(valueStr.toString());
    var length = temp.length;
    var alignVal = parseInt((length * margin) * align);

    for (var pi = length - 1; pi >= 0; pi--) {
        var num = temp[pi] - '0';
        var dx = x + (pi * margin) - alignVal;
        CTX.drawImage(this.font, this.fW * (num % 5), this.fH * Math.floor(num / 5), this.fW, this.fH,
            dx, (y - (this.fH * Math.floor((zoom - 1) / 2))), (this.fW * zoom), (this.fH * zoom));
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImg_5x2.prototype.renderWithIcon = function (CTX, value, x, y, margin, icon, xGap, yGap, align) {
    var temp = HTool.toCharArray(value.toString());
    var length = temp.length;
    var alignVal = parseInt(((length * margin) + xGap + HTool.getImgWidth(icon.width)) * align);

    CTX.drawImage(icon, x - alignVal, y);
    for (var pi = length - 1; pi >= 0; pi--) {
        var num = temp[pi] - '0';
        var dx = x + (pi * margin) - alignVal + xGap;
        CTX.drawImage(this.font,
            this.fW * (num % 5), this.fH * Math.floor(num / 5),
            this.fW, this.fH,
            dx, y,
            this.fW, this.fH);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImg_5x2.prototype.renderWithAfterIcon = function (CTX, value, x, y, margin, icon, xGap, yGap, align) {
    var temp = HTool.toCharArray(value.toString());
    var length = temp.length;
    var alignVal = parseInt(((length * margin) + xGap + HTool.getImgWidth(icon.width)) * align);

    CTX.drawImage(icon, x - alignVal + ((length - 1) * margin) + xGap, y + yGap);

    for (var pi = length - 1; pi >= 0; pi--) {
        var num = temp[pi] - '0';
        var dx = x + (pi * margin) - alignVal;
        CTX.drawImage(this.font, this.fW * (num % 5), this.fH * Math.floor(num / 5), this.fW, this.fH, dx, y, this.fW, this.fH);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImg_5x2.prototype.renderWithImages = function (CTX, value, x, y, margin, front, rear, FxGap, FyGap, RxGap, RyGap, align) {
    var temp = HTool.toCharArray(YUtil.format(value).toString());
    var length = temp.length;
    var alignVal = parseInt((FxGap + (length * margin) + RxGap + HTool.getImgWidth(rear.width)) * align);

    CTX.drawImage(front, x - alignVal, y + FyGap);
    CTX.drawImage(rear, x + FxGap + (length * margin) + RxGap - alignVal, y + RyGap);
    for (var pi = length - 1; pi >= 0; pi--) {
        var num = temp[pi] - '0';
        var dx = x + (pi * margin) - alignVal + FxGap;
        CTX.drawImage(this.font, this.fW * (num % 5), this.fH * Math.floor(num / 5), this.fW, this.fH, dx, y, this.fW, this.fH);
    }
};

NumberFontImg_5x2.prototype.dispose = function () {
    this.font = null;
};