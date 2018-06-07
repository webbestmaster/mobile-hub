// @flow

/* eslint consistent-this: ["error", "view"] */

import React, {Component, createContext} from 'react';
import type {Node} from 'react';
import cloneDeep from 'lodash/cloneDeep';

type ThemeNameType = 'light' | 'dark';

type StateType = {|
    +name: ThemeNameType,
    +isMounted: boolean
|};

type PropsType = {|
    +children: Node[]
|};

type ActionMapType = {|
    +setName: (name: ThemeNameType) => void
|};

export type ThemeProviderValueType = {|
    +state: StateType,
    +action: ActionMapType
|};

const defaultState: StateType = {
    name: 'light',
    isMounted: false
};

const defaultAction: ActionMapType = {
    setName: (name: ThemeNameType) => {
        console.error('setName (' + name + ')');
        console.error('Action still not defined');
    }
};

const {Provider, Consumer} = createContext({
    state: defaultState,
    action: defaultAction
});

class ThemeProvider extends Component<PropsType, StateType> {
    setName = (name: ThemeNameType) => {
        const view = this; // eslint-disable-line no-invalid-this

        view.setState({name});
    };

    constructor() {
        super();

        const view = this;

        view.state = {
            name: 'light',
            isMounted: false
        };
    }

    componentDidMount() {
        const view = this;

        view.setState({isMounted: true});
    }

    getProvideValue(): ThemeProviderValueType {
        const view = this;

        return {
            state: cloneDeep(view.state),
            action: {
                setName: view.setName
            }
        };
    }

    render(): Node {
        const view = this;

        return <Provider value={view.getProvideValue()}>
            {view.props.children}
        </Provider>;
    }
}

export {ThemeProvider, Consumer as ThemeConsumer};
