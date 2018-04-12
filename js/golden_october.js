/**
 * Created by 55Haitao on 2017/3/27.
 */
seajs.use(['jquery', 'slider', 'lazyload'], function($,slider,lazy){
    $(function(){
        // debugger
        $('.box-list-container').each(function(idx, elem) {
            var $this = $(elem);
            var sliderObj = new slider();
            var icon = $this.find('.img').lazyload({
                failure_limit: 60
            });
            // $this.find('.slider-prev').hide();
            // $this.find('.slider-next').hide();
            sliderObj.render({
                container: $this,
                leftNav: $this.find('.slider-prev'),
                rightNav: $this.find('.slider-next'),
                auto: false,
                controls: false,
                effect: "slide",
                afterSlide: function() {
                    var icon = $this.find('.img').lazyload({
                        failure_limit: 60
                    });
                    setTimeout(function() {
                        icon.update();
                    }, 300);
                }
            });
        });
   
        checkFloatMenu();
        var page = 0;

        function checkFloatMenu() {
            var docH = $(document).height();
            var winH = $(window).height();
            var pos = $(document).scrollTop();
            var offsetBottom = docH - pos - winH;
            if (pos >200) {
                $('.float-menu').show();
                var pageIdx = 0;
                $('.page').each(function(index) {
                    if ($(this).offset().top - 200 > pos) {
                        return false;
                    }
                    pageIdx = index;
                });
                $('.float-menu ul li').eq(pageIdx).addClass('cur').siblings().removeClass('cur');
            } else {
                $('.float-menu').hide();
            }

        }
        window.onscroll = checkFloatMenu;

        showComList(0);
        
        function showComList(pageIdx) {
            $('.box-hotStore .hotstore-container').eq(pageIdx).removeClass('none').siblings().addClass('none');
            var dealIcon = $('.box-hotStore .hotstore-container').eq(pageIdx).find('.img').lazyload({
                failure_limit: 60
            });
            var $this = $('.box-hotStore .hotstore-container').eq(pageIdx);
            $this.find('.slider-prev').hide();
            $this.find('.slider-next').hide();
            var sliderObj = new slider();
            sliderObj.render({
                container: $this,
                leftNav: $this.find('.slider-prev'),
                rightNav: $this.find('.slider-next'),
                auto: false,
                controls: false,
                effect: "slide",
                afterSlide: function() {
                    var dealIcon = $('.box-hotStore .hotstore-container').eq(pageIdx).find('.img').lazyload({
                        failure_limit: 60
                    });
                    setTimeout(function() {
                        dealIcon.update();
                    }, 300)
                }
            });
        }
        $('.float-menu ul li').not('.top-btn').click(function() {
            console.log(1);
            var pageIdx = $(this).index();
            var pageNode = $('.page').eq(pageIdx);
            var pos = pageNode.offset().top;
            $('html,body').animate({
                scrollTop: pos
            }, 400);
        });

        $('.float-menu .top-btn').click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, 400);
        });
    });
});