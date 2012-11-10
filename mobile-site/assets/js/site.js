
// Mobile App Settings
var WINDOW_HEIGHT_PERCENT = 0.85
  , NEWS_SCROLL_SPEED     = 500
  , NUM_NEWS_ITEMS        = 2;


$(function(){

	$(window).resize(function() {
		$(".full_height").css('min-height', $(window).height()*WINDOW_HEIGHT_PERCENT);
		$(".full_height:last").css('min-height', $(window).height());
		$('#main_page_nav:not(.expanded)').css('height', $(window).height()*WINDOW_HEIGHT_PERCENT);
	}).trigger('resize');
	
	var zIndex = 1;
	$($(".full_height").get().reverse()).each(function() {
		$(this).css("z-index", zIndex);
		zIndex++;
	});

	$('#main_nav a').click(function(evt){
		evt.preventDefault();
		window.location.hash = '#!/' + $(this).attr('href');
		return false;
	});

	function doNavigate(page){
		$('#content_pane').load(page+' .wrapper', function(content){
			$('#main_page_nav')
				//.animate({'margin-left': '-100%'}, 1000, function(){
					//$(this)
						.height($('#content_pane .wrapper').height())
						.addClass('expanded');
				//});
			$(window).resize();
		});
	}

	$(window).bind('hashchange', function(e){
		if (window.location.hash.length < 2){
			window.location.hash = '#!/';
		}
		if (window.location.hash && window.location.hash.length > 7 && window.location.hash.substr(-5) == '.html'){
			doNavigate(window.location.hash.substr(3));
		} else {
			$('#main_page_nav').removeClass('expanded');
			$(window).resize();
		}
	}).trigger('hashchange');

	getWPPosts();
	
});



// load youtube videos: 
function loadVideos(){

}

function getWPPosts(){

	function getInfo(){
		try {
			if (!('localStorage' in window && window['localStorage'] !== null)){
				return false;
			}
			news = JSON.parse(localStorage.getItem('news_entries'));
			if (news.last_done < Time.new() - (1000*60*60*10)){
				return false;
			} else {
				return news.items;
			}
		} catch (e){
			 return false;
		}
	}

	var info = getInfo();
	if (!info){
		$.getJSON('http://www.tamuseum.org/api/get_recent_posts/?json=1&callback=?', cb);
	} else {
		cb(info);
	}

	function cb(data) {

		var i = 0;
		$("ul#news").html("");
		$(data.posts).each(function() {
	
			if(i > NUM_NEWS_ITEMS) return;
			var content = stripEmptyP(stripImg(this.content));
			if(content.match(/\<p(.*)\<\/p\>/ig) != null) {
				content = content.match(/\<p(.*)\<\/p\>/ig)[0];
				$("ul#news").append('<a href="'+this.url+'"><li><img src="'+this.thumbnail+'" /><h3>'+this.title+'</h3><p>'+content+'</p></li></a>');
				i++;
			}
		});

		try { 
			if (('localStorage' in window && window['localStorage'] !== null)){
				localStorage.setItem(JSON.stringify({'news_entries': data, last_done: Time.new()}));
			}
		} catch (e){

		}
	}
}

function stripImg(content) {
	return content.replace(/\<img(.*)\>/ig, "");
}
function stripEmptyP(content) {
	return content.replace(/\<p\>......\<\/p\>/ig, "");
}
