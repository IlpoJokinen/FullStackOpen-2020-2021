import React from 'react';

import { Field, Formik, Form } from 'formik';
import { NewEntry } from '../types';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { Button, Grid } from 'semantic-ui-react';
import { useStateValue } from '../state/state';

import EntryTypeFields from './EntryTypeFields';
import { hospitalSchema, occupationalHealthCareSchema, healthCheckSchema } from '../validation/entrySchema';

interface Props {
    onCancel: () => void;
    onSubmit: (values: NewEntry) => void;
    initialValues: NewEntry
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues }) => {
    const [{ diagnoses }] = useStateValue();
    const { type } = initialValues;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={type === 'Hospital'
                ? hospitalSchema
                : type === 'OccupationalHealthcare'
                    ? occupationalHealthCareSchema
                    : healthCheckSchema
            }
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className='form ui'>
                        <Field
                            label='Description'
                            placeholder='Description'
                            name='description'
                            component={TextField}
                        />
                        <Field
                            label='Date'
                            placeholder='YYYY-MM-DD'
                            name='date'
                            component={TextField}
                        />
                        <Field
                            label='Specialist'
                            placeholder='Specialist'
                            name='specialist'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <EntryTypeFields entryType={values.type} />
                        <Grid>
                            <Grid.Column floated='left' width={5}>
                                <Button type='button' onClick={onCancel} color='red'>
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5}>
                                <Button
                                    type='submit'
                                    floated='right'
                                    color='green'
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;