import * as React from 'React';
import {commonWrappers} from '../common';
import {NotAuthorized} from '../pages';

export function forAuthorized<T>(Component: React.ComponentType<T>) {
    return class HOC extends React.PureComponent<T, {}> {
        public render() {
            if (commonWrappers.auth.state.isAuthorized) {
                return <Component {...this.props as any} />;
            }
            return <NotAuthorized />;
        }
    };
}
