var Missile = function(weaponName) {
  
    var missileImg = [];
    var exploImg = [];
    var x, y;
    var destiX, destiY;
    var enWidth, enHeight;
    var enPosX, enPosY;
    var atkSpeed;
    
    var frameCnt = 0;
    var exploCnt = 0;
    
    var isRunning = false;
    var isExplo = false;
    
    for (var i = 0; i < 5; i++) {
        exploImg[i] = PlayResManager.getMyUnitMap().get("explo_" + i);
    }
    
    for (var i = 0; i < 4; i++) {
        missileImg[i] = PlayResManager.getMyUnitMap().get("my_" + weaponName + "_" + i);
    }
    
    this.setPosition = function(_x, _y, _destiX, _destiY, _enWidth, _enHeight, _enPosX, _enPosY, _atkSpeed) {
        x = _x;
        y = _y;
        destiX = _destiX;
        destiY = _destiY;
        enWidth = _enWidth;
        enHeight = _enHeight;
        enPosX = _enPosX;
        enPosY = _enPosY;
        atkSpeed = _atkSpeed * 2;
        frameCnt = 0;
        exploCnt = 0;
        isExplo = false;
        isRunning = true;
    };
    
    this.setIsRunning = function(_enWidth, _enHeight, _enPosX, _enPosY) {
        enWidth = _enWidth;
        enHeight = _enHeight;
        enPosX = _enPosX;
        enPosY = _enPosY;
    };
    
    this.getX = function() {
        return Math.floor(x);
    };
    
    this.getY = function() {
        return Math.floor(y);
    };
    
    this.getW = function() {
        return Math.floor(missileImg[0].width);
    };
    
    this.getH = function() {
        return Math.floor(missileImg[0].height);
    };
    
    this.getIsRunning = function() {
        return isRunning;
    };
    
    this.getExploCnt = function() {
        return exploCnt;
    };
    
    this.getFrameCnt = function() {
        return frameCnt;
    };
    
    this.update = function() {
        if (!isRunning) return;
        
        frameCnt++;
        x = Panner.easeInQuad(frameCnt, x, destiX - x, atkSpeed);
        y = Panner.easeInQuad(frameCnt, y, destiY - y, atkSpeed);
        
        if (Math.abs(destiX - x) < enWidth && Math.abs(destiY - y) < enHeight) {
            isExplo = true;
            exploCnt++;
            if (exploCnt == 5) {
                isRunning = false;
            } 
        }
    };
    
    this.render = function(g) {
        if (!isRunning) return;
        g.drawImage(missileImg[frameCnt % 4], x, y);
        if (isExplo) {
            g.drawImage(exploImg[exploCnt], enPosX + Math.floor(enWidth / 2) - exploImg[0].width / 2, enPosY + enHeight - exploImg[0].height + Math.floor(exploImg[0].height / 3) - 20);
        }
    };
    
    this.flush = function() {
        missileImg = null;
        exploImg = null;
    };
};