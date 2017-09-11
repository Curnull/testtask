import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import { getDynamicStoreReducer, dynamicStoreName } from '../wrappers';

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;

export function createStore({ data }) {
    const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleWareList = [];
    const reducer = combineReducers({ routing, [dynamicStoreName]: getDynamicStoreReducer() });
    const finalCreateStore = composeEnhancers(applyMiddleware(...middleWareList))(reduxCreateStore);
    return finalCreateStore(reducer, data);
}
