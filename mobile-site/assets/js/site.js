$('document').ready(function() {
	scalePanels();
	$(window).resize(function() {
		scalePanels();
	});
	
	getWPPosts();
	
	var zIndex = 1;
	$($(".full_height").get().reverse()).each(function() {
		$(this).css("z-index", zIndex);
		zIndex++;
	});
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