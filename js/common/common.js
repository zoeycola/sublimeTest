/**
 * Created by yuanx on 2015/1/15.
 * 通用
 */
define(function(require, exports, module) {
 	var $ = require('jquery');
 	$(function(){
 		$('#deal_list').delegate('.praise',"click",function(){
			var _id = $(this).attr('data_id');
			var _type = $(this).attr('type');
			var _praise_count = $(this).attr('praise_count');
			var _href = $(this).attr('target_url');
			var _view_p = $(this).attr('view_p');
			if(_view_p == "undefined"){
				_view_p = 0;
			}
			click_praise(_id,_type,_praise_count,_href,_view_p);
		});

		$('#deals_hot').delegate('.praisehot',"click",function(){
			var _id = $(this).attr('data_id');
			var _type = $(this).attr('type');
			var _praise_count = $(this).attr('praise_count');
			var _href = $(this).attr('target_url');
			var _view_p = $(this).attr('view_p');
			if(_view_p == "undefined"){
				_view_p = 0;
			}
			click_hot_prais(_id,_type,_praise_count,_href,_view_p);
		});

		$('#deals_fmtc').delegate('.praisefmtc',"click",function(){
			var _id = $(this).attr('data_id');
			var _type = $(this).attr('type');
			var _praise_count = $(this).attr('praise_count');
			var _href = $(this).attr('target_url');
			var _view_p = $(this).attr('view_p');
			if(_view_p == "undefined"){
				_view_p = 0;
			}
			click_fmtc_prais(_id,_type,_praise_count,_href,_view_p);
		});
 		//$(".praise").click(function(){
			//var _id = $(this).attr('data_id');
			//var _type = $(this).attr('type');
			//var _praise_count = $(this).attr('praise_count');
			//var _href = $(this).attr('target_url');
			//var _view_p = $(this).attr('view_p');
			//if(_view_p == "undefined"){
			//	_view_p = 0;
			//}
			//click_praise(_id,_type,_praise_count,_href,_view_p);
 		//});
 	});
    $("#icon_gotop").click(function(){
        $("html,body").animate({scrollTop:"0px"});
    });

	function click_fmtc_prais(id,type,number,href,viewp){
		jQuery.ajax({
			url:href,
			data:{a:'click_praise', id:id, type:type},
			type:'post',
			dataType:'json',
			success:function(data){
				if (data.status == '-1') {
					if(data.data == '您已经赞过！'){
						popdlg_t().show_t('您已经赞过了哦！','/Public/images/succeed-bg2.png','501px','47px');
					}else{
						popdlg_t().show_t(data.data,'/Public/images/succeed-bg2.png','501px','47px');
					}
				}else if(data.status == '-2'){
					popdlg().show('您尚未登录','/Public/login-show.html','409px','507px','465px');
				}else{
					number = parseInt(number)+1;
					var plus1 = jQuery('<div style="position: absolute;left: 50px;bottom: 20px;color: #ff4200;font-size: 16px;font-weight: bold;">+1</div>');
					jQuery('#praise_fmtc_'+id).append(plus1);
					plus1.animate({'bottom': '30px', 'opacity': '0'}, 500 ,function(){
						plus1.remove();
					});
					popdlg_t().show_t('点赞成功','/Public/images/succeed-bg1.png','501px','47px');
					if(viewp == 1){
						$("#c_praise").html(number);
					}else{
						change_fmtc_praisenum(id,number);
					}
					/*var plus1 = $('<div>+1</div>')
					 jQuery('#praise_'+id).add('selector/elements/html')*/
				}
			}
		});
	}

	function click_hot_prais(id,type,number,href,viewp){
		jQuery.ajax({
			url:href,
			data:{a:'click_praise', id:id, type:type},
			type:'post',
			dataType:'json',
			success:function(data){
				if (data.status == '-1') {
					if(data.data == '您已经赞过！'){
						popdlg_t().show_t('您已经赞过了哦！','/Public/images/succeed-bg2.png','501px','47px');
					}else{
						popdlg_t().show_t(data.data,'/Public/images/succeed-bg2.png','501px','47px');
					}
				}else if(data.status == '-2'){
					popdlg().show('您尚未登录','/Public/login-show.html','409px','507px','465px');
				}else{
					number = parseInt(number)+1;
					var plus1 = jQuery('<div style="position: absolute;left: 50px;bottom: 20px;color: #ff4200;font-size: 16px;font-weight: bold;">+1</div>');
					jQuery('#praise_hot_'+id).append(plus1);
					plus1.animate({'bottom': '30px', 'opacity': '0'}, 500 ,function(){
						plus1.remove();
					});
					popdlg_t().show_t('点赞成功','/Public/images/succeed-bg1.png','501px','47px');
					if(viewp == 1){
						$("#c_praise").html(number);
					}else{
						change_hot_praisenum(id,number);
					}
					/*var plus1 = $('<div>+1</div>')
					 jQuery('#praise_'+id).add('selector/elements/html')*/
				}
			}
		});
	}

	function click_praise(id,type,number,href,viewp){
	 	jQuery.ajax({
			url:href,
			data:{a:'click_praise', id:id, type:type},
			type:'post',
			dataType:'json',
			success:function(data){
				if (data.status == '-1') {
					if(data.data == '您已经赞过！'){
						popdlg_t().show_t('您已经赞过了哦！','/Public/images/succeed-bg2.png','501px','47px');
					}else{
						popdlg_t().show_t(data.data,'/Public/images/succeed-bg2.png','501px','47px');
					}
				}else if(data.status == '-2'){
					popdlg().show('您尚未登录','/Public/login-show.html','409px','507px','465px');
				}else{
					number = parseInt(number)+1;
					var plus1 = jQuery('<div style="position: absolute;left: 50px;bottom: 20px;color: #ff4200;font-size: 16px;font-weight: bold;">+1</div>');
					jQuery('#praise_'+id).append(plus1);
					plus1.animate({'bottom': '30px', 'opacity': '0'}, 500 ,function(){
						plus1.remove();
					});
					popdlg_t().show_t('点赞成功','/Public/images/succeed-bg1.png','501px','47px');
					if(viewp == 1){
						$("#c_praise").html(number);
					}else{
						change_praisenum(id,number);
					}
					/*var plus1 = $('<div>+1</div>')
					jQuery('#praise_'+id).add('selector/elements/html')*/
				}
			}
		});
	}

	function change_fmtc_praisenum(id,number){
		$("#praise_fmtc_" + id).attr("praise_count",number);
		var showcount = number;
		if(number > 1000 && number < 10000){
			var num = Math.floor(number/100)/10;
			showcount = num.toFixed(1) + "K";
		}else if(number > 10000){
			showcount = Math.floor(number/1000) + "K";
		}
		$('#praise_fmtc_' + id).find("b").html(showcount);
	}

	function change_hot_praisenum(id,number){
		$("#praise_hot_" + id).attr("praise_count",number);
		var showcount = number;
		if(number > 1000 && number < 10000){
			var num = Math.floor(number/100)/10;
			showcount = num.toFixed(1) + "K";
		}else if(number > 10000){
			showcount = Math.floor(number/1000) + "K";
		}
		$('#praise_hot_' + id).find("b").html(showcount);
	}
	
	function change_praisenum(id,number){
		$("#praise_" + id).attr("praise_count",number);
		var showcount = number;
		if(number > 1000 && number < 10000){
			var num = Math.floor(number/100)/10;
			showcount = num.toFixed(1) + "K";
		}else if(number > 10000){
			showcount = Math.floor(number/1000) + "K";
		}
		$('#praise_' + id).find("b").html(showcount);
	}

	function init_praisenum(){
		$('.praise').each(function(){
			var _id = $(this).attr('data_id');
			var _praisecount = $(this).attr('praise_count');
			var showcount = _praisecount;
			if(_praisecount > 1000 && _praisecount < 10000){
				var num = Math.floor(_praisecount/100)/10;
				showcount = num.toFixed(1) + "K";
			}else if(_praisecount > 10000){
				showcount = Math.floor(_praisecount/1000) + "K";
			}
			$('#praise_' + _id).find("b").html(showcount);
		});
	}

	function init_comment_count(){
		$('.index-deal-comment').each(function(){
			var _id = $(this).attr('data_id');
			var _comment_count = $(this).attr('comment_count');
			var shownum = _comment_count ;
			if(_comment_count > 1000 && _comment_count < 10000){
				var num = Math.floor(_comment_count/100)/10;
				shownum = num.toFixed(1) + "K";
			}else if(_comment_count > 10000){
				shownum = Math.floor(_comment_count/1000) + "K";
			}
			$('#comment_count_' + _id).find("b").html(shownum);
		});
	}

	var countdown=300;
	function settime(val,sd) {
		set_button();
		var si = setInterval(set_button,1000);
		if(sd > 0){
			countdown = sd;
		}
		if(sd > 300){
			clearInterval(si);
			countdown = 0;
		}
		function set_button(){
			if (countdown == 0) {
				clearInterval(si);
				val.attr("disabled",false);
				val.css("background-color","#e9f7ff");
				val.html("发送验证码>");
				clearInterval(si);
				countdown = 300;
			} else {
				val.attr("disabled",true);
				val.css("background-color","#dddddd");
				val.html("重新发送(" + countdown + ")");
				countdown--;
			}
		}
	}

	module.exports.click_praise = click_praise;
	module.exports.settime = settime;
	module.exports.init_praisenum = init_praisenum;
	module.exports.init_comment_count = init_comment_count;
})
function popdlg() {
    var popdlg = jQuery('<div class="plugin-popdlg-container none" id="box"><div class="plugin-popdlg-bg"></div><div class="plugin-popdlg"><div class="plugin-popdlg-header"><p>标题</p><div class="plugin-popdlg-close"><img src="/Public/images/pop-btn-close.png"></div></div><div class="plugin-popdlg-body"><iframe src="formpage.html" frameborder="0"></iframe></div></div></div>');
    jQuery('body').append(popdlg);
    jQuery('body').on('click', '.plugin-popdlg-close', function() {
    	jQuery('.plugin-popdlg-container').addClass('none');
    	jQuery(".plugin-popdlg-container").remove();
    });

    function show(title, url, width, height, iframeHeight) {
		jQuery('.plugin-popdlg-container').removeClass('none');
		jQuery('.plugin-popdlg-container .plugin-popdlg-header p').html(title);
		jQuery('.plugin-popdlg-container .plugin-popdlg-body iframe').attr('src', url);
		jQuery('.plugin-popdlg-container .plugin-popdlg').css('width', width);
		jQuery('.plugin-popdlg-container .plugin-popdlg').css('height', height);
		jQuery('.plugin-popdlg-container .plugin-popdlg-body').css('height', iframeHeight);
    }
    this.show = show;
    return this;
}
function popdlg_t(){
	var popdlg = jQuery('<div class="plugins-popdlg-container"><div class="plugins-popdlg"><div class="plugins-popdlg-header"><img class="succeed-tip" src=""><p>标题</p><div class="plugins-popdlg-close" id="plugins_popdlg_close"><img src=""></div></div></div></div>');
	jQuery('body').append(popdlg);
	jQuery('body').on('click', '#plugins_popdlg_close', function() {
		jQuery('.plugins-popdlg-container').removeClass('active');
		jQuery(".plugins-popdlg-container").remove();
	})
  
	function show_t(title,url,width,height){
		jQuery('.plugins-popdlg-container').addClass('active');
		jQuery('.plugins-popdlg-container .plugins-popdlg-header p').text(title);
		jQuery('.plugins-popdlg-container .plugins-popdlg-header .succeed-tip').attr('src', url);
		jQuery('.plugins-popdlg-container .plugins-popdlg-close').remove();
		jQuery('.plugins-popdlg-container .plugins-popdlg').css('width', width);
		jQuery('.plugins-popdlg-container .plugins-popdlg').css('height', height);
		jQuery('.plugins-popdlg-container .plugins-popdlg').animate({bottom:"5px"});
		setTimeout(function(){
			jQuery('.plugins-popdlg-container').removeClass('active');
			jQuery(".plugins-popdlg-container").remove();
		},1500);
	}

	function show_s(title,url,width,height){
		jQuery('.plugins-popdlg-container').addClass('active');
		jQuery('.plugins-popdlg-container .plugins-popdlg-header p').html(title);
		jQuery('.plugins-popdlg-container .plugins-popdlg-header .succeed-tip').attr('src', url);
		jQuery('.plugins-popdlg-container .plugins-popdlg-close').remove();
		jQuery('.plugins-popdlg-container .plugins-popdlg').css('width', width);
		jQuery('.plugins-popdlg-container .plugins-popdlg').css('height', height);
		jQuery('.plugins-popdlg-container .plugins-popdlg').animate({bottom:"5px"});
		setTimeout(function(){
			jQuery('.plugins-popdlg-container').removeClass('active');
			jQuery(".plugins-popdlg-container").remove();
		},3500);
	}
	function show_r(title,width,height){
		jQuery('.plugins-popdlg-container').addClass('active');
		jQuery('.plugins-popdlg-container .plugins-popdlg-header p').html(title);
		jQuery('.plugins-popdlg-container .plugins-popdlg-header .succeed-tip').remove();
		jQuery('.plugins-popdlg-container .plugins-popdlg').css('width', width);
		jQuery('.plugins-popdlg-container .plugins-popdlg').css('height', height);
		jQuery('.plugins-popdlg-container .plugins-popdlg-close img').attr('src', '/Public/images/btn-succeed.png');
		jQuery('.plugins-popdlg-container .plugins-popdlg-close').attr('id', '');
		jQuery('.plugins-popdlg-container .plugins-popdlg').animate({bottom:"5px"});
	}
	this.show_t = show_t;
	this.show_s = show_s;
	this.show_r = show_r;
	return this;
}