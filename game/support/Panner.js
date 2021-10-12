var Panner = new function() {
    this.linearTween = function(t, b, c, d) {
        return (c * t / d + b);
    };
    
    this.easeInQuad = function (t, b, c, d) {
        return (c * t * t / (d * d) + b);
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
};