// @flow

import './build/main.bundle';
import type {EventPropsType} from './../../export-types/single-spa-types';

export function bootstrap(props: EventPropsType): Promise<void> {
    return Promise.resolve();
}

export function mount(props: EventPropsType): Promise<void> {
    return Promise.resolve();
}

export function unmount(props: EventPropsType): Promise<void> {
    return Promise.resolve();
}
