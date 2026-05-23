<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate form fields
    if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["message"])) {
        echo json_encode(["status" => "error", "message" => "Please fill in all required fields."]);
        exit();
    }

    // Validate email
    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit();
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($_POST["name"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($_POST["phone"]));
    $message = htmlspecialchars(strip_tags($_POST["message"]));

    // Customize email content and recipient
    $to = "mixawi7524@giratex.com"; // Change this to your email address
    $subject = "Contact Form Submission";
    $emailMessage = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";

    // Send the email
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $emailMessage, $headers)) {
        echo json_encode(["status" => "success", "message" => "Your message has been sent successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send your message. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request. Please submit the form."]);
}
?>
