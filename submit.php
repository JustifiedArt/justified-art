<?php
var_dump($_FILES);
if(isset($_POST["submit"])) {
	if(isset($_POST["from"])) {
	    $from = $_POST["from"]; // sender
	    $subject = $_POST["subject"];
	    $message = $_POST["message"];
	    // message lines should not exceed 70 characters (PHP rule), so wrap it
	    $message = wordwrap($message, 70);
	    // send mail
	    mail("njlyell@gmail.com",$subject,$message,"From: $from\n");
	    echo "Congratulations and thank you for your submission!  If you encountered any problems, please let us know so we can improve the experience.";
	}
}
?>