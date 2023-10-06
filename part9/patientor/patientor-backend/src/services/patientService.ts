import { PatientEntry, NonSensitivePatientEntry } from '../../types';
import patients from '../../data/patients';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};

