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

		$('#content_pane').load($(this).attr('href')+' .wrapper', function(load){
			$('#main_page_nav')
				.animate({'margin-left': (($('#main_nav').width()+50)*-1) + 'px'})
				.height(2000);

		});

		return false;
	});

	// load youtube video: 

});

