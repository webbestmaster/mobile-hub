// @flow

import type {Node} from 'react';
import React, {PureComponent} from 'react';
import {start as singleSpaStart, registerApplication} from 'single-spa';
import type {ModuleType} from './../../export-types/single-spa-types';
import {pathPrefix} from './helper';

export default class App extends PureComponent<void, void> {
    componentDidMount() {
        registerApplication(
            'app-1-id',
            (): Promise<ModuleType> => import('./../../builds/app-1/index'),
            pathPrefix('/app-1'),
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
            <div key="header">header</div>,
            <div key="right-panel">right panel</div>,
            <div key="app-content" className="js-app-holder">

                <h1>push your app here</h1>

            </div>,
            <div key="footer">footer</div>
        ];
    }
}
