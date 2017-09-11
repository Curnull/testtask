import {entityApi} from '../utils';
import {ARICLES_URL, GET_USER_ARTICLES_URL, PUBLISH_ARTICLE_URL} from '../constants';
import {IArticleListItem} from '../interfaces';

export function getArticleService() {
    return entityApi<IArticleListItem>(ARICLES_URL).withMethods((methods, api) => ({
        ...methods,
        getPublic: () => api.get<IArticleListItem[]>(),
        getForUser: () => {
            return api.get<IArticleListItem[]>(GET_USER_ARTICLES_URL);
        },
        publish: (id: number) => api.post(PUBLISH_ARTICLE_URL + '/' + id)
    })).methods;
}
