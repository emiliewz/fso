export interface DisgnosisEntry {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Disgnosis['code']>,
}

export enum healthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthChcek',
  healthCheckRating: healthCheckRating
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string,
  name: string,
  ssn: string,
  occupation: string
  dateOfBirth: string,
  gender: Gender,
  entries: BaseEntry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;