$(window).on('load', function() {
    "use strict";

    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');
    // Because only Chrome supports offset-path, feGaussianBlur for now
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if(!isChrome) {
        document.getElementsByClassName('infinityChrome')[0].style.display = "none";
        document.getElementsByClassName('infinity')[0].style.display = "block";
    }

    /*=========================================================================
     Wow Initialize
     =========================================================================*/
    // Here will be the WoW Js implementation.
    setTimeout(function(){new WOW().init();}, 0);

    var dynamicDelay = [
      200,
      400,
      600,
      800,
      1000,
      1200,
      1400,
      1600,
      1800,
      2000
    ];
    var fallbackValue = "200ms";
  
    $(".blog-item.wow").each(function(index) {
      $(this).attr("data-wow-delay", typeof dynamicDelay[index] === 'undefined' ? fallbackValue : dynamicDelay[index] + "ms");
    });

    /*=========================================================================
     Isotope
     =========================================================================*/
    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
      $('.portfolio-wrapper').isotope({
          // options
          itemSelector: '[class*="col-"]',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '[class*="col-"]'
          }
      });
    });

    var bolbyPopup = function(){
      /*=========================================================================
              Magnific Popup
      =========================================================================*/
      $('.work-image').magnificPopup({
        type: 'image',
        closeBtnInside: false,
        mainClass: 'my-mfp-zoom-in',
      });

      $('.work-content').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
      });

      $('.work-video').magnificPopup({
        type: 'iframe',
        closeBtnInside: false,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                      '<div class="mfp-close"></div>'+
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div>', 

            patterns: {
              youtube: {
                index: 'youtube.com/',

                id: 'v=',

                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
              },
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1'
              },
              gmaps: {
                index: '//maps.google.',
                src: '%id%&output=embed'
              }

            },

            srcAction: 'iframe_src',
          }
      });

      $('.gallery-link').on('click', function () {
          $(this).next().magnificPopup('open');
      });

      $('.gallery').each(function () {
          $(this).magnificPopup({
              delegate: 'a',
              type: 'image',
              closeBtnInside: false,
              gallery: {
                  enabled: true,
                  navigateByImgClick: true
              },
              fixedContentPos: false,
              mainClass: 'my-mfp-zoom-in',
          });
      });
    }

    bolbyPopup();

    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '.portfolio-pagination',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "No more works",
            msgText: '',
            speed: 'slow',
            selector: '.load-more',
        }
    },
    // trigger Masonry as a callback
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){  
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems );
      });

      bolbyPopup();

      // Check last page
      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more' ).remove();
      }

    });

    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
      $container.infinitescroll( 'retrieve' );
      // display loading icon
      $( '.load-more .btn i' ).css('display', 'inline-block');
      $( '.load-more .btn i' ).addClass('fa-spin');

      $(document).ajaxStop(function () {
        setTimeout(function(){
               // hide loading icon
          $( '.load-more .btn i' ).hide();
        }, 1000);
      });
      return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
});

$(document).on('ready', function() {
    "use strict";

    /*=========================================================================
                Slick Slider
    =========================================================================*/
    $('.testimonials-wrapper').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000
    });

});

$(function(){
    "use strict";

    /*=========================================================================
            Mobile Menu Toggle
    =========================================================================*/
    $('.menu-icon button').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').toggleClass('open');
    });

    $('main.content').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').removeClass('open');
    });

    $('.vertical-menu li a').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').removeClass('open');
    });

    $('.menu-icon button').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').toggleClass('open');
    });

    $('main.content-2').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').removeClass('open');
    });

    $('.vertical-menu li a').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').removeClass('open');
    });

    /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
    $('a[href^="#"]:not([href="#"]').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });

    /*=========================================================================
     Parallax layers
     =========================================================================*/
     if ($('.parallax').length > 0) { 
      var scene = $('.parallax').get(0);
      var parallax = new Parallax(scene, { 
        relativeInput: true,
      });
    }

     /*=========================================================================
     Text Rotating
     =========================================================================*/
    $(".text-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "bounceIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 4000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

    /*=========================================================================
     Add (nav-link) class to main menu.
     =========================================================================*/
    $('.vertical-menu li a').addClass('nav-link');

    /*=========================================================================
     Bootstrap Scrollspy
     =========================================================================*/
    // $("body").scrollspy({ target: ".scrollspy"});

    /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
    if ($('.skill-item').length > 0) { 
      var waypoint = new Waypoint({
        element: document.getElementsByClassName('skill-item'),
        handler: function(direction) {
          
          $('.progress-bar').each(function() {
            var bar_value = $(this).attr('aria-valuenow') + '%';                
            $(this).animate({ width: bar_value }, { easing: 'linear' });
          });

          this.destroy()
        },
        offset: '50%'
      });
    }

    /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    /*=========================================================================
     Background Color with Data Attribute
     =========================================================================*/
     var list = document.getElementsByClassName('data-background');

     for (var i = 0; i < list.length; i++) {
       var color = list[i].getAttribute('data-color');
       list[i].style.backgroundColor = "" + color + "";
     }

    /*=========================================================================
            Main Menu
    =========================================================================*/
    $( ".submenu" ).before( '<i class="ion-md-add switch"></i>' );

    $(".vertical-menu li i.switch").on( 'click', function() {
        var $submenu = $(this).next(".submenu");
        $submenu.slideToggle(300);
        $submenu.parent().toggleClass("openmenu");
    });

    /*=========================================================================
            Scroll to Top
    =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 350) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').on('click', function(event) {     // When arrow is clicked
      event.preventDefault();
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 20);
    });

});

$(function(){
    "use strict";

    /*=========================================================================
            Header : couleur principale au défilement
    =========================================================================*/
    var $siteHeader = $('.site-header');

    var updateHeader = function() {
        $siteHeader.toggleClass('is-scrolled', $(window).scrollTop() > 20);
    };

    updateHeader();
    $(window).on('scroll', updateHeader);

    /*=========================================================================
            Thème Black / White (mémorisé dans le navigateur)
    =========================================================================*/
    var applyTheme = function(theme) {
        var dark = theme === 'dark';

        $('body').toggleClass('dark', dark);
        $('.theme-switch button').each(function() {
            $(this).attr('aria-pressed', $(this).data('theme-choice') === theme);
        });
        $('[data-theme-toggle] .drawer-meta-line').text(dark ? 'Mode clair' : 'Mode sombre');
    };

    var setTheme = function(theme) {
        applyTheme(theme);
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {}
    };

    var savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) {}
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    $('.theme-switch button').on('click', function() {
        setTheme($(this).data('theme-choice'));
    });

    $('[data-theme-toggle]').on('click', function() {
        setTheme($('body').hasClass('dark') ? 'light' : 'dark');
    });

    /*=========================================================================
            Menu latéral (repris du tiroir de navigation InSquare)
    =========================================================================*/
    var drawer = document.getElementById('drawer');

    if (drawer && window.gsap) {

        // Même seuil que style.css : au-dessus de 500 px de large, le panneau
        // est la colonne de la maquette ; à 500 px et en deçà, la feuille
        // compacte qui descend du haut.
        var DESKTOP_QUERY = '(min-width: 501px)';
        var COMPACT_QUERY = '(max-width: 500px)';

        // Chorégraphie d'InSquare : le panneau coulisse (0,7 s), les libellés le
        // suivent en décalé, la rangée secondaire puis la carte montent du bas.
        var PANEL_DURATION = 0.7;
        var NAV_STAGGER = 0.08;

        var q = gsap.utils.selector(drawer);
        var $menuToggle = $('.menu-toggle');
        var $page = $('.site-header, main');
        var timeline = null;
        var drawerOpen = false;

        // L'ouverture est jouée par une timeline mise en pause, relue à
        // l'envers à la fermeture. Tout est commun aux deux gabarits sauf l'axe
        // du panneau, que chaque gabarit fournit en `slidePanel`. Les libellés
        // principaux glissent depuis la gauche derrière leur masque
        // (.drawer-nav-mask, overflow hidden).
        var build = function(slidePanel) {
            var tl = gsap
                .timeline({ paused: true, defaults: { ease: 'power3.inOut' } })
                .set(drawer, { visibility: 'visible', pointerEvents: 'auto' })
                .fromTo(q('.drawer-scrim'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0);

            slidePanel(tl);

            tl.fromTo(
                q('.drawer-nav-reveal'),
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: NAV_STAGGER, ease: 'power3.out' },
                '-=0.4'
            )
                // Les deux colonnes secondaires montent ensemble. Le tween porte
                // sur elles et non sur leur conteneur : un transform sur
                // .drawer-metas en ferait le bloc de référence de leurs
                // positions absolues.
                .fromTo(
                    q('.drawer-meta'),
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.4'
                )
                .fromTo(
                    q('.drawer-card'),
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                    '-=0.5'
                );

            timeline = tl;
            // Changement de gabarit tiroir ouvert : la nouvelle timeline
            // démarre à la fin.
            if (drawerOpen) tl.progress(1);

            return function() {
                tl.kill();
                timeline = null;
            };
        };

        // Une timeline par gabarit ; gsap.matchMedia() bascule toute seule au
        // redimensionnement.
        var mm = gsap.matchMedia();

        mm.add(DESKTOP_QUERY, function() {
            return build(function(tl) {
                tl.fromTo(q('.drawer-panel'), { xPercent: -100 }, { xPercent: 0, duration: PANEL_DURATION }, 0);
            });
        });

        mm.add(COMPACT_QUERY, function() {
            return build(function(tl) {
                tl.fromTo(q('.drawer-panel'), { yPercent: -100 }, { yPercent: 0, duration: PANEL_DURATION }, 0);
            });
        });

        var onKeyDown = function(event) {
            if (event.key === 'Escape') setDrawer(false);
        };

        var setDrawer = function(open) {
            if (open === drawerOpen) return;
            drawerOpen = open;

            var root = document.documentElement;
            var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            $menuToggle.attr('aria-expanded', open);

            if (open) {
                // Page figée derrière le panneau, sans décalage quand la barre
                // de défilement disparaît.
                root.style.setProperty('--scrollbar-width', (window.innerWidth - root.clientWidth) + 'px');
                root.classList.add('drawer-open');
                drawer.removeAttribute('inert');
                $page.attr('inert', '');
                document.addEventListener('keydown', onKeyDown);

                if (timeline) timeline.timeScale(reduced ? 20 : 1).play();

                // Le panneau n'est focalisable qu'une fois rendu visible par la
                // timeline.
                gsap.delayedCall(0.1, function() {
                    if (drawerOpen) q('.drawer-close')[0].focus({ preventScroll: true });
                });
            } else {
                var hadFocus = drawer.contains(document.activeElement);

                root.classList.remove('drawer-open');
                root.style.removeProperty('--scrollbar-width');
                drawer.setAttribute('inert', '');
                $page.removeAttr('inert');
                document.removeEventListener('keydown', onKeyDown);

                // La fermeture rejoue la même timeline, en plus vif.
                if (timeline) timeline.timeScale(reduced ? 20 : 1.7).reverse();

                if (hadFocus) $menuToggle[0].focus({ preventScroll: true });
            }
        };

        $menuToggle.on('click', function() {
            setDrawer(!drawerOpen);
        });

        $(drawer).on('click', '[data-drawer-close]', function() {
            setDrawer(false);
        });
    }

});