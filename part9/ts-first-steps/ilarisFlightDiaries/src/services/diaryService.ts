import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const findEntryById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id);
    return entry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(diary => diary.id)) + 1,
        ...entry
    };
    diaries.push(newDiaryEntry);

    return newDiaryEntry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findEntryById
};