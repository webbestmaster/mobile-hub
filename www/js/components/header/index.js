// @flow

import type {Node} from 'react';
import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import style from './style.scss';

export default class Header extends Component<void, void> {
    componentDidMount() {
        console.log('Header has been mounded');
    }

    render(): Node {
        return <div className={style.wrapper}>

            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={style.wrapper}>
                        Title
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Sing Up</Button>
                </Toolbar>
            </AppBar>

        </div>;
    }
}
