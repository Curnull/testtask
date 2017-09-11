import * as React from 'react';
import Menu from './Menu';
import {PATHS} from '../routes';
import {Link} from 'react-router-dom';
import {wrap} from '../wrappers';
import {commonWrappers} from '../common';
import {routerExtender} from '../utils';

export interface IProps {
    isAuthorized: boolean;
    userName: string;
    onClickSignIn: () => void;
    onClickSignUp: () => void;
    onClickSignOut: () => void;
    onClickProfile: () => void;
}

export class LoginStatus extends React.PureComponent<IProps, {}> {
    public render() {
        if (this.props.isAuthorized) {
            return (
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" data-toggle="dropdown">{this.props.userName}&nbsp;<span className="caret" /></span>
                        <div className="dropdown-menu" aria-labelledby="themes">
                        <span className="dropdown-item" onClick={this.props.onClickProfile}>Your Profile</span>
                            <div className="dropdown-divider" />
                        <span className="dropdown-item" onClick={this.props.onClickSignOut}>Sign out</span>
                        </div>
                    </li>
                </ul>
            );
        }
        return (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn btn-secondary btn-info" onClick={this.props.onClickSignIn}>Sign in</button>
                        <button className="btn btn-secondary btn-info" onClick={this.props.onClickSignUp}>Sign up</button>
                    </div>
                </li>
            </ul>

        );
    }
}

export const Wrapped = wrap
    .withProps(() => ({
        isAuthorized: commonWrappers.auth.state.isAuthorized,
        userName: 'Test User',
    }))
    .extend(routerExtender)
    .withProps(({getProps}) => ({
        onClickSignIn: () => {
            getProps().history.push(PATHS.LOGIN);
        },
        onClickSignUp: () => {
            getProps().history.push(PATHS.SIGN_UP);
        },
        onClickSignOut: () => {
            commonWrappers.auth.methods.clearToken();
            getProps().history.push(PATHS.HOME);
        },
        onClickProfile: () => {
        },
    }))
    .component(LoginStatus);

export default Wrapped;
