import {auth, value, domainHost} from '../wrappers';

export const commonWrappers = {
    auth: auth(),
    pathName: value(window.location.pathname),
};

export const commonDomain = domainHost('Common', commonWrappers);
