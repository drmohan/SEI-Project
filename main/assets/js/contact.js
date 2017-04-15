

$('.ui.dropdown')
  .dropdown()
;

$('.ui.form')
  .form({
    on: 'blur',
    fields: {
      FirstName: {
        identifier  : 'firstName',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name'
          }
        ]
      },
      email: {
        identifier  : 'emailAddress',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your eamil'
          }
        ]
      },
      dropdown: {
        identifier  : 'dropdown',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select one'
          }
        ]
      }
    }
  });
//       
//     }
//   })
// ;