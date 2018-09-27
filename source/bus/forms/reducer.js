// Core
import { combineForms } from 'react-redux-form';

export const formsReducer = combineForms({
    filter: {
        message: ''
    },
    updateTask: {
        message: ''
    }
}, 'forms');
