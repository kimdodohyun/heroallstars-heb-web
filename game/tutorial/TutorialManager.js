var TutorialManager = new function() {

    var isTutorial = false;
    var tutorialStep = 0;
    
    this.setTutorial = function(isTuto) {
        tutorialStep = 0;
        isTutorial = isTuto == 0;
    };
    
    this.getTutorial = function() {
        return isTutorial;
    };
    
    this.setTutorialStep = function() {
        tutorialStep++;
    };
    
    this.getTutorialStep = function() {
        return tutorialStep;
    };
    
    this.tutorialGiveup = function() {
        tutorialStep++;
    };
    
    this.tutorialPlay = function() {
        tutorialStep += 2;
    };
    
    this.destroy = function () {
    };
};
