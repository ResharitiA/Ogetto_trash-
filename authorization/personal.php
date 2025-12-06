<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Личный кабинет</title>
</head>
<body>
<h1>Добро пожаловать, <?= htmlspecialchars($_SESSION['user']); ?></h1>
<p>Это ваша личная страница.</p>
<a href="logout.php">Выйти</a>
</body>
</html>
