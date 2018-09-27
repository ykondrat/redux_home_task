// Actions
import * as actions from "../actions";

// Types
import { types } from '../types';

describe("Tasks actions tests:", () => {
    describe("Test ASYNC actions:", () => {
        test("fetchTasksAsync test", () => {
            expect(actions.fetchTasksAsync()).toEqual({
                type: types.FETCH_TASKS_ASYNC
            });
        });
        test("createTaskAsync test", () => {
            expect(actions.createTaskAsync(__.taskMessage)).toEqual({
                type: types.CREATE_TASK_ASYNC,
                payload: __.taskMessage
            });
        });
        test("removeTaskAsync test", () => {
            expect(actions.removeTaskAsync(__.taskID)).toEqual({
                type: types.REMOVE_TASK_ASYNC,
                payload: __.taskID
            });
        });
        test("updateTaskAsync test", () => {
            expect(actions.updateTaskAsync(__.mockTask)).toEqual({
                type: types.UPDATE_TASK_ASYNC,
                payload: __.mockTask
            });
        });
        test("completeTasksAsync test", () => {
            expect(actions.completeTasksAsync([__.mockTask,__.mockTask])).toEqual({
                type: types.COMPLETE_TASKS_ASYNC,
                payload: [__.mockTask,__.mockTask]
            });
        });
    });
    describe("Test SYNC actions:", () => {
        test("fillTasks test", () => {
            expect(actions.fillTasks([__.mockTask,__.mockTask])).toEqual({
                type: types.FILL_TASKS,
                payload: [__.mockTask,__.mockTask]
            });
        });
        test("createTask test", () => {
            expect(actions.createTask(__.mockTask)).toEqual({
                type: types.CREATE_TASK,
                payload: __.mockTask
            });
        });
        test("removeTask test", () => {
            expect(actions.removeTask(__.taskID)).toEqual({
                type: types.REMOVE_TASK,
                payload: __.taskID
            });
        });
        test("updateTask test", () => {
            expect(actions.updateTask(__.mockTask)).toEqual({
                type: types.UPDATE_TASK,
                payload: __.mockTask
            });
        });
        test("completeTask test", () => {
            expect(actions.completeTask()).toEqual({
                type: types.COMPLETE_TASKS
            });
        });
    });
});
