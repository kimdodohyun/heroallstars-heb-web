var CashProductInfo = function(jobj) {
	
	function getString(obj, key) {
		var result = obj[key];
		if(!result) return "null";
		else return result;
	}
	
	this.chargeAmount = jobj.chargeAmount-0;
	this.oriChargeAmount = jobj.oriChargeAmount-0;
	this.amount = jobj.amount-0;
	this.idx = jobj.idx-0;
	this.prodCode = jobj.prodCode;
	this.prodName = jobj.name;
	this.mainCode = jobj.msoProdCode;
	this.subCode = jobj.msoSvcCode;

};

CashProductInfo.prototype.getChargeAmount = function() { return this.chargeAmount; };
CashProductInfo.prototype.getOriChargeAmount = function() { return this.oriChargeAmount; };
CashProductInfo.prototype.isAdded = function() { return this.chargeAmount>this.oriChargeAmount; };
CashProductInfo.prototype.getAmount = function() { return this.amount; };
CashProductInfo.prototype.getIdx = function() { return this.idx; };
CashProductInfo.prototype.getProdCode = function() { return this.prodCode; };
CashProductInfo.prototype.getProdName = function() { return this.prodName; };
CashProductInfo.prototype.getMainCode = function() { return this.mainCode; };
CashProductInfo.prototype.getSubCode = function() { return this.subCode; };