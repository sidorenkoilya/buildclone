<?php
// =========================
// BudTechCrane — send.php
// =========================

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$contacts = isset($_POST['contacts']) ? trim($_POST['contacts']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// базова валідація
if ($name === '' || $contacts === '') {
  http_response_code(400);
  echo "ERROR";
  exit;
}

$to = "btc.office.group@gmail.com";
$subject = "Нова заявка з сайту БудТехнікаКран";

$body = "Нова заявка з сайту:\n\n";
$body .= "Ім’я: {$name}\n";
$body .= "Контакти: {$contacts}\n";
$body .= "Повідомлення:\n{$message}\n";

$headers  = "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: no-reply@site.local\r\n";

// відправка
echo mail($to, $subject, $body, $headers) ? "OK" : "ERROR";
?>
