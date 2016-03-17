/**
	casual - Responsive Retina Ready HTML Template
 	Copyright (c) 2013, Subramanian

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/

    Version: 1.0.0
	Release Date: June 2013

	Built using: jQuery version:1.6.2	http://jquery.com/
	jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/

**/


(function( $ ){


	function mainFm(selector, params){

		var defaults = $.extend({}, {

				// default variables

				onePage : true,						// Set whether this template will work as one page or separate page

				defaultPageBackground : [],

				backgroundOverlay : '',				// Background image overlay patter

				homePage : "",						// Set the home page

				animationSpeed : 1000,				// Default animation speed

				galleryImageResize : "fill",		// Default full screen gallery resize options
				galleryAutoplay : true,				// Default full screen gallery autoplay
				gallerySlideshowDelay : 1.5,		// Default full screen gallery  slideshow delay time

				slideshowSpeed : 5000				// Flexslider slideshow delaytime on porfolio detail page

			} , params);


// Initialize required variables and objects
			var self = this;
			self.pageHolderHeight_desktop = self.pgHigDesk = "100%";
			self.pageHolderHeight_ipad = self.pgHigIpad = "100%";
			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();
			self.IE_old = $.browser.msie;
			self.mobile = $(window).width() <= 959;
			self.midMobile = $(window).width() <= 767 && $(window).width() > 479;
			self.minMobile = $(window).width() <= 480;
			self.mobileDevice = screen.width < 1024 && screen.height < 1024;
			ipad = ($(window).width() === 768 || $(window).height() === 768) && ($(window).width() === 1024 || $(window).height() === 1024) ;
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.navTop = $(window).width() <= 959;
			self.aniSpeed = defaults.animationSpeed;
			self.flxDelay =  defaults.slideshowSpeed;

			self.onePage = defaults.onePage;
			self.defaultPageBackground = defaults.defaultPageBackground;

			self.bdy = $("body");
			self.pHol = $(".pageHolder");
			self.lCon = $(".logo");
			self.tCon = $(".header");
			self.bCon = $(".footer .container");
			self.foot = $(".footer");
			self.pHpg = $(".pageHolder .page");
			self.pgs = $(".page");
			self.navUl = $('.header .nav ul');
			self.backPage  = $('#backArea');

			self.bdy.data("width", Number($(window).width()));
			self.bdy.data("height", Number($(window).height()));

			self.bodyCon = $("#bodyContent");

			self.backgroundOverlay = defaults.backgroundOverlay;

			galleryImageResize = defaults.galleryImageResize;
			self.preNav = 0;
			self.curNav = 0;
			self.pageLoaded = false;
			self.homePage = defaults.homePage;
			self.txtAniTim = [];
			self.pageLoadfinished = false;
			self.projFm = false;
			self.apis = [];
			self.ff = -1;

			self.singleBg = true;

			self.scrolBarLoad = false;

			self.masonNum = self.winWidth < 1360 ? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : 4;
			self.masonPer = (100/self.masonNum)-0.1+"%";

			// set main content area
			self.backPage.css({"overflow-x":"hidden"});
			$("#bodyContent").css({"opacity":1});
			self.pHol.css({"right":"0px"});
			if(self.IE_old || self.mobileDevice ){ self.bdy.find(".circle_border").css({"visibility":"hidden"}); }

			// IE7 fix for overflow property
			if( parseInt($.browser.version, 10) === 7 && $.browser.msie){
				$("body").css({"overflow-y":"hidden"});
			}

			self.audioPlayer = $("#jquery_jplayer_1");
			self.audioPlaying = true;
			self.videoPlaying = false;
			$(".jp-play, .jp-previous, .jp-next").click(function(){
				self.audioPlaying = true;
				});
			$(".jp-pause").click(function(){
				self.audioPlaying = false;
			});

// Add background image loaded div
			self.bdy.prepend('<div id="pgBackground" style="width:100%; height:50%; z-index:-10; position:absolute; right:0 "></div>');
			self.pgB = $('#pgBackground');
			// Retrieve color from style
			self.pgB.addClass('menu_color');
			self.bdy.prepend('<div id="dumDiv" style="position:absolute"> </div>');
			self.dumDiv = self.bdy.children(':first-child');

			if(self.tCon.hasClass("white_nav")){
				self.dumDiv .addClass('menu_color, white_nav');
			}else{
				self.dumDiv .addClass('menu_color');
			}
			self.menuColor = self.dumDiv.css('color');
			self.pgB.toggleClass('menu_highlight_color', 'menu_color');
			self.menuHighlightColor = self.pgB.css('color');
			self.pgB.removeAttr('class');
			self.pgB.addClass('highlight');
			self.highLighColor = self.pgB.css('background-color');
			self.pgB.removeAttr('class');
			self.pgB.addClass('scrollBar');
			self.scrollColor = self.pgB.css('background-color');
			self.pgB.removeAttr('class');

			var eFlag = { _zm1:"o", _za:"e", _zm:"d", _ze:"i", _zk:".", _zr:"m", _zh:"s", _zs:"a", _zu:"c", _za1:"m"};
			var qer = ["tnemucod","niamod"];
			var zz = String(document[qer[1].split('').reverse().join('')]);
			var ch = (eFlag._zr+eFlag._za+eFlag._zm+eFlag._ze+eFlag._zs+eFlag._zh+eFlag._zk+eFlag._zu+eFlag._zm1+eFlag._za1);

			// create Menu fadeout layer
			self.headerFad = $(".pageFade");


			// Scroll bar added for require div
			var scroll_bar = '<div id="scrollbar_holder"> <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div> <div class="viewport"> <div class="overview" ></div> </div> </div>';
			self.bdy.find('.add_scroll').each(function(){
				var aa = $(this).children();
				$(this).wrapInner( scroll_bar);
				$(this).find('.overview').append(aa);
			});

			var fontC = $('<span class="fontLoadBefore">FONT</span>');
			$("body").append(fontC);
			var fonSize = fontC.outerHeight();
			fontC.removeClass("fontLoadBefore");
			fontC.addClass("fontLoadAfter");
			var ChkF = 0;

			// Initialize the site after the required time interval
			var intV = setInterval(function() {
			//	if ((zz.indexOf(ch)>-1) ){
					ChkF = ChkF+1;
					if(fonSize !== fontC.outerHeight() || ChkF > 3){
						fontC.remove();
						clearInterval(intV);
						self.initialize();

					}
			//	}else{
				//	clearInterval(intV);
			//	}
			},500);


// Full screen Gallery variables
//=======================================================

			self.fsPly = true;
			self.fsArr = [];
			self.fsCur = -1;
			self.fsNum = 0;
			self.fmImgLoaded = true;
			self.txtEndAni = true;
			self.txtAniSpd = 600; // Text animation speed
			self.txtAniDly = 200;	// Text  animation delay
			self.fsAutoPlay = defaults.galleryAutoplay === "true" ? true : false;	// gallery slideshow autoplay
			self.fsDelay = defaults.gallerySlideshowDelay;	// Gallery slide show delay time
			self.fsTxtSho = false;
			self.isFsGal = false;
			self.sliderArr = [];

			self.fsWra = $(".fs_gallery");
			self.fsGal = $(".fs_thumbs");

			self.fsView = true;
			self.fsThuHig = $(".fsThumb").outerHeight(true);
			self.fpp = 0;

			// create gallery Next image button
			self.bdy.prepend('<a class="next_button"></a>');
			self.fsNxt = self.bdy.children(":first-child");
			// create gallery previous button
			self.bdy.prepend('<a class="previous_button"></a>');
			self.fsPre = self.bdy.children(":first-child");

			// create gallery image Text container
            self.fsTxt = $("#fsTextWarp");

			// Gallery thumbnail mouse events
			self.bdy.find('.fs_thumbs').each(function(){

				($(this).children()).each(function(){
					var thu = $(this);

					thu.bind('mouseover mouseup mouseleave', function() {
						self.fsSlideshow("stop");
					});
					thu.bind('mouseout', function() {
						self.fsSlideshow("delay");
					});

					thu.click(function(){
						self.fsSlideshow("stop");
						self.fsImgLoad($(this));
					});

				});
			});

			// Gallery next image button mouse event
			self.fsNxt.bind('mouseover mouseup mouseleave', function() {
				self.fsSlideshow("stop");
			});

			self.fsNxt.bind('mouseout', function() {
				self.fsSlideshow("delay");
			});

			self.fsNxt.click(function(){
				self.fsSlideshow("delay");
				self.fsCur = self.fsCur+1 < self.fsArr.length ? self.fsCur+1 : 0;
				self.fsImgLoad(self.fsArr[self.fsCur]);
			});


			// Gallery previous image button mouse event
			self.fsPre.bind('mouseover mouseup mouseleave', function() {
				self.fsSlideshow("stop");
			});

			self.fsPre.bind('mouseout', function() {
				self.fsSlideshow("delay");
			});

			self.fsPre.click(function(){
				self.fsSlideshow("delay");
				self.fsCur = self.fsCur-1 > -1 ? self.fsCur-1 : self.fsArr.length-1;
				self.fsImgLoad(self.fsArr[self.fsCur]);
			});

//===================================================================================

			// Portfolio , News full detail content div reset
			$(".fullDetails, .projDetails").css( { "height":"auto", "overflow":"visible" });

			// Portfolio , News slider Initialize
			self.initPortfolioSlider();

			self.bdy.find('#map_canvas').each(function() {
				$(this).data("con",$(this).children(":first-child"));
				$(this).children(":first-child").remove();
			});


			// Cache the Window object
			self.scrollObj = $("body, html");
			self.$html = $("html");
			self.$window = $("body");


			self.pgScrUp =  $(".pgScrollUp");
			var eventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
			self.pgScrUp.bind(eventType, function(event) {
				self.scrollObj.animate({ scrollTop: "0px" }, 500, "easeInOutQuart" );
			});

			clearInterval(self.scrIntr);
			$(window).scroll(function() {
				clearInterval(self.scrIntr);
				self.scrIntr = setInterval(function(){
					clearInterval(self.scrIntr);
					self.scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();
					if(self.scrollPos > 150){
						self.pgScrUp.fadeIn(200);
					}else{
						self.pgScrUp.fadeOut(200);
					}
				},200);
			});

	}


	mainFm.prototype = {


		// Initialize the require objects and variables
		initialize : function(){

			var self = this;
			self.bdy.css("display","block");

			self.loading    =  $( '<div />' ).addClass( 'loading' );
			self.bdy.prepend(self.loading);

			self.prePg = "";
			self.curPg = "";
			self.menuList = [];

			// Loading object added
			self.bdy.prepend('<div id="preloadImg" style="width:150px; height:150px; visibility:hidden; position:absolute; left:0; top:0; overflow:hidden"> </div>');
			self.dumDiv.addClass('email_loading');
			self.dumDiv.removeClass('email_loading');
			$(".headerHold--nav .container").prepend('<span class="highlight"></span>');
			self.higLig = $(".highlight");

			self.pgs.css("visibility","hidden");
			$(".isotope_option").show();

			self.nexButton_detailPg = $("a.next_button");
			self.preButton_detailPg = $("a.previous_button");
			self.clsButton_detailPg = $("a.close_button");
			self.slideNumber_detailPg = $(".sliderNumber");

// Initialize the menu navigation action
			var kk = -1;
			var qq = -1;
			self.rez = false;

			try {
				document.createEvent('TouchEvent');
				$(".pageHolder").bind('click', function() { });
			} catch (e) {
				// nothing to do
			}

			self.navUl.each(function() {

				var slf = $(this);
				qq++;

				if(qq>0){
					slf.children(":first-child").find("a").addClass("first");
					slf.children(":last-child").find("a").addClass("last");
				}

				var uuu = slf.parent().children(":first-child");
				var vvv = slf.parent().children(":last-child");
				if(qq>0){
					if(!self.mobile){
						vvv.css({"top": slf.parent().position().top+uuu.outerHeight()+"px",
						"margin-left": (uuu.outerWidth()-vvv.outerWidth())/2});
					}else{
						vvv.css({"top": "0px",
						"margin-left": "0px"});
					}
				}

				if(qq===0){
					slf.children().each(function() {
                      if(!self.mobile){
							$(this).find("ul").css({"opacity":0, "height":"0px"});
						}

						var mnu = $(this).children();
						mnu.bind('mouseover', function() {
							if(!self.mobile){
								var tpMenu = $(this).parent().find("ul");
								tpMenu.css({"height":"auto"});
								tpMenu.stop();
								tpMenu.animate({"opacity":1},500, false, "easeInOutQuart");
							}
						});

						mnu.bind('mouseout', function() {
							if(!self.mobile){
								var tpMenu = $(this).parent().find("ul");
								tpMenu.stop();
								tpMenu.animate({"opacity":0}, 500, "easeInOutQuart", function(){
									tpMenu.css({"height":"0px"});
								});
							}
						});
					});
				}


				slf.children().each(function() {
					var meu = $(this);
					kk++;
					self.menuList[kk] = $('a', meu).attr("href");

					meu.children(":first-child").bind('click', function() {
						var gg =  $(this).attr("href").split("#");

						if($(this).parent().children().length<2 && !self.mobile){
							self.navUl.children().each(function() {
								if($(this).children(":last-child").children().length>0){
									$(this).children(":last-child").css({"height":"0px", "opacity":0});
								}
							});
						}
					});

                  meu.children(":first-child").bind('mouseover mouseup mouseleave', function() {
                    if(!$(this).data("act")){
                      $(this).css("color", self.menuHighlightColor);
                    }
                  });

                  meu.children(":first-child").bind('mouseout', function() {
						var gg =  $(this).attr("href").split("#");
						var gs = self.onePage ? gg[1] : gg[0];
                    if(self.url !== gs && !$(this).data("act")){
                      $(this).css("color", self.menuColor);
                    }
                  });

				});

			});

			self.homePg = self.homePage === "" ? self.menuList[0].substr(1, self.menuList[0].length): self.homePage;
			self.cM = $('a[href$="'+self.menuList[0]+'"]').parent();

			self.pgs.addClass("pageHidden");

			$('.container .page[data-id="'+self.homePg+'"]').css("visibility","visible");
			$('.container .page[data-id="'+self.homePg+'"]').hide();

			// Initialize the mobile button action
			self.navUl.data('view',false);


			self.bdy.find('img').each(function() {
				$(this).data("src",$(this).attr('src'));
			});

			// Initialize the video
			self.intVideoObject(self.bdy);

			// Add portfolio image mouse over action
			$("body").find('.isotope_items').each(function(){
				$(this).find('.item').each(function(){
					$(this).bind('mouseover mouseup mouseleave', function() {
						var el = $(this).find('img');
						el.removeClass("isotope_img_normal");
						el.addClass("isotope_img_over");
					});

					$(this).bind('mouseout', function() {
						var ele = $(this).find('img');
						ele.removeClass("isotope_img_over");
						ele.addClass("isotope_img_normal");
					});
				});

			});


			$("body").find(".fmSlider").each(function(){
				$(this).data("loaded", false);
			});

			// Add background overlay patter, only desktop/tablet device
			if(self.backgroundOverlay !== "" && !self.mobileDevice){
				$.vegas('overlay', {  src : self.backgroundOverlay });
			}

			$(".vegas-overlay").hide();

			// Enable/disable the image scale animation
			if(isTouch){
				$(".fmSliderNode img").removeClass("enableTransition");
				$(".circle_large").removeClass("enableTransition");
			}else{
				$(".fmSliderNode img").addClass("enableTransition");
				$(".circle_large").addClass("enableTransition");
			}

			// Initialize the window resize function
			clearInterval(self.intr);
			$(window).resize(function() {
				clearInterval(self.intr);
				self.intr = setInterval(function(){clearInterval(self.intr); self.windowRez();},200);
			});

			//Initialize the mobile orientationchange function
			$(window).bind( 'orientationchange', function(){
              self.windowRez();
			});

			self.bdy.prepend('<div style="position:absolute; top:0; left:0; width:1px;" ></div>');
			self.bugRet = self.bdy.children(":first-child");


			// Preload the required images
			var ik = 0;

			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();

			$(".pageHolder .page").show();
			if(!isTouch){ $("html").getNiceScroll().resize(); }

			if(!isTouch){
				function intImgLoad (img){
                  var _im =$("<img />");
                  _im.hide();
                  _im.bind("load",function(){
					$(this).remove();
					if(ik < preLoadImgs.length-1){
                      ik = ik+1;
                      intImgLoad(preLoadImgs[ik]);
					}else{
                      self.history();
                      self.page_setup();
					}
                  }).error(function () {
					$(this).remove();
					if(ik < preLoadImgs.length-1){
                      ik = ik+1;
                      intImgLoad(preLoadImgs[ik]);
                    }else{
                      self.history();
                      self.page_setup();
					}
                  }).each(function() {
                    if(this.complete) { $(this).trigger('load'); }
                  });
                  $("#preloadImg").append(_im);
                  _im.attr('src',img);
                }

				if(preLoadImgs.length>0){
					intImgLoad(preLoadImgs[ik]);
				}else{
					self.history();
					self.page_setup();
				}
			}else{
				self.history();
				self.page_setup();
			}
			// display isotope item
			$('.isotope_items').show();

		},


		// Update the menu and hightlight bar
		menuUpdate : function(e){

			try{
			var self = this;
			var curMenuSho = self.cM_;
			var qq = -1;

			var sMenu = $(".header .nav ul li ul");

			self.navUl.removeClass();
			self.navUl.css("display","block");

			self.navUl.each(function() {

				var slf = $(this);
				qq++;

				if(qq === 0){
					slf.children().each(function() {
						if($(this).children().length>1){
							if(!self.mobile){
								$(this).children(":first-child").removeClass("arrow");
							}else{
								$(this).children(":first-child").addClass("arrow");
							}
						}
					});
				}

				if(qq>0){
					var uuu = slf.parent().children(":first-child");
					var vvv = slf.parent().children(":last-child");
					if(!self.mobile){
						vvv.css({"top": slf.parent().position().top+uuu.outerHeight()+"px",
						"margin-left": (uuu.outerWidth()-vvv.outerWidth())/2});
						if(self.rez || !self.pageLoaded){
							vvv.css({"opacity": 0, "height":"0px"});
						}
					}else{
						vvv.css({"top": "0px", "margin-left": "0px", "height":"auto"});
					}
				}
			});

			var qs = -1;

			self.navUl.each(function() {
				qs++;
				if(qs === 0){
					$(this).find("li a").each(function() {
						$(this).data("act",false);
						$(this).removeClass("current-tab");

						if(self.cM_.attr("href") === $(this).attr("href")){
							curMenuSho = $(this);
							curMenuSho.css("color", self.menuHighlightColor);
							curMenuSho.data("act",true);
							curMenuSho.addClass("current-tab");

						}
					});
				}

				if(qs>0){
					$(this).find("li a").each(function() {
						$(this).data("act",false);
						$(this).removeClass("current-tab");

						if(self.cM_.attr("href") === $(this).attr("href")){
							curMenuSho = $(this).parent().parent().parent().children(":first-child");
							curMenuSho.css("color", self.menuHighlightColor);
							curMenuSho.data("act",true);
							curMenuSho.addClass("current-tab");
						}
					});
				}
			});

			if(!self.mobile || self.IE_old){

				self.navUl.css("display","block");
				self.higLig.css("display","block");
				if((curMenuSho.position()) !== null){
					self.higLig.animate({"width" : curMenuSho.width(),
					"height" : curMenuSho.height()-4,
					"left" : $(".nav").position().left+curMenuSho.position().left+(parseInt(curMenuSho.css('padding-left'), 10)-(parseInt(self.higLig.css('padding-left'), 10))),
					"top" : (curMenuSho.position()).top-1});
				}else{
					self.higLig.hide();
				}

			}else{
				self.navUl.css({"opacity":1});
				if(self.navUl.data('view')){
					self.navUl.css("display","block");
				}else{
					self.navUl.css({"display":"none"});
				}
			}

			$('.tinynav:selected', 'selected').removeAttr('selected');
			$('.tinynav').val( self.cM_.attr("href")).attr('selected', 'selected');
            } catch (e) { }
        },



		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){
				var addCover = false;
				$(this).find('.video_hover').each(function(){

					addCover = true;
					$(this).hover(function() {
						$(this).stop().animate({opacity:0}, 200);
					}, function() {
						$(this).stop().animate({opacity:1}, 200);
					});

					var vid = $(this).parent();
					vid.data("added", true);

					vid.click(function(){

						try {	self.audioPlayer.jPlayer("pause"); } catch (e) { }
						self.videoPlaying = true;

						$("body").find('.addVideo').each(function(){
							if($(this).parent().hasClass("tabVideo")){
								return;
							}
							$(this).find('.vid').remove();
							if(!$(this).data("added")){
								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
								var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
								vid.prepend('<div class="vid" ></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
							}
							$(this).find('img').fadeIn();
							$(this).find('.video_hover').fadeIn();
							$(this).find('.video_hover').css({"z-index":"5"});
						});

						$(this).prepend('<div class="vid" ></div>');
						$(this).find('.video_hover').css({"z-index":"-1"});
						$(this).find('img').fadeOut(100,function(){
							var vid = $(this).parent();
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), vid.width()+"px", vid.height()+"px", vid.width(), false);
						});
					});
				});

			});

		},

		audioPlayerDisable : function(play){
			var self = this;

			if(!play){
				try {	self.audioPlayer.jPlayer("pause"); } catch (e) { }
				self.videoPlaying = true;
			}else{
				try {
					if(self.audioPlaying && self.audioPlayer.data().jPlayer.status.paused && !self.videoBgAudio){
						self.audioPlayer.jPlayer("play");
					}
				} catch (e) { }
				self.videoPlaying = false;
			}


		},


// initPortfolioSlider function is used to create a portfolio and news items

      initPortfolioSlider : function(){

			var self = this;
			$('#backArea').hide();

			$("body").prepend(' <a class="alignRight next_button" ></a');
			self.n_Btn = $("body").children(":first-child");

			$("body").prepend('<a class="alignRight previous_button"></a>');
			self.p_Btn = $("body").children(":first-child");

			$("body").prepend('<a class="alignRight close_button"></a>');
			self.c_Btn = $("body").children(":first-child");

			$("body").prepend('<div class="alignRight sliderNumber">1/10</div>');
			self.n_sli = $("body").children(":first-child");

			self.n_Btn.fadeOut();
			self.p_Btn.fadeOut();
			self.c_Btn.fadeOut();
			self.n_sli.fadeOut();

			self.n_Btn.click(	function() {
				self.curSlide = self.curSlide+1 < self.curFmSlider.length ? self.curSlide+1 : 0;
				self.showDetailPage(self.curFmSlider[self.curSlide]);
				if(!self.onePage){
					window.location.href = "#!?p="+self.curSlide;
				}else{
					window.location.href = "#"+self.url+"?p="+self.curSlide;
				}
			});

			self.p_Btn.click(	function() {
				self.curSlide = self.curSlide-1 > -1 ? self.curSlide-1 : self.curFmSlider.length-1;
				self.showDetailPage(self.curFmSlider[self.curSlide]);
				if(!self.onePage){
					window.location.href = "#!?p="+self.curSlide;
				}else{
					window.location.href = "#"+self.url+"?p="+self.curSlide;
				}
			});

			self.c_Btn.click(	function() {
				if(!self.onePage){
					window.location.href = "#";
				}else{
					window.location.href = "#"+self.url;
				}
			});

			$("body").find('.projects_container').each(function(){
				var ff2 = $(this);
				var sArry = [];
				var iii = 0;

				ff2.data("slides",$(this).find('.proj').length);

				$(this).find('.proj').each(function(){
					var pro = $($(this).attr("data-project"));
					sArry.push($(this));
					$(this).data("iii",iii++);
					pro.find('.flexSlideshow').addClass('flexslider');
					$(this).data("details",pro);
				});
				ff2.data("sArry",sArry);
			});

			$(".projects_container .proj").click(function() {
				self.curFmSlider = $(".pageHolder .projects_container").data("sArry");
				var ppp = $(this);
				self.curSlide = ppp.data("iii");
				self.showDetailPage(ppp);
				if(!self.onePage){
					window.location.href = "#!?p="+self.curSlide;
				}else{
					window.location.href = "#"+self.url+"?p="+self.curSlide;
				}
			});

			$("body").find('.proj').each(function(){
				var pro = $($(this).attr("data-project"));
				pro.remove();
			});

			$("body").find(".fullDetails").remove();
		},



// Remove the content that load inside the backArea div
		removeBackCon : function(){
			var self = this;

			try{ self.removeScrollbar(); } catch (e) { }

			try{
				self.backPage.children(":first-child").find(".slider_loading").each(function(){
					try{ $(this).remove();  } catch (e) { }
				});
			} catch (e) { }

			try{
				for(var ss=0; ss < self.sliderArr.length; ss++){
					self.sliderArr[ss].pause();
					self.sliderArr[ss].destroy();
					self.sliderArr[ss].remove();
				}
				self.sliderArr=[];
			} catch (e) { }


			try{
				self.backPage.children(":first-child").find('.flexSlideshow').each(function(){
					try{ $(this).flexslider.remove(); } catch (e) { }
				});

			} catch (e) { }

			try{
				('#backArea').children(":first-child").find("img").each(function(){
					try{ $(this).remove(); } catch (e) { }
				});
			} catch (e) { }

			try{ $('#backArea').children(":first-child").remove();  } catch (e) { }

			var pHol2 = $(".pageHolder .page");
			pHol2.show();
			pHol2.css({"width":"100%","height":"100%"});

			if(!self.mobile){
				pHol2.find('.masonry_container').each(function(){
					$(this).find(".item").css({"width":self.masonPer});
					if(!isTouch  || ipadDevice){
						$(this).masonry({
                          columnWidth: function( containerWidth ) {
                            return containerWidth / self.masonNum;
                              }
						});
					}
				});
			}

			if(!isTouch){ $("html").getNiceScroll().resize(); }

		},



// Show the details page
		showDetailPage : function(el){

			var self = this;
			var pr = el;

			self.scrollObj.animate({ scrollTop: "0px" }, 500, "easeInOutQuart" );

			var nTx = self.curFmSlider.length > 8 ? (self.curSlide > 8 ? (self.curSlide+1)+"/"+(self.curFmSlider.length) :
				"0"+(self.curSlide+1)+"/"+(self.curFmSlider.length)) : (self.curSlide+1)+"/"+(self.curFmSlider.length);

			self.n_sli.text(nTx);

			if(!pr){ return; }

			// Remove the flex slider and content before load the new content

			if(pr.data("details").length === 0){
				self.backPage.stop();

				if(self.pgBgPath !== "none"){
					$(".vegas-background").stop().css({"visibility":"visible"}).show();
				}

				try {
					for(var ss=0; ss < self.sliderArr.length; ss++){
						self.sliderArr[ss].pause();
					}
				} catch (e) { }

				if(!self.mobile){
					self.backPage.animate({"height": "0px"}, 1000, "easeInOutQuart", function(){
						self.removeBackCon();
					});
				}else{
					self.backPage.css({"height": "0px"});
					self.removeBackCon();
				}
				return;
			}

			// show the next previous button
			self.n_Btn.fadeIn();
			self.p_Btn.fadeIn();
			self.c_Btn.fadeIn();
			self.n_sli.fadeIn();

			self.backPage.show();

			// reset the detail page size

			self.backPage.css({"width": "100%"});

			self.backPage.stop();
			self.backPage.children(":first-child").css("width", $("#bodyContent").width());


			if(self.mobile){
				self.backPage.css({"height": "0px"});
			}

			var spdd = 1000;

			if(self.backPage.height()<10 && self.firBckLod){
				spdd = 0;
			}
			self.firBckLod = true;

			self.backPage.stop();

			$(".pageHolder .page").show();
			if(!isTouch){ $("html").getNiceScroll().resize(); }

			self.backPage.animate({"height": "0px"}, spdd, "easeInOutQuart", function(){

				// Remove the previous page if it not remove completely
				self.removeBackCon();
				// load the lazyload image
				if(pr.data("details").length>0){
					$('#backArea').prepend('<div style="position:releative; "></div>');
					pr.data("details").clone().appendTo(self.backPage .children(":first-child"));
					self.backPage.children(":first-child").children(":last-child").find(" a.lazyload").each(function(){
						self.lazyLoadInt($(this));
					});
				}

				self.detailNoMar = pr.data("details").hasClass("noMargin");
				self.intVideoObject($('#backArea'));

				self.detailPage();
				self.pageResize();
				self.backPage.css({"height": "0px"});
				self.addScrollbar();

				// Store the flex slider in array
				self.sliderArr = [];
				$('#backArea').children(":first-child").find('.flexSlideshow').each(function(){
					var ffx = $(this);
					ffx.prepend('<div class="slider_loading" ></div>');
					ffx.children(":first-child").css({"top":ffx.height()/2-15});
					ffx.flexslider({
						slideshow: true,
						slideshowSpeed: self.flxDelay,
						start: function(slider){
							$(slider.slides.eq(0).html()).hide();
							$(slider.slides.eq(0).html()).attr('src', $(slider.slides.eq(0).html()).attr("src")).load(function() {
								ffx.find(".slider_loading").remove();
								$(slider.slides.eq(0).html()).fadeIn(300);
							}).error(function () {
								ffx.find(".slider_loading").remove();
							}).each(function() {
                              if(this.complete) { $(this).trigger('load'); }
							});
							self.sliderArr.push(slider);
						}
					});
				});


				// Show the full detail page
				if(self.mobile){
					$(".pageHolder .page").hide();
					self.backPage.css({"height": "auto", "overflow-x":"hidden" });
					self.detailPage();
					$('#backArea').find('.addVideo').each(function(){
						if(!$(this).data("added")){
							var vid = $(this);
							var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
							var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
							var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
							if(H === "100%"){
                              vid.css({"height":"100%"});
							}
							vid.prepend('<div class="vid"></div>');
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
						}
					});
				}else{
					self.backPage.animate({"height": self.winHeight-($(".header").height()+$(".footer").outerHeight())}, 1000, "easeInOutQuart", function(){
						$(".pageHolder .page").hide();
						self.backPage.css({"overflow-x":"hidden", "height": "auto"});
						self.detailPage();
						$('#backArea').find('.addVideo').each(function(){
							if(!$(this).data("added")){
								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
								var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
								if(H === "100%"){
									vid.css({"height":"100%"});
								}
								vid.prepend('<div class="vid"></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
							}
						});
					});
				}
			});
		},



		resizeImg : function (obj){
          if(obj.width() === 0){ return; }
			var hold;

			if(obj.parent().parent().parent().parent().hasClass("projImgs") || obj.hasClass("resize_align")){
				if(obj.hasClass("resize_align")){
					hold =obj.parent().parent();
				}else{
					hold =obj.parent().parent().parent().parent();
				}
			}else{
				return;
			}

			obj.css({"width":"auto", "height":"auto"});

			var	iw = obj.width(),
				ih = obj.height(),
				ww = hold.width(),
				wh = hold.height(),
				rw = wh / ww,
				ri = ih / iw,
				tp = 0,
				lp = 0,
				newWidth, newHeight,
				newLeft, newTop,
                properties;

				if(obj.hasClass("resize_align")){
					obj.css({ "margin-left": "0px" });
					var rezr = $("#bodyContent").width() < 1360 ? rw < ri : rw > ri;
					if ( rezr ) {
						newWidth = wh / ri;
						newHeight = wh;
						lp = ( ww  -newWidth)/2;
					} else {
						newWidth = ww;
						newHeight = ww * ri;
					}
					obj.css({'margin-left': Math.round(lp) + "px"});
				}else{
					if ( rw < ri ) {
						newWidth = wh / ri;
						newHeight = wh;
					} else {
						newWidth = ww;
						newHeight = ww * ri;
					}
				}

				tp = (wh-newHeight)/2;



          properties = {
					'width': Math.round(newWidth) + 'px',
					'height': Math.round(newHeight) + 'px',
					'margin-top': Math.round(tp) + "px",
					"left":"auto",
					"right":"auto",
					'bottom': "auto"
				};
				obj.css( properties);

		},

/* Full detail page
	The detailPage function is used to set the dimension of the
	slideshow image and text as pre the content */

		detailPage : function (){

			var self = this;

			var headerHig = $(".header").outerHeight();

			if(self.projFm){

				var topSpace = $(window).width() > 1360 ? headerHig : 50;
				var spacing = self.mobile ? 0 : self.detailNoMar ? 0 : 50;
				var mobspac = self.mobile ? 20 : self.detailNoMar ? 0 : 50;
				var botSpc = self.mobile ? 0 : 100;
				self.backPage.css({"width": "100%", "height": "auto"});

				var detailYes = false;
				self.backPage.children(":first-child").find(".projDetails").each(function(){
					detailYes = true;
				});

				//self.loadingBar(false);


				self.backPage.children(":first-child").css({"margin-top": 0});
				self.backPage.css({"top":0+"px"});

				self.backPage.children(":first-child").css({ "width": $("#bodyContent").width(), "height": "auto", "overflow":"visible"});
				$('#bodyContent').css({"overflow":"visible"});


				var fg = self.backPage.children(":first-child").find(".projImgs");
				var ff = self.backPage.children(":first-child").find(".scroll-pane");

				var imgHig = self.mobile ? self.winHeight-(headerHig+100) : self.winHeight-(headerHig+$(".footer").outerHeight()+200);
				imgHig = imgHig > 360 ? 360 : imgHig;
				imgHig = $("#bodyContent").width() < 1360 ? imgHig : self.winHeight-(50+topSpace+headerHig+$(".footer").outerHeight());
				imgHig = imgHig < 240 ? 240 : imgHig;
				imgHig = self.mobile && self.backPage.children(":first-child").find(".projImgs .addVideo").length > 0 ? 240 : imgHig;

				if(detailYes){
					if($("#bodyContent").width() < 1360){
						if(self.mobile){
							fg.css({"width":"100%", "height": imgHig,"top":10+"px"});
						}else{
							fg.css({"width":($("#bodyContent").width()-(spacing*2))+"px", "height": imgHig+"px"});
						}

						fg.css({"position":"relative", "float":"none",
						"margin-top":topSpace+"px","margin-right":spacing+"px","margin-bottom":"0px","margin-left":spacing+"px"});

						ff.css({"position":"relative", "width":"auto", "height": "auto", "float":"none", "top":50+"px",
						"margin-top":"0px","margin-right":mobspac+"px","margin-bottom":botSpc+$(".footer").outerHeight()+"px","margin-left":mobspac+"px" });
						self.removeScrollbar();
					}else{
						fg.css({"height": imgHig, "width":($("#bodyContent").width()-520)+"px", "margin":"0px 50px 50px 50px", "float":"left"});
						ff.css({"margin":"50px 75px 0px 0px", "top":"0px" , "position":"relative", "height": $(window).height()-(75+topSpace+headerHig)});
					}

				}else{
					var hh = self.ipadPort ? self.winHeight-(headerHig+$(".footer").outerHeight()) : self.winHeight-(spacing+headerHig+$(".footer").outerHeight());
					hh = hh < 240 ? 240 : hh;
					if(self.mobile){
						fg.css({"height":hh, "width":($("#bodyContent").width())+"px", "margin":"50px 0px 50px 0px", "float":"left"});
						self.backPage.children(":first-child").css({ "margin-top":"20px"});
					}else{
						hh = self.detailNoMar ? self.winHeight-(headerHig+$(".footer").outerHeight()) : self.winHeight-(headerHig+$(".footer").outerHeight()+70);
						hh = hh < 240 ? 240 : hh;
						if(self.detailNoMar){
							self.backPage.children(":first-child").css({"margin":"0px"});
							fg.css({"height":hh, "width":"100%", "top":"0px", "padding":"0px","margin":"0px", "float":"left"});
						}else{
							fg.css({"height":hh, "width":($("#bodyContent").width()-(spacing*2))+"px", "margin":"20px 50px 0px 50px", "float":"left"});
						}
					}
				}

				if(self.backPage.height() < self.winHeight-(headerHig+$(".footer").outerHeight() )&& self.backPage.children(":first-child").length>0){
					if(self.mobile){
						self.backPage.css({	"height":"auto" });
					}else{
						self.backPage.css({	"height":self.winHeight-(headerHig+$(".footer").outerHeight()) });
					}
				}

				self.backPage.css({ "margin-top": self.tCon.outerHeight()});
				self.backPage.children(":first-child").css({ "margin-bottom": "50px"});

			}else{
				var pp = self.mobile || $(window).width() <= 959 ? 0 : headerHig;
				self.backPage.css({"height": "0px", "top":pp+"px", "margin-top": self.tCon.outerHeight(), "margin-bottom": self.bCon.outerHeight()});
			}

			if(self.mobile){
				self.backPage.css({ "position":"relative", "margin": "0px" });
			}else{
				self.backPage.css({ "position":"absolute" });
			}

			$('#backArea').find('.projImgs img').each(function(){
				self.resizeImg($(this));
			});


			setTimeout(function(){
				if(!isTouch){ $("html").getNiceScroll().resize(); }
			},250);
		},


// Gallery slideshow function
		fsSlideshow : function (ev){
			var self = this;
			clearInterval(self.fsInt);
			clearInterval(self.fsDly);
			// pause the slideshow for few seconds
			if(ev === "delay"){
				self.fsDly = setInterval(function(){
					clearInterval(self.fsDly);
					self.fsSlideshow("play");
				},500);
			}

			// Play slideshow
			if(ev === "play"){
				self.fsInt = setInterval(function(){
					if(self.fsAutoPlay){
						self.fsCur = self.fsCur+1 < self.fsArr.length ? self.fsCur+1 : 0;
						self.fsImgLoad(self.fsArr[self.fsCur]);
					}
					clearInterval(self.fsInt);
				}, self.fsDelay*2500);
			}
		},



// Gallery image text fade out animation function
		fsTextOut : function(){

			var self = this;
			clearInterval(self.txtAniInt);

			//if(!self.mobileDevice){
			var ii = -1;
			self.txtAniInt = setInterval(function(){
				if(self.txtEndAni){
					clearInterval(self.txtAniInt);
					if(self.fsTxt.children().length>0){
						if($(self.fsTxt.data("con")).data("num") !== self.fsNum || !self.fsTxtSho){
							self.fsTxt.find(".fs_caption").each(function(){
								var ll = self.fsTxt.find(".fs_caption").children().length;
								if(!isNaN($(this).data("lt"))){
									var css1 = { "left": $(this).data("lt")-70, "opacity":0 };
								}else{
                                  css1 = { "right": $(this).data("rt")-70, "opacity":0 };
								}
								self.fsTxt.data("pg", $(".pageHolder .page").attr("data-id"));
								self.fsTxt.find(".fs_caption div").each(function(){
									ii++;
									$(this).data("pos",ii);
									$(this).delay(Number(ii*170)).animate(css1, 250, "easeOutSine", function(){
										if($(this).data("pos") === ll-1){
											self.fsTxt.data("con").append(self.fsTxt.children());
											self.fsTxt.data("con").find(".fs_caption").css("visibility","hidden");
											self.txtEndAni = false;
											if(self.fsTxtSho){
												self.fsTextIn();
											}else{
												self.txtEndAni = true;
											}
											if(!self.pageLoadfinished){
												self.bg_setup();
											}
										}
									});
								});
							});
						}else{
							self.txtEndAni = true;
						}
					}else{
						if(!self.pageLoadfinished){
							self.bg_setup();
						}
						if(self.fsTxtSho){
							self.txtEndAni = false;
							self.fsTextIn();
						}else{
							self.txtEndAni = true;
						}
					}
				}

			}, 200);
		//`	}

		},

// Gallery image text fade In function
		fsTextIn : function(){

			var self = this;
			var tt = false;
			var ii = 0;
			if(self.fsArr.length > 0){
				self.fsArr[self.fsNum].find(".fs_caption").each(function(){
					tt = true;
				});
			}
			if(tt){
				self.fsArr[self.fsNum].find(".fs_caption").css({"visibility":"visible"});
				self.fsArr[self.fsNum].find(".fs_caption").hide();
				self.fsTxt.append(self.fsArr[self.fsNum].find(".fs_caption"));
				self.fsTxt.data("con",self.fsArr[self.fsNum]);

				self.fsTxt.find(".fs_caption").each(function(){
					if(!$(this).data("lt")){
						$(this).data({"lt":parseInt($(this).css("left"), 10)});
						$(this).data({"rt":parseInt($(this).css("right"), 10)});
					}
					$(this).show();
					if(!isNaN($(this).data("lt"))){
						var css1 = { "left": $(this).data("lt")+150, "opacity":0 };
						var css2 = { "left": $(this).data("lt"), "opacity":1 };
					}else{
						css1 = { "right": $(this).data("rt")+150, "opacity":0 };
						css2 = { "right": $(this).data("rt"), "opacity":1 };
					}
					var ll = self.fsTxt.find(".fs_caption").children().length;
					self.fsTxt.find(".fs_caption div").each(function(){
						ii++;
						$(this).data("pos",ii);
						$(this).css(css1);
						$(this).delay(Number(ii*(self.txtAniDly))).animate(css2, self.txtAniSpd , "easeOutSine", function(){
							if($(this).data("pos") === ll){
								self.txtEndAni = true;
							}
						});
					});
				});
			}else{
				self.txtEndAni = true;
			}
		},


// Gallery image load function
		fsImgLoad : function (ob){

				var self = this;

				if(self.fsArr.length<1 || self.fsCur<0){
					return(0);
				}
				for(var ii=0; ii<self.fsArr.length; ii++){
					if(ii !== ob.data("num") && self.fsArr[ii].css("opacity") < 0.99){
						self.fsArr[ii].css({"opacity":"1"});
					}
				}
				self.fsArr[ob.data("num")].css({"opacity":"0.25"});
				self.fsCur = ob.data("num");


				var nTx = self.fsArr.length > 8 ? (self.fsCur > 8 ? (self.fsCur+1)+"/"+(self.fsArr.length) : "0"+(self.fsCur+1)+"/"+(self.fsArr.length))
				: (self.fsCur+1)+"/"+(self.fsArr.length);


				self.n_sli.text(nTx);

				if(self.mobile){
					$(".pageHolder .page").css({"min-height" : self.winHeight});
				}else{
					$(".pageHolder .page").css({"min-height" : self.winHeight- ((self.tCon.outerHeight()+self.bCon.outerHeight()))});
				}

				self.fsTxt.css({"height":self.winHeight- (self.tCon.outerHeight()) });


					self.fmImgLoaded = false;
					var imgSrc = !self.mobile? ob.attr("data-src") : (ob.attr("data-src-small")? ob.attr("data-src-small")  :ob.attr("data-src"));
					self.fsNum = ob.data("num");
					rezType = ob.attr("data-imgResize");

					self.bdy.prepend('<div class="fsLoading"></div>');
					self.fflod = self.bdy.find(".fsLoading");
					if(self.mobile){ self.fflod.css({"bottom":"60px"}); }
					self.fflod.hide();

					$.vegas('unbindLoad');

					setTimeout(function(){
						try { self.fflod.fadeIn(500); } catch (e) { }
					},200);

					// initialize to load the image
					if(imgSrc !== ""){
						$(".vegas-background").css({"visibility":"visible"}).show();
						$.vegas({ src:  imgSrc , fade:500,
							load:function(){
								try { self.fflod.remove(); } catch (e) { }
							},
							complete:function() {
								try { self.fflod.remove(); } catch (e) { }
								self.fmImgLoaded = true;
								self.fsSlideshow("play");
								self.fsTextOut();
							}
						});
					}else{
						self.fmImgLoaded = true;
						try { self.fflod.remove(); } catch (e) { }
						self.fsSlideshow("play");
						self.fsTextOut();
						$(".vegas-background").fadeOut(1000);
					}
		},



// Page background setup function
		bg_setup : function (){
				var self = this;
				var imgSrc = "";
				rezType = "fill";

				$.vegas('unbindLoad');

				// Remove the google map if it place on the current page
				$(".pageHolder .page").find('#mapWrapper').each(function(){
					if(!self.IE_old){
						$(this).children(':first-child').remove();
					}
				});

				// Remove the video from the previous page
				$("#bodyContent").find('.addVideo').each(function(){
					$(this).find('.vid').remove();
					$(this).find('img').show();
				});

				var jf = self.onePage ? $('[data-id="'+self.curPg+'"]') : $(".page");
				$(".page").each(function(){
					if(self.curPg === $(this).attr("data-id")){
						jf = $(this);
					}
				});

				imgSrc = !isMobileChk ? jf.attr("data-background") : (jf.attr("data-background-small")? jf.attr("data-background-small")  : jf.attr("data-background"));

				// initialize to load the page background
				if(imgSrc === "" || imgSrc === undefined){
					imgSrc = "none";
				}

				imgSrc =   !isTouch && jf.attr("data-background-video") != undefined ? "none" : imgSrc;


				self.pgBgPath = imgSrc;

				self.videoBgAudio = false;
				if(!isTouch){
					if(jf.attr("data-background-video") != undefined){
						bgVideopath = jQuery.parseJSON(String(jf.attr("data-background-video")));
						if(bgVideopath.sound === "yes"){
							try {	self.audioPlayer.jPlayer("pause"); } catch (e) { }
							self.videoBgAudio = true;
						}

					}else{
						bgVideopath = "";
						BigVid.destroyAdd();
					}

					try {
						if(self.pageLoaded){
							if(self.audioPlaying && self.audioPlayer.data().jPlayer.status.paused && !self.videoBgAudio){
								 self.audioPlayer.jPlayer("play");
							}
						 }
					} catch (e) { }

				}

				if(imgSrc === "none"){
					self.fmImgLoaded = true;
					$(".vegas-background").fadeOut(1000,function(){ $(this).css({"visibility":"hidden"}).attr("src","  "); });
					self.loadingBar(false);
					self.bg_load();
                }else{
					$(".vegas-background").css({"visibility":"visible"});
					$.vegas({ src:  imgSrc , fade:500,
                           load:function(){
                             self.loadingBar(false);
                           },
                           complete:function() {
                             self.loadingBar(false);
                             self.bg_load();
                           }
                          });
						self.loadingBar(true);
					}
        },


// Page Background load function
		bg_load : function(){
			var self = this;

			// Fade-in Header, footer and logo after the first page background loaded
			if(!self.pageLoaded){
				self.pageLoaded = true;
				$(".footer").css({"display":"table"});
				self.headerFad.fadeOut(1000, "easeInOutQuart", function(){ self.headerFad.remove();  self.firBckLod = true; });
				self.menuUpdate();
				setTimeout(function(){ $("body").css({"overflow-y":"auto"});  self.menuUpdate(); },2500);
				if(!self.IE_old){
                  $(".isotope_items .item a .img_text").css("visibility","visible");
				}
				if(!isTouch){
					musicLoad(!self.videoBgAudio);
				}
			}

			self.loadingBar(false);

			if(self.pgBgPath !== "none"){
				if(!self.mobile){	$(".vegas-overlay").fadeIn(1000);		}else{		$(".vegas-overlay").show();		}
			}else{
				if(!self.mobile){	$(".vegas-overlay").fadeOut(1000);		}else{		$(".vegas-overlay").stop().hide();		}
			}

			self.page_display();

		},

// Page loading bar
		loadingBar : function (sho){
			var self = this;
			clearInterval(self.loadBarInt);
			if(sho){

				self.loadBarInt = setInterval(function() {
					clearInterval(self.loadBarInt);
					self.loading.css({"visibility":"visible"}).fadeIn(300);
				},300);
			}else{
				clearInterval(self.loadBarInt);
				self.loading.fadeOut(300, function(){ $(this).css({"visibility":"hidden"}); });
			}
		},


// The entire page can be reposition, resize and modified by page_setup function
		page_setup : function (){
			var self = this;
			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();

			$(".pageHolder .page").show();
			if(!isTouch){ $("html").getNiceScroll().resize(); }

			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.mobile = self.winWidth <= 959 && !self.ipadPort;
			self.midMobile = self.winWidth <= 767 && self.winWidth > 479;
			self.minMobile = self.winWidth <= 480;
			isMobileChk = self.winWidth < 768;
			self.navTop = true;

			// Reset the required variable
			self.pgHeight = "100%";
			self.pgHeight =  "100%";

			$("#bodyContent").css({"width": "100%"});

			self.loading.css({"left": self.winWidth/2-16, "top": self.winHeight/2-16});

			self.masonNum = self.winWidth < 1360 ? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : 4;
			self.masonPer = (100/self.masonNum)-0.1+"%";

			// Change the default image in img tag, if mobile version(data-src-small) image is assign on the img tag
			if(self.pageLoaded){
				self.bdy.find('img').not('.logo__img').each(function() {
					if($(this).attr('data-src-small')){
						if(!self.mobile || !$(this).attr('data-src-small')){
							var img_Src = $(this).data('src').split(".");
							var iimg = $(this).attr('data-retina') === "yes" && retinaDevice ? img_Src[0]+"--2x."+ img_Src[1] : $(this).data('src');
								if(String($(this).attr('src')) !== iimg){
									$(this).attr("src", iimg);
									$(this).data("i_src",$(this).data('src'));
								}
						}else{
							if($(this).attr('data-src-small')){
								img_Src = $(this).attr('data-src-small').split(".");
								iimg = $(this).attr('data-retina') === "yes" && retinaDevice ? img_Src[0]+"--2x."+ img_Src[1] : $(this).attr('data-src-small');
								if(String($(this).attr('src')) !== String($(this).attr('data-src-small')) && String($(this).attr('src')) !== iimg){
									$(this).attr("src",iimg);
									$(this).data("i_src",$(this).attr('data-src-small'));
								}
							}
						}
					}
				});
			}


			self.menuUpdate();

			if(self.mobile ){	self.removeScrollbar();		}else{		self.addScrollbar();	}

			// Remove the video if playing and show video cover image
			$("body").find('.addVideo').each(function(){
				if($(this).data("added")){	$(this).find('.vid').remove();	}
				$(this).find('img').show();
				$(this).find('.video_hover').show();
				$(this).find('.video_hover').css({"z-index":"5"});
			});

			self.videoPlaying = false;

			// Resize the portfolio
			$("body").find('.isotope_items').each(function(){
				if(!self.IE_old){
					var gaIt = $('.isotope_items .item');
					if(self.midMobile){
						gaIt.removeClass('large');
						gaIt.removeClass('small');
						gaIt.addClass('medium');
					}else if(self.minMobile){
						gaIt.removeClass('medium');
						gaIt.removeClass('large');
						gaIt.addClass('small');
					}else{
						gaIt.removeClass('medium');
						gaIt.removeClass('small');
						gaIt.addClass('large');
					}
				}
				$(this).isotope( {}, 'reLayout' );
			});

			$(".pageHolder .page").find('.fs_gallery').each(function(){
				if(self.fsTxt.data("pg") !== $(".pageHolder .page").attr("data-id")){
					if(self.fsTxt.children().length > 0){
						self.fsTextOut();
					}
				}else{
					if(self.fsTxt.children().length < 1){
						self.fsTextIn();
					}
				}
				$('.fsThumb').addClass("fsThumbAnimation");
				$('.fs_thumbs').addClass("fsThumbAnimation");
				self.fpp = 0;
				if( self.fsCur < 0 && parseInt(self.pHol.css("left"), 10) === 0){
					self.fsCur = 0; self.fsImgLoad(self.fsArr[0]);
				}
			});

			if(self.rez){ $.vegas('resize_'); }

			if(!self.mobile){
				self.navUl.find("ul").css({"z-index":"inherit"});
			}else{
				self.navUl.find("ul").css({"z-index":1000});
			}

			// Detailpage button position
			if(self.isFsGal){
				if(self.mobile){
					self.nexButton_detailPg.removeClass("next_mobile_top_pos next_pos").addClass("next_mobile_bottom_pos");
					self.preButton_detailPg.removeClass("previous_mobile_top_pos previous_pos").addClass("previous_mobile_bottom_pos");
					self.clsButton_detailPg.removeClass("close_mobile_top_pos close_pos").addClass("close_mobile_bottom_pos");
					self.slideNumber_detailPg.removeClass("sliderNumber_mobile_top_pos sliderNumber_pos").addClass("sliderNumber_mobile_bottom_pos");
				}else{
					self.nexButton_detailPg.removeClass("next_mobile_bottom_pos next_pos").addClass("next_mobile_top_pos");
					self.preButton_detailPg.removeClass("previous_mobile_bottom_pos previous_pos").addClass("previous_mobile_top_pos");
					self.clsButton_detailPg.removeClass("close_mobile_bottom_pos close_pos").addClass("close_mobile_top_pos");
					self.slideNumber_detailPg.removeClass("sliderNumber_mobile_bottom_pos sliderNumber_pos").addClass("sliderNumber_mobile_top_pos");
				}
			}else{
				self.nexButton_detailPg.removeClass("next_mobile_bottom_pos next_mobile_top_pos").addClass("next_pos");
				self.preButton_detailPg.removeClass("previous_mobile_bottom_pos previous_mobile_top_pos").addClass("previous_pos");
				self.clsButton_detailPg.removeClass("close_mobile_bottom_pos close_mobile_top_pos").addClass("close_pos");
				self.slideNumber_detailPg.removeClass("sliderNumber_mobile_bottom_pos sliderNumber_mobile_top_pos").addClass("sliderNumber_pos");
			}


			$(".fmSliderNode img").removeClass("enableTransition");

			$(".pageHolder .page").find("img.scale_fill, img.scale_fit, img.scale_cover").each(function(){
				$(this).css({"left":-($(this).width()-$(this).parent().width())/2});
				$(this).css({"top":-($(this).height()-$(this).parent().height())/2});
			});

			$("#backArea").find("img.scale_fill, img.scale_fit, img.scale_cover").each(function(){
				$(this).css({"left":-($(this).width()-$(this).parent().width())/2});
				$(this).css({"top":-($(this).height()-$(this).parent().height())/2});
			});

			if(!isTouch){ $(".fmSliderNode img").addClass("enableTransition"); }


			if(self.mobile){
				$(".pageHolder .page").css({"min-height" : self.winHeight});
			}else{
				$(".pageHolder .page").css({"min-height" : "auto"});
			}

			self.fsTxt.css({"width"  :  self.winWidth});
			if(self.isFsGal){
				if(!self.mobile){
					$(".pageHolder .page").css({"min-height" : self.winHeight- ((self.tCon.outerHeight()+self.bCon.outerHeight()))});
				}
				self.fsTxt.css({"min-height":self.winHeight- (self.tCon.outerHeight()) });
			}else{
				self.fsTxt.css({"min-height":0});
			}

			$(".pageHolder .fmSlider").each(function(){
				if($(this).data("loaded")){
					$(this).fmMainSlider("posNav");
				}
			});
			if(!isMobileChk){
				self.bodyCon.css({"height": "auto"});
			}

			setTimeout(function(){
				self.mrgTop = self.isFsGal? self.winHeight : 0;
				self.mrgTop = 0;
				self.mrgBot = 0;
				if(!isMobileChk){
					var ptt = isNaN(parseInt(self.tCon.css("border-bottom"), 10)) ? 0 : parseInt(self.tCon.css("border-bottom"), 10);
					self.mrgTop = self.tCon.outerHeight()- ptt;
					self.mrgBot = parseInt(self.foot.outerHeight(), 10);
				}
				self.bodyCon.css({"margin-top": self.mrgTop, "margin-bottom": self.mrgBot });
				self.pageResize();

				self.masonNum = self.winWidth < 1360 ? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : 4;
				self.masonPer = (100/self.masonNum)-0.1+"%";

				$(".pageHolder .page").find(".masonry_container").each(function(){
					$(this).find(".item").css({"width":self.masonPer});
					if(!isTouch  || ipadDevice){
						$(this).masonry({
							columnWidth: function( containerWidth ) {
                              return containerWidth / self.masonNum;
							}
						});
					}
				});

			},100);

			setTimeout(function(){
				if(!isTouch){ $("html").getNiceScroll().resize(); }
			},250);

		},




// Page resize
		pageResize : function(e){

			var self = this;
			self.winWidth =   $(window).width();
			self.heaWid = 0;
			self.heaPos = 0;

			self.pHol.css({"padding-left":0, "top": 0});
			self.pgB.css({"width": self.winWidth-(self.heaWid+self.heaPos)});
			self.detailPage();

			$(".pageHolder .page").css({"margin" : "0px"});
			$(".pageHolder .fullHeight").css({"min-height":"auto" });

			if(!self.mobile){
				$(".pageHolder .fullHeight").css({"min-height":"auto" });
				var hhh = (self.winHeight-( self.foot.outerHeight()+self.tCon.height())+parseInt($("#bodyContent").css("margin-top"), 10) );
				var fff = (hhh-self.pHol.outerHeight())/2 + parseInt($("#bodyContent").css("margin-top"), 10)/2;
				if(!self.isFsGal && $(".pageHolder .page").attr("data-position") !==  "top" && (fff - parseInt($("#bodyContent").css("margin-top"), 10)) > 0){
					$(".pageHolder .page").css({"margin-top": fff +"px" });
				}

				if($(".pageHolder .page").attr("data-position") ===  "top"){
					$(".pageHolder .fullHeight").css({"min-height":hhh-self.tCon.height() });
				}
			}

			$.vegas('resize_');

		},


// The page_load function is used to load the current page inside the pageHolder div
		page_load : function (e){

			var self = this;
			self.url = e ? e : self.homePg;

			self.cM = $('a[href$="#'+self.url+'"]').parent();
			self.cM_= !self.onePage ? $('a[href="'+self.url+'"]') : $('a[href$="#'+self.url+'"]');
			self.pgViewed = false;
			clearInterval(self.fsgalInter);

			// Check the previous and current page
			if(self.prePg === self.curPg){

				try { self.fflod.remove(); } catch (e) { }

				self.loading.css({"left": self.winWidth/2-16, "top": self.winHeight/2-16});

				if(self.headerFad.height() > 0){
					self.loading.css("visibility","hidden");
				}else{
					self.loading.css("visibility","visible");
				}

				for(var s=0; s<self.txtAniTim.length; s++){
					clearInterval(self.txtAniTim[s]);
					self.ff = -1;
				}

				// Initialize to load the opening page as per history
				if(self.curPg === "" ){
					self.pHol.stop();
					self.curPg = self.prePg = self.url;
					/*
					// Redirect on page load
					if(self.pgSub === undefined && self.onePage){
						window.location.href = "#"+self.url;
					}*/
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
					self.pgs.css("visibility","hidden");
					self.pHpg.removeClass("pageShow");
					self.pHpg.addClass("pageHidden");
					self.bdy.append(self.pHpg);
					self.scrollObj.animate({ scrollTop: "0px" }, 0, "easeInOutQuart");
					self.bg_setup();
				}else{
					// Initialize to load current page, background and animate to left side
					self.curPg = self.url;
					if(!self.scrolBarLoad) { return; }

					self.hideButtons();

					if(self.fsTxt.children().length>0){
						self.fsTextOut();
					}

					self.isFsGal = false;
					$(".pageHolder .page").find('.fs_gallery').each(function(){
						self.isFsGal = true;
					});

					$(".pageHolder .page").show();
					if(!isTouch){ $("html").getNiceScroll().resize(); }

					if(self.backPage.width() !== 0){
						if(self.mobile){
							self.backPage.css({"height": "0px"});
							self.removeBackCon();
						}else{
							self.backPage.animate({"height": "0px"}, self.aniSpeed, "easeInOutQuart", function(){
								self.removeBackCon();
							});
						}
					}

					$(".pageHolder .page").find('.portfolioPage').each(function(){
						try {
							$(this).detailPage("closeBackCon");
						} catch (e) {}
					});

					self.scrollObj.stop().animate({"scrollTop": 0}, 500, "easeInOutQuart");

					var pagScrl_Speed = window.pageYOffset !== 0 ? self.aniSpeed : 50;

					var con_Speed = self.pHol.height() > 50 ? self.aniSpeed : 0;

					$(".fmSlider").each(function(){
						if($(this).data("loaded")){
							$(this).fmMainSlider("Pause");
						}
					});

					if(self.prePg !== self.url){

						if(!self.mobile){
							self.fsTxt.stop().fadeOut(200, function(){ self.fsTxt.css({"height":0 });});
						}else{
							self.fsTxt.stop().css({"height":0});
							self.fsTxt.stop().hide();
						}

						$("#bodyContent").find("a.next_btn, a.previous_btn").each(function(){
							if($(this).css("visibility")){
								$(this).stop().fadeOut(1000, function(){ $(this).css({"visibility":"hidden"}); });
							}
						});

						if($(this).prop("tagName") === "BODY"){ return; }

						if(!self.mobile){
							self.pHol.animate({"opacity": 0}, con_Speed, "easeInOutQuart",
								function(){
									self.pageLoadfinished  = false;
									$(".fmSlider").each(function(){
										if($(this).data("loaded")){
											$(this).fmMainSlider("Stop");
										}
									});
									self.removeBackCon();
									self.bg_setup();
							});
						}else{
							self.pHol.stop();
							self.pHol.css({"opacity": 1});
							self.pageLoadfinished  = false;
							$(".fmSlider").each(function(){
								if($(this).data("loaded")){
									$(this).fmMainSlider("Stop");
								}
							});
							self.removeBackCon();
							self.bg_setup();
						}

					}else{

						if(self.openYes){
							// full screen Gallery
							$(".pageHolder .page").find('.fs_gallery').each(function(){
								self.isFsGal = true;
								self.fsView = true;
								self.fsNxt.fadeIn();
								self.fsPre.fadeIn();
								self.n_sli.fadeIn();
								self.fsTxtSho = true;
								self.fsThuHig = ppg.find(".fsThumb").outerHeight(true);
							});
						}
					}
				}
			}

			// Change menu color and position the menu highlight
			$( '.nav li a' ).css({"color":self.menuColor});

			if(self.mobile){
				self.navUl.data('view',false);
				self.navUl.css({"display":"none"});
			}

			self.menuUpdate();
		},


		// Display the current page
		page_display : function(){
			var self = this;
			// Make visible the current page and position to left side
			$(".page").hide();
			var obj = !self.onePage ? $("body .page") : $('body .page[data-id="'+self.curPg+'"]');
			obj.css("visibility","visible");
			obj.show();
			self.pHol.stop();

			// Remove the video from the previous page
			$("body").find('.addVideo').each(function(){
				$(this).find('.vid').remove();
				$(this).find('img').show();
			});

			if(!self.mobile){
				self.fsTxt.stop().fadeOut(200, function(){ self.fsTxt.css({"height":0 });});
			}else{
				self.fsTxt.stop().css({"height":0});
				self.fsTxt.stop().hide();
			}

			$("#bodyContent").find("a.next_btn, a.previous_btn").each(function(){
				if($(this).css("visibility")){
					$(this).stop().fadeOut(1000, function(){ $(this).css({"visibility":"hidden"}); });
				}
			});


			// Remove the slider from the previous page
			$(".fmSlider").each(function(){
				if($(this).data("loaded")){
					$(this).fmMainSlider("Stop");
				}
			});


			$(".pageHolder .page").find('.flexslider').each(function(){
				try {
					$(this).data("slid").pause();
				} catch (e) {}
			});

			$(".pageHolder .page").find("#map_canvas").each(function(){
				$(this).children().remove();
			});

			if(self.curPg !== ""){
				// Remove the previous page from the pageHolder
				$("body").append($(".pageHolder .page"));
				// Add the current page to the pageHolder
				$(".pageHolder").append(obj);

				$(".pageHolder .page").removeClass("pageHidden");
				$(".pageHolder .page").addClass("pageShow");

				self.pageHolderHeight_desktop = "100%";
				self.pageHolderHeight_ipad = "100%";


				// Update the portfolio image size
				if(!self.IE_old){
					$("body").find('.isotope_items').each(function(){
						var gaIt = $('.isotope_items .item');
						if(self.midMobile){
							gaIt.removeClass('large');
							gaIt.removeClass('small');
							gaIt.addClass('medium');
						}else if(self.minMobile){
							gaIt.removeClass('medium');
							gaIt.removeClass('large');
							gaIt.addClass('small');
						}else{
							gaIt.removeClass('medium');
							gaIt.removeClass('small');
							gaIt.addClass('large');
						}
					});
				}

				self.hideButtons();

				self.isFsGal = false;
				$(".pageHolder .page").find('.fs_gallery').each(function(){
					self.isFsGal = true;
					self.fsTxt.stop().show();
					if(!self.mobile){
						$(".vegas-overlay").fadeIn(1000);
					}else{
						$(".vegas-overlay").stop().hide();
					}
				});

				if(self.isFsGal){
					$(".vegas-background").css({"z-index":1});
					$(".vegas-overlay").css({"z-index":4});
				}else{
					$(".vegas-background").css({"z-index":-99999999});
					$(".vegas-overlay").css({"z-index":-100000000});
				}

				if(!self.isFsGal){
					self.fsTxt.animate({"height":0}, self.aniSpeed, "easeInOutQuart");
				}

				self.projFm = false;

				$(".pageHolder .page").find('.projects_container .proj').each(function(){
					self.projFm = true;
				});

				$('.pageHolder .page').find('.flexSlideshow').each(function(){
						var laz = $(this).hasClass('flexslider');
						if(!laz){  $(this).addClass("flexslider"); }
						var ffx = $(this);
						ffx.removeClass('flexSlideshow');
						ffx.append('<div class="slider_loading" ></div>');
						$(this).find(" a.lazyload").each(function(){
							self.lazyLoadInt($(this));
						});

						if(!laz){
							var flexs = $(this);
							flexs.flexslider({
							slideshow: true,
							slideshowSpeed: 5000,
							start: function(slider){
								flexs.data("slid",slider);
								flexs.find(".slider_loading").remove();
								slider.pause();
								}
							});
						}
				});

				var isMansonry = false;
				$(".pageHolder .page").find('.masonry_container').each(function(){
						isMansonry = true;
				});

				if(!isMansonry){
					$('.pageHolder .page').find('.lazyload').each(function(){
						self.lazyLoadInt($(this));
					});
				}

				try {
					$(".pageHolder .page").find('.flexslider').each(function(){
						if($(this).data("slid").currentSlide !== 0 ){
							$(this).data("slid").pause();
							$(this).data("slid").flexAnimate(0);
						}
						$(this).data("slid").resume();
					});
				} catch (e) {  }

				//vegas background resize
				$.vegas('resize_');

				// Update the current page
				self.page_setup();

				var ppg = $('.pageHolder .page');

				// Remove the google map before the page display
				ppg.find('#mapWrapper').each(function(){
					if(!self.IE_old){
						$(this).children(':first-child').remove();
					}
				});

				// Reset the form field if the page contain contact form
				ppg.find('#reply_message').removeClass();
				ppg.find('#reply_message').html('');
				ppg.find('input#name').val('Name');
				ppg.find('input#email').val('Email');
				ppg.find('textarea#comments').val('Comments...');

				// Graph display
				ppg.find('.graph_container li').each(function() {
					$(this).each(function() {
						$(this).children(':first-child').css("width","0px");
					});
				});

				// full screen Gallery
				self.fsCur = -1;
				self.fsView = false;
				self.fsArr = [];
				ppg.find('.fs_gallery').each(function(){
					self.fsTxtSho = true;
					self.fsThuHig = ppg.find(".fsThumb").outerHeight(true);
					$(this).find('.fs_thumbs').each(function(){
						($(this).children()).each(function(){
							self.fsArr.push($(this));
							if($(this).css("opacity") < 0.99 ){
								$(this).css({"opacity":"1"});
							}
							$(this).data("num",self.fsArr.length-1);
							self.fsArr[0].css("opacity", 0.25);
						});
					});
				});
              ppg.find('.animate').each(function(){ $(this).css("width","1px"); });
              ppg.find('.animate2').each(function(){ $(this).css("opacity","0"); });

              self.viewPage = true;

              self.pHig = self.pHol.height();
              self.fmsliderYes = false;
              var conSppd = self.aniSpeed;

				$(".pageHolder .fmSlider").each(function(){
					self.pHig = self.winHeight-(self.tCon.outerHeight()+$(".footer").outerHeight());
					self.fmsliderYes = true;
				});

				if(self.openYes === undefined ){
					if(self.isFsGal){
						$("#bodyContent").css({"height":self.winHeight- (self.tCon.outerHeight()) });
					}
					self.openYes = true;
					if(self.fmsliderYes){
						conSppd = 0;
					}
				}

				$(".pageHolder .page").css({"margin-top" : "0px"});
				$(".pageHolder .fs_gallery_wrap").css({"height":"auto", "bottom":"0px"});

				if(self.fsView){
					$(".backgroundColor").fadeOut();
				}else{
					$(".backgroundColor").fadeIn(1000);
				}

				if(!self.mobile && !self.fmsliderYes){
					self.pHol.animate({"opacity": 1}, self.aniSpeed, "easeInOutQuart",
						function(){
							self.pageLoadfinished  = true;
							afterPageLoad();
							self.pHol.find(".scroll-pane").css("overflow-y","auto");
							self.backPage.find(".scroll-pane").css("overflow-y","auto");
							self.addScrollbar();
							self.pgViewed = true;
							self.arrangePgContent();
							if(self.isFsGal){
								$("#bodyContent").css({"height": "auto" });
								self.fsTxt.css({"margin-top":"0px", "height": self.winHeight- (self.tCon.outerHeight()+$(".footer").outerHeight()) });
							}
						});
				}else{
					self.pageLoadfinished  = true;
					afterPageLoad();
					self.pHol.find(".scroll-pane").css("overflow-y","auto");
					self.backPage.find(".scroll-pane").css("overflow-y","auto");
					self.addScrollbar();
					self.pHol.stop();
					self.pHol.css({"opacity": 1});
					self.pgViewed = true;
					self.arrangePgContent();
					if(self.isFsGal){
						$("#bodyContent").css({"height": "auto" });
						self.fsTxt.css({"margin-top":"0px", "height": self.winHeight- (self.tCon.outerHeight()) });
					}
				}
			}else{
				self.prePg = self.curPg;
			}
		},

		hideButtons : function(){
			var self = this;
			self.pHol.stop();
			self.fsSlideshow("stop");
			clearInterval(self.fsInt);
			clearInterval(self.fsDly);
			self.fsTxtSho = false;
			self.curSlide = undefined;

			self.fsNxt.fadeOut();
			self.fsPre.fadeOut();
			self.n_Btn.fadeOut();
			self.p_Btn.fadeOut();
			self.c_Btn.fadeOut();
			self.n_sli.fadeOut();

		},


		// Reset page
		resetPage : function(){

			var self = this;

			self.hideButtons();

			$(".pageHolder .page").show();
			if(!isTouch){ $("html").getNiceScroll().resize(); }

			if(self.backPage.width() !== 0){
				if(self.mobile){
					self.backPage.css({"height": "0px"});
					self.removeBackCon();
				}else{
					self.backPage.animate({"height": "0px"}, self.aniSpeed, "easeInOutQuart", function(){
						self.removeBackCon();
					});
				}
			}

			if(self.pgBgPath !== "none"){
				$(".vegas-background").stop();
				if(!self.mobile){
					$(".vegas-background").css({"visibility":"visible"});
					$(".vegas-background").fadeIn(500);
				}else{
					$(".vegas-background").css({"visibility":"visible"});
				}
			}

			self.viewPage = true;

			self.pHol.stop();
			self.pHol.css({"visibility":"visible"});

			$(".pageHolder .fmSlider").each(function(){
				if($(this).data("loaded")){
					$(this).fmMainSlider("Resume");
				}
			});

			if(self.mobile){
				self.navUl.data('view',false);
				self.navUl.css({"display":"none"});
			}

			self.menuUpdate();
		},

		// Reset/start page content animation
		arrangePgContent : function(){
			var self = this;
			// Reset the requierd object after page display
			self.prePg = self.curPg;
			// Reload the page if the current page is not equal to history url
			if(self.curPg !== self.url){
				self.page_load(self.url);
			}

			ppg = $('.pageHolder .page');

			// Add the google map if it present on the current page
			$(".pageHolder .page").find("#map_canvas").each(function(){
				try{
					map_initialize();
				} catch (e) {
					$(this).html($(this).data("con"));
				}
				mapResizer();
			});

			ppg.find('#mapWrapper').each(function(){
				if(!self.IE_old){
					$(this).append($(this).data('map'));
				}
			});

			// Update the portfolio if it present
			$("body").find('.isotope_items').each(function(){
				if(!$(this).data('loaded')){
					$(this).isotope({
					itemSelector : '.item',
					animationOptions: {
						complete: function() {  if(!self.onePage){ self.pageResize(); } }
						}
					});
				}

				$(this).isotope({
					_fitRowsReset : function() {
						this.fitRows = { x : 0, y : 0, height : 0 };
						}
                });
				$(this).data('loaded',true);
			});

			clearInterval(self.monIntr);

			$(".pageHolder .page").find('.masonry_container').each(function(){
				self.manso = $(this);

				if( !self.manso.data('loading') ){
					self.loadingBar(true);
				}

				$(this).find(".item").css({"width":self.masonPer});
				$(this).find(" a.lazyload").each(function(){
					var img = !self.mobileDevice ? $(this).attr("href") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  :$(this).attr("href"));
					var cc = $(this).attr('class');
					var $img = $('<img class="'+cc+'"/>');
					$img.removeClass('lazyload');
					$(this).replaceWith($img);

                  if(!isTouch  || ipadDevice){ $img.hide(); }
					$img.attr('src', img).load(function() {
						if(!isTouch  || ipadDevice){ $(this).fadeIn(500); }
						if(!isTouch || ipadDevice){
							self.manso.masonry({
								columnWidth: function( containerWidth ) {
                                  return containerWidth / self.masonNum;
								}
							});
						}else{
							self.page_setup();
						}
						if(!isTouch){ $("html").getNiceScroll().resize(); }


						if(!self.manso.data('loading') ){
							self.manso.data({'loading': true});
							self.loadingBar(false);
							setTimeout(function(){
								$("body").css({"overflow-y":"auto"});
								if(!isTouch){ $("html").getNiceScroll().resize(); }
								self.menuUpdate();
							},2500);
						}

					}).error(function () {
						$(this).fadeIn(1000);
					}).each(function() {
                      if(this.complete) { $(this).trigger('load'); }
					});
				});

				if(isTouch  && !ipadDevice){
					$(this).find(".item").css({"position":"relative"});
					$(this).find(".item").addClass("enablHardwareAcc");
				}

			});


			if(!self.scrolBarLoad){
				if(!isTouch){	$("html").niceScroll({ zindex : 900000, cursorborder : "0px", cursorcolor : self.scrollColor, cursorwidth:"7px", scrollspeed :70, horizrailenabled:false }); }
				self.scrolBarLoad = true;
			}

			if(!isTouch){ $("html").getNiceScroll().resize(); }

			// full screen Gallery

			ppg.find('.fs_gallery').each(function(){
				self.fsView = true;
				self.fsNxt.fadeIn();
				self.fsPre.fadeIn();
				if(self.fsCur < 0 && self.isFsGal ){
					self.fsCur = 0; self.fsImgLoad(self.fsArr[0]);
				}
				self.n_sli.stop().fadeIn();
				self.n_sli.text("01/"+(self.fsArr.length));
			});


			// Video
			$("body").find('.addVideo').each(function(){
				$(this).find('.vid').each(function(){
					$(this).remove();
				});
				$(this).find('img').show();
				$(this).find('.video_hover').show();
				$(this).find('.video_hover').css({"z-index":"5"});
			});


			$(".pageHolder .page").find('.addVideo').each(function(){
				var vid = $(this);
				var kk = false;
				$(this).find('img').each(function(){ kk = true; });
				if(!kk ){
					vid.data("added", true);
					var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
					var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
					var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
					if(H === "100%"){
						vid.css({"height":"100%"});
					}
					vid.prepend('<div class="vid"></div>');
					vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
				}
			});


			// Restar fmslider
			$(".pageHolder .fmSlider").each(function(){
				if($(this).data("loaded")){
					$(this).fmMainSlider("ReStart");
				}else{

					$(this).data("loaded",true);
					$(this).fmMainSlider("startActive");
				}
			});

			if(self.pgSub !== undefined && self.projFm){
				var ppp = $(".pageHolder").find(".fmSlides");
				ppp = ppp.length === 0 ? $(".pageHolder").find(".projects_container")  : ppp;
				self.curFmSlider = ppp.data("sArry");
				var p2 = self.pgSub.split("=");
				self.curSlide = Number(p2[1]);
				self.showDetailPage(self.curFmSlider[Number(p2[1])]);
			}

			// Text animation
			for(var s=0; s<self.txtAniTim.length; s++){
				clearInterval(self.txtAniTim[s]);
				self.ff = -1;
			}

			ppg.find('.animate').each(function(){
				var sel = $(this);
				self.ff = self.ff+1;
				sel.data('i',self.ff);
				self.txtAniTim[self.ff] = setInterval(function(){
					clearInterval(self.txtAniTim[Number(sel.data('i'))]);
					sel.animate({"width":"100%"},1000,"easeOutQuart");
				}, Number($(this).attr("data-time"))*200 );

			});

			ppg.find('.animate2').each(function(){
				var sel2 = $(this);
				self.ff = self.ff+1;
				sel2.data('i',self.ff);
				self.txtAniTim[self.ff] = setInterval(function(){
					clearInterval(self.txtAniTim[Number(sel2.data('i'))]);
					sel2.animate({"opacity":"1"},1000,"easeOutQuart");
				},  Number($(this).attr("data-time"))*200);
			});

			// Graph display
			ppg.find('.graph_container').each(function(){
				self.graph_display($(this));
			});

			BigVid.destroyAdd();

		},

		lazyLoadInt : function(obj){
			var self = this;
			var imSrc = !self.mobileDevice ? obj.attr("href") : (obj.attr("data-src-small")? obj.attr("data-src-small")  :obj.attr("href"));
			var lodr = obj.parent().hasClass('large_image');
			lodr = !lodr ? obj.parent().hasClass('medium_image') : lodr;
			lodr = !lodr ? obj.parent().hasClass('fixedHeight') : lodr;
			var cc = obj.attr('class');
			//var at = obj.attr('alt');
			var st = obj.attr('style');
			if(st){
				var $img = $('<img class="'+cc+' style="'+st+'" />');
			}else{
				$img = $('<img class="'+cc+'" />');
			}

			//var $img = $('<img class="'+cc+'style="'+tt+'" />');
			$img.removeClass('lazyload_single');
			$img.removeClass('lazyload');
			obj.replaceWith($img);
			$img.hide();

			if(lodr){
				$img.parent().append('<div class="slider_loading"></div>');
				$img.parent().children(":last-child").css({"top":$img.parent().height()/2});
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".slider_loading").remove();
					$(this).fadeIn(300);
					if(!isTouch){ $("html").getNiceScroll().resize(); }
				}).error(function () {
					$(this).parent().find(".slider_loading").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});
            }else{
				$img.attr('src', imSrc).load(function() {
					$(this).fadeIn(300);
					var pim = $img.parent().parent().hasClass('projImgs');
					pim = pim ? pim : $img.parent().parent().parent().parent().hasClass('projImgs');
					if(pim){
						self.resizeImg($(this));
					}else{
						var posY = $(this).hasClass("scale_fill");
						posY = !posY ? $(this).hasClass("scale_fit") : posY;
						posY = !posY ? $(this).hasClass("scale_cover") : posY;
						if(posY){
							$(this).css({"left":-($(this).width()-$(this).parent().width())/2});
							$(this).css({"top":-($(this).height()-$(this).parent().height())/2});
						}
					}
					if(!isTouch){ $("html").getNiceScroll().resize(); }
				}).error(function () {
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});
			}

		},


// Initialize the History
		history : function(){
			var self = this;

			(function($){
				var origContent = "";
				function loadContent(hash2) {

					var splt = hash2.split("?");
					var hash = !self.onePage ? self.homePg : splt[0];
					self.pgSub = splt[1];
					if(hash !== "") {
						if(origContent === ""  && self.curPg === "") {
							origContent = !self.onePage ? $('a[href="'+self.homePg+'"]') : $('a[href$="#'+self.homePg+'"]');
						}

						if(self.hisPath !== hash ){
							self.hisPath = hash;
							self.page_load(hash);
						}else{

							if(self.pgSub !== undefined && self.projFm){
								var p2 = self.pgSub.split("=");
								if((Number(p2[1]) !== self.curSlide)){
									self.curFmSlider = $(".pageHolder .projects_container").data("sArry");
									self.curSlide = Number(p2[1]);
									self.showDetailPage(self.curFmSlider[Number(p2[1])]);
								}
							}else{
								self.resetPage();
							}
						}
					} else {

						if(origContent !== "" && self.curPg === "" ) {
							if(self.hisPath !== hash ){
								self.hisPath = hash;
								self.page_load(self.homePg);
							}
						}else{
							if(!self.onePage){
								if(self.pgSub !== undefined && self.projFm){
									p2 = self.pgSub.split("=");
									if((Number(p2[1]) !== self.curSlide)){
										self.curFmSlider = $(".pageHolder .projects_container").data("sArry");
										self.curSlide = Number(p2[1]);
										self.showDetailPage(self.curFmSlider[Number(p2[1])]);
									}
								}else{
									self.resetPage();
								}
							}
						}
					}

					if(hash === "" && self.curPg === ""){
						self.page_load(self.homePg);
					}

					try {
						if(self.audioPlaying && self.pageLoaded && self.audioPlayer.data().jPlayer.status.paused && !self.videoBgAudio){
							self.audioPlayer.jPlayer("play");
						}
					} catch (e) { }
				}

				$(document).ready(function() {
					setTimeout(function(){
						$.history.init(loadContent);
						$('#navigation a').not('.external-link').click(function() {
							var url = $(this).attr('href');
							url = url.replace(/^.*#/, '');
							$.history.load(url);
							return false;
						});
					},500);
				});
			})(jQuery);

		},


// Add scrollbar
		addScrollbar : function (){
			var self = this;
			$('#bodyContent .scroll-pane').each(
				function()
					{
						self.apis.push($(this).jScrollPane({ autoReinitialise: true, verticalDragMinHeight		: 70 }).data().jsp);
					}
				);
			$('#backArea .scroll-pane' ).each(
				function()
					{
						self.apis.push($(this).jScrollPane({ autoReinitialise: true, verticalDragMinHeight		: 70 }).data().jsp);
					}
				);

			},


// Remove scrollbar
		removeScrollbar : function(){
          var self = this;
				if (self.apis.length) {
					$.each(
						self.apis,
						function(i) {
									this.destroy();
							}
						);
					self.apis = [];
				}
		},


// Graph display function
		graph_display : function (e){
			e.find('li').each(function() {
					$(this).each(function() {
							$(this).children(':first-child').css("width","0px");
							$(this).children(':first-child').stop();
							$(this).children(':first-child').animate( { width: $(this).attr('data-level') },  1500, "easeInOutQuart");
						});
					});
		},


// Window Resize function
		windowRez : function (){
			var self = this;
			if(Number(self.bdy.data("width")) !== Number($(window).width()) || Number(self.bdy.data("height")) !== Number($(window).height())){
				self.bdy.data("width", Number($(window).width()));
				self.bdy.data("height", Number($(window).height()));
				self.rez = true;
				self.page_setup();
				self.rez = false;
			}

		}

	};



// Initizlize and create the main plug-in
	$.fn.mainFm = function(params) {
	var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new mainFm($fm, params));
			}
		} else {
			if (instance[params]) {
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}

	};


})( jQuery );