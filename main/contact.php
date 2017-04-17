<?php
if(isset($_POST['send'])) {
    header("Location: "."http://localhost:8000/");  
    $subject = $_POST['Interest'];
    $message = $_POST['firstName'] . " " . $_POST['lastName'] . " " . $_POST['emailAddress'];
    mail("asawarikanitkar@gmail.com", $subject, $message, "From: cmuform@gmail.com");
       
}
?>
