import express from 'express';
import { calculateBmi } from './utils';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) =>{
  if (!(req.query.height && !isNaN(Number(req.query.height))) || !(req.query.weight && !isNaN(Number(req.query.weight)))) {
    res.json({error: 'malformatted parameters'});
  }
  const {height, weight} = req.query;
  res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});