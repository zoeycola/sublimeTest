/**
 * 计时器
 *
 */
define(function(require, exports, module) {
    /**
     *
     * @param n 当前时间
     * @param d 结束时间
     * @constructor
     */
    function Timer(now, d) {
        this.setDifferTime(d.getTime() - now.getTime());
    }

    Timer.prototype.setDifferTime = function(val){
        this.differTime = val;
        if (this.differTime < 0) {
            this.differTime = 0;
        }
        this.d = parseInt(this.differTime / 1e3 / 3600 / 24);
        //天
        this.h = parseInt(this.differTime / 1e3 / 3600);
        //小时
        this.h = this._fillZero(this.h);
        this.m = parseInt(this.differTime / 1e3 % 3600 / 60);
        //分钟
        this.m = this._fillZero(this.m);
        this.s = parseInt(this.differTime / 1e3 % 3600 % 60);
        //秒
        this.s = this._fillZero(this.s);
        this.ps = parseInt(this.differTime / 100 % 36e3 % 600 % 10);
        //小数秒
        this.ps = this.ps;
        this.pps = parseInt(this.differTime / 10 % 36e4 % 6e3 % 10 % 10);
        //百分秒
        this.pps = this.pps;
    }

    Timer.prototype.toStringIndex = function() {
        this.h = this.h % 24;
        if (this.d == 0) {
            return "<em>" + this.h + "</em>" + "时" + "<em>" + this.m + "</em>" + "分" + "<em>" + this.s + "</em>" + "秒";
        } else if (this.d == 0 && this.h == 0) {
            return "<em>" + this.m + "</em>" + "分" + "<em>" + this.s + "</em>" + "秒";
        }
        return "<em>" + this.d + "</em>" + "天" + "<em>" + this.h + "</em>" + "时" + "<em>" + this.m + "</em>" + "分" + "<em>" + this.s + "</em>" + "秒";
    };
    Timer.prototype.toString0 = function() {
        if (this.differTime == 0) {
            return "已结束";
        }
        return this.h + ":" + this.m + ":" + this.s + "." + this.ps;
    };


    Timer.prototype.toString1 = function() {
        if (this.differTime == 0) {
            return "已结束";
        }
        this.h = this.h % 24;
        return "<em>" + this.d + "</em>" + "天" + "<em>" + this.h + "</em>" + "时" + "<em>" + this.m + "</em>" + "分" + "<em>" + this.s + "</em>" + "秒";
    };
    Timer.prototype.toString2 = function() {
        this.h = this.h % 24;
        return this.d + "天" + this.h + "时" + this.m + "分" + this.s + "秒";
    };
    Timer.prototype.toString3 = function() {
        if (this.differTime == 0) {
            return "已结束";
        }
        this.h = this.h % 24;
        return "<b>" + this.d + "</b>天<b>" + this.h + "</b>时<b>" + this.m + "</b>分<b>" + this.s + "</b>秒";
    };
    Timer.prototype.toString4 = function() {
        return this.h + "小时" + this.m + "分" + this.s + "秒";
    };
    Timer.prototype.toString5 = function() {
        return this.h + ":" + this.m + ":" + this.s;
    };
    Timer.prototype._fillZero = function(n) {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    };
    Timer.prototype.getTime = function() {
        var t = new Array();
        var s_h = "";
        if (this.h > 1e4) {
            s_h += "<em>" + parseInt(this.h / 1e4) + "</em>";
        }
        if (this.h > 1e3) {
            s_h += "<em>" + parseInt(this.h % 1e4 / 1e3) + "</em>";
        }
        if (this.h > 100) {
            s_h += "<em>" + parseInt(this.h % 1e3 / 100) + "</em>";
        }
        s_h += "<em>" + parseInt(this.h % 100 / 10) + "</em><em class='nomr'>" + this.h % 10 + "</em>：";
        t.push(s_h);
        var s_m = "<em>" + parseInt(this.m / 10) + "</em><em class='nomr'>" + this.m % 10 + "</em>：";
        t.push(s_m);
        var s_s = "<em>" + parseInt(this.s / 10) + "</em><em class='nomr'>" + this.s % 10 + "</em>";
        t.push(s_s);
        return t;
    };
    module.exports = Timer;
});