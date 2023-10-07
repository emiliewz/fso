import { NewPatientEntry } from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const newEntry: NewPatientEntry = {
      name: "Martin Riggs",
      dateOfBirth: "1979-01-30",
      ssn: "300179-77A",
      gender: "male",
      occupation: "Cop"
  };

  return newEntry;
};

export default toNewPatientEntry;