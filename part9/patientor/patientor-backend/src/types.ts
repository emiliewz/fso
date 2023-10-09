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

export interface Entry {

}

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