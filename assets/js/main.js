/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 0);
			});

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {

					return $(this);

				};

			}
			else {

				$.fn._parallax = function() {

					$(this).each(function() {

						var $this = $(this),
							on, off;

						on = function() {

							$this
								.css('background-position-y', '0');

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

									$this.css('background-position-y',  (pos * 0.05) + 'px');

								});

						};

						off = function() {

							$this
								.css('background-position-y', '');

							$window
								.off('scroll._parallax');

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)();
							else
								(on)();

						});

					});

					return $(this);

				};

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

		// Spotlights.
			var $spotlights = $('.spotlight');

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						// Use main <img>'s src as this spotlight's background.
							$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
										initialize:	function(t) { $this.addClass('inactive'); },
										terminate:	function(t) { $this.removeClass('inactive'); },
										enter:		function(t) { $this.removeClass('inactive'); },

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										//leave:	function(t) { $this.addClass('inactive'); },

									});

							}

					};

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Wrappers.
			var $wrappers = $('.wrapper');

			$wrappers
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						if (skel.canUse('transition')) {

							$this.scrollex({
								top:		250,
								bottom:		0,
								initialize:	function(t) { $this.addClass('inactive'); },
								terminate:	function(t) { $this.removeClass('inactive'); },
								enter:		function(t) { $this.removeClass('inactive'); },

								// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

								//leave:	function(t) { $this.addClass('inactive'); },

							});

						}

					};

					off = function() {

						if (skel.canUse('transition'))
							$this.unscrollex();

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Banner.
			var $banner = $('#banner');

			$banner
				._parallax();


		// Project Navigation
			var closeNav = function() {
				$( this ).toggleClass( 'fa-hand-o-down fa-times' );
				$( '.project-nav' ).toggle();
			};
				
			if ( $( '.project-nav' ).length > 0 ) {
				var headerList = $( '.inner h2' );
				var navList = $( '<ul></ul>' );

				$( headerList ).each( function( index, elem ) {
					var sectionID = 'section' + index;
					$( elem ).attr( 'id', sectionID );
					$( navList ).append( '<li><a href="#' + sectionID + '" class="scrolly">' + $(elem).text() + '</a></li>' );
				});

				$( '.project-nav' ).append( navList );

				skel.on( 'change', function() {

					if ( skel.breakpoint( 'small' ).active) {

						$( '.project-nav-icon' ).click( function(event) {
							$( this ).toggleClass( 'fa-hand-o-down fa-times' );
							$( '.project-nav' ).toggle();
						});

						$(document).on( 'click', function(event) {
							if (!$( event.target ).hasClass( 'project-nav-icon' ) && 
								!$( event.target ).hasClass( 'project-nav' ) &&
								!$( event.target ).closest( '.project-nav' ).length) {
							  $( '.project-nav' ).hide();
							  $( '.project-nav-icon' ).removeClass( 'fa-times' ).addClass( 'fa-hand-o-down' );
							}
						});

					} else {
						$( document ).off( 'click' );
						$( '.project-nav' ).show();
					}

				});


			}


		/* Carousel */
			var $carousels = $('.carousel'),
				$firstSlide, $lastSlide, $activeSlide, $prevSlide, $nextSlide;

			$carousels.each(function() {
				var $this = $(this);

				$firstSlide = $( $this.find( '.carousel-slide' ).first() );
				$lastSlide = $( $this.find( '.carousel-slide' ).last() );

				var updateSlides = function() {
					$activeSlide = $( $this.find( '.carousel-slide-active' ) );
					$nextSlide = $( $activeSlide.next( '.carousel-slide' ) );
					$prevSlide = $( $activeSlide.prev( '.carousel-slide' ) );
				};

				var showNextSlide = function() {
					// remove 'carousel-slide-active' from current slide
					$activeSlide.removeClass( 'carousel-slide-active' );

					// assign 'carousel-slide-active' to next slide
					// if no "next" exists, go to the first
					if ( $nextSlide.length ){
						$nextSlide.addClass( 'carousel-slide-active' );
					} else {
						$firstSlide.addClass( 'carousel-slide-active' );
					}

					stopVideo( $activeSlide );
					updateSlides();
				};

				var showPrevSlide = function() {
					// remove 'carousel-slide-active' from current slide
					$activeSlide.removeClass( 'carousel-slide-active' );

					// assign 'carousel-slide-active' to prev slide
					// if no "prev" exists, go to the last
					if ( $prevSlide.length ){
						$prevSlide.addClass( 'carousel-slide-active' );
					} else {
						$lastSlide.addClass( 'carousel-slide-active' );
					}

					stopVideo( $activeSlide );
					updateSlides();
				};

				updateSlides();
				
				$this.find( '.carousel-prev' ).on( 'click', showPrevSlide );
				$this.find( '.carousel-next' ).on( 'click', showNextSlide );

				$this.keydown(function(e) {
					switch(e.which) {
						case 37: // left
							showPrevSlide()
						break;
				
						case 39: // right
							showNextSlide()
						break;
				
						default: return; // exit this handler for other keys
					}
					e.preventDefault(); // prevent the default action (scroll / move caret)
				});
			});



		/* Lightbox */
		$('body').prepend('<div id="lightbox">' + 
								'<div class="lightbox-controls">' +
									'<button class="lightbox-close" name="close"></button>' +
									'<button class="lightbox-prev"></button>' +
									'<button class="lightbox-next"></button>' +
								'</div>' +
								'<div class="lightbox-content"></div>' +
							'</div>');

		var $lightbox = $('#lightbox'),
		elementSelectors = '#main img',
		$fullscreenElements = $( elementSelectors ),
		$activeElem, activeIndex, prevIndex, nextIndex, savedScroll;

		$lightbox.each(function() {
			var $this = $(this);

			var setContent = function( $newContent ) {
				$this.find('.lightbox-content').append( $newContent );
			};
			
			var clearContents = function() {
				stopVideo( $this );
				$this.find('.lightbox-content').empty();
			};
	
			var updateContents = function( $content ) {
				clearContents();
				activeIndex = $content.attr('data-lb-index');
				prevIndex = activeIndex - 1;
				nextIndex = Number( activeIndex ) + 1;

				$activeElem = $content.clone();
				$activeElem.removeAttr('style class id');

				$activeElem.addClass('lightbox-active-element');

				setContent( $activeElem );

				savedScroll = $('html').scrollTop();
				$('html').scrollTop(0);
			};

			var showLightbox = function( $content ) {
				updateContents( $content );
				$this.show();
			};

			var closeLightbox = function() {
				clearContents();
				$('html').scrollTop( savedScroll );
				$this.hide();
			};
	
			var showNext = function() {
				var $nextElem = $('[data-lb-index=' + nextIndex + ']');

				if ( $nextElem.length ) {
					updateContents( $nextElem );
				} else {
					updateContents( $( elementSelectors ).first() );
				}
			};
	
			var showPrev = function() {
				var $prevElem = $('[data-lb-index=' + prevIndex + ']');

				if ( $prevElem.length ) {
					updateContents( $prevElem );
				} else {
					updateContents( $( elementSelectors ).last() );
				}
			};
			
			$this.find( '.lightbox-close' ).on( 'click', closeLightbox );
			$this.find( '.lightbox-prev' ).on( 'click', showPrev );
			$this.find( '.lightbox-next' ).on( 'click', showNext );
	
			$this.keydown(function(e) {
				switch(e.which) {
					case 37: // left
						showPrev()
					break;
			
					case 39: // right
						showNext()
					break;

					case 27: // escape
						closeLightbox()
					break;
			
					default: return; // exit this handler for other keys
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});

			$fullscreenElements.each(function(i){
				$(this).addClass('thumbnail');
				$(this).attr('data-lb-index', i);
				$(this).on('click', function(){
					showLightbox( $(this) );
				});
			});
		});


		/* Video Controls */
			var stopVideo = function ( $element ) {
				var $iframe = $( $element.find( 'iframe' ) );
				if ( $iframe.length ) {
					var iframeSrc = $iframe.attr('src');
					$iframe.attr('src', iframeSrc);
				}
			};

	});

})(jQuery);