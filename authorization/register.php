<?php
include 'db.php';
if ($_POST['login'] && $_POST['password']) {
    $login = trim($_POST['login']);
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (login, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $login, $pass);
    if ($stmt->execute()) {
        echo "Регистрация успешна!";
    } else {
        echo "Логин уже занят!";
    }
    $stmt->close();
}
?>
