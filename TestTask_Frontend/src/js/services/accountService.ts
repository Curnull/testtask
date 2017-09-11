import {entityApi} from '../utils';
import {REGISTER_ACCOUNT_URL, ACCOUNT_URL} from '../constants';
import {ISignUpModel} from '../interfaces';
import {ApiChain} from '../utils';

export function getAccountService() {
    return new ApiChain({ url: ACCOUNT_URL, methods: {}}).withMethods((methods, api) => ({
        register: (form: ISignUpModel) => api.post(REGISTER_ACCOUNT_URL, form),
    }));
}
