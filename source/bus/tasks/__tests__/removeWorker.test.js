// Core
import { expectSaga } from 'redux-saga-test-plan';
import { put, apply, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../REST';

// Actions
import { removeTask, removeTaskAsync } from '../actions';
import { startFetching, stopFetching } from '../../ui/actions';

// Worker
import { removeTaskWorker } from '../saga/workers/removeTaskWorker';

describe('removeTaskWorker saga tests:', () => {
    test('should complete scenario with status 200', async () => {
        await expectSaga(removeTaskWorker, removeTaskAsync(__.taskID))
            .provide([
                [
                    apply(api, api.removeTask, [ __.taskID ])
                ]
            ])
            .put(startFetching())
            .apply(api, api.removeTask, [ __.taskID ])
            .put(removeTask(__.taskID))
            .put(stopFetching())
            .run();
    });
});
