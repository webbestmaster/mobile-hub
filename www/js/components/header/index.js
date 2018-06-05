// @flow

import type {Node} from 'react';
import React, {PureComponent} from 'react';

export default class Header extends PureComponent<void, void> {
    componentDidMount() {
        console.log('Header has been mounded');
    }

    render(): Node {
        return <div>header</div>;
    }
}
