// Core
import React, { Component, createRef } from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { Form as ReduxForm, Control } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';

// Instruments
import { api } from '../../REST';
import { sortTasksByGroup } from '../../instruments';
import { newTaskMessage } from '../../bus/forms/shapes';
import { validateLength } from '../../instruments';

// Components
import Spinner from '../Spinner';
import Task from '../Task';
import Catcher from '../Catcher';
import Checkbox from '../../theme/assets/Checkbox';
import Input from '../Input';

// Actions
import {
    fetchTasksAsync,
    createTaskAsync,
    removeTaskAsync,
    updateTaskAsync,
    completeTasksAsync,
} from '../../bus/tasks/actions';

// Styles
import Styles from './styles.m.css';

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    isFetching: state.ui.get('isFetching'),
    tasksFilter: state.forms.filter.message,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            fetchTasksAsync,
            createTaskAsync,
            removeTaskAsync,
            updateTaskAsync,
            completeTasksAsync,
        },
        dispatch,
    )
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {

    formikForm = createRef();

    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _submitForm = (formData, actions) => {
        this._createTask(formData);

        actions.resetForm();
    };

    _createTask = ({ message }) => {
        if (!message) {
            return (null);
        }

        this.props.actions.createTaskAsync(message);
    };

    _isAllCompleted = () => {
        const { tasks } = this.props;
        const completedTasks = tasks.filter((task) => !task.get('completed'));

        if (completedTasks.size) {
            return (false);
        }
        return (true);
    }

    _completeAllTasksHandle = () => {
        if (!this._isAllCompleted()) {
            const { tasks, actions } = this.props;
            const unCompletedTasks = tasks.filter((task) => !task.get('completed'));
            const completedTasks = unCompletedTasks.map((task) => task.set('completed', true));

            actions.completeTasksAsync(completedTasks);
        } else {
            return (null);
        }
    }

    _renderListOfTasks = () => {
        const { tasks, actions, tasksFilter } = this.props;
        const tasksFiltered = sortTasksByGroup(
            tasks.filter(
                (item) => item.get('message').toLowerCase().search(tasksFilter.toLowerCase()) !== -1
            )
        );

        return (
            tasksFiltered.map((task, index) => (
                <Catcher key = { task.get('id') }>
                    <Task
                        _removeTaskAsync = { actions.removeTaskAsync }
                        _updateTaskAsync = { actions.updateTaskAsync }
                        completed = { task.get('completed') }
                        favorite = { task.get('favorite') }
                        id = { task.get('id') }
                        message = { task.get('message') }
                        created = { task.get('created') }
                    />
                </Catcher>
            ))
        );
    }

    render () {
        const { isFetching, tasksFilter } = this.props;
        const tasksJSX = this._renderListOfTasks();
        const isAllCompleted = this._isAllCompleted();

        return (
            <section className = { Styles.scheduler }>
                <Spinner />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <ReduxForm model = 'forms.filter'>
                            <Input
                                disabled = { isFetching }
                                id = 'forms.filter.message'
                                model = 'forms.filter.message'
                                placeholder = 'Поиск'
                                type = 'search'
                                validators = { {
                                    valid: (message) => !validateLength(message, 0, 50),
                                } }
                            />
                        </ReduxForm>
                    </header>
                    <section>
                        <Formik
                            validationSchema = { newTaskMessage.schema }
                            onSubmit = { this._submitForm }
                            initialValues = { newTaskMessage.shape }
                            ref = { this.formikForm }
                            render = { (prop) => {
                                const { handleChange, values } = prop;

                                return (
                                    <Form>
                                        <input
                                            name = 'message'
                                            className = 'createTask'
                                            placeholder = 'Описaние моей новой задачи'
                                            type = 'text'
                                            value = { values.message }
                                            onChange = { handleChange }
                                        />
                                        <button type = 'submit'>
                                            Добавить задачу
                                        </button>
                                    </Form>
                                );
                            } }
                        />
                        <div className = 'overlay'>
                            <ul>
                                <FlipMove
                                    delay = { 0 }
                                    disableAllAnimations = { false }
                                    duration = { 400 }
                                    easing = 'ease-in-out'
                                    enterAnimation = 'elevator'
                                    leaveAnimation = 'elevator'
                                    maintainContainerHeight = { false }
                                    staggerDelayBy = { 0 }
                                    staggerDurationBy = { 0 }
                                    typeName = 'div'
                                    verticalAlignment = 'top'
                                >
                                    { tasksJSX }
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { isAllCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasksHandle }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
