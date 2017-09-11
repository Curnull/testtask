import {domainHost, value, request, validation} from '../../wrappers';
import {getAccountService, getAuthService} from '../../services';
import {commonWrappers} from '../../common';
import {composeFromWrappers, validators} from '../../utils';

const accountService = getAccountService();
const authService = getAuthService();

export const signUp = () => {
    const model = composeFromWrappers(wrappers.form);
    return accountService.methods.register(model).then(() => {
        return authService
            .methods
            .getToken(wrappers.form.userName.state.value, wrappers.form.password.state.value)
            .then((r) =>  commonWrappers.auth.methods.setToken(r.access_token));
    });
};

const form = {
    userName: value<string>(),
    email: value<string>(),
    password: value<string>(),
    confirmPassword: value<string>(),
};

export const wrappers = {
    form,
    registerRequest: request(signUp),
    validation: validation(form, {
        userName: [validators.isRequired, validators.userName],
        email:  [validators.isRequired, validators.email],
        password:  [validators.isRequired],
        confirmPassword:  [validators.isRequired, validators.toEqual('password', 'Password')],
    }),
};

export default domainHost('Sign up', wrappers);
