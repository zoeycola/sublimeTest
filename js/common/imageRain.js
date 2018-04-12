/**
 * Created by 55Haitao on 2016/11/8.
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var util = require('common/util');
    var rotate = require('common/jquery.rotate.min.js');

    function ImageInstance(imgStr, sp, angle, angleSp){
        this.speed = sp*0.001;
        this.angle = angle*Math.PI/180;
        this.angleSp = angleSp*0.001;
        this.node = $(imgStr);
        this.node.css('position', 'fixed');
        this.node.css('z-index', 999);
        this.restart();
    }
    ImageInstance.prototype.isFinished = false;
    ImageInstance.prototype.restart = function(){
        this.curAngle = util.getRandRange(0, 180);
        this.node.rotate(this.curAngle);
        this.node.css('top', -this.node.height());
        this.node.css('left', util.getRandRange(20,100)+"%");
        $('body').append(this.node);
        this.isFinished = false;
    };
    ImageInstance.prototype.updateTick = function(dt){
        var xPos = parseInt(this.node.css('left')) + this.speed*dt*Math.sin(this.angle);
        var yPos = parseInt(this.node.css('top')) + this.speed*dt*Math.cos(this.angle);
        if(xPos < -this.node.width() || xPos > util.getWindowWidth() + this.node.width() || yPos > util.getWindowHeight()+this.node.height()){
            this.isFinished = true;
            return;
        }
        this.node.css('top',yPos);
        this.node.css('left',xPos);
        this.curAngle += this.angleSp*dt;
        this.node.rotate(this.curAngle);
    };

    ImageInstance.prototype.destroy = function(){
        this.node.remove();
        this.isFinished = true;
    };

    /**
     * 图片雨
     * @param imgs 图片
     * @param odds 图片出现概率
     * @constructor
     */
    function ImageRain(imgs, odds){
        if(imgs instanceof Array){
            this.baseList = imgs;
        }else{
            this.baseList = [imgs];
        }
        if(odds){
            this.oddList = odds;
        }else{
            this.oddList = [];
            var imgLen = this.baseList.length;
            var avOdd = 1/imgLen;
            for(var i = 0; i < imgLen; i++){
                this.oddList.push(avOdd);
            }
        }
        this.dataList = [];
        this.cacheList = [];
    }

    /**
     * 开始下雨
     * @param timeGap 雨点出现间隔(ms)
     * @param speed 移动速度(px/s)
     * @param angle 移动角度
     * @param angleSp 角速度(角度/s)
     * @param count 最高数量
     */
    ImageRain.prototype.start = function(timeGap, speed, angle, angleSp, count){
        this.timeGap = timeGap || 300;
        this.speed = speed || 300;
        this.angle = angle || -35;
        this.angleSp = angleSp || 50;
        this.count = count || 0;
        this.lifeTime = Date.now();
        this.rainTime = 0;
        this.timer = setInterval(this.onTimeEnter.bind(this), 4);
    };

    ImageRain.prototype.onTimeEnter = function(){
        var curTime = Date.now();
        var dltTime = curTime - this.lifeTime;
        this.lifeTime = curTime;
        this.rainTime += dltTime;
        for(var i = 0; i < this.dataList.length; i++){
            var imgNode = this.dataList[i];
            imgNode.updateTick(dltTime);
            if(imgNode.isFinished){
                imgNode.destroy();
                this.cacheList.push(imgNode);
                this.dataList.splice(i, 1);
                i--;
            }
        }
        if(this.count > 0 && this.dataList.length >= this.count){
            return;
        }
        if(this.rainTime > this.timeGap){
            this.rainTime = 0;
            this.activeImageInstance();
        }
    };

    ImageRain.prototype.activeImageInstance = function(){
        if(this.cacheList.length > 0){
            var img = this.cacheList.shift();
            img.restart();
        }else{
            var idx = util.pickRandData(this.oddList, 1)[0];
            var imgStr = this.baseList[idx];
            img = new ImageInstance(imgStr, this.speed, this.angle, this.angleSp);
        }
        this.dataList.push(img);
    };

    ImageRain.prototype.stop = function(){
        clearInterval(this.timer);
        this.dataList.forEach(function(img){
            img.destroy();
        });
        this.dataList = [];
        this.cacheList = [];
    };

    module.exports = ImageRain;
});
