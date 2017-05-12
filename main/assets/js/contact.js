
$('.ui.dropdown')
  .dropdown()
;

//form validations for contact page
$('.ui.form')
  .form({
    on: 'blur',
    fields: {
      FirstName: {
        identifier  : 'Name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name.'
          }
        ]
      },
      email: {
        identifier  : 'emailAddress',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email.'
          },
          {
            type   : 'email',
            prompt : 'Please enter a valid e-mail.'
          }
        ]
      },
      dropdown: {
        identifier  : 'interests',
        rules: [
          {
            type   : 'minCount[1]',
            prompt : 'Please select at least one interest.'
          }
        ]
      }
    }
  });

