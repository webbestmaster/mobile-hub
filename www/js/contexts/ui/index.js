// @flow

/* eslint consistent-this: ["error", "view"] */

import React, {PureComponent, createContext} from 'react';
import type {Node} from 'react';
import update from 'immutability-helper';
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

export type ProviderValueType = {|
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

class ThemeProvider extends PureComponent<PropsType, StateType> {
    setName = (name: ThemeNameType) => {
        const view = this; // eslint-disable-line no-invalid-this

        const state = update(view.state, {name: {$set: name}});

        view.setState(state);
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

        view.setState(update(view.state, {
            isMounted: {$set: true}
        }));
    }

    getProvideValue(): ProviderValueType {
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


/*
class App extends PureComponent<void, void> {
    render() {
        return (
            <Provider>
                <ThemeContext.Consumer>
                    {val => <div>{val}</div>}
                </ThemeContext.Consumer>
            </Provider>
        );
    }
}
*/

export {ThemeProvider, Consumer as ThemeConsumer};
