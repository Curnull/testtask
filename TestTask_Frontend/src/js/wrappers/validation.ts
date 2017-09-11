import { object, Wrapper, IValueState} from './';
import { composeFromWrappers } from '../utils';
import { IWrappersStructure } from '../wrappers';

export interface IValidatorState<T extends { [p: string]: any}> {
    errors: {[K in keyof T]?: string };
    globalErrors: string[];
}

export interface IValidatorMethods {
    validate: (wrapper: Wrapper<IValueState<any>, any>) => string;
    validateAll: () => boolean;
    getErrorForWrapper: (wrapper: Wrapper<IValueState<any>, any>) => string;
    isValid: () => boolean;
    fromModelState: (r: {[p: string]: string[]}) => void;
    setError: (field: string, err: string) => void;
    setGlobalErrors: (errors: string[]) => void;
}

export type WrappersForm<T> = {
    [K in keyof T]?: Wrapper<IValueState<any>, any, any>;
};

export type Validator<T, TAll = {}> = (val: T, getAll: () => TAll) => string;

export type Validators<T extends { [p: string]: any}> = {
    [K in keyof T]: Array<Validator<T[K], T>>;
};

export type ValidationWrapper<T> = Wrapper<IValidatorState<T>, IValidatorMethods>;

function toLowerCaseFirstLetter(str: string) {
    return str.charAt(0).toLocaleLowerCase() + str.slice(1);
}

const NOT_FOUND = 'NOT_FOUND';
export function validation<T>(form: WrappersForm<T>, validators: Validators<T>): ValidationWrapper<T> {
    const cache = {};
    const getWrapperKey = (wrapper: Wrapper<any, any>) => {
        const name = wrapper.name;
        if (!cache[name]) {
            const key = Object.keys(form).find((key) => form[key] === wrapper);
            cache[name] = key || NOT_FOUND;
        }

        return cache[name];
    };
    return object<IValidatorState<T>>({ errors: {}, globalErrors: [] })
        .withMethods(({ getState }, {set: setProp}) => {
            const setError = (field: string, error: string) => {
                const currentError = getState().errors[field];
                if (error !== currentError) {
                    setProp('errors', {
                        ...getState().errors as any,
                        [field]: error,
                    });
                }
            };

            const setGlobalErrors = (errors: string[]) => {
                setProp('globalErrors', errors);
            };

            const validate = (wrapper) => {
                const key = getWrapperKey(wrapper);
                if (key === NOT_FOUND) {
                    return;
                }
                const wrapperValidators = validators[key];
                if (wrapperValidators === undefined) {
                    return;
                }
                const getAll: () => T = () => composeFromWrappers(form as any) as T;
                let error;
                const failedValidator = wrapperValidators.find((validator) => {
                    error = validator(wrapper.state.value, getAll);
                    return !!error;
                });
                setError(key, error);
                return error || '';
            };
            const getErrorForWrapper = (wrapper) => {
                const state = getState();
                const key = getWrapperKey(wrapper);
                if (key === NOT_FOUND) {
                    return '';
                }
                return state.errors[key] || '';
            };
            const isValid = () => {
                const errors = getState().errors;
                return !Object.keys(errors).find((key) => !!errors[key]);
            };

            const validateAll = () => {
                setProp({
                    errors: {},
                    globalErrors: [],
                });
                Object.keys(form).forEach((k) => {
                    validate(form[k]);
                });
                return isValid();
            };

            const fromModelState = (modelState: {[p: string]: string[]}) => {
                Object.keys(modelState).forEach((field) => {
                    if (!field) {
                        setGlobalErrors(modelState[field]);
                    }
                    const key = toLowerCaseFirstLetter(field.split('.')[1]);
                    const error = modelState[field][0];
                    setError(key, error);
                });
            };

            return {
                setError,
                setGlobalErrors,
                validate,
                validateAll,
                getErrorForWrapper,
                isValid,
                fromModelState
            };
        });
}
