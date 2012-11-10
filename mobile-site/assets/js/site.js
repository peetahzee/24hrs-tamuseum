const FULL_HEIGHT_PERCENTAGE = 0.85;
const NEWS_SCROLL_DURATION = 500;
const SLIDE_DURATION = 500; 
const NEWS_TO_SHOW = 5;

$(function(){

	$(document).ready(function() {
		getWPPosts();
	
		var zIndex = 1;
		$($(".full_height").get().reverse()).each(function() {
			$(this).css("z-index", zIndex);
			zIndex++;
		});
	});
	
	$(window).resize(function() {
		$(".full_height").css('min-height', $(window).height() * FULL_HEIGHT_PERCENTAGE);
		$(".full_height:last").css('min-height', $(window).height());
		$('#main_page_nav:not(.expanded)').css('height', $(window).height()*0.85);
	}).trigger('resize');

	$('#main_nav a').click(function(evt){
		evt.preventDefault();
		if ($(this).is('#news')){
			$('body').animate({scrollTop: $('#main_page_news').offset().top}, NEWS_SCROLL_DURATION);
		} else {
			//doNavigate($(this).attr('href'));
			window.location.hash = '#!/' + $(this).attr('href');
		}
		return false;
	});

	function doNavigate(page){
		$('#content_pane').load(page+' .wrapper', function(content){
			$('#main_page_nav')
				.animate({'margin-left': '-100%'}, SLIDE_DURATION, function(){
					$(this).height($('#content_pane .wrapper').height()).addClass('expanded');
				})
		});
	}

	$(window).bind('hashchange', function(e){
		if (window.location.hash.length < 2){
			window.location.hash = '#!/';
		}
		if (window.location.hash && window.location.hash.length > 7 && window.location.hash.substr(-5) == '.html'){
			doNavigate(window.location.hash.substr(3));
		} else {
			$('#main_page_nav')
				.animate({'margin-left': '0'}, SLIDE_DURATION)
				.removeClass('expanded');
		}
	}).trigger('hashchange');

	// load youtube videos: 

});



function loadVideos(){

}

function getWPPosts(){
	$.getJSON('http://www.tamuseum.org/api/get_recent_posts/?json=1&callback=?', function(data) {
		$("ul#news").html("");
		var i = 0;
		$(data.posts).each(function() {
			if(i > NEWS_TO_SHOW) return;
			var content = stripEmptyP(stripImg(this.content));
			if(content.match(/\<p(.*)\<\/p\>/ig) != null) {
				content = content.match(/\<p(.*)\<\/p\>/ig)[0];
			}
			$("ul#news").append('<a href="'+this.url+'"><li><img src="'+this.thumbnail+'" /><h3>'+this.title+'</h3><p>'+content+'</p></li></a>');
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
