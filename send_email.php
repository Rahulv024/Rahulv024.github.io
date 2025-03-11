<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "rahulvaradaraju@gmail.com"; // Replace with your email
    $subject = "New Booking Inquiry!";
    $fullName = $_POST["Full_Name"];
    $contactNumber = $_POST["Contact_Number"];
    $emailAddress = $_POST["Email_Address"];
    $eventDescription = $_POST["Event_Description"];

    $message = "Full Name: $fullName\n";
    $message .= "Contact Number: $contactNumber\n";
    $message .= "Email Address: $emailAddress\n";
    $message .= "Event Description: $eventDescription\n";

    $headers = "From: $emailAddress\r\nReply-To: $emailAddress";

    if(mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
