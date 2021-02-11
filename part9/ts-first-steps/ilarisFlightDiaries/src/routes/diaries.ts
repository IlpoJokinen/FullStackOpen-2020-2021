import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/:id', (req: any, res: any) => {
    const diaryEntry = diaryService.findEntryById(Number(req.params.id));
    if (diaryEntry) {
        res.send(diaryEntry);
    } else {
        res.sendStatus(404);
    }
});

router.get('/', (_req: any, res: any) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (req: any, res: any) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;