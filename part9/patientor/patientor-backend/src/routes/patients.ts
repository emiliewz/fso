import patientService from '../services/patientService';
import express from 'express';
// import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    // const newPatientEntry = toNewPatientEntry(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const addedPatient = patientService.addPatient({name, dateOfBirth, ssn, gender, occupation});
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;