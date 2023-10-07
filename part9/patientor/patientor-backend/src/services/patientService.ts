import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import patientEntries from '../../data/patients';
import {v1 as uuid} from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid() as string;
  const newPatientEntry = {
    id,
    ...entry
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};

