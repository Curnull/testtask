import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {hashHistory} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {Routes} from './routes';
import '../scss/main.scss';
import { createStore } from './utils';
import createBrowserHistory from 'history/createBrowserHistory';
import 'bootstrap';

const appStore = createStore({data: {}});
const history = syncHistoryWithStore(createBrowserHistory(), appStore);

ReactDOM.render(
  <Provider store={appStore} key="provider">
      <BrowserRouter history={history}>
        <Routes />
      </BrowserRouter>
  </Provider>,
  document.getElementById('app-container')
);
