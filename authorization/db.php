<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$host = 'db';
$port = '5432';
$dbname = 'auth_db';
$user = 'postgres';
$pass = 'Resh1900$$#KKoPP';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

if ($conn === false) {
    die("Ошибка подключения к базе данных.");
}
?>
