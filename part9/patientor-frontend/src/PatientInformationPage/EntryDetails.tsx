import React from 'react';

import { assertNever } from '../utils';
import { Entry, EntryType } from '../types';

import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';
import HospitalEntry from './HospitalEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const hasDiagnoses = entry.diagnosisCodes ? true : false;
    switch (entry.type) {
        case EntryType.HealthCheck:
            return <HealthCheckEntry entry={entry} hasDiagnoses={hasDiagnoses} />;
        case EntryType.Hospital:
            return <HospitalEntry entry={entry} hasDiagnoses={hasDiagnoses} />;
        case EntryType.OccupationalHealthCare:
            return <OccupationalHealthCareEntry entry={entry} hasDiagnoses={hasDiagnoses} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;