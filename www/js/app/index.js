// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import type {ModuleType} from './../../export-types/single-spa-types';
import {isPathPrefix} from './helper';
import Link from 'react-router-dom/Link';

import Auth from './../components/auth';
import Header from './../components/header';

import {ThemeProvider, ThemeConsumer} from './../contexts/ui';
import type {ThemeProviderValueType} from './../contexts/ui';

import withRouter from 'react-router-dom/withRouter';

class App extends Component<void, void> {
    componentDidMount() {
        import('single-spa').then((singleSpa: mixed) => {
            // $FlowFixMe
            singleSpa.registerApplication(
                'app-1-id',
                (): Promise<ModuleType> => import('./../../builds/app-1/index'),
                isPathPrefix('/app-1'),
                {authToken: 'some-token'}
            );

            // $FlowFixMe
            singleSpa.start();
        });
    }

    render(): Node {
        const view = this;

        console.log(view.props);
        console.log(view.context);

        return <ThemeProvider>

            <h1>{JSON.stringify(view.props)}</h1>
            <h1>{JSON.stringify(view.context)}</h1>

            <ThemeConsumer>
                {(val: ThemeProviderValueType): Node => <div>{JSON.stringify(val)}</div>}
            </ThemeConsumer>

            <Auth key="auth"/>
            <Header key="header"/>
            <div key="user-panel">user panel</div>
            <div key="app-content" className="js-app-holder">

                <Link to="/app-1">to app 1</Link>
                <h1>push your app here</h1>

            </div>
            <div key="footer">footer</div>

        </ThemeProvider>;
    }
}

export default withRouter(App);
