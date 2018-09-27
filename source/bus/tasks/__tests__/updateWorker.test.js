// Core
import { expectSaga } from 'redux-saga-test-plan';
import { put, apply, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../REST';

// Actions
import { updateTask, updateTaskAsync } from '../actions';
import { startFetching, stopFetching } from '../../ui/actions';

// Worker
import { updateTaskWorker } from '../saga/workers/updateTaskWorker';

describe('updateTaskWorker saga tests:', () => {
    test('should complete scenario with status 200', async () => {
        await expectSaga(updateTaskWorker, updateTaskAsync(__.updatedTask))
            .provide([
                [
                    apply(api, api.updateTask, [ __.updatedTask ]), [__.updatedTask]
                ]
            ])
            .put(startFetching())
            .apply(api, api.updateTask, [ __.updatedTask ])
            .put(updateTask(__.updatedTask))
            .put(stopFetching())
            .run();
    });
});
