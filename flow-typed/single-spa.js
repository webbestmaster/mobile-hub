// @flow

export type CustomPropsType = {
    +[key: string]: mixed
};

export type EventPropsType = {|
    appName: 'string',
    customProps: CustomPropsType
|};

export type LoaderDetectorType = (location: Location) => boolean;
export type ModuleEventListenerType = (props: EventPropsType) => Promise<void>;
export type ModuleType = {|
    +bootstrap: ModuleEventListenerType,
    +mount: ModuleEventListenerType,
    +unmount: ModuleEventListenerType
|};

export type LoadedModuleType = () => Promise<ModuleType>;

declare module 'single-spa' {
    declare export function start(): void;

    declare export function registerApplication(
        appId: string,
        appLoader: LoadedModuleType,
        loaderDetector: LoaderDetectorType,
        customProps?: CustomPropsType
    ): void;
}
