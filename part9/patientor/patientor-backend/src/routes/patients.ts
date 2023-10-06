import patientService from '../services/patientService';
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;