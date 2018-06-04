// @flow

type LoaderDetectorType = (location: Location) => boolean;
type ModuleEventListenerType = (props: string) => Promise<void>;
type ModuleType = {|
    +bootstrap: ModuleEventListenerType,
    +mount: ModuleEventListenerType,
    +unmount: ModuleEventListenerType
|};

type LoadedModuleType = () => Promise<ModuleType>;

declare module 'single-spa' {
    declare export function start(): void;

    declare export function registerApplication(
        appId: string,
        appLoader: LoadedModuleType,
        loaderDetector: LoaderDetectorType): void;
}
