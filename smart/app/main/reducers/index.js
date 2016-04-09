import { combineReducers } from 'redux';

import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import lang from 'services/locales/reducers/lang';
import videoPlayer from '../../videoPlayer/reducers/videoPlayer';
import focusMapWrapper from 'services/focusMap/reducers';

import users from '../../users/reducers/users';

const focusMapInitialState = {
  focused: {
    parentId: 'someContainer',
    listId: 'someList',
    itemId: 'd2dba9b0-43a2-8a4b-00d5-1'
  },
  instances: {
    someContainer: {
      parentId: null,
      listId: 'someContainer'
    },
    someList: {
      parentId: 'someContainer',
      listId: 'someList'
    },
    someGrid: {
      parentId: 'someContainer',
      listId: 'someGrid'
    }
  }
};

export default combineReducers({
  focusMap: focusMapWrapper(focusMapInitialState),
  form: formReducer,
  routing: routeReducer,
  users,
  lang,
  videoPlayer
});
