$(document).ready(function() {

    // PAGE 1

    // Hide Intro Text, arrow, and buttons at beginning
    $('.intro-word')
        .transition('hide');

    $('.arrow-right')
        .transition('hide');

    $('.see-demo-button')
        .transition('hide');

    $('.skip-intro-button')
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
    }, 2000));


    // slide arrow in
    $('.arrow-right').data('hideInterval', setTimeout(function(){
        $('.arrow-right')
            .transition('drop');
    }, 4000));

    // show 'see demo' and 'skip intro'

    $('.skip-intro-button').data('hideInterval', setTimeout(function(){
        $('.skip-intro-button')
            .transition('swing down');
    }, 4300));

    $('.see-demo-button').data('hideInterval', setTimeout(function(){
        $('.see-demo-button')
            .transition('swing down');
    }, 4300));


    // bounce 'see demo' once

    $('.see-demo-button').data('hideInterval', setTimeout(function(){
        $('.see-demo-button')
            .transition('bounce')
            .transition('bounce');
    }, 4600));

    // if skip intro button is clicked 

    $('skip-intro-button').onclick = "location.href='demo.html';";

    // if demo button is clicked
    $('.see-demo-button').onclick = function(){myScript};


    // TRANSITION PAGES - page 1 to page 2

    // move text and arrow up and to left


    
    // PAGE 2

    // show text until 'your heartbeat' faster

    // show 'your heartbeat' on rhythm with visual graphic

    // show heartbeat graphic

    // show text 'by looking at you' faster

    // show arrow

});