$('.ui.rating')
  .rating({
    initialRating: 3,
    maxRating: 5
  })
;

$('.ui.checkbox')
  .checkbox()
;

(function ($) {
    $('.ui.form').form({  
    on: "blur", 
     inline: 'true',        
    firstName: {
    identifier: 'FirstName',
        rules: [{
        type: 'empty',
        prompt: 'Please enter your given name'
    }]
    }
    });       
     }(jQuery));