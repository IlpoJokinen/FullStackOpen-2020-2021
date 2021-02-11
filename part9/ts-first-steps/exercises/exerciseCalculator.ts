interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (targetAmount: number, hours: Array<number>): Result => {
    let resultObj = <Result>{};
    let avg: number;
    resultObj.periodLength = hours.length;
    resultObj.trainingDays = hours.filter(number => number !== 0).length;
    avg = hours.reduce((a, b) => a + b) / hours.length;
    resultObj.success = avg < targetAmount ? false : true;

    resultObj.rating = giveRatingToResult(avg, targetAmount);

    let desc: string;
    if (resultObj.rating === 3) {
        desc = 'Nicely done!';
    } else if (resultObj.rating === 2) {
        desc = 'Not too shaby, keep up!';
    } else {
        desc = 'You really should spice things up!';
    }

    resultObj.ratingDescription = desc;
    resultObj.target = targetAmount;
    resultObj.average = avg;

    return resultObj;
};


const giveRatingToResult = (avg: number, targetAmount: number): number => {
    let rating: number = 0;
    if (avg >= targetAmount) {
        rating = 3;
    } else if (avg < targetAmount / 2) {
        rating = 1;
    } else {
        rating = 2;
    }
    return rating;
};
