// 头部导航鼠标移入事件
$(document).ready(function() {
	setSlip();
})

var setSlip = function() {
	var navTip = $(".header_nav_tip");
	var navCurrent = $(".header_nav a.header_nav_a");
	navTip.css("left", navCurrent.position().left);
	$(".header_nav a").mouseenter(function() {
		navTip.stop().animate({
			width: $(this).width(),
			left: $(this).position().left + "px"
		}, );
	});
	$(".header_nav a").mouseleave(function() {
		navTip.stop().animate({
			left: navCurrent.position().left + "px",
		}, 350)
	});
}

// 导航变色
function scroll_() {
	// var scrollTop = $(window).scrollTop();
	// var top = $('.header_nav').offset().top;
	// var scrollTop = $(window).scrollTop();
	// if(scrollTop<top){
	// 	$('.header').css('opacity',1.5);
	// }else{
	// 	$('.header').css('opacity',0.5);
	// }
	pos = 0;
	ticking = false;
	var header = document.querySelector(".header");
	var header_nav_item = document.querySelector(".header_nav_item");
	window.addEventListener("scroll", function(e) {
		pos = window.scrollY;
		if (pos > 100 && !ticking) {
			header.classList.add("header_1");
			header_nav_item.classList.add("header_nav_a_1");
			ticking = true;
		}

		if (pos < 100 && ticking) {
			header.classList.remove("header_1");
			ticking = false;
		}
	})
}
$(window).on("scroll", function() {
	scroll_();
})


// 导航点击滚动到对应的板块
function click_scroll() {
	var scroll_offset = $("#screen_waiguan").offset().top;
	$("body,html").animate({
		scrollTop: scroll_offset
	}, 500);
}

function click_scroll2() {
	var scroll_offset = $("#screen_shej").offset().top;
	$("body,html").animate({
		scrollTop: scroll_offset
	}, 500);
}

function click_scroll3() {
	var scroll_offset = $("#screen_waiguan_1").offset().top;
	$("body,html").animate({
		scrollTop: scroll_offset
	}, 500);
}

function click_scroll4() {
	var scroll_offset = $("#screen_xinghao").offset().top;
	$("body,html").animate({
		scrollTop: scroll_offset
	}, 500);
}

function click_scroll5() {
	var scroll_offset = $("#game_video").offset().top;
	$("body,html").animate({
		scrollTop: scroll_offset
	}, 500);
}

// 外部导航点击滚动到对应的板块
// offset函数，其本身是个对象，它含有两个属性，top和left，其属性值是数字，无单位，是针对文档内容的
var arrOffsetTop = [
	$('#screen_waiguan').offset().top,
	$('#screen_shej').offset().top,
	$('#screen_waiguan_1').offset().top,
	$('#screen_xinghao').offset().top,
	$('#game_video').offset().top,
];

// 获取每个div的平均高度
var fTotalHgt = 0;
for (var i = 0; i < $("div").length; i++) {
	fTotalHgt += $("div").eq(i).outerHeight();
}
var fAverageHgt = parseFloat(fTotalHgt / $('div').length);

// 滚动事件(每次滚动都做一次循环判断)
$(window).scroll(function() {
	for (var i = 0; i < $("div").length; i++) {
		if ($(this).scrollTop() > arrOffsetTop[i] - fAverageHgt) { // 减去一个固定值，是定位准确点
			$("a").eq(i).addClass("active").siblings().removeClass("active");
		}
	}
});

/* 点击事件 */
$("a").click(function() {
	$(this).addClass("active").siblings().removeClass('active');
	$("body, html").animate({
		scrollTop: arrOffsetTop[$(this).index()]
	}, 500);
});


// 导航随页面滚动跳转到对应页面
// $(document).ready(function(){
// 	//滚动条发生滚动
// 	$(window).scroll(function(){
// 		var top = $(document).scrollTop();
// 		var menu = $("navbar-example");
// 		var items = $("")
// 		// console.log(top);
// 	})
// })