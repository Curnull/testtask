import axios from 'axios';
import {ApiChain} from '../utils';
import {AUTH_URL, GET_TOKEN_URL} from '../constants';

export interface IGetTokenRespoonse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export const getAuthService = () => {
    return new ApiChain({ url: AUTH_URL, methods: {}}).withMethods((methods, api) => ({
        getToken: (username: string, password: string) => {
            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('username', username);
            params.append('password', password);
            return axios.request({
                url: `${AUTH_URL}${GET_TOKEN_URL}`,
                method: 'post',
                headers: {'Content-Type': 'x-www-form-urlencoded'},
                data: params,
              }).then((r) => r.data);
        }
    }));
};
