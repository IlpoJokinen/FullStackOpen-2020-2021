import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HealthCheckEntry as HealthCheck } from '../types';

import DiagnosesList from './DiagnosesList';


const HealthCheckEntry: React.FC<{ entry: HealthCheck, hasDiagnoses: boolean }> = ({ entry, hasDiagnoses }) => {
    const rating = entry.healthCheckRating;
    const iconColor = rating === 0 ? 'red' : rating === 1 ? 'green' : rating === 2 ? 'yellow' : 'black';
    const hasHealthRating = entry.healthCheckRating >= 0 ? true : false;
    return (
        <div style={{ marginBottom: 10 }}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{entry.date}<Icon name='user md' size='large' /></Card.Header>
                    <Card.Description><em>{entry.description}</em></Card.Description>
                    {hasHealthRating && (
                        <div style={{ width: 100, display: 'flex' }}>
                            <div style={{ flex: 2 }}><h5>Status</h5></div>
                            <div style={{ flex: 1 }}><Icon name='heart' color={iconColor} /></div>
                        </div>
                    )}
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

export default HealthCheckEntry;