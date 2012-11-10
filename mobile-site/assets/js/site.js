$(function(){
var resized = false;
	$(window).resize(function() {
		$(".full_height:not(.resized)").height($(window).height()*0.8);
		$(".full_height:last:not(.resized)").height($(window).height());
	}).trigger('resize');
	
	getWPPosts();
	
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
				.height($('#content_pane .wrapper').height()).addClass('resized');
		});

		return false;
	});

	// load youtube video: 

});

function scalePanels() {
	$(".full_height").height($(window).height()*0.85);
	$(".full_height:last").height($(window).height());
}

function getWPPosts() {
	$.getJSON('http://www.tamuseum.org/api/get_recent_posts/?json=1&callback=?', function(data) {
		var i = 0;
		$(data.posts).each(function() {
			if(i > 5) return;
			var content = stripEmptyP(stripImg(this.content));
			content = content.match(/\<p(.*)\<\/p\>/ig)[0];
			$("ul#news").append('<li><img src="'+this.thumbnail+'" /><h3>'+this.title+'</h3><p>'+content+'</p></li>');
			
			i++;
		});
	});
}

function stripImg(content) {
	return content.replace(/\<img(.*)\>/ig, "");
}
function stripEmptyP(content) {
	return content.replace(/\<p\>......\<\/p\>/ig, "");
}
