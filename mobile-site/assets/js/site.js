$(function(){

	$(window).resize(function() {
		$(".full_height").height($(window).height()*0.8);
		$(".full_height:last").height($(window).height());
	}).trigger('resize');
	
	var zIndex = 1;
	$($(".full_height").get().reverse()).each(function() {
		$(this).css("z-index", zIndex);
		zIndex++;
	});

	$('#main_nav a').click(function(evt){
		evt.preventDefault();

		$('#content_pane').load($(this).attr('href')+'#wrapper')

		return false;
	});

	// load youtube video: 

});

