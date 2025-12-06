// Пример получения статистики через Node.js + Redis (на сервере)
// Здесь просто имитация

document.addEventListener('DOMContentLoaded', () => {
    // Имитация получения данных с сервера
    const recycledCount = 27000000; // 27 миллионов тонн
    const usersCount = 46000000; // 46 миллионов человек

    document.getElementById('recycled-count').textContent = recycledCount + ' тонн';
    document.getElementById('users-count').textContent = usersCount + ' человек';
});
