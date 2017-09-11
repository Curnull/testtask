import {value, request, list, domainHost, validation} from '../../wrappers';
import {getArticleService} from '../../services';
import {IArticleEntity} from '../../interfaces';
import {fillWrappers, composeFromWrappers, validators} from '../../utils';

const articleService = getArticleService();

const saveArticle = () => {
    const article = composeFromWrappers(wrappers.article) as IArticleEntity;
    return articleService.save(article).then((r) => {
        fillWrappers(wrappers.article, r);
        return r;
    });
};

const publish = () => {
    if (wrappers.article.isPublic.state.value) {
        return;
    }
    return articleService.publish(wrappers.article.id.state.value).then(() => {
        wrappers.article.isPublic.methods.set(true);
    });
};

const article = {
    id: value<number>(0),
    title: value<string>(''),
    content: value<string>(''),
    isPublic: value<boolean>(false),
};

export const wrappers = {
    article,
    validation: validation(article, {
        title: [validators.isRequired, validators.lengthLess(100)],
        content: [validators.isRequired],
    }),
    requests: {
        save: request(saveArticle),
        publish: request(publish),
        get: request(articleService.get),
    }

};

export interface IProps {
    match: {
        params: {
            id: string;
        }
    };
}

export default domainHost<IProps>('EditArticle', wrappers, (props) => {
    const idStr = props.match.params.id;
    if (idStr !== 'new') {
        const id = parseInt(idStr, 0);
        wrappers.requests.get.methods.send(id).then((r) => {
            fillWrappers(wrappers.article, r);
        });
    }

    return [];
});
