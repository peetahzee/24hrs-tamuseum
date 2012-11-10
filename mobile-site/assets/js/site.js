$(function(){

	$(window).resize(function() {
		$(".full_height").css('height', $(window).height()*0.85);
		$(".full_height:last").css('min-height', $(window).height());
	}).trigger('resize');
	
	getWPPosts();
	
	var zIndex = 1;
	$($(".full_height").get().reverse()).each(function() {
		$(this).css("z-index", zIndex);
		zIndex++;
	});

	$('#main_nav a').click(function(evt){
		evt.preventDefault();

		if ($(this).is('#news')){
			$('body').animate({scrollTop: $('#main_page_news').offset().top}, 500);
		} else {
			$('#content_pane').load($(this).attr('href')+' .wrapper', function(load){
				$('#main_page_nav')
					.animate({'margin-left': (($('#main_nav').width()+50)*-1) + 'px'})
					.height($('#content_pane .wrapper').height()).addClass('resized');
			});
		}

		return false;
	});

	// load youtube video: 

});

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
