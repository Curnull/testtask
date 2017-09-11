import { RouteComponentProps, withRouter } from 'react-router';
import { extender } from '../wrappers';

export const routerExtender = extender<RouteComponentProps<{id: string}>>(withRouter, 'match', 'location', 'history', 'staticContext');
