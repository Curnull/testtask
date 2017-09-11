export const PATHS = {
    HOME: '/',
    LOGIN: '/login',
    MY_ARTICLES: '/my-articles',
    EDIT_ARTICLE: '/article/:id',
    NEW_ARTICLE: '/article/new',
    SIGN_UP: '/signup',
};

export function getEditArticlePath(id) {
    return PATHS.EDIT_ARTICLE.replace(':id', id);
}
