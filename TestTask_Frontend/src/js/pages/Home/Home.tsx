import * as React from 'react';
import domain, { wrappers } from './domain';
import {wrap} from '../../wrappers';
import {ArticleListItem, ArticlesContainer} from '../../components';
import {IArticleListItem} from '../../interfaces';

export interface IProps {
    items: IArticleListItem[];
}

export class Home extends React.PureComponent<IProps, {}> {
    public renderItem = (item: IArticleListItem) => {
        return (
            <ArticleListItem
                key={item.id}
                title={item.title}
                content={item.content}
                isPublic={item.isPublic}
            />
        );
    }

    public render() {
        return (
            <ArticlesContainer>
                {this.props.items.map(this.renderItem)}
            </ArticlesContainer>
        );
    }
}

export const Wrapped = wrap
    .extend(domain)
    .withProps(() => ({
        items: wrappers.articles.state.items,
        isLoading: wrappers.getArticlesRequest.state.sending,
    }))
    .component(Home);

export default Wrapped;
