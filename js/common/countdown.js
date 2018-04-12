/**
 * Created by yuanx on 2015/1/22.
 * 通用倒计时
 */
define(function(require, exports, module) {
    var $ = require("jquery");
    var Timer = require("common/timer");
    var util = require("common/util");
    /**
     * 倒计时
     * @param target dom选择器表达式
     * @param time 时间间隔
     * @param now 当前时间戳
     * @param endtime 结束时间戳
     * @param method 调用方法
     * @constructor
     */
    function countdown(target, time, now, endtime, method, callback) {
        function count() {
            now += time;
            t.setDifferTime(endtime - now);
            $(target).each(function() {
                $(this).html(util.call(t, method));
            });
            if(callback){
                callback();
            }
        }
        var timerID;
        var t = new Timer(new Date(), new Date());
        t.setDifferTime(endtime - now);
        this.start = function(){
            $(target).each(function() {
                $(this).html(util.call(t, method));
            });
            timerID = setInterval(count, time);
            if(callback){
                callback();
            }
        };
        this.getLeftTime = function(){
            return t.differTime;
        };
        this.setCurTime = function(val){
            now = val;
        };
        this.destroy = function(){
            clearInterval(timerID);
        }
    }
    module.exports.timer = Timer;
    module.exports.countdown = countdown;
});