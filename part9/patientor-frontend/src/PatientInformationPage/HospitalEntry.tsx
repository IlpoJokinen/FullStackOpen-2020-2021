import React from 'react';

import { Card, Icon } from 'semantic-ui-react';
import { HospitalEntry as Hospital } from '../types';

import DiagnosesList from './DiagnosesList';

const HospitalEntry: React.FC<{ entry: Hospital, hasDiagnoses: boolean }> = ({ entry, hasDiagnoses }) => {
    return (
        <div style={{ marginBottom: 10 }}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {entry.date}
                        <Icon name='hospital' size='large' />
                    </Card.Header>
                    <Card.Description><em>{entry.description}</em></Card.Description>
                </Card.Content>
                {hasDiagnoses && (
                    <Card.Content extra>
                        <div>
                            <div>
                                <h5>Diagnoses</h5>
                            </div>
                            <div>
                                <DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
                            </div>
                        </div>
                    </Card.Content>
                )}
            </Card>
        </div>
    );
};

export default HospitalEntry;