<?php
session_start();
include 'db.php';
if ($_POST['login'] && $_POST['password']) {
    $login = $_POST['login'];
    $stmt = $conn->prepare("SELECT password FROM users WHERE login = ?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        if (password_verify($_POST['password'], $row['password'])) {
            $_SESSION['user'] = $login;
            echo "Вход успешен";
        } else echo "Неверный пароль";
    } else echo "Пользователь не найден";
}
?>
