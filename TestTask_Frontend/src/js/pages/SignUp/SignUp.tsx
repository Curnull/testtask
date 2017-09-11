import * as React from 'react';
import {wrap} from '../../wrappers';
import {commonWrappers} from '../../common';
import domain, {wrappers} from './domain';
import {
    SignUpLoginInput, SignUpEmailInput, SignUpPasswordInput, SignUpConfirmPasswordInput
} from './';
import {routerExtender} from '../../utils';
import {PATHS} from '../../routes';

export interface IProps {
    submit: () => void;
    isLoading: boolean;
    isValid: boolean;
    globalErrors: string[];
}

export class SignUp extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="card col-md-6">
                    <div className="card-body">
                    <form>
                        <fieldset>
                            {this.props.globalErrors.map((e, i) => <div key={i} className="text-danger">{e}</div>)}
                            <legend>Sign up</legend>
                            <div className="form-group">
                                <label htmlFor="userName">Login *</label>
                                <SignUpLoginInput disabled={this.props.isLoading} id="userName" placeholder="Enter Login..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">User Email *</label>
                                <SignUpEmailInput disabled={this.props.isLoading} id="userName" placeholder="Enter Email..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <SignUpPasswordInput disabled={this.props.isLoading} type="password" id="password" placeholder="Enter Password..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password *</label>
                                <SignUpConfirmPasswordInput disabled={this.props.isLoading} type="password" id="password" placeholder="Confirm password..." />
                            </div>
                            <button type="button" disabled={this.props.isLoading || !this.props.isValid} className="btn btn-primary" onClick={this.props.submit}>Sign up</button>
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
            if (!wrappers.validation.methods.validateAll()) {
                return;
            }
            wrappers.registerRequest.methods.send().then(() => {
                getProps().history.push(PATHS.MY_ARTICLES);
            }).catch((r) => {
                if (r.modelState) {
                    wrappers.validation.methods.fromModelState(r.modelState);
                }
            });
        }
    }))
    .withProps(() => ({
        isLoading: wrappers.registerRequest.state.sending,
        isValid: wrappers.validation.methods.isValid(),
        globalErrors: wrappers.validation.state.globalErrors,
    }))
    .component(SignUp);

export default Wrapped;
