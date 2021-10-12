var MovingEquation = new function () {
    /**
     * 선형이동.
     * 등속도운동을 한다.
     * @param idx 현재 카운트
     * @param start 초기값
     * @param amount 변화량
     * @param duration 총 카운트
     * @return 현재 카운트에 맞는 현재 위치
     */
    this.linearTween = function(idx, start, amount, duration) {
        return Math.floor((amount*idx)/duration) + start;
    };
    /**
     * 사인형 가감속 이동.
     * 처음에 가속하며, 마지막에 감속한다.
     * @param idx 현재 카운트
     * @param start 초기값
     * @param amount 변화량
     * @param duration 총 카운트
     * @return 현재 카운트에 맞는 현재 위치
     */
    this.easeInOutSine = function(idx, start, amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        return Math.floor(-c/2 * (Math.cos(Math.PI*t/d) - 1) + b);
    };

    this.easeInOutCubic = function(idx, start, amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        t /= d/2;
        if (t < 1) return Math.floor(c/2*t*t*t + b);
        t -= 2;
        return Math.floor(c/2*(t*t*t + 2) + b);
    };

    this.easeInBack = function(idx, start , amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        var s = 1.70158;
        return Math.floor(c*(t/=d)*t*((s+1)*t - s) + b);
    };

    this.easeOutBack = function(idx, start , amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        var s = 1.70158;
        return Math.floor(c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b);
    };

    this.easeOutCubic = function(idx, start , amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        return Math.floor(c*((t=t/d-1)*t*t + 1) + b);
    };

    this.easeInOutCirc = function(idx, start, amount, duration) {
        var t = idx, b = start, c = amount, d = duration;

        t /= d/2;
        if (t < 1) return Math.floor(-c/2 * (Math.sqrt(1 - t*t) - 1) + b);
        t -= 2;
        return Math.floor(c/2 * (Math.sqrt(1 - t*t) + 1) + b);
    };

    this.easeOutBounce = function(idx, start, amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        if ((t/=d) < (1/2.75)) {
            return Math.floor(c*(7.5625*t*t) + b);
        } else if (t < (2/2.75)) {
            return Math.floor(c*(7.5625*(t-=(1.5/2.75))*t + .75) + b);
        } else if (t < (2.5/2.75)) {
            return Math.floor(c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b);
        } else {
            return Math.floor(c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b);
        }
    };

    this.easeInExpo = function(idx, start, amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        return Math.floor(c * Math.pow( 2, 10 * (t/d - 1) ) + b);
    };

    this.easeInCube = function(idx, start, amount, duration) {
        var t = idx, b = start, c = amount, d = duration;
        t /= d;
        return Math.floor(c*t*t*t + b);
    };
};
