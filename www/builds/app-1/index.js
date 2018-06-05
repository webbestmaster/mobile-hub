// @flow

import './build/main.bundle';
import type {EventPropsType} from './../../export-types/single-spa-types';

export function bootstrap(props: EventPropsType): Promise<void> {
    console.log('app-1: - !!! - bootstrap');
    return Promise.resolve();
}

export function mount(props: EventPropsType): Promise<void> {
    console.log('app-1: - ↓↓↓ - mount');
    return Promise.resolve();
}

export function unmount(props: EventPropsType): Promise<void> {
    console.log('app-1: - ↑↑↑ -unmount');
    return Promise.resolve();
}
