document.getElementById('submit').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    const steps = document.querySelectorAll('#steps p');
    let stepTexts = Array.from(steps).map(p => p.textContent);
    let response = await fetch('/sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps: stepTexts })
    });
    let data = await response.json();
    resultDiv.textContent = data.message;
});
