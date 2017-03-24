$(document).ready(function() {

//     // fade 'Welcome'
//     $('.green.leaf').transition({
//         animation  : 'scale',
//         duration   : '2s',
//         onComplete : function() {
//             alert('done');
//     }
//   })
// ;
//     $('.fade-in-welcome').transition('fade')
    $('.fade-in-welcome').transition({
        animation: 'fade in',
        duration: '2s'
    });

    $('.word').transition({
        animation: 'slide in right',
        duration: '4s',
        interval: 200
    });



    // fade in right introduction text 1 ('Team Intro')
      var self = this;
      $('.fade-in-welcome').hover( function() {
      $('.fade-in-welcome').transition('bounce');
      })
});