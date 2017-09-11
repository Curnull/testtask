import * as React from 'react';
import {wrap} from '../../wrappers';
import {commonWrappers} from '../../common';
import domain, {wrappers} from './domain';
import {
    UserNameInput, LoginPasswordInput
} from './';
import {routerExtender} from '../../utils';
import {PATHS} from '../../routes';

export interface IProps {
    submit: () => void;
    isLoading: boolean;
    isValid: boolean;
    globalErrors: string[];
}

export class Login extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="card col-md-6">
                    <div className="card-body">
                    <form>
                        <fieldset>
                            <legend>Sign in</legend>
                            {this.props.globalErrors.map((e, i) => <div key={i} className="text-danger">{e}</div>)}
                            <div className="form-group">
                                <label htmlFor="userName">User Name *</label>
                                <UserNameInput disabled={this.props.isLoading} id="userName" placeholder="Enter user name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">Password *</label>
                                <LoginPasswordInput disabled={this.props.isLoading} type="password" id="password" placeholder="Password" />
                            </div>

                           <button type="submit" disabled={this.props.isLoading || !this.props.isValid} className="btn btn-primary" onClick={this.props.submit}>Log in</button>
                        </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export const Wrapped = wrap
    .extend(domain)
    .extend(routerExtender)
    .withProps(({getProps}) => ({
        submit: () => {
            if (!wrappers.validation.methods.validateAll()){
                return;
            }
            wrappers.getTokenRequest.methods.send().then(() => {
                getProps().history.push(PATHS.HOME);
            }).catch((r) => {
                if (r.response.status === 400) {
                    wrappers.validation.methods.setGlobalErrors(['Incorrect username or password.']);
                }
            });
        }
    }))
    .withProps(() => ({
        isLoading: wrappers.getTokenRequest.state.sending,
        isValid: wrappers.validation.methods.isValid(),
        globalErrors: wrappers.validation.state.globalErrors,
    }))
    .component(Login);

export default Wrapped;
