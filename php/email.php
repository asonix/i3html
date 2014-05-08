<?php 
    $myemail = 'asonix.dev@gmail.com';

    $name = $_POST['name']; 
    $email_address = $_POST['email']; 
    $message = $_POST['message']; 

    $email_subject = "[i3html] Contact form submission: $name";
    $email_body = "You have received a new message. ".
    " Here are the details:\n Name: $name \n Email: $email_address \n Message: \n $message"; 

    $headers = "From: $myemail\n"; 
    $headers .= "Reply-To: $email_address";

    mail($myemail,$email_subject,$email_body,$headers);
?>
