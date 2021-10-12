"use strict";
"use warning";

/**
 * EventHelper --- 키 입력을 위해 Popup 형식으로 만듦
 * @public
 * @description EventHelper  ---  eventSetting 후 getEvent()로 이벤트를 가져와서 해당 이벤트에 맞게 설정한다.
 * @author KoChic
 * @since 2017.07.06
 */

var EventHelper = new function() {

	// Variable
	var isTodayInit; // 이벤트중인 팝업 목록 띄웠을때 출석 보상 한번만 받게하기
	var firstOpen = true; // 앱 진입시 타이틀화면에서 팝업목록 한번만 띄우기
	var events = null;
	var eventCheckDate = null;
	var yearStart;
	var gap;
	var ac = {}; // attendance calendar;
	
	// EventName
	var eventName = ["SEOLLAL", "CHUSEOK", "ATTENDANCE", "EVENT_1_1", "LIMITEDPACK", "EXP_BURNING", "GOLD_BURNING", "DAILY"];
	var ATTENDANCE = {},
		EVENT_1_1 = {},
		LIMITEDPACK = {};
	
	// Package
	var DIA_1_1 = ["DIA_1_1_0", "DIA_1_1_1", "DIA_1_1_2"];
	var DIA_ADD = ["DIA_ADD_0", "DIA_ADD_1", "DIA_ADD_2"]; // 상시
	var UP_PACK = ["UP_PACK_STONE_0", "UP_PACK_STONE_1", "UP_PACK_STONE_2", "UP_PACK_STONE_3", "UP_PACK_STONE_4", "UP_PACK_GOLD"]; // 상시
	var LIMIT_PACK = ["LIMIT_PACK_HYPER", "LIMIT_PACK_GOLD", "LIMIT_PACK_SHOES", "LIMIT_PACK_STRIKE", "LIMIT_PACK_SKILL"];
	var SHOES_PACK = ["SHOES_PACK_SHOES", "SHOES_PACK_HYPER"]; // 상시
	
	// Lunar Value
	var SEOLLAL,
		SEOLLAL_title,
		SEOLLAL_titleColor,
		CHUSEOK,
		CHUSEOK_title,
		CHUSEOK_titleColor;
	
	this.eventSetting = function(_isTodayInit) { // 어플 실행시 네트워크 Connection 하는 부분에 오늘 첫 로그인인지 아닌지 _isTodayInit에 true : false 값을 넣어야 함
		
		isTodayInit = _isTodayInit;
		
		// 음력 시작 년도 (단위 : 년)
		yearStart = 2017;
		
		// 서버와의 시간 차이
		gap = 0;
		
		// 스타몬 마스터즈 일일출석 보상 코드
		ac._1 = ["SUMMONSTONE_2_1", "GOLD_100", "SUMMONSTONE_0_1", "SUMMONSTONE_4_1", "SUMMONSTONE_3_1", "SUMMONSTONE_1_1", "HYPERSTONE_1",
				"PREEMPRIVE_STRIKE_5", "GOLD_100", "MAGICSTONE_1", "HYPERSTONE_1", "IMPROVE_SKILL_5", "PREEMPRIVE_STRIKE_5", "HYPERSTONE_1",
				"PREEMPRIVE_STRIKE_5", "GOLD_500", "SUMMONSTONE_3_2", "SUMMONSTONE_1_2", "MAGICSTONE_1", "SUMMONSTONE_2_2", "HYPERSTONE_1",
				"MAGICSTONE_1", "GOLD_500", "SUMMONSTONE_4_2", "SUMMONSTONE_0_2", "IMPROVE_SKILL_5", "PREEMPRIVE_STRIKE_5", "HYPERSTONE_1"];
		
		ac._2 = ["MAGICSTONE_1", "GOLD_100", "MAGICSTONE_1", "IMPROVE_SKILL_5", "PREEMPRIVE_STRIKE_5", "MAGICSTONE_1", "HYPERSTONE_1",
				"SUMMONSTONE_2_1", "SUMMONSTONE_1_1", "SUMMONSTONE_4_1", "SUMMONSTONE_0_1", "SUMMONSTONE_3_1", "PREEMPRIVE_STRIKE_5", "HYPERSTONE_1",
				"MAGICSTONE_1", "GOLD_500", "SUMMONSTONE_3_2", "SUMMONSTONE_1_2", "MAGICSTONE_1", "GOLD_100", "HYPERSTONE_1",
				"SUMMONSTONE_0_2", "GOLD_500", "SUMMONSTONE_4_2", "SUMMONSTONE_2_2", "GOLD_100", "PREEMPRIVE_STRIKE_5", "HYPERSTONE_1"];
		
		ac._3 = ["IMPROVE_SKILL_5", "GOLD_100", "SUMMONSTONE_4_1", "MAGICSTONE_1", "SUMMONSTONE_3_1", "SUMMONSTONE_1_1", "HYPERSTONE_1",
				"MAGICSTONE_1", "SUMMONSTONE_2_1", "MAGICSTONE_1", "SUMMONSTONE_0_1", "IMPROVE_SKILL_5", "PREEMPRIVE_STRIKE_5", "HYPERSTONE_1",
				"MAGICSTONE_1", "GOLD_500", "SUMMONSTONE_3_2", "GOLD_100", "MAGICSTONE_1", "IMPROVE_SKILL_5", "HYPERSTONE_1",
				"MAGICSTONE_1", "GOLD_500", "SUMMONSTONE_4_2", "SUMMONSTONE_2_2", "SUMMONSTONE_0_2", "SUMMONSTONE_1_2", "HYPERSTONE_1"];
		
		ac._item_1 = ["coin_light", "coin_gold", "coin_ice", "coin_dark", "coin_wind", "coin_fire", "coin_hyper",
					 "coin_strike", "coin_gold", "coin_magic", "coin_hyper", "coin_skill", "coin_strike", "coin_hyper",
					 "coin_strike", "coin_gold", "coin_wind", "coin_fire", "coin_magic", "coin_light", "coin_hyper",
					 "coin_magic", "coin_gold", "coin_dark", "coin_ice", "coin_skill", "coin_strike", "coin_hyper"];
		
		ac._item_2 = ["coin_magic", "coin_gold", "coin_magic", "coin_skill", "coin_strike", "coin_magic", "coin_hyper",
					 "coin_light", "coin_fire", "coin_dark", "coin_ice", "coin_wind", "coin_strike", "coin_hyper",
					 "coin_magic", "coin_gold", "coin_wind", "coin_fire", "coin_magic", "coin_gold", "coin_hyper",
					 "coin_ice", "coin_gold", "coin_dark", "coin_light", "coin_gold", "coin_strike", "coin_hyper"];
		
		ac._item_3 = ["coin_skill", "coin_gold", "coin_dark", "coin_magic", "coin_wind", "coin_fire", "coin_hyper",
					 "coin_magic", "coin_light", "coin_magic", "coin_ice", "coin_skill", "coin_strike", "coin_hyper",
					 "coin_magic", "coin_gold", "coin_wind", "coin_gold", "coin_magic", "coin_skill", "coin_hyper",
					 "coin_magic", "coin_gold", "coin_dark", "coin_light", "coin_ice", "coin_fire", "coin_hyper"];
		
		ac._ea_1 = ["1", "100", "1", "1", "1", "1", "1",
				   "5", "100", "1", "1", "5", "5", "1",
				   "5", "500", "2", "2", "1", "2", "1",
				   "1", "500", "2", "2", "5", "5", "1"];
		
		ac._ea_2 = ["1", "100", "1", "5", "5", "1", "1",
				   "1", "1", "1", "1", "1", "5", "1",
				   "1", "500", "2", "2", "1", "100", "1",
				   "2", "500", "2", "2", "100", "5", "1"];
		
		ac._ea_3 = ["5", "100", "1", "1", "1", "1", "1",
				   "1", "1", "1", "1", "5", "5", "1",
				   "1", "500", "2", "100", "1", "5", "1",
				   "1", "500", "2", "2", "2", "2", "1"];
		
		// 새해, 삼일절, 광복절, 한글날, 석가탄신일 - 추가 출석 보상
		ATTENDANCE._date = ["0101", "0301", "0815", "1009"];
		ATTENDANCE._titleColor = ["title_0101", "title_0301", "title_0815", "title_1009"];
		ATTENDANCE._buddhaDate = ["0811", "0503", "0522", "0512", "0430", "0519", "0508", "0527", "0515", "0505", "0524", "0513", "0502", "0520", "0509", "0528", "0516", "0506", "0525", "0515", "0503"];
		ATTENDANCE._rewardCode = ["HYPERSTONE_1"];
		ATTENDANCE._buddhaTitle = ["title_buddha"];
		ATTENDANCE._buddhaTitleColor = ["title_buddha"];
		
		// 발렌타인데이, 화이트데이, 빼빼로데이 - 결제 1+1 이벤트 (이벤트 전 후 3일씩)
		EVENT_1_1._date = ["0214", "0314", "1111"];
		EVENT_1_1._titleColor = ["title_0214", "title_0314", "title_1111"];
		
		// 가정의 달 (이벤트 날짜부터 14일), 크리스마스 (이벤트 전 후 3일씩)- 리미티드 패키지
		LIMITEDPACK._date = ["0501", "1225"];
		LIMITEDPACK._titleColor = ["title_5", "title_1225"];
		
		// 설날, 추석 - 결제 1+1 이벤트, 리미티드 패키지 (설날, 추석 전 3일 부터 설날, 추석 다음 날 까지)
		SEOLLAL = ["0128", "0216", "0205", "0125", "0212", "0201", "0122", "0210", "0129", "0217", "0207", "0127", "0213", "0203", "0123", "0211", "0131", "0219", "0208", "0128"];
		SEOLLAL_title = ["title_seollal"];
		SEOLLAL_titleColor = ["title_seollal"];
		
		CHUSEOK = ["1004", "0924", "0913", "1001", "0921", "0910", "0929", "0917", "1006", "0925", "0915", "1003", "0922", "0912", "1001", "0919", "0908", "0927", "0916", "1004"];
		CHUSEOK_title = ["title_chuseok"];
		CHUSEOK_titleColor = ["title_chuseok"];
		
		setEvent(_isTodayInit);
	};
	
	// 이벤트 셋팅
	var setEvent = function(_isTodayInit) {
		
		var currentDate = getCurrentDate();
		
		events = null;
		
		if (events == null) {
			events = makeEvents(currentDate, _isTodayInit);
		} else if (currentDate.getDate() != eventCheckDate.getDate()) {
			events = makeEvents(currentDate, _isTodayInit);
		} else if (currentDate.getDay() == 5 && currentDate.getHours() >= 13 && eventCheckDate.getHours() < 13) {
			events = makeEvents(currentDate, _isTodayInit);
		}
	}
	
	// 이벤트들 검사
	var makeEvents = function(_currentDate, _isTodayInit) {
		
		eventCheckDate = _currentDate;
		var index = _currentDate.getFullYear() - yearStart;
		var _events = [];
		var isLunarEvent = false;
		var isBurningEvent = false;
		
		if (!isBurningEvent) {
			switch(_currentDate.getDay()) {
			case 0:
			case 6:
					
				if (_currentDate.getHours() >= 10 && _currentDate.getHours() < 14) {
					_events.push({event: "EXP_BURNING", start_h: 10, end_h: 14, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()});
				} else if (_currentDate.getHours() >= 15 && _currentDate.getHours() < 18) {
					_events.push({event: "GOLD_BURNING", start_h: 15, end_h: 18, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()});
				}
				break;
							  
			default:
					
				if (_currentDate.getHours() >= 16 && _currentDate.getHours() < 18) {
					_events.push({event: "EXP_BURNING", start_h: 16, end_h: 18, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()});
				}
		  		break;
			}
		}
		
		// 음력 이벤트 검사 - 설날
		if (index >= 0 && index < SEOLLAL.length) {
			var e = makeEvent(_currentDate, "SEOLLAL", SEOLLAL[index], SEOLLAL_title[0], SEOLLAL_titleColor[0], 7);
			if (e != null) {
				_events.push(e);
				setBurningEvent(_events, isBurningEvent, _currentDate);
				isLunarEvent = true;
				isBurningEvent = true;
			}
		}
		
		// 음력 이벤트 검사 - 추석
		if (index >= 0 && index < CHUSEOK.length) {
			var e = makeEvent(_currentDate, "CHUSEOK", CHUSEOK[index], CHUSEOK_title[0], CHUSEOK_titleColor[0], 7);
			if (e != null) {
				_events.push(e);
				setBurningEvent(_events, isBurningEvent, _currentDate);
				isLunarEvent = true;
				isBurningEvent = true;
			}
		}
		
		if (!isLunarEvent) { // 설날, 추석 (음력) 이벤트들과 겹치는 이벤트 > 설날이나 추석이벤트 일때는 검사하지 않음.
			// 결제 1+1 이벤트 검사
			for (var i = 0; i < EVENT_1_1._date.length; i++) {
				var e = makeEvent(_currentDate, "EVENT_1_1", EVENT_1_1._date[i], EVENT_1_1._date[i], EVENT_1_1._titleColor[i], 7);
				if (e != null) {
					_events.push(e);
				}
			}

			// 리미티드 패키지 이벤트 검사
			for (var i = 0; i < LIMITEDPACK._date.length; i++) {
				var e;
				if (i == 0) { //5월 1일
					e = makeSEvent(_currentDate, "LIMITEDPACK", LIMITEDPACK._date[i], LIMITEDPACK._date[i], LIMITEDPACK._titleColor[i], 14);
					
					if (e != null) {
						_events.push(e);
						
						if (_currentDate.getDate() === "5") {
							setBurningEvent(_events, isBurningEvent, _currentDate);
							isBurningEvent = true;
						}
					}
				} else { //12월 25일
					e = makeEvent(_currentDate, "LIMITEDPACK", LIMITEDPACK._date[i], LIMITEDPACK._date[i], LIMITEDPACK._titleColor[i], 7);
					
					if (e != null) {
						_events.push(e);
						
						console.error("date ", _currentDate.getDate());
						console.error("date111 ", _currentDate.getDate());
						
						if (_currentDate.getDate() === "24" || _currentDate.getDate() === "25") {
							
							console.error("chiri");
							
							setBurningEvent(_events, isBurningEvent, _currentDate);
							isBurningEvent = true;
						}
					}
				}
			}	
		}
		
		// 해당 날짜 첫 출석일때 출석체크 이벤트 검사
//		if (_isTodayInit) {
			// 추가 출석 보상 이벤트 검사 > 석가탄신일(음력)
			if (index >= 0 && index < ATTENDANCE._buddhaDate.length) {
				var e = makeEvent(_currentDate, "ATTENDANCE", ATTENDANCE._buddhaDate[index], ATTENDANCE._buddhaTitle[0], ATTENDANCE._buddhaTitleColor[0], 1);
				if (e != null) {
					if (_isTodayInit) {
						_events.push(e);	
					}
					setBurningEvent(_events, isBurningEvent, _currentDate);
					isBurningEvent = true;
				}
			}

			// 추가 출석 보상 이벤트 검사
			for (var i = 0; i < ATTENDANCE._date.length; i++) {
				var e = makeEvent(_currentDate, "ATTENDANCE", ATTENDANCE._date[i], ATTENDANCE._date[i], ATTENDANCE._titleColor[i], 1);
				if (e != null) {
					if (_isTodayInit) {
						_events.push(e);	
					}
					setBurningEvent(_events, isBurningEvent, _currentDate);
					isBurningEvent = true;
				}
			}
			
			// 출석 체크 보상
		if (_isTodayInit) {
			var e = makeDEvent(_currentDate, "DAILY");
			if (e != null) {
				_events.push(e);
			}
		}
			
//		}
		
		return _events;
	};

	// 이벤트 생성
	var makeEvent = function(_currentDate, _eventName, _eventDate, _eventTitle, _eventTitleColor, _eventPeriod) {
		
		// 이벤트 시작일 검사
		var eventDate = new Date(_currentDate.getFullYear(), parseInt(_eventDate.substring(0, 2)) - 1, parseInt(_eventDate.substring(2)) - Math.floor((_eventPeriod) / 2));
		
		if (_currentDate.getTime() >= eventDate.getTime()) {
			var start_m = eventDate.getMonth() + 1;
			var start_d = eventDate.getDate();
			
			// 이벤트 종료일 검사
			eventDate.setDate(eventDate.getDate() + _eventPeriod);
			if (_currentDate.getTime() < eventDate.getTime()) {
				
				if (_eventPeriod == 2) { // 당일 이벤트일 경우 시작일과 종료일을 같게 한다.
					var end_m = start_m;
					var end_d = start_d;

					return {event: _eventName, title: _eventTitle, titleColor: _eventTitleColor, start_m: start_m, start_d: start_d, end_m: end_m, end_d: end_d, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()};
				} else {
					var end_m = eventDate.getMonth() + 1;
					var end_d = eventDate.getDate() - 1;

					return {event: _eventName, title: _eventTitle, titleColor: _eventTitleColor, start_m: start_m, start_d: start_d, end_m: end_m, end_d: end_d, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()};
				}
			}
		}
		
		return null;
	};
	
	// 해당 날짜부터 시작하는 이벤트 생성
	var makeSEvent = function(_currentDate, _eventName, _eventDate, _eventTitle, _eventTitleColor, _eventPeriod) {
		// 이벤트 시작일 검사
		var eventDate = new Date(_currentDate.getFullYear(), parseInt(_eventDate.substring(0, 2)) - 1, parseInt(_eventDate.substring(2)));
		
		if (_currentDate.getTime() >= eventDate.getTime()) {
			var start_m = eventDate.getMonth() + 1;
			var start_d = eventDate.getDate();
			
			// 이벤트 종료일 검사
			eventDate.setDate(eventDate.getDate() + _eventPeriod);
			if (_currentDate.getTime() < eventDate.getTime()) {
				
				var end_m = eventDate.getMonth() + 1;
				var end_d = eventDate.getDate() - 1;

				return {event: _eventName, title: _eventTitle, titleColor: _eventTitleColor, start_m: start_m, start_d: start_d, end_m: end_m, end_d: end_d};
			}
		}
		
		return null;
	};
	
	// 일일 출석 이벤트 생성
	var makeDEvent = function(_currentDate, _eventName) {
		
		if (_currentDate.getDate() >= 1 && _currentDate.getDate() <= 28) {
			console.error("Month ", _currentDate.getMonth() + 1);
			
			switch (_currentDate.getMonth() + 1) {
				case 1:
				case 4:
				case 7:
				case 10:
					return {event: _eventName, date: _currentDate.getDate(), code: ac._1[_currentDate.getDate() - 1], item: ac._item_1[_currentDate.getDate() - 1], ea: ac._ea_1[_currentDate.getDate() - 1]};
					break;
					
				case 2:
				case 5:
				case 8:
				case 11:
					return {event: _eventName, date: _currentDate.getDate(), code: ac._2[_currentDate.getDate() - 1], item: ac._item_2[_currentDate.getDate() - 1], ea: ac._ea_2[_currentDate.getDate() - 1]};
					break;
					
				case 3:
				case 6:
				case 9:
				case 12:
					return {event: _eventName, date: _currentDate.getDate(), code: ac._3[_currentDate.getDate() - 1], item: ac._item_3[_currentDate.getDate() - 1], ea: ac._ea_3[_currentDate.getDate() - 1]};
					break;
					
				default:
					break;
			}
		}
		
		return null;
	};
	
	var getCurrentDate = function() {
		var date = new Date();
		date.setTime(date.getTime() - gap);
		return date;
	};
	
	var setBurningEvent = function(_events, _isBurningEvent, _currentDate) {
		if (!_isBurningEvent) {
			
			if (_currentDate.getHours() >= 10 && _currentDate.getHours() < 14) {
				_events.push({event: "EXP_BURNING", start_h: 10, end_h: 14, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()});
			} else if (_currentDate.getHours() >= 15 && _currentDate.getHours() < 18) {
				_events.push({event: "GOLD_BURNING", start_h: 15, end_h: 18, month: _currentDate.getMonth() + 1, date: _currentDate.getDate()});
			}
		}
	};
	
	/**
	 * 이벤트 얻기.
	 *
	 * @param event 이벤트 이름.
	 * @param title 이벤트 기준일.
	 * @param titleColor 이벤트 타이틀 이미지 이름.
	 * @param start_m 이벤트 시작 월.
	 * @param start_d 이벤트 시작 일.
	 * @param end_m 이벤트 종료 월.
	 * @param end_d 이벤트 종료 일.
	 *
	 * @return Array.
	 */
	this.isEvent = function() {
		return events.length > 0;
	};
	
	this.getEvent = function(flag) {
		for (var i = 0; i < events.length; i++) {
			if (flag === events[i].event) {
				return true;
			}
		}
		return false;
	};
	
	this.Rev_Daily = function(arr) {
		ac._daily = [];
		for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            ac._daily[i] = obj.rcvYN;
        }
	};
	
	this.getFirstOpen = function() {
		return firstOpen;
	};
	
	this.isEVENT_1_1 = function() {
		for (var i = 0; i < events.length; i++) {
			if (events[i].event == eventName[0] || events[i].event == eventName[1] || events[i].event == eventName[3]) {
				return true;
			}
		}
		return false;
	};
	
	this.isLIMITEDPACK = function() {
		for (var i = 0; i < events.length; i++) {
			if (events[i].event == eventName[0] || events[i].event == eventName[1] || events[i].event == eventName[4]) {
				return true;
			}
		}
		return false;
	};
	
	this.isEXP_BURNING = function() {
		for (var i = 0; i < events.length; i++) {
			if (events[i].event == eventName[5]) {
				return true;
			}
		}
		return false;
	};
	
	this.isGOLD_BURNING = function() {
		for (var i = 0; i < events.length; i++) {
			if (events[i].event == eventName[6]) {
				return true;
			}
		}
		return false;
	};

	this.toString = function() {
		return "EventHelper";
	};
	
	this.getDIA_1_1 = function() {
		return DIA_1_1;
	};
	this.getDIA_ADD = function() {
		return DIA_ADD;
	};
	this.getUP_PACK = function() {
		return UP_PACK;
	};
	this.getLIMIT_PACK = function() {
		return LIMIT_PACK;
	};
	this.getSHOES_PACK = function() {
		return SHOES_PACK;
	};
	
	this.destroyEventHelper = function() {
		
		events = null;
		eventCheckDate = null;
		yearStart = null;
		gap = null;
		ac = null;

		eventName = null;
		ATTENDANCE = null;
		EVENT_1_1 = null;
		LIMITEDPACK = null;

		SEOLLAL = null;
		SEOLLAL_title = null;
		SEOLLAL_titleColor = null;
		CHUSEOK = null;
		CHUSEOK_title = null;
		CHUSEOK_titleColor = null;
		
		DIA_1_1 = null;
		DIA_ADD = null;
		UP_PACK = null;
		LIMIT_PACK = null;
		SHOES_PACK = null;
	};
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////// 팝 업 //////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	// Popup Value
	
	var popup;
	var popups = [];
	var popupsCnt = 0;
	var dailyCnt = 0;
	
	var setEventPopup = function(onload) {
		
		console.error("events!! ", events);
		
		var onloadCnt = 0;
		var isBurning = false;
		var checkOnload = function() {
			onloadCnt++;
			
			if (onloadCnt >= events.length) {
				onload();
			}
		}
		
		for (var i = 0; i < events.length; i++) {
			
			console.error("events!! ", events[i].event);
			
			switch(events[i].event) {
				case eventName[0]: // 설날
					console.error(eventName[0]);
												
					var bg_0, title_0, logo_0, content_0, md_0, num_0, start_m_0, start_m_1, start_d_0, start_d_1, end_m_0, end_m_1, end_d_0, end_d_1;
					
					if (events[i].start_m < 10) {
						start_m_0 = 0;
						start_m_1 = events[i].start_m;
					} else {
						start_m_0 = events[i].start_m.toString().substring(0, 1);
						start_m_1 = events[i].start_m.toString().substring(1, 2);
					}
					
					if (events[i].start_d < 10) {
						start_d_0 = 0;
						start_d_1 = events[i].start_d
					} else {
						start_d_0 = events[i].start_d.toString().substring(0, 1);
						start_d_1 = events[i].start_d.toString().substring(1, 2);
					}
					
					if (events[i].end_m < 10) {
						end_m_0 = 0;
						end_m_1 = events[i].end_m;
					} else {
						end_m_0 = events[i].end_m.toString().substring(0, 1);
						end_m_1 = events[i].end_m.toString().substring(1, 2);
					}
					
					if (events[i].end_d < 10) {
						end_d_0 = 0;
						end_d_1 = events[i].end_d;
					} else {
						end_d_0 = events[i].end_d.toString().substring(0, 1);
						end_d_1 = events[i].end_d.toString().substring(1, 2);
					}
					
					var imgParam = [
						[bg_0 = new Image(), ROOT_IMG + "event/bg" + EXT_PNG],
						[title_0 = new Image(), ROOT_IMG + "event/" + events[i].titleColor + EXT_PNG],
						[logo_0 = new Image(), ROOT_IMG + "event/logo" + EXT_PNG],
						[content_0 = new Image(), ROOT_IMG + "event/content_seollal" + EXT_PNG],
						[md_0 = new Image(), ROOT_IMG + "event/md" + EXT_PNG],
						[num_0 = [], HTool.getURLs(ROOT_IMG, "event/num/", EXT_PNG, 10)]
					];
					
					ResourceMgr.makeImageList(imgParam, function() {
						popups.push({bg: bg_0, text: eventName[0], title: title_0, logo: logo_0, content: content_0, md: md_0, num: num_0, start_m_0: start_m_0, start_m_1: start_m_1, start_d_0: start_d_0, start_d_1: start_d_1, end_m_0: end_m_0, end_m_1: end_m_1, end_d_0: end_d_0, end_d_1: end_d_1});
						
						bg_0 = null;
						title_0 = null;
						logo_0 = null;
						content_0 = null;
						md_0 = null;
						num_0 = null;
						
						checkOnload();
					}, function(err) {
						
					});
					break;
					
				case eventName[1]: // 추석
					console.error(eventName[1]);
					var bg_1, title_1, logo_1, content_1, md_1, num_1, start_m_0, start_m_1, start_d_0, start_d_1, end_m_0, end_m_1, end_d_0, end_d_1;
					
					if (events[i].start_m < 10) {
						start_m_0 = 0;
						start_m_1 = events[i].start_m;
					} else {
						start_m_0 = events[i].start_m.toString().substring(0, 1);
						start_m_1 = events[i].start_m.toString().substring(1, 2);
					}
					
					if (events[i].start_d < 10) {
						start_d_0 = 0;
						start_d_1 = events[i].start_d
					} else {
						start_d_0 = events[i].start_d.toString().substring(0, 1);
						start_d_1 = events[i].start_d.toString().substring(1, 2);
					}
					
					if (events[i].end_m < 10) {
						end_m_0 = 0;
						end_m_1 = events[i].end_m;
					} else {
						end_m_0 = events[i].end_m.toString().substring(0, 1);
						end_m_1 = events[i].end_m.toString().substring(1, 2);
					}
					
					if (events[i].end_d < 10) {
						end_d_0 = 0;
						end_d_1 = events[i].end_d;
					} else {
						end_d_0 = events[i].end_d.toString().substring(0, 1);
						end_d_1 = events[i].end_d.toString().substring(1, 2);
					}
					
					var imgParam = [
						[bg_1 = new Image(), ROOT_IMG + "event/bg" + EXT_PNG],
						[title_1 = new Image(), ROOT_IMG + "event/" + events[i].titleColor + EXT_PNG],
						[logo_1 = new Image(), ROOT_IMG + "event/logo" + EXT_PNG],
						[content_1 = new Image(), ROOT_IMG + "event/content_chuseok" + EXT_PNG],
						[md_1 = new Image(), ROOT_IMG + "event/md" + EXT_PNG],
						[num_1 = [], HTool.getURLs(ROOT_IMG, "event/num/", EXT_PNG, 10)]
					];
					
					ResourceMgr.makeImageList(imgParam, function() {
						popups.push({bg: bg_1, text: eventName[1], title: title_1, logo: logo_1, content: content_1, md: md_1, num: num_1, start_m_0: start_m_0, start_m_1: start_m_1, start_d_0: start_d_0, start_d_1: start_d_1, end_m_0: end_m_0, end_m_1: end_m_1, end_d_0: end_d_0, end_d_1: end_d_1});
						
						bg_1 = null;
						title_1 = null;
						logo_1 = null;
						content_1 = null;
						md_1 = null;
						num_1 = null;
						
						checkOnload();
					}, function(err) {
						
					});
					break;
					
				case eventName[2]: // 추가출석
					
					if (isTodayInit) {
						
						console.error(eventName[2]);
						var bg_2, title_2, logo_2, content_2;
						var imgParam = [
							[bg_2 = new Image(), ROOT_IMG + "event/bg" + EXT_PNG],
							[title_2 = new Image(), ROOT_IMG + "event/" + events[i].titleColor + EXT_PNG],
							[logo_2 = new Image(), ROOT_IMG + "event/logo" + EXT_PNG],
							[content_2 = new Image(), ROOT_IMG + "event/at_content" + EXT_PNG]
						];

						ResourceMgr.makeImageList(imgParam, function() {
							popups.push({bg: bg_2, text: eventName[2], title: title_2, logo: logo_2, content: content_2, code: "HYPERSTONE_1"});

							bg_2 = null;
							title_2 = null;
							logo_2 = null;
							content_2 = null;

							checkOnload();
						}, function(err) {

						});
					} else {
						checkOnload();
					}
					
					break;
					
				case eventName[3]: // 1+1이벤트
					console.error(eventName[3]);
					var bg_3, title_3, logo_3, content_3, md_3, num_3, start_m_0, start_m_1, start_d_0, start_d_1, end_m_0, end_m_1, end_d_0, end_d_1;
					
					if (events[i].start_m < 10) {
						start_m_0 = 0;
						start_m_1 = events[i].start_m;
					} else {
						start_m_0 = events[i].start_m.toString().substring(0, 1);
						start_m_1 = events[i].start_m.toString().substring(1, 2);
					}
					
					if (events[i].start_d < 10) {
						start_d_0 = 0;
						start_d_1 = events[i].start_d
					} else {
						start_d_0 = events[i].start_d.toString().substring(0, 1);
						start_d_1 = events[i].start_d.toString().substring(1, 2);
					}
					
					if (events[i].end_m < 10) {
						end_m_0 = 0;
						end_m_1 = events[i].end_m;
					} else {
						end_m_0 = events[i].end_m.toString().substring(0, 1);
						end_m_1 = events[i].end_m.toString().substring(1, 2);
					}
					
					if (events[i].end_d < 10) {
						end_d_0 = 0;
						end_d_1 = events[i].end_d;
					} else {
						end_d_0 = events[i].end_d.toString().substring(0, 1);
						end_d_1 = events[i].end_d.toString().substring(1, 2);
					}
					
					var imgParam = [
						[bg_3 = new Image(), ROOT_IMG + "event/bg" + EXT_PNG],
						[title_3 = new Image(), ROOT_IMG + "event/" + events[i].titleColor + EXT_PNG],
						[logo_3 = new Image(), ROOT_IMG + "event/logo" + EXT_PNG],
						[content_3 = new Image(), ROOT_IMG + "event/content_dia_1_1" + EXT_PNG],
						[md_3 = new Image(), ROOT_IMG + "event/md" + EXT_PNG],
						[num_3 = [], HTool.getURLs(ROOT_IMG, "event/num/", EXT_PNG, 10)]
					];
					
					ResourceMgr.makeImageList(imgParam, function() {
						popups.push({bg: bg_3, text: eventName[3], title: title_3, logo: logo_3, content: content_3, md: md_3, num: num_3, start_m_0: start_m_0, start_m_1: start_m_1, start_d_0: start_d_0, start_d_1: start_d_1, end_m_0: end_m_0, end_m_1: end_m_1, end_d_0: end_d_0, end_d_1: end_d_1});
						
						bg_3 = null;
						title_3 = null;
						logo_3 = null;
						content_3 = null;
						md_3 = null;
						num_3 = null;
						
						checkOnload();
					}, function(err) {
						
					});
					break;
					
				case eventName[4]: // 리미티드패키지
					console.error(eventName[4]);
					var bg_4, title_4, logo_4, content_4, md_4, num_4, start_m_0, start_m_1, start_d_0, start_d_1, end_m_0, end_m_1, end_d_0, end_d_1;
					
					if (events[i].start_m < 10) {
						start_m_0 = 0;
						start_m_1 = events[i].start_m;
					} else {
						start_m_0 = events[i].start_m.toString().substring(0, 1);
						start_m_1 = events[i].start_m.toString().substring(1, 2);
					}
					
					if (events[i].start_d < 10) {
						start_d_0 = 0;
						start_d_1 = events[i].start_d
					} else {
						start_d_0 = events[i].start_d.toString().substring(0, 1);
						start_d_1 = events[i].start_d.toString().substring(1, 2);
					}
					
					if (events[i].end_m < 10) {
						end_m_0 = 0;
						end_m_1 = events[i].end_m;
					} else {
						end_m_0 = events[i].end_m.toString().substring(0, 1);
						end_m_1 = events[i].end_m.toString().substring(1, 2);
					}
					
					if (events[i].end_d < 10) {
						end_d_0 = 0;
						end_d_1 = events[i].end_d;
					} else {
						end_d_0 = events[i].end_d.toString().substring(0, 1);
						end_d_1 = events[i].end_d.toString().substring(1, 2);
					}
					
					var imgParam = [
						[bg_4 = new Image(), ROOT_IMG + "event/bg" + EXT_PNG],
						[title_4 = new Image(), ROOT_IMG + "event/" + events[i].titleColor + EXT_PNG],
						[logo_4 = new Image(), ROOT_IMG + "event/logo" + EXT_PNG],
						[content_4 = new Image(), ROOT_IMG + "event/content_limit" + EXT_PNG],
						[md_4 = new Image(), ROOT_IMG + "event/md" + EXT_PNG],
						[num_4 = [], HTool.getURLs(ROOT_IMG, "event/num/", EXT_PNG, 10)]
					];
					
					ResourceMgr.makeImageList(imgParam, function() {
						popups.push({bg: bg_4, text: eventName[4], title: title_4, logo: logo_4, content: content_4, md: md_4, num: num_4, start_m_0: start_m_0, start_m_1: start_m_1, start_d_0: start_d_0, start_d_1: start_d_1, end_m_0: end_m_0, end_m_1: end_m_1, end_d_0: end_d_0, end_d_1: end_d_1});
						
						bg_4 = null;
						title_4 = null;
						logo_4 = null;
						content_4 = null;
						md_4 = null;
						num_4 = null;
						
						checkOnload();
					}, function(err) {
						
					});
					break;
					
				case eventName[5]: // 경험치 버닝
					if (!isBurning) {
						console.error(eventName[5]);
						
						isBurning = true;
						var bg_5;
						var imgParam = [
							[bg_5 = new Image(), ROOT_IMG + "event/burning_time" + EXT_PNG]
						];

						ResourceMgr.makeImageList(imgParam, function() {
							popups.push({bg: bg_5, text: eventName[5]});

							bg_5 = null;

							checkOnload();
						}, function(err) {

						});
					} else {
						checkOnload();
					}
					break;
					
				case eventName[6]: // 골드 버닝
					if (!isBurning) {
						console.error(eventName[6]);
						
						isBurning = true;
						var bg_6;
						var imgParam = [
							[bg_6 = new Image(), ROOT_IMG + "event/burning_time" + EXT_PNG]
						];

						ResourceMgr.makeImageList(imgParam, function() {
							popups.push({bg: bg_6, text: eventName[6]});

							bg_6 = null;

							checkOnload();
						}, function(err) {

						});
					} else {
						checkOnload();
					}
					break;
					
				case eventName[7]: // 일일 출석
					
					if (isTodayInit) {
						
						console.error(eventName[7]);

						var ac_item = [], ac_ea = [];

						switch (getCurrentDate().getMonth() + 1) {
							case 1:
							case 4:
							case 7:
							case 10:
								ac_item = ac._item_1;
								ac_ea = ac._ea_1;
								break;

							case 2:
							case 5:
							case 8:
							case 11:
								ac_item = ac._item_2;
								ac_ea = ac._ea_2;
								break;

							case 3:
							case 6:
							case 9:
							case 12:
								ac_item = ac._item_3;
								ac_ea = ac._ea_3;
								break;

							default:
								break;
						}

						var bg_7, title_7, daily_back, daily_focus, daily_complete, daily_x, daily_btn, daily_confirm, daily_backlight, daily_title, daily_bg, day, daily_num, daily_icon = [];
						var code = events[i].code;
						var date = events[i].date - 1;
						var imgParam = [
							[bg_7 = new Image(), ROOT_IMG + "popup/popup_5" + EXT_PNG],
							[title_7 = new Image(), ROOT_IMG + "event/daily_title" + EXT_PNG],
							[daily_back = new Image(), ROOT_IMG + "event/daily_back" + EXT_PNG],
							[daily_focus = new Image(), ROOT_IMG + "event/daily_focus" + EXT_PNG],
							[daily_complete = new Image(), ROOT_IMG + "event/daily_complete" + EXT_PNG],
							[daily_x = new Image(), ROOT_IMG + "event/num_x" + EXT_PNG],
							[daily_btn = new Image(), ROOT_IMG + "popup/button_1" + EXT_PNG],
							[daily_confirm = new Image(), ROOT_IMG + "popup/ok_1" + EXT_PNG],
							[daily_backlight = new Image(), ROOT_IMG + "event/back_light" + EXT_PNG],
							[daily_title = new Image(), ROOT_IMG + "event/title_daily" + EXT_PNG],
							[daily_bg = new Image(), ROOT_IMG + "popup/popup_3" + EXT_PNG],
							[day = [], HTool.getURLs(ROOT_IMG, "event/day/", EXT_PNG, 28)],
							[daily_num = [], HTool.getURLs(ROOT_IMG, "common/num/num_", EXT_PNG, 10)]
						];

						for (var j = 0; j < ac_item.length; j++) {
							imgParam.push([daily_icon[j] = new Image(), ROOT_IMG + "common/" + ac_item[j] + EXT_PNG]);
						}

						ResourceMgr.makeImageList(imgParam, function() {
							popups.push({bg: bg_7, text: eventName[7], title: title_7, daily_back: daily_back, daily_focus: daily_focus, daily_complete: daily_complete, daily_x: daily_x, daily_btn: daily_btn, daily_confirm: daily_confirm, daily_backlight: daily_backlight, daily_title: daily_title, daily_bg: daily_bg, day: day, daily_num: daily_num, daily_icon: daily_icon, daily_date: date, daily_ea: ac_ea, code: code});

							bg_7 = null;
							title_7 = null;
							daily_back = null;
							daily_focus = null;
							daily_complete = null;
							daily_x = null;
							daily_btn = null;
							daily_confirm = null;
							daily_backlight = null;
							daily_title = null;
							daily_bg = null;
							day = null;
							daily_num = null;
							daily_icon = null;

							checkOnload();
						}, function(err) {

						});
					} else {
						checkOnload();
					}
					break;
					
					
				default:
					break;
			}
		}
	};
	
	var convertNumber = function(num) {
	
		var sNum = num;
		var numArr = [];
		
		for (var i = 0; i < sNum.length; i++) {
			numArr[i] = sNum.substring(i, (i + 1));
		}
		return numArr;
	};
	
	var eventsMonthDay = function(g, num, start_m_0, start_m_1, start_d_0, start_d_1, end_m_0, end_m_1, end_d_0, end_d_1) {
		
		g.oriDrawImage(num[start_m_0], 430, 223);
		g.oriDrawImage(num[start_m_1], 449, 223);
		
		g.oriDrawImage(num[start_d_0], 501, 223);
		g.oriDrawImage(num[start_d_1], 520, 223);
		
		g.oriDrawImage(num[end_m_0], 649, 223);
		g.oriDrawImage(num[end_m_1], 668, 223);
		
		g.oriDrawImage(num[end_d_0], 719, 223);
		g.oriDrawImage(num[end_d_1], 738, 223);
	};
	
	var eventsRender = function(g) {
		
		switch(popup.text) {
			case eventName[0]: // 설날
				
				g.oriDrawImage(popup.bg, 305, 83);
				g.oriDrawImage(popup.logo, 288, 74);
				g.oriDrawImage(popup.title, 416, 134);
				g.oriDrawImage(popup.md, 473, 223);
				eventsMonthDay(g, popup.num, popup.start_m_0, popup.start_m_1, popup.start_d_0, popup.start_d_1, popup.end_m_0, popup.end_m_1, popup.end_d_0, popup.end_d_1);
				g.oriDrawImage(popup.content, 406, 234);
				
				break;
			case eventName[1]: // 추석
				
				g.oriDrawImage(popup.bg, 305, 82);
				g.oriDrawImage(popup.logo, 288, 74);
				g.oriDrawImage(popup.title, 416, 134);
				g.oriDrawImage(popup.md, 473, 223);
				eventsMonthDay(g, popup.num, popup.start_m_0, popup.start_m_1, popup.start_d_0, popup.start_d_1, popup.end_m_0, popup.end_m_1, popup.end_d_0, popup.end_d_1);
				g.oriDrawImage(popup.content, 406, 234);
				
				break;
			case eventName[2]: // 추가 출석
				
				g.oriDrawImage(popup.bg, 305, 82);
				g.oriDrawImage(popup.logo, 288, 74);
				g.oriDrawImage(popup.title, 416, 134);
				g.oriDrawImage(popup.content, 406, 234);
				
				break;
			case eventName[3]: // 1+1 이벤트
				g.oriDrawImage(popup.bg, 305, 83);
				g.oriDrawImage(popup.logo, 288, 74);
				g.oriDrawImage(popup.title, 416, 134);
				g.oriDrawImage(popup.md, 473, 223);
				eventsMonthDay(g, popup.num, popup.start_m_0, popup.start_m_1, popup.start_d_0, popup.start_d_1, popup.end_m_0, popup.end_m_1, popup.end_d_0, popup.end_d_1);
				g.oriDrawImage(popup.content, 406, 234);
				break;
			case eventName[4]: // 리미티드 패키지
				g.oriDrawImage(popup.bg, 305, 83);
				g.oriDrawImage(popup.logo, 288, 74);
				g.oriDrawImage(popup.title, 416, 134);
				g.oriDrawImage(popup.md, 473, 223);
				eventsMonthDay(g, popup.num, popup.start_m_0, popup.start_m_1, popup.start_d_0, popup.start_d_1, popup.end_m_0, popup.end_m_1, popup.end_d_0, popup.end_d_1);
				g.oriDrawImage(popup.content, 406, 234);
				break;
			case eventName[5]: // 경험치 버닝
				g.oriDrawImage(popup.bg, 287, 75);
				break;
			case eventName[6]: // 골드 버닝
				g.oriDrawImage(popup.bg, 287, 75);
				break;
			case eventName[7]: // 일일 출석
				
				g.oriDrawImage(popup.bg, 114, 114);
				g.oriDrawImage(popup.title, 461, 24);

				for (var i = 0; i < 4; i++) {
					for (var j = 0; j < 7; j++) {
						g.oriDrawImage(popup.daily_back, 259 + (j * 109), 157 + (i * 99));
						if ((i * 7) + j === popup.daily_date) {
							g.oriDrawImage(popup.daily_focus, 259 + (j * 109), 157 + (i * 99));
						}
						g.oriDrawImage(popup.daily_icon[(i * 7) + j], 267 + (j * 109), 192 + (i * 99));
						g.oriDrawImage(popup.day[(i * 7) + j], 271 + (j * 109), 167 + (i * 99));
						if (ac._daily[(i * 7) + j] == 1) {
							g.oriDrawImage(popup.daily_complete, 271 + (j * 109), 167 + (i * 99));
						}
						
						g.oriDrawImage(popup.daily_x, 290 + (j * 109), 212 + (i * 99));
						
						for (var z = 0; z < popup.daily_ea[(i * 7) + j].length; z++) {
							g.oriDrawImage(popup.daily_num[convertNumber(popup.daily_ea[(i * 7) + j])[z]], 308 + (j * 109) + (z * 18), 212 + (i * 99));	
						}
					}
				}

				g.oriDrawImage(popup.daily_btn, 549, 570);
				g.oriDrawImage(popup.daily_confirm, 609, 582);
				
				g.setFont(FONT_18);
				g.setColor(COLOR_WHITE);
				HTextRender.renderCenter(g, "※출석 보상은 매월 1일 초기화 됩니다.", 480, 500);
				
				if (dailyCnt >= 1) {
					g.setColor(PopupMgr.POPUP_TRUE_BACK_COLOR);
                    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
					
					g.oriDrawImage(popup.daily_bg, 354, 232);
					g.oriDrawImage(popup.daily_title, 482, 189);
					g.oriDrawImage(popup.daily_backlight, 546, 245);
					g.oriDrawImage(popup.daily_icon[popup.daily_date], 586, 287, 105, 105);
					
					g.oriDrawImage(popup.daily_btn, 549, 412);
					g.oriDrawImage(popup.daily_confirm, 609, 424);
					
					g.setFont(FONT_21);
					g.setColor(COLOR_WHITE);
					HTextRender.renderCenter(g, "※보상은 우편으로 자동 지급됩니다.", 480, 400);
				}
				
				break;
			default:
				break;
		}
	};
	
	var enterKeyAction = function() {
		
		if (isTodayInit) {
			switch (popup.text) {
			
				case eventName[2]:
					netMgr.Req_EventRewardGive(popup.code, function (response) {
						if (netMgr.isSuccess(response)) {
							ItemManager.Rev_AllItem(netMgr.getResult(response, 1), response.dateTime, true);

							if (popupsCnt < popups.length - 1) {
								popupsCnt++;
								popup = popups[popupsCnt];
							} else {
								isTodayInit = false;
								PopupMgr.closeAllPopup();
							}

						} else {
							GameManager.openDisconnectPopup("Req_EventRewardGive Fail!!", this);
						}
					});
					break;
				case eventName[7]:
					
					if (dailyCnt >= 1) {
						
						netMgr.Req_EventRewardGive(popup.code, function (response) {
							if (netMgr.isSuccess(response)) {
								ItemManager.Rev_AllItem(netMgr.getResult(response, 1), response.dateTime, true);

								if (popupsCnt < popups.length - 1) {
									popupsCnt++;
									popup = popups[popupsCnt];
								} else {
									isTodayInit = false;
									PopupMgr.closeAllPopup();
								}

							} else {
								GameManager.openDisconnectPopup("Req_EventRewardGive Fail!!", this);
							}
						});					
					}
					
					dailyCnt++;
					
					break;
				default:
					if (popupsCnt < popups.length - 1) {
						popupsCnt++;
						popup = popups[popupsCnt];
					} else {
						isTodayInit = false;
						PopupMgr.closeAllPopup();
					}					
					break;
			}
		} else {
			if (popupsCnt < popups.length - 1) {
				popupsCnt++;
				popup = popups[popupsCnt];
			} else {
				isTodayInit = false;
				PopupMgr.closeAllPopup();
			}
		}
	};
	
	return {
        toString: this.toString,
        init: function (onload, callbackFunc) {
			
			firstOpen = false;
			
			popups = [];
            setEventPopup(onload);
        },
        start: function () {
			popup = popups[popupsCnt];
        },
        run: function () {
            UIMgr.repaint();
        },
        paint: function () {
			eventsRender(g);
        },
        stop: function () {

			popup = null;
			popups = null;
			popupsCnt = 0;
			dailyCnt = 0;
			
        },
        onKeyPressed: function (key) {
			switch (key) {
				case KEY_ENTER :
					enterKeyAction();
				break;
			}
        },
        onKeyReleased: function (key) {
        },
        getInstance: function () {
        },
		
		eventSetting: this.eventSetting,
		getEvent: this.getEvent,
		isEvent: this.isEvent,
		isEVENT_1_1: this.isEVENT_1_1,
		isLIMITEDPACK: this.isLIMITEDPACK,
		isEXP_BURNING: this.isEXP_BURNING,
		isGOLD_BURNING: this.isGOLD_BURNING,
		getDIA_1_1: this.getDIA_1_1,
		getDIA_ADD: this.getDIA_ADD,
		getUP_PACK: this.getUP_PACK,
		getLIMIT_PACK: this.getLIMIT_PACK,
		getSHOES_PACK: this.getSHOES_PACK,
		getFirstOpen: this.getFirstOpen,
		Rev_Daily: this.Rev_Daily,
    };
};
