// @flow
/* global window */

import React from 'react';
import {render} from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import App from './app';
import {initializeEnvironment} from './app/helper.js';

initializeEnvironment();

render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    window.document.querySelector('.js-app-wrapper')
);
