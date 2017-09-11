import * as React from 'react';
import domain, { wrappers } from './domain';
import {wrap} from '../../wrappers';
import {ArticleListItem, ArticlesContainer} from '../../components';
import {IArticleListItem} from '../../interfaces';
import {routerExtender} from '../../utils';
import {PATHS, getEditArticlePath} from '../../routes';

export interface IProps {
    items: IArticleListItem[];
    onClickCreateArticle: () => void;
    editItem: (item: IArticleListItem) => void;
    deleteItem: (item: IArticleListItem) => void;
}

export class MyArticles extends React.PureComponent<IProps, {}> {
    public renderActions = (item: IArticleListItem) => {
        const onClickEdit = () => this.props.editItem(item);
        const onClickRemove = () => this.props.deleteItem(item);
        return (
            <div>
                <i className="fa fa-pencil action-icon" title="Edit" onClick={onClickEdit} />&nbsp;&nbsp;
                <i className="fa fa-trash action-icon" title="Delete" onClick={onClickRemove} />
            </div>
        );
    }

    public renderItem = (item: IArticleListItem) => {
        const actions = this.renderActions(item);
        return (
            <ArticleListItem
                key={item.id}
                title={item.title}
                content={item.content}
                isPublic={item.isPublic}
                actions={actions}
            />
        );
    }

    public render() {
        return (
            <div className="mt-5">
                <button className="btn btn-primary pull-right" onClick={this.props.onClickCreateArticle}>Add New Article</button>
                <ArticlesContainer>
                    {this.props.items.map(this.renderItem)}
                </ArticlesContainer>
            </div>
        );
    }
}

export const Wrapped = wrap
    .extend(domain)
    .extend(routerExtender)
    .withProps(({getProps}) => ({
        items: wrappers.articles.state.items,
        isLoading: wrappers.getArticlesRequest.state.sending,
        onClickCreateArticle: () => getProps().history.push(PATHS.NEW_ARTICLE),
        editItem: (item: IArticleListItem) => {
            getProps().history.push(getEditArticlePath(item.id));
        },
        deleteItem: (item: IArticleListItem) => {
            wrappers.deleteArticleRequest.methods.send(item.id).then(wrappers.getArticlesRequest.methods.send);
        }
    }))
    .component(MyArticles);

export default Wrapped;
