// @flow

/* global window */

// import FastClick from 'fastclick';

export function initializeEnvironment() {
    import('fastclick').then((fastClick: mixed) => {
        const {document} = window;

        // reduce 300ms delay
        // $FlowFixMe
        fastClick.attach(document.body);

        // disable gesture zoom on iOS
        document.addEventListener('gesturestart', (evt: Event) => {
            evt.preventDefault();
        });
    });
}

export function isPathPrefix(prefix: string): (location: Location) => boolean {
    return (location: Location): boolean => {
        return location.pathname.startsWith(prefix);
    };
}

