var SGUtil = new function () {
    /**
     * min~max 사이의 수를 랜덤으로 뽑는다.
     * @param min 랜덤으로 뽑을 최소 숫자.
     * @param max 랜덤으로 뽑을 최대 숫자.
     * @return min~max 사이의 임의의 수.
     */
    this.getRandomInt = function (min, max) {
        if (arguments.length == 1) {
            return Math.floor(Math.random() * min % min);
        } else {
            return this.getRandomInt(max - min) + min;
        }
    };

    this.compareTime = function (dateTime, endTime) {
        var curDate = new dateConvert(dateTime);
        var endDate = new dateConvert(endTime);

        return endDate - curDate;
    };

    // yyyyMMddHHmmSS
    function dateConvert(date) {
        
        var setDateValue = date.toString().substring(4, 6) + "/" + date.toString().substring(6, 8) + "/" + date.toString().substring(0, 4);
        console.error("setDateValue >> ", setDateValue);
        
        var ret = new Date(setDateValue);
//        ret.setFullYear(date.toString().substring(0, 4));
//        ret.setMonth(date.toString().substring(4, 6));
//        ret.setDate(date.toString().substring(6, 8));
        ret.setHours(date.toString().substring(8, 10));
        ret.setMinutes(date.toString().substring(10, 12));
        ret.setSeconds(date.toString().substring(12, 14));
        
//        var ret = new Date();
//        ret.setFullYear(date.toString().substring(0, 4));
//        ret.setMonth(date.toString().substring(4, 6));
//        ret.setDate(date.toString().substring(6, 8));
//        ret.setHours(date.toString().substring(8, 10));
//        ret.setMinutes(date.toString().substring(10, 12));
//        ret.setSeconds(date.toString().substring(12, 14));
        return ret;
    };

    this.TimeToFrame = function (millisec) {
        if (SLEEP == 0) return 0;
        else return Math.floor(millisec / SLEEP);
    };

    this.FrameToTime = function (frame) {
        if (SLEEP == 0) return 0;
        else return Math.floor(SLEEP * frame);
    };

    this.doubleToString = function (num, offset) {
        /**
         * 소수를 스트링으로 변환 (소숫점 특정 자리까지 출력)
         * @param num 변환할 숫자
         * @param offset 표현할 자리수.  [ex)2 -> 0.01]
         * @return 변환된 String
         */
        return num.toFixed(offset);
    };

    /**
     * 숫자 자리수 체크
     * @param a 자리수를 확인할 숫자
     * @return a의 자리수
     */
    this.getCountOfNum = function (a) {
        return a.toString().length;
    };

    this.renderAnotherColorByRegex = function (g, str, regex, x, y, align, oriColor, highlighted) {
        var offset = str.indexOf(regex);
        var length = str.indexOf(regex, offset + 1) - offset - 1;

        g.setColor(oriColor);
        if (offset == -1) {
            HTextRender.render(g, str, x, y, align);
        } else {
            var renderStr = HTool.replaceAll([str], regex, "").toString();
            if (length < 0) length = renderStr.length - offset;
            HTextRender.renderHighlightedTxt(g, renderStr, x, y, align, highlighted, offset, length);
            g.setColor(oriColor);

        }
    }
};

