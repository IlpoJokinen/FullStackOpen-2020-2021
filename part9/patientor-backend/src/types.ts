export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    OccupationalHealthCare = 'OccupationalHealthcare',
    Hospital = 'Hospital'
}

type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;
export type NonSensitivePatientInformation = Omit<Patient, 'ssn'>
export type NewPatient = Omit<Patient, 'id'>
export type NewBaseEntry = Omit<BaseEntry, 'id'>
export type NewEntry = DistributiveOmit<Entry, 'id'>

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    type: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthCare;
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}