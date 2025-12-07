const express = require('express');
const redis = require('redis');
const path = require('path');
const app = express();
const port = 3000;

// Redis клиент
const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});
redisClient.connect().catch(console.error);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/start', async (req, res) => {
  const sessionId = req.body.sessionId || Date.now().toString();
  await redisClient.set(sessionId, JSON.stringify({ stage: 1 }));
  res.json({ sessionId, stage: 1 });
});

app.post('/api/next-stage', async (req, res) => {
  const { sessionId, type } = req.body;
  const data = JSON.parse(await redisClient.get(sessionId) || '{}');
  
  if (data.stage === 1) {
    data.type = type;
    data.stage = 2;
  } else if (data.stage === 2) {
    data.stage = 3;
  } else if (data.stage === 3) {
    data.stage = 4;
  }
  
  await redisClient.set(sessionId, JSON.stringify(data));
  res.json({ stage: data.stage, data });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});