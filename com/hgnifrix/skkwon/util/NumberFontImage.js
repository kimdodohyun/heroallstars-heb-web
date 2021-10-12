/**
 * @author Taesang
 */
var NumberFontImage = function(_font) {
    this.font = _font;
    this.fW = this.font[0].width;
};

NumberFontImage.prototype.setFont = function(_font) {
    this.font = _font;
};

NumberFontImage.prototype.oriRender = function () {
    if(arguments.length == 5) {
        this.oriRender_normal(arguments[0], arguments[1], arguments[2], arguments[3], this.fW, arguments[4]);
    } else {
        this.oriRender_normal(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
};

NumberFontImage.prototype.oriRender_normal = function(CTX, valueStr, x, y, margin, align) {
    var temp = HTool.toCharArray(valueStr.toString());
    var length = temp.length;
    var alignVal = parseInt((length * margin) * align);

    for (var pi = length - 1; pi >= 0; pi--) {
        CTX.oriDrawImage(this.font[temp[pi] - '0'], x + (pi * margin) - alignVal, y);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImage.prototype.render = function () {
    if(arguments.length == 5) {
        this.render_normal(arguments[0], arguments[1], arguments[2], arguments[3], this.fW, arguments[4]);
    } else {
        this.render_normal(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
};

NumberFontImage.prototype.render_normal = function(CTX, valueStr, x, y, margin, align) {
    var temp = HTool.toCharArray(valueStr.toString());
    var length = temp.length;
    var alignVal = parseInt((length * margin) * align);

    for (var pi = length - 1; pi >= 0; pi--) {
        CTX.drawImage(this.font[temp[pi] - '0'], x + (pi * margin) - alignVal, y);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImage.prototype.render_pack = function(CTX, valueStr, x, y, margin, align) {
    var temp = HTool.toCharArray(valueStr.toString());
    var length = temp.length;
    var alignVal = parseInt((length * margin) * align);

    for (var pi = length - 1; pi >= 0; pi--) {
        CTX.oriDrawImage(this.font[temp[pi] - '0'], x + (pi * margin) - alignVal, y);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImage.prototype.renderWithIcon = function(CTX, value, x, y, margin, icon, xGap, yGap, align) {
    var temp = HTool.toCharArray(value.toString());
    var length = temp.length;
    var alignVal = parseInt(((length * margin) + xGap) * align);

    CTX.drawImage(icon, x - alignVal, y);

    for (var pi = length - 1; pi >= 0; pi--) {
        CTX.drawImage(this.font[temp[pi] - '0'], x + (pi * margin) - alignVal + xGap, y + yGap);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImage.prototype.renderWithAfterIcon = function(CTX, value, x, y, margin, icon, xGap, yGap, align) {
    var temp = HTool.toCharArray(value.toString());
    var length = temp.length;
    var alignVal = parseInt(((length * margin) + xGap) * align);

    CTX.drawImage(icon, x - alignVal + ((length-1) * margin) + xGap, y + yGap);

    for (var pi = length - 1; pi >= 0; pi--) {
        CTX.drawImage(this.font[temp[pi] - '0'], x + (pi * margin) - alignVal, y);
    }

    temp = null;
    length = null;
    alignVal = null;
};

NumberFontImage.prototype.renderWithCommaAndIcon = function(CTX, value, x, y, margin, comma, CxMargin, CyGap, icon, xGap, yGap, align) {
    var temp = HTool.toCharArray(YUtil.format(value).toString());
    var length = temp.length;
    var commaCnt = (length)/4;
    var alignVal = parseInt(((length*margin)+xGap+(commaCnt*CxMargin))*align);
    var addmargin = (length-1)*margin;

    CTX.drawImage(icon, x-alignVal, y);
    for(var pi=length-1; pi>=0; pi--){
        if(temp[pi]==',') {
            addmargin-=CxMargin;
            g.drawImage(comma, x+(addmargin)-alignVal+xGap, y+CyGap);
        } else {
            addmargin-=margin;
            g.drawImage(this.font[temp[pi] - '0'], x+(addmargin)-alignVal+xGap, y+yGap);
        }
    }
};

NumberFontImage.prototype.dispose = function() {
    this.font = null;
};