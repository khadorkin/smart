import { createReducer } from 'redux-create-reducer';
import { updateState } from 'services/helpers/utils';
// import * as strategies from './strategies';
// import { LEFT, RIGHT, UP, DOWN, ENTER } from 'services/keyMap/actions/types';
// import { UP, DOWN, LEFT, RIGHT } from 'services/keyMap/actions/types';
import { FOCUSED_CHANGED } from '../actions/types';
// import * as strategies from '../helpers/strategies';
import { Dom } from '../helpers/FocusMap';

const focusMapWrapper = (initialState = {focused: {}, instances: {}}) => {
  return createReducer(initialState, {

    [FOCUSED_CHANGED](state, action) {
      const { focused, instances } = state;
      const instance = state.instances[focused.listId];
      const [ direction ] = action.payload;

      const next = Dom.findInList(direction, focused, instance, instances);
      console.log(action);
      return !next ? state : updateState(state, {
        focused: next
      });
    }

    // [ENTER](state, action) {

    //   return updateState(state, {});
    // }

  });
};

export const focusMap = focusMapWrapper();

export default focusMapWrapper;
