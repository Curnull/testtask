import * as React from 'react';
import Menu from './Menu';
import {PATHS} from '../routes';
import {Link} from 'react-router-dom';
import {wrap} from '../wrappers';
import {commonDomain} from '../common';
import LoginStatis from './LoginStatus';

export interface IProps {
}

export class Layout extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Test Task</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Menu />
                        <LoginStatis />
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export const Wrapped = wrap
    .extend(commonDomain)
    .component(Layout);

export default Wrapped;
