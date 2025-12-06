const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient();

app.use(express.json());
app.use(express.static('.'));

app.post('/sort', (req, res) => {
    const steps = req.body.steps;
    let ecoPoints = 0;
    if (steps.includes('Следуйте этим шагам для правильной сортировки')) {
        ecoPoints = 10;
    }
    client.set('last_sort', ecoPoints, (err, reply) => {
        if (err) console.error(err);
        res.json({ message: `Вы правильно отсортировали отходы. Эко-баллов начислено: ${ecoPoints}` });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
