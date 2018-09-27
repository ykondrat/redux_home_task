// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';

// Actions
import { completeTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';

export function* completeTasksWorker({ payload: tasks }) {
    try {
        yield put(startFetching());

        yield apply(api, api.completeAllTasks, [ tasks ]);

        yield put(completeTask());
    } catch (e) {
        console.error('Complete tasks worker', e);
    } finally {
        yield put(stopFetching());
    }
}
