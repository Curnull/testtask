export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validate = (v, errText): string => v ? errText : '';

export const validators = {
    isRequired: (v) => validate(!v, 'Field is required!'),
    toEqual: (name: string, fieldTitle: string) =>
        (v, getAll) => validate(v !== getAll()[name], `Field should be equal to ${fieldTitle || name} field`),
    lengthLess: (l: number) => (v: string) => validate(v && v.length >= l, `Filed length should be less than ${l}`),
    email: (v) => validate(!validateEmail(v), 'E-mail is not valid'),
    userName: (v) => validate(!/^[a-zA-Z\-]+$/.test(v), 'User name is not valid'),
};
