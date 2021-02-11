import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from '../constants';
import { Entry, Patient, NewEntry, EntryType } from '../types';
import GenderIcon from "../components/GenderIcon";
import EntryDetails from './EntryDetails';
import { Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal/index';

const PatientInformationPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });
    const [newEntryId, setNewEntryId] = useState<string | undefined>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };


    const patient = patients[id];

    const submitNewEntry = async (values: NewEntry) => {

        if (values.type === EntryType.OccupationalHealthCare) {
            if (!values.sickLeave?.endDate && !values.sickLeave?.startDate) {
                values.sickLeave = undefined;
            }
        }
        try {
            const { data: newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(newEntry));
            setNewEntryId(newEntry.id);
            closeModal();
        } catch (e) {
            setError(e.response.data.error);
        }
    };

    const fetchPatientById = async () => {
        fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
        try {
            const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(updatePatient(patientFromApi));
            fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
        } catch (e) {
            console.error(e);
        }
    };

    React.useEffect(() => {
        console.log('fetching...')
        fetchPatientById();
    }, [dispatch]);

    if (newEntryId) {
        const shouldFetch = patient.entries.find(obj => obj.id === newEntryId);
        if (!shouldFetch) fetchPatientById();
    }

    if (!patient) return null;

    return (
        <div>
            <div>
                <div style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <h1>{patient.name}<GenderIcon gender={patient.gender} /></h1>
                </div>
                <div>
                    <b>ssn:</b><p>{" " + patient.ssn}</p>
                </div>
                <div>
                    <b>occupation:</b>
                    <p>{" " + patient.occupation}</p>
                </div>
                <div>
                    <b>date of birth:</b>
                    <p>{" " + patient.ssn}</p>
                </div>
            </div>
            <hr />
            <div>
                {patient.entries.length > 0 && <h3>Entries</h3>}
                {patient.entries.map((entry: Entry) => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
            </div>
            <Button onClick={() => openModal()}>Add New Entry</Button>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
        </div>
    );
};

export default PatientInformationPage;