import React from 'react';
import { Field } from 'formik';
import { Header } from 'semantic-ui-react';

import { EntryType } from '../types';
import { NumberField, TextField } from '../AddPatientModal/FormField';

interface Props {
    entryType: EntryType;
};

const EntryTypeFields: React.FC<Props> = ({ entryType }) => {
    switch (entryType) {
        case EntryType.HealthCheck:
            return (
                <Field
                    label='Health Check Rating'
                    name='healthCheckRating'
                    component={NumberField}
                    min={0}
                    max={3}
                />
            );
        case EntryType.OccupationalHealthCare:
            return (
                <>
                    <Field
                        label='Employer Name'
                        name='employerName'
                        component={TextField}
                    />
                    <Header size='small'>Sick Leave</Header>
                    <Field
                        label='Start Date'
                        name='startDate'
                        component={TextField}
                    />
                    <Field
                        label='End Date'
                        name='endDate'
                        component={TextField}
                    />
                </>
            );
        case EntryType.Hospital:
            return (
                <>
                    <Header size='small'>Discharge</Header>
                    <Field
                        label='Date'
                        name='date'
                        placeholder='YYYY-MM-DD'
                        component={TextField}
                    />
                    <Field
                        label='Criteria'
                        name='criteria'
                        placeholder='Criteria'
                        component={TextField}
                    />
                </>
            );
        default:
            return null;
    };
};

export default EntryTypeFields;