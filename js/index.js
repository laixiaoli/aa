$(function(){

	// window.onscroll=function(){
	// 	var top=document.documentElement.scrollTop();
	// 	if(top>100){
	// 		header.classList.remove('header');
	// 		header.classList.add('header-scroll');
	// 	}else{
	// 		header.classList.remove('header-scroll');
	// 		header.classList.add('header');
	// 		switchItem(0);
	// 	}
	// }

	// 返回顶部的点击事件
	$(window).scroll(function(){
		if($(window).scrollTop()>340){
			$(".fixed").fadeIn(200);
		}else{
			$(".fixed").fadeOut(200);
		}
	})

	$(".fixed").click(function(){
		$("html,body").animate({scrollTop:0},500);
		return false;
	});
	
	// 项目展示的轮播
	var swiper = new Swiper('.banner3', {
		// 循环播放
		loop:true,
	  pagination: {
	    el: '.swiper-pagination',
	  },
	  // 自动播放
	  autoplay:{
		  delay:2000,
		  disableOnInteraction:false
	  },
	});
})