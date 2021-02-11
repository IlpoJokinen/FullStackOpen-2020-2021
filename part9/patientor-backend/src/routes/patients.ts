import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getNonSensitivePatientInformation()
    res.send(patients);
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = utils.toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/:id/entries', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        try {
            const newEntry = utils.toNewEntry(req.body);
            const addedEntry = patientService.addEntryForPatient(newEntry, patient.id);
            res.json(addedEntry);
        } catch (e) {
            res.status(400).send(e.message);
        }
    } else {
        res.status(404).send({ error: 'Sorry, this patient does not exist' });
    }
});

export default router;