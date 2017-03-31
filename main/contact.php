<?php
if($_POST["message"]) {
    mail("asawarikanitkar@gmail.com", "Form to email message", $_POST["message"], "From: asawarikanitkar@gmail.com");
}
?>

<p> Email successfully sent! </p>