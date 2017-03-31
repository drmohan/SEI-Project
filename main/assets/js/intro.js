$(document).ready(function() {

    // PAGE 1

    // Hide Intro Text, arrow, and buttons at beginning
    $('.intro-word')
        .transition('hide');

    $('.intro2-word-part1')
        .transition('hide');

    $('.intro2-word-part2')
        .transition('hide');

    $('.intro3-word')
        .transition('hide');

    $('.heartbeat-text')
        .transition('hide');

    $('.arrow-right')
        .transition('hide');

    $('.arrow-right-two')
        .transition('hide');

    $('.arrow-left')
        .transition('hide');

    $('.continue-first-button')
        .transition('hide');

    $('.go-to-demo-button')
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


    // TRANSITION PAGES - page 1 to page 2
    
    // PAGE 2

    // show text until 'your heartbeat' faster
    // Fade in description intro text page 2
    $('.intro-word2').data('hideInterval', setTimeout(function(){
        $('.intro-word2')
            .transition({
                animation: 'slide in right',
                duration: '3s',
                interval: 200
            });
    }, 2000));

    // show 'your heartbeat' on rhythm with visual graphic

    // show heartbeat graphic

    // show text 'by looking at you' faster

    // show arrow

});

// if demo button is clicked
function seeDemoButtonClicked() {
    // move all elements to the left
    $('.page-one')
        .transition('fly right');
    $('.see-demo-button')
        .transition('fly right')
    $('.fade-in-welcome')
        .transition('fly right')
    $('.arrow-right')
        .transition('fly right')

    pageTwoText();
};

function pageTwoText() {
    // show text until 'your heartbeat' faster
    // Fade in description intro text page 2
    $('.intro2-word-part1').data('hideInterval', setTimeout(function(){
        $('.intro2-word-part1')
            .transition({
                animation: 'slide in right',
                duration: '3s',
                interval: 200
            });
    }, 1000));

    moveRight();

    $('.intro2-word-part2').data('hideInterval', setTimeout(function(){
        $('.intro2-word-part2')
            .transition({
                animation: 'slide in right',
                duration: '3s',
                interval: 200
            });
    }, 4000));

    // slide arrow in
    $('.arrow-left').data('hideInterval', setTimeout(function(){
        $('.arrow-left')
            .transition('drop');
    }, 5200));

    // show 'see demo' and 'skip intro'

    $('.continue-first-button').data('hideInterval', setTimeout(function(){
        $('.continue-first-button')
            .transition('swing down');
    }, 5400));
};

function moveRight(){
    var heartbeatLine = document.getElementById("heartbeat-line");
    if (heartbeatLine.left < window.innerWidth) {
       heartbeatLine.left = parseInt(heartbeatLine.style.left) + 10 + 'px';
       animate = setTimeout(moveRight,20); // call moveRight in 20msec
    }
};

function continueFirstButton() {
    // move all elements to the left
    $('.arrow-left')
        .transition('fly left');
    $('.page-two')
        .transition('fly left');
    $('.continue-first-button')
        .transition('fly left');    

    pageThreeText();
};

function pageThreeText() {
    // Fade in description intro text page 2
    $('.intro3-word').data('hideInterval', setTimeout(function(){
        $('.intro3-word')
            .transition({
                animation: 'slide in right',
                duration: '3s',
                interval: 200
            });
        $('.intro3-face')
            .transition('tada');
    }, 500));

    // jiggle face
    $('.intro3-face').data('hideInterval', setTimeout(function(){
        $('.intro3-face')
            .transition('tada');
    }, 4500));

    // slide arrow in
    $('.arrow-right-two').data('hideInterval', setTimeout(function(){
        $('.arrow-right-two')
            .transition('drop');
    }, 4800));

    // show 'see demo' and 'skip intro'

    $('.go-to-demo-button').data('hideInterval', setTimeout(function(){
        $('.go-to-demo-button')
            .transition('swing down');
    }, 5000));

}




