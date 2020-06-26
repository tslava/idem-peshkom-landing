 
function t117_appendMap() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        t117_handleApiReady();
    } else {
    	if(window.googleapiiscalled!==true){
	        var script = document.createElement("script");
	        script.type = "text/javascript";
	        script.src = "//maps.google.com/maps/api/js?callback=t117_handleApiReady";
	        document.body.appendChild(script);
	        window.googleapiiscalled=true;
	    }
    }
}

function t117_handleApiReady(){
    $('.t117_map').each(function(index,Element) {
		var el=$(Element);
		window.isDragMap = $isMobile ? false : true;
            
		if(el.attr('data-map-style')!=''){var mapstyle=eval(el.attr('data-map-style'));}else{var mapstyle='[]';}
	    var myLatlng = new google.maps.LatLng(parseFloat(el.attr('data-map-x')), parseFloat(el.attr('data-map-y')));
	    var myOptions = {
            zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatlng,
			scrollwheel: false,
			draggable: window.isDragMap,          
			zoomControl: true,
            styles: mapstyle                                                     	
	    };
	    
	    var map = new google.maps.Map(Element, myOptions);
	
	    var marker = new google.maps.Marker({
	        position: myLatlng,
	        map: map,
	        title:el.attr('data-map-title')
	    });
	    
		// Resizing the map for responsive design
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
		});
      
        // DBL Click - activate on mobile      
        if ($isMobile) {
          google.maps.event.addDomListener(window, "dblclick", function() {
            if (window.isDragMap) {
	            window.isDragMap = false;
            } else {
	            window.isDragMap = true;
            }
            map.setOptions({draggable: window.isDragMap});
          }); 
        }
      
    });	
} 
function t213_init(recid){
    var el = $("#t213-marker"+recid);
    var cotimer;
    var wnd=$(window);
    var bdy=$('body');
    var needcolor=el.attr("data-bg-color");
    bdy.css("transition", "background-color 1000ms linear");
    if(window.t213higher===undefined)window.t213higher=1000000;
    if(window.t213higher>el.offset().top){
        window.t213higher=el.offset().top;
        window.t213higher_id=recid;
    }
    var bodydefcolor=bdy.css("background-color");
    var timer_count=0;

    wnd.scroll(function() {
        if(cotimer) {
            window.clearTimeout(cotimer);
            if(timer_count>=15){
                t212_timer_do(el,wnd,bdy,needcolor,bodydefcolor,recid);
            }
            timer_count++;
        }
        cotimer = window.setTimeout(function() {
            t212_timer_do(el,wnd,bdy,needcolor,bodydefcolor,recid);
            timer_count=0;
        }, 100);
    });        

    wnd.scroll();         
}

function t212_timer_do(el,wnd,bdy,needcolor,bodydefcolor,recid){
    var a,c,d,bc;
    a = el.offset().top;
    c = wnd.scrollTop();
    d = wnd.height();                  
    bc = bdy.attr("data-bg-color");

    if((c+d) >= a){
      bdy.css("background-color",needcolor);
    }else{
      if(window.t213higher_id==recid){
        bdy.css("background-color",bodydefcolor);
      }
    }    
} 
	var t335 = {};
    t335.initeffect = function(recid) {
        $('#rec'+recid).find(".t335__cell").hover(function(){
            var sizer = $(this).find(".t335__button-container").height();
            $(this).find(".t335__textwrapper__content").css({'padding-bottom':(sizer+'px')});
            $(this).find(".t335__button-container").addClass("t335__button-container_show");
        }, function(){
            $(this).find(".t335__textwrapper__content").css("padding-bottom","0");
            $(this).find(".t335__button-container").removeClass("t335__button-container_show");
        });
    };
 
function t341_showCaptions(recid){
  var el=$("#t-carousel"+recid);
  var caption = el.find('.item:nth-child(1) .t-carousel__caption-inside');
  var captioncontainer = el.find('.t-carousel__caption__container');
  captioncontainer.html(caption.html());
  caption.css('display','none');

  $("#t-carousel"+recid).on('slide.bs.carousel', function(evt) {
    var el=$("#t-carousel"+recid);
    var caption = el.find('.item:nth-child(' + ($(evt.relatedTarget).index()+1) + ') .t-carousel__caption-inside');
    var captioncontainer = el.find('.t-carousel__caption__container');
    captioncontainer.html(caption.html());
    caption.css('display','none');
  });
}

function t341_checkSize(recid){
  var el=$("#rec"+recid);
  var containerinside = el.find(".t-carousel__arrows__container_inside");
  var containeroutside = el.find(".t-carousel__arrows__container_outside");
  var inner = el.find(".t-carousel__inner");
  var arrowleft = el.find(".t-carousel__arrow_left");
  var arrowright = el.find(".t-carousel__arrow_right");
  containeroutside.css({'max-width':(arrowleft.width()+arrowright.width()+inner.width()+ 60 +'px')});
  containerinside.css({'max-width':(inner.width()+'px')});

  var sizer = el.find('.t-carousel__height');
  var height = sizer.height();
  var width = sizer.width();
  var ratio = width/height;
  var gallerywrapper = el.find(".t-carousel__checksize");
  var gallerywidth = gallerywrapper.width();

  if (height != $(window).height()) {
    gallerywrapper.css({'height':((gallerywidth/ratio)+'px')});
  }
}