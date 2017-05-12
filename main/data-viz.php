<?php
  $to = "cptmidler@sei.cmu.edu";
  $from = "cptmidler@sei.cmu.edu";
  $subject = "Heart Rate Analytics: Results Accuracy Feedback";
  $message = "From: Anonymous User" . "\r\n" .
    "Accurate Results? " . $_POST['results'] . "\r\n" .
    "Data: " . "\r\n" . $_POST['data'];

  (mail($to, $subject, $message, "From:" . $from))
  
?>