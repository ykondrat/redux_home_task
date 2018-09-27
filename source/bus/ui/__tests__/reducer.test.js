// Reducer
import { uiReducer } from '../reducer';

import * as actions from '../actions';

const actionTest = {
    type: 'INIT_TEST_DEFAULT'
}

describe('uiReducer tests:', () => {
    test('uiReducer test for default switch case', () => {
        expect(
            uiReducer( void 0, actionTest)
        ).toMatchSnapshot();
    });

    test('uiReducer test for startFetching', () => {
        expect(
            uiReducer(void 0, actions.startFetching())
        ).toMatchSnapshot();
    });

    test('uiReducer test for stopFetching', () => {
        expect(
            uiReducer(void 0, actions.stopFetching())
        ).toMatchSnapshot();
    });

});
