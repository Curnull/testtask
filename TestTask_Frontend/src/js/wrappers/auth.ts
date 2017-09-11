import { object, Wrapper} from './';

export interface IAuthState {
  token?: string;
  isAuthorized: boolean;
}

export interface IAuthMethods {
  setToken: (token: string) => void;
  clearToken: () => void;
}

export type AuthWrapper = Wrapper<IAuthState, IAuthMethods>;

export const JWT_KEY = 'AUTH_JWT_KEY';
export function auth(): AuthWrapper {
    const token = localStorage.getItem(JWT_KEY);
    return object<IAuthState>({ token: token === null ? undefined : token, isAuthorized: !!token })
        .withMethods(({ getState }, {set: setProps}) => {
            const setToken = (val: string) => {
                if (val !== getState().token){
                    setProps('token', val);
                    setProps('isAuthorized', true);
                    localStorage.setItem(JWT_KEY, val);
                }
            };
            const clearToken = () => {
                if (getState().token){
                    setProps('token', undefined);
                    setProps('isAuthorized', false);
                    localStorage.removeItem(JWT_KEY);
                }
            };
            return {
                setToken, clearToken
            };
        });
}
