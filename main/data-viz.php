<?php
  $to = "kaw1@andrew.cmu.edu";
  $from = "kaw1@andrew.cmu.edu";
  $subject = "Heart Rate Analytics: Results Accuracy Feedback";
  $message = "From: Anonymous User" . "\r\n" .
    "Accurate Results? " . $_POST['results'] . "\r\n" .
    "Data: " . "\r\n" . $_POST['data'];

  (mail($to, $subject, $message, "From:" . $from))
  
?>