import { createReducer } from 'redux-create-reducer';
import { updateState } from 'services/helpers/utils';
// import { LEFT } from 'services/keyMap/actions/types';
// import FocusMap from 'services/focusMap/helpers/FocusMap';
// import focusMapReducers from 'services/focusMap/reducers';
// import { focusedChange } from 'services/focusMap/actions';

import {
  USERS_CREATE_REQUEST, USERS_CREATE_RECEIVE_SUCCESS, USERS_CREATE_RECEIVE_ERROR,
  USERS_READ_REQUEST, USERS_READ_RECEIVE_SUCCESS, USER_READ_RECEIVE_SUCCESS, USERS_READ_RECEIVE_ERROR,
  USERS_UPDATE_REQUEST, USERS_UPDATE_RECEIVE_SUCCESS, USERS_UPDATE_RECEIVE_ERROR,
  USERS_DELETE_REQUEST, USERS_DELETE_RECEIVE_SUCCESS, USERS_DELETE_RECEIVE_ERROR,
  USER_CHOOSE, USER_CREATE
} from '../actions/types';

const init = {
  isFetching: false,
  items: [],
  item: false,
  fmlistId: 'someKey'
};

const users = createReducer(init, {

  [USERS_CREATE_REQUEST](state) {
    return updateState(state, {
      isFetching: true
    });
  },

  [USERS_CREATE_RECEIVE_SUCCESS](state, action) {
    const {data} = action.payload;

    state.items.push(data);

    return updateState(state, {
      isFetching: false
    });
  },

  [USERS_CREATE_RECEIVE_ERROR](state) {
    return updateState(state, {
      isFetching: false
    });
  },

  [USERS_READ_REQUEST](state) {
    return updateState(state, {
      isFetching: true
    });
  },

  [USERS_READ_RECEIVE_SUCCESS](state, action) {
    const { data } = action.payload;

    return updateState(state, {
      isFetching: false,
      items: data || []
    });
  },

  [USER_READ_RECEIVE_SUCCESS](state, action) {
    const { data } = action.payload;

    return updateState(state, {
      isFetching: false,
      item: data || false
    });
  },

  [USERS_READ_RECEIVE_ERROR](state) {
    return updateState(state, {
      isFetching: false
    });
  },

  [USERS_UPDATE_REQUEST](state) {
    return updateState(state, {
      isFetching: true
    });
  },

  [USERS_UPDATE_RECEIVE_SUCCESS](state, action) {
    const { data, id } = action.payload;

    state.items.splice(state.items.indexOf(state.items.find((item) => item.id === id)), 1, data);

    return updateState(state, {
      isFetching: false
    });
  },

  [USERS_UPDATE_RECEIVE_ERROR](state) {
    return updateState(state, {
      isFetching: false
    });
  },

  [USERS_DELETE_REQUEST](state) {
    return updateState(state, {
      isFetching: true
    });
  },

  [USERS_DELETE_RECEIVE_SUCCESS](state, action) {
    const { id } = action.payload;

    state.items.splice(state.items.indexOf(state.items.find((item) => item.id === id)), 1);

    return updateState(state, {
      isFetching: false
    });
  },

  [USERS_DELETE_RECEIVE_ERROR](state) {
    return updateState(state, {
      isFetching: false
    });
  },

  [USER_CREATE](state) {
    return updateState(state, {
      item: {'id': 0, 'firstName': '', 'lastName': ''}
    });
  },

  [USER_CHOOSE](state, action) {
    const id = +action.payload[0];

    return updateState(state, {
      id
    });
  },

  // [LEFT](state, action) {
  //   // const { dispatch } = action.payload[0];
  //   // const bool = FocusMap.focused && FocusMap.focused.listId === state.fmlistId;
  //   // const bool = false;
  //   console.log(action.payload);

  //   return state;
  //   // return !bool ? state : updateState(state, {
  //   //   focusMap: focusMapReducers(state.focusMap, action)
  //   // });
  // }

});

export default users;
