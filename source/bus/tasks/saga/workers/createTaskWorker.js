// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { createTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';

export function* createTaskWorker({ payload: message }) {
    try {
        yield put(startFetching());

        const task = yield apply(api, api.createTask, [ message ]);

        yield put(createTask(task));
    } catch (e) {
        console.error('Create task worker', e);
    } finally {
        yield put(stopFetching());
    }
}
