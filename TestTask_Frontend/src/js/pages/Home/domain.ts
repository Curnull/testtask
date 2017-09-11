import {value, request, list, domainHost} from '../../wrappers';
import {getArticleService} from '../../services';
import {IArticleListItem} from '../../interfaces';

const artileService = getArticleService();

export const wrappers = {
    articles: list<IArticleListItem>(),
    getArticlesRequest: request(() => artileService.getPublic().then(wrappers.articles.methods.set)),
};

export default domainHost('Home', wrappers, () => {
    wrappers.getArticlesRequest.methods.send();
    return [];
});
