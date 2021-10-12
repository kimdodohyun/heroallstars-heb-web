var YUtil = new function() {
    /** 숫자에 0을 붙여 표시한다 ex) 1 -> 01 */
    this.addZeroNumber = function( num ) {
            if( isNaN(num) || num < 0 ) {
                return "";
            } else if( num < 10 ) return "0" + num;
            else return num + "";
    }
    
    this.indexPlus = function( curIdx, maxIndex ) {
        return ( curIdx + 1 ) % maxIndex;
    };

    this.indexMinus = function( curIdx, maxIndex ) {
        return ( curIdx - 1 + maxIndex ) % maxIndex;
    };
    
    /** 1000 , 찍기 */
    this.format = function( number ) {
        if( number < 0 ) {
            return '-' + format( -number );
        } else if( number < 1000 ) {
            return "" + number;
        } else {
            return this.format( Math.floor( number / 1000 ) ) + ',' + ( ( Math.floor( number % 1000 ) + 1000 ) + "" ).substring( 1 );
        }
    };
    
    this.getRadian = function(degree) {
        return degree / 180 * Math.PI;  
    };
    
    this.getDegree = function(radian) {
        return radian * 180 / Math.PI;
    };
    
    this.flipHorizontal = function(img) {
        return img.scaleX = -1;
    };
    
    this.rotate180 = function(img) {
        return img.rotate180;
    };
};

