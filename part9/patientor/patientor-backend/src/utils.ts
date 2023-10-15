import { NewPatientEntry, Gender, Diagnosis, EntryWithoutId, BaseEntry, HealthCheckRating, Discharge, SickLeave } from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseType = (type: unknown): 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
  if (!isString(type) || !(type == 'HealthCheck' || type == 'OccupationalHealthcare' || type == 'Hospital')) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const isNumber = (n: unknown): n is number => {
  return typeof n === 'number' || n instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('date' in object && 'criteria' in object) {
    const newEntry: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('startDate' in object && 'endDate' in object) {
    const newEntry: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
    const newBaseEntry: Omit<BaseEntry, 'id'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };
    if ('diagnosisCodes' in object) {
      newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    const type = parseType(object.type);
    switch (type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const entry: EntryWithoutId = {
            ...newBaseEntry,
            type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return entry;
        }
        throw new Error('Incorrect data: healthCheckRating is missing');
      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          const entry: EntryWithoutId = {
            ...newBaseEntry,
            type,
            employerName: parseEmployerName(object.employerName),
          };
          if ('sickLeave' in object) {
            entry.sickLeave = parseSickLeave(object.sickLeave);
          }
          return entry;
        }
        throw new Error('Incorrect data: employerName is missing');
      case 'Hospital':
        if ('discharge' in object) {
          const entry: EntryWithoutId = {
            ...newBaseEntry,
            type,
            discharge: parseDischarge(object.discharge),
          };
          return entry;
        }
        throw new Error('Incorrect data: discharge is missing');
      default:
        assertNever(type);
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default {
  toNewPatientEntry, toNewEntry
};