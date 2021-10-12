"use strict";
"use warning";

var MailManager = new function() {
  
    var msgCnt;
    var url;
    var msgContents;
    var subContents;
    var attachmentCode;
    var dateTime;
    var dateEnd;
    var attachmentAmount;
    var recKey;
    var product;
    var products;
    
    this.Rev_MessageCnt = function(info) {
        
        msgCnt = 0;
        
        if (info.length > 0) {
            var obj = info[0];
            msgCnt = Number(obj.cnt);
            
            if (info.length > 1) {
                obj = info[1];
                msgCnt = msgCnt + Number(obj.cnt);
            }
        } else {
            msgCnt = 0;
        }
    };
    
    this.getMsgCnt = function() {
        return msgCnt;
    };
    
    this.Rev_DateTime = function(res) {
        dateTime = res.dateTime;
    };
    
    this.Rev_Message = function(info) {
        
        url = [];
        msgContents = [];
        subContents = [];
        attachmentCode = [];
        dateEnd = [];
        attachmentAmount = [];
        recKey = [];
        product = [];
        
        for (var i = 0; i < info.length; i++) {
            var obj = info[i];
            
            url[i] = obj.url1;
            msgContents[i] = obj.msgContents;
            subContents[i] = obj.subContents;
            attachmentCode[i] = obj.attachmentCode;
            attachmentAmount[i] = obj.attachmentAmount;
            dateEnd[i] = obj.dateEnd;
            recKey[i] = obj.recKey;
            
            if (attachmentCode[i] == "BLUE_STONE") {
                product[i] = 0;
            } else if (attachmentCode[i] == "RED_STONE") {
                product[i] = 1;
            } else if (attachmentCode[i] == "BLACK_STONE") {
                product[i] = 2;
            } else if (attachmentCode[i] == "GOLD") {
                product[i] = 3;
            } else if (attachmentCode[i] == "GEM") {
                product[i] = 4;
            } else if (attachmentCode[i] == "ENTRANCE_KEY") {
                product[i] = 5;
            }
        }
    };
    
    this.getUrl = function() { return url; };
    this.getMsgContents = function() { return msgContents; };
    this.getSubContents = function() { return subContents; };
    this.getAttachmentCode = function() { return attachmentCode; };
    this.getAttachmentAmount = function() { return attachmentAmount; };
    this.getDateEnd = function() { return dateEnd; };
    this.getDateTime = function() { return dateTime; };
    this.getRecKey = function() { return recKey; };
    this.getProduct = function() { return product; };
    this.getProducts = function() { return products; };
    
    this.Rev_Products = function(info) {
        products = [];
        
        for (var i = 0; i < info.length; i++) {
            var obj = info[i];
            
            if (obj.attachmentCode == "BLUE_STONE") {
                products[i] = 0;
            } else if (obj.attachmentCode == "RED_STONE") {
                products[i] = 1;
            } else if (obj.attachmentCode == "BLACK_STONE") {
                products[i] = 2;
            } else if (obj.attachmentCode == "GOLD") {
                products[i] = 3;
            } else if (obj.attachmentCode == "GEM") {
                products[i] = 4;
            } else if (obj.attachmentCode == "ENTRANCE_KEY") {
                products[i] = 5;
            }
        }
    };
    
    this.destroy = function() {
        url = null;
		msgContents = null;
		subContents = null;
		attachmentCode = null;
		dateEnd = null;
        dateTime = null;
		attachmentAmount = null;
		recKey = null;
		product = null;
        products = null;
    };
};