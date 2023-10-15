import patientService from '../services/patientService';
import express from 'express';
import helper from '../utils';
import { EntryWithoutId } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = helper.toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(400);
  }
});

router.post('/:id/entries', (req, res) => {
  const entries: EntryWithoutId = helper.toNewEntry(req.body);
  const entry = patientService.addEntry(req.params.id, entries);
  res.send(entry);
});

export default router;