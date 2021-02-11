import React, { useCallback } from 'react';
import { NewEntry, EntryType } from '../types';
import { Form, Dropdown, DropdownProps, Divider } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';

interface Props {
    onCancel: () => void;
    onSubmit: (values: NewEntry) => void;
};

const options = [
    {
        key: EntryType.Hospital,
        value: EntryType.Hospital,
        text: 'Hospital'
    },
    {
        key: EntryType.HealthCheck,
        value: EntryType.HealthCheck,
        text: 'Health Check'
    },
    {
        key: EntryType.OccupationalHealthCare,
        value: EntryType.OccupationalHealthCare,
        text: 'Occupational Health Care'
    }
];

const baseInitialValues = {
    description: '',
    date: '',
    specialist: ''
};

const hospitalInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: { date: '', criteria: '' }
};

const healthCheckInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0
};

const occupationalHealthCareInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.OccupationalHealthCare,
    employerName: '',
    sickLeave: { startDate: '', endDate: '' }
};

const EntryFormWrapper: React.FC<Props> = ({ onCancel, onSubmit }) => {
    const [entryType, setEntryType] = React.useState<EntryType>(EntryType.HealthCheck);

    const handleChange = (
        _e: React.SyntheticEvent,
        { value }: DropdownProps
    ): void => {
        if (value) setEntryType(value as EntryType);
    }

    const entryForm = useCallback(() => {
        switch (entryType) {
            case EntryType.HealthCheck:
                return (
                    <AddEntryForm
                        onCancel={onCancel}
                        onSubmit={onSubmit}
                        initialValues={healthCheckInitialValues}
                    />
                );
            case EntryType.Hospital:
                return (
                    <AddEntryForm
                        onCancel={onCancel}
                        onSubmit={onSubmit}
                        initialValues={hospitalInitialValues}
                    />
                );
            case EntryType.OccupationalHealthCare:
                return (
                    <AddEntryForm
                        onCancel={onCancel}
                        onSubmit={onSubmit}
                        initialValues={occupationalHealthCareInitialValues}
                    />
                );
            default:
                return null;
        }
    }, [entryType, onCancel, onSubmit]);
    return (
        <>
            <Form>
                <Form.Field>
                    <label>Entry Type</label>
                    <Dropdown
                        onChange={handleChange}
                        options={options}
                        selection
                        value={entryType}
                    />
                </Form.Field>
            </Form>
            <Divider />
            {entryForm()}
        </>
    );
};

export default EntryFormWrapper;