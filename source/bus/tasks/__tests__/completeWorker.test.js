// Core
import { expectSaga } from 'redux-saga-test-plan';
import { put, apply, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../REST';

// Actions
import { completeTask, completeTasksAsync } from '../actions';
import { startFetching, stopFetching } from '../../ui/actions';

// Worker
import { completeTasksWorker } from '../saga/workers/completeTasksWorker';

describe('completeTasksWorker saga tests:', () => {
    test('should complete scenario with status 200', async () => {
        await expectSaga(completeTasksWorker, completeTasksAsync([__.mockTask]))
            .provide([
                [
                    apply(api, api.completeAllTasks, [ [__.mockTask] ]), [__.updatedTask]
                ]
            ])
            .put(startFetching())
            .apply(api, api.completeAllTasks, [ [__.mockTask] ])
            .put(completeTask())
            .put(stopFetching())
            .run();
    });
});
