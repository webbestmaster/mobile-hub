// @flow

declare module 'immutability-helper' {
    declare export default function update<T>(source: T, ...rest?: Array<Object>): T; // eslint-disable-line flowtype/no-weak-types
}
