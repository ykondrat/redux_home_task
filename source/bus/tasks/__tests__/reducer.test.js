// Core
import { List, fromJS } from 'immutable';

// Reducer
import { tasksReducer } from '../reducer';

// Actions
import * as actions from '../actions';

// Types
import { types } from '../types';

const actionTest = {
    type: 'INIT_TEST_DEFAULT'
}

const initialState = List();

describe('tasks reducer tests:', () => {
    test('tasksReducer test for default switch case', () => {
        expect(
            tasksReducer(void 0, actionTest)
        ).toEqual(initialState);
    });

    test('tasksReducer test for fill tasks', () => {
        expect(
            tasksReducer(void 0, actions.fillTasks([__.mockTask]))
        ).toEqual(fromJS([__.mockTask]));
    });

    test('tasksReducer test for create task', () => {
        expect(
            tasksReducer(void 0, actions.createTask(__.mockTask))
        ).toEqual(initialState.unshift(fromJS(__.mockTask)));
    });

    test('tasksReducer test for remove task', () => {
        expect(
            tasksReducer(initialState.unshift(fromJS(__.mockTask)), actions.removeTask())
        ).toEqual(initialState);
    });

    test('tasksReducer test for update task', () => {
        expect(
            tasksReducer(initialState.unshift(fromJS(__.mockTask)), actions.updateTask(__.updatedTask))
        ).toEqual(initialState.unshift(fromJS(__.updatedTask)));
    });

    test('tasksReducer test for update task', () => {
        expect(
            tasksReducer(initialState.unshift(fromJS(__.mockTask)), actions.updateTask(__.updatedTask2))
        ).toEqual(initialState.unshift(fromJS(__.mockTask)));
    });

    test('tasksReducer test for complete tasks', () => {
        expect(
            tasksReducer(initialState.unshift(fromJS(__.mockTask)), actions.completeTask())
        ).toEqual(initialState.unshift(fromJS(__.updatedTask)));
    });

});
