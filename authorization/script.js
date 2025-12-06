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
    
    if (!login || !password) {
        alert('[translate:Заполните все поля!]');
        return;
    }
    
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    
    try {
        const response = await fetch('register.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        alert(result);
        if (result.includes('успешна')) {
            showLogin();
            document.getElementById('regLogin').value = '';
            document.getElementById('regPassword').value = '';
        }
    } catch (error) {
        alert('[translate:Ошибка сервера!]');
    }
}

async function loginUser() {
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;
    
    if (!login || !password) {
        alert('[translate:Заполните все поля!]');
        return;
    }
    
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        alert('[translate:Ошибка сервера!]');
    }
}
