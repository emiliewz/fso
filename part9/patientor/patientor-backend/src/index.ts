import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.use(express.static(__dirname+'/../dist'));
app.get('/*', (_req,res) => {
  res.sendFile(path.join(__dirname+'/../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});