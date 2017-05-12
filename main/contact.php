<?php
if(isset($_POST['send'])) {
    // CHANGE IP HERE
    header("Location: "."http://localhost:8000/contact.html"); 
    $to = "cptmidler@sei.cmu.edu";
    $from = "From: " . $_POST['emailAddress'];
    $subject = "Heart Rate Analytics: Contact Form Message";
    $message = "From: " . $_POST['Name'] . "\r\n" .
    "Reply-to: " . $_POST['emailAddress'] . "\r\n" .
    "Interest: " . $_POST['interests'] . "\r\n" .
    "Message: " . $_POST['message'];

    mail($to, $subject, $message, $from);
       
}
?>
