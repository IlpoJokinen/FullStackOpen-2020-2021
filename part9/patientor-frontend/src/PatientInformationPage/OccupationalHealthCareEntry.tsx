import React from 'react';

import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthCareEntry as Occupational } from '../types';

import DiagnosesList from './DiagnosesList';

const OccupationalHealthCareEntry: React.FC<{ entry: Occupational, hasDiagnoses: boolean }> = ({ entry, hasDiagnoses }) => {

    return (
        <div style={{ marginBottom: 10 }}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {entry.date}
                        <Icon name='stethoscope' size='large' />
                        {entry.employerName}
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

export default OccupationalHealthCareEntry;