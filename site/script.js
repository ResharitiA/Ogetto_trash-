let currentSessionId = null;
let currentStage = 1;

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const startBtn = document.getElementById('start-btn');
  const wholeBtn = document.getElementById('whole-btn');
  const partsBtn = document.getElementById('parts-btn');
  const nextBtn = document.querySelector('.next-btn');
  const finishBtn = document.querySelector('.finish-btn');
  const restartBtn = document.querySelector('.restart-btn');

  startBtn.addEventListener('click', startSorting);
  wholeBtn.addEventListener('click', () => nextStage('цельный'));
  partsBtn.addEventListener('click', () => nextStage('части'));
  nextBtn.addEventListener('click', nextStageMaterials);
  finishBtn.addEventListener('click', finishSorting);
  restartBtn.addEventListener('click', restartSorting);

  function startSorting() {
    fetch('/api/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      currentSessionId = data.sessionId;
      currentStage = data.stage;
      showStage(1);
      modal.style.display = 'block';
      startBtn.style.display = 'none';
    });
  }

  function nextStage(type) {
    fetch('/api/next-stage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: currentSessionId, type })
    })
    .then(res => res.json())
    .then(data => {
      currentStage = data.stage;
      showStage(currentStage);
    });
  }

  function nextStageMaterials() {
    const checked = document.querySelectorAll('.materials-grid input:checked');
    if (checked.length === 0) {
      alert('Выберите хотя бы один материал!');
      return;
    }
    nextStage('materials');
  }

  function finishSorting() {
    currentStage = 4;
    showStage(4);
  }

  function restartSorting() {
    location.reload();
  }

  function showStage(stage) {
    // Обновляем активный этап в полоске
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.querySelector(`.stage[data-stage="${stage}"]`).classList.add('active');

    // Показываем нужный контент
    document.querySelectorAll('.stage-content').forEach(s => s.classList.remove('active'));
    document.getElementById(`stage${stage}`).classList.add('active');

    // Обновляем вопрос
    const questions = {
      1: 'Какой тип мусора перед вами?',
      2: 'Из каких материалов состоит предмет?',
      3: 'Следуйте инструкциям по утилизации',
      4: 'Мусор готов к утилизации!'
    };
    document.getElementById('question').textContent = questions[stage];
  }
});