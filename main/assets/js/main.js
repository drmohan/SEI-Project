

// When window resizes, make sure video container fits into user viewport
window.onresize = function(event){
  resizeVideoDiv();  
};

window.onload = function(event){
   resizeVideoDiv();  
};


// when certain buttons are clicked, hide the intro and continue to the demo
function endIntro() {
   $('#intro-container').hide();
   $('#demo-container').show();
};

function resizeVideoDiv() {
    // change size of video, canvas, and div
    newHeight = $(window).height() - 100;
    $('#video-container').css({'height':newHeight + 'px'});
    $('#canvas').css({'height':newHeight + 'px'});
    $('#live').css({'height':newHeight + 'px'});
    $('#checklist').css({'height':newHeight + 'px'});
    // shift to center
    var canv = document.getElementById('canvas');
    canvasWidth = (canv.width/2)*(-1);
    var vid = document.getElementById('live');
    vidWidth = (vid.width/2)*(-1);
    var list = document.getElementById('checklist');
    listWidth = (list.width/2)*(-1);
    
    $('#canvas').css({'margin-left':canvasWidth + 'px'});
    $('#live').css({'margin-left':vidWidth + 'px'});
    $('#checklist').css({'margin-left':listWidth + 'px'});
    
    
    // change position of button
    newButtonHeight = newHeight - 20;
    $('#go').css({'top':newButtonHeight + 'px'});
}