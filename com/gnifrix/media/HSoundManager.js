// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 * 2015.06.16
 */

var HSoundMgr = new function() {
    this.soundMap = {};
    this.currentSound = "";
    // 사운드 추가
    this.add = function(key, url) {
        if (this.soundMap[key]) {
            console.warn("[HSoundMgr] Already Exists This Key === " + key);
            return;
        }
        this.soundMap[key] = new Audio(url);
        console.log("[HSoundMgr] Added sound === " + url);
    };

    // 사운드 제거
    this.remove = function(key) {
        if (!this.soundMap[key]) return;
        delete this.soundMap[key];
    };

    // 사운드 클리어
    this.clear = function() {
        HSoundMgr.stopSoundAll();
        this.soundMap = {};
    };

    // 사운드 플레이
    this.playSound = function(key, reload) {
        if (!checkSound(key, reload)) return;
        this.currentSound = key;
        HLog.info("[HSoundMgr] playSound ---> " + key);
        this.soundMap[key].play();
    };

    this.stopSoundAll = function() {
        $.each(this.soundMap, function(key, value) {
            HSoundMgr.soundMap[key].pause();
            HSoundMgr.soundMap[key].loop = false;
        });
        this.currentSound = "";
    };

    // 사운드 정지
    this.stopSound = function(key) {
        if (!this.soundMap[key]) {
            console.error("[HSoundMgr] " + key + " is Not Audio");
            return;
        }
        this.currentSound = "";
        this.soundMap[key].pause();
        this.soundMap[key].load();
        this.soundMap[key].loop = false;
    };

    // 사운드 포즈
    this.pauseSound = function(key) {
        if (!this.soundMap[key]) {
            console.error("[HSoundMgr] " + key + " is Not Audio");
            return;
        }
        this.soundMap[key].pause();
    };

    // 사운드 반복재생 (mp3만 반복재생 가능)
    this.loopSound = function(key, reload) {
        if (!checkSound(key, reload)) return;
        HSoundMgr.soundMap[key].loop = true;
        HLog.info("[HSoundMgr] loopSound ---> " + key);
        this.currentSound = key;
        this.soundMap[key].play();
    };

    // 반복재생 해제
    this.unloopSound = function(key) {
        if (!this.soundMap[key]) {
            console.error("[HSoundMgr] " + key + " is Not Audio");
            return;
        }
        this.stopSound(key);
        this.soundMap[key].loop = false;
    };

    // Restart the Sound
    this.restartSound = function(key, reload) {
        if (!this.soundMap[key]) {
            console.error("[HSoundMgr] " + key + " is Not Audio");
            return;
        }
        try {
            if (reload || this.soundMap[key].readyState != 2) this.soundMap[key].load();
            this.currentSound = key;
            this.soundMap[key].play();
        } catch (e) {

        }
    };

    var checkSound = function(key, reload) {
        if (!HSoundMgr.soundMap[key]) {
            console.error("[HSoundMgr] " + key + " is Not Audio");
            return false;
        }
        var prevSound = HSoundMgr.currentSound;
        if (prevSound && prevSound != key) HSoundMgr.stopSound(prevSound);
        prevSound = null;
        return true;
    };
};
