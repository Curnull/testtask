import {value, request, list, domainHost} from '../../wrappers';
import {getArticleService} from '../../services';
import {IArticleListItem} from '../../interfaces';

const artileService = getArticleService();

export const wrappers = {
    articles: list<IArticleListItem>(),
    getArticlesRequest: request(() => artileService.getForUser().then(wrappers.articles.methods.set)),
    deleteArticleRequest: request(artileService.remove)
};

export default domainHost('MyArticles', wrappers, () => {
    wrappers.getArticlesRequest.methods.send();
    return [];
});
