<?php
include 'db.php';

if (!empty($_POST['login']) && !empty($_POST['password'])) {
    $login = trim($_POST['login']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Проверка существования логина
    $check = pg_query_params($conn, "SELECT id FROM users WHERE login = $1", array($login));
    if (pg_num_rows($check) > 0) {
        echo "Логин уже занят!";
        exit;
    }

    // Вставка нового пользователя
    $result = pg_query_params($conn, "INSERT INTO users (login, password) VALUES ($1, $2)", array($login, $password));

    if ($result) {
        echo "Регистрация успешна!";
    } else {
        echo "Ошибка регистрации!";
    }
} else {
    echo "Пожалуйста, введите логин и пароль";
}
?>
