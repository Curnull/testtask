// @flow

import axios from 'axios';

const CancelToken = axios.CancelToken;
const ERROR_INVALID_TOKEN = 'invalid_token';
const REQUEST_CANCELED = 'REQUEST_CANCELED';

interface IServerError {
    error: string;
    error_description: string;
}

const handleErrorRequest = (onTokenRejected: () => void) => (e: any) => {
    if (axios.isCancel(e)) {
        throw REQUEST_CANCELED;
    }

    if (!e.response) {
        throw e;
    }
    const serverError: IServerError = e.response.data;

    if (serverError.error === ERROR_INVALID_TOKEN) {
        onTokenRejected();
    } else {
        throw serverError;
    }
};

export default function sync(getToken: () => string | undefined, onTokenRejected: () => void) {
    return (params: any = {}, abort?: () => void) => {
        const headerParams: any = {};
        const token = getToken();
        const opts: any = {...params};

        if (token) {
            headerParams.Authorization = `Bearer ${token}`;
        }

        opts.headers = {...opts.headers, ...headerParams};

        if (abort) {
            opts.cancelToken = new CancelToken(abort);
        }
        return axios(opts)
            .catch(handleErrorRequest(onTokenRejected));
    };
}

export {axios as request};
