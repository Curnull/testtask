import * as React from 'react';
import cn from 'classnames';

export interface IProps {
    title: string;
    content: string;
    isPublic: boolean;
    actions?: React.ReactNode;
}

export default class ArticleListItem extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <div className={cn('card card-outline-primary text-xs-center mb-2', this.props.isPublic ? '' : 'text-white bg-secondary')}>
                <div className="card-block">
                    <blockquote className="card-blockquote p-3">
                        <div className="pull-right">{this.props.actions}</div>
                        <h3>{this.props.title}</h3>
                        {this.props.content}
                    </blockquote>
                </div>
            </div>
        );
    }
}
