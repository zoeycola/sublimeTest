/**
 * Created by yuanx on 2014/12/25.
 */
define(function(require, exports, module) {
	var $ = require("jquery");
	/**
	 * 函数节点流
	 * @param method
	 * @param context
	 */
	exports.throttle = function(method, context) {
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 50);
	};
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	/**
	 * 反射调用方法
	 * @param obj
	 * @param method
	 */
	exports.call = function(obj, method) {
		for (var p in obj) {
			if (p.toString() == method.toString()) {
				if (typeof obj[p] == "function") {
					return obj[p]();
				}
			}
		}
	};
	/**
	 * 模拟文本框placeholder效果
	 * @param target
	 * @param initText
	 */
	function placeholder(target, initText) {
	   if ($(target).val() == '' || $(target).val() == initText) {
			$(target).val(initText);
			$(target).focus(function() {
				if ($(this).val() == initText) {
					$(this).val("");
				}
			}).keydown(function() {
				if ($(this).val() == initText) {
					$(this).val("");
				} else {

				}
			}).blur(function() {
				if ($(this).val().length == 0) {
					$(this).val(initText);
				}
			});
	   }
	}
	/**
	 * 判断IE8
	 * @returns {boolean}
	 */
	function isIE8() {
		var browser = navigator.appName;
		var b_version = navigator.appVersion;
		var version = b_version.split(";");
		if (browser == "Microsoft Internet Explorer") {
			var trim_Version = version[1].replace(/[ ]/g, "");
			return trim_Version == "MSIE8.0";
		}
		return false;
	}
	//设置全局cookie
	function total_setCookie(c_name, value, expiredays) {
		var exdate = new Date();
		if (typeof expiredays == "undefined") {
			var expiredays = 10 * 365;
		}
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
	}
	//获取全局cookie
	function total_getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	exports.placeholder = placeholder;
	exports.isIE8 = isIE8;
	exports.total_setCookie = total_setCookie;
	exports.total_getCookie = total_getCookie;

	/**
	 * 按概率随机数组
	 * @param randList 概率数组
	 * @param resCnt 抽取个数
	 * @return 结果索引数组
	 */
	exports.pickRandData = function(randList, resCnt){
		var aRet = [];
		var baseList = [];
		var dataCnt = randList.length;
		for(var i = 0; i < dataCnt; i++){
			baseList.push(i);
		}
		for(i = 0; i < resCnt; i++){
			var randStand = Math.random();
			var randVal = 0;
			for(var j = 0; j < dataCnt; j++){
				randVal += randList[j];
				if(randVal > randStand){
					aRet.push(j);
					break;
				}
			}
		}
		return aRet;
	};

	/**
	 * 获取区间随机数
	 * @param minNum 最小值
	 * @param maxNum 最大值
	 * @return 取整结果
	 */
	exports.getRandRange = function(minNum, maxNum){
		return minNum + Math.floor(Math.random()*(maxNum+1-minNum));
	}

	//滚动条在Y轴上的滚动距离
	exports.getScrollTop = function() {
		var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		if (document.body) {
			bodyScrollTop = document.body.scrollTop;
		}
		if (document.documentElement) {
			documentScrollTop = document.documentElement.scrollTop;
		}
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		return scrollTop;
	}

	//文档的总高度
	exports.getScrollHeight = function() {
		var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		if (document.body) {
			bodyScrollHeight = document.body.scrollHeight;
		}
		if (document.documentElement) {
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
		return scrollHeight;
	}

	//浏览器视口的高度
	exports.getWindowHeight = function() {
		var windowHeight = 0;
		if (document.compatMode == "CSS1Compat") {
			windowHeight = document.documentElement.clientHeight;
		} else {
			windowHeight = document.body.clientHeight;
		}
		return windowHeight;
	};

	//浏览器视口的宽度
	exports.getWindowWidth = function() {
		var windowWidth = 0;
		if (document.compatMode == "CSS1Compat") {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = document.body.clientWidth;
		}
		return windowWidth;
	};

	exports.isMobile = function(){
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				return true;
			}
		}
		return false;
	};
});