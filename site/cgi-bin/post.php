<?
  if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    $to       = 'jessica@creativehumancapital.com';
    $subject  = "Ask Jessica: from " . substr($_POST['user_name'], 0, 30);
    
    $body     = "";
    $body    .= "Name: "  . $_POST['user_name']  . "\r\n";
    $body    .= "Email: " . $_POST['user_email'] . "\r\n";
    $body    .= "Phone: " . $_POST['user_phone'] . "\r\n";
    $body    .= "\r\n";
    $body    .= "Question: " . "\r\n" . $_POST['user_question'] . "\r\n";

    $headers  = "";
    $headers .= "Mime-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/plain; CHARSET=iso-8859-1" . "\r\n";
    $headers .= "From: Ask Jessica <ask-jessica@creativehumancapital.com>" . "\r\n";
    $headers .= "Reply-To: " . $_POST['user_email'] . "\r\n";

    if (mail($to, $subject, $body, $headers)) {
      header("Status: 200 OK");
    } else {
      header("Status: 500 Internal Server Error");
    }
  } else {
    header("Status: 404 Not Found");
  }
?>
