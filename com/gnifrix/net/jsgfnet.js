/**
 * Gnifrix Season3 client module for HTML5.
 * 
 * Author: comart
 */

///////////////////////////////////////////////////////////////////////////
// static methods
///////////////////////////////////////////////////////////////////////////

/**
 * Hex string to integer.
 * @param arg Hex string to be converted.
 * @return a converted integer. 
 */
GFUtils.hexToInt = function(arg) {
    return newParseInt(arg, 16);
};

/**
 * Integer to hex string.
 * @param arg An integer to be converted.
 * @param len Result string length, if the result string length is less than
 * 		this value, zero left padded hex string will be returned. 
 */
GFUtils.intToHex = function(arg, len) {
    var res = arg.toString(16).toUpperCase();
    return "000000000000000000000000000000"
            .substring(0, len - res.length) + res;
};

/**
 * Pad a string with padding character, result length and pad direction.
 * @param arg A value which to be padded.
 * @param padc A padding character.
 * @param len Result string length.
 * @param toright Pad to right or not.
 * @returns A padded string with 'len' to minimum length.
 */
GFUtils.pad = function(arg, padc, len, toright) {
    var len = len - ('' + arg).length;
    if (len > 0) {
        var pads = '';
        for (var i = 0; i < len; i++)
            pads += padc;
        if (toright)
            return '' + pads + arg;
        else
            return '' + arg + pads;
    } else {
        return arg;
    }
};

/**
 * Date to raw string(yyyyMMdd HHmmss).
 * @param d A Date object.
 * @returns Date raw string.
 */
GFUtils.dateToRaw = function(d) {
    return '' +
            d.getFullYear() +
            GFUtils.pad(d.getMonth() + 1, '0', 2, true) +
            GFUtils.pad(d.getDate(), '0', 2, true) + ' ' +
            GFUtils.pad(d.getHours(), '0', 2, true) +
            GFUtils.pad(d.getMinutes(), '0', 2, true) +
            GFUtils.pad(d.getSeconds(), '0', 2, true);
};

/**
 * Clone given value.
 * @param obj A value with any type.
 * @returns A clone of given object.
 */
GFUtils.clone = function(obj) {
    var copy;

    // Handle the 3 simple types(String, Number, Boolean), and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = GFUtils.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = GFUtils.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

function GFUtils() {
}

/**
 * Requests which will be saved for reconnect.
 */
GFNet.GFS_REQ_APNDR = [{
        svcId: "USR",
        funcId: "LoginUpdt"
    }, {
        svcId: "NETG",
        funcId: "JoinChannel"
    }];

/**
 * Requests which will remove previous saved request.
 */
GFNet.GFS_REQ_RMVR = [{
        svcId: "USR",
        funcId: "LogoutUpdt"
    }, {
        svcId: "NETG",
        funcId: "LeaveChannel"
    }];

/**
 * GFNet constructor.
 * @param conf A config object.
 */
function GFNet(conf) {
    var env = conf;
    var connreq;
    var connres;
    var ws;
    var pktseq = 0;
    var handlers = conf.handlers;
    var bconnected = false;
    var pinger = false;
    var logger = conf.logger;
    var debug = conf.debug;
    var reqs = [];
    var pingcnt = 0;
    var reconnecting = false;
    var reconnector = false;
    var reconcnt = 0;
    var reqsave = [];
    var thisref = this;
    var makewebsocket = false;

    ///////////////////////////////////////////////////////////////////////////
    // private methods
    ///////////////////////////////////////////////////////////////////////////

    function log(msg) {
        if (debug && logger)
            logger('[D] ' + msg);
    }

    function info(msg) {
        if (logger)
            logger('[I] ' + msg);
    }

    function error(msg) {
        if (logger)
            logger('[E] ' + msg);
    }

    function resetPinger() {
        if (pingcnt > 2) {
            // socket may corrupted.
            console.warn("socket may corrupted.");
            informTimeouts();
            pingcnt=0;
            resetPinger();
        } else {
            if (pinger)
                clearTimeout(pinger);
            pinger = setTimeout(function() {
                sendData(false, 'H');
                resetPinger();
            }, 8000);
            pingcnt++;
        }
    }

    function sendData(json, pi, rseq, handler) {
        if (!rseq)
            rseq = 0;
        var jsonstr = json ? JSON.stringify(json) : "";
        var data = pi + GFUtils.intToHex(++pktseq, 16) +
            GFUtils.intToHex(rseq, 16) +
            GFUtils.intToHex(~-encodeURI(jsonstr).split(/%..|./).length, 5) +
            jsonstr;
        if (handler)
            reqs['' + pktseq] = {
                time: new Date(),
                handler: handler,
                json: GFUtils.clone(json)
            };
        log("sending -> " + data);
        ws.send(data);
    }

    function reconnHandler(jobj) {
        if (reconnector) {
            clearTimeout(reconnector);
            reconnector = false;
        }
        if (!reconnecting) {
            // process pending requests
            var saved = reqsave;
            reqsave = [];
            var pended = reqs;
            reqs = [];
            thisref.request({requests: saved}, function() {
                pended.forEach(function(pend) {
                    if (debug) {
                        pend.json.requests.every(function(obj, i) {
                            if (obj == "USR" && obj == "DaemonTestProc") {
                                pend.json.requests.splice(i, 1);
                                return false;
                            }
                            return true;
                        });
                    }
                    if (pend.json.request.length > 0)
                        thisref.request(pend.json, pend.handler);
                });
            });
        } else if (!bconnected) {
            pktseq = 0;	// reset packet sequence
            bconnected = true;
            remakeWebSocket(jobj.addr, jobj.port);
            reconnHandler(jobj);
        } else {
            reconcnt++;
            if (reconcnt > 150) {
                // TODO: process reconnect failed.
            } else {
                reconnector = setTimeout(function() {
                    reconnHandler(jobj);
                }, 200);
            }
        }
    }

    function reconnect(jobj) {
        reconcnt = 0;
        reconnecting = true;
        if (ws) ws.close();
        reconnHandler(jobj);
    }

    function processProtoEvents(ejson) {
        if ("reconnect" == ejson.command) {
            // reconnect process.
            log("reconnect response received");
            reconnect(ejson);
        }
    }

    function checkApndrRmvr(jobj) {
        var reqarr = jobj.requests;
        reqarr.forEach(function(req) {
            GFNet.GFS_REQ_APNDR.forEach(function(apndr) {
                if (apndr.svcId == req.svcId && apndr.funcId == req.funcId) {
                    log("reconnect handler added: " + req.svcId + "_" + req.funcId);
                    reqsave.push(GFUtils.clone(req));
                }
            });

            GFNet.GFS_REQ_RMVR.every(function(rmvr, i) {
                var apndr = GFNet.GFS_REQ_APNDR[i];
                if (rmvr.svcId == req.svcId && rmvr.funcId == req.funcId) {
                    reqsave.every(function(saved, i) {
                        if (apndr.svcId == saved.svcId && apndr.funcId == saved.funcId) {
                            reqsave.splice(i, 1);
                            return false;
                        }
                        return true;
                    });
                    return false;
                }
                return true;
            });
        });
    }

    function checkProto(jsonarr) {
        try {
            var res = false;
            jsonarr.forEach(function(rsp) {
                var ress = rsp.results;
                if (ress && ress.proto) {
                    processProtoEvents(ress.proto);
                    res = true;
                }
            });
            return res;
        } catch (e) {
            return false;
        }
    }

    function recvData(msg) {
        var pi = msg.substring(0, 1);	// packet indicator
        var pseq = GFUtils.hexToInt(msg.substring(1, 17));	// packet serial
        var rseq = GFUtils.hexToInt(msg.substring(17, 33));	// reference packet serial
        var mlen = GFUtils.hexToInt(msg.substring(33, 38));	// body length
        var jobj = false;

        log("recving <- " + msg);

        // reset ping count
        pingcnt = 0;

        if (mlen > 0)
            jobj = JSON.parse(msg.substring(38));
        switch(pi) {
            case 'D':	// connection accepted.
                connres = jobj;
                if (reconnecting) {
                    reconnecting = false;
                } else {
                    handlers.connected(jobj);
                }
                break;
            case 'H':	// ping response, do nothing
                break;
            case 'E':	// event received.
                if ("true" == jobj.proto) {
                    processProtoEvent(jobj);
                } else if (handlers.eventReceived) {
                    handlers.eventReceived(jobj);
                }
                break;
            case 'R':	// request received.
                if (handlers.requestReceived) {
                    handlers.requestReceived(jobj);
                }
                break;
            case 'S':	// response received.
                if (!checkProto(jobj.results)) {
                    var reshandler = reqs['' + rseq].handler;
                    delete reqs['' + rseq];
                    //reqs.splice(rseq, 1);
                    reshandler(jobj);
                }
                break;
            case 'Q':	// connection close.
                ws.close();
                break;
        }
    }

    function informTimeouts() {
        reqs.forEach(function(entry) {
            entry.handler({
                success: "false",
                resCode: "-1",
                resMsg: "request timedout.",
                results: []});
        });
    }

    var retryCnt = 0;
    function remakeWebSocket(ipaddr, port) {
        HLog.net("remakeWebSocket!! : " + "ws://" + ipaddr + ":" + port + "(" + retryCnt + ")");
        ws = new WebSocket("ws://" + ipaddr + ":" + port);
        ws.onopen = function () {
            makewebsocket = true;
            sendData(connreq, 'C', 0);	// send connection request
        };
        ws.onclose = function () {
            if(!makewebsocket && retryCnt++<3) {
                remakeWebSocket(ipaddr, port);
                return;
            }
            if (pinger)
                clearTimeout(pinger);
            ws = null;
            bconnected = false;
            if (!reconnecting)
                handlers.connectionClosed();
        };
        ws.onmessage = function (evt) {
            resetPinger();
            recvData(evt.data);
        };
    }

    ///////////////////////////////////////////////////////////////////////////
    // public methods
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Connect to Server.
     */
//    this.connect = function(obj) {
//        bconnected = true;
//        connreq = obj;
//        $.ajax("http://" + conf.host + ":" + conf.port, {
//            contentType: "text/plain; charset=utf-8",
//            data: JSON.stringify({proto: "TCP", svcaId: obj.svcaId}),
//            type: "POST",
//            error: function(jqxhr, status, err) {
//                handlers.connected({
//                    success: "false", resCode: "-1", resMsg: status + ":" + err});
//                bconnected = false;
//                handlers.connectionClosed();
//            },
//            success: function(data) {
//                remakeWebSocket(data.ipAddr, data.portNo);
//            }
//        });
//    };
	
	this.connect = function(obj) {
        bconnected = true;
        connreq = obj;

        var url;
        if (DMC_LIVE) {
            url = "http://61.251.167.126/webportal-api/server/info";
        } else {
            url = "http://" + conf.host + ":" + conf.port;
        }

        $.ajax(url, {
//         $.ajax("http://" + conf.host + ":" + conf.port, {
        // $.ajax("http://61.251.167.126/webportal-api/server/info", {
            contentType: "text/plain; charset=utf-8",
            data: JSON.stringify({proto: "TCP", svcaId: obj.svcaId}),
            type: "POST",
            error: function(jqxhr, status, err) {
                handlers.connected({
                    success: "false", resCode: "-1", resMsg: status + ":" + err});
                bconnected = false;
                handlers.connectionClosed();
            },
            success: function(data) {
                remakeWebSocket(data.ipAddr, data.portNo);
            }
        });
    };

    /**
     * Close this socket.
     */
    this.close = function() {
        if (ws)
            sendData(null, 'Q', 0);
    };

    /**
     * Send a request to server with response handler.
     */
    this.request = function(obj, handler) {
        checkApndrRmvr(obj);
        if (ws)
            sendData(obj, 'R', 0, handler);
    };

    /**
     * Send an event to server.
     */
    this.send = function(obj) {
        if (ws)
            sendData(obj, 'E', 0);
    };

    /**
     * This socket is connected to server or not.
     */
    this.isConnected = function() {
        return bconnected;
    };
}
