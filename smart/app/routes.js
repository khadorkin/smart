import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { readUser, createUser } from './users/actions/user';
import { readUsers } from './users/actions/users';

import {
    Users,
    UserView
} from './users/containers';

import { Home } from './home/containers';
import { MultiGrid } from './multiGrid/containers';
import { MultiCarousel } from './multiCarousel/containers';

import App from './main/components/App/App';

export default (store) => {
  // const requireLogin = (nextState, replace, cb) => {
  //  function checkAuth() {
  //    const { auth: { user }} = store.getState();
  //    if (!user) {
  //      // oops, not logged in, so can't be here!
  //      replace('/');
  //    }
  //    cb();
  //  }
  //
  //  if (!isAuthLoaded(store.getState())) {
  //    store.dispatch(loadAuth()).then(checkAuth);
  //  } else {
  //    checkAuth();
  //  }
  // };

  /**
   * Please keep routes in alphabetical order
   */
  return (
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/users" onEnter={()=>store.dispatch(readUsers())}>
          <IndexRoute component={Users}/>
          <Route path="create" component={UserView} onEnter={() => store.dispatch(createUser())}/>
          <Route path=":id" component={UserView} onEnter={(nextState) => store.dispatch(readUser(nextState.params.id))}/>
        </Route>
        <Route path="/parent" component={MultiGrid} />
        <Route path="/carousel" component={MultiCarousel} />
        <Route path="/home" component={Home} />
      </Route>
  );
};
