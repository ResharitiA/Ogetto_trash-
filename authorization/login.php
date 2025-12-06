<?php
session_start();
include 'db.php';
if ($_POST['login'] && $_POST['password']) {
    $login = trim($_POST['login']);
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE login = ?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        if (password_verify($_POST['password'], $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user'] = $login;
            echo "Вход успешен! ID: " . $row['id'];
        } else {
            echo "Неверный пароль!";
        }
    } else {
        echo "Пользователь не найден!";
    }
    $stmt->close();
}
?>
