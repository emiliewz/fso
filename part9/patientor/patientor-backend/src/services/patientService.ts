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
  const id = uuid() ;
  const newPatientEntry = {
    id,
    ...entry
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientEntries.find( p => p.id === id );
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};

