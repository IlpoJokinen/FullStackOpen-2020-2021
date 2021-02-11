import * as yup from 'yup';

const baseSchema = yup.object().shape({
    description: yup.string()
        .min(2, 'Description should be 2-100 characters!')
        .max(100, 'Description should be 2-100 characters!')
        .required('Required field!'),
    date: yup.string()
        .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in format YYYY-MM-DD!')
        .required('Required field!'),
    specialist: yup.string().min(5, 'Specialist should contain 5 or more characters').required('Required field!'),
});

export const hospitalSchema = baseSchema.concat(
    yup.object().shape({
        criteria: yup.string()
            .min(5, 'Please enter longer description')
            .max(50, 'Please keep the description shorter')
            .required('Required field!'),
    })
);

export const occupationalHealthCareSchema = baseSchema.concat(
    yup.object().shape({
        employerName: yup.string().required('Required field!'),
        startDate: yup.string().matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in format YYYY-MM-DD!'),
        endDate: yup.string().matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in format YYYY-MM-DD!'),
    })
);

export const healthCheckSchema = baseSchema.concat(
    yup.object().shape({
        healthCheckRating: yup.number()
            .typeError('Health Check Rating should be a number')
            .equals([0, 1, 2, 3], 'Please enter rating between 0-3')
            .required('Required field!'),
    })
);