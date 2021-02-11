import {
    NewPatient,
    Gender,
    EntryType,
    Discharge,
    HealthCheckRating,
    NewBaseEntry,
    Diagnose,
    NewEntry,
    SickLeave
} from './types';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (dateOfBirth: any): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isArrayOfStrings = (param: any[]): param is string[] => {
    const haNonString = param.some(item => {
        return !isString(item);
    })
    return !haNonString;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + date);
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnose['code']> => {
    if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnoses');
    }
    return diagnosisCodes;
};

const parseEntryType = (entryType: any): EntryType => {
    if (!Object.values(EntryType).includes(entryType)) {
        throw new Error(`Incorrect or missing type: ${entryType || ""}`);
    }
    return entryType;
};

const parseStringParameter = (param: any): string => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing value: ' + param);
    }
    return param;
}

const parseDischargeInfo = (object: any): Discharge => {
    if (!object) {
        throw new Error('Incorrect or missing value, please fill out the date and criteria!');
    }
    return object;
};

const parseSickLeave = (object: any): SickLeave => {
    if (!object) throw new Error('Missing sick leave');

    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    };
};

const parseHealthCheckRating = (rating: number): HealthCheckRating => {
    if (
        rating === null ||
        rating === undefined ||
        !isHealthCheckRating(rating)
    ) {
        throw new Error(
            `Incorrect or missing value: ${rating || ''}`
        );
    }
    return rating;
};

const toNewPatient = (object: any): NewPatient => {
    const { name, dateOfBirth, ssn, gender, occupation, entries } = object;
    return {
        name: parseStringParameter(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseStringParameter(ssn),
        gender: parseGender(gender),
        occupation: parseStringParameter(occupation),
        entries: entries
    };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
    const { type, description, date, specialist } = object;
    const newBaseEntry: NewBaseEntry = {
        type: parseEntryType(type),
        description: parseStringParameter(description),
        date: parseDate(date),
        specialist: parseStringParameter(specialist),
    }

    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
    }

    return newBaseEntry;
};

const toNewEntry = (object: any): NewEntry => {
    const newBaseEntry = toNewBaseEntry(object) as NewEntry;
    switch (newBaseEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...newBaseEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case EntryType.OccupationalHealthCare:
            const newEntry = {
                ...newBaseEntry,
                employerName: parseStringParameter(object.employerName)
            }
            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return newEntry;
        case EntryType.Hospital:
            return { ...newBaseEntry, discharge: parseDischargeInfo(object.discharge) };
        default:
            return assertNever(newBaseEntry);
    }
}

export default {
    toNewPatient,
    toNewEntry
}