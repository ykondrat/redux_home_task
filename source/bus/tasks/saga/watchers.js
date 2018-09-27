// Core
import { takeEvery } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchTasksWorker } from './workers/fetchTasksWorker';
import { createTaskWorker } from './workers/createTaskWorker';
import { removeTaskWorker } from './workers/removeTaskWorker';
import { updateTaskWorker } from './workers/updateTaskWorker';
import { completeTasksWorker } from './workers/completeTasksWorker';

export function* watchTasks() {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasksWorker);
    yield takeEvery(types.CREATE_TASK_ASYNC, createTaskWorker);
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTaskWorker);
    yield takeEvery(types.UPDATE_TASK_ASYNC, updateTaskWorker);
    yield takeEvery(types.COMPLETE_TASKS_ASYNC, completeTasksWorker);
}
