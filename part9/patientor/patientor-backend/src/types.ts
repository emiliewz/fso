export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Discharge {
  date: string,
  criteria: string,
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

export interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>,
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave,
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge,
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

  // Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface PatientEntry {
  id: string,
  name: string,
  ssn: string,
  occupation: string
  dateOfBirth: string,
  gender: Gender,
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;