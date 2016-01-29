$(function(){
	$(".min-car").hover(function(){
		$(this).find(".h").addClass("now")
		$(".min-car .b").show();
		$(".min-car .b").height(0);
		$(".min-car .b").animate({height:100,opacity:1},{duration:200,easing:'linear'})
	},function(){
		$(this).find(".h").removeClass("now")
		$(".min-car .b").animate({height:0,opacity:0},{duration:100,easing:'linear'})
	})

	$('.category-item').hover(function(){
		$(this).find('.b').show();
	},function(){
		$(this).find('.b').hide();
	})
	displayNav();

	var myOptions = {
		height:460,
		width:1226,
		prename:'top_'
	}
	$(".hero-container").nySlide(myOptions);

	$('.star-goods').nyGoodsList();
	changeTab();

	var bottomOptons = {
		prename:'bottom-',
		size:4
	}
	$('.tj-goods').nyGoodsList(bottomOptons);

	$('.m-content .b').nyBottomGoodsList();
	var fadeHeight = $(document).height();
	$('.fade-div').height(fadeHeight)

	$('.m-video .b ul li .content').bind('click',function(){
		$('.fade-div').show().css({opacity:0})
		$('.fade-div').animate({opacity:0.5},{duration:300,easing:'linear'})
		$('.open-window').show().css({top:0,opacity:0})
		$('.open-window').animate({top:'50%',opacity:1},{duration:300,easing:'linear'})
	})
	$('.title-close').bind('click',function(){
		$('.fade-div').animate({opacity:0},{duration:300,easing:'linear',complete:function(){
			$('.fade-div').hide();
		}})
		$('.open-window').animate({top:0,opacity:0},{duration:300,easing:'linear',complete:function(){
			$('.open-window').hide();
		}})
		
	})
})

function changeTab(){
	$('.main-box .box-header li').hover(function(){
		var index = $(this).index();
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		var obj = $(this).parents('.main-box').find('.box-body .right2 ul');
		obj.removeClass('show-list');
		obj.eq(index).addClass('show-list')
	})
}

function displayNav(){
	var index = 0;
	var item_obj = $(".nav-content");
	var show_nav = function(_height){
		item_obj.show();
		item_obj.stop().animate({height:_height,opacity:1},400);
	}
	var hide_nav = function(){
		item_obj.stop().animate({height:0,opacity:0},400,function(){
			item_obj.hide();
		});
	}
	$(".nav-list li").hover(function(){
		index = $(this).index();
		if(index>=item_obj.find('.nav-item').size())
			return false;
		item_obj.find(".nav-item").hide().eq(index).show();
		var nav_height = $(".nav-item").eq(index).height();
		show_nav(nav_height);
	},function(){
		hide_nav();
	});
	$(".nav-item").hover(function(){
		index = $(this).index();
		var nav_height = $(this).height();
		show_nav(nav_height);
	},function(){
		hide_nav();
	})
}

(function($){
	$.fn.nyBottomGoodsList = function(){
		var b = {};
		b.self = $(this);
		b.size = $(this).find('.category-item').size()/4;
		var slideHtml = '<div style="position:absolute;width:296px;top:89%;"><ul class="bottom-slide">';

		b.self.find('.arrow-right').each(function(){
			var liHtml = '';
			var size = $(this).siblings('ul').find('li').size();
			for (var i = 0; i < size; i++) {
				if(i == 0)
					liHtml+='<li class="current"> </li>';
				else
					liHtml+='<li> </li>'
			}
			$(this).parent().append(slideHtml+liHtml+'</ul></div>');
		})

		b.self.delegate('.arrow-left','click',function(){
			var obj = $(this).siblings('ul');
			var size = obj.find('li').size();
			var silbeObj = $(this).siblings('div').find(' .bottom-slide .current');
			var index = silbeObj.index();
			index = index -1;
			if(index<0)
				return false;
			var _left = index*-1*obj.parent().width();
			$(this).siblings('div').find('.bottom-slide li').removeClass('current');
			$(this).siblings('div').find('.bottom-slide li').eq(index).addClass('current');
			obj.animate({left:_left},{duration:300,easing:'linear',complete:function(){

			}})
		})
		b.self.delegate('.arrow-right','click',function(){
			var obj = $(this).siblings('ul');
			var size = obj.find('li').size();
			var silbeObj = $(this).siblings('div').find(' .bottom-slide .current');
//			alert(silbeObj.find(' .bottom-slide li').length)
			var index = silbeObj.index();
			index = index +1;
			if(index>=size)
				return false;
			var _left = index*-1*obj.parent().width();
			console.log(_left)
			$(this).siblings('div').find('.bottom-slide li').removeClass('current');
			$(this).siblings('div').find('.bottom-slide li').eq(index).addClass('current');
			obj.animate({left:_left},{duration:300,easing:'linear',complete:function(){
				
			}})
		})
	}
	$.fn.nyGoodsList = function(user_options){
		var default_options = {
			prename:'top-',
			size:2,
		};
		var options = $.extend(true,{},default_options,user_options);
		var z = {};
		z.self = $(this);
		z.listObj = z.self.find('.'+options.prename+'goods-list');
		z.index = 0;
		z.size = options.size;
		z.leftNum = z.self.find('.b').width();
		z.objLeft = 0;

		var ChangeUl = function(){
			clearInterval(z.interval);
			_left = z.index*-1*z.leftNum;
			//console.log(_left)
			z.self.find('.h-right i').eq(0).addClass('left-active');
			z.self.find('.h-right i').eq(1).addClass('right-active');
			if(z.index == (z.size-1)){
					z.self.find('.h-right i').eq(1).removeClass('right-active');
					z.self.find('.h-right i').eq(1).addClass('right');
					z.self.find('.h-right i').eq(0).removeClass('left');
					z.self.find('.h-right i').eq(0).addClass('left-active');
				}
				if(z.index == 0){
					z.self.find('.h-right i').eq(1).removeClass('right');
					z.self.find('.h-right i').eq(1).addClass('right-active');
					z.self.find('.h-right i').eq(0).removeClass('left-active');
					z.self.find('.h-right i').eq(0).addClass('left');
				}
			z.listObj.animate({left:_left},{duration:300,easing:'linear',complete:function(){
				z.objLeft = _left;
				autoChange();
			}})
		}

		var autoChange = function(){
			var index = z.index + 1;
			if(index >= z.size){
				index = 0;
			}
			z.interval = setInterval(function(){
				z.index = index;
				ChangeUl();
			},5000);
		}

		z.self.find('.h-right i').eq(0).bind("click",function(){
			var index = z.index - 1;
			if(index<0){
				return false;
			}
			z.index = index;
			ChangeUl();
		})
		z.self.find('.h-right i').eq(1).bind("click",function(){
			var index = z.index+1;
			if(index>(z.size-1)){
				return false;
			}
			z.index = index;
			ChangeUl();
		})
		autoChange();
	};

	$.fn.nySlide = function(user_options){
		var default_options = {
			width:970,
			height:400,
			prename:'top_',
		};
		var options = $.extend(true,{},default_options,user_options);
		var k = {};
		k.self = this;
		k.index = 0;
		k.size = $(k.self).children('div').size();
		var isOk = 1;

		k.onload = function(){
			$(k.self).css({width:options.width,height:options.height,overflow:'hidden',position:'relative'}).children('div').addClass(options.prename + 'image_item').hide();
			k.init();
		}

		k.init = function(){
			k.setLayout();
			k.setAnimate();
		}

		k.setLayout = function(){
			$('.'+options.prename+'image_item',k.self).each(function(){
				var a = $(this).children('a');
				if(a.length){
					var image = a.children('img').attr('src');
					a.children('img').remove();
				}else{
					var image = $(this).children('img').attr('src')
					$(this).children('img').remove();
				}
				$(this).css({background:'url('+image+') no-repeat','z-index':0,'width':options.width,'height':options.height,'position':'absolute'})
			});

			var pre_next_str = '<a href="#" class="ui-pre"></a><a href="#" class="ui-next"></a>';

			var button_str = '<ul class="'+options.prename+'banner_button">';
			for(i = 1;i <= k.size;i++){
				button_str+='<li></li>'
			}
			button_str+='</ul>';
			$(k.self).append(button_str);
			$(k.self).append(pre_next_str);

			k.setCss();

			$('.'+options.prename+'image_item:gt(0)',k.self).css('z-index',0).css({opacity:0});
			$('.'+options.prename+'image_item',k.self).show();
			$(k.self).css({overflow:'visible',visibility:'visible',display:'block'});
		}

		k.setAnimate = function(){
			k.lindex = 0;
			k.index = 1;

			$('.'+options.prename+'banner_button').delegate('li','click',function(){
				_this = this;
				var li_index = $(_this).index();
				k.index = li_index;
				overDelayTimer = setTimeout(k.setOpacity(),200);
			})
			$('.'+options.prename+'banner_button').delegate('li','mouseout',function(){
				clearTimeout(overDelayTimer)
			})
			$('.ui-pre').click(function(){
				if(isOk == 0)
					return false;
				var pre_index = k.index - 2;
				if (pre_index < 0) {
					if(pre_index == -1)
						k.index = k.size - 1;
					if(pre_index == -2)
						k.index = k.size - 2;
				}else{
					k.index = pre_index;
				}
				setTimeout(k.setOpacity(),200);
			});

			$('.ui-next').click(function(){
				if(isOk == 0)
					return false;
				//var pre_index = k.index + 1;
				//if (pre_index > k.size -1) {
				//	k.index = 0;
				//}else{
				//	k.index = pre_index;
				//}
				setTimeout(k.setOpacity(),200);
			});

			$('.'+options.prename+'banner_button li').eq(k.lindex).addClass('current')
			k.moveTimer = setInterval(k.setOpacity,3000)
		}

		k.setOpacity = function(){
			//console.log(k.index)
			clearInterval(k.moveTimer)
			isOk = 0;
			//$('.'+options.prename+'banner_button li').removeClass('current');
			$('.'+options.prename+'banner_button li').eq(k.index).addClass('current').siblings().removeClass('current');

			$('.'+options.prename+'image_item',k.self).stop(true,false);
			$('.'+options.prename+'image_item',k.self).css({'z-index':0})
			$('.'+options.prename+'image_item',k.self).eq(k.index).css({opacity:0,'z-index':2});
			$('.'+options.prename+'image_item',k.self).eq(k.lindex).css({'z-index':1});
			$('.'+options.prename+'image_item',k.self).eq(k.index).animate({opacity:1},{duration:200,easing:'linear',complete:function(){
				k.moveTimer = setInterval(k.setOpacity,3000);
				k.lindex = k.index;
				if (k.index == k.size -1) {
					k.index = 0;
				}else{
					k.index++;
				}
				isOk = 1;
			}})

		}

		k.setCss = function(){
			var cssCode = '';

			$(k.self).prepend(cssCode);
		}


		k.run = function(){
			k.onload();
		}

		k.run();
	}
})(jQuery);