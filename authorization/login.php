<?php
include 'db.php';

if (!empty($_POST['login']) && !empty($_POST['password'])) {
    $login = trim($_POST['login']);
    $password = $_POST['password'];

    $result = pg_query_params($conn, "SELECT id, password FROM users WHERE login = $1", array($login));

    if ($row = pg_fetch_assoc($result)) {
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user'] = $login;
            echo "success"; // для JS редиректа
        } else {
            echo "Неверный логин или пароль";
        }
    } else {
        echo "Неверный логин или пароль";
    }
} else {
    echo "Пожалуйста, введите логин и пароль";
}
?>
