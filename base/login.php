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
            echo "success";  // для JS редиректа
        } else {
            echo "Неверный логин или пароль";
        }
    } else {
        echo "Неверный логин или пароль";
    }
    $stmt->close();
}
$conn->close();
?>
