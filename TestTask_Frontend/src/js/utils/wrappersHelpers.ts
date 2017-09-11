import { isWrapper, ValueWrapper, ListWrapper, Wrapper, IWrappersStructure } from '../wrappers';

export function fillWrappers(wrappers: IWrappersStructure, source: object, filler: (wrapper: Wrapper<any, any, any>, source: any) => void = () => {}) {
    if (!source || !wrappers) {
        throw new Error('source and wrappers are required for mapping');
    }
    Object.keys(source).forEach((key) => {
        const obj = wrappers[key];
        if (isWrapper(obj)) {
            const wrapper = obj as ValueWrapper<any>;
            wrapper.methods.set(source[key]);
            filler(wrapper, source[key]);
        } else if (typeof obj === 'object') {
            fillWrappers(obj as IWrappersStructure, source[key], filler);
        }
    });
}

export function composeFromWrappers(wrappers: IWrappersStructure, ignoreWrappers: Array<Wrapper<any, any>> = []): any {
    if (!wrappers) {
        throw new Error('source and wrappers are required for mapping');
    }
    return Object.keys(wrappers).reduce((result, key) => {
        const obj = wrappers[key];
        if (isWrapper(obj)) {
            const wrapper = obj as Wrapper<any, any>;
            if (ignoreWrappers.includes(wrapper)) {
                return;
            }
            if (wrapper.state.items) {
                result[key] = wrapper.state.items;
            } else {
                result[key] = wrapper.state.value;
            }
        } else if (typeof obj === 'object') {
            result[key] = composeFromWrappers(obj as IWrappersStructure);
        }
        return result;
    }, {});
}
