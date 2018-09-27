// Types
import { types } from './types';

// Async
export const fetchTasksAsync = () => ({
    type: types.FETCH_TASKS_ASYNC
});
export const createTaskAsync = (message) => ({
    type: types.CREATE_TASK_ASYNC,
    payload: message
});
export const removeTaskAsync = (taskId) => ({
    type: types.REMOVE_TASK_ASYNC,
    payload: taskId
});
export const updateTaskAsync = (task) => ({
    type: types.UPDATE_TASK_ASYNC,
    payload: task
});
export const completeTasksAsync = (tasks) => ({
    type: types.COMPLETE_TASKS_ASYNC,
    payload: tasks
});

// Sync
export const fillTasks = (tasks) => ({
    type: types.FILL_TASKS,
    payload: tasks
});
export const createTask = (task) => ({
    type: types.CREATE_TASK,
    payload: task
});
export const removeTask = (taskId) => ({
    type: types.REMOVE_TASK,
    payload: taskId
});
export const updateTask = (task) => ({
    type: types.UPDATE_TASK,
    payload: task
});
export const completeTask = () => ({
    type: types.COMPLETE_TASKS,
});
