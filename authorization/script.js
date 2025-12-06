function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.parentElement.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

async function registerUser() {
    const login = document.getElementById('regLogin').value.trim();
    const password = document.getElementById('regPassword').value;
    const password2 = document.getElementById('regPassword2').value;
    
    if (!login || !password || !password2) {
        alert('Заполните все поля!');
        return;
    }
    
    if (password !== password2) {
        alert('Пароли не совпадают!');
        document.getElementById('regPassword2').value = '';
        return;
    }
    
    if (password.length < 3) {
        alert('Пароль слишком короткий!');
        return;
    }
    
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    
    try {
        const response = await fetch('register.php', {method: 'POST', body: formData});
        const result = await response.text();
        alert(result);
        if (result.includes('успешна')) {
            showLogin();
            document.getElementById('regLogin').value = '';
            document.getElementById('regPassword').value = '';
            document.getElementById('regPassword2').value = '';
        }
    } catch (error) {
        alert('Ошибка сервера!');
    }
}

async function loginUser() {
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;
    
    if (!login || !password) {
        alert('Заполните все поля!');
        return;
    }
    
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    
    try {
        const response = await fetch('login.php', {method: 'POST', body: formData});
        const result = await response.text();
        
        if (result === 'success') {
            window.location.href = 'personal.php';  // ✅ РЕДИРЕКТ В КАБИНЕТ
        } else {
            alert(result);  // ✅ ТОЛЬКО ТЕКСТ ОШИБКИ
        }
    } catch (error) {
        alert('Ошибка сервера!');
    }
}
