import express from 'express';
import cors from 'cors';
import diagnoseRouter from '../src/routes/diagnoses';
import patientRouter from '../src/routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});