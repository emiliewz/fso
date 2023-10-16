import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';
import patients from '../../data/patients';
import {v1 as uuid} from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient: PatientEntry | undefined = findById(id);
  const entryId = uuid();
  const newEntry: Entry = {
    id: entryId,
    ...entry
  };
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};

