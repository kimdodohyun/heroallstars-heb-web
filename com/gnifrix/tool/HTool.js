// Strict Mode On (엄격모드)
"use strict";
"use warning";

/**
 * @author Lazuli
 * 2014.07.30
 */

var HTool = new function () {

    // 숫자 컴마 찍기
    this.addComma = function (src) {
        src = src + "";
        var temp_str = src.replace(/,/g, "");

        for (var i = 0, retValue = String(), stop = temp_str.length; i < stop; i++) {
            retValue = ((i % 3) == 0) && i != 0 ? temp_str.charAt((stop - i) - 1) + "," + retValue : temp_str.charAt((stop - i) - 1) + retValue;
        }

        return retValue;
    };

    // 숫자앞에 0 붙이기 
    // n : 숫자, digits : 원하는 자리수
    this.leadingZero = function (n, digits) {
        var zero = "";
        n = n.toString();

        if (n.length < digits) {
            for (var i = 0; i < digits - n.length; i++) {
                zero += "0";
            }
        }
        return zero + n;
    };

    // 배열에서 특정 스트링을 가진 배열 값을 삭제.
    this.removeArrayString = function (arr, removeStr) {
        if (HTool.inArray(removeStr, arr)) {
            var index = arr.indexOf(removeStr);
            arr.splice(index, 1);
        }
    };

    // 스트링 Array 에 특정 스트링이 있는지 검사 (Boolean)
    this.inArray = function (str, arry) {
        if (Object.prototype.toString.call(str) != '[object String]')
            return false;
        if (Object.prototype.toString.call(arry) != '[object Array]')
            return false;

        for (var ii = 0, al = arry.length; ii < al; ii++)
            if (arry[ii] == str)
                return true;

        return false;
    };

    // OBJECT 배열에서 특정 ITEM(Key)의 값을 검색해서 일치하는 OBJECT를 모두 반환한다.
    // var objArr = [{"ID": "AAA", "NM":"유태상"},{"ID":"BBB","NM":"지니프릭스"}, {"ID":"BBB","NM":"스튜디오B"}];
    // HTool.searchJsonObjectArray(objArr, "ID", "BBB");
    // 결과값 : [{"ID":"BBB","NM":"지니프릭스"}, {"ID":"BBB","NM":"스튜디오B"}]
    this.searchJsonObjectArray = function (objArray, searchKey, searchData) {
        if (Object.prototype.toString.call(objArray) != '[object Array]')
            return [];
        if (objArray.length == 0)
            return [];
        if (objArray[0][searchKey] == null)
            return [];
        if (Object.prototype.toString.call(searchData) == '[object String]') {
            var t = searchData;
            searchData = Array();
            searchData[0] = t;
        }
        var result = Array();
        var idx = 0;
        for (var ii = 0, ol = objArray.length; ii < ol; ii++) {
            if (HTool.inArray(objArray[ii][searchKey], searchData))
                result[idx++] = objArray[ii];
        }
        return result;
    };

    // OBJECT 배열에서 특정 ITEM(Key)의 값을 검색해서 일치하는 OBJECT를 제거한다.
    // var objArr = [{"ID": "AAA", "NM":"유태상"},{"ID":"BBB","NM":"지니프릭스"}, {"ID":"BBB","NM":"스튜디오B"}];
    // HTool.removeJsonObjectArray(objArr, "ID", "BBB");
    // 결과값 : [{"ID": "AAA", "NM":"유태상"}]
    this.removeJsonObjectArray = function (objArray, searchKey, searchData) {
        if (Object.prototype.toString.call(objArray) != '[object Array]')
            return null;
        if (objArray.length == 0)
            return null;
        if (objArray[0][searchKey] == null)
            return null;
        if (Object.prototype.toString.call(searchData) == '[object String]') {
            var t = searchData;
            searchData = Array();
            searchData[0] = t;
        }
        var result = Array();
        var idx = 0;
        for (var ii = 0, ol = objArray.length; ii < ol; ii++) {
            if (!HTool.inArray(objArray[ii][searchKey], searchData))
                result[idx++] = objArray[ii];
        }
        return result;
    };

    // 불러올 리소스가 같은 이름 패턴으로 여러개 일때 url 셋팅해주는 함수
    this.getURLs = function (root, name, type, length) {
        if (arguments.length != 4) console.error("[HMF] getURLs Arguments Error");
        var urlArr = [];
        var url = "";

        for (var i = 0; i < length; i++) {
            url = root + name + i + type;
            urlArr.push(url);
        }

        return urlArr;
    };

    // 글자를 한개씩 분리하여 배열에 저장
    this.toCharArray = function (str) {
        if (Object.prototype.toString.call(str) != "[object String]") {
            console.error("Not String !!");
        }
        var result = [];
        for (var i = 0, sl = str.length; i < sl; i++) {
            result.push(str.substring(i, i + 1));
        }
        return result;
    };

    // 글자를 원하는 개수만큼 분리하여 배열에 저장
    this.toCharArrayWithLength = function (str, len) {
        if (Object.prototype.toString.call(str) != "[object String]") {
            console.error("Not String !!");
        }
        if (isNaN(len)) len = Number(len);
        var arr = [];
        for (var i = 0; i < str.length; i += len) {
            arr.push(str.substring(i, i + len));
        }
        return arr;
    };

    this.getRandomRangeValue = function (first, last) {
        return Math.floor((Math.random() * (last - first)) + first);
    };

    this.toCharArrayWithWidth = function (text, maxWidth) {
        var words = text.split("");
        var lines = [];
        var currentLine = words[0];
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = g.measureText(currentLine + word).width;
            if (width < maxWidth) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
            word = null;
            width = null;
        }
        lines.push(currentLine);
        words = null;
        currentLine = null;
        return lines;
    };

    // 2차원 배열 만들기
    this.make2DArray = function (num, num2) {
        var arr = new Array(num);
        for (var i = 0; i < num; i++) {
            if (num2 == null)
                arr[i] = new Array();
            else if (num2 > 0) {
                arr[i] = new Array(num2);
            }
        }
        return arr;
    };

    this.indexPlus = function (curIdx, maxIndex) {
        return (curIdx + 1) % maxIndex;
    };

    this.indexMinus = function (curIdx, maxIndex) {
        return (curIdx - 1 + maxIndex) % maxIndex;
    };

    /**
     * 연산된 인덱스값 반환. 방향키나 OK키로 depth 만큼 이동되는 메뉴, 기타 인덱스 연산등에서 사용
     * @param curIdx 현재 인덱스
     * @param depth 이동(키) 값
     * @param len 전체 메뉴길이
     * @return 연산된 인덱스 값
     */
    this.getIndex = function (curIdx, depth, len) {
        curIdx += depth;
        if (curIdx < 0)
            curIdx += len;
        else if (curIdx >= len)
            curIdx -= len;
        return curIdx;
    };

    /**
     * 현재 인덱스를 제외한 숫자를 랜덤으로 선택
     * @param CurIndex 현재 인덱스
     * @param length 인덱스 길이
     * @return 현재 인덱스를 제외한 랜덤숫자
     */
    this.getAnotherIndex = function (CurIndex, length) {
        return (CurIndex + new Random().nextInt(length - 1) + 1) % length;
    };

    /**
     * 한글 String 마지막 글자의 받침여부 확인
     * @param txt 받침 여부를 확인할 문자열 (마지막글자가 한글이어야함).
     * @return 마지막 글자의 받침여부 (한글이 아닌경우 false)
     */
    this.haveBatchim = function (txt) {
        txt = txt.toString();
        var code = txt.charCodeAt(txt.length - 1) - 44032;

        // 한글이 아닐 때
        if (code < 0 || code > 11171)
            return false;

        // 한글일 때
        if (code % 28 == 0)
            return false;
        else
            return true;
    };

    this.getBoolean = function (str) {
        return str == "true" || "TtYy1".indexOf(str) > -1;
    };

    // yyyyMMddHHmmSS
    this.compareTime = function (curDate, endDate) {
        var cd = dateConvert(curDate);
        var ed = dateConvert(endDate);

        return Number(ed) - Number(cd);
    };

    // 밀리초를 시간으로 표시 (hh:mm:ss) 
    this.msecToTime = function (msec) {
        var totalSec = newParseInt(msec / 1000);
        var totalMin = newParseInt(totalSec / 60);

        var nHour = newParseInt(totalMin / 60);
        var nMin = totalMin % 60;
        var nSec = totalSec % 60;

        return {
            "hour": nHour,
            "min": nMin,
            "sec": nSec
        };
    };

    // yyyyMMddHHmmSS
    var dateConvert = function (date) {
        var setDateValue = date.toString().substring(4, 6) + "/" + date.toString().substring(6, 8) + "/" + date.toString().substring(0, 4);
        console.error("setDateValue >> ", setDateValue);
        
        var ret = new Date(setDateValue);
//        ret.setFullYear(date.toString().substring(0, 4));
//        ret.setMonth(date.toString().substring(4, 6));
//        ret.setDate(date.toString().substring(6, 8));
        ret.setHours(date.toString().substring(8, 10));
        ret.setMinutes(date.toString().substring(10, 12));
        ret.setSeconds(date.toString().substring(12, 14));
//        var ret = new Date();
//        ret.setFullYear(date.toString().substring(0, 4));
//        ret.setMonth(date.toString().substring(4, 6));
//        ret.setDate(date.toString().substring(6, 8));
//        ret.setHours(date.toString().substring(8, 10));
//        ret.setMinutes(date.toString().substring(10, 12));
//        ret.setSeconds(date.toString().substring(12, 14));
        return Date.parse(ret);
    };

    this.getDateStr = function () {
        var date = new Date();
        return HTool.leadingZero(date.getFullYear(), 4) +
            HTool.leadingZero(date.getMonth() + 1, 2) +
            HTool.leadingZero(date.getDate(), 2) +
            HTool.leadingZero(date.getHours(), 2) +
            HTool.leadingZero(date.getMinutes(), 2) +
            HTool.leadingZero(date.getSeconds(), 2);
    }

    this.getDateStrWithMilliSeconds = function () {
        var date = new Date();
        return HTool.leadingZero(date.getFullYear(), 4) +
            HTool.leadingZero(date.getMonth() + 1, 2) +
            HTool.leadingZero(date.getDate(), 2) +
            HTool.leadingZero(date.getHours(), 2) +
            HTool.leadingZero(date.getMinutes(), 2) +
            HTool.leadingZero(date.getSeconds(), 2) +
            HTool.leadingZero(date.getMilliseconds(), 2);
    }

    // ObjectArray 정렬
    this.sortingObjectArray = function (objArr, value, sort) {
        if (!sort || sort == 0) {
            objArr.sort(function (a, b) {
                if (!isNaN(a[value]) && !isNaN(b[value])) return Number(a[value]) < Number(b[value]) ? -1 : Number(a[value]) > Number(b[value]) ? 1 : 0;
                else return a[value] < b[value] ? -1 : a[value] > b[value] ? 1 : 0;
            })
        } else {
            objArr.sort(function (a, b) {
                if (!isNaN(a[value]) && !isNaN(b[value])) return Number(a[value]) < Number(b[value]) ? 1 : Number(a[value]) > Number(b[value]) ? -1 : 0;
                else return a[value] < b[value] ? 1 : a[value] > b[value] ? -1 : 0;
            })
        }
    }

    /**
     * ObjectArray를 복사 (서로 참조 안함)
     * @param {ObjectArray} array
     * @returns {ObjectArray} 복사된 ObjectArray
     */
    this.cloneObjectArray = function (array) {
        return JSON.parse(JSON.stringify(array));
    }

    /**
     * Array를 복사 (서로 참조 안함)
     * @param {Array} array
     * @returns {Array} 복사된 Array
     */
    this.cloneArray = function (array) {
        return array.slice(0);
    }

    /**
     * 유효한 이미지인지 확인
     * @param {image} img
     * @returns {Boolean}
     */
    this.isImage = function (img) {
        if (Object.prototype.toString.call(img) == "[object HTMLImageElement]") {
            if (img.src == "") return false;
            if (!img.complete) return false;
            if (!img.naturalWidth) return false;
        } else {
            return false;
        }
        return true;
    };

    this.getImgWidth = function (width) {
        return (width * 960) / 1280;
    };

    this.getImgHeight = function (height) {
        return (height * 960) / 1280;
    };

    this.startsWidth = function(str1, str2) {
        var isEqual = true;
        for(var i=0; i<str2.length; i++) {
            if(str1[i] != str2[i]) {
                isEqual = false;
            }
        }
        return isEqual;
    };

    this.replaceAll = function(str, regex, replacement) {
        var temp = [];
        for (var i = 0; i < str.length; i++) {
            temp[i] = str[i].split(regex).join(replacement);
        }
        return temp;
    };
};

// Java 의 ArrayList 와 동일한 메소드 구현
var ArrayList = function () {
    this.array = new Array();
};
ArrayList.prototype.add = function () {
    if (arguments.length == 1) this.array[this.array.length] = arguments[0];
    else if (arguments.length == 2) this.array.splice(arguments[1], 0, arguments[0]);
    else console.error("[HMF][ArrayList] Add Error - Wrong Arguments");
}
ArrayList.prototype.size = function () {
    return this.array.length;
};
ArrayList.prototype.get = function (index) {
    return this.array[index];
};
ArrayList.prototype.clear = function () {
    this.array = [];
};
ArrayList.prototype.remove = function (obj) {
    for (var i = this.array.length - 1; i >= 0; i--) {
        if (this.array[i] == obj) {
            this.array.splice(i, 1);
        }
    }
};
ArrayList.prototype.removeIndex = function (index) {
    this.array.splice(index, 1);
};
ArrayList.prototype.removeAll = function () {
    this.array = [];
};
ArrayList.prototype.contains = function (obj) {
    return $.inArray(obj, this.array) != -1;
};
ArrayList.prototype.isEmpty = function () {
    return this.array.size <= 0;
};
ArrayList.prototype.getArray = function () {
    return this.array;
};

// Java 의 Random 함수와 동일한 메소드 구현
var Random = function () {
};
Random.prototype.nextInt = function (_num) {
    return Math.floor(Math.random() * _num);
};

