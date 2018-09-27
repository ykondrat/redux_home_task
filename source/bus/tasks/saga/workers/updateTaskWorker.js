// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { updateTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';

export function* updateTaskWorker({ payload: task }) {
    try {
        yield put(startFetching());

        const data = yield apply(api, api.updateTask, [ task ]);
        const updatedTask = data[0];

        yield put(updateTask(updatedTask));
    } catch (e) {
        console.error('Update task worker', e);
    } finally {
        yield put(stopFetching());
    }
}
