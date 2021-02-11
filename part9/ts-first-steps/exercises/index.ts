import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.post('/exercises', (req, res) => {
    const { body } = req;
    console.log(body);
    const { dailyExercises } = body;
    let { target } = body;
    console.log(dailyExercises);
    if (!target || !dailyExercises) {
        return res.status(404).json({ error: 'parameters missing!' });
    }

    if (!Array.isArray(dailyExercises)) {
        return res.status(404).json({ error: 'malformatted parameters' });
    }

    const hasNaNInDailyHours = dailyExercises.some(hours => isNaN(hours));
    target = Number(target);

    if (isNaN(target) || hasNaNInDailyHours) {
        return res.status(404).json({ error: 'malformatted parameters' });
    }

    return res.json(calculateExercises(target, dailyExercises));
});

app.get('/bmi', (req, res) => {
    let height, weight, queryObj;
    if (req.query) {
        queryObj = req.query;
        height = Number(queryObj.height);
        weight = Number(queryObj.weight);

        const bmi = calculateBmi(height, weight);

        if (bmi === 'malformatted parameters') {
            res.send({ error: bmi });
        } else {
            const finalObj = Object.assign(queryObj, { bmi: bmi });
            res.send(finalObj);
        };
    } else {
        res.send({ error: 'malformatted parameters' });
    };
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});