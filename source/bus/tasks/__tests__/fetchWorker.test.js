// Core
import { expectSaga } from 'redux-saga-test-plan';
import { put, apply, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../REST';

// Actions
import { fillTasks, fetchTasksAsync } from '../actions';
import { startFetching, stopFetching } from '../../ui/actions';

// Worker
import { fetchTasksWorker } from '../saga/workers/fetchTasksWorker';

describe('fetchTasksWorker saga tests:', () => {
    test('should complete scenario with status 200', async () => {
        await expectSaga(fetchTasksWorker, fetchTasksAsync())
            .provide([
                [
                    apply(api, api.fetchTasks), [__.mockTask]
                ]
            ])
            .put(startFetching())
            .apply(api, api.fetchTasks)
            .put(fillTasks( [__.mockTask]))
            .put(stopFetching())
            .run();
    });
    test('should complete scenario with status 401', async () => {
        await expectSaga(fetchTasksWorker, fetchTasksAsync())
            .provide([
                [
                    apply(api, api.fetchTasks),  __.fetchResponseFail401
                ]
            ])
            .put(startFetching())
            .apply(api, api.fetchTasks)
            .put(stopFetching())
            .run();
    });
});
