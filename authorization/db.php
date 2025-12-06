<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'auth_db';
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) die("Ошибка: " . $conn->connect_error);
?>
