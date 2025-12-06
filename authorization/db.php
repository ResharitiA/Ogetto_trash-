<?php
// Стартуем сессию, если она ещё не была запущена
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Данные для подключения к слонуSQL
$host = 'localhost';
$port = '5432';
$dbname = 'auth_db';
$user = 'postgres';
$pass = 'Resh1900$$#KKoPP';

// Создание подключения к слонуSQL
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

if (!$conn) {
    die("Ошибка подключения к базе данных: " . pg_last_error());
}
?>
