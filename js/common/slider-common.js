/**
 * Created by yuanx on 2015/1/15.
 * 通用滚动
 */

/*
 * Update by chenxiulong on 2015/12/3
 * 新增无缝滚动 effect: "infinite"
 */
define(function(require, exports, module) {
    var $ = require("jquery");
    function SliderCommon() {}
    SliderCommon.prototype.curIndex = 0;
    SliderCommon.prototype.option = {
        container: "#slider",
        index: 0,
        auto: true,
        time: 5e3,
        leftNav: "",
        rightNav: "",
        isPointerNav: false,
        inLineNav: false,
        //是否包含原点切换
        bannerPointerClass: "direct-banner-pointer",
        afterSlide: null,
        //一开始显示第几页的内容
        whichPage: 1,
        //滑动完成后回调
        effect: "slide",
        outNav: false
    };
    //默认配置
    /**
     * 初始化
     * @private
     */
    SliderCommon.prototype.init = function() {
        var _this = this;
        if(this.option.outNav){
          this.container.siblings(this.option["rightNav"]).unbind("click").bind("click", function() {
              _this.slideRight();
          });
          this.container.siblings(this.option["leftNav"]).unbind("click").bind("click", function() {
              _this.slideLeft();
          });
        }
        else{
          this.container.find(this.option["rightNav"]).unbind("click").bind("click", function() {
              _this.slideRight();
          });
          this.container.find(this.option["leftNav"]).unbind("click").bind("click", function() {
              _this.slideLeft();
          });
        }
    };
    /**
     * 渲染
     */
    SliderCommon.prototype.render = function(op) {
        this.option = $.extend(false, this.option, op);
        this.container = $(this.option["container"]);
        if (this.option.effect == "infinite") {
            var lilen = this.container.children(".move-box").children("li").size();
            var parentwidth = this.container.width();
            if ( lilen > 1) {
                var newfirstli = this.container.children(".move-box").children('li').eq(0).clone(true);
                var newlastli = this.container.children(".move-box").children('li').eq(lilen-1).clone(true);
                newfirstli.appendTo(this.container.children(".move-box"));
                newlastli.prependTo(this.container.children(".move-box"));
                this.eachliwidth = parentwidth;
                this.container.children(".move-box").css('width', this.eachliwidth*(lilen+2));
            }
        }
        this.len = this.container.children(".move-box").children("li").size();
        if (this.len <= 1) {
            if(!this.option.outNav){
                this.container.off('mouseenter').unbind('mouseleave');
            }
            return;
        }
        var _this = this;
        if(!this.option.outNav){
          this.container.hover(function() {
              $(this).find(_this.option["leftNav"]).show();
              $(this).find(_this.option["rightNav"]).show();
          }, function() {
              $(this).find(_this.option["leftNav"]).hide();
              $(this).find(_this.option["rightNav"]).hide();
          });
        }
        this.init();
        if (this.option["auto"]) {
            this.autoSlide();
        }
        if (this.option["isPointerNav"]) {
            var banner_pointer = $("<div class='" + this.option["bannerPointerClass"] + "'></div>");
            var $ul = $("<ul></ul>");
            for (var i = 0; i < this.len; i++) {
                var $li = $("<li></li>");
                if (i == this.option["index"]) {
                    $li.addClass("cur").appendTo($ul);
                } else {
                    $li.appendTo($ul);
                }
                $li.bind("click", function() {
                    var i = $(this).index();
                    clearInterval(_this.sliderTimer);
                    _this.slide(i);
                });
            }
            $ul
                // .addClass("clearfix")
                .appendTo(banner_pointer);
            // var l = -(20 * this.len + 2) / 2;
            // if(!this.option["inLineNav"])
            //     banner_pointer.css("marginLeft", l + "px");
            banner_pointer.appendTo(this.container);
            banner_pointer.on('click', 'li', function(event) {
                banner_pointer.find('li').removeClass('cur');
                $(this).addClass('cur');
            })
        }
        if (this.option.effect == "infinite") {
            this.slide(this.option["whichPage"]);
        }
        else{
            this.slide(this.option["index"]);
        }
    };
    /**
     * 滑动
     * @param i
     */
    SliderCommon.prototype.slide = function(i) {
        var slider = this.container.children(".move-box");
        var _this = this;
        if (slider.is(":animated") || slider.children("li").is(":animated")) {
            return;
        }
        var cb = this.option.afterSlide;
        if (this.option.effect == "slide") {
            //滑动
            var l = -slider.children("li").eq(0).outerWidth(true)*i;
            slider.animate({
                left: l
            }, 400, cb);
            cb = null;
        } else if (this.option.effect == "fade") {
            //淡入淡出
            slider.children("li").eq(this.curIndex).fadeOut();
            slider.children("li").eq(i).fadeIn();
        } else if (this.option.effect == "infinite"){
            if (_this.curIndex == 0) {
                if (i == _this.len-1) {
                    _this.container.children(".move-box").css('left', -(_this.len-2)*_this.eachliwidth);
                    i = _this.len-3;
                }
            }
            if (_this.curIndex == _this.len-1) {
                if ( i== 0) {
                    _this.container.children(".move-box").css('left', -_this.eachliwidth);
                    i = 2;
                }
            }
            var l = -this.container.width() * i;
            slider.animate({
                left: l + "px"
            });
        }
        if (this.option["isPointerNav"]) {
            var sliderPointer = this.container.children("." + this.option["bannerPointerClass"]).find("li");
            sliderPointer.removeClass("cur");
            sliderPointer.eq(i).addClass("cur");
        }
        this.curIndex = i;
        /*执行回调*/
        if (cb) {
            cb();
        }
    };
    /**
     * 左滑动
     */
    SliderCommon.prototype.slideLeft = function() {
        var nextIndex;
        if (this.curIndex > 0) {
            nextIndex = this.curIndex - 1;
        } else {
            nextIndex = this.len - 1;
        }
        clearInterval(this.sliderTimer);
        this.sliderTimer = null;
        this.slide(nextIndex);
    };
    /**
     * 右滑动
     */
    SliderCommon.prototype.slideRight = function() {
        var nextIndex;
        if (this.curIndex < this.len - 1) {
            nextIndex = this.curIndex + 1;
        } else {
            nextIndex = 0;
        }
        clearInterval(this.sliderTimer);
        this.sliderTimer = null;
        this.slide(nextIndex);
    };
    /**
     * 自动滑动
     */
    SliderCommon.prototype.autoSlide = function() {
        var _this = this;
        this.sliderTimer = setInterval(function() {
            var nextIndex;
            if (_this.curIndex < _this.len - 1) {
                nextIndex = _this.curIndex + 1;
            } else {
                nextIndex = 0;
            }
            _this.slide(nextIndex);
        }, _this.option["time"]);
    };
    module.exports = SliderCommon;
});