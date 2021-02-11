type Output = string;

const result = (height: number, weight: number): number => {
    const heightInMeters = height / 100;
    const result = weight / Math.pow(heightInMeters, 2);
    return result;
};

export const calculateBmi = (height: number, weight: number): Output => {
    const bmi = result(height, weight);
    switch (true) {
        case bmi < 18.5:
            return 'Skinny (underweight)';
        case bmi > 18.5 && bmi < 25:
            return 'Normal (healthy weight)';
        case bmi > 25 && bmi < 30:
            return 'Overweight (not good)';
        case bmi > 30:
            return 'Oh god';
        default:
            return 'malformatted parameters';
    };
};