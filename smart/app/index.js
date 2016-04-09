/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import createStore from './main/store/createStore';

import KeyMap from 'services/keyMap/containers';
import getRoutes from './routes';

require('assets/styles/main.scss');

const history = useScroll(() => browserHistory)();
const store = createStore(history, {});

ReactDOM.render(
  <Provider store={store} key="provider">
    <KeyMap store={store}>
      <Router history={history}>
        {getRoutes(store)}
      </Router>
    </KeyMap>
  </Provider>,
  document.getElementById('root')
);

