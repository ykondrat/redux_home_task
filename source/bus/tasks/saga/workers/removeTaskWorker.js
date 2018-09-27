// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { removeTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';

export function* removeTaskWorker({ payload: taskId }) {
    try {
        yield put(startFetching());

        yield apply(api, api.removeTask, [ taskId ]);

        yield put(removeTask(taskId));
    } catch (e) {
        console.error('Remove task worker', e);
    } finally {
        yield put(stopFetching());
    }
}
