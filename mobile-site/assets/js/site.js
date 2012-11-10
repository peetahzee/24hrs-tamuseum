$('document').ready(function() {
	scalePanels();
	$(window).resize(function() {
		scalePanels();
	});
	
	var zIndex = 1;
	$($(".full_height").get().reverse()).each(function() {
		$(this).css("z-index", zIndex);
		zIndex++;
	});
});

function scalePanels() {
	$(".full_height").height($(window).height()*0.8);
	$(".full_height:last").height($(window).height());
}