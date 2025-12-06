function changeAvatar() {
    const newSrc = prompt("Введите URL новой аватарки:");
    if (newSrc) {
        document.getElementById('avatar').src = newSrc;
    }
}

function showStats() {
    const stats = document.getElementById('stats');
    stats.classList.toggle('hidden');
}
