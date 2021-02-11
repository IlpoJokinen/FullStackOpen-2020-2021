import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  };

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  const actionType = "SET_DIAGNOSES_LIST";
  return {
    type: actionType,
    payload: diagnoses
  };
}

export const setPatientList = (patients: Patient[]): Action => {
  const actionType = "SET_PATIENT_LIST";
  return {
    type: actionType,
    payload: patients
  };
};

export const updatePatient = (patient: Patient): Action => {
  const actionType = "UPDATE_PATIENT";
  return {
    type: actionType,
    payload: patient
  };
};

export const addPatient = (patient: Patient): Action => {
  const actionType = "ADD_PATIENT";
  return {
    type: actionType,
    payload: patient
  };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          },
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
