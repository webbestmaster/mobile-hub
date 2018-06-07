// @flow
/* global window */

import {initializeEnvironment} from './app/helper.js';
initializeEnvironment();

import React from 'react';
import {render, hydrate} from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import App from './app';

hydrate(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    window.document.querySelector('.js-app-wrapper')
);
