import { wrap, ValueWrapper, ValidationWrapper } from '../wrappers';

export const wrapInput = <T>(wrapper: ValueWrapper<T>, validation?: ValidationWrapper<any>) => wrap
    .withProps(() => ({
        value: wrapper.state.value,
        error: validation ? validation!.methods.getErrorForWrapper(wrapper) : '',
    }))
    .withProps(({ getProps }) => ({
        onChange: (v) => {
            wrapper.methods.set(v);
            if (validation) {
                validation!.methods.validate(wrapper);
            }
        },
    }));
