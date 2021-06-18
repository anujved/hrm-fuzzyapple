import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import './loading.css';

export const MainLoading = () => {
    return (
        <div className="main-loading">
            <img
                alt="Logo"
                src="/static/logo.svg"
            />
            <h1>Drift Academy</h1>
        </div>
    )
}

export const Fetching = ({ message }) => {
    return (
        <React.Fragment>
            <div className="fetching-loader">
                <CircularProgress />
                <Typography variant="h3">{message ? message : 'Data is loading'}</Typography>
            </div>
        </React.Fragment>
    )
}

Fetching.propTypes = {
    message: PropTypes.string
}

Fetching.defaultProps = {
    message: null
}