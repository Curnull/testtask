import * as React from 'react';
import cn from 'classnames';

export interface IProps {
}

export default class ArticlesContainer extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <div className="row justify-content-left mt-5">
                <div className="col-lg-12">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
