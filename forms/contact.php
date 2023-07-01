<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and sanitize inputs
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Set your email address where you want to receive emails
    $recipient = "jfhvjfhv0015@gmail.com";

    // Validate input fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        // Set a 400 (Bad Request) response code and exit
        http_response_code(400);
        echo "Please fill out all fields.";
        exit;
    }

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Attempt to send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (OK) response code
        http_response_code(200);
        echo "Your message has been sent. Thank you!";
    } else {
        // Set a 500 (Internal Server Error) response code
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 (Forbidden) response code
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
