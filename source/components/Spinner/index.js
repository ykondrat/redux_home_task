// Core
import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.m.css';

const mapStateToProps = (state) => ({
    isFetching: state.ui.get('isFetching')
});

@connect(mapStateToProps)
export default class Spinner extends Component {

    static propTypes = {
        isFetching: bool.isRequired
    }

    static defaultProps = {
        isFetching: false
    }

    render () {
        const { isFetching } = this.props;

        return (
            isFetching ? <div className = { Styles.spinner } /> : null
        );
    }

}
