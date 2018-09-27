/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module excutes before setupFramework module.
**
*/

import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

global.localStorage = new LocalStorage();
global.fetch = fetch;

const successMessage = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const taskMessage = 'TEST_MESSAGE';
const error = new Error(errorMessage);
const taskID = 'TEST_ID';
const mockTask = {
    id: taskID,
    completed: false,
    favorite: false,
    message: taskMessage
}
const updatedTask = {
    id: taskID,
    completed: true,
    favorite: false,
    message: taskMessage
}
const updatedTask2 = {
    id: 'NEW_ID',
    completed: true,
    favorite: false,
    message: taskMessage
}
const responseDataSuccess = {
    data:    taskMessage,
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail401 = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};
global.__ = {
    taskID,
    mockTask,
    updatedTask2,
    updatedTask,
    errorMessage,
    error,
    taskMessage,
    successMessage,
    responseDataSuccess,
    responseDataFail,
    fetchResponseSuccess,
    fetchResponseFail401,
    fetchResponseFail400,
};
global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
