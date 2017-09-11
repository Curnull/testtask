import {domainHost, value, request, validation} from '../../wrappers';
import {getAuthService} from '../../services';
import {commonWrappers} from '../../common';
import {ILoginModel} from '../../interfaces';
import {validators} from '../../utils';

const authService = getAuthService();

export const login = () => {
    return authService
        .methods
        .getToken(wrappers.form.userName.state.value, wrappers.form.password.state.value)
        .then((r) =>  commonWrappers.auth.methods.setToken(r.access_token));
};

const form = {
    userName: value<string>(),
    password: value<string>(),
};

export const wrappers = {
    form,
    getTokenRequest: request(login),
    validation: validation<ILoginModel>(form, {
        userName: [validators.isRequired, validators.userName],
        password: [validators.isRequired],
    }),
};

export default domainHost('Login', wrappers);
