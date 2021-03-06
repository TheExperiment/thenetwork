$(function(){
  var WIN = $(window);
  var DOC = $(document);
  var initialized = false;



  // Smooth Touch Scrolljacking
  var  containerTop =     0, // keeps track of amount scrolled without actually scrolling
  moved =                 0, // amount your finger moved during touchmove
  touchStartY =           0,
  isTouchDevice =         false, // set to true on touchstart
  touchInterval;

  // Initialize
  pageResize();
  scrollHandler();
  // Page events
  WIN.on('resize',pageResize);
  WIN.on('scroll',scrollHandler);
  // Touch events
  WIN.on('touchstart',function(e){
    isTouchDevice = true;
    touchInterval = setInterval(redraw, 10);
    moved = 0;
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    touchStartY = touch.pageY;
  })
  WIN.on('touchmove',function(e){
    e.preventDefault();
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    moved = touch.pageY-touchStartY;
    containerTop -= moved;
    touchStartY = touch.pageY;
  })
  WIN.on('touchend',function(e){
    moved*=.95;
    containerTop -= moved;
    if(Math.abs(moved) < .2){
      clearInterval(touchInterval);
    }
  })
  function pageResize (e) {
    WIN_H = WIN.height();
    WIN_W = WIN.width();
    
    initialized = true;
  }
  function scrollHandler(){
    if(isTouchDevice){
      scrollTop = Math.max(0,containerTop);
    }else{
      scrollTop = WIN.scrollTop();
    }
  }

  // Touch Scroll
  function redraw() {
    if(isTouchDevice){
      window.requestAnimationFrame(function() {
        scrollHandler();
      });
    }
  }

})