export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface discharge {
  date: string,
  criteria: string,
}

export interface sickLeave {
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

export enum healthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface healthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: healthCheckRating
}

export interface occupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: sickLeave,
}

export interface hospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: discharge,
}

export type Entry = hospitalEntry | occupationalHealthcareEntry | healthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[],
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;