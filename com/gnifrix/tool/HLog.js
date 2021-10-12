// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Ninei
 */

// HLog 객체
var HLog = new function() {
    var NT = "\n";
    var END = ") ";
    var PREFIX = "GF";
    var SYS = "[" + PREFIX + "|SYS](";
    var INFO = "[" + PREFIX + "|INFO](";
    var ERR = "[" + PREFIX + "|ERR](";
    var WARN = "[" + PREFIX + "|WARN](";
    var NET = "[" + PREFIX + "|NET](";
    var NET_SEND = "[" + PREFIX + "|NET_SEND](";
    var NET_RECV = "[" + PREFIX + "|NET_RECV](";
    var NET_ERR = "[" + PREFIX + "|NET_ERROR](";

    this.log = function(msg) {
        var HEAD = "[" + PREFIX + "|LOG] ";
        console.log(HEAD + msg);
    };

    // 기본로그 출력
    this.out = function(msg) {
        try {
            var HEAD = "[" + PREFIX + "|INFO]";
            console.log(HEAD + "-- LOG ----------------");
            console.log(msg);
        } catch (exception) {
            return;
        }
    };

    // 정보형(INFO) 로그 출력
    this.info = function(msg, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = INFO + owner.toString() + END;
            else
                HEAD = INFO + END;
            console.info(HEAD + "-- INFO ----------------");
            console.info(msg);
        } catch (exception) {
            return;
        }
    };

    // 시스템 로그 출력
    this.sys = function(msg, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = SYS + owner.toString() + END;
            else
                HEAD = SYS + END;
            console.log(NT);
            console.log(HEAD);
            console.log(HEAD + "###################################################");
            console.log(HEAD + "# " + msg);
            console.log(HEAD + "###################################################");
            console.log(HEAD);
        } catch (exception) {
            return;
        }
    };

    // 에러 메세지 출력
    this.err = function(msg, data, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = ERR + owner.toString() + END;
            else
                HEAD = ERR + END;
            console.error(NT);
            console.error("===================================================");
            console.error(HEAD + "# " + msg);
            if (data != null)
                console.error(data);
            console.error("===================================================");
        } catch (exception) {
            return;
        }
    };

    // 경고 메세지 출력
    this.warn = function(msg, data, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = WARN + owner.toString() + END;
            else
                HEAD = WARN + END;
            console.warn(NT);
            console.warn("===================================================");
            console.warn(HEAD + "# " + msg);
            if (data != null)
                console.warn(data);
            console.warn("===================================================");
        } catch (exception) {
            return;
        }
    };

    // 네트워크 전송로그 출력
    this.netSend = function(msg, data, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = NET_SEND + owner.toString() + END;
            else
                HEAD = NET_SEND + END;
            console.log(NT);
            console.log("---------------------------------------------------");
            console.log(HEAD + ">> " + msg);
            if (data != null)
                console.log(data);
            console.log("---------------------------------------------------");
        } catch (exception) {
            return;
        }
    };

    // 네트워크 수신로그 출력
    this.netRecv = function(msg, data, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = NET_RECV + owner.toString() + END;
            else
                HEAD = NET_RECV + END;
            console.log(NT);
            console.log("---------------------------------------------------");
            console.log(HEAD + ">> " + msg);
            if (data != null)
                console.log(data);
            console.log("---------------------------------------------------");
        } catch (exception) {
            return;
        }
    };
    
        // 에러 메세지 출력
    this.netErr = function(msg, data, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = ERR + owner.toString() + END;
            else
                HEAD = ERR + END;
            console.error(NT);
            console.error("===================================================");
            console.error(HEAD + "# " + msg);
            if (data != null)
                console.error(data);
            console.error("===================================================");
        } catch (exception) {
            return;
        }
    };

    // 기타 네트워크 관련 로그 출력
    this.net = function(msg, data, owner) {
        try {
            var HEAD;
            if (owner != null)
                HEAD = NET + owner.toString() + END;
            else
                HEAD = NET + END;
            console.log(NT);
            console.log("---------------------------------------------------");
            console.log(HEAD + ">> " + msg);
            if (data != null)
                console.log(data);
            console.log("---------------------------------------------------");
        } catch (exception) {
            return;
        }
    };
};
