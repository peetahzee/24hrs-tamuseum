$('document').ready(function() {
	scalePanels();
	$(window).resize(function() {
		scalePanels();
	});
});

function scalePanels() {
	$(".full_height").height($(window).height()*0.8);
	$(".full_height:last").height($(window).height());
}