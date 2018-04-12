/**
 * Created by 55Haitao on 2016/11/8.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var util = require('common/util');
    /**
     * 弹幕
     * @param container 容器
     * @param timeGap 每一条出现间隔(ms)
     * @constructor
     */
    function Barrage(container,timeGap,bgList){
        this.container = container;
        this.timeGap = timeGap || 1000;
        if(bgList){
            this.bgList = (bgList instanceof Array) ? bgList : [bgList];
        }else{
            this.bgList = ['rgba(0,0,0,0.5)'];
        }

        this.elementList = [];
        this.elementIdx = 0;
    }

    Barrage.prototype.start = function(){
        this.timer = setInterval(this.createInstance.bind(this), this.timeGap);
    };

    Barrage.prototype.stop = function(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = 0;
        }
    };

    Barrage.prototype.createInstance = function(){
        var element = this.elementList[this.elementIdx];
        if(!element){
            return;
        }
        this.elementIdx++;
        this.elementIdx = this.elementIdx%this.elementList.length;
        var bgIdx = Math.floor(Math.random()*this.bgList.length);
        var nodeStr = ["<div style='position:absolute;white-space:nowrap;display:inline-block;background: ", this.bgList[bgIdx],
            ";z-index:40;border-radius: 30px;overflow: hidden;top:",
            util.getRandRange(0,this.container.height()),"px;left:",
            util.getWindowWidth(),"px'>", element, "</div>"].join('');
        var node = $(nodeStr);
        this.container.append(node);
        node.animate({left:-node.width()+'px'}, util.getRandRange(20000,30000), 'linear', function(){
            $(this).remove();
        });
    };

    Barrage.prototype.insert = function(element) {
        this.elementList.splice(this.elementIdx, 0, element);
    };

    module.exports = Barrage;
});