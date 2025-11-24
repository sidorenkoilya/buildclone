<?php
// получаем данные формы
$name = $_POST['name'] ?? '';
$contacts = $_POST['contacts'] ?? '';
$message = $_POST['message'] ?? '';

// куда отправлять
$to = "btc.office.group@gmail.com";
$subject = "Нова заявка з сайту БудТехнікаКран";

// текст письма
$body = "
Нова заявка з сайту:

Ім’я: $name
Контакти: $contacts
Повідомлення:
$message
";

$headers = "From: no-reply@site.com\r\n";
$headers .= "Reply-To: $contacts\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if(mail($to, $subject, $body, $headers)){
    echo "OK";
} else {
    echo "ERROR";
}
?>
