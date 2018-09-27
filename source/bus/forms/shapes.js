// Core
import { object, string } from 'yup';

export const newTaskMessage = {
    shape: {
        message: '',
    },
    schema: object().shape({
        message: string()
            .required()
            .min(1)
            .max(50),
    }),
};
