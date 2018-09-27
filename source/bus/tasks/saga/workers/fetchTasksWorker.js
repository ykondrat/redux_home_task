// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { fillTasks } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';

export function* fetchTasksWorker() {
    try {
        yield put(startFetching());

        const tasks = yield apply(api, api.fetchTasks);

        yield put(fillTasks(tasks));
    } catch (e) {
        console.error('Fetch tasks worker', e);
    } finally {
        yield put(stopFetching());
    }
}
