$(document).ready(function() {

    // PAGE 1

    // Hide Intro Text at beginning
    $('.intro-word')
        .transition('hide');

    // Hide arrow at beginning
    $('.arrow-right')
        .transition('hide');
    
    // Fade in welcome text
    $('.fade-in-welcome').transition({
        animation: 'fade in',
        duration: '3s'
    });

    // Fade in team intro text
    $('.intro-word').data('hideInterval', setTimeout(function(){
        $('.intro-word')
    .transition({
        animation: 'slide in right',
        duration: '3s',
        interval: 200
    });
    }, 2000))


    // slide arrow in



    // show 'see demo' and 'skip intro'

    // bounce 'see demo' once

    // TRANSITION PAGES - page 1 to page 2

    // move text and arrow up and to left


    
    // PAGE 2

    // show text until 'your heartbeat' faster

    // show 'your heartbeat' on rhythm with visual graphic

    // show heartbeat graphic

    // show text 'by looking at you' faster

    // show arrow

    // fade in right introduction text 1 ('Team Intro')
      var self = this;
      $('.fade-in-welcome').hover( function() {
      $('.fade-in-welcome').transition('bounce');
      })
});