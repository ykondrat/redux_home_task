// Core
import { takeEvery } from 'redux-saga/effects';

// Saga watchers
import { watchTasks } from '../saga/watchers';

// Types
import { types } from '../types';

// Workers
import { fetchTasksWorker } from '../saga/workers/fetchTasksWorker';
import { createTaskWorker } from '../saga/workers/createTaskWorker';
import { removeTaskWorker } from '../saga/workers/removeTaskWorker';
import { updateTaskWorker } from '../saga/workers/updateTaskWorker';
import { completeTasksWorker } from '../saga/workers/completeTasksWorker';


describe('Saga watchers:', () => {
    const watcher = watchTasks();

    it('Should fire on FETCH_TASKS_ASYNC:', () => {
        expect(watcher.next().value).toEqual(takeEvery(types.FETCH_TASKS_ASYNC, fetchTasksWorker))
    });
    it('Should fire on CREATE_TASK_ASYNC:', () => {
        expect(watcher.next().value).toEqual(takeEvery(types.CREATE_TASK_ASYNC, createTaskWorker))
    });
    it('Should fire on REMOVE_TASK_ASYNC:', () => {
        expect(watcher.next().value).toEqual(takeEvery(types.REMOVE_TASK_ASYNC, removeTaskWorker))
    });
    it('Should fire on UPDATE_TASK_ASYNC:', () => {
        expect(watcher.next().value).toEqual(takeEvery(types.UPDATE_TASK_ASYNC, updateTaskWorker))
    });
    it('Should fire on COMPLETE_TASKS_ASYNC:', () => {
        expect(watcher.next().value).toEqual(takeEvery(types.COMPLETE_TASKS_ASYNC, completeTasksWorker))
    });
});
