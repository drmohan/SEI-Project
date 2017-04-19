//$(document)
//    .ready(function() {
////
////      // fix menu when passed
////      $('.masthead')
////        .visibility({
////          once: false,
////          onBottomPassed: function() {
////            $('.fixed.menu').transition('fade in');
////          },
////          onBottomPassedReverse: function() {
////            $('.fixed.menu').transition('fade out');
////          }
////        })
////      ;
////
////      // create sidebar and attach to menu open
////      $('.ui.sidebar')
////        .sidebar('attach events', '.toc.item')
////      ;
////
////    })
////  ;

// when certain buttons are clicked, hide the intro and continue to the demo
function endIntro() {
   $('#intro-container').hide();
   $('#demo-container').show();
};