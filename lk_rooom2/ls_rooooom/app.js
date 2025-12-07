const app = {
    complexity: null,
    partsCount: 3,
    currentPart: 1,
    selectedCategory: null,
    selectedPlastic: null,
    points: 0,
    itemsSorted: 0,
    earnedPoints: 0,
    categories: [
        { id: 'plastic', name: 'Пластик', icon: 'fas fa-recycle', description: 'PET, PP, HDPE и другие', color: '#4CAF50' },
        { id: 'glass', name: 'Стекло', icon: 'fas fa-wine-bottle', description: 'Бутылки, банки, тара', color: '#2196F3' },
        { id: 'paper', name: 'Бумага', icon: 'fas fa-newspaper', description: 'Картон, упаковка', color: '#FF9800' },
        { id: 'metal', name: 'Металл', icon: 'fas fa-cookie-bite', description: 'Банки, крышки, фольга', color: '#795548' },
        { id: 'hazardous', name: 'Опасные отходы', icon: 'fas fa-skull-crossbones', description: 'Батарейки, электроника', color: '#F44336' },
        { id: 'other', name: 'Другое / Нет знака', icon: 'fas fa-ban', description: 'Трубочки, смешанные материалы', color: '#9E9E9E' }
    ],
    plastics: [
        { id: 'pet', number: '1', name: 'PET', desc: 'Бутылки для напитков' },
        { id: 'hdpe', number: '2', name: 'HDPE', desc: 'Бутылки для молока' },
        { id: 'pvc', number: '3', name: 'PVC', desc: 'Трубы, упаковка' },
        { id: 'ldpe', number: '4', name: 'LDPE', desc: 'Пакеты, плёнка' },
        { id: 'pp', number: '5', name: 'PP', desc: 'Стаканы, крышки' },
        { id: 'ps', number: '6', name: 'PS', desc: 'Лотки, упаковка' },
        { id: 'other_plastic', number: '7', name: 'Другой', desc: 'Смешанный пластик' },
        { id: 'unknown', number: '?', name: 'Не знаю', desc: 'Не вижу маркировки' }
    ],
    instructions: {
        pet: { title: 'Пластик PET (1) - Бутылки', points: 10, steps: ['Снимите крышку и колечко (это другой пластик!)', 'Сполосните бутылку водой от остатков напитка', 'Сомните бутылку вдоль для экономии места', 'Этикетку можно не снимать - она сгорит при переработке'], container: 'Желтый контейнер для пластика', containerDesc: 'Только для пластиковой упаковки', tips: 'PET перерабатывается в новые бутылки или синтетическую ткань' },
        hdpe: { title: 'Пластик HDPE (2) - Плотный пластик', points: 9, steps: ['Тщательно промойте от остатков содержимого', 'Снимите крышку (если есть) - отдельно в пластик', 'Выдавите воздух и смните', 'На дне найдите треугольник с цифрой 2'], container: 'Желтый контейнер для пластика', containerDesc: 'Для жесткой пластиковой упаковки', tips: 'HDPE идет на производство труб, канистр, садовой мебели' },
        pvc: { title: 'Пластик PVC (3) - ПВХ материалы', points: 7, steps: ['Очистите от загрязнений и остатков', 'Разберите на части если возможно', 'Проверьте маркировку - треугольник с цифрой 3', 'Сложите компактно'], container: 'Желтый контейнер для пластика', containerDesc: 'Принимается не везде, уточните у оператора', tips: 'PVC перерабатывается сложно, лучше сокращать его использование' },
        ldpe: { title: 'Пластик LDPE (4) - Пакеты и плёнка', points: 6, steps: ['Очистите от этикеток и скотча', 'Удалите остатки пищи', 'Сложите несколько пакетов вместе', 'Сверните в компактный рулон'], container: 'Желтый контейнер для пластика', containerDesc: 'Специальный контейнер для мягкого пластика', tips: 'Пакеты лучше использовать повторно, чем перерабатывать' },
        pp: { title: 'Пластик PP (5) - Пищевые контейнеры', points: 8, steps: ['Тщательно вымойте с моющим средством', 'Удалите бумажные этикетки', 'Крышки собирайте отдельно в пакет', 'Проверьте маркировку на дне'], container: 'Желтый контейнер для пластика', containerDesc: 'Для пластиковой пищевой упаковки', tips: 'PP перерабатывается в садовую мебель, ящики, ведра' },
        ps: { title: 'Пластик PS (6) - Пенопласт и лотки', points: 5, steps: ['Очистите от пищевых остатков', 'Не ломайте пенопласт на мелкие кусочки', 'Снимите бумажные наклейки', 'Сложите лотки друг в друга'], container: 'Желтый контейнер для пластика', containerDesc: 'Принимается не везде, лучше уточнить', tips: 'PS почти не перерабатывается, старайтесь избегать' },
        other_plastic: { title: 'Пластик Other (7) - Смешанный', points: 4, steps: ['Попробуйте разделить на слои если возможно', 'Очистите от загрязнений', 'Проверьте, нет ли на других частях другой маркировки', 'Если не уверены - положите в общий мусор'], container: 'Серый контейнер или уточните', containerDesc: 'Часто не перерабатывается', tips: 'Такой пластик лучше не покупать - он почти не перерабатывается' },
        unknown: { title: 'Пластик без маркировки', points: 3, steps: ['Тщательно проверьте дно предмета', 'Пощупайте материал - похож на пластик?', 'Очистите от остатков пищи', 'Если точно нет маркировки - это общий мусор'], container: 'Серый контейнер', containerDesc: 'Для общего мусора', tips: 'Производители обязаны маркировать пластиковую упаковку' },
        glass: { title: 'Стеклянная тара', points: 12, steps: ['Снимите металлические крышки (отдельно в металл)', 'Сполосните от остатков напитка или пищи', 'Не разбивайте! Целое стекло безопаснее', 'Цветное и прозрачное можно вместе'], container: 'Зеленый контейнер для стекла', containerDesc: 'Только стеклянная тара, не керамика!', tips: 'Стекло перерабатывается бесконечно без потери качества' },
        other: { title: 'Другое / Нет знака', points: 3, steps: ['Проверьте дно предмета для маркировки', 'Если точно нет знака - это общий мусор', 'Очистите от остатков пищи', 'Разделите на части если возможно'], container: 'Серый контейнер', containerDesc: 'Для общего мусора', tips: 'Производители обязаны маркировать упаковку' }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    initCategories();
    initPlastics();
    updateUI();
    setTimeout(() => {
        showNotification('Добро пожаловать в EcoSort! ♻️');
    }, 1000);
});

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    const step = document.getElementById(stepId);
    if (step) {
        step.classList.add('active');
        updateProgressBar(stepId);
        window.scrollTo(0, 0);
    }
}

function updateProgressBar(stepId) {
    let progress = 0;
    switch(stepId) {
        case 'step1': progress = 0; break;
        case 'step1_5': progress = 10; break;
        case 'step2': progress = 30; break;
        case 'step2_5': progress = 50; break;
        case 'step3': progress = 70; break;
        case 'step4': progress = 100; break;
    }
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        indicator.classList.remove('active');
    });
    if (stepId === 'step1') {
        document.querySelectorAll('.step-indicator')[0].classList.add('active');
    } else if (stepId === 'step2' || stepId === 'step2_5') {
        document.querySelectorAll('.step-indicator')[1].classList.add('active');
    } else if (stepId === 'step3') {
        document.querySelectorAll('.step-indicator')[2].classList.add('active');
    } else if (stepId === 'step4') {
        document.querySelectorAll('.step-indicator')[3].classList.add('active');
    }
}

function selectComplexity(type) {
    app.complexity = type;
    if (type === 'single') {
        showStep('step2');
        document.getElementById('step2Title').textContent = 'Выберите категорию';
        document.getElementById('step2Subtitle').textContent = 'Какой основной материал у предмета?';
    } else {
        showStep('step1_5');
    }
}

function changePartsCount(delta) {
    app.partsCount = Math.max(1, Math.min(10, app.partsCount + delta));
    document.getElementById('partsCount').textContent = app.partsCount;
    document.getElementById('partsText').textContent = `${app.partsCount} ${getNoun(app.partsCount, 'часть', 'части', 'частей')}`;
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
}

function startComplexSorting() {
    app.currentPart = 1;
    showStep('step2');
    document.getElementById('step2Title').textContent = `Часть ${app.currentPart} из ${app.partsCount}`;
    document.getElementById('step2Subtitle').textContent = 'Выберите материал этой части';
}

function initCategories() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';
    app.categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <div class="category-name">${category.name}</div>
            <div class="category-desc">${category.description}</div>
        `;
        card.onclick = () => selectCategory(category);
        container.appendChild(card);
    });
}

function selectCategory(category) {
    document.querySelectorAll('.category-card').forEach(card => card.classList.remove('selected'));
    const cards = document.querySelectorAll('.category-card');
    const index = app.categories.findIndex(c => c.id === category.id);
    if (cards[index]) {
        cards[index].classList.add('selected');
    }
    app.selectedCategory = category;
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = false;
        if (category.id === 'plastic') {
            nextBtn.onclick = () => showStep('step2_5');
        } else {
            nextBtn.onclick = () => {
                generateInstructions(category.id);
                showStep('step3');
            };
        }
    }
}

function initPlastics() {
    const container = document.getElementById('plasticsContainer');
    container.innerHTML = '';
    app.plastics.forEach(plastic => {
        const card = document.createElement('div');
        card.className = 'plastic-card';
        card.innerHTML = `
            <div class="plastic-number">${plastic.number}</div>
            <div class="plastic-name">${plastic.name}</div>
            <div class="plastic-desc">${plastic.desc}</div>
        `;
        card.onclick = () => selectPlastic(plastic);
        container.appendChild(card);
    });
}

function selectPlastic(plastic) {
    document.querySelectorAll('.plastic-card').forEach(card => card.classList.remove('selected'));
    const cards = document.querySelectorAll('.plastic-card');
    const index = app.plastics.findIndex(p => p.id === plastic.id);
    if (cards[index]) {
        cards[index].classList.add('selected');
    }
    app.selectedPlastic = plastic;
    setTimeout(() => {
        generateInstructions('plastic', plastic.id);
        showStep('step3');
    }, 1000);
}

function generateInstructions(categoryId, plasticId = null) {
    const container = document.getElementById('instructionsContainer');
    let instruction;
    if (categoryId === 'plastic' && plasticId) {
        instruction = app.instructions[plasticId] || app.instructions.unknown;
    } else {
        instruction = app.instructions[categoryId] || app.instructions.other;
    }
    document.getElementById('step3Title').textContent = instruction.title;
    container.innerHTML = `
        <h3 class="instructions-title">
            <i class="fas fa-list-ol"></i>
            Что нужно сделать:
        </h3>
        <ul class="instructions-list">
            ${instruction.steps.map(step => `<li>${step}</li>`).join('')}
        </ul>
        <div class="disposal-info">
            <div class="disposal-icon">
                <i class="fas fa-trash-alt"></i>
            </div>
            <div class="disposal-text">
                <h4>${instruction.container}</h4>
                <p>${instruction.containerDesc}</p>
            </div>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #FFF9C4; border-radius: 10px;">
            <i class="fas fa-lightbulb" style="color: #FF8C00; margin-right: 10px;"></i>
            <strong>Совет:</strong> ${instruction.tips}
        </div>
    `;
    app.earnedPoints = instruction.points;
}

function completeSorting() {
    app.points += app.earnedPoints;
    app.itemsSorted++;
    updateStats();
    showStep('step4');
    showNotification(`+${app.earnedPoints} эко-баллов! 🌟`);
    saveUserData();
    resetSelection();
}

function resetSelection() {
    app.selectedCategory = null;
    app.selectedPlastic = null;
    app.earnedPoints = 0;
    document.querySelectorAll('.category-card, .plastic-card').forEach(card => card.classList.remove('selected'));
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = true;
    }
}

function updateStats() {
    document.getElementById('totalPoints').textContent = app.points;
    document.getElementById('itemsSorted').textContent = app.itemsSorted;
    document.getElementById('earnedPoints').textContent = `+${app.earnedPoints}`;
    const accuracy = app.itemsSorted > 0 ? Math.min(100, 95 + Math.floor(Math.random() * 5)) : 100;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
}

function goBack() {
    if (app.complexity === 'single') {
        showStep('step1');
    } else if (app.currentPart > 1) {
        app.currentPart--;
        showStep('step2');
        document.getElementById('step2Title').textContent = `Часть ${app.currentPart} из ${app.partsCount}`;
        document.getElementById('step2Subtitle').textContent = 'Выберите материал этой части';
    } else {
        showStep('step1_5');
    }
}

function nextStep() {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn && !nextBtn.disabled) {
        nextBtn.click();
    }
}

function startOver() {
    app.complexity = null;
    app.currentPart = 1;
    app.partsCount = 3;
    document.getElementById('partsCount').textContent = app.partsCount;
    document.getElementById('partsText').textContent = `${app.partsCount} части`;
    showStep('step1');
    showNotification('Начнём новую сортировку! ♻️');
}

function showNotification(message) {
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function saveUserData() {
    const data = {
        points: app.points,
        itemsSorted: app.itemsSorted,
        lastUpdate: new Date().toISOString()
    };
    try {
        localStorage.setItem('ecosort_data', JSON.stringify(data));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

function loadUserData() {
    try {
        const data = JSON.parse(localStorage.getItem('ecosort_data'));
        if (data) {
            app.points = data.points || 0;
            app.itemsSorted = data.itemsSorted || 0;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
}

function updateUI() {
    updateStats();
}
