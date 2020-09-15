
$(function(){
	$("#suoso").click(function() {
		// if($(".search").css("display")=="none"){
		// 	$(".search").show();
		// }else{
		// 	$(".search").hide();
		// }
		// 
		$(".search").not(":animated").slideToggle(500);
	})
})

$(".warp li").hover(function(){
	$(this).children("div").not(":animated").slideToggle(300);
})