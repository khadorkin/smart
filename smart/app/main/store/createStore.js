import { createStore as _createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import asyncMiddleware from 'redux-async';
import focusMapMiddleware from 'services/focusMap/middlewares';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

export default function createStore(history, initialState) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [
    thunkMiddleware,
    asyncMiddleware,
    reduxRouterMiddleware,
    focusMapMiddleware
  ];

  const store = applyMiddleware(...middleware)(_createStore)(rootReducer, initialState);

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
