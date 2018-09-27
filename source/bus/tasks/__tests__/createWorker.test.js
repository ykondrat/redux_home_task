// Core
import { expectSaga } from 'redux-saga-test-plan';
import { put, apply, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../REST';

// Actions
import { createTask, createTaskAsync } from '../actions';
import { startFetching, stopFetching } from '../../ui/actions';

// Worker
import { createTaskWorker } from '../saga/workers/createTaskWorker';

describe('createTaskWorker saga tests:', () => {
    test('should complete scenario with status 200', async () => {
        await expectSaga(createTaskWorker, createTaskAsync(__.taskMessage))
            .provide([
                [
                    apply(api, api.createTask, [ __.taskMessage ]), __.mockTask
                ]
            ])
            .put(startFetching())
            .apply(api, api.createTask, [ __.taskMessage ])
            .put(createTask(__.mockTask))
            .put(stopFetching())
            .run();
    });
});
