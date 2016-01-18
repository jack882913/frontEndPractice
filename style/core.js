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
	
});