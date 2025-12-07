<?php
session_start();

// Если пользователь не авторизован, редирект на страницу входа
if (!isset($_SESSION['user'])) {
    header("Location: index.html");
    exit();
}

// Если авторизован — редирект на страницу профиля
header("Location: lk_rooom/index.html");
exit();
?>
