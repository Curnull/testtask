import authFetchMiddleware from './authFetchMiddleware';
import {commonWrappers} from '../common';
import {PATHS} from '../routes';

export const request = authFetchMiddleware(() => commonWrappers.auth.state.token, () => {
    commonWrappers.auth.methods.clearToken();
    window.location.href = PATHS.LOGIN;
});

export class Api {
    public readonly url: string;
    public constructor(url = '') {
        this.url = url;
    }

    public get = <T>(url?: string | number, params?: any, rootParams?: any): Promise<T> => {
        return this.send<T>(url, {
            method: 'GET',
            params,
            ...rootParams
        });
    }

    public post = <T>(url?: string | number, data?: any, rootParams?: any): Promise<T> => {
        return this.send<T>(url, {
            method: 'POST',
            data,
            ...rootParams,
        });
    }

    public put = <T>(url?: string | number, data?: any): Promise<T> => {
        return this.send<T>(url, {
            method: 'PUT',
            data,
        });
    }

    public delete = <T>(url?: string | number): Promise<T> => {
        return this.send<T>(url, {
            method: 'DELETE',
        });
    }

    public getDefaultHeaders(): any {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
        return headers;
    }

    public send = <T>(
        urlInput?: string | number,
        data: any = {}): Promise<T> => {
        let extendedUrl: RequestInfo = this.url;
        if (urlInput !== undefined) {
            extendedUrl = `${this.url}${urlInput}`;
        }
        const extendedData = {
            ...data,
            headers: data.headers || this.getDefaultHeaders(),
        };
        return request({
            ...extendedData,
            ...extendedData.params,
            url: extendedUrl,
        }).then((r) => r!.data);
    }

    public withUrl(url) {
        return this.next({ url });
    }

    private next = ({ url = this.url }) => {
        return new Api(url);
    }
    private defaultParser = (response) => response.json();
}

export const apiRoot = new Api('');
