// Пример получения статистики через Node.js + Redis (на сервере)
// Здесь просто имитация

document.addEventListener('DOMContentLoaded', () => {
    // Имитация получения данных с сервера
    const recycledCount = Math.floor(Math.random() * 10000);
    const usersCount = Math.floor(Math.random() * 1000);

    document.getElementById('recycled-count').textContent = recycledCount + ' тонн';
    document.getElementById('users-count').textContent = usersCount + ' человек';
});
