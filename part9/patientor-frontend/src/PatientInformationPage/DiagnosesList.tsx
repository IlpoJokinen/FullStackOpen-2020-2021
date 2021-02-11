import React from 'react';

import { Diagnosis } from '../types';
import { useStateValue } from "../state";

interface DiagnoseObject {
    code: string;
    name: string;
}

const DiagnosesList: React.FC<{ diagnoseCodes: Array<Diagnosis['code']> | undefined }> = ({ diagnoseCodes }) => {
    const [{ diagnoses }] = useStateValue();
    const allDiagnoses = Object.values(diagnoses);
    const patientsDiagnoses = allDiagnoses.filter((obj: DiagnoseObject) => diagnoseCodes?.includes(obj.code))
    return (
        <div>
            {patientsDiagnoses.map((obj: DiagnoseObject, i: number) => (
                <li key={i}>
                    { obj.code + " " + obj.name}
                </li>
            ))}
        </div>
    );
};

export default DiagnosesList;