$(function(){
	$(".category-item").hover(function(){
		$(this).addClass("hover");
		//当前高度
		var childrenTop = $(this).offset().top;
		//列表高度
		var parentTop = $(".category-list").offset().top;
		//上面的高度
		var top = childrenTop - parentTop;
		//面板高度
		var childrenHeight = $(this).find(".category-panel").innerHeight();
		//列表高度
		var totalHeight = $(".category-list").height();

		if((top + childrenHeight) > totalHeight)
		{
			if(childrenHeight > totalHeight)
			{
				$(this).find(".category-panel").css("top",-top);
			}else{
				//上移动
				var topX = (childrenHeight+top) - totalHeight;
				$(this).find(".category-panel").css("top",-topX);
			}
		}

	},function(){
		$(this).removeClass("hover");
	});
	
	$("#slider-img-list").nySlide();
	var myOptions = {
		height:160,
		width:1200,
		prename:'middle_'
	}
	$(".middlebanner").nySlide(myOptions);

	$(".news-tab div span").hover(function(){
		$(".news-tab div span").removeClass("current");
		$(this).addClass("current");
		var index = $(this).index();
		$(".news-tab .b ul").hide();
		$(".news-tab .b ul").eq(index).show();
	});

	$(".right-tools span").hover(function(){
		$(".right-tools span").removeClass('current');
		$(this).addClass('current');
		var index = $(this).index();
		$(".ec-slider li").hide();
		$(".ec-slider li").eq(index).css({opacity:0}).show();
		$(".ec-slider li").eq(index).animate({opacity:1},{duration:1000,easing:'linear',complete:function(){

		}});

	});
});

(function($){
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

			var button_str = '<ul class="'+options.prename+'banner_button">';
			for(i = 1;i <= k.size;i++){
				button_str+='<li></li>'
			}
			button_str+='</ul>';
			$(k.self).append(button_str);

			k.setCss();

			$('.'+options.prename+'image_item:gt(0)',k.self).css('z-index',0).css({opacity:0});
			$('.'+options.prename+'image_item',k.self).show();
			$(k.self).css({overflow:'visible',visibility:'visible',display:'block'});
		}

		k.setAnimate = function(){
			k.lindex = 0;
			k.index = 1;

			$('.'+options.prename+'banner_button').delegate('li','mouseover',function(){
				_this = this;
				var li_index = $(_this).index();
				k.index = li_index;
				overDelayTimer = setTimeout(k.setOpacity(),200);
			})
			$('.'+options.prename+'banner_button').delegate('li','mouseout',function(){
				clearTimeout(overDelayTimer)
			})

			$('.'+options.prename+'banner_button li').eq(k.lindex).addClass('current')
			k.moveTimer = setInterval(k.setOpacity,3000)
		}

		k.setOpacity = function(){
			console.log(k.index)
			clearInterval(k.moveTimer)

			//$('.'+options.prename+'banner_button li').removeClass('current');
			$('.'+options.prename+'banner_button li').eq(k.index).addClass('current').siblings().removeClass('current');

			$('.'+options.prename+'image_item',k.self).stop(true,false);
			$('.'+options.prename+'image_item',k.self).css({'z-index':0})
			$('.'+options.prename+'image_item',k.self).eq(k.index).css({opacity:0,'z-index':2});
			$('.'+options.prename+'image_item',k.self).eq(k.lindex).css({'z-index':1});
			$('.'+options.prename+'image_item',k.self).eq(k.index).animate({opacity:1},{duration:1000,easing:'linear',complete:function(){
				k.moveTimer = setInterval(k.setOpacity,3000);
				k.lindex = k.index;
				if (k.index == k.size -1) {
					k.index = 0;
				}else{
					k.index++;
				}
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