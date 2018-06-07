// @flow
/* global window, IS_PRODUCTION */

import {initializeEnvironment} from './app/helper.js';

initializeEnvironment();

import React from 'react';
import {render, hydrate} from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import App from './app';

const reactDomRender = IS_PRODUCTION ? hydrate : render; // eslint-disable-line id-match

reactDomRender(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    window.document.querySelector('.js-app-wrapper')
);
