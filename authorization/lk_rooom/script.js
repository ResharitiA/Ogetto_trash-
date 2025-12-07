function changeAvatar() {
    const newSrc = prompt("Введите URL новой аватарки:");
    if (newSrc) {
        document.getElementById('avatar').src = newSrc;
    }
}

function editProfile() {
    const newName = prompt("Введите новое имя:", document.getElementById('name').textContent);
    const newEmail = prompt("Введите новый email:", document.getElementById('email').textContent);
    if (newName) document.getElementById('name').textContent = newName;
    if (newEmail) document.getElementById('email').textContent = newEmail;
}

function startSorting() {
    // Переход на страницу сортировки
    window.location.href = "ls_rooooom/index.html"; // путь относительно текущего файла
}
