import express from 'express';
import { exerciseCalculator } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({error: 'parameters missing'});
  }

  if (!(daily_exercises instanceof Array) || daily_exercises.filter(e => isNaN(Number(e))).length > 0) {
    return res.status(400).send({error: 'malformatted parameters'});
  }

  const result = exerciseCalculator(daily_exercises as number[], Number(target));
  
  return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});