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
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Добро пожаловать, <?=htmlspecialchars($_SESSION['user'])?>!</h1>
        <p>Вы успешно авторизованы.</p>
        <a href="logout.php" class="logout-btn">Выйти</a>
    </div>
</body>
</html>
