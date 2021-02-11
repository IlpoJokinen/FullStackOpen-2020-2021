import patients from '../../data/patients';
import {
    Patient,
    NewPatient,
    NonSensitivePatientInformation,
    Entry,
    NewEntry,
} from '../types';
const { v4: uuid } = require('uuid')

const getPatients = (): Patient[] => {
    return patients;
};

const isCorrectEntry = (entries: any): Entry | string => {
    const isCorrectEntryType = entries.type === "Hospital" || "OccupationalHealthcare" || "HealthCheck";
    if (isCorrectEntryType) {
        return entries;
    } else {
        throw new Error('Incorrect entry type: ' + entries.type);
    }
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);
    try {
        isCorrectEntry(patient?.entries);
        return patient;
    } catch (e) {
        return e.message;
    }
};

const getNonSensitivePatientInformation = (): NonSensitivePatientInformation[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }
    patients.push(newPatient);
    return newPatient;
};

const addEntryForPatient = (entry: NewEntry, patientId: string): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry
    }
    const updatedPatient = patients.find(patient => patient.id === patientId);
    updatedPatient?.entries.push(newEntry);
    return newEntry;
}

export default {
    getPatients,
    getNonSensitivePatientInformation,
    addPatient,
    getPatientById,
    addEntryForPatient
}