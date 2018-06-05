// @flow

import type {Node} from 'react';
import React, {PureComponent} from 'react';
import {start as singleSpaStart, registerApplication} from 'single-spa';
import type {ModuleType} from './../../export-types/single-spa-types';
import {isPathPrefix} from './helper';
import Link from 'react-router-dom/Link';

import Auth from './../components/auth';
import Header from './../components/header';

export default class App extends PureComponent<void, void> {
    componentDidMount() {
        registerApplication(
            'app-1-id',
            (): Promise<ModuleType> => import('./../../builds/app-1/index'),
            isPathPrefix('/app-1'),
            {authToken: 'some-token'}
        );

        // registerApplication(
        //     'app-2-id',
        //     (): Promise<ModuleType> => import('./../../builds/app-2/index'),
        //     pathPrefix('/app-2')
        // );

        singleSpaStart();
    }

    render(): Node {
        return [
            <Auth key="auth"/>,
            <Header key="header"/>,
            <div key="user-panel">user panel</div>,
            <div key="app-content" className="js-app-holder">

                <Link to="/app-1">to app 1</Link>
                <h1>push your app here</h1>

            </div>,
            <div key="footer">footer</div>
        ];
    }
}
