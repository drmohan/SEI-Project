<?php
if(isset($_POST['send'])) {
    header("Location: "."http://localhost:8000/");
    $to = "drmohan@andrew.cmu.edu";
    $from = "cmuform@gmail.com";
    $subject = "Heart Rate Analytics: Feedback on Results"
    $message = "From: Anonymous User" . "\r\n" .
    "Yes: " . $_POST['yes'] . "\r\n" .
    "No: " . $_POST['yes'] . "\r\n" .
    "Consent: " . $_POST['consent'];

    mail($to, $subject, $message, $from);

}
?>
