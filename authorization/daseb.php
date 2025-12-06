<?php
$host = 'localhost';
$user = 'root';        
$pass = '';            // пустой для локального сервера
$dbname = 'auth_db';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>
