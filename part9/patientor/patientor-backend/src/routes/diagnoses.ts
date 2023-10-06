import diagnosisService from '../services/diagnosisService';
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

export default router;
