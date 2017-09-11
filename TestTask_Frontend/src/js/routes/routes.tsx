import * as React from 'react';
import { Route, Switch } from 'react-router';
import {
    Home,
    Login,
    MyArticles,
    EditArticle,
    SignUp
} from '../pages';
import {
    Layout
} from '../layouts';
import {PATHS} from './';
import {commonWrappers} from '../common';
import {forAuthorized} from '../utils';

export function MainLayoutRoutes(props) {
  if (commonWrappers.pathName.isMounted){
    setTimeout(() => commonWrappers.pathName.methods.set(location.pathname), 0);
  }
  return (
      <Layout>
        <Switch>
            <Route exact={true} path={PATHS.HOME} component={Home} />
            <Route exact={true} path={PATHS.MY_ARTICLES} component={forAuthorized(MyArticles)} />
            <Route exact={true} path={PATHS.EDIT_ARTICLE} component={forAuthorized(EditArticle)} />
            <Route exact={true} path={PATHS.SIGN_UP} component={SignUp} />
            <Route exact={true} path={PATHS.LOGIN} component={Login} />
        </Switch>
      </Layout>
  );
}

export const Routes = () => {
  return (
    <Route path="/" component={MainLayoutRoutes}/>
  );
};
