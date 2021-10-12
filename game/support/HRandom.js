var HRandom = new function() {
  
    
    this.getRangeValue = function(first, last) {
        return Math.floor(Math.random() * (last - first) + first);
    };
};