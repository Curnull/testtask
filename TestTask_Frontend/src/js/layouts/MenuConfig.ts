import {PATHS} from '../routes/paths';
import {commonWrappers} from '../common';

export const menuItems = [
    {
        text: 'Home',
        href: PATHS.HOME,
        isVisible: () => true,
    },
    {
        text: 'My Articles',
        href: PATHS.MY_ARTICLES,
        isVisible: () => commonWrappers.auth.state.isAuthorized,
    },
];
